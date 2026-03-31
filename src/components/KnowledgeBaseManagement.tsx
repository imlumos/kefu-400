import React, { useState } from 'react';
import { Search, Upload, Plus, Edit2, Trash2, FileSpreadsheet, Filter } from 'lucide-react';
import { FAQItem } from '../types';

const KnowledgeBaseManagement: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [newCategory, setNewCategory] = useState('通用知识');
  const [searchQuery, setSearchQuery] = useState('');
  const [faqs, setFaqs] = useState<FAQItem[]>([
    {
      id: '1',
      question: '如何申请退款？',
      similarQuestions: ['退款流程是什么', '我想退货', '怎么拿回我的钱'],
      answer: '您可以通过APP订单详情页点击“申请售后”进行退款申请，审核通过后原路退回。',
      category: '售后服务',
      updateTime: '2024-03-15 10:00'
    },
    {
      id: '2',
      question: '配送费怎么计算？',
      similarQuestions: ['运费多少', '满多少包邮'],
      answer: '单笔订单满99元免运费，不足99元收取6元基础运费。',
      category: '物流相关',
      updateTime: '2024-03-14 15:30'
    }
  ]);

  const handleAddFaq = () => {
    if (!newQuestion.trim() || !newAnswer.trim()) return;
    const newFaq: FAQItem = {
      id: Date.now().toString(),
      question: newQuestion,
      similarQuestions: [],
      answer: newAnswer,
      category: newCategory,
      updateTime: new Date().toLocaleString()
    };
    setFaqs([newFaq, ...faqs]);
    setNewQuestion('');
    setNewAnswer('');
    setIsModalOpen(false);
  };

  return (
    <div className="h-full flex flex-col bg-slate-50">
      <header className="p-8 bg-white border-b border-slate-200">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">知识库管理</h1>
            <p className="text-sm text-slate-500 mt-1">维护标准问答对，为 AI 机器人提供业务知识支撑</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 text-sm font-medium border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors">
              <FileSpreadsheet size={16} className="text-slate-400" /> 下载模板
            </button>
            <button className="flex items-center gap-2 text-sm font-medium border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors">
              <Upload size={16} className="text-slate-400" /> 批量导入
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 text-sm font-medium bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 shadow-md shadow-brand-100 transition-all"
            >
              <Plus size={18} /> 新增知识库
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="搜索标准问、相似问或答案..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50">
            <Filter size={16} className="text-slate-400" /> 筛选类目
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-auto p-8">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-[11px] text-slate-400 uppercase font-bold tracking-widest">
                <th className="px-6 py-4 font-bold">标准问 (Q)</th>
                <th className="px-6 py-4 font-bold">相似问 (S)</th>
                <th className="px-6 py-4 font-bold">答案 (A)</th>
                <th className="px-6 py-4 font-bold">类目</th>
                <th className="px-6 py-4 font-bold">更新时间</th>
                <th className="px-6 py-4 font-bold text-right">操作</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {faqs.filter(faq => 
                faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                faq.similarQuestions.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
              ).map(faq => (
                <tr key={faq.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-5 font-semibold text-slate-900">{faq.question}</td>
                  <td className="px-6 py-5 text-slate-500 max-w-xs truncate">
                    {faq.similarQuestions.map((s, i) => (
                      <span key={i} className="inline-block px-1.5 py-0.5 bg-slate-100 rounded text-[10px] mr-1 mb-1">{s}</span>
                    ))}
                  </td>
                  <td className="px-6 py-5 text-slate-600 max-w-md truncate">{faq.answer}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-brand-50 rounded text-[10px] font-bold text-brand-700">
                      {faq.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-400 font-mono">{faq.updateTime}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all"><Edit2 size={16} /></button>
                      <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add FAQ Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">新增知识条目</h3>
              <p className="text-sm text-slate-500">添加标准问答对，提升 AI 机器人的回复准确度</p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">标准问题 (Q)</label>
                <input 
                  type="text" 
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="例如：如何申请退款？"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">标准答案 (A)</label>
                <textarea 
                  rows={4}
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                  placeholder="请输入详细的解答内容..."
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">所属类目</label>
                <select 
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all bg-white"
                >
                  <option value="售后服务">售后服务</option>
                  <option value="物流相关">物流相关</option>
                  <option value="产品咨询">产品咨询</option>
                  <option value="通用知识">通用知识</option>
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
                onClick={handleAddFaq}
                className="px-6 py-2 bg-brand-600 text-white text-sm font-bold rounded-lg hover:bg-brand-700 shadow-md shadow-brand-100 transition-all"
              >
                保存条目
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KnowledgeBaseManagement;
