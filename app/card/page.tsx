'use client';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

const EVENT = { date: '...', venue: '...', time: '...' };

type Data = {
  name: string; houseName: string; houseThai: string;
  houseAccent: string; houseBg: string; houseTextColor: string;
  houseIcon: string; year: string; letter: string;
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
      const canvas = await h2c(cardRef.current, { scale: 3, backgroundColor: null, useCORS: true, logging: false });
      const link = document.createElement('a');
      link.download = `Pensieve-${data?.name ?? 'invitation'}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } finally { setSaving(false); }
  };

  if (!data) return <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100dvh',background:'#080604',color:'#c9a227',fontFamily:'serif'}}>กำลังโหลด...</div>;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cinzel:wght@400;500;600&family=Noto+Serif+Thai:wght@300;400;500;600&display=swap');
        body{font-family:'Noto Serif Thai',serif;}
        .page{min-height:100dvh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px 16px 48px;position:relative;overflow:hidden;}
        .bg{position:fixed;inset:0;z-index:0;}
        .bg img{width:100%;height:100%;object-fit:cover;opacity:.12;filter:blur(4px);}
        .bg-over{position:absolute;inset:0;background:rgba(5,3,2,.85);}
        .wrap{position:relative;z-index:1;width:100%;max-width:400px;display:flex;flex-direction:column;align-items:center;gap:16px;}

        /* Card */
        .card{width:100%;background:linear-gradient(160deg,#1a0d04 0%,#0e0804 40%,#120a05 70%,#1a0d04 100%);border-radius:16px;padding:28px 22px 24px;position:relative;overflow:hidden;box-shadow:0 0 60px rgba(201,162,39,.2),0 20px 60px rgba(0,0,0,.8);}
        .b-out{position:absolute;inset:6px;border:1.5px solid rgba(201,162,39,.5);border-radius:12px;pointer-events:none;}
        .b-in{position:absolute;inset:10px;border:1px solid rgba(201,162,39,.2);border-radius:10px;pointer-events:none;}
        .cor{position:absolute;width:18px;height:18px;border-color:#c9a227;border-style:solid;opacity:.7;}
        .c1{top:14px;left:14px;border-width:2px 0 0 2px;}
        .c2{top:14px;right:14px;border-width:2px 2px 0 0;}
        .c3{bottom:14px;left:14px;border-width:0 0 2px 2px;}
        .c4{bottom:14px;right:14px;border-width:0 2px 2px 0;}
        .inner{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;text-align:center;}
        .pre{font-family:'Cinzel',serif;font-size:8px;letter-spacing:4px;color:rgba(201,162,39,.6);margin-bottom:10px;}
        .clogo{width:76px;height:76px;object-fit:contain;margin-bottom:8px;filter:drop-shadow(0 0 12px rgba(201,162,39,.4));}
        .cten{font-family:'Cinzel Decorative',serif;font-size:22px;font-weight:700;color:#c9a227;text-shadow:0 0 20px rgba(201,162,39,.4);margin-bottom:2px;}
        .ctth{font-size:11px;color:rgba(201,162,39,.75);letter-spacing:3px;margin-bottom:12px;}
        .divider{width:140px;height:1px;background:linear-gradient(90deg,transparent,#c9a227 40%,#c9a227 60%,transparent);margin:0 auto 12px;position:relative;}
        .divider::before{content:'✦';position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);color:#c9a227;font-size:10px;background:#0e0804;padding:0 6px;}
        .welcome{font-size:11px;color:#a08060;letter-spacing:1px;margin-bottom:8px;}
        .cname{font-family:'Cinzel',serif;font-size:19px;font-weight:600;color:#f0ebe0;letter-spacing:1px;margin-bottom:4px;word-break:break-word;}
        .cyear{font-size:12px;color:#a08060;margin-bottom:10px;}
        .hbadge{display:inline-flex;align-items:center;gap:7px;padding:6px 16px;border-radius:999px;font-family:'Cinzel',serif;font-size:11px;font-weight:600;letter-spacing:1px;margin-bottom:14px;border:1px solid;}
        .msg{font-size:12px;color:#c8b89a;line-height:1.9;margin-bottom:14px;padding:0 4px;}
        .ebox{width:100%;background:rgba(201,162,39,.06);border:1px solid rgba(201,162,39,.2);border-radius:10px;padding:12px 14px;margin-bottom:14px;text-align:left;}
        .etitle{font-family:'Cinzel',serif;font-size:9px;letter-spacing:3px;color:rgba(201,162,39,.6);margin-bottom:8px;text-align:center;}
        .erow{display:flex;align-items:flex-start;gap:8px;font-size:12px;color:#c8b89a;padding:3px 0;}
        .erow span:first-child{width:18px;text-align:center;flex-shrink:0;}
        .foot{font-size:10px;color:rgba(201,162,39,.5);letter-spacing:1px;line-height:1.6;border-top:1px solid rgba(201,162,39,.15);padding-top:12px;}

        /* Buttons */
        .dl-btn{width:100%;padding:14px;background:linear-gradient(135deg,#6b3a0a,#c9a227 50%,#6b3a0a);border:none;border-radius:12px;color:#0a0600;font-size:15px;font-family:'Cinzel',serif;font-weight:600;letter-spacing:2px;cursor:pointer;box-shadow:0 4px 24px rgba(201,162,39,.35);transition:opacity .2s;}
        .dl-btn:hover{opacity:.9;}
        .dl-btn:disabled{opacity:.6;cursor:not-allowed;}
        .back-btn{background:none;border:1px solid rgba(201,162,39,.25);border-radius:10px;padding:10px;color:rgba(201,162,39,.6);font-size:13px;font-family:'Cinzel',serif;cursor:pointer;width:100%;}
        .back-btn:hover{border-color:rgba(201,162,39,.5);color:#c9a227;}
      `}</style>

      <div className="page">
        <div className="bg">
          <img src="/Photo_Club/pro_photo.png" alt=""/>
          <div className="bg-over"/>
        </div>

        <div className="wrap">
          <div className="card" ref={cardRef}>
            <div className="b-out"/><div className="b-in"/>
            <div className="cor c1"/><div className="cor c2"/>
            <div className="cor c3"/><div className="cor c4"/>
            <div className="inner">
              <div className="pre">PHOTO CLUB PRESENTS</div>
              <img className="clogo" src="/Photo_Club/LOGO_Photo_Club.png" alt="Photo Club"/>
              <div className="cten">PENSIEVE</div>
              <div className="ctth">อ่างแห่งความทรงจำ</div>
              <div className="divider"/>
              <div className="welcome">ยินดีต้อนรับเข้าสู่งาน</div>
              <div className="cname">{data.name}</div>
              <div className="cyear">{data.year} · จดหมายฉบับที่ {data.letter}</div>
              <div className="hbadge" style={{ background: data.houseBg, color: data.houseTextColor, borderColor: data.houseAccent + '80' }}>
                <span>{data.houseIcon}</span><span>{data.houseName}</span>
              </div>
              <div className="msg">
                นิทรรศการภาพถ่ายแห่งนี้เปิดประตูสู่ความทรงจำ<br/>
                ที่ซ่อนอยู่ในเลนส์ของทุกดวงตา<br/>
                อย่าลืม <strong style={{color:'#c9a227'}}>นำการ์ดเชิญนี้</strong> ไปแสดงตัว<br/>
                ที่หน้างานด้วยนะคะ ✦
              </div>
              <div className="ebox">
                <div className="etitle">◆ รายละเอียดงาน ◆</div>
                <div className="erow"><span>📅</span><span>{EVENT.date}</span></div>
                <div className="erow"><span>⏰</span><span>{EVENT.time}</span></div>
                <div className="erow"><span>📍</span><span>{EVENT.venue}</span></div>
              </div>
              <div className="foot">นิทรรศการภาพถ่าย Pensieve · อ่างแห่งความทรงจำ</div>
            </div>
          </div>

          <button className="dl-btn" disabled={saving} onClick={downloadCard}>
            {saving ? '⏳ กำลังบันทึก...' : '💾 บันทึกการ์ดเชิญ'}
          </button>
          <button className="back-btn" onClick={() => router.push('/')}>← กรอกข้อมูลใหม่</button>
        </div>
      </div>
    </>
  );
}
