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

    const servicesList = Array.isArray(body.services) ? body.services : [];
    const servicesNote = servicesList.length > 0 ? `Servicios solicitados: ${servicesList.join(', ')}` : '';

    const newLead: any = {
      name: body.name.trim(),
      business_name: body.business_name.trim(),
      whatsapp: body.whatsapp.replace(/\D/g, ''),
      email: body.email ? body.email.trim() : null,
      urgency: body.urgency,
      budget_range: body.budget_range,
      business_type: body.business_type,
      score: scoring.score,
      temperature: scoring.temperature,
      status: 'Nuevo',
      notes: servicesNote,
      assigned_to: 'Agente de Ventas'
    };

    // Si Supabase está configurado, guardar en la base de datos
    const client = getServiceSupabase() || supabase;
    if (client) {
      // 1. Intentamos guardar con la columna 'services'
      let { data, error } = await client
        .from('leads')
        .insert([{ ...newLead, services: servicesList }])
        .select()
        .single();

      // 2. Si falla porque no existe la columna 'services' en el esquema de Supabase, reintentamos sin ella
      if (error && (error.code === 'PGRST204' || String(error.message).includes('services'))) {
        console.warn('Columna services no existe en tabla leads de Supabase. Reintentando inserción sin campo services...');
        const retry = await client
          .from('leads')
          .insert([newLead])
          .select()
          .single();
        data = retry.data;
        error = retry.error;
      }

      if (error) {
        console.error('Error definitivo insertando lead en Supabase:', error);
        return NextResponse.json(
          { error: 'Error al registrar en base de datos: ' + error.message },
          { status: 500 }
        );
      }

      // Asegurar que el objeto lead devuelto contenga los servicios seleccionados
      const resultLead = {
        ...data,
        services: Array.isArray(data?.services) && data.services.length > 0 ? data.services : servicesList
      };

      return NextResponse.json({ success: true, lead: resultLead }, { status: 201 });
    }

    // Si aún no han colocado las credenciales de Supabase
    return NextResponse.json({
      success: true,
      lead: { ...newLead, services: servicesList },
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

    // Normalizar leads para asegurar que 'services' siempre esté presente
    const normalizedLeads = (data || []).map((lead: any) => {
      let services = Array.isArray(lead.services) ? lead.services : [];
      if (services.length === 0 && lead.notes && lead.notes.includes('Servicios')) {
        const match = lead.notes.match(/Servicios(?:\s+solicitados)?:\s*([^\n]+)/);
        if (match) {
          services = match[1].split(',').map((s: string) => s.trim());
        }
      }
      return {
        ...lead,
        services
      };
    });

    return NextResponse.json({ leads: normalizedLeads });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
