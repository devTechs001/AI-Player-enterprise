import { useState, useCallback, useEffect, useRef } from 'react';

export function useWakeLock() {
  const [isActive, setIsActive] = useState(false);
  const [supported, setSupported] = useState(false);
  const wakeRef = useRef(null);

  useEffect(() => {
    setSupported('wakeLock' in navigator);
  }, []);

  const request = useCallback(async () => {
    if (!('wakeLock' in navigator)) return false;
    try {
      wakeRef.current = await navigator.wakeLock.request('screen');
      setIsActive(true);

      wakeRef.current.addEventListener('release', () => {
        setIsActive(false);
        wakeRef.current = null;
      });

      return true;
    } catch {
      setIsActive(false);
      return false;
    }
  }, []);

  const release = useCallback(async () => {
    if (wakeRef.current) {
      try {
        await wakeRef.current.release();
      } catch { /* */ }
      wakeRef.current = null;
      setIsActive(false);
    }
  }, []);

  // Re-acquire wake lock on visibility change (browser releases it when tab hides)
  useEffect(() => {
    if (!isActive) return;
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        request();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [isActive, request]);

  useEffect(() => {
    return () => { release(); };
  }, [release]);

  return { supported, isActive, request, release };
}

export default useWakeLock;
