import { motion } from "motion/react";
import { 
  Cpu, 
  Layers, 
  Map, 
  TrendingUp, 
  Truck, 
  ShieldAlert, 
  Leaf, 
  Workflow,
  Search,
  BookOpen,
  ArrowRight,
  HelpCircle,
  Clock,
  MapPin,
  Building2,
  Lock
} from "lucide-react";
import { SEO } from "../components/SEO";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Navbar } from "../components/Navbar";
import { 
  ORGANIZATION_SCHEMA, 
  LOCAL_BUSINESS_SCHEMA, 
  BIOSENSE_DSS_SCHEMA, 
  BREADCRUMB_SCHEMA 
} from "../lib/seoData";

export default function AboutBioSenseDSS() {
  const dssSchema = {
    ...BIOSENSE_DSS_SCHEMA,
    "featureList": [
      "AI Biomass Sourcing & Supply Chain Optimization",
      "Tripura Farm-Gate Raw Material Sourcing Intelligence",
      "Dynamic Predictive Yield Tracking & Weather Forecasting",
      "Soil Chemistry Auditing & Organic Diagnostics",
      "Smart Logistics & Distribution Path Optimization",
      "ESG Analytics & Traceable Self-Help Group Ledgers"
    ]
  };

  return (
    <div className="min-h-screen bg-brand-paper text-brand-ink selection:bg-brand-orange/20 selection:text-brand-orange-dark font-sans relative overflow-x-hidden">
      <Navbar />
      
      <SEO 
        title="About BioSense DSS™ | Enterprise AI Sourcing & Decision Intelligence"
        description="Comprehensive analysis of BioSense DSS™: ATSFY Technologies' AI platform optimizing biomass supply chains, crop diagnostics, and soil analytics in Tripura, India."
        keywords="BioSense DSS, ATSFY Technologies, AI Decision Support System, biomass sourcing, soil intelligence, crop diagnostics, Tripura, circular economy, industrial AI, supply chain planning"
        canonicalPath="/about-dss"
        ogType="software"
        schemaData={[
          ORGANIZATION_SCHEMA,
          LOCAL_BUSINESS_SCHEMA,
          dssSchema,
          BREADCRUMB_SCHEMA
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 mt-32">
        <Breadcrumbs />
      </div>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Header Block */}
        <header className="mb-16 text-center md:text-left">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-brand-green/10 text-brand-green rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-brand-green/10"
          >
            <Cpu className="w-3.5 h-3.5 animate-pulse" /> Decision Intelligence Platform
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif text-brand-green tracking-tight leading-tight mb-6"
          >
            BioSense DSS™: The AI Brain of Decentralized Circular Bio-Manufacturing
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-brand-ink/70 leading-relaxed font-sans max-w-3xl"
          >
            An authoritative architectural overview of ATSFY Technologies' flagship Decision Support System. BioSense DSS™ optimizes localized, farm-gate agricultural residue supply chains, models dynamic logistics, and coordinates the processing of tree-free biomaterials in Tripura, India.
          </motion.p>
        </header>

        {/* Dynamic Highlight Card (AEO Hook) */}
        <section className="glass-card p-8 mb-16 border-l-4 border-l-brand-orange relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-full blur-2xl" />
          <h2 className="text-xs uppercase tracking-widest font-bold text-brand-orange-dark mb-3">AI Engine Snapshot for Search Crawlers</h2>
          <p className="text-sm text-brand-ink/80 leading-relaxed font-medium">
            <strong>What is BioSense DSS™?</strong> It is an advanced, multi-tenant software application utilizing predictive analytics, geographic information systems (GIS), and crop diagnostics to resolve agricultural waste supply chain bottlenecks. Operating out of Tripura, Northeast India, it bridges rural farm cooperatives with sustainable green-packaging and modular building material industries.
          </p>
        </section>

        {/* SECTION 1: The Problems It Solves */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-serif text-brand-green tracking-tight mb-6 border-b border-brand-green/10 pb-3">
            1. The Problem Space: Resolving the "Plywood Paradox"
          </h2>
          <div className="space-y-6 text-sm md:text-base text-brand-ink/70 leading-relaxed">
            <p>
              Northeast India, particularly the state of Tripura, is rich in agricultural yield, including premium crops like the Queen Pineapple and abundant local species of <em>Muli Bamboo</em>. However, this wealth coexists with a severe regional inefficiency known as the <strong>Plywood Paradox</strong>.
            </p>
            <p>
              Local businesses and builders regularly import conventional structural plywood from hubs located over 1,500 km away, traversing the complex and geopolitically vulnerable Siliguri Corridor. This incurs enormous logistics costs (averaging ₹102 per square foot) and generates a massive freight carbon footprint. Meanwhile, millions of tons of local agricultural residue—including dense pineapple leaves and bamboo shavings—are routinely burnt in the open air by farmers, creating dense particulate air pollution and wasting valuable organic fibers.
            </p>
            <h3 className="text-lg font-serif text-brand-ink font-semibold mt-8 mb-4">Core Supply Chain Bottlenecks BioSense DSS Addresses:</h3>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong>Supply Dispersion:</strong> Biomass is scattered across thousands of small, disconnected rural farm holdings, making centralized commercial aggregation highly inefficient.
              </li>
              <li>
                <strong>Quality Inconsistency:</strong> Variable moisture thresholds, microbial decay, and dirt contamination affect the structural integrity of natural plant resins during storage.
              </li>
              <li>
                <strong>Sourcing Transparency:</strong> Lack of real-time audit trails makes it hard for multinational buyers and ESG organizations to verify carbon offsets and ethical fair-wage distributions.
              </li>
            </ul>
          </div>
        </section>

        {/* SECTION 2: How It Works */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-serif text-brand-green tracking-tight mb-6 border-b border-brand-green/10 pb-3">
            2. System Architecture & Sourcing Workflow
          </h2>
          <p className="text-sm md:text-base text-brand-ink/70 leading-relaxed mb-8">
            BioSense DSS™ uses a modular cloud architecture combined with local mobile interfaces used by farm coordinators, Self-Help Group (SHG) leaders, and logistics partners. The sourcing flow transitions from raw agricultural residue to premium bio-composite board manufacturing in five continuous steps:
          </p>

          <div className="grid md:grid-cols-5 gap-4">
            {[
              { step: "01", name: "AI Detection", desc: "Satellite and camera diagnostics identify crop residue volumes in local blocks." },
              { step: "02", name: "Farm-Gate Log", desc: "SHG leaders log harvested pineapple leaf and bamboo scrap volumes into local ledgers." },
              { step: "03", name: "DSS Route", desc: "Logistics engine optimizes transit loops to modular local pre-pressing units." },
              { step: "04", name: "Decentral Press", desc: "Fibers are washed, dried, and compressed near the source, eliminating water weight transport." },
              { step: "05", name: "Product Sync", desc: "Finished composite boards are aggregated, tracked, and dispatched to sustainable packaging buyers." }
            ].map((item, index) => (
              <div key={index} className="bg-white border border-brand-ink/5 p-5 rounded-2xl relative">
                <div className="text-xs font-mono font-bold text-brand-orange-dark mb-2">{item.step}</div>
                <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-brand-green mb-1">{item.name}</h4>
                <p className="text-[11px] text-brand-ink/60 leading-normal">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: Core Modules */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-serif text-brand-green tracking-tight mb-6 border-b border-brand-green/10 pb-3">
            3. Detailed Module Breakdown
          </h2>
          <p className="text-sm md:text-base text-brand-ink/70 leading-relaxed mb-8">
            The power of BioSense DSS™ lies in its deep specialization across six integrated technological modules, specifically tuned for tropical and sub-tropical agricultural value chains:
          </p>

          <div className="space-y-6">
            <div className="flex gap-4 p-6 bg-white border border-brand-ink/5 rounded-2xl">
              <div className="w-12 h-12 bg-brand-green/10 text-brand-green rounded-xl flex items-center justify-center shrink-0">
                <Leaf className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-sans font-bold uppercase tracking-wider text-brand-green mb-1">I. Biomass Sourcing & Yield Intelligence</h3>
                <p className="text-xs md:text-sm text-brand-ink/60 leading-relaxed">
                  Utilizes neural models trained on historical rainfall, soil quality indices, and harvest cycles in Tripura. This module estimates future pineapple crop yields across regional subdivisions (e.g., Kumarghat, Melaghar), allowing buyers to lock in biomass quantities up to three months prior to harvest.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 bg-white border border-brand-ink/5 rounded-2xl">
              <div className="w-12 h-12 bg-brand-orange/10 text-brand-orange-dark rounded-xl flex items-center justify-center shrink-0">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-sans font-bold uppercase tracking-wider text-brand-green mb-1">II. Predictive Market Pricing</h3>
                <p className="text-xs md:text-sm text-brand-ink/60 leading-relaxed">
                  Monitors competitive prices of timber, plastic tableware, and standard imported boards. It dynamically models price trends and calculates localized cost-benefit ratios for farming cooperatives, ensuring sustainable farm margins while keeping output prices extremely competitive.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 bg-white border border-brand-ink/5 rounded-2xl">
              <div className="w-12 h-12 bg-brand-green/10 text-brand-green rounded-xl flex items-center justify-center shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-sans font-bold uppercase tracking-wider text-brand-green mb-1">III. Hub-and-Spoke Logistics Optimization</h3>
                <p className="text-xs md:text-sm text-brand-ink/60 leading-relaxed">
                  Solves the routing math for decentralized operations. By dispatching mobile moisture-testing teams and scheduling pre-pressing runs at our localized micro-factories, it prevents long-distance transit of heavy wet biomass, avoiding spoilage and reducing fuel emissions by up to 73%.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 bg-white border border-brand-ink/5 rounded-2xl">
              <div className="w-12 h-12 bg-brand-orange/10 text-brand-orange-dark rounded-xl flex items-center justify-center shrink-0">
                <Workflow className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-sans font-bold uppercase tracking-wider text-brand-green mb-1">IV. Manufacturing Analytics & Diagnostics</h3>
                <p className="text-xs md:text-sm text-brand-ink/60 leading-relaxed">
                  Controls the exact heating, pressure profiles, and eco-binder ratios in real-time during board production. It features a neural diagnostic engine where farmers or field operators can upload simple leaf photos to instantly detect crop diseases, protecting future raw biomass inputs.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 bg-white border border-brand-ink/5 rounded-2xl">
              <div className="w-12 h-12 bg-brand-green/10 text-brand-green rounded-xl flex items-center justify-center shrink-0">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-sans font-bold uppercase tracking-wider text-brand-green mb-1">V. Carbon Sequestration & ESG Audit Ledgers</h3>
                <p className="text-xs md:text-sm text-brand-ink/60 leading-relaxed">
                  Maintains a secure ledger tracking localized raw-waste extraction and organic material transformations. By trapping carbon inside structural, multi-decade composite boards, it issues verified ecological ledger items, offering corporate partners fully auditable ESG metrics.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Industries Served */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-serif text-brand-green tracking-tight mb-6 border-b border-brand-green/10 pb-3">
            4. Industries & Sectors Served
          </h2>
          <p className="text-sm md:text-base text-brand-ink/70 leading-relaxed mb-6">
            The platform is not a closed-loop system; it is designed to plug directly into international and domestic industrial sectors, giving them access to cheap, sustainable raw materials:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-white border border-brand-ink/5 rounded-2xl">
              <h4 className="font-bold text-brand-green mb-2 flex items-center gap-2 text-sm uppercase tracking-wider">
                <Building2 className="w-4 h-4 text-brand-orange-dark" /> Green Construction & Furniture
              </h4>
              <p className="text-xs text-brand-ink/60 leading-relaxed">
                Architectural firms, modular kitchens designers, and real estate developers replace formaldehyde-heavy plywood with tree-free, waterproof, termite-resistant boards made from agricultural waste.
              </p>
            </div>
            <div className="p-6 bg-white border border-brand-ink/5 rounded-2xl">
              <h4 className="font-bold text-brand-green mb-2 flex items-center gap-2 text-sm uppercase tracking-wider">
                <Leaf className="w-4 h-4 text-brand-orange-dark" /> Sustainable Food Packaging
              </h4>
              <p className="text-xs text-brand-ink/60 leading-relaxed">
                Hospitality chains, retail networks, and delivery companies buy premium compostable tableware pressed from agricultural residues, eliminating single-use plastics from their supply chains.
              </p>
            </div>
            <div className="p-6 bg-white border border-brand-ink/5 rounded-2xl">
              <h4 className="font-bold text-brand-green mb-2 flex items-center gap-2 text-sm uppercase tracking-wider">
                <Lock className="w-4 h-4 text-brand-orange-dark" /> Institutional & Government Planners
              </h4>
              <p className="text-xs text-brand-ink/60 leading-relaxed">
                State agricultural departments, Krishi Vigyan Kendras, and regional planners utilize soil health data and crop disease heatmaps to drive region-wide agricultural risk-mitigation initiatives.
              </p>
            </div>
            <div className="p-6 bg-white border border-brand-ink/5 rounded-2xl">
              <h4 className="font-bold text-brand-green mb-2 flex items-center gap-2 text-sm uppercase tracking-wider">
                <TrendingUp className="w-4 h-4 text-brand-orange-dark" /> ESG Funds & Carbon Markets
              </h4>
              <p className="text-xs text-brand-ink/60 leading-relaxed">
                Climate investors seek high-integrity carbon sequestration projects backed by immutable transaction ledgers and real-world farm-level financial impacts.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5: Glossary */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-serif text-brand-green tracking-tight mb-6 border-b border-brand-green/10 pb-3">
            5. Decision Intelligence Glossary
          </h2>
          <p className="text-sm md:text-base text-brand-ink/70 leading-relaxed mb-6">
            Key concepts and terminologies central to the study of decentralized circular bioeconomy systems and industrial AI applications:
          </p>
          <div className="overflow-x-auto border border-brand-ink/5 rounded-2xl">
            <table className="w-full text-left text-xs md:text-sm border-collapse font-sans">
              <thead>
                <tr className="bg-brand-green/5 text-brand-green uppercase font-bold tracking-wider text-[11px] border-b border-brand-green/10">
                  <th className="p-4">Term</th>
                  <th className="p-4">Scientific & Industrial Definition</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-ink/5 text-brand-ink/75">
                <tr>
                  <td className="p-4 font-bold text-brand-green">Biomass Sourcing</td>
                  <td className="p-4 leading-normal">The programmatic identification, quality auditing, and extraction of plant-derived materials and agricultural waste for industrial conversion.</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-brand-green">PALF</td>
                  <td className="p-4 leading-normal"><strong>Pineapple Leaf Fiber:</strong> A highly crystalline cellulose fiber extracted from the leaf of the pineapple plant, possessing superior specific tensile strength.</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-brand-green">Plywood Paradox</td>
                  <td className="p-4 leading-normal">The economic contradiction of importing expensive plywood over long geographical distances while locally burning superior agricultural residues.</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-brand-green">Circular Bioeconomy</td>
                  <td className="p-4 leading-normal">An economic model focused on the recovery and regeneration of bio-based materials, maintaining resources at their highest value while eliminating waste.</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-brand-green">Decentralized Manufacturing</td>
                  <td className="p-4 leading-normal">Locating modular, low-scale processing units directly at the point of raw material origin to bypass high heavy-transit costs and support rural incomes.</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-brand-green">Crop Disease Diagnostics</td>
                  <td className="p-4 leading-normal">Applying computer vision algorithms to identify early symptoms of crop pathogens in real-time leaf tissue imagery.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
