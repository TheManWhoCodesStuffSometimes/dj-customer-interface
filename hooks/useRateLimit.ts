import { useState, useEffect, useCallback } from 'react';

interface RateLimitData {
  requestCount: number;
  lastRequestTime: number;
  cooldownUntil: number;
}

interface RateLimitState extends RateLimitData {
  canRequest: boolean;
  timeUntilNextRequest: number;
  isInCooldown: boolean;
}

const STORAGE_KEY = 'djRequestLimits';
const RESET_AFTER_INACTIVITY = 60 * 60 * 1000; // 1 hour in milliseconds

const getCooldownDuration = (requestCount: number): number => {
  if (requestCount <= 3) return 0;
  if (requestCount === 4) return 30 * 1000; // 30 seconds
  if (requestCount === 5) return 60 * 1000; // 60 seconds
  return 5 * 60 * 1000; // 5 minutes for 6+
};

const loadRateLimitData = (): RateLimitData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return { requestCount: 0, lastRequestTime: 0, cooldownUntil: 0 };
    }
    
    const data: RateLimitData = JSON.parse(stored);
    const now = Date.now();
    
    // Reset if more than 1 hour of inactivity
    if (data.lastRequestTime && (now - data.lastRequestTime) > RESET_AFTER_INACTIVITY) {
      const resetData = { requestCount: 0, lastRequestTime: 0, cooldownUntil: 0 };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resetData));
      return resetData;
    }
    
    return data;
  } catch (error) {
    console.error('Error loading rate limit data:', error);
    return { requestCount: 0, lastRequestTime: 0, cooldownUntil: 0 };
  }
};

const saveRateLimitData = (data: RateLimitData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving rate limit data:', error);
  }
};

export const useRateLimit = () => {
  const [rateLimitData, setRateLimitData] = useState<RateLimitData>(loadRateLimitData);
  const [timeUntilNextRequest, setTimeUntilNextRequest] = useState<number>(0);

  // Update countdown timer
  useEffect(() => {
    const updateTimer = () => {
      const now = Date.now();
      const timeLeft = Math.max(0, rateLimitData.cooldownUntil - now);
      setTimeUntilNextRequest(timeLeft);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [rateLimitData.cooldownUntil]);

  const canRequest = timeUntilNextRequest === 0;
  const isInCooldown = timeUntilNextRequest > 0;

  const recordRequest = useCallback(() => {
    const now = Date.now();
    const newRequestCount = rateLimitData.requestCount + 1;
    const cooldownDuration = getCooldownDuration(newRequestCount);
    const newCooldownUntil = cooldownDuration > 0 ? now + cooldownDuration : 0;

    const newData: RateLimitData = {
      requestCount: newRequestCount,
      lastRequestTime: now,
      cooldownUntil: newCooldownUntil,
    };

    setRateLimitData(newData);
    saveRateLimitData(newData);
  }, [rateLimitData.requestCount]);

  const resetLimits = useCallback(() => {
    const resetData: RateLimitData = {
      requestCount: 0,
      lastRequestTime: 0,
      cooldownUntil: 0,
    };
    setRateLimitData(resetData);
    saveRateLimitData(resetData);
  }, []);

  const getRemainingFreeRequests = useCallback(() => {
    return Math.max(0, 3 - rateLimitData.requestCount);
  }, [rateLimitData.requestCount]);

  const getNextCooldownDuration = useCallback(() => {
    const nextRequestCount = rateLimitData.requestCount + 1;
    return getCooldownDuration(nextRequestCount);
  }, [rateLimitData.requestCount]);

  const formatTimeRemaining = useCallback((milliseconds: number): string => {
    if (milliseconds === 0) return '';
    
    const totalSeconds = Math.ceil(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    
    if (minutes > 0) {
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${seconds}s`;
  }, []);

  return {
    canRequest,
    isInCooldown,
    timeUntilNextRequest,
    requestCount: rateLimitData.requestCount,
    recordRequest,
    resetLimits,
    getRemainingFreeRequests,
    getNextCooldownDuration,
    formatTimeRemaining,
  };
};
