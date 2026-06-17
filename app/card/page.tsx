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

const VENUE = 'ห้องนิทรรศการภาพถ่าย';

const CARD_METEORS = [
  { left:'18%', dur:6.0, del:0,   angle:14, travel:'112vh' },
  { left:'45%', dur:7.5, del:4.2, angle:17, travel:'108vh' },
  { left:'70%', dur:5.5, del:8.0, angle:13, travel:'115vh' },
  { left:'85%', dur:8.0, del:2.5, angle:16, travel:'110vh' },
  { left:'32%', dur:6.5, del:6.5, angle:15, travel:'113vh' },
];

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
        .bg img{width:100%;height:100%;object-fit:cover;opacity:.5;}
        .bg-ov{position:absolute;inset:0;background:rgba(0,0,0,.45);}

        /* STARS */
        .stars{position:absolute;inset:0;overflow:hidden;opacity:.8;}
        .stars::before{content:'';position:absolute;inset:0;background-image:
          radial-gradient(1px 1px at 4% 8%,rgba(255,255,255,.55) 0%,transparent 100%),
          radial-gradient(1.5px 1.5px at 10% 22%,rgba(201,162,39,.7) 0%,transparent 100%),
          radial-gradient(1px 1px at 17% 5%,rgba(255,240,180,.5) 0%,transparent 100%),
          radial-gradient(1px 1px at 23% 38%,rgba(255,255,255,.4) 0%,transparent 100%),
          radial-gradient(2px 2px at 29% 14%,rgba(201,162,39,.65) 0%,transparent 100%),
          radial-gradient(1px 1px at 36% 48%,rgba(255,255,255,.35) 0%,transparent 100%),
          radial-gradient(1px 1px at 42% 6%,rgba(201,162,39,.6) 0%,transparent 100%),
          radial-gradient(1.5px 1.5px at 49% 30%,rgba(255,220,100,.55) 0%,transparent 100%),
          radial-gradient(1px 1px at 55% 18%,rgba(255,255,255,.45) 0%,transparent 100%),
          radial-gradient(1px 1px at 62% 42%,rgba(201,162,39,.5) 0%,transparent 100%),
          radial-gradient(2px 2px at 68% 9%,rgba(201,162,39,.7) 0%,transparent 100%),
          radial-gradient(1px 1px at 74% 55%,rgba(255,255,255,.3) 0%,transparent 100%),
          radial-gradient(1px 1px at 80% 20%,rgba(201,162,39,.6) 0%,transparent 100%),
          radial-gradient(1.5px 1.5px at 87% 35%,rgba(255,240,180,.55) 0%,transparent 100%),
          radial-gradient(1px 1px at 93% 12%,rgba(255,255,255,.5) 0%,transparent 100%),
          radial-gradient(1px 1px at 7% 62%,rgba(201,162,39,.45) 0%,transparent 100%),
          radial-gradient(1.5px 1.5px at 33% 70%,rgba(255,255,255,.4) 0%,transparent 100%),
          radial-gradient(1px 1px at 58% 65%,rgba(201,162,39,.5) 0%,transparent 100%),
          radial-gradient(1px 1px at 78% 72%,rgba(255,240,180,.4) 0%,transparent 100%),
          radial-gradient(1px 1px at 96% 58%,rgba(255,255,255,.35) 0%,transparent 100%);
          animation:twinkle 4s ease-in-out infinite alternate;}
        .stars::after{content:'';position:absolute;inset:0;background-image:
          radial-gradient(1px 1px at 2% 35%,rgba(201,162,39,.5) 0%,transparent 100%),
          radial-gradient(1px 1px at 13% 52%,rgba(255,255,255,.4) 0%,transparent 100%),
          radial-gradient(2px 2px at 20% 16%,rgba(201,162,39,.65) 0%,transparent 100%),
          radial-gradient(1px 1px at 27% 60%,rgba(255,240,180,.45) 0%,transparent 100%),
          radial-gradient(1px 1px at 38% 26%,rgba(255,255,255,.5) 0%,transparent 100%),
          radial-gradient(1.5px 1.5px at 45% 75%,rgba(201,162,39,.55) 0%,transparent 100%),
          radial-gradient(1px 1px at 52% 50%,rgba(255,255,255,.35) 0%,transparent 100%),
          radial-gradient(1px 1px at 60% 80%,rgba(201,162,39,.45) 0%,transparent 100%),
          radial-gradient(2px 2px at 66% 28%,rgba(255,240,180,.6) 0%,transparent 100%),
          radial-gradient(1px 1px at 71% 88%,rgba(255,255,255,.3) 0%,transparent 100%),
          radial-gradient(1px 1px at 76% 45%,rgba(201,162,39,.55) 0%,transparent 100%),
          radial-gradient(1.5px 1.5px at 83% 65%,rgba(255,255,255,.45) 0%,transparent 100%),
          radial-gradient(1px 1px at 90% 80%,rgba(201,162,39,.4) 0%,transparent 100%),
          radial-gradient(1px 1px at 97% 42%,rgba(255,240,180,.5) 0%,transparent 100%),
          radial-gradient(1px 1px at 15% 85%,rgba(255,255,255,.35) 0%,transparent 100%),
          radial-gradient(1.5px 1.5px at 44% 90%,rgba(201,162,39,.5) 0%,transparent 100%),
          radial-gradient(1px 1px at 64% 92%,rgba(255,255,255,.3) 0%,transparent 100%),
          radial-gradient(1px 1px at 85% 88%,rgba(201,162,39,.45) 0%,transparent 100%),
          radial-gradient(2px 2px at 50% 3%,rgba(201,162,39,.7) 0%,transparent 100%),
          radial-gradient(1px 1px at 8% 78%,rgba(255,240,180,.4) 0%,transparent 100%);
          animation:twinkle 6s ease-in-out infinite alternate-reverse;}
        @keyframes twinkle{0%{opacity:.5;}100%{opacity:1;}}

        /* METEORS */
        .meteors{position:absolute;inset:0;overflow:hidden;pointer-events:none;opacity:.8;}
        .meteor{
          position:absolute;top:-2px;width:1px;height:0;
          background:linear-gradient(180deg,rgba(255,255,255,0) 0%,rgba(255,240,180,.35) 50%,rgba(201,162,39,.45) 100%);
          border-radius:0 0 1px 1px;box-shadow:0 0 1px rgba(201,162,39,.2);
          transform-origin:top center;animation:meteor-fall linear infinite;
        }
        @keyframes meteor-fall{
          0%  {height:0;opacity:0;transform:rotate(var(--angle)) translateY(0);}
          8%  {height:0;opacity:0;}
          20% {height:35px;opacity:.35;}
          75% {height:45px;opacity:.25;}
          92% {height:20px;opacity:.05;}
          100%{height:0;opacity:0;transform:rotate(var(--angle)) translateY(var(--travel));}
        }

        /* PARTICLES */
        .particles{position:absolute;inset:0;overflow:hidden;pointer-events:none;opacity:.8;}
        .p{position:absolute;bottom:-10px;width:2px;height:2px;border-radius:50%;background:rgba(201,162,39,.7);animation:rise linear infinite;}
        .p:nth-child(1) {left:4%;  animation-duration:10s;animation-delay:0s;   width:1.5px;height:1.5px;}
        .p:nth-child(2) {left:14%; animation-duration:14s;animation-delay:2s;   background:rgba(255,220,100,.5);}
        .p:nth-child(3) {left:26%; animation-duration:9s; animation-delay:5s;   width:1px;height:1px;}
        .p:nth-child(4) {left:40%; animation-duration:12s;animation-delay:1s;}
        .p:nth-child(5) {left:55%; animation-duration:11s;animation-delay:7s;   width:3px;height:3px;background:rgba(255,220,100,.4);}
        .p:nth-child(6) {left:68%; animation-duration:8s; animation-delay:3s;   width:1.5px;height:1.5px;}
        .p:nth-child(7) {left:80%; animation-duration:13s;animation-delay:0.5s; background:rgba(255,240,180,.5);}
        .p:nth-child(8) {left:92%; animation-duration:10s;animation-delay:4s;   width:1px;height:1px;}
        @keyframes rise{0%{transform:translateY(0);opacity:0;}8%{opacity:.85;}75%{opacity:.45;}100%{transform:translateY(-100vh);opacity:0;}}
        .content{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;gap:14px;width:100%;max-width:370px;}

        .card-wrap{width:100%;opacity:0;transform:translateY(20px) scale(.97);transition:all .9s cubic-bezier(.16,1,.3,1);}
        .card-wrap.show{opacity:1;transform:translateY(0) scale(1);}

        /* Card = card.png as base + absolute overlays */
        .card{position:relative;width:100%;border-radius:6px;overflow:hidden;box-shadow:0 0 60px rgba(201,162,39,.3),0 20px 60px rgba(0,0,0,.9);}
        .card-img{width:100%;display:block;}

        /* NAME — กลางกรอบชื่อ */
        .ov-name{
          position:absolute;
          top:53%;left:50%;transform:translate(-50%,-50%);
          width:76%;text-align:center;
          font-family:'Cinzel',serif;
          font-size:clamp(12px,4.2vw,20px);
          font-weight:700;
          color:#f5ede0;
          text-shadow:0 0 14px rgba(201,162,39,.7),0 2px 4px rgba(0,0,0,.9);
          line-height:1.25;word-break:break-word;
        }

        /* YEAR — บนกรอบบ้าน */
        .ov-year{
          position:absolute;
          top:60%;left:50%;transform:translate(-50%,-50%);
          width:70%;text-align:center;
          font-family:'Cinzel',serif;
          font-size:clamp(8px,2.6vw,12px);
          color:rgba(201,162,39,.9);
          letter-spacing:3px;
          text-shadow:0 0 8px rgba(201,162,39,.5);
        }

        /* HOUSE — logo ซ้าย + ชื่อขวา */
        .ov-house{
          position:absolute;
          top:67%;left:50%;transform:translate(-50%,-50%);
          width:62%;
          display:flex;flex-direction:row;align-items:center;justify-content:center;gap:8px;
        }
        .ov-house img{
          width:clamp(28px,8vw,40px);
          height:clamp(28px,8vw,40px);
          object-fit:contain;
          filter:drop-shadow(0 0 6px rgba(255,255,255,.3));
        }
        /* VENUE — แถว VENUE ในส่วนรายละเอียดงาน */
        .ov-venue{
          position:absolute;
          top:91%;left:21%;
          width:74%;
          font-family:'Noto Serif Thai',serif;
          font-size:clamp(7px,2vw,10px);
          color:#e8d8b0;
          letter-spacing:.5px;
          line-height:1.3;
        }

        .ov-house-name{
          font-family:'Cinzel',serif;
          font-size:clamp(9px,2.8vw,13px);
          font-weight:600;letter-spacing:2px;
          text-align:left;
          white-space:nowrap;
        }


        /* Buttons */
        .btn-dl{width:100%;padding:15px;background:linear-gradient(135deg,#4a1e06,#c9a227 40%,#e8c060 50%,#c9a227 60%,#4a1e06);border:none;border-radius:10px;color:#0a0500;font-size:14px;font-family:'Cinzel',serif;font-weight:700;letter-spacing:3px;cursor:pointer;transition:all .2s;box-shadow:0 4px 24px rgba(201,162,39,.4);}
        .btn-dl:hover{box-shadow:0 4px 40px rgba(201,162,39,.65);transform:translateY(-1px);}
        .btn-dl:disabled{opacity:.8;cursor:not-allowed;transform:none;}
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
          <div className="stars"/>
          <div className="meteors">
            {CARD_METEORS.map((m, i) => (
              <div key={i} className="meteor" style={{
                left: m.left,
                animationDuration: `${m.dur}s`,
                animationDelay: `${m.del}s`,
                '--angle': `${m.angle}deg`,
                '--travel': m.travel,
              } as React.CSSProperties}/>
            ))}
          </div>
          <div className="particles">
            {[...Array(8)].map((_,i) => <div key={i} className="p"/>)}
          </div>
        </div>

        <div className="content">
          <div className={`card-wrap${revealed ? ' show' : ''}`}>
            <div className="card" ref={cardRef}>

              {/* Base card image */}
              <img className="card-img" src="/Photo_Club/card.png" alt="การ์ดเชิญ"/>

              {/* ชื่อ */}
              <div className="ov-name">{data.name}</div>

              {/* ชั้นปี */}
              <div className="ov-year">{data.year}</div>

              {/* สถานที่ */}
              <div className="ov-venue">{VENUE}</div>

              {/* บ้าน */}
              <div className="ov-house">
                {houseLogo && (
                  <img src={houseLogo} alt={data.houseName}/>
                )}
                <div className="ov-house-name" style={{ color:'#A89060', textShadow:'0 0 10px rgba(164,136,96,.5)' }}>
                  {data.houseName}
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
