'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function AudioManager() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const pathname = usePathname();

  // สร้าง audio ครั้งเดียว + เริ่มเล่นหลัง user แตะครั้งแรก
  useEffect(() => {
    if (audioRef.current) return;
    const audio = new Audio('/Photo_Club/background%20music.mp3');
    audio.loop = true;
    audio.volume = 0.08;
    audioRef.current = audio;

    const start = () => audio.play().catch(() => {});

    // ลองเล่นทันที — ถ้าถูกบล็อก รอ interaction แรก
    audio.play().catch(() => {
      document.addEventListener('click', start, { once: true });
      document.addEventListener('touchstart', start, { once: true });
    });
  }, []);

  // หยุดตอนหน้า video, เล่นต่อหน้าอื่น
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
