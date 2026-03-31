import React, { useState } from 'react';
import { Plus, Bot, ChevronRight, Activity, MessageSquare, MoreVertical } from 'lucide-react';
import { BotConfig } from '../types';

interface BotManagementProps {
  onSelectBot: (bot: BotConfig) => void;
}

const BotManagement: React.FC<BotManagementProps> = ({ onSelectBot }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBotName, setNewBotName] = useState('');
  const [newBotModel, setNewBotModel] = useState('gemini-3-flash-preview');
  const [bots, setBots] = useState<BotConfig[]>([
    {
      id: '1',
      name: '售后咨询机器人',
      model: 'gemini-3-flash-preview',
      systemPrompt: '你是一个专业的售后客服...',
      transferStrategy: { missCount: 3, emotionThreshold: 0.8 }
    },
    {
      id: '2',
      name: '物流查询助手',
      model: 'gemini-3.1-pro-preview',
      systemPrompt: '专注物流轨迹查询与异常处理...',
      transferStrategy: { missCount: 2, emotionThreshold: 0.7 }
    },
    {
      id: '3',
      name: 'VIP 专属热线',
      model: 'gemini-3.1-pro-preview',
      systemPrompt: '为 VIP 客户提供高优先级服务...',
      transferStrategy: { missCount: 1, emotionThreshold: 0.6 }
    }
  ]);

  const handleCreateBot = () => {
    if (!newBotName.trim()) return;
    const newBot: BotConfig = {
      id: Date.now().toString(),
      name: newBotName,
      model: newBotModel,
      systemPrompt: '请在此输入系统提示词...',
      transferStrategy: { missCount: 3, emotionThreshold: 0.8 }
    };
    setBots([...bots, newBot]);
    setNewBotName('');
    setIsModalOpen(false);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">热线机器人管理</h1>
          <p className="text-sm text-slate-500 mt-1">管理并配置您的 AI 热线客服机器人</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-brand-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-brand-700 transition-all shadow-md shadow-brand-100 text-sm font-medium"
        >
          <Plus size={18} /> 创建新的机器人
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bots.map(bot => (
          <div 
            key={bot.id}
            onClick={() => onSelectBot(bot)}
            className="bg-white border border-slate-200 rounded-xl p-6 hover:border-brand-300 hover:shadow-xl hover:shadow-slate-200/50 transition-all cursor-pointer group relative"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                <Bot size={24} />
              </div>
              <button className="text-slate-400 hover:text-slate-600 p-1">
                <MoreVertical size={18} />
              </button>
            </div>
            
            <h3 className="text-lg font-bold text-slate-900 mb-1">{bot.name}</h3>
            <p className="text-xs text-slate-400 mb-4 flex items-center gap-1">
              <Activity size={12} /> {bot.model}
            </p>
            
            <div className="flex items-center gap-4 py-3 border-y border-slate-50 mb-4">
              <div className="flex-1">
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">转人工阈值</p>
                <p className="text-sm font-semibold text-slate-700">{bot.transferStrategy.missCount}次未命中</p>
              </div>
              <div className="w-px h-8 bg-slate-100"></div>
              <div className="flex-1">
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">情绪敏感度</p>
                <p className="text-sm font-semibold text-slate-700">{bot.transferStrategy.emotionThreshold}</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-brand-600 text-sm font-medium">
              <span className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                进入配置 <ChevronRight size={16} />
              </span>
              <div className="flex items-center gap-1 text-slate-400">
                <MessageSquare size={14} />
                <span className="text-xs">0 会话</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Bot Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">创建新机器人</h3>
              <p className="text-sm text-slate-500">为您的业务创建一个新的 AI 客服助手</p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">机器人名称</label>
                <input 
                  type="text" 
                  value={newBotName}
                  onChange={(e) => setNewBotName(e.target.value)}
                  placeholder="例如：售后咨询助手"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">基础模型</label>
                <select 
                  value={newBotModel}
                  onChange={(e) => setNewBotModel(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all bg-white"
                >
                  <option value="gemini-3-flash-preview">gemini-3-flash-preview</option>
                  <option value="gemini-3.1-pro-preview">gemini-3.1-pro-preview</option>
                </select>
              </div>
            </div>
            <div className="p-6 bg-slate-50 flex justify-end gap-3">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-700 transition-colors"
              >
                取消
              </button>
              <button 
                onClick={handleCreateBot}
                className="px-6 py-2 bg-brand-600 text-white text-sm font-bold rounded-lg hover:bg-brand-700 shadow-md shadow-brand-100 transition-all"
              >
                立即创建
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BotManagement;
