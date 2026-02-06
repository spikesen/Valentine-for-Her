import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { dayId, response, photoUrl } = body as { dayId: number; response?: string; photoUrl?: string };

    const supabase = await createClient();
    const { data: userData, error: userErr } = await supabase.auth.getUser();
    if (userErr || !userData?.user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const user = userData.user;

    // Upsert a day memory (unique by user_id + day_id)
    const upsertBody = {
      user_id: user.id,
      day_id: dayId,
      response: response ?? null,
      photo_url: photoUrl ?? null,
      completed_at: new Date().toISOString(),
    };

    const { error: upsertErr } = await supabase
      .from('day_memories')
      .upsert(upsertBody, { onConflict: 'user_id,day_id' });

    if (upsertErr) {
      console.error('upsert day_memories error', upsertErr);
      return NextResponse.json({ error: 'Failed to save memory' }, { status: 500 });
    }

    // Fetch existing stats
    const { data: statsData, error: statsErr } = await supabase
      .from('user_stats')
      .select('completed_days')
      .eq('id', user.id)
      .single();

    if (statsErr && statsErr.code !== 'PGRST116') {
      // PGRST116 may indicate no rows
      console.error('fetch stats error', statsErr);
    }

    const currentDays: number[] = (statsData && statsData.completed_days) || [];
    const updatedDays = Array.from(new Set([...currentDays, dayId]));

    const { error: statsUpsertErr } = await supabase
      .from('user_stats')
      .upsert({ id: user.id, completed_days: updatedDays }, { merge: true });

    if (statsUpsertErr) {
      console.error('upsert stats error', statsUpsertErr);
      return NextResponse.json({ error: 'Failed to update stats' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('celebrate route error', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
