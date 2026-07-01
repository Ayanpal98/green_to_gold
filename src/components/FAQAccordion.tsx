import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Search, Filter, HelpCircle, BookOpen, Layers, Award } from "lucide-react";
import { FAQ_ITEMS } from "../lib/seoData";

export function FAQAccordion() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<"all" | "about" | "dss" | "sustainability" | "investment">("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Group items into categories based on keywords for beautiful filter tabs
  const categorizedFAQs = useMemo(() => {
    return FAQ_ITEMS.map((item, index) => {
      let category: "about" | "dss" | "sustainability" | "investment" = "about";
      const q = item.question.toLowerCase();
      const a = item.answer.toLowerCase();

      if (q.includes("dss") || q.includes("diagnostics") || q.includes("ai")) {
        category = "dss";
      } else if (q.includes("board") || q.includes("palf") || q.includes("fiber") || q.includes("bamboo") || q.includes("tableware") || q.includes("soil") || q.includes("biodegradable")) {
        category = "sustainability";
      } else if (q.includes("investor") || q.includes("esg") || q.includes("cooperatives") || q.includes("partners") || q.includes("paradox")) {
        category = "investment";
      }

      return {
        ...item,
        category,
        originalIndex: index,
      };
    });
  }, []);

  const filteredFAQs = useMemo(() => {
    return categorizedFAQs.filter((faq) => {
      const matchesSearch =
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [categorizedFAQs, searchQuery, activeCategory]);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      id="faq-knowledge-base" 
      className="py-24 px-6 bg-brand-paper" 
      aria-labelledby="faq-title"
    >
      <div className="max-w-4xl mx-auto">
        {/* Decorative Badge */}
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] bg-brand-green/10 text-brand-green border border-brand-green/10">
            <HelpCircle className="w-3.5 h-3.5" /> FAQ & Knowledge Base
          </span>
        </div>

        {/* Dynamic Titles Optimized for Featured Snippets / AEO */}
        <h2 
          id="faq-title" 
          className="text-3xl md:text-4xl font-serif text-brand-ink text-center tracking-tight mb-4"
        >
          Frequently Answered Questions
        </h2>
        <p className="text-sm md:text-base text-brand-ink/60 text-center max-w-2xl mx-auto mb-12">
          An authoritative reference on ATSFY Technologies' sustainable bio-manufacturing platform, pineapple fiber composites, and AI-driven Decision Support Systems (DSS).
        </p>

        {/* Search & Filter Bar */}
        <div className="mb-10 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-ink/40" />
            <input
              type="text"
              placeholder="Search our circular economy knowledge base..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-brand-ink/10 rounded-xl text-sm focus:outline-none focus:border-brand-green/30 focus:ring-2 focus:ring-brand-green/5 transition-all text-brand-ink"
              aria-label="Search FAQs"
            />
          </div>

          {/* Category Quick Filter Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none" role="tablist" aria-label="FAQ Categories">
            {[
              { id: "all", label: "All Topics" },
              { id: "about", label: "About ATSFY" },
              { id: "dss", label: "BioSense DSS™" },
              { id: "sustainability", label: "Sustainability" },
              { id: "investment", label: "Enterprise" },
            ].map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeCategory === tab.id}
                onClick={() => {
                  setActiveCategory(tab.id as any);
                  setOpenIndex(null);
                }}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap border cursor-pointer ${
                  activeCategory === tab.id
                    ? "bg-brand-green text-white border-brand-green shadow-md"
                    : "bg-white text-brand-ink/60 border-brand-ink/5 hover:border-brand-ink/10 hover:text-brand-ink"
                }`}
              >
                {tab.id === "dss" && <span className="inline-block w-1.5 h-1.5 bg-[#D4AF37] rounded-full mr-1.5 animate-pulse" />}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* FAQs List Container with Motion */}
        <div className="space-y-4" role="presentation">
          <AnimatePresence mode="popLayout">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq) => {
                const isOpen = openIndex === faq.originalIndex;
                return (
                  <motion.div
                    key={faq.originalIndex}
                    layout="position"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white border border-brand-ink/5 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-brand-ink/10 transition-all duration-300"
                  >
                    <h3>
                      <button
                        onClick={() => toggleAccordion(faq.originalIndex)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-answer-${faq.originalIndex}`}
                        id={`faq-question-${faq.originalIndex}`}
                        className="w-full text-left px-6 py-5 flex items-start justify-between gap-4 font-sans font-medium text-brand-ink text-sm md:text-base hover:text-brand-green transition-colors cursor-pointer group"
                      >
                        <span className="flex items-start gap-3">
                          <span className="mt-0.5 text-brand-green opacity-40 font-mono text-xs font-bold">
                            {(faq.originalIndex + 1).toString().padStart(2, "0")}
                          </span>
                          <span className="leading-snug">{faq.question}</span>
                        </span>
                        <ChevronDown 
                          className={`w-5 h-5 text-brand-ink/40 mt-0.5 transition-transform duration-300 flex-shrink-0 group-hover:text-brand-green ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </h3>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`faq-answer-${faq.originalIndex}`}
                          role="region"
                          aria-labelledby={`faq-question-${faq.originalIndex}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <div className="px-6 pb-6 pt-1 text-xs md:text-sm text-brand-ink/70 leading-relaxed border-t border-brand-ink/[0.03] bg-brand-paper/30 font-sans">
                            {/* Structured AI-readable paragraph block */}
                            <p className="mb-2">{faq.answer}</p>
                            <div className="mt-4 flex items-center gap-4 text-[10px] text-brand-ink/40 tracking-wider uppercase font-bold">
                              <span>Topic: {faq.category === "dss" ? "AI Decision Intelligence" : faq.category}</span>
                              <span>•</span>
                              <span>Verified Publisher: ATSFY Tech</span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            ) : (
              <motion.div 
                layout
                className="text-center py-12 px-6 bg-white border border-dashed border-brand-ink/10 rounded-2xl"
              >
                <div className="w-12 h-12 rounded-full bg-brand-ink/5 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-5 h-5 text-brand-ink/40" />
                </div>
                <p className="text-sm font-medium text-brand-ink/60">No results found matching your search.</p>
                <button 
                  onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}
                  className="mt-4 text-xs font-bold text-brand-green hover:underline uppercase tracking-wider cursor-pointer"
                >
                  Clear search filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Semantic Context footer for high E-E-A-T and Search intent mapping */}
        <div className="mt-12 text-center text-xs text-brand-ink/40 font-mono p-4 bg-white border border-brand-ink/5 rounded-xl">
          Authorized metadata generated in Agartala, Tripura, India. Linked to <a href="/dss" className="underline text-brand-green hover:text-brand-orange">BioSense DSS™ Schema</a> &amp; Circular Bioeconomy Frameworks.
        </div>
      </div>
    </section>
  );
}
