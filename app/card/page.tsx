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
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cinzel:wght@400;500;600&family=Noto+Serif+Thai:wght@300;400;500;600&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        body{background:#050302;font-family:'Noto Serif Thai',serif;min-height:100dvh;}

        /* ── Page ── */
        .page{min-height:100dvh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px 12px 40px;position:relative;overflow:hidden;}

        /* ── Background ── */
        .bg{position:fixed;inset:0;z-index:0;}
        .bg img{width:100%;height:100%;object-fit:cover;opacity:.2;filter:blur(3px);}
        .bg-ov{position:absolute;inset:0;
          background:
            radial-gradient(ellipse at 50% 0%,rgba(100,50,0,.6) 0%,transparent 55%),
            radial-gradient(ellipse at 50% 100%,rgba(60,20,0,.5) 0%,transparent 50%),
            linear-gradient(180deg,#060302 0%,#0a0500 50%,#060302 100%);
        }
        .bg-vignette{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%,transparent 30%,rgba(0,0,0,.75) 100%);}
        .stars{position:absolute;inset:0;}
        .stars::before,.stars::after{content:'';position:absolute;inset:0;
          background-image:
            radial-gradient(1px 1px at 8% 12%,rgba(201,162,39,.7) 0%,transparent 100%),
            radial-gradient(1px 1px at 22% 38%,rgba(255,255,255,.4) 0%,transparent 100%),
            radial-gradient(1px 1px at 45% 8%,rgba(201,162,39,.6) 0%,transparent 100%),
            radial-gradient(1.5px 1.5px at 65% 25%,rgba(255,220,100,.5) 0%,transparent 100%),
            radial-gradient(1px 1px at 80% 55%,rgba(255,255,255,.35) 0%,transparent 100%),
            radial-gradient(1px 1px at 92% 18%,rgba(201,162,39,.6) 0%,transparent 100%),
            radial-gradient(1px 1px at 15% 72%,rgba(255,255,255,.3) 0%,transparent 100%),
            radial-gradient(1.5px 1.5px at 55% 80%,rgba(201,162,39,.5) 0%,transparent 100%),
            radial-gradient(1px 1px at 35% 60%,rgba(255,255,255,.25) 0%,transparent 100%),
            radial-gradient(1px 1px at 75% 88%,rgba(201,162,39,.4) 0%,transparent 100%);
          animation:twinkle 5s ease-in-out infinite alternate;}
        .stars::after{
          background-image:
            radial-gradient(1px 1px at 18% 22%,rgba(201,162,39,.5) 0%,transparent 100%),
            radial-gradient(1px 1px at 40% 48%,rgba(255,255,255,.3) 0%,transparent 100%),
            radial-gradient(1.5px 1.5px at 70% 15%,rgba(201,162,39,.7) 0%,transparent 100%),
            radial-gradient(1px 1px at 88% 70%,rgba(255,255,255,.4) 0%,transparent 100%),
            radial-gradient(1px 1px at 6% 90%,rgba(201,162,39,.4) 0%,transparent 100%);
          animation:twinkle 7s ease-in-out infinite alternate-reverse;}
        @keyframes twinkle{0%{opacity:.5;}100%{opacity:1;}}

        /* ── Content wrapper ── */
        .content{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;gap:16px;width:100%;max-width:680px;}

        /* ── Card (landscape) ── */
        .card-wrap{
          width:100%;
          opacity:0;transform:scale(.92) translateY(20px);
          transition:opacity .8s ease,transform .8s ease;
        }
        .card-wrap.show{opacity:1;transform:scale(1) translateY(0);}

        .card{
          width:100%;
          background:linear-gradient(135deg,#12080300 0%,#0e0703 100%);
          border-radius:20px;
          position:relative;overflow:hidden;
          box-shadow:0 0 0 1px rgba(201,162,39,.5),0 0 60px rgba(150,90,0,.3),0 20px 80px rgba(0,0,0,.9);
          display:flex;flex-direction:row;
          min-height:220px;
          animation:cardPulse 5s ease-in-out infinite alternate;
        }
        @keyframes cardPulse{
          0%{box-shadow:0 0 0 1px rgba(201,162,39,.4),0 0 40px rgba(150,90,0,.2),0 20px 80px rgba(0,0,0,.9);}
          100%{box-shadow:0 0 0 1px rgba(201,162,39,.7),0 0 90px rgba(180,110,0,.4),0 20px 80px rgba(0,0,0,.9);}
        }

        /* watermark */
        .card::after{
          content:'PENSIEVE';
          position:absolute;inset:0;
          display:flex;align-items:center;justify-content:center;
          font-family:'Cinzel Decorative',serif;font-size:72px;font-weight:700;
          color:rgba(201,162,39,.04);letter-spacing:8px;pointer-events:none;z-index:0;
        }

        /* Left panel — house color */
        .card-left{
          width:38%;flex-shrink:0;
          display:flex;flex-direction:column;align-items:center;justify-content:center;
          padding:24px 16px;
          position:relative;z-index:1;
          gap:10px;
        }
        .card-left::after{
          content:'';position:absolute;right:0;top:10%;bottom:10%;
          width:1px;background:linear-gradient(180deg,transparent,rgba(201,162,39,.6) 30%,rgba(201,162,39,.6) 70%,transparent);
        }
        .house-glow{
          position:absolute;inset:0;
          opacity:.18;
          border-radius:20px 0 0 20px;
        }
        .house-logo-big{width:80px;height:80px;object-fit:contain;filter:drop-shadow(0 0 16px rgba(255,255,255,.3));position:relative;z-index:1;}
        .house-name-big{font-family:'Cinzel',serif;font-size:13px;font-weight:600;letter-spacing:2px;text-align:center;position:relative;z-index:1;}
        .house-thai-big{font-size:11px;opacity:.75;text-align:center;position:relative;z-index:1;}
        .house-deco{font-size:18px;position:relative;z-index:1;}

        /* Right panel */
        .card-right{
          flex:1;display:flex;flex-direction:column;justify-content:center;
          padding:22px 22px 22px 24px;
          position:relative;z-index:1;
          background:linear-gradient(135deg,rgba(20,10,2,.3) 0%,rgba(10,5,1,.5) 100%);
        }
        .r-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;}
        .r-presents{font-family:'Cinzel',serif;font-size:7px;letter-spacing:4px;color:rgba(201,162,39,.55);}
        .r-logo{width:36px;height:36px;object-fit:contain;filter:drop-shadow(0 0 8px rgba(201,162,39,.4));}
        .r-divider{display:flex;align-items:center;gap:6px;margin-bottom:8px;}
        .r-divider-bar{flex:1;height:1px;background:linear-gradient(90deg,rgba(201,162,39,.6),transparent);}
        .r-divider-dot{font-size:8px;color:rgba(201,162,39,.7);}
        .r-event-type{font-size:9px;color:rgba(201,162,39,.6);letter-spacing:3px;margin-bottom:2px;}
        .r-title{font-family:'Cinzel Decorative',serif;font-size:22px;font-weight:700;color:#c9a227;text-shadow:0 0 20px rgba(201,162,39,.5);line-height:1;margin-bottom:2px;}
        .r-title-th{font-size:10px;color:rgba(201,162,39,.65);letter-spacing:2px;margin-bottom:10px;}
        .r-divider2{display:flex;align-items:center;gap:6px;margin-bottom:10px;}
        .r-divider2-bar{flex:1;height:1px;background:linear-gradient(90deg,rgba(201,162,39,.4),transparent);}
        .r-divider2-dot{font-size:8px;color:rgba(201,162,39,.5);}
        .r-welcome{font-size:9px;color:#a08060;letter-spacing:2px;margin-bottom:4px;}
        .r-name{font-family:'Cinzel',serif;font-size:18px;font-weight:600;color:#f0ebe0;letter-spacing:1px;line-height:1.2;word-break:break-word;margin-bottom:3px;text-shadow:0 0 10px rgba(255,255,255,.1);}
        .r-year{font-size:10px;color:#a08060;margin-bottom:10px;letter-spacing:1px;}
        .r-meta{display:flex;flex-direction:column;gap:3px;}
        .r-meta-row{display:flex;align-items:center;gap:6px;font-size:10px;color:#b09878;}
        .r-meta-icon{font-size:10px;width:14px;text-align:center;flex-shrink:0;}

        /* border ornaments */
        .b-outer{position:absolute;inset:5px;border:1px solid rgba(201,162,39,.35);border-radius:16px;pointer-events:none;z-index:2;}
        .corner{position:absolute;width:16px;height:16px;border-color:#c9a227;border-style:solid;opacity:.8;z-index:3;}
        .c-tl{top:10px;left:10px;border-width:2px 0 0 2px;}
        .c-tr{top:10px;right:10px;border-width:2px 2px 0 0;}
        .c-bl{bottom:10px;left:10px;border-width:0 0 2px 2px;}
        .c-br{bottom:10px;right:10px;border-width:0 2px 2px 0;}

        /* ── Buttons ── */
        .btn-dl{
          width:100%;padding:14px;
          background:linear-gradient(135deg,#5a2e08,#c9a227 50%,#5a2e08);
          border:none;border-radius:12px;
          color:#0a0600;font-size:15px;font-family:'Cinzel',serif;font-weight:600;letter-spacing:2px;
          cursor:pointer;transition:all .2s;
          box-shadow:0 4px 24px rgba(201,162,39,.4);
        }
        .btn-dl:hover{opacity:.9;box-shadow:0 4px 40px rgba(201,162,39,.6);}
        .btn-dl:disabled{opacity:.6;cursor:not-allowed;}
        .btn-back{background:none;border:1px solid rgba(201,162,39,.2);border-radius:10px;padding:10px;color:rgba(201,162,39,.5);font-size:12px;font-family:'Cinzel',serif;cursor:pointer;transition:all .2s;width:100%;text-align:center;}
        .btn-back:hover{border-color:rgba(201,162,39,.5);color:#c9a227;}

        /* Preview modal */
        .modal{position:fixed;inset:0;z-index:100;background:rgba(0,0,0,.92);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px;gap:16px;animation:fadeIn .3s ease;}
        @keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
        .modal img{max-width:100%;max-height:70dvh;border-radius:12px;box-shadow:0 0 40px rgba(201,162,39,.3);}
        .modal-hint{font-family:'Noto Serif Thai',serif;font-size:14px;color:rgba(201,162,39,.9);text-align:center;letter-spacing:1px;line-height:1.8;}
        .modal-hint span{font-size:12px;color:rgba(201,162,39,.5);display:block;margin-top:4px;}
        .modal-close{background:none;border:1px solid rgba(201,162,39,.3);border-radius:10px;padding:10px 28px;color:rgba(201,162,39,.6);font-size:13px;font-family:'Cinzel',serif;cursor:pointer;transition:all .2s;}
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
              {/* ornaments */}
              <div className="b-outer"/>
              <div className="corner c-tl"/><div className="corner c-tr"/>
              <div className="corner c-bl"/><div className="corner c-br"/>

              {/* LEFT — house panel */}
              <div className="card-left">
                <div className="house-glow" style={{background: data.houseBg}}/>
                <div className="house-deco">✦</div>
                <img className="house-logo-big" src={houseLogo || ''} alt={data.houseName}/>
                <div className="house-name-big" style={{color: data.houseTextColor}}>{data.houseName}</div>
                <div className="house-thai-big" style={{color: data.houseTextColor}}>{data.houseThai}</div>
                <div className="house-deco">✦</div>
              </div>

              {/* RIGHT — info panel */}
              <div className="card-right">
                <div className="r-top">
                  <div className="r-presents">PHOTO CLUB PRESENTS</div>
                  <img className="r-logo" src="/Photo_Club/LOGO_Photo_Club.png" alt="Photo Club"/>
                </div>
                <div className="r-divider">
                  <div className="r-divider-bar"/>
                  <div className="r-divider-dot">✦</div>
                </div>
                <div className="r-event-type">นิทรรศการภาพถ่าย</div>
                <div className="r-title">PENSIEVE</div>
                <div className="r-title-th">อ่างแห่งความทรงจำ</div>
                <div className="r-divider2">
                  <div className="r-divider2-bar"/>
                  <div className="r-divider2-dot">◆</div>
                </div>
                <div className="r-welcome">ยินดีต้อนรับเข้าสู่งาน</div>
                <div className="r-name">{data.name}</div>
                <div className="r-year">{data.year}</div>
                <div className="r-meta">
                  <div className="r-meta-row"><span className="r-meta-icon">📅</span><span>{EVENT.date}</span></div>
                  <div className="r-meta-row"><span className="r-meta-icon">⏰</span><span>{EVENT.time}</span></div>
                  <div className="r-meta-row"><span className="r-meta-icon">📍</span><span>{EVENT.venue}</span></div>
                </div>
              </div>
            </div>
          </div>

          <button className="btn-dl" disabled={saving} onClick={downloadCard}>
            {saving ? '⏳ กำลังสร้างรูป...' : '💾 บันทึกการ์ดเชิญ'}
          </button>
          <button className="btn-back" onClick={() => router.push('/')}>
            ← กรอกข้อมูลใหม่
          </button>
        </div>
      </div>

      {/* Mobile preview modal */}
      {previewUrl && (
        <div className="modal">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={previewUrl} alt="การ์ดเชิญ"/>
          <div className="modal-hint">
            กดค้างที่รูปเพื่อบันทึกลงเครื่อง
            <span>Press & hold the image to save</span>
          </div>
          <button className="modal-close" onClick={() => setPreviewUrl(null)}>
            ปิด
          </button>
        </div>
      )}
    </>
  );
}
