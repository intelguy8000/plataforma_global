'use client';

import { useState } from 'react';
import { MessageCircle, X, Send, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { getCurrentMonthMetrics, mockLeads, mockStudents, getTopAdvisors } from '@/lib/data/mock-data';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface ConversationContext {
  lastMetric?: string;
  lastValue?: number;
  lastComparison?: string;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '👋 Hola! Soy tu asistente de analytics interno. Puedo ayudarte con métricas del dashboard o información sobre nuestros servicios. ¿Qué necesitas?',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [context, setContext] = useState<ConversationContext>({});

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const { response, newContext } = generateAIResponse(inputValue, context);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setContext(newContext);
    }, 800);

    setInputValue('');
  };

  const generateAIResponse = (query: string, ctx: ConversationContext): { response: string; newContext: ConversationContext } => {
    const lowerQuery = query.toLowerCase();
    const metrics = getCurrentMonthMetrics();

    // Calculate previous month metrics (simulated)
    const prevMonthRevenue = Math.round(metrics.revenue / 1.12); // 12% growth
    const prevMonthLeads = Math.round(metrics.newLeads / 1.082); // 8.2% growth

    // Revenue queries
    if (lowerQuery.includes('revenue') || lowerQuery.includes('ingresos')) {
      if (lowerQuery.includes('anterior') || lowerQuery.includes('pasado') || lowerQuery.includes('vs') || lowerQuery.includes('comparar')) {
        const growth = ((metrics.revenue - prevMonthRevenue) / prevMonthRevenue * 100).toFixed(1);
        return {
          response: `Revenue actual: $${(metrics.revenue / 1000000).toFixed(0)}M COP\nRevenue mes anterior: $${(prevMonthRevenue / 1000000).toFixed(0)}M COP\n\n📈 Crecimiento: +${growth}% (+$${((metrics.revenue - prevMonthRevenue) / 1000000).toFixed(0)}M)`,
          newContext: { lastMetric: 'revenue', lastValue: metrics.revenue, lastComparison: 'monthly' }
        };
      }
      return {
        response: `Revenue actual: $${(metrics.revenue / 1000000).toFixed(0)}M COP (+12% vs mes anterior)`,
        newContext: { lastMetric: 'revenue', lastValue: metrics.revenue }
      };
    }

    // Comparison with last metric
    if ((lowerQuery.includes('anterior') || lowerQuery.includes('pasado') || lowerQuery.includes('vs')) && ctx.lastMetric) {
      if (ctx.lastMetric === 'revenue') {
        const growth = ((metrics.revenue - prevMonthRevenue) / prevMonthRevenue * 100).toFixed(1);
        return {
          response: `Revenue mes anterior: $${(prevMonthRevenue / 1000000).toFixed(0)}M COP\n\n📊 Diferencia: +$${((metrics.revenue - prevMonthRevenue) / 1000000).toFixed(0)}M (+${growth}%)`,
          newContext: { ...ctx, lastComparison: 'done' }
        };
      }
      if (ctx.lastMetric === 'leads') {
        const growth = ((metrics.newLeads - prevMonthLeads) / prevMonthLeads * 100).toFixed(1);
        return {
          response: `Leads mes anterior: ${prevMonthLeads}\n\n📊 Diferencia: +${metrics.newLeads - prevMonthLeads} (+${growth}%)`,
          newContext: { ...ctx, lastComparison: 'done' }
        };
      }
    }

    // Leads queries
    if (lowerQuery.includes('leads') || lowerQuery.includes('prospectos')) {
      if (lowerQuery.includes('cuántos') || lowerQuery.includes('tenemos')) {
        const totalLeads = mockLeads.length;
        return {
          response: `Total leads: ${totalLeads}\nNuevos este mes: ${metrics.newLeads}\nTasa conversión: ${metrics.conversionRate.toFixed(1)}%`,
          newContext: { lastMetric: 'leads', lastValue: metrics.newLeads }
        };
      }
      return {
        response: `Leads nuevos este mes: ${metrics.newLeads} (+8.2% vs anterior)\nCanales top: Referral y Podcast`,
        newContext: { lastMetric: 'leads', lastValue: metrics.newLeads }
      };
    }

    // Conversion queries
    if (lowerQuery.includes('conversión') || lowerQuery.includes('conversion')) {
      return {
        response: `Tasa de conversión: ${metrics.conversionRate.toFixed(1)}%\nConversiones este mes: ${metrics.conversions}\nTiempo promedio: 35 días`,
        newContext: { lastMetric: 'conversion', lastValue: metrics.conversionRate }
      };
    }

    // Advisors queries
    if (lowerQuery.includes('asesores') || lowerQuery.includes('mejores') || lowerQuery.includes('top')) {
      const top3 = getTopAdvisors(3);
      return {
        response: `🏆 Top 3 Asesores:\n\n1️⃣ ${top3[0].name}: $${(top3[0].revenue / 1000000).toFixed(0)}M (${top3[0].conversionRate.toFixed(1)}%)\n2️⃣ ${top3[1].name}: $${(top3[1].revenue / 1000000).toFixed(0)}M (${top3[1].conversionRate.toFixed(1)}%)\n3️⃣ ${top3[2].name}: $${(top3[2].revenue / 1000000).toFixed(0)}M (${top3[2].conversionRate.toFixed(1)}%)`,
        newContext: { lastMetric: 'advisors' }
      };
    }

    // Students queries
    if (lowerQuery.includes('estudiantes') || lowerQuery.includes('activos')) {
      const activeStudents = mockStudents.filter(s => s.stage === 'active').length;
      return {
        response: `Estudiantes activos: ${activeStudents}\nTotal en pipeline: ${mockStudents.length}\nEn documentación: ${mockStudents.filter(s => s.stage === 'documentation').length}`,
        newContext: { lastMetric: 'students', lastValue: activeStudents }
      };
    }

    // Suggestions/help
    if (lowerQuery.includes('sugerencia') || lowerQuery.includes('cerrar') || lowerQuery.includes('mejorar') || lowerQuery.includes('ventas')) {
      return {
        response: `💡 Sugerencias para cerrar más en octubre:\n\n✅ Enfócate en los ${mockLeads.filter(l => l.status === 'qualified').length} leads calificados\n✅ Sigue el proceso de los top performers\n✅ Prioriza canales: Referral (32% conversión)`,
        newContext: {}
      };
    }

    // Company info (Real data from estudiarenelexterior.co)
    if (lowerQuery.includes('servicios') || lowerQuery.includes('qué ofrecen')) {
      return {
        response: `Nuestros servicios:\n\n📚 Cursos de idiomas\n🎓 Programas universitarios\n☀️ Campamentos de verano\n✈️ Asistencia con visas\n💰 Financiamiento educativo`,
        newContext: {}
      };
    }

    if (lowerQuery.includes('países') || lowerQuery.includes('destinos') || lowerQuery.includes('dónde')) {
      return {
        response: `🌍 Destinos disponibles:\n\n🇪🇺 Europa: Alemania, España, Francia, UK, Irlanda, Italia, Malta\n🇺🇸 Américas: Canadá, USA\n🌏 Asia-Pacífico: Australia, Dubái, Nueva Zelanda`,
        newContext: {}
      };
    }

    if (lowerQuery.includes('becas') || lowerQuery.includes('descuento')) {
      return {
        response: `💰 Becas disponibles:\n\n10-50% de descuento según programa\n750+ convenios institucionales\n+20 años de experiencia`,
        newContext: {}
      };
    }

    if (lowerQuery.includes('oficinas') || lowerQuery.includes('contacto') || lowerQuery.includes('ubicación')) {
      return {
        response: `📍 Nuestras oficinas:\n\n🏢 Bogotá: Calle 99 #9a-45\n🏢 Medellín: Carrera 42 No. 3 Sur 81\n🏢 Rionegro: Universidad Católica`,
        newContext: {}
      };
    }

    // Default response
    return {
      response: `Puedo ayudarte con:\n\n📊 Métricas: revenue, leads, conversión, asesores\n🏢 Empresa: servicios, destinos, becas, oficinas\n\n¿Qué necesitas saber?`,
      newContext: ctx
    };
  };

  const handleClear = () => {
    setMessages([
      {
        id: '1',
        text: '👋 Hola! Soy tu asistente de analytics interno. Puedo ayudarte con métricas del dashboard o información sobre nuestros servicios. ¿Qué necesitas?',
        sender: 'ai',
        timestamp: new Date()
      }
    ]);
    setContext({});
  };

  return (
    <>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          size="icon"
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:scale-110 transition-transform z-50"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-2xl flex flex-col z-50">
          {/* Header */}
          <div className="flex items-center justify-between border-b px-4 py-3 bg-primary text-primary-foreground rounded-t-lg">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              <h3 className="font-semibold">Asistente JGSL</h3>
            </div>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
                onClick={handleClear}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    'flex',
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  <div
                    className={cn(
                      'max-w-[80%] rounded-lg px-4 py-2 text-sm',
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    )}
                  >
                    <p className="whitespace-pre-wrap">{message.text}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString('es-CO', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="border-t p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-2"
            >
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Escribe tu pregunta..."
                className="flex-1"
              />
              <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </Card>
      )}
    </>
  );
}
