import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  Menu, 
  X, 
  Send,
  Globe,
  ChevronDown
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface DropdownItem {
  label: string;
  href: string;
}

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsHovered, setIsProductsHovered] = useState(false);
  const [isAboutHovered, setIsAboutHovered] = useState(false);
  const [isProductsMobileOpen, setIsProductsMobileOpen] = useState(false);
  const [isAboutMobileOpen, setIsAboutMobileOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";
  const { language, setLanguage, t } = useLanguage();

  const handleLinkClick = (href: string) => {
    setIsMenuOpen(false);
    setIsProductsMobileOpen(false);
    setIsAboutMobileOpen(false);

    if (href === "/") {
      if (isHomePage) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate("/");
      }
      return;
    }

    if (href.startsWith("/#")) {
      const id = href.replace("/#", "");
      if (isHomePage) {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        navigate(href);
      }
    } else {
      navigate(href);
    }
  };

  const isHashActive = (hash: string) => {
    return isHomePage && location.hash === hash;
  };

  const productItems: DropdownItem[] = [
    { label: "nav.dss", href: "/dss" },
    { label: "nav.bioboards", href: "/#products" },
    { label: "nav.plates", href: "/#products" },
    { label: "nav.tableware", href: "/#products" }
  ];

  const aboutItems: DropdownItem[] = [
    { label: "nav.vision", href: "/#vision" },
    { label: "nav.roadmap", href: "/#roadmap" },
    { label: "nav.company", href: "/#moat-title" }
  ];

  const isHomeActive = isHomePage && !location.hash;
  const isDssActive = location.pathname === "/dss";
  const isImpactActive = isHashActive("#impact");
  const isProductsActive = isDssActive || isHashActive("#products");
  const isAboutActive = isHashActive("#vision") || isHashActive("#roadmap") || isHashActive("#moat-title");

  return (
    <nav className="fixed top-0 w-full z-50 px-4 md:px-6 py-4" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto flex justify-between items-center glass-card px-4 md:px-8 py-3 md:py-4">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 flex-shrink-0 group" onClick={() => handleLinkClick("/")}>
          <div className="relative">
            <img 
              src="/logo.svg" 
              alt="Green-to-Gold Logo" 
              className="h-10 md:h-14 w-auto object-contain transition-all group-hover:scale-105"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
                (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
              }}
              referrerPolicy="no-referrer"
            />
            <div className="hidden h-10 w-10 md:h-14 md:w-14 bg-gradient-to-br from-brand-green to-brand-orange rounded-xl flex items-center justify-center text-white font-serif text-2xl font-bold shadow-lg">G</div>
            <div className="absolute inset-0 bg-brand-green/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg md:text-xl font-bold tracking-tight text-brand-green leading-none">Green-to-Gold</span>
            <span className="text-[8px] md:text-[10px] uppercase tracking-widest font-bold opacity-40 mt-0.5">{t("common.developedBy")}</span>
          </div>
        </Link>

        {/* Desktop Navigation Links (5 main items) */}
        <div className="hidden xl:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-brand-green/70">
          {/* 1. Home */}
          <button 
            onClick={() => handleLinkClick("/")}
            className={`hover:text-brand-orange transition-colors py-2 font-bold cursor-pointer ${isHomeActive ? 'text-brand-orange' : ''}`}
          >
            {t("nav.home")}
          </button>

          {/* 2. BioSense DSS (Vision Pro styled subtle pill) */}
          <button 
            onClick={() => handleLinkClick("/dss")}
            className="bg-brand-green text-white border border-[#D4AF37] shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_0_20px_rgba(212,175,55,0.45)] hover:border-[#E5C158] hover:scale-[1.02] transition-all duration-300 rounded-full px-5 py-2 text-[12px] font-bold uppercase tracking-widest flex items-center justify-center cursor-pointer h-9 shrink-0"
          >
            {t("nav.dss")}
          </button>

          {/* 3. Products Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setIsProductsHovered(true)}
            onMouseLeave={() => setIsProductsHovered(false)}
          >
            <button className={`flex items-center gap-1 hover:text-brand-orange transition-colors py-2 uppercase tracking-widest font-bold cursor-pointer ${isProductsActive ? 'text-brand-orange' : ''}`}>
              {t("nav.products")}
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isProductsHovered ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {isProductsHovered && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 mt-1 w-56 bg-brand-paper/95 backdrop-blur-md border border-brand-green/10 rounded-2xl p-2 shadow-xl z-50 text-left"
                >
                  {productItems.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => handleLinkClick(item.href)}
                      className="w-full text-left px-4 py-2.5 text-[10px] font-bold text-brand-green/80 hover:text-brand-orange hover:bg-brand-green/5 rounded-xl transition-all block uppercase tracking-wider cursor-pointer"
                    >
                      {t(item.label)}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 4. Impact */}
          <button 
            onClick={() => handleLinkClick("/#impact")}
            className={`hover:text-brand-orange transition-colors py-2 font-bold cursor-pointer ${isImpactActive ? 'text-brand-orange' : ''}`}
          >
            {t("nav.impact")}
          </button>

          {/* 5. About Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setIsAboutHovered(true)}
            onMouseLeave={() => setIsAboutHovered(false)}
          >
            <button className={`flex items-center gap-1 hover:text-brand-orange transition-colors py-2 uppercase tracking-widest font-bold cursor-pointer ${isAboutActive ? 'text-brand-orange' : ''}`}>
              {t("nav.about")}
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isAboutHovered ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {isAboutHovered && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 mt-1 w-56 bg-brand-paper/95 backdrop-blur-md border border-brand-green/10 rounded-2xl p-2 shadow-xl z-50 text-left"
                >
                  {aboutItems.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => handleLinkClick(item.href)}
                      className="w-full text-left px-4 py-2.5 text-[10px] font-bold text-brand-green/80 hover:text-brand-orange hover:bg-brand-green/5 rounded-xl transition-all block uppercase tracking-wider cursor-pointer"
                    >
                      {t(item.label)}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right side controls: Language Switcher & Partner Button */}
        <div className="flex items-center gap-3">
          {/* Language Switcher Pill */}
          <div className="flex items-center gap-1 bg-brand-green/5 border border-brand-green/10 rounded-full p-1 text-[9px] font-bold">
            <Globe className="w-3 h-3 text-brand-green/70 ml-1.5 mr-0.5" />
            {(['en', 'bn', 'kok'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-2 py-1 rounded-full uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  language === lang
                    ? "bg-brand-green text-white shadow-sm"
                    : "text-brand-ink/50 hover:text-brand-green hover:bg-brand-green/5"
                }`}
              >
                {lang === 'en' ? 'EN' : lang === 'bn' ? 'বাংলা' : 'KOK'}
              </button>
            ))}
          </div>

          {/* 6. Partner Button (CTA) */}
          <a 
            href="/#partner" 
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick("/#partner");
            }}
            className="hidden sm:inline-flex bg-brand-green text-white px-5 md:px-6 py-2 md:py-2.5 rounded-full text-[10px] md:text-xs font-bold hover:bg-brand-ink transition-all uppercase tracking-widest shadow-lg shadow-brand-green/20"
          >
            {t("nav.partnerButton")}
          </a>
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="xl:hidden p-2 text-brand-green hover:bg-brand-green/5 rounded-xl transition-colors cursor-pointer"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-24 left-4 right-4 bg-brand-paper/95 backdrop-blur-2xl border border-white/20 rounded-[32px] p-8 shadow-2xl xl:hidden z-50 overflow-hidden text-left"
          >
            <div className="flex flex-col gap-6">
              {/* Mobile Language Switcher */}
              <div className="flex items-center justify-between pb-4 border-b border-brand-green/10">
                <div className="flex items-center gap-2 text-brand-green/70 text-xs font-bold uppercase tracking-widest">
                  <Globe className="w-4 h-4" />
                  Language
                </div>
                <div className="flex items-center gap-1 bg-brand-green/5 border border-brand-green/10 rounded-full p-1 text-[10px] font-bold">
                  {(['en', 'bn', 'kok'] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      className={`px-3 py-1.5 rounded-full uppercase tracking-wider transition-all cursor-pointer ${
                        language === lang
                          ? "bg-brand-green text-white shadow-sm"
                          : "text-brand-ink/50 hover:text-brand-green"
                      }`}
                    >
                      {lang === 'en' ? 'English' : lang === 'bn' ? 'বাংলা' : 'Kokborok'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Links with accordions */}
              <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto pr-2">
                {/* 1. Home */}
                <button
                  onClick={() => handleLinkClick("/")}
                  className="text-left text-2xl font-serif text-brand-green hover:text-brand-orange transition-colors py-1 cursor-pointer"
                >
                  {t("nav.home")}
                </button>

                {/* 2. BioSense DSS (Vision Pro styled subtle pill) */}
                <div className="py-2">
                  <button
                    onClick={() => handleLinkClick("/dss")}
                    className="inline-flex items-center justify-center bg-brand-green text-white border border-[#D4AF37] shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_0_20px_rgba(212,175,55,0.45)] hover:border-[#E5C158] hover:scale-[1.02] rounded-full px-5 py-2 text-sm font-bold uppercase tracking-widest cursor-pointer transition-all duration-300"
                  >
                    {t("nav.dss")}
                  </button>
                </div>

                {/* 3. Products Dropdown Accordion */}
                <div className="flex flex-col">
                  <button
                    onClick={() => setIsProductsMobileOpen(!isProductsMobileOpen)}
                    className="flex justify-between items-center text-left text-2xl font-serif text-brand-green hover:text-brand-orange transition-colors py-1 cursor-pointer"
                  >
                    {t("nav.products")}
                    <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isProductsMobileOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {isProductsMobileOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden pl-4 flex flex-col gap-2 mt-2 border-l-2 border-brand-orange/20"
                      >
                        {productItems.map((item) => (
                          <button
                            key={item.label}
                            onClick={() => handleLinkClick(item.href)}
                            className="text-left text-sm font-bold text-brand-green/70 hover:text-brand-orange transition-colors py-1.5 uppercase tracking-wide cursor-pointer"
                          >
                            {t(item.label)}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 4. Impact */}
                <button
                  onClick={() => handleLinkClick("/#impact")}
                  className="text-left text-2xl font-serif text-brand-green hover:text-brand-orange transition-colors py-1 cursor-pointer"
                >
                  {t("nav.impact")}
                </button>

                {/* 5. About Dropdown Accordion */}
                <div className="flex flex-col">
                  <button
                    onClick={() => setIsAboutMobileOpen(!isAboutMobileOpen)}
                    className="flex justify-between items-center text-left text-2xl font-serif text-brand-green hover:text-brand-orange transition-colors py-1 cursor-pointer"
                  >
                    {t("nav.about")}
                    <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isAboutMobileOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {isAboutMobileOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden pl-4 flex flex-col gap-2 mt-2 border-l-2 border-brand-orange/20"
                      >
                        {aboutItems.map((item) => (
                          <button
                            key={item.label}
                            onClick={() => handleLinkClick(item.href)}
                            className="text-left text-sm font-bold text-brand-green/70 hover:text-brand-orange transition-colors py-1.5 uppercase tracking-wide cursor-pointer"
                          >
                            {t(item.label)}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              
              {/* Partner CTA */}
              <div className="mt-4 pt-4 border-t border-brand-green/10">
                <a 
                  href="/#partner" 
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick("/#partner");
                  }}
                  className="flex justify-center items-center gap-2 w-full bg-brand-orange text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-xs"
                >
                  {t("nav.startCoop")}
                  <Send className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
