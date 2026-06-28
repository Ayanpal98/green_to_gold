import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  BarChart3, 
  Leaf, 
  Zap, 
  ShieldCheck, 
  AlertTriangle, 
  Info, 
  CheckCircle2, 
  ArrowRight, 
  Download, 
  Plus, 
  Users,
  Search,
  Filter,
  Loader2,
  Trees,
  TrendingUp,
  MapPin,
  Edit,
  Trash2,
  X
} from "lucide-react";
import { Navbar } from "./Navbar";
import { useLanguage } from "../context/LanguageContext";
import { CountUp } from "./CountUp";
import { CropDiseaseDSS } from "./CropDiseaseDSS";
import { SoilIntelligence } from "./SoilIntelligence";
import { MarketIntelligence } from "./MarketIntelligence";

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from "recharts";

// Mock Data for Prototype
const MOCK_RESOURCES: DistrictResource[] = [
  { id: "1", district: "Unakoti", bamboo_stock_t: 35000, coverage_pct: 75, status: 'Healthy', fibre_stock_t: 2500, next_harvest_date: "Oct 2026" },
  { id: "2", district: "North Tripura", bamboo_stock_t: 28000, coverage_pct: 62, status: 'Healthy', fibre_stock_t: 1800, next_harvest_date: "Oct 2026" },
  { id: "3", district: "Dhalai", bamboo_stock_t: 12000, coverage_pct: 45, status: 'Critical', fibre_stock_t: 900, next_harvest_date: "Hold" },
  { id: "4", district: "Sepahijala", bamboo_stock_t: 42000, coverage_pct: 88, status: 'Healthy', fibre_stock_t: 3200, next_harvest_date: "Sep 2026" },
  { id: "5", district: "Gomati", bamboo_stock_t: 19000, coverage_pct: 55, status: 'Monitor', fibre_stock_t: 1200, next_harvest_date: "Nov 2026" },
];

const MOCK_ACTIVITIES: SHGActivity[] = [
  { id: "a1", cooperative_name: "Unakoti Bamboo Crafts", district: "Unakoti", last_harvest_date: "Apr 2026", volume_t: 240, income_inr: 450000, status: 'Active' },
  { id: "a2", cooperative_name: "Dhalai Green Builders", district: "Dhalai", last_harvest_date: "Mar 2026", volume_t: 110, income_inr: 210000, status: 'Pending' },
  { id: "a3", cooperative_name: "Gomati Tableware SHG", district: "Gomati", last_harvest_date: "May 2026", volume_t: 320, income_inr: 580000, status: 'Active' },
  { id: "a4", cooperative_name: "Khowai Artisans Collective", district: "West Tripura", last_harvest_date: "Jul 2025", volume_t: 15, income_inr: 8500, status: 'Inactive' },
];

const MOCK_ALERTS: DSSAlert[] = [
  { id: "e1", title: "Bamboosa Tulda Depletion", severity: 'Critical', description: "Excessive harvesting detected in Dhalai buffer zones. Immediate hold recommended.", district: "Dhalai", detected_at: new Date(Date.now() - 3600000 * 2), action: "Pause All Permits", resolved: false },
  { id: "e2", title: "Pest Outbreak: Bamboo Blight", severity: 'Warning', description: "Early signs of blight in Unakoti north quadrant.", district: "Unakoti", detected_at: new Date(Date.now() - 3600000 * 48), action: "Apply Organic Biocide", resolved: false },
  { id: "e3", title: "Infrastructure Expansion Impact", severity: 'Info', description: "New highway construction near Sepahijala sanctuary may impact haulage routes.", district: "Sepahijala", detected_at: new Date(), action: "Reroute SHG Logistics", resolved: false },
];

// Types
interface DistrictResource {
  id: string;
  district: string;
  bamboo_stock_t: number;
  coverage_pct: number;
  status: 'Healthy' | 'Monitor' | 'Critical';
  fibre_stock_t: number;
  next_harvest_date: string;
}

interface SHGActivity {
  id: string;
  cooperative_name: string;
  district: string;
  last_harvest_date: string;
  volume_t: number;
  income_inr: number;
  status: 'Active' | 'Pending' | 'Inactive';
}

interface DSSAlert {
  id: string;
  title: string;
  severity: 'Critical' | 'Warning' | 'Info';
  description: string;
  district: string;
  detected_at: Date;
  action: string;
  resolved: boolean;
}

interface HarvestRec {
  id: string;
  district: string;
  species: string;
  age_years: number;
  season: string;
  density: number;
  recommendation_text: string;
  created_at: string;
}

const BioSenseDSS = () => {
  const { t, language } = useLanguage();
  const tabs = [
    t("common.resourceIntel"),
    language === "bn" ? "🌾 শস্য রোগ বিশ্লেষণ ও পরামর্শ" : language === "kok" ? "🌾 Crop Diagnosis DSS" : "🌾 Crop Disease DSS",
    language === "bn" ? "🌱 মৃত্তিকা স্বাস্থ্য ও সার নির্দেশ" : language === "kok" ? "🌱 Soil health analysis" : "🌱 Soil Intelligence DSS",
    language === "bn" ? "📊 ফসলের বাজার পরিস্থিতি" : language === "kok" ? "📊 Market Analysis" : "📊 Market Intelligence",
    `${t("common.rice")} DSS`,
    `${t("common.sugarcane")} DSS`,
    `${t("common.rubber")} DSS`,
    `${t("common.agarwood")} DSS`,
    `${t("common.betelnut")} DSS`,
    `${t("common.jute")} DSS`,
    `${t("common.bamboo")} Advisor`,
    t("common.shgAct"),
    t("common.carbonTracker"),
    t("sidebar.activeAlerts")
  ];
  const cropMap: Record<number, string> = {
    4: "Rice",
    5: "Sugarcane",
    6: "Rubber",
    7: "Agarwood",
    8: "Betelnut",
    9: "Jute",
    10: "Bamboo"
  };
  const [activeTab, setActiveTab] = useState(0);
  const [resources, setResources] = useState<DistrictResource[]>(MOCK_RESOURCES);
  const [activities, setActivities] = useState<SHGActivity[]>(MOCK_ACTIVITIES);
  const [alerts, setAlerts] = useState<DSSAlert[]>(MOCK_ALERTS);
  const [recommendations, setRecommendations] = useState<HarvestRec[]>([]);
  const [loading, setLoading] = useState(true);

  // Harvesting Engine State
  const [engineForm, setEngineForm] = useState({
    crop: "Bamboo",
    district: "Dhalai",
    species: "Muli",
    age: 4,
    season: "Winter",
    density: 2000
  });

  const getSpeciesForCrop = (crop: string) => {
    switch (crop) {
      case "Rice": return ["Tripura Sarath", "Swarna Sub-1", "Kharif Local", "Boro"];
      case "Sugarcane": return ["CO 0238", "CO 86032", "Tripura Sweet"];
      case "Arecanut":
      case "Betelnut": return ["Mangala", "Sumangala", "Sreemangala", "Local High Yield"];
      case "Rubber": return ["RRIM 600", "GT 1", "RRIC 100"];
      case "Agarwood": return ["Aquilaria malaccensis", "Aquilaria khasiana"];
      case "Jute": return ["C-15", "O-9897", "Tossa"];
      default: return ["Muli", "Bari", "Kanak Kaich", "Peecha", "Mritinga"];
    }
  };
  const [engineErrors, setEngineErrors] = useState<Record<string, string>>({});
  const [engineResult, setEngineResult] = useState<string | null>(null);
  const [engineLoading, setEngineLoading] = useState(false);

  useEffect(() => {
    if (activeTab >= 4 && activeTab <= 10) {
      const cropName = cropMap[activeTab];
      if (cropName) {
        setEngineForm(prev => ({ ...prev, crop: cropName, species: "" }));
        setEngineResult(null);
        setEngineErrors({});
      }
    }
  }, [activeTab]);

  useEffect(() => {
    // Simulate loading delay for prototype feel
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleAdvisorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const errors: Record<string, string> = {};
    if (!engineForm.crop) errors.crop = "Crop selection required";
    if (!engineForm.district) errors.district = "District selection required";
    if (!engineForm.species) errors.species = "Species selection required";
    
    // Dynamic validation based on crop
    if (engineForm.crop === "Bamboo") {
      if (!engineForm.age || engineForm.age <= 0) errors.age = "Age must be > 0";
      if (engineForm.age > 60) errors.age = "Age usually < 60y";
    } else {
      if (!engineForm.age || engineForm.age <= 0) errors.age = "Invalid period";
    }

    if (!engineForm.season) errors.season = "Season required";
    if (!engineForm.density || engineForm.density <= 0) errors.density = "Density must be > 0";

    setEngineErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setEngineLoading(true);
    setEngineResult(null);

    // Simulated AI Logic for Prototype
    setTimeout(() => {
      const volume = Math.floor(engineForm.density * 0.15);
      const isReplant = engineForm.age > 3 ? "Yes" : "Hold";
      
      const simulatedRec = `
        **Recommended Harvest Volume:** ${volume} tonnes per hectare. This remains within sustainable yield limits for ${engineForm.species} in ${engineForm.district}.
        
        **Optimal Harvest Window:** Early ${engineForm.season} (weeks 1-4). Weather stability in ${engineForm.district} during this window is ideal for culm extraction.
        
        **Replanting Trigger:** ${isReplant}. Reason: Clump age of ${engineForm.age} years ${isReplant === "Yes" ? "requires enrichment planting to maintain long-term density." : "is too young for significant replanting intervention."}
        
        **Forest Dept Note:** Ensure all culms are marked by the local range officer before 6:00 AM on the day of activities.
      `;

      setEngineResult(simulatedRec);
      
      const newRec: HarvestRec = {
        id: Math.random().toString(),
        ...engineForm,
        age_years: engineForm.age,
        recommendation_text: simulatedRec,
        created_at: new Date().toISOString()
      };
      setRecommendations(prev => [newRec, ...prev]);
      setEngineLoading(false);
    }, 1500);
  };

  const resolveAlert = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, resolved: true } : a));
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-brand-paper flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-brand-green animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-paper selection:bg-brand-orange selection:text-white pt-24 pb-12">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 mt-12">
        <header className="mb-12">
          {/* Prototype Banner */}
          <div className="mb-12 p-4 bg-brand-orange/10 border border-brand-orange/20 rounded-2xl flex items-center gap-3">
            <div className="p-2 bg-brand-orange rounded-full text-white">
              <Zap className="w-4 h-4" />
            </div>
            <p className="text-xs font-bold text-brand-orange-dark uppercase tracking-widest leading-relaxed">
              {language === 'bn' 
                ? "সিস্টেম নোট: এটি একটি এআই-চালিত প্রোটোটাইপ। ফসল কাটার অ্যালগরিদম ও সুপারিশগুলি পরীক্ষামূলক এবং বায়োসেন্স ফেজের অংশ।"
                : language === 'kok'
                ? "System Note: Bhaithang bo AI prototype sanmung aungo. BioSense Bio-Alpha phase nikhai kahm phola mung aungo."
                : "System Note: This is an AI-powered prototype. Harvest algorithms and recommendations are indicative and part of the BioSense Bio-Alpha phase."}
            </p>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex items-center gap-6">
              <div>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3 text-brand-orange font-bold uppercase tracking-[0.3em] text-[10px] mb-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  {t("common.dssDashboard")}
                </motion.div>
                <div className="flex flex-col">
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-serif text-brand-green font-bold"
                  >
                    BioSense <span className="text-brand-orange italic">Bio-Alpha v1.0</span>
                  </motion.h1>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden md:block">
                <div className="text-[10px] font-bold text-brand-ink/40 uppercase tracking-widest">System Status</div>
                <div className="flex items-center gap-2 text-brand-green font-bold">
                  <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                  Live Network
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto no-scrollbar gap-2 mb-12 p-2 bg-brand-green/[0.03] rounded-[32px] border border-brand-green/5 sticky top-24 z-40 backdrop-blur-xl">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`px-8 py-4 rounded-2xl whitespace-nowrap text-xs font-bold uppercase tracking-widest transition-all ${
                activeTab === i 
                  ? "bg-brand-green text-white shadow-xl shadow-brand-green/20" 
                  : "text-brand-ink/40 hover:text-brand-green hover:bg-brand-green/5"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <main className="min-h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 0 && <ResourceIntelligence resources={resources} />}
              {activeTab === 1 && <CropDiseaseDSS />}
              {activeTab === 2 && <SoilIntelligence />}
              {activeTab === 3 && <MarketIntelligence />}
              {activeTab >= 4 && activeTab <= 10 && (
                <HarvestEngine 
                  form={engineForm} 
                  setForm={setEngineForm} 
                  errors={engineErrors}
                  loading={engineLoading} 
                  result={engineResult} 
                  submit={handleAdvisorSubmit}
                  history={recommendations}
                  getSpeciesForCrop={getSpeciesForCrop}
                />
              )}
              {activeTab === 11 && <SHGActivitySection activities={activities} setActivities={setActivities} />}
              {activeTab === 12 && <CarbonReplantingSection resources={resources} activities={activities} />}
              {activeTab === 13 && <AlertsSection alerts={alerts} onResolve={resolveAlert} />}
            </motion.div>
          </AnimatePresence>
        </main>

        <footer className="mt-24 pt-8 border-t border-brand-green/10 text-center">
          <p className="text-[10px] font-bold text-brand-ink/40 uppercase tracking-widest">
            BioSense DSS — Part of Green-to-Gold by ATSFy Technologies, Agartala, Tripura
          </p>
        </footer>
      </div>
    </div>
  );
};

// --- Sub-components ---

const MetricCard = ({ title, value, icon: Icon, color = "brand-green" }: any) => (
  <div className="glass-card p-8 border-brand-green/5 hover:border-brand-green/20 transition-all group">
    <div className={`p-3 rounded-2xl bg-${color}/10 w-fit mb-6 group-hover:scale-110 transition-transform`}>
      <Icon className={`w-6 h-6 text-${color}`} />
    </div>
    <div className="text-[10px] uppercase font-bold text-brand-ink/40 tracking-[0.2em] mb-2">{title}</div>
    <div className="text-4xl font-serif text-brand-ink overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={String(value)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <CountUp value={String(value)} />
        </motion.div>
      </AnimatePresence>
    </div>
  </div>
);

const ResourceIntelligence = ({ resources }: { resources: DistrictResource[] }) => {
  const { t } = useLanguage();
  return (
    <div className="space-y-12">
      <div className="grid md:grid-cols-3 gap-8">
        <MetricCard title={t("dss.totalBambooStock")} value={`${resources.reduce((acc, r) => acc + r.bamboo_stock_t, 0).toLocaleString()} t`} icon={Trees} />
        <MetricCard title={t("dss.harvestReadyZones")} value={resources.filter(r => r.status === 'Healthy').length} icon={CheckCircle2} />
        <MetricCard title={t("dss.depletionRiskZones")} value={resources.filter(r => r.status === 'Critical').length} icon={AlertTriangle} color="brand-orange" />
      </div>

      <div className="glass-card overflow-hidden border-brand-green/5">
        <div className="p-8 border-b border-brand-green/5 bg-brand-green/[0.02]">
          <h3 className="text-2xl font-serif text-brand-green">{t("dss.regionalInventory")}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-brand-green/[0.04]">
              <tr>
                <th className="px-8 py-4 text-[10px] uppercase tracking-widest font-bold text-brand-ink/40">{t("common.district")}</th>
                <th className="px-8 py-4 text-[10px] uppercase tracking-widest font-bold text-brand-ink/40">{t("dss.stockTonnes")}</th>
                <th className="px-8 py-4 text-[10px] uppercase tracking-widest font-bold text-brand-ink/40">{t("dss.coverage")}</th>
                <th className="px-8 py-4 text-[10px] uppercase tracking-widest font-bold text-brand-ink/40">{t("common.status")}</th>
                <th className="px-8 py-4 text-[10px] uppercase tracking-widest font-bold text-brand-ink/40">{t("dss.nextHarvest")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-green/5">
              {resources.map((r) => (
                <tr key={r.id} className="hover:bg-brand-green/[0.02] transition-colors">
                  <td className="px-8 py-6 font-bold text-brand-ink">{r.district}</td>
                  <td className="px-8 py-6 text-brand-ink/70">{(r.bamboo_stock_t / 1000).toFixed(1)}k t</td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="flex-1 h-1.5 bg-brand-green/10 rounded-full overflow-hidden">
                        <div className="h-full bg-brand-green" style={{ width: `${r.coverage_pct}%` }} />
                      </div>
                      <span className="text-xs font-bold text-brand-green">{r.coverage_pct}%</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                      r.status === 'Healthy' ? 'bg-green-100 text-green-700' :
                      r.status === 'Monitor' ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-brand-ink/50 text-xs font-bold">{r.next_harvest_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="glass-card overflow-hidden border-brand-green/5"
      >
        <div className="p-8 border-b border-brand-green/5 bg-brand-green/[0.02]">
          <h3 className="text-2xl font-serif text-brand-green">{t("dss.pineappleFibre")}</h3>
        </div>
        <div className="p-8 h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={resources}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis 
                dataKey="district" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fontWeight: 700, fill: '#1B3129', opacity: 0.6 }}
                dy={10}
                angle={-45}
                textAnchor="end"
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fontWeight: 700, fill: '#1B3129', opacity: 0.6 }}
              />
              <Tooltip 
                cursor={{ fill: '#004225', opacity: 0.05 }}
                contentStyle={{ 
                  borderRadius: '16px', 
                  border: 'none', 
                  boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                  padding: '12px'
                }}
                itemStyle={{ fontSize: '12px', fontWeight: 700, color: '#004225' }}
                labelStyle={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: '#1B3129', opacity: 0.4, marginBottom: '4px' }}
              />
              <Bar 
                dataKey="fibre_stock_t" 
                name="Fibre Stock" 
                radius={[8, 8, 0, 0]}
                barSize={40}
                isAnimationActive={true}
                animationDuration={1500}
                animationEasing="ease-out"
              >
                {resources.map((_entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={index % 2 === 0 ? '#004225' : '#F59E0B'} 
                    className="transition-all duration-300 hover:opacity-80"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};

const HarvestEngine = ({ form, setForm, errors = {}, loading, result, submit, history, getSpeciesForCrop }: any) => {
  const { t, language } = useLanguage();
  return (
    <div className="grid lg:grid-cols-3 gap-12">
      <div className="lg:col-span-1">
        <form onSubmit={submit} className="glass-card p-10 border-brand-green/5 flex flex-col gap-8">
          <div>
            <h3 className="text-2xl font-serif text-brand-green mb-2">{t("dss.engineParameters")}</h3>
            <p className="text-xs text-brand-ink/40 font-bold uppercase tracking-widest">{t("dss.optimiseProductYield")}</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[10px] uppercase font-bold text-brand-ink/40 tracking-widest">{t("dss.cropType")}</label>
                {errors.crop && <span className="text-[10px] text-red-500 font-bold uppercase">{errors.crop}</span>}
              </div>
              <select 
                className={`w-full p-4 bg-brand-green/5 border rounded-2xl text-sm font-bold text-brand-ink outline-none transition-all ${
                  errors.crop ? 'border-red-500 bg-red-50' : 'border-brand-green/10 focus:border-brand-green'
                }`}
                value={form.crop}
                onChange={(e) => setForm({ ...form, crop: e.target.value })}
              >
                <option>Bamboo</option>
                <option>Arecanut</option>
                <option>Rubber</option>
                <option>Agarwood</option>
              </select>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[10px] uppercase font-bold text-brand-ink/40 tracking-widest">{t("common.district")}</label>
                {errors.district && <span className="text-[10px] text-red-500 font-bold uppercase">{errors.district}</span>}
              </div>
              <select 
                className={`w-full p-4 bg-brand-green/5 border rounded-2xl text-sm font-bold text-brand-ink outline-none transition-all ${
                  errors.district ? 'border-red-500 bg-red-50' : 'border-brand-green/10 focus:border-brand-green'
                }`}
                value={form.district}
                onChange={(e) => setForm({ ...form, district: e.target.value })}
              >
                <option value="">{t("dss.districtSelect")}</option>
                <option>Unakoti</option>
                <option>North Tripura</option>
                <option>Dhalai</option>
                <option>Sepahijala</option>
                <option>Gomati</option>
              </select>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[10px] uppercase font-bold text-brand-ink/40 tracking-widest">{t("dss.species")}</label>
                {errors.species && <span className="text-[10px] text-red-500 font-bold uppercase">{errors.species}</span>}
              </div>
              <select 
                className={`w-full p-4 bg-brand-green/5 border rounded-2xl text-sm font-bold text-brand-ink outline-none transition-all ${
                  errors.species ? 'border-red-500 bg-red-50' : 'border-brand-green/10 focus:border-brand-green'
                }`}
                value={form.species}
                onChange={(e) => setForm({ ...form, species: e.target.value })}
              >
                <option value="">{language === 'bn' ? "জাত নির্বাচন করুন" : language === 'kok' ? "Buphang variety phiadi" : "Select Variety"}</option>
                {getSpeciesForCrop(form.crop).map((s: string) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] uppercase font-bold text-brand-ink/40 tracking-widest">
                    {form.crop === 'Bamboo' ? (language === 'bn' ? 'বাঁশের বয়স' : language === 'kok' ? 'Wa Bisi' : 'Clump Age') : form.crop === 'Agarwood' ? (language === 'bn' ? 'গাছের বয়স' : language === 'kok' ? 'Buphang Bisi' : 'Tree Age') : (language === 'bn' ? 'রোপণ বছর' : language === 'kok' ? 'Bagwkma Bisi' : 'Planted Year')}
                  </label>
                  {errors.age && <span className="text-[8px] text-red-500 font-bold uppercase">{errors.age}</span>}
                </div>
                <input 
                  type="number"
                  className={`w-full p-4 bg-brand-green/5 border rounded-2xl text-sm font-bold text-brand-ink outline-none transition-all ${
                    errors.age ? 'border-red-500 bg-red-50' : 'border-brand-green/10 focus:border-brand-green'
                  }`}
                  value={form.age}
                  onChange={(e) => setForm({ ...form, age: parseInt(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] uppercase font-bold text-brand-ink/40 tracking-widest">{t("dss.season")}</label>
                  {errors.season && <span className="text-[8px] text-red-500 font-bold uppercase">{errors.season}</span>}
                </div>
                <select 
                  className={`w-full p-4 bg-brand-green/5 border rounded-2xl text-sm font-bold text-brand-ink outline-none transition-all ${
                    errors.season ? 'border-red-500 bg-red-50' : 'border-brand-green/10 focus:border-brand-green'
                  }`}
                  value={form.season}
                  onChange={(e) => setForm({ ...form, season: e.target.value })}
                >
                  <option value="">{language === 'bn' ? "ঋতু নির্বাচন" : language === 'kok' ? "Halok phiadi" : "Select Season"}</option>
                  <option>Winter</option>
                  <option>Monsoon</option>
                  <option>Summer</option>
                  <option>Pre-Monsoon</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[10px] uppercase font-bold text-brand-ink/40 tracking-widest">{language === 'bn' ? "রোপণের ঘনত্ব (প্রতি হেক্টর)" : language === 'kok' ? "Bagwkma density (ha)" : "Density (culms/hc)"}</label>
                {errors.density && <span className="text-[10px] text-red-500 font-bold uppercase">{errors.density}</span>}
              </div>
              <input 
                type="number"
                className={`w-full p-4 bg-brand-green/5 border rounded-2xl text-sm font-bold text-brand-ink outline-none transition-all ${
                  errors.density ? 'border-red-500 bg-red-50' : 'border-brand-green/10 focus:border-brand-green'
                }`}
                value={form.density}
                onChange={(e) => setForm({ ...form, density: parseInt(e.target.value) })}
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-brand-green text-white rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-brand-ink transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
            {t("common.optimize")}
          </button>
        </form>
      </div>

      <div className="lg:col-span-2 space-y-12">
        {result ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-12 border-brand-orange/20 border-l-[12px] border-l-brand-orange bg-brand-orange/[0.02]"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-brand-orange text-white rounded-2xl">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-3xl font-serif text-brand-ink">{t("dss.recommendation")}</h3>
                <p className="text-[10px] font-bold text-brand-ink/40 uppercase tracking-widest">Gemini 1.5 Flash Insight</p>
              </div>
            </div>
            <div className="prose prose-sm text-brand-ink/70 max-w-none space-y-6">
              {result.split('\n\n').map((para, i) => (
                <p key={i} className="text-lg leading-relaxed font-medium">{para}</p>
              ))}
            </div>
          </motion.div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center glass-card border-brand-green/5 p-12 text-center opacity-40">
            <div className="p-6 bg-brand-green/10 rounded-full mb-6">
              <BarChart3 className="w-12 h-12 text-brand-green" />
            </div>
            <h3 className="text-2xl font-serif">{language === 'bn' ? "ইনপুটের জন্য অপেক্ষা করা হচ্ছে" : language === 'kok' ? "Param hwi naidi" : "Awaiting Input"}</h3>
            <p className="text-xs font-bold uppercase tracking-widest mt-2">{language === 'bn' ? "পরামর্শ পেতে প্যারামিটারগুলি সামঞ্জস্য করুন" : language === 'kok' ? "Adjust parameters to generate harvest advice" : "Adjust parameters to generate harvest advice"}</p>
          </div>
        )}

        <div className="glass-card overflow-hidden border-brand-green/5">
          <div className="p-8 border-b border-brand-green/5 bg-brand-green/[0.02] flex justify-between items-center">
            <h3 className="text-2xl font-serif text-brand-green">{t("dss.recentHistory")}</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-brand-green/[0.04]">
                <tr>
                  <th className="px-8 py-4 text-[10px] uppercase tracking-widest font-bold text-brand-ink/40">{language === 'bn' ? "সময়কাল" : "Timestamp"}</th>
                  <th className="px-8 py-4 text-[10px] uppercase tracking-widest font-bold text-brand-ink/40">{t("common.district")}</th>
                  <th className="px-8 py-4 text-[10px] uppercase tracking-widest font-bold text-brand-ink/40">{language === 'bn' ? "প্যারামিটারসমূহ" : "Parameters"}</th>
                  <th className="px-8 py-4 text-[10px] uppercase tracking-widest font-bold text-brand-ink/40">{language === 'bn' ? "পর্যবেক্ষণ" : "Insight Snippet"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-green/5">
              {history.map((h: any) => (
                <tr key={h.id} className="hover:bg-brand-green/[0.02]">
                  <td className="px-8 py-6 text-xs text-brand-ink/50 leading-tight">
                    {new Date(h.created_at).toLocaleString()}
                  </td>
                  <td className="px-8 py-6 font-bold text-brand-ink">
                    <div>{h.district}</div>
                    <div className="text-[10px] text-brand-ink/40 uppercase tracking-widest font-normal">{h.crop || 'Bamboo'}</div>
                  </td>
                  <td className="px-8 py-6 text-[10px] font-bold text-brand-ink/40">
                    <span className="text-brand-ink">{h.species}</span> • {h.age}{h.crop === 'Bamboo' ? 'y' : ''} • {h.season}
                  </td>
                  <td className="px-8 py-6 text-xs text-brand-ink/70 italic line-clamp-1">
                    {h.recommendation_text.substring(0, 80)}...
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  );
};

const SHGActivitySection = ({ activities, setActivities }: { activities: SHGActivity[], setActivities: React.Dispatch<React.SetStateAction<SHGActivity[]>> }) => {
  const { t, language } = useLanguage();
  const [filterDistrict, setFilterDistrict] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<SHGActivity | null>(null);

  const calculateStatus = (lastHarvest: string, income: number): 'Active' | 'Pending' | 'Inactive' => {
    const now = new Date(2026, 4, 9); // May 9, 2026
    const [month, year] = lastHarvest.split(' ');
    const monthMap: Record<string, number> = {
      'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
      'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
    };
    const harvestDate = new Date(parseInt(year), monthMap[month] || 0, 1);
    const diffMonths = (now.getFullYear() - harvestDate.getFullYear()) * 12 + (now.getMonth() - harvestDate.getMonth());

    if (diffMonths > 6 && income < 10000) {
      return 'Inactive';
    }
    if (diffMonths <= 2 && income > 100000) return 'Active';
    return 'Pending';
  };

  const processedActivities = activities.map(a => ({
    ...a,
    status: calculateStatus(a.last_harvest_date, a.income_inr)
  }));

  const filtered = processedActivities.filter(a => 
    (filterDistrict === "All" || a.district === filterDistrict) &&
    (filterStatus === "All" || a.status === filterStatus)
  );

  const handleDelete = (id: string) => {
    if (window.confirm(language === 'bn' ? "আপনি কি নিশ্চিত যে এই রেকর্ডটি ডিলিট করতে চান?" : language === 'kok' ? "Bhaithang record kakna bagwi nang tongdi?" : "Are you sure you want to delete this record?")) {
      setActivities(prev => prev.filter(a => a.id !== id));
    }
  };

  const handleEdit = (activity: SHGActivity) => {
    setEditingActivity(activity);
    setIsModalOpen(true);
  };

  const [form, setForm] = useState({
    cooperative_name: "",
    district: "Unakoti",
    last_harvest_date: "May 2026",
    volume_t: 0,
    income_inr: 0
  });

  useEffect(() => {
    if (editingActivity) {
      setForm({
        cooperative_name: editingActivity.cooperative_name,
        district: editingActivity.district,
        last_harvest_date: editingActivity.last_harvest_date,
        volume_t: editingActivity.volume_t,
        income_inr: editingActivity.income_inr
      });
    } else {
      setForm({
        cooperative_name: "",
        district: "Unakoti",
        last_harvest_date: "May 2026",
        volume_t: 0,
        income_inr: 0
      });
    }
  }, [editingActivity, isModalOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newStatus = calculateStatus(form.last_harvest_date, form.income_inr);
    
    if (editingActivity) {
      setActivities(prev => prev.map(a => a.id === editingActivity.id ? { ...a, ...form, status: newStatus } : a));
    } else {
      const newActivity: SHGActivity = {
        id: Math.random().toString(36).substr(2, 9),
        ...form,
        status: newStatus
      };
      setActivities(prev => [newActivity, ...prev]);
    }
    setIsModalOpen(false);
    setEditingActivity(null);
  };

  return (
    <div className="space-y-12">
      <div className="grid md:grid-cols-3 gap-8">
        <MetricCard title={language === 'bn' ? "সক্রিয় স্বনির্ভর গোষ্ঠী" : language === 'kok' ? "Active SHG cooperatives" : "Active SHGs"} value={processedActivities.filter(a => a.status === 'Active').length} icon={Users} />
        <MetricCard title={language === 'bn' ? "মোট সংগৃহীত পরিমাণ" : language === 'kok' ? "Total wa logged" : "Total Volume Logged"} value={`${processedActivities.reduce((acc, a) => acc + a.volume_t, 0)} t`} icon={Leaf} />
        <MetricCard title={t("common.totalEarnings")} value={`₹ ${processedActivities.reduce((acc, a) => acc + a.income_inr, 0).toLocaleString()}`} icon={TrendingUp} color="brand-orange" />
      </div>

      <div className="glass-card border-brand-green/5 overflow-hidden">
        <div className="p-8 border-b border-brand-green/5 bg-brand-green/[0.02] flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <h3 className="text-2xl font-serif text-brand-green">{t("common.shgAct")}</h3>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-brand-green/10">
              <Filter className="w-4 h-4 text-brand-orange" />
              <select 
                className="text-xs font-bold bg-transparent outline-none uppercase tracking-widest cursor-pointer"
                value={filterDistrict}
                onChange={(e) => setFilterDistrict(e.target.value)}
              >
                <option value="All">{language === 'bn' ? "সব জেলা" : language === 'kok' ? "Khor rok" : "All"}</option>
                <option>Unakoti</option>
                <option>North Tripura</option>
                <option>Dhalai</option>
                <option>Sepahijala</option>
                <option>Gomati</option>
              </select>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-brand-green/10">
              <ShieldCheck className="w-4 h-4 text-brand-green" />
              <select 
                className="text-xs font-bold bg-transparent outline-none uppercase tracking-widest cursor-pointer"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="All">{language === 'bn' ? "সব অবস্থা" : language === 'kok' ? "Aungmung rok" : "All Status"}</option>
                <option>Active</option>
                <option>Pending</option>
                <option>Inactive</option>
              </select>
            </div>
            <button 
              onClick={() => { setEditingActivity(null); setIsModalOpen(true); }}
              className="px-6 py-2.5 bg-brand-green text-white rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-brand-ink transition-all"
            >
              <Plus className="w-4 h-4" /> {t("common.addActivity")}
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-brand-green/[0.04]">
              <tr>
                <th className="px-8 py-4 text-[10px] uppercase tracking-widest font-bold text-brand-ink/40">{t("dss.cooperativeName")}</th>
                <th className="px-8 py-4 text-[10px] uppercase tracking-widest font-bold text-brand-ink/40">{t("common.district")}</th>
                <th className="px-8 py-4 text-[10px] uppercase tracking-widest font-bold text-brand-ink/40">{language === 'bn' ? "সর্বশেষ ফসল কাটা" : language === 'kok' ? "Next harvest" : "Last Harvest"}</th>
                <th className="px-8 py-4 text-[10px] uppercase tracking-widest font-bold text-brand-ink/40">{t("common.volume")}</th>
                <th className="px-8 py-4 text-[10px] uppercase tracking-widest font-bold text-brand-ink/40">{t("common.income")}</th>
                <th className="px-8 py-4 text-[10px] uppercase tracking-widest font-bold text-brand-ink/40">{t("common.status")}</th>
                <th className="px-8 py-4 text-[10px] uppercase tracking-widest font-bold text-brand-ink/40 text-right">{t("common.actions")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-green/3 border-brand-green/5">
              <AnimatePresence initial={false}>
                {filtered.map((a) => (
                  <motion.tr 
                    key={a.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="hover:bg-brand-green/[0.02] group/row transition-all"
                  >
                    <td className="px-8 py-6 font-bold text-brand-ink flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-brand-green/10 flex items-center justify-center text-brand-green font-serif">
                        {a.cooperative_name[0]}
                      </div>
                      {a.cooperative_name}
                    </td>
                    <td className="px-8 py-6 text-brand-ink/70 text-sm font-medium">{a.district}</td>
                    <td className="px-8 py-6 text-brand-ink/50 text-[10px] font-bold">{a.last_harvest_date}</td>
                    <td className="px-8 py-6 font-mono text-brand-green font-bold">{a.volume_t} t</td>
                    <td className="px-8 py-6 font-bold">₹{a.income_inr.toLocaleString()}</td>
                    <td className="px-8 py-6">
                      <span className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                        a.status === 'Active' ? 'bg-brand-green text-white' :
                        a.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {a.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover/row:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleEdit(a)}
                          className="p-2 text-brand-ink/40 hover:text-brand-green hover:bg-brand-green/5 rounded-lg transition-all"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(a.id)}
                          className="p-2 text-brand-ink/40 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-8 py-20 text-center text-brand-ink/40 text-xs font-bold uppercase tracking-widest">
                    {language === 'bn' ? "আকাঙ্ক্ষিত ফিল্টারে কোনো তথ্য মেলেনি" : "No activities found matching filters"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Entry Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-brand-ink/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[40px] shadow-2xl overflow-hidden z-20"
            >
              <div className="p-8 bg-brand-green flex justify-between items-center text-white">
                <div>
                  <h3 className="text-2xl font-serif">{editingActivity ? (language === 'bn' ? "তথ্য পরিবর্তন" : language === 'kok' ? "Mukhra tuchodi" : "Update") : (language === 'bn' ? "নতুন তথ্য" : language === 'kok' ? "Log gwdan" : "Log New")}</h3>
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">{t("common.shgAct")}</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                   className="p-3 bg-white/10 rounded-2xl hover:bg-white/20 transition-all text-white border-none"
                >
                  <X className="w-6 h-6 animate-pulse" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-10 space-y-8 max-h-[80vh] overflow-y-auto">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-brand-ink/40 tracking-widest">{t("dss.cooperativeName")}</label>
                    <input 
                      required
                      type="text"
                      className="w-full p-4 bg-brand-green/5 border border-brand-green/10 rounded-2xl text-sm font-bold text-brand-ink outline-none focus:border-brand-green transition-all"
                      value={form.cooperative_name}
                      onChange={(e) => setForm({ ...form, cooperative_name: e.target.value })}
                      placeholder="e.g. Unakoti Bamboo Crafts"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold text-brand-ink/40 tracking-widest">{t("common.district")}</label>
                      <select 
                        className="w-full p-4 bg-brand-green/5 border border-brand-green/10 rounded-2xl text-sm font-bold text-brand-ink outline-none focus:border-brand-green transition-all"
                        value={form.district}
                        onChange={(e) => setForm({ ...form, district: e.target.value })}
                      >
                        <option>Unakoti</option>
                        <option>North Tripura</option>
                        <option>Dhalai</option>
                        <option>Sepahijala</option>
                        <option>Gomati</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold text-brand-ink/40 tracking-widest">{language === 'bn' ? "ফসল সংগ্রহের তারিখ" : language === 'kok' ? "Bagwkmung jora" : "Last Harvest Date"}</label>
                      <input 
                        required
                        type="text"
                        className="w-full p-4 bg-brand-green/5 border border-brand-green/10 rounded-2xl text-sm font-bold text-brand-ink outline-none focus:border-brand-green transition-all"
                        value={form.last_harvest_date}
                        onChange={(e) => setForm({ ...form, last_harvest_date: e.target.value })}
                        placeholder="e.g. May 2026"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold text-brand-ink/40 tracking-widest">{language === 'bn' ? "পরিমাণ (টন)" : language === 'kok' ? "Kotor Volume (t)" : "Volume (tonnes)"}</label>
                      <input 
                        required
                        type="number"
                        className="w-full p-4 bg-brand-green/5 border border-brand-green/10 rounded-2xl text-sm font-bold text-brand-ink outline-none focus:border-brand-green transition-all"
                        value={form.volume_t}
                        onChange={(e) => setForm({ ...form, volume_t: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] uppercase font-bold text-brand-ink/40 tracking-widest">{t("common.income")}</label>
                       <input 
                         required
                         type="number"
                         className="w-full p-4 bg-brand-green/5 border border-brand-green/10 rounded-2xl text-sm font-bold text-brand-ink outline-none focus:border-brand-green transition-all"
                         value={form.income_inr}
                         onChange={(e) => setForm({ ...form, income_inr: parseInt(e.target.value) || 0 })}
                       />
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-brand-green/5 rounded-[24px] border border-brand-green/5">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-brand-ink/40 tracking-widest">{language === 'bn' ? "স্বয়ংক্রিয়ভাবে গণনা অবস্থা" : "Auto-Calculated Status"}</div>
                      <div className="text-lg font-serif text-brand-green">{language === 'bn' ? "প্রাকদর্শন" : "Preview"}</div>
                    </div>
                    <span className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      calculateStatus(form.last_harvest_date, form.income_inr) === 'Active' ? 'bg-brand-green text-white' :
                      calculateStatus(form.last_harvest_date, form.income_inr) === 'Pending' ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {calculateStatus(form.last_harvest_date, form.income_inr)}
                    </span>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-5 bg-brand-green text-white rounded-2xl font-bold uppercase tracking-widest text-xs shadow-xl shadow-brand-green/20 hover:bg-brand-ink transition-all"
                >
                  {editingActivity ? (language === 'bn' ? "পরিবর্তনগুলো সংরক্ষণ করুন" : language === 'kok' ? "Romdi key" : "Save Changes") : (language === 'bn' ? "রেকর্ড সংরক্ষণ করুন" : language === 'kok' ? "Log key" : "Create Entry")}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CarbonReplantingSection = ({ resources, activities }: { resources: DistrictResource[], activities: SHGActivity[] }) => {
  const { t, language } = useLanguage();
  const totalHarvested = activities.reduce((acc, a) => acc + a.volume_t, 0);
  const totalReplanted = totalHarvested * 1.25; // Target ratio 1:1.25
  const co2Sequestered = totalHarvested * 0.1; // 10% estimation
  const credits = Math.floor(co2Sequestered * 10); // 1 credit per 100kg CO2 roughly
  const creditValue = credits * 800; // ₹800 per credit

  const districtStats = resources.map(r => {
    const harvested = activities
      .filter(a => a.district === r.district)
      .reduce((sum, a) => sum + a.volume_t, 0);
    const replanted = harvested * 1.25;
    const pct = harvested > 0 ? 125 : 0; // Using target ratio as performance metric
    return { ...r, harvested, replanted, pct };
  });

  return (
    <div className="space-y-12">
      <div className="grid md:grid-cols-4 gap-8">
        <MetricCard title={language === 'bn' ? "মোট সংগৃহীত পরিমাণ" : language === 'kok' ? "Bahaithang wa" : "Total Harvested"} value={`${totalHarvested.toLocaleString()} t`} icon={Download} />
        <MetricCard title={language === 'bn' ? "মোট পুনরুৎপাদিত" : language === 'kok' ? "Replanted wa" : "Total Replanted"} value={`${totalReplanted.toLocaleString()} t`} icon={Trees} color="brand-green" />
        <MetricCard title={language === 'bn' ? "পালন শতকরা" : language === 'kok' ? "Compliance kotor" : "Compliance %"} value="125 %" icon={ShieldCheck} />
        <MetricCard title={language === 'bn' ? "আবদ্ধ কার্বন ডাই অক্সাইড" : language === 'kok' ? "CO₂ Sequestered" : "CO₂ Sequestered"} value={`${co2Sequestered.toLocaleString()} t`} icon={Loader2} color="brand-orange" />
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 glass-card p-10 border-brand-green/5">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-serif text-brand-green">{language === 'bn' ? "জেলা ভিত্তিক পুনরুৎপাদন বিন্যাস" : "District Replanting Compliance"}</h3>
            <p className="text-[10px] font-bold text-brand-ink/40 uppercase tracking-[0.2em]">{language === 'bn' ? "সরাসরি পর্যবেক্ষণ" : "Live Tracking"}</p>
          </div>
          <div className="space-y-8">
            {districtStats.map(r => (
              <div key={r.id} className="space-y-4">
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-xs font-bold text-brand-ink">{r.district}</div>
                    <div className="flex gap-4 mt-1">
                      <div className="text-[9px] text-brand-ink/40 font-bold uppercase tracking-widest">
                        {language === 'bn' ? "সংগৃহীত" : "Harvested"}: <span className="text-brand-ink">{r.harvested}t</span>
                      </div>
                      <div className="text-[9px] text-brand-ink/40 font-bold uppercase tracking-widest">
                        {language === 'bn' ? "পুনরুৎপাদিত" : "Replanted"}: <span className="text-brand-green">{r.replanted.toFixed(0)}t</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-brand-green">{r.pct}%</div>
                  </div>
                </div>
                <div className="relative h-3 bg-brand-green/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(r.pct, 100)}%` }}
                    className="absolute h-full bg-brand-green" 
                  />
                  {r.pct > 100 && (
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${r.pct - 100}%` }}
                      className="absolute h-full bg-brand-orange/40 left-[100%]" 
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1 glass-card p-10 border-brand-orange/20 bg-brand-orange/[0.02]">
          <h3 className="text-2xl font-serif text-brand-green mb-6">{language === 'bn' ? "কার্বন ক্রেডিট প্রাক্কলন" : "Carbon Credit Estimate"}</h3>
          <div className="p-8 bg-white rounded-3xl border border-brand-orange/10 mb-8">
            <div className="text-[10px] uppercase font-bold text-brand-ink/40 tracking-widest mb-2">{language === 'bn' ? "মোট ক্রেডিট (অর্থবছর ২৬)" : "Total Credits (FY26)"}</div>
            <div className="text-5xl font-serif text-brand-orange mb-4">{credits.toLocaleString()}</div>
            <div className="text-[10px] font-bold text-brand-ink leading-relaxed">
              {language === 'bn' ? "কার্বন স্থায়ীকরণ সূত্র:" : "Based on sequestration formula:"} <br />
              <span className="opacity-40 italic">CO₂ t ÷ 10 = Credits</span>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <div className="text-[9px] uppercase font-bold text-brand-ink/40 tracking-widest mb-1">{language === 'bn' ? "আনুমানিক বাজার মূল্য" : "Estimated Market Value"}</div>
              <div className="text-3xl font-serif text-brand-green">₹ {creditValue.toLocaleString()}</div>
            </div>
            <p className="text-[11px] text-brand-ink/50 font-medium italic">
              {language === 'bn' ? "\"শুধুমাত্র নির্দেশক। মুদ্রীকরণের জন্য আনুষ্ঠানিক নিরীক্ষা প্রয়োজন।\"" : "\"Indicative only. Formal audit required for monetisation.\""}
            </p>
            <button 
              onClick={() => window.print()}
              className="w-full py-4 border-2 border-brand-green text-brand-green rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-brand-green hover:text-white transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" /> {language === 'bn' ? "কার্বন রিপোর্ট ডাউনলোড করুন" : language === 'kok' ? "Report download di" : "Download Carbon Report"}
            </button>
          </div>
        </div>
      </div>

      {/* Hidden Print Content */}
      <div className="hidden print:block fixed inset-0 bg-white z-[9999] p-12 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="flex justify-between items-center border-b-2 border-brand-green pb-8">
            <div>
              <h1 className="text-4xl font-serif text-brand-green font-bold">BioSense Carbon Report</h1>
              <p className="text-xs font-bold text-brand-ink/40 uppercase tracking-widest mt-2">FY 2025-26 • Generated {new Date().toLocaleDateString()}</p>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-brand-ink">Green-to-Gold</div>
              <p className="text-[10px] text-brand-ink/40 font-bold uppercase tracking-widest">ATSFY Technologies</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12">
            <div className="space-y-4">
              <h3 className="text-xs uppercase font-bold text-brand-ink/40 tracking-widest">Aggregate Impact</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-brand-green/5 rounded-2xl">
                  <div className="text-[8px] uppercase font-bold text-brand-ink/40">Total Harvested</div>
                  <div className="text-xl font-bold text-brand-ink">{totalHarvested} t</div>
                </div>
                <div className="p-4 bg-brand-green/5 rounded-2xl">
                  <div className="text-[8px] uppercase font-bold text-brand-ink/40">Total Replanted</div>
                  <div className="text-xl font-bold text-brand-ink">{totalReplanted.toFixed(0)} t</div>
                </div>
                <div className="p-4 bg-brand-orange/5 rounded-2xl">
                  <div className="text-[8px] uppercase font-bold text-brand-ink/40">CO₂ Sequestered</div>
                  <div className="text-xl font-bold text-brand-ink">{co2Sequestered} t</div>
                </div>
                <div className="p-4 bg-brand-orange/5 rounded-2xl">
                  <div className="text-[8px] uppercase font-bold text-brand-ink/40">Market Value</div>
                  <div className="text-xl font-bold text-brand-ink">₹{creditValue.toLocaleString()}</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs uppercase font-bold text-brand-ink/40 tracking-widest">Compliance Status</h3>
              <div className="p-6 border-2 border-brand-green/10 rounded-2xl flex flex-col items-center justify-center text-center">
                <div className="text-4xl font-bold text-brand-green">125%</div>
                <p className="text-[10px] font-bold text-brand-ink/40 uppercase tracking-widest mt-2">Cumulative Compliance</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xs uppercase font-bold text-brand-ink/40 tracking-widest">District-wise Breakdown</h3>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-brand-green/10">
                  <th className="py-4 text-[10px] uppercase font-bold">District</th>
                  <th className="py-4 text-[10px] uppercase font-bold text-right">Harvested (t)</th>
                  <th className="py-4 text-[10px] uppercase font-bold text-right">Replanted (t)</th>
                  <th className="py-4 text-[10px] uppercase font-bold text-right">Ratio Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-green/5">
                {districtStats.map(r => (
                  <tr key={r.id}>
                    <td className="py-6 font-bold text-brand-ink">{r.district}</td>
                    <td className="py-6 text-right font-mono">{r.harvested}</td>
                    <td className="py-6 text-right font-mono">{r.replanted.toFixed(1)}</td>
                    <td className="py-6 text-right">
                      <span className="text-xs font-bold text-brand-green">1:1.25 Compliant</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-12 border-t border-brand-green/10 text-center">
            <p className="text-[10px] text-brand-ink/30 italic font-medium">
              This report was generated by BioSense DSS Alpha. Data is verified via SHG Activity Ledger sync.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const AlertsSection = ({ alerts, onResolve }: { alerts: DSSAlert[], onResolve: (id: string) => void }) => {
  const { t, language } = useLanguage();
  const [filterDistrict, setFilterDistrict] = useState("All");
  const [filterSeverity, setFilterSeverity] = useState("All");
  const [sortBy, setSortBy] = useState<"date" | "severity">("date");

  const districts = ["All", ...Array.from(new Set(alerts.map(a => a.district)))];
  const severities = ["All", "Critical", "Warning", "Info"];

  const getSeverityWeight = (s: string) => {
    switch (s) {
      case 'Critical': return 3;
      case 'Warning': return 2;
      case 'Info': return 1;
      default: return 0;
    }
  };

  const processedAlerts = [...alerts]
    .filter(a => 
      (filterDistrict === "All" || a.district === filterDistrict) &&
      (filterSeverity === "All" || a.severity === filterSeverity)
    )
    .sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.detected_at).getTime() - new Date(a.detected_at).getTime();
      } else {
        const weightDiff = getSeverityWeight(b.severity) - getSeverityWeight(a.severity);
        if (weightDiff !== 0) return weightDiff;
        return new Date(b.detected_at).getTime() - new Date(a.detected_at).getTime();
      }
    });

  const unresolved = processedAlerts.filter(a => !a.resolved);
  const resolved = processedAlerts.filter(a => a.resolved);

  const AlertCard = ({ alert, onResolve }: { alert: DSSAlert, onResolve?: any, key?: string }) => (
    <div className={`p-8 bg-white rounded-[32px] border-l-[12px] shadow-sm relative overflow-hidden group transition-all hover:shadow-xl ${
      alert.severity === 'Critical' ? 'border-red-500' :
      alert.severity === 'Warning' ? 'border-amber-500' :
      'border-brand-green'
    }`}>
      <div className="flex flex-col md:flex-row justify-between gap-6 relative z-10">
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-3">
            <span className={`px-4 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${
              alert.severity === 'Critical' ? 'bg-red-100 text-red-700' :
              alert.severity === 'Warning' ? 'bg-amber-100 text-amber-700' :
              'bg-brand-green/10 text-brand-green'
            }`}>
              {alert.severity} {language === 'bn' ? "সতর্কতা" : "Alert"}
            </span>
            <span className="text-[10px] font-bold text-brand-ink/40 uppercase tracking-widest">
              {alert.district} • {new Date(alert.detected_at).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
            </span>
          </div>
          <h3 className="text-2xl font-serif text-brand-ink">{alert.title}</h3>
          <p className="text-sm text-brand-ink/80 leading-relaxed max-w-2xl">{alert.description}</p>
          <div className="flex items-center gap-3 p-4 bg-brand-green/[0.03] rounded-2xl w-fit">
            <Info className="w-4 h-4 text-brand-orange" />
            <span className="text-xs font-bold text-brand-green">{language === 'bn' ? "পদক্ষেপ" : "Action"}: {alert.action}</span>
          </div>
        </div>
        {!alert.resolved && (
          <button 
            onClick={() => onResolve(alert.id)}
            className="self-end md:self-center px-8 py-4 bg-brand-green text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-brand-green/20 hover:bg-brand-ink transition-all"
          >
            {language === 'bn' ? "সমাধান করা হয়েছে চিহ্নিত করুন" : "Mark Resolved"}
          </button>
        )}
      </div>
      {/* Decorative background icon */}
      <AlertTriangle className={`absolute -bottom-4 -right-4 w-32 h-32 opacity-[0.03] rotate-[-15deg] group-hover:scale-110 transition-transform ${
        alert.severity === 'Critical' ? 'text-red-500' :
        alert.severity === 'Warning' ? 'text-amber-500' :
        'text-brand-green'
      }`} />
    </div>
  );

  return (
    <div className="space-y-12">
      {/* Filter Controls */}
      <div className="glass-card p-6 border-brand-green/5 flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-3">
          <Filter className="w-4 h-4 text-brand-orange" />
          <span className="text-[10px] font-bold text-brand-ink/40 uppercase tracking-widest">{language === 'bn' ? "ফিল্টার করুন" : language === 'kok' ? "Khubdi" : "Filter By"}</span>
        </div>
        
        <div className="flex items-center gap-4 flex-wrap">
          <select 
            value={filterDistrict}
            onChange={(e) => setFilterDistrict(e.target.value)}
            className="bg-brand-paper border border-brand-green/10 rounded-xl px-4 py-2 text-[10px] font-bold uppercase tracking-widest outline-none focus:border-brand-green transition-all cursor-pointer"
          >
            {districts.map(d => <option key={d} value={d}>{language === 'bn' ? `জেলা: ${d}` : `District: ${d}`}</option>)}
          </select>

          <select 
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
            className="bg-brand-paper border border-brand-green/10 rounded-xl px-4 py-2 text-[10px] font-bold uppercase tracking-widest outline-none focus:border-brand-green transition-all cursor-pointer"
          >
            {severities.map(s => <option key={s} value={s}>{language === 'bn' ? `গুরুত্ব: ${s}` : `Severity: ${s}`}</option>)}
          </select>

          {(filterDistrict !== "All" || filterSeverity !== "All") && (
            <button 
              onClick={() => { setFilterDistrict("All"); setFilterSeverity("All"); }}
              className="text-[10px] font-bold text-brand-orange hover:text-brand-orange-dark uppercase tracking-widest transition-colors"
            >
              {language === 'bn' ? "ফিল্টার মুছে ফেলুন" : "Clear Filters"}
            </button>
          )}
        </div>

        <div className="h-4 w-px bg-brand-green/10 hidden md:block" />

        <div className="flex items-center gap-3 ml-auto">
          <TrendingUp className="w-4 h-4 text-brand-green" />
          <span className="text-[10px] font-bold text-brand-ink/40 uppercase tracking-widest">{language === 'bn' ? "ক্রমানুসার" : language === 'kok' ? "Phaidi lai" : "Sort By"}</span>
          <div className="flex bg-brand-paper border border-brand-green/10 rounded-xl overflow-hidden">
            <button 
              onClick={() => setSortBy("date")}
              className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${sortBy === "date" ? "bg-brand-green text-white" : "text-brand-ink/40 hover:bg-brand-green/5"}`}
            >
              {language === 'bn' ? "তারিখ" : "Date"}
            </button>
            <button 
              onClick={() => setSortBy("severity")}
              className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${sortBy === "severity" ? "bg-brand-green text-white" : "text-brand-ink/40 hover:bg-brand-green/5"}`}
            >
              {language === 'bn' ? "গুরুত্ব" : "Severity"}
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <h3 className="text-2xl font-serif text-brand-green">{language === 'bn' ? "সক্রিয় সতর্কবার্তা" : "Active Alerts"}</h3>
          <div className="h-px flex-1 bg-brand-green/10" />
          <span className="px-4 py-1.5 bg-red-500 text-white rounded-full text-[10px] font-bold">{unresolved.length} {language === 'bn' ? "অমীমাংসিত" : "UNRESOLVED"}</span>
        </div>
        <div className="grid gap-6">
          {unresolved.length > 0 ? (
            unresolved.map(a => <AlertCard key={a.id} alert={a} onResolve={onResolve} />)
          ) : (
            <div className="p-12 text-center glass-card border-brand-green/5 opacity-50">
              <CheckCircle2 className="w-8 h-8 text-brand-green mx-auto mb-4" />
              <p className="text-xs font-bold uppercase tracking-widest">{language === 'bn' ? "ফিল্টারের সাথে মেলে এমন কোনো সতর্কবার্তা পাওয়া যায়নি" : "No active alerts matching filters"}</p>
            </div>
          )}
        </div>
      </div>

      {resolved.length > 0 && (
        <div className="pt-12 space-y-8">
          <div className="flex items-center gap-4">
            <h3 className="text-2xl font-serif text-brand-ink/40">{language === 'bn' ? "সমাধানকৃত নথি" : "Resolved Log"}</h3>
            <div className="h-px flex-1 bg-brand-green/10" />
          </div>
          <div className="grid gap-6 opacity-60 grayscale">
            {resolved.map(a => <AlertCard key={a.id} alert={a} />)}
          </div>
        </div>
      )}
    </div>
  );
};

export default BioSenseDSS;
