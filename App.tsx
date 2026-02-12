import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ProductSearch from './pages/ProductSearch';
import AiInsights from './pages/AiInsights';
import CompetitorAnalysis from './pages/CompetitorAnalysis';
import DataAnalysis from './pages/DataAnalysis';
import { NavItem } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<NavItem>(NavItem.ProductSearch);

  const renderContent = () => {
    switch (activeTab) {
      case NavItem.ProductSearch:
        return <ProductSearch />;
      case NavItem.AiSuggestions:
        return <AiInsights />;
      case NavItem.CompetitorAnalysis:
        return <CompetitorAnalysis />;
      case NavItem.DataAnalysis:
        return <DataAnalysis />;
      default:
        return (
          <div className="flex items-center justify-center h-full text-slate-400">
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Coming Soon</h2>
                <p>The {activeTab} module is currently under development.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-hidden relative">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;