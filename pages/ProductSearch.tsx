import React, { useState } from 'react';
import { Search, SlidersHorizontal, ChevronRight, Star, Eye, Download, Filter, TrendingUp, Zap, Clock, Loader2, CheckCircle, X } from 'lucide-react';
import { Product } from '../types';

const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Baseus Bowie E3 TWS Wireless Earbuds',
    shop: 'Baseus Official Store',
    price: 18.90,
    sales: '12.5k',
    sales30d: 450,
    rating: 4.9,
    ratingCount: '3.2k',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&h=200&fit=crop',
    analysisScore: 9.2,
    analysisLabel: 'High',
    drop: '-12% drop'
  },
  {
    id: '2',
    name: 'Lenovo TH30 Wireless Headphones Bluetooth 5.0',
    shop: 'Lenovo Thinkplus',
    price: 14.50,
    sales: '8.2k',
    sales30d: 820,
    rating: 4.8,
    ratingCount: '1.1k',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
    analysisScore: 8.8,
    analysisLabel: 'High'
  },
  {
    id: '3',
    name: 'Generic i12 TWS Matte Colors Inpods 12',
    shop: 'Gadget World Global',
    price: 4.90,
    sales: '32k',
    sales30d: 1200,
    rating: 4.5,
    ratingCount: '5.8k',
    image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=200&h=200&fit=crop',
    analysisScore: 6.4,
    analysisLabel: 'Med'
  },
  {
    id: '4',
    name: 'Sony WH-1000XM4 Noise Cancelling Wireless',
    shop: 'Sony Official Store',
    price: 279.00,
    sales: '2.1k',
    sales30d: 150,
    rating: 5.0,
    ratingCount: '980',
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=200&h=200&fit=crop',
    analysisScore: 9.5,
    analysisLabel: 'High'
  },
  {
    id: '5',
    name: 'Razer Kraken Kitty Edition Gaming Headset',
    shop: 'Razer Flagship',
    price: 159.90,
    sales: '850',
    sales30d: 45,
    rating: 4.7,
    ratingCount: '210',
    image: 'https://images.unsplash.com/photo-1612444530582-fc66183b16f7?w=200&h=200&fit=crop',
    analysisScore: 5.2,
    analysisLabel: 'Low'
  }
];

const ProductSearch: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [searchPages, setSearchPages] = useState(5);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [showToast, setShowToast] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [stats, setStats] = useState({
    total: 2450,
    avgPotential: 7.8,
    highPotential: 142,
    time: '2.4s'
  });

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    
    // Simulate API call
    setTimeout(() => {
      // Shuffle products to show "refresh"
      const shuffled = [...products].sort(() => Math.random() - 0.5);
      setProducts(shuffled);
      
      // Update stats randomly
      setStats({
        total: 2450 + Math.floor(Math.random() * 50),
        avgPotential: +(7.8 + (Math.random() * 0.4 - 0.2)).toFixed(1),
        highPotential: 142 + Math.floor(Math.random() * 10),
        time: (Math.random() * 1.5 + 1).toFixed(1) + 's'
      });

      setIsAnalyzing(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 1500);
  };

  return (
    <div className="flex h-full relative">
      {/* Toast Notification */}
      {showToast && (
        <div className="absolute top-6 right-6 z-50 animate-bounce-in">
          <div className="bg-emerald-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2">
            <CheckCircle size={20} />
            <span className="font-medium">Analysis Complete!</span>
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedProduct(null)}>
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden animate-scale-in" onClick={e => e.stopPropagation()}>
            <div className="flex h-64 relative">
              <img src={selectedProduct.image} className="w-1/2 object-cover" alt={selectedProduct.name} />
              <div className="w-1/2 p-6 flex flex-col">
                <div className="flex justify-between items-start">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    selectedProduct.analysisLabel === 'High' ? 'bg-green-100 text-green-700' : 
                    selectedProduct.analysisLabel === 'Med' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {selectedProduct.analysisLabel} Potential
                  </span>
                  <button onClick={() => setSelectedProduct(null)} className="text-slate-400 hover:text-slate-600">
                    <X size={24} />
                  </button>
                </div>
                <h2 className="text-lg font-bold text-slate-900 mt-2">{selectedProduct.name}</h2>
                <p className="text-slate-500 text-sm">{selectedProduct.shop}</p>
                
                <div className="mt-auto grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-slate-500 uppercase">Price</div>
                    <div className="font-mono font-bold text-xl">${selectedProduct.price}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 uppercase">Rating</div>
                    <div className="flex items-center font-bold text-xl">
                      {selectedProduct.rating} <Star size={16} className="text-yellow-400 fill-current ml-1" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <button onClick={() => setSelectedProduct(null)} className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-200 rounded-lg transition">Close</button>
              <button className="px-4 py-2 bg-primary-500 text-white font-medium hover:bg-primary-600 rounded-lg transition shadow-lg shadow-primary-500/30">View on Marketplace</button>
            </div>
          </div>
        </div>
      )}

      {/* Filters Sidebar */}
      <div className="w-72 bg-white border-r border-slate-200 flex flex-col overflow-y-auto hidden xl:flex">
        <div className="p-6 space-y-8">
            <div className="space-y-3">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">Target Region / Platform</label>
            <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-slate-400" />
                </span>
                <select className="block w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:ring-primary-500 focus:border-primary-500 outline-none">
                <option>Global Market</option>
                <option>North America (US/CA)</option>
                <option>Southeast Asia</option>
                <option>Europe (EU)</option>
                </select>
            </div>
            </div>

            <div className="space-y-3">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">Keywords</label>
            <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-slate-400" />
                </span>
                <input
                type="text"
                className="block w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:ring-primary-500 focus:border-primary-500 placeholder-slate-400 outline-none"
                placeholder="e.g. Wireless Earbuds"
                />
            </div>
            </div>

            <div className="space-y-6">
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">Search Pages</label>
                <span className="text-xs font-medium bg-primary-50 text-primary-600 px-2 py-0.5 rounded">1 - {searchPages}</span>
                </div>
                <input
                type="range"
                min="1"
                max="10"
                value={searchPages}
                onChange={(e) => setSearchPages(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                <span>1</span>
                <span>10</span>
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex justify-between items-center">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">Items / Page</label>
                <span className="text-xs font-medium bg-primary-50 text-primary-600 px-2 py-0.5 rounded">{itemsPerPage}</span>
                </div>
                <input
                type="range"
                min="10"
                max="100"
                step="10"
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                <span>10</span>
                <span>100</span>
                </div>
            </div>
            </div>

            <div className="space-y-3 pt-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">Filters</label>
            <label className="flex items-center space-x-3 cursor-pointer group">
                <input type="checkbox" className="form-checkbox h-4 w-4 text-primary-500 rounded border-slate-300 focus:ring-primary-500" />
                <span className="text-sm text-slate-600 group-hover:text-primary-600 transition">Exclude Pre-order</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer group">
                <input type="checkbox" defaultChecked className="form-checkbox h-4 w-4 text-primary-500 rounded border-slate-300 focus:ring-primary-500" />
                <span className="text-sm text-slate-600 group-hover:text-primary-600 transition">Verified Sellers Only</span>
            </label>
            </div>
        </div>
        
        <div className="p-6 border-t border-slate-100 bg-slate-50/50 mt-auto">
            <button 
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-4 rounded-lg shadow-lg shadow-primary-500/30 transition-all active:scale-[0.98] flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <TrendingUp size={20} />
                  <span>Analyze</span>
                </>
              )}
            </button>
            <p className="mt-3 text-center text-xs text-slate-400">
              {isAnalyzing ? 'Processing market data...' : 'Last update: Just now'}
            </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Loading Overlay */}
        {isAnalyzing && (
          <div className="absolute inset-0 z-40 bg-white/60 backdrop-blur-sm flex items-center justify-center">
             <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full border-4 border-slate-200 border-t-primary-500 animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <TrendingUp size={20} className="text-primary-500" />
                  </div>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">Analyzing Market Data</h3>
                <p className="text-slate-500">Crunching numbers from {itemsPerPage * searchPages} products...</p>
             </div>
          </div>
        )}

        {/* Header */}
        <header className="h-16 flex items-center justify-between px-8 bg-white border-b border-slate-200 flex-shrink-0">
          <div className="flex items-center space-x-2 text-sm text-slate-500">
            <span>Market Analysis</span>
            <ChevronRight size={16} />
            <span className="text-primary-600 font-medium">Wireless Earbuds</span>
          </div>
          <div className="xl:hidden">
             <button className="p-2 hover:bg-slate-100 rounded-md">
                 <Filter size={20} className="text-slate-500" />
             </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 scroll-smooth">
          <div className="max-w-7xl mx-auto space-y-6">
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-32 hover:border-primary-500/50 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Total Products</p>
                    <h3 className="text-2xl font-bold text-slate-800 mt-1">{stats.total.toLocaleString()}</h3>
                  </div>
                  <span className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <TrendingUp size={20} />
                  </span>
                </div>
                <div className="flex items-center text-xs text-green-600 font-medium">
                  <span className="mr-1">↑</span>
                  <span>+12% from last search</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-32 hover:border-primary-500/50 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Avg Potential</p>
                    <h3 className="text-2xl font-bold text-slate-800 mt-1">{stats.avgPotential}<span className="text-sm font-normal text-slate-400">/10</span></h3>
                  </div>
                  <span className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                    <Zap size={20} />
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2">
                  <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: `${stats.avgPotential * 10}%` }}></div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-32 hover:border-primary-500/50 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">High Potential</p>
                    <h3 className="text-2xl font-bold text-slate-800 mt-1">{stats.highPotential}</h3>
                  </div>
                  <span className="p-2 bg-green-50 text-green-600 rounded-lg">
                    <Star size={20} />
                  </span>
                </div>
                <div className="flex items-center text-xs text-slate-500 font-medium">
                  <span>Top 5% of results</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-32 hover:border-primary-500/50 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Analysis Time</p>
                    <h3 className="text-xl font-bold text-slate-800 mt-1">{stats.time}</h3>
                  </div>
                  <span className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                    <Clock size={20} />
                  </span>
                </div>
                <div className="flex items-center text-xs text-slate-500 font-medium">
                  <span className="mr-1">✓</span>
                  <span>Completed successfully</span>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="border-b border-slate-200 px-6 pt-4 flex items-center justify-between">
                <div className="flex space-x-8">
                  <button className="border-b-2 border-primary-500 py-4 px-1 text-sm font-medium text-primary-600 flex items-center space-x-2">
                    <SlidersHorizontal size={18} />
                    <span>Product List</span>
                  </button>
                  <button className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-slate-500 hover:text-slate-700 hover:border-slate-300 transition flex items-center space-x-2">
                    <TrendingUp size={18} />
                    <span>Data Analysis</span>
                  </button>
                </div>
                <div className="flex items-center space-x-2 pb-2">
                  <button className="p-2 text-slate-400 hover:text-primary-600 hover:bg-slate-100 rounded-lg transition" title="Filter Table">
                    <Filter size={20} />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-primary-600 hover:bg-slate-100 rounded-lg transition" title="Export CSV">
                    <Download size={20} />
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-16">
                        <input type="checkbox" className="form-checkbox h-4 w-4 text-primary-500 rounded border-slate-300" />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Product</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Price (USD)</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Sales</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Rating</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Analysis</th>
                      <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-slate-50 transition cursor-pointer" onClick={() => setSelectedProduct(product)}>
                        <td className="px-6 py-4 whitespace-nowrap" onClick={e => e.stopPropagation()}>
                          <input type="checkbox" className="form-checkbox h-4 w-4 text-primary-500 rounded border-slate-300" />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="h-12 w-12 flex-shrink-0 rounded-lg overflow-hidden border border-slate-200 bg-slate-100">
                              <img className="h-full w-full object-cover" src={product.image} alt={product.name} />
                            </div>
                            <div className="ml-4 max-w-xs">
                              <div className="text-sm font-medium text-slate-900 line-clamp-1 hover:text-primary-600 cursor-pointer transition">{product.name}</div>
                              <div className="text-xs text-slate-500 mt-0.5">{product.shop}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-slate-900">${product.price.toFixed(2)}</div>
                          {product.drop && <div className="text-xs text-green-600">{product.drop}</div>}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-slate-900">Sold {product.sales}</div>
                          <div className="text-xs text-slate-500">Last 30d: {product.sales30d}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-slate-900 mr-1">{product.rating}</span>
                            <Star size={14} className="text-yellow-400 fill-current" />
                            <span className="text-xs text-slate-400 ml-1">({product.ratingCount})</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${product.analysisLabel === 'High' ? 'bg-green-100 text-green-800' : 
                              product.analysisLabel === 'Med' ? 'bg-yellow-100 text-yellow-800' : 'bg-orange-100 text-orange-800'
                            }`}>
                            {product.analysisScore} {product.analysisLabel}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProduct(product);
                            }}
                            className="text-primary-600 hover:text-blue-700 bg-primary-50 hover:bg-primary-100 p-2 rounded-lg transition"
                          >
                            <Eye size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="bg-white px-4 py-3 border-t border-slate-200 sm:px-6">
                <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-700">
                        Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">250</span> results
                    </p>
                    <div className="flex space-x-2">
                         <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50">
                             Previous
                         </button>
                         <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50">
                             Next
                         </button>
                    </div>
                </div>
              </div>
            </div>
            
            <div className="h-10"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSearch;