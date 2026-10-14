'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import {
  Sparkles,
  ArrowRight,
  Eye,
  Layers,
  Monitor,
  FileText,
  Palette,
  Package,
  Video,
  ExternalLink,
  MoveHorizontal
} from 'lucide-react';

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  badge: string;
  image: string;
  description: string;
  tags: string[];
  clientType: string;
  whatsappMessage: string;
}

const portfolioProjects: PortfolioItem[] = [
  {
    id: 'letrero-3d',
    title: 'Letreros Corpóreos 3D & Fachadas Comerciales',
    category: 'Publicidad Exterior',
    badge: 'Rotulación & Letras 3D',
    image: '/portfolio/portfolio_letrero_3d.jpg',
    description:
      'Fabricación e instalación de rótulos volumétricos en acrílico con iluminación LED retroiluminada halo glow. Acabados arquitectónicos de alto impacto visual para negocios en Pastaza y todo Ecuador.',
    tags: ['Letras 3D', 'Iluminación LED', 'Fachada Comercial', 'Pastaza'],
    clientType: 'Comercio & Retail',
    whatsappMessage: '¡Hola Nómadas! Vi su proyecto de Letreros 3D en el portafolio y quisiera cotizar una fachada para mi negocio.',
  },
  {
    id: 'crm-marketing',
    title: 'Software CRM & Funnels de Venta Digital',
    category: 'Marketing & Tecnología',
    badge: 'CRM & Performance Ads',
    image: '/portfolio/portfolio_crm_dashboard.jpg',
    description:
      'Plataforma integral de administración comercial: embudos de conversión, pipeline de ventas con scoring automatizado de prospectos y métricas en vivo conectadas a campañas de Meta Ads y Google Ads.',
    tags: ['CRM Comercial', 'Lead Scoring', 'Meta Ads', 'Analítica'],
    clientType: 'Empresas & Servicios',
    whatsappMessage: '¡Hola Nómadas! Me interesa implementar un sistema CRM y embudo de ventas digital como el de su portafolio.',
  },
  {
    id: 'papeleria-corp',
    title: 'Papelería Corporativa & Identidad Premium',
    category: 'Branding Institucional',
    badge: 'Papelería & Acabados de Lujo',
    image: '/portfolio/portfolio_papeleria_corp.jpg',
    description:
      'Diseño institucional integral: tarjetas de presentación con acabado en pan de cobre y hot stamping, carpetas corporativas, membretes y manual de identidad visual de alta gama.',
    tags: ['Papelería de Lujo', 'Hot Stamping', 'Branding', 'Identidad'],
    clientType: 'Corporativo & Marcas',
    whatsappMessage: '¡Hola Nómadas! Me gustaría cotizar el diseño y producción de papelería corporativa premium para mi empresa.',
  },
  {
    id: 'landing-page',
    title: 'Landing Pages & Sitios Web Ultrarrápidos',
    category: 'Desarrollo Web & UI/UX',
    badge: 'Next.js & Alta Conversión',
    image: '/portfolio/portfolio_landing_page.jpg',
    description:
      'Páginas web construidas para vender. Carga en menos de 1 segundo, arquitectura responsiva para smartphones, estética oscura con acentos vibrantes y botón de WhatsApp de alta conversión.',
    tags: ['Next.js', 'Velocidad < 1s', 'UI/UX', 'Ecuador'],
    clientType: 'Emprendimientos & Marcas',
    whatsappMessage: '¡Hola Nómadas! Quiero cotizar una Landing Page moderna y rápida como la que muestran en su portafolio.',
  },
  {
    id: 'packaging-empaques',
    title: 'Packaging & Empaques de Colección',
    category: 'Diseño de Producto',
    badge: 'Empaques & Línea de Producto',
    image: '/portfolio/portfolio_packaging.jpg',
    description:
      'Estructura y diseño de empaques rígidos de lujo con grabados étnicos geométricos y estampados metalizados, desarrollados para productos cosméticos, café de especialidad y retail exclusivo.',
    tags: ['Packaging', 'Diseño de Empaque', 'Lujo', 'Nómadas'],
    clientType: 'Productos & Retail',
    whatsappMessage: '¡Hola Nómadas! Quisiera cotizar el diseño de packaging y empaques para mi línea de productos.',
  },
  {
    id: 'produccion-audiovisual',
    title: 'Producción Audiovisual & Spots en 4K',
    category: 'Audiovisual & Cine',
    badge: 'Cine Comercial & Reels',
    image: '/portfolio/portfolio_audiovisual.jpg',
    description:
      'Rodajes cinematográficos con óptica de cine, iluminación profesional de estudio y dirección creativa. Spots publicitarios, testimonios y reels virales optimizados para pauta en redes sociales.',
    tags: ['Spot 4K', 'Cine Comercial', 'Reels Virales', 'Pauta'],
    clientType: 'Marcas & Eventos',
    whatsappMessage: '¡Hola Nómadas! Me interesa cotizar una producción audiovisual / spot comercial para mi negocio.',
  },
];

export default function PortfolioRoulette() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Estados de interacción
  const [isHovered, setIsHovered] = useState(false);
  const [cursorXRatio, setCursorXRatio] = useState(0.5);
  const [cardWidth, setCardWidth] = useState(380);
  const [activeProject, setActiveProject] = useState<PortfolioItem | null>(null);

  // Duplicamos el conjunto para lograr una ruleta circular infinita sin cortes
  const duplicatedProjects = useMemo(() => {
    return [
      ...portfolioProjects,
      ...portfolioProjects,
      ...portfolioProjects,
      ...portfolioProjects,
    ];
  }, []);

  // Referencias para la física y animación fluida con requestAnimationFrame
  const currentOffsetRef = useRef(0);
  const targetVelocityRef = useRef(0);
  const currentVelocityRef = useRef(0);
  const singleCycleWidthRef = useRef(0);
  const animFrameIdRef = useRef<number | null>(null);

  // Cálculo responsivo exacto: 3 tarjetas en Desktop (lg), 2 en Tablet (sm/md), 1 en móvil
  useEffect(() => {
    const updateCardWidth = () => {
      if (!containerRef.current) return;
      // Padding interno del contenedor (p-4 en mobile = 32px total, p-6 en desktop = 48px total)
      const isDesktop = window.innerWidth >= 1024;
      const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;
      const padding = isDesktop ? 48 : 32;
      const availableWidth = containerRef.current.clientWidth - padding;
      const gap = 24; // gap-6 = 24px

      if (isDesktop) {
        // Exactamente 3 en 3 visibles
        const width = Math.floor((availableWidth - gap * 2) / 3);
        setCardWidth(Math.max(280, width));
      } else if (isTablet) {
        // 2 en 2 en tablet
        const width = Math.floor((availableWidth - gap) / 2);
        setCardWidth(Math.max(260, width));
      } else {
        // 1 tarjeta en móvil (85% del ancho)
        setCardWidth(Math.floor(availableWidth * 0.88));
      }
    };

    updateCardWidth();
    window.addEventListener('resize', updateCardWidth);
    return () => window.removeEventListener('resize', updateCardWidth);
  }, []);

  // Interacción al mover el mouse por encima (SIN CLIC)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, x / rect.width));
    setCursorXRatio(ratio);

    // Mapeo dinámico:
    // Cursor hacia la derecha (> 0.5) => acelera el avance hacia la derecha (velocidad positiva)
    // Cursor hacia la izquierda (< 0.5) => revierte el giro hacia la izquierda (velocidad negativa)
    // Cursor en el centro (~0.5) => velocidad de crucero suave
    const delta = (ratio - 0.5) * 2; // Rango de -1.0 a +1.0
    
    if (Math.abs(delta) < 0.15) {
      // Zona central: avance constante relajado
      targetVelocityRef.current = 1.6;
    } else if (delta > 0) {
      // Desplazamiento a la derecha acelerado
      targetVelocityRef.current = 1.6 + (delta * 4.5);
    } else {
      // Reversa a la izquierda
      targetVelocityRef.current = delta * 4.5;
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    // Al posar el mouse por encima, arranca el movimiento inmediatamente
    targetVelocityRef.current = 2.0;
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Al quitar el mouse, se detiene suavemente
    targetVelocityRef.current = 0;
  };

  // Motor de física e interpolación suave (LERP) a 60FPS
  useEffect(() => {
    const gap = 24;
    const singleSetWidth = (cardWidth + gap) * portfolioProjects.length;
    singleCycleWidthRef.current = singleSetWidth;

    const animate = () => {
      if (isHovered) {
        // Aceleración / frenado natural con LERP hacia la velocidad objetivo
        currentVelocityRef.current += (targetVelocityRef.current - currentVelocityRef.current) * 0.08;
      } else {
        // Desaceleración suave hasta reposo absoluto al salir el mouse
        currentVelocityRef.current *= 0.90;
        if (Math.abs(currentVelocityRef.current) < 0.02) {
          currentVelocityRef.current = 0;
        }
      }

      // Solo actualizamos el DOM si hay movimiento activo
      if (trackRef.current && Math.abs(currentVelocityRef.current) > 0.001) {
        currentOffsetRef.current += currentVelocityRef.current;

        // Bucle infinito: wrap de la ruleta sin ningún parpadeo visual
        if (singleSetWidth > 0) {
          if (currentOffsetRef.current >= singleSetWidth) {
            currentOffsetRef.current -= singleSetWidth;
          } else if (currentOffsetRef.current < 0) {
            currentOffsetRef.current += singleSetWidth;
          }
        }

        trackRef.current.style.transform = `translate3d(-${currentOffsetRef.current}px, 0, 0)`;
      }

      animFrameIdRef.current = requestAnimationFrame(animate);
    };

    animFrameIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [isHovered, cardWidth]);

  return (
    <section
      id="portafolio"
      className="py-24 bg-[#0F0F12] border-t border-zinc-800/80 relative z-10 overflow-hidden"
    >
      {/* Luz ambiental difusa de fondo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[350px] bg-[#E25822]/6 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Cabecera de la sección */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E25822]/10 border border-[#E25822]/30 text-xs font-semibold text-[#FF7038] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Casos de Éxito & Trabajos Reales</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Portafolio de Proyectos <span className="text-[#E25822]">NÓMADAS</span>
            </h2>
            <p className="mt-3 text-zinc-400 text-sm sm:text-base max-w-2xl leading-relaxed">
              Descubre los resultados tangibles en los que hemos participado: letreros 3D corpóreos, plataformas CRM y marketing digital, papelería de lujo, desarrollo web y producción audiovisual.
            </p>
          </div>

          {/* Guía de interacción por Hover */}
          <div className="flex items-center gap-3 bg-zinc-900/90 border border-zinc-800 px-4 py-2.5 rounded-2xl self-start md:self-auto backdrop-blur-sm shadow-lg">
            <div
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                isHovered ? 'bg-[#E25822] shadow-[0_0_12px_#E25822] scale-125' : 'bg-zinc-600'
              }`}
            />
            <div className="text-xs">
              <p className="text-white font-semibold flex items-center gap-1.5">
                <MoveHorizontal className="w-3.5 h-3.5 text-[#FF7038]" />
                <span>Ruleta Interactiva (Hover)</span>
              </p>
              <p className="text-zinc-400 text-[11px]">
                {isHovered ? 'Girando según tu cursor...' : 'Pasa el cursor por encima para activar el giro'}
              </p>
            </div>
          </div>
        </div>

        {/* Indicador de visualización de 3 en 3 */}
        <div className="flex items-center justify-between text-xs text-zinc-400 mb-4 px-1">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#E25822]" />
            <span className="font-medium text-zinc-300">
              Formato: <strong>3 proyectos simultáneos</strong> (exploración fluida con el puntero)
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-zinc-500 font-mono text-[11px]">
            <span>◄ Desplaza a la izquierda</span>
            <span>•</span>
            <span>Avanza a la derecha ►</span>
          </div>
        </div>

        {/* Contenedor Principal de la Ruleta */}
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative w-full cursor-ew-resize select-none overflow-hidden rounded-3xl border border-zinc-800/90 bg-gradient-to-b from-[#15151A] to-[#101014] p-4 sm:p-6 shadow-2xl"
        >
          {/* Sombras degradadas laterales para efecto infinito */}
          <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-16 bg-gradient-to-r from-[#15151A] to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-16 bg-gradient-to-l from-[#15151A] to-transparent z-20 pointer-events-none" />

          {/* Riel continuo de tarjetas animado con transform3d */}
          <div
            ref={trackRef}
            className="flex gap-6 will-change-transform"
            style={{ width: 'max-content' }}
          >
            {duplicatedProjects.map((project, index) => (
              <div
                key={`${project.id}-${index}`}
                style={{ width: `${cardWidth}px` }}
                className="group relative flex-shrink-0 rounded-2xl overflow-hidden bg-[#1A1A22] border border-zinc-800/90 hover:border-[#E25822]/80 transition-all duration-300 hover:shadow-2xl hover:shadow-[#E25822]/15 flex flex-col justify-between"
              >
                {/* Imagen del Proyecto */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-950">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 88vw, (max-width: 1024px) 50vw, 380px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  {/* Gradiente sutil sobre la foto */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A22] via-[#1A1A22]/25 to-transparent" />

                  {/* Badge superior de categoría */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-black/80 text-zinc-200 border border-zinc-700/80 backdrop-blur-md shadow-sm">
                      {project.id === 'letrero-3d' && <Layers className="w-3.5 h-3.5 text-[#FF7038]" />}
                      {project.id === 'crm-marketing' && <Monitor className="w-3.5 h-3.5 text-[#FF7038]" />}
                      {project.id === 'papeleria-corp' && <FileText className="w-3.5 h-3.5 text-[#FF7038]" />}
                      {project.id === 'landing-page' && <Palette className="w-3.5 h-3.5 text-[#FF7038]" />}
                      {project.id === 'packaging-empaques' && <Package className="w-3.5 h-3.5 text-[#FF7038]" />}
                      {project.id === 'produccion-audiovisual' && <Video className="w-3.5 h-3.5 text-[#FF7038]" />}
                      <span>{project.badge}</span>
                    </span>
                  </div>

                  {/* Botón flotante para ver detalle */}
                  <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveProject(project);
                      }}
                      className="p-2 rounded-full bg-[#E25822] hover:bg-[#C94614] text-white shadow-lg transition-transform hover:scale-110"
                      title="Ver detalles del proyecto"
                      aria-label="Ver detalles"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Contenido textual de la tarjeta */}
                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF7038]">
                      {project.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white mt-1 group-hover:text-[#FF7038] transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tags y Enlace de Cotización Directa */}
                  <div className="mt-4 pt-3 border-t border-zinc-800/80">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {project.tags.slice(0, 3).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded text-[10px] font-semibold bg-zinc-900 text-zinc-400 border border-zinc-800"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <a
                      href="#cotizador"
                      className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[#E25822] hover:bg-[#C94614] text-white font-bold text-xs sm:text-sm shadow-md transition-all duration-200 orange-glow hover:scale-[1.02] text-center"
                    >
                      <span>Cotizar en Línea</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Scrubber / Barra inferior indicadora de posición del cursor */}
          <div className="mt-6 pt-4 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-zinc-500">
            <div className="flex items-center gap-2">
              <span className="text-zinc-400 font-mono">Movimiento por Hover:</span>
              <span>Pasa el ratón hacia la izquierda o derecha para controlar la ruleta sin necesidad de clics.</span>
            </div>

            {/* Barra de progreso de la posición del cursor */}
            <div className="w-40 h-1.5 bg-zinc-800 rounded-full overflow-hidden relative">
              <div
                className="h-full bg-gradient-to-r from-[#E25822] to-[#FF7038] rounded-full transition-all duration-100"
                style={{
                  width: '30%',
                  transform: `translateX(${(cursorXRatio - 0.15) * 135}px)`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal / Vista Detallada */}
      {activeProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveProject(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-[#181820] border border-zinc-700 rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/9] w-full bg-zinc-950">
              <Image
                src={activeProject.image}
                alt={activeProject.title}
                fill
                className="object-cover"
              />
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center border border-zinc-600 transition-colors"
                aria-label="Cerrar modal"
              >
                ✕
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E25822]/10 border border-[#E25822]/30 text-xs font-semibold text-[#FF7038] mb-3">
                <span>{activeProject.category}</span>
                <span>•</span>
                <span>{activeProject.badge}</span>
              </div>
              <h3 className="text-2xl font-black text-white">{activeProject.title}</h3>
              <p className="mt-3 text-sm text-zinc-300 leading-relaxed">
                {activeProject.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {activeProject.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md text-xs font-semibold bg-zinc-900 text-zinc-400 border border-zinc-800"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-zinc-400">
                  ¿Quieres un trabajo con este nivel de calidad para tu marca?
                </span>
                <a
                  href="#cotizador"
                  onClick={() => setActiveProject(null)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#E25822] hover:bg-[#C94614] text-white font-bold text-sm px-6 py-3 rounded-xl transition-all orange-glow shadow-lg"
                >
                  <span>Ir a la Pantalla de Cotizaciones</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
