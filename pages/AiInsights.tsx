import React from 'react';
import { Sparkles, RefreshCw, TrendingUp, DollarSign, Megaphone, AlertTriangle, Bookmark, Star } from 'lucide-react';

const AiInsights: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-hidden">
      <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 z-10 flex-shrink-0">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            AI Strategic Insights
            <span className="bg-primary-50 text-primary-600 text-xs font-medium px-2 py-0.5 rounded-full border border-primary-100">BETA</span>
          </h1>
          <p className="text-xs text-slate-500">AI-powered analysis for your selected product niche: <span className="font-medium text-slate-700">Consumer Electronics &gt; Audio</span></p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-white rounded border border-slate-200 p-1">
            <button className="px-3 py-1.5 text-xs font-medium rounded bg-slate-100 text-slate-700">All</button>
            <button className="px-3 py-1.5 text-xs font-medium rounded text-slate-500 hover:text-slate-700">High Margin</button>
            <button className="px-3 py-1.5 text-xs font-medium rounded text-slate-500 hover:text-slate-700">Low Risk</button>
          </div>
          <button className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded text-sm font-medium transition-colors shadow-sm shadow-primary-500/30">
            <RefreshCw size={16} />
            Regenerate All
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-8 space-y-6">
        {/* Insight Card 1 */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col md:flex-row overflow-hidden group">
          <div className="w-full md:w-72 bg-slate-50 p-6 flex flex-col border-b md:border-b-0 md:border-r border-slate-100 flex-shrink-0">
            <div className="flex gap-4 mb-4">
              <div className="relative w-20 h-20 flex-shrink-0">
                <img className="w-full h-full object-cover rounded-lg border border-slate-200 shadow-sm" src="https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&h=200&fit=crop" alt="Product" />
                <div className="absolute -top-2 -right-2 bg-emerald-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">TOP 5%</div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-slate-900 leading-tight mb-1 line-clamp-2">TWS Wireless Bluetooth 5.3 Earbuds Noise Cancelling...</h3>
                <p className="text-xs text-slate-500 truncate">ID: 88291023</p>
              </div>
            </div>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Price</span>
                <span className="font-bold text-slate-900 font-mono">$24.90</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Monthly Sales</span>
                <span className="font-bold text-slate-900 font-mono">1,240</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Rating</span>
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star size={14} className="fill-current" />
                  4.8
                </div>
              </div>
            </div>
            <div className="mt-auto space-y-2">
              <button className="w-full bg-white border border-slate-200 text-slate-700 text-xs font-medium py-2 rounded hover:bg-slate-50 transition-colors">View Product</button>
              <button className="w-full text-primary-500 hover:text-primary-600 text-xs font-medium py-1.5 flex justify-center items-center gap-1">
                <Bookmark size={14} /> Save to List
              </button>
            </div>
          </div>
          
          <div className="flex-1 p-6 relative">
            <div className="absolute top-6 right-6 flex items-center gap-1 text-primary-600 bg-primary-50 px-2 py-1 rounded text-xs font-medium select-none">
              <Sparkles size={14} />
              AI Generated
            </div>
            <div className="space-y-5">
                <div>
                    <h4 className="font-semibold text-primary-600 flex items-center gap-2 mb-2 text-sm">
                        <TrendingUp size={18} /> Market Outlook
                    </h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        The demand for sub-$30 ANC earbuds is currently surging in the Southeast Asian market, specifically Indonesia and Vietnam. This product fits perfectly into the "affordable premium" niche. <span className="bg-emerald-50 text-emerald-700 px-1 rounded font-medium">Growth rate in this category is +15% month-over-month.</span>
                    </p>
                </div>
                <div>
                     <h4 className="font-semibold text-primary-600 flex items-center gap-2 mb-2 text-sm">
                        <DollarSign size={18} /> Pricing Advice
                    </h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        Your current price of $24.90 is competitive against the category average of $28.00. However, consider a <span className="bg-emerald-50 text-emerald-700 px-1 rounded font-medium">bundle offer with a silicone protective case</span> at $27.99 to increase AOV (Average Order Value) without significantly impacting conversion rates.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    <div>
                         <h4 className="font-semibold text-primary-600 flex items-center gap-2 mb-2 text-sm">
                            <Megaphone size={18} /> Marketing Strategy
                        </h4>
                        <ul className="list-disc pl-5 text-slate-600 text-sm space-y-1">
                            <li>Focus ad spend on "commuting" and "gaming" keywords.</li>
                            <li>Utilize social commerce integration for short-form video demos focusing on the waterproofing feature.</li>
                        </ul>
                    </div>
                    <div>
                         <h4 className="font-semibold text-amber-600 flex items-center gap-2 mb-2 text-sm">
                            <AlertTriangle size={18} /> Risk Warning
                        </h4>
                         <p className="text-amber-900/80 bg-amber-50 p-3 rounded text-sm border border-amber-100">
                             Competitor analysis indicates a <span className="font-semibold text-amber-700">high return rate (8%)</span> for similar chipsets due to connectivity drops. Ensure QC checks on Bluetooth 5.3 stability before bulk shipping.
                        </p>
                    </div>
                </div>
            </div>
          </div>
        </div>

         {/* Insight Card 2 */}
         <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col md:flex-row overflow-hidden group">
          <div className="w-full md:w-72 bg-slate-50 p-6 flex flex-col border-b md:border-b-0 md:border-r border-slate-100 flex-shrink-0">
            <div className="flex gap-4 mb-4">
              <div className="relative w-20 h-20 flex-shrink-0">
                <img className="w-full h-full object-cover rounded-lg border border-slate-200 shadow-sm" src="https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=200&h=200&fit=crop" alt="Smart Watch" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-slate-900 leading-tight mb-1 line-clamp-2">Fitness Tracker Smart Watch Heart Rate Monitor...</h3>
                <p className="text-xs text-slate-500 truncate">ID: 99210044</p>
              </div>
            </div>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Price</span>
                <span className="font-bold text-slate-900 font-mono">$18.50</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Monthly Sales</span>
                <span className="font-bold text-slate-900 font-mono">856</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Rating</span>
                <div className="flex items-center gap-1 text-slate-400 font-bold">
                  <Star size={14} className="fill-current text-amber-500" />
                  4.2
                </div>
              </div>
            </div>
            <div className="mt-auto space-y-2">
              <button className="w-full bg-white border border-slate-200 text-slate-700 text-xs font-medium py-2 rounded hover:bg-slate-50 transition-colors">View Product</button>
              <button className="w-full text-primary-500 hover:text-primary-600 text-xs font-medium py-1.5 flex justify-center items-center gap-1">
                <Bookmark size={14} /> Save to List
              </button>
            </div>
          </div>
          
          <div className="flex-1 p-6 relative">
            <div className="absolute top-6 right-6 flex items-center gap-1 text-primary-600 bg-primary-50 px-2 py-1 rounded text-xs font-medium select-none">
              <Sparkles size={14} />
              AI Generated
            </div>
            <div className="space-y-5">
                <div>
                    <h4 className="font-semibold text-primary-600 flex items-center gap-2 mb-2 text-sm">
                        <TrendingUp size={18} /> Market Outlook
                    </h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        The market for generic fitness trackers is becoming saturated. While volume is high, margins are compressing. This product faces <span className="bg-amber-50 text-amber-700 px-1 rounded font-medium">strong competition from established local brands</span> offering local warranties.
                    </p>
                </div>
                <div>
                     <h4 className="font-semibold text-primary-600 flex items-center gap-2 mb-2 text-sm">
                        <DollarSign size={18} /> Pricing Advice
                    </h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        Suggest <span className="bg-red-50 text-red-700 px-1 rounded font-medium">lowering price to $16.99</span> to capture the budget-conscious segment, or pivoting to market this as a "Kids First Smartwatch" where price sensitivity is lower.
                    </p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiInsights;