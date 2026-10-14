'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Palette,
  Globe,
  TrendingUp,
  Video,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  HelpCircle,
  ChevronDown,
  ShieldCheck,
  Zap,
  Target,
  Menu,
  X,
  Flame,
  Send,
  Loader2,
  Lock,
  Navigation
} from 'lucide-react';
import PortfolioRoulette from '@/components/PortfolioRoulette';

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Estados para el Formulario de Calificación y Scoring
  const [formData, setFormData] = useState({
    name: '',
    business_name: '',
    whatsapp: '',
    email: '',
    services: ['Landing Page & Web'],
    urgency: 'esta_semana' as 'esta_semana' | 'este_mes' | 'explorando',
    budget_range: 'medio_alto' as 'alto' | 'medio_alto' | 'medio' | 'bajo',
    business_type: 'empresa_activa' as 'empresa_activa' | 'emprendimiento',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [scoredLeadResult, setScoredLeadResult] = useState<any>(null);

  // Posición de Scroll para Efecto Parallax en el Video de Fondo
  const [scrollY, setScrollY] = useState(0);

  // Estados para el Titular Dinámico con Efecto de Transición
  const dynamicWords = [
    'una marca imparable.',
    'una máquina de ventas.',
    'un imán de clientes reales.',
    'un referente líder en Ecuador.'
  ];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % dynamicWords.length);
        setIsFading(false);
      }, 350);
    }, 3200);
    return () => clearInterval(timer);
  }, [dynamicWords.length]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const servicesList = [
    { id: 'Branding & Identidad', label: '🎨 Branding e Identidad' },
    { id: 'Landing Page & Web', label: '⚡ Landing Page & Web' },
    { id: 'Pauta Meta/Google Ads', label: '📈 Pauta Digital (Ads)' },
    { id: 'Contenido & Redes', label: '📱 Gestión de Redes Sociales' },
    { id: 'Producción Audiovisual', label: '🎬 Video & Fotografía' },
  ];

  const toggleService = (id: string) => {
    if (formData.services.includes(id)) {
      setFormData({
        ...formData,
        services: formData.services.filter((s) => s !== id)
      });
    } else {
      setFormData({
        ...formData,
        services: [...formData.services, id]
      });
    }
  };

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.business_name.trim() || !formData.whatsapp.trim()) {
      alert('Por favor completa tu nombre, el nombre de tu negocio y tu WhatsApp.');
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        setScoredLeadResult(data.lead);
        setSubmitSuccess(true);
      } else {
        alert(data.error || 'Error al enviar la solicitud.');
      }
    } catch (err: any) {
      alert('Error de conexión: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getWhatsAppUrl = () => {
    const phone = '593962577613'; // Número oficial de Nómadas (0962577613)
    const servicesText = formData.services.length > 0 ? formData.services.join(', ') : 'Servicios generales';
    const businessText = formData.business_name ? ` para mi negocio "${formData.business_name}"` : '';
    const message = encodeURIComponent(
      `¡Hola Nómadas! 👋 Me gustaría cotizar ${servicesText}${businessText}. ¿Podrían brindarme información y asesoría?`
    );
    return `https://wa.me/${phone}?text=${message}`;
  };

  const faqs = [
    {
      q: '¿Por qué contratar a Nómadas en lugar de una imprenta tradicional?',
      a: 'Las imprentas imprimen volantes y lonas que rara vez se pueden medir. En Nómadas somos una agencia digital integral: creamos marcas con estrategia, diseñamos sitios web de conversión y lanzamos anuncios digitales segmentados que te traen clientes con métricas exactas de retorno de inversión.'
    },
    {
      q: '¿Trabajan solo con negocios de Puyo o en todo Ecuador?',
      a: 'Nuestra oficina física está en Puyo (Av. Alberto Zambrano), lo que nos da cercanía y confianza local. Sin embargo, ejecutamos proyectos de branding, desarrollo web y pauta digital para clientes en Quito, Guayaquil, Baños, Cuenca y el exterior de forma 100% remota.'
    },
    {
      q: '¿Cuánto tiempo toma tener lista una Landing Page o Sitio Web?',
      a: 'Una Landing Page de alta conversión optimizada para celulares y WhatsApp suele estar lista y desplegada en 5 a 10 días laborables, incluyendo copywriting, diseño responsivo y optimización de velocidad.'
    },
    {
      q: '¿Qué necesito para empezar mi proyecto?',
      a: 'Solo necesitas escribirnos por WhatsApp o visitarnos en nuestra oficina. Conversaremos sobre tus objetivos, analizaremos tu competencia y te presentaremos una propuesta a medida sin compromiso.'
    },
    {
      q: '¿Cómo garantizan los resultados de la pauta publicitaria?',
      a: 'No prometemos cifras irreales de "likes". Diseñamos embudos donde cada dólar invertido en Meta Ads o Google Ads está dirigido a prospectos calificados que hacen clic directo a tu WhatsApp o formulario de cotización.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0F0F11] text-zinc-100 selection:bg-[#E25822] selection:text-white relative">
      {/* ----------------- VIDEO DE FONDO PERSISTENTE (SIGUE EL SCROLL DE LA PÁGINA) ----------------- */}
      <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-30 filter brightness-90 contrast-120 will-change-transform"
          style={{
            transform: `translateY(${Math.min(scrollY * 0.14, 240)}px) scale(1.12)`
          }}
        >
          <source src="/videos/hero-loop.mp4" type="video/mp4" />
        </video>
        {/* Capa oscura sutil para que los textos, botones y tarjetas tengan legibilidad óptima */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F11]/85 via-[#0F0F11]/75 to-[#0F0F11]/90" />
      </div>

      {/* ----------------- NAVBAR (Gris Claro) ----------------- */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#EFEFF2]/95 border-b border-zinc-300/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-56 sm:w-64">
              <Image
                src="/branding/logo.png"
                alt="NÓMADAS Agencia de Diseño y Marketing Digital"
                fill
                priority
                className="object-contain object-left"
              />
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-zinc-700">
            <a href="#servicios" className="hover:text-[#E25822] transition-colors">Servicios</a>
            <a href="#portafolio" className="hover:text-[#E25822] transition-colors">Portafolio</a>
            <a href="#diferencia" className="hover:text-[#E25822] transition-colors">El Método</a>
            <a href="#cotizador" className="hover:text-[#E25822] transition-colors">Cotizador</a>
            <a href="#ubicacion" className="hover:text-[#E25822] transition-colors">Ubicación</a>
            <a href="#faq" className="hover:text-[#E25822] transition-colors">FAQ</a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#E25822] hover:bg-[#C94614] text-white font-bold text-sm px-5 py-2.5 rounded-full transition-all duration-300 orange-glow shadow-md hover:scale-105"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Cotizar por WhatsApp</span>
            </a>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-700 hover:text-zinc-950"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#EFEFF2] border-b border-zinc-300 px-4 pt-3 pb-6 space-y-3 shadow-lg">
            <a
              href="#servicios"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-zinc-800 hover:text-[#E25822] py-2 text-base font-semibold"
            >
              Servicios
            </a>
            <a
              href="#portafolio"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-zinc-800 hover:text-[#E25822] py-2 text-base font-semibold"
            >
              Portafolio
            </a>
            <a
              href="#diferencia"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-zinc-800 hover:text-[#E25822] py-2 text-base font-semibold"
            >
              El Método
            </a>
            <a
              href="#cotizador"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-zinc-800 hover:text-[#E25822] py-2 text-base font-semibold"
            >
              Cotizador
            </a>
            <a
              href="#ubicacion"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-zinc-800 hover:text-[#E25822] py-2 text-base font-semibold"
            >
              Ubicación
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-zinc-800 hover:text-[#E25822] py-2 text-base font-semibold"
            >
              FAQ
            </a>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#E25822] text-white font-bold py-3 rounded-xl mt-4 shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Cotizar por WhatsApp</span>
            </a>
          </div>
        )}
      </header>

      {/* ----------------- HERO SECTION ----------------- */}
      <section className="relative pt-16 pb-24 lg:pt-28 lg:pb-32 overflow-hidden z-10">
        {/* Background ambient radial gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#E25822]/15 blur-[120px] rounded-full pointer-events-none z-0" />
        <div className="absolute -top-10 left-10 w-72 h-72 bg-orange-600/10 blur-[100px] rounded-full pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Headline Dinámico con Transición y Shimmer */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.14]">
            <span>Dejamos atrás la publicidad que </span>
            <span className="relative inline-block text-zinc-300 font-bold group">
              no mide resultados.
              <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-red-500/80 via-[#E25822] to-amber-500 rounded-full animate-pulse" />
            </span>{' '}
            <span className="block mt-2 sm:mt-4">
              Transformamos tu negocio en{' '}
              <span className="inline-block relative">
                <span
                  key={currentWordIndex}
                  className={`inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#E25822] via-[#FF7038] to-amber-300 text-shimmer drop-shadow-[0_0_35px_rgba(226,88,34,0.4)] transition-all duration-500 transform ${
                    isFading
                      ? 'opacity-0 translate-y-3 blur-sm scale-95'
                      : 'opacity-100 translate-y-0 blur-0 scale-100'
                  }`}
                >
                  {dynamicWords[currentWordIndex]}
                </span>
                <span className="inline-block w-1 sm:w-1.5 h-8 sm:h-12 lg:h-14 bg-[#FF7038] ml-1.5 align-middle cursor-blink rounded-full shadow-[0_0_12px_#E25822]" />
              </span>
            </span>
          </h1>

          {/* Slogan & subheadline */}
          <p className="mt-6 text-lg sm:text-xl text-zinc-400 max-w-3xl mx-auto font-normal leading-relaxed">
            <span className="text-zinc-200 font-semibold tracking-wider uppercase text-sm block mb-2 text-[#FF7038]">
              Estrategias • Creatividad • Resultados
            </span>
            Diseñamos identidades de marca memorables, sitios web ultrarrápidos y pauta publicitaria digital orientada a conseguir clientes reales para tu negocio en Puyo y todo el país.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
            <a
              href="#cotizador"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#E25822] hover:bg-[#C94614] text-white font-bold text-base px-8 py-4 rounded-xl transition-all duration-300 orange-glow shadow-xl hover:-translate-y-0.5"
            >
              <span>Cotizar Mi Proyecto Gratis</span>
              <ArrowRight className="w-5 h-5" />
            </a>

            <a
              href="#servicios"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700/90 font-semibold text-base px-7 py-4 rounded-xl transition-all duration-300"
            >
              <span>Ver Nuestros Servicios</span>
            </a>
          </div>

          {/* Trust badges / stats */}
          <div className="mt-16 pt-12 border-t border-zinc-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-left">
            <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#E25822]">100%</div>
              <div className="text-xs sm:text-sm text-zinc-400 mt-1">Enfoque en Retorno (ROAS)</div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800">
              <div className="text-2xl sm:text-3xl font-extrabold text-white">360°</div>
              <div className="text-xs sm:text-sm text-zinc-400 mt-1">Branding, Web y Pauta</div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#E25822]">&lt; 1s</div>
              <div className="text-xs sm:text-sm text-zinc-400 mt-1">Velocidad de Carga Web</div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800">
              <div className="text-2xl sm:text-3xl font-extrabold text-white">Local</div>
              <div className="text-xs sm:text-sm text-zinc-400 mt-1">Av. Alberto Zambrano, Puyo</div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- PROBLEMA VS SOLUCIÓN ----------------- */}
      <section className="py-20 bg-[#141418]/85 backdrop-blur-sm border-y border-zinc-800/80 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs sm:text-sm font-bold tracking-widest text-[#E25822] uppercase">
              El Dilema del Comercio Local
            </h2>
            <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-white">
              ¿Sigues gastando en publicidad que nadie sabe si funciona?
            </p>
            <p className="mt-4 text-zinc-400 text-base">
              La mayoría de negocios en la región siguen atrapados en métodos del pasado. Compara la diferencia entre la publicidad tradicional y el enfoque de Nómadas:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Tradicional */}
            <div className="bg-[#191920] border border-red-950/40 rounded-2xl p-8 relative overflow-hidden">
              <div className="flex items-center gap-3 mb-6">
                <XCircle className="w-7 h-7 text-red-500 flex-shrink-0" />
                <h3 className="text-xl font-bold text-white">Publicidad Tradicional & Imprentas</h3>
              </div>
              <ul className="space-y-4 text-zinc-400 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold">✕</span>
                  <span>Volantes y afiches que terminan tirados en el suelo sin generar ventas comprobables.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold">✕</span>
                  <span>Gigantografías y lonas caras que no puedes actualizar ni segmentar por público.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold">✕</span>
                  <span>Logos hechos sin manual de identidad, tipografía ni coherencia estratégica de marca.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold">✕</span>
                  <span>"Postear por postear" en redes sociales esperando que un cliente llegue por suerte.</span>
                </li>
              </ul>
            </div>

            {/* Método Nómadas */}
            <div className="bg-[#1A1A22] border-2 border-[#E25822]/70 rounded-2xl p-8 relative overflow-hidden orange-border-glow">
              <div className="absolute top-0 right-0 bg-[#E25822] text-white text-xs font-bold px-4 py-1 rounded-bl-xl uppercase tracking-wider">
                El Estándar Nómadas
              </div>
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle2 className="w-7 h-7 text-[#E25822] flex-shrink-0" />
                <h3 className="text-xl font-bold text-white">Estrategia Digital 360 Nómadas</h3>
              </div>
              <ul className="space-y-4 text-zinc-300 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-[#E25822] font-bold">✓</span>
                  <span><strong>Embudos medibles:</strong> Cada dólar invertido te muestra cuántas personas hicieron clic a tu WhatsApp.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#E25822] font-bold">✓</span>
                  <span><strong>Landing Pages que convierten:</strong> Páginas creadas para cerrar prospectos las 24 horas del día.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#E25822] font-bold">✓</span>
                  <span><strong>Branding de alto impacto:</strong> Identidad visual profesional que justifica cobrar precios más altos.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#E25822] font-bold">✓</span>
                  <span><strong>Pauta con Inteligencia Artificial:</strong> Anuncios mostrados solo a personas con interés real en comprar.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- SERVICIOS PRINCIPALES ----------------- */}
      <section id="servicios" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E25822]/10 border border-[#E25822]/30 text-xs font-semibold text-[#FF7038] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Nuestros 4 Pilares de Crecimiento</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Soluciones integrales para hacer crecer tu marca
          </h2>
          <p className="mt-4 text-zinc-400 text-base">
            No vendemos humo. Construimos los activos comerciales digitales que tu empresa necesita para destacar y vender.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pilar 1 */}
          <div className="bg-[#17171C] border border-zinc-800 rounded-2xl p-7 hover:border-[#E25822]/60 transition-all duration-300 hover:-translate-y-1 group">
            <div className="w-14 h-14 rounded-xl bg-[#E25822]/10 border border-[#E25822]/20 flex items-center justify-center text-[#E25822] mb-6 group-hover:bg-[#E25822] group-hover:text-white transition-all">
              <Palette className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Identidad de Marca & Branding</h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              Diseño de logotipo, manual de identidad corporativa, paleta de colores, tipografías y diseño de empaques. Una marca que proyecta autoridad y confianza.
            </p>
            <ul className="text-xs text-zinc-400 space-y-2 border-t border-zinc-800 pt-4">
              <li className="flex items-center gap-2">
                <span className="text-[#E25822]">●</span> Logotipos y variantes oficiales
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#E25822]">●</span> Manual de estilo y directrices
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#E25822]">●</span> Adaptación para empaques y redes
              </li>
            </ul>
          </div>

          {/* Pilar 2 */}
          <div className="bg-[#17171C] border border-zinc-800 rounded-2xl p-7 hover:border-[#E25822]/60 transition-all duration-300 hover:-translate-y-1 group">
            <div className="w-14 h-14 rounded-xl bg-[#E25822]/10 border border-[#E25822]/20 flex items-center justify-center text-[#E25822] mb-6 group-hover:bg-[#E25822] group-hover:text-white transition-all">
              <Globe className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Landing Pages & Sitios Web</h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              Páginas web modernas construidas con tecnología de vanguardia (Next.js). Ultrarrápidas, 100% responsivas para celulares y optimizadas para Google SEO y WhatsApp.
            </p>
            <ul className="text-xs text-zinc-400 space-y-2 border-t border-zinc-800 pt-4">
              <li className="flex items-center gap-2">
                <span className="text-[#E25822]">●</span> Landing Pages de conversión
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#E25822]">●</span> Integración con WhatsApp directo
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#E25822]">●</span> Carga en menos de 1 segundo
              </li>
            </ul>
          </div>

          {/* Pilar 3 */}
          <div className="bg-[#17171C] border border-zinc-800 rounded-2xl p-7 hover:border-[#E25822]/60 transition-all duration-300 hover:-translate-y-1 group">
            <div className="w-14 h-14 rounded-xl bg-[#E25822]/10 border border-[#E25822]/20 flex items-center justify-center text-[#E25822] mb-6 group-hover:bg-[#E25822] group-hover:text-white transition-all">
              <TrendingUp className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Pauta Digital & Performance Ads</h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              Campañas de publicidad pagada en Meta (Facebook e Instagram Ads) y Google Ads. Llevamos a prospectos interesados directamente a tu bandeja de entrada.
            </p>
            <ul className="text-xs text-zinc-400 space-y-2 border-t border-zinc-800 pt-4">
              <li className="flex items-center gap-2">
                <span className="text-[#E25822]">●</span> Segmentación geográfica exacta
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#E25822]">●</span> Pruebas A/B de creativos
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#E25822]">●</span> Reportes claros de clientes captados
              </li>
            </ul>
          </div>

          {/* Pilar 4 */}
          <div className="bg-[#17171C] border border-zinc-800 rounded-2xl p-7 hover:border-[#E25822]/60 transition-all duration-300 hover:-translate-y-1 group">
            <div className="w-14 h-14 rounded-xl bg-[#E25822]/10 border border-[#E25822]/20 flex items-center justify-center text-[#E25822] mb-6 group-hover:bg-[#E25822] group-hover:text-white transition-all">
              <Video className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Contenido & Producción Audiovisual</h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              Estrategia de contenidos, diseño gráfico para redes y producción de Reels / TikToks que generan impacto, fidelizan clientes y construyen comunidad activa.
            </p>
            <ul className="text-xs text-zinc-400 space-y-2 border-t border-zinc-800 pt-4">
              <li className="flex items-center gap-2">
                <span className="text-[#E25822]">●</span> Video y fotografía comercial
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#E25822]">●</span> Calendario mensual estructurado
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#E25822]">●</span> Guiones y narrativa persuasiva
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ----------------- PORTAFOLIO / RULETA INTERACTIVA ----------------- */}
      <PortfolioRoulette />

      {/* ----------------- EL MÉTODO NÓMADA ----------------- */}
      <section id="diferencia" className="py-20 bg-[#141418]/85 backdrop-blur-sm border-y border-zinc-800/80 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs sm:text-sm font-bold tracking-widest text-[#E25822] uppercase">
              Proceso Comprobado
            </h2>
            <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-white">
              El Método Nómadas para tu éxito
            </p>
            <p className="mt-4 text-zinc-400 text-base">
              No improvisamos. Aplicamos una metodología de 4 pasos para garantizar que cada proyecto entregue valor tangible.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-[#181820] border border-zinc-800 p-6 rounded-2xl relative">
              <div className="text-4xl font-black text-[#E25822]/40 mb-3">01</div>
              <h3 className="text-lg font-bold text-white mb-2">Diagnóstico Profundo</h3>
              <p className="text-zinc-400 text-sm">
                Analizamos tu nicho, tus competidores en la zona y qué es lo que realmente buscan tus clientes ideales.
              </p>
            </div>

            <div className="bg-[#181820] border border-zinc-800 p-6 rounded-2xl relative">
              <div className="text-4xl font-black text-[#E25822]/40 mb-3">02</div>
              <h3 className="text-lg font-bold text-white mb-2">Estrategia & Diseño</h3>
              <p className="text-zinc-400 text-sm">
                Construimos la propuesta de valor, el diseño visual de alto impacto y la arquitectura persuasiva.
              </p>
            </div>

            <div className="bg-[#181820] border border-zinc-800 p-6 rounded-2xl relative">
              <div className="text-4xl font-black text-[#E25822]/40 mb-3">03</div>
              <h3 className="text-lg font-bold text-white mb-2">Despliegue & Tráfico</h3>
              <p className="text-zinc-400 text-sm">
                Lanzamos los activos web e impulsamos campañas publicitarias segmentadas para atraer flujo de prospectos.
              </p>
            </div>

            <div className="bg-[#181820] border border-zinc-800 p-6 rounded-2xl relative">
              <div className="text-4xl font-black text-[#E25822]/40 mb-3">04</div>
              <h3 className="text-lg font-bold text-white mb-2">Optimización & Escala</h3>
              <p className="text-zinc-400 text-sm">
                Medimos resultados, pulimos las conversiones y escalamos los canales que generan mayor facturación.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- FORMULARIO DE CALIFICACIÓN & SCORING ----------------- */}
      <section id="cotizador" className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-b from-[#1B1B22] to-[#141418] border-2 border-zinc-700/80 rounded-3xl p-8 sm:p-12 orange-border-glow">
          {submitSuccess ? (
            <div className="text-center py-8 space-y-6">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                ¡Diagnóstico Comercial Enviado con Éxito!
              </h2>

              {scoredLeadResult?.temperature === 'HOT' ? (
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#E25822] text-white font-extrabold text-sm sm:text-base shadow-xl animate-pulse">
                  <Flame className="w-5 h-5" />
                  <span>🔥 Prioridad Alta Asignada (Calificación: {scoredLeadResult.score}/100)</span>
                </div>
              ) : scoredLeadResult?.temperature === 'WARM' ? (
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold text-sm sm:text-base">
                  <Zap className="w-5 h-5" />
                  <span>⚡ Oportunidad Calificada (Calificación: {scoredLeadResult?.score}/100)</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 font-bold text-sm">
                  <span>❄️ Solicitud Registrada ({scoredLeadResult?.score}/100)</span>
                </div>
              )}

              <p className="text-zinc-300 text-base max-w-xl mx-auto leading-relaxed">
                Gracias, <strong>{formData.name}</strong>. Hemos registrado a <strong>{formData.business_name}</strong> en nuestro sistema de atención. Tu estratega asignado revisará tus requerimientos y te contactará de inmediato.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#E25822] hover:bg-[#C94614] text-white font-bold text-base px-8 py-4 rounded-xl transition-all shadow-xl orange-glow"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Chatear ahora mismo por WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitSuccess(false);
                    setFormData({
                      name: '',
                      business_name: '',
                      whatsapp: '',
                      email: '',
                      services: ['Landing Page & Web'],
                      urgency: 'esta_semana',
                      budget_range: 'medio_alto',
                      business_type: 'empresa_activa',
                    });
                  }}
                  className="w-full sm:w-auto px-6 py-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm font-semibold rounded-xl border border-zinc-700 transition-colors"
                >
                  Calificar otro proyecto
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitLead} className="space-y-8">
              <div className="text-center max-w-2xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E25822]/20 text-xs font-bold text-[#FF7038] mb-3">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Diagnóstico y Calificación Comercial</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-white">
                  Cotiza y califica tu proyecto en 1 minuto
                </h2>
                <p className="mt-3 text-zinc-400 text-sm sm:text-base">
                  Completa este breve formulario. Nuestro sistema clasificará la prioridad de tu solicitud para que un estratega comercial se contacte contigo de inmediato.
                </p>
              </div>

              {/* Paso 1: Datos de Contacto */}
              <div className="bg-zinc-900/60 p-6 rounded-2xl border border-zinc-800 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#E25822] text-white text-xs flex items-center justify-center font-bold">1</span>
                  <span>Datos de Contacto</span>
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Tu Nombre y Apellido *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Carlos Mendoza"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-[#E25822]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Nombre de tu Negocio o Empresa *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Hostería El Mirador"
                      value={formData.business_name}
                      onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
                      className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-[#E25822]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Teléfono / WhatsApp de Contacto *</label>
                    <input
                      type="tel"
                      required
                      placeholder="Ej. 0962577613"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-[#E25822]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Correo Electrónico (Opcional)</label>
                    <input
                      type="email"
                      placeholder="correo@ejemplo.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-[#E25822]"
                    />
                  </div>
                </div>
              </div>

              {/* Paso 2: Servicios */}
              <div className="bg-zinc-900/60 p-6 rounded-2xl border border-zinc-800 space-y-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#E25822] text-white text-xs flex items-center justify-center font-bold">2</span>
                  <span>Soluciones que Necesitas (Selecciona una o más)</span>
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {servicesList.map((svc) => {
                    const isSelected = formData.services.includes(svc.id);
                    return (
                      <button
                        key={svc.id}
                        type="button"
                        onClick={() => toggleService(svc.id)}
                        className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                          isSelected
                            ? 'bg-[#E25822] text-white shadow-md'
                            : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                        }`}
                      >
                        {svc.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Paso 3: Preguntas de Scoring Calificador */}
              <div className="bg-zinc-900/60 p-6 rounded-2xl border border-zinc-800 space-y-5">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#E25822] text-white text-xs flex items-center justify-center font-bold">3</span>
                  <span>Preguntas de Calificación y Prioridad</span>
                </h3>

                {/* Urgencia */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-2">
                    ¿Con qué urgencia necesitas iniciar el proyecto?
                  </label>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {[
                      { val: 'esta_semana', label: '⚡ Esta misma semana', desc: 'Prioridad máxima de arranque' },
                      { val: 'este_mes', label: '📅 En 2 a 4 semanas', desc: 'Plazo planificado' },
                      { val: 'explorando', label: '🔍 Solo cotizando', desc: 'Sin fecha definida aún' },
                    ].map((item) => (
                      <button
                        key={item.val}
                        type="button"
                        onClick={() => setFormData({ ...formData, urgency: item.val as any })}
                        className={`p-3 rounded-xl text-left border transition-all ${
                          formData.urgency === item.val
                            ? 'bg-[#E25822]/15 border-[#E25822] text-white'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                        }`}
                      >
                        <div className="text-xs font-bold text-zinc-200">{item.label}</div>
                        <div className="text-[10px] text-zinc-500 mt-0.5">{item.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Presupuesto */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-2">
                    ¿Cuál es tu rango de presupuesto estimado de inversión?
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { val: 'alto', label: '> $800 USD', desc: 'Crecimiento agresivo' },
                      { val: 'medio_alto', label: '$400 - $800 USD', desc: 'Inversión estándar' },
                      { val: 'medio', label: '$200 - $400 USD', desc: 'Inversión inicial' },
                      { val: 'bajo', label: '< $200 USD', desc: 'Bajo presupuesto' },
                    ].map((item) => (
                      <button
                        key={item.val}
                        type="button"
                        onClick={() => setFormData({ ...formData, budget_range: item.val as any })}
                        className={`p-3 rounded-xl text-left border transition-all ${
                          formData.budget_range === item.val
                            ? 'bg-[#E25822]/15 border-[#E25822] text-white'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                        }`}
                      >
                        <div className="text-xs font-bold text-zinc-200">{item.label}</div>
                        <div className="text-[10px] text-zinc-500 mt-0.5">{item.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Madurez del negocio */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-2">
                    ¿Cuál es el estado actual de tu negocio?
                  </label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      { val: 'empresa_activa', label: '🏢 Empresa con Local o Ventas Activas', desc: 'Negocio funcionando con clientes habituales' },
                      { val: 'emprendimiento', label: '🚀 Emprendimiento Nuevo', desc: 'Idea o proyecto en fase de lanzamiento' },
                    ].map((item) => (
                      <button
                        key={item.val}
                        type="button"
                        onClick={() => setFormData({ ...formData, business_type: item.val as any })}
                        className={`p-3 rounded-xl text-left border transition-all ${
                          formData.business_type === item.val
                            ? 'bg-[#E25822]/15 border-[#E25822] text-white'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                        }`}
                      >
                        <div className="text-xs font-bold text-zinc-200">{item.label}</div>
                        <div className="text-[10px] text-zinc-500 mt-0.5">{item.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Botón de Enviar */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-3 bg-[#E25822] hover:bg-[#C94614] text-white font-extrabold text-base sm:text-lg py-4 rounded-xl transition-all duration-300 orange-glow shadow-xl hover:scale-[1.01] disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Calificando y registrando solicitud...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Enviar y Recibir Diagnóstico Comercial Prioritario</span>
                    </>
                  )}
                </button>
                <p className="text-center text-xs text-zinc-500 mt-3 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Tus datos son 100% confidenciales. Asignación inmediata a un estratega en Puyo.</span>
                </p>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* ----------------- UBICACIÓN Y CONFIANZA ----------------- */}
      <section id="ubicacion" className="py-20 bg-[#141418]/85 backdrop-blur-sm border-t border-zinc-800/80 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E25822]/10 border border-[#E25822]/30 text-xs font-semibold text-[#FF7038] mb-4">
                <MapPin className="w-3.5 h-3.5" />
                <span>Tu Agencia Aliada en Puyo</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
                Visítanos en nuestra sede física o agenda una reunión virtual
              </h2>
              <p className="text-zinc-400 text-base leading-relaxed mb-8">
                Creemos en la cercanía y la confianza. Estamos ubicados en un punto neurálgico y accesible de Puyo para coordinar proyectos presencialmente, además de atender clientes en todo Ecuador mediante videollamada.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                  <div className="p-3 bg-[#E25822]/10 text-[#E25822] rounded-lg">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-white text-base">Dirección Estratégica:</h3>
                      <a
                        href="https://maps.app.goo.gl/kBrLLFJriD5r1Ewp8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-[#FF7038] hover:text-[#ff8a57] inline-flex items-center gap-1 underline underline-offset-2"
                      >
                        <span>Cómo llegar</span>
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                    <p className="text-sm text-zinc-300 mt-1">
                      Av. Alberto Zambrano esquina, diagonal a la Cooperativa OSCUS.
                    </p>
                    <p className="text-xs text-zinc-500 mt-1">Puyo, Pastaza, Ecuador</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                  <div className="p-3 bg-[#E25822]/10 text-[#E25822] rounded-lg">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">Horario de Atención:</h3>
                    <p className="text-sm text-zinc-300">Lunes a Viernes: 08:30 - 18:00</p>
                    <p className="text-xs text-zinc-500 mt-1">Sábados: Previa cita y coordinación</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                  <div className="p-3 bg-[#E25822]/10 text-[#E25822] rounded-lg">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">Línea Directa / WhatsApp:</h3>
                    <a
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-[#FF7038] hover:underline"
                    >
                      +593 96 257 7613 (096 257 7613)
                    </a>
                    <p className="text-xs text-zinc-500 mt-1">Atención rápida y asesoría comercial</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contenedor del Minimapa y Navegación Directa */}
            <div className="relative rounded-3xl overflow-hidden border border-zinc-700 bg-gradient-to-tr from-[#1B1B22] to-zinc-900 p-6 sm:p-8 flex flex-col shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative h-8 w-28 bg-[#EFEFF2] px-2 py-1 rounded-lg border border-zinc-300">
                    <Image
                      src="/branding/logo.png"
                      alt="NÓMADAS"
                      fill
                      className="object-contain p-0.5"
                    />
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Sede Física</span>
                  </div>
                </div>
                <span className="text-xs text-zinc-400 bg-zinc-800/80 px-2.5 py-1 rounded-full border border-zinc-700 font-medium">
                  Puyo, Pastaza
                </span>
              </div>

              {/* Minimapa interactivo */}
              <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden border border-zinc-700/80 shadow-inner bg-zinc-950 mb-5 group">
                <iframe
                  title="Ubicación NÓMADAS Agencia en Google Maps"
                  src="https://maps.google.com/?q=-1.5141295,-78.0070716&hl=es&z=16&output=embed"
                  className="w-full h-full border-0 filter contrast-105"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <a
                  href="https://maps.app.goo.gl/kBrLLFJriD5r1Ewp8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 right-3 bg-zinc-900/90 hover:bg-[#E25822] text-white text-xs font-semibold px-3 py-1.5 rounded-lg border border-zinc-700 shadow-md backdrop-blur-sm transition-colors flex items-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#FF7038] group-hover:text-white" />
                  <span>Ampliar Mapa</span>
                </a>
              </div>

              {/* Botones de acción: Cómo llegar y WhatsApp */}
              <div className="space-y-3">
                <a
                  href="https://maps.app.goo.gl/kBrLLFJriD5r1Ewp8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 bg-[#E25822] hover:bg-[#C94614] text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl transition-all duration-300 orange-glow shadow-lg text-center"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Cómo Llegar en Google Maps</span>
                </a>

                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-zinc-800/90 hover:bg-zinc-700 text-zinc-200 border border-zinc-700/80 font-medium text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-colors text-center"
                >
                  <MessageCircle className="w-4 h-4 text-[#FF7038]" />
                  <span>Agendar Cita Presencial por WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- PREGUNTAS FRECUENTES (FAQ) ----------------- */}
      <section id="faq" className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E25822]/10 border border-[#E25822]/30 text-xs font-semibold text-[#FF7038] mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Respuestas Claras</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Preguntas Frecuentes</h2>
          <p className="mt-3 text-zinc-400 text-sm sm:text-base">
            Todo lo que necesitas saber antes de iniciar tu transformación digital con nosotros.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="bg-[#17171C] border border-zinc-800 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-base sm:text-lg font-semibold text-white">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-zinc-400 transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? 'transform rotate-180 text-[#E25822]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-zinc-400 leading-relaxed border-t border-zinc-800/60 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ----------------- FOOTER (Gris Claro) ----------------- */}
      <footer className="border-t border-zinc-300/80 bg-[#EFEFF2] py-14 text-zinc-800 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div>
              <div className="relative h-12 w-56 mb-3">
                <Image
                  src="/branding/logo.png"
                  alt="NÓMADAS"
                  fill
                  className="object-contain object-left"
                />
              </div>
              <p className="text-xs text-zinc-600 max-w-sm font-medium leading-relaxed">
                NÓMADAS AGENCIA DE DISEÑO Y MARKETING DIGITAL.  
                Estrategias • Creatividad • Resultados.  
                Av. Alberto Zambrano esquina, diagonal a Coop. OSCUS — Puyo, Pastaza.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 text-sm font-semibold text-zinc-700">
              <a href="#servicios" className="hover:text-[#E25822] transition-colors">Servicios</a>
              <a href="#portafolio" className="hover:text-[#E25822] transition-colors">Portafolio</a>
              <a href="#cotizador" className="hover:text-[#E25822] transition-colors">Cotizador</a>
              <a href="#ubicacion" className="hover:text-[#E25822] transition-colors">Ubicación</a>
              <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="text-[#E25822] hover:underline font-bold">
                WhatsApp Directo
              </a>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-zinc-300 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 font-medium gap-4">
            <p>© {new Date().getFullYear()} Nómadas Agencia de Diseño y Marketing Digital. Todos los derechos reservados.</p>
            <div className="flex items-center gap-4">
              <span>Hecho con ❤️ en Pastaza, Ecuador.</span>
              <a href="/admin" className="text-zinc-400 hover:text-zinc-700 hover:underline transition-colors">Panel Ventas</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ----------------- BOTÓN FLOTANTE DE WHATSAPP ----------------- */}
      <a
        href={getWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 orange-glow"
      >
        <MessageCircle className="w-7 h-7" />
      </a>
    </div>
  );
}
