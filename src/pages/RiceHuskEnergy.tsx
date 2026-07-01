import { motion } from "motion/react";
import { 
  Flame, 
  Leaf, 
  Trash2, 
  Award, 
  TrendingUp, 
  ShieldCheck, 
  Cpu, 
  Workflow, 
  Users, 
  ArrowLeft 
} from "lucide-react";
import { SEO } from "../components/SEO";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Navbar } from "../components/Navbar";
import { Link } from "react-router-dom";
import { 
  ORGANIZATION_SCHEMA, 
  LOCAL_BUSINESS_SCHEMA, 
  BREADCRUMB_SCHEMA 
} from "../lib/seoData";

export default function RiceHuskEnergy() {
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://greentogold.in/rice-husk-energy#webpage",
    "url": "https://greentogold.in/rice-husk-energy",
    "name": "From Rice Husk Waste to Clean Energy Value - Green-to-Gold | ATSFY Technologies",
    "description": "Discover how Green-to-Gold transforms underutilized rice husk residue into carbonized briquettes and clean biomass fuel solutions under ATSFy Technologies."
  };

  return (
    <div className="min-h-screen bg-brand-paper text-brand-ink selection:bg-brand-orange/20 selection:text-brand-orange-dark font-sans relative overflow-x-hidden">
      <Navbar />
      
      <SEO 
        title="Rice Husk Waste to Clean Energy Value | Green-to-Gold"
        description="Green-to-Gold transforms underutilized rice husk agricultural waste into carbonized briquettes and clean biomass fuel solutions under ATSFy Technologies."
        keywords="rice husk fuel, biomass briquettes, agricultural residue energy, clean thermal energy, ATSFy Technologies, circular economy India, sustainable solid fuel"
        canonicalPath="/rice-husk-energy"
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
        {/* Header Block / Hero */}
        <header className="mb-16 text-center md:text-left">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-brand-orange/10 text-brand-orange-dark rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-brand-orange/10"
          >
            <Flame className="w-3.5 h-3.5 animate-pulse" /> Renewable Waste-To-Energy
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif text-brand-green tracking-tight leading-tight mb-6"
          >
            From Rice Husk Waste to Clean Energy Value
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-brand-ink/80 leading-relaxed font-sans max-w-3xl mb-8"
          >
            Green to Gold transforms rice husk, one of the most underused agricultural residues, into carbonized briquettes and biomass fuel solutions for households, small firms, and industrial thermal applications. Built under ATSFy Technologies, the project combines rural waste collection, clean fuel production, and digital traceability to create a locally rooted, environmentally responsible energy model.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-block p-6 bg-brand-green/5 border border-brand-green/10 rounded-2xl text-left"
          >
            <p className="text-sm md:text-base font-serif text-brand-green font-semibold">
              "Turning agricultural waste into usable fuel, local income, and climate impact."
            </p>
          </motion.div>
        </header>

        {/* SECTION 1: Intro Section */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-serif text-brand-green tracking-tight mb-6 border-b border-brand-green/10 pb-3">
            1. Unlocking the Usable Energy of Agri-Residues
          </h2>
          <div className="space-y-6 text-sm md:text-base text-brand-ink/70 leading-relaxed">
            <p>
              Rice husk is often burned or discarded after milling, even though it contains usable energy. Green to Gold captures that value by converting rice husk into solid fuel products that are easier to store, transport, and burn than raw biomass. This creates a practical alternative to waste burning while supporting local jobs and cleaner energy access.
            </p>
            <p>
              The project is designed for regions where fuel supply is costly or unreliable and where agricultural residues are available in volume. By placing processing closer to the source, Green to Gold helps keep value within the local economy while reducing dependence on conventional fossil fuels for selected use cases.
            </p>
          </div>
        </section>

        {/* SECTION 2: What We Do */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-serif text-brand-green tracking-tight mb-6 border-b border-brand-green/10 pb-3">
            2. The Sourcing & Production Process
          </h2>
          <p className="text-sm md:text-base text-brand-ink/70 leading-relaxed mb-8">
            We collect rice husk from mills, farms, and local aggregation points, then process it into densified biomass fuel products. Depending on the application, the husk can be carbonized and briquetted into bars, pellets, or other solid fuel formats suitable for thermal energy use.
          </p>

          <h3 className="text-sm font-sans font-bold uppercase tracking-wider text-brand-green mb-6">Our system is built to support:</h3>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { id: "01", title: "Household Stove Fuel", desc: "Clean-burning, affordable biomass fuel suited for domestic stoves." },
              { id: "02", title: "Commercial Heat", desc: "Consistent thermal supply for small eateries and local businesses." },
              { id: "03", title: "Industrial Boilers", desc: "Cost-conscious biomass substitutes for industrial thermal furnaces." },
              { id: "04", title: "Carbon Valued Assets", desc: "Future carbon-based value-added products from agricultural waste." }
            ].map((item, index) => (
              <div key={index} className="bg-white border border-brand-ink/5 p-5 rounded-2xl relative">
                <div className="text-xs font-mono font-bold text-brand-orange-dark mb-2">{item.id}</div>
                <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-brand-green mb-1">{item.title}</h4>
                <p className="text-[11px] text-brand-ink/60 leading-normal">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: Why Rice Husk & Product Benefits */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-serif text-brand-green tracking-tight mb-6 border-b border-brand-green/10 pb-3">
            3. Why Rice Husk & Product Benefits
          </h2>
          <div className="space-y-6 text-sm md:text-base text-brand-ink/70 leading-relaxed mb-8">
            <p>
              Rice husk is abundant, underutilized, and energy-rich. Instead of treating it as waste, Green to Gold converts it into a product that can deliver usable heat with lower environmental impact than open burning or unmanaged disposal.
            </p>
            <p>
              Rice husk briquettes are attractive because they are compact, transportable, and suitable for many biomass-burning systems. They are also viewed in the market as eco-friendly, low-moisture, and efficient fuel options for thermal applications.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-white border border-brand-ink/5 rounded-2xl">
              <h4 className="font-bold text-brand-green mb-3 flex items-center gap-2 text-xs uppercase tracking-wider">
                <Leaf className="w-4 h-4 text-brand-orange-dark" /> Optimized Thermal Performance
              </h4>
              <ul className="space-y-2 text-xs text-brand-ink/60 list-disc pl-4">
                <li>Cleaner use of agricultural residue.</li>
                <li>Reduced waste burning and air particulate emissions.</li>
                <li>Localized solid fuel availability in rural blocks.</li>
                <li>Lower transport dependence compared to heavy fossil alternatives.</li>
                <li>A renewable alternative for suitable cooking and heating needs.</li>
              </ul>
            </div>

            <div className="p-6 bg-white border border-brand-ink/5 rounded-2xl">
              <h4 className="font-bold text-brand-green mb-3 flex items-center gap-2 text-xs uppercase tracking-wider">
                <TrendingUp className="w-4 h-4 text-brand-orange-dark" /> B2B & Commercial Placement
              </h4>
              <p className="text-xs text-brand-ink/60 leading-relaxed">
                For institutional or industrial buyers, the product can be positioned as a cost-conscious biomass substitute for conventional solid fuels in non-LPG systems.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: ATSFy Advantage */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-serif text-brand-green tracking-tight mb-6 border-b border-brand-green/10 pb-3">
            4. The ATSFy Advantage: Smart Circular Technology
          </h2>
          <div className="flex gap-4 p-6 bg-white border border-brand-ink/5 rounded-2xl items-start">
            <div className="w-12 h-12 bg-brand-green/10 text-brand-green rounded-xl flex items-center justify-center shrink-0">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm md:text-base text-brand-ink/70 leading-relaxed mb-4">
                Under ATSFy Technologies, Green to Gold is more than a manufacturing unit. It becomes a technology-enabled rural supply chain with AI-supported quality control, traceability, production tracking, and carbon monitoring.
              </p>
              <p className="text-xs text-brand-ink/60 leading-relaxed">
                That means every batch can be monitored for moisture, feedstock quality, and consistency, while the project builds credible reporting around waste diversion and environmental value. This is important for scaling, partnerships, and future carbon-linked opportunities.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5: Who It Serves & Sustainability Impact */}
        <section className="mb-16 grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-serif text-brand-green tracking-tight mb-4">Who It Serves</h3>
            <ul className="space-y-2.5 text-sm text-brand-ink/70">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange-dark shrink-0" />
                <span>Households seeking a biomass-based backup cooking fuel.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange-dark shrink-0" />
                <span>Small eateries and local businesses using solid-fuel stoves.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange-dark shrink-0" />
                <span>Small manufacturing units and thermal process users.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange-dark shrink-0" />
                <span>Institutions looking for cleaner biomass fuel alternatives.</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-serif text-brand-green tracking-tight mb-4">Sustainability Impact</h3>
            <p className="text-sm text-brand-ink/70 leading-relaxed mb-4">
              Every tonne of rice husk used productively instead of being burned openly contributes to a more circular economy. Green to Gold supports cleaner waste management, rural enterprise development, and more responsible energy use.
            </p>
            <p className="text-xs text-brand-ink/60 leading-relaxed">
              The project also creates a foundation for climate-positive branding by connecting fuel production with measured waste diversion and possible carbon accounting.
            </p>
          </div>
        </section>

        {/* SECTION 6: Call To Action */}
        <section className="mb-16 p-8 bg-brand-green/5 border border-brand-green/20 rounded-2xl text-center">
          <h3 className="text-xl md:text-2xl font-serif text-brand-green tracking-tight mb-4">
            Join the Waste-to-Energy Movement
          </h3>
          <p className="text-sm md:text-base text-brand-ink/80 leading-relaxed max-w-2xl mx-auto mb-6">
            Green to Gold is building the future of waste-to-energy from the ground up. If you are a rice mill, farmer group, SHG, boiler user, or local distributor, Green to Gold can help turn rice husk into a useful, market-ready fuel product.
          </p>
          <a 
            href="mailto:atsfy.tech.info@gmail.com"
            className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white px-6 py-3 rounded-xl font-bold transition-all text-sm"
          >
            Get In Touch <TrendingUp className="w-4 h-4" />
          </a>
        </section>

        {/* Back Link */}
        <div className="mt-16 pt-8 border-t border-brand-ink/10">
          <Link to="/" className="inline-flex items-center gap-2 text-brand-green hover:text-brand-orange-dark transition-colors font-medium">
            <ArrowLeft className="w-4 h-4" /> Back to Homepage
          </Link>
        </div>
      </main>
    </div>
  );
}
