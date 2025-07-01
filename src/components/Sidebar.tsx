import { 
  Home, 
  Target, 
  Settings, 
  Zap,
  Contact,
  Plus,
  User,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar = ({ activeSection, onSectionChange }: SidebarProps) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'pipeline', label: 'Pipeline', icon: Target },
    { id: 'contacts', label: 'Contatos', icon: Contact },
    { id: 'team', label: 'Equipe', icon: Users },
    { id: 'automations', label: 'Automações', icon: Zap },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

  return (
    <TooltipProvider>
      <div className="fixed left-0 top-0 h-full w-16 bg-slate-900 border-r border-slate-700 z-50">
        <div className="flex flex-col h-full">
          {/* Logo/Brand */}
          <div className="flex items-center justify-center h-16 border-b border-slate-700">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
                  <div className="w-4 h-4 bg-white rounded-sm"></div>
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>CRM System</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Menu Items */}
          <div className="flex-1 py-4">
            <div className="space-y-2">
              {menuItems.map((item) => (
                <div key={item.id} className="px-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`w-12 h-12 p-0 rounded-lg ${
                          activeSection === item.id 
                            ? 'bg-blue-600 text-white hover:bg-blue-700' 
                            : 'text-slate-400 hover:text-white hover:bg-slate-800'
                        } transition-all duration-200`}
                        onClick={() => onSectionChange(item.id)}
                      >
                        <item.icon className="w-5 h-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{item.label}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="p-2 border-t border-slate-700 space-y-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-12 h-12 p-0 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all duration-200"
                >
                  <Plus className="w-5 h-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Adicionar</p>
              </TooltipContent>
            </Tooltip>

            {/* User Profile */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`w-12 h-12 p-1 rounded-lg ${
                    activeSection === 'profile' 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  } transition-all duration-200`}
                  onClick={() => onSectionChange('profile')}
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150" />
                    <AvatarFallback className="bg-slate-700 text-white text-xs">
                      CS
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Meu Perfil</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Sidebar;
