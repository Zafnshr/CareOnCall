import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  ShieldCheck, 
  Stethoscope, 
  Activity, 
  Network, 
  ChevronRight, 
  ArrowRight,
  Database,
  Lock,
  DollarSign,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  Users
} from 'lucide-react';

// --- MOCK DATA INJECTION ---
const MOCK_DATA = {
  gulfCrisis: [
    { metric: "15,000 - 20,000", label: "Specialist Deficit in KSA by 2030", icon: Users },
    { metric: "$125k - $150k", label: "Annual Expatriate Cost per Hire", icon: DollarSign },
    { metric: "120 - 180", label: "Days Wasted on Visa Clearances", icon: Clock },
    { metric: "$9k - $16.5k", label: "Sunk Agency Headhunting Fees", icon: Briefcase }
  ],
  egyptCrisis: [
    { metric: "89.4%", label: "Physicians Seeking Emigration", icon: ArrowRight },
    { metric: "71.4%", label: "Earning Below Basic Living Needs", icon: AlertCircle },
    { metric: "57.1%", label: "Trapped in Brutal Poly-Employment", icon: Network },
    { metric: "$125 - $170", label: "Monthly Public Salary (Senior Resident)", icon: DollarSign }
  ],
  leanCanvas: [
    {
      title: "End-to-End Encrypted EHR",
      description: "Gulf attending physicians upload anonymized DICOM scans to the CareOnCall node. All Personally Identifiable Information (PII) is automatically stripped to ensure aggressive data residency compliance.",
      icon: Database
    },
    {
      title: "Ironclad Legal Shielding",
      description: "To neutralize cross-border malpractice liability, Egyptian specialists operate strictly as external advisors. The physical Gulf attending physician retains 100% of the primary medical liability.",
      icon: ShieldCheck
    },
    {
      title: "Direct Offshore USD Payouts",
      description: "Integrated digital wallets (Payoneer) bypass local currency devaluation, ensuring premium Gulf-standard compensation reaches the Egyptian specialist predictably and securely.",
      icon: DollarSign
    },
    {
      title: "Zero-Trust HIPAA Security",
      description: "Our isolated web viewer prevents file downloads, self-destructing cached data post-session to adhere strictly to international auditing protocols.",
      icon: Lock
    }
  ],
  quotes: [
    { quote: "Pay is ridiculously low. If I’m able to work at home with Gulf salaries, that’d be amazing.", role: "Senior Radiologist, Ain Shams" },
    { quote: "Leaving my family is the biggest challenge... If I get an opportunity to leave, of course I am going to leave.", role: "Oncologist, Demerdash" },
    { quote: "I spend more time on paper than on patients. I want to earn Gulf rates without uprooting my family.", role: "Consultant Neurologist" },
    { quote: "The payment gateway cannot route through the standard Egyptian banking system. It must be direct USD.", role: "Focus Group Consensus" }
  ],
  dashboard: {
    usdBalance: "$4,250.00",
    pendingReads: [
      { id: "MRI-773-BRN", type: "Pediatric Neuro-Radiology", urgency: "STAT", time: "14 mins ago", hospital: "Jeddah Regional", fee: "$24.00" },
      { id: "CT-291-CHST", type: "Thoracic Oncology Follow-up", urgency: "Routine", time: "2 hrs ago", hospital: "Riyadh Care", fee: "$20.00" },
      { id: "PATH-002-TIS", type: "Tele-Pathology (Whole Slide)", urgency: "Routine", time: "5 hrs ago", hospital: "Dubai Specialized", fee: "$35.00" },
    ],
    activeSLAs: [
      { hospital: "Jeddah Regional", status: "100% Compliant", readsThisMonth: 142, revenue: "$3,408.00" },
      { hospital: "Riyadh Care", status: "98% Compliant", readsThisMonth: 89, revenue: "$1,780.00" }
    ]
  }
};

// --- COMPONENTS ---

const Background3D = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none perspective-[1000px]">
      <div className="absolute inset-0 bg-slate-950" />
      <div className="absolute w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950" />
      
      {/* Animated 3D Grid & Floating Nodes */}
      <motion.div 
        initial={{ rotateX: 60, scale: 2, y: 100 }}
        animate={{ rotateZ: 360 }}
        transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[200vw] border-[1px] border-cyan-900/10 rounded-full"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgwek0xOSAxOXYyaDJ2LTJoLTJ6IiBmaWxsPSJyZ2JhKDIyLCIDEwMiwgMTU1LCAwLjEpIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=')] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      </motion.div>

      {/* Floating Medical Data Blocks */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{ 
            x: Math.random() * window.innerWidth, 
            y: Math.random() * window.innerHeight,
            z: Math.random() * 200 - 100,
            opacity: 0 
          }}
          animate={{ 
            y: [null, Math.random() * -200 - 100],
            opacity: [0, 0.4, 0]
          }}
          transition={{ 
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear"
          }}
        >
          <div className="p-3 bg-cyan-950/30 backdrop-blur-md border border-cyan-500/20 rounded-xl shadow-[0_0_15px_rgba(34,211,238,0.1)]">
             {i % 3 === 0 ? <Activity className="w-6 h-6 text-cyan-400" /> : 
              i % 3 === 1 ? <Network className="w-6 h-6 text-blue-400" /> : 
              <Database className="w-6 h-6 text-slate-400" />}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const MarketingView = ({ onLogin }: { onLogin: () => void }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500/30 font-sans overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/60 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.3)]">
              <Stethoscope className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">CareOn<span className="text-cyan-400">Call</span></span>
          </div>
          <div className="flex items-center gap-6">
            <button className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200">
              Methodology
            </button>
            <button className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200">
              Clinical Scope
            </button>
            <button 
              onClick={onLogin}
              className="group relative px-6 py-2.5 text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-full overflow-hidden transition-all duration-300 border border-slate-600 hover:border-cyan-500/50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center gap-2">
                Provider Login (Demo) <Lock className="w-4 h-4" />
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 lg:pt-48 lg:pb-40 px-6">
        <Background3D />
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-950/50 border border-cyan-500/20 text-cyan-300 text-sm font-medium mb-8 backdrop-blur-md"
          >
            <Globe className="w-4 h-4" />
            B2B Cross-Border Telehealth Infrastructure
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-5xl lg:text-7xl font-bold tracking-tighter mb-8 leading-[1.1] max-w-5xl"
          >
            Bridging the Gulf Deficit.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-blue-600">
              Mobilizing Egyptian Excellence.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg lg:text-xl text-slate-400 max-w-3xl mb-12 leading-relaxed"
          >
            A secure, B2B digital infrastructure platform formally partnering with Egyptian University Hospitals to integrate pre-credentialed specialists with Gulf hospital EHRs. We deliver asynchronous diagnostic reads, eradicating Gulf recruitment costs while compensating Egyptian doctors in direct USD.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <button className="w-full sm:w-auto px-8 py-4 bg-white text-slate-950 hover:bg-slate-200 font-semibold rounded-full transition-colors duration-200">
              Partner as a Hospital
            </button>
            <button 
              onClick={onLogin}
              className="w-full sm:w-auto px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-full shadow-[0_0_30px_rgba(8,145,178,0.4)] transition-all duration-200 flex items-center justify-center gap-2"
            >
              Provider Login <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* The Crisis & The Opportunity */}
      <section className="py-32 bg-slate-900/50 border-y border-white/5 relative z-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold tracking-tight mb-4 text-white">The Macro-Economic Crisis</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">A simultaneous collapse of supply and demand that traditional market mechanics are incapable of resolving.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Gulf Collapse Card */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="p-8 lg:p-12 rounded-3xl bg-slate-950/80 border border-red-500/10 backdrop-blur-xl"
            >
              <div className="inline-flex items-center gap-2 text-red-400 font-semibold mb-6">
                <AlertCircle className="w-5 h-5" /> The Gulf Market Collapse
              </div>
              <h3 className="text-2xl font-bold mb-8 text-white">The Unbearable Weight of Recruitment</h3>
              <div className="space-y-6">
                {MOCK_DATA.gulfCrisis.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-6 p-4 rounded-2xl bg-white/5 border border-white/5">
                    <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-6 h-6 text-red-400" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white mb-1">{item.metric}</div>
                      <div className="text-sm text-slate-400 font-medium">{item.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Egypt Crisis Card */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="p-8 lg:p-12 rounded-3xl bg-slate-950/80 border border-cyan-500/10 backdrop-blur-xl"
            >
              <div className="inline-flex items-center gap-2 text-cyan-400 font-semibold mb-6">
                <Users className="w-5 h-5" /> The Egyptian Supply Crisis
              </div>
              <h3 className="text-2xl font-bold mb-8 text-white">A System on the Brink of "Brain Drain"</h3>
              <div className="space-y-6">
                {MOCK_DATA.egyptCrisis.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-6 p-4 rounded-2xl bg-white/5 border border-white/5">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white mb-1">{item.metric}</div>
                      <div className="text-sm text-slate-400 font-medium">{item.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Workflow Strategy (Lean Canvas) */}
      <section className="py-32 relative z-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl font-bold tracking-tight mb-6 text-white">The Asynchronous Routing Engine</h2>
            <p className="text-xl text-slate-400">Our validated Lean Canvas translated into a secure, hyper-efficient clinical workflow. Built exclusively for asynchronous, non-interventional diagnostics.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {MOCK_DATA.leanCanvas.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-8 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-900/50 border border-slate-800 hover:border-cyan-500/30 transition-colors group"
              >
                <div className="w-14 h-14 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center mb-6 shadow-xl group-hover:bg-cyan-950/50 transition-colors">
                  <feature.icon className="w-7 h-7 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* JTBD Quotes */}
      <section className="py-32 bg-slate-950 relative z-10 border-t border-white/5 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold tracking-tight mb-16 text-center text-white">
            Validating the Inevitable: <br/>
            <span className="text-slate-400 font-medium">The Psychology of the Provider</span>
          </h2>

          <div className="flex gap-6 overflow-x-auto pb-12 snap-x snap-mandatory scrollbar-hide">
            {MOCK_DATA.quotes.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="min-w-[320px] md:min-w-[400px] p-8 rounded-3xl bg-slate-900/80 border border-slate-800 snap-center shrink-0 flex flex-col justify-between"
              >
                <div className="mb-8">
                  <span className="text-5xl text-cyan-900 mb-4 block leading-none saturate-50">"</span>
                  <p className="text-lg text-slate-300 italic">"{item.quote}"</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                    <Stethoscope className="w-5 h-5 text-slate-400" />
                  </div>
                  <span className="font-semibold text-cyan-400 text-sm">{item.role}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer / Final CTA */}
      <footer className="py-20 bg-slate-950 border-t border-slate-900 px-6">
         <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-white">Execute the Pitch Role-Play</h2>
            <button 
              onClick={onLogin}
              className="inline-flex items-center gap-3 px-10 py-5 bg-white text-slate-950 font-bold text-lg rounded-full shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:scale-105 transition-transform duration-300"
            >
              Initiate Provider Portal Demo <ChevronRight className="w-6 h-6" />
            </button>
            <p className="mt-8 text-slate-500 text-sm max-w-xl mx-auto">
              Clicking this button triggers the live Zoom consultation role-play and bridges the marketing interface directly into the operational dashboard, seamlessly executing the Master Blueprint.
            </p>
         </div>
      </footer>
    </div>
  );
};

const PortalDashboard = ({ onLogout }: { onLogout: () => void }) => {
  return (
    <div className="min-h-screen bg-[#070B14] text-slate-200 font-sans flex overflow-hidden">
      {/* Dashboard Sidebar */}
      <aside className="w-64 border-r border-[#1E293B] bg-[#0A0F1C] flex flex-col shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-[#1E293B]">
          <div className="flex items-center gap-2">
            <Stethoscope className="text-cyan-500 w-5 h-5" />
            <span className="text-lg font-bold text-white tracking-tight">CareOnCall Provider</span>
          </div>
        </div>
        
        <div className="p-4">
          <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Main Menu</div>
          <div className="space-y-1">
            <button className="w-full flex items-center gap-3 px-3 py-2.5 bg-cyan-900/20 text-cyan-400 rounded-lg font-medium border border-cyan-800/30">
              <Activity className="w-4 h-4" /> Asynchronous Queue
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:bg-white/5 hover:text-slate-200 rounded-lg font-medium transition-colors">
              <FileText className="w-4 h-4" /> Advisory Reports
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:bg-white/5 hover:text-slate-200 rounded-lg font-medium transition-colors">
              <DollarSign className="w-4 h-4" /> Ledger & Payouts
            </button>
          </div>
        </div>

        <div className="mt-auto p-4 border-t border-[#1E293B]">
          <div className="flex items-center gap-3 px-3 py-3 rounded-lg bg-slate-900/50 border border-slate-800">
             <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
               <span className="text-xs font-bold text-slate-300">DA</span>
             </div>
             <div className="flex-1 min-w-0">
               <div className="text-sm font-semibold text-white truncate">Dr. Ahmed</div>
               <div className="text-xs text-slate-400 truncate">Ain Shams Radiology</div>
             </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full mt-3 flex items-center justify-center gap-2 text-xs text-slate-500 hover:text-white py-2"
          >
             Exit Demo Portal
          </button>
        </div>
      </aside>

      {/* Dashboard Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto bg-gradient-to-br from-[#070B14] to-[#0A0F1C]">
         <header className="h-16 flex items-center justify-between px-8 border-b border-[#1E293B] shrink-0 sticky top-0 bg-[#070B14]/80 backdrop-blur-md z-10">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-white">Operational Terminal</h1>
              <span className="px-2.5 py-1 text-xs font-semibold bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                Zero-Trust Tunnel Active
              </span>
            </div>
            <div className="flex items-center gap-4">
               <div className="px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-sm flex items-center gap-2">
                 <span className="text-slate-400">Next Payout:</span>
                 <span className="font-bold text-white">May 01</span>
               </div>
            </div>
         </header>

         <div className="p-8 max-w-7xl mx-auto w-full space-y-8">
            {/* Top Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <motion.div 
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="p-6 rounded-2xl bg-[#0F172A] border border-[#1E293B] shadow-lg relative overflow-hidden group"
               >
                 <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform">
                   <DollarSign className="w-24 h-24 text-cyan-400" />
                 </div>
                 <div className="relative z-10">
                   <div className="text-sm font-semibold text-slate-400 mb-2 flex items-center gap-2">
                     <DollarSign className="w-4 h-4 text-cyan-400" /> Current USD Balance
                   </div>
                   <div className="text-4xl font-bold text-white tracking-tight">{MOCK_DATA.dashboard.usdBalance}</div>
                   <div className="text-xs text-slate-500 mt-2 font-mono">Routing directly to Payoneer</div>
                 </div>
               </motion.div>

               <motion.div 
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.1 }}
                 className="p-6 rounded-2xl bg-[#0F172A] border border-[#1E293B] shadow-lg"
               >
                 <div className="text-sm font-semibold text-slate-400 mb-2 flex items-center gap-2">
                     <Activity className="w-4 h-4 text-blue-400" /> SLA Fulfillment
                 </div>
                 <div className="text-4xl font-bold text-white tracking-tight">100%</div>
                 <div className="text-xs text-emerald-400 mt-2 font-medium">All diagnostic reads within SLA</div>
               </motion.div>

               <motion.div 
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.2 }}
                 className="p-6 rounded-2xl bg-[#0F172A] border border-[#1E293B] shadow-lg"
               >
                 <div className="text-sm font-semibold text-slate-400 mb-2 flex items-center gap-2">
                     <FileText className="w-4 h-4 text-purple-400" /> Monthly Volume
                 </div>
                 <div className="text-4xl font-bold text-white tracking-tight">231</div>
                 <div className="text-xs text-slate-500 mt-2">Completed reads this month</div>
               </motion.div>
            </div>

            {/* Main Queue Table */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-[#0F172A] rounded-2xl border border-[#1E293B] shadow-lg overflow-hidden"
            >
              <div className="p-6 border-b border-[#1E293B] flex items-center justify-between bg-slate-900/50">
                <div>
                  <h3 className="text-lg font-bold text-white">Pending Asynchronous Queue</h3>
                  <p className="text-sm text-slate-400">Encrypted DICOM packets waiting for advisory review.</p>
                </div>
                <button className="px-4 py-2 text-sm font-semibold bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors shadow-[0_0_15px_rgba(8,145,178,0.3)]">
                  Refresh Queue
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-[#0A0F1C] text-slate-400 uppercase tracking-wider text-xs border-b border-[#1E293B]">
                    <tr>
                      <th className="px-6 py-4 font-semibold">Packet ID</th>
                      <th className="px-6 py-4 font-semibold">Diagnostic Type</th>
                      <th className="px-6 py-4 font-semibold">Origin Node</th>
                      <th className="px-6 py-4 font-semibold">Time Elapsed</th>
                      <th className="px-6 py-4 font-semibold">Yield (USD)</th>
                      <th className="px-6 py-4 font-semibold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1E293B]">
                    {MOCK_DATA.dashboard.pendingReads.map((read, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                        <td className="px-6 py-4 font-mono text-cyan-400">{read.id}</td>
                        <td className="px-6 py-4">
                          <div className="text-white font-medium">{read.type}</div>
                          {read.urgency === "STAT" && (
                            <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-bold bg-red-500/20 text-red-400 rounded border border-red-500/30">STAT PRIORITY</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-slate-300">{read.hospital}</td>
                        <td className="px-6 py-4 text-slate-400">{read.time}</td>
                        <td className="px-6 py-4 font-mono font-bold text-white">{read.fee}</td>
                        <td className="px-6 py-4 text-right">
                          <button className="px-4 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white rounded-lg transition-colors group">
                            Review DICOM <ChevronRight className="w-3 h-3 inline-block ml-1 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 border-t border-[#1E293B] bg-slate-900/30 text-center text-xs text-slate-500">
                 End of queue. All data structures conform to Saudi PDPL and HIPAA data residency requirements.
              </div>
            </motion.div>
         </div>
      </main>
    </div>
  );
};

export default function App() {
  const [currentView, setCurrentView] = useState<'marketing' | 'portal'>('marketing');

  // Ensure window starts at top when view changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  return (
    <AnimatePresence mode="wait">
      {currentView === 'marketing' ? (
        <motion.div
          key="marketing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          <MarketingView onLogin={() => setCurrentView('portal')} />
        </motion.div>
      ) : (
        <motion.div
          key="portal"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <PortalDashboard onLogout={() => setCurrentView('marketing')} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

