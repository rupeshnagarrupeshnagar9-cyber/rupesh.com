import React, { useState, useMemo } from 'react';
import { Sparkles, DollarSign, Users, Award, TrendingUp, Cpu } from 'lucide-react';

export default function RoiCalculator() {
  const [visitors, setVisitors] = useState<number>(25000);
  const [conversion, setConversion] = useState<number>(2.0);
  const [avgValue, setAvgValue] = useState<number>(150);
  const [automation, setAutomation] = useState<number>(40);

  // Deep interactive math equations calculating optimized business lifts
  const results = useMemo(() => {
    // 3D customized components elevate conversion rates on average by 35% relative lift
    const baseConversions = (visitors * (conversion / 100));
    const baseRevenue = baseConversions * avgValue;

    // Optimized uplift multiplier
    const conversionUplift = 1.35; // 35% relative lift from immersive 3D customizer & instant AI guidance
    const optConversionRate = Math.min(15, conversion * conversionUplift);
    const optConversions = (visitors * (optConversionRate / 100));
    
    // AI automation saves handling time, estimating $2.50 per customer interaction fully handled
    const supportSavings = visitors * (automation / 100) * 2.5;
    
    const optRevenue = optConversions * avgValue;
    const grossRevenueLift = optRevenue - baseRevenue;
    const netMonthlyBenefit = grossRevenueLift + supportSavings;
    const yearlyImpact = netMonthlyBenefit * 12;

    const roiMultiplier = baseRevenue > 0 ? (netMonthlyBenefit / (baseRevenue * 0.08) * 100).toFixed(0) : '350';

    return {
      baseRevenue: Math.round(baseRevenue),
      optRevenue: Math.round(optRevenue),
      grossLift: Math.round(grossRevenueLift),
      supportSavings: Math.round(supportSavings),
      totalLift: Math.round(netMonthlyBenefit),
      yearlyImpact: Math.round(yearlyImpact),
      roiMultiplier,
      optConversionRate: optConversionRate.toFixed(2),
    };
  }, [visitors, conversion, avgValue, automation]);

  // Generate SVG coordinate points for the comparison area chart
  const chartPoints = useMemo(() => {
    const points = [];
    const baseVal = results.baseRevenue;
    const optVal = results.optRevenue;
    
    // Generates 6 data points over 6 months to construct beautiful wave charts
    for (let i = 0; i < 6; i++) {
      const monthPct = i / 5;
      
      // Traditional progressive growth
      const baseGrowth = baseVal * (1 + monthPct * 0.15);
      
      // Immersive hyper-scale growth
      const optGrowth = optVal * (1 + monthPct * 0.45);
      
      points.push({
        base: baseGrowth,
        opt: optGrowth,
      });
    }
    return points;
  }, [results.baseRevenue, results.optRevenue]);

  // Construct SVG paths manually for absolute visual control without heavy external library dependencies
  const { basePath, optPath } = useMemo(() => {
    if (chartPoints.length === 0) return { basePath: '', optPath: '' };
    
    const width = 500;
    const height = 140;
    const maxVal = Math.max(...chartPoints.map(p => p.opt)) * 1.1 || 1000;

    const baseCoords = chartPoints.map((p, i) => {
      const x = (i / (chartPoints.length - 1)) * width;
      const y = height - (p.base / maxVal) * height;
      return `${x},${y}`;
    });

    const optCoords = chartPoints.map((p, i) => {
      const x = (i / (chartPoints.length - 1)) * width;
      const y = height - (p.opt / maxVal) * height;
      return `${x},${y}`;
    });

    return {
      basePath: `M 0,${height} L ${baseCoords.join(' L ')} L ${width},${height} Z`,
      optPath: `M 0,${height} L ${optCoords.join(' L ')} L ${width},${height} Z`,
      baseLine: `M ${baseCoords.join(' L ')}`,
      optLine: `M ${optCoords.join(' L ')}`,
    };
  }, [chartPoints]);

  return (
    <div className="bg-slate-900/40 rounded-3xl border border-slate-800/80 backdrop-blur-md p-6 lg:p-8">
      {/* Header section with badge */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-pink-500 animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">
              ROI & Financial Simulator
            </span>
          </div>
          <h3 className="text-2xl font-bold font-sans text-white tracking-tight">
            Performans & ROI Model
          </h3>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-2xl flex items-center gap-2.5">
          <Award className="w-5 h-5 text-emerald-400" />
          <div>
            <span className="text-[9px] font-mono text-slate-400 block uppercase">
              Simulated Conversion Lift
            </span>
            <span className="text-sm font-bold font-sans text-emerald-400">
              +{results.optConversionRate}% Live Boost
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sliders Input Board */}
        <div className="lg:col-span-5 space-y-6">
          {/* Slider 1: Website Visitors */}
          <div className="bg-slate-950/40 p-4 rounded-2xl border border-slate-900">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-cyan-400" />
                Monthly Visitors
              </span>
              <span className="text-sm font-mono font-bold text-white">
                {visitors.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="1000"
              max="200000"
              step="1000"
              value={visitors}
              onChange={(e) => setVisitors(Number(e.target.value))}
              className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>

          {/* Slider 2: Baseline Conversion */}
          <div className="bg-slate-950/40 p-4 rounded-2xl border border-slate-900">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
                Current Conversion Rate
              </span>
              <span className="text-sm font-mono font-bold text-white">
                {conversion}%
              </span>
            </div>
            <input
              type="range"
              min="0.5"
              max="10.0"
              step="0.1"
              value={conversion}
              onChange={(e) => setConversion(Number(e.target.value))}
              className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-400"
            />
          </div>

          {/* Slider 3: Average deal size */}
          <div className="bg-slate-950/40 p-4 rounded-2xl border border-slate-900">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-rose-400" />
                Average Ticket / Deal Size
              </span>
              <span className="text-sm font-mono font-bold text-white">
                ${avgValue}
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="2000"
              step="10"
              value={avgValue}
              onChange={(e) => setAvgValue(Number(e.target.value))}
              className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-400"
            />
          </div>

          {/* Slider 4: AI Support Interaction */}
          <div className="bg-slate-950/40 p-4 rounded-2xl border border-slate-900">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                AI Automation Influence
              </span>
              <span className="text-sm font-mono font-bold text-white">
                {automation}% Workflow
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              step="5"
              value={automation}
              onChange={(e) => setAutomation(Number(e.target.value))}
              className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />
          </div>
        </div>

        {/* Outputs and 3D Charting Area */}
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Card 1: Revenue delta */}
          <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-900 flex flex-col justify-between h-[152px]">
            <div>
              <span className="text-[10px] text-slate-500 font-mono tracking-widest block uppercase mb-1">
                Baseline Monthly Revenue
              </span>
              <span className="text-xl font-bold font-mono text-slate-400">
                ${results.baseRevenue.toLocaleString()}
              </span>
            </div>
            <div className="border-t border-slate-900 pt-3 flex justify-between items-center">
              <span className="text-xs font-sans text-slate-400">rupesh.com Run rate:</span>
              <span className="text-sm font-bold font-mono text-cyan-400">
                ${results.optRevenue.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Card 2: Net Monthly uplift */}
          <div className="bg-gradient-to-br from-indigo-950/40 to-slate-950/80 p-5 rounded-2xl border border-indigo-500/10 flex flex-col justify-between h-[152px] shadow-lg shadow-indigo-950/10">
            <div>
              <span className="text-[10px] text-indigo-400 font-mono tracking-widest block uppercase mb-1">
                Net Monthly Benefit Lift
              </span>
              <span className="text-2xl font-black font-sans text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400 bg-clip-text">
                +${results.totalLift.toLocaleString()}
              </span>
            </div>
            <div className="text-[11px] font-sans text-slate-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Includes AI resolution savings + conversion boost</span>
            </div>
          </div>

          {/* Card 3: Live interactive pure SVG Comparison Chart */}
          <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-900 col-span-1 md:col-span-2">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] text-slate-500 font-mono tracking-widest block uppercase">
                6-Month Projected Growth Vector
              </span>
              <div className="flex gap-3">
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-slate-500">
                  <span className="w-2.5 h-1 bg-slate-700 rounded-full" />
                  Baseline
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-cyan-400">
                  <span className="w-2.5 h-1 bg-cyan-500 rounded-full" />
                  Rupesh Core
                </span>
              </div>
            </div>

            {/* SVG Plot view */}
            <div className="relative h-36 w-full mt-4 bg-slate-950 rounded-xl overflow-hidden border border-slate-900/60 p-2">
              <svg 
                className="w-full h-full" 
                viewBox="0 0 500 140" 
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="baseGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgb(71, 85, 105)" stopOpacity="0.15"/>
                    <stop offset="100%" stopColor="rgb(71, 85, 105)" stopOpacity="0.0"/>
                  </linearGradient>
                  <linearGradient id="optGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgb(6, 182, 212)" stopOpacity="0.25"/>
                    <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0.0"/>
                  </linearGradient>
                </defs>
                
                {/* Chart Grid Lines */}
                <line x1="0" y1="35" x2="500" y2="35" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                <line x1="0" y1="70" x2="500" y2="70" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                <line x1="0" y1="105" x2="500" y2="105" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

                {/* Base Area path */}
                {basePath && (
                  <>
                    <path d={basePath} fill="url(#baseGrad)" />
                    <path d={basePath.replace(' L 500,140 Z', '')} fill="none" stroke="rgb(100, 116, 139)" strokeWidth="1.5" strokeDasharray="3,3" />
                  </>
                )}

                {/* Opt Area path */}
                {optPath && (
                  <>
                    <path d={optPath} fill="url(#optGrad)" />
                    <path d={optPath.replace(' L 500,140 Z', '')} fill="none" stroke="url(#optStroke)" strokeWidth="2.5" />
                    <linearGradient id="optStroke" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="rgb(34, 211, 238)"/>
                      <stop offset="100%" stopColor="rgb(99, 102, 241)"/>
                    </linearGradient>
                  </>
                )}
              </svg>
            </div>
            
            {/* Legend impact display */}
            <div className="flex justify-between items-center mt-3 border-t border-slate-900 pt-3">
              <span className="text-xs text-slate-500 font-sans">Estimated Annual Net Revenue Lift:</span>
              <span className="text-sm font-black font-mono text-emerald-400">
                +${results.yearlyImpact.toLocaleString()} / year
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
