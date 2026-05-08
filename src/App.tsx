import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, ShieldCheck, Lock, CheckCircle, Wallet, FileText, 
  ArrowRight, Clock, Building, GraduationCap, PlayCircle, LogOut, 
  Search, Bell, Settings, ZoomIn, Maximize, Contrast, Download, 
  AlertTriangle, User, MapPin, Mail, Phone, ChevronRight 
} from 'lucide-react';

type ViewState = 'landing' | 'provider-login' | 'provider-dashboard' | 'scan-simulation';
type TabState = 'home' | 'vetting' | 'pricing' | 'team' | 'contact';

type AppProps = {};

export default function App(props: AppProps) {
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [activeTab, setActiveTab] = useState<TabState>('home');
  const [walletBalance, setWalletBalance] = useState(1200);

  // Scroll to top on view/tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, activeTab]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-emerald-200 selection:text-teal-900">
      <AnimatePresence mode="wait">
        {currentView === 'landing' && (
          <LandingView 
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

// ==========================================
// VIEW 1: B2B ENTERPRISE LANDING PAGE
// ==========================================
function LandingView({ 
  setView, activeTab, setActiveTab 
}: { 
  setView: (v: ViewState) => void, 
  activeTab: TabState, 
  setActiveTab: (t: TabState) => void 
}) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="flex flex-col min-h-screen bg-slate-50"
    >
      {/* STICKY NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-teal-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => setActiveTab('home')}
          >
            <div className="bg-emerald-600 p-2 rounded-lg shadow-sm">
              <Activity className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-extrabold text-teal-900 tracking-tight">CareOnCall</span>
          </div>
          
          {/* Navigation Links */}
          <div className="hidden lg:flex items-center gap-6 font-medium text-slate-600">
            {[
              { id: 'home', label: 'Home' },
              { id: 'vetting', label: 'How We Choose Doctors' },
              { id: 'pricing', label: 'Enterprise Pricing' },
              { id: 'team', label: 'Our Team' },
              { id: 'contact', label: 'Contact Us' }
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabState)}
                className={`transition-colors whitespace-nowrap px-3 py-2 rounded-lg ${
                  activeTab === tab.id 
                    ? 'text-teal-900 bg-teal-50 font-bold' 
                    : 'hover:text-emerald-600 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            onClick={() => setView('provider-login')}
            className="bg-teal-800 hover:bg-teal-900 text-white px-6 py-2.5 rounded-xl font-bold shadow-md transition-all flex items-center gap-2"
          >
            Provider Portal <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </nav>

      {/* DYNAMIC TAB CONTENT */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && <HomeTab key="home" />}
          {activeTab === 'vetting' && <VettingTab key="vetting" />}
          {activeTab === 'pricing' && <PricingTab key="pricing" />}
          {activeTab === 'team' && <TeamTab key="team" />}
          {activeTab === 'contact' && <ContactTab key="contact" />}
        </AnimatePresence>
      </main>

    </motion.div>
  );
}

// --- TAB 1: HOME ---
function HomeTab() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}
    >
      {/* HERO SECTION */}
      <section className="relative pt-24 pb-32 overflow-hidden bg-gradient-to-b from-teal-50/50 to-slate-50">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-100/40 via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-16">
          
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 font-semibold text-sm mb-6">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              Doctors as a Service (DaaS)
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold text-teal-950 leading-[1.1] mb-6 tracking-tight">
              Instant Specialist <br/>
              <span className="text-emerald-600">Infrastructure.</span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl">
              The Saudi health sector faces a projected 15,000+ specialist deficit. Integrate board-certified Egyptian specialists into your hospital's EHR within 48 hours.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-[0_8px_30px_rgb(5,150,105,0.3)] transition-all hover:-translate-y-1">
                Integrate Today
              </button>
              <button className="bg-white border-2 border-teal-800 text-teal-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-teal-50 transition-colors flex items-center gap-2">
                <PlayCircle className="w-5 h-5" /> View Demo
              </button>
            </div>
          </div>

          <div className="flex-1 w-full relative h-[450px] hidden lg:block">
            {/* Animated Data Bridge */}
            <div className="absolute inset-0 flex items-center justify-center p-8 bg-white/50 backdrop-blur-md rounded-3xl border border-teal-100 shadow-xl">
              <div className="w-full max-w-md relative">
                
                {/* Node: Riyadh */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
                  <div className="bg-white w-20 h-20 rounded-2xl shadow-lg border-2 border-slate-100 flex items-center justify-center mb-3 relative">
                    <Building className="text-teal-700 w-10 h-10" />
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
                  </div>
                  <div className="bg-teal-900 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">Riyadh Hub</div>
                </div>

                {/* Node: Cairo */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
                  <div className="bg-white w-20 h-20 rounded-2xl shadow-lg border-2 border-slate-100 flex items-center justify-center mb-3 relative">
                    <GraduationCap className="text-emerald-600 w-10 h-10" />
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
                  </div>
                  <div className="bg-teal-900 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">Cairo Hub</div>
                </div>

                {/* The Bridge & Packets */}
                <div className="absolute top-1/2 left-20 right-20 h-[2px] bg-emerald-100 -translate-y-1/2">
                   <motion.div 
                     initial={{ left: "0%", opacity: 0 }}
                     animate={{ left: "100%", opacity: [0, 1, 1, 0] }}
                     transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                     className="absolute top-1/2 -translate-y-1/2 w-16 h-1 bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981]"
                   />
                </div>
                
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* VALIDATION GRID */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-teal-950 mb-4">Primary Research Validation</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Backed by extensive dual-market surveys and validated hypotheses.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div whileHover={{ y: -5, scale: 1.02 }} className="bg-emerald-50/50 border border-emerald-100 p-8 rounded-3xl text-center">
              <div className="text-5xl font-black text-emerald-600 mb-4">85.1%</div>
              <h3 className="text-xl font-bold text-teal-900 mb-2">Retention Guarantee</h3>
              <p className="text-slate-600 text-sm">Of surveyed Egyptian physicians would stay in the country, actively curbing severe brain drain metrics.</p>
            </motion.div>

            <motion.div whileHover={{ y: -5, scale: 1.02 }} className="bg-teal-50/50 border border-teal-100 p-8 rounded-3xl text-center">
              <div className="text-5xl font-black text-teal-700 mb-4">56%</div>
              <h3 className="text-xl font-bold text-teal-900 mb-2">Brain Drain Addressed</h3>
              <p className="text-slate-600 text-sm">Direct mitigation of the specialized workforce flight out of Egypt's crucial public healthcare sector.</p>
            </motion.div>
            
            <motion.div whileHover={{ y: -5, scale: 1.02 }} className="bg-slate-50 border border-slate-200 p-8 rounded-3xl text-center">
              <div className="text-5xl font-black text-slate-700 mb-4">57.1%</div>
              <h3 className="text-xl font-bold text-teal-900 mb-2">Asynchronous Preference</h3>
              <p className="text-slate-600 text-sm">Target segment preference for flexible, asynchronous reads rather than live, disruptive on-call hours.</p>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

// --- TAB 2: HOW WE CHOOSE DOCTORS ---
function VettingTab() {
  const steps = [
    {
      title: "1. Institutional Partnerships",
      desc: "Exclusive recruitment from Ain Shams & Demerdash University Hospitals. We do not accept open market applications.",
      icon: <Building className="w-8 h-8 text-emerald-600" />
    },
    {
      title: "2. Board Certification Validation",
      desc: "Multi-step background checks and syndicate license verification ensuring premier clinical competence.",
      icon: <CheckCircle2 className="w-8 h-8 text-teal-600" />
    },
    {
      title: "3. The Malpractice Shield",
      desc: "Strict legal onboarding ensuring doctors provide 'Advisory Opinions' only, keeping primary liability with the GCC attending physician.",
      icon: <ShieldCheck className="w-8 h-8 text-emerald-600" />
    },
    {
      title: "4. Zero-Trust Security Training",
      desc: "Mandatory training on PII-Stripping and HIPAA compliance protocols before accessing the DaaS terminal.",
      icon: <Lock className="w-8 h-8 text-teal-600" />
    }
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="py-24 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-20">
        <h2 className="text-4xl font-extrabold text-teal-950 mb-4">The Talent Pipeline & Credentialing Engine</h2>
        <p className="text-lg text-slate-600">Our four-stage filter ensuring absolute clinical excellence and legal compliance.</p>
      </div>

      <div className="relative border-l-4 border-emerald-100 ml-6 md:ml-12 space-y-16">
        {steps.map((step, idx) => (
          <motion.div 
            key={idx} 
            initial={{ opacity: 0, x: -30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="relative pl-12"
          >
            {/* Timeline Circle */}
            <div className="absolute -left-[34px] top-4 bg-white border-4 border-emerald-500 w-16 h-16 rounded-full flex items-center justify-center shadow-md">
              {step.icon}
            </div>
            
            <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-teal-900 mb-3">{step.title}</h3>
              <p className="text-slate-600 text-lg leading-relaxed">{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// --- TAB 3: ENTERPRISE PRICING ---
function PricingTab() {
  const [scans, setScans] = useState<number>(300);
  const baseSaaS = 1500;
  const variableCost = scans * 30;
  const totalCost = baseSaaS + variableCost;
  const oldCapex = 25000;
  const savings = oldCapex - totalCost;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="py-24 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold text-teal-950 mb-4">The Wealth Transfer Economics</h2>
        <p className="text-lg text-slate-600">Dial in your monthly volume and visualize your immediate capital savings.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Interactive Calculator */}
        <div className="bg-white border border-slate-200 rounded-3xl p-10 shadow-lg">
          <h3 className="text-xl font-bold text-teal-900 mb-8 border-b border-slate-100 pb-4">Interactive ROI Calculator</h3>
          
          <div className="mb-10">
            <label className="flex justify-between items-center mb-4">
              <span className="font-bold text-slate-700">Monthly Diagnostic Scans</span>
              <span className="bg-emerald-100 text-emerald-800 px-4 py-1 rounded-full font-bold text-lg">{scans} Scans</span>
            </label>
            <input 
              type="range" 
              min="100" max="1000" step="10"
              value={scans}
              onChange={(e) => setScans(Number(e.target.value))}
              className="w-full appearance-none h-3 bg-slate-100 rounded-full outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-emerald-600 [&::-webkit-slider-thumb]:rounded-full cursor-pointer"
            />
            <div className="flex justify-between text-xs text-slate-400 font-bold mt-3">
              <span>100</span>
              <span>1000+</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl">
              <span className="text-slate-600 font-medium">Base SaaS Retainer</span>
              <span className="font-mono font-bold text-teal-900">${baseSaaS.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl">
              <span className="text-slate-600 font-medium">Variable Costs ({scans} × $30)</span>
              <span className="font-mono font-bold text-teal-900">${variableCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center p-6 bg-teal-900 rounded-xl text-white shadow-inner">
              <span className="text-lg font-bold text-teal-100">CareOnCall Total Invoice</span>
              <span className="text-3xl font-black">${totalCost.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Comparison Result */}
        <div className="flex flex-col gap-6">
          <motion.div whileHover={{ y: -5, scale: 1.02 }} className="bg-red-50/50 border border-red-100 rounded-3xl p-10">
            <h4 className="text-slate-500 font-bold mb-2 uppercase tracking-wide">Estimated Traditional CapEx</h4>
            <div className="text-5xl font-black text-slate-800">${oldCapex.toLocaleString()}+</div>
            <p className="text-slate-500 mt-4 text-sm font-medium">Includes agency fees, housing, idle time, and fixed salaries.</p>
          </motion.div>
          
          <motion.div whileHover={{ y: -5, scale: 1.02 }} className="bg-gradient-to-br from-emerald-500 to-teal-700 rounded-3xl p-10 shadow-xl text-white flex-1 flex flex-col justify-center">
            <h4 className="text-emerald-100 font-bold mb-2 uppercase tracking-wide">Monthly Hospital Savings</h4>
            <div className="text-6xl font-black">${savings.toLocaleString()}</div>
            <p className="text-teal-100 mt-4 text-lg font-medium border-t border-teal-600/50 pt-4">Zero recruitment fees. Immediate positive cash flow.</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// --- TAB 4: OUR TEAM ---
function TeamTab() {
  const team = [
    { name: "Kareem Amr", role: "Strategy & Operations" },
    { name: "Abdelrahman Hani", role: "Clinical Research" },
    { name: "Mohammed Hatem", role: "Provider Relations" },
    { name: "Mohab Adel", role: "Technical Infrastructure" },
    { name: "Mohammed Emad", role: "Enterprise Partnerships" }
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <h2 className="text-4xl font-extrabold text-teal-950 mb-4">The Founders Behind the Bridge</h2>
        <p className="text-lg text-slate-600">Combining clinical insight with scalable technology infrastructure.</p>
      </div>

      <div className="flex flex-wrap justify-center gap-12">
        {team.map((member, idx) => (
          <motion.div 
            key={idx} 
            whileHover={{ y: -10, scale: 1.05 }}
            className="flex flex-col items-center group w-48"
          >
            <div className="w-48 h-48 bg-slate-200 rounded-full border-4 border-emerald-500 mb-6 flex items-center justify-center shadow-lg overflow-hidden relative">
              {/* Image placeholder slot for user to plug their actual images later */}
              <User className="w-20 h-20 text-slate-400 group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-emerald-600/0 group-hover:bg-emerald-600/10 transition-colors"></div>
            </div>
            <h3 className="text-xl font-bold text-teal-950 text-center">{member.name}</h3>
            <p className="text-emerald-700 font-semibold text-center text-sm mt-1">{member.role}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// --- TAB 5: CONTACT US ---
function ContactTab() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="py-24 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold text-teal-950 mb-4">Initiate Enterprise Integration</h2>
        <p className="text-lg text-slate-600">Connect with our deployment team to outline your hospital's specialist requirements.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Left Col: Info */}
        <div className="bg-teal-900 border border-teal-800 rounded-3xl p-10 text-white shadow-xl">
          <h3 className="text-2xl font-bold mb-8">Corporate Directory</h3>
          
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <h4 className="font-bold text-lg">HQ (Demand Hub)</h4>
                <p className="text-teal-200 mt-1">King Fahd Road, Olaya District<br/>Riyadh, KSA</p>
                <p className="text-teal-200 mt-1 font-mono text-sm">+966 50 555 0192</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <Building className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <h4 className="font-bold text-lg">Operations (Supply Hub)</h4>
                <p className="text-teal-200 mt-1">The Greek Campus, Downtown<br/>Cairo, Egypt</p>
                <p className="text-teal-200 mt-1 font-mono text-sm">+20 10 222 54321</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <h4 className="font-bold text-lg">Electronic Communications</h4>
                <p className="text-teal-200 mt-1">enterprise@careoncall.io</p>
                <p className="text-teal-200 mt-1">partnerships@careoncall.io</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Form */}
        <div className="bg-white border border-slate-200 rounded-3xl p-10 shadow-lg">
          <form className="space-y-6" onSubmit={e => e.preventDefault()}>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
              <input type="text" className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-slate-50" placeholder="Dr. Abdullah Al-Faisal" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Hospital / Healthcare Facility</label>
              <input type="text" className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-slate-50" placeholder="e.g. Riyadh Central Hospital" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Corporate Email</label>
              <input type="email" className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-slate-50" placeholder="admin@domain.com" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Inquiry / Requirements</label>
              <textarea rows={4} className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none bg-slate-50" placeholder="Please specify specialties needed (e.g., Radiology, Pathology)..."></textarea>
            </div>
            <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl transition-all shadow-md mt-4">
              Submit Integration Request
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}

// ==========================================
// VIEW 2: PROVIDER SECURE LOGIN (Presentation Transition)
// ==========================================
function LoginView({ setView }: { setView: (v: ViewState) => void }) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    // Fake latency for live presentation
    setTimeout(() => {
      setView('provider-dashboard');
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center bg-teal-950 p-6 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-900 to-slate-900"></div>

      <motion.div 
        initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative z-10"
      >
        <div className="flex flex-col items-center mb-10">
          <div className="bg-emerald-500 p-4 rounded-2xl mb-6 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
            <Lock className="text-white w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white text-center tracking-wide">Egyptian Specialist <br/> Secure Access Terminal</h2>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-teal-100 text-xs uppercase tracking-wider font-bold mb-2">Institutional Email</label>
            <input 
              readOnly 
              value="dr.ahmed@demerdash.edu.eg" 
              className="w-full bg-slate-900/50 border border-teal-800 text-slate-300 rounded-xl px-4 py-4 focus:outline-none font-mono text-sm cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-teal-100 text-xs uppercase tracking-wider font-bold mb-2">Secure Password</label>
            <input 
              type="password" 
              readOnly 
              value="••••••••••••••••" 
              className="w-full bg-slate-900/50 border border-teal-800 text-slate-300 rounded-xl px-4 py-4 focus:outline-none tracking-[0.3em] cursor-not-allowed"
            />
          </div>
          <button 
            type="submit" 
            disabled={isAuthenticating}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-teal-950 font-black py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] flex justify-center items-center gap-3 mt-4 text-sm uppercase tracking-wide disabled:opacity-80 disabled:cursor-wait"
          >
            {isAuthenticating ? (
              <><Loader className="animate-spin w-5 h-5" /> Authenticating...</>
            ) : (
              <><ShieldCheck className="w-5 h-5" /> Authenticate Workspace</>
            )}
          </button>
        </form>
        
        <button onClick={() => setView('landing')} className="mt-8 text-teal-400/60 text-xs font-bold uppercase tracking-widest w-full text-center hover:text-white transition-colors">
          Return to Corporate Site
        </button>
      </motion.div>
    </motion.div>
  );
}

// Custom Loader
const Loader = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

// ==========================================
// VIEW 3: PROVIDER DASHBOARD 
// ==========================================
function DashboardView({ setView, walletBalance }: { setView: (v: ViewState) => void, walletBalance: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="min-h-screen bg-slate-50 flex"
    >
      {/* SIDEBAR */}
      <aside className="w-72 bg-teal-950 text-teal-100 flex flex-col p-6 border-r border-teal-900 shrink-0">
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-emerald-600 p-2 rounded-lg">
            <Activity className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-extrabold text-white tracking-tight">CareOnCall</span>
        </div>

        <nav className="space-y-2 flex-1">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-default bg-teal-800 text-white font-bold shadow-inner">
            <FileText className="w-5 h-5"/> Asynchronous Queue
          </div>
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-teal-400 hover:bg-teal-900 transition-colors">
            <CheckCircle className="w-5 h-5"/> Case History
          </div>
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-teal-400 hover:bg-teal-900 transition-colors">
            <Wallet className="w-5 h-5"/> FinTech Wallet
          </div>
        </nav>

        <div className="border-t border-teal-800 pt-6 mt-auto">
          <button onClick={() => setView('landing')} className="flex items-center gap-2 text-teal-400 hover:text-white text-sm font-bold transition-colors w-full p-3 rounded-xl hover:bg-teal-900">
            <LogOut className="w-4 h-4" /> Terminate Session
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* HEADER */}
        <header className="bg-white h-24 border-b border-slate-200 px-10 flex items-center justify-between shrink-0 shadow-sm">
          <div>
            <h1 className="text-2xl font-extrabold text-teal-950">Welcome, Dr. Ahmed M.</h1>
            <p className="text-slate-500 font-medium mt-1 uppercase tracking-wider text-xs">Demerdash Radiology Dept. | Board Certified ID: #EG-4412</p>
          </div>
          <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-full">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-800 font-bold text-xs uppercase tracking-wider">EHR Link Active</span>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10 bg-slate-50/50">
          
          {/* FINANCIAL STATS */}
          <div className="grid grid-cols-3 gap-6 mb-10">
            <motion.div whileHover={{ y: -5, scale: 1.02 }} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="text-slate-400 font-bold text-sm uppercase tracking-wider mb-2 flex items-center gap-2"><Clock className="w-4 h-4"/> Pending Queue</div>
              <div className="text-4xl font-black text-teal-950 mb-2">3 Scans</div>
              <div className="text-emerald-600 font-bold text-sm">Value: $90 USD</div>
            </motion.div>

            <motion.div whileHover={{ y: -5, scale: 1.02 }} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="text-slate-400 font-bold text-sm uppercase tracking-wider mb-2 flex items-center gap-2"><Activity className="w-4 h-4"/> Monthly Volume</div>
              <div className="text-4xl font-black text-teal-950 mb-2">40 Scans</div>
              <div className="text-teal-600 font-bold text-sm">Processed Successfully</div>
            </motion.div>

            <motion.div whileHover={{ y: -5, scale: 1.02 }} className="bg-gradient-to-br from-teal-900 to-slate-900 p-6 rounded-3xl border border-teal-800 shadow-xl relative overflow-hidden text-white flex flex-col justify-center">
              <div className="absolute -right-4 top-4 opacity-10"><Wallet className="w-24 h-24"/></div>
              <div className="relative z-10">
                <div className="text-teal-300 font-bold text-sm uppercase tracking-wider mb-2">Total Earnings</div>
                <div className="text-4xl font-black text-white mb-1">${walletBalance}.00 <span className="text-xl text-teal-200 font-bold">USD</span></div>
              </div>
            </motion.div>
          </div>

          {/* TABLE */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <h2 className="text-lg font-extrabold text-teal-950 flex items-center gap-2">
                <FileText className="text-teal-600 w-5 h-5" /> Incoming Remote Cases
              </h2>
            </div>
            <table className="w-full text-left">
              <thead className="bg-white border-b border-slate-100">
                <tr className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                  <th className="p-5">Case ID</th>
                  <th className="p-5">Pathology / Scan</th>
                  <th className="p-5">Compliance</th>
                  <th className="p-5">Fee</th>
                  <th className="p-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-5 font-mono font-bold text-teal-900 text-sm">KSA-Riy-MR-902</td>
                  <td className="p-5 font-bold text-slate-800">Complex Fetal Ultrasound</td>
                  <td className="p-5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold shrink-0">
                      <Lock className="w-3 h-3" /> PII Redacted
                    </span>
                  </td>
                  <td className="p-5 font-black text-emerald-600">$30 USD</td>
                  <td className="p-5 text-right">
                    <button 
                      onClick={() => setView('scan-simulation')}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2.5 rounded-xl shadow-md transition-all whitespace-nowrap"
                    >
                      Open Viewer
                    </button>
                  </td>
                </tr>
                {/* Dummy Row */}
                <tr className="hover:bg-slate-50 transition-colors opacity-50">
                  <td className="p-5 font-mono font-bold text-slate-500 text-sm">KSA-Jed-CT-104</td>
                  <td className="p-5 font-bold text-slate-600">Thoracic CT Scan</td>
                  <td className="p-5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-600 text-xs font-bold">
                      <Lock className="w-3 h-3" /> PII Redacted
                    </span>
                  </td>
                  <td className="p-5 font-bold text-slate-400">$30 USD</td>
                  <td className="p-5 text-right">
                    <button className="bg-slate-200 text-slate-500 font-bold px-5 py-2.5 rounded-xl cursor-not-allowed whitespace-nowrap">Locked</button>
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


// ==========================================
// VIEW 4: LIVE CLINICAL SIMULATION (The Climax)
// ==========================================
function SimulationView({ 
  setView, walletBalance, setWalletBalance 
}: { 
  setView: (v: ViewState) => void, walletBalance: number, setWalletBalance: (v: number) => void 
}) {
  const [report, setReport] = useState("Visual review of the provided fetal ultrasound series indicates normal second-trimester morphology. CRL and BPD measurements align with gestational age. No structural anomalies detected in the cardiac or neural tube. Recommend routine follow-up as per standard KSA protocol.");
  const [status, setStatus] = useState<'idle' | 'transmitting' | 'success'>('idle');

  const handleSubmit = () => {
    setStatus('transmitting');
    setTimeout(() => {
      setStatus('success');
      setWalletBalance(walletBalance + 30);
    }, 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
      className="min-h-screen bg-slate-950 flex flex-col font-sans"
    >
      {/* SIM HEADER */}
      <header className="h-14 bg-black border-b border-slate-800 px-6 flex items-center justify-between text-slate-300 shrink-0">
        <div className="flex items-center gap-4">
          <div className="text-emerald-400 font-mono text-xs uppercase font-bold tracking-widest border border-emerald-500/30 bg-emerald-900/30 px-3 py-1 rounded flex items-center gap-2">
            <ShieldCheck className="w-4 h-4"/> Secure Diagnostic Terminal
          </div>
          <span className="font-mono text-xs text-slate-500">SESSION_ID: x9f22-001</span>
        </div>
        {status !== 'success' && status !== 'transmitting' && (
          <button onClick={() => setView('provider-dashboard')} className="text-sm font-bold text-slate-500 hover:text-white transition-colors">Abort & Return</button>
        )}
      </header>

      {/* SPLIT SCREEN */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT: PACS VIEWER MULTIMEDIA */}
        <div className="w-1/2 bg-black border-r border-slate-800 flex flex-col relative">
          <div className="absolute top-4 left-4 z-10 bg-amber-500 text-black text-[10px] font-black uppercase px-2 py-0.5 rounded flex items-center gap-1"><Lock className="w-3 h-3"/> VISUAL DATA ONLY. PII STRIPPED.</div>
          
          <div className="flex-1 flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-900 to-black">
             {/* Fake Medical Imaging Aesthetic */}
             <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,transparent_1px)]" style={{ backgroundSize: '20px 20px'}}></div>
             <div className="w-80 h-80 rounded-full border border-slate-700/50 blur-[1px] flex items-center justify-center relative">
                 <div className="absolute inset-0 bg-slate-500/20 rounded-full animate-pulse"></div>
                 <Activity className="w-24 h-24 text-slate-400 opacity-30" />
                 <div className="absolute bottom-4 right-4 text-emerald-500 font-mono text-[10px]">WL: 35<br/>WW: 250</div>
             </div>
          </div>
        </div>

        {/* RIGHT: REPORTING TERMINAL */}
        <div className="w-1/2 bg-slate-50 p-10 flex flex-col relative overflow-y-auto">
          
          {/* SUCCESS OVERLAY */}
          <AnimatePresence>
            {status === 'success' && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="absolute inset-x-10 top-10 z-50">
                <div className="bg-white border-2 border-emerald-500 rounded-3xl p-8 shadow-2xl flex items-start gap-6">
                  <div className="bg-emerald-100 p-3 rounded-full shrink-0">
                    <CheckCircle className="w-10 h-10 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-black text-teal-950 mb-2">FinTech Bypass Successful</h3>
                    <p className="text-slate-600 font-medium mb-6">Advisory report secured and integrated into Riyadh EHR. The Malpractice Shield is active.</p>
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6">
                       <span className="block text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">Direct Offshore Credit</span>
                       <span className="text-3xl font-black text-emerald-600">+$30.00 USD</span>
                    </div>
                    <button 
                      onClick={() => setView('provider-dashboard')}
                      className="w-full bg-teal-900 hover:bg-teal-950 text-white font-bold py-4 rounded-xl shadow-lg transition-colors"
                    >
                      Return to Dashboard (Verify Wallet)
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className={`flex-1 flex flex-col transition-all duration-500 ${status === 'success' ? 'opacity-20 blur-sm pointer-events-none' : ''}`}>
            <h2 className="text-3xl font-extrabold text-teal-950 mb-2">Advisory Report Editor</h2>
            <p className="text-slate-500 font-medium mb-8">Target EHR: Riyadh Central Hospital (Dr. Khalid F.)</p>

            <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl mb-8 flex gap-3 shadow-sm">
              <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" />
              <div>
                <h4 className="text-amber-900 font-bold mb-0.5">The Malpractice Shield</h4>
                <p className="text-amber-800 text-sm font-medium">You are providing an asynchronous advisory opinion. Primary liability and final intervention decisions remain with the KSA attending physician.</p>
              </div>
            </div>

            <label className="text-sm font-bold text-teal-900 mb-2 uppercase tracking-tight">Clinical Impressions</label>
            <textarea 
               value={report}
               onChange={e => setReport(e.target.value)}
               disabled={status !== 'idle'}
               className="flex-1 w-full bg-white border border-slate-300 rounded-2xl p-6 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 resize-none text-slate-700 leading-relaxed font-medium shadow-inner"
            ></textarea>

            <button 
              onClick={handleSubmit} 
              disabled={status !== 'idle'}
              className="mt-6 w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-5 rounded-2xl shadow-[0_10px_20px_rgba(5,150,105,0.3)] transition-all flex justify-center items-center gap-3 text-lg disabled:bg-slate-300 disabled:shadow-none disabled:text-slate-500"
            >
               {status === 'idle' && <>Transmit Report & Claim $30 Fee <ArrowRight className="w-6 h-6"/></>}
               {status === 'transmitting' && <><Loader className="animate-spin" /> Encrypting & Routing to Riyadh...</>}
            </button>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
