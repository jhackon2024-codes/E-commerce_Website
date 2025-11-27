import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Sparkles, ShoppingBag } from 'lucide-react';
import { generateProductAdvice } from '../services/geminiService';
import { ChatMessage, Product } from '../types';
import { PRODUCTS } from '../constants';
import gsap from 'gsap';

interface AIChatProps {
  onNavigateToProduct: (product: Product) => void;
}

const AIChat: React.FC<AIChatProps> = ({ onNavigateToProduct }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'init', role: 'model', text: 'Welcome to Lumina. I am your personal luxury concierge. How may I assist you today?' }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(chatContainerRef.current, 
        { y: 50, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" }
      );
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Prepare history string
    const history = messages.map(m => `${m.role}: ${m.text}`).join('\n');

    const data = await generateProductAdvice(input, history);

    const recommended: Product[] = data.recommendedProductIds
      ? PRODUCTS.filter(p => data.recommendedProductIds.includes(p.id))
      : [];

    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: data.message,
      products: recommended
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 bg-lux-gold text-lux-black p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 border border-white/10 group"
      >
        {isOpen ? <X size={24} /> : <Sparkles size={24} className="group-hover:rotate-12 transition-transform" />}
      </button>

      {/* Chat Interface */}
      {isOpen && (
        <div 
          ref={chatContainerRef}
          className="fixed bottom-24 right-6 z-50 w-[380px] h-[600px] bg-lux-black/95 backdrop-blur-xl border border-white/10 rounded-2xl flex flex-col shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="p-4 border-b border-white/10 bg-gradient-to-r from-lux-gold/20 to-transparent flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="text-lux-gold" size={18} />
              <h3 className="font-serif font-semibold text-white">Lumina Concierge</h3>
            </div>
            <span className="text-xs text-lux-gold/80 px-2 py-1 bg-lux-gold/10 rounded-full border border-lux-gold/20">Beta</span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div 
                  className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-white text-black rounded-tr-sm' 
                      : 'bg-white/10 text-gray-200 rounded-tl-sm border border-white/5'
                  }`}
                >
                  {msg.text}
                </div>
                
                {/* Product Recommendations Card */}
                {msg.products && msg.products.length > 0 && (
                  <div className="mt-3 w-full space-y-2">
                    {msg.products.map(product => (
                      <div 
                        key={product.id}
                        onClick={() => {
                          onNavigateToProduct(product);
                          setIsOpen(false);
                        }}
                        className="flex items-center gap-3 p-2 bg-white/5 hover:bg-white/10 rounded-xl cursor-pointer transition-colors border border-white/5"
                      >
                        <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-lg" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-lux-gold truncate">{product.brand}</p>
                          <p className="text-sm font-medium text-white truncate">{product.name}</p>
                        </div>
                        <div className="p-2 bg-lux-gold/20 rounded-full text-lux-gold">
                          <ShoppingBag size={14} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center space-x-2 text-gray-400 p-2">
                <div className="w-2 h-2 bg-lux-gold rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                <div className="w-2 h-2 bg-lux-gold rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-lux-gold rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10 bg-black/40">
            <div className="flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 focus-within:border-lux-gold/50 transition-colors">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask for recommendations..."
                className="bg-transparent border-none focus:outline-none text-white text-sm flex-1 placeholder-gray-500"
              />
              <button onClick={handleSend} disabled={!input.trim()} className="text-lux-gold hover:text-white transition-colors disabled:opacity-50">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChat;
