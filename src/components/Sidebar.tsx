import React from 'react';
import { LayoutDashboard, Bot, Database, History, LogOut, ChevronRight, Headphones, Settings2 } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'bot-mgmt', label: '热线机器人管理', icon: Bot },
    { id: 'knowledge', label: '知识库管理', icon: Database },
    { id: 'human-mech', label: '人工机制管理', icon: Settings2 },
    { id: 'records', label: '对话记录管理', icon: History },
    { id: 'dashboard', label: '数据看板', icon: LayoutDashboard },
  ];

  return (
    <div className="w-64 h-full bg-white border-r border-slate-200 flex flex-col shadow-sm">
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center gap-3 text-brand-600 mb-1">
          <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center shadow-md shadow-brand-200">
            <Headphones size={18} className="text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-800">智能热线管理</span>
        </div>
        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider ml-11">AI Hotline Center</p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-all duration-200 group ${
              activeTab.startsWith(item.id)
                ? 'bg-brand-50 text-brand-700 font-semibold' 
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-3">
              <item.icon size={18} className={activeTab.startsWith(item.id) ? 'text-brand-600' : 'text-slate-400 group-hover:text-slate-600'} />
              <span className="text-sm">{item.label}</span>
            </div>
            {activeTab.startsWith(item.id) && <ChevronRight size={14} className="text-brand-400" />}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-brand-100 flex items-center justify-center text-xs font-bold text-brand-700 border border-brand-200">
            AD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-800 truncate">管理员</p>
            <p className="text-[10px] text-slate-400 truncate">admin@hotline.ai</p>
          </div>
          <button className="text-slate-300 hover:text-red-500 transition-colors">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
