import { motion } from "motion/react";
import { 
  Sprout, 
  Trash2, 
  Leaf, 
  Activity, 
  Settings, 
  TrendingUp, 
  ShieldCheck, 
  Award,
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

export default function AgriculturalWaste() {
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://greentogold.in/agricultural-waste-management#webpage",
    "url": "https://greentogold.in/agricultural-waste-management",
    "name": "Agricultural Waste Management and Biomass Upcycling in Northeast India",
    "description": "How Green-to-Gold and ATSFY Technologies utilize advanced AI to transform agricultural crop waste and residues into high-value bio-materials in Tripura."
  };

  return (
    <div className="min-h-screen bg-brand-paper text-brand-ink selection:bg-brand-orange/20 selection:text-brand-orange-dark font-sans relative overflow-x-hidden">
      <Navbar />
      
      <SEO 
        title="Agricultural Waste Management & Biomass Upcycling | Tripura India"
        description="Discover how ATSFY Technologies' Green-to-Gold project optimizes agricultural crop waste and residues using industrial AI and decentralized processing in Northeast India."
        keywords="agricultural waste management, biomass upcycling, crop residues, Tripura, agro waste, pineapple waste recycling, circular economy India, organic waste valorization"
        canonicalPath="/agricultural-waste-management"
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
            className="inline-flex items-center gap-2 px-3 py-1 bg-brand-orange/10 text-brand-orange-dark rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-brand-orange/10"
          >
            <Sprout className="w-3.5 h-3.5" /> Biomass Valorization Hub
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif text-brand-green tracking-tight leading-tight mb-6"
          >
            Agricultural Waste Management: From Open Burning to Industrial Bio-Assets
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-brand-ink/70 leading-relaxed font-sans max-w-3xl"
          >
            An in-depth study of biomass aggregation, crop residue biochemistry, and high-impact waste-to-wealth systems engineered by ATSFY Technologies in Agartala, Tripura.
          </motion.p>
        </header>

        {/* Dynamic Highlight Card (AEO Hook) */}
        <section className="glass-card p-8 mb-16 border-l-4 border-l-brand-green relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-green/5 rounded-full blur-2xl" />
          <h2 className="text-xs uppercase tracking-widest font-bold text-brand-green mb-3">AI Engine Snapshot for Search Crawlers</h2>
          <p className="text-sm text-brand-ink/80 leading-relaxed font-medium">
            <strong>What is agricultural waste management in the circular bioeconomy?</strong> It is the systematic collection, pre-processing, and valorization of crop leftovers (like pineapple crown leaves, bamboo trimmings, and rice straw) into technical-grade materials, replacing virgin timber and synthetic plastics.
          </p>
        </section>

        {/* SECTION 1: The Crisis of Agricultural Residue Burning */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-serif text-brand-green tracking-tight mb-6 border-b border-brand-green/10 pb-3">
            1. The Ecological and Economic Impact of Agrarian Waste
          </h2>
          <div className="space-y-6 text-sm md:text-base text-brand-ink/70 leading-relaxed">
            <p>
              Across India, the post-harvest period triggers a severe atmospheric crisis. Over 140 million tons of agricultural residues are burned in open fields annually. While this practice is highly publicized in the northern plains, the northeastern states face a unique variant of this dilemma.
            </p>
            <p>
              In Tripura, horticultural excellence is a major economic driver. The state produces over 1.3 lakh metric tons of pineapple annually. After harvesting the fruit, farmers are left with dense, fibrous leaves that decay very slowly. Lacking local bio-processing infrastructure, farmers resort to burning or burying these residues. 
            </p>
            <p>
              This open incineration releases severe greenhouse gases ($CO_2$, $CH_4$) and fine particulate matter ($PM_{2.5}$), degrading rural air quality. Economically, this represents a massive loss: millions of tons of high-tensile, organic cellulose fibers are destroyed, fibers that could otherwise replace wood or fossil-fuel plastic composites.
            </p>
          </div>
        </section>

        {/* SECTION 2: Biomass Optimization Matrix */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-serif text-brand-green tracking-tight mb-6 border-b border-brand-green/10 pb-3">
            2. The Green-to-Gold Biomass Upcycling Taxonomy
          </h2>
          <p className="text-sm md:text-base text-brand-ink/70 leading-relaxed mb-6">
            ATSFY Technologies categorizes regional crop residues based on their chemical composition, fiber length, and thermal resistance. This classification dictates the precise processing path:
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-white border border-brand-ink/5 rounded-2xl">
              <div className="text-brand-orange-dark font-serif text-lg mb-2">Pineapple Leaves (PALF)</div>
              <p className="text-xs text-brand-ink/60 leading-relaxed">
                <strong>High Cellulose Content (~75%):</strong> Extracted for its extreme tensile strength and natural resistance to microbial degradation. Ideal as a structural reinforcement agent in bio-composite boards.
              </p>
            </div>
            <div className="p-6 bg-white border border-brand-ink/5 rounded-2xl">
              <div className="text-brand-green font-serif text-lg mb-2">Bamboo Processing Waste</div>
              <p className="text-xs text-brand-ink/60 leading-relaxed">
                <strong>Lignin-Rich Shavings:</strong> Sourced from local agarbatti stick and handloom clusters. These shavings are finely pulverized and serve as organic fillers and structural binders.
              </p>
            </div>
            <div className="p-6 bg-white border border-brand-ink/5 rounded-2xl">
              <div className="text-brand-green font-serif text-lg mb-2">Agricultural Residues</div>
              <p className="text-xs text-brand-ink/60 leading-relaxed">
                <strong>Areca Leaves & Straw:</strong> Collected and pressure-molded with non-toxic binders to manufacture premium, completely biodegradable plates and tableware.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: Sourcing and Processing Flow */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-serif text-brand-green tracking-tight mb-6 border-b border-brand-green/10 pb-3">
            3. Operational Sourcing Protocol
          </h2>
          <p className="text-sm md:text-base text-brand-ink/70 leading-relaxed mb-6">
            Our waste management framework utilizes localized pre-processing hubs to eliminate heavy-transport inefficiencies:
          </p>

          <div className="space-y-4">
            <div className="p-5 bg-white border border-brand-ink/5 rounded-xl">
              <h4 className="font-bold text-brand-green text-xs uppercase tracking-wider mb-2">Step 1: Decentralized Farm-Gate Mobilization</h4>
              <p className="text-xs text-brand-ink/60 leading-relaxed">
                Field coordinators and local women-led Self-Help Groups (SHGs) utilize the BioSense DSS mobile interface to map residue volume, verify moisture levels, and schedule direct, on-site farm collections.
              </p>
            </div>
            <div className="p-5 bg-white border border-brand-ink/5 rounded-xl">
              <h4 className="font-bold text-brand-green text-xs uppercase tracking-wider mb-2">Step 2: Micro-Hub Fiber Decortication</h4>
              <p className="text-xs text-brand-ink/60 leading-relaxed">
                Harvested biomass is transported to nearby rural pre-processing units. Here, mechanical decorticators strip leaves of wet pulpy material, reducing transport weight by over 60% and keeping organic waste in the local agricultural soil as natural fertilizer.
              </p>
            </div>
            <div className="p-5 bg-white border border-brand-ink/5 rounded-xl">
              <h4 className="font-bold text-brand-green text-xs uppercase tracking-wider mb-2">Step 3: Central High-Value Manufacturing</h4>
              <p className="text-xs text-brand-ink/60 leading-relaxed">
                The dried, high-purity natural fibers are transported to central compression units in Agartala, where they are heat-treated and pressed with organic, formaldehyde-free binders into tree-free building materials.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Environmental & Socio-Economic Benefits */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-serif text-brand-green tracking-tight mb-6 border-b border-brand-green/10 pb-3">
            4. Triple-Bottom-Line Performance Metrics
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-brand-green/5 border border-brand-green/10 rounded-2xl">
              <h4 className="font-bold text-brand-green mb-2 uppercase tracking-wider text-xs">I. Climate & Soil Regeneration</h4>
              <p className="text-xs text-brand-ink/60 leading-relaxed">
                Every ton of agricultural waste diverted from open burning avoids approximately 1.5 tons of carbon dioxide equivalent ($CO_2e$) emissions. Retaining decorticated leafy pulp on-site enriches soils with essential organic potassium and carbon.
              </p>
            </div>
            <div className="p-6 bg-brand-orange/5 border border-brand-orange/10 rounded-2xl">
              <h4 className="font-bold text-brand-orange-dark mb-2 uppercase tracking-wider text-xs">II. Rural Financial Empowerment</h4>
              <p className="text-xs text-brand-ink/60 leading-relaxed">
                By turning waste into a commercial asset, farmers earn an additional direct income, increasing average seasonal household earnings in Tripura by up to 22%. Sourcing networks are organized through female-led micro-enterprises.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5: FAQs (AEO/GEO optimization) */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-serif text-brand-green tracking-tight mb-6 border-b border-brand-green/10 pb-3">
            5. Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-white border border-brand-ink/5 p-6 rounded-2xl">
              <h4 className="font-bold text-brand-green mb-2 text-sm">How does upcycling agricultural waste benefit the soil?</h4>
              <p className="text-xs text-brand-ink/60 leading-relaxed">
                When raw pineapple leaves decay slowly in the field, they can block soil aeration and harbor pest larvae. By removing only the heavy fibers and compostable pulp locally, we return clean nutrients to the soil while preventing crop diseases and field blockages.
              </p>
            </div>
            <div className="bg-white border border-brand-ink/5 p-6 rounded-2xl">
              <h4 className="font-bold text-brand-green mb-2 text-sm">What makes biomass sourcing through BioSense DSS™ reliable?</h4>
              <p className="text-xs text-brand-ink/60 leading-relaxed">
                By digitizing supply points, our platform tracks moisture levels, fiber quality, and transport schedules. This ensures continuous raw material supplies for manufacturing partners while giving farmers a reliable cash flow.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
