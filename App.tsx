// Updated App.tsx for customer interface
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
      // Use your actual admin dashboard URL
      const ADMIN_API_URL = import.meta.env.VITE_ADMIN_API_URL || 'https://the-cowboy-band-manager-test-3.vercel.app';
      const VENUE_ID = import.meta.env.VITE_VENUE_ID || 'cowboy-saloon-main';
      
      const requestUrl = `${ADMIN_API_URL}/api/dj/requests`;
      console.log('Sending request to:', requestUrl);
      
      const requestPayload = {
        title,
        artist,
        songId,
        venue: VENUE_ID,
        timestamp: new Date().toISOString(),
        source: 'customer_interface'
      };
      
      console.log('Request payload:', requestPayload);
      
      const response = await fetch(requestUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestPayload)
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        
        let errorMessage = `Request failed with status ${response.status}`;
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.error || errorData.message || errorMessage;
        } catch (e) {
          // If we can't parse the error as JSON, use the raw text
          errorMessage = errorText || errorMessage;
        }
        
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log('Success response:', result);
      
      if (result.success) {
        // Fetch fun fact while processing the request
        try {
          const fact = await getFunFact(title, artist);
          setGeminiFact(fact || `Your request for "${title}" by ${artist} has been sent to the DJ!`);
        } catch (factError) {
          console.warn('Failed to get fun fact:', factError);
          setGeminiFact(`Your request for "${title}" by ${artist} has been sent to the DJ!`);
        }
      } else {
        throw new Error(result.message || 'Request failed - server returned unsuccessful response');
      }
      
    } catch (error) {
      console.error('Request submission error:', error);
      
      // Provide more specific error messages
      let errorMessage = 'Failed to submit request. Please try again.';
      
      if (error instanceof TypeError && error.message.includes('fetch')) {
        errorMessage = 'Unable to connect to the server. Please check your internet connection and try again.';
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
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
