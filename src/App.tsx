import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Stethoscope, ShieldCheck, Lock, Wallet, FileText, Activity, 
  Settings, List, ArrowRight, CheckCircle, Network, GraduationCap, 
  Sliders, AlertTriangle, Scan, Check, CheckCircle2, ChevronRight,
  LogOut, Clock, Globe, Briefcase, ChevronLeft, CreditCard,
  Building2, Maximize
} from 'lucide-react';

type ViewState = 'landing' | 'provider-login' | 'provider-dashboard' | 'scan-simulation';

const FADE_UP: any = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const STAGGER: any = {
  hidden: { opacity: 0 },
  show: { transition: { staggerChildren: 0.1 } }
};

// --- MAIN APP COMPONENT ---
export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [walletBalance, setWalletBalance] = useState(1200);

  return (
    <div className="font-sans min-h-screen text-slate-800 bg-slate-50 overflow-x-hidden selection:bg-emerald-200 selection:text-emerald-900">
      <AnimatePresence mode="wait">
        {currentView === 'landing' && (
          <LandingView key="landing" onLogin={() => setCurrentView('provider-login')} />
        )}
        {currentView === 'provider-login' && (
          <ProviderLoginView key="login" onEnter={() => setCurrentView('provider-dashboard')} />
        )}
        {currentView === 'provider-dashboard' && (
          <ProviderDashboardView 
            key="dashboard" 
            balance={walletBalance} 
            onOpenScan={() => setCurrentView('scan-simulation')} 
            onLogout={() => setCurrentView('landing')} 
          />
        )}
        {currentView === 'scan-simulation' && (
          <ScanSimulationView 
            key="scan" 
            onComplete={() => { 
              setWalletBalance(b => b + 30); 
              setCurrentView('provider-dashboard'); 
            }} 
            onCancel={() => setCurrentView('provider-dashboard')} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// --- VIEW 1: LANDING PAGE ---
const LandingView = ({ onLogin }: { onLogin: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0, filter: "blur(10px)" }}
      className="w-full flex flex-col"
    >
      {/* Sticky Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-teal-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center gap-12">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-100 p-2 rounded-xl">
              <Stethoscope className="text-emerald-600 w-6 h-6" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-teal-900">
              CareOnCall
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 flex-1">
            <a href="#" className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors border-b-2 border-transparent hover:border-emerald-600 py-2">Clinical Workflow</a>
            <a href="#" className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors border-b-2 border-transparent hover:border-emerald-600 py-2">Compliance & Legal</a>
            <a href="#" className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors border-b-2 border-transparent hover:border-emerald-600 py-2">Enterprise Pricing</a>
          </div>

          <button 
            onClick={onLogin}
            className="ml-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-[0_4px_14px_0_rgba(5,150,105,0.39)] transition-all transform hover:-translate-y-0.5"
          >
            Provider Portal
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 relative overflow-hidden bg-gradient-to-b from-teal-50/50 to-slate-50">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-emerald-100/30 rounded-l-full blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/4" />
        
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            className="flex-1 text-left"
            variants={STAGGER} initial="hidden" animate="show"
          >
            <motion.div variants={FADE_UP} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100/50 border border-emerald-200 text-emerald-800 text-sm font-bold mb-6 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Doctors as a Service (DaaS)
            </motion.div>
            
            <motion.h1 variants={FADE_UP} className="text-5xl md:text-6xl font-extrabold tracking-tight text-teal-950 mb-6 leading-[1.1]">
              Instant Specialist <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Infrastructure.</span>
            </motion.h1>
            
            <motion.p variants={FADE_UP} className="text-lg text-slate-600 mb-10 max-w-xl leading-relaxed">
              The Saudi health sector is facing a projected 15,000+ specialist deficit. Stop bleeding capital on 6-month recruitment cycles and visa delays. Seamlessly integrate board-certified Egyptian specialists directly into your hospital's EHR within 48 hours.
            </motion.p>
            
            <motion.div variants={FADE_UP} className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-[0_8px_30px_rgb(5,150,105,0.3)] transition-all hover:-translate-y-1 flex items-center justify-center gap-2">
                Integrate Today <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 bg-white border-2 border-slate-200 hover:border-emerald-200 hover:bg-emerald-50 text-teal-800 font-bold rounded-xl transition-all shadow-sm">
                Calculate Hospital ROI
              </button>
            </motion.div>
          </motion.div>

          <motion.div 
            className="flex-1 w-full relative h-[400px] flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
          >
            {/* Animated Data Bridge Graphic */}
            <div className="relative w-full max-w-md h-64 bg-white/50 backdrop-blur-xl border border-teal-100 rounded-3xl shadow-xl flex items-center p-8">
               <div className="w-full relative flex items-center justify-between">
                 {/* Connection Track */}
                 <div className="absolute left-12 right-12 h-1 bg-emerald-100 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-emerald-500 w-1/3 rounded-full"
                      animate={{ x: ["-100%", "300%"] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                 </div>
                 
                 {/* Node 1 */}
                 <div className="relative z-10 flex flex-col items-center gap-3">
                   <div className="w-20 h-20 rounded-2xl bg-white shadow-md border-2 border-emerald-100 flex items-center justify-center relative">
                     <Globe className="text-teal-700 w-10 h-10" />
                     <span className="absolute -top-2 -right-2 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white animate-pulse" />
                   </div>
                   <div className="bg-slate-800 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">Cairo Hub</div>
                 </div>

                 {/* Node 2 */}
                 <div className="relative z-10 flex flex-col items-center gap-3">
                   <div className="w-20 h-20 rounded-2xl bg-white shadow-md border-2 border-emerald-100 flex items-center justify-center relative">
                     <Building2 className="text-teal-700 w-10 h-10" />
                     <span className="absolute -top-2 -right-2 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white animate-pulse" />
                   </div>
                   <div className="bg-slate-800 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">Riyadh Hub</div>
                 </div>
               </div>
               <div className="absolute bottom-6 left-0 w-full text-center text-sm font-semibold text-emerald-600">
                 Encrypted Health Information Exchange
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Unfair Advantage Grid */}
      <section className="py-24 px-6 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-teal-950 mb-4">The Clinical Advantage</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Engineered specifically for the demands of the Gulf healthcare market, ensuring zero compromise on quality, legality, or security.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <GraduationCap className="w-8 h-8 text-emerald-600" />,
                title: "Elite Talent Pipeline",
                desc: "Exclusive institutional networks with Ain Shams & Demerdash University Hospitals. Pre-credentialed, elite medical minds ready to deploy."
              },
              {
                icon: <ShieldCheck className="w-8 h-8 text-emerald-600" />,
                title: "The Malpractice Shield",
                desc: "100% Legal Safety. Cross-border consults are structured strictly as 'Advisory Opinions'. Primary clinical liability remains fully with your on-site attending physician."
              },
              {
                icon: <Lock className="w-8 h-8 text-emerald-600" />,
                title: "Military-Grade Privacy",
                desc: "Programmatic PII-Stripping ensures zero Patient Identifiable Information crosses borders. End-to-End Encrypted and strictly aligned with HIPAA and GCC healthcare data compliance."
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                whileHover={{ y: -8, boxShadow: "0px 20px 40px rgba(4, 110, 100, 0.12)" }}
                className="bg-slate-50 border border-slate-100 p-8 rounded-3xl transition-all duration-300 flex flex-col items-start"
              >
                <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100 mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-teal-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Financial Engine */}
      <section className="py-24 px-6 relative bg-teal-950 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold mb-4 text-white">The Wealth Transformation</h2>
            <p className="text-teal-200 max-w-2xl mx-auto">Compare the devastating overhead of traditional CapEx models against our agile operational efficiency.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl border border-teal-800">
            {/* Left Col */}
            <div className="bg-slate-900 p-12 relative flex flex-col justify-center border-r border-slate-800">
              <h3 className="text-2xl font-bold text-slate-300 mb-8 border-b border-slate-700 pb-4">The Old CapEx Burden</h3>
              <ul className="space-y-6">
                {['High Agency Recruitment Fees', 'Housing & Relocation Stipends', 'Iqama & Visa Processing Delays', '3-6 Months Vacancy Wait Time', 'Idle Time Costs (Low Volume Days)'].map((t, i) => (
                  <li key={i} className="flex items-center gap-4 text-slate-400">
                    <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                    </div>
                    <span className="font-medium">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Right Col */}
            <div className="bg-gradient-to-br from-emerald-600 to-teal-700 p-12 relative flex flex-col justify-center shadow-inner">
              <div className="absolute top-0 right-0 p-8 opacity-20"><Activity className="w-32 h-32" /></div>
              <h3 className="text-2xl font-bold text-white mb-8 border-b border-emerald-400 pb-4 relative z-10">CareOnCall Variable Efficiency</h3>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 mb-8 relative z-10">
                <div className="text-5xl font-black text-white mb-2">$1,500<span className="text-xl font-normal text-teal-100">/mo</span></div>
                <div className="text-teal-100 font-medium">SaaS Integration Retainer</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 relative z-10">
                <div className="text-5xl font-black text-white mb-2">+$30</div>
                <div className="text-teal-100 font-medium">Per Asynchronous Diagnostic Read</div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-6 relative">
             <p className="text-xl font-medium text-emerald-300">Shift from fixed capital expenditure to lean, Pay-Per-Read operational efficiency today.</p>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

// --- VIEW 2: PROVIDER LOGIN ---
const ProviderLoginView = ({ onEnter }: { onEnter: () => void }) => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleAuth = () => {
    setIsAuthenticating(true);
    setTimeout(() => {
      onEnter();
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full min-h-screen bg-gradient-to-br from-teal-900 to-slate-900 flex items-center justify-center p-6 relative"
    >
      {/* Abstract Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[800px] h-[800px] bg-emerald-500/10 blur-[120px] rounded-full top-[-20%] left-[-10%]" />
        <div className="absolute w-[600px] h-[600px] bg-cyan-500/10 blur-[100px] rounded-full bottom-[-10%] right-[-10%]" />
      </div>

      <motion.div 
        initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] rounded-3xl p-8 relative z-10"
      >
        <div className="flex flex-col items-center mb-10">
          <div className="bg-emerald-500/20 p-4 rounded-full border border-emerald-300/30 mb-4 shadow-lg">
            <Lock className="w-8 h-8 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-extrabold text-white text-center">Egyptian Specialist Secure Access Terminal</h2>
          <p className="text-teal-200/70 text-sm mt-3 text-center">Authorized personnel only. End-to-End Encrypted.</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-teal-100 uppercase tracking-wider mb-2">Institutional Email</label>
            <input 
              readOnly 
              value="dr.ahmed@demerdash.edu.eg" 
              className="w-full bg-black/20 border border-white/10 text-white placeholder-slate-400 rounded-xl px-4 py-3.5 focus:outline-none focus:border-emerald-500 transition-colors font-mono text-sm shadow-inner"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-teal-100 uppercase tracking-wider mb-2">Secure Password</label>
            <input 
              readOnly 
              type="password"
              value="••••••••••••••••" 
              className="w-full bg-black/20 border border-white/10 text-white placeholder-slate-400 rounded-xl px-4 py-3.5 focus:outline-none focus:border-emerald-500 transition-colors tracking-[0.2em] shadow-inner"
            />
          </div>

          <button 
            onClick={handleAuth}
            disabled={isAuthenticating}
            className="w-full mt-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl px-4 py-4 transition-all shadow-[0_0_20px_rgba(5,150,105,0.4)] disabled:opacity-80 disabled:cursor-wait flex justify-center items-center gap-3 relative overflow-hidden"
          >
            {isAuthenticating ? (
              <>
                <motion.div 
                  animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                />
                Authenticating via Zero-Trust...
              </>
            ) : (
              "Authenticate & Enter Workspace"
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- VIEW 3: PROVIDER DASHBOARD ---
const ProviderDashboardView = ({ balance, onOpenScan, onLogout }: { balance: number, onOpenScan: () => void, onLogout: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
      className="w-full min-h-screen bg-slate-50 flex"
    >
      {/* Sidebar */}
      <div className="w-24 bg-white border-r border-teal-100 flex flex-col items-center py-8 shadow-sm z-20">
        <div className="bg-emerald-100 p-3 rounded-2xl mb-12 shadow-sm">
          <Stethoscope className="w-8 h-8 text-emerald-600" />
        </div>
        
        <div className="flex flex-col gap-8 w-full items-center flex-1">
          <button className="p-3 text-emerald-600 bg-emerald-50 rounded-xl relative group">
            <List className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <button className="p-3 text-slate-400 hover:text-teal-600 hover:bg-slate-50 rounded-xl transition-all"><CheckCircle className="w-6 h-6" /></button>
          <button className="p-3 text-slate-400 hover:text-teal-600 hover:bg-slate-50 rounded-xl transition-all"><Wallet className="w-6 h-6" /></button>
          <button className="p-3 text-slate-400 hover:text-teal-600 hover:bg-slate-50 rounded-xl transition-all"><Settings className="w-6 h-6" /></button>
        </div>

        <button onClick={onLogout} className="p-3 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all mt-auto">
          <LogOut className="w-6 h-6" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-teal-100 flex items-center justify-between px-10 shrink-0">
          <div>
            <h1 className="text-2xl font-bold text-teal-950">Welcome back, Dr. Ahmed</h1>
            <p className="text-slate-500 text-sm font-medium mt-0.5">Specialty: Complex Radiology | Demerdash Hospital</p>
          </div>
          <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-full shadow-sm">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse border border-white" />
            <span className="text-emerald-800 text-xs font-bold tracking-wide">Secure EHR Connection: Active & Encrypted</span>
          </div>
        </header>

        {/* Scrollable Area */}
        <main className="flex-1 overflow-auto p-10">
          
          {/* FinTech Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            
            <motion.div whileHover={{ y: -4 }} className="bg-white p-6 rounded-3xl border border-teal-100 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-500 font-semibold text-sm">Pending Queue</h3>
                <div className="p-2 bg-slate-50 text-slate-600 rounded-lg"><Clock className="w-5 h-5"/></div>
              </div>
              <div className="text-4xl font-extrabold text-teal-950">3 Scans</div>
              <div className="text-sm font-medium text-emerald-600 mt-2 bg-emerald-50 self-start px-2 py-1 rounded-md">Estimated value: $90 USD</div>
            </motion.div>

            <motion.div whileHover={{ y: -4 }} className="bg-white p-6 rounded-3xl border border-teal-100 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-500 font-semibold text-sm">Monthly Volume</h3>
                <div className="p-2 bg-slate-50 text-slate-600 rounded-lg"><Activity className="w-5 h-5"/></div>
              </div>
              <div className="text-4xl font-extrabold text-teal-950">40 Scans</div>
              <div className="text-sm font-medium text-teal-600 mt-2">Processed Successfully</div>
            </motion.div>

            <motion.div whileHover={{ y: -4 }} className="bg-gradient-to-br from-teal-900 to-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none"><Wallet className="w-32 h-32 text-white" /></div>
              <div>
                <h3 className="text-teal-100 font-semibold text-sm mb-2">Total offshore Earnings</h3>
                <div className="text-4xl font-black text-white flex items-center">
                  <span className="text-2xl text-emerald-400 mr-1">$</span>
                  {balance.toLocaleString()}.00 <span className="text-lg text-slate-400 ml-2 font-medium">USD</span>
                </div>
              </div>
              <button className="mt-6 w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-teal-950 font-bold rounded-xl transition-colors shadow-inner flex items-center justify-center gap-2 text-sm z-10">
                <CreditCard className="w-4 h-4" /> Withdraw to Payoneer Account
              </button>
            </motion.div>

          </div>

          {/* Patient Queue Table */}
          <div className="bg-white rounded-3xl border border-teal-100 shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-lg font-bold text-teal-950 flex items-center gap-3">
                <List className="w-5 h-5 text-emerald-600"/> The Asynchronous Patient Queue
              </h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white border-b border-slate-100 text-xs uppercase tracking-wider font-bold text-slate-400">
                    <th className="p-6">Case ID</th>
                    <th className="p-6">Pathology / Scan Type</th>
                    <th className="p-6">Compliance Status</th>
                    <th className="p-6">SLA Countdown</th>
                    <th className="p-6">Advisory Fee</th>
                    <th className="p-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {/* Demo Row */}
                  <tr className="border-b border-slate-50 hover:bg-slate-50 transition-colors group">
                    <td className="p-6 font-mono font-medium text-slate-600">KSA-Riyadh-MR-902</td>
                    <td className="p-6 font-bold text-teal-900">Complex Fetal Ultrasound</td>
                    <td className="p-6">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
                        <Lock className="w-3 h-3" /> PII Redacted (Safe)
                      </span>
                    </td>
                    <td className="p-6 font-mono font-bold text-orange-500">3h 45m remaining</td>
                    <td className="p-6 font-black text-emerald-600">$30 USD</td>
                    <td className="p-6 text-right">
                      <button 
                        onClick={onOpenScan}
                        className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-transform transform group-hover:-translate-y-0.5 shadow-md flex items-center gap-2 ml-auto"
                      >
                        <Scan className="w-4 h-4" /> Open Diagnostic Viewer
                      </button>
                    </td>
                  </tr>
                  {/* Dummy Row 2 */}
                  <tr className="border-b border-slate-50 hover:bg-slate-50 transition-colors opacity-60">
                    <td className="p-6 font-mono font-medium text-slate-500">KSA-Jeddah-CT-881</td>
                    <td className="p-6 font-bold text-slate-700">Thoracic CT Scan w/ Contrast</td>
                    <td className="p-6">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
                        <Lock className="w-3 h-3" /> PII Redacted (Safe)
                      </span>
                    </td>
                    <td className="p-6 font-mono font-medium text-slate-500">12h 10m remaining</td>
                    <td className="p-6 font-bold text-emerald-600/60">$30 USD</td>
                    <td className="p-6 text-right">
                      <button className="px-5 py-2.5 bg-slate-100 text-slate-400 font-bold rounded-lg cursor-not-allowed flex items-center gap-2 ml-auto">
                        <Lock className="w-4 h-4" /> Locked
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>
    </motion.div>
  );
};

// --- VIEW 4: SIMULATION WORKSTATION ---
const ScanSimulationView = ({ onComplete, onCancel }: { onComplete: () => void, onCancel: () => void }) => {
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleTransmit = () => {
    setIsTransmitting(true);
    setTimeout(() => {
      setIsTransmitting(false);
      setIsSuccess(true);
      // Wait for success animations and toast to be viewed
      setTimeout(() => {
        // We do not auto-close here, we let the user click "Return to Provider Dashboard"
      }, 500);
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
      className="w-full h-screen bg-slate-950 flex flex-col overflow-hidden relative"
    >
      {/* Top Bar */}
      <header className="h-14 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 shrink-0 z-20">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded bg-emerald-900 flex items-center justify-center border border-emerald-700">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          </div>
          <span className="text-slate-200 font-bold text-sm tracking-wide">
            Secure Advisory Opinion Terminal &bull; <span className="text-slate-500 font-medium">Protected by International Malpractice Shield</span>
          </span>
        </div>
        {!isSuccess && !isTransmitting && (
          <button onClick={onCancel} className="text-sm font-semibold text-slate-400 hover:text-white px-4 py-1.5 rounded-md hover:bg-slate-800 transition-colors">
            Cancel / Return
          </button>
        )}
      </header>

      {/* Split Screen Layout */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Panel: Fake PACS Viewer */}
        <div className="w-[40%] bg-black border-r border-slate-800 p-6 flex flex-col relative">
          <div className="absolute top-4 left-6 z-10 flex items-center gap-3">
             <div className="px-3 py-1.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold text-xs rounded shadow-lg flex items-center gap-2 backdrop-blur-sm">
                <Lock className="w-3 h-3" /> VISUAL DATA ONLY. PII STRIPPED FOR HIPAA.
             </div>
          </div>

          <div className="absolute top-4 right-6 z-10 flex gap-2">
            <button className="w-10 h-10 bg-slate-900 border border-slate-700 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-800"><Maximize className="w-4 h-4"/></button>
            <button className="w-10 h-10 bg-slate-900 border border-slate-700 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-800"><Sliders className="w-4 h-4"/></button>
          </div>

          {/* Mock Medical Scan Visual (Abstract CSS) */}
          <div className="flex-1 rounded-xl border border-slate-800 overflow-hidden relative flex items-center justify-center bg-gradient-to-tr from-slate-900 via-blue-950 to-slate-900 mt-12 shadow-inner">
             {/* Abstract grid to look like imaging software */}
             <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
             
             {/* Mock Sonogram/MRI Bloom */}
             <div className="w-64 h-64 rounded-full bg-emerald-900/30 blur-2xl absolute" />
             <div className="w-40 h-80 bg-blue-500/10 blur-xl transform rotate-45" />

             {/* UI Overlay artifacts */}
             <div className="absolute bottom-4 left-4 text-xs font-mono font-bold text-emerald-500/70">
                FOV: 320mm<br/>
                THK: 5.0mm<br/>
                WL: 40 WW: 350
             </div>
             <div className="absolute center flex flex-col items-center justify-center gap-4 text-slate-700">
                <Scan className="w-24 h-24 opacity-20" />
                <span className="font-bold tracking-widest uppercase opacity-20 text-sm">Fetal Morphology Series KSA-902</span>
             </div>
          </div>
        </div>

        {/* Right Panel: Reporting Engine */}
        <div className="w-[60%] bg-white p-10 flex flex-col overflow-y-auto relative z-10">
          
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-teal-950 mb-2">Submit Advisory Opinion</h1>
            <p className="text-slate-500 font-medium">To: KSA Attending Physician (Riyadh Hub)</p>
          </div>

          <div className="bg-amber-50 border border-amber-200 p-5 rounded-xl mb-8 flex gap-4 items-start shadow-sm">
            <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-amber-800 font-bold mb-1">Legal Reminder</h4>
              <p className="text-amber-700/80 text-sm leading-relaxed font-medium">
                You are providing an asynchronous advisory opinion. Final clinical liability, diagnosis, and intervention decisions remain 100% with the KSA attending physician based on local law.
              </p>
            </div>
          </div>

          <div className="flex-1 flex flex-col mb-8">
            <label className="text-sm font-bold text-teal-900 mb-3 uppercase tracking-wider">Clinical Impressions & Findings</label>
            <textarea 
              disabled={isTransmitting || isSuccess}
              className="flex-1 w-full border-2 border-slate-200 rounded-2xl p-6 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all resize-none text-slate-700 leading-relaxed font-medium shadow-inner"
              placeholder="Start typing your advisory report here... (e.g., 'No abnormalities detected in second-trimester morphology...')"
              defaultValue="Visual review of the provided fetal ultrasound series indicates normal second-trimester morphology. CRL and BPD measurements align with gestational age. No structural anomalies detected in the cardiac or neural tube structures. Recommend routine 20-week follow-up as per standard KSA protocol."
            />
          </div>

          {/* Action Area */}
          <div className="shrink-0">
            {isSuccess ? (
              <motion.button 
                initial={{ scale: 0.95 }} animate={{ scale: 1 }}
                onClick={onComplete}
                className="w-full py-5 bg-teal-950 hover:bg-teal-900 text-white font-bold rounded-2xl shadow-xl transition-all flex justify-center items-center gap-3 text-lg"
              >
                <ChevronLeft className="w-6 h-6" /> Return to Provider Dashboard
              </motion.button>
            ) : (
              <button 
                onClick={handleTransmit}
                disabled={isTransmitting}
                className="w-full py-5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl shadow-[0_10px_30px_rgb(5,150,105,0.4)] transition-all transform hover:-translate-y-1 disabled:translate-y-0 disabled:opacity-90 disabled:cursor-wait flex items-center justify-center gap-3 text-lg relative overflow-hidden group"
              >
                {isTransmitting ? (
                  <>
                    <motion.div 
                      animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="w-6 h-6 border-2 border-white/40 border-t-white rounded-full"
                    />
                    Encrypting & Transmitting to Riyadh EHR...
                  </>
                ) : (
                  <>
                    Transmit Report & Claim <span className="bg-white/20 px-2 py-0.5 rounded-md">$30 Fee</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            )}
          </div>

        </div>

      </div>

      {/* CLIMAX ANIMATIONS: Success Overlay & FinTech Toast */}
      <AnimatePresence>
        {isSuccess && (
          <>
             {/* Massive Screen-Center Success Checkmark */}
             <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               className="absolute inset-0 z-40 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center pointer-events-none"
             >
                <motion.div 
                  initial={{ scale: 0, opacity: 0, rotate: -45 }} 
                  animate={{ scale: 1, opacity: 1, rotate: 0 }} 
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="bg-white p-10 rounded-[3rem] shadow-2xl border flex flex-col items-center"
                >
                   <div className="w-32 h-32 bg-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.5)] mb-6">
                      <Check className="w-16 h-16 text-white stroke-[3]" />
                   </div>
                   <h2 className="text-3xl font-extrabold text-teal-900">Transmission Secured</h2>
                   <p className="text-slate-500 font-medium mt-2 text-center max-w-xs">Report directly integrated into the KSA Electronic Health Record.</p>
                </motion.div>
             </motion.div>

             {/* FinTech Toast Notification (Top Right) */}
             <motion.div 
               initial={{ x: 400, opacity: 0 }} 
               animate={{ x: 0, opacity: 1 }} 
               transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.5 }}
               className="absolute top-10 right-10 z-50 bg-white shadow-[0_20px_50px_-10px_rgba(0,0,0,0.3)] rounded-2xl border-l-8 border-emerald-500 p-6 flex gap-5 items-start max-w-md pointer-events-auto cursor-default"
             >
                <div className="bg-emerald-100 p-3 rounded-xl shrink-0 mt-1">
                  <Wallet className="w-8 h-8 text-emerald-600" />
                </div>
                <div>
                   <h4 className="text-lg font-bold text-teal-950 mb-1">FinTech Bypass Successful</h4>
                   <p className="text-slate-600 leading-relaxed font-medium">
                     <strong className="text-emerald-700 text-lg">$30 USD</strong> has been programmatically credited to your offshore Payoneer Wallet, bypassing local devaluation restrictions.
                   </p>
                </div>
             </motion.div>
          </>
        )}
      </AnimatePresence>

    </motion.div>
  );
};
