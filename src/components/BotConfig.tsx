import React, { useState } from 'react';
import { 
  Play, 
  Save, 
  MessageSquare, 
  Settings, 
  ShieldAlert, 
  Volume2, 
  ArrowLeft, 
  Send, 
  Edit3, 
  ChevronDown, 
  ChevronRight,
  History, 
  Info,
  MoreHorizontal, 
  Copy, 
  Maximize2, 
  Sparkles,
  Database,
  ToggleRight,
  Plus,
  Mic,
  Smile,
  Settings2,
  Trash2,
  Clock,
  Calendar,
  Users,
  AlertCircle,
  X
} from 'lucide-react';
import { BotConfig } from '../types';

interface BotConfigWorkbenchProps {
  bot: BotConfig;
  onBack: () => void;
}

const BotConfigWorkbench: React.FC<BotConfigWorkbenchProps> = ({ bot, onBack }) => {
  const [config, setConfig] = useState<BotConfig>(bot);
  const [testInput, setTestInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: string; content: string }[]>([
    { role: 'assistant', content: `嗨，大家好！我专注于为团队排忧解难，提升团队效率。` }
  ]);

  // Human Mechanism States
  const [humanConfig, setHumanConfig] = useState({
    autoTransfer: true, // 人工服务开关
    
    // 策略开关与配置
    strategyPrompt: {
      prompt: '你是一个转人工策略判断专家，请根据对话内容判断是否需要转人工。',
      model: 'gemini-3-flash-preview'
    },
    requestCountEnabled: true,
    requestCount: 2,
    
    missCountEnabled: true,
    missCount: 3,
    
    emotionEnabled: true,
    emotionThreshold: 0.8,
    
    keywordsEnabled: true,
    keywords: ['投诉', '人工', '找人', '经理', '转接'],
    
    // 人工服务时间设置
    serviceHours: {
      regular: {
        start: '09:00',
        end: '18:00',
        days: ['周一', '周二', '周三', '周四', '周五']
      },
      special: [
        { 
          id: '1', 
          name: '劳动节', 
          startDateTime: '2026-05-01T00:00:00', 
          endDateTime: '2026-05-03T23:59:59', 
          message: '节日期间人工客服休息，请留言。' 
        }
      ]
    },
    
    fallbackMessage: '抱歉，当前人工客服忙，请稍后再试或留下您的联系方式。',
    skillPrompt: {
      prompt: '你是一个客服技能组分配专家，请根据用户问题推荐最合适的技能组。',
      model: 'gemini-3-flash-preview'
    },
    skillGroups: [
      { id: '1', name: '售后服务组', description: '处理退换货、维修等售后问题' },
      { id: '2', name: '技术支持组', description: '处理产品使用、系统故障等技术问题' }
    ]
  });

  const [newKeyword, setNewKeyword] = useState('');
  const [isSpecialDateModalOpen, setIsSpecialDateModalOpen] = useState(false);
  const [editingSpecialDate, setEditingSpecialDate] = useState<any>(null);
  const [isSkillGroupModalOpen, setIsSkillGroupModalOpen] = useState(false);
  const [editingSkillGroup, setEditingSkillGroup] = useState<any>(null);
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);
  const [editingPromptType, setEditingPromptType] = useState<'strategy' | 'skill' | null>(null);
  const [tempPromptConfig, setTempPromptConfig] = useState({ prompt: '', model: 'gemini-3-flash-preview' });

  const models = [
    { id: 'gemini-3-flash-preview', name: 'Gemini 3 Flash' },
    { id: 'gemini-3.1-pro-preview', name: 'Gemini 3.1 Pro' },
    { id: 'gemini-3.1-flash-lite-preview', name: 'Gemini 3.1 Flash Lite' }
  ];

  const [expandedSections, setExpandedSections] = useState({
    strategy: true,
    time: true,
    skill: true
  });

  const handleAddKeyword = () => {
    if (newKeyword.trim() && !humanConfig.keywords.includes(newKeyword.trim())) {
      setHumanConfig({
        ...humanConfig,
        keywords: [...humanConfig.keywords, newKeyword.trim()]
      });
      setNewKeyword('');
    }
  };

  const handleRemoveKeyword = (kw: string) => {
    setHumanConfig({
      ...humanConfig,
      keywords: humanConfig.keywords.filter(k => k !== kw)
    });
  };

  const handleSend = () => {
    if (!testInput.trim()) return;
    setChatHistory([...chatHistory, { role: 'user', content: testInput }]);
    setTimeout(() => {
      setChatHistory(prev => [...prev, { role: 'assistant', content: '收到您的反馈，正在为您查询相关业务逻辑。' }]);
    }, 800);
    setTestInput('');
  };

  const suggestions = [
    '如何组织一次成功的团建活动？',
    '团队休假怎么安排更合理？',
    '日常事务处理有哪些小窍门？'
  ];

  return (
    <div className="flex flex-col h-full bg-slate-50 font-sans antialiased text-slate-900">
      {/* Header */}
      <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-600 rounded-lg shadow-sm flex items-center justify-center text-white">
              <Smile size={18} />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-slate-800">{config.name}</h2>
                <Edit3 size={12} className="text-slate-400 cursor-pointer hover:text-brand-600" />
              </div>
              <span className="text-[10px] text-slate-400 font-medium">ID: {config.id}</span>
            </div>
          </div>
          <div className="h-6 w-px bg-slate-200 mx-2"></div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-200 cursor-pointer hover:border-brand-600 transition-all group">
            <Database size={13} className="text-slate-500 group-hover:text-brand-600" />
            <span className="text-xs text-slate-600 group-hover:text-brand-600 font-medium">单 Agent (自主规划模式)</span>
            <ChevronDown size={12} className="text-slate-400" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 bg-amber-50 px-2 py-1 rounded-md border border-amber-100">
            <AlertCircle size={12} className="text-amber-500" />
            <span>草稿自动保存于 19:10:06</span>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors" title="历史版本">
              <History size={18} />
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors">
              <MoreHorizontal size={18} />
            </button>
          </div>
          <button className="px-5 py-1.5 text-xs font-bold bg-brand-600 text-white rounded-lg hover:bg-brand-700 shadow-sm transition-all active:scale-95">
            发布
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Column: Persona & Logic */}
        <div className="w-[30%] border-r border-slate-200 flex flex-col bg-white">
          <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-2">
              <MessageSquare size={14} className="text-brand-600" />
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">人设与回复逻辑</h3>
            </div>
            <div className="flex items-center gap-3 text-slate-400">
              <Copy size={14} className="cursor-pointer hover:text-brand-600" title="复制" />
              <Maximize2 size={14} className="cursor-pointer hover:text-brand-600" title="全屏" />
              <Sparkles size={14} className="cursor-pointer hover:text-brand-600" title="AI 优化" />
            </div>
          </div>
          <div className="flex-1 relative">
            <textarea 
              className="w-full h-full p-5 text-sm leading-relaxed text-slate-600 outline-none resize-none bg-white font-sans placeholder-slate-300"
              placeholder="请输入大模型系统提示词，定义机器人的角色、语气及业务约束..."
              value={config.systemPrompt}
              onChange={e => setConfig({...config, systemPrompt: e.target.value})}
            />
            <div className="absolute bottom-4 right-4 text-[10px] text-slate-300 font-medium">
              {config.systemPrompt.length} 字符
            </div>
          </div>
        </div>

        {/* Middle Column: Configuration Sections */}
        <div className="w-[35%] border-r border-slate-200 flex flex-col bg-slate-50 overflow-y-auto">
          <div className="p-5 pb-24 space-y-6">
            {/* Knowledge Section */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
                <div className="flex items-center gap-2">
                  <Database size={14} className="text-brand-600" />
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">知识库</h4>
                </div>
                <Settings size={14} className="text-slate-400 cursor-pointer hover:text-brand-600" />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100 hover:border-brand-600 transition-all cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg border border-slate-200 flex items-center justify-center text-brand-600 shadow-sm">
                      <Database size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">FAQ 知识库</p>
                      <p className="text-[10px] text-slate-400 mt-0.5 font-medium">包含 128 条常见问答对</p>
                    </div>
                  </div>
                  <Plus size={16} className="text-slate-300 group-hover:text-brand-600" />
                </div>
                <button className="w-full mt-3 py-2 border border-dashed border-slate-200 rounded-lg text-[11px] text-slate-400 hover:border-brand-600 hover:text-brand-600 transition-all flex items-center justify-center gap-1 font-medium">
                  <Plus size={12} /> 添加更多知识库
                </button>
              </div>
            </div>

            {/* Human Service Section */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
              <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/30 rounded-t-xl">
                <div className="flex items-center gap-2">
                  <ShieldAlert size={14} className="text-brand-600" />
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">人工服务</h4>
                  <div className="group relative">
                    <Info size={12} className="text-slate-400 cursor-help" />
                    <div className="absolute left-0 bottom-full mb-2 w-48 p-2 bg-slate-800 text-white text-[10px] rounded shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                      如开启则当前机器人支持人工服务，将按照配置策略进入人工客服。
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-400 font-medium">{humanConfig.autoTransfer ? '开启' : '关闭'}</span>
                  <button 
                    onClick={() => setHumanConfig({...humanConfig, autoTransfer: !humanConfig.autoTransfer})}
                    className={`w-9 h-5 rounded-full transition-colors relative ${humanConfig.autoTransfer ? 'bg-green-500' : 'bg-slate-200'}`}
                  >
                    <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${humanConfig.autoTransfer ? 'left-5' : 'left-1'}`}></div>
                  </button>
                </div>
              </div>
              
              {humanConfig.autoTransfer && (
                <div className="p-4 space-y-4 animate-in slide-in-from-top-2 duration-300">
                  {/* Sub-module 1: Strategy Configuration */}
                  <div className="border border-slate-100 rounded-xl overflow-hidden bg-white shadow-sm">
                    <div 
                      className="px-4 py-3 bg-slate-50/50 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-colors"
                      onClick={() => setExpandedSections({...expandedSections, strategy: !expandedSections.strategy})}
                    >
                      <div className="flex items-center gap-2 flex-1">
                        <Settings2 size={14} className="text-brand-600" />
                        <h5 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">1、转人工策略配置</h5>
                        <Settings 
                          size={13} 
                          className="text-slate-400 hover:text-brand-600 transition-colors cursor-pointer ml-auto mr-2" 
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingPromptType('strategy');
                            setTempPromptConfig(humanConfig.strategyPrompt);
                            setIsPromptModalOpen(true);
                          }}
                        />
                      </div>
                      {expandedSections.strategy ? <ChevronDown size={14} className="text-slate-400" /> : <ChevronRight size={14} className="text-slate-400" />}
                    </div>
                    {expandedSections.strategy && (
                      <div className="p-4 space-y-5 border-t border-slate-100 animate-in fade-in duration-200">
                        {/* Strategy 1: Request Count */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">会话请求转人工次数</label>
                              <div className="group relative">
                                <Info size={12} className="text-slate-400 cursor-help" />
                                <div className="absolute left-0 top-full mt-2 w-48 p-2 bg-slate-800 text-white text-[10px] rounded shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                                  意味用户在会话过程中多次说出要人工来服务的次数设置，累积到了次数即转人工
                                </div>
                              </div>
                            </div>
                            <button 
                              onClick={() => setHumanConfig({...humanConfig, requestCountEnabled: !humanConfig.requestCountEnabled})}
                              className={`w-7 h-4 rounded-full transition-colors relative ${humanConfig.requestCountEnabled ? 'bg-brand-600' : 'bg-slate-200'}`}
                            >
                              <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${humanConfig.requestCountEnabled ? 'left-3.5' : 'left-0.5'}`}></div>
                            </button>
                          </div>
                          {humanConfig.requestCountEnabled && (
                            <div className="flex items-center gap-4 animate-in fade-in duration-200">
                              <input 
                                type="range" min="1" max="5" step="1"
                                className="flex-1 accent-brand-600 h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                                value={humanConfig.requestCount}
                                onChange={e => setHumanConfig({...humanConfig, requestCount: parseInt(e.target.value)})}
                              />
                              <span className="text-[11px] text-brand-600 font-bold w-8">{humanConfig.requestCount}次</span>
                            </div>
                          )}
                        </div>

                        <div className="h-px bg-slate-100"></div>

                        {/* Strategy 2: Miss Count */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">知识未命中阈值</label>
                              <div className="group relative">
                                <Info size={12} className="text-slate-400 cursor-help" />
                                <div className="absolute left-0 top-full mt-2 w-48 p-2 bg-slate-800 text-white text-[10px] rounded shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                                  即现在的未命中阈值，按次数限制
                                </div>
                              </div>
                            </div>
                            <button 
                              onClick={() => setHumanConfig({...humanConfig, missCountEnabled: !humanConfig.missCountEnabled})}
                              className={`w-7 h-4 rounded-full transition-colors relative ${humanConfig.missCountEnabled ? 'bg-brand-600' : 'bg-slate-200'}`}
                            >
                              <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${humanConfig.missCountEnabled ? 'left-3.5' : 'left-0.5'}`}></div>
                            </button>
                          </div>
                          {humanConfig.missCountEnabled && (
                            <div className="flex items-center gap-4 animate-in fade-in duration-200">
                              <input 
                                type="range" min="1" max="10" step="1"
                                className="flex-1 accent-brand-600 h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                                value={humanConfig.missCount}
                                onChange={e => setHumanConfig({...humanConfig, missCount: parseInt(e.target.value)})}
                              />
                              <span className="text-[11px] text-brand-600 font-bold w-8">{humanConfig.missCount}次</span>
                            </div>
                          )}
                        </div>

                        <div className="h-px bg-slate-100"></div>

                        {/* Strategy 3: Emotion */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">情绪负面阈值</label>
                              <div className="group relative">
                                <Info size={12} className="text-slate-400 cursor-help" />
                                <div className="absolute left-0 top-full mt-2 w-48 p-2 bg-slate-800 text-white text-[10px] rounded shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                                  当识别到用户情绪极度负面时，优先转人工处理。
                                </div>
                              </div>
                            </div>
                            <button 
                              onClick={() => setHumanConfig({...humanConfig, emotionEnabled: !humanConfig.emotionEnabled})}
                              className={`w-7 h-4 rounded-full transition-colors relative ${humanConfig.emotionEnabled ? 'bg-brand-600' : 'bg-slate-200'}`}
                            >
                              <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${humanConfig.emotionEnabled ? 'left-3.5' : 'left-0.5'}`}></div>
                            </button>
                          </div>
                          {humanConfig.emotionEnabled && (
                            <div className="flex items-center gap-4 animate-in fade-in duration-200">
                              <input 
                                type="range" min="0" max="1" step="0.1"
                                className="flex-1 accent-amber-500 h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                                value={humanConfig.emotionThreshold}
                                onChange={e => setHumanConfig({...humanConfig, emotionThreshold: parseFloat(e.target.value)})}
                              />
                              <span className="text-[11px] text-amber-600 font-bold w-8">{humanConfig.emotionThreshold}</span>
                            </div>
                          )}
                        </div>

                        <div className="h-px bg-slate-100"></div>

                        {/* Strategy 4: Keywords */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wide">关键词强转</label>
                              <div className="group relative">
                                <Info size={12} className="text-slate-400 cursor-help" />
                                <div className="absolute left-0 top-full mt-2 w-48 p-2 bg-slate-800 text-white text-[10px] rounded shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                                  当用户输入包含以下关键词时，立即触发转人工。
                                </div>
                              </div>
                            </div>
                            <button 
                              onClick={() => setHumanConfig({...humanConfig, keywordsEnabled: !humanConfig.keywordsEnabled})}
                              className={`w-7 h-4 rounded-full transition-colors relative ${humanConfig.keywordsEnabled ? 'bg-brand-600' : 'bg-slate-200'}`}
                            >
                              <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${humanConfig.keywordsEnabled ? 'left-3.5' : 'left-0.5'}`}></div>
                            </button>
                          </div>
                          {humanConfig.keywordsEnabled && (
                            <div className="flex flex-wrap gap-2 p-3 border border-slate-200 rounded-lg bg-slate-50/50 animate-in fade-in duration-200">
                              {humanConfig.keywords.map((kw, i) => (
                                <span key={i} className="px-2 py-1 bg-white text-slate-500 rounded-md text-[10px] border border-slate-200 flex items-center gap-1.5 group shadow-sm">
                                  {kw}
                                  <Trash2 
                                    size={10} 
                                    className="cursor-pointer hover:text-red-500 transition-colors" 
                                    onClick={() => handleRemoveKeyword(kw)}
                                  />
                                </span>
                              ))}
                              <div className="flex items-center gap-1 flex-1 min-w-[80px]">
                                <input 
                                  type="text"
                                  placeholder="添加..."
                                  className="w-full bg-transparent text-[10px] outline-none placeholder-slate-300"
                                  value={newKeyword}
                                  onChange={(e) => setNewKeyword(e.target.value)}
                                  onKeyDown={(e) => e.key === 'Enter' && handleAddKeyword()}
                                />
                                {newKeyword && <Plus size={12} className="text-brand-600 cursor-pointer" onClick={handleAddKeyword} />}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Sub-module 2: Service Hours */}
                  <div className="border border-slate-100 rounded-xl overflow-hidden bg-white shadow-sm">
                    <div 
                      className="px-4 py-3 bg-slate-50/50 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-colors"
                      onClick={() => setExpandedSections({...expandedSections, time: !expandedSections.time})}
                    >
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-brand-600" />
                        <h5 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">2、人工服务时间设置</h5>
                      </div>
                      {expandedSections.time ? <ChevronDown size={14} className="text-slate-400" /> : <ChevronRight size={14} className="text-slate-400" />}
                    </div>
                    {expandedSections.time && (
                      <div className="p-4 space-y-6 border-t border-slate-100 animate-in fade-in duration-200">
                        {/* Regular Hours */}
                        <div className="space-y-4 p-4 bg-slate-50/50 rounded-xl border border-slate-100">
                          <div className="flex items-center justify-between">
                            <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">常规人工服务时间</label>
                            <div className="flex gap-1">
                              {['一', '二', '三', '四', '五', '六', '日'].map(d => (
                                <button 
                                  key={d}
                                  className={`w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold transition-all ${
                                    humanConfig.serviceHours.regular.days.includes(`周${d}`) 
                                      ? 'bg-brand-600 text-white shadow-sm' 
                                      : 'bg-white text-slate-400 border border-slate-200 hover:border-brand-600'
                                  }`}
                                  onClick={() => {
                                    const day = `周${d}`;
                                    const currentDays = humanConfig.serviceHours.regular.days;
                                    const nextDays = currentDays.includes(day) 
                                      ? currentDays.filter(x => x !== day)
                                      : [...currentDays, day];
                                    setHumanConfig({
                                      ...humanConfig,
                                      serviceHours: {
                                        ...humanConfig.serviceHours,
                                        regular: { ...humanConfig.serviceHours.regular, days: nextDays }
                                      }
                                    });
                                  }}
                                >
                                  {d}
                                </button>
                              ))}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[10px] text-slate-400 font-bold uppercase mb-1.5">开始时间</label>
                              <input 
                                type="time" 
                                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-brand-600 bg-white" 
                                value={humanConfig.serviceHours.regular.start} 
                                onChange={e => setHumanConfig({
                                  ...humanConfig, 
                                  serviceHours: {
                                    ...humanConfig.serviceHours,
                                    regular: { ...humanConfig.serviceHours.regular, start: e.target.value }
                                  }
                                })}
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] text-slate-400 font-bold uppercase mb-1.5">结束时间</label>
                              <input 
                                type="time" 
                                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-brand-600 bg-white" 
                                value={humanConfig.serviceHours.regular.end} 
                                onChange={e => setHumanConfig({
                                  ...humanConfig, 
                                  serviceHours: {
                                    ...humanConfig.serviceHours,
                                    regular: { ...humanConfig.serviceHours.regular, end: e.target.value }
                                  }
                                })}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Special Dates */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">节假日特殊日期维护</label>
                            <button 
                              className="text-[10px] text-brand-600 hover:underline flex items-center gap-0.5 font-bold"
                              onClick={() => {
                                setEditingSpecialDate({
                                  id: Date.now().toString(),
                                  name: '',
                                  startDateTime: new Date().toISOString().slice(0, 19),
                                  endDateTime: new Date().toISOString().slice(0, 19),
                                  message: ''
                                });
                                setIsSpecialDateModalOpen(true);
                              }}
                            >
                              <Plus size={10} /> 新增日期
                            </button>
                          </div>
                          <div className="space-y-2">
                            {humanConfig.serviceHours.special.map(special => (
                              <div key={special.id} className="p-3 border border-slate-100 rounded-xl bg-white shadow-sm hover:border-brand-600 transition-all group">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-2">
                                    <Calendar size={12} className="text-brand-600" />
                                    <span className="text-xs font-bold text-slate-700">{special.name || '未命名日期'}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <button 
                                      className="p-1 text-slate-400 hover:text-brand-600 transition-colors"
                                      onClick={() => {
                                        setEditingSpecialDate(special);
                                        setIsSpecialDateModalOpen(true);
                                      }}
                                    >
                                      <Edit3 size={12} />
                                    </button>
                                    <button 
                                      className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                                      onClick={() => {
                                        setHumanConfig({
                                          ...humanConfig,
                                          serviceHours: {
                                            ...humanConfig.serviceHours,
                                            special: humanConfig.serviceHours.special.filter(s => s.id !== special.id)
                                          }
                                        });
                                      }}
                                    >
                                      <Trash2 size={12} />
                                    </button>
                                  </div>
                                </div>
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2 text-[10px] text-slate-500">
                                    <span className="w-8 text-slate-400">开始:</span>
                                    <span>{special.startDateTime.replace('T', ' ')}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-[10px] text-slate-500">
                                    <span className="w-8 text-slate-400">结束:</span>
                                    <span>{special.endDateTime.replace('T', ' ')}</span>
                                  </div>
                                  {special.message && (
                                    <div className="mt-2 text-[10px] text-slate-400 bg-slate-50 p-1.5 rounded border border-slate-100 italic">
                                      "{special.message}"
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                            {humanConfig.serviceHours.special.length === 0 && (
                              <div className="text-center py-6 border border-dashed border-slate-200 rounded-xl">
                                <p className="text-[10px] text-slate-400">暂无特殊日期维护</p>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="space-y-3 pt-2">
                          <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wide">通用兜底回复话术</label>
                          <textarea 
                            className="w-full border border-slate-200 rounded-lg p-3 text-xs min-h-[80px] outline-none focus:border-brand-600 bg-white leading-relaxed"
                            placeholder="当人工客服不在线或忙碌时..."
                            value={humanConfig.fallbackMessage}
                            onChange={e => setHumanConfig({...humanConfig, fallbackMessage: e.target.value})}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Sub-module 3: Skill Groups */}
                  <div className="border border-slate-100 rounded-xl overflow-hidden bg-white shadow-sm">
                    <div 
                      className="px-4 py-3 bg-slate-50/50 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-colors"
                      onClick={() => setExpandedSections({...expandedSections, skill: !expandedSections.skill})}
                    >
                      <div className="flex items-center gap-2 flex-1">
                        <Users size={14} className="text-brand-600" />
                        <h5 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">3、客服技能组维护</h5>
                        <Settings 
                          size={13} 
                          className="text-slate-400 hover:text-brand-600 transition-colors cursor-pointer ml-auto mr-2" 
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingPromptType('skill');
                            setTempPromptConfig(humanConfig.skillPrompt);
                            setIsPromptModalOpen(true);
                          }}
                        />
                      </div>
                      {expandedSections.skill ? <ChevronDown size={14} className="text-slate-400" /> : <ChevronRight size={14} className="text-slate-400" />}
                    </div>
                    {expandedSections.skill && (
                      <div className="p-4 space-y-4 border-t border-slate-100 animate-in fade-in duration-200">
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">技能组维护</label>
                          <button 
                            className="text-[10px] text-brand-600 hover:underline flex items-center gap-0.5 font-bold"
                            onClick={() => {
                              setEditingSkillGroup({ id: '', name: '', description: '' });
                              setIsSkillGroupModalOpen(true);
                            }}
                          >
                            <Plus size={10} /> 新增
                          </button>
                        </div>
                        <div className="space-y-2">
                          {humanConfig.skillGroups.map(group => (
                            <div key={group.id} className="p-3 border border-slate-100 rounded-lg bg-slate-50/50 hover:border-brand-600 transition-all group">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Users size={12} className="text-slate-400" />
                                  <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-mono text-slate-400 bg-slate-200/50 px-1 rounded">ID: {group.id}</span>
                                    <span className="text-xs font-bold text-slate-700">{group.name}</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Edit3 
                                    size={10} 
                                    className="text-slate-400 cursor-pointer hover:text-brand-600" 
                                    onClick={() => {
                                      setEditingSkillGroup(group);
                                      setIsSkillGroupModalOpen(true);
                                    }}
                                  />
                                  <Trash2 
                                    size={10} 
                                    className="text-slate-400 cursor-pointer hover:text-red-500" 
                                    onClick={() => {
                                      setHumanConfig({
                                        ...humanConfig,
                                        skillGroups: humanConfig.skillGroups.filter(g => g.id !== group.id)
                                      });
                                    }}
                                  />
                                </div>
                              </div>
                              <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">{group.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Preview & Debug */}
        <div className="flex-1 flex flex-col bg-white">
          <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-2">
              <Play size={14} className="text-green-600" />
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">预览与调试</h3>
            </div>
            <div className="flex items-center gap-4 text-slate-400">
              <div className="flex items-center gap-1.5 cursor-pointer hover:text-brand-600 transition-colors">
                <History size={15} />
                <span className="text-[11px] font-medium">历史记录</span>
              </div>
              <Settings size={15} className="cursor-pointer hover:text-brand-600" />
              <Maximize2 size={15} className="cursor-pointer hover:text-brand-600" />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center bg-slate-50/30">
            <div className="w-full max-w-lg space-y-6">
              {chatHistory.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                  <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center shadow-sm ${
                      msg.role === 'user' ? 'bg-brand-600 text-white' : 'bg-white border border-slate-200 text-brand-600'
                    }`}>
                      {msg.role === 'user' ? <Users size={14} /> : <Smile size={14} />}
                    </div>
                    <div className={`rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                      msg.role === 'user' 
                        ? 'bg-brand-600 text-white' 
                        : 'bg-white text-slate-600 border border-slate-100'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-slate-200 bg-white">
            <div className="max-w-2xl mx-auto">
              <div className="flex flex-wrap gap-2 mb-4 justify-center">
                {suggestions.map((s, i) => (
                  <button 
                    key={i}
                    onClick={() => {
                      setTestInput(s);
                      setTimeout(handleSend, 100);
                    }}
                    className="px-3 py-1.5 text-[10px] text-slate-500 bg-slate-50 border border-slate-200 rounded-full hover:border-brand-600 hover:text-brand-600 transition-all shadow-sm active:scale-95"
                  >
                    {s}
                  </button>
                ))}
              </div>
              <div className="relative">
                <input 
                  type="text" 
                  className="w-full border border-slate-200 rounded-xl pl-4 pr-24 py-3 text-sm focus:ring-2 focus:ring-brand-600/20 focus:border-brand-600 outline-none transition-all bg-slate-50/50 placeholder-slate-300"
                  placeholder="输入问题，与 AI 机器人开始对话..."
                  value={testInput}
                  onChange={e => setTestInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 text-slate-400">
                  <Sparkles size={18} className="cursor-pointer hover:text-brand-600" />
                  <Mic size={18} className="cursor-pointer hover:text-slate-600" />
                  <div className="w-px h-4 bg-slate-200 mx-1"></div>
                  <Send 
                    size={18} 
                    className={`cursor-pointer transition-colors ${testInput ? 'text-brand-600' : 'text-slate-300'}`} 
                    onClick={handleSend}
                  />
                </div>
              </div>
              <p className="text-[10px] text-center text-slate-400 mt-2 font-medium">内容由 AI 生成，无法确保真实准确，仅供参考。</p>
            </div>
          </div>
        </div>
      </div>

      {/* Special Date Modal */}
      {isSpecialDateModalOpen && editingSpecialDate && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="text-sm font-bold text-slate-800">维护特殊日期</h3>
              <button 
                onClick={() => setIsSpecialDateModalOpen(false)}
                className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-400 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-2">日期名称</label>
                <input 
                  type="text" 
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-600 bg-slate-50/50 transition-all"
                  placeholder="例如：国庆节、公司团建"
                  value={editingSpecialDate.name}
                  onChange={e => setEditingSpecialDate({ ...editingSpecialDate, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-2">开始时间 (几号几点几分几秒)</label>
                  <input 
                    type="datetime-local" 
                    step="1"
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-600 bg-slate-50/50 transition-all"
                    value={editingSpecialDate.startDateTime}
                    onChange={e => setEditingSpecialDate({ ...editingSpecialDate, startDateTime: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-2">结束时间 (几号几点几分几秒)</label>
                  <input 
                    type="datetime-local" 
                    step="1"
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-600 bg-slate-50/50 transition-all"
                    value={editingSpecialDate.endDateTime}
                    onChange={e => setEditingSpecialDate({ ...editingSpecialDate, endDateTime: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-2">特殊回复话术</label>
                <textarea 
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm min-h-[100px] outline-none focus:border-brand-600 bg-slate-50/50 transition-all leading-relaxed"
                  placeholder="该时段内人工不可用时的回复..."
                  value={editingSpecialDate.message}
                  onChange={e => setEditingSpecialDate({ ...editingSpecialDate, message: e.target.value })}
                />
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
              <button 
                onClick={() => setIsSpecialDateModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-700 transition-colors"
              >
                取消
              </button>
              <button 
                className="px-6 py-2 bg-brand-600 text-white text-xs font-bold rounded-xl hover:bg-brand-700 shadow-lg shadow-brand-600/20 transition-all active:scale-95"
                onClick={() => {
                  const exists = humanConfig.serviceHours.special.find(s => s.id === editingSpecialDate.id);
                  let nextSpecial;
                  if (exists) {
                    nextSpecial = humanConfig.serviceHours.special.map(s => s.id === editingSpecialDate.id ? editingSpecialDate : s);
                  } else {
                    nextSpecial = [...humanConfig.serviceHours.special, editingSpecialDate];
                  }
                  setHumanConfig({
                    ...humanConfig,
                    serviceHours: {
                      ...humanConfig.serviceHours,
                      special: nextSpecial
                    }
                  });
                  setIsSpecialDateModalOpen(false);
                }}
              >
                保存配置
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Skill Group Modal */}
      {isSkillGroupModalOpen && editingSkillGroup && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-300">
            <div className="px-6 py-5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-600/10 rounded-2xl flex items-center justify-center text-brand-600">
                  <Users size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">客服技能组维护</h3>
                  <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Skill Group Configuration</p>
                </div>
              </div>
              <button 
                onClick={() => setIsSkillGroupModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200 text-slate-400 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-2">客服组ID</label>
                <input 
                  type="text" 
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-600 bg-slate-50/50 transition-all"
                  placeholder="例如：group_001"
                  value={editingSkillGroup.id}
                  onChange={e => setEditingSkillGroup({ ...editingSkillGroup, id: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-2">客服组名称</label>
                <input 
                  type="text" 
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-600 bg-slate-50/50 transition-all"
                  placeholder="例如：售前咨询组"
                  value={editingSkillGroup.name}
                  onChange={e => setEditingSkillGroup({ ...editingSkillGroup, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-2">客服组工作方向介绍</label>
                <textarea 
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm min-h-[100px] outline-none focus:border-brand-600 bg-slate-50/50 transition-all leading-relaxed"
                  placeholder="描述该技能组的主要职责和处理范围..."
                  value={editingSkillGroup.description}
                  onChange={e => setEditingSkillGroup({ ...editingSkillGroup, description: e.target.value })}
                />
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
              <button 
                onClick={() => setIsSkillGroupModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-700 transition-colors"
              >
                取消
              </button>
              <button 
                className="px-6 py-2 bg-brand-600 text-white text-xs font-bold rounded-xl hover:bg-brand-700 shadow-lg shadow-brand-600/20 transition-all active:scale-95"
                onClick={() => {
                  if (!editingSkillGroup.id || !editingSkillGroup.name) {
                    // Basic validation could be added here
                    return;
                  }
                  
                  const isEdit = humanConfig.skillGroups.some(g => g.id === editingSkillGroup.id);
                  let nextGroups;
                  
                  // If we are editing an existing ID (not recommended to change ID, but if user does, we need to handle it)
                  // For now, let's assume ID is the unique key.
                  if (isEdit) {
                    nextGroups = humanConfig.skillGroups.map(g => g.id === editingSkillGroup.id ? editingSkillGroup : g);
                  } else {
                    nextGroups = [...humanConfig.skillGroups, editingSkillGroup];
                  }
                  
                  setHumanConfig({
                    ...humanConfig,
                    skillGroups: nextGroups
                  });
                  setIsSkillGroupModalOpen(false);
                }}
              >
                保存配置
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Prompt Configuration Modal */}
      {isPromptModalOpen && editingPromptType && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[110] flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-300">
            <div className="px-6 py-5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-600/10 rounded-2xl flex items-center justify-center text-brand-600">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">
                    {editingPromptType === 'strategy' ? '转人工策略提示词维护' : '客服技能组分配提示词维护'}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Prompt & Model Configuration</p>
                </div>
              </div>
              <button 
                onClick={() => setIsPromptModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200 text-slate-400 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-2">选择模型</label>
                <select 
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-600 bg-slate-50/50 transition-all appearance-none cursor-pointer"
                  value={tempPromptConfig.model}
                  onChange={e => setTempPromptConfig({ ...tempPromptConfig, model: e.target.value })}
                >
                  {models.map(m => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-2">提示词内容 (Prompt)</label>
                <textarea 
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm min-h-[200px] outline-none focus:border-brand-600 bg-slate-50/50 transition-all leading-relaxed"
                  placeholder="编写提示词以引导模型进行判断或分配..."
                  value={tempPromptConfig.prompt}
                  onChange={e => setTempPromptConfig({ ...tempPromptConfig, prompt: e.target.value })}
                />
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
              <button 
                onClick={() => setIsPromptModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-700 transition-colors"
              >
                取消
              </button>
              <button 
                className="px-6 py-2 bg-brand-600 text-white text-xs font-bold rounded-xl hover:bg-brand-700 shadow-lg shadow-brand-600/20 transition-all active:scale-95"
                onClick={() => {
                  if (editingPromptType === 'strategy') {
                    setHumanConfig({ ...humanConfig, strategyPrompt: tempPromptConfig });
                  } else {
                    setHumanConfig({ ...humanConfig, skillPrompt: tempPromptConfig });
                  }
                  setIsPromptModalOpen(false);
                }}
              >
                保存配置
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BotConfigWorkbench;
