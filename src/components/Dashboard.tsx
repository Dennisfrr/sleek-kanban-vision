import { useState } from 'react';
import { Lead } from '@/types/crm';
import { mockLeads } from '@/data/mockData';
import KanbanBoard from './KanbanBoard';
import AddLeadForm from './AddLeadForm';
import Sidebar from './Sidebar';
import AdvancedFilters from './AdvancedFilters';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, Users, DollarSign, Target, Bell, Settings } from 'lucide-react';

interface FilterState {
  search: string;
  status: string;
  priority: string;
  dateRange: string;
  valueRange: string;
  assignee: string;
}

const Dashboard = () => {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [activeSection, setActiveSection] = useState('pipeline');
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    status: '',
    priority: '',
    dateRange: '',
    valueRange: '',
    assignee: ''
  });

  const handleAddLead = (newLead: Lead) => {
    setLeads(prev => [...prev, newLead]);
  };

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // Apply filters to leads
  const filteredLeads = leads.filter(lead => {
    if (filters.search && !lead.name.toLowerCase().includes(filters.search.toLowerCase()) &&
        !lead.company.toLowerCase().includes(filters.search.toLowerCase()) &&
        !lead.email.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    if (filters.status && lead.status !== filters.status) return false;
    if (filters.priority && lead.priority !== filters.priority) return false;
    // Add more filter logic as needed
    return true;
  });

  // Calculate statistics
  const totalLeads = filteredLeads.length;
  const totalValue = filteredLeads.reduce((sum, lead) => sum + lead.value, 0);
  const wonDeals = filteredLeads.filter(lead => lead.status === 'closed-won');
  const conversionRate = totalLeads > 0 ? (wonDeals.length / totalLeads * 100) : 0;
  const averageValue = totalLeads > 0 ? totalValue / totalLeads : 0;

  const stats = [
    {
      title: 'Total de Leads',
      value: totalLeads.toString(),
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: '+12%'
    },
    {
      title: 'Valor Total Pipeline',
      value: formatCurrency(totalValue),
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      change: '+8.5%'
    },
    {
      title: 'Taxa de Conversão',
      value: `${conversionRate.toFixed(1)}%`,
      icon: Target,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      change: '+2.1%'
    },
    {
      title: 'Ticket Médio',
      value: formatCurrency(averageValue),
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      change: '-1.2%'
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'pipeline':
        return (
          <div className="space-y-6">
            <AdvancedFilters onFiltersChange={handleFiltersChange} />
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </CardTitle>
                    <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                      <stat.icon className={`w-4 h-4 ${stat.color}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end justify-between">
                      <div className={`text-2xl font-bold ${stat.color}`}>
                        {stat.value}
                      </div>
                      <Badge 
                        variant={stat.change.startsWith('+') ? 'default' : 'destructive'}
                        className="text-xs"
                      >
                        {stat.change}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Kanban Board */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Pipeline de Vendas</h2>
                  <p className="text-gray-600">Gerencie seus leads através do funil de vendas</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="px-3 py-1">
                    {totalLeads} leads ativos
                  </Badge>
                  <AddLeadForm onAddLead={handleAddLead} />
                </div>
              </div>
              <KanbanBoard />
            </Card>
          </div>
        );
      
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </CardTitle>
                    <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                      <stat.icon className={`w-4 h-4 ${stat.color}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className={`text-2xl font-bold ${stat.color}`}>
                      {stat.value}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Visão Geral</h2>
              <p className="text-gray-600">Dashboard principal com métricas e insights.</p>
            </Card>
          </div>
        );
      
      default:
        return (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">
              {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
            </h2>
            <p className="text-gray-600">Esta seção está em desenvolvimento.</p>
          </Card>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">CRM Dashboard</h1>
              <p className="text-gray-600 text-sm">Gerencie seus leads e oportunidades</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                Notificações
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Configurações
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <Sidebar 
          activeSection={activeSection} 
          onSectionChange={setActiveSection}
        />

        {/* Main Content */}
        <div className="flex-1 p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
