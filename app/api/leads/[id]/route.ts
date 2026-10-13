import { NextResponse } from 'next/server';
import { supabase, getServiceSupabase } from '@/lib/supabase';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authHeader = request.headers.get('x-admin-password');
    const validPassword = process.env.ADMIN_ACCESS_PASSWORD || 'nomadas2026';

    if (authHeader !== validPassword) {
      return NextResponse.json({ error: 'Acceso no autorizado' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const client = getServiceSupabase() || supabase;
    if (!client) {
      return NextResponse.json({ error: 'Supabase no configurado' }, { status: 500 });
    }

    const updateFields: any = {};
    if (body.status !== undefined) updateFields.status = body.status;
    if (body.notes !== undefined) updateFields.notes = body.notes;
    if (body.assigned_to !== undefined) updateFields.assigned_to = body.assigned_to;

    const { data, error } = await client
      .from('leads')
      .update(updateFields)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, lead: data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
