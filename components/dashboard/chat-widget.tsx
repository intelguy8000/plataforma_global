'use client';

import { useState } from 'react';
import { MessageCircle, X, Send, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '¡Hola! Soy tu asistente de JGSL. Puedo ayudarte con métricas del dashboard (revenue, leads, conversiones) y responder preguntas sobre los servicios de Estudiar en el Exterior (destinos, programas, becas). ¿En qué puedo ayudarte?',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');

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
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(inputValue),
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);

    setInputValue('');
  };

  const generateAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();

    // Business metrics (Mock data)
    if (lowerQuery.includes('revenue') || lowerQuery.includes('ingresos')) {
      return 'Los ingresos del mes actual son de $1,380M COP, con un crecimiento del 12% respecto al mes anterior. Los principales canales son: referral (35%), podcast (28%) y search (20%).';
    }
    if (lowerQuery.includes('leads') || lowerQuery.includes('prospectos')) {
      return 'Tienes 500 leads en total, con 78 nuevos leads este mes. La tasa de conversión promedio es del 28.5%. Los canales más efectivos son referral y podcast.';
    }
    if (lowerQuery.includes('conversion') || lowerQuery.includes('conversión')) {
      return 'La tasa de conversión actual es del 28.5%. El tiempo promedio de conversión es de 35 días. Las mejores tasas de conversión vienen de leads de referral (32%) y eventos (30%).';
    }
    if (lowerQuery.includes('advisors') || lowerQuery.includes('asesores')) {
      return 'Tienes 8 asesores activos. Los top 3 por revenue son: Patricia Gómez ($1,380M COP), Claudia Ramírez ($1,560M COP) y Valentina Torres ($1,260M COP). La tasa de conversión promedio del equipo es 28.5%.';
    }
    if (lowerQuery.includes('students') || lowerQuery.includes('estudiantes')) {
      return 'Actualmente hay 132 estudiantes activos en el pipeline. 45 están en etapa de documentación, 32 en aplicación, 28 en visa, 15 en pago y 12 activos en sus programas.';
    }

    // Company info (Real data from estudiarenelexterior.co)
    if (lowerQuery.includes('servicios') || lowerQuery.includes('qué ofrecen') || lowerQuery.includes('services')) {
      return 'Estudiar en el Exterior ofrece: Cursos de idiomas en el exterior, programas universitarios internacionales, campamentos de verano, asistencia con visas estudiantiles, financiamiento educativo, y consultas gratuitas.';
    }
    if (lowerQuery.includes('países') || lowerQuery.includes('destinos') || lowerQuery.includes('dónde') || lowerQuery.includes('countries')) {
      return 'Trabajamos con destinos en Europa (Alemania, España, Francia, Inglaterra, Irlanda, Italia, Malta), Américas (Canadá, Estados Unidos), y Asia-Pacífico (Australia, Dubái, Nueva Zelanda).';
    }
    if (lowerQuery.includes('programas') || lowerQuery.includes('tipos') || lowerQuery.includes('programs')) {
      return 'Ofrecemos 3 tipos de programas: 1) Cursos de idiomas (perfeccionamiento del idioma), 2) Programas universitarios (convenios internacionales), 3) Campamentos de verano (experiencia académica y lúdica).';
    }
    if (lowerQuery.includes('experiencia') || lowerQuery.includes('años') || lowerQuery.includes('becas') || lowerQuery.includes('scholarships')) {
      return 'Estudiar en el Exterior tiene +20 años de experiencia, 750+ convenios institucionales internacionales, equipo especializado en visas, y acceso a becas del 10-50% de descuento según programa.';
    }
    if (lowerQuery.includes('contacto') || lowerQuery.includes('oficinas') || lowerQuery.includes('ubicación') || lowerQuery.includes('contact')) {
      return 'Oficinas: Bogotá (Calle 99 #9a-45, Of. 404a | 601-4109636), Medellín (Carrera 42 No. 3 Sur 81, Of. 611 | 604-3227220), Rionegro (Universidad Católica de Oriente | 315-4076453).';
    }
    if (lowerQuery.includes('precio') || lowerQuery.includes('costo') || lowerQuery.includes('financiamiento') || lowerQuery.includes('pricing')) {
      return 'Los costos varían por programa e institución. Ofrecemos becas del 10-50% y financiamiento educativo a través de nuestro aliado Sufi. Programa de referidos con hasta $300,000 COP por referido.';
    }

    return 'Entiendo tu pregunta. Puedo ayudarte con: métricas del dashboard (revenue, leads, conversiones, asesores), información de Estudiar en el Exterior (servicios, destinos, programas, becas, contacto). ¿Qué necesitas saber?';
  };

  const handleClear = () => {
    setMessages([
      {
        id: '1',
        text: '¡Hola! Soy tu asistente de JGSL. Puedo ayudarte con métricas del dashboard (revenue, leads, conversiones) y responder preguntas sobre los servicios de Estudiar en el Exterior (destinos, programas, becas). ¿En qué puedo ayudarte?',
        sender: 'ai',
        timestamp: new Date()
      }
    ]);
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
