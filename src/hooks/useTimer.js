import { useState, useEffect, useRef, useCallback } from 'react';

export function useTimer(duration = 45, onTimeout) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);
  const onTimeoutRef = useRef(onTimeout);

  useEffect(() => {
    onTimeoutRef.current = onTimeout;
  }, [onTimeout]);

  const start = useCallback(() => {
    setTimeLeft(duration);
    setRunning(true);
  }, [duration]);

  const stop = useCallback(() => {
    setRunning(false);
    clearInterval(intervalRef.current);
  }, []);

  const reset = useCallback(() => {
    stop();
    setTimeLeft(duration);
  }, [stop, duration]);

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setRunning(false);
          onTimeoutRef.current?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const phase = timeLeft > 15 ? 'green' : timeLeft > 5 ? 'amber' : 'red';
  const progress = timeLeft / duration; // 1.0 → 0.0

  return { timeLeft, running, phase, progress, start, stop, reset };
}
