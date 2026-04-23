/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GoogleGenAI } from "@google/genai";
import { 
  ArrowRight, 
  Leaf, 
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
  Droplets,
  Sun,
  FlaskConical,
  ShoppingBag
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
2. Process: Modular mini-factory presses bamboo, pineapple fibre, rice husk, and bagasse into high-value products.
3. Sell: Supply bio-composite boards, biodegradable tableware, and compostable packaging locally and nationally.

[Core Product Range]
- Biodegradable Cutlery & Tableware: Made via compression molding; heat-resistant, shelf-stable (10-12 months), replaces plastic in hotels/events.
- ECO-Packaging: Mycelium- or pulp-based bags, trays, and foams; fully compostable in 3 months, ISO certified for e-commerce/food delivery.
- Compostable Films: Starch-bound sheets for carry bags and retail wraps; low-cost extrusion replacement for single-use plastics.

[Impact]
- Economic: Farmer income +15-20% (adds ₹2,000-₹2,700/month).
- Social: Community-run units, 8-12 direct jobs per unit. Strong Govt. backing through grants and schemes.
- Environmental: Zero field burning, sequesters carbon, supports India's Net Zero 2070 pledge.

[Business & Roadmap]
- Market: India construction market $2.13T by 2030.
- Roadmap: 
  - Phase I (Months 1-6): Pilot in Unakoti district, BIS certification.
  - Phase II (Months 6-15): 5 units operational in West Tripura + Unakoti.
  - Phase III (Months 15-36): 20 units across all 8 districts, export pipeline.
- Investment Ask: ₹1.5 Crore Seed Round (60% Equipment, 25% Training, 15% R&D).

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

export default function App() {
  return (
    <div className="min-h-screen selection:bg-brand-orange selection:text-white">
      <a href="#main-content" className="skip-link">Skip to main content</a>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4" aria-label="Main navigation">
        <div className="max-w-7xl mx-auto flex justify-between items-center glass-card px-8 py-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-green rounded-full flex items-center justify-center" aria-hidden="true">
              <Leaf className="text-white w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold tracking-tight text-brand-green">Green-to-Gold</span>
              <span className="text-[10px] uppercase tracking-widest font-bold opacity-40 -mt-1">by ATSFY Technologies</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-wider">
            <a href="#problem" className="hover:text-brand-orange-dark transition-colors">The Problem</a>
            <a href="#solution" className="hover:text-brand-orange-dark transition-colors">The Model</a>
            <a href="#products" className="hover:text-brand-orange-dark transition-colors">Products</a>
            <a href="#vision" className="hover:text-brand-orange-dark transition-colors">Vision 2030</a>
            <a href="#impact" className="hover:text-brand-orange-dark transition-colors">Impact</a>
            <a href="#roadmap" className="hover:text-brand-orange-dark transition-colors">Roadmap</a>
            <a href="#partner" className="hover:text-brand-orange-dark transition-colors">Partner</a>
          </div>
          <a href="#partner" className="bg-brand-green text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-brand-light-green transition-all uppercase tracking-tight">
            Partner With Us
          </a>
        </div>
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
                      {[1, 2, 3].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-brand-paper bg-brand-light-green/20 overflow-hidden">
                          <img src={`https://picsum.photos/seed/farmer${i}/100/100`} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
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
                className="relative"
              >
                <div className="aspect-square rounded-[40px] overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700">
                  <img 
                    src="https://picsum.photos/seed/bamboo-construction/1200/1200" 
                    alt="Close-up of sustainable bio-composite material texture" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -bottom-10 -left-10 glass-card p-8 max-w-[280px] shadow-xl animate-float">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-brand-orange/10 rounded-lg" aria-hidden="true">
                      <TrendingUp className="text-brand-orange w-6 h-6" />
                    </div>
                    <span className="font-serif text-2xl font-bold">54% Cheaper</span>
                  </div>
                  <p className="text-sm text-brand-ink/60">Than imported plywood, with superior moisture resistance and strength.</p>
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
                  title: "Biodegradable Tableware",
                  desc: "Premium cutlery and tableware made via compression molding from rice husk and bagasse. Heat-resistant and shelf-stable for 10-12 months.",
                  tag: "Plastic Alternative",
                  image: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&q=80&w=800",
                  features: ["100% Home Compostable", "Heat Resistant", "Hotel/Event Ready"]
                },
                {
                  title: "Mycelium Packaging",
                  desc: "Fully compostable packaging solutions including bags, trays, and protective foams. ISO certified and optimized for e-commerce.",
                  tag: "ISO Certified",
                  image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800",
                  features: ["Composts in 3 Months", "Shock Absorbent", "Zero Moisture Debt"]
                },
                {
                  title: "Compostable Films",
                  desc: "Starch-bound sheets for retail carry bags and protective wraps. Low-cost extrusion process replacing single-use plastics.",
                  tag: "Retail Friendly",
                  image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800",
                  features: ["High Tensile Strength", "Low-Cost Extrusion", "Non-Toxic Residue"]
                }
              ].map((product, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-brand-paper rounded-3xl overflow-hidden border border-brand-green/5 hover:shadow-xl transition-all group"
                >
                  <div className="h-64 overflow-hidden relative">
                    <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                    <div className="absolute top-4 right-4 bg-brand-orange text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full">{product.tag}</div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-serif text-brand-green mb-3">{product.title}</h3>
                    <p className="text-brand-ink/60 text-sm leading-relaxed mb-6">{product.desc}</p>
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
                      <ChevronRight className="w-4 h-4 text-brand-green" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

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
            <SectionTitle id="roadmap-title" subtitle="Execution">The Sandbox Method</SectionTitle>
            
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute top-0 left-8 md:left-1/2 w-px h-full bg-brand-ink/10 -translate-x-1/2 hidden md:block" aria-hidden="true" />
              
              <div className="space-y-24">
                {[
                  {
                    phase: "Phase I",
                    title: "Launch",
                    time: "Months 1–6",
                    items: ["3-month pilot: 1 unit, Unakoti", "Bamboo-to-composite perfected", "BIS 1659 certification initiated", "First 50 SHG technicians trained"],
                    align: "left"
                  },
                  {
                    phase: "Phase II",
                    title: "Standardise",
                    time: "Months 6–15",
                    items: ["Deploy task-tracking software", "Quality control digitised", "5 units operational in West Tripura", "PMAY-U supply agreements signed"],
                    align: "right"
                  },
                  {
                    phase: "Phase III",
                    title: "Scale",
                    time: "Months 15–36",
                    items: ["20 farm-gate units across 8 districts", "State-wide bio-manufacturing live", "Bangladesh + Mizoram export pipeline", "Carbon credit monetisation begins"],
                    align: "left"
                  }
                ].map((step, i) => (
                  <div key={i} className={`flex flex-col md:flex-row gap-8 md:gap-0 items-center ${step.align === 'right' ? 'md:flex-row-reverse' : ''}`}>
                    <div className="w-full md:w-1/2 px-8">
                      <motion.div 
                        initial={{ opacity: 0, x: step.align === 'left' ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className={`glass-card p-10 ${step.align === 'right' ? 'text-right' : ''}`}
                      >
                        <span className="text-brand-orange-dark font-bold uppercase tracking-widest text-xs mb-2 block">{step.phase}</span>
                        <h3 className="text-3xl font-serif mb-1">{step.title}</h3>
                        <span className="text-brand-ink/40 text-sm mb-6 block">{step.time}</span>
                        <ul className={`space-y-3 ${step.align === 'right' ? 'flex flex-col items-end' : ''}`}>
                          {step.items.map((item, j) => (
                            <li key={j} className="flex items-center gap-3 text-brand-ink/70">
                              {step.align === 'left' && <CheckCircle2 className="w-4 h-4 text-brand-light-green" aria-hidden="true" />}
                              {item}
                              {step.align === 'right' && <CheckCircle2 className="w-4 h-4 text-brand-light-green" aria-hidden="true" />}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    </div>
                    <div className="relative z-10 w-16 h-16 rounded-full bg-brand-green border-8 border-brand-paper flex items-center justify-center text-white font-serif text-xl" aria-hidden="true">
                      {i + 1}
                    </div>
                    <div className="w-full md:w-1/2" aria-hidden="true" />
                  </div>
                ))}
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
