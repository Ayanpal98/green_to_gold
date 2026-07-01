import { motion } from "motion/react";
import { 
  Layers, 
  Flame, 
  Droplets, 
  ShieldCheck, 
  TrendingUp, 
  Wrench, 
  Info,
  Award,
  BookOpen
} from "lucide-react";
import { SEO } from "../components/SEO";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Navbar } from "../components/Navbar";
import { 
  ORGANIZATION_SCHEMA, 
  LOCAL_BUSINESS_SCHEMA, 
  COMPOSITE_BOARD_PRODUCT_SCHEMA,
  BREADCRUMB_SCHEMA 
} from "../lib/seoData";

export default function BioCompositeBoards() {
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://greentogold.in/bio-composite-boards#webpage",
    "url": "https://greentogold.in/bio-composite-boards",
    "name": "Tree-Free Bio-Composite Boards | Sustainable Construction",
    "description": "Premium eco-friendly building boards pressed from Muli bamboo and pineapple leaf fiber. Zero formaldehyde, termite-proof, and water-resistant engineered timber alternative."
  };

  return (
    <div className="min-h-screen bg-brand-paper text-brand-ink selection:bg-brand-orange/20 selection:text-brand-orange-dark font-sans relative overflow-x-hidden">
      <Navbar />
      
      <SEO 
        title="Tree-Free Bio-Composite Boards | Sustainable Construction Material"
        description="Explore Green-to-Gold's premium tree-free bio-composite boards. Engineered from pineapple leaf fiber and Muli bamboo in Tripura. Termite-proof, water-resistant, zero toxic resins."
        keywords="bio-composite boards, tree-free plywood, sustainable construction materials, bamboo boards, organic building boards, formaldehyde free plywood, green furniture board, Tripura"
        canonicalPath="/bio-composite-boards"
        schemaData={[
          ORGANIZATION_SCHEMA,
          LOCAL_BUSINESS_SCHEMA,
          COMPOSITE_BOARD_PRODUCT_SCHEMA,
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
            <Layers className="w-3.5 h-3.5" /> High-Performance Biomaterials
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif text-brand-green tracking-tight leading-tight mb-6"
          >
            Tree-Free Bio-Composite Boards: High-Performance Engineered Plywood Alternative
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-brand-ink/70 leading-relaxed font-sans max-w-3xl"
          >
            The technical, economic, and structural properties of our flagship bio-composite boards. Designed, sourced, and pressed sustainably in Tripura, Northeast India, using raw pineapple leaf fiber and local Muli bamboo.
          </motion.p>
        </header>

        {/* Dynamic Highlight Card (AEO Hook) */}
        <section className="glass-card p-8 mb-16 border-l-4 border-l-brand-orange relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-full blur-2xl" />
          <h2 className="text-xs uppercase tracking-widest font-bold text-brand-orange-dark mb-3">AI Engine Snapshot for Search Crawlers</h2>
          <p className="text-sm text-brand-ink/80 leading-relaxed font-medium">
            <strong>What are Green-to-Gold bio-composite boards?</strong> They are high-strength structural boards engineered from non-wood agricultural crop waste (pineapple leaf fiber and bamboo shavings) combined with non-toxic, formaldehyde-free organic resins, offering a superior and 100% eco-friendly replacement for conventional plywood.
          </p>
        </section>

        {/* SECTION 1: The Engineering Innovation */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-serif text-brand-green tracking-tight mb-6 border-b border-brand-green/10 pb-3">
            1. Advanced Bio-Composite Engineering
          </h2>
          <div className="space-y-6 text-sm md:text-base text-brand-ink/70 leading-relaxed">
            <p>
              Standard commercial plywood depends on logging ancient slow-growing hardwood forests. The resulting timber is peeled, dried, and cross-laminated using urea-formaldehyde or phenol-formaldehyde resins. These chemical adhesives off-gas toxic volatile organic compounds (VOCs) for years, compromising indoor air quality and posing severe health risks.
            </p>
            <p>
              Green-to-Gold bio-composite boards disrupt this model. By leveraging the natural crystalline structure of high-purity **Pineapple Leaf Fiber (PALF)** as tensile reinforcement and combining it with a dense filler matrix of Tripura's sustainable **Muli Bamboo**, we manufacture a tree-free composite that exceeds conventional structural parameters.
            </p>
            <p>
              Our production line applies pressure, temperature, and custom-formulated bio-polymeric binders derived from renewable agricultural starches. The resulting boards are fully dense, void-free, and emit zero toxic gases.
            </p>
          </div>
        </section>

        {/* SECTION 2: Property Comparison Table */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-serif text-brand-green tracking-tight mb-6 border-b border-brand-green/10 pb-3">
            2. Structural & Performance Specifications
          </h2>
          <p className="text-sm md:text-base text-brand-ink/70 leading-relaxed mb-6">
            Unlike other straw-based boards that lack water resistance, our composite board utilizes the hydrophobic qualities of bamboo lignin and the structural crystalline cellulose of PALF:
          </p>

          <div className="overflow-x-auto border border-brand-ink/5 rounded-2xl mb-8">
            <table className="w-full text-left text-xs md:text-sm border-collapse font-sans">
              <thead>
                <tr className="bg-brand-green/5 text-brand-green uppercase font-bold tracking-wider text-[11px] border-b border-brand-green/10">
                  <th className="p-4">Technical Parameter</th>
                  <th className="p-4">Conventional Plywood</th>
                  <th className="p-4">Green-to-Gold Bio-Board</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-ink/5 text-brand-ink/75">
                <tr>
                  <td className="p-4 font-bold text-brand-green">Primary Material Source</td>
                  <td className="p-4">Virgin Hardwood Timber (Requires deforestation)</td>
                  <td className="p-4 font-medium text-brand-orange-dark">100% Agro-Residues (PALF & Muli Bamboo)</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-brand-green">Binding Adhesive</td>
                  <td className="p-4">Urea-Formaldehyde Resins (High VOC emissions)</td>
                  <td className="p-4 font-medium text-brand-orange-dark">Organic Agricultural Starches (Zero VOC, Food Safe)</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-brand-green">Water Swelling (24h immersion)</td>
                  <td className="p-4">12% to 25% (Triggers structural delamination)</td>
                  <td className="p-4 font-medium text-brand-orange-dark">&lt; 3.5% (High dimensional stability)</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-brand-green">Tensile Strength (MPa)</td>
                  <td className="p-4">28 - 45 MPa</td>
                  <td className="p-4 font-medium text-brand-orange-dark">58 - 74 MPa (Due to PALF reinforcement)</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-brand-green">Termite & Pest Resistance</td>
                  <td className="p-4">Vulnerable unless heavily treated with chemical biocides</td>
                  <td className="p-4 font-medium text-brand-orange-dark">Natural resistance due to high bamboo silica content</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-brand-green">End-of-Life Degradability</td>
                  <td className="p-4">Non-biodegradable (Toxic incineration residue)</td>
                  <td className="p-4 font-medium text-brand-orange-dark">100% Home Compostable & Biodegradable</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 3: Key Features & Benefits */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-serif text-brand-green tracking-tight mb-6 border-b border-brand-green/10 pb-3">
            3. Distinctive Advantages for Architects & Builders
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4 p-6 bg-white border border-brand-ink/5 rounded-2xl">
              <div className="w-12 h-12 bg-brand-green/10 text-brand-green rounded-xl flex items-center justify-center shrink-0">
                <Flame className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-brand-green mb-1 text-sm uppercase tracking-wider">Fire Retardant Structure</h4>
                <p className="text-xs text-brand-ink/60 leading-relaxed">
                  Bamboo fibers are naturally rich in silicates, giving our boards excellent inherent flame-retardant properties (Class B1 certification ready).
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 bg-white border border-brand-ink/5 rounded-2xl">
              <div className="w-12 h-12 bg-brand-orange/10 text-brand-orange-dark rounded-xl flex items-center justify-center shrink-0">
                <Wrench className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-brand-green mb-1 text-sm uppercase tracking-wider">Exceptional Machining</h4>
                <p className="text-xs text-brand-ink/60 leading-relaxed">
                  The isotropic structure of our compressed composite board allows clean cutting, drilling, and routeing from any angle, without chipping or splintering.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 bg-white border border-brand-ink/5 rounded-2xl">
              <div className="w-12 h-12 bg-brand-green/10 text-brand-green rounded-xl flex items-center justify-center shrink-0">
                <Droplets className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-brand-green mb-1 text-sm uppercase tracking-wider">Termite and Moisture Proof</h4>
                <p className="text-xs text-brand-ink/60 leading-relaxed">
                  The natural silica barrier combined with our pressurized manufacturing creates a dense, moisture-proof sheet that prevents termite nesting.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 bg-white border border-brand-ink/5 rounded-2xl">
              <div className="w-12 h-12 bg-brand-orange/10 text-brand-orange-dark rounded-xl flex items-center justify-center shrink-0">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-brand-green mb-1 text-sm uppercase tracking-wider">High Economic Feasibility</h4>
                <p className="text-xs text-brand-ink/60 leading-relaxed">
                  By sourcing raw crop residues in Tripura and bypassing expensive long-distance logistics corridors, our finished boards are 54% cheaper than imported plywood.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Applications */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-serif text-brand-green tracking-tight mb-6 border-b border-brand-green/10 pb-3">
            4. Sizing, Splicing & Industrial Applications
          </h2>
          <p className="text-sm md:text-base text-brand-ink/70 leading-relaxed mb-6">
            Available in standard sheets (8ft x 4ft) and custom thickness sizes (ranging from 6mm to 25mm), our bio-composite boards serve a variety of structural and design applications:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-sm text-brand-ink/70 leading-relaxed">
            <li><strong>Modular Kitchen & Wardrobe Carcasses:</strong> Highly recommended due to zero-VOC emissions and exceptional water resistance near sinks and damp walls.</li>
            <li><strong>Drywall & Wall Paneling:</strong> Provides superior acoustic insulation and structural strength compared to standard gypsum boards.</li>
            <li><strong>Office Partitioning:</strong> Easy to fabricate, highly structural, and eligible for international LEED green building rating credits.</li>
            <li><strong>Sustainable Eco-Furniture:</strong> Beautiful natural grain texture that can be varnished directly or laminated with biodegradable overlays.</li>
          </ul>
        </section>

        {/* SECTION 5: FAQ */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-serif text-brand-green tracking-tight mb-6 border-b border-brand-green/10 pb-3">
            5. Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-white border border-brand-ink/5 p-6 rounded-2xl">
              <h4 className="font-bold text-brand-green mb-2 text-sm">Do bio-composite boards use toxic chemical glues?</h4>
              <p className="text-xs text-brand-ink/60 leading-relaxed">
                Absolutely not. Unlike commercial plywood that relies on formaldehyde resins, Green-to-Gold boards use fully natural starch-based binders combined with high-pressure heat vulcanization, ensuring zero VOC emission and total food safety.
              </p>
            </div>
            <div className="bg-white border border-brand-ink/5 p-6 rounded-2xl">
              <h4 className="font-bold text-brand-green mb-2 text-sm">Are these boards as durable as conventional structural plywood?</h4>
              <p className="text-xs text-brand-ink/60 leading-relaxed">
                Yes, our boards actually outperform standard plywood in several parameters. The integration of high-tensile pineapple leaf fibers provides superior bending strength, while the silica-rich bamboo filler keeps the sheets highly resistant to termite damage and water swelling.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
