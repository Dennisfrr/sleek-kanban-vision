
import { useState } from 'react';
import { 
  Home, 
  Users, 
  Target, 
  BarChart3, 
  Settings, 
  Phone, 
  Mail, 
  Calendar,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar = ({ activeSection, onSectionChange }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, count: null },
    { id: 'leads', label: 'Leads', icon: Users, count: 12 },
    { id: 'pipeline', label: 'Pipeline', icon: Target, count: null },
    { id: 'activities', label: 'Atividades', icon: Calendar, count: 5 },
    { id: 'calls', label: 'Ligações', icon: Phone, count: 3 },
    { id: 'emails', label: 'E-mails', icon: Mail, count: 8 },
    { id: 'reports', label: 'Relatórios', icon: BarChart3, count: null },
    { id: 'settings', label: 'Configurações', icon: Settings, count: null },
  ];

  return (
    <Card className={`h-full transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'} border-r-2 border-gray-200`}>
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div>
              <h2 className="text-lg font-bold text-gray-800">CRM Pro</h2>
              <p className="text-xs text-gray-500">Vendas & Pipeline</p>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant={activeSection === item.id ? 'default' : 'ghost'}
            className={`w-full justify-start ${isCollapsed ? 'px-2' : 'px-3'} ${
              activeSection === item.id ? 'bg-blue-100 text-blue-700 border-blue-200' : 'hover:bg-gray-100'
            }`}
            onClick={() => onSectionChange(item.id)}
          >
            <item.icon className={`${isCollapsed ? 'w-4 h-4' : 'w-4 h-4 mr-3'}`} />
            {!isCollapsed && (
              <>
                <span className="flex-1 text-left">{item.label}</span>
                {item.count && (
                  <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-600">
                    {item.count}
                  </Badge>
                )}
              </>
            )}
          </Button>
        ))}
      </div>

      {!isCollapsed && (
        <div className="p-4 border-t mt-auto">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-lg">
            <h3 className="font-semibold text-sm">Upgrade Pro</h3>
            <p className="text-xs opacity-90 mt-1">Desbloqueie recursos avançados</p>
            <Button size="sm" variant="secondary" className="mt-2 w-full">
              Upgrade
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default Sidebar;
