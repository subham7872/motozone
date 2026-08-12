import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Bot, User, PhoneCall } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatbotProps {
  openLeadModal: () => void;
}

export const Chatbot: React.FC<ChatbotProps> = ({ openLeadModal }) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hey there! I'm Spark 🔥 Your MOTOZONE superbike concierge. Looking for model recommendations, 0% EMI schemes, or booking a test ride?"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || loading) return;

    const userMsg: Message = { role: 'user', content: textToSend };
    setMessages(prev => [...prev, userMsg]);
    if (!customText) setInput('');
    setLoading(true);

    const assistantMsg: Message = { role: 'assistant', content: '' };
    setMessages(prev => [...prev, assistantMsg]);

    try {
      const res = await fetch('/api/chat/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content }))
        })
      });

      if (!res.body) throw new Error('No stream body');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter(l => l.startsWith('data: '));

        for (const line of lines) {
          const data = line.replace('data: ', '').trim();
          if (data === '[DONE]') break;
          try {
            const parsed = JSON.parse(data);
            if (parsed.content) {
              setMessages(prev => {
                const updated = [...prev];
                const lastIdx = updated.length - 1;
                updated[lastIdx] = {
                  role: 'assistant',
                  content: updated[lastIdx].content + parsed.content
                };
                return updated;
              });
            }
          } catch {
            // Ignore JSON parse chunk errors
          }
        }
      }
    } catch (err) {
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: 'assistant',
          content: "I'm having a slight network blip! You can also click below to request a direct callback from our showroom team."
        };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    "Book a Test Ride 🏁",
    "Show 0% EMI Offers 💳",
    "Yamaha R15 Specs ⚡",
    "Ather Electric Range 🔋"
  ];

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 cursor-pointer ${
          open
            ? 'bg-zinc-800 text-white rotate-90 border border-zinc-700'
            : 'bg-gradient-to-tr from-orange-500 to-amber-500 text-black hover:scale-110 shadow-orange-500/30'
        }`}
        aria-label="Open AI Chatbot"
      >
        {open ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6 fill-black" />}
        {!open && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-zinc-950 animate-ping" />
        )}
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-4 sm:right-6 w-[92vw] sm:w-96 h-[520px] bg-zinc-900 border border-zinc-700/80 rounded-3xl flex flex-col z-50 shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="p-4 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-tr from-orange-500 to-amber-500 rounded-xl flex items-center justify-center text-black font-black text-sm shadow-md">
                ⚡
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-black text-white">Spark AI Assistant</h3>
                  <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                </div>
                <p className="text-[10px] text-green-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span>Online • MOTOZONE AI</span>
                </p>
              </div>
            </div>

            <button
              onClick={openLeadModal}
              className="text-[10px] font-bold bg-orange-500/20 text-orange-400 border border-orange-500/40 px-2.5 py-1 rounded-full hover:bg-orange-500 hover:text-black transition-all cursor-pointer flex items-center gap-1"
            >
              <PhoneCall className="w-3 h-3" />
              <span>Call Me</span>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-zinc-900/60">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0 text-xs mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-xs leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-black font-semibold rounded-tr-none shadow-md'
                      : 'bg-zinc-800 text-zinc-100 border border-zinc-700/60 rounded-tl-none'
                  }`}
                >
                  {msg.content || (
                    <span className="inline-flex items-center gap-1 text-zinc-400 italic">
                      <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce delay-100" />
                      <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce delay-200" />
                    </span>
                  )}
                </div>

                {msg.role === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300 shrink-0 text-xs mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Quick Prompt Pills */}
          <div className="p-2 bg-zinc-950/80 border-t border-zinc-800 flex items-center gap-1.5 overflow-x-auto scrollbar-none text-[10px]">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => sendMessage(prompt)}
                className="whitespace-nowrap bg-zinc-900 border border-zinc-800 hover:border-orange-500/50 text-zinc-300 hover:text-orange-400 px-2.5 py-1 rounded-full transition-all cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-zinc-950 border-t border-zinc-800 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Ask Spark about bikes, EMI, specs..."
              className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition-colors"
            />
            <button
              onClick={() => sendMessage()}
              disabled={loading}
              className="bg-orange-500 hover:bg-orange-600 text-black font-black p-2.5 rounded-xl transition-all shadow-md shadow-orange-500/20 cursor-pointer disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
