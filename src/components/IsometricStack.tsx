import React, { useState } from 'react';
import { motion } from 'motion/react';
import { StackLayer } from '../types';
import { Layers, Database, Cpu, Network, RefreshCw, Radio } from 'lucide-react';

const INITIAL_LAYERS: StackLayer[] = [
  {
    id: 'cdn',
    name: 'Edge CDN & Spatial Delivery',
    type: 'infrastructure',
    description: 'Decoupled edge system delivering sub-10ms assets globally using spatial CDN routing nodes.',
    technology: 'Cloudflare Workers & WebWebsocket',
    status: 'active',
    metric: '8.4ms latency',
    color: 'from-cyan-500 to-sky-600',
    offsetY: 0,
  },
  {
    id: 'api',
    name: 'Unified Core Spatial API & Orchestrator',
    type: 'presentation',
    description: 'Bridges spatial metadata, asset feeds, and analytical layers with automatic load-balancing and event streams.',
    technology: 'Node.js & Express Real-time WS',
    status: 'syncing',
    metric: '99.98% uptime',
    color: 'from-indigo-500 to-purple-600',
    offsetY: 60,
  },
  {
    id: 'db',
    name: 'Spatial Graph Database',
    type: 'database',
    description: 'Distributed document store customized for real-time multiplayer states and state persistence.',
    technology: 'Secure Firestore & Redis Cache',
    status: 'active',
    metric: '180,000 req/s',
    color: 'from-pink-500 to-rose-600',
    offsetY: 120,
  },
  {
    id: 'web3d',
    name: 'Client Presentation: 3D Immersive Port',
    type: 'presentation',
    description: 'High-performance interactive layout powered by CSS-Perspective, responsive bento grids, and GPU hardware.',
    technology: 'React 19 & Tailwind CSS v4',
    status: 'active',
    metric: '120 FPS render',
    color: 'from-emerald-400 to-teal-600',
    offsetY: 180,
  },
];

export default function IsometricStack() {
  const [layers, setLayers] = useState<StackLayer[]>(INITIAL_LAYERS);
  const [selectedLayerId, setSelectedLayerId] = useState<string>('web3d');
  const [hoveredLayerId, setHoveredLayerId] = useState<string | null>(null);

  const selectedLayer = layers.find((l) => l.id === selectedLayerId) || layers[3];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900/40 p-6 rounded-3xl border border-slate-800/80 backdrop-blur-md">
      {/* 3D Render Area */}
      <div className="lg:col-span-6 flex flex-col justify-center items-center h-[420px] relative overflow-hidden bg-slate-950/60 rounded-2xl border border-slate-900 shadow-inner">
        {/* Environment Grid BG - Simulated spatial grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-60" />
        
        {/* Floating status tags */}
        <div className="absolute top-4 left-4 flex gap-2 items-center text-[10px] font-mono tracking-wider bg-slate-900/90 border border-slate-800/80 px-2.5 py-1 rounded-full text-slate-400">
          <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
          <span>ISOMETRIC FIELD ACTIVE</span>
        </div>

        {/* 3D Container viewport */}
        <div 
          className="relative flex items-center justify-center cursor-pointer select-none mt-12 transition-all duration-700" 
          style={{
            perspective: '1000px',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Main rotated group */}
          <div 
            className="relative w-64 h-56 transition-transform duration-500 ease-out"
            style={{
              transform: 'rotateX(58deg) rotateY(0deg) rotateZ(-45deg)',
              transformStyle: 'preserve-3d',
            }}
          >
            {layers.map((layer, index) => {
              const isSelected = selectedLayerId === layer.id;
              const isHovered = hoveredLayerId === layer.id;
              
              // Calculate custom 3D offset stacks
              // Active selection pushes the active layer "higher" in the 3D space (Z elevation)
              const baseZ = index * -45;
              const hoverElevation = isHovered ? 25 : 0;
              const selectElevation = isSelected ? 40 : 0;
              const totalElevation = baseZ + hoverElevation + selectElevation;

              return (
                <div
                  key={layer.id}
                  id={`3d-layer-${layer.id}`}
                  onMouseEnter={() => setHoveredLayerId(layer.id)}
                  onMouseLeave={() => setHoveredLayerId(null)}
                  onClick={() => setSelectedLayerId(layer.id)}
                  className="absolute left-0 top-0 w-full h-full transition-all duration-300 ease-out"
                  style={{
                    transform: `translateZ(${totalElevation}px)`,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Layer Slab */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${layer.color} p-[1px] shadow-2xl transition-all duration-300`}>
                    <div 
                      className={`h-full w-full rounded-2xl bg-slate-950/90 p-4 flex flex-col justify-between border transition-all duration-300 ${
                        isSelected 
                          ? 'border-white/40 shadow-[0_0_30px_rgba(255,255,255,0.15)] bg-slate-900/95' 
                          : isHovered 
                            ? 'border-white/20 bg-slate-900/90' 
                            : 'border-white/5'
                      }`}
                    >
                      {/* Grid overlay for high tech look */}
                      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none rounded-2xl opacity-80" />

                      {/* Header info */}
                      <div className="flex justify-between items-start z-10">
                        <span className="text-[10px] font-mono font-semibold text-slate-500 uppercase tracking-widest">
                          LVL 0{index + 1}
                        </span>
                        <div className="flex items-center gap-1">
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            layer.status === 'active' ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'
                          }`} />
                          <span className="text-[8px] font-mono text-slate-400 uppercase">
                            {layer.status}
                          </span>
                        </div>
                      </div>

                      {/* Middle icon & title */}
                      <div className="my-auto z-10">
                        <h4 className="font-sans font-bold text-sm text-white tracking-tight leading-snug">
                          {layer.name.split('&')[0].split(':')[0]}
                        </h4>
                        <p className="text-[10px] text-slate-400 font-mono mt-1">
                          {layer.technology}
                        </p>
                      </div>

                      {/* Tech metric indicator */}
                      <div className="flex justify-between items-center z-10 border-t border-white/5 pt-2 mt-1">
                        <span className="text-[9px] font-mono text-slate-500 tracking-wide">
                          TELEMETRY:
                        </span>
                        <span className="text-[10px] font-mono text-cyan-400 font-medium">
                          {layer.metric}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 3D Side panels for isometric thickness effect */}
                  <div 
                    className={`absolute bottom-0 left-0 w-full h-[6px] origin-top bg-slate-800 transition-colors ${
                      isSelected ? 'bg-gradient-to-r from-white/20 to-slate-800' : 'bg-slate-900/60'
                    }`}
                    style={{
                      transform: 'rotateX(-90deg)',
                      transformOrigin: 'bottom',
                    }}
                  />
                  <div 
                    className={`absolute right-0 top-0 h-full w-[6px] origin-right bg-slate-900 transition-colors ${
                      isSelected ? 'bg-gradient-to-b from-white/10 to-slate-950' : 'bg-slate-950/60'
                    }`}
                    style={{
                      transform: 'rotateY(90deg)',
                      transformOrigin: 'right',
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic spatial prompt */}
        <p className="absolute bottom-4 text-xs font-mono text-slate-500 flex items-center gap-1 bg-slate-900/30 px-3 py-1 rounded-full border border-slate-900/60">
          <Layers className="w-3.5 h-3.5 text-cyan-500 animate-pulse" />
          <span>Click any floating layer to dissect architecture</span>
        </p>
      </div>

      {/* Dissect Drawer details */}
      <div className="lg:col-span-6 flex flex-col justify-between h-full py-2">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 text-xs font-mono font-semibold px-2.5 py-1 rounded-full border border-cyan-500/30">
              LAYER_INFO_SHEET
            </span>
            <span className="text-slate-600 font-mono text-xs">/ System Core Stack</span>
          </div>

          <h3 className="text-2xl font-bold font-sans text-white tracking-tight mb-2">
            {selectedLayer.name}
          </h3>

          <p className="text-sm text-slate-400 leading-relaxed mb-6 font-sans">
            {selectedLayer.description}
          </p>

          {/* Deep detail bullet board */}
          <div className="grid grid-cols-2 gap-4 border-t border-slate-800/80 pt-6">
            <div className="bg-slate-950/40 p-3.5 rounded-xl border border-slate-900">
              <span className="text-[10px] text-slate-500 font-mono tracking-widest block uppercase mb-1">
                Integrated Framework
              </span>
              <span className="text-xs font-sans text-white font-medium flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-indigo-400" />
                {selectedLayer.technology}
              </span>
            </div>

            <div className="bg-slate-950/40 p-3.5 rounded-xl border border-slate-900">
              <span className="text-[10px] text-slate-500 font-mono tracking-widest block uppercase mb-1">
                High-Frequency Metric
              </span>
              <span className="text-xs font-sans text-white font-medium flex items-center gap-1.5">
                <Database className="w-4 h-4 text-pink-400" />
                {selectedLayer.metric}
              </span>
            </div>

            <div className="bg-slate-950/40 p-3.5 rounded-xl border border-slate-900 col-span-2">
              <span className="text-[10px] text-slate-500 font-mono tracking-widest block uppercase mb-1">
                Virtual Ingress & Latency Check
              </span>
              <div className="flex justify-between items-center mt-1">
                <div className="flex gap-1.5 items-center">
                  <Network className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-sans text-white">Edge Gateway Connected</span>
                </div>
                <div className="flex items-center gap-1 font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  <RefreshCw className="w-3 h-3 animate-spin" />
                  <span>ONLINE</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fast Action Stack Controller */}
        <div className="mt-8 pt-4 border-t border-slate-800/50 flex flex-wrap gap-2">
          {layers.map((l) => (
            <button
              key={l.id}
              onClick={() => setSelectedLayerId(l.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all duration-200 border ${
                selectedLayerId === l.id
                  ? 'bg-slate-100 text-slate-950 font-bold border-white'
                  : 'bg-slate-950/50 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
              }`}
            >
              {l.id.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
