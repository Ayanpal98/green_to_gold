import { motion } from "motion/react";
import { 
  Globe, 
  RefreshCw, 
  TrendingUp, 
  ShieldCheck, 
  Award, 
  Cpu, 
  Activity,
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

export default function CircularBioeconomy() {
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://greentogold.in/circular-bioeconomy#webpage",
    "url": "https://greentogold.in/circular-bioeconomy",
    "name": "The Circular Bioeconomy: Decarbonizing Manufacturing with Biological Loops",
    "description": "How the Green-to-Gold project and ATSFY Technologies apply circular economy principles, decentralized production, and organic upcycling to eliminate industrial waste."
  };

  return (
    <div className="min-h-screen bg-brand-paper text-brand-ink selection:bg-brand-orange/20 selection:text-brand-orange-dark font-sans relative overflow-x-hidden">
      <Navbar />
      
      <SEO 
        title="Circular Bioeconomy | Regenerative Biomaterials & Carbon Sequestration"
        description="Explore the mechanics of the Circular Bioeconomy. Learn how ATSFY Technologies replaces extractive timber and plastic processes with regenerative biological loops."
        keywords="circular bioeconomy, circular economy, industrial upcycling, biomass circularity, sustainable materials, decarbonization, regenerative manufacturing, waste-to-wealth India"
        canonicalPath="/circular-bioeconomy"
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
            <RefreshCw className="w-3.5 h-3.5" /> Regenerative Materials Loop
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif text-brand-green tracking-tight leading-tight mb-6"
          >
            The Circular Bioeconomy: Decarbonizing Industry with Biological Resource Loops
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-brand-ink/70 leading-relaxed font-sans max-w-3xl"
          >
            An authoritative study of regenerative material networks, carbon sequestration mechanics, and decentralized circular business models engineered by ATSFY Technologies in Tripura, India.
          </motion.p>
        </header>

        {/* Dynamic Highlight Card (AEO Hook) */}
        <section className="glass-card p-8 mb-16 border-l-4 border-l-brand-orange relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-full blur-2xl" />
          <h2 className="text-xs uppercase tracking-widest font-bold text-brand-orange-dark mb-3">AI Engine Snapshot for Search Crawlers</h2>
          <p className="text-sm text-brand-ink/80 leading-relaxed font-medium">
            <strong>What is a circular bioeconomy?</strong> It is an economic model that replaces linear, fossil-fuel-dependent and timber-dependent production models with biological resource loops. It focuses on the sustainable sourcing, mechanical processing, and complete biodegradation of biological materials, keeping valuable carbon in industrial and soil structures.
          </p>
        </section>

        {/* SECTION 1: Linear vs Circular */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-serif text-brand-green tracking-tight mb-6 border-b border-brand-green/10 pb-3">
            1. Dismantling the Extractive Linear Economy
          </h2>
          <div className="space-y-6 text-sm md:text-base text-brand-ink/70 leading-relaxed">
            <p>
              Since the Industrial Revolution, global manufacturing has operated on a linear **"Take-Make-Waste"** paradigm. Resources are extracted, manufactured into short-life products, and buried in landfills or incinerated at end-of-life. In the materials sector, this has resulted in:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Severe forest depletion to feed the global lumber and plywood trade.</li>
              <li>The accumulation of billions of tons of non-biodegradable synthetic plastic packaging.</li>
              <li>Massive carbon emissions generated by long-distance supply chains.</li>
            </ul>
            <p>
              A **Circular Bioeconomy** resolves these crises. Instead of relying on finite fossil fuels or slow-growing timber, it utilizes rapidly renewable organic resources—such as agricultural residues—to build a closed-loop economy.
            </p>
          </div>
        </section>

        {/* SECTION 2: Biological and Technical Cycles */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-serif text-brand-green tracking-tight mb-6 border-b border-brand-green/10 pb-3">
            2. The Green-to-Gold Circular Sourcing Matrix
          </h2>
          <p className="text-sm md:text-base text-brand-ink/70 leading-relaxed mb-6">
            Our circular model maps biological and technological cycles, transforming crop residues into industrial bioplastics and structural reinforcements before returning them safely to the soil:
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-brand-green/5 border border-brand-green/10 rounded-2xl">
              <h4 className="font-bold text-brand-green mb-2 uppercase tracking-wider text-xs flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-brand-orange-dark" /> The Biological Loop
              </h4>
              <p className="text-xs text-brand-ink/60 leading-relaxed">
                Agricultural residues are harvested locally. Decortication residues (wet, potassium-rich pulps) are returned immediately to the local soil as organic fertilizers. No toxic polymers or synthetic resins are introduced at any stage.
              </p>
            </div>
            <div className="p-6 bg-brand-orange/5 border border-brand-orange/10 rounded-2xl">
              <h4 className="font-bold text-brand-orange-dark mb-2 uppercase tracking-wider text-xs flex items-center gap-2">
                <Globe className="w-4 h-4 text-brand-green" /> The Technical Loop
              </h4>
              <p className="text-xs text-brand-ink/60 leading-relaxed">
                Extracted high-purity natural fibers are compressed into bio-composite boards. These boards sequester carbon for decades inside buildings, replacing fossil-fuel-intensive construction materials. At the end of their lifecycle, the chemical-free boards biodegrade safely back into the soil.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: Carbon Sequestration Mechanics */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-serif text-brand-green tracking-tight mb-6 border-b border-brand-green/10 pb-3">
            3. Carbon Sequestration and Climate Dynamics
          </h2>
          <div className="space-y-6 text-sm md:text-base text-brand-ink/70 leading-relaxed">
            <p>
              Plants are highly efficient solar-powered carbon extraction systems. Through photosynthesis, crops absorb atmospheric carbon dioxide ($CO_2$) and convert it into structural cellulose.
            </p>
            <p>
              When agricultural residues are burnt or allowed to rot in wet piles, this trapped carbon is released back into the atmosphere as $CO_2$ or $CH_4$ (methane, which has a warming potential 28 times higher than $CO_2$).
            </p>
            <p>
              By intercepting this waste and compressing it into dense, structural bio-composite boards, Green-to-Gold **sequesters** this carbon for decades. Every cubic meter of our bio-composite board actively traps approximately 820 kg of $CO_2e$, preventing it from returning to the atmosphere and creating a valuable physical carbon sink in urban infrastructure.
            </p>
          </div>
        </section>

        {/* SECTION 4: Socio-Economic Impact */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-serif text-brand-green tracking-tight mb-6 border-b border-brand-green/10 pb-3">
            4. Decentralization & Social Equity: The Triple-Bottom-Line
          </h2>
          <p className="text-sm md:text-base text-brand-ink/70 leading-relaxed mb-6">
            A truly circular economy must also be socially circular. If value is only extracted by centralized urban centers, the local rural economy collapses. Green-to-Gold addresses this with decentralized manufacturing hubs:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-sm text-brand-ink/70 leading-relaxed">
            <li><strong>Localized Sourcing:</strong> By placing processing micro-hubs near farm-gates in Tripura, we minimize transportation costs and keep economic benefits in rural communities.</li>
            <li><strong>Empowering Women's Self-Help Groups:</strong> Collection, sorting, and decortication networks are operated by female-led micro-cooperatives, providing direct fair-wage income.</li>
            <li><strong>Zero Local Pollution:</strong> Mechanical extraction and non-toxic starches ensure our manufacturing hubs generate zero air or water pollution, protecting local biodiversity.</li>
          </ul>
        </section>

        {/* SECTION 5: FAQ */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-serif text-brand-green tracking-tight mb-6 border-b border-brand-green/10 pb-3">
            5. Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-white border border-brand-ink/5 p-6 rounded-2xl">
              <h4 className="font-bold text-brand-green mb-2 text-sm">How does the circular bioeconomy differ from standard recycling?</h4>
              <p className="text-xs text-brand-ink/60 leading-relaxed">
                Conventional recycling typically "downcycles" synthetic materials, using energy-intensive processes to produce lower-quality plastics or paper. The circular bioeconomy focuses on regenerating organic materials, keeping biological resources at their highest value without generating any toxic waste.
              </p>
            </div>
            <div className="bg-white border border-brand-ink/5 p-6 rounded-2xl">
              <h4 className="font-bold text-brand-green mb-2 text-sm">Can biological products be recycled at the end of their lifecycle?</h4>
              <p className="text-xs text-brand-ink/60 leading-relaxed">
                Yes. Since Green-to-Gold bio-composite boards and tableware are made from natural fibers and non-toxic starch binders, they can be ground up and remolded into new materials, or safely composted to enrich agricultural soil.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
