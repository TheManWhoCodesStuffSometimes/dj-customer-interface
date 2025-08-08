import React, { useState, useCallback } from 'react';
import CustomerView from './components/CustomerView';
import type { BlacklistedSong } from './types';
import { getFunFact } from './services/geminiService';

const App: React.FC = () => {
  // State for customer view feedback
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [geminiFact, setGeminiFact] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Note: Blacklist needs to come from your admin system
  // For now, this is empty - you'll connect this to your backend later
  const [blacklist] = useState<BlacklistedSong[]>([]);

  const clearMessages = useCallback(() => {
    setGeminiFact(null);
    setError(null);
  }, []);
  
  const generateSongId = (title: string, artist: string) => {
    return `${artist.toLowerCase().trim().replace(/\s+/g, '-')}-${title.toLowerCase().trim().replace(/\s+/g, '-')}`;
  };

  const handleRequestSong = useCallback(async (title: string, artist: string) => {
    clearMessages();
    setIsLoading(true);

    const songId = generateSongId(title, artist);

    // Check blacklist
    if (blacklist.some(song => song.id === songId)) {
        setError(`"${title}" is not available for request.`);
        setIsLoading(false);
        return;
    }

    try {
      // TODO: Send request to your backend/database instead of localStorage
      // For now, we'll just simulate the request being sent
      console.log('Song request:', { title, artist, songId });
      
      // Fetch fun fact while processing the request
      const fact = await getFunFact(title, artist);
      setGeminiFact(fact);
    } catch (error) {
      setError('Failed to submit request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [blacklist, clearMessages]);

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 bg-gradient-to-br from-slate-900 to-slate-800">
      <header className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">
          The Cowboy Saloon
        </h1>
        <p className="text-slate-300 mt-2 text-lg">Request your favorite songs!</p>
      </header>

      <main>
        <CustomerView 
          handleRequestSong={handleRequestSong} 
          blacklist={blacklist}
          isLoading={isLoading}
          geminiFact={geminiFact}
          error={error}
          clearMessages={clearMessages}
        />
      </main>
      
      <footer className="text-center text-slate-500 mt-12 text-sm">
        <p>Powered by React, Tailwind, and Gemini</p>
      </footer>
    </div>
  );
};

export default App;
