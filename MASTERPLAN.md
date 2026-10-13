# 🧭 MASTERPLAN DEL PROYECTO

> **Última actualización:** 12 de Octubre, 2026  
> **Estado general:** Fase 1 en progreso (15% completado)  
> **Marca:** _Pendiente por definir_  

---

## 📊 Tablero de Estado General

| Fase | Descripción | Estado | Progreso |
| :--- | :--- | :---: | :---: |
| **Fase 1** | Entorno, Credenciales y Repositorio | 🟡 En progreso | 60% |
| **Fase 2** | Estudio de Mercado Automatizado (Apify) | ⚪ Pendiente | 0% |
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
- [ ] Ingresar credenciales en `.env` (`APIFY_API_TOKEN`, `GITHUB_TOKEN`, `VERCEL_TOKEN`).
- [ ] Definir nombre de la marca, propuesta inicial, nicho y competidores clave.

---

### Fase 2: Estudio de Mercado Automatizado (Apify)
- [ ] Instalar y configurar cliente de Apify en Node.js.
- [ ] Seleccionar los Actores idóneos de Apify según los canales objetivo (Google Maps, Redes Sociales, Scrapers web/e-commerce).
- [ ] Ejecutar extracciones de datos (precios, competidores, opiniones de clientes, palabras clave).
- [ ] Consolidar y exportar datasets de mercado a formato estructurado (JSON/CSV).
- [ ] Generar informe de hallazgos: dolores de la audiencia, brechas de la competencia y oportunidades de mercado.

---

### Fase 3: Estrategia de Marketing, Branding & Copywriting
- [ ] Diseñar el perfil de **Buyer Persona** y mapa de empatía.
- [ ] Construir la **Propuesta Única de Valor (UVP)** diferenciadora.
- [ ] Definir pilares de comunicación y tratamiento de objeciones.
- [ ] Redactar el copywriting completo para la Landing Page:
  - Hero section (Hook principal, subtítulo, llamada a la acción).
  - Problema vs. Solución.
  - Beneficios clave y características.
  - Prueba social y testimonios (estrategia de validación).
  - Preguntas frecuentes (FAQ).
  - Lead magnet / Oferta irresistible.

---

### Fase 4: Desarrollo de Landing Page de Alta Conversión
- [ ] Inicializar framework web moderno (Next.js con React, TypeScript y Tailwind CSS).
- [ ] Crear componentes modulares y responsivos (Mobile-first).
- [ ] Implementar diseño visual profesional adaptado a la identidad de marca.
- [ ] Integrar formulario de captura de leads / contacto.
- [ ] Optimizar métricas Core Web Vitals (rendimiento, accesibilidad y SEO técnico).

---

### Fase 5: Conexión Automática GitHub + Vercel (CI/CD)
- [ ] Crear repositorio remoto en GitHub vía API / CLI.
- [ ] Conectar y subir el código al repositorio remoto (`origin/main`).
- [ ] Vincular el proyecto con Vercel utilizando las credenciales automatizadas.
- [ ] Sincronizar variables de entorno de producción en Vercel.
- [ ] Validar pipeline de despliegue continuo automático (cada commit a `main` actualiza producción).
- [ ] Pruebas finales en el dominio de producción Vercel.

---

## 📝 Bitácora de Avances (Changelog)

* **12-Oct-2026**:
  * Inicialización del repositorio Git local.
  * Creación y blindaje de `.env`, `.env.example` y `.gitignore`.
  * Verificación de herramientas instaladas en el sistema (Node.js v24.19.0, npm 11.17.0, Git 2.55).
  * Creación del documento `MASTERPLAN.md` como hoja de ruta activa y medible.
