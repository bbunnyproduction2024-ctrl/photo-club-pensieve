'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function AudioManager() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio('/Photo_Club/background%20music.mp3');
      audio.loop = true;
      audio.volume = 0.2;
      audioRef.current = audio;
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (pathname === '/video') {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
  }, [pathname]);

  return null;
}
