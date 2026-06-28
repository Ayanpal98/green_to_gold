/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect, ReactNode } from "react";
import { 
  motion, 
  AnimatePresence, 
  useMotionValue, 
  useSpring, 
  useTransform 
} from "motion/react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { GoogleGenAI } from "@google/genai";
import BioSenseDSS from "./components/BioSenseDSS";
import { useLanguage } from "./context/LanguageContext";
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
  Menu,
  Wrench,
  Layers,
  Wind,
  RefreshCw,
  Scissors,
  Eye,
  Activity,
  Cpu
} from "lucide-react";
import { Navbar } from "./components/Navbar";
import { PartnerForm } from "./components/PartnerForm";
import biocompositeBoardsImg from "./assets/images/biocomposite_boards_1782637503190.jpg";
import organicDinnerwareImg from "./assets/images/organic_dinnerware_1782637520179.jpg";
import pineappleLeafFiberImg from "./assets/images/pineapple_leaf_fiber_1782639876334.jpg";
import tripuraPineapplePlantationImg from "./assets/images/tripura_pineapple_plantation_1782639906830.jpg";

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
You are the official AI assistant for BioSense (by Green-to-Gold), a sustainable agricultural and manufacturing startup based in Tripura, India. 
Your goal is to provide Decision Support (DSS) for farmers and partners across crops like Bamboo, Rice, Sugarcane, Rubber, Agarwood, Betelnut, and Jute.

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
  const { language } = useLanguage();
  const getGreeting = () => {
    if (language === 'bn') return "নমস্কার! আমি গ্রিন-টু-গোল্ড এআই। ত্রিপুরায় আমাদের টেকসই উৎপাদন মিশন সম্পর্কে জানতে যেকোনো প্রশ্ন জিজ্ঞাসা করুন।";
    if (language === 'kok') return "Khulumkha! Green-to-Gold advisory system. Subraiye Tripura agro resource nikhai kokriri baridi.";
    return "Namaste! I'm the Green-to-Gold AI. How can I help you learn about our sustainable manufacturing mission in Tripura?";
  };

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length <= 1) {
      setMessages([{ role: 'model', text: getGreeting() }]);
    }
  }, [language]);

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
      const errText = language === 'bn' 
        ? "আমি দুঃখিত, আমি একটি অভ্যন্তরীণ সমস্যার সম্মুখীন হয়েছি। দয়া করে পরে আবার চেষ্টা করুন অথবা contact@greentogold.in এ আমাদের সাথে যোগাযোগ করুন।" 
        : language === 'kok'
        ? "I'm sorry, back-end line error tongo. Please try again or email us contact@greentogold.in."
        : "I'm sorry, I encountered an error. Please try again later or contact us at contact@greentogold.in.";
      setMessages(prev => [...prev, { role: 'model', text: errText }]);
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
                  {language === 'bn' ? "সক্রিয় আছে" : language === 'kok' ? "Online & Choba" : "Online & Ready"}
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
                placeholder={language === 'bn' ? "আমাদের সবুজ বা টেকসই উদ্যোগ সম্পর্কে জিজ্ঞাসা করুন..." : language === 'kok' ? "Green-to-Gold AI no swngdi..." : "Ask about our mission..."}
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

const LP_TRANSLATIONS = {
  en: {
    heroBadge: "Tripura's Sustainable Manufacturing Leader",
    heroTagline: "From Waste to Wealth",
    heroTitle1: "Turning Agricultural Waste",
    heroTitle2: "into High-Value Green Products.",
    heroStatNumber: "50,000+ Tons",
    heroStatText: "of agricultural waste ready for circular manufacturing",
    heroSubtitle: "Transforming agricultural waste into high-demand biodegradable plates, organic tableware, and high-strength bio-composite boards replacing premium plywood — cheaper, stronger, and built from Tripura's own soil.",
    exploreButton: "Explore the Model",
    farmersImpacted: "1,000+ Farmers Impacted",
    problemBadge: "The Challenge",
    problemTitle: "The Distance Tax That Strangles Growth",
    problem30Pct: "Premium added to all imported construction materials via the 1,500 km Siliguri Corridor bottleneck.",
    problem100k: "Tonnes of biomass (pineapple & bamboo) burned annually — zero value captured, high environmental cost.",
    problemLowest: "PMAY-U completion rates in India due to sky-high building costs for local families.",
    transBadge: "The Great Transformation",
    transTitle1: "Turning Tripura's Fields",
    transTitle2: "Into Micro-Factories.",
    treeFree: "Tree-Free",
    lowerCarbon: "Lower Carbon",
    circularEconomy: "Circular Economy",
    solutionBadge: "Our Solution",
    solutionTitle: "Farm-Gate Mini-Factories, AI-Enabled",
    collectTitle: "Collect",
    collectDesc: "Buy waste from farmers at ₹2,000/tonne — turning a disposal cost into a revenue stream.",
    processTitle: "Process",
    processDesc: "Modular farm-gate units press bamboo + pineapple organic fibres on-site into durable building boards and thermal-mold them into premium biodegradable plates.",
    sellTitle: "Sell",
    sellDesc: "Deliver dual high-demand lines: eco-construction boards at 54% below imported plywood prices, and premium compostable plates, generating multiple robust revenue streams.",
    marketBadge: "Market Ready",
    marketTitle: "Sustainable Product Range",
    specsText: "Explore Specifications",
    specsBadge: "Govt. Grant Eligible",
    specsDetailBadge: "Core Specifications",
    environImpact: "Environmental Impact",
    lifecycle: "Life Cycle",
    materialComposition: "Material Composition",
    standardsCompliance: "Global Standards Compliance",
    keyApplications: "Key Applications",
    datasheetBtn: "View Full Technical Datasheet",
    verifiedSupplyChain: "Verified Supply Chain",
    impactBadge: "The Triple Win",
    impactTitle: "Impact at the Core",
    farmerIncomeTitle: "Farmer Income +20%",
    farmerIncomeDesc: "Waste revenue adds ₹2,000–₹2,700/month directly to average farmer households. 26,400 ha of farmland already primed.",
    communityTitle: "Community-Run Units",
    communityDesc: "Partnering with Self-Help Groups (SHGs) and tribal youth cooperatives. Each unit creates 8–12 direct jobs inside villages.",
    zeroBurnTitle: "Zero Burn, Zero Methane",
    zeroBurnDesc: "Eliminating field burning and sequestering carbon in durable boards. Supporting India's Net Zero 2070 pledge.",
    commitmentTitle: "Our commitment to sustainable local growth",
    commitmentDesc: "Aligning with National SDG targets for 2030.",
    visionTitle: "Vision 2030",
    moatBadge: "Competitive Moat",
    moatTitle: "Why This Is Hard to Copy",
    factorHeader: "Factor",
    importedPlywood: "Imported Plywood",
    greenToGold: "Green-to-Gold",
    factors: [
      { factor: "Transport Cost", old: "30–40% Premium", new: "Zero — Farm-Gate" },
      { factor: "Biomass Sourcing", old: "External Raw Material", new: "Waste Stream (Near-Zero Cost)" },
      { factor: "Energy Model", old: "Grid-Dependent", new: "Self-Powered (Bio-Pellets)" },
      { factor: "Community Ownership", old: "None", new: "SHG-Operated Units" },
      { factor: "Carbon Benefit", old: "Negative (Transport)", new: "Positive (Sequesters Carbon)" }
    ],
    partnerBadge: "Collaboration",
    partnerTitle: "Partner With Us",
    buildGreenEconomy: "Let's Build the Green Economy Together.",
    partnerDesc: "Whether you are an investor looking for high-impact opportunities, a farmer with biomass waste, or a distributor ready to bring sustainable materials to the market — we want to hear from you.",
    benefits: [
      "Direct access to Tripura's vast biomass resources",
      "Impact-first investment with scalable returns",
      "Community-driven manufacturing model",
      "Zero-waste circular economy leadership"
    ],
    footerTitle1: "Building Tripura's Future",
    footerTitle2: "From Its Own Soil.",
    footerSubtitleDetail: "Join us in building an independent, green manufacturing economy for India's Northeast.",
    seedAsk: "Seed Ask",
    by2027: "By 2027",
    y3Revenue: "Y3 Revenue (Proj.)",
    farmersImpactedFooter: "Farmers Impacted",
    underAtsfy: "Under ATSFY Technologies",
    copyright: "© 2026 Green-to-Gold Sustainable Manufacturing",
    privacy: "Privacy",
    terms: "Terms",
    investorPortal: "Investor Portal",
    productBoardTitle: "Bio-Composite Construction Boards",
    productBoardDesc: "Premium, ultra-durable tree-free construction boards pressed from Muli bamboo and pineapple leaf fibre. Termite-proof, water-resistant, and up to 54% cheaper than imported plywood.",
    pBoardFeats: ["IS:12406 Compliant", "Termite & Fire Resistant", "54% Cost Reduction"],
    pBoardComp: "60% Muli Bamboo fibre, 30% Pineapple leaf fibre, 10% bio-based resins",
    pBoardUses: ["Affordable Housing (PMAY-U)", "Modular Furniture", "Prefabricated Structures"],
    productCutleryTitle: "High-Demand Biodegradable Plates & Dinnerware",
    productCutleryDesc: "Premium dining plates, bowls, and smart food trays Hot Pressed from local bamboo and pineapple biomass. 100% home-compostable with premium water-resistance and a 12-month shelf life. Capturing high-revenue corporate and wedding markets.",
    productPackagingTitle: "Mycelium Packaging",
    productPackagingDesc: "Fully compostable packaging solutions including bags, trays, and protective foams. ISO certified and optimized for e-commerce.",
    productFilmsTitle: "Compostable Films",
    productFilmsDesc: "Starch-bound sheets for retail carry bags and protective wraps. Low-cost extrusion process replacing single-use plastics.",
    pCutleryFeats: ["100% Home Compostable", "Heat Resistant & Oil Proof", "High-Revenue Event Ready"],
    pCutleryComp: "70% Rice Husk & Bamboo fiber, 25% Sugarcane Bagasse, 5% Natural Starch Binder",
    pCutleryUses: ["High-End Caterers", "In-flight catering", "Premium Weddings & Festivals"],
    pPackagingFeats: ["Composts in 3 Months", "Shock Absorbent", "Zero Moisture Debt"],
    pPackagingComp: "Mycelium composite grown on pineapple core waste",
    pPackagingUses: ["Electronics Packing", "Luxury Fragrance Boxes", "Wine Shippers"],
    pFilmsFeats: ["High Tensile Strength", "Low-Cost Extrusion", "Non-Toxic Residue"],
    pFilmsComp: "Potato Starch, PBAT blands with bamboo micro-cellulose",
    pFilmsUses: ["E-commerce Mailers", "Fruit & Veg Wraps", "Garment Bags"],
    valueProposition: "The Value Proposition",
    costSavings: "Cost Savings",
    importedPlywoodLabel: "Imported Plywood",
    greenToGoldLabel: "Green-to-Gold",
    costSavingsDetail: "* 54% reduction in construction material costs for Tripura.",
    carbonImpactLabel: "Carbon Impact",
    co2PerBoard: "CO2e per Board",
    carbonImpactDetail: "Net-negative carbon footprint by sequestering bamboo & pineapple waste into durable construction boards.",
    netZeroPledge: "* Supporting India's Net Zero 2070 pledge through local action.",
    tonnesWasteSaved: "Tonnes Waste Saved",
    jobsPerFactory: "Jobs per Mini-Factory",
    roadmapBadge: "Execution",
    roadmapTitle: "The Scale Roadmap",
    roadmapSteps: [
      {
        phase: "Phase 1: Validation",
        title: "Pilot Unit",
        time: "Current — Month 12",
        items: ["Unakoti district pilot", "Biodegradable plates & boards", "Revenue: ₹4.8–6.8L/month", "18–25 community jobs"]
      },
      {
        phase: "Phase 2: Expansion",
        title: "Product Growth",
        time: "Months 6–18",
        items: ["Moulded tableware focus (Plates/Dinnerware)", "PALF table covers", "Paper pulping feasibility", "ONDC marketplace entry"]
      },
      {
        phase: "Phase 3: Replication",
        title: "Pan-Tripura",
        time: "Months 18–36",
        items: ["One unit per district (8 total)", "Revenue Potential: ₹52–75L/mo (Plates margin lift)", "180–250 direct community jobs", "Bangladesh export gateway"]
      },
      {
        phase: "Phase 4: Global Scale",
        title: "Export & Furniture",
        time: "2027 Onwards",
        items: ["Bamboo laminated lumber", "Full Kraft paper production", "Verified carbon credit tokens", "IKEA supply chain targeting"]
      }
    ],
    processBadge: "Confidential Process Document",
    processManualTitle: "Complete Industrial Execution Manual",
    viewPdfMode: "View PDF Mode",
    manualTOC: "Table of Contents",
    tcChapters: [
      "I. Executive Summary",
      "II. Material Science",
      "III. Manufacturing",
      "IV. Standards & ESG"
    ],
    revRuralText: "Revolutionizing rural industry.",
    blueprintText: "This manual serves as the operational blueprint for all farm-gate units under ATSFY Technologies.",
    pdfTitle: "Execution_Manual_v1.pdf",
    ofText: "of",
    confidentialLabel: "Confidential Industrial Manual",
    page1Title: "I. Executive Summary & Market Mechanics",
    page1P1: "Tripura operates under a severe \"Plywood Paradox\": importing construction materials at ₹102/sqft from 1,500km away while burning its own raw wealth in the fields.",
    page1SiliLabel: "Siliguri Corridor Import",
    page1FarmLabel: "Farm-Gate Production",
    page1P2: "Our model collapses this contradiction by establishing modular, low-energy manufacturing units at the farm gate. By converting agricultural surplus (pineapple leaf, rice husk, bamboo) into durable bio-composites, we create a circular economy that exports high-value products instead of importing waste costs.",
    page2Title: "II. Material Science & Bio-Metrics",
    page2ThType: "Material Type",
    page2ThCellulose: "Cellulose Content",
    page2ThRole: "Structural Role",
    page2ExtractTitle: "Extraction Protocols",
    page2ExtractText: "Decortication at 500 RPM ensures maximum fibre yield without cellular degradation. Washing at pH 7.2 removes pectins. Solar drying must reach critical 12% moisture limit before binder infusion.",
    page3Title: "III. Industrial Manufacturing Stages",
    page3HotPress: "Hot Press Parameters",
    page3Temp: "TEMP",
    page3Press: "PRESS",
    page3Time: "TIME",
    page3MatForming: "Mat Forming",
    page3MatFormingText: "Cross-directional layering ensures dimensional stability. We use a graduated density profile (GDP) with higher density surface layers for water resistance.",
    page3Stages: [
      { s: "01", t: "Binder Blending", d: "Rotary drum blending with atomized resin spray. Loading 8-12% by weight." },
      { s: "02", t: "Mould Casting", d: "Cast into heated male-female moulds at 130°C for tableware products." },
      { s: "03", t: "Final Trimming", d: "Precision cutting using diamond-tipped saws to standard 8x4ft dimensions." }
    ],
    page4Title: "IV. Standards, Compliance & Social ESG",
    page4ComplianceTitle: "Industrial Compliance",
    page4ComplianceItems: ["IS:12406 (Bio-Composite)", "IS:15778 (Heat Resistance)", "FSSAI Food-Safe Certified", "CARB Phase 2 (Zero-Formaldehyde)"],
    page4SocialTitle: "Social Ownership",
    page4Quote: "Ownership is the best catalyst for quality.",
    page4Participation: "SHG Participation",
    page4Tribal: "Tribal Youth Leads",
    page4Equity: "Community Equity",
    page4Verified: "Verified",
    visionBadge: "Vision 2030",
    visionCards: [
      {
        title: "Agro-Waste Valorization",
        desc: "Beyond construction, we're ramping up to produce bio-enzymes, organic fertilizers, and biochar soil amendments.",
        details: "Leveraging NABARD climate funds to reduce chemical import dependency while healing Tripura's acidic soils."
      },
      {
        title: "Renewable Energy Hubs",
        desc: "Establishing community biogas plants (SATAT Scheme) and solar-drying units for farm produce.",
        details: "Powering rural micro-grids and cutting LPG imports to fuel Tripura's 12.46% GSDP growth targets."
      },
      {
        title: "Skill & Market Linkages",
        desc: "SHG-led micro-factories for rubber products and bamboo handicrafts with direct B2B export pipelines.",
        details: "ONDC e-commerce integration targeting Bangladesh markets, boosting 'Lakhpati Didi' numbers beyond 1 lakh."
      },
      {
        title: "Water & Irrigation Boost",
        desc: "Micro-irrigation and rainwater harvesting targeting 45% TSP coverage by 2030, per SDG Vision.",
        details: "Utilizing agro-waste mulches to conserve soil moisture for year-round horticultural self-reliance."
      }
    ],
    infraBadge: "Infrastructure",
    infraTitle: "Farm-Gate Units & Heavy Machinery",
    infraSub: "Each Green-to-Gold mini-factory is a modular, self-powered industrial unit deployable within 500m of the farm gate — no grid connection, no logistics bottleneck, no dependency on the Siliguri Corridor.",
    infraPhase1: "Phase 1: Pilot Unit",
    infraPhase2: "Phase 2: Expanded Unit",
    infraPhase3: "Phase 3: District Hub",
    infraCapacity: "Capacity",
    infraPower: "Power",
    infraOutput: "Output",
    infraSellsSurplus: "Sells surplus",
    infraRatio: "Binder ratio",
    infraSize: "Board size",
    infraMoisture: "Output moisture",
    infraPressure: "Pressure",
    infraTemp: "Temp",
    infraFootprintTitle: "Mini-factory floor layout — Phase 1 (footprint: ~1,800 sq ft)",
    infraFootprintP2: "Phase 2 additions — expanded floor (footprint: ~3,200 sq ft)",
    infraFootprintP3: "Phase 3 — District hub model (one per district, 8 total by 2027)",
    infraMetric1Label: "Unit capacity utilization (target, Month 6)",
    infraMetric2Label: "Biomass feedstock from farm waste (vs purchased)",
    infraMetric3Label: "Self-energy sufficiency via bio-pellet loop",
  },
  bn: {
    heroBadge: "ত্রিপুরায় টেকসই তিসি বর্জ্যভিত্তিক বায়ার ম্যানুফ্যাকচারিং",
    heroTagline: "বর্জ্য থেকে সম্পদ",
    heroTitle1: "কৃষি বর্জ্যকে রূপান্তর করুন",
    heroTitle2: "উচ্চ-মূল্যের পরিবেশবান্ধব পণ্যে।",
    heroStatNumber: "৫০,০০০+ টন",
    heroStatText: "কৃষি বর্জ্য বৃত্তাকার উৎপাদনের জন্য প্রস্তুত",
    heroSubtitle: "কৃষি বর্জ্যকে উচ্চ চাহিদাপূর্ণ পচনশীল থালা-বাসন, পরিবেশবান্ধব টেবিলসামগ্রী এবং প্লাইউডের বিকল্প উচ্চ-শক্তির বায়ো-কম্পোজিট বোর্ডে রূপান্তর — সস্তা, আরো উন্নত এবং ত্রিপুরার নিজস্ব মাটি থেকে নির্মিত।",
    exploreButton: "মডেলটি অন্বেষণ করুন",
    farmersImpacted: "১,০০০+ কৃষক উপকৃত হয়েছেন",
    problemBadge: "মূল চ্যালেঞ্জ",
    problemTitle: "দূরত্ব কর যা প্রবৃদ্ধিকে ব্যাহত করে",
    problem30Pct: "১,৫০০ কিমি দূরবর্তী শিলিগুড়ি করিডোর সংকীর্ণতার মধ্য দিয়ে সমস্ত আমদানিকৃত নির্মাণ সামগ্রীতে অতিরিক্ত ৩০-৪০% অতিরিক্ত খরচ যুক্ত হয়।",
    problem100k: "বার্ষিক ১ লক্ষ টনেরও বেশি বায়োমাস বা খড়-পাতা পোড়ানো হয় — যেখানে পরিবেশের উচ্চ ক্ষতি ছাড়া কোনও মূল্য পাওয়া যায় না।",
    problemLowest: "উচ্চ নির্মাণ ব্যয়ের কারণে স্থানীয় পরিবারের জীবনযাত্রায় সবচেয়ে কম পিএমএওয়াই-ইউ (PMAY-U) সমাপ্তির হার দেখা যায়।",
    transBadge: "বৃহত্তম পরিবর্তন",
    transTitle1: "ত্রিপুরাবাসীর কৃষিক্ষেত্রকে",
    transTitle2: "ক্ষুদ্র কারখানায় রূপান্তর।",
    treeFree: "বৃক্ষহীন বা গাছ-মুক্ত",
    lowerCarbon: "নিম্ন কম কার্বন ফুটপ্রিন্ট",
    circularEconomy: "বৃত্তাকার অর্থনীতি গড়ে তোলা",
    solutionBadge: "আমাদের সমাধান",
    solutionTitle: "খামার-ভিত্তিক ক্ষুদ্র কারখানা এবং আধুনিক এআই ব্যবস্থা",
    collectTitle: "সংগ্রহ",
    collectDesc: "কৃষকদের কাছ থেকে ₹২,০০০/টন মূল্যে বর্জ্য সংগ্রহ করা — তাদের বর্জ্য ব্যবস্থাপনার খরচকে উপার্জনের উপায়ে পরিণত করা।",
    processTitle: "প্রক্রিয়া",
    processDesc: "খামারের কাছেই বাঁশ ও আনারসের আঁশ উন্নত প্রযুক্তিতে সংকোচন করে দীর্ঘস্থায়ী নির্মাণ বোর্ড এবং প্রিমিয়াম পচনশীল থালা-বাসনে রূপান্তর করা হয়।",
    sellTitle: "বিক্রয়",
    sellDesc: "দুটি মূল উচ্চ-চাহিদা পণ্য সরবরাহ করুন: আমদানিকৃত প্লাইউড অপেক্ষা ৫৪% সস্তা নির্মাণ বোর্ড এবং রাজকীয় পরিবেশবান্ধব পচনশীল থালা, যা বহুমাত্রিক রাজস্ব নিশ্চিত করে।",
    marketBadge: "বাজারের জন্য প্রস্তুত",
    marketTitle: "টেকসই উন্নত পণ্যসমূহ",
    specsText: "বিশদ বিবরণী দেখুন",
    specsBadge: "সরকারী অনুদান যোগ্য",
    specsDetailBadge: "মূল বিবরণী",
    environImpact: "পরিবেশগত সামাজিক প্রভাব",
    lifecycle: "জীবন চক্র",
    materialComposition: "উপাদানের সংমিশ্রণ",
    standardsCompliance: "বৈশ্বিক মান ও কমপ্লায়েন্স",
    keyApplications: "প্রধান ক্ষেত্রসমূহ",
    datasheetBtn: "সম্পূর্ণ ডেটাশিট সংগ্রহ করুন",
    verifiedSupplyChain: "যাচাইকৃত সরবরাহ ব্যবস্থা",
    impactBadge: "ত্রিমুখী সামাজিক লাভ",
    impactTitle: "অর্থনীতির একেবারে কেন্দ্রবিন্দুতে",
    farmerIncomeTitle: "কৃষকদের গড় আয় বৃদ্ধি +২০%",
    farmerIncomeDesc: "বর্জ্য বিক্রয় করে কৃষকদের ঘরে সরাসরি অতিরিক্ত ₹২,০০০-₹২,৭০০/মাস যুক্ত হয়। ২৬,৪০০ হেক্টর কৃষিজমি ইতিমধ্যেই সজ্জিত।",
    communityTitle: "সমবায় পরিচালিত ইউনিট",
    communityDesc: "স্বনির্ভর গোষ্ঠী (SHGs) এবং উপজাতীয় যুব সমবায় সংস্থার সাথে অংশীদারিত্ব। প্রতিটি ইউনিট গ্রামে ৮-১২টি সরাসরি কর্মসংস্থান তৈরি করে।",
    zeroBurnTitle: "শূন্য পোড়ানো, ধোঁয়া মুক্ত বায়ু",
    zeroBurnDesc: "ফসল পোড়ানো সম্পূর্ণ বন্ধ করে দীর্ঘস্থায়ী বোর্ডে কার্বন ধরে রাখা। ভারতের নেট জিরো ২০৭০ প্রতিশ্রুতিকে ত্বরান্বিত করা।",
    commitmentTitle: "টেকসই স্থানীয় উন্নয়নে আমাদের ভূমিকা",
    commitmentDesc: "২০৩০ সালের জাতীয় এসডিজি (SDG) লক্ষ্যের সাথে সামঞ্জস্যপূর্ণ।",
    visionTitle: "ভিশন ২০৩০",
    moatBadge: "প্রতিযোগিতামূলক স্থায়িত্ব",
    moatTitle: "কেন এটি অনুলিপি করা অসম্ভব",
    factorHeader: "উপাদান",
    importedPlywood: "আমদানিকৃত প্লাইউড",
    greenToGold: "গ্রিন-টু-গোল্ড মডেল",
    factors: [
      { factor: "পরিবহন ব্যয়", old: "৩০-৪০% অতিরিক্ত মূল্য", new: "সম্পূর্ণ শূন্য — খামার গেটেই" },
      { factor: "বায়োমাস সোর্সিং", old: "বাহ্যিক কাঁচামাল", new: "কৃষি বর্জ্য প্রবাহ (শূন্য ব্যয় নিকট)" },
      { factor: "জ্বালানী বা শক্তি", old: "গ্রিড-নির্ভর", new: "স্ব-চালিত (বায়ো-পেল্যেট দ্বারা)" },
      { factor: "সমবায় মালিকানা", old: "কোনোটিই নয়", new: "এসএইচজি (SHG) দ্বারা সরাসরি পরিচালিত" },
      { factor: "কার্বন সুবিধা", old: "নেতিবাচক (পরিবহন দূষণ)", new: "ইতিবাচক (কার্বন শোষণ করে)" }
    ],
    partnerBadge: "সহযোগিতা",
    partnerTitle: "অংশীদার হতে যোগাযোগ করুন",
    buildGreenEconomy: "আসুন একসাথে সবুজ অর্থনীতি গড়ে তুলি।",
    partnerDesc: "আপনি উচ্চ-প্রভাবের সুযোগ সন্ধানকারী একজন বিনিয়োগকারী, বায়োমাস বর্জ্য সমৃদ্ধ কৃষক, বা বাজারে পণ্য সরবরাহের পরিবেশক যেই হোন না কেন — আমরা আপনার প্রতিক্রিয়া শুনতে আগ্রহী।",
    benefits: [
      "ত্রিপুরার বিশাল বায়োমাস সম্পদের সরাসরি অ্যাক্সেস",
      "পরিমাপযোগ্য রিটার্ন সহ প্রভাব-ভিত্তিক বিনিয়োগ",
      "সমবায় বা সম্প্রদায় দ্বারা চালিত উৎপাদন মডেল",
      "শূন্য-বর্জ্য বৃত্তাকার অর্থনৈতিক নেতৃত্ব"
    ],
    footerTitle1: "ত্রিপুরার প্রগতির চাকা",
    footerTitle2: "তার নিজের মাটি থেকে নির্মিত।",
    footerSubtitleDetail: "ভারতের উত্তর-পূর্বাঞ্চলে একটি স্বাধীন, পরিবেশবান্ধব উৎপাদন অর্থনীতি গড়ে তুলতে আমাদের সাথে যোগ দিন।",
    seedAsk: "সিড ফান্ড চাহিদা",
    by2027: "২০২৭ সালের মধ্যে লক্ষ্য",
    y3Revenue: "৩য় বর্ষের প্রাক্কলিত রাজস্ব",
    farmersImpactedFooter: "কৃষক প্রভাবিত হয়েছেন",
    underAtsfy: "এটিএসএফওয়াই টেকনোলজিসের অধীনে",
    copyright: "© ২০২৬ গ্রিন-টু-গোল্ড টেকসই ম্যানুফ্যাকচারিং",
    privacy: "গোপনীয়তা নীতি",
    terms: "শর্তাবলী",
    investorPortal: "বিনিয়োগকারী পোর্টাল",
    productBoardTitle: "বায়ো-কম্পোজিট বা জৈব-মিশ্র নির্মাণ বোর্ড",
    productBoardDesc: "মূলী বাঁশ এবং আনারসের আঁশ থেকে তৈরি প্রিমিয়াম ও দীর্ঘস্থায়ী বৃক্ষহীন নির্মাণ বোর্ড। এটি উইপোকা-প্রতিরোধী, নিষ্কাশন উপযোগী এবং আমদানিকৃত প্লাইউড অপেক্ষা ৫৪% পর্যন্ত সাশ্রয়ী।",
    pBoardFeats: ["IS:১২৪০৬ সার্টিফাইড", "উইপোকা ও অগ্নি প্রতিরোধী", "৫৪% নির্মাণ ব্যয় হ্রাস"],
    pBoardComp: "৬০% মূলী বাঁশের আঁশ, ৩০% আনারসের পাতার আঁশ (PALF), ১০% জৈব-ভিত্তিক রেজিন",
    pBoardUses: ["সাশ্রয়ী আবাসন প্রকল্প", "মডুলার আসবাবপত্র", "প্রিফেব্রিকেটেড ঘরবাড়ি"],
    productCutleryTitle: "উচ্চ-চাহিদা সম্পন্ন পচনশীল থালা ও টেবিলসামগ্রী",
    productCutleryDesc: "স্থানীয় বাঁশ ও আনারসের বর্জ্য থেকে উচ্চ তাপে তৈরি রাজকীয় পরিবেশবান্ধব থালা, বাটি ও খাবার ট্রে। ১০০% সম্পূর্ণ পচনশীল, জল-প্রতিরোধী এবং ১২ মাস স্থায়িত্ব। বিয়েবাড়ি ও কর্পোরেট ইভেন্টে উচ্চ মুনাফা সরবরাহকারী।",
    productPackagingTitle: "মাইসেলিয়াম প্যাকেজিং",
    productPackagingDesc: "সম্পূর্ণ জৈব উপায়ে তৈরি প্যাকেজিং সリューション যেমন ব্যাগ, ট্রে এবং সুরক্ষা ফোম। অত্যন্ত সুরক্ষাদায়ক ও ই-কমার্সের উপযোগী।",
    productFilmsTitle: "কম্পোস্টেবল ফিল্মস",
    productFilmsDesc: "খুচরা ব্যবসার থলি এবং সুরক্ষামূলক মোড়কের পরিবেশবান্ধব বিকল্প। সাশ্রয়ী মূল্যে প্লাস্টিকের স্থান দখলকারী এক বিশেষ উদ্ভাবন।",
    pCutleryFeats: ["১০০% ঘরোয়াভাবে পচনশীল", "উচ্চ তাপ ও তেল প্রতিরোধী", "উচ্চ-মুনাফা বিয়ে ও উৎসবের উপযোগী"],
    pCutleryComp: "৭০% ধানের তুষ ও বাঁশ ফাইবার, ২৫% আখের বর্জ্য, ৫% প্রাকৃতিক স্টার্চ বাইন্ডার",
    pCutleryUses: ["কাস্টম ক্যাটারার্স", "এয়ারলাইন ক্যাটারিং", "সবুজ শুভ বিবাহ ও মেলা"],
    pPackagingFeats: ["৩ মাসের মধ্যে শতভাগ পচনশীল", "চমৎকার আঘাত শোষণকারী", "শূন্য জলীয় ঋণ"],
    pPackagingComp: "আনারস বর্জ্য কাঁচামালে উৎপাদিত উন্নত মাইসেলিয়াম মিশ্রণ",
    pPackagingUses: ["ইলেকট্রনিক্স সরঞ্জাম মোড়ক", "সুগন্ধি বিলাসবহুল বক্স", "কাঁচ বা তরল পাত্র"],
    pFilmsFeats: ["উচ্চ প্রসার্য শক্তি", "সাশ্রয়ী মানের এক্সট্রুশন", "সম্পূর্ণ বিষাক্ত উপাদান মুক্ত"],
    pFilmsComp: "আলুর স্টার্চ এবং বাঁশের মাইক্রো-সেলুলোজ সংমিশ্রণ",
    pFilmsUses: ["ই-কমার্স মেলিং প্যাকেট", "ফল ও সবজির মোড়ক", "পোশাকের ব্যাগ"],
    valueProposition: "মূল্য প্রস্তাবনা",
    costSavings: "খরচ সাশ্রয়",
    importedPlywoodLabel: "আমদানিকৃত প্লাইউড",
    greenToGoldLabel: "গ্রিন-টু-গোল্ড",
    costSavingsDetail: "* ত্রিপুরার জন্য নির্মাণ সামগ্রীর খরচ ৫৪% হ্রাস।",
    carbonImpactLabel: "কার্বন প্রভাব",
    co2PerBoard: "প্রতি বোর্ডে CO2e",
    carbonImpactDetail: "টেকসই নির্মাণ বোর্ডে বাঁশ এবং আনারসের বর্জ্য ধরে রেখে নেট-নেতিবাচক কার্বন ফুটপ্রিন্ট তৈরি করা।",
    netZeroPledge: "* স্থানীয় পদক্ষেপের মাধ্যমে ভারতের নেট জিরো ২০৭০ প্রতিশ্রুতিকে সমর্থন করা।",
    tonnesWasteSaved: "টন বর্জ্য বাঁচানো হয়েছে",
    jobsPerFactory: "প্রতিটি ক্ষুদ্র কারখানায় কর্মসংস্থান",
    roadmapBadge: "পরিকল্পিত বাস্তবায়ন",
    roadmapTitle: "ক্রমপ্রসারণ রোডম্যাপ",
    roadmapSteps: [
      {
        phase: "পর্যায় ১: যাচাইকরণ",
        title: "পাইলট ইউনিট",
        time: "বর্তমান — ১২ মাস",
        items: ["ঊনকোটি জেলা পাইলট ইউনিট", "পচনশীল থালা ও পরিবেশবান্ধব বোর্ড", "রাজস্ব: ৪.৮-৬.৮ লক্ষ/মাস (থালা বিক্রয়ে অধিক লাভ)", "১৮-২৫টি গ্রামীণ কর্মসংস্থান"]
      },
      {
        phase: "পর্যায় ২: সম্প্রসারণ",
        title: "পণ্য বৃদ্ধি",
        time: "৬-১৮ মাস",
        items: ["পচনশীল থালা-বাসন ও কাটলারী ফোকাস", "আনারস ফাইবারের টেবিল কভার", "কাগজ তৈরির সম্ভাব্যতা যাচাই", "ওএনডিসি (ONDC) বাজারে প্রবেশ"]
      },
      {
        phase: "পর্যায় ৩: অনুলিপি করণ",
        title: "সমগ্র ত্রিপুরা জুড়ে",
        time: "১৮-৩৬ মাস",
        items: ["প্রতি জেলায় একটি করে ইউনিট (মোট ৮টি)", "সম্ভাব্য রাজস্ব: ৫২-৭৫ লক্ষ/মাস (থালা বিক্রয়ে অধিক লাভ)", "১৮০-২৫০টি সরাসরি কাজের সুযোগ", "বাংলাদেশ রপ্তানির করিডোর"]
      },
      {
        phase: "পর্যায় ৪: আন্তর্জাতিক প্রসার",
        title: "রপ্তানি ও আসবাবপত্র",
        time: "২০২৭ পরবর্তী",
        items: ["বাঁশের স্তরিত কাঠ উৎপাদন", "সম্পূর্ণ ক্রাফট পেপার উৎপাদন", "যাচাইকৃত কার্বন ক্রেডিট টোকেন", "আইকেয়া (IKEA) সরবরাহ শৃঙ্খল লক্ষ্য"]
      }
    ],
    processBadge: "গোপনীয় প্রক্রিয়াকরণ নথি",
    processManualTitle: "সম্পূর্ণ শিল্প বাস্তবায়ন নির্দেশিকা",
    viewPdfMode: "পিডিএফ ভিউ মোড",
    manualTOC: "সূচিপত্র",
    tcChapters: [
      "I. কার্যনির্বাহী সারসংক্ষেপ",
      "II. উপাদান বিজ্ঞান",
      "III. উত্পাদন পর্যায়সমূহ",
      "IV. মান ও পরিবেশ সামাজিক শাসন (ESG)"
    ],
    revRuralText: "গ্রামীণ শিল্পের এক অভূতপূর্ব রূপান্তর।",
    blueprintText: "এই নির্দেশিকাটি এটিএসএফওয়াই টেকনোলজিসের অধীনে সমস্ত খামার-ভিত্তিক ক্ষুদ্র কারখানার পরিচালনা নীলনকশা হিসাবে কাজ করে।",
    pdfTitle: "বাস্তবায়ন_নির্দেশিকা_v1.pdf",
    ofText: "এর মধ্যে",
    confidentialLabel: "গোপনীয় শিল্প নির্দেশিকা নথি",
    page1Title: "I. কার্যনির্বাহী সারসংক্ষেপ ও বাজারের কার্যপ্রণালী",
    page1P1: "ত্রিপুরা এক জটিল 'প্লাইউড প্যারাডক্স'-এর অধীনে কাজ করে: ১,৫০০ কিমি দূরে থেকে বর্গফুটে ১০২ টাকা দরে নির্মাণ সামগ্রী আমদানি করার সাথে সাথেই নিজের মাঠে উৎপাদিত কাঁচা সম্পদ পুড়িয়ে ফেলে।",
    page1SiliLabel: "শিলিগুড়ি করিডোর আমদানি",
    page1FarmLabel: "খামার-ভিত্তিক উৎপাদন",
    page1P2: "আমাদের মডেল খামারের গেটে মডুলার, স্বল্প-শক্তি উৎপাদন ইউনিট স্থাপন করে এই বৈপরীত্যকে ভেঙে দেয়। আনারসের পাতা, ধানের তুষ ও বাঁশের মতো কৃষি বর্জ্যকে টেকসই জৈব-মিশ্র নির্মাণ সামগ্রীতে রূপান্তর করার মাধ্যমে আমরা একটি বৃত্তাকার অর্থনীতি তৈরি করি যা বর্জ্য আমদানির পরিবর্তে উচ্চ-মূল্যের পণ্য রপ্তানি করে।",
    page2Title: "II. উপাদান বিজ্ঞান ও জৈব-পরিমাপ",
    page2ThType: "উপাদানের ধরণ",
    page2ThCellulose: "সেলুলোজের পরিমাণ",
    page2ThRole: "কাঠামোগত ভূমিকা",
    page2ExtractTitle: "নিষ্কাশন বিধি",
    page2ExtractText: "৫০০ আরপিএম (RPM) গতিতে ডিকর্টিকেশন কোষের ক্ষতি ছাড়াই সর্বাধিক ফাইবার ফলন নিশ্চিত করে। ৭.২ পিএইচ (pH) মাত্রায় ধোয়ার ফলে পেক্টিন দূর হয়। বাইন্ডার মিশ্রণের আগে সৌর শুষ্করণে ১২% স্বাভাবিক আর্দ্রতা সীমায় পৌঁছাতে হবে।",
    page3Title: "III. শিল্প উত্পাদন পর্যায়সমূহ",
    page3HotPress: "তপ্ত চাপ পরামিতি",
    page3Temp: "তাপমাত্রা",
    page3Press: "চাপ",
    page3Time: "সময়",
    page3MatForming: "ম্যাট গঠন",
    page3MatFormingText: "ক্রস-ডাইরেকショナル লেয়ারিং কাঠামোগত স্থিতিশীলতা নিশ্চিত করে। আমরা জল প্রতিরোধের জন্য উচ্চ ঘনত্বের পৃষ্ঠতলের সঙ্গে গ্রাজুয়েটেড ডেনসিটি প্রোফাইল (GDP) ব্যবহার করি।",
    page3Stages: [
      { s: "০১", t: "বাইন্ডার মিশ্রণ", d: "অ্যাটমাইজড রেজিন স্প্রে সহ ঘূর্ণায়মান ড্রাম ব্লেন্ডিং। ওজনে ৮-১২% মিশ্রণ।" },
      { s: "০২", t: "ছাঁচ ঢালাই", d: "থালা-বাসন ও পাত্রের জন্য ১৩০°C তাপমাত্রায় উত্তপ্ত ছাঁচে ঢালাই।" },
      { s: "০৩", t: "চূড়ান্ত ট্রিম", d: "সাধারণ ৮x৪ ফুট আকারে ডায়মন্ড-টিপড করাত ব্যবহার করে সূক্ষ্ম কাটিং।" }
    ],
    page4Title: "IV. মান, কমপ্লায়েন্স ও পরিবেশ সামাজিক শাসন (ESG)",
    page4ComplianceTitle: "শিল্প কমপ্লায়েন্স",
    page4ComplianceItems: ["IS:১২৪০৬ (বায়ো-কম্পোজিট)", "IS:১৫৭থ৮ (তাপ প্রতিরোধ)", "এফএসএসএআই (FSSAI) নিরাপদ প্রত্যয়িত", "CARB পর্যায় ২ (শূন্য-ফরমালডিহাইড)"],
    page4SocialTitle: "সামাজিক মালিকানা",
    page4Quote: "মালিকানাই হলো গুণের জন্য সবচেয়ে বড় অনুঘটক।",
    page4Participation: "স্বনির্ভর গোষ্ঠী (SHG) অংশীদারিত্ব",
    page4Tribal: "উপজাতীয় যুব নেতৃত্ব",
    page4Equity: "সামাজিক সাম্য বা ইকুইটি",
    page4Verified: "যাচাইকৃত",
    visionBadge: "ভিশন ২০৩০",
    visionCards: [
      {
        title: "কৃষি বর্জ্য মূল্যায়ন",
        desc: "নির্মাণের বাইরেও, আমরা জৈব-এনজাইম, জৈব সার এবং বায়োচার মৃত্তিকা সংশোধনী উত্পাদন করতে বৃদ্ধি করছি।",
        details: "ত্রিপুরার অম্লীয় মৃত্তিকা নিরাময়ের সময় রাসায়নিক আমদানি নির্ভরতা কমাতে নাবার্ড (NABARD) জলবায়ু তহবিল ব্যবহার করা।"
      },
      {
        title: "নবায়নযোগ্য শক্তি কেন্দ্র",
        desc: "কৃষি পণ্যের জন্য সম্প্রদায়ভিত্তিক বায়োগ্যাস প্ল্যান্ট (SATAT স্কিম) এবং সৌর-শুকানোর ইউনিট স্থাপন করা।",
        details: "ত্রিপুরার ১২.৪৬% জিএসডিপি বৃদ্ধির লক্ষ্যমাত্রাকে ত্বরান্বিত করতে গ্রামীণ মাইক্রো-গ্রিড চালিত করা এবং এলপিজি আমদানি কমানো।"
      },
      {
        title: "দক্ষতা ও বাজারের সংযোগ",
        desc: "সরাসরি বি২বি (B2B) রপ্তানি পাইপলাইন সহ রাবার পণ্য এবং বাঁশের হস্তশিল্পের জন্য স্বনির্ভর গোষ্ঠী পরিচালিত ক্ষুদ্র কারখানা।",
        details: "ওএনডিসি (ONDC) ই-কমার্স সংহতকরণ যা বাংলাদেশের বাজারকে লক্ষ্য করে 'লখপতি দিদি'-র সংখ্যা ১ লক্ষ ছাড়িয়ে যাবে।"
      },
      {
        title: "জল ও সেচ বৃদ্ধি",
        desc: "এসডিজি ভিশন অনুসারে ২০৩০ সালের মধ্যে ৪৫% টিএসপি কাভারেজ সম্পন্ন করতে মাইক্রো-সেচ এবং বৃষ্টির জল সংগ্রহ করা।",
        details: "সারা বছর উদ্যানপালন স্বনির্ভরতার জন্য মাটির আর্দ্রতা রক্ষা করতে কৃষি-বর্জ্য ব্যবহার করা।"
      }
    ],
    infraBadge: "অবকাঠামো ও প্রযুক্তি",
    infraTitle: "খামার-ভিত্তিক ইউনিট ও ভারী যন্ত্রপাতি",
    infraSub: "প্রতিটি গ্রিন-টু-গোল্ড মিনি-ফ্যাক্টরি একটি মডুলার, স্ব-চালিত শিল্প ইউনিট যা খামারের ৫০০ মিটারের মধ্যে স্থাপন করা যায় — কোনও গ্রিড সংযোগ নেই, কোনও সরবরাহের সমস্যা নেই এবং শিলিগুড়ি করিডোরের উপর নির্ভরশীলতা নেই।",
    infraPhase1: "ধাপ ১: পাইলট ইউনিট",
    infraPhase2: "ধাপ ২: সম্প্রসারিত ইউনিট",
    infraPhase3: "ধাপ ৩: জেলা হাব",
    infraCapacity: "ক্ষমতা",
    infraPower: "শক্তি",
    infraOutput: "আউটপুট",
    infraSellsSurplus: "উদ্বৃত্ত বিক্রি",
    infraRatio: "বাইন্ডার অনুপাত",
    infraSize: "বোর্ডের আকার",
    infraMoisture: "আউটপুটের আর্দ্রতা",
    infraPressure: "চাপ",
    infraTemp: "তাপমাত্রা",
    infraFootprintTitle: "মিনি-ফ্যাক্টরি মেঝে বিন্যাস — ধাপ ১ (আয়তন: ~১,৮০০ বর্গফুট)",
    infraFootprintP2: "ধাপ ২ সংযোজন — সম্প্রসারিত বিন্যাস (আয়তন: ~৩,২০০ বর্গফুট)",
    infraFootprintP3: "ধাপ ৩ — জেলা হাব মডেল (প্রতি জেলায় ১টি করে, ২০২৭ সালের মধ্যে মোট ৮টি)",
    infraMetric1Label: "ইউনিট ব্যবহারের দক্ষতা (লক্ষ্যমাত্রা, মাস ৬)",
    infraMetric2Label: "কৃষি বর্জ্য থেকে বায়োমাস ফিডস্টক (ক্রয়কৃত বর্জ্যের তুলনায়)",
    infraMetric3Label: "বায়ো-পেল্যেট লুপের মাধ্যমে নিজস্ব শক্তি স্বনির্ভরতা",
  },
  kok: {
    heroBadge: "Tripura ni Phola-Haste Thungmung Swk",
    heroTagline: "Waste Stream ni Wealth dila",
    heroTitle1: "Agricultural Waste no",
    heroTitle2: "High-Value Green Products khlaimung.",
    heroStatNumber: "50,000+ Tons",
    heroStatText: "agri waste circular swngmungni bagwi tawi tongma",
    heroSubtitle: "Agri waste no premium biodegradable plates, organic tableware, tei high-strength bioboard raw laminated plywood alternative khlaimung — rang chom tei force kotor.",
    exploreButton: "Laman no choba phiadi",
    farmersImpacted: "১,০০০+ Cooperatives impact khlaio",
    problemBadge: "Chaitokmung kotor",
    problemTitle: "Siliguri Corridor bottleneck rang kotor",
    problem30Pct: "Tripura haste kotor raw materials raw imported plywood premium added price adding bottleneck corridor.",
    problem100k: "Tonnes kotor agri waste burning burning khlaio — pollution kotor, zero value captured.",
    problemLowest: "PMAY-U building cost high very very PMAY rates Tripura Lowest in India.",
    transBadge: "Great Transformation",
    transTitle1: "Tripura ni Field no",
    transTitle2: "Mini-Factories khlaimung.",
    treeFree: "Wa-Buphang tree free",
    lowerCarbon: "Lower Carbon offset",
    circularEconomy: "Circular Cooperatives Economy",
    solutionBadge: "Laman Choba",
    solutionTitle: "Mini-Factories Farm-gate auto-processing AI-Advisor",
    collectTitle: "Collect",
    collectDesc: "Crops waste buying ₹2,000/tonne — farmers waste adding income range.",
    processTitle: "Process",
    processDesc: "Modular mini-factory slopes rogo bamboo tei pineapple fibre board tei premium biodegradable plates compression khlaio.",
    sellTitle: "Sell",
    sellDesc: "Dual high-demand products dila: bioboards 54% cheaper than imported plywood, tei high-revenue biodegradable plates.",
    marketBadge: "Market Ready",
    marketTitle: "Engineered Products",
    specsText: "Specifications naidi",
    specsBadge: "Government grant ready",
    specsDetailBadge: "Product specifications details",
    environImpact: "Carbon offset detail",
    lifecycle: "Circular Mode",
    materialComposition: "Material structure config",
    standardsCompliance: "Global Standards Approved",
    keyApplications: "Uses kotor",
    datasheetBtn: "Technical Sheet download",
    verifiedSupplyChain: "Verified Supply Chain",
    impactBadge: "Resilience Kahmlai",
    impactTitle: "Farmer income up",
    farmerIncomeTitle: "Farmer household income +20%",
    farmerIncomeDesc: "Direct income adds monthly to families. 26k hectares farming green gold optimized.",
    communityTitle: "SHG Micro units",
    communityDesc: "ATSFY micro ventures partnership with tribal Cooperatives inside Tripura villages direct jobs.",
    zeroBurnTitle: "Zero fields burning",
    zeroBurnDesc: "No smoke, no burning, capturing carbon inside composites boards. Net Zero alignment.",
    commitmentTitle: "Tripura green targets development blueprint",
    commitmentDesc: "SDG 2030 local alignment targets.",
    visionTitle: "Vision 2030",
    moatBadge: "Moat advantage",
    moatTitle: "Competitive business moats",
    factorHeader: "Advantage factors",
    importedPlywood: "Imported Plywood",
    greenToGold: "Green to Gold ATSFY",
    factors: [
      { factor: "Transport Range Cost", old: "30-40% Premium cost added", new: "Zero cost — Farm gate collect" },
      { factor: "Sourcing material", old: "External dependencies", new: "Waste stream (Low-Cost)" },
      { factor: "Energy unit powering", old: "External Grid high tax", new: "Self powering (Bio Pellets)" },
      { factor: "Community hand", old: "No locals support", new: "SHG Operated units inside" },
      { factor: "Carbon Offset benefit", old: "Negative transportation", new: "Positive sequestration" }
    ],
    partnerBadge: "Logor Choba",
    partnerTitle: "Chwng bai logor di",
    buildGreenEconomy: "Green Economy choba rwi laidi.",
    partnerDesc: "Whether investment interest, farmer supply, or distributor agent channel partners — chwng bai kokriri baridi.",
    benefits: [
      "Access to vast agri resources Tripura",
      "Impact first returns on investments",
      "SHG led village level micro factory blueprint",
      "Zero waste circular economy leader northeast"
    ],
    footerTitle1: "Tripura green future",
    footerTitle2: "From Own Soil.",
    footerSubtitleDetail: "Choba rwi independent, green manufacturing haste baridi.",
    seedAsk: "Seed funding ask",
    by2027: "20 Units Target",
    y3Revenue: "Y3 Revenue Proj.",
    farmersImpactedFooter: "Farmers Benefitted",
    underAtsfy: "ATSFY Technologies core brand",
    copyright: "© 2026 Green-to-Gold Haste Kahmlai",
    privacy: "Privacy rule",
    terms: "Terms condition",
    investorPortal: "Investor login",
    productBoardTitle: "Bio-Composite Construction Boards",
    productBoardDesc: "Muli bamboo tei pineapple leaf organic fibre pressed durable plywood alternative. Termite proof tei water resistant, up to 54% cheaper.",
    pBoardFeats: ["IS:12406 Standard", "Termite & Fire proof", "54% Cost Saving"],
    pBoardComp: "60% Muli bamboo, 30% Pineapple fibre, 10% bio-resin",
    pBoardUses: ["PMAY-U Housing", "Modular Furniture", "Local Buildings"],
    productCutleryTitle: "Biodegradable Plates & Tableware",
    productCutleryDesc: "High demand premium dining plates, bowls tei food trays muli wa tei pineapple leaf pressed. 100% organic home-compostable and high-revenue B2B.",
    productPackagingTitle: "Mycelium Packaging",
    productPackagingDesc: "Packaging solutions trays boxes mycelium. Bio-compostable luxury packing e-commerce.",
    productFilmsTitle: "Compostable Films",
    productFilmsDesc: "Starch based carry bags roll wraps. Low cost replacing plastic bags retail.",
    pCutleryFeats: ["100% Home Degradable", "Heat proof & Oil proof", "Premium events ready"],
    pCutleryComp: "70% Rice Husk with soy-binder and bamboo fibers",
    pCutleryUses: ["Cooperative catering", "Eco hotels & Wedding halls", "Local large events"],
    pPackagingFeats: ["Compost 3 months", "Shockproof packing", "Dry shelf"],
    pPackagingComp: "Pineapple waste and premium mycelium binder",
    pPackagingUses: ["Agara luxury boxes", "Electronics boxes", "Fragile bottles"],
    pFilmsFeats: ["High strength films", "Low cost retail wrappers", "Residual non toxic"],
    pFilmsComp: "Potato starch and PLA blend micro-cellulose",
    pFilmsUses: ["Farming wraps", "Courier custom wrap", "Garment bag retail"],
    valueProposition: "Value Proposition",
    costSavings: "Rang Chom",
    importedPlywoodLabel: "Imported Plywood",
    greenToGoldLabel: "Green-to-Gold",
    costSavingsDetail: "* 54% construction material cost Tripura haste rang chom.",
    carbonImpactLabel: "Carbon Offset Impact",
    co2PerBoard: "CO2e per Board",
    carbonImpactDetail: "Net-negative carbon offset by capturing bamboo and pineapple organic waste into composite boards.",
    netZeroPledge: "* Net Zero 2070 local alignment support.",
    tonnesWasteSaved: "Kotor Waste Saved",
    jobsPerFactory: "Jobs per Factory",
    roadmapBadge: "Khunchi-Lama",
    roadmapTitle: "The Scale Roadmap",
    roadmapSteps: [
      {
        phase: "Phase 1: Validation",
        title: "Pilot Unit",
        time: "Current — Month 12",
        items: ["Unakoti district pilot", "Bioboards & degradable plates focus", "Revenue: ₹4.8–6.8L/month", "18–25 community jobs"]
      },
      {
        phase: "Phase 2: Expansion",
        title: "Product Growth",
        time: "Months 6–18",
        items: ["Moulded plates & tableware focus", "PALF table covers", "Paper pulping feasibility", "ONDC marketplace entry"]
      },
      {
        phase: "Phase 3: Replication",
        title: "Pan-Tripura",
        time: "Months 18–36",
        items: ["One unit per district (8 total)", "Revenue Potential: ₹52–75L/mo (Plates margin lift)", "180–250 direct community jobs", "Bangladesh export gateway"]
      },
      {
        phase: "Phase 4: Global Scale",
        title: "Export & Furniture",
        time: "2027 Onwards",
        items: ["Bamboo laminated lumber", "Full Kraft paper production", "Verified carbon credit tokens", "IKEA supply chain targeting"]
      }
    ],
    processBadge: "Dokhumenti Khasrang Swr",
    processManualTitle: "Munsli Samung Phola manual",
    viewPdfMode: "PDF bo nina mode",
    manualTOC: "Sini list",
    tcChapters: [
      "I. Executive Summary (Kok kotor)",
      "II. Material Science Science",
      "III. Samung Tangmung",
      "IV. Standards & ESG"
    ],
    revRuralText: "Rural munsli samung tanglai.",
    blueprintText: "Bo manual ba farm-gate samung bagwi kotor bising ATSFY Technologies rigo",
    pdfTitle: "Execution_Manual_v1.pdf",
    ofText: "ni",
    confidentialLabel: "Khasrang Swr Industrial Manual",
    page1Title: "I. Executive Summary & Market Mechanics",
    page1P1: "Tripura operates under a severe \"Plywood Paradox\": importing construction materials at ₹102/sqft from 1,500km away while burning its own raw wealth in the fields.",
    page1SiliLabel: "Siliguri Corridor Import",
    page1FarmLabel: "Farm-Gate Production",
    page1P2: "Our model collapses this contradiction by establishing modular, low-energy manufacturing units at the farm gate. By converting agricultural surplus (pineapple leaf, rice husk, bamboo) into durable bio-composites, we create a circular economy that exports high-value products instead of importing waste costs.",
    page2Title: "II. Material Science & Bio-Metrics",
    page2ThType: "Material Type",
    page2ThCellulose: "Cellulose Content",
    page2ThRole: "Structural Role",
    page2ExtractTitle: "Extraction Protocols",
    page2ExtractText: "Decortication at 500 RPM ensures maximum fibre yield without cellular degradation. Washing at pH 7.2 removes pectins. Solar drying must reach critical 12% moisture limit before binder infusion.",
    page3Title: "III. Industrial Manufacturing Stages",
    page3HotPress: "Hot Press Parameters",
    page3Temp: "TEMP",
    page3Press: "PRESS",
    page3Time: "TIME",
    page3MatForming: "Mat Forming",
    page3MatFormingText: "Cross-directional layering ensures dimensional stability. We use a graduated density profile (GDP) with higher density surface layers for water resistance.",
    page3Stages: [
      { s: "01", t: "Binder Blending", d: "Rotary drum blending with atomized resin spray. Loading 8-12% by weight." },
      { s: "02", t: "Mould Casting", d: "Cast into heated male-female moulds at 130°C for tableware products." },
      { s: "03", t: "Final Trimming", d: "Precision cutting using diamond-tipped saws to standard 8x4ft dimensions." }
    ],
    page4Title: "IV. Standards, Compliance & Social ESG",
    page4ComplianceTitle: "Industrial Compliance",
    page4ComplianceItems: ["IS:12406 (Bio-Composite)", "IS:15778 (Heat Resistance)", "FSSAI Food-Safe Certified", "CARB Phase 2 (Zero-Formaldehyde)"],
    page4SocialTitle: "Social Ownership",
    page4Quote: "Ownership is the best catalyst for quality.",
    page4Participation: "SHG Participation",
    page4Tribal: "Tribal Youth Leads",
    page4Equity: "Community Equity",
    page4Verified: "Verified",
    visionBadge: "Vision 2030",
    visionCards: [
      {
        title: "Agro-Waste Valorization",
        desc: "Beyond construction, we're ramping up to produce bio-enzymes, organic fertilizers, and biochar soil amendments.",
        details: "Leveraging NABARD climate funds to reduce chemical import dependency while healing Tripura's acidic soils."
      },
      {
        title: "Renewable Energy Hubs",
        desc: "Establishing community biogas plants (SATAT Scheme) and solar-drying units for farm produce.",
        details: "Powering rural micro-grids and cutting LPG imports to fuel Tripura's 12.46% GSDP growth targets."
      },
      {
        title: "Skill & Market Linkages",
        desc: "SHG-led micro-factories for rubber products and bamboo handicrafts with direct B2B export pipelines.",
        details: "ONDC e-commerce integration targeting Bangladesh markets, boosting 'Lakhpati Didi' numbers beyond 1 lakh."
      },
      {
        title: "Water & Irrigation Boost",
        desc: "Micro-irrigation and rainwater harvesting targeting 45% TSP coverage by 2030, per SDG Vision.",
        details: "Utilizing agro-waste mulches to conserve soil moisture for year-round horticultural self-reliance."
      }
    ],
    infraBadge: "Munsli No",
    infraTitle: "Farm-Gate Phola & Heavy Machinery",
    infraSub: "Each Green-to-Gold mini-factory ba modular, self-powered unit deployable within 500m of the farm gate — no grid connection, no logistics bottleneck.",
    infraPhase1: "Phase 1: Pilot Unit",
    infraPhase2: "Phase 2: Expanded Unit",
    infraPhase3: "Phase 3: District Hub",
    infraCapacity: "Borom (Capacity)",
    infraPower: "Power",
    infraOutput: "Output",
    infraSellsSurplus: "Sells surplus",
    infraRatio: "Resin blend ratio",
    infraSize: "Board sizing",
    infraMoisture: "Moisture MC",
    infraPressure: "Pressure",
    infraTemp: "Temp",
    infraFootprintTitle: "Mini-factory floor layout — Phase 1 (footprint: ~1,800 sq ft)",
    infraFootprintP2: "Phase 2 additions — expanded floor (footprint: ~3,200 sq ft)",
    infraFootprintP3: "Phase 3 — District hub model (one per district, 8 total by 2027)",
    infraMetric1Label: "Unit capacity utilization (target, Month 6)",
    infraMetric2Label: "Biomass feedstock from farm waste (vs purchased)",
    infraMetric3Label: "Self-energy sufficiency via bio-pellet loop",
  }
};

interface MachineDetail {
  id: string;
  iconName: string;
  name: string;
  sub: string;
  phase: "p1" | "p2" | "p3";
  tag: string;
  metricLabel: string;
  metricVal: string;
  powerLabel: string;
  powerVal: string;
  specs: { label: string; val: string }[];
  desc: string;
}

const MachineIcon = ({ name, className = "w-6 h-6" }: { name: string; className?: string }) => {
  switch (name) {
    case "Wrench": return <Wrench className={className} />;
    case "Layers": return <Layers className={className} />;
    case "Wind": return <Wind className={className} />;
    case "RefreshCw": return <RefreshCw className={className} />;
    case "Scissors": return <Scissors className={className} />;
    case "Cpu": return <Cpu className={className} />;
    case "Eye": return <Eye className={className} />;
    case "Activity": return <Activity className={className} />;
    default: return <Wrench className={className} />;
  }
};

const INFRA_MACHINES: Record<string, MachineDetail> = {
  hammermill: {
    id: "hammermill",
    iconName: "Wrench",
    name: "Hammermill Shredder",
    sub: "Feedstock preparation — first machine in the line",
    phase: "p1",
    tag: "Feedstock Prep",
    metricLabel: "Capacity",
    metricVal: "500 kg/hr",
    powerLabel: "Power",
    powerVal: "15–22 kW diesel/biomass",
    specs: [
      { label: "Throughput", val: "500 kg/hr" },
      { label: "Power source", val: "15–22 kW (biomass)" },
      { label: "Output size", val: "5–25 mm chips" },
      { label: "Operators", val: "1 SHG worker" }
    ],
    desc: "Shreds pineapple leaf (PALF), bamboo internodes, and rice husk into uniform chip sizes for downstream drying and blending. Runs on biomass-derived electricity from the pellet burner loop — zero grid dependency. Noise-enclosed housing to meet village siting requirements."
  },
  hotpress: {
    id: "hotpress",
    iconName: "Cpu",
    name: "Hot Press (Hydraulic)",
    sub: "Core machine — converts mat into board",
    phase: "p1",
    tag: "Board Formation",
    metricLabel: "Pressure",
    metricVal: "150–200 bar",
    powerLabel: "Temp",
    powerVal: "160–180 °C",
    specs: [
      { label: "Platen size", val: "4×8 ft (standard)" },
      { label: "Pressure", val: "150–200 bar" },
      { label: "Temperature", val: "160–180 °C" },
      { label: "Cycle time", val: "8–12 min/board" }
    ],
    desc: "The heart of every Green-to-Gold unit. A single-daylight hydraulic press that bonds bio-fibre mats under heat and pressure using UF or MF resin binders. Produces boards ranging from 6mm to 25mm thickness across a single 4×8 ft platen — no retooling needed. Designed for 3-shift operation with SHG labour."
  },
  dryer: {
    id: "dryer",
    iconName: "Wind",
    name: "Rotary Drum Dryer",
    sub: "Moisture reduction to < 8% before pressing",
    phase: "p1",
    tag: "Moisture Control",
    metricLabel: "Output moisture",
    metricVal: "< 8%",
    powerLabel: "Fuel",
    powerVal: "Self-fired bio-pellets",
    specs: [
      { label: "Inlet moisture", val: "Up to 65%" },
      { label: "Target output", val: "< 8% MC" },
      { label: "Drum length", val: "6–8 m" },
      { label: "Heat source", val: "Bio-pellet burner (self-fired)" }
    ],
    desc: "Reduces feedstock moisture from field-fresh levels (40–65%) to press-ready levels (<8%). Fired entirely by the on-site pellet press output — no external fuel cost. Variable residence time control ensures consistent moisture output regardless of seasonal variation in incoming biomass moisture content."
  },
  pellet: {
    id: "pellet",
    iconName: "Activity",
    name: "Pellet Press",
    sub: "Converts press cake and residue into fuel",
    phase: "p1",
    tag: "Fuel Loop",
    metricLabel: "Output",
    metricVal: "200 kg/hr pellets",
    powerLabel: "Sells surplus",
    powerVal: "₹4–6/kg",
    specs: [
      { label: "Output rate", val: "200 kg/hr" },
      { label: "Pellet diameter", val: "6–8 mm" },
      { label: "Calorific value", val: "4,200–4,800 kcal/kg" },
      { label: "Surplus sell price", val: "₹4–6 per kg" }
    ],
    desc: "Converts press cake, sawdust, and fibre fines — all waste from the main board line — into dense fuel pellets. Enough to power the dryer and other thermal processes with a surplus of ~80–100 kg/day for external sale. This creates a second revenue stream (bio-fuel) from material that would otherwise be disposed of, directly funding operating costs."
  },
  mixer: {
    id: "mixer",
    iconName: "RefreshCw",
    name: "Resin Blender / Mixer",
    sub: "Uniform binder coating on fibre mat",
    phase: "p1",
    tag: "Binder Application",
    metricLabel: "Binder ratio",
    metricVal: "8–12% UF/MF resin",
    powerLabel: "Batch size",
    powerVal: "300 kg",
    specs: [
      { label: "Binder type", val: "UF / MF / bio-binder" },
      { label: "Binder ratio", val: "8–12% by weight" },
      { label: "Batch size", val: "300 kg per cycle" },
      { label: "Mixing time", val: "4–6 minutes" }
    ],
    desc: "Ensures even distribution of urea-formaldehyde (UF) or melamine-formaldehyde (MF) resin across the shredded fibre before mat formation. Designed for future upgrade to bio-based binders (soy protein, tannin extract) to support full zero-formaldehyde certification as export markets demand it. Critical for board mechanical performance and IS 12406 compliance."
  },
  trimsaw: {
    id: "trimsaw",
    iconName: "Scissors",
    name: "Trim Saw & Edge Sander",
    sub: "Final board dimensioning and surface finish",
    phase: "p1",
    tag: "Finishing",
    metricLabel: "Board size",
    metricVal: "8×4 ft standard",
    powerLabel: "Thickness",
    powerVal: "6–25 mm range",
    specs: [
      { label: "Standard output", val: "8×4 ft boards" },
      { label: "Thickness range", val: "6–25 mm" },
      { label: "Surface finish", val: "F2 grade (sanded)" },
      { label: "Throughput", val: "40–60 boards/shift" }
    ],
    desc: "Trims pressed boards to standard market dimensions and sands both faces to F2 surface grade — the minimum required for furniture-grade and PMAY-U construction use. Edge straightness is critical for local contractor acceptance. Dust extracted and fed back to the pellet press, maintaining zero-waste processing."
  },
  moulding: {
    id: "moulding",
    iconName: "Layers",
    name: "Compression Moulding Press",
    sub: "Tableware production line addition",
    phase: "p2",
    tag: "Tableware Production",
    metricLabel: "Output",
    metricVal: "2,000–3,000 units/hr",
    powerLabel: "Material",
    powerVal: "Rice husk + bagasse",
    specs: [
      { label: "Output rate", val: "2,000–3,000 units/hr" },
      { label: "Pressure range", val: "100–150 bar" },
      { label: "Material compatibility", val: "Rice husk / bagasse mix" },
      { label: "Cycle time", val: "20–30 sec per cycle" }
    ],
    desc: "Compresses agro-waste fibre combined with biodegradable binders under high temperature and mechanical load to cast premium, water-resistant eco cutlery, tableware, and plates. Runs on bio-pellet thermal steam systems."
  },
  pulping: {
    id: "pulping",
    iconName: "Wind",
    name: "Paper Pulping Unit",
    sub: "Kraft paper production line addition",
    phase: "p2",
    tag: "Kraft Paper Stream",
    metricLabel: "Pulp grade",
    metricVal: "Semi-chemical",
    powerLabel: "Water loop",
    powerVal: "Closed-cycle (zero effluent)",
    specs: [
      { label: "Pulping grade", val: "Semi-chemical pulp" },
      { label: "Raw inputs", val: "Bamboo chips / crop stalks" },
      { label: "Water recycling", val: "98% closed loop" },
      { label: "Output moisture", val: "12% standard" }
    ],
    desc: "Transforms bamboo chips and high-lignin straw residues into robust brown unbleached paper pulp. Includes a premium closed water loop that prevents toxic effluent runoff, satisfying stringent environmental protocols for village boundaries."
  },
  extractor: {
    id: "extractor",
    iconName: "Wrench",
    name: "PALF Fibre Extractor",
    sub: "Pineapple leaf fiber decorticator",
    phase: "p2",
    tag: "Pineapple Leaf Fibre",
    metricLabel: "Fibre yield",
    metricVal: "2.5–3% of leaf weight",
    powerLabel: "Use",
    powerVal: "Table covers, geotextiles",
    specs: [
      { label: "Fibre yield", val: "2.5% to 3.0% of leaf weight" },
      { label: "Blade drum speed", val: "500–600 RPM" },
      { label: "Waste by-product", val: "Bio-slurry (fertilizer feedstock)" },
      { label: "Output moisture", val: "< 12% after solar prep" }
    ],
    desc: "High-speed rotary blade decorticator designed to scrape away outer pulp layers of agricultural pineapple leaves to harvest the high-performance cellulose fibers. Zero fiber breakage ensures peak tensile properties for mats."
  },
  laminator: {
    id: "laminator",
    iconName: "Layers",
    name: "Multi-Layer Laminator",
    sub: "Engineered board upgrades and surface finishing",
    phase: "p2",
    tag: "Board Upgrade",
    metricLabel: "Layers",
    metricVal: "Up to 5-ply",
    powerLabel: "Application",
    powerVal: "Structural panels, flooring",
    specs: [
      { label: "Ply range", val: "3-ply to 5-ply construction" },
      { label: "Lamination width", val: "Up to 5 ft standard" },
      { label: "Heat source", val: "Induction / Bio-mass oil thermal" },
      { label: "Finished grade", val: "E1 low emissions" }
    ],
    desc: "Bonds premium high-tensile veneer sheaths or decorative faces onto core composite boards. Enables multi-use modular building panels, water-resistant structural subfloors, and heavy-duty architectural structures."
  },
  bamboo: {
    id: "bamboo",
    iconName: "Layers",
    name: "Bamboo Laminated Lumber Line",
    sub: "Structural engineered lumber for premium export",
    phase: "p3",
    tag: "Structural Export",
    metricLabel: "Output",
    metricVal: "High-density structural beams",
    powerLabel: "Target",
    powerVal: "IKEA supply chain spec",
    specs: [
      { label: "Tensile rating", val: "140–235 MPa" },
      { label: "Glue pressure", val: "Over 250 bar hydraulic" },
      { label: "Target certification", val: "IKEA supply chain specs" },
      { label: "Dimensions", val: "Custom structural lengths" }
    ],
    desc: "High-density structural composite line. Presses cross-directional laminated bamboo splints into dimensional profiles that compete with tropical hardwoods. Extremely durable and carbon net-negative."
  },
  biogas: {
    id: "biogas",
    iconName: "Activity",
    name: "Biogas Digester (SATAT)",
    sub: "Off-grid organic utility energy system",
    phase: "p3",
    tag: "Renewable Energy Hub",
    metricLabel: "Input",
    metricVal: "Organic press cake + effluent",
    powerLabel: "Output",
    powerVal: "Biogas + digestate fertilizer",
    specs: [
      { label: "Methane yield", val: "60–65% concentration" },
      { label: "Slurry output", val: "1,200 kg/day organic manure" },
      { label: "Digester volume", val: "100 m³ capacity" },
      { label: "Co-product", val: "Compressed Bio-Gas (CBG)" }
    ],
    desc: "Converts organic agricultural press-cakes, sizing wash-waters, and neighborhood farm waste into clean combustion gas. Feeds on-site power generators while yielding mineral-rich organic bio-fertilizer sold to local farms."
  },
  vision: {
    id: "vision",
    iconName: "Eye",
    name: "AI Quality Vision System",
    sub: "Automated inline quality assurance & control",
    phase: "p3",
    tag: "Inline QC",
    metricLabel: "Defect detection",
    metricVal: "Camera + ML model",
    powerLabel: "Reject rate target",
    powerVal: "< 2%",
    specs: [
      { label: "Inspection rate", val: "40 frames per second" },
      { label: "Defect detection", val: "Edge cracks, delamination, void spaces" },
      { label: "Reject rate bias", val: "< 1% false positive" },
      { label: "Model latency", val: "12ms per panel" }
    ],
    desc: "Computer vision cameras combined with localized edge computing models analyze the top and bottom faces of every outgoing board. Instantly flags thickness standard anomalies and auto-diverts rejects, ensuring export compliance."
  },
  carbon: {
    id: "carbon",
    iconName: "Activity",
    name: "Carbon Credit Metering",
    sub: "Digital ledger tracking for carbon offset assets",
    phase: "p3",
    tag: "ESG Tokenization",
    metricLabel: "Standard",
    metricVal: "Verra VCS / Gold Standard",
    powerLabel: "Revenue",
    powerVal: "Verified carbon tokens",
    specs: [
      { label: "Standard spec", val: "Verra / Gold Standard methodology" },
      { label: "Tracking factor", val: "Realtime telemetry IoT hubs" },
      { label: "Net offset multiplier", val: "1.4t CO2e sequestered / tonne board" },
      { label: "Asset yield", val: "Blockchain-backed ESG tokens" }
    ],
    desc: "IoT telemetry integrated directly across shredding and thermal processes continuously tracks energy consumption and raw straw weight indexes. Generates verifiable data logs to supply global green carbon asset trading platforms."
  }
};

function LandingPage({ user }: { user: any }) {
  const [isDocOpen, setIsDocOpen] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [infraPhase, setInfraPhase] = useState<"p1" | "p2" | "p3">("p1");
  const [selectedMachineId, setSelectedMachineId] = useState<string>("hammermill");
  const { language } = useLanguage();
  const lp = LP_TRANSLATIONS[language] || LP_TRANSLATIONS.en;

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 75, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 75, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <div className="min-h-screen selection:bg-brand-orange selection:text-white print:bg-white text-brand-ink">
      <a href="#main-content" className="skip-link">Skip to main content</a>

      <Navbar />

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
                  {lp.heroBadge}
                </span>
                <div className="text-brand-orange text-sm md:text-base font-bold uppercase tracking-[0.2em] mb-3">
                  {lp.heroTagline}
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif leading-[1.05] text-brand-green mb-8 tracking-tight font-medium">
                  {lp.heroTitle1} <br />
                  <span className="italic text-brand-orange">{lp.heroTitle2}</span>
                </h1>

                {/* Highlighted Stat Badge */}
                <div className="inline-flex items-center gap-3.5 bg-brand-green/[0.03] hover:bg-brand-green/[0.05] border border-brand-green/10 rounded-2xl p-4 mb-8 transition-colors max-w-md">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-green/10 text-brand-green shrink-0">
                    <Leaf className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div className="text-left">
                    <div className="text-xl md:text-2xl font-serif font-bold text-brand-green leading-none">
                      {lp.heroStatNumber}
                    </div>
                    <div className="text-[10px] md:text-xs font-bold text-brand-green/60 uppercase tracking-wider mt-1.5">
                      {lp.heroStatText}
                    </div>
                  </div>
                </div>

                <p className="text-xl md:text-2xl text-brand-ink/70 max-w-xl mb-10 leading-relaxed">
                  {lp.heroSubtitle}
                </p>
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => {
                      const element = document.getElementById("solution");
                      if (element) element.scrollIntoView({ behavior: "smooth" });
                    }} 
                    className="bg-brand-green text-white px-8 py-4 rounded-full text-lg font-medium hover:scale-105 transition-transform flex items-center gap-3"
                  >
                    {lp.exploreButton} <ArrowRight className="w-5 h-5" aria-hidden="true" />
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
                    <span className="text-sm font-medium text-brand-green">{lp.farmersImpacted}</span>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative perspective-2000"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                {/* Product & DSS Integrated Bento Composition */}
                <motion.div 
                  style={{ rotateX, rotateY }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-brand-green/[0.02] border border-brand-green/10 rounded-[32px] shadow-2xl backdrop-blur-3xl preserve-3d"
                >
                  {/* Card 1: BioSense DSS Dashboard (Flagship AI Platform) */}
                  <div className="col-span-1 sm:col-span-2 bg-gradient-to-br from-[#0B3A2C] to-[#0F4B36] text-white rounded-[28px] p-6 md:p-8 border border-white/10 shadow-2xl relative overflow-hidden group transition-all duration-500 hover:shadow-[0_20px_50px_rgba(11,58,44,0.35)] hover:border-[#3ED97D]/20 min-h-[460px] md:min-h-[420px] flex flex-col justify-between">
                    {/* Glowing green wave particles at bottom */}
                    <div className="absolute inset-x-0 bottom-0 h-24 pointer-events-none select-none z-0 opacity-50 overflow-hidden">
                      <svg viewBox="0 0 800 100" className="w-full h-full" preserveAspectRatio="none">
                        <path d="M0,60 Q150,30 300,70 T600,40 T800,50" fill="none" stroke="#3ED97D" strokeWidth="1.5" strokeDasharray="4 6" className="animate-[dash_12s_linear_infinite]" />
                        <path d="M0,70 Q200,40 400,80 T800,60" fill="none" stroke="#6CFF9F" strokeWidth="1" strokeDasharray="2 8" opacity="0.6" />
                        <circle cx="280" cy="65" r="2" fill="#6CFF9F" className="animate-pulse" />
                        <circle cx="450" cy="50" r="1.5" fill="#3ED97D" />
                        <circle cx="150" cy="40" r="1" fill="#6CFF9F" />
                        <circle cx="620" cy="75" r="2" fill="#3ED97D" className="animate-pulse" />
                      </svg>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center h-full relative z-10 w-full">
                      {/* Left: Branding & Info */}
                      <div className="md:col-span-5 flex flex-col justify-center text-left h-full">
                        <div className="flex items-center gap-1.5 w-fit bg-white/[0.08] border border-white/10 px-3 py-1 rounded-full text-[9px] md:text-[10px] font-bold tracking-widest uppercase text-white/90 mb-4 shadow-sm backdrop-blur-md">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#3ED97D] animate-ping" />
                          <span>{language === "bn" ? "আমাদের ফ্ল্যাগশিপ প্ল্যাটফর্ম" : "OUR FLAGSHIP PLATFORM"}</span>
                        </div>
                        
                        <h4 className="font-sans text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-none">
                          BioSense DSS<span className="align-super text-[#F6B54C] text-[16px] md:text-[18px] ml-0.5 font-bold">™</span>
                        </h4>
                        
                        <p className="text-[#3ED97D] font-sans text-sm md:text-base font-semibold tracking-tight leading-snug mt-1.5 mb-3">
                          {language === "bn" ? "এআই-চালিত সিদ্ধান্ত বুদ্ধিমত্তা প্ল্যাটফর্ম" : "AI-Driven Decision Intelligence Platform"}
                        </p>
                        
                        <p className="text-white/75 font-sans text-xs md:text-sm font-normal leading-relaxed max-w-sm">
                          {language === "bn" 
                            ? "বায়োমাস সরবরাহ চেইন অপ্টিমাইজ করা, চাহিদা অনুমান করা এবং টেকসই ভবিষ্যতের জন্য মূল্য বৃদ্ধি করা।" 
                            : "Optimizing biomass supply chains, predicting demand, and maximizing value for a sustainable future."}
                        </p>
                      </div>

                      {/* Right: Premium Laptop Mockup */}
                      <div className="md:col-span-7 flex flex-col justify-center items-center relative w-full mt-4 md:mt-0">
                        {/* Soft green radial glow behind laptop */}
                        <div className="absolute w-72 h-72 bg-[#3ED97D]/15 rounded-full blur-[80px] -z-10 pointer-events-none" />
                        
                        {/* Laptop body structure */}
                        <div className="relative w-full max-w-[420px] aspect-[16/10] bg-[#1a1a1a] rounded-[16px] p-[5px] border border-white/15 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.7)] overflow-hidden">
                          {/* Inner Bezel and Screen */}
                          <div className="w-full h-full bg-[#0E1411] rounded-[11px] overflow-hidden flex text-left font-sans text-[7px] select-none border border-white/5 relative">
                            {/* Screen Left Sidebar Menu */}
                            <div className="w-[50px] bg-[#070D0B] border-r border-white/5 p-1 flex flex-col gap-[2px]">
                              {/* Sidebar Logo */}
                              <div className="flex items-center gap-1 mb-2 px-1 py-0.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#3ED97D]" />
                                <span className="text-[5px] font-black tracking-widest text-white/50 uppercase">DSS Alpha</span>
                              </div>
                              {/* Sidebar Items */}
                              {[
                                { name: "Dashboard", active: true },
                                { name: "Biomass", active: false },
                                { name: "Collection", active: false },
                                { name: "Facilities", active: false },
                                { name: "Analytics", active: false },
                                { name: "Reports", active: false },
                                { name: "Settings", active: false }
                              ].map((item, idx) => (
                                <div 
                                  key={idx} 
                                  className={`flex items-center gap-1 px-1 py-0.5 rounded cursor-pointer transition-colors ${item.active ? 'bg-[#3ED97D]/10 text-[#3ED97D] font-bold' : 'text-white/40 hover:bg-white/[0.02]'}`}
                                >
                                  <svg viewBox="0 0 24 24" className="w-1.5 h-1.5 fill-none stroke-current" strokeWidth="2.5">
                                    <rect x="3" y="3" width="7" height="9" rx="1" />
                                    <rect x="14" y="3" width="7" height="5" rx="1" />
                                    <rect x="14" y="12" width="7" height="9" rx="1" />
                                    <rect x="3" y="16" width="7" height="5" rx="1" />
                                  </svg>
                                  <span className="text-[5px] tracking-tight">{item.name}</span>
                                </div>
                              ))}
                            </div>

                            {/* Screen Right Main Workspace */}
                            <div className="flex-1 p-1.5 flex flex-col justify-between bg-[#0E1411] overflow-hidden">
                              {/* Top Bar */}
                              <div className="flex justify-between items-center mb-1 pb-0.5 border-b border-white/5">
                                <span className="text-white/90 font-bold text-[8px]">{language === "bn" ? "ড্যাশবোর্ড" : "Dashboard"}</span>
                                <span className="text-[5px] text-white/40 bg-white/[0.04] px-1 py-0.5 rounded border border-white/5">v1.5.2</span>
                              </div>

                              {/* Top Row KPI Cards */}
                              <div className="grid grid-cols-4 gap-1 mb-1">
                                {[
                                  { label: "Total Biomass", value: "12,450t", color: "text-white" },
                                  { label: "Utilized (Tons)", value: "8,320t", color: "text-white" },
                                  { label: "Available (Tons)", value: "4,130t", color: "text-white" },
                                  { label: "Util. Rate", value: "24.5%", color: "text-[#3ED97D]" }
                                ].map((card, idx) => (
                                  <div key={idx} className="bg-white/[0.01] border border-white/5 rounded-[4px] p-1 flex flex-col justify-between min-h-[26px]">
                                    <div className="text-[4.5px] text-white/40 tracking-tight leading-none scale-[0.9] origin-left">{card.label}</div>
                                    <div className={`text-[7px] font-extrabold leading-none my-0.5 ${card.color}`}>{card.value}</div>
                                    <div className="text-[4px] text-[#3ED97D] font-semibold scale-[0.8] origin-left">View Details</div>
                                  </div>
                                ))}
                              </div>

                              {/* Bottom Visual Panels */}
                              <div className="grid grid-cols-2 gap-1 flex-1 overflow-hidden">
                                {/* Left Map Panel */}
                                <div className="bg-white/[0.01] border border-white/5 rounded-[6px] p-1 flex flex-col justify-between relative overflow-hidden h-full">
                                  <div className="text-[5px] text-white/50 font-bold tracking-tight mb-1">{language === "bn" ? "বায়োমাস মানচিত্র" : "Biomass Availability Map"}</div>
                                  
                                  {/* Simulated Map Coordinates Grid */}
                                  <div className="flex-1 relative border border-white/[0.03] rounded bg-[#0b0f0d] overflow-hidden flex items-center justify-center">
                                    <div className="absolute inset-0 bg-grid-white opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '4px 4px' }} />
                                    
                                    {/* Stylized Tripura border polygon outline */}
                                    <svg viewBox="0 0 100 100" className="w-full h-full p-1 opacity-20">
                                      <path d="M 50,15 L 65,35 L 75,45 L 60,65 L 45,85 L 30,75 L 35,55 L 25,40 Z" fill="none" stroke="#3ED97D" strokeWidth="1" />
                                    </svg>

                                    {/* Flashing Location Pins */}
                                    <div className="absolute top-[30%] left-[45%] flex items-center justify-center">
                                      <span className="absolute w-2 h-2 rounded-full bg-[#3ED97D]/50 animate-ping" />
                                      <span className="w-1 h-1 rounded-full bg-[#3ED97D]" />
                                    </div>
                                    <div className="absolute top-[55%] left-[60%] flex items-center justify-center">
                                      <span className="absolute w-2 h-2 rounded-full bg-[#3ED97D]/50 animate-ping [animation-delay:0.3s]" />
                                      <span className="w-1 h-1 rounded-full bg-[#3ED97D]" />
                                    </div>
                                    <div className="absolute top-[65%] left-[38%] flex items-center justify-center">
                                      <span className="absolute w-2 h-2 rounded-full bg-[#3ED97D]/50 animate-ping [animation-delay:0.6s]" />
                                      <span className="w-1 h-1 rounded-full bg-[#3ED97D]" />
                                    </div>
                                  </div>
                                </div>

                                {/* Right Chart Panel */}
                                <div className="bg-white/[0.01] border border-white/5 rounded-[6px] p-1 flex flex-col justify-between h-full">
                                  <div className="flex justify-between items-center mb-1">
                                    <span className="text-[5px] text-white/50 font-bold tracking-tight">{language === "bn" ? "চাহিদা পূর্বাভাস" : "Demand Forecast"}</span>
                                    <span className="text-[4px] text-white/30">This Month</span>
                                  </div>

                                  {/* Recharts / SVG Sparkline */}
                                  <div className="flex-1 flex items-center justify-center bg-[#0b0f0d] rounded border border-white/[0.03] p-1">
                                    <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
                                      <defs>
                                        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                                          <stop offset="0%" stopColor="#3ED97D" stopOpacity="0.25" />
                                          <stop offset="100%" stopColor="#3ED97D" stopOpacity="0" />
                                        </linearGradient>
                                      </defs>
                                      {/* Gridlines */}
                                      <line x1="0" y1="10" x2="100" y2="10" stroke="white" strokeOpacity="0.03" strokeWidth="0.5" />
                                      <line x1="0" y1="20" x2="100" y2="20" stroke="white" strokeOpacity="0.03" strokeWidth="0.5" />
                                      <line x1="0" y1="30" x2="100" y2="30" stroke="white" strokeOpacity="0.03" strokeWidth="0.5" />
                                      {/* Sparkline Path */}
                                      <path d="M0,32 Q20,30 40,22 T70,14 T100,6" fill="none" stroke="#3ED97D" strokeWidth="1" strokeLinecap="round" />
                                      <path d="M0,32 Q20,30 40,22 T70,14 T100,6 L100,40 L0,40 Z" fill="url(#chartGrad)" />
                                      {/* Interactive Pointer */}
                                      <circle cx="100" cy="6" r="1" fill="#3ED97D" className="animate-pulse" />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Laptop Base (Anodized dark aluminum reflection base) */}
                        <div className="relative w-[110%] max-w-[450px] h-[6px] bg-[#222] rounded-b-[4px] border-t border-white/20 shadow-[0_12px_24px_-4px_rgba(0,0,0,0.8)] -mt-[1px] z-10 flex justify-center">
                          <div className="w-10 h-[2px] bg-[#111] rounded-b-[1px]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Bio-Composite Boards */}
                  <div className="bg-brand-paper/85 rounded-[24px] p-4 border border-brand-green/10 shadow-md relative overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:border-brand-green/30 min-h-[185px]">
                    <div className="absolute inset-0 z-0">
                      <img 
                        src={biocompositeBoardsImg} 
                        alt="Bio-Composite Board" 
                        className="w-full h-full object-cover opacity-20 group-hover:opacity-35 transition-opacity duration-300"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-paper via-brand-paper/70 to-transparent" />
                    </div>
                    <div className="relative z-10 flex justify-between items-start mb-2">
                      <span className="text-[9px] uppercase font-bold text-brand-green bg-brand-green/10 px-2 py-0.5 rounded-full">
                        {language === "bn" ? "বোর্ড" : "Boards"}
                      </span>
                      <span className="text-[9px] font-bold text-brand-ink/40">IS:12406</span>
                    </div>
                    <div className="relative z-10 mt-auto text-left">
                      <h5 className="font-serif text-sm font-bold text-brand-green leading-tight mb-1">
                        {language === "bn" ? "বায়ো-কম্পোজিট নির্মাণ বোর্ড" : "Bio-Composite Board"}
                      </h5>
                      <p className="text-[9px] text-brand-ink/60 leading-normal">
                        {language === "bn" ? "প্লাইউড বিকল্প, অত্যন্ত টেকসই ও সাশ্রয়ী।" : "Tree-free premium plywood substitute, waterproof & fireproof."}
                      </p>
                    </div>
                  </div>

                  {/* Card 3: Biodegradable Plates & Tableware */}
                  <div className="bg-brand-paper/85 rounded-[24px] p-4 border border-brand-green/10 shadow-md relative overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:border-brand-green/30 min-h-[185px]">
                    <div className="absolute inset-0 z-0">
                      <img 
                        src={organicDinnerwareImg} 
                        alt="Organic Tableware" 
                        className="w-full h-full object-cover opacity-20 group-hover:opacity-35 transition-opacity duration-300"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-paper via-brand-paper/70 to-transparent" />
                    </div>
                    <div className="relative z-10 flex justify-between items-start mb-2">
                      <span className="text-[9px] uppercase font-bold text-brand-orange bg-brand-orange/10 px-2 py-0.5 rounded-full">
                        {language === "bn" ? "টেবিলওয়্যার" : "Tableware"}
                      </span>
                      <span className="text-[9px] font-bold text-brand-ink/40">100% Eco</span>
                    </div>
                    <div className="relative z-10 mt-auto text-left">
                      <h5 className="font-serif text-sm font-bold text-brand-green leading-tight mb-1">
                        {language === "bn" ? "পচনশীল থালা-বাসন" : "Biodegradable Plates"}
                      </h5>
                      <p className="text-[9px] text-brand-ink/60 leading-normal">
                        {language === "bn" ? "১০০% কপোস্টযোগ্য ও পানি-প্রতিরোধী পাত্র।" : "100% home compostable, water & heat-resistant dining bowls."}
                      </p>
                    </div>
                  </div>

                  {/* Card 4: Pineapple Leaf Fiber / Raw Materials */}
                  <div className="col-span-1 sm:col-span-2 bg-gradient-to-r from-brand-paper to-brand-green/[0.04] rounded-[24px] p-4 border border-brand-green/10 shadow-md relative overflow-hidden flex items-center justify-between group transition-all duration-300 hover:border-brand-green/30">
                    <div className="flex items-center gap-4 relative z-10 text-left">
                      <div className="w-16 h-16 rounded-xl overflow-hidden shadow-sm shrink-0 border border-brand-green/10">
                        <img 
                          src={pineappleLeafFiberImg} 
                          alt="Pineapple Leaf Fiber" 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <span className="text-[8px] uppercase font-bold text-brand-green tracking-widest block mb-0.5">
                          {language === "bn" ? "উদ্বৃত্ত কৃষি উপাদান" : "Upcycled Raw Material"}
                        </span>
                        <h5 className="font-serif text-sm font-bold text-brand-green leading-tight">
                          {language === "bn" ? "আনারস পাতা ও বাঁশ তন্তু" : "Pineapple Leaf & Muli Bamboo"}
                        </h5>
                        <p className="text-[10px] text-brand-ink/60 mt-0.5">
                          {language === "bn" ? "কৃষকদের কাছ থেকে প্রতি টনে ২,০০০ টাকায় কেনা হয়।" : "Sourced from local farm waste at ₹2,000/tonne."}
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0 pr-2">
                      <div className="text-xl font-serif font-bold text-brand-orange">+20%</div>
                      <div className="text-[8px] font-bold text-brand-ink/40 uppercase tracking-tight">Farmer Income</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </header>

        {/* The Problem Section */}
        <section id="problem" className="py-24 px-6 bg-brand-green text-white relative overflow-hidden" aria-labelledby="problem-title">
          <div className="max-w-7xl mx-auto relative z-10">
            <SectionTitle id="problem-title" subtitle={lp.problemBadge} light>{lp.problemTitle}</SectionTitle>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-10 border border-white/10 rounded-3xl bg-white/5">
                <h3 className="text-6xl font-serif text-brand-orange mb-4">30-40%</h3>
                <p className="text-lg text-white/80 leading-relaxed">
                  {lp.problem30Pct}
                </p>
              </div>
              <div className="p-10 border border-white/10 rounded-3xl bg-white/5">
                <h3 className="text-6xl font-serif text-brand-orange mb-4">100k+</h3>
                <p className="text-lg text-white/80 leading-relaxed">
                  {lp.problem100k}
                </p>
              </div>
              <div className="p-10 border border-white/10 rounded-3xl bg-white/5">
                <h3 className="text-6xl font-serif text-brand-orange mb-4">{language === 'bn' ? "সর্বনিম্ন" : language === 'kok' ? "Low" : "Lowest"}</h3>
                <p className="text-lg text-white/80 leading-relaxed">
                  {lp.problemLowest}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Landscape Banner Divider */}
        <section className="relative h-[450px] md:h-[650px] overflow-hidden flex items-center">
          <div className="absolute inset-0">
            <img 
              src={tripuraPineapplePlantationImg} 
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
              <span className="text-brand-orange font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block">{lp.transBadge}</span>
              <h2 className="text-5xl md:text-8xl font-serif text-brand-green mb-10 leading-[0.95] tracking-tighter">
                {lp.transTitle1} <br />
                <span className="italic text-brand-orange">{lp.transTitle2}</span>
              </h2>
              <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-brand-ink">
                <div>
                  <div className="text-4xl font-serif text-brand-green mb-1">100%</div>
                  <div className="text-[10px] uppercase font-bold tracking-[0.2em] opacity-40">{lp.treeFree}</div>
                </div>
                <div className="h-12 w-px bg-brand-green/20 hidden md:block" />
                <div>
                  <div className="text-4xl font-serif text-brand-green mb-1">85%</div>
                  <div className="text-[10px] uppercase font-bold tracking-[0.2em] opacity-40">{lp.lowerCarbon}</div>
                </div>
                <div className="h-12 w-px bg-brand-green/20 hidden md:block" />
                <div>
                  <div className="text-4xl font-serif text-brand-green mb-1">{language === 'bn' ? "স্থানীয়" : language === 'kok' ? "Haste-Khor" : "Local"}</div>
                  <div className="text-[10px] uppercase font-bold tracking-[0.2em] opacity-40">{lp.circularEconomy}</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* The Solution Section */}
        <section id="solution" className="py-24 px-6" aria-labelledby="solution-title">
          <div className="max-w-7xl mx-auto">
            <SectionTitle id="solution-title" subtitle={lp.solutionBadge}>{lp.solutionTitle}</SectionTitle>
            
            <div className="grid lg:grid-cols-3 gap-12">
              {[
                { 
                  step: "01", 
                  title: lp.collectTitle, 
                  desc: lp.collectDesc,
                  icon: <Leaf className="w-8 h-8" aria-hidden="true" />
                },
                { 
                  step: "02", 
                  title: lp.processTitle, 
                  desc: lp.processDesc,
                  icon: <Factory className="w-8 h-8" aria-hidden="true" />
                },
                { 
                  step: "03", 
                  title: lp.sellTitle, 
                  desc: lp.sellDesc,
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
            <SectionTitle id="products-title" subtitle={lp.marketBadge}>{lp.marketTitle}</SectionTitle>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  id: "boards",
                  title: lp.productBoardTitle,
                  desc: lp.productBoardDesc,
                  tag: language === "bn" ? "সাশ্রয়ী বিকল্প" : language === "kok" ? "Low Cost" : "Ultra-Durable",
                  image: biocompositeBoardsImg,
                  features: lp.pBoardFeats,
                  composition: lp.pBoardComp,
                  certs: ["IS 12406", "ISO 9001", "CARB Phase 2"],
                  impact: language === "bn" ? "প্রতি বোর্ডে ১.৪ টন CO2e সঞ্চিত" : "Sequesters 1.4t CO2e per tonne of boards",
                  uses: lp.pBoardUses,
                  isFlagship: true
                },
                {
                  id: "tableware",
                  title: lp.productCutleryTitle,
                  desc: lp.productCutleryDesc,
                  tag: language === "bn" ? "প্লাস্টিকের বিকল্প" : language === "kok" ? "Alternative" : "Plastic Alternative",
                  image: organicDinnerwareImg,
                  features: lp.pCutleryFeats,
                  composition: lp.pCutleryComp,
                  certs: ["ISO 17088", "EN 13432", "ASTM D6400"],
                  impact: language === "bn" ? "প্রতি ১০০ ইউনিটে ২.৪ কেজি কার্বন ডাই অক্সাইড হ্রাস" : "Offsets 2.4kg CO2 per 100 units vs plastic",
                  uses: lp.pCutleryUses,
                  isFlagship: true
                },
                {
                  id: "packaging",
                  title: lp.productPackagingTitle,
                  desc: lp.productPackagingDesc,
                  tag: language === "bn" ? "আইএসও প্রত্যয়িত" : language === "kok" ? "ISO Certified" : "ISO Certified",
                  image: "https://images.unsplash.com/photo-1607349913338-fca6f7fc42d0?auto=format&fit=crop&q=80&w=800",
                  features: lp.pPackagingFeats,
                  composition: lp.pPackagingComp,
                  certs: ["OK Compost Industrial", "SGS Certified"],
                  impact: language === "bn" ? "১০০% বায়ো-ভিত্তিক, শূন্য প্লাস্টিক ফুটপ্রিন্ট" : "100% Bio-based, zero plastic footprint",
                  uses: lp.pPackagingUses,
                  isFlagship: false
                },
                {
                  id: "films",
                  title: lp.productFilmsTitle,
                  desc: lp.productFilmsDesc,
                  tag: language === "bn" ? "খুচরা উপযোগী" : language === "kok" ? "Retail Friendly" : "Retail Friendly",
                  image: "https://images.unsplash.com/photo-1634128221889-82ed6efebfc3?auto=format&fit=crop&q=80&w=800",
                  features: lp.pFilmsFeats,
                  composition: lp.pFilmsComp,
                  certs: ["OK Compost Home", "IS 17088"],
                  impact: language === "bn" ? "১৮০ দিনের কম সময়ে মহাসাগরীয় দ্রবণশীল" : "Marine-degradable in under 180 days",
                  uses: lp.pFilmsUses,
                  isFlagship: false
                }
              ].map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`bg-brand-paper rounded-3xl overflow-hidden border transition-all duration-500 group cursor-pointer relative flex flex-col justify-between ${
                    product.isFlagship 
                      ? "border-brand-orange/30 shadow-md shadow-brand-orange/5 hover:border-brand-orange hover:shadow-2xl hover:shadow-brand-orange/10" 
                      : "border-brand-green/5 hover:shadow-xl hover:border-brand-green/20"
                  }`}
                  onClick={() => setSelectedProduct(product)}
                >
                  <div>
                    <div className="h-48 overflow-hidden relative">
                      <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-brand-green/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-full text-brand-green font-bold text-xs flex items-center gap-2">
                          <Target className="w-4 h-4" />
                          {lp.specsText}
                        </div>
                      </div>
                      <div className="absolute top-4 right-4 bg-brand-green/80 backdrop-blur-md text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full">{product.tag}</div>
                      {product.isFlagship && (
                        <div className="absolute top-4 left-4 bg-brand-orange text-white text-[9px] uppercase tracking-widest font-extrabold px-2.5 py-1 rounded-md shadow-sm border border-white/20">
                          ★ FLAGSHIP
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-serif text-brand-green mb-2.5 min-h-[56px] flex items-center">{product.title}</h3>
                      <p className="text-brand-ink/60 text-xs leading-relaxed mb-4 line-clamp-3">{product.desc}</p>
                      <ul className="space-y-1.5 mb-6">
                        {product.features.slice(0, 3).map((feat, j) => (
                          <li key={j} className="flex items-center gap-2 text-[11px] font-semibold text-brand-green/80">
                            <CheckCircle2 className="w-3 h-3 text-brand-light-green shrink-0" />
                            <span className="truncate">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="p-6 pt-0">
                    <div className="pt-4 border-t border-brand-green/5 flex justify-between items-center text-xs">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-brand-orange-dark">{lp.specsBadge}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-brand-green group-hover:translate-x-1 transition-transform" />
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
                      <span className="text-xs font-bold opacity-60">{lp.verifiedSupplyChain}</span>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-1/2 p-8 md:p-14 overflow-y-auto custom-scrollbar bg-brand-paper">
                  <div className="mb-10">
                    <h4 className="text-[10px] uppercase font-bold text-brand-orange tracking-widest mb-4">{lp.specsDetailBadge}</h4>
                    <p className="text-brand-ink/60 text-lg leading-relaxed mb-6 font-serif italic">
                      "{selectedProduct.desc}"
                    </p>
                    <div className="grid grid-cols-2 gap-4 md:gap-6">
                      <div className="p-6 bg-brand-green/[0.03] rounded-3xl border border-brand-green/5">
                        <div className="text-[9px] uppercase font-bold text-brand-ink/40 mb-2">{lp.environImpact}</div>
                        <div className="text-xl font-serif text-brand-green leading-tight">{selectedProduct.impact}</div>
                      </div>
                      <div className="p-6 bg-brand-green/[0.03] rounded-3xl border border-brand-green/5">
                        <div className="text-[9px] uppercase font-bold text-brand-ink/40 mb-2">{lp.lifecycle}</div>
                        <div className="text-xl font-serif text-brand-green">{language === "bn" ? "বৃত্তাকার" : language === "kok" ? "Circular" : "Circular"}</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <h4 className="flex items-center gap-2 text-[10px] uppercase font-bold text-brand-ink/40 tracking-widest mb-4">
                        <Target className="w-4 h-4 text-brand-orange" />
                        {lp.materialComposition}
                      </h4>
                      <p className="text-sm font-medium text-brand-ink leading-relaxed p-5 bg-white rounded-2xl border border-brand-green/5 shadow-sm">
                        {selectedProduct.composition}
                      </p>
                    </div>

                    <div>
                      <h4 className="flex items-center gap-2 text-[10px] uppercase font-bold text-brand-ink/40 tracking-widest mb-4">
                        <Scale className="w-4 h-4 text-brand-orange" />
                        {lp.standardsCompliance}
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
                        {lp.keyApplications}
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
                    {lp.datasheetBtn}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Infrastructure & Machinery Section */}
        <section id="infrastructure" className="py-24 px-6 bg-white border-t border-brand-green/10" aria-labelledby="infrastructure-title">
          <div className="max-w-7xl mx-auto">
            <SectionTitle id="infrastructure-title" subtitle={lp.infraBadge || "Infrastructure"}>
              {lp.infraTitle || "Farm-Gate Units & Heavy Machinery"}
            </SectionTitle>
            
            <p className="text-brand-ink/65 text-lg max-w-3xl mb-12 -mt-4 leading-relaxed font-sans">
              {lp.infraSub || "Each Green-to-Gold mini-factory is a modular, self-powered industrial unit deployable within 500m of the farm gate — no grid connection, no logistics bottleneck, no dependency on the Siliguri Corridor."}
            </p>

            {/* Phase Tabs */}
            <div className="flex flex-wrap gap-2.5 mb-10 pb-2 border-b border-brand-green/5">
              {[
                { id: "p1", label: lp.infraPhase1 || "Phase 1: Pilot Unit" },
                { id: "p2", label: lp.infraPhase2 || "Phase 2: Expanded Unit" },
                { id: "p3", label: lp.infraPhase3 || "Phase 3: District Hub" }
              ].map(phase => (
                <button
                  key={phase.id}
                  onClick={() => {
                    setInfraPhase(phase.id as "p1" | "p2" | "p3");
                    if (phase.id === "p1") setSelectedMachineId("hammermill");
                    if (phase.id === "p2") setSelectedMachineId("moulding");
                    if (phase.id === "p3") setSelectedMachineId("bamboo");
                  }}
                  className={`text-sm font-medium px-5 py-2.5 rounded-xl transition-all cursor-pointer ${
                    infraPhase === phase.id
                      ? "bg-[#EAF3DE] text-[#3B6D11] border border-[#97C459] shadow-inner font-semibold"
                      : "bg-brand-paper hover:bg-brand-green/5 text-brand-ink/70 hover:text-brand-ink"
                  }`}
                >
                  {phase.label}
                </button>
              ))}
            </div>

            {/* Machinery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {Object.values(INFRA_MACHINES)
                .filter(m => m.phase === infraPhase)
                .map(machine => {
                  const isSelected = selectedMachineId === machine.id;
                  return (
                    <motion.div
                      key={machine.id}
                      whileHover={{ y: -3, scale: 1.01 }}
                      onClick={() => setSelectedMachineId(machine.id)}
                      className={`card-interactive p-6 rounded-2xl cursor-pointer transition-all border ${
                        isSelected 
                          ? "border-[#97C459] bg-[#EAF3DE]/40 ring-1 ring-[#97C459]/50 shadow-md" 
                          : "border-brand-green/10 bg-brand-paper/50 hover:bg-brand-paper"
                      }`}
                    >
                      <div className={`p-3 w-fit rounded-xl mb-4 ${isSelected ? "bg-[#3B6D11] text-white" : "bg-brand-green/10 text-[#3B6D11]"}`}>
                        <MachineIcon name={machine.iconName} className="w-6 h-6" />
                      </div>
                      <h4 className="text-base font-bold text-brand-ink mb-1">{machine.name}</h4>
                      <span className="inline-block text-[10px] font-semibold tracking-wider text-brand-green bg-brand-green/10 px-2 py-0.5 rounded-full mb-4 uppercase">
                        {machine.tag}
                      </span>
                      <div className="space-y-1.5 border-t border-brand-green/5 pt-3 text-[13px] text-brand-ink/70 font-sans">
                        <div>
                          <span className="font-semibold text-brand-ink">{machine.metricLabel}:</span> {machine.metricVal}
                        </div>
                        <div>
                          <span className="font-semibold text-brand-ink">{machine.powerLabel}:</span> {machine.powerVal}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
            </div>

            {/* Machine Detail Panel */}
            <AnimatePresence mode="wait">
              {selectedMachineId && INFRA_MACHINES[selectedMachineId] && (
                <motion.div
                  key={selectedMachineId}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                  className="bg-brand-paper border border-brand-green/15 rounded-3xl p-6 md:p-10 mb-12 shadow-sm"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-4">
                      <div className="p-4 bg-brand-green text-white rounded-2xl shadow-sm">
                        <MachineIcon name={INFRA_MACHINES[selectedMachineId].iconName} className="w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-brand-ink">
                          {INFRA_MACHINES[selectedMachineId].name}
                        </h3>
                        <p className="text-xs md:text-sm text-brand-ink/60 font-sans mt-0.5">
                          {INFRA_MACHINES[selectedMachineId].sub}
                        </p>
                      </div>
                    </div>
                    <div className="text-xs uppercase tracking-wider font-semibold text-brand-orange-dark bg-brand-orange/10 px-3.5 py-1.5 rounded-full self-start md:self-center">
                      {INFRA_MACHINES[selectedMachineId].tag}
                    </div>
                  </div>

                  {/* Specification grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {INFRA_MACHINES[selectedMachineId].specs.map((spec, sidx) => (
                      <div key={sidx} className="bg-white border border-brand-green/5 p-4 rounded-xl shadow-sm">
                        <div className="text-[10px] uppercase font-semibold text-brand-ink/40 tracking-wider mb-1">
                          {spec.label}
                        </div>
                        <div className="text-base font-bold text-brand-ink font-mono">
                          {spec.val}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Description text */}
                  <p className="text-base text-brand-ink/80 leading-relaxed font-sans max-w-4xl">
                    {INFRA_MACHINES[selectedMachineId].desc}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Layout Diagrams and Footprint Loop metrics */}
            <div className="bg-brand-paper/50 border border-brand-green/10 rounded-3xl p-6 md:p-10">
              <h3 className="text-lg md:text-xl font-bold text-brand-ink mb-6 flex items-center gap-2">
                <Factory className="w-5 h-5 text-brand-green" />
                {infraPhase === "p1" && (lp.infraFootprintTitle || "Mini-factory floor layout — Phase 1 (footprint: ~1,800 sq ft)")}
                {infraPhase === "p2" && (lp.infraFootprintP2 || "Phase 2 additions — expanded floor (footprint: ~3,200 sq ft)")}
                {infraPhase === "p3" && (lp.infraFootprintP3 || "Phase 3 — District hub model (one per district, 8 total by 2027)")}
              </h3>

              {infraPhase === "p1" ? (
                <div className="space-y-6">
                  {/* Phase 1 Layout Stream */}
                  <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between pb-8 border-b border-brand-green/5">
                    <div className="flex-1 bg-white border border-[#97C459]/20 p-5 rounded-2xl flex flex-col justify-between shadow-sm hover:border-[#97C459]/50 transition-colors">
                      <div className="text-xs font-semibold text-[#27500A] uppercase tracking-wider mb-2">Collection Bay</div>
                      <div className="text-[13px] text-brand-ink/70">Biomass intake & weighing at village portal</div>
                    </div>
                    <div className="flex items-center justify-center text-brand-ink/30 rotate-90 lg:rotate-0">
                      <ArrowRight className="w-6 h-6" />
                    </div>

                    <div className="flex-1 bg-white border border-[#85B7EB]/20 p-5 rounded-2xl flex flex-col justify-between shadow-sm hover:border-[#85B7EB]/50 transition-colors">
                      <div className="text-xs font-semibold text-[#0C447C] uppercase tracking-wider mb-2">Shredder + Dryer</div>
                      <div className="text-[13px] text-brand-ink/70">Fibre size reduction & automatic moisture adjustment</div>
                    </div>
                    <div className="flex items-center justify-center text-brand-ink/30 rotate-90 lg:rotate-0">
                      <ArrowRight className="w-6 h-6" />
                    </div>

                    <div className="flex-1 bg-white border border-[#85B7EB]/20 p-5 rounded-2xl flex flex-col justify-between shadow-sm hover:border-[#85B7EB]/50 transition-colors">
                      <div className="text-xs font-semibold text-[#0C447C] uppercase tracking-wider mb-2">Blender + Mat Former</div>
                      <div className="text-[13px] text-brand-ink/70">Atomizer resin blend & multi-direction mat layup</div>
                    </div>
                    <div className="flex items-center justify-center text-brand-ink/30 rotate-90 lg:rotate-0">
                      <ArrowRight className="w-6 h-6" />
                    </div>

                    <div className="flex-1 bg-white border border-[#85B7EB]/20 p-5 rounded-2xl flex flex-col justify-between shadow-sm hover:border-[#85B7EB]/50 transition-colors">
                      <div className="text-xs font-semibold text-[#0C447C] uppercase tracking-wider mb-2">Hot Press</div>
                      <div className="text-[13px] text-brand-ink/70">Unified platform panel heat composite formation</div>
                    </div>
                    <div className="flex items-center justify-center text-brand-ink/30 rotate-90 lg:rotate-0">
                      <ArrowRight className="w-6 h-6" />
                    </div>

                    <div className="flex-1 bg-white border border-[#5DCAA5]/20 p-5 rounded-2xl flex flex-col justify-between shadow-sm hover:border-[#5DCAA5]/50 transition-colors">
                      <div className="text-xs font-semibold text-[#085041] uppercase tracking-wider mb-2">Trim + Stack + QC</div>
                      <div className="text-[13px] text-brand-ink/70">Finishing dimensioning, diamond saw trim & dispatch</div>
                    </div>
                  </div>

                  {/* Power Generation Loop */}
                  <div className="bg-white border border-[#EF9F27]/25 p-5 rounded-2xl max-w-md shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-[#FAEEDA] text-[#633806] rounded-xl font-bold text-xs uppercase">Energy Loop</div>
                      <h4 className="text-sm font-bold text-brand-ink">Pellet Press & Thermal Burner</h4>
                    </div>
                    <p className="text-[13px] text-brand-ink/70 leading-relaxed">
                      Converts processing crumbs and fines into biomass fuels (self-powered system utilizing 80% bio-pellet loops).
                    </p>
                  </div>
                </div>
              ) : infraPhase === "p2" ? (
                <div className="space-y-6">
                  <p className="text-sm md:text-base text-brand-ink/70 leading-relaxed font-sans max-w-4xl bg-white border border-brand-green/5 p-6 rounded-2xl shadow-sm">
                    Phase 1 board line is fully retained with new custom product streams introduced in parallel processing bays. 
                    The brand-new tableware moulding bay runs on independent schedules utilising low-cost rice husk & local sugarcane bagasse feedstock. 
                    The custom PALF decorticator extractor furnishes both structural composites and textile loops without water debt, while 
                    the closed-cycle industrial pulper intercepts any liquid outputs, maintaining safe forest-buffer siting boundaries.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <p className="text-sm md:text-base text-brand-ink/70 leading-relaxed font-sans max-w-4xl bg-white border border-brand-green/5 p-6 rounded-2xl shadow-sm">
                    Our unique District Hub structures provide global supply chain finishing and lamination capabilities, serving 3 to 5 local 
                    satellite units. Local workers feed primary composite boards directly into heavy laminators, and the camera-assisted 
                    neural model ensures precise ISO-grade tolerances without complex laboratory setups. Low-impact SATAT digestors absorb on-site organic wastes 
                    to create local heating fuels and nutrient-dense fertilisers distributed back to SHG cooperative farmers.
                  </p>
                </div>
              )}

              {/* Footprint loops / metrics bar */}
              <div className="mt-10 pt-8 border-t border-brand-green/10 space-y-6 font-sans">
                {/* Metric 1 */}
                <div>
                  <div className="flex justify-between items-center text-xs md:text-sm mb-2 text-brand-ink/80">
                    <span className="font-semibold">{lp.infraMetric1Label || "Unit capacity utilization (target, Month 6)"}</span>
                    <span className="font-bold text-brand-green text-right">75%</span>
                  </div>
                  <div className="h-2.5 w-full bg-brand-green/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "75%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-brand-green rounded-full"
                    />
                  </div>
                </div>

                {/* Metric 2 */}
                <div>
                  <div className="flex justify-between items-center text-xs md:text-sm mb-2 text-brand-ink/80">
                    <span className="font-semibold">{lp.infraMetric2Label || "Biomass feedstock from farm waste (vs purchased)"}</span>
                    <span className="font-bold text-brand-green text-right">90%</span>
                  </div>
                  <div className="h-2.5 w-full bg-brand-green/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "90%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
                      className="h-full bg-brand-green rounded-full"
                    />
                  </div>
                </div>

                {/* Metric 3 */}
                <div>
                  <div className="flex justify-between items-center text-xs md:text-sm mb-2 text-brand-ink/80">
                    <span className="font-semibold">{lp.infraMetric3Label || "Self-energy sufficiency via bio-pellet loop"}</span>
                    <span className="font-bold text-[#EF9F27] text-right">80%</span>
                  </div>
                  <div className="h-2.5 w-full bg-[#FAEEDA] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "80%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                      className="h-full bg-[#EF9F27] rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Impact Section */}
        <section id="impact" className="py-24 px-6 bg-brand-paper relative" aria-labelledby="impact-title">
          <div className="max-w-7xl mx-auto">
            <SectionTitle id="impact-title" subtitle={lp.impactBadge}>{lp.impactTitle}</SectionTitle>
            
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-12">
                {[
                  {
                    icon: <TrendingUp className="w-8 h-8" />,
                    title: lp.farmerIncomeTitle,
                    desc: lp.farmerIncomeDesc,
                    color: "bg-brand-light-green/10 text-brand-light-green"
                  },
                  {
                    icon: <Users className="w-8 h-8" />,
                    title: lp.communityTitle,
                    desc: lp.communityDesc,
                    color: "bg-brand-orange/10 text-brand-orange"
                  },
                  {
                    icon: <ShieldCheck className="w-8 h-8" />,
                    title: lp.zeroBurnTitle,
                    desc: lp.zeroBurnDesc,
                    color: "bg-brand-green/10 text-brand-green"
                  }
                ].map((item, i) => (<motion.div 
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
                    <h3 className="text-3xl font-serif">{lp.valueProposition}</h3>
                  </div>
 
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Cost Savings Infographic */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Coins className="w-4 h-4 text-brand-orange" />
                        <span className="text-xs uppercase tracking-widest opacity-60 font-bold">{lp.costSavings}</span>
                      </div>
                      <div className="space-y-4">
                        <div className="relative">
                          <div className="flex justify-between text-[10px] uppercase tracking-tighter mb-1 opacity-40">
                            <span>{lp.importedPlywoodLabel}</span>
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
                            <span>{lp.greenToGoldLabel}</span>
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
                        {lp.costSavingsDetail}
                      </p>
                    </div>
 
                    {/* Carbon Sequestration Infographic */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Cloud className="w-4 h-4 text-brand-light-green" />
                        <span className="text-xs uppercase tracking-widest opacity-60 font-bold">{lp.carbonImpactLabel}</span>
                      </div>
                      <div className="bg-white/5 rounded-2xl p-6 border border-white/10 relative group">
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-4xl font-serif text-brand-light-green">-12kg</div>
                          <div className="w-10 h-10 bg-brand-light-green/20 rounded-full flex items-center justify-center">
                            <Leaf className="w-5 h-5 text-brand-light-green" />
                          </div>
                        </div>
                        <div className="text-sm font-medium mb-1">{lp.co2PerBoard}</div>
                        <p className="text-[10px] opacity-60 leading-tight">
                          {lp.carbonImpactDetail}
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
                        {lp.netZeroPledge}
                      </p>
                    </div>
                  </div>
 
                  {/* Bottom Stats */}
                  <div className="mt-10 pt-8 border-t border-white/10 grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-serif text-brand-orange">100k+</div>
                      <div className="text-[9px] uppercase tracking-widest opacity-40">{lp.tonnesWasteSaved}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-serif text-brand-light-green">8-12</div>
                      <div className="text-[9px] uppercase tracking-widest opacity-40">{lp.jobsPerFactory}</div>
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
            <SectionTitle id="roadmap-title" subtitle={lp.roadmapBadge}>{lp.roadmapTitle}</SectionTitle>
            
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute top-0 left-8 md:left-1/2 w-px h-full bg-brand-ink/10 -translate-x-1/2 hidden md:block" aria-hidden="true" />
              
              <div className="space-y-24">
                {(lp.roadmapSteps || []).map((step, i) => (
                  <div key={i} className={`flex flex-col md:flex-row gap-8 md:gap-0 items-center ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                    <div className="w-full md:w-1/2 px-8">
                       <motion.div 
                        initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className={`glass-card p-10 ${i % 2 === 1 ? 'text-right shadow-xl border-brand-orange/10' : 'shadow-lg'}`}
                      >
                        <span className="text-brand-orange-dark font-bold uppercase tracking-widest text-xs mb-2 block">{step.phase}</span>
                        <h3 className="text-3xl font-serif mb-1">{step.title}</h3>
                        <span className="text-brand-ink/40 text-[10px] uppercase font-bold tracking-wider mb-6 block">{step.time}</span>
                        <ul className={`space-y-3 ${i % 2 === 1 ? 'flex flex-col items-end' : ''}`}>
                          {step.items.map((item, j) => (
                            <li key={j} className="flex items-center gap-3 text-brand-ink/70 text-sm">
                              {i % 2 === 0 && <CheckCircle2 className="w-4 h-4 text-brand-light-green" aria-hidden="true" />}
                              {item}
                              {i % 2 === 1 && <CheckCircle2 className="w-4 h-4 text-brand-light-green" aria-hidden="true" />}
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
              <SectionTitle id="process-title" subtitle={lp.processBadge}>{lp.processManualTitle}</SectionTitle>
              <div className="flex gap-4 mb-6 md:mb-16">
                <button 
                  onClick={handleDownloadPDF}
                  className="flex items-center gap-3 px-8 py-4 bg-brand-ink text-white rounded-2xl hover:bg-brand-ink/90 transition-all font-medium uppercase tracking-tight text-sm shadow-lg"
                >
                  <FileText className="w-5 h-5" />
                  {lp.viewPdfMode || "View PDF Mode"}
                </button>
              </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-12 print:block">
              {/* Sidebar Navigation - Hidden in Print */}
              <div className="lg:col-span-3 space-y-4 print:hidden">
                <div className="mb-8">
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-ink/40 mb-4">{lp.manualTOC || "Table of Contents"}</h4>
                  <div className="space-y-1">
                    {[
                      { id: 1, title: lp.tcChapters?.[0] || 'I. Executive Summary', icon: <BookOpen className="w-4 h-4" /> },
                      { id: 2, title: lp.tcChapters?.[1] || 'II. Material Science', icon: <FlaskConical className="w-4 h-4" /> },
                      { id: 3, title: lp.tcChapters?.[2] || 'III. Manufacturing', icon: <Factory className="w-4 h-4" /> },
                      { id: 4, title: lp.tcChapters?.[3] || 'IV. Standards & ESG', icon: <Scale className="w-4 h-4" /> }
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
                            <div className="text-[9px] uppercase tracking-[0.3em] font-bold">{lp.confidentialLabel || "Confidential Industrial Manual"}</div>
                          </div>

                          {activePage === 1 && (
                            <div className="space-y-12">
                              <div className="space-y-4">
                                <h2 className="text-4xl md:text-5xl font-serif text-brand-green leading-tight">{lp.page1Title}</h2>
                                <div className="h-1 w-20 bg-brand-orange" />
                              </div>
                              <div className="prose prose-brand max-w-none text-brand-ink/80 space-y-8">
                                <p className="text-xl font-medium leading-relaxed text-brand-ink">
                                  {lp.page1P1}
                                </p>
                                <div className="grid grid-cols-2 gap-8 py-8">
                                  <div className="border-l-4 border-brand-ink/10 pl-6">
                                    <span className="text-[10px] uppercase font-bold tracking-widest text-brand-ink/40">{lp.page1SiliLabel}</span>
                                    <div className="text-4xl font-serif text-brand-ink mt-2">₹102<span className="text-sm opacity-50">/sqft</span></div>
                                  </div>
                                  <div className="border-l-4 border-brand-orange pl-6">
                                    <span className="text-[10px] uppercase font-bold tracking-widest text-brand-orange">{lp.page1FarmLabel}</span>
                                    <div className="text-4xl font-serif text-brand-orange mt-2">₹48<span className="text-sm opacity-50">/sqft</span></div>
                                  </div>
                                </div>
                                <p className="leading-relaxed">
                                  {lp.page1P2}
                                </p>
                              </div>
                            </div>
                          )}

                          {activePage === 2 && (
                            <div className="space-y-12">
                              <div className="space-y-4">
                                <h2 className="text-4xl font-serif text-brand-green leading-tight">{lp.page2Title}</h2>
                                <div className="h-1 w-20 bg-brand-orange" />
                              </div>
                              <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                  <thead>
                                    <tr className="border-b border-brand-green/20">
                                      <th className="py-6 font-bold text-brand-green uppercase tracking-widest text-[10px]">{lp.page2ThType}</th>
                                      <th className="py-6 font-bold text-brand-green uppercase tracking-widest text-[10px]">{lp.page2ThCellulose}</th>
                                      <th className="py-6 font-bold text-brand-green uppercase tracking-widest text-[10px]">{lp.page2ThRole}</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-brand-green/10">
                                    {[
                                      { name: language === "bn" ? "পিএএলএফ (আনারস)" : language === "kok" ? "PALF (Pineapple)" : "PALF (Pineapple)", metric: "70–82%", role: language === "bn" ? "প্রসার্য শক্তিবৃদ্ধি" : language === "kok" ? "Tensile Reinforcement" : "Tensile Reinforcement" },
                                      { name: language === "bn" ? "বাঁশের ফাইবার" : language === "kok" ? "Bamboo Fibre" : "Bamboo Fibre", metric: "52–60%", role: language === "bn" ? "মূল কাঠামোগত ম্যাট্রিক্স" : language === "kok" ? "Core Structural Matrix" : "Core Structural Matrix" },
                                      { name: language === "bn" ? "ধানের তুষ" : language === "kok" ? "Rice Husk" : "Rice Husk", metric: "20% Silica", role: language === "bn" ? "আগুন ও তাপ প্রতিরোধ" : language === "kok" ? "Fire & Heat Resistance" : "Fire & Heat Resistance" },
                                      { name: language === "bn" ? "আঁশের বর্জ্য-ঝুল (Bagasse)" : language === "kok" ? "Bagasse" : "Bagasse", metric: "45–50%", role: language === "bn" ? "থালা-বাসনের ফিলার" : language === "kok" ? "Tableware Filler" : "Tableware Filler" }
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
                                  {lp.page2ExtractTitle}
                                </h4>
                                <p className="text-sm text-brand-ink/60 leading-relaxed">
                                  {lp.page2ExtractText}
                                </p>
                              </div>
                            </div>
                          )}

                          {activePage === 3 && (
                            <div className="space-y-12">
                              <div className="space-y-4">
                                <h2 className="text-4xl font-serif text-brand-green leading-tight">{lp.page3Title}</h2>
                                <div className="h-1 w-20 bg-brand-orange" />
                              </div>
                              <div className="grid md:grid-cols-2 gap-8">
                                <div className="bg-brand-ink p-10 text-white rounded-[24px]">
                                  <Settings2 className="w-8 h-8 mb-6 text-brand-orange" />
                                  <h4 className="text-xl font-serif mb-6">{lp.page3HotPress}</h4>
                                  <div className="space-y-4 text-xs font-mono">
                                    <div className="flex justify-between border-b border-white/10 pb-2">
                                      <span className="opacity-40">{lp.page3Temp}:</span>
                                      <span className="text-brand-orange font-bold">140–180°C</span>
                                    </div>
                                    <div className="flex justify-between border-b border-white/10 pb-2">
                                      <span className="opacity-40">{lp.page3Press}:</span>
                                      <span className="text-brand-orange font-bold">2.0–4.0 MPa</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="opacity-40">{lp.page3Time}:</span>
                                      <span className="text-brand-orange font-bold">8–15 MIN</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="bg-brand-paper p-10 rounded-[24px] border border-brand-green/10">
                                  <Factory className="w-8 h-8 mb-6 text-brand-green" />
                                  <h4 className="text-xl font-serif text-brand-green mb-4">{lp.page3MatForming}</h4>
                                  <p className="text-xs text-brand-ink/60 leading-relaxed shadow-sm">
                                    {lp.page3MatFormingText}
                                  </p>
                                </div>
                              </div>
                              <div className="space-y-8 mt-12">
                                {lp.page3Stages.map((step, i) => (
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
                                <h2 className="text-4xl font-serif text-brand-green leading-tight">{lp.page4Title}</h2>
                                <div className="h-1 w-20 bg-brand-orange" />
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-8">
                                  <div className="space-y-4">
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-brand-orange-dark">{lp.page4ComplianceTitle}</h4>
                                    <div className="space-y-3">
                                      {lp.page4ComplianceItems.map((std, i) => (
                                        <div key={i} className="flex items-center gap-3 text-sm text-brand-ink/70">
                                          <ShieldCheck className="w-4 h-4 text-brand-green" />
                                          {std}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                <div className="p-8 bg-brand-paper rounded-2xl">
                                  <h4 className="text-xs font-bold uppercase tracking-widest text-brand-ink/40 mb-4">{lp.page4SocialTitle}</h4>
                                  <p className="text-sm italic text-brand-ink/60 mb-6 leading-relaxed">"{lp.page4Quote}"</p>
                                  <div className="space-y-2 text-xs">
                                     <div className="flex justify-between py-2 border-b border-brand-ink/5"><span>{lp.page4Participation}</span><span className="font-bold">60%+</span></div>
                                     <div className="flex justify-between py-2 border-b border-brand-ink/5"><span>{lp.page4Tribal}</span><span className="font-bold">85%</span></div>
                                     <div className="flex justify-between py-2"><span>{lp.page4Equity}</span><span className="font-bold">{lp.page4Verified}</span></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Footer Info */}
                          <div className="mt-20 pt-12 border-t border-brand-ink/10 flex justify-between items-center opacity-30 text-[9px] uppercase tracking-widest font-bold">
                            <span>Page {activePage} {lp.ofText} 4</span>
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
            <SectionTitle id="vision-title" subtitle={lp.visionBadge || "Vision 2030"} light>
              {language === "bn" ? "সমন্বিত ভবিষ্যতের অন্তর্দৃষ্টি" : language === "kok" ? "Moichag Khasrang" : "Integrated Future Insights"}
            </SectionTitle>
            
            <div className="grid md:grid-cols-2 gap-8">
              {lp.visionCards.map((insight, i) => {
                const visionIcons = [
                  <FlaskConical className="w-8 h-8" />,
                  <Sun className="w-8 h-8" />,
                  <ShoppingBag className="w-8 h-8" />,
                  <Droplets className="w-8 h-8" />
                ];
                const visionColors = [
                  "border-brand-light-green/20",
                  "border-brand-orange/20",
                  "border-white/10",
                  "border-brand-light-green/30"
                ];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className={`p-10 border ${visionColors[i] || "border-white/15"} rounded-[32px] bg-white/5 hover:bg-white/10 transition-all group`}
                  >
                    <div className="flex items-start justify-between mb-8">
                      <div className="p-4 bg-white/10 rounded-2xl text-white group-hover:scale-110 transition-transform">
                        {visionIcons[i] || <FlaskConical className="w-8 h-8" />}
                      </div>
                    </div>
                    <h3 className="text-3xl font-serif mb-4">{insight.title}</h3>
                    <p className="text-white/80 mb-6 leading-relaxed">{insight.desc}</p>
                    <div className="pt-6 border-t border-white/10">
                      <p className="text-sm italic text-white/50">{insight.details}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="mt-16 p-8 rounded-[40px] border border-white/20 bg-gradient-to-br from-brand-orange/20 to-transparent flex flex-col md:flex-row items-center justify-between gap-8"
            >
              <div className="text-center md:text-left">
                <h4 className="text-2xl font-serif mb-2">{lp.commitmentTitle || "Our commitment to sustainable local growth"}</h4>
                <p className="text-white/60">{lp.commitmentDesc || "Aligning with National SDG targets for 2030."}</p>
              </div>
              <div className="text-4xl font-serif text-brand-orange">{lp.visionBadge || "Vision 2030"}</div>
            </motion.div>
          </div>
        </section>

        {/* Moat Section */}
        <section className="py-24 px-6 bg-brand-ink text-white" aria-labelledby="moat-title">
          <div className="max-w-7xl mx-auto">
            <SectionTitle id="moat-title" subtitle={lp.moatBadge || "Competitive Moat"} light>{lp.moatTitle || "Why This Is Hard to Copy"}</SectionTitle>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <caption className="sr-only">Competitive comparison between Imported Plywood, Mutha Bamboowood, and Green-to-Gold</caption>
                <thead>
                  <tr className="border-b border-white/10">
                    <th scope="col" className="py-6 px-4 font-serif text-xl">{lp.factorHeader || "Factor"}</th>
                    <th scope="col" className="py-6 px-4 font-serif text-xl opacity-40">{lp.importedPlywood || "Imported Plywood"}</th>
                    <th scope="col" className="py-6 px-4 font-serif text-xl text-brand-orange">{lp.greenToGold || "Green-to-Gold"}</th>
                  </tr>
                </thead>
                <tbody className="text-sm md:text-base">
                  {lp.factors.map((row, i) => (
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
            <SectionTitle id="partner-title" subtitle={lp.partnerBadge || "Collaboration"}>{lp.partnerTitle || "Partner With Us"}</SectionTitle>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h3 className="text-4xl font-serif text-brand-green leading-tight">
                  {language === "bn" ? "আসুন একসাথে গড়ে তুলি" : language === "kok" ? "Bo bini nogo teirog" : "Let's Build the"} <br />
                  <span className="italic text-brand-orange">{language === "bn" ? "সবুজ অর্থনীতি" : language === "kok" ? "Green Economy" : "Green Economy"}</span> {language === "bn" ? "একত্রে" : language === "kok" ? "Choba wngwi" : "Together."}
                </h3>
                <p className="text-lg text-brand-ink/70 leading-relaxed">
                  {lp.partnerDesc || "Whether you are an investor looking for high-impact opportunities, a farmer with biomass waste, or a distributor ready to bring sustainable materials to the market — we want to hear from you."}
                </p>
                <div className="space-y-4">
                  {lp.benefits.map((benefit, i) => (
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
              {lp.footerTitle1} <br />
              <span className="italic text-brand-orange">{lp.footerTitle2}</span>
            </h2>
            <p className="text-xl text-brand-ink/60 max-w-2xl mx-auto mb-12">
              {lp.footerSubtitleDetail}
            </p>
            
            <div className="grid md:grid-cols-4 gap-8 mb-16">
              <div>
                <div className="text-brand-orange-dark font-serif text-4xl mb-2">₹1.5 Cr</div>
                <div className="text-xs uppercase tracking-widest opacity-60 font-bold">{lp.seedAsk}</div>
              </div>
              <div>
                <div className="text-brand-green font-serif text-4xl mb-2">20 Units</div>
                <div className="text-xs uppercase tracking-widest opacity-60 font-bold">{lp.by2027}</div>
              </div>
              <div>
                <div className="text-brand-green font-serif text-4xl mb-2">₹496L</div>
                <div className="text-xs uppercase tracking-widest opacity-60 font-bold">{lp.y3Revenue}</div>
              </div>
              <div>
                <div className="text-brand-green font-serif text-4xl mb-2">1,000+</div>
                <div className="text-xs uppercase tracking-widest opacity-60 font-bold">{lp.farmersImpactedFooter}</div>
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
              <span className="text-xs uppercase tracking-[0.3em] font-bold opacity-40">{lp.underAtsfy}</span>
            </div>
          </motion.div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-12 flex flex-col md:flex-row justify-between items-center text-xs uppercase tracking-[0.2em] font-bold opacity-40">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <span>{lp.copyright}</span>
            <span className="hidden md:inline">•</span>
            <span>{lp.underAtsfy}</span>
          </div>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a href="#" className="hover:opacity-100 transition-opacity">{lp.privacy}</a>
            <a href="#" className="hover:opacity-100 transition-opacity">{lp.terms}</a>
            <a href="#" className="hover:opacity-100 transition-opacity">{lp.investorPortal}</a>
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
        <Route path="/dss" element={<BioSenseDSS />} />
      </Routes>
    </BrowserRouter>
  );
}
