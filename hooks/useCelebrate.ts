'use client'

export async function celebrateDay(dayId: number, response?: string, photoUrl?: string) {
  try {
    const res = await fetch('/api/celebrate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dayId, response, photoUrl }),
    });

    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      console.error('Failed to celebrate', json);
      return { success: false, error: json?.error || 'unknown' };
    }

    return { success: true };
  } catch (e) {
    console.error('celebrateDay error', e);
    return { success: false, error: 'network' };
  }
}
