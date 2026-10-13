'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Flame,
  Zap,
  Snowflake,
  Phone,
  MessageCircle,
  Search,
  RefreshCw,
  Lock,
  LogOut,
  CheckCircle2,
  Clock,
  Briefcase,
  DollarSign,
  AlertCircle,
  UserCheck,
  ChevronRight,
  Save,
  Filter
} from 'lucide-react';

interface Lead {
  id: string;
  created_at: string;
  name: string;
  business_name: string;
  whatsapp: string;
  email?: string;
  services: string[];
  urgency: string;
  budget_range: string;
  business_type: string;
  score: number;
  temperature: 'HOT' | 'WARM' | 'COLD';
  status: string;
  notes: string;
  assigned_to?: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [leads, setLeads] = useState<Lead[]>([]);
  const [filterTemp, setFilterTemp] = useState<string>('ALL');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNotes, setActiveNotes] = useState<{ [id: string]: string }>({});
  const [savingId, setSavingId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Intentar auto-login si ya hay contraseña en sessionStorage
  useEffect(() => {
    const saved = sessionStorage.getItem('nomadas_admin_token');
    if (saved) {
      setPassword(saved);
      fetchLeads(saved);
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError('');

    try {
      const res = await fetch('/api/leads', {
        headers: { 'x-admin-password': password }
      });

      if (res.status === 401) {
        setLoginError('Contraseña incorrecta. Por favor intenta de nuevo.');
        setIsLoading(false);
        return;
      }

      const data = await res.json();
      sessionStorage.setItem('nomadas_admin_token', password);
      setIsAuthenticated(true);
      setLeads(data.leads || []);
      initializeNotes(data.leads || []);
    } catch (err: any) {
      setLoginError('Error de conexión al servidor: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('nomadas_admin_token');
    setIsAuthenticated(false);
    setPassword('');
    setLeads([]);
  };

  const fetchLeads = async (pass: string) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/leads', {
        headers: { 'x-admin-password': pass }
      });
      if (res.ok) {
        const data = await res.json();
        setIsAuthenticated(true);
        setLeads(data.leads || []);
        initializeNotes(data.leads || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const initializeNotes = (items: Lead[]) => {
    const initialNotes: { [id: string]: string } = {};
    items.forEach((l) => {
      initialNotes[l.id] = l.notes || '';
    });
    setActiveNotes(initialNotes);
  };

  const updateLead = async (id: string, updates: { status?: string; notes?: string }) => {
    setSavingId(id);
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': password
        },
        body: JSON.stringify(updates)
      });

      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, ...updates } : l))
        );
        showToast('✅ Cambios guardados correctamente');
      } else {
        alert('Error al actualizar en la base de datos');
      }
    } catch (e) {
      alert('Error de red al actualizar');
    } finally {
      setSavingId(null);
    }
  };

  // Helper para generar mensaje de WhatsApp personalizado del vendedor
  const getAgentWhatsAppLink = (lead: Lead) => {
    let cleanPhone = lead.whatsapp.replace(/\D/g, '');
    if (cleanPhone.startsWith('0')) {
      cleanPhone = '593' + cleanPhone.slice(1);
    } else if (!cleanPhone.startsWith('593')) {
      cleanPhone = '593' + cleanPhone;
    }

    const services = lead.services?.join(', ') || 'nuestros servicios';
    const message = encodeURIComponent(
      `¡Hola ${lead.name}! 👋 Te saluda el equipo comercial de NÓMADAS AGENCIA desde Puyo. Vimos tu interés en potenciar "${lead.business_name}" con ${services}. ¿Tienes 5 minutos para conversar sobre cómo podemos ayudarte?`
    );
    return `https://wa.me/${cleanPhone}?text=${message}`;
  };

  // Filtrado y búsqueda
  const filteredLeads = leads
    .filter((l) => {
      if (filterTemp !== 'ALL' && l.temperature !== filterTemp) return false;
      if (filterStatus !== 'ALL' && l.status !== filterStatus) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = l.name?.toLowerCase().includes(q);
        const matchBiz = l.business_name?.toLowerCase().includes(q);
        const matchPhone = l.whatsapp?.includes(q);
        return matchName || matchBiz || matchPhone;
      }
      return true;
    })
    // REGLA CLAVE: Los más calientes (score desc) siempre hasta arriba
    .sort((a, b) => (b.score || 0) - (a.score || 0));

  // Métricas
  const totalLeads = leads.length;
  const hotLeads = leads.filter((l) => l.temperature === 'HOT').length;
  const warmLeads = leads.filter((l) => l.temperature === 'WARM').length;
  const coldLeads = leads.filter((l) => l.temperature === 'COLD').length;
  const contactedLeads = leads.filter((l) => l.status === 'Contactado' || l.status === 'En Negociación').length;
  const closedWon = leads.filter((l) => l.status === 'Cerrado Ganado').length;

  // ----------------- VISTA DE INICIO DE SESIÓN -----------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0F0F11] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#17171C] border border-zinc-800 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#E25822] via-[#FF7038] to-orange-400" />

          <div className="text-center mb-8">
            <div className="relative h-12 w-52 mx-auto mb-4">
              <Image
                src="/branding/logo.png"
                alt="NÓMADAS"
                fill
                priority
                className="object-contain"
              />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFEFF2] border border-zinc-300 text-xs font-bold text-zinc-800 mb-2">
              <Lock className="w-3.5 h-3.5 text-zinc-700" />
              <span>Panel Comercial Exclusivo</span>
            </div>
            <h1 className="text-2xl font-black text-white">Acceso a Prospectos</h1>
            <p className="text-xs text-zinc-400 mt-1">
              Ingresa tu contraseña para gestionar leads calificados y scoring.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                Contraseña de Acceso
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Introduce la contraseña..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3.5 bg-zinc-900 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-[#E25822] transition-colors text-sm"
                  required
                />
              </div>
            </div>

            {loginError && (
              <div className="p-3 bg-red-950/40 border border-red-800/80 rounded-xl text-xs text-red-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#EFEFF2] hover:bg-white text-zinc-900 font-bold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm border border-zinc-300 disabled:opacity-50"
            >
              {isLoading ? (
                <span>Verificando...</span>
              ) : (
                <>
                  <span>Acceso a Prospectos</span>
                  <ChevronRight className="w-4 h-4 text-zinc-700" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-zinc-800/80 text-center text-xs text-zinc-500">
            <span>NÓMADAS Agencia • Sistema de Scoring y Gestión Comercial</span>
          </div>
        </div>
      </div>
    );
  }

  // ----------------- VISTA DEL PANEL ADMINISTRATIVO -----------------
  return (
    <div className="min-h-screen bg-[#0F0F11] text-zinc-100 selection:bg-[#E25822] selection:text-white">
      {/* Toast flotante */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white font-semibold text-sm px-5 py-3 rounded-xl shadow-2xl animate-bounce">
          {toastMessage}
        </div>
      )}

      {/* Barra superior de administración */}
      <header className="sticky top-0 z-40 bg-[#EFEFF2] border-b border-zinc-300 shadow-sm px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative h-9 w-44">
              <Image
                src="/branding/logo.png"
                alt="NÓMADAS"
                fill
                priority
                className="object-contain object-left"
              />
            </div>
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-200/90 text-zinc-800 rounded-full text-xs font-bold border border-zinc-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>CRM Comercial • Prioridad por Scoring</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchLeads(password)}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-zinc-200 hover:bg-zinc-300 text-zinc-800 rounded-xl text-xs font-semibold transition-colors"
              title="Refrescar prospectos"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Actualizar</span>
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-xl text-xs font-bold transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Banner de bienvenida y reglas de prioridad */}
        <div className="bg-gradient-to-r from-[#17171C] via-[#1B1B22] to-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Tablero de Prospectos Calificados
            </h2>
            <p className="text-sm text-zinc-400 mt-1 max-w-2xl">
              Los prospectos están ordenados automáticamente con <strong className="text-[#FF7038]">los más calientes en la parte superior</strong> para que el agente de ventas contacte primero a las oportunidades con mayor intención de compra y presupuesto.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold rounded-xl border border-zinc-700 transition-colors"
            >
              Ver Landing Page ↗
            </a>
          </div>
        </div>

        {/* Tarjetas de Métricas (KPIs) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-[#17171C] border border-zinc-800 p-4 rounded-2xl">
            <div className="text-xs text-zinc-400 uppercase font-semibold">Total Leads</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1">{totalLeads}</div>
          </div>

          <div className="bg-[#1F1715] border border-orange-950/70 p-4 rounded-2xl relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#FF7038] uppercase font-bold">🔥 Calientes</span>
              <Flame className="w-4 h-4 text-[#E25822]" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#E25822] mt-1">{hotLeads}</div>
            <div className="text-[10px] text-zinc-500 mt-1">Llamar en &lt; 15 min</div>
          </div>

          <div className="bg-[#1C1A14] border border-amber-950/60 p-4 rounded-2xl">
            <div className="flex items-center justify-between">
              <span className="text-xs text-amber-400 uppercase font-bold">⚡ Tibios</span>
              <Zap className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 mt-1">{warmLeads}</div>
            <div className="text-[10px] text-zinc-500 mt-1">Hoy mismo</div>
          </div>

          <div className="bg-[#14181E] border border-blue-950/60 p-4 rounded-2xl">
            <div className="flex items-center justify-between">
              <span className="text-xs text-blue-400 uppercase font-bold">❄️ Fríos</span>
              <Snowflake className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-300 mt-1">{coldLeads}</div>
            <div className="text-[10px] text-zinc-500 mt-1">Seguimiento suave</div>
          </div>

          <div className="bg-[#17171C] border border-zinc-800 p-4 rounded-2xl">
            <div className="text-xs text-zinc-400 uppercase font-semibold">En Proceso</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1">{contactedLeads}</div>
            <div className="text-[10px] text-zinc-500 mt-1">Contactados / Negoc.</div>
          </div>

          <div className="bg-[#141C16] border border-emerald-950/70 p-4 rounded-2xl">
            <div className="flex items-center justify-between">
              <span className="text-xs text-emerald-400 uppercase font-bold">Ganados</span>
              <UserCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-1">{closedWon}</div>
            <div className="text-[10px] text-zinc-500 mt-1">Cierres exitosos</div>
          </div>
        </div>

        {/* Barra de Filtros y Búsqueda */}
        <div className="bg-[#17171C] border border-zinc-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por nombre, negocio o teléfono..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-700/80 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#E25822]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Filtro Temperatura */}
            <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-xl">
              <Filter className="w-3.5 h-3.5 text-zinc-400" />
              <select
                value={filterTemp}
                onChange={(e) => setFilterTemp(e.target.value)}
                className="bg-transparent text-xs text-zinc-200 focus:outline-none cursor-pointer"
              >
                <option value="ALL">Todas las Temperaturas</option>
                <option value="HOT">🔥 Solo Calientes</option>
                <option value="WARM">⚡ Solo Tibios</option>
                <option value="COLD">❄️ Solo Fríos</option>
              </select>
            </div>

            {/* Filtro Estado */}
            <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-xl">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-transparent text-xs text-zinc-200 focus:outline-none cursor-pointer"
              >
                <option value="ALL">Todos los Estados</option>
                <option value="Nuevo">Nuevo</option>
                <option value="Contactado">Contactado</option>
                <option value="En Negociación">En Negociación</option>
                <option value="No Contesta">No Contesta</option>
                <option value="Cerrado Ganado">Cerrado Ganado</option>
                <option value="Perdido">Perdido</option>
              </select>
            </div>
          </div>
        </div>

        {/* Lista de Leads Priorizados */}
        <div className="space-y-4">
          {filteredLeads.length === 0 ? (
            <div className="bg-[#17171C] border border-zinc-800 rounded-2xl p-12 text-center text-zinc-400">
              <p className="text-base font-semibold">No se encontraron prospectos con los filtros actuales.</p>
              <p className="text-xs text-zinc-500 mt-1">
                Los nuevos leads calificados desde la landing page aparecerán aquí ordenados por prioridad.
              </p>
            </div>
          ) : (
            filteredLeads.map((lead) => {
              const isHot = lead.temperature === 'HOT';
              const isWarm = lead.temperature === 'WARM';

              return (
                <div
                  key={lead.id}
                  className={`bg-[#17171C] border rounded-2xl p-5 sm:p-6 transition-all duration-200 shadow-md ${
                    isHot
                      ? 'border-[#E25822] bg-gradient-to-r from-[#1E1715] to-[#17171C] orange-border-glow'
                      : isWarm
                      ? 'border-amber-700/60'
                      : 'border-zinc-800'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                    {/* Columna Izquierda: Información del Contacto y Empresa */}
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-wrap items-center gap-2.5">
                        {/* Badge de Temperatura */}
                        {isHot ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E25822] text-white text-xs font-black shadow-md uppercase tracking-wider animate-pulse">
                            <Flame className="w-4 h-4" />
                            <span>🔥 Caliente ({lead.score}/100)</span>
                          </span>
                        ) : isWarm ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30 uppercase tracking-wider">
                            <Zap className="w-3.5 h-3.5" />
                            <span>⚡ Tibio ({lead.score}/100)</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/30 uppercase tracking-wider">
                            <Snowflake className="w-3.5 h-3.5" />
                            <span>❄️ Frío ({lead.score}/100)</span>
                          </span>
                        )}

                        <span className="text-xs text-zinc-500">
                          {new Date(lead.created_at).toLocaleDateString()} a las {new Date(lead.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                          <span>{lead.name}</span>
                          <span className="text-zinc-500 font-normal text-sm">—</span>
                          <span className="text-[#FF7038] text-base font-semibold">{lead.business_name}</span>
                        </h3>
                        <p className="text-xs text-zinc-400 mt-0.5">
                          Tipo: <strong className="text-zinc-200">{lead.business_type === 'empresa_activa' ? 'Negocio con Ventas / Local Activo' : 'Emprendimiento Nuevo'}</strong>
                        </p>
                      </div>

                      {/* Detalles del requerimiento */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 text-xs">
                        <div className="bg-zinc-900/80 p-2.5 rounded-xl border border-zinc-800">
                          <span className="text-zinc-500 block mb-0.5">Urgencia:</span>
                          <span className="text-zinc-200 font-semibold flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#E25822]" />
                            {lead.urgency === 'esta_semana' ? '¡Esta misma semana!' : lead.urgency === 'este_mes' ? 'En 2 a 4 semanas' : 'Solo cotizando'}
                          </span>
                        </div>

                        <div className="bg-zinc-900/80 p-2.5 rounded-xl border border-zinc-800">
                          <span className="text-zinc-500 block mb-0.5">Presupuesto estimado:</span>
                          <span className="text-zinc-200 font-semibold flex items-center gap-1">
                            <DollarSign className="w-3 h-3 text-emerald-400" />
                            {lead.budget_range === 'alto' ? '> $800 USD' : lead.budget_range === 'medio_alto' ? '$400 - $800 USD' : lead.budget_range === 'medio' ? '$200 - $400 USD' : '< $200 USD'}
                          </span>
                        </div>

                        <div className="bg-zinc-900/80 p-2.5 rounded-xl border border-zinc-800">
                          <span className="text-zinc-500 block mb-0.5">Servicios:</span>
                          <span className="text-zinc-200 font-medium truncate block">
                            {lead.services?.length > 0 ? lead.services.join(', ') : 'No especificado'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Columna Derecha: Acciones del Agente de Ventas */}
                    <div className="w-full lg:w-72 space-y-3.5 border-t lg:border-t-0 lg:border-l border-zinc-800 lg:pl-6 pt-4 lg:pt-0">
                      {/* Botones de Contacto Directo */}
                      <div className="flex items-center gap-2">
                        <a
                          href={getAgentWhatsAppLink(lead)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 px-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>WhatsApp</span>
                        </a>

                        <a
                          href={`tel:${lead.whatsapp}`}
                          className="px-3 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors border border-zinc-700"
                          title="Llamar directamente"
                        >
                          <Phone className="w-4 h-4" />
                        </a>
                      </div>

                      {/* Selector de Estado */}
                      <div>
                        <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                          Estado de Contacto:
                        </label>
                        <select
                          value={lead.status}
                          disabled={savingId === lead.id}
                          onChange={(e) => updateLead(lead.id, { status: e.target.value })}
                          className={`w-full px-3 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                            lead.status === 'Nuevo'
                              ? 'bg-blue-950/40 text-blue-300 border-blue-800'
                              : lead.status === 'Contactado'
                              ? 'bg-amber-950/40 text-amber-300 border-amber-800'
                              : lead.status === 'En Negociación'
                              ? 'bg-purple-950/40 text-purple-300 border-purple-800'
                              : lead.status === 'Cerrado Ganado'
                              ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800'
                              : lead.status === 'No Contesta'
                              ? 'bg-zinc-800 text-zinc-400 border-zinc-700'
                              : 'bg-red-950/40 text-red-300 border-red-800'
                          }`}
                        >
                          <option value="Nuevo">🔵 Nuevo (Sin contactar)</option>
                          <option value="Contactado">🟡 Contactado</option>
                          <option value="En Negociación">🟣 En Negociación</option>
                          <option value="No Contesta">⚪ No Contesta</option>
                          <option value="Cerrado Ganado">🟢 Cerrado Ganado 🏆</option>
                          <option value="Perdido">🔴 Perdido</option>
                        </select>
                      </div>

                      {/* Notas del Vendedor */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-[11px] font-semibold text-zinc-400">
                            Notas del Vendedor:
                          </label>
                          {activeNotes[lead.id] !== lead.notes && (
                            <button
                              onClick={() => updateLead(lead.id, { notes: activeNotes[lead.id] })}
                              disabled={savingId === lead.id}
                              className="text-[10px] text-[#FF7038] hover:underline flex items-center gap-1 font-bold"
                            >
                              <Save className="w-3 h-3" />
                              <span>Guardar Nota</span>
                            </button>
                          )}
                        </div>
                        <textarea
                          rows={2}
                          placeholder="Anota detalles de la llamada..."
                          value={activeNotes[lead.id] ?? lead.notes ?? ''}
                          onChange={(e) =>
                            setActiveNotes({ ...activeNotes, [lead.id]: e.target.value })
                          }
                          className="w-full p-2 bg-zinc-900 border border-zinc-700/80 rounded-xl text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-[#E25822] resize-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}
