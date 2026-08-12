import React, { useState, useRef, useEffect } from 'react';
import { Mic, Volume2, X, Sparkles } from 'lucide-react';

interface VoiceAgentProps {
  externalTrigger?: number;
}

export const VoiceAgent: React.FC<VoiceAgentProps> = ({ externalTrigger }) => {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<'idle' | 'listening' | 'processing' | 'speaking'>('idle');
  const [transcript, setTranscript] = useState('');
  const [reply, setReply] = useState('');
  const [history, setHistory] = useState<{ role: string; content: string }[]>([]);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (externalTrigger && externalTrigger > 0) {
      setOpen(true);
    }
  }, [externalTrigger]);

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please try Chrome or Edge.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setState('listening');
      setTranscript('');
      setReply('');
    };

    recognition.onresult = async (event: any) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
      setState('processing');
      await sendToVoiceAgent(text);
    };

    recognition.onerror = (err: any) => {
      console.error('Speech recognition error:', err);
      setState('idle');
    };

    recognition.onend = () => {
      if (state === 'listening') setState('idle');
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const sendToVoiceAgent = async (text: string) => {
    try {
      const res = await fetch('/api/voice/web', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript: text, history })
      });
      const data = await res.json();
      const assistantReply = data.reply || "I can help with test rides, pricing, or specifications. What model interests you?";

      setReply(assistantReply);
      setHistory((prev) => [
        ...prev,
        { role: 'user', content: text },
        { role: 'assistant', content: assistantReply }
      ]);

      setState('speaking');
      speakReply(assistantReply);
    } catch (err) {
      console.error('Voice agent network error:', err);
      setState('idle');
    }
  };

  const speakReply = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setState('idle');
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-IN';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onend = () => setState('idle');
    utterance.onerror = () => setState('idle');

    window.speechSynthesis.speak(utterance);
  };

  const stopAgent = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setState('idle');
  };

  const stateInfo = {
    idle: { label: 'Tap mic to talk', color: 'bg-zinc-800 text-orange-400 border-zinc-700' },
    listening: { label: 'Listening to your voice...', color: 'bg-orange-500 text-black border-orange-400 animate-pulse' },
    processing: { label: 'Analyzing request...', color: 'bg-amber-500 text-black border-amber-400 animate-pulse' },
    speaking: { label: 'Spark is responding...', color: 'bg-green-500 text-black border-green-400 animate-pulse' }
  };

  const cfg = stateInfo[state];

  return (
    <>
      {/* Floating Button on the left side */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 left-6 z-40 px-3.5 py-3 bg-zinc-900 border border-zinc-700 hover:border-orange-500/60 rounded-full text-orange-400 shadow-2xl transition-all cursor-pointer group flex items-center gap-2.5 active:scale-95"
        aria-label="Toggle Voice Assistant"
      >
        <div className="relative flex items-center justify-center">
          <Mic className="w-5 h-5 group-hover:scale-110 transition-transform" />
          {state === 'listening' && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-orange-500 rounded-full animate-ping" />
          )}
        </div>
        <span className="text-xs font-bold text-zinc-200 group-hover:text-white hidden sm:inline-block pr-1">
          Voice Agent
        </span>
      </button>

      {/* Voice Assistant Floating Dialog on left side */}
      {open && (
        <div className="fixed bottom-20 left-4 sm:left-6 w-[88vw] sm:w-80 bg-zinc-900 border border-zinc-700/80 rounded-3xl p-5 z-40 shadow-2xl animate-in slide-in-from-bottom-2 duration-200 text-white">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-orange-400" />
              <h3 className="text-xs font-black uppercase tracking-wider text-white">Spark Voice Agent</h3>
            </div>
            <button onClick={() => setOpen(false)} className="text-zinc-400 hover:text-white text-xs p-1 cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="text-center space-y-4">
            {/* Big Mic Button */}
            <button
              onClick={state === 'idle' ? startListening : stopAgent}
              className={`w-20 h-20 rounded-full border-2 flex items-center justify-center mx-auto transition-all cursor-pointer shadow-lg ${cfg.color}`}
            >
              {state === 'speaking' ? (
                <Volume2 className="w-8 h-8 animate-bounce" />
              ) : (
                <Mic className="w-8 h-8" />
              )}
            </button>

            <p className="text-xs font-bold text-zinc-300">{cfg.label}</p>

            {transcript && (
              <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 text-left">
                <span className="text-[10px] text-zinc-500 font-semibold block uppercase">You Said:</span>
                <p className="text-xs text-zinc-200 mt-0.5 font-medium">"{transcript}"</p>
              </div>
            )}

            {reply && (
              <div className="bg-orange-500/10 border border-orange-500/30 p-3 rounded-xl text-left">
                <span className="text-[10px] text-orange-400 font-bold block uppercase">Spark Voice:</span>
                <p className="text-xs text-zinc-100 mt-0.5 leading-relaxed">{reply}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
