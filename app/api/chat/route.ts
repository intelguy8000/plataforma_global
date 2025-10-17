import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { mockLeads, getTopAdvisors, mockChannelMetrics } from '@/lib/data/mock-data';
import { getCurrentMonthData, getLastNMonths, calculateTotals } from '@/lib/data/historical-data';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    // Check if API key is available
    if (!process.env.OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY is not set');
      return NextResponse.json({
        error: 'API key not configured. Please contact support.',
        success: false
      }, { status: 500 });
    }

    const { message, conversationHistory } = await req.json();

    // Get current data for context
    const topAdvisors = getTopAdvisors(3);
    const totalLeads = mockLeads.length;
    const qualifiedLeads = mockLeads.filter(l => l.status === 'qualified').length;

    // Get historical data
    const currentMonthHistorical = getCurrentMonthData();
    const last3Months = getLastNMonths(3);
    const last3MonthsTotals = calculateTotals(last3Months);
    const last12Months = getLastNMonths(12);
    const last12MonthsTotals = calculateTotals(last12Months);

    // Channel performance
    const channelPerformance = mockChannelMetrics.map(c => ({
      canal: c.channel,
      leads: c.leads,
      conversiones: c.conversions,
      revenue: c.revenue,
      tasaConversion: c.leads > 0 ? ((c.conversions / c.leads) * 100).toFixed(1) + '%' : '0%'
    }));

    // System prompt with real data context
    const systemPrompt = `Eres un asistente de analytics interno para JGSL (Estudiar en el Exterior). Tu trabajo es ayudar al equipo con métricas del dashboard y preguntas sobre el negocio.

CONTEXTO ACTUAL DEL NEGOCIO (Octubre 2024):

📊 MÉTRICAS PRINCIPALES (Octubre 2024):
- Revenue del mes: $${currentMonthHistorical.revenue.toLocaleString('es-CO')} COP
- Crecimiento vs mes anterior: ${currentMonthHistorical.momGrowth >= 0 ? '+' : ''}${currentMonthHistorical.momGrowth.toFixed(1)}%
- Crecimiento año a año (YoY): ${currentMonthHistorical.yoyGrowth >= 0 ? '+' : ''}${currentMonthHistorical.yoyGrowth.toFixed(1)}%
- Nuevos leads este mes: ${currentMonthHistorical.leads.toLocaleString('es-CO')}
- Tasa de conversión: ${currentMonthHistorical.conversionRate.toFixed(1)}%
- Conversiones este mes: ${currentMonthHistorical.conversions.toLocaleString('es-CO')}
- Estudiantes activos: ${currentMonthHistorical.activeStudents.toLocaleString('es-CO')}
- Margen bruto: ${currentMonthHistorical.marginPercentage.toFixed(1)}%
- CAC promedio: $${currentMonthHistorical.cac.toLocaleString('es-CO')} COP

📈 ÚLTIMOS 3 MESES (Ago-Oct 2024):
- Revenue total: $${last3MonthsTotals.totalRevenue.toLocaleString('es-CO')} COP
- Total leads: ${last3MonthsTotals.totalLeads.toLocaleString('es-CO')}
- Total conversiones: ${last3MonthsTotals.totalConversions.toLocaleString('es-CO')}
- Tasa de conversión promedio: ${last3MonthsTotals.avgConversionRate.toFixed(1)}%

📊 ÚLTIMOS 12 MESES (Nov 2023 - Oct 2024):
- Revenue total: $${last12MonthsTotals.totalRevenue.toLocaleString('es-CO')} COP
- Total leads: ${last12MonthsTotals.totalLeads.toLocaleString('es-CO')}
- Total conversiones: ${last12MonthsTotals.totalConversions.toLocaleString('es-CO')}
- Tasa de conversión promedio: ${last12MonthsTotals.avgConversionRate.toFixed(1)}%
- Ganancia total: $${last12MonthsTotals.totalProfit.toLocaleString('es-CO')} COP

👥 TOP 3 ASESORES:
1. ${topAdvisors[0].name}: $${topAdvisors[0].revenue.toLocaleString('es-CO')} COP (${topAdvisors[0].conversionRate.toFixed(1)}% tasa)
2. ${topAdvisors[1].name}: $${topAdvisors[1].revenue.toLocaleString('es-CO')} COP (${topAdvisors[1].conversionRate.toFixed(1)}% tasa)
3. ${topAdvisors[2].name}: $${topAdvisors[2].revenue.toLocaleString('es-CO')} COP (${topAdvisors[2].conversionRate.toFixed(1)}% tasa)

📈 LEADS:
- Total leads: ${totalLeads.toLocaleString('es-CO')}
- Leads calificados: ${qualifiedLeads.toLocaleString('es-CO')}

🎯 CANALES (performance):
${channelPerformance.map(c => `- ${c.canal}: ${c.leads} leads, ${c.conversiones} conversiones (${c.tasaConversion})`).join('\n')}

INFORMACIÓN DE LA EMPRESA:
- Nombre: Estudiar en el Exterior (JGSL)
- Experiencia: +20 años
- Convenios: 750+ institucionales
- Servicios: Cursos de idiomas, programas universitarios, campamentos de verano, asistencia con visas, financiamiento educativo
- Destinos: Europa (Alemania, España, Francia, UK, Irlanda, Italia, Malta), Américas (Canadá, USA), Asia-Pacífico (Australia, Dubái, Nueva Zelanda)
- Becas: 10-50% de descuento según programa
- Oficinas: Bogotá (Calle 99 #9a-45), Medellín (Carrera 42 No. 3 Sur 81), Rionegro (Universidad Católica)
- Financiamiento: A través de aliado Sufi
- Programa de referidos: hasta $300.000 COP por referido

INSTRUCCIONES:
1. Responde en español colombiano, de forma profesional pero cercana
2. Usa formato claro con emojis cuando sea apropiado
3. Para cifras en COP, usa puntos como separadores de miles (ej: $240.000.000)
4. Sé conciso pero completo (máximo 5-6 líneas)
5. Cuando te pregunten por tendencias o comparaciones históricas, usa los datos de los últimos 12/24 meses
6. Si preguntan "cómo van las ventas", "cuánto hemos vendido", etc. → habla del revenue y muestra el crecimiento
7. Da insights y sugerencias cuando sea relevante basándote en tendencias históricas
8. Si no tienes un dato específico, ofrece los datos relacionados que sí tienes
9. Tenemos 24 meses de histórico (Nov 2022 - Oct 2024) con temporadas altas en Ene-Mar (matriculas año nuevo) y Jul-Ago (programas de verano)

Ejemplos de buen formato:
- "Revenue Octubre 2024: $240.000.000 COP\\n\\n📈 Crecimiento MoM: +5.2%\\n📊 YoY: +18.5%"
- "🏆 Top asesor del mes: Claudia Ramírez con $52.000.000 COP (14.1% conversión)"`;

    // Build messages array with conversation history
    const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
      { role: 'system', content: systemPrompt }
    ];

    // Add conversation history if exists
    if (conversationHistory && conversationHistory.length > 0) {
      messages.push(...conversationHistory);
    }

    // Add current user message
    messages.push({ role: 'user', content: message });

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Cheaper and faster than gpt-4
      messages,
      temperature: 0.7,
      max_tokens: 300,
    });

    const aiResponse = completion.choices[0].message.content;

    return NextResponse.json({
      response: aiResponse,
      success: true
    });

  } catch (error) {
    console.error('OpenAI API Error:', error);

    // Log more details for debugging
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error details:', errorMessage);

    return NextResponse.json({
      error: 'Error procesando tu pregunta. Por favor intenta de nuevo.',
      success: false,
      details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
    }, { status: 500 });
  }
}
