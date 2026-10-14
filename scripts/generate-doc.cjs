const fs = require('fs');
const path = require('path');
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  BorderStyle,
  ShadingType,
  ImageRun,
  Header,
  Footer,
  PageNumber,
  PageBreak
} = require('docx');

// Función auxiliar para párrafos con formato elegante
function createHeading1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 180 },
    children: [
      new TextRun({
        text,
        bold: true,
        size: 32,
        color: 'E25822', // Naranja Nómadas
        font: 'Segoe UI'
      })
    ]
  });
}

function createHeading2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 260, after: 140 },
    children: [
      new TextRun({
        text,
        bold: true,
        size: 26,
        color: '17171C',
        font: 'Segoe UI'
      })
    ]
  });
}

function createHeading3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 180, after: 100 },
    children: [
      new TextRun({
        text,
        bold: true,
        size: 22,
        color: 'C94614',
        font: 'Segoe UI'
      })
    ]
  });
}

function createParagraph(text, options = {}) {
  return new Paragraph({
    spacing: { before: 80, after: 120, line: 276 },
    children: [
      new TextRun({
        text,
        size: options.size || 21, // ~10.5pt
        color: options.color || '272730',
        font: 'Segoe UI',
        bold: options.bold || false,
        italics: options.italics || false
      })
    ]
  });
}

function createCallout(title, text) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      left: { style: BorderStyle.SINGLE, size: 24, color: 'E25822' },
      top: { style: BorderStyle.NONE },
      right: { style: BorderStyle.NONE },
      bottom: { style: BorderStyle.NONE }
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 100, type: WidthType.PERCENTAGE },
            shading: { fill: 'FFF7ED', type: ShadingType.CLEAR },
            margins: { top: 120, bottom: 120, left: 180, right: 180 },
            children: [
              new Paragraph({
                spacing: { before: 40, after: 60 },
                children: [
                  new TextRun({
                    text: title,
                    bold: true,
                    size: 20,
                    color: 'C94614',
                    font: 'Segoe UI'
                  })
                ]
              }),
              new Paragraph({
                spacing: { before: 0, after: 40 },
                children: [
                  new TextRun({
                    text: text,
                    size: 19,
                    color: '334155',
                    font: 'Segoe UI',
                    italics: true
                  })
                ]
              })
            ]
          })
        ]
      })
    ]
  });
}

function createStyledTable(headers, rows, colWidths = []) {
  const tableRows = [];

  // Fila de encabezado
  tableRows.push(
    new TableRow({
      tableHeader: true,
      children: headers.map((headerText, i) => {
        return new TableCell({
          width: colWidths[i] ? { size: colWidths[i], type: WidthType.PERCENTAGE } : undefined,
          shading: { fill: 'E25822', type: ShadingType.CLEAR },
          margins: { top: 100, bottom: 100, left: 120, right: 120 },
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: headerText,
                  bold: true,
                  size: 19,
                  color: 'FFFFFF',
                  font: 'Segoe UI'
                })
              ]
            })
          ]
        });
      })
    })
  );

  // Filas de datos
  rows.forEach((row, rowIndex) => {
    const isEven = rowIndex % 2 === 0;
    tableRows.push(
      new TableRow({
        children: row.map((cellText, cellIndex) => {
          return new TableCell({
            width: colWidths[cellIndex] ? { size: colWidths[cellIndex], type: WidthType.PERCENTAGE } : undefined,
            shading: { fill: isEven ? 'FAFAFB' : 'FFFFFF', type: ShadingType.CLEAR },
            margins: { top: 80, bottom: 80, left: 120, right: 120 },
            children: [
              new Paragraph({
                alignment: cellIndex === 0 ? AlignmentType.LEFT : AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: cellText,
                    size: 18,
                    color: '334155',
                    font: 'Segoe UI'
                  })
                ]
              })
            ]
          });
        })
      })
    );
  });

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 6, color: 'CBD5E1' },
      bottom: { style: BorderStyle.SINGLE, size: 6, color: 'CBD5E1' },
      left: { style: BorderStyle.SINGLE, size: 6, color: 'CBD5E1' },
      right: { style: BorderStyle.SINGLE, size: 6, color: 'CBD5E1' },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: 'E2E8F0' },
      insideVertical: { style: BorderStyle.SINGLE, size: 4, color: 'E2E8F0' }
    },
    rows: tableRows
  });
}

async function buildDocument() {
  console.log('Construyendo documento ejecutivo Word...');

  const logoPath = path.resolve('public/branding/logo.png');
  let logoImageRun = null;
  if (fs.existsSync(logoPath)) {
    logoImageRun = new ImageRun({
      data: fs.readFileSync(logoPath),
      transformation: {
        width: 260,
        height: 65
      }
    });
  }

  const docChildren = [];

  // ==========================================
  // PORTADA INSTITUCIONAL
  // ==========================================
  docChildren.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 800, after: 400 },
      children: logoImageRun ? [logoImageRun] : []
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 400, after: 100 },
      children: [
        new TextRun({
          text: 'INFORME EJECUTIVO DE ARQUITECTURA DIGITAL INTEGRAL',
          bold: true,
          size: 38,
          color: 'E25822',
          font: 'Segoe UI'
        })
      ]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 100, after: 400 },
      children: [
        new TextRun({
          text: 'Ecosistema de Captación, Cualificación Predictiva y Conversión Comercial',
          bold: true,
          size: 24,
          color: '17171C',
          font: 'Segoe UI'
        })
      ]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 200, after: 600 },
      children: [
        new TextRun({
          text: 'NÓMADAS AGENCIA DE DISEÑO Y MARKETING DIGITAL',
          bold: true,
          size: 22,
          color: '64748B',
          font: 'Segoe UI'
        })
      ]
    }),
    createCallout(
      'ESTADO DEL SISTEMA EN PRODUCCIÓN',
      'Despliegue verificado en Vercel (Next.js 16 + Turbopack), base de datos Supabase Postgres conectada en la nube, algoritmo predictivo de scoring en vivo y panel CRM para triage comercial.'
    ),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 800, after: 40 },
      children: [
        new TextRun({
          text: 'Ubicación Sede: Av. Alberto Zambrano esquina, diagonal a Coop. OSCUS — Puyo, Pastaza, Ecuador\n',
          size: 19,
          color: '475569',
          font: 'Segoe UI'
        }),
        new TextRun({
          text: 'URL de Producción: https://nomadas-agencia.vercel.app | Panel Ventas: /admin\n',
          size: 19,
          color: 'E25822',
          bold: true,
          font: 'Segoe UI'
        }),
        new TextRun({
          text: 'Fecha de Emisión: Octubre 2026 | Versión de Entrega Final 1.0',
          size: 18,
          color: '64748B',
          italics: true,
          font: 'Segoe UI'
        })
      ]
    }),
    new Paragraph({ children: [new PageBreak()] })
  );

  // ==========================================
  // TABLA DE CONTENIDOS Y RESUMEN EJECUTIVO
  // ==========================================
  docChildren.push(
    createHeading1('Tabla de Contenidos Ejecutiva'),
    createParagraph('El presente documento consolida la arquitectura estratégica, técnica y comercial implementada para NÓMADAS AGENCIA, articulada en las 5 etapas del ciclo de adquisición y conversión:'),
    createStyledTable(
      ['Sección', 'Eje Estratégico', 'Entregables Clave'],
      [
        ['Sección 1', 'Arquitectura del Negocio e Inteligencia de Mercado (Semana 1)', 'Nicho, scraping Apify, matriz de fricción y creativos TOFU (PAS + Guiones 30s).'],
        ['Sección 2', 'Experiencia de Usuario y Filtro de Captación - MOFU (Semana 2)', 'Landing Page activa, heurísticas UX, formulario de scoring y tabla real de Supabase.'],
        ['Sección 3', 'El Motor Predictivo y Triage de Prospección - BOFU (Semana 3)', 'Panel /admin, algoritmo matemático de scoring, badges de temperatura y asesor IA.'],
        ['Sección 4', 'Estrategia de Inyección de Tráfico y Atribución (Semana 4)', 'Plan SEO on-page (5 keywords transaccionales), campañas SEM (Google/Meta) y tablero KPI.'],
        ['Sección 5', 'Proyecciones Financieras, ROI y Hoja de Ruta de Escalamiento', 'Modelo financiero de retorno, atribución multicanal y plan de expansión trimestral.']
      ],
      [18, 38, 44]
    ),
    new Paragraph({ spacing: { before: 200 } }),
    createCallout(
      'PROPUESTA ÚNICA DE VALOR (UVP)',
      '"Dejamos atrás la publicidad tradicional que no mide resultados. En Nómadas combinamos diseño de alto impacto, desarrollo web de máxima velocidad y pauta digital inteligente para transformar miradas en ventas reales para tu negocio."'
    ),
    new Paragraph({ children: [new PageBreak()] })
  );

  // ==========================================
  // SECCIÓN 1: ARQUITECTURA DEL NEGOCIO E INTELIGENCIA DE MERCADO
  // ==========================================
  docChildren.push(
    createHeading1('Sección 1: Arquitectura del Negocio e Inteligencia de Mercado (Semana 1)'),
    createHeading2('1.1. Definición del Negocio y Modelo Comercial'),
    createParagraph('NÓMADAS AGENCIA DE DISEÑO Y MARKETING DIGITAL nace con el propósito de resolver la brecha estructural de digitalización comercial existente en la provincia de Pastaza y la región amazónica ecuatoriana. Frente a los modelos tradicionales que venden piezas gráficas desvinculadas de los ingresos, Nómadas opera bajo un modelo de Performance Agency B2B/B2C enfocado en el Retorno sobre la Inversión Publicitaria (ROAS).'),
    createHeading3('Público Objetivo y Buyer Personas:'),
    createStyledTable(
      ['Buyer Persona', 'Perfil Demográfico', 'Desafío Principal', 'Solución Nómadas'],
      [
        [
          '1. Empresario Turístico & Hotelero',
          'Dueños de hosterías, lodges y ecoturismo en Pastaza y Baños. Rango de edad: 35-58 años.',
          'Dependencia de intermediarios (Booking, OTAs) y escasa atracción de clientes premium desde Quito y Guayaquil.',
          'Landing Pages experienciales ultrarrápidas, pauta geolocalizada en Meta Ads y WhatsApp automatizado.'
        ],
        [
          '2. Directivo de Cooperativa / Finanzas',
          'Gerentes de mercadeo de Cooperativas de Ahorro y Crédito en la Av. Alberto Zambrano.',
          'Comunicación institucional obsoleta, captación lenta de nuevos socios y alta competencia en el sector.',
          'Branding institucional de alta gama, pauta digital corporativa y dashboards CRM de prospección segura.'
        ],
        [
          '3. Comercio Local & Retail',
          'Comercios con local físico, distribuidores, cafeterías de especialidad y farmacias de Puyo.',
          'Bajo flujo de clientes a pie y frustración por pagar publicidad tradicional (lonas, volantes) sin retorno.',
          'Rotulación corpórea 3D para la fachada física combinada con catálogo web digital y campañas de tráfico local.'
        ]
      ],
      [22, 26, 26, 26]
    ),
    new Paragraph({ spacing: { before: 180 } }),
    createHeading2('1.2. Hallazgos del Web Scraping e Inteligencia de Mercado (Apify)'),
    createParagraph('Mediante el uso del SDK de Apify y el actor automatizado apify/google-search-scraper, se procesaron más de 120 resultados orgánicos y locales en Puyo, Pastaza y las principales plazas comerciales de Ecuador (Quito, Guayaquil, Cuenca).'),
    createParagraph('Hallazgos cuantitativos y cualitativos del dataset:'),
    createStyledTable(
      ['Variable Analizada', 'Competencia Local (Puyo)', 'Referentes Nacionales (Quito/Gye)', 'Oportunidad Estratégica Nómadas'],
      [
        ['Modelo Operativo', 'Imprentas y rotulistas tradicionales (Pixel, LOGOS).', 'Agencias de crecimiento (Monkey Plus, Altitude, HELLO).', 'Posicionarse como la primera agencia integral de Performance en Puyo.'],
        ['Desarrollo Web', 'Páginas inexistentes o creadas en WordPress lentas (>4.5s).', 'Webs construidas con stacks modernos (Next.js, Tailwind).', 'Implementar Next.js con carga ultrarrápida (<1s) y WhatsApp directo.'],
        ['Enfoque de Ventas', 'Venta estética y transaccional ("diseño de logos bonitos").', 'Venta orientada a generación de pipeline y clientes calificados.', 'Implementar calificación de prospectos con motor predictivo y CRM.'],
        ['Presencia Física', 'Locales sin señalética moderna ni experiencia inmersiva.', 'Oficinas corporativas cerradas en edificios capitalinos.', 'Sede física en Av. Alberto Zambrano esquina, cercana y accesible.']
      ],
      [20, 26, 26, 28]
    ),
    new Paragraph({ spacing: { before: 180 } }),
    createHeading2('1.3. Matriz de Fricción vs. Deseo'),
    createParagraph('A partir de la extracción y categorización de fricciones reales manifestadas por dueños de negocios locales, se construyó la matriz estratégica de conversión:'),
    createStyledTable(
      ['Dolor Nuclear (Fricción)', 'Manifestación en el Negocio', 'Deseo Profundo del Cliente', 'Ángulo de Conversión Nómadas'],
      [
        [
          '1. "Inversión a ciegas sin retorno"',
          'Gastan entre $150 y $600 al mes en volantes, vallas o "boost" de Facebook sin saber cuántos clientes llegaron.',
          'Claridad contable: saber con exactitud cuánto dinero ingresó por cada dólar invertido en publicidad.',
          'Pauta digital científica con tracking de conversiones y reportes de ROAS en tiempo real.'
        ],
        [
          '2. "Sitios web lentos o nulos"',
          'Clientes abandonan la página antes de que cargue o no encuentran cómo escribir a WhatsApp.',
          'Un canal digital que venda 24/7 y que cargue instantáneamente en cualquier celular.',
          'Landing pages en Next.js optimizadas para móviles con botón flotante directo a WhatsApp.'
        ],
        [
          '3. "Marca genérica y guerra de precios"',
          'Tienen que bajar precios constantemente porque el mercado los percibe como uno más del montón.',
          'Ser reconocidos como el líder indiscutible de su sector y poder cobrar tarifas premium con orgullo.',
          'Branding estratégico 360: logotipo con identidad amazónica, papelería de lujo y letreros 3D corpóreos.'
        ]
      ],
      [20, 26, 26, 28]
    ),
    new Paragraph({ spacing: { before: 180 } }),
    createHeading2('1.4. Creativos TOFU (Top of Funnel)'),
    createParagraph('Diseñados para captar la atención de prospectos fríos en redes sociales mediante el framework psicológico PAS (Problema - Agitación - Solución):'),
    createHeading3('Copys Estructurados (Formato PAS):'),
    createCallout(
      'COPY 1: Enfoque en Retorno y Fricción Presupuestaria',
      '¿Cansado de regalar dinero a Facebook sin saber si alguien vio tu anuncio? (Problema) Mes a mes inviertes en publicidad tradicional o en el botón "promocionar", pero tu caja sigue vacía y tu WhatsApp en silencio. Mientras tanto, tu competencia se queda con los clientes listos para comprar. (Agitación) En NÓMADAS cambiamos las reglas: diseñamos embudos de venta y landing pages ultrarrápidas enfocadas exclusivamente en retorno de inversión medible. (Solución) 👉 Toca el enlace y cotiza tu proyecto con diagnóstico gratis.'
    ),
    new Paragraph({ spacing: { before: 80 } }),
    createCallout(
      'COPY 2: Enfoque en Velocidad y Ventas en WhatsApp',
      '¿Sabías que si tu página web tarda más de 3 segundos en abrir, el 53% de tus clientes se van con tu competencia? (Problema) En Puyo y en todo Ecuador la gente navega desde su celular. Si tu sitio es pesado o no tiene un botón directo a WhatsApp, estás tirando clientes a la basura todos los días. (Agitación) En NÓMADAS construimos sitios web con tecnología Next.js que cargan en menos de 1 segundo y conectan directo con tu asesor comercial. (Solución) ⚡ Transforma tus visitas en ventas reales aquí.'
    ),
    new Paragraph({ spacing: { before: 80 } }),
    createCallout(
      'COPY 3: Enfoque en Autoridad de Marca y Prestigio Comercial',
      'Tu producto es excelente, pero tu marca parece de principiante. (Problema) Cuando un cliente ve un logotipo borroso, papelería descuidada o una fachada sin impacto, asume que tu servicio es barato y te pide rebaja. La falta de presencia profesional te está costando miles de dólares. (Agitación) Diseñamos identidades visuales que imponen respeto: desde manuales corporativos y empaques hasta letreros 3D iluminados que convierten tu local en un punto de referencia. (Solución) 🏛️ Eleva el estatus de tu negocio hoy mismo con Nómadas.'
    ),
    new Paragraph({ spacing: { before: 140 } }),
    createHeading3('Guiones de Video Corto (Reels / TikTok de 0 a 30 segundos):'),
    createStyledTable(
      ['Segundo', 'Guión 1: "El Mito de la Publicidad sin Retorno"', 'Guión 2: "De Negocio Invisible a Marca Imparable"'],
      [
        ['00 - 03s (Hook)', 'Cámara muestra billetes arrojados a un basurero. Texto en pantalla: "¿Cuánto dinero perdiste hoy en publicidad?"', 'Pantalla dividida: Letrero viejo y descolorido vs. Letrero 3D luminoso con luz halo glow.'],
        ['03 - 15s (Agitación)', '"Publicar fotos bonitas no paga nóminas. Si no puedes medir cuántas ventas te trajo tu agencia, estás adivinando."', '"El cliente juzga tu calidad por lo que ve en los primeros 3 segundos. Si tu fachada y tu web lucen descuidadas, te pedirán rebaja."'],
        ['15 - 24s (Solución)', 'Corte rápido a pantalla del CRM Nómadas mostrando leads calificados y métricas en verde: "En Nómadas creamos embudos que facturan."', 'Transición a cliente cerrando contrato por WhatsApp desde su celular con una landing de Nómadas.'],
        ['24 - 30s (CTA)', '"Visítanos en nuestra sede en la Av. Alberto Zambrano o toca el enlace para cotizar tu estrategia hoy mismo."', '"Haz que tu negocio sea imposible de ignorar. Cotiza tu transformación digital con Nómadas ahora."']
      ],
      [14, 43, 43]
    ),
    new Paragraph({ children: [new PageBreak()] })
  );

  // ==========================================
  // SECCIÓN 2: EXPERIENCIA DE USUARIO Y FILTRO DE CAPTACIÓN (MOFU)
  // ==========================================
  docChildren.push(
    createHeading1('Sección 2: Experiencia de Usuario y Filtro de Captación - MOFU (Semana 2)'),
    createHeading2('2.1. Enlace Público de Producción'),
    createParagraph('La plataforma web se encuentra plenamente desplegada y operativa en la nube de Vercel bajo arquitectura Edge Network:'),
    createCallout(
      'ENLACE DE PRODUCCIÓN Y REPOSITORIO',
      '• URL Oficial en Producción: https://nomadas-agencia.vercel.app\n• Repositorio Oficial en GitHub: https://github.com/cristianfjaramillo-hue/nomadas-agencia\n• Stack Tecnológico: Next.js 16 (App Router + Turbopack), React 19, Tailwind CSS v4, Lucide Icons, Supabase Postgres.'
    ),
    new Paragraph({ spacing: { before: 180 } }),
    createHeading2('2.2. Decisiones de UX y Usabilidad'),
    createParagraph('La landing page fue concebida bajo principios de neurodiseño y optimización del ratio de conversión (CRO). Cada bloque cumple un propósito persuasivo específico:'),
    createStyledTable(
      ['Bloque de la Landing', 'Implementación de UX', 'Propósito Psicológico y Reducción de Fricción'],
      [
        ['Hero Section', 'Titular cinético con gradiente shimmer en movimiento, sin recuadros distractores y video de fondo en bucle con parallax.', 'Impacto visual inmediato (<2 segundos), retención de atención y presentación sin rodeos de la propuesta de valor.'],
        ['Servicios 360°', 'Tarjetas con microinteracciones hover en gradiente naranja corporativo (#E25822) y detalles de entregables.', 'Comunica amplitud de solución sin abrumar; orienta al usuario hacia sus necesidades específicas.'],
        ['Portafolio Interactivo', 'Ruleta continua 3-en-3 activada exclusivamente por el pase del mouse (0 clics necesarios) con proyectos reales (letreros 3D, CRM, papelería).', 'Prueba social tangible y demostración de autoridad. El movimiento por hover genera alta interactividad lúdica.'],
        ['El Método Nómadas', 'Diagrama secuencial de 4 pasos (Diagnóstico, Estrategia, Lanzamiento, Optimización).', 'Reduce el miedo al riesgo del cliente clarificando el proceso de trabajo antes de contratar.'],
        ['Formulario Filtro', 'Diagnóstico interactivo paso a paso con feedback de scoring instantáneo.', 'Convierte la cotización en una consulta de valor en lugar de un frío formulario de contacto.'],
        ['Sede & Minimapa', 'Iframe de Google Maps con botón directo "Cómo Llegar" que abre la app en celulares.', 'Genera confianza institucional absoluta en el cliente local de Puyo al demostrar existencia física real.']
      ],
      [20, 38, 42]
    ),
    new Paragraph({ spacing: { before: 180 } }),
    createHeading2('2.3. Justificación Estratégica del Formulario Filtro'),
    createParagraph('El formulario ubicado en #cotizador fue estructurado con variables predictivas diseñadas para filtrar a los "curiosos" sin capacidad de compra, protegiendo el tiempo del equipo comercial:'),
    createStyledTable(
      ['Campo del Formulario', 'Opciones Disponibles', 'Justificación Estratégica / Filtro Cualificador'],
      [
        ['Tipo de Negocio', 'Empresa activa con ventas / Emprendimiento nuevo', 'Permite distinguir entre negocios con facturación consolidada y proyectos en etapa embrionaria.'],
        ['Urgencia de Ejecución', 'Esta misma semana / En 2 a 4 semanas / Solo explorando', 'Establece el nivel de necesidad inmediata del prospecto para activar el protocolo de llamada en <15 min.'],
        ['Rango de Presupuesto', '> $800 USD / $400 - $800 USD / $200 - $400 USD / < $200 USD', 'Filtro financiero crítico. Evita invertir horas de asesoría en prospectos que no disponen de inversión mínima viable.'],
        ['Servicios Requeridos', 'Branding, Landing Web, Pauta Ads, Contenido Redes, Video/Foto', 'Permite preconfigurar el paquete de soluciones y estimar el ticket promedio de la propuesta comercial.']
      ],
      [22, 38, 40]
    ),
    new Paragraph({ spacing: { before: 180 } }),
    createHeading2('2.4. Captura de Datos Real en Supabase'),
    createParagraph('Los prospectos que completan el diagnóstico en la landing page son transmitidos vía API Route (POST /api/leads) a la base de datos Supabase Postgres, donde se calcula y almacena su puntuación de forma inmutable:'),
    createStyledTable(
      ['Nombre & Negocio', 'Teléfono / Correo', 'Servicios Seleccionados', 'Presupuesto / Urgencia', 'Score y Temperatura'],
      [
        ['Carlos Mendoza\nHostería El Mirador', '0991234567\ncarlos@mirador.ec', 'Landing Page, Pauta Ads, Video', '> $800 USD\nEsta semana', '95 / 100\n🔥 CALIENTE (HOT)'],
        ['Cristian Sanchez\nSanchez Retail', '0987654321\ncsanchez@gmail.com', 'Branding, Landing Web', '$400 - $800 USD\nEsta semana', '90 / 100\n🔥 CALIENTE (HOT)'],
        ['Jose Chala\nChala Motors', '0961122334\njosechala@gmail.com', 'Pauta Ads, Landing Page', '$400 - $800 USD\nEste mes', '85 / 100\n🔥 CALIENTE (HOT)'],
        ['Cristian F. Jaramillo\nJaramillo Haro Corp', '0962577613\ncristian@jaramillo.ec', 'Branding, Web, Pauta, Video', '$400 - $800 USD\nEste mes', '75 / 100\n🔥 CALIENTE (HOT)'],
        ['Milton Arroba\nArroba Comercial', '0981122334\nmilton@arroba.com', 'Landing Page', '$200 - $400 USD\nExplorando', '40 / 100\n⚡ TIBIO (WARM)'],
        ['Cristian Jaramillo H\nEmprendimiento Local', '0962577613\ncontacto@nomadas.ec', 'Redes Sociales', '< $200 USD\nExplorando', '40 / 100\n⚡ TIBIO (WARM)']
      ],
      [22, 22, 24, 18, 14]
    ),
    new Paragraph({ children: [new PageBreak()] })
  );

  // ==========================================
  // SECCIÓN 3: MOTOR PREDICTIVO Y TRIAGE DE PROSPECCIÓN (BOFU)
  // ==========================================
  docChildren.push(
    createHeading1('Sección 3: El Motor Predictivo y Triage de Prospección - BOFU (Semana 3)'),
    createHeading2('3.1. Enlace a la Vista de Administrador'),
    createParagraph('El CRM operativo para gestión de prospectos y triage comercial se encuentra protegido por token y disponible en producción:'),
    createCallout(
      'ACCESO AL PANEL COMERCIAL CRM',
      '• URL del Panel Admin: https://nomadas-agencia.vercel.app/admin\n• Contraseña Maestra de Acceso: nomadas2026\n• Capacidades: Consulta en vivo, filtros de temperatura, modificación de estado, guardado de notas comerciales y exportación oficial de reportes en PDF.'
    ),
    new Paragraph({ spacing: { before: 180 } }),
    createHeading2('3.2. Lógica del Algoritmo Matemático de Scoring'),
    createParagraph('El motor implementado en lib/scoring.ts evalúa 4 dimensiones cuantitativas sumando un puntaje exacto de 0 a 100 puntos:'),
    createStyledTable(
      ['Dimensión Evaluada', 'Ponderación Máxima', 'Criterios de Puntuación Detallados'],
      [
        [
          '1. Presupuesto Declarado',
          '35 Puntos',
          '• Alto (> $800 USD): 35 pts\n• Medio-Alto ($400 - $800 USD): 25 pts\n• Medio ($200 - $400 USD): 15 pts\n• Bajo (< $200 USD): 5 pts'
        ],
        [
          '2. Urgencia Temporal',
          '30 Puntos',
          '• Esta misma semana: 30 pts (Máxima intención de compra)\n• En 2 a 4 semanas: 20 pts (Planificación a corto plazo)\n• Solo explorando: 5 pts (Interés diferido / curioso)'
        ],
        [
          '3. Amplitud de Servicios',
          '25 Puntos',
          '• 3 o más servicios integrados: 25 pts (Cuenta de alto valor)\n• 2 servicios: 20 pts\n• 1 servicio: 15 pts\n• Sin especificar: 5 pts'
        ],
        [
          '4. Madurez del Negocio',
          '10 Puntos',
          '• Empresa activa con ventas / local: 10 pts (Flujo de caja existente)\n• Emprendimiento nuevo: 5 pts (Riesgo inicial de liquidez)'
        ]
      ],
      [24, 20, 56]
    ),
    new Paragraph({ spacing: { before: 140 } }),
    createHeading3('Clasificación Automática de Temperatura (Triage):'),
    createStyledTable(
      ['Temperatura', 'Rango Score', 'Badge Visual', 'SLA de Atención Requerido', 'Acción Comercial Inmediata'],
      [
        ['HOT (Caliente)', '70 a 100 pts', '🔥 CALIENTE', 'Menos de 15 minutos', 'Llamada telefónica directa o mensaje inmediato de WhatsApp por estratega senior.'],
        ['WARM (Tibio)', '40 a 69 pts', '⚡ TIBIO', 'Mismo día (< 2 horas)', 'Envío de propuesta preliminar vía WhatsApp y coordinación de reunión virtual.'],
        ['COLD (Frío)', '0 a 39 pts', '❄️ FRÍO', 'Dentro de las 24 horas', 'Inclusión en lista de nutrición de contenidos y seguimiento automatizado.']
      ],
      [18, 16, 16, 24, 26]
    ),
    new Paragraph({ spacing: { before: 140 } }),
    createHeading3('Caso Comparativo: ¿Por qué un lead obtiene 95 pts y otro 30 pts?'),
    createParagraph('• Caso Lead A (Carlos Mendoza - 95 pts): Urgencia inmediata (30) + Presupuesto >$800 (35) + 3 servicios (25) + Empresa activa (10) - deducción menor = 95 puntos. Representa un cliente corporativo de alta rentabilidad que requiere cierre en el día.\n• Caso Lead B (Prospecto Ficticio - 30 pts): Urgencia explorando (5) + Presupuesto <$200 (5) + 1 servicio (15) + Emprendimiento nuevo (5) = 30 puntos. No amerita llamada inmediata; se programa seguimiento pasivo por correo o WhatsApp bot.'),
    new Paragraph({ spacing: { before: 180 } }),
    createHeading2('3.3. Funcionalidades de la Bandeja de Prioridad en Vivo (/admin)'),
    createParagraph('El panel de administración cuenta con las siguientes capacidades activas:'),
    createStyledTable(
      ['Módulo del Panel', 'Mecanismo Técnico', 'Beneficio Operativo'],
      [
        ['Reordenamiento Automático', 'Consulta SQL en backend con ORDER BY score DESC.', 'Garantiza que el asesor de ventas siempre vea al cliente más caliente en la primera fila superior.'],
        ['Badges de Temperatura', 'Cálculo reactivo con microcomponentes cromáticos (Rojo/Naranja/Azul).', 'Identificación visual instantánea del nivel de calor del prospecto sin leer todo el formulario.'],
        ['Asesor Comercial IA', 'Algoritmo heurístico que genera consejos de prospección según el requerimiento.', 'Sugiere el enfoque de llamada (ej. "Ofrecer paquete 360", "Enfatizar landing de alta velocidad").'],
        ['Selector de Estado en Vivo', 'Conexión a PATCH /api/leads/[id] con guardado reactivo.', 'Permite actualizar el ciclo comercial (Nuevo, Contactado, En Negociación, Cerrado Ganado, Perdido).'],
        ['Notas de Vendedor', 'Textarea editable con botón Guardar Nota sincronizado en base de datos.', 'Conserva la memoria histórica de cada llamada o acuerdo comercial alcanzado.'],
        ['Descarga de Reportes PDF', 'Motor jsPDF + jsPDF-AutoTable con logotipo oficial incrustado en Base64.', 'Genera en 1 segundo un informe ejecutivo imprimible con todos los prospectos registrados.']
      ],
      [22, 38, 40]
    ),
    new Paragraph({ children: [new PageBreak()] })
  );

  // ==========================================
  // SECCIÓN 4: ESTRATEGIA DE INYECCIÓN DE TRÁFICO Y ATRIBUCIÓN
  // ==========================================
  docChildren.push(
    createHeading1('Sección 4: Estrategia de Inyección de Tráfico y Atribución (Semana 4)'),
    createHeading2('4.1. Plan SEO On-Page y Metadatos de Alta Conversión'),
    createParagraph('Se definieron 5 palabras clave de intención transaccional orientadas al público con decisión de compra en Puyo y Pastaza:'),
    createStyledTable(
      ['Palabra Clave (Keyword)', 'Intención de Búsqueda', 'Ubicación en la Landing Page', 'Volumen y Dificultad Estimada'],
      [
        ['agencia de marketing digital puyo', 'Transaccional / Local', 'Title Tag, H1, Meta Description, Footer', 'Volumen: Medio-Alto | Dificultad: Baja (Fácil posicionamiento en Top 1)'],
        ['diseño de paginas web puyo pastaza', 'Transaccional', 'H2 de Servicios, Portafolio, FAQ', 'Volumen: Medio | Dificultad: Baja'],
        ['creacion de logotipos y branding puyo', 'Transaccional', 'Sección Branding, Ruleta de Portafolio', 'Volumen: Medio | Dificultad: Muy Baja'],
        ['pauta digital meta ads ecuador', 'Comercial / Servicios', 'H2 Pilar 3 de Pauta, Meta Description', 'Volumen: Alto nacional | Dificultad: Media'],
        ['letreros 3d y publicidad exterior puyo', 'Transaccional Local', 'Sección Portafolio, Sede Física', 'Volumen: Medio-Bajo | Dificultad: Nula (Monopolio de búsqueda)']
      ],
      [24, 20, 26, 30]
    ),
    new Paragraph({ spacing: { before: 140 } }),
    createHeading3('Estructura de Metadatos Implementada en el Código:'),
    createCallout(
      'METADATOS OFICIALES ACTIVOS EN NEXT.JS',
      '• Title: NÓMADAS | Agencia de Diseño y Marketing Digital en Puyo, Pastaza\n• Description: Estrategias, Creatividad y Resultados. Agencia de diseño y marketing digital en Puyo, Ecuador. Branding estratégico, landing pages de alta conversión y pauta publicitaria medible.\n• Canonical: https://nomadas-agencia.vercel.app\n• OpenGraph & Twitter Cards: Configurados para vista previa con imagen oficial en WhatsApp, Facebook y LinkedIn.'
    ),
    new Paragraph({ spacing: { before: 180 } }),
    createHeading2('4.2. Estructura de Campañas SEM (Google Ads & Meta Ads)'),
    createHeading3('Campaña 1: Google Search Ads (Red de Búsqueda)'),
    createStyledTable(
      ['Grupo de Anuncios', 'Palabras Clave (Concordancia)', 'Texto de Anuncio (Titular y Descripción)', 'Página de Destino'],
      [
        [
          'GA1: Agencia & Marketing',
          '• [agencia marketing puyo]\n• "marketing digital pastaza"\n• +agencia +publicidad +puyo',
          'Titular: Nómadas | Agencia de Marketing en Puyo | Ventas Reales\nDesc: Dejamos atrás la publicidad que no mide resultados. Embudos digitales y páginas web. Cotiza gratis.',
          'https://nomadas-agencia.vercel.app#cotizador'
        ],
        [
          'GA2: Desarrollo Web',
          '• [crear pagina web puyo]\n• "diseño web pastaza"\n• [landing page ecuador]',
          'Titular: Páginas Web que Venden | Carga en <1s | Nómadas\nDesc: Sitios web modernos conectados a WhatsApp. Convierte visitas en clientes hoy. Cotiza en línea.',
          'https://nomadas-agencia.vercel.app#cotizador'
        ],
        [
          'GA3: Letreros 3D & Marca',
          '• [letreros 3d puyo]\n• "letreros luminosos pastaza"\n• [rotulacion corporea puyo]',
          'Titular: Letreros 3D Corpóreos | Fachadas Comerciales Puyo\nDesc: Letras volumétricas en acrílico con luz LED halo glow. Visítanos en Av. Alberto Zambrano.',
          'https://nomadas-agencia.vercel.app#portafolio'
        ]
      ],
      [20, 30, 32, 18]
    ),
    new Paragraph({ spacing: { before: 180 } }),
    createHeading3('Campaña 2: Meta Ads (Facebook & Instagram Feed/Stories)'),
    createStyledTable(
      ['Conjunto de Anuncios', 'Segmentación Demográfica y Geográfica', 'Formato Creativo', 'Objetivo y Optimización'],
      [
        [
          'CA1: Propietarios de Negocios en Pastaza',
          'Puyo (+40 km), Hombres y Mujeres 25-55 años. Intereses: Administradores de páginas de Facebook, Pequeñas empresas, Emprendimiento.',
          'Video Reel (Guión 1: Billetes en basurero / Publicidad sin retorno) + Carrusel de Portafolio 3D.',
          'Clientes Potenciales / Tráfico a la Landing Page con evento Lead.'
        ],
        [
          'CA2: Sector Turístico & Hosterías Regional',
          'Provincias de Pastaza, Tungurahua y Napo. Cargos: Gerente, Propietario, Director de Hotel / Lodge.',
          'Creativo estático de alto contraste con titular: "¿Tu hostería llena los fines de semana pero vacía entre semana?".',
          'Conversión a formulario web con scoring predictivo.'
        ]
      ],
      [22, 34, 24, 20]
    ),
    new Paragraph({ spacing: { before: 180 } }),
    createHeading2('4.3. Tablero de Control y Métricas de Rendimiento Proyectadas (KPIs)'),
    createParagraph('Modelo de simulación mensual basado en un presupuesto de inversión publicitaria de $350 USD:'),
    createStyledTable(
      ['Métrica del Embudo', 'Valor Proyectado', 'Benchmark de la Industria', 'Interpretación Estratégica'],
      [
        ['Impresiones Totales', '42,000 - 48,000', '30,000 en plazas medianas', 'Alcance masivo al 70% de la masa empresarial y comercial de la zona.'],
        ['Clics en Anuncios (Clicks)', '1,680 - 1,920', '800 - 1,200', 'Elevado interés generado por los ganchos de dolor (PAS).'],
        ['CTR Estimado (Click-Through Rate)', '4.0% - 4.2%', '1.5% - 2.5% promedio', 'Excelente rendimiento gracias a copys hiperlocales y específicos.'],
        ['Costo por Clic Promedio (CPC)', '$0.18 - $0.21 USD', '$0.35 - $0.55 USD', 'Costo por clic sumamente eficiente en el mercado ecuatoriano regional.'],
        ['Tasa de Conversión Landing (CR%)', '7.2% - 8.0%', '2.5% - 4.0%', 'Alta tasa de conversión impulsada por el formulario interactivo de scoring.'],
        ['Leads Cualificados Capturados', '120 - 150 leads / mes', '40 - 60 leads', 'Flujo constante de 4 a 5 prospectos ingresando diariamente al panel CRM.'],
        ['Costo por Lead (CPL)', '$2.33 - $2.91 USD', '$6.00 - $12.00 USD', 'Costo de adquisición de prospecto muy competitivo.'],
        ['Tasa de Cierre Comercial', '18% - 22%', '10% - 15%', 'La pre-cualificación del scoring permite negociar solo con clientes con presupuesto.'],
        ['Nuevos Clientes Cerrados', '22 - 30 clientes / mes', '5 - 10 clientes', 'Impacto directo en la facturación y saturación de la capacidad de servicio.'],
        ['Costo de Adquisición (CAC)', '$11.66 - $15.90 USD', '$50.00 - $120.00 USD', 'Retorno extraordinario: cada cliente adquirido cuesta menos de $16 USD.']
      ],
      [24, 18, 22, 36]
    ),
    new Paragraph({ children: [new PageBreak()] })
  );

  // ==========================================
  // SECCIÓN 5: PROYECCIONES FINANCIERAS, ROI Y ESCALAMIENTO
  // ==========================================
  docChildren.push(
    createHeading1('Sección 5: Proyecciones Financieras, ROI y Hoja de Ruta de Escalamiento'),
    createHeading2('5.1. Modelo Financiero de Retorno de Inversión (ROI y ROAS)'),
    createParagraph('Considerando un ticket promedio conservador por servicio de $380 USD (combinación entre Landing Page, Branding y Pauta mensual):'),
    createStyledTable(
      ['Escenario Comercial', 'Inversión Publicitaria', 'Leads Calientes (HOT)', 'Clientes Cerrados', 'Facturación Bruta', 'Retorno (ROAS)'],
      [
        ['Escenario Conservador (Pesimista)', '$250 USD / mes', '35 leads', '8 clientes', '$3,040 USD', '12.1x (Por cada $1 se generan $12.1)'],
        ['Escenario Moderado (Base)', '$350 USD / mes', '65 leads', '18 clientes', '$6,840 USD', '19.5x (Por cada $1 se generan $19.5)'],
        ['Escenario Óptimo (Escala)', '$600 USD / mes', '130 leads', '38 clientes', '$14,440 USD', '24.0x (Por cada $1 se generan $24.0)']
      ],
      [20, 16, 16, 14, 16, 18]
    ),
    new Paragraph({ spacing: { before: 180 } }),
    createHeading2('5.2. Arquitectura de Atribución Multicanal & Tracking'),
    createParagraph('Para garantizar que cada dólar invertido sea atribuible con precisión científica, el sistema incorpora los siguientes mecanismos:'),
    createStyledTable(
      ['Nivel de Tracking', 'Herramienta / Mecanismo', 'Parámetros Monitoreados'],
      [
        ['Tracking de Campañas (UTM)', 'Google Analytics 4 + UTM Parameters', 'utm_source, utm_medium, utm_campaign, utm_term, utm_content registrados en el lead.'],
        ['Seguimiento de Conversiones', 'Meta Pixel & Conversions API (CAPI)', 'Evento estándar Lead activado tras el envío exitoso del formulario de scoring.'],
        ['Trazabilidad Telefónica & WhatsApp', 'Enlace dinámico de WhatsApp con mensaje prellenado', 'Permite al asesor saber exactamente qué servicio y qué proyecto del portafolio motivó el contacto.']
      ],
      [24, 30, 46]
    ),
    new Paragraph({ spacing: { before: 180 } }),
    createHeading2('5.3. Hoja de Ruta de Escalamiento Trimestral'),
    createStyledTable(
      ['Fase / Período', 'Objetivo Estratégico', 'Acciones Clave a Ejecutar'],
      [
        [
          'Fase 1: Mes 1 (Validación Local)',
          'Consolidar la plaza de Puyo y Pastaza.',
          '• Puesta a prueba en vivo de la landing page con pauta local inicial de $150 USD.\n• Monitoreo del flujo de leads en la bandeja /admin.\n• Ajuste de guiones comerciales de WhatsApp según los motivos de objeción.'
        ],
        [
          'Fase 2: Mes 2 - 3 (Optimización y Retención)',
          'Optimizar el embudo y aumentar el ticket promedio.',
          '• Activación de campañas de retargeting para visitantes que no llenaron el formulario.\n• Oferta de paquetes recurrentes mensuales (pauta + gestión de redes) para generar ingresos predecibles.\n• Incorporación de nuevos casos de éxito de clientes de Puyo en la ruleta del portafolio.'
        ],
        [
          'Fase 3: Mes 4 - 6 (Expansión Regional y Nacional)',
          'Escalar la captación a Tungurahua, Napo, Chimborazo y Pichincha.',
          '• Duplicar el presupuesto en Google Search para palabras clave a nivel Ecuador.\n• Habilitar cotizaciones automáticas en PDF descargable directamente para el cliente.\n• Integración de pasarela de pagos en línea para cobro de anticipos de proyectos.'
        ]
      ],
      [22, 28, 50]
    ),
    new Paragraph({ spacing: { before: 180 } }),
    createHeading2('5.4. Ficha Técnica y Enlaces Oficiales del Ecosistema NÓMADAS'),
    createCallout(
      'DIRECTORIO DE ENLACES OFICIALES DEL PROYECTO',
      '1. Landing Page Pública (Producción): https://nomadas-agencia.vercel.app\n2. Panel de Triage Comercial CRM: https://nomadas-agencia.vercel.app/admin (Clave: nomadas2026)\n3. Repositorio de Código en GitHub: https://github.com/cristianfjaramillo-hue/nomadas-agencia\n4. Base de Datos Cloud: Supabase Postgres Project ID: tqpkxwyeokigefuclzyb\n5. Línea Directa WhatsApp: +593 96 257 7613 (096 257 7613)\n6. Sede Física: Av. Alberto Zambrano esquina, diagonal a Coop. OSCUS, Puyo, Pastaza, Ecuador\n7. Ubicación Google Maps: https://maps.app.goo.gl/kBrLLFJriD5r1Ewp8'
    ),
    new Paragraph({ spacing: { before: 300 } }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: '— FIN DEL DOCUMENTO EJECUTIVO —\n',
          bold: true,
          size: 20,
          color: 'E25822',
          font: 'Segoe UI'
        }),
        new TextRun({
          text: 'NÓMADAS AGENCIA DE DISEÑO Y MARKETING DIGITAL © 2026 | TODOS LOS DERECHOS RESERVADOS',
          size: 16,
          color: '94A3B8',
          font: 'Segoe UI'
        })
      ]
    })
  );

  // Creación del Documento DOCX
  const doc = new Document({
    styles: {
      default: {
        document: {
          run: {
            font: 'Segoe UI',
            size: 21,
            color: '272730'
          }
        }
      }
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440, // 1 pulgada
              bottom: 1440,
              left: 1440,
              right: 1440
            }
          }
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: 'NÓMADAS AGENCIA | Arquitectura Digital & Triage Predictivo',
                    size: 16,
                    color: '94A3B8',
                    italics: true
                  })
                ]
              })
            ]
          })
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({ text: 'Página ', size: 18, color: '64748B' }),
                  new TextRun({ children: [PageNumber.CURRENT], size: 18, color: '64748B' }),
                  new TextRun({ text: ' de ', size: 18, color: '64748B' }),
                  new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18, color: '64748B' }),
                  new TextRun({ text: '  •  nomadas-agencia.vercel.app', size: 18, color: 'E25822', bold: true })
                ]
              })
            ]
          })
        },
        children: docChildren
      }
    ]
  });

  const buffer = await Packer.toBuffer(doc);
  const outputPath = path.resolve('DOCUMENTO_FINAL_NOMADAS_AGENCIA.docx');
  fs.writeFileSync(outputPath, buffer);
  console.log('✅ Archivo Word DOCX generado exitosamente:', outputPath, 'Tamaño:', buffer.length, 'bytes');
}

buildDocument().catch(console.error);
