'use client';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function AudioManager() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const pathname = usePathname();
  const [muted, setMuted] = useState(false);
  const [showEntry, setShowEntry] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (audioRef.current) return;
    const audio = new Audio('/Photo_Club/background%20music.mp3');
    audio.loop = true;
    audio.volume = 0.05;
    audioRef.current = audio;

    audio.play().then(() => {
      // autoplay succeeded — no overlay needed
      sessionStorage.setItem('hs_entered', '1');
    }).catch(() => {
      // blocked — show entry overlay only if not entered this session
      if (!sessionStorage.getItem('hs_entered')) {
        setShowEntry(true);
      }
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

  const enter = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.play().catch(() => {});
    sessionStorage.setItem('hs_entered', '1');
    setFadeOut(true);
    setTimeout(() => setShowEntry(false), 700);
  };

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

  return (
    <>
      {/* Entry overlay */}
      {showEntry && (
        <div
          onClick={enter}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(4,2,1,.92)',
            backdropFilter: 'blur(6px)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: '20px',
            cursor: 'pointer',
            opacity: fadeOut ? 0 : 1,
            transition: 'opacity .7s ease',
          }}
        >
          <div style={{ fontSize: '52px', animation: 'hs-pulse 2s ease-in-out infinite' }}>✦</div>
          <div style={{
            fontFamily: "'Cinzel', serif",
            fontSize: '13px', letterSpacing: '5px',
            color: 'rgba(201,162,39,.9)',
          }}>
            TOUCH TO ENTER
          </div>
          <div style={{
            fontFamily: "'Noto Serif Thai', serif",
            fontSize: '15px', letterSpacing: '2px',
            color: 'rgba(201,162,39,.6)',
          }}>
            แตะเพื่อเข้าสู่นิทรรศการ
          </div>
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500&family=Noto+Serif+Thai:wght@400&display=swap');
            @keyframes hs-pulse{0%,100%{opacity:.5;transform:scale(1);}50%{opacity:1;transform:scale(1.2);}}
          `}</style>
        </div>
      )}

      {/* Mute button — hidden on /video */}
      {pathname !== '/video' && (
        <button
          onClick={toggle}
          title={muted ? 'เปิดเพลง' : 'ปิดเพลง'}
          style={{
            position: 'fixed', bottom: '20px', right: '20px', zIndex: 998,
            width: '40px', height: '40px', borderRadius: '50%',
            border: '1px solid rgba(201,162,39,.4)',
            background: 'rgba(8,5,2,.75)',
            backdropFilter: 'blur(8px)',
            color: muted ? 'rgba(201,162,39,.35)' : 'rgba(201,162,39,.85)',
            fontSize: '18px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all .2s',
            boxShadow: muted ? 'none' : '0 0 12px rgba(201,162,39,.2)',
          }}
        >
          {muted ? '🔇' : '🎵'}
        </button>
      )}
    </>
  );
}
