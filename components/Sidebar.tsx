import React from 'react';
import { LayoutDashboard, Search, BarChart2, Sparkles, Settings, ArrowLeftRight } from 'lucide-react';
import { NavItem } from '../types';

interface SidebarProps {
  activeTab: NavItem;
  setActiveTab: (tab: NavItem) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: NavItem.Dashboard, icon: LayoutDashboard, label: 'Dashboard' },
    { id: NavItem.ProductSearch, icon: Search, label: 'Product Search' },
    { id: NavItem.CompetitorAnalysis, icon: ArrowLeftRight, label: 'Competitor Analysis' },
    { id: NavItem.AiSuggestions, icon: Sparkles, label: 'AI Suggestions', badge: 'NEW' },
    { id: NavItem.DataAnalysis, icon: BarChart2, label: 'Data Analysis' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col z-20 h-full flex-shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-primary-500 flex items-center justify-center text-white">
            <BarChart2 size={20} />
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-900">Product Analytics</span>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
        <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Core Tools</div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors relative group ${
                isActive
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-primary-600'
              }`}
            >
              {isActive && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary-500 rounded-r" />}
              <Icon size={20} className={isActive ? 'text-primary-500' : 'text-slate-400 group-hover:text-primary-500'} />
              <span>{item.label}</span>
              {item.badge && (
                <span className="ml-auto bg-primary-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        <div className="pt-4 mt-4 border-t border-slate-100">
          <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">My Lists</p>
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded text-sm font-medium text-slate-600 hover:bg-slate-50">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            Shortlisted Q3
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded text-sm font-medium text-slate-600 hover:bg-slate-50">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            High Potential
          </button>
        </div>
      </nav>

      <div className="p-4 border-t border-slate-100">
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
          <img
            className="w-8 h-8 rounded-full border border-slate-200 object-cover"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="User Avatar"
          />
          <div className="flex-1 min-w-0 text-left">
            <p className="text-sm font-medium text-slate-900 truncate">Alex Morgan</p>
            <p className="text-xs text-slate-500 truncate">Pro Plan</p>
          </div>
          <Settings size={16} className="text-slate-400" />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;