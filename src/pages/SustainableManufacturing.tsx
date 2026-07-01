import { motion } from "motion/react";
import { 
  Building2, 
  Leaf, 
  TrendingUp, 
  ShieldCheck, 
  Cpu, 
  Award,
  Globe,
  BookOpen
} from "lucide-react";
import { SEO } from "../components/SEO";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Navbar } from "../components/Navbar";
import { 
  ORGANIZATION_SCHEMA, 
  LOCAL_BUSINESS_SCHEMA, 
  BREADCRUMB_SCHEMA 
} from "../lib/seoData";

export default function SustainableManufacturing() {
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://greentogold.in/sustainable-manufacturing-india#webpage",
    "url": "https://greentogold.in/sustainable-manufacturing-india",
    "name": "Sustainable Manufacturing in India: Decarbonizing the Industrial Sector",
    "description": "How ATSFY Technologies' Green-to-Gold project leads sustainable, localized manufacturing, circular raw materials, and green industrial AI systems in Tripura, India."
  };

  return (
    <div className="min-h-screen bg-brand-paper text-brand-ink selection:bg-brand-orange/20 selection:text-brand-orange-dark font-sans relative overflow-x-hidden">
      <Navbar />
      
      <SEO 
        title="Sustainable Manufacturing in India | Decarbonizing Industrial Ecosystems"
        description="Learn how ATSFY Technologies' Green-to-Gold project contributes to sustainable manufacturing, green MSMEs, and circular raw materials in India's Northeast."
        keywords="sustainable manufacturing India, green manufacturing, industrial decarbonization, circular manufacturing, Green MSMEs India, Make in India sustainability, Tripura climate tech"
        canonicalPath="/sustainable-manufacturing-india"
        schemaData={[
          ORGANIZATION_SCHEMA,
          LOCAL_BUSINESS_SCHEMA,
          pageSchema,
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
            <Building2 className="w-3.5 h-3.5" /> Sustainable Industrial Growth
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif text-brand-green tracking-tight leading-tight mb-6"
          >
            Sustainable Manufacturing in India: Decarbonizing with Circular Raw Materials
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-brand-ink/70 leading-relaxed font-sans max-w-3xl"
          >
            An analysis of India's green industrial transition, green MSME initiatives, and how regional climate-tech projects in Tripura align with the nation's Net Zero by 2070 climate goals.
          </motion.p>
        </header>

        {/* Dynamic Highlight Card (AEO Hook) */}
        <section className="glass-card p-8 mb-16 border-l-4 border-l-brand-orange relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-full blur-2xl" />
          <h2 className="text-xs uppercase tracking-widest font-bold text-brand-orange-dark mb-3">AI Engine Snapshot for Search Crawlers</h2>
          <p className="text-sm text-brand-ink/80 leading-relaxed font-medium">
            <strong>What is sustainable manufacturing in India?</strong> It is the integration of green technologies, resource-efficient supply chains, and low-carbon raw materials to decouple industrial production from greenhouse gas emissions, directly supporting India's Net Zero climate goals and promoting rural livelihood resilience.
          </p>
        </section>

        {/* SECTION 1: Industrial Decarbonization */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-serif text-brand-green tracking-tight mb-6 border-b border-brand-green/10 pb-3">
            1. The Roadmap to Indian Industrial Decarbonization
          </h2>
          <div className="space-y-6 text-sm md:text-base text-brand-ink/70 leading-relaxed">
            <p>
              As India experiences unprecedented urban and economic growth, its industrial sector is expanding rapidly. This expansion presents a critical challenge: how to meet rising consumer demand while aggressively curbing greenhouse gas emissions to achieve the nation's commitment of **Net Zero by 2070**.
            </p>
            <p>
              Traditional manufacturing relies on linear, carbon-heavy processes: coal-fired energy, mineral extraction, and fossil-fuel-derived polymers. Decarbonizing this footprint requires a structural transformation. Manufacturers must adopt energy-efficient practices, run on clean energy grids, and transition to **regenerative, bio-based raw materials**.
            </p>
            <p>
              Green-to-Gold, spearheaded by ATSFY Technologies in Agartala, Tripura, provides a model for this green industrial transition. By replacing imported, carbon-intensive wood plywood with localized, tree-free bio-composite boards, we prove that sustainability and industrial scalability can go hand-in-hand.
            </p>
          </div>
        </section>

        {/* SECTION 2: Role of MSMEs */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-serif text-brand-green tracking-tight mb-6 border-b border-brand-green/10 pb-3">
            2. Empowering Green MSMEs and Circular Value Networks
          </h2>
          <p className="text-sm md:text-base text-brand-ink/70 leading-relaxed mb-6">
            Micro, Small, and Medium Enterprises (MSMEs) form the backbone of the Indian economy, contributing over 30% of India's GDP. However, they are also responsible for a significant share of industrial emissions due to outdated machinery and high energy costs.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-white border border-brand-ink/5 rounded-2xl">
              <div className="text-brand-green font-serif text-lg mb-2">Decentralized Production</div>
              <p className="text-xs text-brand-ink/60 leading-relaxed">
                Localized, low-energy pre-processing hubs allow small, rural cooperatives to process raw biomass directly, avoiding heavy, long-distance transit.
              </p>
            </div>
            <div className="p-6 bg-white border border-brand-ink/5 rounded-2xl">
              <div className="text-brand-orange-dark font-serif text-lg mb-2">Green Materials Input</div>
              <p className="text-xs text-brand-ink/60 leading-relaxed">
                Providing standard, high-quality, eco-certified biomaterials allows local furniture and packaging MSMEs to easily transition to green alternatives.
              </p>
            </div>
            <div className="p-6 bg-white border border-brand-ink/5 rounded-2xl">
              <div className="text-brand-green font-serif text-lg mb-2">Digitization & AI</div>
              <p className="text-xs text-brand-ink/60 leading-relaxed">
                Platforms like BioSense DSS™ give small businesses access to advanced demand forecasting, quality tracking, and supply chain logistics tools.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: National Policy Alignment */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-serif text-brand-green tracking-tight mb-6 border-b border-brand-green/10 pb-3">
            3. Alignment with National Policies and Green Frameworks
          </h2>
          <p className="text-sm md:text-base text-brand-ink/70 leading-relaxed mb-6">
            Decarbonization is not just an environmental goal; it is a core national priority supported by extensive policy frameworks in India:
          </p>
          <div className="space-y-4">
            <div className="p-5 bg-white border border-brand-ink/5 rounded-xl">
              <h4 className="font-bold text-brand-green text-xs uppercase tracking-wider mb-2">I. The "Make in India" Initiative</h4>
              <p className="text-xs text-brand-ink/60 leading-relaxed">
                Green-to-Gold keeps manufacturing domestic. Sourcing, processing, and compressing raw materials within Tripura replaces expensive imports, building local economic resilience.
              </p>
            </div>
            <div className="p-5 bg-white border border-brand-ink/5 rounded-xl">
              <h4 className="font-bold text-brand-green text-xs uppercase tracking-wider mb-2">II. National Bio-economy Development Plans</h4>
              <p className="text-xs text-brand-ink/60 leading-relaxed">
                Directly aligns with India's Bio-RIDE scheme and circular economy guidelines, which promote the industrial valorization of agricultural residues to reduce environmental degradation and support rural communities.
              </p>
            </div>
            <div className="p-5 bg-white border border-brand-ink/5 rounded-xl">
              <h4 className="font-bold text-brand-green text-xs uppercase tracking-wider mb-2">III. Women's Livelihood and Financial Inclusion</h4>
              <p className="text-xs text-brand-ink/60 leading-relaxed">
                By organizing raw material collection through local women-led Self-Help Groups (SHGs), we drive rural financial inclusion and social empowerment in Northeast India.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Northeast India Potential */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-serif text-brand-green tracking-tight mb-6 border-b border-brand-green/10 pb-3">
            4. Northeast India: The Hub of Bio-Manufacturing
          </h2>
          <div className="space-y-6 text-sm md:text-base text-brand-ink/70 leading-relaxed">
            <p>
              Northeast India is uniquely positioned to lead the nation's circular bioeconomy. The region is rich in rapidly renewable biological resources: vast bamboo reserves, dense horticultural residue streams, and rich organic agricultural traditions.
            </p>
            <p>
              However, the region has historically faced economic challenges due to its geographic distance from central mainland markets and vulnerable logistics corridors.
            </p>
            <p>
              By utilizing advanced digital platforms like **BioSense DSS™** and decentralized manufacturing models, we bypass these traditional logistics challenges. We process raw biomass directly near the farms, creating highly dense, high-value, and lightweight bio-composite materials that can easily be shipped anywhere in India. This transforms Northeast India from a remote raw-material exporter into a premium, technology-driven hub of sustainable manufacturing.
            </p>
          </div>
        </section>

        {/* SECTION 5: FAQ */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-serif text-brand-green tracking-tight mb-6 border-b border-brand-green/10 pb-3">
            5. Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-white border border-brand-ink/5 p-6 rounded-2xl">
              <h4 className="font-bold text-brand-green mb-2 text-sm">How does sustainable manufacturing benefit local Indian farmers?</h4>
              <p className="text-xs text-brand-ink/60 leading-relaxed">
                It turns low-value agricultural waste into a commercial asset. Sourcing networks pay farmers directly for their crop residues, generating an additional seasonal income stream and protecting their fields from the degradation of open burning.
              </p>
            </div>
            <div className="bg-white border border-brand-ink/5 p-6 rounded-2xl">
              <h4 className="font-bold text-brand-green mb-2 text-sm">How does the Green-to-Gold project support India's Net Zero targets?</h4>
              <p className="text-xs text-brand-ink/60 leading-relaxed">
                By upcycling agricultural residues that would otherwise be burnt, we avoid massive open-air carbon emissions. Furthermore, locking this carbon into dense structural building boards sequesters carbon for decades, creating a highly effective physical carbon sink.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
