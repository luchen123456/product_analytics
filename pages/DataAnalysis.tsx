import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip as RechartsTooltip, ScatterChart, Scatter, ZAxis, YAxis, CartesianGrid } from 'recharts';
import { MapPin, ChevronDown, Download } from 'lucide-react';

const SALES_DATA = [
    { name: 'Audio', value: 40 },
    { name: 'Mobile', value: 75 },
    { name: 'Cases', value: 90 },
    { name: 'Cables', value: 55 },
    { name: 'Power', value: 30 },
    { name: 'Other', value: 60 },
];

const PRICE_DIST_DATA = [
    { range: '$0-15', count: 15 },
    { range: '$15-30', count: 35 },
    { range: '$30-45', count: 45 },
    { range: '$45-60', count: 80 }, // peak
    { range: '$60-75', count: 60 },
    { range: '$75-90', count: 30 },
    { range: '$90+', count: 15 },
];

// Scatter data: x=rating, y=volume, z=potential(size/color logic mocked)
const SCATTER_DATA = [
    { x: 4.8, y: 80, z: 20, fill: '#10b981' }, // High potential
    { x: 3.5, y: 30, z: 10, fill: '#f97316' }, // Avg
    { x: 2.0, y: 20, z: 5, fill: '#ef4444' },  // Low
    { x: 4.2, y: 60, z: 15, fill: '#facc15' }, // Avg
    { x: 4.9, y: 90, z: 25, fill: '#10b981' }, // High
    { x: 1.5, y: 10, z: 5, fill: '#ef4444' },
    { x: 3.0, y: 40, z: 10, fill: '#facc15' },
];

const DataAnalysis: React.FC = () => {
    return (
        <div className="flex flex-col h-full bg-slate-50 overflow-hidden">
             <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 flex-shrink-0">
                <div className="flex items-center gap-4">
                    <h1 className="text-lg font-semibold text-slate-900">Market Analysis</h1>
                    <span className="h-4 w-px bg-slate-300"></span>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <MapPin size={16} />
                        <span>Global Market</span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                         <button className="flex items-center gap-2 pl-3 pr-2 py-1.5 text-sm border border-slate-200 rounded-lg bg-slate-50 hover:bg-slate-100">
                             Electronics <ChevronDown size={14} />
                         </button>
                    </div>
                     <div className="relative">
                         <button className="flex items-center gap-2 pl-3 pr-2 py-1.5 text-sm border border-slate-200 rounded-lg bg-slate-50 hover:bg-slate-100">
                             Last 30 Days <ChevronDown size={14} />
                         </button>
                    </div>
                    <button className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors shadow-sm">
                        <Download size={16} />
                        Export
                    </button>
                </div>
             </header>

             <div className="flex-1 overflow-y-auto p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
                    
                    {/* Sales Distribution */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 h-[350px] flex flex-col">
                        <div className="mb-4">
                            <h3 className="text-base font-semibold text-slate-900">Sales Distribution</h3>
                            <p className="text-xs text-slate-500 mt-1">Total units sold per sub-category</p>
                        </div>
                        <div className="flex-1 w-full min-h-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={SALES_DATA}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} dy={10} />
                                    <RechartsTooltip cursor={{fill: '#f8fafc'}} />
                                    <Bar dataKey="value" fill="#1f82e5" radius={[4, 4, 0, 0]} barSize={40} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Price Range */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 h-[350px] flex flex-col">
                         <div className="mb-4 flex justify-between">
                            <div>
                                <h3 className="text-base font-semibold text-slate-900">Price Range Analysis</h3>
                                <p className="text-xs text-slate-500 mt-1">Market price distribution density</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-orange-400"></span>
                                <span className="text-xs text-slate-500">Volume</span>
                            </div>
                        </div>
                        <div className="flex-1 w-full min-h-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={PRICE_DIST_DATA}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="range" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} dy={10} />
                                    <RechartsTooltip cursor={{fill: '#f8fafc'}} />
                                    <Bar dataKey="count" fill="#fb923c" radius={[4, 4, 0, 0]} barSize={30} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Quality vs Demand */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 h-[350px] flex flex-col">
                         <div className="mb-4 flex justify-between">
                            <div>
                                <h3 className="text-base font-semibold text-slate-900">Quality vs. Demand Matrix</h3>
                                <p className="text-xs text-slate-500 mt-1">Correlation between ratings and sales volume</p>
                            </div>
                            <div className="flex gap-2">
                                <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span><span className="text-[10px] text-slate-500">High</span></div>
                                <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-400"></span><span className="text-[10px] text-slate-500">Avg</span></div>
                                <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span><span className="text-[10px] text-slate-500">Low</span></div>
                            </div>
                        </div>
                        <div className="flex-1 w-full min-h-0">
                             <ResponsiveContainer width="100%" height="100%">
                                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                    <CartesianGrid />
                                    <XAxis type="number" dataKey="x" name="Rating" unit="" domain={[0, 5]} tick={{fontSize: 12}} />
                                    <YAxis type="number" dataKey="y" name="Volume" unit="" tick={{fontSize: 12}} />
                                    <ZAxis type="number" dataKey="z" range={[50, 400]} />
                                    <RechartsTooltip cursor={{ strokeDasharray: '3 3' }} />
                                    <Scatter name="Products" data={SCATTER_DATA} fill="#8884d8" />
                                </ScatterChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Top Opportunities */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 h-[350px] flex flex-col">
                        <div className="mb-6 flex justify-between items-center">
                            <div>
                                <h3 className="text-base font-semibold text-slate-900">Top Opportunities</h3>
                                <p className="text-xs text-slate-500 mt-1">Products with highest growth potential</p>
                            </div>
                            <a href="#" className="text-xs text-primary-600 font-medium hover:underline">View Full List</a>
                        </div>
                        <div className="space-y-4 overflow-y-auto">
                            {[
                                { name: 'Wireless Noise Cancel. Earbuds', score: 98.5 },
                                { name: 'Smart Fitness Tracker Band 5', score: 92.1 },
                                { name: 'Portable Mini Bluetooth Speaker', score: 88.4 },
                                { name: 'Fast Charging USB-C Cable 2m', score: 76.2 },
                                { name: 'Phone Stand Holder Metal', score: 65.8 },
                                { name: 'Screen Protector iPhone 14', score: 54.0 },
                            ].map((item, idx) => (
                                <div key={idx} className="group">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-xs font-medium text-slate-700 truncate">{item.name}</span>
                                        <span className="text-xs font-bold text-emerald-500">{item.score}</span>
                                    </div>
                                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                                        <div 
                                            className="bg-gradient-to-r from-emerald-400 to-emerald-500 h-2 rounded-full" 
                                            style={{ width: `${item.score}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
             </div>
        </div>
    );
};

export default DataAnalysis;