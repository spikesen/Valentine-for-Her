'use server';

import { createClient } from '@/lib/supabase/server';
import { createClient as createServiceRoleClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { dayId, noteType, content } = body;

    if (!dayId || !noteType || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!['before', 'after'].includes(noteType)) {
      return NextResponse.json(
        { error: 'Invalid note type' },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Prefer service-role client for anonymous submissions if available (bypasses RLS),
    // otherwise rely on RLS policy that allows anon inserts with user_id = NULL.
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const writer =
      !user && serviceRoleKey
        ? createServiceRoleClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL as string,
            serviceRoleKey,
            { auth: { autoRefreshToken: false, persistSession: false } }
          )
        : supabase;

    // Upsert the note (insert or update if already exists)
    const { data, error } = await (writer as any)
      .from('day_notes')
      .upsert(
        {
          user_id: user?.id ?? null,
          day_id: dayId,
          note_type: noteType,
          content: content,
          updated_at: new Date().toISOString(),
        } as any,
        {
          onConflict: 'user_id,day_id,note_type',
        }
      )
      .select();

    if (error) {
      console.error('Error saving note:', error);
      if (
        !user &&
        !serviceRoleKey &&
        error.message?.toLowerCase().includes('row-level security')
      ) {
        return NextResponse.json(
          { error: 'Anonymous notes blocked by RLS – run latest Supabase migrations or set SUPABASE_SERVICE_ROLE_KEY.' },
          { status: 500 }
        );
      }
      return NextResponse.json(
        { error: 'Failed to save note', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error in notes API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const dayId = searchParams.get('dayId');

    if (!dayId) {
      return NextResponse.json(
        { error: 'dayId query parameter required' },
        { status: 400 }
      );
    }

    // Prefer service-role for complete access; otherwise fall back to anon client with RLS.
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const reader = serviceRoleKey
      ? (await import('@supabase/supabase-js')).createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL as string,
          serviceRoleKey,
          { auth: { autoRefreshToken: false, persistSession: false } }
        )
      : await createClient();

    const { data, error } = await (reader as any)
      .from('day_notes')
      .select('*')
      .eq('day_id', parseInt(dayId))
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching notes with service role:', error);
      return NextResponse.json({ error: 'Failed to fetch notes' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error in notes API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
