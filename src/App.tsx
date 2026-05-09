import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, ShieldCheck, Lock, CheckCircle, Wallet, FileText, 
  ArrowRight, Clock, Building, GraduationCap, ChevronRight, Calculator,
  Phone, Mail, MapPin, Camera, UserCircle2, Bell, LogOut, ZoomIn, 
  Maximize, Contrast, Download, AlertTriangle, Users, FileDigit, Server
} from 'lucide-react';

type ViewState = 'landing' | 'provider-login' | 'provider-dashboard' | 'scan-simulation';
type TabState = 'home' | 'pipeline' | 'pricing' | 'team' | 'contact';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [walletBalance, setWalletBalance] = useState<number>(1200);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-emerald-200 flex flex-col">
      <AnimatePresence mode="wait">
        {currentView === 'landing' && <LandingView key="landing" setView={setCurrentView} />}
        {currentView === 'provider-login' && <LoginView key="login" setView={setCurrentView} />}
        {currentView === 'provider-dashboard' && <DashboardView key="dashboard" setView={setCurrentView} walletBalance={walletBalance} />}
        {currentView === 'scan-simulation' && <SimulationView key="simulation" setView={setCurrentView} walletBalance={walletBalance} setWalletBalance={setWalletBalance} />}
      </AnimatePresence>
    </div>
  );
}

// --- LANDING CONTAINER ---
function LandingView({ setView }: { setView: (v: ViewState) => void }) {
  const [activeTab, setActiveTab] = useState<TabState>('home');

  const tabs = [
    { id: 'home', label: 'Overview' },
    { id: 'pipeline', label: 'Pipeline & Compliance' },
    { id: 'pricing', label: 'Enterprise ROI' },
    { id: 'team', label: 'Founders' },
    { id: 'contact', label: 'Contact' }
  ] as const;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col min-h-screen">
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-teal-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="bg-emerald-600 p-2 rounded-lg shadow-md"><Activity className="text-white w-6 h-6" /></div>
            <span className="text-2xl font-extrabold text-teal-950 tracking-tight">CareOnCall</span>
          </div>
          <div className="hidden lg:flex items-center gap-8 font-semibold text-slate-600">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)} className={`relative px-1 py-2 ${activeTab === t.id ? 'text-emerald-700' : 'hover:text-emerald-600'}`}>
                {t.label}
                {activeTab === t.id && <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-full" />}
              </button>
            ))}
          </div>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setView('provider-login')} className="bg-teal-900 hover:bg-teal-950 text-white px-6 py-2.5 rounded-full font-bold shadow-md flex items-center gap-2">
            Provider Portal <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </nav>

      <main className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && <TabHome key="home" setActiveTab={setActiveTab} />}
          {activeTab === 'pipeline' && <TabPipeline key="pipeline" />}
          {activeTab === 'pricing' && <TabPricing key="pricing" />}
          {activeTab === 'team' && <TabTeam key="team" />}
          {activeTab === 'contact' && <TabContact key="contact" />}
        </AnimatePresence>
      </main>

      <footer className="bg-teal-950 text-teal-200 py-10 border-t border-teal-900 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Activity className="text-emerald-500 w-6 h-6" />
            <span className="text-xl font-extrabold text-white tracking-tight">CareOnCall</span>
          </div>
          <p className="text-sm font-medium">AUC Capstone Project. Validated B2B Health-Tech Infrastructure.</p>
          <div className="flex gap-6 text-sm font-semibold text-teal-400"><span>HQ: Riyadh, KSA</span><span>OPS: Cairo, EGY</span></div>
        </div>
      </footer>
    </motion.div>
  );
}

// --- TABS ---
function TabHome({ setActiveTab }: { setActiveTab: (t: TabState) => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex-1">
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-100/40 via-slate-50 to-slate-50"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 font-bold text-xs uppercase tracking-wider mb-6">
              <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span></span>
              Solving the 15,000+ GCC Deficit
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-teal-950 leading-[1.1] mb-6 tracking-tight">Doctors as a Service. <br/><span className="text-emerald-600">Instant Infrastructure.</span></h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed font-medium">Stop bleeding capital on long recruitment cycles and visa delays. Seamlessly integrate board-certified Egyptian specialists directly into your hospital's EHR within 48 hours.</p>
            <div className="flex items-center gap-4">
              <motion.button onClick={() => setActiveTab('contact')} whileHover={{ y: -2 }} className="bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-2 shadow-lg">Integrate EHR Today <ChevronRight className="w-5 h-5"/></motion.button>
              <motion.button onClick={() => setActiveTab('pricing')} whileHover={{ y: -2 }} className="bg-white border-2 border-teal-800 text-teal-900 px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-2">Calculate ROI</motion.button>
            </div>
          </div>
          <div className="flex-1 relative w-full h-[500px] perspective-1000 hidden lg:block">
             <motion.div animate={{ y: [-10, 10, -10] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }} className="absolute inset-0 flex items-center justify-center">
                <div className="absolute left-0 top-1/4 bg-white/90 backdrop-blur p-6 rounded-2xl shadow-xl border border-slate-200 w-64 z-20">
                  <div className="flex items-center gap-3 mb-4"><Building className="text-teal-700 w-8 h-8" /><h3 className="font-bold text-slate-800">Gulf Hospital</h3></div>
                  <div className="space-y-2"><div className="h-2 w-full bg-slate-200 rounded text-transparent">_</div><div className="text-xs font-bold text-red-500 mt-2 bg-red-50 p-1 rounded inline-block">Demand: Critical</div></div>
                </div>
                <motion.div initial={{ x: -120, opacity: 0 }} animate={{ x: 120, opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className="absolute z-10 w-24 h-1.5 bg-emerald-400 blur-[2px] rounded-full" />
                <div className="absolute right-0 bottom-1/4 bg-white/90 backdrop-blur p-6 rounded-2xl shadow-xl border border-slate-200 w-64 z-20">
                  <div className="flex items-center gap-3 mb-4"><GraduationCap className="text-emerald-600 w-8 h-8" /><h3 className="font-bold text-slate-800">Egyptian Specialist</h3></div>
                  <div className="space-y-2"><div className="h-2 w-full bg-emerald-100 rounded text-transparent">_</div><div className="text-xs font-bold text-emerald-700 mt-2 bg-emerald-50 p-1 rounded inline-block">SLA: 4 Hour Turnaround</div></div>
                </div>
                <svg className="absolute inset-0 w-full h-full z-0 opacity-40"><path d="M 120 180 Q 300 180 300 350 T 500 350" fill="transparent" stroke="#059669" strokeWidth="4" strokeDasharray="8 8" className="animate-pulse" /></svg>
             </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <DataCard number="85.1%" title="Retention Guarantee" desc="Egyptian physicians would stay if financial conditions improved. (Kabbash et al. 2021)" color="emerald" />
            <DataCard number="56%" title="Already Gone" desc="Of registered Egyptian physicians are currently practicing abroad due to severe underpayment." color="red" />
            <DataCard number="57.1%" title="Workflow Preference" desc="Explicitly requested to provide medical support via asynchronous remote workflows during downtime." color="teal" />
          </div>
        </div>
      </section>
    </motion.div>
  );
}

function DataCard({ number, title, desc, color }: { number: string, title: string, desc: string, color: 'emerald' | 'red' | 'teal' }) {
  const styles = { emerald: 'text-emerald-600 bg-emerald-50 border-emerald-100', red: 'text-red-500 bg-red-50 border-red-100', teal: 'text-teal-700 bg-teal-50 border-teal-100' };
  return (
    <div className={`p-8 rounded-3xl border ${styles[color].split(' ')[1]} ${styles[color].split(' ')[2]}`}>
      <div className={`text-5xl lg:text-6xl font-black ${styles[color].split(' ')[0]} mb-4`}>{number}</div>
      <h3 className="text-xl font-bold text-teal-900 mb-2">{title}</h3>
      <p className="text-slate-600 font-medium">{desc}</p>
    </div>
  );
}

function TabPipeline() {
  const steps = [
    { icon: <Lock />, title: "1. Zero Trust Privacy Model", desc: "Military-grade data encryption, continuous authentication, and programmatic PII-stripping to ensure strict HIPAA/GCC compliance. Zero Patient Identifiable Information crosses borders." },
    { icon: <ShieldCheck />, title: "2. The 'Advisory Opinion' Malpractice Shield", desc: "Cross-border liability neutralized. Egyptian specialists act as advisors; final clinical liability and patient intervention remain 100% with the on-site Gulf physician." },
    { icon: <GraduationCap />, title: "3. Safety & Credentialing", desc: "Only board-certified physicians from elite institutions like Ain Shams and Demerdash are admitted, subjected to continuous peer-review auditing." },
    { icon: <Wallet />, title: "4. The FinTech Bypass", desc: "Routing compensation directly in USD to offshore digital wallets, protecting physician wealth and ensuring retention in their home country." }
  ];
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex-1 bg-slate-50 py-20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-teal-950 mb-4">Infrastructure & Compliance Architecture</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto font-medium">An ironclad legal and technical moat to protect Gulf hospitals and Egyptian specialists.</p>
        </div>
        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-8 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-emerald-200">
          {steps.map((s, i) => (
            <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-16 h-16 rounded-full border-4 border-white bg-emerald-100 text-emerald-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">{s.icon}</div>
              <div className="w-[calc(100%-5rem)] md:w-[calc(50%-3rem)] bg-white border border-slate-100 p-8 rounded-2xl shadow-sm hover:shadow-md transition">
                <h3 className="text-xl font-bold text-teal-900 mb-2">{s.title}</h3>
                <p className="text-slate-600 leading-relaxed font-medium">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function TabPricing() {
  const [scans, setScans] = useState<number>(400);
  const baseSaaS = 1500;
  const variableCost = scans * 30;
  const totalCost = baseSaaS + variableCost;
  const traditionalCapEx = 20000 + (scans * 15);
  const savings = traditionalCapEx - totalCost;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex-1 bg-white py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-teal-950 mb-4">Enterprise ROI Calculator</h2>
          <p className="text-xl text-slate-600 font-medium">Shift from massive fixed CapEx to lean, pay-per-read variable costs.</p>
        </div>
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="flex-1 bg-slate-50 p-10 rounded-3xl shadow-sm border border-slate-200 w-full">
            <h3 className="text-2xl font-bold text-teal-900 mb-6">Estimate Your Savings</h3>
            <div className="mb-8">
              <label className="flex justify-between font-bold text-slate-700 mb-4"><span>Estimated Scans / Month</span><span className="text-emerald-600 text-xl">{scans}</span></label>
              <input type="range" min="100" max="1000" step="50" value={scans} onChange={(e) => setScans(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
            </div>
            <div className="space-y-4 border-t border-slate-200 pt-6">
              <div className="flex justify-between text-slate-600 font-medium"><span>SaaS Platform Retainer</span><span>$1,500</span></div>
              <div className="flex justify-between text-slate-600 font-medium"><span>Variable Cost ({scans} @ $30/read)</span><span>${variableCost.toLocaleString()}</span></div>
              <div className="flex justify-between text-2xl font-black text-teal-950 pt-4 border-t border-slate-200"><span>CareOnCall Total:</span><span className="text-emerald-600">${totalCost.toLocaleString()}</span></div>
            </div>
          </div>
          <div className="flex-1 bg-teal-900 p-10 rounded-3xl shadow-xl border border-teal-800 w-full text-white relative overflow-hidden">
            <div className="absolute -right-6 -top-6 opacity-10 text-teal-100"><Calculator className="w-64 h-64" /></div>
            <div className="relative z-10">
              <h3 className="text-teal-200 font-bold mb-2 uppercase tracking-wider">Traditional CapEx vs DaaS</h3>
              <p className="text-sm text-teal-100/70 mb-8">Compare DaaS against traditional 6-month recruitment, visa processing, housing, and locum fees.</p>
              <div className="mb-6">
                <p className="text-teal-300 font-medium mb-1">Old Traditional Cost (Est.)</p>
                <p className="text-3xl font-bold text-slate-400 line-through decoration-red-500/70">${traditionalCapEx.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-teal-200 font-medium mb-1">Your Monthly Savings</p>
                <motion.p key={savings} initial={{ scale: 1.1, color: '#6ee7b7' }} animate={{ scale: 1, color: '#10b981' }} className="text-6xl font-black tracking-tight">${savings.toLocaleString()}</motion.p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function TabTeam() {
  const [photos, setPhotos] = useState<Record<string, string>>({});
  
  useEffect(() => {
    const savedPhotos = localStorage.getItem('careoncall_avatars');
    if (savedPhotos) setPhotos(JSON.parse(savedPhotos));
  }, []);

  const team = [
    { id: 'kareem', name: 'Kareem Amr', role: 'Leader | Strategy & Operations' },
    { id: 'abdelrahman', name: 'Abdelrahman Hani', role: 'Clinical Research' },
    { id: 'hatem', name: 'Mohammed Hatem', role: 'Provider Relations' },
    { id: 'mohab', name: 'Mohab Adel', role: 'Technical Infrastructure' },
    { id: 'emad', name: 'Mohammed Emad', role: 'Enterprise Partnerships' }
  ];

  const handleImageUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const newPhotos = { ...photos, [id]: event.target.result as string };
          setPhotos(newPhotos);
          localStorage.setItem('careoncall_avatars', JSON.stringify(newPhotos));
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex-1 bg-slate-50 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-teal-950 mb-4">The Founders Behind the Bridge</h2>
          <p className="text-xl text-slate-600 font-medium">Click on any profile icon to securely upload personnel credentials.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-10">
          {team.map((member) => (
            <div key={member.id} className="flex flex-col items-center group w-64">
              <label className="relative cursor-pointer mb-6">
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(member.id, e)} />
                <div className="w-48 h-48 rounded-full border-4 border-emerald-500 bg-white flex items-center justify-center overflow-hidden transition-all shadow-lg group-hover:shadow-xl relative">
                  {photos[member.id] ? (
                    <img src={photos[member.id]} alt={member.name} className="w-full h-full object-cover" />
                  ) : (
                    <Users className="w-16 h-16 text-slate-300 group-hover:text-emerald-500 transition-colors" />
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"><Camera className="w-8 h-8" /></div>
                </div>
              </label>
              <h3 className="text-xl font-bold text-teal-900 text-center">{member.name}</h3>
              <p className="text-sm font-semibold text-emerald-600 text-center mt-1 bg-emerald-50 px-3 py-1 rounded-full">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function TabContact() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex-1 bg-white py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-slate-50 rounded-3xl shadow-xl border border-slate-200 overflow-hidden flex flex-col md:flex-row">
          <div className="bg-teal-900 text-white p-12 md:w-2/5 relative overflow-hidden">
            <div className="absolute -bottom-20 -left-20 opacity-10"><Activity className="w-96 h-96" /></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-extrabold mb-8">Initiate Integration</h3>
              <div className="space-y-8">
                <div className="flex items-start gap-4"><MapPin className="w-6 h-6 text-emerald-400 shrink-0" /><div><p className="font-bold text-lg">Global HQ</p><p className="text-teal-200">King Fahd Road, Riyadh, KSA</p></div></div>
                <div className="flex items-start gap-4"><MapPin className="w-6 h-6 text-emerald-400 shrink-0" /><div><p className="font-bold text-lg">Operations</p><p className="text-teal-200">The Greek Campus, Cairo, EGY</p></div></div>
                <div className="flex items-center gap-4 pt-6 border-t border-teal-800"><Phone className="w-5 h-5 text-emerald-400 shrink-0" /><p className="font-medium">+966 50 555 0192</p></div>
                <div className="flex items-center gap-4"><Mail className="w-5 h-5 text-emerald-400 shrink-0" /><p className="font-medium">enterprise@careoncall.io</p></div>
              </div>
            </div>
          </div>
          <div className="p-12 md:w-3/5 bg-white">
            <h3 className="text-2xl font-bold text-teal-950 mb-6">Request an Audit</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-6">
                <div><label className="block text-sm font-bold text-slate-700 mb-2">Name</label><input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none" /></div>
                <div><label className="block text-sm font-bold text-slate-700 mb-2">Hospital</label><input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none" /></div>
              </div>
              <div><label className="block text-sm font-bold text-slate-700 mb-2">Work Email</label><input type="email" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none" /></div>
              <div><label className="block text-sm font-bold text-slate-700 mb-2">Inquiry</label><textarea rows={3} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none resize-none"></textarea></div>
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-8 rounded-xl transition-colors shadow-md w-full">Submit Request</button>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// --- PROVIDER LOGIN ---
function LoginView({ setView }: { setView: (v: ViewState) => void }) {
  const [loading, setLoading] = useState(false);
  const handleLogin = (e: React.FormEvent) => { e.preventDefault(); setLoading(true); setTimeout(() => setView('provider-dashboard'), 1500); };
  
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen flex items-center justify-center bg-teal-950 p-6">
      <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-emerald-100 p-4 rounded-2xl mb-4 text-emerald-600"><Lock className="w-8 h-8" /></div>
          <h2 className="text-2xl font-bold text-teal-950 text-center">Secure Access Terminal</h2>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <div><label className="block text-slate-700 text-sm font-bold mb-2">Email</label><input readOnly value="dr.ahmed@demerdash.edu.eg" className="w-full bg-slate-50 border border-slate-200 text-slate-600 rounded-xl px-4 py-3 font-mono text-sm outline-none" /></div>
          <div><label className="block text-slate-700 text-sm font-bold mb-2">Token</label><input type="password" readOnly value="••••••••" className="w-full bg-slate-50 border border-slate-200 text-slate-600 rounded-xl px-4 py-3 tracking-widest outline-none" /></div>
          <button type="submit" disabled={loading} className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex justify-center items-center mt-4">
            {loading ? "Authenticating Zero-Trust..." : "Enter Workspace"}
          </button>
        </form>
      </div>
    </motion.div>
  );
}

// --- PROVIDER DASHBOARD ---
function DashboardView({ setView, walletBalance }: { setView: (v: ViewState) => void, walletBalance: number }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      <aside className="w-full md:w-72 bg-teal-950 text-teal-100 flex flex-col p-6 border-r border-teal-900 z-20">
        <div className="flex items-center gap-3 mb-10 text-2xl font-extrabold text-white"><div className="bg-emerald-600 p-1.5 rounded-md"><Activity className="w-5 h-5" /></div>CareOnCall</div>
        <div className="mb-8 p-4 bg-teal-900/50 rounded-xl border border-teal-800">
          <div className="flex gap-3 mb-3"><UserCircle2 className="w-10 h-10 text-emerald-400" /><div><div className="text-white font-bold text-sm">Dr. Ahmed M.</div><div className="text-teal-400 text-xs font-medium">Demerdash Rad Dept.</div></div></div>
        </div>
        <nav className="space-y-2 flex-1">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-teal-800 text-white font-semibold"><FileText className="w-5 h-5"/> My Queue</div>
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-teal-400 cursor-not-allowed opacity-50"><Wallet className="w-5 h-5"/> Payoneer Wallet</div>
        </nav>
        <div className="mt-auto pt-6 border-t border-teal-900">
          <button onClick={() => setView('landing')} className="flex items-center justify-center gap-2 text-red-400 hover:text-red-300 text-sm font-semibold w-full p-2 rounded-lg transition-colors"><LogOut className="w-4 h-4"/> Terminate Session</button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between shadow-sm z-10">
          <h1 className="text-2xl font-extrabold text-teal-950 tracking-tight">Specialist Workspace</h1>
          <div className="flex items-center gap-4">
            <span className="hidden md:flex text-sm text-slate-600 font-bold items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100"><span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>Zero-Trust Connection Secured</span>
            <Bell className="w-6 h-6 text-slate-400" />
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"><div className="text-slate-500 font-bold mb-2 flex items-center gap-2"><FileText className="w-5 h-5 text-teal-600"/> Pending Scans</div><div className="text-4xl font-black text-teal-950 mb-2">3 Awaiting</div></div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"><div className="text-slate-500 font-bold mb-2 flex items-center gap-2"><CheckCircle className="w-5 h-5 text-teal-600"/> Monthly Volume</div><div className="text-4xl font-black text-teal-950 mb-2">40 Processed</div></div>
            <div className="bg-teal-900 p-6 rounded-2xl border border-teal-800 text-white relative overflow-hidden"><Wallet className="absolute -right-4 -top-4 w-32 h-32 text-teal-800/50" />
              <div className="relative z-10"><div className="text-teal-300 font-bold mb-2 flex flex-col">Offshore Wallet Balance</div>
              <div className="text-5xl font-black mb-4 tracking-tight">${walletBalance}.00 <span className="text-lg text-teal-400">USD</span></div>
              <button className="bg-emerald-500 hover:bg-emerald-400 text-teal-950 text-sm font-bold px-4 py-2.5 rounded-xl w-full shadow-lg transition-colors">Withdraw to Payoneer</button></div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/80"><h2 className="text-xl font-bold text-teal-950 flex items-center gap-2"><FileDigit className="w-5 h-5 text-teal-600"/> Patient Queue</h2></div>
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[800px]">
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200">
                  <tr><th className="p-4">Priority</th><th className="p-4">Case ID</th><th className="p-4">Modality</th><th className="p-4">Compliance Status</th><th className="p-4">Fee</th><th className="p-4 text-right">Action</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50 transition-colors bg-orange-50/30">
                    <td className="p-4"><span className="text-orange-600 font-bold text-sm bg-orange-100 px-2.5 py-1 rounded-md">Urgent: 3h 45m left</span></td>
                    <td className="p-4 font-mono font-bold text-teal-900 text-sm">KSA-RM-902</td><td className="p-4 font-bold text-slate-800 text-sm">Fetal Ultrasound</td>
                    <td className="p-4"><span className="px-2.5 py-1.5 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 flex w-max gap-1"><ShieldCheck className="w-3.5 h-3.5" /> PII Redacted</span></td>
                    <td className="p-4 font-black text-teal-800 text-sm">$30 USD</td>
                    <td className="p-4 text-right"><motion.button whileHover={{ scale: 1.05 }} onClick={() => setView('scan-simulation')} className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md transition-colors w-max whitespace-nowrap">Open PACS Viewer</motion.button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </motion.div>
  );
}

// --- SCAN SIMULATION CLIMAX ---
function SimulationView({ setView, walletBalance, setWalletBalance }: { setView: (v: ViewState) => void, walletBalance: number, setWalletBalance: (v: number) => void }) {
  const [transmitState, setTransmitState] = useState<'idle' | 'encrypting' | 'success'>('idle');
  const [report, setReport] = useState("Single live intrauterine gestation of ~22 weeks. No evident gross morphological anomalies. Routine follow-up recommended.");

  const handleTransmit = () => {
    setTransmitState('encrypting');
    setTimeout(() => { setTransmitState('success'); setWalletBalance(walletBalance + 30); }, 2000);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen bg-black flex flex-col">
      <header className="bg-[#0f1115] border-b border-slate-800 px-6 h-14 flex justify-between items-center text-slate-300">
        <div className="flex gap-4 items-center">
          <span className="bg-red-900/40 text-red-400 px-3 py-1 rounded border border-red-500/30 text-xs font-bold uppercase"><Lock className="w-3 h-3 inline mr-1"/> Advisory Terminal</span>
          <span className="font-mono text-sm text-slate-500">Malpractice Shield: ACTIVE</span>
        </div>
        <button onClick={() => setView('provider-dashboard')} className="text-slate-400 hover:text-white text-sm font-bold bg-slate-800 px-4 py-2 rounded">Cancel & Return ✕</button>
      </header>
      <div className="flex-1 flex flex-col lg:flex-row relative">
        
        <AnimatePresence>
          {transmitState === 'success' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-8">
              <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-white border-2 border-emerald-500 shadow-2xl rounded-3xl p-10 max-w-md text-center w-full">
                <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-3xl font-black text-teal-950 mb-3 tracking-tight">Transmission Success</h3>
                <p className="text-slate-600 font-medium mb-8">Advisory report encrypted and routed to Riyadh General EHR. Shield applied.</p>
                <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-200 mb-8 overflow-hidden text-center">
                  <p className="text-xs font-bold text-emerald-800 uppercase tracking-widest mb-1">FinTech Bypass Executed</p>
                  <p className="text-4xl font-black text-emerald-600">+$30.00 USD</p>
                </div>
                <button onClick={() => setView('provider-dashboard')} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2">Return to Dashboard <ArrowRight className="w-5 h-5"/></button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="w-full lg:w-[45%] bg-black relative flex flex-col border-r border-slate-800 justify-center">
          <div className="absolute top-4 left-4 z-10 text-emerald-500 text-xs p-2 border border-emerald-500 bg-emerald-900/20 rounded font-bold uppercase"><Lock className="w-4 h-4 inline mr-1"/> VISUAL DATA ONLY</div>
          <div className="w-96 h-96 mx-auto rounded-full border border-slate-700/50 bg-[radial-gradient(circle_at_center,_#334155_0%,_#000000_70%)] animate-pulse flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.05)]">
             <Activity className="w-32 h-32 text-slate-400 opacity-20" />
          </div>
        </div>

        <div className="w-full lg:w-[55%] bg-slate-50 flex flex-col p-8 lg:p-12">
          <h2 className="text-3xl font-extrabold text-teal-950 mb-6 tracking-tight">Diagnostic Report</h2>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8 flex gap-4 shadow-sm">
            <AlertTriangle className="w-8 h-8 text-amber-600 shrink-0" />
            <div>
              <p className="text-amber-900 font-bold text-sm uppercase tracking-wide mb-1">Legal Shield Active</p>
              <p className="text-amber-800 text-sm font-medium">Providing asynchronous advisory opinion. Final liability remains entirely with the KSA attending physician.</p>
            </div>
          </div>
          <div className="flex-1 flex flex-col">
            <label className="block text-sm font-bold text-teal-900 mb-2 uppercase tracking-wide">Advisory Impression</label>
            <textarea value={report} onChange={(e) => setReport(e.target.value)} disabled={transmitState !== 'idle'} className="w-full h-48 bg-white border border-slate-300 rounded-xl p-5 text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none resize-none shadow-sm font-medium leading-relaxed"></textarea>
            <button onClick={handleTransmit} disabled={transmitState !== 'idle'} className={`mt-8 w-full py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all shadow-xl ${transmitState === 'idle' ? 'bg-emerald-600 text-white cursor-pointer hover:bg-emerald-500' : 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none'}`}>
              {transmitState === 'idle' && <>Sign & Transmit Advisory <span className="bg-emerald-800 px-3 py-1 rounded-lg text-sm ml-2">Claim $30 Fee</span></>}
              {transmitState !== 'idle' && <><Server className="animate-pulse w-6 h-6" /> Applying Encryption & Transmitting...</>}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
