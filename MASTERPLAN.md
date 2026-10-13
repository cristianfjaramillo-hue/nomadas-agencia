# 🧭 MASTERPLAN DEL PROYECTO

> **Última actualización:** 12 de Octubre, 2026  
> **Estado general:** Fase 2 completada (45% avance global) - Entrando a Fase 3 y 4  
> **Marca:** **NÓMADAS AGENCIA DE DISEÑO Y MARKETING DIGITAL**  
> **Ubicación:** Puyo, Pastaza, Ecuador (Av. Alberto Zambrano esquina, diagonal a Cooperativa OSCUS)  
> **Slogan:** _Estrategias • Creatividad • Resultados_  

---

## 📊 Tablero de Estado General

| Fase | Descripción | Estado | Progreso |
| :--- | :--- | :---: | :---: |
| **Fase 1** | Entorno, Credenciales, Marca e Identidad | 🟢 Completada | 100% |
| **Fase 2** | Estudio de Mercado Automatizado (Apify) | 🟢 Completada | 100% |
| **Fase 3** | Estrategia de Marketing, Branding & Copywriting | 🟡 En progreso | 60% |
| **Fase 4** | Desarrollo de Landing Page de Alta Conversión | ⚪ Siguiente paso | 0% |
| **Fase 5** | Conexión Automática GitHub + Vercel (CI/CD) | ⚪ Pendiente | 0% |

---

## 🎨 Identidad Visual y Recursos de Marca

Los archivos del logotipo han sido organizados y catalogados en [`assets/branding/`](file:///c:/Users/Administrador/Documents/macroactividad/assets/branding):

*   **Versión 03 (Positivo / Fondo Blanco):** `assets/branding/logo nomadas-03.jpg`
*   **Versión 04 (Invertido / Fondo Naranja de Marca):** `assets/branding/logo nomadas-04.jpg`
*   **Versión 05 (Modo Oscuro / Fondo Negro):** `assets/branding/logo nomadas-05.jpg`

### Paleta Cromática Extraída
| Color | Código Hex | Uso Recomendado en Landing Page & Redes |
| :--- | :--- | :--- |
| **Naranja Nómadas** | `#E25822` / `#EB6123` | Botones de Acción (CTA), acentos dinámicos, bordes activos |
| **Negro Ónix** | `#121212` / `#1A1A1A` | Fondos oscuros premium, tipografía principal en modo claro |
| **Blanco Nieve** | `#FFFFFF` | Contraste limpio, textos sobre fondos oscuros, fondos claros |
| **Gris Plata** | `#D1D5DB` / `#8C8C8C` | Bordes sutiles, textos secundarios, separadores |

---

## 🎯 Detalle por Fases

### Fase 1: Entorno, Credenciales y Repositorio Base
- [x] Crear estructura base del proyecto y repositorio Git local.
- [x] Configurar plantilla de variables de entorno ([`.env.example`](file:///c:/Users/Administrador/Documents/macroactividad/.env.example)).
- [x] Crear archivo local de credenciales ([`.env`](file:///c:/Users/Administrador/Documents/macroactividad/.env)).
- [x] Asegurar exclusión de secretos en el control de versiones ([`.gitignore`](file:///c:/Users/Administrador/Documents/macroactividad/.gitignore)).
- [x] Registrar identidad de la marca, ubicación geográfica y slogan.
- [x] Incorporar y catalogar logotipos de Nómadas en el proyecto ([`assets/branding/`](file:///c:/Users/Administrador/Documents/macroactividad/assets/branding)).
- [x] Conexión y validación de `APIFY_API_TOKEN` en Node.js.

---

### Fase 2: Estudio de Mercado Automatizado (Apify)
- [x] Configurar SDK de Apify y dependencias (`apify-client`, `dotenv`).
- [x] Ejecutar extracción de mercado con actor `apify/google-search-scraper` para Ecuador y Puyo/Pastaza.
- [x] Exportar dataset en bruto a [`data/market-research/google-search-results.json`](file:///c:/Users/Administrador/Documents/macroactividad/data/market-research/google-search-results.json).
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
- [ ] Redacción final del copy sección por sección para la Landing Page (Hero, Servicios, Prueba Social, FAQ, CTA).

---

### Fase 4: Desarrollo de Landing Page de Alta Conversión
- [ ] Inicializar proyecto moderno (Next.js con Tailwind CSS y TypeScript).
- [ ] Configurar diseño con la paleta de colores de Nómadas (Naranja `#E25822`, Negro Ónix, Blanco).
- [ ] Maquetar secciones de la Landing Page con animaciones fluidas y microinteracciones.
- [ ] Integrar botón flotante de WhatsApp directo y formulario de cotización.
- [ ] Optimizar tiempos de carga, SEO local (Puyo / Pastaza / Ecuador) y experiencia móvil.

---

### Fase 5: Conexión Automática GitHub + Vercel (CI/CD)
- [ ] Configurar `GITHUB_TOKEN` para creación de repo remoto.
- [ ] Subir código base a GitHub (`origin/main`).
- [ ] Conectar con Vercel para despliegue automático continuo.
- [ ] Configurar dominio y variables de entorno de producción.
- [ ] Verificación final de producción en vivo.

---

## 📝 Bitácora de Avances (Changelog)

* **12-Oct-2026 (Noche)**:
  * Validación exitosa de credenciales de Apify (`pleasant_element`, Plan Free).
  * Extracción con Apify de 27 resultados orgánicos sobre diseño, publicidad y agencias en Puyo y Ecuador.
  * Hallazgo estratégico clave: Competidores locales enfocados en gigantografías e imprenta tradicional; Nómadas tiene el campo libre para liderar el segmento digital moderno 360 (Web + Ads + Branding + Contenido).
  * Creación del informe [**`data/market-research/MARKET_RESEARCH_REPORT.md`**](file:///c:/Users/Administrador/Documents/macroactividad/data/market-research/MARKET_RESEARCH_REPORT.md).
