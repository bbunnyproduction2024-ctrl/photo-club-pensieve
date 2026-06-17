'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const EVENT = {
  sub: 'อ่างแห่งความทรงจำ',
  date: '...',
  venue: '...',
  time: '...',
};

const HOUSES = [
  { id: 'gryffindor', name: 'Gryffindor', thai: 'กริฟฟินดอร์', bg: '#7F0909', accent: '#FFC500', textColor: '#FFC500', logo: '/Photo_Club/logo_Gryffindor.png' },
  { id: 'hufflepuff', name: 'Hufflepuff', thai: 'ฮัฟเฟิลพัฟ', bg: '#C49A00', accent: '#372E29', textColor: '#1a1208', logo: '/Photo_Club/logo_Hufflepuff.png' },
  { id: 'ravenclaw', name: 'Ravenclaw', thai: 'เรเวนคลอว์', bg: '#0E1A40', accent: '#946B2D', textColor: '#A89060', logo: '/Photo_Club/logo_Ravenclaw.png' },
  { id: 'slytherin', name: 'Slytherin', thai: 'สลิธีริน', bg: '#1A472A', accent: '#AAAAAA', textColor: '#CCCCCC', logo: '/Photo_Club/logo_Slytherin.png' },
];

const YEAR_BTNS = ['Year 1','Year 5','Year 2','Year 6','Year 3','Year 7','Year 4'];

const METEORS = [
  { left:'18%',  dur:6.0, del:0,   angle:14, travel:'112vh' },
  { left:'45%',  dur:7.5, del:4.2, angle:17, travel:'108vh' },
  { left:'70%',  dur:5.5, del:8.0, angle:13, travel:'115vh' },
  { left:'85%',  dur:8.0, del:2.5, angle:16, travel:'110vh' },
  { left:'32%',  dur:6.5, del:6.5, angle:15, travel:'113vh' },
];

export default function HomePage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [house, setHouse] = useState('');
  const [year, setYear] = useState('');
  const [customYear, setCustomYear] = useState('');
  const [letter, setLetter] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    const yearFinal = customYear.trim() || year;
    if (!name.trim() || !house || !yearFinal || !letter.trim()) {
      setError('กรุณากรอกข้อมูลให้ครบทุกช่องค่ะ');
      return;
    }
    const h = HOUSES.find(h => h.id === house)!;
    const payload = {
      name: name.trim(), house: h.id, houseName: h.name, houseThai: h.thai,
      houseAccent: h.accent, houseBg: h.bg, houseTextColor: h.textColor,
      houseIcon: '', year: yearFinal, letter: letter.trim(),
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
        input,select{font-family:'Noto Serif Thai',serif;}

        /* PAGE */
        .page{min-height:100dvh;position:relative;overflow:hidden;display:flex;flex-direction:column;align-items:center;padding:28px 16px 60px;}

        /* BG */
        .bg{position:fixed;inset:0;z-index:0;}
        .bg-img{width:100%;height:100%;object-fit:cover;opacity:.5;}
        .bg-overlay{position:absolute;inset:0;
          background:
            radial-gradient(ellipse at 50% -10%,rgba(120,60,5,.55) 0%,transparent 55%),
            radial-gradient(ellipse at 20% 80%,rgba(80,30,0,.3) 0%,transparent 40%),
            radial-gradient(ellipse at 80% 90%,rgba(60,20,0,.3) 0%,transparent 40%),
            rgba(6,4,2,.45);}
        .bg-vignette{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%,transparent 40%,rgba(0,0,0,.7) 100%);}
        .stars{position:absolute;inset:0;overflow:hidden;opacity:.6;}
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
        /* METEORS — ฝนดาวตก (บาง จาง น้อย) */
        .meteors{position:absolute;inset:0;overflow:hidden;pointer-events:none;opacity:.6;}
        .meteor{
          position:absolute;
          top:-2px;
          width:1px;
          height:0;
          background:linear-gradient(180deg,rgba(255,255,255,0) 0%,rgba(255,240,180,.35) 50%,rgba(201,162,39,.45) 100%);
          border-radius:0 0 1px 1px;
          box-shadow:0 0 1px rgba(201,162,39,.2);
          transform-origin:top center;
          animation:meteor-fall linear infinite;
        }
        @keyframes meteor-fall{
          0%  {height:0;    opacity:0;   transform:rotate(var(--angle)) translateY(0);}
          8%  {height:0;    opacity:0;}
          20% {height:35px; opacity:.35;}
          75% {height:45px; opacity:.25;}
          92% {height:20px; opacity:.05;}
          100%{height:0;    opacity:0;   transform:rotate(var(--angle)) translateY(var(--travel));}
        }

        .particles{position:absolute;inset:0;overflow:hidden;pointer-events:none;opacity:.6;}
        .p{position:absolute;bottom:-10px;width:2px;height:2px;border-radius:50%;background:rgba(201,162,39,.7);animation:rise linear infinite;}
        .p:nth-child(1) {left:4%;  animation-duration:10s; animation-delay:0s;   width:1.5px;height:1.5px;}
        .p:nth-child(2) {left:11%; animation-duration:14s; animation-delay:2s;   background:rgba(255,220,100,.5);}
        .p:nth-child(3) {left:18%; animation-duration:9s;  animation-delay:5s;   width:1px;height:1px;}
        .p:nth-child(4) {left:25%; animation-duration:12s; animation-delay:1s;   background:rgba(201,162,39,.6);}
        .p:nth-child(5) {left:33%; animation-duration:11s; animation-delay:7s;   width:3px;height:3px;background:rgba(255,220,100,.4);}
        .p:nth-child(6) {left:40%; animation-duration:8s;  animation-delay:3s;   width:1.5px;height:1.5px;}
        .p:nth-child(7) {left:48%; animation-duration:13s; animation-delay:0.5s; background:rgba(255,240,180,.5);}
        .p:nth-child(8) {left:56%; animation-duration:10s; animation-delay:4s;   width:1px;height:1px;}
        .p:nth-child(9) {left:63%; animation-duration:9s;  animation-delay:6s;   width:2px;height:2px;}
        .p:nth-child(10){left:70%; animation-duration:12s; animation-delay:2.5s; background:rgba(201,162,39,.55);}
        .p:nth-child(11){left:77%; animation-duration:11s; animation-delay:8s;   width:1.5px;height:1.5px;}
        .p:nth-child(12){left:83%; animation-duration:7s;  animation-delay:1.5s; background:rgba(255,220,100,.45);}
        .p:nth-child(13){left:89%; animation-duration:14s; animation-delay:4.5s; width:1px;height:1px;}
        .p:nth-child(14){left:94%; animation-duration:10s; animation-delay:3.5s; background:rgba(255,240,180,.5);}
        .p:nth-child(15){left:8%;  animation-duration:15s; animation-delay:9s;   width:3px;height:3px;background:rgba(201,162,39,.4);}
        @keyframes rise{0%{transform:translateY(0);opacity:0;}8%{opacity:.85;}75%{opacity:.45;}100%{transform:translateY(-100vh);opacity:0;}}

        /* HEADER */
        .content{position:relative;z-index:1;width:100%;max-width:1080px;display:flex;flex-direction:column;align-items:center;}
        .logo{width:100px;height:100px;object-fit:contain;filter:drop-shadow(0 0 16px rgba(201,162,39,.5));margin-bottom:8px;}
        .presents{font-family:'Cinzel',serif;font-size:9px;letter-spacing:5px;color:#c9a227;opacity:.8;margin-bottom:8px;}
        .deco-line{display:flex;align-items:center;gap:8px;width:200px;margin:0 auto 8px;}
        .deco-line-bar{flex:1;height:1px;background:linear-gradient(90deg,transparent,#c9a227,transparent);}
        .deco-gem{font-size:10px;color:#c9a227;opacity:.8;}
        .event-type{font-size:11px;color:rgba(201,162,39,.7);letter-spacing:4px;margin-bottom:3px;}
        .event-title{font-family:'Cinzel Decorative',serif;font-size:26px;font-weight:700;color:#c9a227;text-align:center;line-height:1.1;text-shadow:0 0 30px rgba(201,162,39,.5);margin-bottom:3px;}
        .event-sub{font-size:13px;color:rgba(201,162,39,.75);letter-spacing:3px;margin-bottom:6px;}
        .gold-line{width:180px;height:1px;background:linear-gradient(90deg,transparent,#c9a227,transparent);margin:8px auto;}
        .event-meta{font-size:11px;color:#a08060;text-align:center;letter-spacing:1px;margin-bottom:20px;line-height:1.9;}

        /* CARD */
        .form-card{
          width:100%;
          background:rgba(8,5,2,.8);
          border:1px solid rgba(201,162,39,.4);
          border-radius:20px;
          padding:32px 30px 36px;
          backdrop-filter:blur(14px);
          position:relative;
          animation:cardGlow 4s ease-in-out infinite alternate;
        }
        @keyframes cardGlow{
          0%{box-shadow:0 8px 40px rgba(0,0,0,.7),0 0 40px rgba(120,70,0,.1);}
          100%{box-shadow:0 8px 40px rgba(0,0,0,.7),0 0 80px rgba(180,110,0,.25);}
        }
        .deco-c{position:absolute;width:18px;height:18px;border-color:#c9a227;border-style:solid;opacity:.6;}
        .dc-tl{top:8px;left:8px;border-width:2px 0 0 2px;}
        .dc-tr{top:8px;right:8px;border-width:2px 2px 0 0;}
        .dc-bl{bottom:8px;left:8px;border-width:0 0 2px 2px;}
        .dc-br{bottom:8px;right:8px;border-width:0 2px 2px 0;}

        /* INPUTS */
        .flabel{font-family:'Cinzel',serif;font-size:11px;letter-spacing:3px;color:rgba(201,162,39,.7);display:block;margin-bottom:8px;}
        .finput{
          width:100%;background:rgba(255,255,255,.04);
          border:1px solid rgba(201,162,39,.3);border-radius:12px;
          padding:16px 18px;color:#f0ebe0;font-size:16px;outline:none;
          transition:border-color .2s,box-shadow .2s;
        }
        .finput:focus{border-color:#c9a227;box-shadow:0 0 0 2px rgba(201,162,39,.12);}
        .finput::placeholder{color:#4a3a2a;}

        /* TOP ROW: ชื่อ + เลขจดหมาย */
        .top-row{display:grid;grid-template-columns:3fr 1.1fr;gap:16px;margin-bottom:18px;}

        /* MAIN GRID: บ้าน | ตำแหน่ง | ปี */
        .form-grid{display:grid;grid-template-columns:2fr 1.3fr 2fr;gap:16px;margin-bottom:20px;}

        /* HOUSES */
        .houses{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
        .house-btn{
          border:2px solid transparent;border-radius:14px;
          padding:16px 8px;cursor:pointer;
          display:flex;flex-direction:column;align-items:center;gap:8px;
          transition:all .22s;opacity:.45;
          min-height:140px;justify-content:center;
        }
        .house-btn.sel{
          opacity:1;filter:brightness(1.15);
          box-shadow:0 0 22px rgba(255,255,255,.25),0 0 30px rgba(201,162,39,.2);
        }
        .house-btn:not(.sel):hover{opacity:.72;}
        .house-logo{width:64px;height:64px;object-fit:contain;}
        .house-name{font-family:'Cinzel',serif;font-size:13px;font-weight:600;letter-spacing:1px;line-height:1.2;text-align:center;}
        .house-thai{font-size:12px;opacity:.8;text-align:center;}

        /* MIDDLE COL: Professor + กรอกเอง */
        .mid-col{display:flex;flex-direction:column;gap:12px;}
        .prof-btn{
          width:100%;padding:22px 10px;
          border:1px solid rgba(201,162,39,.22);border-radius:12px;
          background:rgba(255,255,255,.03);
          color:rgba(201,162,39,.4);
          font-size:14px;font-family:'Cinzel',serif;
          cursor:pointer;transition:all .18s;text-align:center;letter-spacing:2px;
        }
        .prof-btn.sel{
          background:rgba(201,162,39,.22);border-color:#c9a227;color:#f0e8c0;
          box-shadow:0 0 16px rgba(201,162,39,.55),inset 0 0 6px rgba(201,162,39,.12);
          text-shadow:0 0 10px rgba(201,162,39,.6);font-weight:700;
        }
        .custom-yr{
          width:100%;padding:14px 14px;
          background:rgba(255,255,255,.03);
          border:1px solid rgba(201,162,39,.2);border-radius:12px;
          color:#f0ebe0;font-size:14px;font-family:'Noto Serif Thai',serif;
          outline:none;transition:border-color .2s;
        }
        .custom-yr:focus{border-color:rgba(201,162,39,.6);box-shadow:0 0 0 2px rgba(201,162,39,.1);}
        .custom-yr::placeholder{color:#3a2e20;font-size:13px;}

        /* YEAR BUTTONS 2-col */
        .year-btns{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
        .ybtn{
          padding:16px 6px;
          border:1px solid rgba(201,162,39,.2);border-radius:10px;
          background:rgba(255,255,255,.02);
          color:rgba(201,162,39,.38);
          font-size:13px;font-family:'Cinzel',serif;
          cursor:pointer;transition:all .18s;text-align:center;letter-spacing:1px;
        }
        .ybtn.sel{
          background:rgba(201,162,39,.22);border-color:#c9a227;color:#f0e8c0;
          box-shadow:0 0 14px rgba(201,162,39,.55),inset 0 0 4px rgba(201,162,39,.12);
          text-shadow:0 0 8px rgba(201,162,39,.6);font-weight:700;
        }

        /* ERROR */
        .error{color:#e87070;font-size:11px;text-align:center;background:rgba(180,40,40,.12);border-radius:8px;padding:8px;margin-bottom:10px;}

        /* SUBMIT */
        .submit-btn{
          width:100%;padding:20px;
          background:linear-gradient(135deg,#4a1e06,#c9a227 40%,#e8c060 50%,#c9a227 60%,#4a1e06);
          border:none;border-radius:14px;
          color:#0a0500;font-size:16px;font-family:'Cinzel',serif;font-weight:700;letter-spacing:3px;
          cursor:pointer;transition:all .2s;
          box-shadow:0 4px 24px rgba(201,162,39,.35);
        }
        .submit-btn:hover{box-shadow:0 4px 40px rgba(201,162,39,.6);transform:translateY(-1px);}
        .submit-btn:disabled{opacity:.6;cursor:not-allowed;transform:none;}
      `}</style>

      <div className="page">
        <div className="bg">
          <img className="bg-img" src="/Photo_Club/background.png" alt=""/>
          <div className="bg-overlay"/>
          <div className="bg-vignette"/>
          <div className="stars"/>
          <div className="meteors">
            {METEORS.map((m, i) => (
              <div
                key={i}
                className="meteor"
                style={{
                  left: m.left,
                  animationDuration: `${m.dur}s`,
                  animationDelay: `${m.del}s`,
                  '--angle': `${m.angle}deg`,
                  '--travel': m.travel,
                } as React.CSSProperties}
              />
            ))}
          </div>
          <div className="particles">
            {[...Array(15)].map((_,i) => <div key={i} className="p"/>)}
          </div>
        </div>

        <div className="content">
          <img className="logo" src="/Photo_Club/LOGO_Photo_Club.png" alt="Photo Club"/>
          <div className="presents">PHOTO CLUB PRESENTS</div>
          <div className="deco-line">
            <span className="deco-line-bar"/><span className="deco-gem">✦</span><span className="deco-line-bar"/>
          </div>
          <div className="event-type">นิทรรศการภาพถ่าย</div>
          <div className="event-title">PENSIEVE</div>
          <div className="event-sub">{EVENT.sub}</div>
          <div className="gold-line"/>
          <div className="event-meta">
            📅 {EVENT.date} &nbsp;·&nbsp; ⏰ {EVENT.time}<br/>
            📍 {EVENT.venue}
          </div>

          <div className="form-card">
            <div className="deco-c dc-tl"/><div className="deco-c dc-tr"/>
            <div className="deco-c dc-bl"/><div className="deco-c dc-br"/>

            {/* ROW 1: ชื่อ + เลขจดหมาย */}
            <div className="top-row" style={{marginBottom:'12px'}}>
              <div>
                <label className="flabel">NAME &nbsp;[IC]</label>
                <input className="finput" placeholder="Full name (English)..." value={name} onChange={e => setName(e.target.value)}/>
              </div>
              <div>
                <label className="flabel">เลขจดหมาย</label>
                <input className="finput" placeholder="No." value={letter} onChange={e => setLetter(e.target.value)}/>
              </div>
            </div>

            {/* ROW 2: บ้าน | ตำแหน่ง | ปี */}
            <div className="form-grid">
              {/* บ้าน 2x2 */}
              <div>
                <label className="flabel">HOUSE</label>
                <div className="houses">
                  {HOUSES.map(h => (
                    <button
                      key={h.id}
                      className={`house-btn${house === h.id ? ' sel' : ''}`}
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

              {/* Professor + กรอกเอง */}
              <div className="mid-col">
                <label className="flabel">ROLE</label>
                <button
                  className={`prof-btn${year === 'Professor' ? ' sel' : ''}`}
                  onClick={() => { setYear('Professor'); setCustomYear(''); }}
                >
                  Professor
                </button>
                <div>
                  <div className="flabel" style={{marginBottom:'4px'}}>อื่นๆ</div>
                  <input
                    className="custom-yr"
                    placeholder="กรอกเอง..."
                    value={customYear}
                    onChange={e => { setCustomYear(e.target.value); setYear(''); }}
                  />
                </div>
              </div>

              {/* Year 1-7 */}
              <div>
                <label className="flabel">YEAR</label>
                <div className="year-btns">
                  {YEAR_BTNS.map(y => (
                    <button
                      key={y}
                      className={`ybtn${year === y ? ' sel' : ''}`}
                      onClick={() => { setYear(y); setCustomYear(''); }}
                    >
                      {y}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {error && <div className="error">{error}</div>}
            <button className="submit-btn" onClick={handleSubmit} disabled={submitting}>
              {submitting ? '⏳ กำลังส่ง...' : '✦  ส่งคำขอการ์ดเชิญ  ✦'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
