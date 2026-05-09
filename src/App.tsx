/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { GoogleGenAI } from "@google/genai";
import BambooSenseDSS from "./components/BambooSenseDSS";
import { 
  ArrowRight, 
  Leaf, 
  Trees,
  Factory, 
  Users, 
  TrendingUp, 
  ShieldCheck, 
  Globe, 
  Mail, 
  MapPin,
  Linkedin,
  ChevronRight,
  CheckCircle2,
  Zap,
  BarChart3,
  MessageSquare,
  X,
  Send,
  Loader2,
  Coins,
  Cloud,
  Flame,
  Star,
  Download,
  Target,
  Droplets,
  Sun,
  FlaskConical,
  ShoppingBag,
  FileText,
  BookOpen,
  Settings2,
  HardHat,
  Scale,
  Printer,
  ZoomIn,
  ZoomOut,
  ChevronUp,
  ChevronDown,
  Maximize2,
  Menu
} from "lucide-react";
import { PartnerForm } from "./components/PartnerForm";

const SectionTitle = ({ children, subtitle, light = false, id }: { children: ReactNode, subtitle?: string, light?: boolean, id?: string }) => (
  <div className="mb-12 md:mb-16">
    <motion.span 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      className={`text-xs uppercase tracking-[0.2em] font-semibold ${light ? 'text-white/60' : 'text-brand-orange-dark'}`}
    >
      {subtitle}
    </motion.span>
    <motion.h2 
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className={`text-4xl md:text-6xl mt-4 leading-tight ${light ? 'text-white' : 'text-brand-green'}`}
    >
      {children}
    </motion.h2>
  </div>
);

const SYSTEM_INSTRUCTION = `
You are the official AI assistant for Green-to-Gold, a sustainable manufacturing startup based in Tripura, India. 
Your goal is to answer questions from potential investors, partners, and farmers about the project based on the following pitch deck information:

[Project Overview]
- Mission: Transforming agricultural waste into high-value bio-composite construction materials.
- Tagline: Building Tripura's Future From Its Own Soil.
- Core Advantage: Cheaper, stronger, and local materials.

[The Problem]
- "Distance Tax": 30-40% added cost to imported construction materials due to the 1,500 km Siliguri Corridor bottleneck.
- Waste: 100,000s of tonnes of biomass (pineapple and bamboo) burned annually.
- Housing: Tripura housing is among India's most expensive to build.

[The Solution: Farm-Gate Mini-Factories]
1. Collect: Buy waste from farmers at ₹2,000/tonne (currently burned for free).
2. Process: Industrial 6-stage transformation (Extraction, Blending, Layering, Hot Pressing, Pulping, Moulding).
3. Sell: Supply bio-composite boards (₹48/sqft), tableware (₹3-8/unit), and tree-free paper.

[Manufacturing Specifications]
- Press Parameters: 140–180°C temperature, 2–4 MPa pressure, 8–15 min cycle time.
- Materials: PALF (Pineapple Leaf Fibre) with 70–82% cellulose; Muli Bamboo (140-230 MPa tensile); Rice Husk (20% silica).
- Binders: Zero-formaldehyde Soy-based resins and Starch adhesives (food-safe).
- Quality: Compliant with IS:12406 (Boards), IS:15778 (Tableware), and SDG 8, 12, 13 alignment.

[Future Vision & Integrations]
1. Agro-Waste Valorization: producing bio-enzymes, organic fertilizers, and biochar from pineapple/rice/bamboo waste. Supported by NABARD climate funds.
2. Renewable Energy Hubs: community biogas (SATAT scheme) and solar-drying units to power rural micro-grids and reduce LPG imports.
3. Skill & Market Linkages: SHG-led factories for handicrafts and food products, ONDC e-commerce integration, and B2B exports to Bangladesh via FPOs. Supporting "Lakhpati Didi" initiative.
4. Water & Irrigation: Micro-irrigation and rainwater harvesting targeting 45% TSP coverage by 2030 (SDG Vision), using waste-based mulches.

[Contact]
- Email: contact@greentogold.in, Info.atsfy@gmail.com
- LinkedIn: https://www.linkedin.com/in/atsfy/
- Location: Agartala, Tripura, India.

Be professional, concise, and enthusiastic about the project's impact on Tripura and Northeast India. If you don't know the answer, politely direct them to contact@greentogold.in or Info.atsfy@gmail.com.
`;

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([
    { role: 'model', text: "Namaste! I'm the Green-to-Gold AI. How can I help you learn about our sustainable manufacturing mission in Tripura?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
      const chat = ai.chats.create({
        model: "gemini-3-flash-preview",
        config: { systemInstruction: SYSTEM_INSTRUCTION },
        history: messages.map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        }))
      });

      const response = await chat.sendMessage({ message: userMessage });
      const text = response.text;

      if (text) {
        setMessages(prev => [...prev, { role: 'model', text }]);
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "I'm sorry, I encountered an error. Please try again later or contact us at contact@greentogold.in." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chat" : "Open chat about Green-to-Gold"}
        aria-expanded={isOpen}
        aria-controls="chatbot-window"
        className="fixed bottom-8 right-8 z-[60] w-16 h-16 bg-brand-orange text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-brand-orange/90 transition-colors"
      >
        {isOpen ? <X className="w-8 h-8" aria-hidden="true" /> : <MessageSquare className="w-8 h-8" aria-hidden="true" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="chatbot-window"
            role="dialog"
            aria-label="Green-to-Gold AI Chatbot"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-28 right-8 z-[60] w-[90vw] md:w-[400px] h-[500px] glass-card shadow-2xl flex flex-col overflow-hidden border border-brand-green/10"
          >
            {/* Header */}
            <div className="p-6 bg-brand-green text-white flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Leaf className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-serif text-lg leading-none mb-1">Green-to-Gold AI</h3>
                <span className="text-xs opacity-60 flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-brand-light-green rounded-full animate-pulse" aria-hidden="true" />
                  Online & Ready
                </span>
              </div>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-4 bg-brand-paper/50"
              aria-live="polite"
            >
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-brand-orange text-white rounded-tr-none' 
                      : 'bg-white text-brand-ink rounded-tl-none shadow-sm'
                  }`}>
                    <span className="sr-only">{msg.role === 'user' ? 'You:' : 'Assistant:'}</span>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm" aria-label="Assistant is typing">
                    <Loader2 className="w-5 h-5 animate-spin text-brand-green" aria-hidden="true" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-brand-green/5 flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about our mission..."
                aria-label="Chat message"
                className="flex-1 bg-brand-paper/50 rounded-full px-6 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 transition-all"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                aria-label="Send message"
                className="w-12 h-12 bg-brand-green text-white rounded-full flex items-center justify-center hover:bg-brand-light-green transition-colors disabled:opacity-50"
              >
                <Send className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

function LandingPage({ user }: { user: any }) {
  const [isDocOpen, setIsDocOpen] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: 'BambooSense DSS', href: '/dss', external: true },
    { label: 'The Problem', href: '#problem' },
    { label: 'The Model', href: '#solution' },
    { label: 'Products', href: '#products' },
    { label: 'Vision 2030', href: '#vision' },
    { label: 'Process', href: '#process' },
    { label: 'Impact', href: '#impact' },
    { label: 'Roadmap', href: '#roadmap' },
    { label: 'Partner', href: '#partner' }
  ];

  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <div className="min-h-screen selection:bg-brand-orange selection:text-white print:bg-white text-brand-ink">
      <a href="#main-content" className="skip-link">Skip to main content</a>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-4 md:px-6 py-4" aria-label="Main navigation">
        <div className="max-w-7xl mx-auto flex justify-between items-center glass-card px-4 md:px-8 py-3 md:py-4">
          <Link to="/" className="flex items-center gap-3 flex-shrink-0 group">
            <div className="relative">
              <img 
                src="/logo.png" 
                alt="Green-to-Gold Logo" 
                className="h-10 md:h-14 w-auto object-contain transition-all group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                }}
                referrerPolicy="no-referrer"
              />
              <div className="hidden h-10 w-10 md:h-14 md:w-14 bg-gradient-to-br from-brand-green to-brand-orange rounded-xl flex items-center justify-center text-white font-serif text-2xl font-bold shadow-lg">G</div>
              <div className="absolute inset-0 bg-brand-green/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg md:text-xl font-bold tracking-tight text-brand-green leading-none">Green-to-Gold</span>
              <span className="text-[8px] md:text-[10px] uppercase tracking-widest font-bold opacity-40 mt-0.5">by ATSFY Technologies</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center gap-6 text-[11px] font-bold uppercase tracking-widest text-brand-green/70">
            {navLinks.map((link) => (
              link.external ? (
                <Link 
                  key={link.href}
                  to={link.href} 
                  className="bg-brand-orange/10 text-brand-orange-dark px-4 py-2 rounded-xl hover:bg-brand-orange hover:text-white transition-all relative group"
                >
                  {link.label}
                </Link>
              ) : (
                <a 
                  key={link.href}
                  href={link.href} 
                  className="hover:text-brand-orange transition-colors relative group py-2"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-orange transition-all group-hover:w-full" />
                </a>
              )
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a href="#partner" className="hidden sm:inline-flex bg-brand-green text-white px-5 md:px-6 py-2 md:py-2.5 rounded-full text-[10px] md:text-xs font-bold hover:bg-brand-ink transition-all uppercase tracking-widest shadow-lg shadow-brand-green/20">
              Partner With Us
            </a>
            
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="xl:hidden p-2 text-brand-green hover:bg-brand-green/5 rounded-xl transition-colors"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-24 left-4 right-4 bg-brand-paper/95 backdrop-blur-2xl border border-white/20 rounded-[32px] p-8 shadow-2xl xl:hidden z-50 overflow-hidden"
            >
              <div className="flex flex-col gap-6">
                {navLinks.map((link, i) => (
                  link.external ? (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-2xl font-serif text-brand-orange-dark hover:text-brand-orange transition-colors flex justify-between items-center group"
                    >
                      {link.label}
                      <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
                    </Link>
                  ) : (
                    <motion.a
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-2xl font-serif text-brand-green hover:text-brand-orange transition-colors flex justify-between items-center group"
                    >
                      {link.label}
                      <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
                    </motion.a>
                  )
                ))}
                
                <div className="mt-4 pt-8 border-t border-brand-green/10">
                  <a 
                    href="#partner" 
                    onClick={() => setIsMenuOpen(false)}
                    className="flex justify-center items-center gap-2 w-full bg-brand-orange text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-xs"
                  >
                    Start Collaboration
                    <Send className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main id="main-content">
        {/* Hero Section */}
        <header className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-10" aria-hidden="true">
            <div className="absolute top-20 right-[-10%] w-[600px] h-[600px] bg-brand-light-green rounded-full blur-[120px] animate-float" />
            <div className="absolute bottom-10 left-[-5%] w-[400px] h-[400px] bg-brand-orange rounded-full blur-[100px]" />
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="inline-block px-4 py-1 rounded-full border border-brand-green/20 text-brand-green text-xs font-bold uppercase tracking-widest mb-6">
                  Tripura's Sustainable Manufacturing Leader
                </span>
                <h1 className="text-7xl md:text-9xl font-serif leading-[0.9] text-brand-green mb-8">
                  From Waste <br />
                  <span className="italic text-brand-orange">to Wealth.</span>
                </h1>
                <p className="text-xl md:text-2xl text-brand-ink/70 max-w-xl mb-10 leading-relaxed">
                  Transforming agricultural waste into high-value bio-composite construction materials — cheaper, stronger, and built from Tripura's own soil.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="bg-brand-green text-white px-8 py-4 rounded-full text-lg font-medium hover:scale-105 transition-transform flex items-center gap-3">
                    Explore the Model <ArrowRight className="w-5 h-5" aria-hidden="true" />
                  </button>
                  <div className="flex items-center gap-4 px-6 py-4 border border-brand-green/10 rounded-full bg-white/50">
                    <div className="flex -space-x-2" aria-hidden="true">
                      {[
                        "https://images.unsplash.com/photo-1590487988256-9ed24133863e?auto=format&fit=crop&q=80&w=100",
                        "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=100",
                        "https://images.unsplash.com/photo-1596401057633-52a0335e414d?auto=format&fit=crop&q=80&w=100"
                      ].map((url, i) => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-brand-paper bg-brand-light-green/20 overflow-hidden">
                          <img src={url} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                      ))}
                    </div>
                    <span className="text-sm font-medium text-brand-green">1,000+ Farmers Impacted</span>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative perspective-2000"
                onMouseMove={(e) => {
                  const card = e.currentTarget;
                  const rect = card.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;
                  const rotateX = (centerY - y) / 40;
                  const rotateY = (x - centerX) / 40;
                  
                  const target = card.querySelector('.tilt-target') as HTMLElement;
                  if (target) {
                    target.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                  }
                }}
                onMouseLeave={(e) => {
                  const card = e.currentTarget;
                  const target = card.querySelector('.tilt-target') as HTMLElement;
                  if (target) {
                    target.style.transform = `rotateX(0deg) rotateY(0deg)`;
                  }
                }}
              >
                {/* The 3D Illustration Container */}
                <div className="tilt-target relative aspect-square md:aspect-[4/3] transition-transform duration-500 ease-out preserve-3d">
                  
                  {/* Base Platform (Glass Island) */}
                  <div className="absolute inset-[10%] bg-brand-green/5 backdrop-blur-3xl rounded-full border border-white/20 shadow-[0_64px_128px_-32px_rgba(30,58,30,0.3)] translate-z-0" />
                  
                  {/* Animated Connecting Rings */}
                  <div className="absolute inset-[5%] rounded-full border border-brand-green/20 animate-[spin_20s_linear_infinite]" />
                  <div className="absolute inset-[15%] rounded-full border border-brand-orange/10 animate-[spin_15s_linear_infinite_reverse]" />

                  {/* Central Industrial Hub */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 translate-z-100 scale-110 md:scale-125">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-brand-orange blur-[60px] opacity-20 animate-pulse" />
                      <div className="w-40 h-40 md:w-56 md:h-56 rounded-[48px] bg-brand-ink flex flex-col items-center justify-center border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] relative z-10 overflow-hidden backdrop-blur-md">
                        <div className="absolute inset-0 bg-gradient-to-tr from-brand-orange/30 to-transparent" />
                        <div className="p-4 bg-brand-green/20 rounded-2xl mb-4 border border-brand-green/20">
                          <Factory className="w-10 h-10 text-brand-orange" />
                        </div>
                        <span className="text-white font-bold tracking-[0.3em] text-[10px] uppercase mb-1">ATSFY GLOBAL</span>
                        <h4 className="text-brand-orange font-serif text-lg italic">Industrial Core</h4>
                      </div>
                    </div>
                  </div>

                  {/* Module 1: The Problem (Agricultural Waste) */}
                  <div className="absolute top-[8%] left-[12%] z-20 translate-z-40">
                    <motion.div 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="glass-card p-6 md:p-8 border-white/40 shadow-2xl backdrop-blur-xl rotate-[-8deg] hover:rotate-0 transition-transform"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-red-500/10 rounded-lg">
                          <Flame className="w-5 h-5 text-red-500" />
                        </div>
                        <span className="text-[10px] uppercase font-bold text-brand-ink/40 tracking-widest">Problem Case</span>
                      </div>
                      <div className="text-lg font-serif mb-2 leading-tight">Biomass <br /> Burning</div>
                      <div className="h-1 w-12 bg-red-500/20 mb-3" />
                      <p className="text-[10px] text-brand-ink/60 uppercase font-bold tracking-tighter">1,500km Siliguri Bottleneck</p>
                    </motion.div>
                  </div>

                  {/* Module 2: Raw Material (Pineapple & Bamboo) */}
                  <div className="absolute top-[15%] right-[8%] z-40 translate-z-60">
                    <motion.div 
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      className="w-48 md:w-64 rounded-[40px] overflow-hidden shadow-2xl border border-white/20 rotate-[5deg] hover:rotate-0 transition-transform"
                    >
                      <div className="aspect-video relative">
                        <img 
                          src="https://images.unsplash.com/photo-1550828520-4cb49c929f15?auto=format&fit=crop&q=80&w=400" 
                          alt="Pineapple" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-green/80 to-transparent" />
                        <div className="absolute bottom-4 left-4">
                          <span className="text-[9px] uppercase font-bold text-white/60 tracking-widest block mb-1">Crops of Tripura</span>
                          <div className="text-white font-serif text-lg leading-tight">Agricultural Surplus</div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Module 3: Modern Products (Tableware) */}
                  <div className="absolute bottom-[10%] right-[10%] z-50 translate-z-80">
                    <motion.div 
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.9 }}
                      className="glass-card p-6 md:p-10 border-brand-orange/30 shadow-2xl border-r-[8px] border-r-brand-orange translate-z-20 scale-105"
                    >
                      <div className="text-[9px] uppercase font-bold text-brand-orange mb-3 tracking-widest">Premium Product</div>
                      <div className="text-2xl font-serif text-brand-green mb-4">Rice Husk <br /> Tableware</div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-brand-orange fill-brand-orange" />
                        <span className="text-[10px] font-bold text-brand-ink/40 uppercase">Global Export Ready</span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Module 4: Economic Impact (Cheaper Cost) */}
                  <div className="absolute bottom-[12%] left-[8%] z-40 translate-z-60">
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1.1 }}
                      className="p-8 rounded-[40px] bg-brand-green text-white shadow-[0_32px_64px_-12px_rgba(0,100,0,0.4)] rotate-[-4deg]"
                    >
                      <div className="text-[10px] uppercase font-bold text-brand-orange mb-3 tracking-[0.2em]">Regional Advantage</div>
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-4xl font-serif">₹48</span>
                        <span className="text-xs opacity-50">/sqft</span>
                      </div>
                      <div className="h-px w-full bg-white/10 my-4" />
                      <p className="text-[10px] opacity-70 leading-relaxed font-bold uppercase tracking-tight">VS ₹102 IMPORTED PLYWOOD</p>
                    </motion.div>
                  </div>

                  {/* Dynamic Connectors (SVG Paths) */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30 z-0" aria-hidden="true">
                    <path d="M 200,200 L 400,400" stroke="currentColor" fill="none" className="text-brand-orange" strokeWidth="1" strokeDasharray="8 8" />
                    <path d="M 600,200 L 400,400" stroke="currentColor" fill="none" className="text-brand-green" strokeWidth="1" strokeDasharray="8 8" />
                    <circle cx="50%" cy="50%" r="20%" stroke="currentColor" fill="none" className="text-brand-green/20" strokeWidth="2" />
                  </svg>
                </div>
              </motion.div>
            </div>
          </div>
        </header>

        {/* The Problem Section */}
        <section id="problem" className="py-24 px-6 bg-brand-green text-white relative overflow-hidden" aria-labelledby="problem-title">
          <div className="max-w-7xl mx-auto relative z-10">
            <SectionTitle id="problem-title" subtitle="The Challenge" light>The Distance Tax That <br />Strangles Growth</SectionTitle>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-10 border border-white/10 rounded-3xl bg-white/5">
                <h3 className="text-6xl font-serif text-brand-orange mb-4">30-40%</h3>
                <p className="text-lg text-white/80 leading-relaxed">
                  Premium added to all imported construction materials via the 1,500 km Siliguri Corridor bottleneck.
                </p>
              </div>
              <div className="p-10 border border-white/10 rounded-3xl bg-white/5">
                <h3 className="text-6xl font-serif text-brand-orange mb-4">100k+</h3>
                <p className="text-lg text-white/80 leading-relaxed">
                  Tonnes of biomass (pineapple & bamboo) burned annually — zero value captured, high environmental cost.
                </p>
              </div>
              <div className="p-10 border border-white/10 rounded-3xl bg-white/5">
                <h3 className="text-6xl font-serif text-brand-orange mb-4">Lowest</h3>
                <p className="text-lg text-white/80 leading-relaxed">
                  PMAY-U completion rates in India due to sky-high building costs for local families.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Landscape Banner Divider */}
        <section className="relative h-[450px] md:h-[650px] overflow-hidden flex items-center">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1550828520-4cb49c929f15?auto=format&fit=crop&q=80&w=2664" 
              alt="Lush pineapple plantation in Tripura, showcasing the raw material source for bio-composites" 
              className="w-full h-full object-cover scale-110 grayscale-[10%] brightness-75"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-brand-green/30 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-b from-brand-green via-transparent to-brand-paper" />
          </div>
          <div className="max-w-7xl mx-auto px-6 relative z-10 w-full text-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="inline-block glass-card p-12 md:p-20 border-white/20 shadow-2xl backdrop-blur-xl"
            >
              <span className="text-brand-orange font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block">The Great Transformation</span>
              <h2 className="text-5xl md:text-8xl font-serif text-brand-green mb-10 leading-[0.95] tracking-tighter">
                Turning Tripura's Fields <br />
                <span className="italic text-brand-orange">Into Micro-Factories.</span>
              </h2>
              <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-brand-ink">
                <div>
                  <div className="text-4xl font-serif text-brand-green mb-1">100%</div>
                  <div className="text-[10px] uppercase font-bold tracking-[0.2em] opacity-40">Tree-Free</div>
                </div>
                <div className="h-12 w-px bg-brand-green/20 hidden md:block" />
                <div>
                  <div className="text-4xl font-serif text-brand-green mb-1">85%</div>
                  <div className="text-[10px] uppercase font-bold tracking-[0.2em] opacity-40">Lower Carbon</div>
                </div>
                <div className="h-12 w-px bg-brand-green/20 hidden md:block" />
                <div>
                  <div className="text-4xl font-serif text-brand-green mb-1">Local</div>
                  <div className="text-[10px] uppercase font-bold tracking-[0.2em] opacity-40">Circular Economy</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* The Solution Section */}
        <section id="solution" className="py-24 px-6" aria-labelledby="solution-title">
          <div className="max-w-7xl mx-auto">
            <SectionTitle id="solution-title" subtitle="Our Solution">Farm-Gate Mini-Factories, <br />AI-Enabled</SectionTitle>
            
            <div className="grid lg:grid-cols-3 gap-12">
              {[
                { 
                  step: "01", 
                  title: "Collect", 
                  desc: "Buy waste from farmers at ₹2,000/tonne — turning a disposal cost into a revenue stream.",
                  icon: <Leaf className="w-8 h-8" aria-hidden="true" />
                },
                { 
                  step: "02", 
                  title: "Process", 
                  desc: "Modular mini-factory presses bamboo + pineapple fibre into bio-composite boards on-site.",
                  icon: <Factory className="w-8 h-8" aria-hidden="true" />
                },
                { 
                  step: "03", 
                  title: "Sell", 
                  desc: "Supply boards locally at up to 54% below imported plywood prices, with bio-fuel pellets as bonus revenue.",
                  icon: <Globe className="w-8 h-8" aria-hidden="true" />
                }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group p-10 glass-card hover:bg-white transition-all duration-500"
                >
                  <div className="flex justify-between items-start mb-8">
                    <div className="p-4 bg-brand-green/5 rounded-2xl text-brand-green group-hover:bg-brand-green group-hover:text-white transition-colors">
                      {item.icon}
                    </div>
                    <span className="font-serif text-4xl text-brand-ink/10 group-hover:text-brand-orange-dark/20 transition-colors" aria-hidden="true">{item.step}</span>
                  </div>
                  <h3 className="text-2xl font-serif mb-4">{item.title}</h3>
                  <p className="text-brand-ink/60 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Product Section */}
        <section id="products" className="py-24 px-6 bg-white" aria-labelledby="products-title">
          <div className="max-w-7xl mx-auto">
            <SectionTitle id="products-title" subtitle="Market Ready">Sustainable Product Range</SectionTitle>
            <div className="grid lg:grid-cols-3 gap-8">
              {[
                {
                  id: "tableware",
                  title: "Biodegradable Tableware",
                  desc: "Premium cutlery and tableware made via compression molding from rice husk and bagasse. Heat-resistant and shelf-stable for 10-12 months.",
                  tag: "Plastic Alternative",
                  image: "https://images.unsplash.com/photo-1605348128311-667746142718?auto=format&fit=crop&q=80&w=800",
                  features: ["100% Home Compostable", "Heat Resistant", "Hotel/Event Ready"],
                  composition: "70% Rice Husk, 25% Sugarcane Bagasse, 5% Natural Starch Binder",
                  certs: ["ISO 17088", "EN 13432", "ASTM D6400"],
                  impact: "Offsets 2.4kg CO2 per 100 units vs plastic",
                  uses: ["QSR Chains", "In-flight Catering", "Eco-Weddings"]
                },
                {
                  id: "packaging",
                  title: "Mycelium Packaging",
                  desc: "Fully compostable packaging solutions including bags, trays, and protective foams. ISO certified and optimized for e-commerce.",
                  tag: "ISO Certified",
                  image: "https://images.unsplash.com/photo-1607349913338-fca6f7fc42d0?auto=format&fit=crop&q=80&w=800",
                  features: ["Composts in 3 Months", "Shock Absorbent", "Zero Moisture Debt"],
                  composition: "Mycelium composite grown on pineapple core waste",
                  certs: ["OK Compost Industrial", "SGS Certified"],
                  impact: "100% Bio-based, zero plastic footprint",
                  uses: ["Electronics Packing", "Luxury Fragrance Boxes", "Wine Shippers"]
                },
                {
                  id: "films",
                  title: "Compostable Films",
                  desc: "Starch-bound sheets for retail carry bags and protective wraps. Low-cost extrusion process replacing single-use plastics.",
                  tag: "Retail Friendly",
                  image: "https://images.unsplash.com/photo-1634128221889-82ed6efebfc3?auto=format&fit=crop&q=80&w=800",
                  features: ["High Tensile Strength", "Low-Cost Extrusion", "Non-Toxic Residue"],
                  composition: "Potato Starch, PBAT blands with bamboo micro-cellulose",
                  certs: ["OK Compost Home", "IS 17088"],
                  impact: "Marine-degradable in under 180 days",
                  uses: ["E-commerce Mailers", "Fruit & Veg Wraps", "Garment Bags"]
                }
              ].map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-brand-paper rounded-3xl overflow-hidden border border-brand-green/5 hover:shadow-xl transition-all group cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="h-64 overflow-hidden relative">
                    <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-brand-green/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-full text-brand-green font-bold text-xs flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        Explore Specifications
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 bg-brand-orange text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full">{product.tag}</div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-serif text-brand-green mb-3">{product.title}</h3>
                    <p className="text-brand-ink/60 text-sm leading-relaxed mb-6 line-clamp-2">{product.desc}</p>
                    <ul className="space-y-2 mb-8">
                      {product.features.map((feat, j) => (
                        <li key={j} className="flex items-center gap-2 text-xs font-semibold text-brand-green/80">
                          <CheckCircle2 className="w-3 h-3 text-brand-light-green" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                    <div className="pt-6 border-t border-brand-green/5 flex justify-between items-center">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-brand-orange-dark">Govt. Grant Eligible</span>
                      <ChevronRight className="w-4 h-4 text-brand-green group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Product Detail Modal */}
        <AnimatePresence>
          {selectedProduct && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProduct(null)}
                className="absolute inset-0 bg-brand-ink/90 backdrop-blur-md"
              />
              <motion.div 
                key={selectedProduct.id}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-5xl bg-brand-paper rounded-[48px] overflow-hidden shadow-2xl z-10 flex flex-col md:flex-row max-h-[90vh]"
              >
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-6 right-6 z-20 p-3 bg-white hover:bg-brand-orange text-brand-green hover:text-white rounded-full shadow-lg transition-all"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-full">
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-green to-transparent opacity-60" />
                  <div className="absolute bottom-12 left-12 right-12 text-white">
                    <span className="text-brand-orange font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">Product Intelligence</span>
                    <h3 className="text-4xl md:text-5xl font-serif mb-6">{selectedProduct.title}</h3>
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="w-8 h-8 rounded-full border-2 border-brand-green bg-white/20 overflow-hidden backdrop-blur-md" >
                             <img src={`https://images.unsplash.com/photo-${1500000000000+i}?auto=format&fit=crop&q=80&w=100`} className="w-full h-full object-cover opacity-50" />
                          </div>
                        ))}
                      </div>
                      <span className="text-xs font-bold opacity-60">Verified Supply Chain</span>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-1/2 p-8 md:p-14 overflow-y-auto custom-scrollbar bg-brand-paper">
                  <div className="mb-10">
                    <h4 className="text-[10px] uppercase font-bold text-brand-orange tracking-widest mb-4">Core Specifications</h4>
                    <p className="text-brand-ink/60 text-lg leading-relaxed mb-6 font-serif italic">
                      "{selectedProduct.desc}"
                    </p>
                    <div className="grid grid-cols-2 gap-4 md:gap-6">
                      <div className="p-6 bg-brand-green/[0.03] rounded-3xl border border-brand-green/5">
                        <div className="text-[9px] uppercase font-bold text-brand-ink/40 mb-2">Environmental Impact</div>
                        <div className="text-xl font-serif text-brand-green leading-tight">{selectedProduct.impact}</div>
                      </div>
                      <div className="p-6 bg-brand-green/[0.03] rounded-3xl border border-brand-green/5">
                        <div className="text-[9px] uppercase font-bold text-brand-ink/40 mb-2">Life Cycle</div>
                        <div className="text-xl font-serif text-brand-green">Circular</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <h4 className="flex items-center gap-2 text-[10px] uppercase font-bold text-brand-ink/40 tracking-widest mb-4">
                        <Target className="w-4 h-4 text-brand-orange" />
                        Material Composition
                      </h4>
                      <p className="text-sm font-medium text-brand-ink leading-relaxed p-5 bg-white rounded-2xl border border-brand-green/5 shadow-sm">
                        {selectedProduct.composition}
                      </p>
                    </div>

                    <div>
                      <h4 className="flex items-center gap-2 text-[10px] uppercase font-bold text-brand-ink/40 tracking-widest mb-4">
                        <Scale className="w-4 h-4 text-brand-orange" />
                        Global Standards Compliance
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.certs.map(cert => (
                          <span key={cert} className="px-5 py-2.5 bg-brand-green text-white rounded-xl text-[10px] font-bold tracking-widest shadow-md">
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="flex items-center gap-2 text-[10px] uppercase font-bold text-brand-ink/40 tracking-widest mb-4">
                        <CheckCircle2 className="w-4 h-4 text-brand-orange" />
                        Key Applications
                      </h4>
                      <div className="grid grid-cols-1 gap-2">
                        {selectedProduct.uses.map(use => (
                          <div key={use} className="flex items-center gap-3 p-4 bg-brand-green/[0.02] rounded-xl hover:bg-brand-green/5 transition-colors group/use">
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-orange group-hover/use:scale-150 transition-transform" />
                            <span className="text-sm font-medium text-brand-ink/80">{use}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button className="w-full mt-12 py-5 bg-brand-green text-white rounded-2xl font-bold text-sm hover:bg-brand-ink transition-all shadow-xl flex items-center justify-center gap-3 group">
                    View Full Technical Datasheet
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Impact Section */}
        <section id="impact" className="py-24 px-6 bg-brand-paper relative" aria-labelledby="impact-title">
          <div className="max-w-7xl mx-auto">
            <SectionTitle id="impact-title" subtitle="The Triple Win">Impact at the Core</SectionTitle>
            
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-12">
                {[
                  {
                    icon: <TrendingUp className="w-8 h-8" />,
                    title: "Farmer Income +20%",
                    desc: "Waste revenue adds ₹2,000–₹2,700/month directly to average farmer households. 26,400 ha of farmland already primed.",
                    color: "bg-brand-light-green/10 text-brand-light-green"
                  },
                  {
                    icon: <Users className="w-8 h-8" />,
                    title: "Community-Run Units",
                    desc: "Partnering with Self-Help Groups (SHGs) and tribal youth cooperatives. Each unit creates 8–12 direct jobs inside villages.",
                    color: "bg-brand-orange/10 text-brand-orange"
                  },
                  {
                    icon: <ShieldCheck className="w-8 h-8" />,
                    title: "Zero Burn, Zero Methane",
                    desc: "Eliminating field burning and sequestering carbon in durable boards. Supporting India's Net Zero 2070 pledge.",
                    color: "bg-brand-green/10 text-brand-green"
                  }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2, duration: 0.6 }}
                    className="flex gap-6"
                  >
                    <div className={`flex-shrink-0 w-16 h-16 rounded-full ${item.color} flex items-center justify-center`} aria-hidden="true">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-2xl font-serif mb-2">{item.title}</h4>
                      <p className="text-brand-ink/60">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-brand-green rounded-[40px] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" aria-hidden="true" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <BarChart3 className="w-6 h-6 text-brand-orange" />
                    </div>
                    <h3 className="text-3xl font-serif">The Value Proposition</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Cost Savings Infographic */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Coins className="w-4 h-4 text-brand-orange" />
                        <span className="text-xs uppercase tracking-widest opacity-60 font-bold">Cost Savings</span>
                      </div>
                      <div className="space-y-4">
                        <div className="relative">
                          <div className="flex justify-between text-[10px] uppercase tracking-tighter mb-1 opacity-40">
                            <span>Imported Plywood</span>
                            <span>₹102</span>
                          </div>
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              whileInView={{ width: '100%' }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: 0.5 }}
                              className="h-full bg-white/20"
                            />
                          </div>
                        </div>
                        <div className="relative">
                          <div className="flex justify-between text-[10px] uppercase tracking-tighter mb-1 text-brand-orange font-bold">
                            <span>Green-to-Gold</span>
                            <span>₹48</span>
                          </div>
                          <div className="h-4 bg-white/10 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              whileInView={{ width: '47%' }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: 0.7 }}
                              className="h-full bg-brand-orange"
                            />
                          </div>
                        </div>
                      </div>
                      <p className="text-[11px] leading-relaxed opacity-60 italic">
                        * 54% reduction in construction material costs for Tripura.
                      </p>
                    </div>

                    {/* Carbon Sequestration Infographic */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Cloud className="w-4 h-4 text-brand-light-green" />
                        <span className="text-xs uppercase tracking-widest opacity-60 font-bold">Carbon Impact</span>
                      </div>
                      <div className="bg-white/5 rounded-2xl p-6 border border-white/10 relative group">
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-4xl font-serif text-brand-light-green">-12kg</div>
                          <div className="w-10 h-10 bg-brand-light-green/20 rounded-full flex items-center justify-center">
                            <Leaf className="w-5 h-5 text-brand-light-green" />
                          </div>
                        </div>
                        <div className="text-sm font-medium mb-1">CO2e per Board</div>
                        <p className="text-[10px] opacity-60 leading-tight">
                          Net-negative carbon footprint by sequestering bamboo & pineapple waste into durable construction boards.
                        </p>
                        
                        {/* Decorative Carbon Particles */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              animate={{ 
                                y: [0, -20, 0],
                                opacity: [0.2, 0.5, 0.2]
                              }}
                              transition={{ 
                                duration: 3 + i, 
                                repeat: Infinity,
                                delay: i * 0.5
                              }}
                              className="absolute w-1 h-1 bg-white rounded-full"
                              style={{ 
                                left: `${20 + i * 15}%`, 
                                top: `${40 + i * 10}%` 
                              }}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-[11px] leading-relaxed opacity-60 italic">
                        * Supporting India's Net Zero 2070 pledge through local action.
                      </p>
                    </div>
                  </div>

                  {/* Bottom Stats */}
                  <div className="mt-10 pt-8 border-t border-white/10 grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-serif text-brand-orange">100k+</div>
                      <div className="text-[9px] uppercase tracking-widest opacity-40">Tonnes Waste Saved</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-serif text-brand-light-green">8-12</div>
                      <div className="text-[9px] uppercase tracking-widest opacity-40">Jobs per Mini-Factory</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Roadmap Section */}
        <section id="roadmap" className="py-24 px-6 overflow-hidden" aria-labelledby="roadmap-title">
          <div className="max-w-7xl mx-auto">
            <SectionTitle id="roadmap-title" subtitle="Execution">The Scale Roadmap</SectionTitle>
            
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute top-0 left-8 md:left-1/2 w-px h-full bg-brand-ink/10 -translate-x-1/2 hidden md:block" aria-hidden="true" />
              
              <div className="space-y-24">
                {[
                  {
                    phase: "Phase 1: Validation",
                    title: "Pilot Unit",
                    time: "Current — Month 12",
                    items: ["Unakoti district pilot", "Bio-composite boards focus", "Revenue: ₹3.5–5.5L/month", "18–25 community jobs"],
                    align: "left"
                  },
                  {
                    phase: "Phase 2: Expansion",
                    title: "Product Growth",
                    time: "Months 6–18",
                    items: ["Moulded tableware addition", "PALF table covers", "Paper pulping feasibility", "ONDC marketplace entry"],
                    align: "right"
                  },
                  {
                    phase: "Phase 3: Replication",
                    title: "Pan-Tripura",
                    time: "Months 18–36",
                    items: ["One unit per district (8 total)", "Revenue Potential: ₹35–50L/mo", "180–250 direct community jobs", "Bangladesh export gateway"],
                    align: "left"
                  },
                  {
                    phase: "Phase 4: Global Scale",
                    title: "Export & Furniture",
                    time: "2027 Onwards",
                    items: ["Bamboo laminated lumber", "Full Kraft paper production", "Verified carbon credit tokens", "IKEA supply chain targeting"],
                    align: "right"
                  }
                ].map((step, i) => (
                  <div key={i} className={`flex flex-col md:flex-row gap-8 md:gap-0 items-center ${step.align === 'right' ? 'md:flex-row-reverse' : ''}`}>
                    <div className="w-full md:w-1/2 px-8">
                      <motion.div 
                        initial={{ opacity: 0, x: step.align === 'left' ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className={`glass-card p-10 ${step.align === 'right' ? 'text-right shadow-xl border-brand-orange/10' : 'shadow-lg'}`}
                      >
                        <span className="text-brand-orange-dark font-bold uppercase tracking-widest text-xs mb-2 block">{step.phase}</span>
                        <h3 className="text-3xl font-serif mb-1">{step.title}</h3>
                        <span className="text-brand-ink/40 text-[10px] uppercase font-bold tracking-wider mb-6 block">{step.time}</span>
                        <ul className={`space-y-3 ${step.align === 'right' ? 'flex flex-col items-end' : ''}`}>
                          {step.items.map((item, j) => (
                            <li key={j} className="flex items-center gap-3 text-brand-ink/70 text-sm">
                              {step.align === 'left' && <CheckCircle2 className="w-4 h-4 text-brand-light-green" aria-hidden="true" />}
                              {item}
                              {step.align === 'right' && <CheckCircle2 className="w-4 h-4 text-brand-light-green" aria-hidden="true" />}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    </div>
                    <div className="relative z-10 w-16 h-16 rounded-full bg-brand-green border-8 border-brand-paper flex items-center justify-center text-white font-serif text-xl shadow-lg shrink-0" aria-hidden="true">
                      {i + 1}
                    </div>
                    <div className="w-full md:w-1/2" aria-hidden="true" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Industrial Process Documentation Section */}
        <section id="process" className="py-24 px-6 bg-brand-paper/50 print:p-0 print:bg-white" aria-labelledby="process-title">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 print:hidden">
              <SectionTitle id="process-title" subtitle="Confidential Process Document">Complete Industrial <br />Execution Manual</SectionTitle>
              <div className="flex gap-4 mb-6 md:mb-16">
                <button 
                  onClick={handleDownloadPDF}
                  className="flex items-center gap-3 px-8 py-4 bg-brand-ink text-white rounded-2xl hover:bg-brand-ink/90 transition-all font-medium uppercase tracking-tight text-sm shadow-lg"
                >
                  <FileText className="w-5 h-5" />
                  View PDF Mode
                </button>
              </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-12 print:block">
              {/* Sidebar Navigation - Hidden in Print */}
              <div className="lg:col-span-3 space-y-4 print:hidden">
                <div className="mb-8">
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-ink/40 mb-4">Table of Contents</h4>
                  <div className="space-y-1">
                    {[
                      { id: 1, title: 'I. Executive Summary', icon: <BookOpen className="w-4 h-4" /> },
                      { id: 2, title: 'II. Material Science', icon: <FlaskConical className="w-4 h-4" /> },
                      { id: 3, title: 'III. Manufacturing', icon: <Factory className="w-4 h-4" /> },
                      { id: 4, title: 'IV. Standards & ESG', icon: <Scale className="w-4 h-4" /> }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActivePage(tab.id)}
                        className={`w-full text-left p-4 rounded-xl transition-all flex items-center gap-3 group ${
                          activePage === tab.id 
                            ? 'bg-brand-green text-white shadow-md' 
                            : 'hover:bg-white/50 text-brand-ink/60'
                        }`}
                      >
                        <div className={`p-2 rounded-lg ${activePage === tab.id ? 'bg-white/20' : 'bg-brand-paper'}`}>
                          {tab.icon}
                        </div>
                        <span className="font-serif text-sm font-medium">{tab.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="p-8 rounded-[32px] bg-brand-green/5 border border-brand-green/10">
                  <h4 className="font-serif text-xl mb-4 text-brand-green italic">"Revolutionizing rural industry."</h4>
                  <p className="text-xs text-brand-ink/60 leading-relaxed">
                    This manual serves as the operational blueprint for all farm-gate units under ATSFY Technologies.
                  </p>
                </div>
              </div>

              {/* PDF Viewer Interface */}
              <div className="lg:col-span-9 print:w-full">
                <div className="flex flex-col bg-[#525659] rounded-[32px] overflow-hidden shadow-2xl border border-black/10 h-[850px] relative">
                  {/* PDF Toolbar */}
                  <div className="bg-[#323639] px-6 py-4 flex items-center justify-between text-white border-b border-black/20 z-20">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 bg-brand-orange rounded-md">
                          <FileText className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-xs font-bold tracking-widest hidden md:inline uppercase">Execution_Manual_v1.pdf</span>
                      </div>
                      <div className="h-6 w-px bg-white/10 hidden md:block" />
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={() => setActivePage(prev => Math.max(1, prev - 1))}
                          disabled={activePage === 1}
                          className="hover:bg-white/10 p-1.5 rounded-lg disabled:opacity-30 transition-colors"
                        >
                          <ChevronUp className="w-5 h-5" />
                        </button>
                        <div className="flex items-center gap-2">
                          <input 
                            type="text" 
                            value={activePage} 
                            readOnly
                            className="w-10 bg-black/40 border border-white/10 text-center rounded-lg py-1 text-xs font-mono"
                          />
                          <span className="text-[10px] opacity-40 font-bold uppercase tracking-widest">of 4</span>
                        </div>
                        <button 
                          onClick={() => setActivePage(prev => Math.min(4, prev + 1))}
                          disabled={activePage === 4}
                          className="hover:bg-white/10 p-1.5 rounded-lg disabled:opacity-30 transition-colors"
                        >
                          <ChevronDown className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 md:gap-6">
                      <div className="hidden md:flex items-center gap-1 bg-black/20 rounded-xl p-1">
                        <button className="hover:bg-white/10 p-2 rounded-lg transition-colors"><ZoomOut className="w-4 h-4" /></button>
                        <span className="text-[10px] px-3 font-bold opacity-80 min-w-[50px] text-center">100%</span>
                        <button className="hover:bg-white/10 p-2 rounded-lg transition-colors"><ZoomIn className="w-4 h-4" /></button>
                      </div>
                      <div className="h-6 w-px bg-white/10 hidden md:block" />
                      <div className="flex items-center gap-2">
                        <button onClick={handleDownloadPDF} className="hover:bg-white/10 p-2.5 rounded-xl transition-colors" title="Print">
                          <Printer className="w-5 h-5" />
                        </button>
                        <button onClick={handleDownloadPDF} className="hover:bg-white/10 p-2.5 rounded-xl transition-colors" title="Download">
                          <Download className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* PDF Content Viewport */}
                  <div className="flex-1 overflow-y-auto bg-[#525659] p-4 md:p-12 flex flex-col items-center gap-12 custom-scrollbar scroll-smooth">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activePage}
                        initial={{ opacity: 0, scale: 0.98, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 1.02, y: -10 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="w-full max-w-[800px] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.3)] origin-top min-h-[1000px] flex flex-col"
                      >
                        {/* Page Content Header */}
                        <div className="h-1 bg-brand-orange" />
                        <div className="p-12 md:p-20 flex-1 flex flex-col">
                          <div className="flex justify-between items-center mb-12 opacity-40">
                            <div className="text-[9px] uppercase tracking-[0.3em] font-bold">ATSFY / Green-To-Gold</div>
                            <div className="text-[9px] uppercase tracking-[0.3em] font-bold">Confidential Industrial Manual</div>
                          </div>

                          {activePage === 1 && (
                            <div className="space-y-12">
                              <div className="space-y-4">
                                <h2 className="text-4xl md:text-5xl font-serif text-brand-green leading-tight">I. Executive Summary & Market Mechanics</h2>
                                <div className="h-1 w-20 bg-brand-orange" />
                              </div>
                              <div className="prose prose-brand max-w-none text-brand-ink/80 space-y-8">
                                <p className="text-xl font-medium leading-relaxed text-brand-ink">
                                  Tripura operates under a severe "Plywood Paradox": importing construction materials at ₹102/sqft from 1,500km away while burning its own raw wealth in the fields.
                                </p>
                                <div className="grid grid-cols-2 gap-8 py-8">
                                  <div className="border-l-4 border-brand-ink/10 pl-6">
                                    <span className="text-[10px] uppercase font-bold tracking-widest text-brand-ink/40">Siliguri Corridor Import</span>
                                    <div className="text-4xl font-serif text-brand-ink mt-2">₹102<span className="text-sm opacity-50">/sqft</span></div>
                                  </div>
                                  <div className="border-l-4 border-brand-orange pl-6">
                                    <span className="text-[10px] uppercase font-bold tracking-widest text-brand-orange">Farm-Gate Production</span>
                                    <div className="text-4xl font-serif text-brand-orange mt-2">₹48<span className="text-sm opacity-50">/sqft</span></div>
                                  </div>
                                </div>
                                <p className="leading-relaxed">
                                  Our model collapses this contradiction by establishing modular, low-energy manufacturing units at the farm gate. By converting agricultural surplus (pineapple leaf, rice husk, bamboo) into durable bio-composites, we create a circular economy that exports high-value products instead of importing waste costs.
                                </p>
                              </div>
                            </div>
                          )}

                          {activePage === 2 && (
                            <div className="space-y-12">
                              <div className="space-y-4">
                                <h2 className="text-4xl font-serif text-brand-green leading-tight">II. Material Science & Bio-Metrics</h2>
                                <div className="h-1 w-20 bg-brand-orange" />
                              </div>
                              <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                  <thead>
                                    <tr className="border-b border-brand-green/20">
                                      <th className="py-6 font-bold text-brand-green uppercase tracking-widest text-[10px]">Material Type</th>
                                      <th className="py-6 font-bold text-brand-green uppercase tracking-widest text-[10px]">Cellulose Content</th>
                                      <th className="py-6 font-bold text-brand-green uppercase tracking-widest text-[10px]">Structural Role</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-brand-green/10">
                                    {[
                                      { name: "PALF (Pineapple)", metric: "70–82%", role: "Tensile Reinforcement" },
                                      { name: "Bamboo Fibre", metric: "52–60%", role: "Core Structural Matrix" },
                                      { name: "Rice Husk", metric: "20% Silica", role: "Fire & Heat Resistance" },
                                      { name: "Bagasse", metric: "45–50%", role: "Tableware Filler" }
                                    ].map((m, i) => (
                                      <tr key={i}>
                                        <td className="py-6 font-serif text-xl text-brand-green">{m.name}</td>
                                        <td className="py-6 font-mono font-bold text-brand-orange">{m.metric}</td>
                                        <td className="py-6 text-brand-ink/60 italic">{m.role}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                              <div className="bg-brand-paper p-10 rounded-2xl border border-brand-green/5">
                                <h4 className="text-lg font-serif mb-4 flex items-center gap-3">
                                  <FlaskConical className="w-5 h-5 text-brand-orange" />
                                  Extraction Protocols
                                </h4>
                                <p className="text-sm text-brand-ink/60 leading-relaxed">
                                  Decortication at 500 RPM ensures maximum fibre yield without cellular degradation. Washing at pH 7.2 removes pectins. Solar drying must reach critical 12% moisture limit before binder infusion.
                                </p>
                              </div>
                            </div>
                          )}

                          {activePage === 3 && (
                            <div className="space-y-12">
                              <div className="space-y-4">
                                <h2 className="text-4xl font-serif text-brand-green leading-tight">III. Industrial Manufacturing Stages</h2>
                                <div className="h-1 w-20 bg-brand-orange" />
                              </div>
                              <div className="grid md:grid-cols-2 gap-8">
                                <div className="bg-brand-ink p-10 text-white rounded-[24px]">
                                  <Settings2 className="w-8 h-8 mb-6 text-brand-orange" />
                                  <h4 className="text-xl font-serif mb-6">Hot Press Parameters</h4>
                                  <div className="space-y-4 text-xs font-mono">
                                    <div className="flex justify-between border-b border-white/10 pb-2">
                                      <span className="opacity-40">TEMP:</span>
                                      <span className="text-brand-orange font-bold">140–180°C</span>
                                    </div>
                                    <div className="flex justify-between border-b border-white/10 pb-2">
                                      <span className="opacity-40">PRESS:</span>
                                      <span className="text-brand-orange font-bold">2.0–4.0 MPa</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="opacity-40">TIME:</span>
                                      <span className="text-brand-orange font-bold">8–15 MIN</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="bg-brand-paper p-10 rounded-[24px] border border-brand-green/10">
                                  <Factory className="w-8 h-8 mb-6 text-brand-green" />
                                  <h4 className="text-xl font-serif text-brand-green mb-4">Mat Forming</h4>
                                  <p className="text-xs text-brand-ink/60 leading-relaxed shadow-sm">
                                    Cross-directional layering ensures dimensional stability. We use a graduated density profile (GDP) with higher density surface layers for water resistance.
                                  </p>
                                </div>
                              </div>
                              <div className="space-y-8 mt-12">
                                {[
                                  { s: "01", t: "Binder Blending", d: "Rotary drum blending with atomized resin spray. Loading 8-12% by weight." },
                                  { s: "02", t: "Mould Casting", d: "Cast into heated male-female moulds at 130°C for tableware products." },
                                  { s: "03", t: "Final Trimming", d: "Precision cutting using diamond-tipped saws to standard 8x4ft dimensions." }
                                ].map((step, i) => (
                                  <div key={i} className="flex gap-6">
                                    <div className="text-3xl font-serif text-brand-orange/20 select-none">{step.s}</div>
                                    <div>
                                      <h5 className="font-bold text-sm mb-1">{step.t}</h5>
                                      <p className="text-sm text-brand-ink/60">{step.d}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {activePage === 4 && (
                            <div className="space-y-12">
                              <div className="space-y-4">
                                <h2 className="text-4xl font-serif text-brand-green leading-tight">IV. Standards, Compliance & Social ESG</h2>
                                <div className="h-1 w-20 bg-brand-orange" />
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-8">
                                  <div className="space-y-4">
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-brand-orange-dark">Industrial Compliance</h4>
                                    <div className="space-y-3">
                                      {["IS:12406 (Bio-Composite)", "IS:15778 (Heat Resistance)", "FSSAI Food-Safe Certified", "CARB Phase 2 (Zero-Formaldehyde)"].map((std, i) => (
                                        <div key={i} className="flex items-center gap-3 text-sm text-brand-ink/70">
                                          <ShieldCheck className="w-4 h-4 text-brand-green" />
                                          {std}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                <div className="p-8 bg-brand-paper rounded-2xl">
                                  <h4 className="text-xs font-bold uppercase tracking-widest text-brand-ink/40 mb-4">Social Ownership</h4>
                                  <p className="text-sm italic text-brand-ink/60 mb-6 leading-relaxed">"Ownership is the best catalyst for quality."</p>
                                  <div className="space-y-2 text-xs">
                                     <div className="flex justify-between py-2 border-b border-brand-ink/5"><span>SHG Participation</span><span className="font-bold">60%+</span></div>
                                     <div className="flex justify-between py-2 border-b border-brand-ink/5"><span>Tribal Youth Leads</span><span className="font-bold">85%</span></div>
                                     <div className="flex justify-between py-2"><span>Community Equity</span><span className="font-bold">Verified</span></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Footer Info */}
                          <div className="mt-20 pt-12 border-t border-brand-ink/10 flex justify-between items-center opacity-30 text-[9px] uppercase tracking-widest font-bold">
                            <span>Page {activePage} of 4</span>
                            <span>© 2026 ATSFY &middot; Tripura Venture</span>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* PDF Navigation Overlay (Mobile) */}
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-6 py-3 rounded-full flex items-center gap-6 shadow-2xl md:hidden z-30">
                    <button onClick={() => setActivePage(prev => Math.max(1, prev - 1))}><ChevronUp className="w-5 h-5 text-brand-ink" /></button>
                    <span className="text-xs font-bold font-mono">{activePage} / 4</span>
                    <button onClick={() => setActivePage(prev => Math.min(4, prev + 1))}><ChevronDown className="w-5 h-5 text-brand-ink" /></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Future Vision Section */}
        <section id="vision" className="py-24 px-6 bg-brand-green text-white relative overflow-hidden" aria-labelledby="vision-title">
          <div className="absolute top-0 right-0 w-full h-full -z-0 opacity-5 pointer-events-none">
            <div className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-brand-light-green rounded-full blur-[200px]" />
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <SectionTitle id="vision-title" subtitle="Vision 2030" light>Integrated Future <br />Insights</SectionTitle>
            
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Agro-Waste Valorization",
                  icon: <FlaskConical className="w-8 h-8" />,
                  desc: "Beyond construction, we're ramping up to produce bio-enzymes, organic fertilizers, and biochar soil amendments.",
                  details: "Leveraging NABARD climate funds to reduce chemical import dependency while healing Tripura's acidic soils.",
                  color: "border-brand-light-green/20"
                },
                {
                  title: "Renewable Energy Hubs",
                  icon: <Sun className="w-8 h-8" />,
                  desc: "Establishing community biogas plants (SATAT Scheme) and solar-drying units for farm produce.",
                  details: "Powering rural micro-grids and cutting LPG imports to fuel Tripura's 12.46% GSDP growth targets.",
                  color: "border-brand-orange/20"
                },
                {
                  title: "Skill & Market Linkages",
                  icon: <ShoppingBag className="w-8 h-8" />,
                  desc: "SHG-led micro-factories for rubber products and bamboo handicrafts with direct B2B export pipelines.",
                  details: "ONDC e-commerce integration targeting Bangladesh markets, boosting 'Lakhpati Didi' numbers beyond 1 lakh.",
                  color: "border-white/10"
                },
                {
                  title: "Water & Irrigation Boost",
                  icon: <Droplets className="w-8 h-8" />,
                  desc: "Micro-irrigation and rainwater harvesting targeting 45% TSP coverage by 2030, per SDG Vision.",
                  details: "Utilizing agro-waste mulches to conserve soil moisture for year-round horticultural self-reliance.",
                  color: "border-brand-light-green/30"
                }
              ].map((insight, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className={`p-10 border ${insight.color} rounded-[32px] bg-white/5 hover:bg-white/10 transition-all group`}
                >
                  <div className="flex items-start justify-between mb-8">
                    <div className="p-4 bg-white/10 rounded-2xl text-white group-hover:scale-110 transition-transform">
                      {insight.icon}
                    </div>
                  </div>
                  <h3 className="text-3xl font-serif mb-4">{insight.title}</h3>
                  <p className="text-white/80 mb-6 leading-relaxed">{insight.desc}</p>
                  <div className="pt-6 border-t border-white/10">
                    <p className="text-sm italic text-white/50">{insight.details}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="mt-16 p-8 rounded-[40px] border border-white/20 bg-gradient-to-br from-brand-orange/20 to-transparent flex flex-col md:flex-row items-center justify-between gap-8"
            >
              <div className="text-center md:text-left">
                <h4 className="text-2xl font-serif mb-2">Our commitment to sustainable local growth</h4>
                <p className="text-white/60">Aligning with National SDG targets for 2030.</p>
              </div>
              <div className="text-4xl font-serif text-brand-orange">Vision 2030</div>
            </motion.div>
          </div>
        </section>

        {/* Moat Section */}
        <section className="py-24 px-6 bg-brand-ink text-white" aria-labelledby="moat-title">
          <div className="max-w-7xl mx-auto">
            <SectionTitle id="moat-title" subtitle="Competitive Moat" light>Why This Is Hard to Copy</SectionTitle>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <caption className="sr-only">Competitive comparison between Imported Plywood, Mutha Bamboowood, and Green-to-Gold</caption>
                <thead>
                  <tr className="border-b border-white/10">
                    <th scope="col" className="py-6 px-4 font-serif text-xl">Factor</th>
                    <th scope="col" className="py-6 px-4 font-serif text-xl opacity-40">Imported Plywood</th>
                    <th scope="col" className="py-6 px-4 font-serif text-xl text-brand-orange">Green-to-Gold</th>
                  </tr>
                </thead>
                <tbody className="text-sm md:text-base">
                  {[
                    { factor: "Transport Cost", old: "30–40% Premium", new: "Zero — Farm-Gate" },
                    { factor: "Biomass Sourcing", old: "External Raw Material", new: "Waste Stream (Near-Zero Cost)" },
                    { factor: "Energy Model", old: "Grid-Dependent", new: "Self-Powered (Bio-Pellets)" },
                    { factor: "Community Ownership", old: "None", new: "SHG-Operated Units" },
                    { factor: "Carbon Benefit", old: "Negative (Transport)", new: "Positive (Sequesters Carbon)" }
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-white/5 group hover:bg-white/5 transition-colors">
                      <th scope="row" className="py-6 px-4 font-medium">{row.factor}</th>
                      <td className="py-6 px-4 opacity-40">{row.old}</td>
                      <td className="py-6 px-4 text-brand-light-green font-bold">{row.new}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Partner Section */}
        <section id="partner" className="py-24 px-6 bg-brand-paper" aria-labelledby="partner-title">
          <div className="max-w-7xl mx-auto">
            <SectionTitle id="partner-title" subtitle="Collaboration">Partner With Us</SectionTitle>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h3 className="text-4xl font-serif text-brand-green leading-tight">
                  Let's Build the <br />
                  <span className="italic text-brand-orange">Green Economy</span> Together.
                </h3>
                <p className="text-lg text-brand-ink/70 leading-relaxed">
                  Whether you are an investor looking for high-impact opportunities, a farmer with biomass waste, or a distributor ready to bring sustainable materials to the market — we want to hear from you.
                </p>
                <div className="space-y-4">
                  {[
                    "Direct access to Tripura's vast biomass resources",
                    "Impact-first investment with scalable returns",
                    "Community-driven manufacturing model",
                    "Zero-waste circular economy leadership"
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-3 text-brand-ink/80">
                      <CheckCircle2 className="w-5 h-5 text-brand-light-green" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              <PartnerForm />
            </div>
          </div>
        </section>
      </main>

      {/* CTA / Footer */}
      <footer className="py-24 px-6 bg-brand-paper" aria-label="Footer">
        <div className="max-w-7xl mx-auto glass-card p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-green via-brand-orange to-brand-light-green" aria-hidden="true" />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-5xl md:text-7xl font-serif text-brand-green mb-8">
              Building Tripura's Future <br />
              <span className="italic text-brand-orange">From Its Own Soil.</span>
            </h2>
            <p className="text-xl text-brand-ink/60 max-w-2xl mx-auto mb-12">
              Join us in building an independent, green manufacturing economy for India's Northeast.
            </p>
            
            <div className="grid md:grid-cols-4 gap-8 mb-16">
              <div>
                <div className="text-brand-orange-dark font-serif text-4xl mb-2">₹1.5 Cr</div>
                <div className="text-xs uppercase tracking-widest opacity-60 font-bold">Seed Ask</div>
              </div>
              <div>
                <div className="text-brand-green font-serif text-4xl mb-2">20 Units</div>
                <div className="text-xs uppercase tracking-widest opacity-60 font-bold">By 2027</div>
              </div>
              <div>
                <div className="text-brand-green font-serif text-4xl mb-2">₹496L</div>
                <div className="text-xs uppercase tracking-widest opacity-60 font-bold">Y3 Revenue (Proj.)</div>
              </div>
              <div>
                <div className="text-brand-green font-serif text-4xl mb-2">1,000+</div>
                <div className="text-xs uppercase tracking-widest opacity-60 font-bold">Farmers Impacted</div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-x-12 gap-y-6 pt-12 border-t border-brand-ink/5">
              <a href="mailto:contact@greentogold.in" className="flex items-center gap-3 text-brand-green hover:text-brand-orange-dark transition-colors font-medium">
                <Mail className="w-5 h-5" aria-hidden="true" /> contact@greentogold.in
              </a>
              <a href="mailto:Info.atsfy@gmail.com" className="flex items-center gap-3 text-brand-green hover:text-brand-orange-dark transition-colors font-medium">
                <Mail className="w-5 h-5" aria-hidden="true" /> Info.atsfy@gmail.com
              </a>
              <a href="https://www.linkedin.com/in/atsfy/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-brand-green hover:text-brand-orange-dark transition-colors font-medium">
                <Linkedin className="w-5 h-5" aria-hidden="true" /> LinkedIn
              </a>
              <div className="flex items-center gap-3 text-brand-ink/60 font-medium">
                <MapPin className="w-5 h-5" aria-hidden="true" /> Agartala, Tripura, India
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-brand-ink/5">
              <span className="text-xs uppercase tracking-[0.3em] font-bold opacity-40">Under ATSFY Technologies</span>
            </div>
          </motion.div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-12 flex flex-col md:flex-row justify-between items-center text-xs uppercase tracking-[0.2em] font-bold opacity-40">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <span>© 2026 Green-to-Gold Sustainable Manufacturing</span>
            <span className="hidden md:inline">•</span>
            <span>Under ATSFY Technologies</span>
          </div>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a href="#" className="hover:opacity-100 transition-opacity">Privacy</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Terms</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Investor Portal</a>
          </div>
        </div>
      </footer>
      <ChatBot />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage user={null} />} />
        <Route path="/dss" element={<BambooSenseDSS />} />
      </Routes>
    </BrowserRouter>
  );
}
