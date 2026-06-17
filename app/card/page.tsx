'use client';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';


type Data = {
  name: string;
  houseName: string;
  houseThai: string;
  houseAccent: string;
  houseBg: string;
  houseTextColor: string;
  houseIcon: string;
  year: string;
  letter: string;
};

const HOUSE_LOGO: Record<string, string> = {
  gryffindor: '/Photo_Club/logo_Gryffindor.png',
  hufflepuff: '/Photo_Club/logo_Hufflepuff.png',
  ravenclaw: '/Photo_Club/logo_Ravenclaw.png',
  slytherin: '/Photo_Club/logo_Slytherin.png',
};

export default function CardPage() {
  const router = useRouter();
  const [data, setData] = useState<Data | null>(null);
  const [saving, setSaving] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem('photoclub');
    if (!raw) { router.replace('/'); return; }
    setData(JSON.parse(raw));
    setTimeout(() => setRevealed(true), 100);
  }, [router]);

  const downloadCard = async () => {
    if (!cardRef.current || saving) return;
    setSaving(true);
    try {
      const h2c = (await import('html2canvas')).default;
      const canvas = await h2c(cardRef.current, {
        scale: 3,
        backgroundColor: null,
        useCORS: true,
        logging: false,
        imageTimeout: 0,
      });
      const url = canvas.toDataURL('image/png');
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile) {
        setPreviewUrl(url);
      } else {
        const link = document.createElement('a');
        link.download = `Pensieve-${data?.name ?? 'guest'}.png`;
        link.href = url;
        link.click();
      }
    } finally {
      setSaving(false);
    }
  };

  if (!data) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100dvh', background:'#060301', color:'#c9a227', fontFamily:'serif' }}>
      กำลังโหลด...
    </div>
  );

  const houseLogo = HOUSE_LOGO[data.houseName.toLowerCase()] ?? '';

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Noto+Serif+Thai:wght@300;400;500;600&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        body{background:#060301;font-family:'Noto Serif Thai',serif;min-height:100dvh;}

        .page{min-height:100dvh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px 16px 40px;position:relative;overflow:hidden;}
        .bg{position:fixed;inset:0;z-index:0;}
        .bg img{width:100%;height:100%;object-fit:cover;opacity:.55;}
        .bg-ov{position:absolute;inset:0;background:rgba(0,0,0,.5);}
        .content{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;gap:14px;width:100%;max-width:370px;}

        .card-wrap{width:100%;opacity:0;transform:translateY(20px) scale(.97);transition:all .9s cubic-bezier(.16,1,.3,1);}
        .card-wrap.show{opacity:1;transform:translateY(0) scale(1);}

        /* Card = card.png as base + absolute overlays */
        .card{position:relative;width:100%;border-radius:6px;overflow:hidden;box-shadow:0 0 60px rgba(201,162,39,.3),0 20px 60px rgba(0,0,0,.9);}
        .card-img{width:100%;display:block;}

        /* NAME — ใต้ "You are invited" */
        .ov-name{
          position:absolute;
          top:61%;left:50%;transform:translateX(-50%);
          width:78%;text-align:center;
          font-family:'Cinzel',serif;
          font-size:clamp(13px,4.8vw,22px);
          font-weight:700;
          color:#f5ede0;
          text-shadow:0 0 14px rgba(201,162,39,.7),0 2px 4px rgba(0,0,0,.9);
          line-height:1.25;word-break:break-word;
        }

        /* YEAR — ใต้ชื่อ */
        .ov-year{
          position:absolute;
          top:67%;left:50%;transform:translateX(-50%);
          width:70%;text-align:center;
          font-family:'Cinzel',serif;
          font-size:clamp(9px,3vw,13px);
          color:rgba(201,162,39,.9);
          letter-spacing:3px;
          text-shadow:0 0 8px rgba(201,162,39,.5);
        }

        /* HOUSE — ในกรอบทอง */
        .ov-house{
          position:absolute;
          top:73%;left:50%;transform:translateX(-50%);
          width:65%;
          display:flex;flex-direction:column;align-items:center;gap:4px;
        }
        .ov-house img{
          width:clamp(36px,10vw,52px);
          height:clamp(36px,10vw,52px);
          object-fit:contain;
          filter:drop-shadow(0 0 8px rgba(255,255,255,.3));
        }
        .ov-house-name{
          font-family:'Cinzel',serif;
          font-size:clamp(9px,2.8vw,13px);
          font-weight:600;letter-spacing:2px;
          text-align:center;
        }


        /* Buttons */
        .btn-dl{width:100%;padding:15px;background:linear-gradient(135deg,#4a1e06,#c9a227 40%,#e8c060 50%,#c9a227 60%,#4a1e06);border:none;border-radius:10px;color:#0a0500;font-size:14px;font-family:'Cinzel',serif;font-weight:700;letter-spacing:3px;cursor:pointer;transition:all .2s;box-shadow:0 4px 24px rgba(201,162,39,.4);}
        .btn-dl:hover{box-shadow:0 4px 40px rgba(201,162,39,.65);transform:translateY(-1px);}
        .btn-dl:disabled{opacity:.6;cursor:not-allowed;transform:none;}
        .btn-back{background:none;border:1px solid rgba(201,162,39,.2);border-radius:8px;padding:10px;color:rgba(201,162,39,.45);font-size:11px;font-family:'Cinzel',serif;cursor:pointer;transition:all .2s;width:100%;text-align:center;letter-spacing:2px;}
        .btn-back:hover{border-color:rgba(201,162,39,.5);color:#c9a227;}

        /* Modal */
        .modal{position:fixed;inset:0;z-index:100;background:rgba(0,0,0,.94);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px;gap:16px;animation:fi .3s ease;}
        @keyframes fi{from{opacity:0;}to{opacity:1;}}
        .modal img{max-width:100%;max-height:70dvh;border-radius:6px;box-shadow:0 0 40px rgba(201,162,39,.25);}
        .modal-hint{font-family:'Noto Serif Thai',serif;font-size:15px;color:rgba(201,162,39,.9);text-align:center;line-height:2;}
        .modal-hint span{font-size:11px;color:rgba(201,162,39,.4);display:block;letter-spacing:3px;}
        .modal-close{background:none;border:1px solid rgba(201,162,39,.3);border-radius:8px;padding:10px 32px;color:rgba(201,162,39,.6);font-size:12px;font-family:'Cinzel',serif;cursor:pointer;letter-spacing:2px;}
        .modal-close:hover{border-color:#c9a227;color:#c9a227;}
      `}</style>

      <div className="page">
        <div className="bg">
          <img src="/Photo_Club/background.png" alt=""/>
          <div className="bg-ov"/>
        </div>

        <div className="content">
          <div className={`card-wrap${revealed ? ' show' : ''}`}>
            <div className="card" ref={cardRef}>

              {/* Base card image */}
              <img className="card-img" src="/Photo_Club/card.png" alt="การ์ดเชิญ" crossOrigin="anonymous"/>

              {/* ชื่อ */}
              <div className="ov-name">{data.name}</div>

              {/* ชั้นปี */}
              <div className="ov-year">{data.year}</div>

              {/* บ้าน */}
              <div className="ov-house">
                {houseLogo && (
                  <img src={houseLogo} alt={data.houseName} crossOrigin="anonymous"/>
                )}
                <div className="ov-house-name" style={{ color: data.houseTextColor, textShadow:`0 0 10px ${data.houseAccent}80` }}>
                  {data.houseName} · {data.houseThai}
                </div>
              </div>


            </div>
          </div>

          <button className="btn-dl" disabled={saving} onClick={downloadCard}>
            {saving ? '⏳ กำลังสร้างรูป...' : '💾  บันทึกการ์ดเชิญ'}
          </button>
          <button className="btn-back" onClick={() => router.push('/')}>
            ← กรอกข้อมูลใหม่
          </button>
        </div>
      </div>

      {previewUrl && (
        <div className="modal">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={previewUrl} alt="การ์ดเชิญ"/>
          <div className="modal-hint">
            กดค้างที่รูปเพื่อบันทึกลงเครื่อง
            <span>PRESS &amp; HOLD TO SAVE</span>
          </div>
          <button className="modal-close" onClick={() => setPreviewUrl(null)}>CLOSE</button>
        </div>
      )}
    </>
  );
}
