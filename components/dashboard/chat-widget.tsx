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
      text: '¡Hola! Soy tu asistente de analytics. Puedo ayudarte a analizar tus métricas, generar reportes y responder preguntas sobre tus datos. ¿En qué puedo ayudarte?',
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

    if (lowerQuery.includes('revenue') || lowerQuery.includes('ingresos')) {
      return 'Los ingresos del mes actual son de $345,000 USD, con un crecimiento del 12% respecto al mes anterior. Los principales canales son: referral (35%), podcast (28%) y search (20%).';
    }
    if (lowerQuery.includes('leads') || lowerQuery.includes('prospectos')) {
      return 'Tienes 500 leads en total, con 78 nuevos leads este mes. La tasa de conversión promedio es del 28.5%. Los canales más efectivos son referral y podcast.';
    }
    if (lowerQuery.includes('conversion') || lowerQuery.includes('conversión')) {
      return 'La tasa de conversión actual es del 28.5%. El tiempo promedio de conversión es de 35 días. Las mejores tasas de conversión vienen de leads de referral (32%) y eventos (30%).';
    }
    if (lowerQuery.includes('advisors') || lowerQuery.includes('asesores')) {
      return 'Tienes 8 asesores activos. Los top 3 por revenue son: Patricia Gómez ($345k), Claudia Ramírez ($390k) y Valentina Torres ($315k). La tasa de conversión promedio del equipo es 28.5%.';
    }
    if (lowerQuery.includes('students') || lowerQuery.includes('estudiantes')) {
      return 'Actualmente hay 132 estudiantes activos en el pipeline. 45 están en etapa de documentación, 32 en aplicación, 28 en visa, 15 en pago y 12 activos en sus programas.';
    }

    return 'Entiendo tu pregunta. Para darte información más específica, ¿podrías indicarme sobre qué métrica o aspecto del dashboard necesitas más detalles? Puedo ayudarte con revenue, leads, conversiones, asesores, estudiantes, canales de marketing, etc.';
  };

  const handleClear = () => {
    setMessages([
      {
        id: '1',
        text: '¡Hola! Soy tu asistente de analytics. Puedo ayudarte a analizar tus métricas, generar reportes y responder preguntas sobre tus datos. ¿En qué puedo ayudarte?',
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
              <h3 className="font-semibold">Asistente de Analytics</h3>
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
