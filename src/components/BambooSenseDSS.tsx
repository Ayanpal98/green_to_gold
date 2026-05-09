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
  MapPin
} from "lucide-react";
import { db } from "../lib/firebase";
import { 
  collection, 
  query, 
  getDocs, 
  addDoc, 
  updateDoc, 
  doc, 
  where, 
  orderBy,
  onSnapshot,
  Timestamp 
} from "firebase/firestore";

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
  detected_at: Timestamp;
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

const BambooSenseDSS = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [resources, setResources] = useState<DistrictResource[]>([]);
  const [activities, setActivities] = useState<SHGActivity[]>([]);
  const [alerts, setAlerts] = useState<DSSAlert[]>([]);
  const [recommendations, setRecommendations] = useState<HarvestRec[]>([]);
  const [loading, setLoading] = useState(true);

  // Harvesting Engine State
  const [engineForm, setEngineForm] = useState({
    district: "Dhalai",
    species: "Muli",
    age: 4,
    season: "Winter",
    density: 2000
  });
  const [engineResult, setEngineResult] = useState<string | null>(null);
  const [engineLoading, setEngineLoading] = useState(false);

  useEffect(() => {
    // Real-time listeners
    const unsubResources = onSnapshot(collection(db, "district_resources"), (snapshot) => {
      setResources(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as DistrictResource)));
    });

    const unsubActivities = onSnapshot(collection(db, "shg_activity"), (snapshot) => {
      setActivities(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as SHGActivity)));
    });

    const unsubAlerts = onSnapshot(query(collection(db, "dss_alerts"), orderBy("detected_at", "desc")), (snapshot) => {
      setAlerts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as DSSAlert)));
    });

    const unsubRecs = onSnapshot(query(collection(db, "harvest_recommendations"), orderBy("created_at", "desc")), (snapshot) => {
      setRecommendations(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as HarvestRec)));
      setLoading(false);
    });

    return () => {
      unsubResources();
      unsubActivities();
      unsubAlerts();
      unsubRecs();
    };
  }, []);

  const handleAdvisorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEngineLoading(true);
    setEngineResult(null);

    try {
      const response = await fetch("/api/bamboosense/advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(engineForm),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setEngineResult(data.recommendation);

      // Save to history
      await addDoc(collection(db, "harvest_recommendations"), {
        ...engineForm,
        recommendation_text: data.recommendation,
        created_at: new Date().toISOString()
      });
    } catch (error) {
      console.error("Advisor Error:", error);
      alert("Failed to get recommendation. Please try again.");
    } finally {
      setEngineLoading(false);
    }
  };

  const resolveAlert = async (id: string) => {
    try {
      await updateDoc(doc(db, "dss_alerts", id), { resolved: true });
    } catch (error) {
      console.error("Resolve Alert Error:", error);
    }
  };

  const tabs = [
    "Resource Intelligence",
    "Harvest AI Engine",
    "SHG Activity Tracker",
    "Carbon & Replanting",
    "Alerts"
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-paper flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-brand-green animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-paper selection:bg-brand-orange selection:text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 text-brand-orange font-bold uppercase tracking-[0.3em] text-[10px] mb-4"
              >
                <ShieldCheck className="w-4 h-4" />
                Strategic Decision Support System
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-7xl font-serif text-brand-green"
              >
                BambooSense <span className="italic">DSS</span>
              </motion.h1>
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
              {activeTab === 1 && (
                <HarvestEngine 
                  form={engineForm} 
                  setForm={setEngineForm} 
                  loading={engineLoading} 
                  result={engineResult} 
                  submit={handleAdvisorSubmit}
                  history={recommendations}
                />
              )}
              {activeTab === 2 && <SHGActivitySection activities={activities} />}
              {activeTab === 3 && <CarbonReplantingSection resources={resources} />}
              {activeTab === 4 && <AlertsSection alerts={alerts} onResolve={resolveAlert} />}
            </motion.div>
          </AnimatePresence>
        </main>

        <footer className="mt-24 pt-8 border-t border-brand-green/10 text-center">
          <p className="text-[10px] font-bold text-brand-ink/40 uppercase tracking-widest">
            BambooSense DSS — Part of Green-to-Gold by ATSFy Technologies, Agartala, Tripura
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
    <div className="text-4xl font-serif text-brand-ink">{value}</div>
  </div>
);

const ResourceIntelligence = ({ resources }: { resources: DistrictResource[] }) => (
  <div className="space-y-12">
    <div className="grid md:grid-cols-3 gap-8">
      <MetricCard title="Total Bamboo Stock" value={`${resources.reduce((acc, r) => acc + r.bamboo_stock_t, 0).toLocaleString()} t`} icon={Trees} />
      <MetricCard title="Harvest-Ready Zones" value={resources.filter(r => r.status === 'Healthy').length} icon={CheckCircle2} />
      <MetricCard title="Depletion Risk Zones" value={resources.filter(r => r.status === 'Critical').length} icon={AlertTriangle} color="brand-orange" />
    </div>

    <div className="glass-card overflow-hidden border-brand-green/5">
      <div className="p-8 border-b border-brand-green/5 bg-brand-green/[0.02]">
        <h3 className="text-2xl font-serif text-brand-green">Regional Bamboo Stock Inventory</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-brand-green/[0.04]">
            <tr>
              <th className="px-8 py-4 text-[10px] uppercase tracking-widest font-bold text-brand-ink/40">District</th>
              <th className="px-8 py-4 text-[10px] uppercase tracking-widest font-bold text-brand-ink/40">Stock (tonnes)</th>
              <th className="px-8 py-4 text-[10px] uppercase tracking-widest font-bold text-brand-ink/40">Coverage</th>
              <th className="px-8 py-4 text-[10px] uppercase tracking-widest font-bold text-brand-ink/40">Status</th>
              <th className="px-8 py-4 text-[10px] uppercase tracking-widest font-bold text-brand-ink/40">Next Harvest</th>
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

    <div className="glass-card overflow-hidden border-brand-green/5">
      <div className="p-8 border-b border-brand-green/5 bg-brand-green/[0.02]">
        <h3 className="text-2xl font-serif text-brand-green">Pineapple Fibre Availability</h3>
      </div>
      <div className="p-8 grid md:grid-cols-2 lg:grid-cols-5 gap-6">
        {resources.map(r => (
          <div key={r.id} className="p-6 bg-brand-paper rounded-2xl border border-brand-green/5 shadow-sm">
            <div className="text-[9px] uppercase font-bold text-brand-ink/40 mb-3">{r.district}</div>
            <div className="text-xl font-serif text-brand-green mb-4">{r.fibre_stock_t} t</div>
            <div className="w-full bg-brand-green/10 h-24 rounded-lg flex items-end overflow-hidden p-2">
              <div className="w-full bg-brand-orange rounded-md" style={{ height: `${(r.fibre_stock_t / 5000) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const HarvestEngine = ({ form, setForm, loading, result, submit, history }: any) => (
  <div className="grid lg:grid-cols-3 gap-12">
    <div className="lg:col-span-1">
      <form onSubmit={submit} className="glass-card p-10 border-brand-green/5 flex flex-col gap-8">
        <div>
          <h3 className="text-2xl font-serif text-brand-green mb-2">Engine Parameters</h3>
          <p className="text-xs text-brand-ink/40 font-bold uppercase tracking-widest">Optimising Harvest Volume</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-brand-ink/40 tracking-widest">District</label>
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
            <label className="text-[10px] uppercase font-bold text-brand-ink/40 tracking-widest">Species</label>
            <select 
              className="w-full p-4 bg-brand-green/5 border border-brand-green/10 rounded-2xl text-sm font-bold text-brand-ink outline-none focus:border-brand-green transition-all"
              value={form.species}
              onChange={(e) => setForm({ ...form, species: e.target.value })}
            >
              <option>Muli</option>
              <option>Bari</option>
              <option>Kanak Kaich</option>
              <option>Makal</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-brand-ink/40 tracking-widest">Clump Age</label>
              <input 
                type="number"
                className="w-full p-4 bg-brand-green/5 border border-brand-green/10 rounded-2xl text-sm font-bold text-brand-ink outline-none focus:border-brand-green transition-all"
                value={form.age}
                onChange={(e) => setForm({ ...form, age: parseInt(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-brand-ink/40 tracking-widest">Season</label>
              <select 
                className="w-full p-4 bg-brand-green/5 border border-brand-green/10 rounded-2xl text-sm font-bold text-brand-ink outline-none focus:border-brand-green transition-all"
                value={form.season}
                onChange={(e) => setForm({ ...form, season: e.target.value })}
              >
                <option>Winter</option>
                <option>Monsoon</option>
                <option>Summer</option>
                <option>Pre-Monsoon</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-brand-ink/40 tracking-widest">Density (culms/hc)</label>
            <input 
              type="number"
              className="w-full p-4 bg-brand-green/5 border border-brand-green/10 rounded-2xl text-sm font-bold text-brand-ink outline-none focus:border-brand-green transition-all"
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
          Get AI Recommendation
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
              <h3 className="text-3xl font-serif text-brand-ink">Strategy Analysis</h3>
              <p className="text-[10px] font-bold text-brand-ink/40 uppercase tracking-widest">Claude 3.5 Sonnet Insight</p>
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
          <h3 className="text-2xl font-serif">Awaiting Input</h3>
          <p className="text-xs font-bold uppercase tracking-widest mt-2">Adjust parameters to generate harvest advice</p>
        </div>
      )}

      <div className="glass-card overflow-hidden border-brand-green/5">
        <div className="p-8 border-b border-brand-green/5 bg-brand-green/[0.02] flex justify-between items-center">
          <h3 className="text-2xl font-serif text-brand-green">Recommendation History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-brand-green/[0.04]">
              <tr>
                <th className="px-8 py-4 text-[10px] uppercase tracking-widest font-bold text-brand-ink/40">Timestamp</th>
                <th className="px-8 py-4 text-[10px] uppercase tracking-widest font-bold text-brand-ink/40">District</th>
                <th className="px-8 py-4 text-[10px] uppercase tracking-widest font-bold text-brand-ink/40">Parameters</th>
                <th className="px-8 py-4 text-[10px] uppercase tracking-widest font-bold text-brand-ink/40">Insight Snippet</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-green/5">
              {history.map((h: any) => (
                <tr key={h.id} className="hover:bg-brand-green/[0.02]">
                  <td className="px-8 py-6 text-xs text-brand-ink/50 leading-tight">
                    {new Date(h.created_at).toLocaleString()}
                  </td>
                  <td className="px-8 py-6 font-bold text-brand-ink">{h.district}</td>
                  <td className="px-8 py-6 text-[10px] font-bold text-brand-ink/40">
                    {h.species} • {h.age}y • {h.season}
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

const SHGActivitySection = ({ activities }: { activities: SHGActivity[] }) => {
  const [filterDistrict, setFilterDistrict] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  const filtered = activities.filter(a => 
    (filterDistrict === "All" || a.district === filterDistrict) &&
    (filterStatus === "All" || a.status === filterStatus)
  );

  return (
    <div className="space-y-12">
      <div className="grid md:grid-cols-3 gap-8">
        <MetricCard title="Active SHGs" value={activities.filter(a => a.status === 'Active').length} icon={Users} />
        <MetricCard title="Total Volume Logged" value={`${activities.reduce((acc, a) => acc + a.volume_t, 0)} t`} icon={Leaf} />
        <MetricCard title="Income Generated" value={`₹ ${activities.reduce((acc, a) => acc + a.income_inr, 0).toLocaleString()}`} icon={TrendingUp} color="brand-orange" />
      </div>

      <div className="glass-card border-brand-green/5 overflow-hidden">
        <div className="p-8 border-b border-brand-green/5 bg-brand-green/[0.02] flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <h3 className="text-2xl font-serif text-brand-green">Cooperative Activity Ledger</h3>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-brand-green/10">
              <Filter className="w-4 h-4 text-brand-orange" />
              <select 
                className="text-xs font-bold bg-transparent outline-none uppercase tracking-widest cursor-pointer"
                value={filterDistrict}
                onChange={(e) => setFilterDistrict(e.target.value)}
              >
                <option>All</option>
                <option>Unakoti</option>
                <option>North Tripura</option>
                <option>Dhalai</option>
                <option>Sepahijala</option>
                <option>Gomati</option>
              </select>
            </div>
            <button className="px-6 py-2.5 bg-brand-green text-white rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-brand-ink transition-all">
              <Plus className="w-4 h-4" /> Log New Entry
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-brand-green/[0.04]">
              <tr>
                <th className="px-8 py-4 text-[10px] uppercase tracking-widest font-bold text-brand-ink/40">Cooperative</th>
                <th className="px-8 py-4 text-[10px] uppercase tracking-widest font-bold text-brand-ink/40">District</th>
                <th className="px-8 py-4 text-[10px] uppercase tracking-widest font-bold text-brand-ink/40">Last Harvest</th>
                <th className="px-8 py-4 text-[10px] uppercase tracking-widest font-bold text-brand-ink/40">Volume (t)</th>
                <th className="px-8 py-4 text-[10px] uppercase tracking-widest font-bold text-brand-ink/40">Income (₹)</th>
                <th className="px-8 py-4 text-[10px] uppercase tracking-widest font-bold text-brand-ink/40">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-green/5">
              {filtered.map((a) => (
                <tr key={a.id} className="hover:bg-brand-green/[0.02]">
                  <td className="px-8 py-6 font-bold text-brand-ink flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-brand-green/10 flex items-center justify-center text-brand-green">
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const CarbonReplantingSection = ({ resources }: { resources: DistrictResource[] }) => {
  const totalHarvested = 14502; // Dummy calc
  const totalReplanted = 18230; 
  const credits = Math.floor(totalHarvested / 10);
  const creditValue = credits * 800;

  return (
    <div className="space-y-12">
      <div className="grid md:grid-cols-4 gap-8">
        <MetricCard title="Total Harvested" value="14.5k t" icon={Download} />
        <MetricCard title="Total Replanted" value="18.2k t" icon={Trees} color="brand-green" />
        <MetricCard title="Compliance %" value="125 %" icon={ShieldCheck} />
        <MetricCard title="CO₂ Sequestered" value="1.4k t" icon={Loader2} color="brand-orange" />
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 glass-card p-10 border-brand-green/5">
          <h3 className="text-2xl font-serif text-brand-green mb-8">District Replanting Compliance</h3>
          <div className="space-y-8">
            {resources.map(r => (
              <div key={r.id} className="space-y-4">
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-xs font-bold text-brand-ink">{r.district}</div>
                    <div className="text-[10px] text-brand-ink/40 font-bold uppercase tracking-widest mt-1">Goal: 1:1.2 Ratio</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-brand-green">142%</div>
                  </div>
                </div>
                <div className="relative h-4 bg-brand-green/10 rounded-full overflow-hidden">
                  <div className="absolute h-full bg-brand-green" style={{ width: '100%' }} />
                  <div className="absolute h-full bg-brand-orange/50" style={{ width: '42%' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1 glass-card p-10 border-brand-orange/20 bg-brand-orange/[0.02]">
          <h3 className="text-2xl font-serif text-brand-green mb-6">Carbon Credit Estimate</h3>
          <div className="p-8 bg-white rounded-3xl border border-brand-orange/10 mb-8">
            <div className="text-[10px] uppercase font-bold text-brand-ink/40 tracking-widest mb-2">Total Credits (FY26)</div>
            <div className="text-5xl font-serif text-brand-orange mb-4">{credits.toLocaleString()}</div>
            <div className="text-[10px] font-bold text-brand-ink leading-relaxed">
              Based on sequestration formula: <br />
              <span className="opacity-40 italic">CO₂ t ÷ 10 = Credits</span>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <div className="text-[9px] uppercase font-bold text-brand-ink/40 tracking-widest mb-1">Estimated Market Value</div>
              <div className="text-3xl font-serif text-brand-green">₹ {creditValue.toLocaleString()}</div>
            </div>
            <p className="text-[11px] text-brand-ink/50 font-medium italic">
              "Indicative only. Formal audit required for monetisation."
            </p>
            <button 
              onClick={() => window.print()}
              className="w-full py-4 border-2 border-brand-green text-brand-green rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-brand-green hover:text-white transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" /> Download Carbon Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AlertsSection = ({ alerts, onResolve }: { alerts: DSSAlert[], onResolve: (id: string) => void }) => {
  const unresolved = alerts.filter(a => !a.resolved);
  const resolved = alerts.filter(a => a.resolved);

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
              {alert.severity} Alert
            </span>
            <span className="text-[10px] font-bold text-brand-ink/40 uppercase tracking-widest">
              {alert.district} • Detected {new Date(alert.detected_at.toDate()).toLocaleDateString()}
            </span>
          </div>
          <h3 className="text-2xl font-serif text-brand-ink">{alert.title}</h3>
          <p className="text-sm text-brand-ink/80 leading-relaxed max-w-2xl">{alert.description}</p>
          <div className="flex items-center gap-3 p-4 bg-brand-green/[0.03] rounded-2xl w-fit">
            <Info className="w-4 h-4 text-brand-orange" />
            <span className="text-xs font-bold text-brand-green">Action: {alert.action}</span>
          </div>
        </div>
        {!alert.resolved && (
          <button 
            onClick={() => onResolve(alert.id)}
            className="self-end md:self-center px-8 py-4 bg-brand-green text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-brand-green/20 hover:bg-brand-ink transition-all"
          >
            Mark Resolved
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
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <h3 className="text-2xl font-serif text-brand-green">Active Alerts</h3>
          <div className="h-px flex-1 bg-brand-green/10" />
          <span className="px-4 py-1.5 bg-red-500 text-white rounded-full text-[10px] font-bold">{unresolved.length} UNRESOLVED</span>
        </div>
        <div className="grid gap-6">
          {unresolved.map(a => <AlertCard key={a.id} alert={a} onResolve={onResolve} />)}
        </div>
      </div>

      {resolved.length > 0 && (
        <div className="pt-12 space-y-8">
          <div className="flex items-center gap-4">
            <h3 className="text-2xl font-serif text-brand-ink/40">Resolved Log</h3>
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

export default BambooSenseDSS;
