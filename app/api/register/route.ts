import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, houseName, houseThai, year, letter } = body;

    if (!name || !houseName || !year || !letter) {
      return NextResponse.json({ error: 'ข้อมูลไม่ครบ' }, { status: 400 });
    }

    const webhookUrl = process.env.PHOTO_CLUB_SHEETS_WEBHOOK;
    if (!webhookUrl) return NextResponse.json({ ok: true });

    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      redirect: 'follow',
      body: JSON.stringify({
        timestamp: new Date().toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' }),
        name,
        house: `${houseName} (${houseThai})`,
        year,
        letter,
      }),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: true }); // ไม่หยุด flow แม้ sheets จะพัง
  }
}
