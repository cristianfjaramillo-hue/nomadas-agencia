# 🧭 MASTERPLAN DEL PROYECTO

> **Última actualización:** 12 de Octubre, 2026  
> **Estado general:** Fase 1 (80% completado) - Preparando Fase 2  
> **Marca:** **NÓMADAS AGENCIA DE DISEÑO Y MARKETING DIGITAL**  
> **Ubicación:** Puyo, Pastaza, Ecuador (Av. Alberto Zambrano esquina, diagonal a Cooperativa OSCUS)  
> **Slogan:** _Estrategias • Creatividad • Resultados_  

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

### Simbología de Marca
*   **Isotipo Orbitante:** Órbita circular con flecha de avance continuo, denotando agilidad y transformación digital.
*   **Patrón Étnico Amazónico:** Trama geométrica en el pilar de la 'N', anclando la identidad de la agencia con el origen amazónico de Puyo / Pastaza, aportando una personalidad única frente a competidores genéricos.

---

## 📊 Tablero de Estado General

| Fase | Descripción | Estado | Progreso |
| :--- | :--- | :---: | :---: |
| **Fase 1** | Entorno, Credenciales, Marca e Identidad | 🟡 En progreso | 80% |
| **Fase 2** | Estudio de Mercado Automatizado (Apify) | ⚪ Pendiente de Token | 0% |
| **Fase 3** | Estrategia de Marketing, Branding & Copywriting | ⚪ Pendiente | 0% |
| **Fase 4** | Desarrollo de Landing Page de Alta Conversión | ⚪ Pendiente | 0% |
| **Fase 5** | Conexión Automática GitHub + Vercel (CI/CD) | ⚪ Pendiente | 0% |

---

## 🎯 Detalle por Fases

### Fase 1: Entorno, Credenciales y Repositorio Base
- [x] Crear estructura base del proyecto y repositorio Git local.
- [x] Configurar plantilla de variables de entorno ([`.env.example`](file:///c:/Users/Administrador/Documents/macroactividad/.env.example)).
- [x] Crear archivo local de credenciales ([`.env`](file:///c:/Users/Administrador/Documents/macroactividad/.env)).
- [x] Asegurar exclusión de secretos en el control de versiones ([`.gitignore`](file:///c:/Users/Administrador/Documents/macroactividad/.gitignore)).
- [x] Registrar identidad de la marca, ubicación geográfica y slogan.
- [x] Incorporar y catalogar logotipos de Nómadas en el proyecto ([`assets/branding/`](file:///c:/Users/Administrador/Documents/macroactividad/assets/branding)).
- [ ] Colocar credenciales en `.env` (`APIFY_API_TOKEN`, `GITHUB_TOKEN`, `VERCEL_TOKEN`).

---

### Fase 2: Estudio de Mercado Automatizado (Apify)
- [ ] Configurar SDK/cliente de Apify en Node.js.
- [ ] Definir objetivos de scraping:
  - **Competidores locales/regionales en Puyo, Pastaza y Amazonía ecuatoriana** (agencias de publicidad, estudios de diseño, freelancers en Google Maps, Instagram, Facebook).
  - **Agencias referentes a nivel nacional (Quito, Guayaquil, Cuenca)** para benchmark de servicios, precios y propuestas de valor.
  - **Nichos de clientes potenciales en Puyo** (turismo, hotelería, gastronomía, comercio local, cooperativas, emprendimientos de la región).
- [ ] Ejecutar actores de Apify (Google Maps Scraper, Instagram Scraper, etc.).
- [ ] Consolidar dataset de competidores y clientes en formato estructurado.
- [ ] Elaborar informe FODA y detección de oportunidades de diferenciación.

---

### Fase 3: Estrategia de Marketing, Branding & Copywriting
- [ ] Diseñar el perfil de **Buyer Persona** para el mercado local y nacional.
- [ ] Redactar la **Propuesta Única de Valor (UVP)** para Nómadas.
- [ ] Definir catálogo de servicios clave:
  - Identidad visual & Branding.
  - Social Media Management & Estrategia de Contenidos.
  - Diseño y Desarrollo Web / Landing Pages de conversión.
  - Campañas de Pauta Digital (Meta Ads / Google Ads).
- [ ] Redactar el Copywriting de alta conversión para la Landing Page:
  - Titulares magnéticos y propuesta de transformación.
  - Sección de portafolio y prueba social.
  - Tratamiento de objeciones comunes de contratación de agencias.
  - Llamadas a la acción (CTA) orientadas a WhatsApp y formulario.

---

### Fase 4: Desarrollo de Landing Page de Alta Conversión
- [ ] Inicializar proyecto moderno (Next.js con Tailwind CSS y TypeScript).
- [ ] Configurar diseño con la paleta de colores de Nómadas (Naranja `#E25822`, Negro Ónix, Blanco).
- [ ] Maquetar secciones de la Landing Page con animaciones fluidas y microinteracciones.
- [ ] Integrar botón flotante de WhatsApp directo y formulario de cotización.
- [ ] Optimizar tiempos de carga, SEO local (Puyo / Pastaza / Ecuador) y experiencia móvil.

---

### Fase 5: Conexión Automática GitHub + Vercel (CI/CD)
- [ ] Crear repositorio remoto en GitHub vía API / CLI.
- [ ] Vincular y subir código (`origin/main`).
- [ ] Configurar despliegue continuo en Vercel.
- [ ] Configurar dominio y variables de entorno de producción.
- [ ] Verificación final de producción en vivo.

---

## 📝 Bitácora de Avances (Changelog)

* **12-Oct-2026**:
  * Inicialización del repositorio Git local y blindaje de credenciales.
  * Localización e integración de las 3 versiones oficiales del logotipo de **Nómadas** en [`assets/branding/`](file:///c:/Users/Administrador/Documents/macroactividad/assets/branding).
  * Extracción y documentación de la paleta cromática oficial (Naranja `#E25822`, Negro Ónix, Blanco, Plata).
  * Integración de los metadatos de ubicación (Puyo, Pastaza, Av. Alberto Zambrano esquina, diagonal a Coop. OSCUS) en `.env` y el Masterplan.
  * Planificación del alcance de investigación de mercado en Apify adaptado al contexto local y nacional.
