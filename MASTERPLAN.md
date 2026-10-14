# 🧭 MASTERPLAN DEL PROYECTO

> **Última actualización:** 12 de Octubre, 2026  
> **Estado general:** Fases 1, 2, 3, 4 y 5 Completadas (90% de avance global)  
> **Marca:** **NÓMADAS AGENCIA DE DISEÑO Y MARKETING DIGITAL**  
> **Ubicación:** Puyo, Pastaza, Ecuador (Av. Alberto Zambrano esquina, diagonal a Cooperativa OSCUS)  
> **Slogan:** _Estrategias • Creatividad • Resultados_  
> **Repositorio GitHub:** [github.com/cristianfjaramillo-hue/nomadas-agencia](https://github.com/cristianfjaramillo-hue/nomadas-agencia)  
> **URL de Producción Vercel:** [nomadas-agencia.vercel.app](https://nomadas-agencia.vercel.app)  

---

## 📊 Tablero de Estado General

| Fase | Descripción | Estado | Progreso |
| :--- | :--- | :---: | :---: |
| **Fase 1** | Entorno, Credenciales, Marca e Identidad | 🟢 Completada | 100% |
| **Fase 2** | Estudio de Mercado Automatizado (Apify) | 🟢 Completada | 100% |
| **Fase 3** | Estrategia de Marketing, Branding & Copywriting | 🟢 Completada | 100% |
| **Fase 4** | Desarrollo de Landing Page de Alta Conversión | 🟢 Completada | 100% |
| **Fase 5** | Conexión Automática GitHub + Vercel (CI/CD) | 🟢 Completada | 100% |
| **Fase 6** | Calificación, Scoring de Leads & CRM Panel Admin | 🟢 Completada | 100% |

---

## 🎨 Identidad Visual y Recursos de Marca

Los archivos del logotipo han sido organizados y catalogados en [`assets/branding/`](file:///c:/Users/Administrador/Documents/macroactividad/assets/branding) y en [`public/branding/`](file:///c:/Users/Administrador/Documents/macroactividad/public/branding):

*   **Versión 03 (Positivo / Fondo Blanco):** `public/branding/logo-white.jpg`
*   **Versión 04 (Invertido / Fondo Naranja de Marca):** `public/branding/logo-orange.jpg`
*   **Versión 05 (Modo Oscuro / Fondo Negro):** `public/branding/logo-dark.jpg`

### Paleta Cromática Implementada
*   **Naranja Nómadas:** `#E25822` / `#FF7038` (Botones de Acción CTA, badges y glow).
*   **Negro Ónix & Dark Theme:** `#0F0F11` / `#17171C` (Fondos oscuros premium y tarjetas).
*   **Blanco Nieve:** `#FFFFFF` / `#F4F4F6` (Textos de alto contraste).
*   **Gris Plata & Bordes:** `#272730` / `#9E9EA7` (Separadores y sutiles bordes).

---

## 🎯 Detalle por Fases

### Fase 1: Entorno, Credenciales y Repositorio Base
- [x] Crear estructura base del proyecto y repositorio Git local.
- [x] Configurar plantilla de variables de entorno ([`.env.example`](file:///c:/Users/Administrador/Documents/macroactividad/.env.example)).
- [x] Crear archivo local de credenciales ([`.env`](file:///c:/Users/Administrador/Documents/macroactividad/.env)).
- [x] Asegurar exclusión de secretos en el control de versiones ([`.gitignore`](file:///c:/Users/Administrador/Documents/macroactividad/.gitignore)).
- [x] Registrar identidad de la marca, ubicación geográfica y slogan.
- [x] Incorporar y catalogar logotipos de Nómadas en el proyecto.
- [x] Conexión y validación de `APIFY_API_TOKEN` en Node.js.

---

### Fase 2: Estudio de Mercado Automatizado (Apify)
- [x] Configurar SDK de Apify y dependencias.
- [x] Ejecutar extracción de mercado con actor `apify/google-search-scraper` para Ecuador y Puyo/Pastaza.
- [x] Analizar competidores locales (Pixel, LOGOS, Strateging) vs. referentes nacionales (Altitude, Monkey Plus, HELLO).
- [x] Generar el informe estratégico [`data/market-research/MARKET_RESEARCH_REPORT.md`](file:///c:/Users/Administrador/Documents/macroactividad/data/market-research/MARKET_RESEARCH_REPORT.md).

---

### Fase 3: Estrategia de Marketing, Branding & Copywriting
- [x] Diseñar el perfil de **Buyer Persona** y mapear dolores locales (empresas atrapadas en métodos tradicionales).
- [x] Definir la **Propuesta Única de Valor (UVP)** diferenciadora de Nómadas.
- [x] Estructurar los 4 pilares de servicios de alta demanda:
  1. Branding & Identidad Visual Estratégica.
  2. Landing Pages y Sitios Web de Alta Conversión.
  3. Pauta Digital Inteligente (Meta & Google Ads con retorno medible).
  4. Redes Sociales & Producción de Contenido Audiovisual.
- [x] Redactar el Copywriting de alta conversión sección por sección integrado directamente en la Landing Page.

---

### Fase 4: Desarrollo de Landing Page de Alta Conversión
- [x] Inicializar Next.js 16 con App Router, React 19, TypeScript y Tailwind CSS v4.
- [x] Implementar barra de navegación con logotipo oficial y acceso directo a WhatsApp.
- [x] Crear Hero Section con propuesta de valor, badges dinámicos y métricas de impacto.
- [x] Crear comparativa persuasiva: *Publicidad Tradicional vs. El Método Nómadas*.
- [x] Crear tarjetas interactivas para los 4 Pilares de Servicios.
- [x] Diseñar el **Cotizador Instantáneo Interactivo** que genera el mensaje estructurado para WhatsApp.
- [x] Maquetar sección de Ubicación Física con dirección exacta en Puyo (Av. Alberto Zambrano esquina, diagonal a Coop. OSCUS).
- [x] Implementar acordeón de Preguntas Frecuentes (FAQ).
- [x] Integrar Botón Flotante de WhatsApp para conversión inmediata móvil.
- [x] **Video en Bucle en la Sección Hero (Justo debajo del menú)**:
  - Video nativo optimizado alojado en `/videos/hero-loop.mp4` (~3.8 MB) transmitido desde CDN.
  - Fondo ambiental sutil en bucle con gradientes oscuros para conservar alta legibilidad.
  - Tarjeta cinematográfica 16:9 con bordes redondeados, resplandor naranja Nómadas, insignia *Showreel Oficial*, y controles interactivos de Pausa/Play y Activar/Silenciar Audio.
- [x] Compilación y verificación con `npm run build` (Static Export & Optimizada).

---

### Fase 5: Conexión Automática GitHub + Vercel (CI/CD)
- [x] Conexión validada con GitHub API (@cristianfjaramillo-hue).
- [x] Conexión validada con Vercel API (@cristianfjaramillo-3049).
- [x] Creación de repositorio remoto `nomadas-agencia` en GitHub.
- [x] Configuración de proyecto en Vercel con pipeline de despliegue continuo (CI/CD).
- [x] Despliegue de producción sincronizado con la rama `main`.

### Fase 6: Calificación, Scoring de Leads & CRM Panel Admin (Supabase)
- [x] Instalación e inicialización del cliente de `@supabase/supabase-js` ([`lib/supabase.ts`](file:///c:/Users/Administrador/Documents/macroactividad/lib/supabase.ts)).
- [x] Motor matemático de Lead Scoring de 0 a 100 puntos y clasificación de temperatura ([`lib/scoring.ts`](file:///c:/Users/Administrador/Documents/macroactividad/lib/scoring.ts)):
  - 🔥 **HOT (≥70 pts)**: Contacto prioritario en menos de 15 minutos.
  - ⚡ **WARM (40-69 pts)**: Contacto en el transcurso del día.
  - ❄️ **COLD (<40 pts)**: Nutrición y seguimiento estándar.
- [x] Script de migración SQL con RLS e índices optimizados ([`supabase/schema.sql`](file:///c:/Users/Administrador/Documents/macroactividad/supabase/schema.sql)).
- [x] API Routes para ingesta (`POST /api/leads`), lectura ordenada por score (`GET /api/leads`) y actualización de estado comercial y notas (`PATCH /api/leads/[id]`).
- [x] Formulario interactivo de diagnóstico comercial en la Landing Page con cálculo de scoring en tiempo real.
- [x] Dashboard administrativo protegido con contraseña ([`/admin`](https://nomadas-agencia.vercel.app/admin)) con métricas en vivo, filtros de temperatura, modificación de estado (`Pendiente`, `Contactado`, `En Negociación`, `Cerrado Ganado`, `Descartado`), notas de vendedor y botón de WhatsApp con mensaje personalizado inmediato.
- [x] **Generador de Reportes PDF Oficiales (`jspdf` + `jspdf-autotable`)**:
  - Logotipo oficial de Nómadas con transparencia incrustado en alta definición en la cabecera del documento.
  - Botón de descarga en la barra superior, en el banner de bienvenida y en los filtros de búsqueda.
  - Formato apaisado (Landscape A4) con membrete institucional de Nómadas Agencia, fecha y hora de emisión, métricas y desglose.
  - Tabla con las 5 columnas requeridas: **Nombre & Negocio**, **Correo**, **Teléfono**, **Temperatura (Score)** y **Resumen de Estado**.
  - Descarga instantánea en el navegador respetando los filtros activos.

---

## 📝 Bitácora de Avances (Changelog)

* **13-Oct-2026**:
  * Integración de Minimapa interactivo de Google Maps en la sección de sede física (`#ubicacion`).
  * Botón de navegación directa **"Cómo Llegar en Google Maps"** apuntando a `https://maps.app.goo.gl/kBrLLFJriD5r1Ewp8` para activación directa de la app móvil y navegador.
  * Botón dual de **"Agendar Cita Presencial por WhatsApp"**.
  * **Nueva Sección Portafolio con Ruleta Interactiva 3-en-3 (`#portafolio`)**:
    * Carrusel continuo animado mediante hover del ratón (desplazamiento y velocidad guiados por la posición del cursor, 0 clics requeridos).
    * Visualización exacta de 3 proyectos simultáneos en desktop con proporciones responsive.
    * 6 proyectos fotográficos de alta definición: Letrero 3D luminoso corpóreo, captura de pantalla de plataforma CRM y marketing digital, papelería corporativa premium con acabados en cobre, landing page de alta conversión, packaging de colección y producción audiovisual 4K.
    * Modal de vista rápida y botón directo de cotización por WhatsApp prellenado para cada trabajo.
  * Sincronización y despliegue automático en Vercel.
