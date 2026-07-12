import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  MapPin, 
  Activity, 
  Terminal, 
  Cpu, 
  Database, 
  ShieldCheck, 
  Sparkles,
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Layers, 
  Layout, 
  Server,
  Zap,
  RotateCw,
  Eye,
  Settings,
  HelpCircle
} from 'lucide-react';

import tourCodingHub from '../assets/images/tour_coding_hub_1781350351313.jpg';
import tourShowroom from '../assets/images/tour_showroom_1781350368523.jpg';
import tourServerRoom from '../assets/images/tour_server_room_1781350384639.jpg';

export interface TourHotspot {
  id: string;
  top: string; // relative percentage
  left: string; // relative percentage
  title: string;
  description: string;
  iconType: 'code' | 'metric' | 'server' | 'design' | 'security' | 'database';
  actionLabel?: string;
  extraData?: { label: string; value: string }[];
}

export interface TourStop {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  narrative: string;
  image: string;
  hotspots: TourHotspot[];
  color: string;
  glowColor: string;
  badgeText: string;
}

const TOUR_STOPS: TourStop[] = [
  {
    id: 'design_hub',
    name: 'BCA Design & Code Lab',
    subtitle: 'Where Digital Concepts Come Alive',
    description: 'This is the virtual design quarters where BCA student Rupesh ideates and structures code. Standard templates are discarded here in favor of hand-crafted WebGL shaders, premium CSS, and bespoke layout engineering.',
    narrative: 'Welcome to Stop 1: Hamara Core Design & Code Lab. Yahan par advanced CSS structures, TypeScript modular logic, aur interactive animations design kiye jate hain. Check out the active hotpots to inspect our developer systems!',
    image: tourCodingHub,
    color: 'from-cyan-500 to-indigo-600',
    glowColor: 'rgba(6, 182, 212, 0.4)',
    badgeText: 'DEV_STAGE_01',
    hotspots: [
      {
        id: 'dev_terminal',
        top: '35%',
        left: '25%',
        title: 'Main Developer Terminal',
        description: 'Vite dev server running on port 3000. Features hot-module-replacement bypass for maximum rendering efficiency.',
        iconType: 'code',
        actionLabel: 'Check Terminal Specs',
        extraData: [
          { label: 'Environment', value: 'Node.js 22 (Vite + React 19)' },
          { label: 'Engine', value: 'V8 TurboFan Compilation' },
          { label: 'Live FPS', value: '120 Hz render buffer' }
        ]
      },
      {
        id: 'webgl_grid',
        top: '65%',
        left: '60%',
        title: 'Isometric Graphics Pipeline',
        description: 'Where perspective formulas (rotateX, rotateZ) are coded to create genuine 3D visual hierarchies without the payload of heavy polygon weights.',
        iconType: 'design',
        actionLabel: 'Verify Matrices',
        extraData: [
          { label: 'Formulas', value: 'rotateX(58deg) rotateZ(-45deg)' },
          { label: 'GPU Draw', value: 'Hardware accelerated CSS layers' },
          { label: 'Payload', value: 'Under 25KB footprint' }
        ]
      }
    ]
  },
  {
    id: 'showroom',
    name: 'Interactive Business Showroom',
    subtitle: 'Where 3D Meets Sales Conversion',
    description: 'Experience how prospective products are showcased. Floating glass pedestals, translucent grids, and physical tilt layers invite active user discovery, increasing time-on-site and boosting product sales.',
    narrative: 'Stop 2: Interactive Product Showroom. Traditional images ko replace karke interactive 3D panels lagaye gaye hain. Click and drag calculations aur visual highlights check karein jo users ko dynamic feedback provide karte hain.',
    image: tourShowroom,
    color: 'from-indigo-500 to-pink-500',
    glowColor: 'rgba(99, 102, 241, 0.4)',
    badgeText: 'SHOWROOM_STAGE_02',
    hotspots: [
      {
        id: 'hologram_pedestal',
        top: '40%',
        left: '52%',
        title: 'Holographic Asset Showcase',
        description: 'Visualizing digital client products in real geometry. Users can rotate, zoom, and dissect assets on hover.',
        iconType: 'design',
        actionLabel: 'Test 3D Physics',
        extraData: [
          { label: 'Tilt Range', value: '15 degrees axis offset' },
          { label: 'Interactive Delay', value: '0ms responsive transition' },
          { label: 'Hover States', value: 'Micro-shadow feedback tracking' }
        ]
      },
      {
        id: 'roi_metrics',
        top: '55%',
        left: '80%',
        title: 'Revenue Lift Tracker',
        description: 'A mathematical matrix mapping showing an instantaneous 35% average increase in customer engagement rates compared to generic websites.',
        iconType: 'metric',
        actionLabel: 'Analyze Lift Trends',
        extraData: [
          { label: 'Average Trust Lift', value: '+42% user correlation' },
          { label: 'Bounce Rate reduction', value: '-24% on primary landing' },
          { label: 'Click Through Ratio', value: '8.2% conversion spike' }
        ]
      }
    ]
  },
  {
    id: 'server_facility',
    name: 'High-Performance Render Node',
    subtitle: 'Distributed Spatial Ingress Engine',
    description: 'The computational bedrock of rupesh.com. High-density server systems render and deploy responsive full-stack pipelines instantly, proxied behind secure layers with sub-10ms delivery speeds.',
    narrative: 'Stop 3: Computational Server Room. Immersive websites load instantly because of our edge server architecture. Yahan continuous deployment nodes dynamically compile modules and stream assets securely.',
    image: tourServerRoom,
    color: 'from-pink-500 to-rose-600',
    glowColor: 'rgba(244, 63, 94, 0.4)',
    badgeText: 'SERVER_STAGE_03',
    hotspots: [
      {
        id: 'ai_copilot_node',
        top: '30%',
        left: '72%',
        title: 'Gemini 3.5 Assistant Node',
        description: 'The neural core proxying server-side client advice. Translates natural corporate queries into structural spatial strategy ideas in real-time.',
        iconType: 'server',
        actionLabel: 'Ping Core Model',
        extraData: [
          { label: 'Model Engine', value: 'Gemini 3.5 Flash Model' },
          { label: 'Avg Latency', value: '380ms response stream' },
          { label: 'Bilingual Engine', value: 'English & Hinglish support' }
        ]
      },
      {
        id: 'cloudflare_cdn',
        top: '68%',
        left: '30%',
        title: 'Edge Ingress Database Proxy',
        description: 'Distributed document architecture streaming state variables with multi-zone security verification checks.',
        iconType: 'database',
        actionLabel: 'Verify Node Ingress',
        extraData: [
          { label: 'Database Type', value: 'Secure Firestore' },
          { label: 'Access Control', value: 'Tokenized security rules' },
          { label: 'State Sync', value: 'Realtime WebSocket push' }
        ]
      }
    ]
  }
];

export default function VirtualTour() {
  const [currentStopIndex, setCurrentStopIndex] = useState(0);
  const [activeStop, setActiveStop] = useState<TourStop>(TOUR_STOPS[0]);
  const [selectedHotspot, setSelectedHotspot] = useState<TourHotspot | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isAudioMode, setIsAudioMode] = useState(true);
  const [visualizerHeight, setVisualizerHeight] = useState<number[]>(new Array(12).fill(4));
  const autoPlayTimer = useRef<NodeJS.Timeout | null>(null);
  const visualizerTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setActiveStop(TOUR_STOPS[currentStopIndex]);
    setSelectedHotspot(null);
    setProgress(0);
  }, [currentStopIndex]);

  // Handle Autoplay logic
  useEffect(() => {
    if (isAutoPlaying) {
      const interval = 100; // updates every 100ms
      const duration = 8000; // 8 seconds per stop
      const steps = duration / interval;
      let currentStep = 0;

      autoPlayTimer.current = setInterval(() => {
        currentStep++;
        const nextProgress = (currentStep / steps) * 100;
        setProgress(nextProgress);

        if (nextProgress >= 100) {
          setCurrentStopIndex((prevIndex) => (prevIndex + 1) % TOUR_STOPS.length);
        }
      }, interval);
    } else {
      if (autoPlayTimer.current) {
        clearInterval(autoPlayTimer.current);
      }
    }

    return () => {
      if (autoPlayTimer.current) {
        clearInterval(autoPlayTimer.current);
      }
    };
  }, [isAutoPlaying, currentStopIndex]);

  // Audio simulation visualizer
  useEffect(() => {
    if (isAudioMode) {
      visualizerTimer.current = setInterval(() => {
        setVisualizerHeight(prev => prev.map(() => Math.floor(Math.random() * 24) + 4));
      }, 150);
    } else {
      setVisualizerHeight(new Array(12).fill(4));
      if (visualizerTimer.current) {
        clearInterval(visualizerTimer.current);
      }
    }

    return () => {
      if (visualizerTimer.current) {
        clearInterval(visualizerTimer.current);
      }
    };
  }, [isAudioMode]);

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentStopIndex((prev) => (prev + 1) % TOUR_STOPS.length);
  };

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentStopIndex((prev) => (prev - 1 + TOUR_STOPS.length) % TOUR_STOPS.length);
  };

  const selectStop = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentStopIndex(index);
  };

  const renderHotspotIcon = (type: string) => {
    switch (type) {
      case 'code':
        return <Terminal className="w-4 h-4 text-cyan-400" />;
      case 'metric':
        return <Activity className="w-4 h-4 text-emerald-400" />;
      case 'server':
        return <Cpu className="w-4 h-4 text-pink-400" />;
      case 'design':
        return <Layout className="w-4 h-4 text-orange-400" />;
      case 'database':
        return <Database className="w-4 h-4 text-blue-400" />;
      default:
        return <Compass className="w-4 h-4 text-white" />;
    }
  };

  return (
    <div id="virtual-tour-root" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-slate-900/40 p-4 sm:p-6 rounded-3xl border border-slate-800/80 backdrop-blur-md">
      
      {/* 3D Immersive Frame / Interactive Canvas Viewer */}
      <div className="lg:col-span-8 flex flex-col justify-between min-h-[480px] bg-slate-950/80 rounded-2xl border border-slate-900 shadow-2xl relative overflow-hidden group">
        
        {/* Dynamic Scene Image with absolute overlay layers */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStop.id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.75, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.8 }}
              className="w-full h-full relative"
            >
              <img 
                src={activeStop.image} 
                alt={activeStop.name} 
                className="w-full h-full object-cover select-none [mask-image:radial-gradient(ellipse_at_center,black_75%,transparent_100%)] opacity-85"
                referrerPolicy="no-referrer"
              />
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  boxShadow: `inset 0 0 60px ${activeStop.glowColor}`,
                  background: 'linear-gradient(to top, rgba(2, 6, 23, 0.9) 0%, transparent 40%, transparent 60%, rgba(2, 6, 23, 0.4) 100%)'
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Ambient grid system & scanlines overlays */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.15)_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] pointer-events-none z-10" />
        <div className="absolute inset-0 bg-scanlines pointer-events-none opacity-[0.03] z-10" />

        {/* HEADER: Stop Identity & Diagnostic Data Overlay */}
        <div className="p-4 flex flex-wrap gap-4 justify-between items-center z-20 bg-slate-950/60 backdrop-blur-xs border-b border-slate-900/40">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl bg-gradient-to-r ${activeStop.color} p-[1px]`}>
              <div className="bg-slate-950 px-2 py-1 rounded-[11px] text-xs font-mono font-bold tracking-tight text-white flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
                <span>{activeStop.badgeText}</span>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-sans font-bold text-white tracking-wide block">
                {activeStop.name}
              </h4>
              <span className="text-[10px] text-slate-400 font-mono tracking-widest block uppercase">
                {activeStop.subtitle}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Auto Play Progress bar or control indicator */}
            {isAutoPlaying && (
              <div className="hidden sm:flex items-center gap-2 bg-slate-900/80 px-2.5 py-1 rounded-full border border-slate-800 text-[9px] font-mono text-cyan-400">
                <span className="animate-pulse">AUTO ENGINE SYNCING</span>
                <div className="w-12 h-1 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-400 transition-all duration-100" style={{ width: `${progress}%` }} />
                </div>
              </div>
            )}
            <span className="text-[10px] font-mono text-slate-500 bg-slate-900 px-3 py-1 rounded-full border border-slate-950">
              COORDINATES: STOP_0{currentStopIndex + 1}_V3D
            </span>
          </div>
        </div>

        {/* MIDDLE VIEWPORT: Interactive Hotspot Overlay System */}
        <div className="flex-1 relative z-20 min-h-[280px]">
          {/* Active Hotspots nodes mapping */}
          {activeStop.hotspots.map((hotspot) => {
            const isSelected = selectedHotspot?.id === hotspot.id;
            return (
              <div
                key={hotspot.id}
                className="absolute transition-transform duration-200"
                style={{ top: hotspot.top, left: hotspot.left }}
              >
                {/* Hotspot Pulsing trigger bead */}
                <button
                  type="button"
                  id={`hotspot-trigger-${hotspot.id}`}
                  onClick={() => setSelectedHotspot(isSelected ? null : hotspot)}
                  className="relative flex items-center justify-center p-1 group/btn"
                >
                  <span className={`absolute inline-flex h-10 w-10 rounded-full bg-gradient-to-r ${activeStop.color} opacity-40 animate-ping duration-1000`} />
                  <span className={`absolute inline-flex h-8 w-8 rounded-full bg-slate-950/90 border border-white/20 shadow-lg transform transition-all group-hover/btn:scale-110 ${
                    isSelected ? 'ring-2 ring-white border-transparent' : ''
                  }`} />
                  <div className="relative z-10 p-1 bg-transparent">
                    {renderHotspotIcon(hotspot.iconType)}
                  </div>
                </button>

                {/* Micro popup dialogue card on click/active hotspot */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.92 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-1/2 bottom-12 -translate-x-1/2 w-64 bg-slate-950/95 p-4 rounded-xl border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.6)] z-30"
                    >
                      <div className="flex justify-between items-start mb-2.5">
                        <h5 className="text-xs font-sans font-bold text-white tracking-wide">
                          {hotspot.title}
                        </h5>
                        <button 
                          onClick={() => setSelectedHotspot(null)}
                          className="text-[10px] text-slate-500 hover:text-white font-mono px-1 border border-slate-900 rounded bg-slate-900/60"
                        >
                          CLOSE
                        </button>
                      </div>

                      <p className="text-[11px] text-slate-400 font-sans leading-relaxed mb-3">
                        {hotspot.description}
                      </p>

                      {hotspot.extraData && (
                        <div className="space-y-1.5 pt-2.5 border-t border-slate-900 text-[10px]">
                          {hotspot.extraData.map((d, i) => (
                            <div key={i} className="flex justify-between font-mono">
                              <span className="text-slate-500 uppercase">{d.label}</span>
                              <span className="text-slate-200 font-medium">{d.value}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* NARRATIVE DRAWER: Audio Guided Walkthrough Overlay */}
        <div className="p-4 z-20 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent pt-12">
          <div className="bg-slate-900/80 border border-slate-800/80 p-4 rounded-xl backdrop-blur-md relative overflow-hidden shadow-2xl">
            {/* Ambient visual overlay representing wave feed */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 via-indigo-500 to-pink-500 opacity-60" />

            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              
              {/* Narration voice assistant text container */}
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-gradient-to-r from-red-500/20 to-pink-500/20 text-pink-400 font-mono font-bold px-2 py-0.5 rounded border border-pink-500/30">
                    VOICE_NARRATOR_FEED (RUPESH AI)
                  </span>
                  
                  {/* Visual simulated wave soundbar */}
                  <div className="flex items-end gap-0.5 h-4 px-1">
                    {visualizerHeight.map((h, i) => (
                      <div 
                        key={i} 
                        className="w-[2px] bg-cyan-400 rounded-lg transition-all duration-200"
                        style={{ height: `${h}px` }}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic font-sans font-medium">
                  "{activeStop.narrative}"
                </p>
              </div>

              {/* Narrator action panels (Auto walkthrough trigger, audio simulation switch) */}
              <div className="flex items-center gap-2 shrink-0 border-t md:border-t-0 border-slate-800 pt-3 md:pt-0 w-full md:w-auto justify-end">
                <button
                  onClick={() => setIsAudioMode(!isAudioMode)}
                  title={isAudioMode ? "Mute Ambient Synth Feedback" : "Unmute Ambient Synth Feedback"}
                  className={`p-2 rounded-lg border text-xs transition-colors flex items-center justify-center gap-1.5 ${
                    isAudioMode 
                      ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400' 
                      : 'bg-slate-950 text-slate-500 border-slate-900 hover:text-white'
                  }`}
                >
                  {isAudioMode ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className={`px-4 py-2 rounded-lg border text-xs font-mono font-bold tracking-wider transition-all flex items-center gap-2 ${
                    isAutoPlaying 
                      ? 'bg-rose-500 text-white border-rose-500 animate-pulse' 
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {isAutoPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5" />
                      <span>PAUSE AUTOSTAGE</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 text-cyan-400" />
                      <span>AUTO WALKTHROUGH</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* DIAGNOSTIC PANEL & TOUR NAVIGATION COMPILER */}
      <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
        
        {/* ROOM BLUEPRINT & INDEX MAP */}
        <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-900/80 flex flex-col justify-between space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-slate-500 font-mono tracking-widest block uppercase">
              VIRTUAL_BLUEPRINT_RADAR
            </span>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
              <span className="text-[9px] text-slate-400 font-mono">MAP ACTIVE</span>
            </div>
          </div>

          {/* Graphical custom room layout radar schematic */}
          <div className="h-44 bg-slate-950 rounded-xl relative border border-slate-900 overflow-hidden flex items-center justify-center">
            
            {/* Grid background on map */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:12px_12px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-indigo-500/5 pulse-sonar pointer-events-none" />

            {/* Simulated 3D Blueprint Rooms */}
            <div className="relative w-full h-full p-4 flex flex-col justify-around">
              {TOUR_STOPS.map((stop, idx) => {
                const isActive = currentStopIndex === idx;
                return (
                  <button
                    key={stop.id}
                    onClick={() => selectStop(idx)}
                    className={`w-full flex items-center justify-between p-2 rounded-lg border text-left transition-all ${
                      isActive 
                        ? 'bg-indigo-500/10 border-indigo-500/40 text-white shadow-md' 
                        : 'bg-slate-950/40 border-slate-900 text-slate-400 hover:border-slate-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-mono font-bold ${
                        isActive ? 'bg-indigo-500 text-white' : 'bg-slate-900 text-slate-500 border border-slate-800'
                      }`}>
                        0{idx + 1}
                      </div>
                      <div>
                        <span className="text-xs font-sans font-bold block">{stop.name}</span>
                        <span className="text-[9px] text-slate-500 font-mono uppercase">Room coordinate trace index {idx * 45}°</span>
                      </div>
                    </div>
                    {isActive ? (
                      <MapPin className="w-3.5 h-3.5 text-cyan-400 animate-bounce" />
                    ) : (
                      <ChevronRight className="w-3 h-3 text-slate-600" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <p className="text-[10px] text-slate-500 font-mono leading-normal">
            Radar diagnostics compile dynamic hotspots for real-time validation. Grid coordinate inputs map isometric rendering limits in modern formats.
          </p>
        </div>

        {/* NARRATOR CORE DESCRIPTION & OVERVIEW INFO CARD */}
        <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-900/80 flex-1 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-500 font-mono tracking-widest block uppercase">
                ACTIVE_STATION_TELEMETRY
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>

            <h3 className="text-xl font-bold font-sans text-white tracking-tight leading-snug">
              {activeStop.name}
            </h3>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
              {activeStop.description}
            </p>

            {/* Mini checklist items showing diagnostic state */}
            <div className="space-y-2 pt-3 border-t border-slate-900 text-[11px] font-mono">
              <div className="flex justify-between">
                <span className="text-slate-500">RENDER_LATENCY</span>
                <span className="text-cyan-400 font-semibold flex items-center gap-1">
                  <Zap className="w-3 h-3 text-cyan-400" />
                  0.18ms
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">HOTSPOTS_DETECTED</span>
                <span className="text-white font-semibold">
                  0{activeStop.hotspots.length} ACTIVE
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">ENCODING_PROTOCOL</span>
                <span className="text-indigo-400">WebGL_120FPS_OCTREE</span>
              </div>
            </div>
          </div>

          {/* ACTION CONTROLLERS - NAV BAR */}
          <div className="pt-6 mt-6 border-t border-slate-900 flex justify-between items-center">
            <span className="text-xs font-mono text-slate-500 font-medium">
              STATION_INDEX: 0{currentStopIndex + 1} / 0{TOUR_STOPS.length}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                title="Go to Previous Room"
                className="p-2 bg-slate-950 border border-slate-900 hover:border-slate-800 hover:bg-slate-900 text-slate-300 rounded-lg transition-colors flex items-center justify-center"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={handleNext}
                title="Go to Next Room"
                className="px-4 py-2 bg-slate-100 hover:bg-white text-slate-950 font-bold border border-white text-xs font-sans rounded-lg transition-all flex items-center gap-1.5"
              >
                <span>NEXT ZONE</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
