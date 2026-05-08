import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, ShieldCheck, Lock, CheckCircle, Wallet, FileText, 
  ArrowRight, Clock, Building, GraduationCap, PlayCircle, LogOut, 
  Search, Bell, Settings, ZoomIn, Maximize, Contrast, Download, 
  AlertTriangle, Users, Calculator, Phone, Mail, MapPin, Camera
} from 'lucide-react';

type ViewState = 'landing' | 'provider-login' | 'provider-dashboard' | 'scan-simulation';
type TabState = 'home' | 'pipeline' | 'pricing' | 'team' | 'contact';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [activeTab, setActiveTab] = useState<TabState>('home');
  const [walletBalance, setWalletBalance] = useState<number>(1200);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-emerald-200">
      <AnimatePresence mode="wait">
        {currentView === 'landing' && (
          <LandingContainer 
            key="landing" 
            setView={setCurrentView} 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
          />
        )}
        {currentView === 'provider-login' && (
          <LoginView key="login" setView={setCurrentView} />
        )}
        {currentView === 'provider-dashboard' && (
          <DashboardView key="dashboard" setView={setCurrentView} walletBalance={walletBalance} />
        )}
        {currentView === 'scan-simulation' && (
          <SimulationView 
            key="simulation" 
            setView={setCurrentView} 
            walletBalance={walletBalance} 
            setWalletBalance={setWalletBalance} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ----------------------------------------------------
// B2B LANDING CONTAINER & NAVBAR
// ----------------------------------------------------
function LandingContainer({ 
  setView, activeTab, setActiveTab 
}: { 
  setView: (v: ViewState) => void, 
  activeTab: TabState, 
  setActiveTab: (t: TabState) => void 
}) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col min-h-screen content-center">
      <nav className="sticky top-0 z-50 bg-slate-50/90 backdrop-blur-md border-b border-teal-100 shadow-sm w-full">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="bg-emerald-600 p-2 rounded-lg shadow-md">
              <Activity className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-extrabold text-teal-950 tracking-tight">CareOnCall</span>
          </div>
          
          <div className="hidden lg:flex items-center gap-8 font-semibold text-slate-600">
            <NavBtn label="Overview" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
            <NavBtn label="Talent Pipeline & Compliance" active={activeTab === 'pipeline'} onClick={() => setActiveTab('pipeline')} />
            <NavBtn label="Enterprise Pricing" active={activeTab === 'pricing'} onClick={() => setActiveTab('pricing')} />
            <NavBtn label="Our Founders" active={activeTab === 'team'} onClick={() => setActiveTab('team')} />
            <NavBtn label="Contact Us" active={activeTab === 'contact'} onClick={() => setActiveTab('contact')} />
          </div>

          <motion.button 
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => setView('provider-login')}
            className="bg-teal-900 hover:bg-teal-950 text-white px-6 py-2.5 rounded-full font-bold shadow-md transition-all flex items-center gap-2"
          >
            Provider Portal <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && <TabOverview key="home" />}
          {activeTab === 'pipeline' && <TabPipeline key="pipeline" />}
          {activeTab === 'pricing' && <TabPricing key="pricing" />}
          {activeTab === 'team' && <TabTeam key="team" />}
          {activeTab === 'contact' && <TabContact key="contact" />}
        </AnimatePresence>
      </main>
    </motion.div>
  );
}

function NavBtn({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`relative px-1 py-2 transition-colors ${active ? 'text-emerald-700' : 'hover:text-emerald-600'}`}
    >
      {label}
      {active && (
        <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-full" />
      )}
    </button>
  );
}

// ----------------------------------------------------
// TAB 1: OVERVIEW (HOME)
// ----------------------------------------------------
function TabOverview() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full">
      <section className="relative pt-20 pb-32 overflow-hidden bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-50/80 via-slate-50 to-slate-50">
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-left">
            <h1 className="text-5xl lg:text-7xl font-extrabold text-teal-950 leading-[1.1] mb-6 tracking-tight">
              Doctors as a Service. <br/>
              <span className="text-emerald-600">Instant Infrastructure.</span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl font-medium">
              Stop bleeding capital on 6-month recruitment cycles and visa delays. Seamlessly integrate board-certified Egyptian specialists directly into your hospital's EHR within 48 hours.
            </p>
            <div className="flex items-center gap-4">
              <motion.button whileHover={{ y: -2, boxShadow: "0px 10px 20px rgba(5,150,105,0.2)" }} className="bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2">
                Integrate EHR Today <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
          
          <div className="flex-1 w-full relative h-[450px] hidden lg:block">
            <motion.div animate={{ y: [-10, 10, -10] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }} className="absolute inset-0 flex items-center justify-center">
               <div className="absolute left-0 top-1/4 bg-white/90 backdrop-blur p-6 rounded-2xl shadow-xl border border-slate-200 z-20">
                 <div className="flex items-center gap-3 mb-4"><Building className="text-teal-700 w-8 h-8" /><h3 className="font-bold text-slate-800">Riyadh Hub</h3></div>
                 <div className="h-2 w-full bg-slate-200 rounded mb-2"></div>
                 <div className="text-xs font-bold text-red-500 bg-red-50 p-1 rounded inline-block">Demand: Critical</div>
               </div>

               <motion.div initial={{ x: -120, opacity: 0 }} animate={{ x: 120, opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className="absolute z-10 w-24 h-1.5 bg-emerald-400 blur-[2px] rounded-full" />

               <div className="absolute right-0 bottom-1/4 bg-white/90 backdrop-blur p-6 rounded-2xl shadow-xl border border-slate-200 z-20">
                 <div className="flex items-center gap-3 mb-4"><GraduationCap className="text-emerald-600 w-8 h-8" /><h3 className="font-bold text-slate-800">Cairo Hub</h3></div>
                 <div className="h-2 w-full bg-emerald-100 rounded mb-2"></div>
                 <div className="text-xs font-bold text-emerald-700 bg-emerald-50 p-1 rounded inline-block">SLA: 4h TAT</div>
               </div>

               <svg className="absolute inset-0 w-full h-full opacity-40 z-0">
                 <path d="M 120 150 Q 300 180 300 350 T 500 350" fill="transparent" stroke="#059669" strokeWidth="4" strokeDasharray="8 8" className="animate-pulse" />
               </svg>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-t border-slate-200 w-full">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div whileHover={{ y: -5, scale: 1.02 }} className="p-8 bg-emerald-50 rounded-3xl border border-emerald-100 shadow-sm">
              <div className="text-5xl font-black text-emerald-600 mb-4">85.1%</div>
              <h3 className="text-xl font-bold text-teal-900 mb-2">Retention Guarantee</h3>
              <p className="text-slate-600 font-medium">Of surveyed Egyptian physicians would stay in Egypt—combating brain drain.</p>
            </motion.div>
            <motion.div whileHover={{ y: -5, scale: 1.02 }} className="p-8 bg-teal-50 rounded-3xl border border-teal-100 shadow-sm">
              <div className="text-5xl font-black text-teal-700 mb-4">56%</div>
              <h3 className="text-xl font-bold text-teal-900 mb-2">The Mass Exodus</h3>
              <p className="text-slate-600 font-medium">Of physicians registered are practicing abroad due to low pay.</p>
            </motion.div>
            <motion.div whileHover={{ y: -5, scale: 1.02 }} className="p-8 bg-slate-50 border border-slate-200 rounded-3xl shadow-sm">
              <div className="text-5xl font-black text-slate-600 mb-4">57.1%</div>
              <h3 className="text-xl font-bold text-teal-900 mb-2">Workflow Preference</h3>
              <p className="text-slate-600 font-medium">Requested to provide support via asynchronous remote workflows.</p>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

// ----------------------------------------------------
// TAB 2: PIPELINE & COMPLIANCE
// ----------------------------------------------------
function TabPipeline() {
  const steps = [
    { title: "Exclusive Institutional Networks", desc: "We formally partner with top-tier university hospitals like Ain Shams and Demerdash to onboard pre-credentialed faculty.", icon: <Building /> },
    { title: "The 'Advisory Opinion' Malpractice Shield", desc: "Cross-border liability is neutralized. Our specialists provide an 'Advisory Opinion', shifting primary liability to the Gulf attending physician.", icon: <ShieldCheck /> },
    { title: "Programmatic PII-Stripping & Zero Trust", desc: "API programmatically strips all Personally Identifiable Information (PII) before transmission for End-to-End Encrypted HIPAA compliance.", icon: <Lock /> },
    { title: "The FinTech Bypass", desc: "Routing compensation directly in USD to offshore digital wallets, protecting physician wealth and ensuring retention.", icon: <Wallet /> },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full py-20 bg-slate-50 flex justify-center">
      <div className="max-w-4xl px-6 w-full">
        <h2 className="text-4xl font-extrabold text-teal-950 mb-12 text-center">Talent Pipeline & Compliance Architecture</h2>
        <div className="space-y-8 relative before:absolute before:inset-0 before:left-8 before:-translate-x-px before:h-full before:w-1 before:bg-emerald-200">
          {steps.map((step, idx) => (
            <motion.div key={idx} whileHover={{ x: 5 }} className="relative flex items-center pl-20">
              <div className="absolute left-4 w-12 h-12 bg-white border-4 border-emerald-500 rounded-full flex items-center justify-center text-emerald-600 shadow-md">
                {React.cloneElement(step.icon as React.ReactElement, { size: 20 })}
              </div>
              <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm w-full">
                <h3 className="text-2xl font-bold text-teal-900 mb-2">{step.title}</h3>
                <p className="text-slate-600 font-medium text-lg">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ----------------------------------------------------
// TAB 3: PRICING ROI CALCULATOR
// ----------------------------------------------------
function TabPricing() {
  const [scans, setScans] = useState<number>(300);
  const baseRetainer = 1500;
  const variableCost = scans * 30;
  const totalCost = baseRetainer + variableCost;
  const capex = 20000 + (scans * 15);
  const savings = capex - totalCost;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full py-20 bg-white flex justify-center">
      <div className="max-w-6xl w-full px-6">
        <h2 className="text-4xl font-extrabold text-teal-950 mb-12 text-center">Enterprise ROI Calculator</h2>
        <div className="grid lg:grid-cols-2 gap-12">
          
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-10 shadow-sm">
            <h3 className="text-2xl font-bold text-teal-900 mb-8 border-b border-slate-200 pb-4">Adjust Volume</h3>
            <div className="mb-10">
              <label className="flex justify-between font-bold text-slate-700 mb-4">
                <span>Estimated Asynchronous Scans / Month</span>
                <span className="text-emerald-600 bg-emerald-50 px-3 py-1 rounded-md">{scans} Scans</span>
              </label>
              <input 
                type="range" min="100" max="1000" step="50" value={scans}
                onChange={(e) => setScans(Number(e.target.value))}
                className="w-full h-3 bg-slate-200 rounded-full appearance-none cursor-pointer accent-emerald-600"
              />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between text-slate-600 font-medium p-3 bg-white rounded-xl shadow-sm border border-slate-100">
                <span>Base SaaS Retainer</span><span>${baseRetainer.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600 font-medium p-3 bg-white rounded-xl shadow-sm border border-slate-100">
                <span>Variable Cost ({scans} × $30)</span><span>${variableCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-teal-900 p-4 bg-teal-50 rounded-xl mt-4 border border-teal-100">
                <span>CareOnCall Total</span><span className="text-emerald-600">${totalCost.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="bg-teal-900 border border-teal-800 rounded-3xl p-10 shadow-xl text-white relative overflow-hidden flex flex-col justify-center">
            <Calculator className="absolute -right-10 top-0 w-64 h-64 opacity-5 text-teal-100" />
            <div className="relative z-10">
              <p className="text-teal-200 font-bold mb-6 text-sm uppercase tracking-wider">Traditional CapEx Cost</p>
              <div className="text-5xl font-black text-slate-400 line-through decoration-red-500 mb-10 decoration-4">
                ${capex.toLocaleString()}
              </div>
              <p className="text-teal-200 font-bold mb-2 text-sm uppercase tracking-wider">Your Monthly Savings</p>
              <motion.div 
                key={savings} initial={{ scale: 1.1, color: '#6ee7b7' }} animate={{ scale: 1, color: '#34d399' }}
                className="text-7xl font-black tracking-tight"
              >
                ${savings.toLocaleString()}
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}

// ----------------------------------------------------
// TAB 4: OUR FOUNDERS (LIVE UPLOADS)
// ----------------------------------------------------
function TabTeam() {
  const [avatars, setAvatars] = useState<Record<string, string>>({});
  
  const handleUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setAvatars(prev => ({ ...prev, [id]: url }));
    }
  };

  const founders = [
    { id: '1', name: "Kareem Amr", role: "Leader" },
    { id: '2', name: "Abdelrahman Hani", role: "Clinical Research" },
    { id: '3', name: "Mohammed Hatem", role: "Provider Relations" },
    { id: '4', name: "Mohab Adel", role: "Technical Infrastructure" },
    { id: '5', name: "Mohammed Emad", role: "Enterprise Partnerships" },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full py-20 bg-slate-50 flex justify-center">
      <div className="max-w-6xl w-full px-6">
        <h2 className="text-4xl font-extrabold text-teal-950 mb-16 text-center">The Founders Behind the Bridge</h2>
        <div className="flex flex-wrap justify-center gap-12">
          {founders.map((founder) => (
            <motion.div key={founder.id} whileHover={{ y: -5, scale: 1.05 }} className="flex flex-col items-center">
              <label className="relative cursor-pointer group">
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleUpload(founder.id, e)} />
                <div className="w-48 h-48 rounded-full border-4 border-emerald-500 bg-white flex items-center justify-center overflow-hidden relative shadow-lg">
                  {avatars[founder.id] ? (
                    <img src={avatars[founder.id]} alt={founder.name} className="w-full h-full object-cover" />
                  ) : (
                    <Users className="w-16 h-16 text-slate-300 group-hover:text-emerald-500 transition-colors" />
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <Camera className="w-8 h-8" />
                  </div>
                </div>
              </label>
              <h3 className="text-xl font-bold text-teal-950 mt-6">{founder.name}</h3>
              <p className="text-sm font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full mt-2">{founder.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ----------------------------------------------------
// TAB 5: CONTACT US
// ----------------------------------------------------
function TabContact() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full py-20 bg-white flex justify-center">
      <div className="max-w-5xl w-full px-6">
        <h2 className="text-4xl font-extrabold text-teal-950 mb-12 text-center">Initiate Integration</h2>
        <div className="bg-slate-50 border border-slate-200 rounded-3xl shadow-lg flex flex-col md:flex-row overflow-hidden">
          
          <div className="md:w-5/12 bg-teal-950 p-12 text-teal-50 flex flex-col relative overflow-hidden">
             <Activity className="absolute -bottom-10 -left-10 w-64 h-64 opacity-10 text-emerald-500" />
             <div className="relative z-10 space-y-8">
               <h3 className="text-2xl font-bold text-white">Global Presence</h3>
               <div className="flex gap-4">
                 <MapPin className="text-emerald-500 shrink-0 mt-1" />
                 <div><p className="font-bold">HQ</p><p className="text-teal-200">King Fahd Road, Riyadh, KSA</p></div>
               </div>
               <div className="flex gap-4">
                 <MapPin className="text-emerald-500 shrink-0 mt-1" />
                 <div><p className="font-bold">Ops</p><p className="text-teal-200">The Greek Campus, Cairo, EGY</p></div>
               </div>
               <div className="flex gap-4 items-center">
                 <Phone className="text-emerald-500 shrink-0" /><p className="font-medium">+966 50 555 0192</p>
               </div>
               <div className="flex gap-4 items-center">
                 <Mail className="text-emerald-500 shrink-0" /><p className="font-medium">enterprise@careoncall.io</p>
               </div>
             </div>
          </div>

          <div className="md:w-7/12 p-12 bg-white">
            <form onSubmit={e => e.preventDefault()} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div><label className="block text-sm font-bold text-slate-700 mb-2">Name</label><input type="text" className="w-full border-slate-300 rounded-xl px-4 py-3 bg-slate-50 border focus:ring-2 focus:ring-emerald-500 outline-none" /></div>
                <div><label className="block text-sm font-bold text-slate-700 mb-2">Hospital Name</label><input type="text" className="w-full border-slate-300 rounded-xl px-4 py-3 bg-slate-50 border focus:ring-2 focus:ring-emerald-500 outline-none" /></div>
              </div>
              <div><label className="block text-sm font-bold text-slate-700 mb-2">Work Email</label><input type="email" className="w-full border-slate-300 rounded-xl px-4 py-3 bg-slate-50 border focus:ring-2 focus:ring-emerald-500 outline-none" /></div>
              <div><label className="block text-sm font-bold text-slate-700 mb-2">Inquiry</label><textarea rows={4} className="w-full border-slate-300 rounded-xl px-4 py-3 bg-slate-50 border focus:ring-2 focus:ring-emerald-500 outline-none resize-none"></textarea></div>
              <motion.button whileHover={{ scale: 1.02 }} className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl shadow-md cursor-pointer hover:bg-emerald-700">Submit Integration Request</motion.button>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ----------------------------------------------------
// PROVIDER LOGIN
// ----------------------------------------------------
function LoginView({ setView }: { setView: (v: ViewState) => void }) {
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setView('provider-dashboard'), 1500);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen flex items-center justify-center bg-teal-950 p-6">
      <div className="w-full max-w-md bg-white border border-slate-200 p-10 rounded-3xl shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-emerald-100 p-4 rounded-full mb-4 text-emerald-600 shadow-inner">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-teal-950 text-center">Secure Provider Terminal</h2>
        </div>
        <form onSubmit={onSubmit} className="space-y-6">
          <div><label className="block text-slate-700 text-sm font-bold mb-2">Institutional Email</label><input readOnly value="dr.ahmed@demerdash.edu.eg" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-mono text-sm text-slate-500 outline-none" /></div>
          <div><label className="block text-slate-700 text-sm font-bold mb-2">Secure Token</label><input type="password" readOnly value="••••••••••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-500 tracking-[0.3em] outline-none" /></div>
          <button type="submit" disabled={loading} className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-md hover:bg-emerald-700 transition-colors">
            {loading ? <span className="animate-pulse">Authenticating zero-trust...</span> : "Authenticate"}
          </button>
        </form>
      </div>
    </motion.div>
  );
}

// ----------------------------------------------------
// PROVIDER DASHBOARD
// ----------------------------------------------------
function DashboardView({ setView, walletBalance }: { setView: (v: ViewState) => void, walletBalance: number }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen bg-slate-50 flex">
      <aside className="w-72 bg-teal-950 text-teal-100 flex flex-col p-6 shrink-0 relative z-10 shadow-xl">
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-emerald-600 p-2 rounded-lg"><Activity className="text-white w-6 h-6" /></div>
          <span className="text-2xl font-extrabold text-white">CareOnCall</span>
        </div>
        <nav className="space-y-2 flex-1">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-teal-800 text-white font-bold shadow-inner"><FileText className="w-5 h-5"/> Asynchronous Queue</div>
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-teal-900 cursor-not-allowed opacity-50"><CheckCircle className="w-5 h-5"/> Completed History</div>
        </nav>
        <div className="mt-auto border-t border-teal-800 pt-6">
          <button onClick={() => setView('landing')} className="flex items-center gap-2 text-teal-400 hover:text-white font-bold text-sm bg-teal-900/50 hover:bg-teal-900 w-full p-3 rounded-xl transition-colors">
            <LogOut className="w-4 h-4" /> Terminate Session
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white h-24 px-10 flex items-center justify-between shadow-sm shrink-0 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-extrabold text-teal-950">Welcome Dr. Ahmed M. | Demerdash Radiology Dept.</h1>
            <p className="text-sm font-bold text-slate-500 mt-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> EHR Link Active & Encrypted
            </p>
          </div>
        </header>

        <div className="flex-1 p-10 overflow-y-auto">
          <div className="grid grid-cols-3 gap-6 mb-10">
            <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm">
              <div className="text-slate-400 font-bold uppercase text-xs tracking-wider mb-2 flex items-center gap-2"><Clock className="w-4 h-4"/> Pending Queue</div>
              <div className="text-4xl font-black text-teal-950">3 Scans</div>
            </div>
            <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm">
              <div className="text-slate-400 font-bold uppercase text-xs tracking-wider mb-2 flex items-center gap-2"><Activity className="w-4 h-4"/> Monthly Volume</div>
              <div className="text-4xl font-black text-teal-950">40 Scans</div>
            </div>
            <div className="bg-teal-900 border border-teal-800 p-6 rounded-3xl shadow-xl text-white relative overflow-hidden flex flex-col justify-center">
              <Wallet className="absolute -right-4 -top-4 w-24 h-24 opacity-10" />
              <div className="relative z-10">
                <div className="text-teal-300 font-bold uppercase text-xs tracking-wider mb-2 flex items-center gap-2">Total Earnings</div>
                <div className="text-5xl font-black">${walletBalance}.00 <span className="text-xl font-bold text-teal-200">USD</span></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-extrabold text-teal-950 text-xl">Patient Queue</h2>
            </div>
            <table className="w-full text-left">
              <thead className="bg-white border-b border-slate-100">
                <tr className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                  <th className="p-5">Case ID</th>
                  <th className="p-5">Type</th>
                  <th className="p-5">Compliance</th>
                  <th className="p-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="p-5 font-mono font-bold text-teal-900">KSA-Riy-MR-902</td>
                  <td className="p-5 font-bold text-slate-700">Complex Fetal Ultrasound</td>
                  <td className="p-5"><span className="bg-emerald-100 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 w-max"><Lock className="w-3 h-3"/> PII Redacted</span></td>
                  <td className="p-5 text-right">
                    <motion.button whileHover={{ scale: 1.05 }} onClick={() => setView('scan-simulation')} className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-2 rounded-xl shadow-md">
                      Open Viewer
                    </motion.button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </motion.div>
  );
}

// ----------------------------------------------------
// SCAN SIMULATION (LIVE CLIMAX)
// ----------------------------------------------------
function SimulationView({ setView, walletBalance, setWalletBalance }: { setView: (v: ViewState) => void, walletBalance: number, setWalletBalance: (v: number) => void }) {
  const [report, setReport] = useState("");
  const [transmitStatus, setTransmitStatus] = useState<'idle'|'transmitting'|'success'>('idle');

  const onTransmit = () => {
    if(!report.trim()) return;
    setTransmitStatus('transmitting');
    setTimeout(() => {
      setTransmitStatus('success');
      setWalletBalance(walletBalance + 30);
    }, 2000);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="min-h-screen bg-slate-900 flex flex-col font-sans">
      <header className="bg-black border-b border-slate-800 h-14 px-6 flex items-center justify-between text-slate-300 shrink-0">
        <div className="bg-red-500/20 border border-red-500/30 text-red-500 px-3 py-1 rounded font-bold text-xs uppercase shadow-sm">Secure Terminal: KSA-Riy-MR-902</div>
        {transmitStatus !== 'success' && <button onClick={() => setView('provider-dashboard')} className="text-slate-500 font-bold hover:text-white text-sm">Abort</button>}
      </header>

      <div className="flex-1 flex overflow-hidden relative">
        
        {/* PACS VIEWER */}
        <div className="w-1/2 bg-black border-r border-slate-800 relative flex flex-col items-center justify-center">
          <div className="absolute top-6 left-6 text-emerald-500 font-black text-xs uppercase tracking-widest p-2 border border-emerald-500 bg-emerald-900/20 rounded z-10"><Lock className="w-4 h-4 inline mr-1"/> VISUAL DATA ONLY. PII STRIPPED.</div>
          <div className="w-96 h-96 rounded-full border border-slate-700/50 bg-[radial-gradient(circle_at_center,_#334155_0%,_#000000_70%)] animate-pulse flex items-center justify-center opacity-80 shadow-[0_0_50px_rgba(255,255,255,0.05)]">
             <Activity className="w-32 h-32 text-slate-400 opacity-20" />
          </div>
        </div>

        {/* REPORTING */}
        <div className="w-1/2 bg-slate-50 p-10 flex flex-col relative">
          
          <AnimatePresence>
            {transmitStatus === 'success' && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="absolute z-50 inset-0 bg-white/90 backdrop-blur-md flex items-center justify-center p-10">
                <div className="bg-white border-2 border-emerald-500 p-10 rounded-3xl shadow-2xl w-full max-w-md text-center">
                  <CheckCircle className="w-20 h-20 text-emerald-500 mx-auto mb-6" />
                  <h2 className="text-3xl font-black text-teal-950 mb-2">Transmission Success</h2>
                  <p className="text-slate-500 font-medium mb-8">FinTech Bypass Executed. Report synced to Riyadh EHR.</p>
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 mb-8 shadow-inner">
                     <p className="text-emerald-800 font-bold text-xs uppercase tracking-widest mb-2">Offshore Vault Credited</p>
                     <p className="text-4xl font-black text-emerald-600">+$30 USD</p>
                  </div>
                  <button onClick={() => setView('provider-dashboard')} className="w-full bg-teal-950 text-white font-bold py-5 rounded-xl text-lg shadow-lg hover:bg-teal-900">Return to Dashboard</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className={`flex flex-col flex-1 transition-opacity duration-500 ${transmitStatus==='success' ? 'opacity-0' : 'opacity-100'}`}>
            <h2 className="text-3xl font-extrabold text-teal-950 mb-6">Diagnostic Advisory Report</h2>
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex gap-4 mb-8 shadow-sm">
              <AlertTriangle className="w-7 h-7 text-amber-600 shrink-0" />
              <p className="text-amber-900 text-sm font-medium leading-relaxed"><strong>Legal Malpractice Shield:</strong> You are providing an asynchronous advisory opinion. Primary liability remains securely with the KSA attending physician.</p>
            </div>
            
            <textarea 
              value={report} onChange={e => setReport(e.target.value)} disabled={transmitStatus !== 'idle'}
              placeholder="Type diagnostic findings..."
              className="flex-1 bg-white border border-slate-300 rounded-2xl p-6 shadow-inner focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none text-lg leading-relaxed text-slate-800 font-medium"
            ></textarea>
            
            <button 
              onClick={onTransmit} disabled={transmitStatus !== 'idle'}
              className="mt-6 w-full bg-emerald-600 text-white py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 shadow-[0_10px_20px_rgba(5,150,105,0.2)] disabled:bg-slate-300 disabled:shadow-none disabled:text-slate-500 transition-all hover:-translate-y-1"
            >
              {transmitStatus === 'idle' && <>Transmit Report & Claim $30 Fee <ArrowRight/></>}
              {transmitStatus === 'transmitting' && "Encrypting & Transmitting..."}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
