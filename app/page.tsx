'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const EVENT = {
  name: 'นิทรรศการภาพถ่าย Pensieve',
  sub: 'อ่างแห่งความทรงจำ',
  date: '...',
  venue: '...',
  time: '...',
};

const HOUSES = [
  { id: 'gryffindor', name: 'Gryffindor', thai: 'กริฟฟินดอร์', bg: '#7F0909', accent: '#FFC500', icon: '🦁', textColor: '#FFC500', logo: '/Photo_Club/logo Gryffindor.png' },
  { id: 'hufflepuff', name: 'Hufflepuff', thai: 'ฮัฟเฟิลพัฟ', bg: '#F0C500', accent: '#372E29', icon: '🦡', textColor: '#372E29', logo: '/Photo_Club/logo Hufflepuff.png' },
  { id: 'ravenclaw', name: 'Ravenclaw', thai: 'เรเวนคลอว์', bg: '#0E1A40', accent: '#946B2D', icon: '🦅', textColor: '#A89060', logo: '/Photo_Club/logo Ravenclaw.png' },
  { id: 'slytherin', name: 'Slytherin', thai: 'สลิธีริน', bg: '#1A472A', accent: '#AAAAAA', icon: '🐍', textColor: '#AAAAAA', logo: '/Photo_Club/logo Slytherin.png' },
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
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        body{background:#080604;font-family:'Noto Serif Thai',serif;color:#f0ebe0;min-height:100dvh;}
        input{font-family:'Noto Serif Thai',serif;}
        .page{min-height:100dvh;position:relative;overflow:hidden;display:flex;flex-direction:column;align-items:center;padding:32px 16px 60px;}
        .bg{position:fixed;inset:0;z-index:0;}
        .bg-img{width:100%;height:100%;object-fit:cover;opacity:.25;}
        .bg-overlay{position:absolute;inset:0;
          background:
            radial-gradient(ellipse at 50% -10%,rgba(120,60,5,.7) 0%,transparent 55%),
            radial-gradient(ellipse at 20% 80%,rgba(80,30,0,.4) 0%,transparent 40%),
            radial-gradient(ellipse at 80% 90%,rgba(60,20,0,.4) 0%,transparent 40%),
            linear-gradient(180deg,#0a0500 0%,#060402 50%,#0a0500 100%);
        }
        .bg-vignette{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%,transparent 40%,rgba(0,0,0,.7) 100%);}
        .stars{position:absolute;inset:0;overflow:hidden;}
        .stars::before,.stars::after{content:'';position:absolute;inset:0;background-image:
          radial-gradient(1px 1px at 10% 15%,rgba(201,162,39,.6) 0%,transparent 100%),
          radial-gradient(1px 1px at 25% 35%,rgba(255,255,255,.4) 0%,transparent 100%),
          radial-gradient(1px 1px at 40% 10%,rgba(201,162,39,.5) 0%,transparent 100%),
          radial-gradient(1px 1px at 55% 45%,rgba(255,255,255,.3) 0%,transparent 100%),
          radial-gradient(1px 1px at 70% 20%,rgba(201,162,39,.6) 0%,transparent 100%),
          radial-gradient(1px 1px at 85% 60%,rgba(255,255,255,.4) 0%,transparent 100%),
          radial-gradient(1px 1px at 15% 70%,rgba(201,162,39,.4) 0%,transparent 100%),
          radial-gradient(1px 1px at 30% 85%,rgba(255,255,255,.3) 0%,transparent 100%),
          radial-gradient(1px 1px at 60% 75%,rgba(201,162,39,.5) 0%,transparent 100%),
          radial-gradient(1px 1px at 90% 40%,rgba(255,255,255,.4) 0%,transparent 100%),
          radial-gradient(1.5px 1.5px at 5% 50%,rgba(201,162,39,.7) 0%,transparent 100%),
          radial-gradient(1.5px 1.5px at 45% 65%,rgba(255,220,100,.5) 0%,transparent 100%),
          radial-gradient(1.5px 1.5px at 75% 5%,rgba(201,162,39,.6) 0%,transparent 100%),
          radial-gradient(1px 1px at 95% 80%,rgba(255,255,255,.3) 0%,transparent 100%),
          radial-gradient(1px 1px at 50% 90%,rgba(201,162,39,.4) 0%,transparent 100%);
          animation:twinkle 4s ease-in-out infinite alternate;}
        .stars::after{background-image:
          radial-gradient(1px 1px at 18% 25%,rgba(201,162,39,.5) 0%,transparent 100%),
          radial-gradient(1px 1px at 33% 55%,rgba(255,255,255,.35) 0%,transparent 100%),
          radial-gradient(1px 1px at 62% 30%,rgba(201,162,39,.6) 0%,transparent 100%),
          radial-gradient(1px 1px at 78% 70%,rgba(255,255,255,.4) 0%,transparent 100%),
          radial-gradient(1.5px 1.5px at 88% 15%,rgba(201,162,39,.7) 0%,transparent 100%),
          radial-gradient(1px 1px at 7% 88%,rgba(255,255,255,.3) 0%,transparent 100%),
          radial-gradient(1px 1px at 52% 12%,rgba(201,162,39,.5) 0%,transparent 100%),
          radial-gradient(1px 1px at 42% 95%,rgba(255,220,100,.4) 0%,transparent 100%);
          animation:twinkle 6s ease-in-out infinite alternate-reverse;}
        @keyframes twinkle{0%{opacity:.6;}100%{opacity:1;}}
        .particles{position:absolute;inset:0;overflow:hidden;pointer-events:none;}
        .p{position:absolute;bottom:-10px;width:3px;height:3px;border-radius:50%;background:rgba(201,162,39,.8);animation:rise linear infinite;}
        .p:nth-child(1){left:5%;animation-duration:9s;animation-delay:0s;width:2px;height:2px;}
        .p:nth-child(2){left:12%;animation-duration:12s;animation-delay:2s;background:rgba(255,220,100,.6);}
        .p:nth-child(3){left:22%;animation-duration:8s;animation-delay:4s;width:2px;height:2px;}
        .p:nth-child(4){left:35%;animation-duration:11s;animation-delay:1s;}
        .p:nth-child(5){left:47%;animation-duration:10s;animation-delay:3s;width:4px;height:4px;background:rgba(255,220,100,.5);}
        .p:nth-child(6){left:58%;animation-duration:9s;animation-delay:5s;width:2px;height:2px;}
        .p:nth-child(7){left:68%;animation-duration:13s;animation-delay:0.5s;}
        .p:nth-child(8){left:78%;animation-duration:8s;animation-delay:3.5s;background:rgba(255,220,100,.7);}
        .p:nth-child(9){left:88%;animation-duration:11s;animation-delay:2.5s;width:2px;height:2px;}
        .p:nth-child(10){left:95%;animation-duration:10s;animation-delay:6s;}
        .p:nth-child(11){left:30%;animation-duration:14s;animation-delay:1.5s;width:2px;height:2px;}
        .p:nth-child(12){left:72%;animation-duration:9s;animation-delay:7s;background:rgba(255,220,100,.6);}
        @keyframes rise{0%{transform:translateY(0) scale(1);opacity:0;}10%{opacity:.8;}80%{opacity:.4;}100%{transform:translateY(-100vh) scale(0.3);opacity:0;}}
        .content{position:relative;z-index:1;width:100%;max-width:480px;display:flex;flex-direction:column;align-items:center;}
        .logo{width:110px;height:110px;object-fit:contain;filter:drop-shadow(0 0 16px rgba(201,162,39,.5));margin-bottom:8px;}
        .presents{font-family:'Cinzel',serif;font-size:10px;letter-spacing:4px;color:#c9a227;opacity:.8;margin-bottom:8px;}
        .deco-line{display:flex;align-items:center;gap:8px;width:200px;margin:0 auto 8px;}
        .deco-line-bar{flex:1;height:1px;background:linear-gradient(90deg,transparent,#c9a227,transparent);}
        .deco-line-diamond{font-size:10px;color:#c9a227;opacity:.8;flex-shrink:0;}
        .event-type{font-family:'Noto Serif Thai',serif;font-size:12px;color:#c9a227;opacity:.75;letter-spacing:3px;margin-bottom:4px;}
        .event-title{font-family:'Cinzel Decorative',serif;font-size:24px;font-weight:700;color:#c9a227;text-align:center;line-height:1.15;text-shadow:0 0 30px rgba(201,162,39,.4);margin-bottom:4px;}
        .event-sub{font-family:'Noto Serif Thai',serif;font-size:15px;color:#c9a227;opacity:.8;text-align:center;letter-spacing:3px;margin-bottom:6px;}
        .gold-line{width:180px;height:1px;background:linear-gradient(90deg,transparent,#c9a227,transparent);margin:10px auto 6px;}
        .event-meta{font-size:12px;color:#a08060;text-align:center;letter-spacing:1px;margin-bottom:24px;line-height:1.8;}
        .form-card{width:100%;background:rgba(10,7,4,.75);border:1px solid rgba(201,162,39,.4);border-radius:16px;padding:24px 20px;backdrop-filter:blur(12px);box-shadow:0 8px 48px rgba(0,0,0,.7),0 0 80px rgba(120,70,0,.2),inset 0 0 0 1px rgba(201,162,39,.1);animation:cardGlow 4s ease-in-out infinite alternate;}
        @keyframes cardGlow{0%{box-shadow:0 8px 48px rgba(0,0,0,.7),0 0 40px rgba(120,70,0,.15),inset 0 0 0 1px rgba(201,162,39,.1);}100%{box-shadow:0 8px 48px rgba(0,0,0,.7),0 0 100px rgba(180,110,0,.3),inset 0 0 0 1px rgba(201,162,39,.15);}}
        .field{margin-bottom:18px;}
        .field-label{font-size:12px;color:#c9a227;letter-spacing:2px;margin-bottom:8px;display:block;font-family:'Cinzel',serif;}
        .field input{width:100%;background:rgba(255,255,255,.04);border:1px solid rgba(201,162,39,.3);border-radius:10px;padding:12px 14px;color:#f0ebe0;font-size:14px;outline:none;transition:border-color .2s;}
        .field input:focus{border-color:#c9a227;box-shadow:0 0 0 2px rgba(201,162,39,.1);}
        .field input::placeholder{color:#5a4a3a;}
        .houses{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
        .house-btn{border:2px solid transparent;border-radius:12px;padding:12px 10px;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:5px;transition:all .2s;opacity:.6;}
        .house-btn.selected{opacity:1;border-color:currentColor;box-shadow:0 0 16px rgba(255,255,255,.15);}
        .house-btn:not(.selected):hover{opacity:.85;}
        .house-icon{font-size:22px;}
        .house-logo{width:48px;height:48px;object-fit:contain;}
        .house-name{font-family:'Cinzel',serif;font-size:10px;font-weight:600;letter-spacing:1px;}
        .house-thai{font-size:11px;opacity:.8;}
        .years{display:grid;grid-template-columns:repeat(7,1fr);gap:6px;}
        .year-btn{border:1px solid rgba(201,162,39,.3);border-radius:8px;padding:8px 0;cursor:pointer;background:rgba(255,255,255,.03);color:#a08060;font-size:12px;font-family:'Noto Serif Thai',serif;transition:all .2s;text-align:center;}
        .year-btn.selected{background:rgba(201,162,39,.15);border-color:#c9a227;color:#f0d060;}
        .year-btn:hover:not(.selected){border-color:rgba(201,162,39,.5);color:#c9a227;}
        .error{color:#e87070;font-size:12px;text-align:center;margin-top:8px;background:rgba(180,40,40,.12);border-radius:8px;padding:8px;}
        .submit-btn{width:100%;padding:15px;margin-top:20px;background:linear-gradient(135deg,#6b3a0a,#c9a227 50%,#6b3a0a);border:none;border-radius:12px;color:#0a0600;font-size:15px;font-family:'Cinzel',serif;font-weight:600;letter-spacing:2px;cursor:pointer;transition:opacity .2s;box-shadow:0 4px 20px rgba(201,162,39,.3);}
        .submit-btn:hover{opacity:.9;}
        .deco-corner{position:absolute;width:20px;height:20px;border-color:#c9a227;border-style:solid;opacity:.5;}
        .deco-tl{top:8px;left:8px;border-width:2px 0 0 2px;}
        .deco-tr{top:8px;right:8px;border-width:2px 2px 0 0;}
        .deco-bl{bottom:8px;left:8px;border-width:0 0 2px 2px;}
        .deco-br{bottom:8px;right:8px;border-width:0 2px 2px 0;}
      `}</style>

      <div className="page">
        <div className="bg">
          <img className="bg-img" src="/Photo_Club/pro_photo.png" alt=""/>
          <div className="bg-overlay"/>
          <div className="bg-vignette"/>
          <div className="stars"/>
          <div className="particles">
            <div className="p"/><div className="p"/><div className="p"/>
            <div className="p"/><div className="p"/><div className="p"/>
            <div className="p"/><div className="p"/><div className="p"/>
            <div className="p"/><div className="p"/><div className="p"/>
          </div>
        </div>

        <div className="content">
          <img className="logo" src="/Photo_Club/LOGO_Photo_Club.png" alt="Photo Club"/>
          <div className="presents">PHOTO CLUB PRESENTS</div>
          <div className="deco-line">
            <span className="deco-line-bar"/>
            <span className="deco-line-diamond">✦</span>
            <span className="deco-line-bar"/>
          </div>
          <div className="event-type">นิทรรศการภาพถ่าย</div>
          <div className="event-title">PENSIEVE</div>
          <div className="event-sub">{EVENT.sub}</div>
          <div className="gold-line"/>
          <div className="event-meta">
            📅 {EVENT.date} &nbsp;·&nbsp; ⏰ {EVENT.time}<br/>
            📍 {EVENT.venue}
          </div>

          <div className="form-card" style={{position:'relative'}}>
            <div className="deco-corner deco-tl"/><div className="deco-corner deco-tr"/>
            <div className="deco-corner deco-bl"/><div className="deco-corner deco-br"/>

            <div className="field">
              <label className="field-label">ชื่อ – นามสกุล [IC]</label>
              <input
                placeholder="กรอกชื่อภาษาอังกฤษ..."
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>

            <div className="field">
              <label className="field-label">HOUSE</label>
              <div className="houses">
                {HOUSES.map(h => (
                  <button
                    key={h.id}
                    className={`house-btn ${house === h.id ? 'selected' : ''}`}
                    style={{ background: h.bg, color: h.textColor, borderColor: house === h.id ? h.accent : 'transparent' }}
                    onClick={() => setHouse(h.id)}
                  >
                    <img className="house-logo" src={h.logo} alt={h.name}/>
                    <span className="house-name">{h.name}</span>
                    <span className="house-thai">{h.thai}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="field">
              <label className="field-label">ชั้นปี</label>
              <div className="years">
                {YEARS.map(y => (
                  <button
                    key={y}
                    className={`year-btn ${year === y ? 'selected' : ''}`}
                    onClick={() => setYear(y)}
                  >
                    {y}
                  </button>
                ))}
              </div>
            </div>

            <div className="field">
              <label className="field-label">เลขจดหมาย</label>
              <input
                placeholder="กรอกเลขจดหมาย..."
                value={letter}
                onChange={e => setLetter(e.target.value)}
              />
            </div>

            {error && <div className="error">{error}</div>}
            <button className="submit-btn" onClick={handleSubmit} disabled={submitting}>
              {submitting ? '⏳ กำลังส่ง...' : '✦ ส่งข้อมูล ✦'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
