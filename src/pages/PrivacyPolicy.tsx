import { motion } from "motion/react";
import { Shield, Eye, Lock, FileText, Globe, ArrowLeft } from "lucide-react";
import { SEO } from "../components/SEO";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Navbar } from "../components/Navbar";
import { Link } from "react-router-dom";
import { 
  ORGANIZATION_SCHEMA, 
  LOCAL_BUSINESS_SCHEMA, 
  BREADCRUMB_SCHEMA 
} from "../lib/seoData";

export default function PrivacyPolicy() {
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://greentogold.in/privacy-policy#webpage",
    "url": "https://greentogold.in/privacy-policy",
    "name": "Privacy Policy - Green-to-Gold | ATSFY Technologies",
    "description": "Privacy policy and data protection standards for Green-to-Gold and the BioSense DSS™ platform operated by ATSFY Technologies."
  };

  return (
    <div className="min-h-screen bg-brand-paper text-brand-ink selection:bg-brand-orange/20 selection:text-brand-orange-dark font-sans relative overflow-x-hidden">
      <Navbar />
      
      <SEO 
        title="Privacy Policy | Green-to-Gold Data Protection & Security"
        description="Understand how ATSFY Technologies manages, secures, and handles user data across our website and the BioSense DSS™ agricultural platform."
        keywords="privacy policy, data protection, Green-to-Gold, ATSFY Technologies, BioSense DSS data privacy, crop data security"
        canonicalPath="/privacy-policy"
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
            <Shield className="w-3.5 h-3.5" /> Trust &amp; Information Security
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif text-brand-green tracking-tight leading-tight mb-6"
          >
            Privacy Policy
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-brand-ink/70 leading-relaxed font-sans max-w-3xl"
          >
            Last Updated: June 30, 2026. This policy outlines our committed frameworks for securing, managing, and respecting your personal and agricultural data.
          </motion.p>
        </header>

        {/* Dynamic Highlight Card */}
        <section className="glass-card p-8 mb-16 border-l-4 border-l-brand-orange relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-full blur-2xl" />
          <h2 className="text-xs uppercase tracking-widest font-bold text-brand-orange-dark mb-3">Core Privacy Commitment</h2>
          <p className="text-sm text-brand-ink/80 leading-relaxed font-medium">
            ATSFY Technologies is dedicated to protecting the privacy of our farmers, cooperatives, state partners, and individual users. We never sell your personal identification details, crop yields, or soil intelligence to third-party data brokers.
          </p>
        </section>

        {/* SECTION 1: Information Collection */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif text-brand-green tracking-tight mb-6 border-b border-brand-green/10 pb-3">
            1. Information We Collect
          </h2>
          <div className="space-y-4 text-sm md:text-base text-brand-ink/70 leading-relaxed">
            <p>
              To power our decentralized sourcing operations and interactive agricultural dashboards, we collect relevant technical and cooperative data:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>User Profile Data:</strong> Names, phone numbers, localized addresses, and affiliate Self-Help Group (SHG) associations entered when registers as a partner or coordinator.</li>
              <li><strong>Agricultural &amp; Soil Intelligence:</strong> Crop yield estimates, historical farm-gate harvest records, soil chemistry parameters (pH, organic carbon, nitrogen, phosphorus, potassium), and image uploads used for crop disease diagnosis.</li>
              <li><strong>Log Data &amp; Analytics:</strong> IP addresses, browser types, interaction durations, and feature utilization patterns within our BioSense DSS™ portal.</li>
            </ul>
          </div>
        </section>

        {/* SECTION 2: How We Use Information */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif text-brand-green tracking-tight mb-6 border-b border-brand-green/10 pb-3">
            2. Purpose of Data Processing
          </h2>
          <p className="text-sm md:text-base text-brand-ink/70 leading-relaxed mb-4">
            We process collected information to optimize local bio-manufacturing supply chains, enhance crop health, and issue direct compensation:
          </p>
          <div className="grid md:grid-cols-2 gap-6 mb-4">
            <div className="p-6 bg-brand-green/5 border border-brand-green/10 rounded-2xl">
              <h4 className="font-bold text-brand-green mb-2 uppercase tracking-wider text-xs flex items-center gap-2">
                <Eye className="w-4 h-4 text-brand-orange-dark" /> Supply Chain &amp; Logistics
              </h4>
              <p className="text-xs text-brand-ink/60 leading-relaxed">
                Analyzing regional biomass availability enables us to route trucks and schedule decentralized presses, saving transport energy and ensuring fair farmer compensation.
              </p>
            </div>
            <div className="p-6 bg-brand-orange/5 border border-brand-orange/10 rounded-2xl">
              <h4 className="font-bold text-brand-orange-dark mb-2 uppercase tracking-wider text-xs flex items-center gap-2">
                <Lock className="w-4 h-4 text-brand-green" /> Research &amp; AI Diagnostics
              </h4>
              <p className="text-xs text-brand-ink/60 leading-relaxed">
                Aggregated soil data and crop disease images train our machine learning diagnostics tools to provide better biological treatment suggestions to regional KVK offices.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: Information Security */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif text-brand-green tracking-tight mb-6 border-b border-brand-green/10 pb-3">
            3. Data Security &amp; Storage
          </h2>
          <div className="space-y-4 text-sm md:text-base text-brand-ink/70 leading-relaxed">
            <p>
              All user profiles, SHG records, and transaction logs are encrypted in transit using industry-standard Secure Socket Layer (SSL) protocols. Information stored on our servers uses secure access control matrices.
            </p>
            <p>
              While we enforce rigorous physical and digital protections, no system is entirely impenetrable. We continuously audit our database instances and security configurations to counter potential vulnerabilities.
            </p>
          </div>
        </section>

        {/* SECTION 4: Cookies and Tracking */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif text-brand-green tracking-tight mb-6 border-b border-brand-green/10 pb-3">
            4. Cookies and Session Tokens
          </h2>
          <p className="text-sm md:text-base text-brand-ink/70 leading-relaxed">
            We use functional session cookies to store your preferred language setting (English, Bengali, or Kokborok), authenticate access tokens on the BioSense DSS™ dashboard, and analyze basic traffic trends to make our layout more responsive. You can disable cookies in your browser settings, though some interactive elements may cease to function correctly.
          </p>
        </section>

        {/* SECTION 5: Contact Information */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif text-brand-green tracking-tight mb-6 border-b border-brand-green/10 pb-3">
            5. Contact and Redressal
          </h2>
          <div className="space-y-4 text-sm md:text-base text-brand-ink/70 leading-relaxed">
            <p>
              If you wish to review, correct, or delete any of your personal data, or if you have specific security inquiries, please contact our Data Protection Officer at:
            </p>
            <div className="p-6 bg-white border border-brand-ink/5 rounded-2xl inline-block">
              <p className="font-bold text-brand-green mb-1 text-sm">ATSFY Technologies Private Limited</p>
              <p className="text-xs text-brand-ink/60 mb-2">Attention: Data Protection Office</p>
              <p className="text-xs text-brand-ink/60 mb-2">Agartala, Tripura, India</p>
              <a href="mailto:atsfy.tech.info@gmail.com" className="text-brand-orange-dark hover:underline text-sm font-semibold">
                atsfy.tech.info@gmail.com
              </a>
            </div>
          </div>
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
