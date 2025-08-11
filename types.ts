export interface SongRequest {
  id: string; // "artist-title"
  title: string;
  artist: string;
  requestCount: number;
}

export interface CooldownSong {
  id: string; // "artist-title"
  title: string;
  artist: string;
  cooldownUntil: number; // Timestamp
}

// Removed BlacklistedSong interface since we don't need it in customer interface
// n8n will handle blacklist checking

export interface MusicBrainzSong {
  id: string; // MBID from MusicBrainz
  title: string;
  artist: string;
}
