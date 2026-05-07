import React, { useState, useEffect, useRef, useMemo, Suspense } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Globe, ShieldCheck, Stethoscope, Activity, Network, 
  ChevronRight, ArrowRight, Database, Lock, DollarSign, 
  FileText, Clock, AlertCircle, Briefcase, Users
} from 'lucide-react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Sparkles, Stars } from '@react-three/drei';
import * as THREE from 'three';

// --- MOCK DATA ---
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
      { id: "MRI-912-SPN", type: "Spinal Cord Edema", urgency: "Urgent", time: "15 mins ago", hospital: "Jeddah Regional", fee: "$28.00" },
    ]
  }
};

// --- ULTRA-REALISTIC 3D COMPONENTS ---

const EARTH_RADIUS = 2.5;

function getCoordinates(lat: number, lng: number, radius: number) {
  // standard spherical to cartesian conversion for three-globe mappings
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = (radius * Math.sin(phi) * Math.sin(theta));
  const y = (radius * Math.cos(phi));
  return new THREE.Vector3(x, y, z);
}

const ArcParticle = ({ curve, delay }: { curve: THREE.QuadraticBezierCurve3, delay: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const t = ((state.clock.elapsedTime * 0.4) + delay) % 1;
      const point = curve.getPoint(t);
      meshRef.current.position.copy(point);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.02, 16, 16]} />
      <meshBasicMaterial color="#ffffff" />
      <pointLight color="#ffffff" intensity={2} distance={0.5} />
    </mesh>
  );
};

const MedicalNetwork = ({ radius }: { radius: number }) => {
  const arcs = useMemo(() => {
    const links = [];
    const egyptLat = 26.8, egyptLng = -149.2; // Adjusted longitude for texture alignment
    const pE = getCoordinates(egyptLat, egyptLng, radius * 1.01);
    
    // Connected nodes (adjusted lng for exact visual alignment)
    const gulfPoints = [
      { lat: 24.7, lng: -133.3, name: "Riyadh" },
      { lat: 25.2, lng: -124.8, name: "Dubai" },
      { lat: 21.5, lng: -140.9, name: "Jeddah" },
      { lat: 26.2, lng: -129.5, name: "Bahrain" },
      { lat: 29.3, lng: -132.1, name: "Kuwait" },
    ];

    gulfPoints.forEach(pt => {
       const p2 = getCoordinates(pt.lat, pt.lng, radius * 1.01);
       // Arc highest point
       const mid = pE.clone().lerp(p2, 0.5).normalize().multiplyScalar(radius * 1.15);
       links.push({
          curve: new THREE.QuadraticBezierCurve3(pE, mid, p2),
          p1: pE,
          p2: p2,
          name: pt.name
       });
    });

    return links;
  }, [radius]);

  return (
    <group>
      {arcs.map((arc, i) => (
         <group key={i}>
           {/* Glowing Arc Segment */}
           <mesh>
             <tubeGeometry args={[arc.curve, 64, 0.015, 8, false]} />
             <meshBasicMaterial color="#22d3ee" transparent opacity={0.3} blending={THREE.AdditiveBlending} />
           </mesh>
           {/* Destination Node */}
           <mesh position={arc.p2}>
             <sphereGeometry args={[0.03, 16, 16]} />
             <meshBasicMaterial color="#a5f3fc" />
             <pointLight color="#22d3ee" intensity={0.5} distance={1} />
           </mesh>
           {/* Moving packet */}
           <ArcParticle curve={arc.curve} delay={i * 0.2} />
         </group>
      ))}
      {/* Origin Node (Egypt) */}
      <mesh position={arcs[0]?.p1}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
        <pointLight color="#ffffff" intensity={2} distance={2} />
      </mesh>
    </group>
  );
};

const HyperRealisticEarth = () => {
  // Using high-res textures from unpkg/three-globe for physical realism
  const [colorMap, bumpMap, specMap, emissiveMap] = useLoader(THREE.TextureLoader, [
    'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg',
    'https://unpkg.com/three-globe/example/img/earth-topology.png',
    'https://unpkg.com/three-globe/example/img/earth-water.png',
    'https://unpkg.com/three-globe/example/img/earth-night.jpg'
  ]);

  const earthGroup = useRef<THREE.Group>(null);
  
  useFrame((_, delta) => {
    if (earthGroup.current) {
      earthGroup.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <group ref={earthGroup} rotation={[0.2, -1.0, 0]}>
       {/* Main Earth Body */}
       <mesh>
         <sphereGeometry args={[EARTH_RADIUS, 64, 64]} />
         <meshStandardMaterial 
            map={colorMap}
            bumpMap={bumpMap}
            bumpScale={0.03}
            metalnessMap={specMap} // Water will reflect light intensely
            metalness={0.9}
            roughness={0.3}
            emissiveMap={emissiveMap}
            emissive={new THREE.Color('#38bdf8')}
            emissiveIntensity={0.15}
         />
       </mesh>
       
       {/* Atmospheric Glow/Scattering */}
       <mesh>
         <sphereGeometry args={[EARTH_RADIUS * 1.015, 32, 32]} />
         <meshLambertMaterial
            color="#38bdf8"
            transparent
            opacity={0.15}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
         />
       </mesh>

       {/* Medical Node Network across the region */}
       <MedicalNetwork radius={EARTH_RADIUS} />
    </group>
  );
};

const FloatingGlassPanels = () => {
  return (
    <group>
       {[
         { pos: [-4, 2, 2] as [number,number,number], rot: [0.2, 0.5, -0.1] as [number,number,number], delay: 0 },
         { pos: [5, -1, 1] as [number,number,number], rot: [-0.1, -0.4, 0.2] as [number,number,number], delay: 1 },
         { pos: [-3, -3, -1] as [number,number,number], rot: [0.5, 0.1, 0.1] as [number,number,number], delay: 2 }
       ].map((conf, i) => (
         <Float key={i} speed={2} rotationIntensity={0.5} floatIntensity={1.5} floatingRange={[-0.2, 0.2]}>
           <mesh position={conf.pos} rotation={conf.rot}>
             <boxGeometry args={[2, 1.2, 0.05]} />
             <meshStandardMaterial 
               transparent
               opacity={0.3}
               roughness={0.1}
               metalness={0.5}
               color="#bae6fd"
             />
             <lineSegments>
                <edgesGeometry args={[new THREE.BoxGeometry(2, 1.2, 0.05)]} />
                <lineBasicMaterial color="#38bdf8" transparent opacity={0.3} />
             </lineSegments>
           </mesh>
         </Float>
       ))}
    </group>
  );
};

const ViewportScene = () => {
  const { viewport } = useThree();
  const isMobile = viewport.width < 5;
  
  return (
    <group position={isMobile ? [0, 2, -2] : [2, 0, 0]}>
      <Suspense fallback={null}>
        <HyperRealisticEarth />
      </Suspense>
      <FloatingGlassPanels />
    </group>
  );
};

// --- ANIMATION VARIANTS ---
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const fadeUp: any = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const fadeSlideLeft: any = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const fadeSlideRight: any = {
  hidden: { opacity: 0, x: 50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

// --- VIEWS ---

const MarketingView = ({ onLogin }: { onLogin: () => void }) => {
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacityHero = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <div className="bg-[#020617] text-slate-100 font-sans overflow-x-hidden selection:bg-cyan-500/30">
      
      {/* Breathtaking 3D Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-90 mix-blend-screen">
        <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
          <fog attach="fog" args={['#020617', 5, 20]} />
          
          <ambientLight intensity={0.2} color="#bae6fd" />
          <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
          <pointLight position={[-10, 5, -10]} intensity={2} color="#0284c7" />
          
          <Stars radius={50} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
          
          <Environment preset="city" />

          <ViewportScene />

          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            makeDefault 
            autoRotate 
            autoRotateSpeed={0.3} 
          />
        </Canvas>
        {/* Vignette Overlay for deeper contrast */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#020617_100%)]" />
      </div>

      {/* Navbar (Glassmorphism) */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 w-full z-50 bg-[#020617]/50 backdrop-blur-2xl border-b border-white/5"
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-[0_0_20px_rgba(6,182,212,0.4)]">
              <Stethoscope className="text-white w-5 h-5 absolute z-10" />
              <div className="absolute inset-0 rounded-full border border-white/40 mix-blend-overlay"></div>
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              CareOn<span className="text-cyan-400 font-light">Call</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <span className="text-sm font-medium text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer">Methodology</span>
            <span className="text-sm font-medium text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer">Clinical Scope</span>
            <button 
              onClick={onLogin}
              className="group relative px-6 py-2.5 text-sm font-semibold text-white bg-white/5 hover:bg-white/10 rounded-full overflow-hidden transition-all duration-300 border border-white/10 hover:border-cyan-500/50 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0)] hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                Provider Login (Demo) <Lock className="w-3.5 h-3.5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
              </span>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* 1. The Hero Section (The Hook) */}
      <motion.section 
        style={{ y: yHero, opacity: opacityHero }}
        className="relative z-10 min-h-screen flex items-center pt-24 pb-32 px-6"
      >
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-950/30 border border-cyan-500/20 text-cyan-300 text-sm font-medium mb-10 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.15)]"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Active B2B Telehealth Node Framework
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-6xl lg:text-8xl font-black tracking-tighter mb-8 leading-[1.05] max-w-6xl text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-500 drop-shadow-2xl"
          >
            Bridging the Gulf Deficit. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500">
              Mobilizing Egyptian Excellence.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-2xl text-slate-400 max-w-3xl mb-14 leading-relaxed font-light"
          >
            A secure, B2B digital infrastructure platform formally partnering with Egyptian University Hospitals to integrate pre-credentialed specialists with Gulf hospital EHRs. <strong className="text-white font-medium">Eradicate Gulf recruitment costs. Compensate Egyptian doctors in direct USD.</strong>
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto"
          >
            <button className="w-full sm:w-auto px-8 py-4 bg-white text-slate-950 hover:bg-slate-200 font-bold tracking-tight rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:scale-105">
              Partner as a Hospital
            </button>
            <button 
              onClick={onLogin}
              className="w-full sm:w-auto px-8 py-4 bg-cyan-600/20 border border-cyan-500/50 hover:bg-cyan-600/30 text-white font-bold tracking-tight rounded-full backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:border-cyan-400 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 group"
            >
              Provider Login <ArrowRight className="w-5 h-5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* 2. The Crisis & The Opportunity */}
      <section className="py-40 relative z-10 px-6 border-t border-white/5 bg-gradient-to-b from-[#020617]/0 via-[#020617] to-[#020617]">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgwek0xOSAxOXYyaDJ2LTJoLTJ6IiBmaWxsPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDMpIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=')] opacity-50" />
        <div className="max-w-7xl mx-auto relative">
          <motion.div 
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-24"
          >
            <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-cyan-900/20 border border-cyan-500/20 mb-6 drop-shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <Activity className="w-8 h-8 text-cyan-400" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6 text-white drop-shadow-md">The Macro-Economic Crisis</h2>
            <p className="text-slate-400 max-w-3xl mx-auto text-xl font-light">A simultaneous collapse of supply and demand that traditional market mechanics are incapable of resolving.</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Gulf Segment */}
            <motion.div 
              initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
              variants={fadeSlideLeft}
              className="relative p-[1px] rounded-[2.5rem] bg-gradient-to-b from-red-500/30 to-slate-800/10"
            >
              <div className="absolute inset-0 bg-red-500/5 blur-3xl rounded-[3rem] -z-10" />
              <div className="h-full p-10 lg:p-14 rounded-[2.5rem] bg-[#020617]/90 backdrop-blur-2xl">
                <div className="inline-flex items-center gap-3 text-red-400 font-bold tracking-wide text-sm uppercase mb-8 bg-red-950/50 px-4 py-2 rounded-full border border-red-500/20">
                  <AlertCircle className="w-4 h-4" /> The Gulf Market Collapse
                </div>
                <h3 className="text-3xl font-bold mb-10 text-white tracking-tight">The Unbearable Weight of Recruitment</h3>
                <div className="space-y-4">
                  {MOCK_DATA.gulfCrisis.map((item, idx) => (
                    <motion.div key={idx} variants={fadeUp} className="flex items-center gap-6 p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500/20 to-orange-500/10 flex items-center justify-center shrink-0 border border-red-500/20 shadow-inner">
                        <item.icon className="w-6 h-6 text-red-400" />
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-white mb-1 tracking-tight">{item.metric}</div>
                        <div className="text-sm text-slate-400 font-medium">{item.label}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Egypt Segment */}
            <motion.div 
              initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
              variants={fadeSlideRight}
              className="relative p-[1px] rounded-[2.5rem] bg-gradient-to-b from-cyan-500/40 to-blue-800/10"
            >
              <div className="absolute inset-0 bg-cyan-500/5 blur-3xl rounded-[3rem] -z-10" />
              <div className="h-full p-10 lg:p-14 rounded-[2.5rem] bg-[#020617]/90 backdrop-blur-2xl">
                <div className="inline-flex items-center gap-3 text-cyan-400 font-bold tracking-wide text-sm uppercase mb-8 bg-cyan-950/50 px-4 py-2 rounded-full border border-cyan-500/20">
                  <Users className="w-4 h-4" /> The Egyptian Supply Crisis
                </div>
                <h3 className="text-3xl font-bold mb-10 text-white tracking-tight">A System on the Brink of "Brain Drain"</h3>
                <div className="space-y-4">
                  {MOCK_DATA.egyptCrisis.map((item, idx) => (
                    <motion.div key={idx} variants={fadeUp} className="flex items-center gap-6 p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/10 flex items-center justify-center shrink-0 border border-cyan-500/20 shadow-inner">
                        <item.icon className="w-6 h-6 text-cyan-400" />
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-white mb-1 tracking-tight">{item.metric}</div>
                        <div className="text-sm text-slate-400 font-medium">{item.label}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. The Solution / Lean Canvas */}
      <section className="py-40 relative z-10 px-6 border-t border-white/5 bg-[#040816]">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="flex justify-between items-end mb-20 flex-wrap gap-8"
          >
            <div className="max-w-3xl">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6 text-white leading-tight">The Asynchronous <br/><span className="text-cyan-400">Routing Engine</span></h2>
              <p className="text-xl text-slate-400 font-light">Our validated Lean Canvas translated into a secure, hyper-efficient clinical workflow. Built exclusively for asynchronous, non-interventional diagnostics.</p>
            </div>
            <div className="hidden lg:block text-right">
              <div className="text-6xl font-black text-white/5 flex items-center justify-end gap-4">
                <Database className="w-16 h-16" />
                <ArrowRight className="w-10 h-10" />
                <Globe className="w-16 h-16" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-8"
          >
            {MOCK_DATA.leanCanvas.map((feature, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                className="relative group p-10 rounded-[2rem] bg-gradient-to-b from-slate-800/30 to-slate-900/30 border border-slate-800 hover:border-cyan-500/40 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/0 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 border border-slate-700 flex items-center justify-center mb-8 shadow-2xl group-hover:bg-cyan-950/80 group-hover:border-cyan-500/50 transition-all duration-500">
                    <feature.icon className="w-8 h-8 text-cyan-400 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-lg">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. Trust & Evidence (JTBD & Primary Research) */}
      <section className="py-40 bg-[#020617] relative z-10 border-t border-white/5 overflow-hidden">
        {/* Glow behind quotes */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyan-900/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl font-black tracking-tight mb-20 text-center text-white"
          >
            Validating the Inevitable: <br/>
            <span className="text-slate-500 font-light italic">The Psychology of the Provider</span>
          </motion.h2>

            <motion.div 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 1, delay: 0.2 }}
               className="relative flex overflow-hidden w-full flex-nowrap mask-edges"
               style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
             >
               <div className="flex gap-8 animate-marquee pr-8 items-stretch shrink-0 hover:[animation-play-state:paused]">
                 {MOCK_DATA.quotes.map((item, idx) => (
                   <div
                     key={`q1-${idx}`}
                     className="w-[340px] md:w-[480px] p-10 rounded-[2rem] bg-slate-900/40 backdrop-blur-xl border border-slate-800 hover:border-cyan-500/30 transition-colors shrink-0 flex flex-col justify-between"
                   >
                     <div className="mb-10">
                       <span className="text-6xl text-cyan-900/50 mb-4 block leading-none saturate-[0.2] font-serif">"</span>
                       <p className="text-xl text-slate-300 font-medium leading-relaxed">"{item.quote}"</p>
                     </div>
                     <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 shadow-inner">
                         <Stethoscope className="w-6 h-6 text-cyan-500" />
                       </div>
                       <span className="font-bold text-white tracking-wide">{item.role}</span>
                     </div>
                   </div>
                 ))}
               </div>
               
               <div className="flex gap-8 animate-marquee pr-8 items-stretch shrink-0 hover:[animation-play-state:paused]" aria-hidden="true">
                 {MOCK_DATA.quotes.map((item, idx) => (
                   <div
                     key={`q2-${idx}`}
                     className="w-[340px] md:w-[480px] p-10 rounded-[2rem] bg-slate-900/40 backdrop-blur-xl border border-slate-800 hover:border-cyan-500/30 transition-colors shrink-0 flex flex-col justify-between"
                   >
                     <div className="mb-10">
                       <span className="text-6xl text-cyan-900/50 mb-4 block leading-none saturate-[0.2] font-serif">"</span>
                       <p className="text-xl text-slate-300 font-medium leading-relaxed">"{item.quote}"</p>
                     </div>
                     <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 shadow-inner">
                         <Stethoscope className="w-6 h-6 text-cyan-500" />
                       </div>
                       <span className="font-bold text-white tracking-wide">{item.role}</span>
                     </div>
                   </div>
                 ))}
               </div>
             </motion.div>
        </div>
      </section>
      
      {/* Footer / Final CTA */}
      <footer className="relative py-32 bg-[#000000] border-t border-slate-900 px-6 overflow-hidden">
         {/* Footer glowing orb */}
         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[600px] h-[300px] bg-blue-600/20 blur-[100px] rounded-[100%] pointer-events-none" />

         <motion.div 
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
           className="max-w-4xl mx-auto text-center relative z-10"
         >
            <h2 className="text-3xl md:text-5xl font-black mb-10 text-white tracking-tight">Execute the Live Pitch Role-Play</h2>
            <button 
              onClick={onLogin}
              className="group inline-flex items-center gap-4 px-12 py-6 bg-white text-slate-950 font-black text-xl rounded-full shadow-[0_0_50px_rgba(255,255,255,0.15)] hover:shadow-[0_0_80px_rgba(255,255,255,0.3)] hover:scale-105 transition-all duration-500"
            >
              Initiate Provider Portal Demo 
              <span className="w-10 h-10 rounded-full bg-slate-950 flex items-center justify-center group-hover:bg-cyan-500 transition-colors">
                <ChevronRight className="w-6 h-6 text-white" />
              </span>
            </button>
            <p className="mt-10 text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
              Clicking this button triggers the live Zoom consultation role-play and bridges the marketing interface directly into the operational dashboard. Seamlessly fulfilling the Master Blueprint.
            </p>
         </motion.div>
      </footer>
    </div>
  );
};

// --- PORTAL DASHBOARD (SIMULATED SECURE ZONE) ---

const PortalDashboard = ({ onLogout }: { onLogout: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen bg-[#060910] text-slate-200 font-sans flex overflow-hidden selection:bg-cyan-500/30"
    >
      {/* Dashboard Sidebar */}
      <aside className="w-72 border-r border-white/5 bg-[#0a0e17]/80 backdrop-blur-2xl flex flex-col shrink-0 relative z-20">
        <div className="h-20 flex items-center px-8 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Stethoscope className="text-cyan-400 w-6 h-6" />
              <div className="absolute top-0 right-0 w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">CareOn<span className="text-cyan-400 font-light">Call</span></span>
          </div>
        </div>
        
        <div className="p-6">
          <div className="px-4 py-2 text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Operations</div>
          <div className="space-y-2">
            <button className="w-full flex items-center gap-4 px-4 py-3.5 bg-gradient-to-r from-cyan-900/40 to-transparent text-cyan-300 rounded-xl font-semibold border border-cyan-800/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
              <Activity className="w-5 h-5" /> Asynchronous Queue
            </button>
            <button className="w-full flex items-center gap-4 px-4 py-3.5 text-slate-400 hover:bg-white/5 hover:text-white rounded-xl font-medium transition-colors">
              <FileText className="w-5 h-5" /> Advisory Reports
            </button>
            <button className="w-full flex items-center gap-4 px-4 py-3.5 text-slate-400 hover:bg-white/5 hover:text-white rounded-xl font-medium transition-colors">
              <DollarSign className="w-5 h-5" /> Ledger & Payouts
            </button>
          </div>
        </div>

        <div className="mt-auto p-6 border-t border-white/5 bg-[#080b12]">
          <div className="flex items-center gap-4 px-4 py-4 rounded-2xl bg-white/5 border border-white/10 shadow-inner">
             <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center p-[2px]">
               <div className="w-full h-full bg-[#0a0e17] rounded-full flex items-center justify-center">
                 <span className="text-sm font-bold text-white">DA</span>
               </div>
             </div>
             <div className="flex-1 min-w-0">
               <div className="text-sm font-bold text-white truncate">Dr. Ahmed</div>
               <div className="text-xs text-cyan-400 font-medium truncate">Ain Shams Radiology</div>
             </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-slate-400 hover:text-white hover:bg-white/5 py-3 rounded-xl transition-colors border border-transparent hover:border-white/10"
          >
             Secure Sign Out
          </button>
        </div>
      </aside>

      {/* Dashboard Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#0a0e17] via-[#060910] to-[#04060a]">
         <header className="h-20 flex items-center justify-between px-10 border-b border-white/5 shrink-0 sticky top-0 bg-[#060910]/80 backdrop-blur-xl z-10">
            <div className="flex items-center gap-6">
              <h1 className="text-2xl font-bold text-white tracking-tight">Active Terminal</h1>
              <div className="px-4 py-1.5 text-xs font-bold bg-emerald-950/40 text-emerald-400 rounded-full border border-emerald-500/20 flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                <span className="w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_5px_rgba(16,185,129,0.8)]" />
                ZERO-TRUST SECURE
              </div>
            </div>
            <div className="flex items-center gap-4">
               <div className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm flex items-center gap-3 backdrop-blur-md">
                 <span className="text-slate-400 font-medium tracking-wide">NEXT PAYOUT:</span>
                 <span className="font-bold text-white uppercase">May 01</span>
               </div>
            </div>
         </header>

         <div className="p-10 max-w-7xl mx-auto w-full space-y-10">
            {/* Top Metrics Row */}
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
               <motion.div 
                 variants={fadeUp}
                 className="p-8 rounded-[2rem] bg-gradient-to-br from-slate-800/40 to-[#0a0e17] border border-white/10 shadow-2xl relative overflow-hidden group"
               >
                 <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-700">
                   <DollarSign className="w-32 h-32 text-cyan-400" />
                 </div>
                 <div className="relative z-10">
                   <div className="text-sm font-bold tracking-widest text-slate-400 uppercase mb-4 flex items-center gap-3">
                     <DollarSign className="w-5 h-5 text-cyan-400" /> Current Payout
                   </div>
                   <div className="text-5xl font-black text-white tracking-tighter mb-2 drop-shadow-md">{MOCK_DATA.dashboard.usdBalance}</div>
                   <div className="text-sm text-cyan-500/80 font-medium inline-flex items-center gap-2 bg-cyan-950/30 px-3 py-1 rounded-md border border-cyan-500/20">
                      <Lock className="w-3 h-3" /> Routing to Offshore Payoneer
                   </div>
                 </div>
               </motion.div>

               <motion.div 
                 variants={fadeUp}
                 className="p-8 rounded-[2rem] bg-[#0a0e17]/80 backdrop-blur-xl border border-white/10 shadow-xl"
               >
                 <div className="text-sm font-bold tracking-widest text-slate-400 uppercase mb-4 flex items-center gap-3">
                     <Activity className="w-5 h-5 text-emerald-400" /> SLA Fulfillment
                 </div>
                 <div className="text-5xl font-black text-white tracking-tighter mb-2">100%</div>
                 <div className="text-sm text-emerald-400 font-medium mt-3">All reads within 60m strict SLA</div>
               </motion.div>

               <motion.div 
                 variants={fadeUp}
                 className="p-8 rounded-[2rem] bg-[#0a0e17]/80 backdrop-blur-xl border border-white/10 shadow-xl"
               >
                 <div className="text-sm font-bold tracking-widest text-slate-400 uppercase mb-4 flex items-center gap-3">
                     <FileText className="w-5 h-5 text-purple-400" /> Monthly Volume
                 </div>
                 <div className="text-5xl font-black text-white tracking-tighter mb-2">231</div>
                 <div className="text-sm text-slate-400 font-medium mt-3">Completed advisory reports</div>
               </motion.div>
            </motion.div>

            {/* Main Queue Table */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#0a0e17]/90 backdrop-blur-3xl rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight mb-2">Inbound DICOM Queue</h3>
                  <p className="text-slate-400">Encrypted, anonymized datasets awaiting your sub-specialized review.</p>
                </div>
                <button className="px-6 py-3 text-sm font-bold tracking-wide bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl transition-all shadow-[0_0_20px_rgba(8,145,178,0.4)] hover:shadow-[0_0_30px_rgba(8,145,178,0.6)]">
                  Refresh Tunnel
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-black/20 text-slate-400 uppercase tracking-widest text-xs font-bold border-b border-white/5">
                    <tr>
                      <th className="px-8 py-5">Hash ID</th>
                      <th className="px-8 py-5">Scan Type</th>
                      <th className="px-8 py-5">Originating Payer</th>
                      <th className="px-8 py-5">Aged</th>
                      <th className="px-8 py-5">Yield (USD)</th>
                      <th className="px-8 py-5 text-right">Action Gate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {MOCK_DATA.dashboard.pendingReads.map((read, idx) => (
                      <motion.tr 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + idx * 0.1, duration: 0.5 }}
                        key={idx} 
                        className="hover:bg-cyan-900/10 transition-colors group cursor-pointer"
                      >
                        <td className="px-8 py-6 font-mono text-cyan-400 font-semibold">{read.id}</td>
                        <td className="px-8 py-6">
                          <div className="text-white font-bold tracking-wide mb-1.5">{read.type}</div>
                          {read.urgency === "STAT" ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-black bg-red-500/20 text-red-400 rounded-md border border-red-500/30 tracking-widest">
                              <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-ping" />
                              STAT
                            </span>
                          ) : read.urgency === "Urgent" ? (
                             <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-black bg-orange-500/20 text-orange-400 rounded-md border border-orange-500/30 tracking-widest">
                               URGENT
                             </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold bg-slate-800 text-slate-400 rounded-md border border-slate-700 tracking-widest">
                               ROUTINE
                            </span>
                          )}
                        </td>
                        <td className="px-8 py-6 text-slate-300 font-medium">{read.hospital}</td>
                        <td className="px-8 py-6 text-slate-400 font-mono">{read.time}</td>
                        <td className="px-8 py-6 font-mono font-black text-emerald-400 text-base">{read.fee}</td>
                        <td className="px-8 py-6 text-right">
                          <button className="px-6 py-2.5 text-xs font-bold tracking-widest bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl transition-all group-hover:border-cyan-500/50 group-hover:bg-cyan-900/40">
                            VIEW DICOM <ChevronRight className="w-4 h-4 inline-block ml-1 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-5 border-t border-white/5 bg-black/40 text-center text-xs font-medium tracking-wide text-slate-500">
                 End of active queue. Framework certified compliant with Saudi PDPL & cross-border HIPAA standards.
              </div>
            </motion.div>
         </div>
      </main>
    </motion.div>
  );
};

export default function App() {
  const [currentView, setCurrentView] = useState<'marketing' | 'portal'>('marketing');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  return (
    <AnimatePresence mode="wait">
      {currentView === 'marketing' ? (
        <motion.div key="marketing" className="w-full h-full">
          <MarketingView onLogin={() => setCurrentView('portal')} />
        </motion.div>
      ) : (
        <motion.div key="portal" className="w-full h-full">
          <PortalDashboard onLogout={() => setCurrentView('marketing')} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
