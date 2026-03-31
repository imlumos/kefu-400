import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, UserCheck, Settings2, Save, Info } from 'lucide-react';

const HumanMechanism: React.FC = () => {
  const [config, setConfig] = useState({
    autoTransfer: true,
    missCount: 3,
    emotionThreshold: 0.8,
    keywords: ['投诉', '人工', '找人', '经理', '转接'],
    workingHours: { start: '09:00', end: '18:00' },
    fallbackMessage: '抱歉，当前人工客服忙，请稍后再试或留下您的联系方式。'
  });

  const [newKeyword, setNewKeyword] = useState('');

  const handleAddKeyword = () => {
    if (newKeyword.trim() && !config.keywords.includes(newKeyword.trim())) {
      setConfig({
        ...config,
        keywords: [...config.keywords, newKeyword.trim()]
      });
      setNewKeyword('');
    }
  };

  const handleRemoveKeyword = (kw: string) => {
    setConfig({
      ...config,
      keywords: config.keywords.filter(k => k !== kw)
    });
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">人工机制管理</h1>
        <p className="text-sm text-slate-500 mt-1">配置 AI 机器人转接人工坐席的触发逻辑与兜底策略</p>
      </header>

      <div className="space-y-6">
        {/* Trigger Logic */}
        <section className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-brand-100 text-brand-600 rounded-lg">
                <Settings2 size={20} />
              </div>
              <h3 className="font-bold text-slate-800">触发逻辑配置</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">启用自动转接</span>
              <button 
                onClick={() => setConfig({...config, autoTransfer: !config.autoTransfer})}
                className={`w-10 h-5 rounded-full transition-colors relative ${config.autoTransfer ? 'bg-brand-600' : 'bg-slate-200'}`}
              >
                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${config.autoTransfer ? 'left-6' : 'left-1'}`}></div>
              </button>
            </div>
          </div>
          
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  语义未命中阈值 <Info size={14} className="text-slate-400" />
                </label>
                <div className="flex items-center gap-3">
                  <input 
                    type="number" 
                    className="w-24 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none"
                    value={config.missCount}
                    onChange={e => setConfig({...config, missCount: parseInt(e.target.value)})}
                  />
                  <span className="text-sm text-slate-500">次连续未命中后转人工</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">情绪负面阈值</label>
                <input 
                  type="range" min="0" max="1" step="0.1"
                  className="w-full accent-brand-600"
                  value={config.emotionThreshold}
                  onChange={e => setConfig({...config, emotionThreshold: parseFloat(e.target.value)})}
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-bold">
                  <span>低敏感 (0.0)</span>
                  <span>当前: {config.emotionThreshold}</span>
                  <span>高敏感 (1.0)</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">关键词强转触发</label>
              <div className="flex flex-wrap gap-2 p-3 border border-slate-200 rounded-lg min-h-[100px]">
                {config.keywords.map((kw, i) => (
                  <span key={i} className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs flex items-center gap-1">
                    {kw}
                    <button onClick={() => handleRemoveKeyword(kw)} className="hover:text-red-500">×</button>
                  </span>
                ))}
                <div className="flex items-center gap-2 w-full mt-2">
                  <input 
                    type="text"
                    placeholder="输入新关键词..."
                    className="flex-1 border border-slate-200 rounded px-2 py-1 text-xs outline-none focus:border-brand-500"
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddKeyword()}
                  />
                  <button 
                    onClick={handleAddKeyword}
                    className="text-brand-600 text-xs font-bold px-2 py-1 border border-dashed border-brand-200 rounded hover:bg-brand-50 whitespace-nowrap"
                  >
                    + 添加
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Working Hours & Fallback */}
        <section className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
            <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
              <AlertTriangle size={20} />
            </div>
            <h3 className="font-bold text-slate-800">服务时间与兜底策略</h3>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="flex items-center gap-8">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">人工服务开始时间</label>
                <input 
                  type="time" 
                  className="border border-slate-200 rounded-lg px-3 py-2 text-sm" 
                  value={config.workingHours.start} 
                  onChange={e => setConfig({...config, workingHours: {...config.workingHours, start: e.target.value}})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">人工服务结束时间</label>
                <input 
                  type="time" 
                  className="border border-slate-200 rounded-lg px-3 py-2 text-sm" 
                  value={config.workingHours.end} 
                  onChange={e => setConfig({...config, workingHours: {...config.workingHours, end: e.target.value}})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">非服务时间/忙时兜底话术</label>
              <textarea 
                className="w-full border border-slate-200 rounded-lg p-4 text-sm min-h-[100px] focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none"
                value={config.fallbackMessage}
                onChange={e => setConfig({...config, fallbackMessage: e.target.value})}
              />
            </div>
          </div>
        </section>

        <div className="flex justify-end gap-3">
          <button className="px-6 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50">取消</button>
          <button className="px-6 py-2 rounded-lg bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 shadow-md shadow-brand-100 flex items-center gap-2">
            <Save size={18} /> 保存配置
          </button>
        </div>
      </div>
    </div>
  );
};

export default HumanMechanism;
