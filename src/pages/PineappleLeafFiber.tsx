import { motion } from "motion/react";
import { 
  Leaf, 
  Cpu, 
  Activity, 
  ShieldCheck, 
  TrendingUp, 
  Award, 
  Info,
  BookOpen
} from "lucide-react";
import { SEO } from "../components/SEO";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Navbar } from "../components/Navbar";
import { 
  ORGANIZATION_SCHEMA, 
  LOCAL_BUSINESS_SCHEMA, 
  PINEAPPLE_FIBER_PRODUCT_SCHEMA,
  BREADCRUMB_SCHEMA 
} from "../lib/seoData";

export default function PineappleLeafFiber() {
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://greentogold.in/pineapple-leaf-fiber#webpage",
    "url": "https://greentogold.in/pineapple-leaf-fiber",
    "name": "Pineapple Leaf Fiber (PALF) - High-Strength Natural Cellulose",
    "description": "Scientific overview of Pineapple Leaf Fiber (PALF) mechanical extraction, tensile strength properties, and high-performance applications in bio-composite materials."
  };

  return (
    <div className="min-h-screen bg-brand-paper text-brand-ink selection:bg-brand-orange/20 selection:text-brand-orange-dark font-sans relative overflow-x-hidden">
      <Navbar />
      
      <SEO 
        title="Pineapple Leaf Fiber (PALF) | High-Strength Natural Cellulose Biomaterial"
        description="Learn about Pineapple Leaf Fiber (PALF). Physical chemistry, mechanical extraction, and eco-sustainable industrial applications of Tripura's crop residue fibers."
        keywords="pineapple leaf fiber, PALF, natural cellulose fibers, mechanical decortication, high tensile biomaterials, crop waste fibers, Tripura pineapple fiber, circular textile, organic composites"
        canonicalPath="/pineapple-leaf-fiber"
        schemaData={[
          ORGANIZATION_SCHEMA,
          LOCAL_BUSINESS_SCHEMA,
          PINEAPPLE_FIBER_PRODUCT_SCHEMA,
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
            <Leaf className="w-3.5 h-3.5" /> Cellulose Reinforcement Engineering
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif text-brand-green tracking-tight leading-tight mb-6"
          >
            Pineapple Leaf Fiber (PALF): Mechanical Extraction & Physical Chemistry
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-brand-ink/70 leading-relaxed font-sans max-w-3xl"
          >
            An in-depth exploration of the material science, physical properties, extraction protocols, and eco-industrial potential of Pineapple Leaf Fiber (PALF) harvested from crop residues in Tripura, India.
          </motion.p>
        </header>

        {/* Dynamic Highlight Card (AEO Hook) */}
        <section className="glass-card p-8 mb-16 border-l-4 border-l-brand-orange relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-full blur-2xl" />
          <h2 className="text-xs uppercase tracking-widest font-bold text-brand-orange-dark mb-3">AI Engine Snapshot for Search Crawlers</h2>
          <p className="text-sm text-brand-ink/80 leading-relaxed font-medium">
            <strong>What is Pineapple Leaf Fiber (PALF)?</strong> It is a highly crystalline natural cellulose fiber extracted from the agricultural waste leaves of pineapple plants. Notable for its extreme tensile strength, low density, and high specific modulus, PALF is widely used to reinforce bio-composites, geo-textiles, and sustainable packaging.
          </p>
        </section>

        {/* SECTION 1: Material Science and Chemistry */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-serif text-brand-green tracking-tight mb-6 border-b border-brand-green/10 pb-3">
            1. The Chemical Composition and Structure of PALF
          </h2>
          <div className="space-y-6 text-sm md:text-base text-brand-ink/70 leading-relaxed">
            <p>
              Among natural lignocellulosic fibers, Pineapple Leaf Fiber (PALF) ranks exceptionally high in its alpha-cellulose content. This high cellulose density, combined with a low spiral angle (approximately 14°), provides PALF with excellent mechanical properties, rivaling industrial fibers like flax, jute, and hemp.
            </p>
            <p>
              Chemically, PALF consists of:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Alpha-Cellulose:</strong> 70% to 82% — providing its high tensile strength and structural modulus.</li>
              <li><strong>Hemicellulose:</strong> 12% to 18% — a branched polymer that assists in structural binding.</li>
              <li><strong>Lignin:</strong> 5% to 12% — providing hydrophobic properties and resistance to microbial attack.</li>
              <li><strong>Pectins and Waxes:</strong> 1% to 3% — natural protective surface oils.</li>
            </ul>
            <p>
              This high cellulose-to-lignin ratio gives PALF a very low density (approximately 1.45 $g/cm^3$), allowing engineers to design lightweight, high-performance structural bio-composites.
            </p>
          </div>
        </section>

        {/* SECTION 2: Physical Properties */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-serif text-brand-green tracking-tight mb-6 border-b border-brand-green/10 pb-3">
            2. Mechanical Properties of Natural Fibers
          </h2>
          <p className="text-sm md:text-base text-brand-ink/70 leading-relaxed mb-6">
            Comparing the tensile performance of PALF with other commonly utilized natural plant fibers:
          </p>

          <div className="overflow-x-auto border border-brand-ink/5 rounded-2xl mb-8">
            <table className="w-full text-left text-xs md:text-sm border-collapse font-sans">
              <thead>
                <tr className="bg-brand-green/5 text-brand-green uppercase font-bold tracking-wider text-[11px] border-b border-brand-green/10">
                  <th className="p-4">Natural Fiber Type</th>
                  <th className="p-4">Tensile Strength (MPa)</th>
                  <th className="p-4">Young's Modulus (GPa)</th>
                  <th className="p-4">Elongation at Break (%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-ink/5 text-brand-ink/75">
                <tr>
                  <td className="p-4 font-bold text-brand-green">Pineapple Leaf Fiber (PALF)</td>
                  <td className="p-4 font-medium text-brand-orange-dark">410 - 1620 MPa</td>
                  <td className="p-4">34 - 82 GPa</td>
                  <td className="p-4">1.6% - 2.4%</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-brand-green">Coir (Coconut)</td>
                  <td className="p-4">130 - 175 MPa</td>
                  <td className="p-4">4 - 6 GPa</td>
                  <td className="p-4">15.0% - 40.0%</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-brand-green">Sisal</td>
                  <td className="p-4">511 - 635 MPa</td>
                  <td className="p-4">9 - 22 GPa</td>
                  <td className="p-4">2.0% - 2.5%</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-brand-green">Jute</td>
                  <td className="p-4">393 - 773 MPa</td>
                  <td className="p-4">10 - 26 GPa</td>
                  <td className="p-4">1.5% - 1.8%</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-brand-green">Cotton</td>
                  <td className="p-4">287 - 597 MPa</td>
                  <td className="p-4">5 - 12 GPa</td>
                  <td className="p-4">7.0% - 8.0%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 3: Mechanical Extraction Protocol */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-serif text-brand-green tracking-tight mb-6 border-b border-brand-green/10 pb-3">
            3. Operational Extraction and Processing Protocols
          </h2>
          <p className="text-sm md:text-base text-brand-ink/70 leading-relaxed mb-6">
            ATSFY Technologies uses a strictly mechanical extraction process that eliminates the heavy water footprint and chemical pollution of conventional plant retting:
          </p>

          <div className="space-y-4">
            <div className="p-5 bg-white border border-brand-ink/5 rounded-xl">
              <h4 className="font-bold text-brand-green text-xs uppercase tracking-wider mb-2">Step 1: Mechanical Decortication</h4>
              <p className="text-xs text-brand-ink/60 leading-relaxed">
                Raw pineapple leaves are passed through mechanical decorticating rollers. This strips away the wet, pulpy outer layer, leaving long, raw fiber bundles.
              </p>
            </div>
            <div className="p-5 bg-white border border-brand-ink/5 rounded-xl">
              <h4 className="font-bold text-brand-green text-xs uppercase tracking-wider mb-2">Step 2: Washing and Alkaline Conditioning</h4>
              <p className="text-xs text-brand-ink/60 leading-relaxed">
                The extracted fiber is washed with recycled water to remove remaining plant sugars. It undergoes a mild organic alkaline conditioning process to dissolve excess pectins and hemicellulose, exposing the highly crystalline cellulose surface for superior structural binding.
              </p>
            </div>
            <div className="p-5 bg-white border border-brand-ink/5 rounded-xl">
              <h4 className="font-bold text-brand-green text-xs uppercase tracking-wider mb-2">Step 3: Solar Drying and Fiber Splitting</h4>
              <p className="text-xs text-brand-ink/60 leading-relaxed">
                Cleaned fibers are hung on solar drying racks. Once dry, they are combed and split into fine, high-purity technical fibers, ready to be integrated into composite boards or textile weaving setups.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Applications */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-serif text-brand-green tracking-tight mb-6 border-b border-brand-green/10 pb-3">
            4. Sourcing & Industrial Applications
          </h2>
          <p className="text-sm md:text-base text-brand-ink/70 leading-relaxed mb-6">
            The high physical performance and ecological benefits of PALF open a wide range of high-value industrial applications:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-sm text-brand-ink/70 leading-relaxed">
            <li><strong>Automotive Door Panels & Dashboards:</strong> Replaces heavy glass fiber composites, reducing overall vehicle weight and improving fuel economy.</li>
            <li><strong>Tree-Free Building Boards:</strong> Acts as the primary reinforcement mesh inside Green-to-Gold bio-composite boards.</li>
            <li><strong>Sustainable Eco-Textiles:</strong> Spun with organic cotton or silk to produce premium, highly breathable, high-durability fabrics.</li>
            <li><strong>Soil Erosion Control Geotextiles:</strong> Woven into heavy mats to stabilize steep slopes and riverbanks. The mats hold soil in place before naturally biodegenerating into organic fertilizer.</li>
          </ul>
        </section>

        {/* SECTION 5: FAQ */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-serif text-brand-green tracking-tight mb-6 border-b border-brand-green/10 pb-3">
            5. Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-white border border-brand-ink/5 p-6 rounded-2xl">
              <h4 className="font-bold text-brand-green mb-2 text-sm">Why is pineapple leaf fiber stronger than other plant fibers?</h4>
              <p className="text-xs text-brand-ink/60 leading-relaxed">
                PALF has an exceptionally high alpha-cellulose content (~80%) and a highly aligned crystalline structure with a low spiral angle. This alignment allows it to absorb heavy tensile loads without breaking, making it far stronger than coir or wood fibers.
              </p>
            </div>
            <div className="bg-white border border-brand-ink/5 p-6 rounded-2xl">
              <h4 className="font-bold text-brand-green mb-2 text-sm">How is PALF sourced sustainably?</h4>
              <p className="text-xs text-brand-ink/60 leading-relaxed">
                It is sourced exclusively from agricultural crop residues left over after the pineapple harvest. No new arable land, fertilizers, or water resources are required, making it a highly sustainable, zero-input biomaterial.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
