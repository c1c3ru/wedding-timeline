import { useState, useEffect, useMemo } from "react";

interface CountdownValues {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export function useCountdown(targetDate: Date): CountdownValues {
  const target = useMemo(() => targetDate.getTime(), [targetDate]);

  const calculate = (): CountdownValues => {
    const now = Date.now();
    const diff = target - now;

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
    }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      isExpired: false,
    };
  };

  const [countdown, setCountdown] = useState<CountdownValues>(calculate);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(calculate());
    }, 1000);

    return () => clearInterval(timer);
  }, [target]);

  return countdown;
}
