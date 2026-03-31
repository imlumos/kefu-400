import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import BotManagement from './components/BotManagement';
import BotConfigWorkbench from './components/BotConfig';
import KnowledgeBaseManagement from './components/KnowledgeBaseManagement';
import SessionTrace from './components/SessionTrace';
import HumanMechanism from './components/HumanMechanism';
import { BotConfig } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState('bot-mgmt');
  const [selectedBot, setSelectedBot] = useState<BotConfig | null>(null);

  const renderContent = () => {
    // Handle nested bot config view
    if (activeTab === 'bot-mgmt' && selectedBot) {
      return <BotConfigWorkbench bot={selectedBot} onBack={() => setSelectedBot(null)} />;
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'bot-mgmt':
        return <BotManagement onSelectBot={(bot) => setSelectedBot(bot)} />;
      case 'knowledge':
        return <KnowledgeBaseManagement />;
      case 'human-mech':
        return <HumanMechanism />;
      case 'records':
        return <SessionTrace />;
      default:
        return <BotManagement onSelectBot={(bot) => setSelectedBot(bot)} />;
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden font-sans antialiased text-slate-900 bg-slate-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 h-full overflow-hidden relative">
        {renderContent()}
      </main>
    </div>
  );
}
