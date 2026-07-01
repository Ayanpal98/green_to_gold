import { motion } from "motion/react";
import { FileText, Award, ShieldCheck, Scale, Globe, ArrowLeft } from "lucide-react";
import { SEO } from "../components/SEO";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Navbar } from "../components/Navbar";
import { Link } from "react-router-dom";
import { 
  ORGANIZATION_SCHEMA, 
  LOCAL_BUSINESS_SCHEMA, 
  BREADCRUMB_SCHEMA 
} from "../lib/seoData";

export default function TermsOfService() {
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://greentogold.in/terms-of-service#webpage",
    "url": "https://greentogold.in/terms-of-service",
    "name": "Terms of Service & Cooperative Policies - Green-to-Gold | ATSFY Technologies",
    "description": "Standard service terms, cooperative agreements, and user responsibilities for the Green-to-Gold platform and BioSense DSS™."
  };

  return (
    <div className="min-h-screen bg-brand-paper text-brand-ink selection:bg-brand-orange/20 selection:text-brand-orange-dark font-sans relative overflow-x-hidden">
      <Navbar />
      
      <SEO 
        title="Terms of Service &amp; Cooperative Policies | Green-to-Gold"
        description="Understand the terms of service, partnership agreements, and regulatory guidelines for users and cooperatives on the Green-to-Gold platform."
        keywords="terms of service, legal terms, partnership agreement, ATSFY Technologies, BioSense DSS terms, crop sourcing rules"
        canonicalPath="/terms-of-service"
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
            <Scale className="w-3.5 h-3.5" /> Legal Framework &amp; Agreements
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif text-brand-green tracking-tight leading-tight mb-6"
          >
            Terms of Service &amp; Sourcing Policies
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-brand-ink/70 leading-relaxed font-sans max-w-3xl"
          >
            Last Updated: June 30, 2026. This document governs user interactions, cooperative obligations, and general digital terms when using Green-to-Gold and BioSense DSS™.
          </motion.p>
        </header>

        {/* Dynamic Highlight Card */}
        <section className="glass-card p-8 mb-16 border-l-4 border-l-brand-orange relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-full blur-2xl" />
          <h2 className="text-xs uppercase tracking-widest font-bold text-brand-orange-dark mb-3">Governance Summary</h2>
          <p className="text-sm text-brand-ink/80 leading-relaxed font-medium">
            By accessing this website, submitting inquiry forms, or logging into the BioSense DSS™ platform, you agree to comply with these terms, local agricultural guidelines, and fair-trade sourcing requirements established by ATSFY Technologies.
          </p>
        </section>

        {/* SECTION 1: Permitted Use */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif text-brand-green tracking-tight mb-6 border-b border-brand-green/10 pb-3">
            1. Platform Usage &amp; Eligibility
          </h2>
          <div className="space-y-4 text-sm md:text-base text-brand-ink/70 leading-relaxed">
            <p>
              The Green-to-Gold digital interface and BioSense DSS™ software are intended for local agricultural coordinators, verified farming cooperatives, self-help groups (SHGs), buyers of sustainable composite boards, and environmental researchers.
            </p>
            <p>
              You agree not to modify, reverse-engineer, or maliciously target our AI diagnostic tools, supply-chain ledger interfaces, or crop estimation algorithms. Unauthorized access to administrative modules of BioSense DSS™ will result in immediate termination of partner access.
            </p>
          </div>
        </section>

        {/* SECTION 2: Cooperative Sourcing Rules */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif text-brand-green tracking-tight mb-6 border-b border-brand-green/10 pb-3">
            2. Biomass Sourcing &amp; Quality Standards
          </h2>
          <p className="text-sm md:text-base text-brand-ink/70 leading-relaxed mb-4">
            Cooperative entities and farming coordinators participating in our raw material collection networks agree to maintain core sustainability standards:
          </p>
          <div className="grid md:grid-cols-2 gap-6 mb-4">
            <div className="p-6 bg-brand-green/5 border border-brand-green/10 rounded-2xl">
              <h4 className="font-bold text-brand-green mb-2 uppercase tracking-wider text-xs flex items-center gap-2">
                <Award className="w-4 h-4 text-brand-orange-dark" /> Organic Sourcing Only
              </h4>
              <p className="text-xs text-brand-ink/60 leading-relaxed">
                Aggregated pineapple leaves, bamboo shavings, and crop residues must be free from chemical polymer contaminations, heavy plastic contaminants, or hazardous residues.
              </p>
            </div>
            <div className="p-6 bg-brand-orange/5 border border-brand-orange/10 rounded-2xl">
              <h4 className="font-bold text-brand-orange-dark mb-2 uppercase tracking-wider text-xs flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-green" /> Verifiable Farmer Pay
              </h4>
              <p className="text-xs text-brand-ink/60 leading-relaxed">
                Cooperative coordinators must accurately log and distribute agricultural waste acquisition payouts directly to regional farmers, supporting the local financial inclusion framework.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: AI Diagnostic Disclaimer */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif text-brand-green tracking-tight mb-6 border-b border-brand-green/10 pb-3">
            3. AI Crop Diagnostics Disclaimer
          </h2>
          <div className="space-y-4 text-sm md:text-base text-brand-ink/70 leading-relaxed">
            <p>
              The BioSense DSS™ Crop Disease Diagnostics module utilizes computer vision algorithms to identify potential plant diseases from field photographs. 
            </p>
            <p>
              These automated neural classifications are provided for informational and preliminary screening purposes. They do not replace formal laboratory phytosanitary testing. Farmers and coordinators are advised to consult with regional Krishi Vigyan Kendra (KVK) extension officers before applying extensive chemical or physical adjustments to their crops.
            </p>
          </div>
        </section>

        {/* SECTION 4: Intellectual Property */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif text-brand-green tracking-tight mb-6 border-b border-brand-green/10 pb-3">
            4. Proprietary Rights &amp; Trademarks
          </h2>
          <p className="text-sm md:text-base text-brand-ink/70 leading-relaxed">
            The concepts, UI elements, proprietary algorithms, logo systems, and branding text associated with Green-to-Gold and the BioSense DSS™ platform are the intellectual property of ATSFY Technologies Private Limited. You may not reproduce, redistribute, or use our corporate materials without explicit written consent.
          </p>
        </section>

        {/* SECTION 5: Limitation of Liability */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif text-brand-green tracking-tight mb-6 border-b border-brand-green/10 pb-3">
            5. Limitation of Liability
          </h2>
          <p className="text-sm md:text-base text-brand-ink/70 leading-relaxed">
            ATSFY Technologies will not be liable for any indirect, incidental, or consequential damages resulting from platform downtime, agricultural harvest fluctuations, weather-driven transport delays, or incorrect crop-disease actions taken based on automated neural diagnostics.
          </p>
        </section>

        {/* SECTION 6: Inquiries and Terms Modification */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif text-brand-green tracking-tight mb-6 border-b border-brand-green/10 pb-3">
            6. Policy Changes &amp; Contact
          </h2>
          <div className="space-y-4 text-sm md:text-base text-brand-ink/70 leading-relaxed">
            <p>
              We reserve the right to revise these Terms of Service as our regional operations expand. Your continued engagement with our services constitutes acceptance of any modified policies.
            </p>
            <p>
              For legal inquiries or formal cooperative agreements, please contact ATSFY Technologies at:
            </p>
            <div className="p-6 bg-white border border-brand-ink/5 rounded-2xl inline-block">
              <p className="font-bold text-brand-green mb-1 text-sm">ATSFY Technologies Private Limited</p>
              <p className="text-xs text-brand-ink/60 mb-2">Legal Affairs Division</p>
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
