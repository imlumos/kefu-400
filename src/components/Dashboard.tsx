import React from 'react';
import { TrendingUp, Users, CheckCircle, PhoneForwarded, BarChart2, AlertTriangle, Calendar, Download } from 'lucide-react';
import { DashboardStats } from '../types';

const Dashboard: React.FC = () => {
  const stats: DashboardStats = {
    inboundCalls: 12540,
    aiPickupRate: 0.98,
    resolutionRate: 0.72,
    transferRate: 0.24,
    hotTopics: [
      { topic: '退款进度查询', count: 3420 },
      { topic: '账号注销流程', count: 1250 },
      { topic: '物流异常反馈', count: 980 },
      { topic: '优惠券发放咨询', count: 760 }
    ],
    badCases: [
      { category: '语义理解偏差', count: 120 },
      { category: '知识库缺失', count: 85 },
      { category: '情绪识别误报', count: 45 }
    ]
  };

  return (
    <div className="h-full overflow-y-auto bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">数据看板</h1>
            <p className="text-sm text-slate-500 mt-1">实时监控智能热线系统的业务转化与服务质量</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
              <Calendar size={14} /> 最近 7 天
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-xl text-xs font-bold hover:bg-brand-700 shadow-md shadow-brand-100 transition-all">
              <Download size={14} /> 导出报表
            </button>
          </div>
        </header>

        {/* Top Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          {[
            { label: '总呼入量', value: stats.inboundCalls.toLocaleString(), icon: Users, color: 'text-brand-600', bg: 'bg-brand-50' },
            { label: 'AI 接起率', value: `${(stats.aiPickupRate * 100).toFixed(1)}%`, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: '独立解决率', value: `${(stats.resolutionRate * 100).toFixed(1)}%`, icon: CheckCircle, color: 'text-indigo-600', bg: 'bg-indigo-50' },
            { label: '转人工率', value: `${(stats.transferRate * 100).toFixed(1)}%`, icon: PhoneForwarded, color: 'text-orange-600', bg: 'bg-orange-50' },
          ].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2.5 rounded-xl ${item.bg} ${item.color}`}>
                  <item.icon size={22} />
                </div>
                <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-500 bg-emerald-50 px-1.5 py-0.5 rounded">
                  +12% ↑
                </div>
              </div>
              <div className="text-2xl font-bold text-slate-900 tracking-tight">{item.value}</div>
              <div className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Main Charts Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Hot Topics */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-1 h-4 bg-brand-600 rounded-full"></div>
                <h3 className="text-sm font-bold text-slate-800">知识库热点命中排行</h3>
              </div>
              <button className="text-[10px] font-bold text-brand-600 hover:underline">查看分析报告</button>
            </div>
            <div className="space-y-6">
              {stats.hotTopics.map((topic, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-slate-700 font-medium">{topic.topic}</span>
                    <span className="text-slate-400 font-bold font-mono">{topic.count} 次</span>
                  </div>
                  <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-brand-600 rounded-full transition-all duration-1000" 
                      style={{ width: `${(topic.count / stats.hotTopics[0].count) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bad Case Analysis */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-1 h-4 bg-orange-500 rounded-full"></div>
                <h3 className="text-sm font-bold text-slate-800">Bad Case 未命中归类</h3>
              </div>
              <button className="text-[10px] font-bold text-orange-600 hover:underline">优化知识库</button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {stats.badCases.map((item, i) => (
                <div key={i} className="flex items-center gap-5 p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-brand-100 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-sm font-bold text-slate-900 shadow-sm group-hover:bg-brand-600 group-hover:text-white transition-all">
                    {item.count}
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-bold text-slate-800">{item.category}</div>
                    <div className="text-[10px] text-slate-400 font-medium mt-1 uppercase tracking-wider">占比 {((item.count / 250) * 100).toFixed(1)}%</div>
                  </div>
                  <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 hover:text-brand-600 hover:border-brand-600 transition-all shadow-sm">
                    穿透详情
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
