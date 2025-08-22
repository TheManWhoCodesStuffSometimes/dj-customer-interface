import type { MusicBrainzSong } from '../types';
import { searchSongs as searchMusicBrainz } from './musicbrainzService';
import curatedSongs, { type CuratedSong } from '../data/curatedSongs';

// Simple Levenshtein distance for fuzzy matching
function levenshteinDistance(str1: string, str2: string): number {
  const matrix = [];
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
}

// Calculate similarity score (0-1, where 1 is perfect match)
function calculateSimilarity(query: string, target: string): number {
  const distance = levenshteinDistance(query.toLowerCase(), target.toLowerCase());
  const maxLength = Math.max(query.length, target.length);
  return maxLength === 0 ? 1 : 1 - (distance / maxLength);
}

// Search curated songs with fuzzy matching
function searchCuratedSongs(query: string, searchBy: 'song' | 'artist'): MusicBrainzSong[] {
  const normalizedQuery = query.toLowerCase().trim();
  const results: Array<{ song: CuratedSong; score: number }> = [];

  curatedSongs.forEach(song => {
    let bestScore = 0;
    
    if (searchBy === 'song') {
      // Check title
      const titleScore = calculateSimilarity(normalizedQuery, song.title);
      bestScore = Math.max(bestScore, titleScore);
      
      // Check search terms
      if (song.searchTerms) {
        song.searchTerms.forEach(term => {
          const termScore = calculateSimilarity(normalizedQuery, term);
          bestScore = Math.max(bestScore, termScore);
        });
      }
      
      // Bonus for partial matches
      if (song.title.toLowerCase().includes(normalizedQuery)) {
        bestScore = Math.max(bestScore, 0.8);
      }
    } else {
      // Search by artist
      const artistScore = calculateSimilarity(normalizedQuery, song.artist);
      bestScore = Math.max(bestScore, artistScore);
      
      // Bonus for partial matches
      if (song.artist.toLowerCase().includes(normalizedQuery)) {
        bestScore = Math.max(bestScore, 0.8);
      }
    }
    
    // Only include results with decent similarity
    if (bestScore > 0.4) {
      results.push({ song, score: bestScore + (song.popularity / 100) }); // Add popularity bonus
    }
  });

  // Sort by score (descending) and convert to MusicBrainzSong format
  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, 10) // Limit to top 10 curated results
    .map(result => ({
      id: `curated-${result.song.title.toLowerCase().replace(/\s+/g, '-')}-${result.song.artist.toLowerCase().replace(/\s+/g, '-')}`,
      title: result.song.title,
      artist: result.song.artist
    }));
}

// Enhanced search function that prioritizes curated songs
export const enhancedSearchSongs = async (query: string, searchBy: 'song' | 'artist'): Promise<MusicBrainzSong[]> => {
  // Require minimum 3 characters
  if (!query.trim() || query.trim().length < 3) {
    return [];
  }

  try {
    // First, search curated database
    const curatedResults = searchCuratedSongs(query, searchBy);
    
    // If we have good curated results (5 or more), return those
    if (curatedResults.length >= 5) {
      return curatedResults;
    }
    
    // Otherwise, search MusicBrainz for additional results
    const musicBrainzResults = await searchMusicBrainz(query, searchBy);
    
    // Combine results, prioritizing curated songs
    const combinedResults = [...curatedResults];
    
    // Add MusicBrainz results that aren't already in curated results
    musicBrainzResults.forEach(mbResult => {
      const isDuplicate = curatedResults.some(curated => 
        curated.title.toLowerCase() === mbResult.title.toLowerCase() &&
        curated.artist.toLowerCase() === mbResult.artist.toLowerCase()
      );
      
      if (!isDuplicate && combinedResults.length < 15) {
        combinedResults.push(mbResult);
      }
    });
    
    return combinedResults;
    
  } catch (error) {
    console.error('Enhanced search failed:', error);
    // Fallback to curated search only
    return searchCuratedSongs(query, searchBy);
  }
};
