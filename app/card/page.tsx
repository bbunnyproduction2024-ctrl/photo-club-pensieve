'use client';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

const EVENT = {
  name: 'นิทรรศการภาพถ่าย Pensieve',
  sub: 'อ่างแห่งความทรงจำ',
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

export default function CardPage() {
  const router = useRouter();
  const [data, setData] = useState<Data | null>(null);
  const [saving, setSaving] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem('photoclub');
    if (!raw) { router.replace('/'); return; }
    setData(JSON.parse(raw));
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
      const link = document.createElement('a');
      link.download = `Pensieve-Invitation-${data?.name ?? 'guest'}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } finally {
      setSaving(false);
    }
  };

  if (!data) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100dvh', background:'#080604', color:'#c9a227', fontFamily:'serif' }}>
      กำลังโหลด...
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cinzel:wght@400;500;600&family=Noto+Serif+Thai:wght@300;400;500;600&family=IM+Fell+English+SC&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        body{background:#050302;font-family:'Noto Serif Thai',serif;min-height:100dvh;}
        .page{min-height:100dvh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px 16px 48px;position:relative;overflow:hidden;}
        .bg-blur{position:fixed;inset:0;z-index:0;}
        .bg-blur img{width:100%;height:100%;object-fit:cover;opacity:.12;filter:blur(4px);}
        .bg-blur-overlay{position:absolute;inset:0;background:rgba(5,3,2,.85);}
        .content{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;gap:20px;width:100%;max-width:400px;}

        /* ── Card ── */
        .card{
          width:100%;background:linear-gradient(160deg,#1a0d04 0%,#0e0804 40%,#120a05 70%,#1a0d04 100%);
          border-radius:16px;
          padding:28px 22px 24px;
          position:relative;overflow:hidden;
          box-shadow:0 0 60px rgba(201,162,39,.2),0 20px 60px rgba(0,0,0,.8);
        }
        .card::before{
          content:'';position:absolute;inset:0;
          background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Crect width='1' height='1' fill='rgba(201,162,39,.04)'/%3E%3C/svg%3E");
          border-radius:16px;pointer-events:none;
        }
        .border-outer{position:absolute;inset:6px;border:1.5px solid rgba(201,162,39,.5);border-radius:12px;pointer-events:none;}
        .border-inner{position:absolute;inset:10px;border:1px solid rgba(201,162,39,.2);border-radius:10px;pointer-events:none;}

        /* Corner ornaments */
        .corner{position:absolute;width:18px;height:18px;border-color:#c9a227;border-style:solid;opacity:.7;}
        .c-tl{top:14px;left:14px;border-width:2px 0 0 2px;}
        .c-tr{top:14px;right:14px;border-width:2px 2px 0 0;}
        .c-bl{bottom:14px;left:14px;border-width:0 0 2px 2px;}
        .c-br{bottom:14px;right:14px;border-width:0 2px 2px 0;}

        .card-inner{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;text-align:center;}
        .card-presents{font-family:'Cinzel',serif;font-size:8px;letter-spacing:4px;color:rgba(201,162,39,.6);margin-bottom:10px;}
        .card-logo{width:76px;height:76px;object-fit:contain;margin-bottom:8px;filter:drop-shadow(0 0 12px rgba(201,162,39,.4));}
        .card-title-en{font-family:'Cinzel Decorative',serif;font-size:22px;font-weight:700;color:#c9a227;letter-spacing:1px;text-shadow:0 0 20px rgba(201,162,39,.4);line-height:1.1;margin-bottom:2px;}
        .card-title-th{font-size:11px;color:rgba(201,162,39,.75);letter-spacing:3px;margin-bottom:12px;}

        .gold-divider{width:140px;height:1px;background:linear-gradient(90deg,transparent,#c9a227 40%,#c9a227 60%,transparent);margin:0 auto 12px;position:relative;}
        .gold-divider::before{content:'✦';position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);color:#c9a227;font-size:10px;background:#0e0804;padding:0 6px;}

        .card-welcome{font-size:11px;color:#a08060;letter-spacing:1px;margin-bottom:8px;}
        .card-name{font-family:'Cinzel',serif;font-size:19px;font-weight:600;color:#f0ebe0;letter-spacing:1px;margin-bottom:4px;line-height:1.2;word-break:break-word;}
        .card-year{font-size:12px;color:#a08060;margin-bottom:10px;}

        .house-badge{display:inline-flex;align-items:center;gap:7px;padding:6px 16px;border-radius:999px;font-family:'Cinzel',serif;font-size:11px;font-weight:600;letter-spacing:1px;margin-bottom:14px;border:1px solid;}

        .card-msg{font-size:12px;color:#c8b89a;line-height:1.9;margin-bottom:14px;padding:0 4px;}

        .event-box{width:100%;background:rgba(201,162,39,.06);border:1px solid rgba(201,162,39,.2);border-radius:10px;padding:12px 14px;margin-bottom:14px;text-align:left;}
        .event-box-title{font-family:'Cinzel',serif;font-size:9px;letter-spacing:3px;color:rgba(201,162,39,.6);margin-bottom:8px;text-align:center;}
        .event-row{display:flex;align-items:flex-start;gap:8px;font-size:12px;color:#c8b89a;padding:3px 0;}
        .event-row span:first-child{width:18px;text-align:center;flex-shrink:0;}

        .card-footer{font-size:10px;color:rgba(201,162,39,.5);letter-spacing:1px;line-height:1.6;border-top:1px solid rgba(201,162,39,.15);padding-top:12px;margin-top:2px;}

        /* Buttons outside card */
        .btn-dl{
          width:100%;padding:14px;
          background:linear-gradient(135deg,#6b3a0a,#c9a227 50%,#6b3a0a);
          border:none;border-radius:12px;
          color:#0a0600;font-size:15px;font-family:'Cinzel',serif;font-weight:600;letter-spacing:2px;
          cursor:pointer;transition:opacity .2s;
          box-shadow:0 4px 24px rgba(201,162,39,.35);
        }
        .btn-dl:hover{opacity:.9;}
        .btn-dl:disabled{opacity:.6;cursor:not-allowed;}
        .btn-back{background:none;border:1px solid rgba(201,162,39,.25);border-radius:10px;padding:10px 24px;color:rgba(201,162,39,.6);font-size:13px;font-family:'Cinzel',serif;cursor:pointer;transition:all .2s;width:100%;}
        .btn-back:hover{border-color:rgba(201,162,39,.5);color:#c9a227;}
      `}</style>

      <div className="page">
        <div className="bg-blur">
          <img src="/Photo_Club/pro_photo.png" alt=""/>
          <div className="bg-blur-overlay"/>
        </div>

        <div className="content">
          {/* ── The Invitation Card ── */}
          <div className="card" ref={cardRef}>
            <div className="border-outer"/><div className="border-inner"/>
            <div className="corner c-tl"/><div className="corner c-tr"/>
            <div className="corner c-bl"/><div className="corner c-br"/>

            <div className="card-inner">
              <div className="card-presents">PHOTO CLUB PRESENTS</div>

              <img className="card-logo" src="/Photo_Club/LOGO_Photo_Club.png" alt="Photo Club"/>

              <div className="card-title-en">PENSIEVE</div>
              <div className="card-title-th">อ่างแห่งความทรงจำ</div>

              <div className="gold-divider"/>

              <div className="card-welcome">ยินดีต้อนรับเข้าสู่งาน</div>
              <div className="card-name">{data.name}</div>
              <div className="card-year">{data.year} · จดหมายฉบับที่ {data.letter}</div>

              <div
                className="house-badge"
                style={{
                  background: data.houseBg,
                  color: data.houseTextColor,
                  borderColor: data.houseAccent + '80',
                }}
              >
                <span>{data.houseIcon}</span>
                <span>{data.houseName}</span>
              </div>

              <div className="card-msg">
                นิทรรศการภาพถ่ายแห่งนี้เปิดประตูสู่ความทรงจำ<br/>
                ที่ซ่อนอยู่ในเลนส์ของทุกดวงตา<br/>
                อย่าลืม <strong style={{color:'#c9a227'}}>นำการ์ดเชิญนี้</strong> ไปแสดงตัว<br/>
                ที่หน้างานด้วยนะคะ ✦
              </div>

              <div className="event-box">
                <div className="event-box-title">◆ รายละเอียดงาน ◆</div>
                <div className="event-row"><span>📅</span><span>{EVENT.date}</span></div>
                <div className="event-row"><span>⏰</span><span>{EVENT.time}</span></div>
                <div className="event-row"><span>📍</span><span>{EVENT.venue}</span></div>
              </div>

              <div className="card-footer">
                นิทรรศการภาพถ่าย Pensieve · อ่างแห่งความทรงจำ
              </div>
            </div>
          </div>

          {/* Buttons */}
          <button className="btn-dl" disabled={saving} onClick={downloadCard}>
            {saving ? '⏳ กำลังบันทึก...' : '💾 บันทึกการ์ดเชิญ'}
          </button>
          <button className="btn-back" onClick={() => router.push('/')}>
            ← กรอกข้อมูลใหม่
          </button>
        </div>
      </div>
    </>
  );
}
