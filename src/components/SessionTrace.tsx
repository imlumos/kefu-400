import React, { useState } from 'react';
import { 
  Search, 
  Calendar, 
  Filter, 
  ChevronRight, 
  Play, 
  Pause, 
  User, 
  Bot, 
  Headphones, 
  X, 
  Info, 
  FileText, 
  Clock,
  ExternalLink
} from 'lucide-react';
import { SessionRecord, SessionMessage } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

const SessionTrace: React.FC = () => {
  const [records] = useState<SessionRecord[]>([
    {
      id: '1',
      botType: 'B',
      uid: 'UID-10086',
      userName: '蚂蚁金服',
      phoneNumber: '13800138000',
      startTime: '2024-03-20 10:30:15',
      callId: 'SESS-20240320-001',
      botDuration: 45,
      botRounds: 4,
      botQuality: '优',
      isTransferred: true,
      transferSuccess: true,
      transferMethod: '关键词强转',
      agentName: '王小美',
      agentGroup: '热线一组',
      agentDuration: 120,
      botAudioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      agentAudioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      botSummary: '用户咨询退款进度，机器人成功核实订单状态并告知预计到账时间。用户后续要求转人工确认具体银行流水。',
      agentSummary: '人工客服核对了银行卡尾号，并告知用户由于跨行转账可能存在24小时延迟，用户表示理解并挂断。',
      messages: [
        { 
          role: 'assistant', 
          text: '您好，这里是智能售后助手，请问有什么可以帮您？', 
          timestamp: '10:30:15', 
          duration: 2,
          audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
        },
        { 
          role: 'user', 
          text: '我想查一下我的退款到哪一步了。', 
          timestamp: '10:30:20', 
          duration: 3,
          asrConfidence: 0.98,
          audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
        },
        { 
          role: 'assistant', 
          text: '好的，为您查询到订单号 20240319-X 的退款已于今早 8 点发起。', 
          timestamp: '10:30:25', 
          duration: 4,
          audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
          responseProcess: {
            intent: '退款查询',
            confidence: 0.99,
            knowledgeBaseHit: '退款流程说明',
            llmThinking: '识别到用户查询退款意图，调用订单查询API，返回结果并告知用户。',
            tokens: 156
          }
        },
        { 
          role: 'user', 
          text: '好的，但我还是想跟人工确认一下具体银行流水。', 
          timestamp: '10:30:35', 
          duration: 5,
          asrConfidence: 0.95,
          audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3'
        },
        { 
          role: 'assistant', 
          text: '没问题，正在为您转接人工客服，请稍候。', 
          timestamp: '10:30:42', 
          duration: 3,
          audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3'
        },
        { 
          role: 'agent', 
          text: '您好，工号007为您服务，请问有什么可以帮您？', 
          timestamp: '11:31:05', 
          duration: 5,
          audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3'
        },
        { 
          role: 'user', 
          text: '我想确认下退款的银行卡尾号。', 
          timestamp: '11:31:15', 
          duration: 4,
          audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3'
        }
      ]
    },
    {
      id: '2',
      botType: 'C',
      uid: 'UID-20012',
      userName: '李四',
      phoneNumber: '13911112222',
      startTime: '2024-03-20 11:15:22',
      callId: 'SESS-20240320-002',
      botDuration: 32,
      botRounds: 2,
      botQuality: '良',
      isTransferred: false,
      botAudioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
      botSummary: '用户咨询产品规格，机器人准确回答了尺寸和重量信息。',
      messages: [
        { 
          role: 'assistant', 
          text: '您好，请问有什么可以帮您？', 
          timestamp: '11:15:22', 
          duration: 2 
        },
        { 
          role: 'user', 
          text: '这款电脑的重量是多少？', 
          timestamp: '11:15:28', 
          duration: 3 
        },
        { 
          role: 'assistant', 
          text: '拯救者 Y9000P 的机身重量约为 2.5kg。', 
          timestamp: '11:15:35', 
          duration: 4,
          responseProcess: {
            intent: '产品参数查询',
            confidence: 0.97,
            knowledgeBaseHit: 'Y9000P 规格表',
            llmThinking: '检索知识库中关于重量的参数，提取数值并回复。',
            tokens: 120
          }
        }
      ]
    },
    {
      id: '3',
      botType: 'B',
      uid: 'UID-30045',
      userName: '字节跳动',
      phoneNumber: '15022223333',
      startTime: '2024-03-20 14:05:10',
      callId: 'SESS-20240320-003',
      botDuration: 60,
      botRounds: 3,
      botQuality: '中',
      isTransferred: false,
      botAudioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
      botSummary: '用户反馈网络连接不稳定，机器人提供了基础排查步骤，但用户表示问题依然存在。',
      messages: [
        { 
          role: 'assistant', 
          text: '您好，我是智能网络助手，请问您的网络遇到了什么问题？', 
          timestamp: '14:05:10', 
          duration: 3 
        },
        { 
          role: 'user', 
          text: '我家的 WiFi 总是断断续续的。', 
          timestamp: '14:05:15', 
          duration: 4 
        },
        { 
          role: 'assistant', 
          text: '很抱歉给您带来不便。请问您尝试过重启路由器吗？', 
          timestamp: '14:05:22', 
          duration: 4,
          responseProcess: {
            intent: '故障报修',
            confidence: 0.85,
            knowledgeBaseHit: 'WiFi 故障排查手册',
            llmThinking: '识别到网络连接问题，建议用户进行基础重启操作。',
            tokens: 180
          }
        }
      ]
    },
    {
      id: '4',
      botType: 'C',
      uid: 'UID-40089',
      userName: '赵六',
      phoneNumber: '18855556666',
      startTime: '2024-03-20 15:30:00',
      callId: 'SESS-20240320-004',
      botDuration: 15,
      botRounds: 1,
      botQuality: '差',
      isTransferred: true,
      transferSuccess: true,
      transferMethod: '负面阈值',
      agentName: '李华',
      agentGroup: '热线二组',
      agentDuration: 300,
      botAudioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
      agentAudioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
      botSummary: '用户情绪激动，机器人未能有效安抚，直接转接人工。',
      agentSummary: '人工客服成功安抚用户情绪，并解决了用户的投诉问题。',
      messages: [
        { 
          role: 'assistant', 
          text: '您好，请问有什么可以帮您？', 
          timestamp: '15:30:00', 
          duration: 2 
        },
        { 
          role: 'user', 
          text: '你们的服务太差了！我要投诉！', 
          timestamp: '15:30:05', 
          duration: 5 
        },
        { 
          role: 'assistant', 
          text: '非常抱歉让您感到不快，正在为您转接高级客服经理，请稍候。', 
          timestamp: '15:30:12', 
          duration: 3 
        }
      ]
    },
    {
      id: '5',
      botType: 'B',
      uid: 'UID-50067',
      userName: '腾讯科技',
      phoneNumber: '17788889999',
      startTime: '2024-03-21 09:10:00',
      callId: 'SESS-20240321-001',
      botDuration: 120,
      botRounds: 8,
      botQuality: '优',
      isTransferred: true,
      transferSuccess: false,
      transferMethod: '请求人工次数达3次以上',
      agentName: '-',
      agentGroup: '热线一组',
      agentDuration: 0,
      botAudioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      botSummary: '用户咨询复杂的API集成问题，机器人尝试多次解答但未能满足用户深度需求，用户多次请求人工，但当前人工忙线，转接失败。',
      messages: [
        { role: 'assistant', text: '您好，有什么可以帮您？', timestamp: '09:10:00', duration: 2 },
        { role: 'user', text: '我想咨询一下你们API的鉴权机制。', timestamp: '09:10:05', duration: 4 }
      ]
    },
    {
      id: '6',
      botType: 'C',
      uid: 'UID-60034',
      userName: '孙悟空',
      phoneNumber: '13344445555',
      startTime: '2024-03-21 10:20:00',
      callId: 'SESS-20240321-002',
      botDuration: 45,
      botRounds: 5,
      botQuality: '良',
      isTransferred: true,
      transferSuccess: true,
      transferMethod: '知识未命中超过5次',
      agentName: '张伟',
      agentGroup: '热线一组',
      agentDuration: 450,
      botAudioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      botSummary: '用户咨询的问题较为冷门，机器人知识库未覆盖，触发转人工。',
      messages: [
        { role: 'assistant', text: '您好，有什么可以帮您？', timestamp: '10:20:00', duration: 2 }
      ]
    }
  ]);

  const [selectedRecord, setSelectedRecord] = useState<SessionRecord | null>(null);
  const [activeProcess, setActiveProcess] = useState<SessionMessage['responseProcess'] | null>(null);
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const [playingMsgIdx, setPlayingMsgIdx] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBotType, setFilterBotType] = useState<'all' | 'B' | 'C'>('all');
  const [filterIsTransferred, setFilterIsTransferred] = useState<'all' | 'yes' | 'no'>('all');
  const [filterTransferSuccess, setFilterTransferSuccess] = useState<'all' | 'yes' | 'no'>('all');
  const [filterTransferMethod, setFilterTransferMethod] = useState('all');
  const [filterDateRange, setFilterDateRange] = useState({ start: '', end: '' });

  const filteredRecords = records.filter(record => {
    const matchesSearch = 
      record.callId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.phoneNumber.includes(searchQuery) ||
      record.uid.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (record.agentName && record.agentName.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesBotType = filterBotType === 'all' || record.botType === filterBotType;
    const matchesTransferred = filterIsTransferred === 'all' || 
      (filterIsTransferred === 'yes' ? record.isTransferred : !record.isTransferred);
    
    const matchesTransferSuccess = filterTransferSuccess === 'all' ||
      (filterTransferSuccess === 'yes' ? record.transferSuccess === true : record.transferSuccess === false);
    
    const matchesTransferMethod = filterTransferMethod === 'all' || record.transferMethod === filterTransferMethod;

    const recordDate = record.startTime.split(' ')[0];
    const matchesDate = (!filterDateRange.start || recordDate >= filterDateRange.start) &&
                       (!filterDateRange.end || recordDate <= filterDateRange.end);

    return matchesSearch && matchesBotType && matchesTransferred && matchesDate && matchesTransferSuccess && matchesTransferMethod;
  });

  const handleExport = () => {
    const headers = ['机器人类型', '来电号码', 'UID', '用户名称', '呼入时间', '会话ID', 'BOT时长', '机器人轮次', '是否请求转人工', '转接结果', '转接成功/失败原因', '客服姓名', '客服组别', '人工对话时长'];
    const csvContent = [
      headers.join(','),
      ...filteredRecords.map(r => [
        `${r.botType}机器人`,
        r.phoneNumber,
        r.uid,
        r.userName,
        r.startTime,
        r.callId,
        `${r.botDuration}s`,
        r.botRounds,
        r.isTransferred ? '是' : '否',
        r.transferSuccess === true ? '成功' : (r.transferSuccess === false ? '失败' : '-'),
        r.transferMethod || '-',
        r.agentName || '-',
        r.agentGroup || '-',
        r.agentDuration ? `${r.agentDuration}s` : '-'
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `对话记录_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 relative overflow-hidden">
      {/* Header */}
      <header className="px-6 py-4 bg-white border-b border-slate-200">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-slate-900">对话记录管理</h1>
            <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded uppercase tracking-wider">
              {filteredRecords.length} 条记录
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleExport}
              className="flex items-center gap-2 text-xs font-bold bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 shadow-md shadow-brand-100 transition-all"
            >
              <ExternalLink size={14} /> 导出报表
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input 
              type="text" 
              placeholder="搜索用户、UID、电话、会话ID..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all"
            />
          </div>

          {/* Filters Row 1 */}
          <div className="flex items-center gap-2">
            <select 
              value={filterBotType}
              onChange={(e) => setFilterBotType(e.target.value as any)}
              className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 bg-white outline-none focus:ring-2 focus:ring-brand-500/20"
            >
              <option value="all">全部机器人</option>
              <option value="B">B 机器人</option>
              <option value="C">C 机器人</option>
            </select>
            <select 
              value={filterIsTransferred}
              onChange={(e) => setFilterIsTransferred(e.target.value as any)}
              className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 bg-white outline-none focus:ring-2 focus:ring-brand-500/20"
            >
              <option value="all">转人工: 全部</option>
              <option value="yes">已转人工</option>
              <option value="no">未转人工</option>
            </select>
          </div>

          {/* Filters Row 2 */}
          <div className="flex items-center gap-2">
            <select 
              value={filterTransferSuccess}
              onChange={(e) => setFilterTransferSuccess(e.target.value as any)}
              className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 bg-white outline-none focus:ring-2 focus:ring-brand-500/20"
            >
              <option value="all">转人工成功: 全部</option>
              <option value="yes">成功</option>
              <option value="no">失败</option>
            </select>
            <select 
              value={filterTransferMethod}
              onChange={(e) => setFilterTransferMethod(e.target.value)}
              className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 bg-white outline-none focus:ring-2 focus:ring-brand-500/20"
            >
              <option value="all">转人工方式: 全部</option>
              <option value="请求人工次数达3次以上">请求人工次数达3次以上</option>
              <option value="知识未命中超过5次">知识未命中超过5次</option>
              <option value="负面阈值">负面阈值</option>
              <option value="关键词强转">关键词强转</option>
            </select>
          </div>

          {/* Filters Row 3 */}
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center gap-1">
              <input 
                type="date" 
                value={filterDateRange.start}
                onChange={(e) => setFilterDateRange({...filterDateRange, start: e.target.value})}
                className="w-full px-2 py-2 border border-slate-200 rounded-lg text-[10px] font-medium text-slate-600 bg-white outline-none"
              />
              <span className="text-slate-300">-</span>
              <input 
                type="date" 
                value={filterDateRange.end}
                onChange={(e) => setFilterDateRange({...filterDateRange, end: e.target.value})}
                className="w-full px-2 py-2 border border-slate-200 rounded-lg text-[10px] font-medium text-slate-600 bg-white outline-none"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Table List */}
      <div className="flex-1 overflow-auto p-6">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1600px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-[10px] text-slate-400 uppercase font-bold tracking-widest">
                <th className="px-4 py-4">机器人类型</th>
                <th className="px-4 py-4">来电号码</th>
                <th className="px-4 py-4">UID</th>
                <th className="px-4 py-4">用户名称</th>
                <th className="px-4 py-4">呼入时间</th>
                <th className="px-4 py-4">会话 ID</th>
                <th className="px-4 py-4">BOT 时长</th>
                <th className="px-4 py-4">机器人轮次</th>
                <th className="px-4 py-4">是否请求转人工</th>
                <th className="px-4 py-4">转接结果</th>
                <th className="px-4 py-4">转接成功/失败原因</th>
                <th className="px-4 py-4">客服姓名</th>
                <th className="px-4 py-4">客服组别</th>
                <th className="px-4 py-4">人工时长</th>
                <th className="px-4 py-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {filteredRecords.map(record => (
                <tr key={record.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                  <td className="px-4 py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      record.botType === 'B' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                    }`}>
                      {record.botType} 机器人
                    </span>
                  </td>
                  <td className="px-4 py-4 text-slate-500 font-mono">{record.phoneNumber}</td>
                  <td className="px-4 py-4 text-slate-500 font-mono">{record.uid}</td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-900">{record.userName}</span>
                      <span className="text-[9px] text-slate-400">{record.botType === 'B' ? '企业用户' : '个人用户'}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-slate-400">{record.startTime}</td>
                  <td className="px-4 py-4 font-mono text-slate-500">{record.callId}</td>
                  <td className="px-4 py-4 text-slate-600">{record.botDuration}s</td>
                  <td className="px-4 py-4 text-slate-600">{record.botRounds} 轮</td>
                  <td className="px-4 py-4">
                    {record.isTransferred ? (
                      <span className="text-orange-600 font-bold">是</span>
                    ) : (
                      <span className="text-slate-400">否</span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    {record.isTransferred ? (
                      record.transferSuccess ? (
                        <span className="text-emerald-600 font-bold">成功</span>
                      ) : (
                        <span className="text-red-600 font-bold">失败</span>
                      )
                    ) : '-'}
                  </td>
                  <td className="px-4 py-4 text-slate-500 truncate max-w-[120px]" title={record.transferMethod}>
                    {record.transferMethod || '-'}
                  </td>
                  <td className="px-4 py-4 text-slate-600">{record.agentName || '-'}</td>
                  <td className="px-4 py-4 text-slate-600">{record.agentGroup || '-'}</td>
                  <td className="px-4 py-4 text-slate-600">{record.agentDuration ? `${record.agentDuration}s` : '-'}</td>
                  <td className="px-4 py-4 text-right">
                    <button 
                      onClick={() => setSelectedRecord(record)}
                      className="text-brand-600 font-bold hover:underline text-xs flex items-center gap-1 ml-auto"
                    >
                      通话详情 <ChevronRight size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Side Drawer */}
      <AnimatePresence>
        {selectedRecord && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedRecord(null)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
            />
            {/* Drawer Content */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-[800px] max-w-[90vw] bg-white shadow-2xl z-50 flex flex-col"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">通话详情追溯</h2>
                  <p className="text-xs text-slate-400 mt-1">会话 ID: {selectedRecord.callId}</p>
                </div>
                <button 
                  onClick={() => setSelectedRecord(null)}
                  className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Drawer Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* Key Info Grid */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">用户信息</p>
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-slate-800">{selectedRecord.userName}</p>
                      <p className="text-xs text-slate-500">{selectedRecord.phoneNumber}</p>
                      <p className="text-[10px] text-slate-400 font-mono">UID: {selectedRecord.uid}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">会话信息</p>
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-slate-700">轮次: {selectedRecord.botRounds} 轮</p>
                      <p className="text-xs text-slate-500">时长: {selectedRecord.botDuration}s</p>
                      <p className="text-[10px] text-slate-400 font-mono">ID: {selectedRecord.callId}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">转人工详情</p>
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-slate-700">
                        状态: {selectedRecord.isTransferred ? (selectedRecord.transferSuccess ? '成功' : '失败') : '未转接'}
                      </p>
                      {selectedRecord.isTransferred && (
                        <>
                          <p className="text-[10px] text-slate-500">方式: {selectedRecord.transferMethod}</p>
                          <p className="text-[10px] text-slate-500">组别: {selectedRecord.agentGroup}</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Audio Players */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-slate-800 flex items-center gap-2">
                    <Headphones size={14} className="text-brand-600" /> 录音回放
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center gap-4 p-3 bg-white border border-slate-200 rounded-xl shadow-sm">
                      <button 
                        onClick={() => setPlayingAudio(playingAudio === 'bot' ? null : 'bot')}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                          playingAudio === 'bot' ? 'bg-brand-100 text-brand-600' : 'bg-brand-600 text-white hover:bg-brand-700'
                        }`}
                      >
                        {playingAudio === 'bot' ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
                      </button>
                      <div className="flex-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">机器人录音 ({selectedRecord.botDuration}s)</p>
                        <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: playingAudio === 'bot' ? '100%' : '33%' }}
                            transition={{ duration: playingAudio === 'bot' ? selectedRecord.botDuration : 0.5, ease: "linear" }}
                            className="h-full bg-brand-600"
                          />
                        </div>
                      </div>
                    </div>
                    {selectedRecord.isTransferred && (
                      <div className="flex items-center gap-4 p-3 bg-white border border-slate-200 rounded-xl shadow-sm">
                        <button 
                          onClick={() => setPlayingAudio(playingAudio === 'agent' ? null : 'agent')}
                          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                            playingAudio === 'agent' ? 'bg-orange-100 text-orange-600' : 'bg-orange-600 text-white hover:bg-orange-700'
                          }`}
                        >
                          {playingAudio === 'agent' ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
                        </button>
                        <div className="flex-1">
                          <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">人工客服录音 ({selectedRecord.agentDuration}s)</p>
                          <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: playingAudio === 'agent' ? '100%' : '0%' }}
                              transition={{ duration: playingAudio === 'agent' ? selectedRecord.agentDuration! : 0.5, ease: "linear" }}
                              className="h-full bg-orange-600"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Dialogue Summaries */}
                <div className="space-y-4">
                  <div className="p-4 bg-brand-50/50 border border-brand-100 rounded-xl">
                    <h4 className="text-xs font-bold text-brand-700 flex items-center gap-2 mb-2">
                      <FileText size={14} /> 机器人对话总结
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{selectedRecord.botSummary}</p>
                  </div>
                  {selectedRecord.agentSummary && (
                    <div className="p-4 bg-orange-50/50 border border-orange-100 rounded-xl">
                      <h4 className="text-xs font-bold text-orange-700 flex items-center gap-2 mb-2">
                        <FileText size={14} /> 人工客服总结
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{selectedRecord.agentSummary}</p>
                    </div>
                  )}
                </div>

                {/* Dialogue History */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-slate-800 flex items-center gap-2">
                    <Clock size={14} className="text-brand-600" /> 对话详情
                  </h3>
                  <div className="space-y-6 relative before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-px before:bg-slate-100">
                    {selectedRecord.messages.map((msg, idx) => (
                      <div key={idx} className="relative pl-10">
                        {/* Timeline Dot */}
                        <div className={`absolute left-0 top-1.5 w-8 h-8 rounded-lg flex items-center justify-center z-10 shadow-sm border ${
                          msg.role === 'assistant' ? 'bg-brand-100 text-brand-600 border-brand-200' : 
                          msg.role === 'agent' ? 'bg-orange-100 text-orange-600 border-orange-200' :
                          'bg-slate-800 text-white border-slate-700'
                        }`}>
                          {msg.role === 'assistant' ? <Bot size={14} /> : 
                           msg.role === 'agent' ? <Headphones size={14} /> : <User size={14} />}
                        </div>

                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                              {msg.role === 'assistant' ? 'AI 机器人' : 
                               msg.role === 'agent' ? `人工客服 (${selectedRecord.agentName})` : '终端用户'}
                            </span>
                            <span className="text-[10px] text-slate-300 font-mono">{msg.timestamp}</span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-bold bg-slate-50 px-1.5 py-0.5 rounded">
                            耗时 {msg.duration}s
                          </span>
                        </div>

                        <div className={`p-4 rounded-2xl text-xs leading-relaxed shadow-sm border group relative ${
                          msg.role === 'assistant' ? 'bg-white border-slate-100 text-slate-700' : 
                          msg.role === 'agent' ? 'bg-orange-50/30 border-orange-100 text-slate-700' :
                          'bg-slate-800 text-white border-slate-700'
                        }`}>
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">{msg.text}</div>
                            
                            {/* Play Message Audio */}
                            <button 
                              onClick={() => setPlayingMsgIdx(playingMsgIdx === idx ? null : idx)}
                              className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                                playingMsgIdx === idx 
                                  ? 'bg-brand-100 text-brand-600' 
                                  : msg.role === 'user' 
                                    ? 'bg-slate-700 text-white hover:bg-slate-600' 
                                    : 'bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-brand-600'
                              }`}
                              title="播放语音"
                            >
                              {playingMsgIdx === idx ? <Pause size={12} fill="currentColor" /> : <Play size={12} fill="currentColor" />}
                            </button>
                          </div>
                          
                          {/* Response Process Trigger */}
                          {msg.responseProcess && (
                            <div className="mt-3 flex justify-end">
                              <button 
                                onClick={() => setActiveProcess(msg.responseProcess!)}
                                className="flex items-center gap-1.5 px-3 py-1 bg-brand-50 text-brand-600 rounded-full text-[10px] font-bold hover:bg-brand-100 transition-colors border border-brand-100"
                              >
                                <Info size={12} />
                                查看响应详情
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
                <button className="px-4 py-2 text-xs font-bold text-slate-600 border border-slate-200 rounded-lg hover:bg-white transition-all">
                  下载录音
                </button>
                <button className="px-4 py-2 text-xs font-bold bg-brand-600 text-white rounded-lg hover:bg-brand-700 shadow-md shadow-brand-100 transition-all">
                  导出 PDF 记录
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Response Process Modal */}
      <AnimatePresence>
        {activeProcess && (
          <div className="fixed inset-0 flex items-center justify-center z-[60] p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProcess(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative z-10"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Info size={16} className="text-brand-600" /> 响应链路详情
                </h3>
                <button onClick={() => setActiveProcess(null)} className="text-slate-400 hover:text-slate-600">
                  <X size={18} />
                </button>
              </div>
              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">识别意图</p>
                      <p className="text-sm font-bold text-slate-800">{activeProcess.intent}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">置信度</p>
                      <p className="text-sm font-bold text-emerald-600">{(activeProcess.confidence! * 100).toFixed(1)}%</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">知识库命中</p>
                    <p className="text-xs text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100">
                      {activeProcess.knowledgeBaseHit}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">LLM 推理过程</p>
                    <p className="text-xs text-slate-500 leading-relaxed italic">
                      "{activeProcess.llmThinking}"
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Token 消耗</span>
                    <span className="text-xs font-mono font-bold text-brand-600">{activeProcess.tokens} tokens</span>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-slate-50 text-center">
                <button 
                  onClick={() => setActiveProcess(null)}
                  className="text-xs font-bold text-brand-600 hover:underline"
                >
                  关闭窗口
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SessionTrace;
