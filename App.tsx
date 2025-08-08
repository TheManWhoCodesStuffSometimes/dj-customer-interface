// Update your App.tsx handleRequestSong function with the correct URL:

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
    
    console.log('Sending request to:', `${ADMIN_API_URL}/api/dj/requests`);
    
    const response = await fetch(`${ADMIN_API_URL}/api/dj/requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        artist,
        songId,
        venue: VENUE_ID,
        timestamp: new Date().toISOString(),
        source: 'customer_interface'
      })
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Request failed: ${response.status} - ${errorData.error || 'Unknown error'}`);
    }

    const result = await response.json();
    console.log('Success response:', result);
    
    if (result.success) {
      // Fetch fun fact while processing the request
      const fact = await getFunFact(title, artist);
      setGeminiFact(fact || `Your request for "${title}" by ${artist} has been sent to the DJ!`);
    } else {
      throw new Error(result.message || 'Request failed');
    }
    
  } catch (error) {
    console.error('Request submission error:', error);
    setError('Failed to submit request. Please try again.');
  } finally {
    setIsLoading(false);
  }
}, [blacklist, clearMessages]);
