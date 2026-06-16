'use client';
import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function VideoPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem('photoclub')) router.replace('/');
  }, [router]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600&family=Noto+Serif+Thai:wght@400;500&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        body{background:#000;overflow:hidden;}
        .wrap{width:100dvw;height:100dvh;position:relative;display:flex;align-items:center;justify-content:center;}
        video{width:100%;height:100%;object-fit:contain;}
        .overlay{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.25);}
        .btn-wrap{display:flex;flex-direction:column;align-items:center;gap:12px;animation:up .6s ease both;}
        @keyframes up{from{opacity:0;transform:translateY(24px);}to{opacity:1;transform:translateY(0);}}
        .open-btn{padding:16px 40px;background:linear-gradient(135deg,#6b3a0a,#c9a227 50%,#6b3a0a);border:none;border-radius:14px;color:#0a0600;font-size:17px;font-family:'Cinzel',serif;font-weight:600;letter-spacing:2px;cursor:pointer;box-shadow:0 0 40px rgba(201,162,39,.5);transition:transform .2s;}
        .open-btn:hover{transform:scale(1.04);}
        .hint{font-family:'Noto Serif Thai',serif;font-size:13px;color:rgba(201,162,39,.6);letter-spacing:1px;}
      `}</style>
      <div className="wrap">
        <video ref={videoRef} src="/Photo_Club/video-owl-note.mp4"
          autoPlay playsInline onEnded={() => setTimeout(() => setShowBtn(true), 400)}/>
        {showBtn && (
          <div className="overlay">
            <div className="btn-wrap">
              <button className="open-btn" onClick={() => router.push('/card')}>📜 เปิดจดหมาย</button>
              <div className="hint">แตะเพื่อรับการ์ดเชิญของคุณ</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
