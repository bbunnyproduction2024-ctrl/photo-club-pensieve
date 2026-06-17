'use client';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function AudioManager() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const pathname = usePathname();
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (audioRef.current) return;
    const audio = new Audio('/Photo_Club/background%20music.mp3');
    audio.loop = true;
    audio.volume = 0.12;
    audioRef.current = audio;

    const start = () => audio.play().catch(() => {});
    audio.play().catch(() => {
      document.addEventListener('click', start, { once: true });
      document.addEventListener('touchstart', start, { once: true });
    });
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (pathname === '/video') {
      audio.pause();
    } else if (!muted) {
      audio.play().catch(() => {});
    }
  }, [pathname, muted]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (muted) {
      audio.play().catch(() => {});
      setMuted(false);
    } else {
      audio.pause();
      setMuted(true);
    }
  };

  if (pathname === '/video') return null;

  return (
    <button
      onClick={toggle}
      title={muted ? 'เปิดเพลง' : 'ปิดเพลง'}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 999,
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        border: '1px solid rgba(201,162,39,.4)',
        background: 'rgba(8,5,2,.75)',
        backdropFilter: 'blur(8px)',
        color: muted ? 'rgba(201,162,39,.35)' : 'rgba(201,162,39,.85)',
        fontSize: '18px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all .2s',
        boxShadow: muted ? 'none' : '0 0 12px rgba(201,162,39,.2)',
      }}
    >
      {muted ? '🔇' : '🎵'}
    </button>
  );
}
