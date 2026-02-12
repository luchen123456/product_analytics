import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts';
import { Plus, Search, RotateCcw, Download, ExternalLink, Star, TrendingUp, Minus } from 'lucide-react';

const DATA = [
  { subject: 'Price Advantage', A: 120, B: 90, fullMark: 150 },
  { subject: 'Sales Vol', A: 80, B: 130, fullMark: 150 },
  { subject: 'Avg Rating', A: 140, B: 110, fullMark: 150 },
  { subject: 'Market Heat', A: 110, B: 100, fullMark: 150 },
  { subject: 'Competition', A: 90, B: 100, fullMark: 150 },
];

const CompetitorAnalysis: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-hidden">
      <header className="bg-white border-b border-slate-200 p-4 md:p-6 sticky top-0 z-10 flex-shrink-0">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Competitor Comparison</h1>
              <p className="text-sm text-slate-500 mt-1">Benchmark your selection against top market performers.</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors flex items-center space-x-2">
                <RotateCcw size={18} />
                <span>Clear All</span>
              </button>
              <button className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-colors flex items-center space-x-2">
                <Download size={18} />
                <span>Export Report</span>
              </button>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1 group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-slate-400 group-focus-within:text-primary-500 transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg leading-5 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-shadow"
                placeholder="Paste Product URL or enter Product ID to add..."
              />
            </div>
            <button className="px-5 py-2.5 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg shadow-sm hover:shadow-lg transition-all flex items-center justify-center space-x-2">
              <Plus size={18} />
              <span>Add Product</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        <div className="max-w-7xl mx-auto w-full space-y-6">
            
          {/* Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Your Selection */}
            <div className="relative bg-white rounded-xl border-2 border-primary-500 shadow-lg overflow-hidden flex flex-col hover:-translate-y-1 transition-transform duration-300">
              <div className="absolute top-3 left-3 bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">YOUR SELECTION</div>
              <div className="p-5 flex flex-col h-full">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                    <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=200&h=200&fit=crop" alt="Smart Watch" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-slate-900 leading-tight mb-1 line-clamp-2">Smart Watch Series 7 GPS 45mm Midnight Aluminum Case</h3>
                    <div className="flex items-center text-xs text-slate-500 mb-2">
                      <span className="truncate">Official Tech Store</span>
                    </div>
                    <a href="#" className="text-xs text-primary-600 hover:underline flex items-center">
                      View Product <ExternalLink size={10} className="ml-0.5" />
                    </a>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-auto">
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <div className="text-xs text-slate-500 mb-1">Price</div>
                        <div className="text-lg font-bold text-slate-900">$45.00</div>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <div className="text-xs text-slate-500 mb-1">Sales (Mo)</div>
                        <div className="text-lg font-bold text-slate-900">1,204</div>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <div className="text-xs text-slate-500 mb-1">Rating</div>
                         <div className="flex items-center text-lg font-bold text-slate-900">
                            4.8 <Star size={14} className="text-yellow-400 fill-current ml-1" />
                        </div>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <div className="text-xs text-slate-500 mb-1">Potential</div>
                         <div className="text-lg font-bold text-green-500 flex items-center">
                            High <TrendingUp size={16} className="ml-1" />
                        </div>
                    </div>
                </div>
              </div>
              <div className="h-1.5 w-full bg-primary-500"></div>
            </div>

            {/* Competitor */}
            <div className="relative bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg flex flex-col transition-all duration-300">
               <div className="absolute top-3 right-3">
                   <button className="text-slate-400 hover:text-red-500">
                       <Minus size={16} />
                   </button>
               </div>
               <div className="p-5 flex flex-col h-full">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                    <img className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-500" src="https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=200&h=200&fit=crop" alt="Competitor" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-slate-900 leading-tight mb-1 line-clamp-2">Generic FitBand Pro 2023 - Waterproof Fitness Tracker</h3>
                    <div className="flex items-center text-xs text-slate-500 mb-2">
                      <span className="truncate">Gadget World</span>
                    </div>
                    <a href="#" className="text-xs text-primary-600 hover:underline flex items-center">
                      View Product <ExternalLink size={10} className="ml-0.5" />
                    </a>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-auto">
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <div className="text-xs text-slate-500 mb-1">Price</div>
                        <div className="text-lg font-bold text-slate-900">$32.50</div>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <div className="text-xs text-slate-500 mb-1">Sales (Mo)</div>
                        <div className="text-lg font-bold text-slate-900">3,500</div>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <div className="text-xs text-slate-500 mb-1">Rating</div>
                         <div className="flex items-center text-lg font-bold text-slate-900">
                            4.5 <Star size={14} className="text-yellow-400 fill-current ml-1" />
                        </div>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <div className="text-xs text-slate-500 mb-1">Potential</div>
                         <div className="text-lg font-bold text-yellow-500 flex items-center">
                            Med <Minus size={16} className="ml-1" />
                        </div>
                    </div>
                </div>
              </div>
              <div className="h-1.5 w-full bg-pink-500"></div>
            </div>

            {/* Add New */}
            <div className="relative bg-slate-50 rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center p-8 group hover:border-primary-500 hover:bg-primary-50 transition-all cursor-pointer h-full min-h-[250px]">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4 group-hover:bg-white transition-colors shadow-sm">
                    <Plus size={32} className="text-slate-400 group-hover:text-primary-500 transition-colors" />
                </div>
                <h3 className="text-base font-medium text-slate-600 mb-1">Add Competitor</h3>
                <p className="text-xs text-slate-400 text-center max-w-[200px]">Compare another product to see deeper insights.</p>
            </div>
          </div>

          {/* Radar Chart Section */}
          <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
             <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-lg font-bold text-slate-900">Competitive Landscape Analysis</h2>
                    <p className="text-sm text-slate-500">Multi-dimensional comparison of key performance indicators.</p>
                </div>
                <div className="flex items-center space-x-4 bg-slate-50 px-4 py-2 rounded-lg border border-slate-100">
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-primary-500"></div>
                        <span className="text-xs font-medium text-slate-700">Your Selection</span>
                    </div>
                     <div className="h-4 w-px bg-slate-300"></div>
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                        <span className="text-xs font-medium text-slate-700">FitBand Pro</span>
                    </div>
                </div>
             </div>
             <div className="p-8 flex flex-col lg:flex-row gap-8">
                <div className="flex-1 h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={DATA}>
                        <PolarGrid stroke="#cbd5e1" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                        <Radar
                            name="Your Selection"
                            dataKey="A"
                            stroke="#1f82e5"
                            strokeWidth={3}
                            fill="#1f82e5"
                            fillOpacity={0.2}
                        />
                        <Radar
                            name="FitBand Pro"
                            dataKey="B"
                            stroke="#ec4899"
                            strokeWidth={2}
                            fill="#ec4899"
                            fillOpacity={0.1}
                            strokeDasharray="4 4"
                        />
                        <Tooltip />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
                
                <div className="w-full lg:w-80 bg-slate-50 rounded-lg p-5 border border-slate-100 h-fit">
                    <h3 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wide">Key Takeaways</h3>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-green-600 text-xs font-bold">$</span>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-slate-700">Higher Profit Margin</p>
                                <p className="text-xs text-slate-500 mt-1">Your selection commands a <span className="text-green-600 font-bold">+38%</span> higher price point than competitors.</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded bg-yellow-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <AlertTriangle size={14} className="text-yellow-600" />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-slate-700">Sales Volume Gap</p>
                                <p className="text-xs text-slate-500 mt-1">Competitor dominates volume with <span className="text-slate-700 font-medium">3.5k sales</span> vs your 1.2k. Consider bundling.</p>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
          </section>
        </div>
      </div>
    </div>
  );
};
import { AlertTriangle } from 'lucide-react'; // Added missing import
export default CompetitorAnalysis;