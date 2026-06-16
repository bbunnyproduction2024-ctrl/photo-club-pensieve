'use client';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

const EVENT = {
  date: '...',
  venue: '...',
  time: '...',
};

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
        link.download = `Pensieve-Invitation-${data?.name ?? 'guest'}.png`;
        link.href = url;
        link.click();
      }
    } finally {
      setSaving(false);
    }
  };

  if (!data) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100dvh', background:'#080604', color:'#c9a227', fontFamily:'serif' }}>
      กำลังโหลด...
    </div>
  );

  const houseLogo = HOUSE_LOGO[data.houseName.toLowerCase()] ?? '';

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cinzel:wght@400;500;600;700&family=Noto+Serif+Thai:wght@300;400;500;600&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        body{background:#060301;font-family:'Noto Serif Thai',serif;min-height:100dvh;}

        /* PAGE */
        .page{min-height:100dvh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px 16px 40px;position:relative;overflow:hidden;}

        /* BG */
        .bg{position:fixed;inset:0;z-index:0;}
        .bg img{width:100%;height:100%;object-fit:cover;opacity:.15;filter:blur(6px);}
        .bg-ov{position:absolute;inset:0;
          background:
            radial-gradient(ellipse at 50% 100%,rgba(120,60,0,.5) 0%,transparent 55%),
            radial-gradient(ellipse at 50% 0%,rgba(80,35,0,.3) 0%,transparent 45%),
            linear-gradient(180deg,#050200 0%,#0a0400 50%,#050200 100%);
        }
        .bg-vignette{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%,transparent 25%,rgba(0,0,0,.85) 100%);}
        .stars{position:absolute;inset:0;}
        .stars::before,.stars::after{content:'';position:absolute;inset:0;
          background-image:
            radial-gradient(1px 1px at 10% 15%,rgba(201,162,39,.6) 0%,transparent 100%),
            radial-gradient(1px 1px at 28% 42%,rgba(255,255,255,.35) 0%,transparent 100%),
            radial-gradient(1.5px 1.5px at 50% 8%,rgba(201,162,39,.7) 0%,transparent 100%),
            radial-gradient(1px 1px at 72% 28%,rgba(255,255,255,.3) 0%,transparent 100%),
            radial-gradient(1px 1px at 88% 55%,rgba(201,162,39,.5) 0%,transparent 100%),
            radial-gradient(1px 1px at 18% 75%,rgba(255,255,255,.25) 0%,transparent 100%),
            radial-gradient(1.5px 1.5px at 60% 82%,rgba(201,162,39,.5) 0%,transparent 100%),
            radial-gradient(1px 1px at 92% 20%,rgba(255,220,100,.4) 0%,transparent 100%);
          animation:tw 5s ease-in-out infinite alternate;}
        .stars::after{
          background-image:
            radial-gradient(1px 1px at 35% 18%,rgba(201,162,39,.5) 0%,transparent 100%),
            radial-gradient(1px 1px at 78% 65%,rgba(255,255,255,.3) 0%,transparent 100%),
            radial-gradient(1.5px 1.5px at 5% 50%,rgba(201,162,39,.6) 0%,transparent 100%),
            radial-gradient(1px 1px at 55% 90%,rgba(255,220,100,.4) 0%,transparent 100%);
          animation:tw 7s ease-in-out infinite alternate-reverse;}
        @keyframes tw{0%{opacity:.4;}100%{opacity:1;}}

        /* CONTENT */
        .content{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;gap:14px;width:100%;max-width:400px;}

        /* CARD WRAP */
        .card-wrap{width:100%;opacity:0;transform:translateY(30px) scale(.95);transition:all .9s cubic-bezier(.16,1,.3,1);}
        .card-wrap.show{opacity:1;transform:translateY(0) scale(1);}

        /* CARD */
        .card{
          width:100%;position:relative;
          background:
            radial-gradient(ellipse at 50% 100%,rgba(80,35,0,.6) 0%,transparent 60%),
            radial-gradient(ellipse at 50% 0%,rgba(60,25,0,.4) 0%,transparent 50%),
            repeating-linear-gradient(
              105deg,
              transparent 0px, transparent 40px,
              rgba(201,162,39,.015) 40px, rgba(201,162,39,.015) 41px
            ),
            linear-gradient(160deg,#1c0d03 0%,#0d0602 30%,#140a03 60%,#0a0401 100%);
          border-radius:4px;
          padding:32px 24px 28px;
          overflow:hidden;
          animation:glow 5s ease-in-out infinite alternate;
        }
        @keyframes glow{
          0%{box-shadow:0 0 0 1px rgba(201,162,39,.5),0 0 30px rgba(120,60,0,.2),0 0 80px rgba(80,30,0,.15),inset 0 0 60px rgba(0,0,0,.5);}
          100%{box-shadow:0 0 0 1px rgba(201,162,39,.8),0 0 60px rgba(160,90,0,.35),0 0 120px rgba(100,50,0,.25),inset 0 0 60px rgba(0,0,0,.3);}
        }

        /* Borders */
        .b1{position:absolute;inset:6px;border:1.5px solid rgba(201,162,39,.7);border-radius:2px;pointer-events:none;}
        .b2{position:absolute;inset:10px;border:1px solid rgba(201,162,39,.25);border-radius:2px;pointer-events:none;}

        /* Corners */
        .co{position:absolute;width:28px;height:28px;border-color:#c9a227;border-style:solid;opacity:.9;}
        .co-tl{top:12px;left:12px;border-width:2px 0 0 2px;}
        .co-tr{top:12px;right:12px;border-width:2px 2px 0 0;}
        .co-bl{bottom:12px;left:12px;border-width:0 0 2px 2px;}
        .co-br{bottom:12px;right:12px;border-width:0 2px 2px 0;}

        /* Corner diamonds */
        .co-dot{position:absolute;width:6px;height:6px;background:#c9a227;transform:rotate(45deg);opacity:.8;}
        .co-dot.tl{top:9px;left:9px;}
        .co-dot.tr{top:9px;right:9px;}
        .co-dot.bl{bottom:9px;left:9px;}
        .co-dot.br{bottom:9px;right:9px;}

        /* Watermark */
        .card::after{content:'PENSIEVE';position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:'Cinzel Decorative',serif;font-size:56px;font-weight:700;color:rgba(201,162,39,.03);letter-spacing:6px;pointer-events:none;z-index:0;}

        /* INNER */
        .inner{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;text-align:center;}

        /* Top crown ornament */
        .crown-row{display:flex;align-items:center;gap:10px;margin-bottom:10px;}
        .crown-line{flex:1;height:1px;background:linear-gradient(90deg,transparent,rgba(201,162,39,.6));}
        .crown-line.r{background:linear-gradient(270deg,transparent,rgba(201,162,39,.6));}
        .crown-icon{font-size:22px;filter:drop-shadow(0 0 6px rgba(201,162,39,.6));}

        /* Logos row */
        .logos-row{display:flex;align-items:center;justify-content:center;gap:16px;margin-bottom:10px;}
        .main-logo{width:64px;height:64px;object-fit:contain;filter:drop-shadow(0 0 14px rgba(201,162,39,.5));}

        /* Presents */
        .presents{font-family:'Cinzel',serif;font-size:8px;letter-spacing:5px;color:rgba(201,162,39,.55);margin-bottom:8px;}

        /* Gold divider */
        .divider{display:flex;align-items:center;gap:8px;width:100%;margin-bottom:8px;}
        .div-line{flex:1;height:1px;}
        .div-line.l{background:linear-gradient(90deg,transparent,#c9a227);}
        .div-line.r{background:linear-gradient(270deg,transparent,#c9a227);}
        .div-gem{font-size:10px;color:#c9a227;flex-shrink:0;}

        /* Event type */
        .ev-type{font-size:10px;color:rgba(201,162,39,.65);letter-spacing:4px;margin-bottom:4px;}

        /* Title */
        .title{font-family:'Cinzel Decorative',serif;font-size:30px;font-weight:700;color:#c9a227;line-height:1;letter-spacing:2px;text-shadow:0 0 30px rgba(201,162,39,.6),0 0 60px rgba(201,162,39,.3);margin-bottom:4px;}
        .title-th{font-size:11px;color:rgba(201,162,39,.65);letter-spacing:4px;margin-bottom:12px;}

        /* Welcome */
        .welcome{font-size:10px;color:#987050;letter-spacing:2px;margin-bottom:6px;}
        .name{font-family:'Cinzel',serif;font-size:22px;font-weight:700;color:#f5ede0;letter-spacing:1px;line-height:1.2;word-break:break-word;text-shadow:0 0 20px rgba(255,255,255,.15);margin-bottom:4px;}
        .year-txt{font-size:11px;color:#987050;letter-spacing:2px;margin-bottom:12px;}

        /* House badge */
        .house-row{display:flex;align-items:center;gap:10px;padding:8px 16px;border-radius:999px;border:1px solid;margin-bottom:14px;}
        .house-logo-sm{width:28px;height:28px;object-fit:contain;}
        .house-name-txt{font-family:'Cinzel',serif;font-size:11px;font-weight:600;letter-spacing:2px;}

        /* Event box */
        .ev-box{width:100%;background:rgba(201,162,39,.05);border:1px solid rgba(201,162,39,.2);border-radius:4px;padding:12px 16px;margin-bottom:12px;text-align:left;}
        .ev-box-title{font-family:'Cinzel',serif;font-size:8px;letter-spacing:4px;color:rgba(201,162,39,.5);text-align:center;margin-bottom:10px;}
        .ev-row{display:flex;align-items:flex-start;gap:8px;font-size:11px;color:#c0a07a;padding:4px 0;border-bottom:1px solid rgba(201,162,39,.08);}
        .ev-row:last-child{border-bottom:none;}
        .ev-icon{width:16px;text-align:center;flex-shrink:0;font-size:11px;}
        .ev-label{font-family:'Cinzel',serif;font-size:7px;letter-spacing:2px;color:rgba(201,162,39,.45);display:block;margin-bottom:1px;}

        /* Message */
        .msg{font-size:10px;color:#987050;line-height:2;letter-spacing:.5px;margin-bottom:10px;font-style:italic;}
        .msg strong{color:#c9a227;font-style:normal;}

        /* Footer */
        .footer{font-family:'Cinzel',serif;font-size:7px;letter-spacing:3px;color:rgba(201,162,39,.35);margin-top:4px;}

        /* BUTTONS */
        .btn-dl{width:100%;padding:15px;background:linear-gradient(135deg,#4a1e06,#c9a227 40%,#e8c060 50%,#c9a227 60%,#4a1e06);border:none;border-radius:4px;color:#0a0500;font-size:14px;font-family:'Cinzel',serif;font-weight:700;letter-spacing:3px;cursor:pointer;transition:all .2s;box-shadow:0 4px 30px rgba(201,162,39,.4);}
        .btn-dl:hover{box-shadow:0 4px 50px rgba(201,162,39,.7);transform:translateY(-1px);}
        .btn-dl:disabled{opacity:.6;cursor:not-allowed;transform:none;}
        .btn-back{background:none;border:1px solid rgba(201,162,39,.15);border-radius:4px;padding:10px;color:rgba(201,162,39,.4);font-size:11px;font-family:'Cinzel',serif;cursor:pointer;transition:all .2s;width:100%;text-align:center;letter-spacing:2px;}
        .btn-back:hover{border-color:rgba(201,162,39,.4);color:#c9a227;}

        /* MODAL */
        .modal{position:fixed;inset:0;z-index:100;background:rgba(0,0,0,.94);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px;gap:16px;animation:fi .3s ease;}
        @keyframes fi{from{opacity:0;}to{opacity:1;}}
        .modal img{max-width:100%;max-height:70dvh;border-radius:4px;box-shadow:0 0 40px rgba(201,162,39,.3);}
        .modal-hint{font-family:'Noto Serif Thai',serif;font-size:15px;color:rgba(201,162,39,.9);text-align:center;line-height:2;}
        .modal-hint span{font-size:11px;color:rgba(201,162,39,.45);display:block;letter-spacing:2px;}
        .modal-close{background:none;border:1px solid rgba(201,162,39,.3);border-radius:4px;padding:10px 32px;color:rgba(201,162,39,.6);font-size:12px;font-family:'Cinzel',serif;cursor:pointer;transition:all .2s;letter-spacing:2px;}
        .modal-close:hover{border-color:#c9a227;color:#c9a227;}
      `}</style>

      <div className="page">
        <div className="bg">
          <img src="/Photo_Club/pro_photo.png" alt=""/>
          <div className="bg-ov"/>
          <div className="bg-vignette"/>
          <div className="stars"/>
        </div>

        <div className="content">
          <div className={`card-wrap${revealed ? ' show' : ''}`}>
            <div className="card" ref={cardRef}>
              <div className="b1"/><div className="b2"/>
              <div className="co co-tl"/><div className="co co-tr"/>
              <div className="co co-bl"/><div className="co co-br"/>
              <div className="co-dot tl"/><div className="co-dot tr"/>
              <div className="co-dot bl"/><div className="co-dot br"/>

              <div className="inner">
                {/* Crown */}
                <div className="crown-row">
                  <div className="crown-line"/>
                  <div className="crown-icon">👑</div>
                  <div className="crown-line r"/>
                </div>

                {/* Main logo */}
                <div className="logos-row">
                  <img className="main-logo" src="/Photo_Club/LOGO_Photo_Club.png" alt="Photo Club"/>
                </div>

                <div className="presents">PHOTO CLUB PRESENTS</div>

                <div className="divider">
                  <div className="div-line l"/>
                  <div className="div-gem">✦</div>
                  <div className="div-line r"/>
                </div>

                <div className="ev-type">นิทรรศการภาพถ่าย</div>
                <div className="title">PENSIEVE</div>
                <div className="title-th">อ่างแห่งความทรงจำ</div>

                <div className="divider">
                  <div className="div-line l"/>
                  <div className="div-gem">◆</div>
                  <div className="div-line r"/>
                </div>

                <div className="welcome">— ยินดีต้อนรับเข้าสู่งาน —</div>
                <div className="name">{data.name}</div>
                <div className="year-txt">{data.year}</div>

                {/* House badge */}
                <div className="house-row" style={{background: data.houseBg + '33', borderColor: data.houseAccent + '60', color: data.houseTextColor}}>
                  {houseLogo && <img className="house-logo-sm" src={houseLogo} alt={data.houseName}/>}
                  <div className="house-name-txt">{data.houseName} · {data.houseThai}</div>
                </div>

                {/* Event details */}
                <div className="ev-box">
                  <div className="ev-box-title">◆ &nbsp; รายละเอียดงาน &nbsp; ◆</div>
                  <div className="ev-row">
                    <span className="ev-icon">📅</span>
                    <span><span className="ev-label">DATE</span>{EVENT.date}</span>
                  </div>
                  <div className="ev-row">
                    <span className="ev-icon">⏰</span>
                    <span><span className="ev-label">TIME</span>{EVENT.time}</span>
                  </div>
                  <div className="ev-row">
                    <span className="ev-icon">📍</span>
                    <span><span className="ev-label">VENUE</span>{EVENT.venue}</span>
                  </div>
                </div>

                <div className="msg">
                  อย่าลืม <strong>นำการ์ดเชิญนี้</strong> ไปแสดงตัวที่หน้างานด้วยนะคะ
                </div>

                <div className="divider">
                  <div className="div-line l"/>
                  <div className="div-gem">✦</div>
                  <div className="div-line r"/>
                </div>

                <div className="footer">PENSIEVE · PHOTO CLUB · นิทรรศการภาพถ่าย</div>
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
