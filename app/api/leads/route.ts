import { NextResponse } from 'next/server';
import { supabase, getServiceSupabase } from '@/lib/supabase';
import { calculateLeadScore, LeadFormData } from '@/lib/scoring';

// POST: Registrar y calificar un nuevo lead desde la Landing Page
export async function POST(request: Request) {
  try {
    const body: LeadFormData = await request.json();

    if (!body.name || !body.whatsapp || !body.business_name) {
      return NextResponse.json(
        { error: 'Faltan campos obligatorios (Nombre, Negocio, WhatsApp)' },
        { status: 400 }
      );
    }

    // Calcular el Lead Score y la Temperatura
    const scoring = calculateLeadScore(body);

    const newLead = {
      name: body.name.trim(),
      business_name: body.business_name.trim(),
      whatsapp: body.whatsapp.replace(/\D/g, ''),
      email: body.email ? body.email.trim() : null,
      services: body.services || [],
      urgency: body.urgency,
      budget_range: body.budget_range,
      business_type: body.business_type,
      score: scoring.score,
      temperature: scoring.temperature,
      status: 'Nuevo',
      notes: '',
      assigned_to: 'Agente de Ventas'
    };

    // Si Supabase está configurado, guardar en la base de datos
    const client = getServiceSupabase() || supabase;
    if (client) {
      const { data, error } = await client
        .from('leads')
        .insert([newLead])
        .select()
        .single();

      if (error) {
        console.error('Error insertando lead en Supabase:', error);
        return NextResponse.json(
          { success: true, lead: newLead, warning: 'Guardado localmente, error en DB: ' + error.message },
          { status: 200 }
        );
      }

      return NextResponse.json({ success: true, lead: data }, { status: 201 });
    }

    // Si aún no han colocado las credenciales de Supabase
    return NextResponse.json({
      success: true,
      lead: newLead,
      mock: true,
      message: 'Lead calificado con éxito. (Configura las credenciales de Supabase para persistencia en nube).'
    });
  } catch (error: any) {
    console.error('Error en /api/leads:', error);
    return NextResponse.json({ error: error.message || 'Error del servidor' }, { status: 500 });
  }
}

// GET: Obtener lista de leads ordenados por SCORE DESC (los más calientes primero)
export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('x-admin-password');
    const validPassword = process.env.ADMIN_ACCESS_PASSWORD || 'nomadas2026';

    if (authHeader !== validPassword) {
      return NextResponse.json({ error: 'Acceso no autorizado' }, { status: 401 });
    }

    const client = getServiceSupabase() || supabase;
    if (!client) {
      return NextResponse.json({
        leads: [],
        warning: 'Supabase no está configurado aún en .env'
      });
    }

    // Consulta priorizada: Los más calientes (score desc) primero
    const { data, error } = await client
      .from('leads')
      .select('*')
      .order('score', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ leads: data || [] });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
