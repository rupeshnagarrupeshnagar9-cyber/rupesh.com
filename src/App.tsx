/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import IsometricStack from './components/IsometricStack';
import PerspectiveCard from './components/PerspectiveCard';
import RoiCalculator from './components/RoiCalculator';
import VirtualTour from './components/VirtualTour';
import { ChatMessage } from './types';
import { 
  Sparkles, 
  Send, 
  Layers, 
  Box, 
  Cpu, 
  TrendingUp, 
  MessageSquare, 
  Terminal, 
  HelpCircle, 
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Briefcase,
  ExternalLink,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

export default function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      text: "Namaste! Main Rupesh AI Co-Pilot hoon, aapka interactive 3D business architect. rupesh.com ke design frameworks aur immersive system aapki website ko full-scale conversion powerhouse kaise banayenge? Kuch bhi puchiye!",
      role: 'model',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'interactive' | 'roi' | 'copilot' | 'tour'>('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Suggested questions in Hinglish/Hindi based on user preferences
  const suggestions = [
    "3D elements conversion rate kaise badhate hain?",
    "What services does rupesh.com offer?",
    "3D web components mobile devices par fast load honge?"
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputText;
    if (!textToSend.trim() || loading) return;

    if (!customText) {
      setInputText('');
    }

    const newUserMessage: ChatMessage = {
      id: Math.random().toString(),
      text: textToSend,
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setLoading(true);

    try {
      const response = await fetch('/api/consultant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: textToSend,
          history: messages.map(m => ({ role: m.role, text: m.text }))
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch response");
      }

      const modelMessage: ChatMessage = {
        id: Math.random().toString(),
        text: data.text,
        role: 'model',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, modelMessage]);
    } catch (err: any) {
      console.error(err);
      setMessages(prev => [...prev, {
        id: Math.random().toString(),
        text: `⚠️ Error: ${err.message || 'Kuch error aayi hai. Kripya check karein ki virtual server active hai aur Google Gemini API key properly configured hai.'}`,
        role: 'model',
        timestamp: new Date()
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="app-root-container" className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950 overflow-x-hidden antialiased">
      {/* Immersive radial glow backing lights */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[25%] right-10 w-[600px] h-[500px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-5 w-[400px] h-[400px] bg-pink-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Header Navigation */}
      <header id="main-header" className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-400 via-indigo-500 to-pink-500 p-[1px]">
              <div id="company-logo-inner" className="w-full h-full rounded-xl bg-slate-950 flex items-center justify-center">
                <Box className="w-5 h-5 text-cyan-400 animate-spin-slow" />
              </div>
            </div>
            <div>
              <span className="text-sm font-bold tracking-tight text-white block font-sans">
                rupesh.com
              </span>
              <span className="text-[9px] text-cyan-400 tracking-widest font-mono uppercase block">
                Immersive Business Solutions
              </span>
            </div>
          </div>

          {/* Desktop Nav Actions */}
          <nav id="desktop-nav" className="hidden md:flex items-center gap-1">
            <button 
              onClick={() => { setActiveTab('all'); document.getElementById('interactive-section')?.scrollIntoView({ behavior: 'smooth' }); }}
              className={`px-3 py-1.5 text-xs font-sans tracking-wide rounded-lg transition-colors ${activeTab === 'all' ? 'text-cyan-400 bg-cyan-500/10' : 'text-slate-400 hover:text-white'}`}
            >
              Overview
            </button>
            <button 
              onClick={() => { setActiveTab('tour'); document.getElementById('tour-section')?.scrollIntoView({ behavior: 'smooth' }); }}
              className={`px-3 py-1.5 text-xs font-sans tracking-wide rounded-lg transition-colors ${activeTab === 'tour' ? 'text-amber-400 bg-amber-500/10' : 'text-slate-400 hover:text-white'}`}
            >
              Virtual Tour
            </button>
            <button 
              onClick={() => { setActiveTab('interactive'); document.getElementById('interactive-section')?.scrollIntoView({ behavior: 'smooth' }); }}
              className={`px-3 py-1.5 text-xs font-sans tracking-wide rounded-lg transition-colors ${activeTab === 'interactive' ? 'text-indigo-400 bg-indigo-500/10' : 'text-slate-400 hover:text-white'}`}
            >
              Interactive Stack
            </button>
            <button 
              onClick={() => { setActiveTab('roi'); document.getElementById('roi-section')?.scrollIntoView({ behavior: 'smooth' }); }}
              className={`px-3 py-1.5 text-xs font-sans tracking-wide rounded-lg transition-colors ${activeTab === 'roi' ? 'text-emerald-400 bg-emerald-500/10' : 'text-slate-400 hover:text-white'}`}
            >
              ROI Calculator
            </button>
            <button 
              onClick={() => { setActiveTab('copilot'); document.getElementById('generator-section')?.scrollIntoView({ behavior: 'smooth' }); }}
              className={`px-3 py-1.5 text-xs font-sans tracking-wide rounded-lg transition-colors ${activeTab === 'copilot' ? 'text-pink-400 bg-pink-500/10' : 'text-slate-400 hover:text-white'}`}
            >
              AI Consultant
            </button>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button 
              onClick={() => document.getElementById('generator-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-4 py-1.5 rounded-lg text-xs font-mono tracking-wider font-bold bg-gradient-to-r from-cyan-400 to-indigo-500 text-slate-950 hover:opacity-90 transition-opacity"
            >
              CONNECT LIVE
            </button>
          </div>

          {/* Mobile menu trigger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden text-slate-400 hover:text-white p-1"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu panel */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-950 border-b border-slate-900 py-4 px-6 flex flex-col gap-3">
            <button 
              onClick={() => { setMobileMenuOpen(false); setActiveTab('all'); document.getElementById('interactive-section')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="text-left py-2 text-sm text-slate-300 hover:text-cyan-400"
            >
              Overview
            </button>
            <button 
              onClick={() => { setMobileMenuOpen(false); setActiveTab('tour'); document.getElementById('tour-section')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="text-left py-2 text-sm text-slate-300 hover:text-amber-400"
            >
              Virtual Tour Rooms
            </button>
            <button 
              onClick={() => { setMobileMenuOpen(false); setActiveTab('interactive'); document.getElementById('interactive-section')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="text-left py-2 text-sm text-slate-300 hover:text-indigo-400"
            >
              3D Architecture Layer
            </button>
            <button 
              onClick={() => { setMobileMenuOpen(false); setActiveTab('roi'); document.getElementById('roi-section')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="text-left py-2 text-sm text-slate-300 hover:text-emerald-400"
            >
              ROI & Conversion Analytics
            </button>
            <button 
              onClick={() => { setMobileMenuOpen(false); setActiveTab('copilot'); document.getElementById('generator-section')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="text-left py-2 text-sm text-slate-300 hover:text-pink-400"
            >
              AI Co-Pilot Advisor
            </button>
          </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-20 relative">
        
        {/* SECTION 1: Immersive Hero Area with 3D perspective shield */}
        <section id="hero-section" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1 rounded-full text-xs text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>rupesh.com Core Engine Terminal Active</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[Georgia] text-left border-white text-white tracking-tight leading-none">
              Welcome to My <span className="text-transparent bg-gradient-to-r from-cyan-400 via-indigo-400 to-pink-500 bg-clip-text">Technical World</span>.
            </h1>

            <p className="text-base sm:text-lg text-white bg-[#231942] border border-[#ddc8c8] p-4 rounded-xl font-bold no-underline italic font-['Times_New_Roman'] leading-relaxed max-w-2xl">
              <strong className="text-white font-semibold">Rupesh</strong> is a BCA student, web developer, and content creator passionate about technology, programming, and digital innovation. He enjoys building modern websites, learning new skills, and creating engaging digital experiences while continuously growing as a future software professional. 🚀
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button 
                onClick={() => document.getElementById('generator-section')?.scrollIntoView({ behavior: 'smooth' })}
                id="cta-ai-consultant"
                className="px-6 py-3 rounded-xl bg-slate-100 text-slate-950 font-bold hover:bg-white transition-all duration-200 flex items-center justify-center gap-2 group shadow-[0_4px_20px_rgba(255,255,255,0.08)]"
              >
                <span>Chat with AI Co-Pilot</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button 
                onClick={() => document.getElementById('interactive-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3 rounded-xl bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700 transition-colors flex items-center justify-center gap-2"
              >
                <span>Dissect 3D Stack</span>
                <Layers className="w-4 h-4 text-cyan-400" />
              </button>
            </div>

            {/* Quick stats board */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-900">
              <div>
                <span className="text-2xl sm:text-3xl font-black font-mono text-white">120+</span>
                <span className="block text-[11px] font-mono text-slate-500 uppercase mt-1">Render FPS Limit</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black font-mono text-cyan-400">35%</span>
                <span className="block text-[11px] font-mono text-slate-500 uppercase mt-1">Conversion Lift</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black font-mono text-pink-500">10ms</span>
                <span className="block text-[11px] font-mono text-slate-500 uppercase mt-1">Spatial Delivery</span>
              </div>
            </div>
          </div>

          {/* Perspective Featured Grid */}
          <div className="lg:col-span-5 flex justify-center items-center relative min-h-[380px]">
            {/* Visual Backdrops of perspective grid */}
            <div className="absolute inset-0 bg-slate-900/30 rounded-3xl border border-slate-800/50 [mask-image:radial-gradient(ellipse_at_center,white_80%,transparent_100%)] pointer-events-none" />
            
            {/* Immersive perspective preview display card */}
            <PerspectiveCard 
              className="w-full max-w-sm bg-gradient-to-tr from-slate-950 to-slate-900 p-6 rounded-2xl border border-slate-800/80 shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-default"
              glowColor="rgba(6, 182, 212, 0.2)"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="bg-cyan-500/10 border border-cyan-500/20 p-2.5 rounded-xl text-cyan-400">
                  <Box className="w-5 h-5 animate-pulse" />
                </div>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/20">
                  3D_SPATIAL_GATEWAY
                </span>
              </div>

              <h3 className="text-xl font-bold font-sans text-white tracking-tight mb-2">
                Core Dynamic Module
              </h3>
              
              <p className="text-xs text-slate-400 leading-relaxed mb-6 font-mono">
                Hover, tilt, aur perspective rotate karke dynamic highlights dynamic live feedback trace karein. Perfect GPU optimization mapping.
              </p>

              {/* Status board */}
              <div className="space-y-3 pt-4 border-t border-slate-900">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 font-mono">RENDER_QUALITY</span>
                  <span className="text-white font-mono font-medium">ULTRA_SPATIAL</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 font-mono">GPU_SATURATION</span>
                  <span className="text-emerald-400 font-mono font-medium">92% PERFORMANCE</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 font-mono">FRAME_BUFFER</span>
                  <span className="text-white font-mono font-medium">TRIPLE_BUFFERED</span>
                </div>
              </div>
            </PerspectiveCard>
          </div>
        </section>

        {/* SECTION 2: Bento Perspective Cards Features */}
        <section id="features-section" className="space-y-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-mono font-semibold text-cyan-400 tracking-widest block uppercase mb-2">
              Product Capabilities
            </span>
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Agle Generation Ki features jo badhayengi aapke leads
            </h2>
            <p className="text-sm text-slate-400 mt-2 font-sans">
              Traditional boring flat cards chodiye. Perspective tilt layout aur spatial logic se design kiya gaya modular network.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Bento Card 1 */}
            <PerspectiveCard 
              className="bg-slate-900/30 border border-slate-800 p-6 flex flex-col justify-between h-72 cursor-default"
              glowColor="rgba(244, 63, 94, 0.15)"
            >
              <div>
                <div className="inline-flex p-3 rounded-lg bg-pink-500/10 text-pink-400 mb-4 border border-pink-500/20">
                  <Cpu className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white font-sans">WebGL Rendering Engine</h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Fast, dynamic loading animations jo dynamic shaders par rely karti hain bina page responsiveness hold kiye.
                </p>
              </div>
              <div className="text-xs font-mono text-pink-400 flex items-center gap-1.5 pt-4">
                <span>Core Framework Ready</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </PerspectiveCard>

            {/* Bento Card 2 */}
            <PerspectiveCard 
              className="bg-slate-900/30 border border-slate-800 p-6 flex flex-col justify-between h-72 cursor-default"
              glowColor="rgba(99, 102, 241, 0.15)"
            >
              <div>
                <div className="inline-flex p-3 rounded-lg bg-indigo-500/10 text-indigo-400 mb-4 border border-indigo-500/20">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white font-sans">Bento Metrics Matrix</h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Real-time analytics dashboard jo metrics coordinate coordinates monitor karke automatic conversion uplift signal deta hai.
                </p>
              </div>
              <div className="text-xs font-mono text-indigo-400 flex items-center gap-1.5 pt-4">
                <span>Calculated Integration</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </PerspectiveCard>

            {/* Bento Card 3 */}
            <PerspectiveCard 
              className="bg-slate-900/30 border border-slate-800 p-6 flex flex-col justify-between h-72 cursor-default"
              glowColor="rgba(16, 185, 129, 0.15)"
            >
              <div>
                <div className="inline-flex p-3 rounded-lg bg-emerald-500/10 text-emerald-400 mb-4 border border-emerald-500/20">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white font-sans">Hinglish Core AI Co-Pilot</h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Smart server-side client advisor generated by Gemini 3.5 AI flash jo multilingual aur custom Hinglish commands handle karta hai.
                </p>
              </div>
              <div className="text-xs font-mono text-emerald-400 flex items-center gap-1.5 pt-4">
                <span>Connected Server API</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </PerspectiveCard>

          </div>
        </section>

        {/* SECTION: Virtual Tour Experience */}
        <section id="tour-section" className="space-y-8 scroll-mt-20">
          <div className="max-w-3xl">
            <span className="text-xs font-mono font-semibold text-amber-400 tracking-widest block uppercase mb-2">
              Guided Experience
            </span>
            <h2 className="text-3xl font-bold font-sans text-white tracking-tight">
              3D Immersive Virtual Tour
            </h2>
            <p className="text-sm text-slate-400 mt-2 font-sans">
              Take a walk through rupesh.com's key architectural rooms. Dissect components, trigger physical systems live, and learn how we construct modern digital solutions.
            </p>
          </div>

          <VirtualTour />
        </section>

        {/* SECTION 3: Detailed Isometric Architecture Stack */}
        <section id="interactive-section" className="space-y-8 scroll-mt-20">
          <div className="max-w-3xl">
            <span className="text-xs font-mono font-semibold text-cyan-400 tracking-widest block uppercase mb-2">
              Infrastructure Decomposition
            </span>
            <h2 className="text-3xl font-bold font-sans text-white tracking-tight">
              Interactive 3D Technology Layer Dissect
            </h2>
            <p className="text-sm text-slate-400 mt-2 font-sans">
              Apne applications aur content storage stack ko coordinate system mein trace karein. Visual layout displays deep internal structure in real isometric orientation.
            </p>
          </div>

          <IsometricStack />
        </section>

        {/* SECTION 4: ROI Calculator and Simulation Panel */}
        <section id="roi-section" className="space-y-8 scroll-mt-20">
          <div className="max-w-3xl">
            <span className="text-xs font-mono font-semibold text-emerald-400 tracking-widest block uppercase mb-2">
              Revenue Math Simulator
            </span>
            <h2 className="text-3xl font-bold font-sans text-white tracking-tight">
              Rupesh Lift ROI Calculator
            </h2>
            <p className="text-sm text-slate-400 mt-2 font-sans">
              Apne website users, base conversions, aur average deal sizes check karein, aur immersive 3D technology lagane ke bad estimated commercial growth path evaluate karein!
            </p>
          </div>

          <RoiCalculator />
        </section>

        {/* SECTION 5: AI Consultant Co-Pilot Workspace */}
        <section id="generator-section" className="space-y-8 scroll-mt-20">
          <div className="lg:grid lg:grid-cols-12 gap-8 items-start bg-slate-900/30 p-6 rounded-3xl border border-slate-800/80 backdrop-blur-md">
            
            {/* Descriptive Left hand system info helper */}
            <div className="lg:col-span-4 space-y-6 mb-8 lg:mb-0">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-ping" />
                <span className="text-xs font-mono tracking-widest text-slate-400 uppercase">
                  Active Virtual Assistant
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white tracking-tight">
                Rupesh AI Co-Pilot Advisor
              </h3>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                Interactive spatial strategy select karne mein dikkat ho rahi hai? Rupesh AI Co-Pilot se directly discussion start karein. 
                Yeh assistant live interactive strategies, code stacks aur business metrics analyze karne mein helpful hai.
              </p>

              {/* Security parameters list under constraint rule */}
              <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-900/80">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-cyan-400" />
                  <div>
                    <span className="text-xs font-bold text-white block">Secure Express API</span>
                    <span className="text-[10px] text-slate-500 block">Server proxies all Gemini API requests</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-indigo-400" />
                  <div>
                    <span className="text-xs font-bold text-white block">Gemini 3.5 Model Intel</span>
                    <span className="text-[10px] text-slate-500 block">Fast & highly smart technology recommendations</span>
                  </div>
                </div>
              </div>

              {/* Fast click to query suggestions */}
              <div>
                <span className="text-[10px] text-slate-500 font-mono tracking-wider block uppercase mb-2">
                  Kuch dynamic prompts try karein:
                </span>
                <div className="flex flex-col gap-2">
                  {suggestions.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setInputText(s);
                        handleSendMessage(s);
                      }}
                      className="text-left text-xs bg-slate-950 hover:bg-slate-900 border border-slate-900 text-slate-300 hover:text-white px-3.5 py-2 rounded-xl transition-all duration-200 truncate"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Chat Sandbox client wrapper */}
            <div className="lg:col-span-8 bg-slate-950/90 rounded-2xl border border-slate-900 flex flex-col h-[480px]">
              
              {/* Header inside chat box */}
              <div className="px-4 py-3.5 border-b border-slate-900 flex justify-between items-center bg-slate-950/40">
                <div className="flex items-center gap-2.5">
                  <Terminal className="w-4 h-4 text-pink-400" />
                  <div>
                    <h4 className="text-xs font-bold text-white">RUPESH AI SYSTEM CO-PILOT</h4>
                    <span className="text-[9px] text-slate-500 font-mono">WORKSPACE_ID: RUPESH-3D-SYSTEM</span>
                  </div>
                </div>
                <span className="text-[9px] font-mono text-cyan-400 bg-cyan-950/50 border border-cyan-900 px-2 py-0.5 rounded-full">
                  LIVE_SOCKET_READY
                </span>
              </div>

              {/* Dialog Messages list */}
              <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent"
              >
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                        m.role === 'user'
                          ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white rounded-br-none'
                          : 'bg-slate-900/80 text-slate-200 border border-slate-800/80 rounded-bl-none'
                      }`}
                    >
                      {/* Subheading timestamp indicator */}
                      <span className="text-[9px] text-slate-400 block mb-1 font-mono">
                        {m.role === 'user' ? 'AAP' : 'RUPESH AI'} &bull; {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      {/* Dynamic Message Content and lists markup logic */}
                      <div className="whitespace-pre-line font-sans">
                        {m.text}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Simulated processing Loader */}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-slate-900/80 text-slate-400 border border-slate-800 rounded-2xl rounded-bl-none px-4 py-3 text-xs flex items-center gap-3">
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                      <span className="text-[10px] font-mono">Thinking about spatial architecture...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* User interaction input footer panel */}
              <div className="p-3 border-t border-slate-900 bg-slate-950">
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Apna business idea puchiye (e.g. Mere visual e-commerce platform ke liye 3D design...)"
                    className="flex-1 bg-slate-900 hover:bg-slate-900/80 focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 border border-slate-800 transition-all duration-150"
                  />
                  <button
                    type="submit"
                    disabled={!inputText.trim() || loading}
                    className="p-3 rounded-xl bg-slate-100 hover:bg-white text-slate-950 font-bold transition-all disabled:opacity-50 disabled:bg-slate-800 disabled:text-slate-500 flex items-center justify-center shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>

            </div>

          </div>
        </section>

      </main>

      {/* Decorative corporate bottom footer */}
      <footer id="dashboard-footer" className="bg-slate-950 border-t border-slate-900 mt-20 py-12 text-slate-400 text-xs text-center font-mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Box className="w-4 h-4 text-cyan-500" />
            <span className="font-bold text-white text-sm">rupesh.com</span>
          </div>

          <div>
            <p>&copy; 2026 rupesh.com Business Studio. All rights reserved.</p>
          </div>

          <div className="flex gap-4">
            <span className="text-slate-600">STATUS: READY</span>
            <span className="text-slate-600">SECURE SHELL v4</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

