import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  Menu, 
  X, 
  ArrowRight, 
  Send 
} from "lucide-react";

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

export const navLinks: NavLink[] = [
  { label: 'BioSense DSS', href: '/dss' },
  { label: 'The Problem', href: '/#problem' },
  { label: 'The Model', href: '/#solution' },
  { label: 'Products', href: '/#products' },
  { label: 'Vision 2030', href: '/#vision' },
  { label: 'Process', href: '/#process' },
  { label: 'Impact', href: '/#impact' },
  { label: 'Roadmap', href: '/#roadmap' },
  { label: 'Partner', href: '/#partner' }
];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const handleLinkClick = (href: string) => {
    setIsMenuOpen(false);
    if (href.startsWith("/#") && isHomePage) {
      const id = href.replace("/#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 px-4 md:px-6 py-4" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto flex justify-between items-center glass-card px-4 md:px-8 py-3 md:py-4">
        <Link to="/" className="flex items-center gap-3 flex-shrink-0 group">
          <div className="relative">
            <img 
              src="/logo.png" 
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
            <span className="text-[8px] md:text-[10px] uppercase tracking-widest font-bold opacity-40 mt-0.5">by ATSFY Technologies</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden xl:flex items-center gap-6 text-[11px] font-bold uppercase tracking-widest text-brand-green/70">
          {navLinks.map((link) => {
            const isInternalHash = link.href.startsWith("/#");
            const isActive = location.pathname === link.href || (isInternalHash && isHomePage && location.hash === link.href.replace("/", ""));
            
            if (isInternalHash && isHomePage) {
              return (
                <a 
                  key={link.href}
                  href={link.href.replace("/", "")}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className={`hover:text-brand-orange transition-colors relative group py-2 ${isActive ? 'text-brand-orange' : ''}`}
                >
                  {link.label}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-brand-orange transition-all group-hover:w-full ${isActive ? 'w-full' : 'w-0'}`} />
                </a>
              );
            }

            return (
              <Link 
                key={link.href}
                to={link.href} 
                className={`transition-all relative group py-2 hover:text-brand-orange ${
                  link.href === '/dss' 
                    ? 'bg-brand-orange/10 text-brand-orange-dark px-4 py-2 rounded-xl hover:bg-brand-orange hover:text-white' 
                    : isActive ? 'text-brand-orange' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
                {link.href !== '/dss' && (
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-brand-orange transition-all group-hover:w-full ${isActive ? 'w-full' : 'w-0'}`} />
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <a 
            href="/#partner" 
            onClick={(e) => {
              if (isHomePage) {
                e.preventDefault();
                handleLinkClick("/#partner");
              }
            }}
            className="hidden sm:inline-flex bg-brand-green text-white px-5 md:px-6 py-2 md:py-2.5 rounded-full text-[10px] md:text-xs font-bold hover:bg-brand-ink transition-all uppercase tracking-widest shadow-lg shadow-brand-green/20"
          >
            Partner With Us
          </a>
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="xl:hidden p-2 text-brand-green hover:bg-brand-green/5 rounded-xl transition-colors"
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
            className="absolute top-24 left-4 right-4 bg-brand-paper/95 backdrop-blur-2xl border border-white/20 rounded-[32px] p-8 shadow-2xl xl:hidden z-50 overflow-hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link, i) => {
                const isInternalHash = link.href.startsWith("/#");
                
                if (isInternalHash && isHomePage) {
                  return (
                    <motion.a
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      href={link.href.replace("/", "")}
                      onClick={(e) => {
                        e.preventDefault();
                        handleLinkClick(link.href);
                      }}
                      className="text-2xl font-serif text-brand-green hover:text-brand-orange transition-colors flex justify-between items-center group"
                    >
                      {link.label}
                      <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
                    </motion.a>
                  );
                }

                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`text-2xl font-serif transition-colors flex justify-between items-center group ${
                        link.href === '/dss' ? 'text-brand-orange-dark hover:text-brand-orange' : 'text-brand-green hover:text-brand-orange'
                      }`}
                    >
                      {link.label}
                      <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
                    </Link>
                  </motion.div>
                );
              })}
              
              <div className="mt-4 pt-8 border-t border-brand-green/10">
                <a 
                  href="/#partner" 
                  onClick={(e) => {
                    setIsMenuOpen(false);
                    if (isHomePage) {
                      e.preventDefault();
                      handleLinkClick("/#partner");
                    }
                  }}
                  className="flex justify-center items-center gap-2 w-full bg-brand-orange text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-xs"
                >
                  Start Collaboration
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
