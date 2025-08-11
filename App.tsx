// Updated App.tsx for customer interface
import React, { useState, useCallback } from 'react';
import CustomerView from './components/CustomerView';
import { getFunFact } from './services/geminiService';

const App: React.FC = () => {
  // State for customer view feedback
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [geminiFact, setGeminiFact] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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

    try {
      // Use your n8n webhook directly
      const N8N_WEBHOOK_URL = 'https://thayneautomations.app.n8n.cloud/webhook/dj';
      const VENUE_ID = 'cowboy-saloon-main';
      
      console.log('Sending request to n8n webhook:', N8N_WEBHOOK_URL);
      
      const requestPayload = {
        action: 'requests.add',
        data: {
          songId,
          title,
          artist,
          venue: VENUE_ID,
          timestamp: new Date().toISOString(),
          requestCount: 1
        }
      };
      
      console.log('Request payload:', requestPayload);
      
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestPayload)
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`Request failed with status ${response.status}`);
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
        // Handle n8n specific error responses
        if (result.error && result.error.includes('blacklist')) {
          throw new Error(`"${title}" is not available for request.`);
        }
        throw new Error(result.message || result.error || 'Request failed');
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
  }, [clearMessages]);

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
