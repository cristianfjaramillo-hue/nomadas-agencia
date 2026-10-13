export interface LeadFormData {
  name: string;
  business_name: string;
  whatsapp: string;
  email?: string;
  services: string[];
  urgency: 'esta_semana' | 'este_mes' | 'explorando';
  budget_range: 'alto' | 'medio_alto' | 'medio' | 'bajo';
  business_type: 'empresa_activa' | 'emprendimiento';
}

export interface ScoredLeadResult {
  score: number;
  temperature: 'HOT' | 'WARM' | 'COLD';
  temperatureLabel: string;
  priorityText: string;
}

export function calculateLeadScore(data: LeadFormData): ScoredLeadResult {
  let score = 0;

  // 1. Puntuación por Urgencia (Máx 30 pts)
  switch (data.urgency) {
    case 'esta_semana':
      score += 30;
      break;
    case 'este_mes':
      score += 20;
      break;
    case 'explorando':
      score += 5;
      break;
    default:
      score += 10;
  }

  // 2. Puntuación por Presupuesto (Máx 35 pts)
  switch (data.budget_range) {
    case 'alto': // > $800
      score += 35;
      break;
    case 'medio_alto': // $400 - $800
      score += 25;
      break;
    case 'medio': // $200 - $400
      score += 15;
      break;
    case 'bajo': // < $200
      score += 5;
      break;
    default:
      score += 10;
  }

  // 3. Puntuación por Servicios Solicitados (Máx 25 pts)
  const numServices = data.services?.length || 0;
  if (numServices >= 3) {
    score += 25;
  } else if (numServices === 2) {
    score += 20;
  } else if (numServices === 1) {
    score += 15;
  } else {
    score += 5;
  }

  // 4. Puntuación por Tipo de Negocio (Máx 10 pts)
  if (data.business_type === 'empresa_activa') {
    score += 10;
  } else {
    score += 5;
  }

  // Determinar Temperatura
  let temperature: 'HOT' | 'WARM' | 'COLD' = 'COLD';
  let temperatureLabel = '❄️ Frío';
  let priorityText = 'Prioridad Baja (Seguimiento regular)';

  if (score >= 70) {
    temperature = 'HOT';
    temperatureLabel = '🔥 Caliente';
    priorityText = 'Prioridad Alta (¡Llamar en menos de 15 min!)';
  } else if (score >= 40) {
    temperature = 'WARM';
    temperatureLabel = '⚡ Tibio';
    priorityText = 'Prioridad Media (Contactar en las próximas 2 horas)';
  }

  return {
    score,
    temperature,
    temperatureLabel,
    priorityText,
  };
}
