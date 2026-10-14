# 📄 INFORME EJECUTIVO DE ARQUITECTURA DIGITAL INTEGRAL
## Ecosistema de Captación, Cualificación Predictiva y Conversión Comercial
**Marca:** NÓMADAS AGENCIA DE DISEÑO Y MARKETING DIGITAL  
**Sede Física:** Av. Alberto Zambrano esquina, diagonal a Coop. OSCUS — Puyo, Pastaza, Ecuador  
**URL de Producción:** [nomadas-agencia.vercel.app](https://nomadas-agencia.vercel.app)  
**Panel CRM de Ventas:** [nomadas-agencia.vercel.app/admin](https://nomadas-agencia.vercel.app/admin) (Clave: `nomadas2026`)  
**Repositorio GitHub:** [github.com/cristianfjaramillo-hue/nomadas-agencia](https://github.com/cristianfjaramillo-hue/nomadas-agencia)  
**Fecha de Emisión:** Octubre 2026 | Versión Final 1.0  

---

> ### 🎯 Propuesta Única de Valor (UVP)
> *"Dejamos atrás la publicidad tradicional que no mide resultados. En Nómadas combinamos diseño de alto impacto, desarrollo web de máxima velocidad y pauta digital inteligente para transformar miradas en ventas reales para tu negocio."*

---

## 📊 Tabla de Contenidos Ejecutiva

* [Sección 1: Arquitectura del Negocio e Inteligencia de Mercado (Semana 1)](#sección-1-arquitectura-del-negocio-e-inteligencia-de-mercado-semana-1)
  * [1.1. Definición del Negocio y Buyer Personas](#11-definición-del-negocio-y-buyer-personas)
  * [1.2. Hallazgos del Web Scraping e Inteligencia de Mercado (Apify)](#12-hallazgos-del-web-scraping-e-inteligencia-de-mercado-apify)
  * [1.3. Matriz de Fricción vs. Deseo](#13-matriz-de-fricción-vs-deseo)
  * [1.4. Creativos TOFU (Copys PAS y Guiones de Video 30s)](#14-creativos-tofu-top-of-funnel)
* [Sección 2: Experiencia de Usuario y Filtro de Captación - MOFU (Semana 2)](#sección-2-experiencia-de-usuario-y-filtro-de-captación---mofu-semana-2)
  * [2.1. Enlace Público de la Landing Page](#21-enlace-público-de-producción)
  * [2.2. Decisiones de UX, Usabilidad y Reducción de Fricción](#22-decisiones-de-ux-y-usabilidad)
  * [2.3. Justificación Estratégica del Formulario Filtro](#23-justificación-estratégica-del-formulario-filtro)
  * [2.4. Captura de Datos Real en Base de Datos Supabase](#24-captura-de-datos-real-en-supabase)
* [Sección 3: El Motor Predictivo y Triage de Prospección - BOFU (Semana 3)](#sección-3-el-motor-predictivo-y-triage-de-prospección---bofu-semana-3)
  * [3.1. Enlace a la Vista de Administrador](#31-enlace-a-la-vista-de-administrador)
  * [3.2. Lógica del Algoritmo Matemático de Scoring](#32-lógica-del-algoritmo-matemático-de-scoring)
  * [3.3. Funcionalidades de la Bandeja de Prioridad en Vivo (/admin)](#33-funcionalidades-de-la-bandeja-de-prioridad-en-vivo-admin)
* [Sección 4: Estrategia de Inyección de Tráfico y Atribución (Semana 4)](#sección-4-estrategia-de-inyección-de-tráfico-y-atribución-semana-4)
  * [4.1. Plan SEO On-Page y Metadatos de Alta Conversión](#41-plan-seo-on-page-y-metadatos-de-alta-conversión)
  * [4.2. Estructura de Campañas SEM (Google Ads & Meta Ads)](#42-estructura-de-campañas-sem-google-ads--meta-ads)
  * [4.3. Tablero de Control y Métricas de Rendimiento Proyectadas (KPIs)](#43-tablero-de-control-y-métricas-de-rendimiento-proyectadas-kpis)
* [Sección 5: Proyecciones Financieras, ROI y Hoja de Ruta de Escalamiento](#sección-5-proyecciones-financieras-roi-y-hoja-de-ruta-de-escalamiento)
  * [5.1. Modelo Financiero de Retorno de Inversión (ROI y ROAS)](#51-modelo-financiero-de-retorno-de-inversión-roi-y-roas)
  * [5.2. Arquitectura de Atribución Multicanal & Tracking](#52-arquitectura-de-atribución-multicanal--tracking)
  * [5.3. Hoja de Ruta de Escalamiento Trimestral](#53-hoja-de-ruta-de-escalamiento-trimestral)
  * [5.4. Ficha Técnica y Enlaces Oficiales del Ecosistema NÓMADAS](#54-ficha-técnica-y-enlaces-oficiales-del-ecosistema-nómadas)

---

## Sección 1: Arquitectura del Negocio e Inteligencia de Mercado (Semana 1)

### 1.1. Definición del Negocio y Buyer Personas
**NÓMADAS AGENCIA DE DISEÑO Y MARKETING DIGITAL** opera bajo un modelo de Performance Agency B2B/B2C en Puyo, provincia de Pastaza, con capacidad de entrega en todo Ecuador. A diferencia de las imprentas o estudios tradicionales, Nómadas unifica tres verticales de alto impacto:
1. **Branding e Identidad Corporativa:** Diseño de identidades memorables con raíces amazónicas contemporáneas, papelería de lujo y letreros 3D corpóreos.
2. **Infraestructura Web Ultrarrápida:** Landing Pages y aplicaciones creadas con Next.js 16 para abrir en menos de 1 segundo en smartphones.
3. **Pauta Digital Científica (Meta & Google Ads):** Campañas con embudos de captación orientados al Retorno sobre la Inversión Publicitaria (ROAS).

#### Buyer Personas Prioritarios:
| Buyer Persona | Perfil Demográfico | Desafío Comercial Principal | Solución Nómadas |
| :--- | :--- | :--- | :--- |
| **1. Empresario Turístico & Hotelero** | Propietarios de hosterías, lodges y centros ecoturísticos en Pastaza y Baños. Edad: 35-58 años. | Dependencia de OTAs (Booking) con altas comisiones; baja atracción directa de clientes premium de Quito/Guayaquil. | Landing Pages inmersivas, pauta geolocalizada en Meta Ads y WhatsApp automatizado. |
| **2. Directivo de Cooperativa / Finanzas** | Gerentes de mercadeo y crédito en cooperativas de la Av. Alberto Zambrano. | Comunicación tradicional estancada y captación lenta de nuevos socios ahorristas. | Branding institucional de prestigio, pauta corporativa y dashboards CRM de prospección. |
| **3. Comercio Local & Retail** | Dueños de locales comerciales físicos, distribuidores, cafeterías de especialidad y farmacias. | Escaso flujo de clientes a pie y gasto en publicidad tradicional (volantes) sin retorno medible. | Rotulación corpórea 3D para la fachada física combinada con catálogo web digital y anuncios locales. |

---

### 1.2. Hallazgos del Web Scraping e Inteligencia de Mercado (Apify)
A través del SDK de Apify y el actor automatizado `apify/google-search-scraper`, se recolectaron y estructuraron más de 120 registros de agencias y servicios publicitarios en Puyo, Pastaza y las principales ciudades de Ecuador (Quito, Guayaquil, Cuenca).

#### Resumen Comparativo de Inteligencia de Mercado:
| Variable Analizada | Competencia Local (Puyo) | Referentes Nacionales (Quito/Gye) | Oportunidad Estratégica NÓMADAS |
| :--- | :--- | :--- | :--- |
| **Modelo Operativo** | Imprentas y rotulistas tradicionales (*Pixel*, *LOGOS*). | Agencias de crecimiento (*Monkey Plus*, *Altitude*, *HELLO*). | Posicionarse como la primera agencia integral de **Performance** en Puyo. |
| **Desarrollo Web** | Páginas nulas o sitios pesados en WordPress (>4.5s de carga). | Web stacks modernos en Next.js y Tailwind CSS. | Desplegar sitios en Next.js con carga <1s y conexión directa a WhatsApp. |
| **Enfoque de Ventas** | Venta meramente estética ("diseño de logos bonitos"). | Venta orientada a generación de pipeline y clientes calificados. | Implementar calificación predictiva de prospectos con CRM en tiempo real. |
| **Presencia Física** | Talleres industriales sin experiencia corporativa inmersiva. | Oficinas cerradas en torres corporativas capitalinas. | Sede física estratégica en Av. Alberto Zambrano esquina, cercana y accesible. |

---

### 1.3. Matriz de Fricción vs. Deseo

| Dolor Nuclear (Fricción) | Manifestación en el Negocio | Deseo Profundo del Cliente | Ángulo de Posicionamiento NÓMADAS |
| :--- | :--- | :--- | :--- |
| **1. "Inversión a ciegas sin retorno"** | Gastan de $150 a $600 al mes en volantes, vallas o "boost" de Facebook sin saber cuántos clientes llegaron. | Claridad contable: saber con precisión matemática cuánto dinero ingresó por cada dólar invertido. | Pauta digital científica con tracking de conversiones y reportes de ROAS en tiempo real. |
| **2. "Sitios web lentos o nulos"** | Los clientes abandonan la página antes de que cargue o no encuentran cómo escribir al vendedor. | Un canal digital que venda 24/7 y cargue instantáneamente en cualquier teléfono inteligente. | Landing pages en Next.js ultrarrápidas con botón flotante directo a WhatsApp. |
| **3. "Marca genérica y guerra de precios"** | Tienen que bajar precios constantemente porque el mercado los percibe como uno más del montón. | Ser reconocidos como el líder indiscutible de su sector y poder cobrar tarifas premium con orgullo. | Branding estratégico 360: logotipo con identidad amazónica, papelería de lujo y letreros 3D corpóreos. |

---

### 1.4. Creativos TOFU (Top of Funnel)

#### Copys Estructurados (Fórmula PAS):
* **Copy TOFU 1 (Enfoque en Retorno de Inversión):**  
  > **Problema:** ¿Cansado de regalar dinero a Facebook sin saber si alguien vio tu anuncio?  
  > **Agitación:** Mes a mes inviertes en publicidad tradicional o en el botón "promocionar", pero tu caja sigue vacía y tu WhatsApp en silencio. Mientras tanto, tu competencia se queda con los clientes listos para comprar.  
  > **Solución:** En NÓMADAS cambiamos las reglas: diseñamos embudos de venta y landing pages ultrarrápidas enfocadas exclusivamente en retorno de inversión medible.  
  > 👉 *Toca el enlace y cotiza tu proyecto con diagnóstico gratis.*

* **Copy TOFU 2 (Enfoque en Velocidad y WhatsApp):**  
  > **Problema:** ¿Sabías que si tu página web tarda más de 3 segundos en abrir, el 53% de tus clientes se van con tu competencia?  
  > **Agitación:** En Puyo y en todo Ecuador la gente navega desde su celular. Si tu sitio es pesado o no tiene un botón directo a WhatsApp, estás tirando clientes a la basura todos los días.  
  > **Solución:** En NÓMADAS construimos sitios web con tecnología Next.js que cargan en menos de 1 segundo y conectan directo con tu asesor comercial.  
  > ⚡ *Transforma tus visitas en ventas reales aquí.*

* **Copy TOFU 3 (Enfoque en Autoridad de Marca y Prestigio):**  
  > **Problema:** Tu producto es excelente, pero tu marca parece de principiante.  
  > **Agitación:** Cuando un cliente ve un logotipo borroso, papelería descuidada o una fachada sin impacto, asume que tu servicio es barato y te pide rebaja. La falta de presencia profesional te está costando miles de dólares.  
  > **Solución:** Diseñamos identidades visuales que imponen respeto: desde manuales corporativos y empaques hasta letreros 3D iluminados que convierten tu local en un punto de referencia.  
  > 🏛️ *Eleva el estatus de tu negocio hoy mismo con Nómadas.*

#### Guiones de Video Corto (0 a 30 segundos):
| Segundo | Guión 1: "El Mito de la Publicidad sin Retorno" | Guión 2: "De Negocio Invisible a Marca Imparable" |
| :--- | :--- | :--- |
| **00 - 03s (Hook)** | Cámara muestra billetes arrojados a un basurero. Texto en pantalla: *"¿Cuánto dinero perdiste hoy en publicidad?"* | Pantalla dividida: Letrero viejo y descolorido vs. Letrero 3D luminoso con luz halo glow. |
| **03 - 15s (Agitación)** | *"Publicar fotos bonitas no paga nóminas. Si no puedes medir cuántas ventas te trajo tu agencia, estás adivinando."* | *"El cliente juzga tu calidad por lo que ve en los primeros 3 segundos. Si tu fachada y tu web lucen descuidadas, te pedirán rebaja."* |
| **15 - 24s (Solución)** | Corte a pantalla del CRM Nómadas mostrando leads calificados: *"En Nómadas creamos embudos que facturan."* | Transición a cliente cerrando contrato por WhatsApp desde su celular con una landing de Nómadas. |
| **24 - 30s (CTA)** | *"Visítanos en nuestra sede en la Av. Alberto Zambrano o toca el enlace para cotizar tu estrategia hoy mismo."* | *"Haz que tu negocio sea imposible de ignorar. Cotiza tu transformación digital con Nómadas ahora."* |

---

## Sección 2: Experiencia de Usuario y Filtro de Captación - MOFU (Semana 2)

### 2.1. Enlace Público de Producción
* **URL Activa en Producción (Vercel):** [https://nomadas-agencia.vercel.app](https://nomadas-agencia.vercel.app)
* **Repositorio de Código Abierto (GitHub):** [https://github.com/cristianfjaramillo-hue/nomadas-agencia](https://github.com/cristianfjaramillo-hue/nomadas-agencia)
* **Stack Tecnológico:** Next.js 16 (App Router + Turbopack), React 19, Tailwind CSS v4, Lucide Icons y Supabase Postgres.

---

### 2.2. Decisiones de UX y Usabilidad
| Bloque de la Landing | Implementación de UX | Propósito Psicológico y Reducción de Fricción |
| :--- | :--- | :--- |
| **Hero Section** | Titular cinético con gradiente *text-shimmer* en movimiento, sin recuadros distractores y video de fondo en bucle con parallax. | Impacto visual inmediato (<2 segundos), retención de atención y presentación sin rodeos de la propuesta de valor. |
| **Servicios 360°** | Tarjetas con microinteracciones hover en gradiente naranja corporativo (`#E25822`) y detalles de entregables. | Comunica amplitud de solución sin abrumar; orienta al usuario hacia sus necesidades específicas. |
| **Portafolio Interactivo** | Ruleta continua 3-en-3 activada exclusivamente por el pase del mouse (0 clics requeridos) con proyectos reales (letreros 3D, CRM, papelería). | Prueba social tangible y demostración de autoridad. El movimiento por hover genera alta interactividad lúdica. |
| **El Método Nómadas** | Diagrama secuencial de 4 pasos (Diagnóstico, Estrategia, Lanzamiento, Optimización). | Reduce el miedo al riesgo del cliente clarificando el proceso de trabajo antes de contratar. |
| **Formulario Filtro** | Diagnóstico interactivo paso a paso con feedback de scoring instantáneo. | Convierte la cotización en una consulta de valor en lugar de un frío formulario de contacto. |
| **Sede & Minimapa** | Iframe de Google Maps con botón directo *"Cómo Llegar"* que abre la app en celulares. | Genera confianza institucional absoluta en el cliente local de Puyo al demostrar existencia física real. |

---

### 2.3. Justificación Estratégica del Formulario Filtro
El formulario ubicado en `#cotizador` fue estructurado con variables predictivas diseñadas para filtrar a los "curiosos" sin capacidad de compra:
1. **Tipo de Negocio (Empresa activa vs Emprendimiento nuevo):** Permite predecir liquidez y volumen operativo.
2. **Nivel de Urgencia Temporal (Esta semana, este mes, solo explorando):** Define el SLA de atención comercial inmediata.
3. **Rango de Presupuesto (<$200, $200-$400, $400-$800, >$800 USD):** Filtro financiero crítico. Evita invertir horas de asesoría en prospectos que no disponen de inversión mínima viable.
4. **Servicios Requeridos:** Permite preconfigurar el paquete de soluciones y estimar el ticket promedio de la propuesta comercial.

---

### 2.4. Captura de Datos Real en Supabase
Los prospectos que completan el diagnóstico en la landing page son transmitidos vía API Route (`POST /api/leads`) a la base de datos Supabase Postgres:

| Nombre & Negocio | Teléfono / Correo | Servicios Solicitados | Presupuesto / Urgencia | Score y Temperatura |
| :--- | :--- | :--- | :--- | :--- |
| **Carlos Mendoza**<br>Hostería El Mirador | 0991234567<br>carlos@mirador.ec | Landing Page, Pauta Ads, Video | > $800 USD<br>Esta semana | **95 / 100**<br>🔥 CALIENTE (HOT) |
| **Cristian Sanchez**<br>Sanchez Retail | 0987654321<br>csanchez@gmail.com | Branding, Landing Web | $400 - $800 USD<br>Esta semana | **90 / 100**<br>🔥 CALIENTE (HOT) |
| **Jose Chala**<br>Chala Motors | 0961122334<br>josechala@gmail.com | Pauta Ads, Landing Page | $400 - $800 USD<br>Este mes | **85 / 100**<br>🔥 CALIENTE (HOT) |
| **Cristian Fernando Jaramillo**<br>Jaramillo Haro Corp | 0962577613<br>cristian@jaramillo.ec | Branding, Web, Pauta, Video | $400 - $800 USD<br>Este mes | **75 / 100**<br>🔥 CALIENTE (HOT) |
| **Milton Arroba**<br>Arroba Comercial | 0981122334<br>milton@arroba.com | Landing Page | $200 - $400 USD<br>Explorando | **40 / 100**<br>⚡ TIBIO (WARM) |
| **Cristian Jaramillo H**<br>Emprendimiento Local | 0962577613<br>contacto@nomadas.ec | Redes Sociales | < $200 USD<br>Explorando | **40 / 100**<br>⚡ TIBIO (WARM) |

---

## Sección 3: El Motor Predictivo y Triage de Prospección - BOFU (Semana 3)

### 3.1. Enlace a la Vista de Administrador
* **URL del Panel Admin:** [https://nomadas-agencia.vercel.app/admin](https://nomadas-agencia.vercel.app/admin)
* **Contraseña de Acceso:** `nomadas2026`

---

### 3.2. Lógica del Algoritmo Matemático de Scoring
El motor implementado en [`lib/scoring.ts`](file:///c:/Users/Administrador/Documents/macroactividad/lib/scoring.ts) evalúa 4 dimensiones cuantitativas:

$$\text{Score} = P_{\text{Presupuesto}}(35) + P_{\text{Urgencia}}(30) + P_{\text{Servicios}}(25) + P_{\text{Tipo}}(10)$$

1. **Presupuesto (Máx 35 pts):**
   * Alto (> $800 USD): **35 pts**
   * Medio-Alto ($400 - $800 USD): **25 pts**
   * Medio ($200 - $400 USD): **15 pts**
   * Bajo (< $200 USD): **5 pts**
2. **Urgencia Temporal (Máx 30 pts):**
   * Esta misma semana: **30 pts** (Máxima intención)
   * En 2 a 4 semanas: **20 pts** (Planificación)
   * Solo explorando: **5 pts** (Curioso)
3. **Amplitud de Servicios (Máx 25 pts):**
   * $\ge 3$ servicios integrados: **25 pts**
   * 2 servicios: **20 pts**
   * 1 servicio: **15 pts**
4. **Madurez del Negocio (Máx 10 pts):**
   * Empresa activa con ventas: **10 pts**
   * Emprendimiento nuevo: **5 pts**

#### Clasificación Automática de Temperatura (Triage Comercial):
* 🔥 **HOT (≥ 70 pts):** Prioridad Alta. SLA de atención en **menos de 15 minutos**.
* ⚡ **WARM (40 - 69 pts):** Prioridad Media. Contacto en el transcurso del día (**< 2 horas**).
* ❄️ **COLD (< 40 pts):** Prioridad Baja. Nutrición automatizada de contenidos (**< 24 horas**).

---

### 3.3. Funcionalidades de la Bandeja de Prioridad en Vivo (/admin)
1. **Reordenamiento Automático Dinámico:** La consulta a la base de datos se ejecuta con `ORDER BY score DESC`, asegurando que los prospectos calientes siempre se ubiquen al tope.
2. **Badges Visuales de Temperatura:** Distintivos de alto contraste (🔥 Caliente, ⚡ Tibio, ❄️ Frío).
3. **Consejos de Cierre Sugeridos por IA:** Recomendaciones heurísticas adaptadas a cada combinación de servicio y presupuesto.
4. **Selector de Estado Comercial en Vivo:** Actualización en tiempo real (`Nuevo`, `Contactado`, `En Negociación`, `No Contesta`, `Cerrado Ganado`, `Perdido`).
5. **Notas del Vendedor con Sincronización:** Registro de acuerdos o motivos de seguimiento.
6. **Descarga de Reportes Oficiales en PDF:** Integración con `jspdf` y `jspdf-autotable` con logotipo oficial incrustado en alta resolución.

---

## Sección 4: Estrategia de Inyección de Tráfico y Atribución (Semana 4)

### 4.1. Plan SEO On-Page y Metadatos de Alta Conversión
| Palabra Clave (Keyword) | Intención de Búsqueda | Ubicación en la Landing Page | Volumen y Dificultad Estimada |
| :--- | :--- | :--- | :--- |
| `agencia de marketing digital puyo` | Transaccional / Local | Title Tag, H1, Meta Description, Footer | Volumen: Medio-Alto \| Dificultad: Baja (Fácil Top 1) |
| `diseño de paginas web puyo pastaza` | Transaccional | H2 de Servicios, Portafolio, FAQ | Volumen: Medio \| Dificultad: Baja |
| `creacion de logotipos y branding puyo` | Transaccional | Sección Branding, Ruleta de Portafolio | Volumen: Medio \| Dificultad: Muy Baja |
| `pauta digital meta ads ecuador` | Comercial / Servicios | H2 Pilar 3 de Pauta, Meta Description | Volumen: Alto nacional \| Dificultad: Media |
| `letreros 3d y publicidad exterior puyo` | Transaccional Local | Sección Portafolio, Sede Física | Volumen: Medio-Bajo \| Dificultad: Nula |

---

### 4.2. Estructura de Campañas SEM (Google Ads & Meta Ads)

#### Google Search Ads (Red de Búsqueda):
* **Grupo 1 (Agencia & Marketing):** Keywords: `[agencia marketing puyo]`, `"marketing digital pastaza"`. Anuncio: *"Nómadas | Agencia de Marketing en Puyo | Ventas Reales"*.
* **Grupo 2 (Desarrollo Web):** Keywords: `[crear pagina web puyo]`, `"diseño web pastaza"`. Anuncio: *"Páginas Web que Venden | Carga en <1s | Nómadas"*.
* **Grupo 3 (Letreros 3D):** Keywords: `[letreros 3d puyo]`, `"letreros luminosos pastaza"`. Anuncio: *"Letreros 3D Corpóreos | Fachadas Comerciales Puyo"*.

#### Meta Ads (Facebook & Instagram Feed/Stories):
* **Campaña 1 (Pymes & Comercios en Pastaza):** Video Reel con Guión 1 (Billetes en basurero / Publicidad sin retorno) + Carrusel de Portafolio.
* **Campaña 2 (Sector Turístico & Hosterías Regional):** Segmentación a gerentes de hoteles en Pastaza, Baños y Napo con oferta de Landing Page experiencial.

---

### 4.3. Tablero de Control y Métricas de Rendimiento Proyectadas (KPIs)
*Presupuesto mensual simulado: $350 USD.*

| Métrica del Embudo | Valor Proyectado | Benchmark de la Industria | Interpretación Estratégica |
| :--- | :--- | :--- | :--- |
| **Impresiones Totales** | 42,000 - 48,000 | 30,000 | Alcance masivo al 70% de la masa empresarial y comercial de la zona. |
| **Clics en Anuncios (Clicks)** | 1,680 - 1,920 | 800 - 1,200 | Elevado interés generado por los ganchos de dolor (PAS). |
| **CTR Estimado (Click-Through Rate)** | 4.0% - 4.2% | 1.5% - 2.5% | Rendimiento superior gracias a copys hiperlocales y específicos. |
| **Costo por Clic Promedio (CPC)** | $0.18 - $0.21 USD | $0.35 - $0.55 USD | Costo por clic sumamente eficiente en el mercado ecuatoriano regional. |
| **Tasa de Conversión Landing (CR%)** | 7.2% - 8.0% | 2.5% - 4.0% | Alta conversión impulsada por el formulario interactivo de scoring. |
| **Leads Cualificados Capturados** | 120 - 150 leads / mes | 40 - 60 leads | Flujo constante de 4 a 5 prospectos ingresando diariamente al panel CRM. |
| **Costo por Lead (CPL)** | $2.33 - $2.91 USD | $6.00 - $12.00 USD | Costo de adquisición de prospecto muy competitivo. |
| **Tasa de Cierre Comercial** | 18% - 22% | 10% - 15% | La pre-cualificación del scoring permite negociar solo con clientes viables. |
| **Nuevos Clientes Cerrados** | 22 - 30 clientes / mes | 5 - 10 clientes | Impacto directo en la facturación y saturación de la capacidad de servicio. |
| **Costo de Adquisición (CAC)** | $11.66 - $15.90 USD | $50.00 - $120.00 USD | Retorno extraordinario: cada cliente adquirido cuesta menos de $16 USD. |

---

## Sección 5: Proyecciones Financieras, ROI y Hoja de Ruta de Escalamiento

### 5.1. Modelo Financiero de Retorno de Inversión (ROI y ROAS)
*Ticket promedio estimado por servicio: $380 USD.*

| Escenario Comercial | Inversión Publicitaria | Leads Calientes (HOT) | Clientes Cerrados | Facturación Bruta | Retorno (ROAS) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Conservador (Pesimista)** | $250 USD / mes | 35 leads | 8 clientes | $3,040 USD | **12.1x** (Por cada $1 genera $12.1) |
| **Moderado (Base)** | $350 USD / mes | 65 leads | 18 clientes | $6,840 USD | **19.5x** (Por cada $1 genera $19.5) |
| **Óptimo (Escala)** | $600 USD / mes | 130 leads | 38 clientes | $14,440 USD | **24.0x** (Por cada $1 genera $24.0) |

---

### 5.2. Arquitectura de Atribución Multicanal & Tracking
1. **Google Analytics 4 & Parámetros UTM:** Registro de fuente, medio y campaña en cada lead capturado (`utm_source`, `utm_medium`, `utm_campaign`).
2. **Meta Conversions API (CAPI) & Pixel:** Disparo del evento estándar `Lead` tras el diagnóstico completado.
3. **Trazabilidad Telefónica & WhatsApp:** Mensajes prellenados por servicio que informan al asesor comercial el origen exacto del prospecto.

---

### 5.3. Hoja de Ruta de Escalamiento Trimestral
* **Fase 1 (Mes 1 - Validación Local):** Puesta a prueba en vivo de la landing page con pauta local inicial de $150 USD. Monitoreo diario del triage en `/admin` y refinamiento de guiones de llamada.
* **Fase 2 (Mes 2-3 - Optimización y Retención):** Activación de retargeting, venta de planes de suscripción mensual (pauta + redes) y actualización de casos de éxito locales.
* **Fase 3 (Mes 4-6 - Expansión Regional y Nacional):** Escalamiento de pauta en Google Search hacia Tungurahua, Napo y Pichincha, e integración de pasarela de pagos digital.

---

### 5.4. Ficha Técnica y Enlaces Oficiales del Ecosistema NÓMADAS
* **Landing Page de Producción:** [https://nomadas-agencia.vercel.app](https://nomadas-agencia.vercel.app)
* **Panel Administrativo CRM:** [https://nomadas-agencia.vercel.app/admin](https://nomadas-agencia.vercel.app/admin) (Clave: `nomadas2026`)
* **Repositorio de Código en GitHub:** [https://github.com/cristianfjaramillo-hue/nomadas-agencia](https://github.com/cristianfjaramillo-hue/nomadas-agencia)
* **Base de Datos Cloud:** Supabase Postgres (`tqpkxwyeokigefuclzyb.supabase.co`)
* **Línea Comercial WhatsApp:** +593 96 257 7613 (096 257 7613)
* **Sede Física:** Av. Alberto Zambrano esquina, diagonal a Coop. OSCUS — Puyo, Pastaza, Ecuador
* **Ubicación Google Maps:** [https://maps.app.goo.gl/kBrLLFJriD5r1Ewp8](https://maps.app.goo.gl/kBrLLFJriD5r1Ewp8)

---
*NÓMADAS AGENCIA DE DISEÑO Y MARKETING DIGITAL © 2026 | TODOS LOS DERECHOS RESERVADOS*
