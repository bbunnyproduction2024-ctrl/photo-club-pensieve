'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const EVENT = {
  date: '...',
  venue: '...',
  time: '...',
};

const HOUSES = [
  { id: 'gryffindor', name: 'Gryffindor', thai: 'กริฟฟินดอร์', bg: '#7F0909', accent: '#FFC500', icon: '🦁', textColor: '#FFC500' },
  { id: 'hufflepuff', name: 'Hufflepuff', thai: 'ฮัฟเฟิลพัฟ', bg: '#C49A00', accent: '#372E29', icon: '🦡', textColor: '#1a1208' },
  { id: 'ravenclaw', name: 'Ravenclaw', thai: 'เรเวนคลอว์', bg: '#0E1A40', accent: '#946B2D', icon: '🦅', textColor: '#A89060' },
  { id: 'slytherin', name: 'Slytherin', thai: 'สลิธีริน', bg: '#1A472A', accent: '#AAAAAA', icon: '🐍', textColor: '#CCCCCC' },
];

const YEARS = ['ปี 1','ปี 2','ปี 3','ปี 4','ปี 5','ปี 6','ปี 7'];

export default function HomePage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [house, setHouse] = useState('');
  const [year, setYear] = useState('');
  const [letter, setLetter] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim() || !house || !year || !letter.trim()) {
      setError('กรุณากรอกข้อมูลให้ครบทุกช่องค่ะ');
      return;
    }
    const h = HOUSES.find(h => h.id === house)!;
    const payload = {
      name: name.trim(), house: h.id, houseName: h.name, houseThai: h.thai,
      houseAccent: h.accent, houseBg: h.bg, houseTextColor: h.textColor,
      houseIcon: h.icon, year, letter: letter.trim(),
    };
    setSubmitting(true);
    setError('');
    try {
      await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch { /* ส่ง sheet ไม่ได้ก็ไม่หยุด */ }
    sessionStorage.setItem('photoclub', JSON.stringify(payload));
    router.push('/video');
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cinzel:wght@400;500;600&family=Noto+Serif+Thai:wght@300;400;500;600&display=swap');
        body{font-family:'Noto Serif Thai',serif;color:#f0ebe0;}
        .page{min-height:100dvh;position:relative;overflow:hidden;display:flex;flex-direction:column;align-items:center;padding:32px 16px 60px;}
        .bg{position:fixed;inset:0;z-index:0;}
        .bg img{width:100%;height:100%;object-fit:cover;opacity:.18;}
        .bg-over{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 0%,#1f0d04 0%,#080604 70%);}
        .content{position:relative;z-index:1;width:100%;max-width:480px;display:flex;flex-direction:column;align-items:center;}
        .logo{width:110px;height:110px;object-fit:contain;filter:drop-shadow(0 0 16px rgba(201,162,39,.5));margin-bottom:8px;}
        .presents{font-family:'Cinzel',serif;font-size:10px;letter-spacing:4px;color:#c9a227;opacity:.8;margin-bottom:10px;}
        .title-en{font-family:'Cinzel Decorative',serif;font-size:26px;font-weight:700;color:#c9a227;text-align:center;line-height:1.15;text-shadow:0 0 30px rgba(201,162,39,.4);margin-bottom:4px;}
        .title-th{font-family:'Noto Serif Thai',serif;font-size:15px;color:#c9a227;opacity:.8;text-align:center;letter-spacing:3px;margin-bottom:6px;}
        .gold-line{width:180px;height:1px;background:linear-gradient(90deg,transparent,#c9a227,transparent);margin:10px auto 6px;}
        .meta{font-size:12px;color:#a08060;text-align:center;letter-spacing:1px;margin-bottom:24px;line-height:1.9;}
        .form-card{width:100%;background:rgba(10,7,4,.75);border:1px solid rgba(201,162,39,.35);border-radius:16px;padding:24px 20px;backdrop-filter:blur(8px);box-shadow:0 8px 48px rgba(0,0,0,.6);position:relative;}
        .deco{position:absolute;width:18px;height:18px;border-color:#c9a227;border-style:solid;opacity:.5;}
        .d-tl{top:8px;left:8px;border-width:2px 0 0 2px;}
        .d-tr{top:8px;right:8px;border-width:2px 2px 0 0;}
        .d-bl{bottom:8px;left:8px;border-width:0 0 2px 2px;}
        .d-br{bottom:8px;right:8px;border-width:0 2px 2px 0;}
        .field{margin-bottom:18px;}
        .lbl{font-size:11px;color:#c9a227;letter-spacing:2px;margin-bottom:8px;display:block;font-family:'Cinzel',serif;}
        input{width:100%;background:rgba(255,255,255,.04);border:1px solid rgba(201,162,39,.3);border-radius:10px;padding:12px 14px;color:#f0ebe0;font-size:14px;outline:none;transition:border-color .2s;font-family:'Noto Serif Thai',serif;}
        input:focus{border-color:#c9a227;box-shadow:0 0 0 2px rgba(201,162,39,.1);}
        input::placeholder{color:#5a4a3a;}
        .houses{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
        .hbtn{border:2px solid transparent;border-radius:12px;padding:12px 8px;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:5px;transition:all .2s;opacity:.55;}
        .hbtn.sel{opacity:1;box-shadow:0 0 18px rgba(255,255,255,.15);}
        .hicon{font-size:22px;}
        .hname{font-family:'Cinzel',serif;font-size:10px;font-weight:600;letter-spacing:1px;}
        .hthai{font-size:11px;opacity:.8;}
        .years{display:grid;grid-template-columns:repeat(7,1fr);gap:5px;}
        .ybtn{border:1px solid rgba(201,162,39,.3);border-radius:8px;padding:8px 0;cursor:pointer;background:rgba(255,255,255,.03);color:#a08060;font-size:11px;font-family:'Noto Serif Thai',serif;transition:all .2s;text-align:center;}
        .ybtn.sel{background:rgba(201,162,39,.15);border-color:#c9a227;color:#f0d060;}
        .err{color:#e87070;font-size:12px;text-align:center;margin-top:8px;background:rgba(180,40,40,.12);border-radius:8px;padding:8px;}
        .sbtn{width:100%;padding:15px;margin-top:20px;background:linear-gradient(135deg,#6b3a0a,#c9a227 50%,#6b3a0a);border:none;border-radius:12px;color:#0a0600;font-size:15px;font-family:'Cinzel',serif;font-weight:600;letter-spacing:2px;cursor:pointer;box-shadow:0 4px 20px rgba(201,162,39,.3);transition:opacity .2s;}
        .sbtn:hover{opacity:.9;}
        .sbtn:disabled{opacity:.6;cursor:not-allowed;}
      `}</style>

      <div className="page">
        <div className="bg">
          <img src="/Photo_Club/pro_photo.png" alt=""/>
          <div className="bg-over"/>
        </div>

        <div className="content">
          <img className="logo" src="/Photo_Club/LOGO_Photo_Club.png" alt="Photo Club"/>
          <div className="presents">PHOTO CLUB PRESENTS</div>
          <div className="title-en">PENSIEVE</div>
          <div className="title-th">อ่างแห่งความทรงจำ</div>
          <div className="gold-line"/>
          <div className="meta">
            นิทรรศการภาพถ่าย<br/>
            📅 {EVENT.date} &nbsp;·&nbsp; ⏰ {EVENT.time}<br/>
            📍 {EVENT.venue}
          </div>

          <div className="form-card">
            <div className="deco d-tl"/><div className="deco d-tr"/>
            <div className="deco d-bl"/><div className="deco d-br"/>

            <div className="field">
              <label className="lbl">ชื่อ – นามสกุล [IC]</label>
              <input placeholder="กรอกชื่อภาษาอังกฤษ..." value={name} onChange={e => setName(e.target.value)}/>
            </div>

            <div className="field">
              <label className="lbl">HOUSE</label>
              <div className="houses">
                {HOUSES.map(h => (
                  <button key={h.id}
                    className={`hbtn${house === h.id ? ' sel' : ''}`}
                    style={{ background: h.bg, color: h.textColor, borderColor: house === h.id ? h.accent : 'transparent' }}
                    onClick={() => setHouse(h.id)}>
                    <span className="hicon">{h.icon}</span>
                    <span className="hname">{h.name}</span>
                    <span className="hthai">{h.thai}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="field">
              <label className="lbl">ชั้นปี</label>
              <div className="years">
                {YEARS.map(y => (
                  <button key={y} className={`ybtn${year === y ? ' sel' : ''}`} onClick={() => setYear(y)}>
                    {y}
                  </button>
                ))}
              </div>
            </div>

            <div className="field">
              <label className="lbl">เลขจดหมาย</label>
              <input placeholder="กรอกเลขจดหมาย..." value={letter} onChange={e => setLetter(e.target.value)}/>
            </div>

            {error && <div className="err">{error}</div>}
            <button className="sbtn" disabled={submitting} onClick={handleSubmit}>
              {submitting ? '⏳ กำลังส่ง...' : '✦ ส่งข้อมูล ✦'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
