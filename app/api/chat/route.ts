import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { getCurrentMonthMetrics, mockLeads, mockStudents, getTopAdvisors, mockChannelMetrics } from '@/lib/data/mock-data';

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
    const metrics = getCurrentMonthMetrics();
    const topAdvisors = getTopAdvisors(3);
    const totalLeads = mockLeads.length;
    const activeStudents = mockStudents.filter(s => s.status === 'active').length;
    const qualifiedLeads = mockLeads.filter(l => l.status === 'qualified').length;

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

📊 MÉTRICAS PRINCIPALES:
- Revenue del mes: $${metrics.revenue.toLocaleString('es-CO')} COP (+12% vs mes anterior)
- Nuevos leads este mes: ${metrics.newLeads.toLocaleString('es-CO')}
- Tasa de conversión: ${metrics.conversionRate.toFixed(1)}%
- Conversiones este mes: ${metrics.conversions.toLocaleString('es-CO')}
- Estudiantes activos: ${activeStudents.toLocaleString('es-CO')}

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
3. Para cifras en COP, usa puntos como separadores de miles (ej: $1.380.000.000)
4. Sé conciso pero completo (máximo 5-6 líneas)
5. Si te preguntan por comparaciones con meses anteriores, calcula ~12% de crecimiento promedio
6. Si preguntan "cómo van las ventas", "cuánto hemos vendido", etc. → habla del revenue
7. Da insights y sugerencias cuando sea relevante
8. Si no tienes un dato específico, ofrece los datos relacionados que sí tienes

Ejemplos de buen formato:
- "Revenue este mes: $1.380.000.000 COP\\n\\n📈 Crecimiento: +12% vs mes anterior"
- "🏆 Top asesor: Patricia Gómez con $1.560.000.000 COP"`;

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
