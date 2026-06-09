import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  TrendingUp, 
  TrendingDown, 
  MapPin, 
  DollarSign, 
  Info, 
  Activity, 
  ShieldAlert, 
  ArrowRight, 
  RefreshCw,
  Search,
  Scale,
  Calendar,
  Layers,
  Truck,
  HelpCircle,
  Percent
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface CropProfitCandidate {
  cropName: string;
  inputCostPerBigha: number;
  expectedRevenuePerBigha: number;
  netProfitPerBigha: number;
  riskAssessment: string;
}

interface MarketTemporalAdvisory {
  currentPrice: number;
  trend: "Rising" | "Volatile" | "Stable" | "Declining" | string;
  recommendation: "HOLD" | "SELL" | "PARTIAL DISCHARGE" | string;
  targetPrice1Month: number;
  rationale: string;
}

interface SpatialSpreadItem {
  mandiName: string;
  pricePerQuintal: number;
  deliveryTimeHrs: number;
  netArbitrageGain: number;
  advisoryNote: string;
}

interface MarketIntelligenceResult {
  temporalAdvisory: MarketTemporalAdvisory;
  profitabilityComparison: {
    analysisExplanation: string;
    candidates: CropProfitCandidate[];
    companionSuggestion: string;
  };
  spatialSpread: SpatialSpreadItem[];
}

export const MarketIntelligence: React.FC = () => {
  const { t, language } = useLanguage();
  
  const [selectedCrop, setSelectedCrop] = useState("Rice");
  const [selectedDistrict, setSelectedDistrict] = useState("West Tripura (Agartala)");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<MarketIntelligenceResult | null>(null);

  // Available crops for prediction
  const cropOptions = [
    { value: "Rice", label: language === 'bn' ? "ধান (Maimung)" : "Rice (Maimung)" },
    { value: "Pineapple", label: language === 'bn' ? "আনারস (Anarash)" : "Pineapple (Anarash)" },
    { value: "Rubber", label: language === 'bn' ? "রাবার (Latex)" : "Rubber (Latex)" },
    { value: "Jute", label: language === 'bn' ? "পাট (Pat)" : "Jute (Pat)" },
    { value: "Bamboo", label: language === 'bn' ? "বাঁশ (Muli)" : "Bamboo (Muli)" },
    { value: "Sugarcane", label: language === 'bn' ? "আঁখ (Bashbi)" : "Sugarcane" }
  ];

  // Tripura districts for regional customization
  const districts = [
    "West Tripura (Agartala)",
    "Gomati (Udaipur)",
    "North Tripura (Dharmanagar)",
    "South Tripura (Belonia)",
    "Khowai",
    "Sepahijala (Bishalgarh)",
    "Dhalai (Ambassa)",
    "Unakoti (Kailashahar)"
  ];

  const fetchMarketIntelligence = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/market-analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ crop: selectedCrop, district: selectedDistrict })
      });

      if (!response.ok) {
        throw new Error("Unable to contact market analysis node. Falling back to local data blocks.");
      }

      const resData = await response.json();
      if (resData.success && resData.data) {
        setResult(resData.data);
      } else {
        throw new Error("Invalid structure returned by market specialist model.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to retrieve real-time market indices. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Run automatically on first render to populate the screen beautifully
  React.useEffect(() => {
    fetchMarketIntelligence();
  }, [selectedCrop, selectedDistrict]);

  const getTrendBadgeColor = (trend: string) => {
    if (trend.toLowerCase().includes("rising")) return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
    if (trend.toLowerCase().includes("declining")) return "bg-red-500/10 text-red-600 border-red-500/20";
    if (trend.toLowerCase().includes("volatile")) return "bg-amber-500/10 text-amber-600 border-amber-500/20";
    return "bg-blue-500/10 text-blue-600 border-blue-500/20";
  };

  const getRecommendationBadgeColor = (rec: string) => {
    if (rec.toLowerCase().includes("sell")) return "bg-red-500 text-white shadow-lg shadow-red-500/15";
    if (rec.toLowerCase().includes("hold")) return "bg-emerald-600 text-white shadow-lg shadow-emerald-600/15";
    return "bg-amber-500 text-white shadow-lg shadow-amber-500/15";
  };

  return (
    <div id="market-intel-section" className="w-full space-y-8">
      {/* 1. Introductory Controls Panel */}
      <div className="glass-card p-6 border-brand-green/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h3 className="text-xl font-serif text-brand-green font-bold flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-brand-orange animate-pulse" />
            {language === 'bn' ? "কৃষি বাজার বুদ্ধিমত্তা প্ল্যাটফর্ম" : "Market Intelligence for Farmers"}
          </h3>
          <p className="text-xs text-brand-ink/55 mt-1">
            Analyzing price spreads, local mandi arbitrage, and crop profitability metrics across Tripura.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          {/* Crop Selector */}
          <div className="flex-1 md:flex-none">
            <label className="block text-[9px] font-bold uppercase text-brand-ink/40 mb-1">Select Crop</label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full md:w-48 px-3 py-2 bg-brand-green/[0.03] border border-brand-green/10 rounded-xl text-xs font-bold text-brand-ink focus:outline-none focus:border-brand-green"
            >
              {cropOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* District Selector */}
          <div className="flex-1 md:flex-none">
            <label className="block text-[9px] font-bold uppercase text-brand-ink/40 mb-1">Your District</label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full md:w-56 px-3 py-2 bg-brand-green/[0.03] border border-brand-green/10 rounded-xl text-xs font-bold text-brand-ink focus:outline-none focus:border-brand-green"
            >
              {districts.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={fetchMarketIntelligence}
              disabled={loading}
              className="px-4 py-2 bg-brand-orange hover:bg-brand-orange-dark text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 shadow-md disabled:opacity-50"
            >
              {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
              {language === 'bn' ? "রিফ্রেশ" : "Refresh"}
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-600 rounded-xl text-xs flex gap-2">
          <ShieldAlert className="w-4 h-4 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* 2. Interactive Analytical Sections */}
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="market-loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="glass-card border-brand-green/10 p-12 min-h-[400px] flex flex-col items-center justify-center text-center"
          >
            <div className="w-12 h-12 rounded-full border-4 border-brand-green/10 border-t-brand-orange animate-spin mb-4" />
            <h4 className="text-md font-serif font-bold text-brand-green">Evaluating Ag-Market Indices...</h4>
            <p className="text-xs text-brand-ink/40 max-w-sm mt-1">
              Fetching mandi volumes, local warehouse holding margins, and post-harvest seasonality factors for Tripura.
            </p>
          </motion.div>
        ) : result ? (
          <motion.div
            key="market-result"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* Left Column: Temporal Advisories (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Question A: Should I sell today or wait? */}
              <div className="glass-card p-6 border-brand-green/10 relative overflow-hidden flex flex-col justify-between h-full">
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-orange/5 rounded-bl-full pointer-events-none" />
                
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-brand-orange/10 p-1.5 rounded-lg text-brand-orange font-bold text-xs">A</span>
                    <h4 className="text-md font-serif font-bold text-brand-ink">
                      Should I sell today or wait?
                    </h4>
                  </div>

                  {/* Recommendation block */}
                  <div className="p-4 bg-brand-green/[0.02] border border-brand-green/10 rounded-2xl mb-6 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-brand-ink/40 tracking-wider">
                        KVK Recommended Action
                      </span>
                      <h5 className="text-lg font-serif font-black text-brand-green mt-1 flex items-center gap-1.5">
                        {result.temporalAdvisory.recommendation}
                      </h5>
                    </div>
                    <div className="px-3 py-1.5 rounded-full border text-[10px] uppercase font-bold tracking-wider flex items-center gap-1 bg-white">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-ping" />
                      Dynamic Alert
                    </div>
                  </div>

                  {/* Price Comparison Gauge */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 bg-brand-green/[0.04] rounded-xl border border-brand-green/5 text-center">
                      <span className="text-[9px] uppercase font-bold text-brand-ink/40 tracking-wider block mb-1">
                        Today's Mandi Price
                      </span>
                      <span className="text-2xl font-serif font-bold text-brand-green">
                        ₹{result.temporalAdvisory.currentPrice}
                      </span>
                      <span className="text-[9px] text-brand-ink/40 block mt-1">per Quintal</span>
                    </div>

                    <div className="p-4 bg-brand-orange/[0.03] rounded-xl border border-brand-orange/5 text-center">
                      <span className="text-[9px] uppercase font-bold text-brand-ink/40 tracking-wider block mb-1">
                        1-Month Target Forecaster
                      </span>
                      <span className="text-2xl font-serif font-bold text-brand-orange">
                        ₹{result.temporalAdvisory.targetPrice1Month}
                      </span>
                      <span className="text-[9px] text-brand-ink/40 block mt-1">per Quintal</span>
                    </div>
                  </div>

                  {/* Price change / direction */}
                  <div className="flex justify-between items-center bg-brand-green/[0.02] border border-brand-green/5 p-3 rounded-xl mb-6">
                    <span className="text-xs text-brand-ink/60 font-medium">Projected monthly trajectory</span>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border flex items-center gap-1 uppercase ${getTrendBadgeColor(result.temporalAdvisory.trend)}`}>
                      {result.temporalAdvisory.trend.toLowerCase().includes("rising") ? (
                        <TrendingUp className="w-3.5 h-3.5" />
                      ) : (
                        <TrendingDown className="w-3.5 h-3.5" />
                      )}
                      {result.temporalAdvisory.trend}
                    </span>
                  </div>

                  {/* Rationale copy */}
                  <div className="bg-brand-green/[0.02] border-l-4 border-brand-orange p-4 rounded-r-xl">
                    <h6 className="text-[10px] uppercase font-bold text-brand-orange tracking-widest mb-1.5 flex items-center gap-1">
                      <Info className="w-3.5 h-3.5" /> Economic Trade Explanation
                    </h6>
                    <p className="text-xs text-brand-ink/75 leading-relaxed">
                      {result.temporalAdvisory.rationale}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Profitability Comparison & Spreads (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              {/* Question B: Which crop will be more profitable next season? */}
              <div className="glass-card p-6 border-brand-green/10">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-brand-orange/10 p-1.5 rounded-lg text-brand-orange font-bold text-xs">B</span>
                  <h4 className="text-md font-serif font-bold text-brand-ink">
                    Which crop will be more profitable next season?
                  </h4>
                </div>
                
                <p className="text-xs text-brand-ink/60 mb-6 leading-relaxed">
                  {result.profitabilityComparison.analysisExplanation}
                </p>

                {/* Candidate columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {result.profitabilityComparison.candidates.map((cand, idx) => {
                    // Normalize Risk Assessments to colors
                    const riskLower = cand.riskAssessment.toLowerCase();
                    const riskColor = riskLower.includes("low") 
                      ? "text-emerald-600 bg-emerald-500/10 border-emerald-500/20" 
                      : riskLower.includes("medium")
                      ? "text-amber-500 bg-amber-500/10 border-amber-500/20"
                      : "text-red-500 bg-red-500/10 border-red-500/20";

                    return (
                      <div 
                        key={idx} 
                        className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                          idx === 0 
                            ? "border-brand-green/30 bg-brand-green/[0.02] ring-2 ring-brand-green/5 shadow-md shadow-brand-green/5" 
                            : "border-brand-green/10 bg-white"
                        }`}
                      >
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <span className="font-bold text-sm text-brand-green font-serif leading-tight">
                              {cand.cropName}
                            </span>
                            {idx === 0 && (
                              <span className="px-1.5 py-0.5 rounded text-[8px] bg-brand-green text-white font-bold uppercase tracking-wide">
                                Best
                              </span>
                            )}
                          </div>
                          
                          <div className="space-y-1 my-3 text-[11px] text-brand-ink/55">
                            <div className="flex justify-between">
                              <span>Cost / bigha:</span>
                              <span className="font-mono font-bold text-brand-ink">₹{cand.inputCostPerBigha}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Revenue / bigha:</span>
                              <span className="font-mono font-bold text-brand-ink">₹{cand.expectedRevenuePerBigha}</span>
                            </div>
                          </div>
                        </div>

                        <div className="border-t border-brand-green/5 pt-3 mt-1">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] text-brand-ink/40">Net Profit</span>
                            <span className="font-mono font-bold text-sm text-brand-green">
                              ₹{cand.netProfitPerBigha}
                            </span>
                          </div>
                          <div className="mt-2 text-[8px] font-bold uppercase py-0.5 px-2 rounded-full border text-center inline-block w-full max-w-full text-ellipsis overflow-hidden whitespace-nowrap bg-white">
                            Risk: <span className="font-black">{cand.riskAssessment}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* companion advice bar */}
                <div className="bg-brand-green/5 border border-brand-green/10 p-4 rounded-xl flex items-start gap-2.5">
                  <Scale className="w-4 h-4 text-brand-green mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="text-xs font-bold text-brand-green uppercase tracking-wide">
                      Multi-Tier Intercropping Recommendation
                    </h5>
                    <p className="text-xs text-brand-ink/75 mt-0.5 leading-relaxed">
                      {result.profitabilityComparison.companionSuggestion}
                    </p>
                  </div>
                </div>
              </div>

              {/* Question C: What is happening in nearby markets? */}
              <div className="glass-card p-6 border-brand-green/10">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-brand-orange/10 p-1.5 rounded-lg text-brand-orange font-bold text-xs">C</span>
                  <h4 className="text-md font-serif font-bold text-brand-ink">
                    What is happening in nearby markets? (Tripura Price Spread)
                  </h4>
                </div>

                <div className="overflow-hidden border border-brand-green/10 rounded-2xl">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-brand-green/[0.04] text-[10px] uppercase font-bold text-brand-green tracking-wider border-b border-brand-green/10">
                        <th className="p-3">Nearby Mandi</th>
                        <th className="p-3">Mandi Rate</th>
                        <th className="p-3 text-center">Transit Delay</th>
                        <th className="p-3 text-right text-brand-orange">Arbitrage Margin</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-green/5 bg-white">
                      {result.spatialSpread.map((spread, index) => {
                        const isGain = spread.netArbitrageGain > 0;
                        const arbitBg = isGain 
                          ? "text-emerald-600 bg-emerald-500/10 font-bold" 
                          : "text-brand-ink/40 bg-brand-ink/5";

                        return (
                          <tr key={index} className="hover:bg-brand-green/[0.01] transition-all text-xs">
                            <td className="p-3">
                              <span className="font-bold text-brand-green block">{spread.mandiName}</span>
                              <span className="text-[10px] text-brand-ink/40">{spread.advisoryNote}</span>
                            </td>
                            <td className="p-3 font-mono font-bold text-brand-ink">
                              ₹{spread.pricePerQuintal}<span className="text-[10px] font-sans font-normal text-brand-ink/40">/q</span>
                            </td>
                            <td className="p-3 text-center font-mono text-brand-ink/65">
                              {spread.deliveryTimeHrs} hrs
                            </td>
                            <td className="p-3 text-right">
                              <span className={`px-2.5 py-1 rounded-lg text-xs font-mono inline-block ${arbitBg}`}>
                                {isGain ? `+₹${spread.netArbitrageGain}` : `₹${spread.netArbitrageGain}`}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 flex gap-1.5 items-center text-[11px] text-brand-ink/45">
                  <Truck className="w-3.5 h-3.5 text-brand-orange" />
                  <span>Arbitrage margin calculated after deducting ₹120/quintal tractor logistics and freight overheads.</span>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};
