import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

type PartnershipType = "Investor" | "Farmer" | "Distributor" | "Government" | "Other";

export const PartnerForm = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    email: "",
    type: "Investor" as PartnershipType,
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("success");
      setFormData({ name: "", organization: "", email: "", type: "Investor", message: "" });
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto glass-card p-8 md:p-12 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-orange via-brand-green to-brand-light-green" />
      
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="py-20 text-center space-y-6"
          >
            <div className="w-20 h-20 bg-brand-light-green/20 rounded-full flex items-center justify-center mx-auto text-brand-light-green">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h3 className="text-3xl font-serif text-brand-green">Namaste!</h3>
            <p className="text-brand-ink/60 max-w-md mx-auto">
              Thank you for reaching out. Our team will review your partnership request and get back to you within 48 hours.
            </p>
            <button 
              onClick={() => setStatus("idle")}
              className="text-brand-orange font-bold uppercase tracking-widest text-sm hover:underline"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label htmlFor="name" className="text-xs uppercase tracking-widest font-bold text-brand-ink/40">Full Name</label>
                <input
                  required
                  id="name"
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-brand-paper/50 border-b-2 border-brand-green/10 px-0 py-3 focus:outline-none focus:border-brand-orange transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="organization" className="text-xs uppercase tracking-widest font-bold text-brand-ink/40">Organization</label>
                <input
                  required
                  id="organization"
                  type="text"
                  placeholder="e.g. Tripura Agri-Coop"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  className="w-full bg-brand-paper/50 border-b-2 border-brand-green/10 px-0 py-3 focus:outline-none focus:border-brand-orange transition-colors"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label htmlFor="email" className="text-xs uppercase tracking-widest font-bold text-brand-ink/40">Email Address</label>
                <input
                  required
                  id="email"
                  type="email"
                  placeholder="rahul@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-brand-paper/50 border-b-2 border-brand-green/10 px-0 py-3 focus:outline-none focus:border-brand-orange transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="type" className="text-xs uppercase tracking-widest font-bold text-brand-ink/40">Partnership Type</label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as PartnershipType })}
                  className="w-full bg-brand-paper/50 border-b-2 border-brand-green/10 px-0 py-3 focus:outline-none focus:border-brand-orange transition-colors appearance-none cursor-pointer"
                >
                  <option value="Investor">Investor</option>
                  <option value="Farmer">Farmer / Supplier</option>
                  <option value="Distributor">Distributor</option>
                  <option value="Government">Government / NGO</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-xs uppercase tracking-widest font-bold text-brand-ink/40">Your Message</label>
              <textarea
                required
                id="message"
                rows={4}
                placeholder="How would you like to build Tripura's future with us?"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-brand-paper/50 border-b-2 border-brand-green/10 px-0 py-3 focus:outline-none focus:border-brand-orange transition-colors resize-none"
              />
            </div>

            {status === "error" && (
              <div className="flex items-center gap-2 text-red-500 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>Something went wrong. Please try again.</span>
              </div>
            )}

            <button
              disabled={status === "loading"}
              type="submit"
              className="w-full bg-brand-green text-white py-5 rounded-xl font-bold uppercase tracking-widest hover:bg-brand-light-green transition-all flex items-center justify-center gap-3 disabled:opacity-50 group"
            >
              {status === "loading" ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  Submit Request <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};
