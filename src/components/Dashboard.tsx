import { useState } from 'react';
import KanbanBoard from './KanbanBoard';
import Sidebar from './Sidebar';
import AutomationCenter from './AutomationCenter';
import ContactManager from './ContactManager';
import UserProfile from './UserProfile';
import TeamManagement from './TeamManagement';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('pipeline');

  const renderContent = () => {
    switch (activeSection) {
      case 'pipeline':
        return <KanbanBoard />;
      
      case 'dashboard':
        return (
          <div className="min-h-screen bg-slate-950 p-6">
            <div className="text-center py-16">
              <h1 className="text-3xl font-bold text-white mb-4">Dashboard</h1>
              <p className="text-slate-400">Visão geral do sistema</p>
            </div>
          </div>
        );
      
      case 'contacts':
        return <ContactManager />;
      
      case 'team':
        return <TeamManagement />;
      
      case 'automations':
        return <AutomationCenter />;
      
      case 'profile':
        return <UserProfile onBack={() => setActiveSection('dashboard')} />;
      
      case 'settings':
        return (
          <div className="min-h-screen bg-slate-950 p-6">
            <div className="text-center py-16">
              <h1 className="text-3xl font-bold text-white mb-4">Configurações</h1>
              <p className="text-slate-400">Configurações do sistema</p>
            </div>
          </div>
        );
      
      default:
        return <KanbanBoard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
      />
      <div className="flex-1 ml-16">
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
