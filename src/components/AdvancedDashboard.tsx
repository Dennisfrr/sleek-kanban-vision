import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Target, 
  Activity,
  Calendar,
  Phone,
  Mail,
  Clock,
  Zap,
  Award,
  AlertCircle,
  CheckCircle,
  BarChart3,
  PieChart,
  Download,
  RefreshCw
} from 'lucide-react';
import { mockLeads } from '@/data/mockData';

interface MetricCard {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: any;
  color: string;
  description: string;
}

const AdvancedDashboard = () => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [isLoading, setIsLoading] = useState(false);

  // Cálculos das métricas
  const totalLeads = mockLeads.length;
  const totalValue = mockLeads.reduce((sum, lead) => sum + lead.value, 0);
  const wonDeals = mockLeads.filter(lead => lead.status === 'closed-won');
  const lostDeals = mockLeads.filter(lead => lead.status === 'closed-lost');
  const activeLeads = mockLeads.filter(lead => !['closed-won', 'closed-lost'].includes(lead.status));
  
  const conversionRate = totalLeads > 0 ? (wonDeals.length / totalLeads * 100) : 0;
  const winRate = (wonDeals.length + lostDeals.length) > 0 ? (wonDeals.length / (wonDeals.length + lostDeals.length) * 100) : 0;
  const avgDealSize = wonDeals.length > 0 ? wonDeals.reduce((sum, deal) => sum + deal.value, 0) / wonDeals.length : 0;
  
  const highPriorityLeads = mockLeads.filter(lead => lead.priority === 'high').length;
  const mediumPriorityLeads = mockLeads.filter(lead => lead.priority === 'medium').length;
  const lowPriorityLeads = mockLeads.filter(lead => lead.priority === 'low').length;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const metrics: MetricCard[] = [
    {
      title: 'Receita Total',
      value: formatCurrency(totalValue),
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'from-emerald-500 to-emerald-600',
      description: 'Pipeline total de receita'
    },
    {
      title: 'Taxa de Conversão',
      value: `${conversionRate.toFixed(1)}%`,
      change: '+3.2%',
      trend: 'up',
      icon: Target,
      color: 'from-blue-500 to-blue-600',
      description: 'Leads convertidos em vendas'
    },
    {
      title: 'Taxa de Vitória',
      value: `${winRate.toFixed(1)}%`,
      change: '+5.8%',
      trend: 'up',
      icon: Award,
      color: 'from-purple-500 to-purple-600',
      description: 'Negociações fechadas com sucesso'
    },
    {
      title: 'Ticket Médio',
      value: formatCurrency(avgDealSize),
      change: '-2.1%',
      trend: 'down',
      icon: BarChart3,
      color: 'from-amber-500 to-amber-600',
      description: 'Valor médio por venda'
    },
    {
      title: 'Leads Ativos',
      value: activeLeads.length.toString(),
      change: '+8.7%',
      trend: 'up',
      icon: Users,
      color: 'from-indigo-500 to-indigo-600',
      description: 'Oportunidades em andamento'
    }
  ];

  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="space-y-6 p-6 min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 p-6 glass-effect">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Dashboard Analytics</h1>
            <p className="text-gray-400">Insights avançados e métricas em tempo real</p>
          </div>
          <div className="flex items-center gap-3">
            <Tabs value={timeRange} onValueChange={(value) => setTimeRange(value as any)}>
              <TabsList className="bg-white/10 border-white/20">
                <TabsTrigger value="7d" className="data-[state=active]:bg-blue-600">7 dias</TabsTrigger>
                <TabsTrigger value="30d" className="data-[state=active]:bg-blue-600">30 dias</TabsTrigger>
                <TabsTrigger value="90d" className="data-[state=active]:bg-blue-600">90 dias</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button
              variant="outline"
              size="sm"
              onClick={refreshData}
              disabled={isLoading}
              className="bg-white/5 border-white/20 text-white hover:bg-white/10"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Atualizar
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-white/5 border-white/20 text-white hover:bg-white/10"
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Métricas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {metrics.map((metric, index) => (
            <Card key={index} className="bg-black/20 border-white/10 backdrop-blur-sm hover:bg-black/30 transition-all">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${metric.color}`}>
                    <metric.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className={`flex items-center text-xs ${
                    metric.trend === 'up' ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    {metric.trend === 'up' ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                    {metric.change}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-white">{metric.value}</p>
                  <p className="text-xs text-gray-400">{metric.title}</p>
                  <p className="text-xs text-gray-500">{metric.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Cards de Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distribuição de Prioridades */}
        <Card className="bg-black/40 border-white/10 backdrop-blur-md glass-effect">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Distribuição de Prioridades
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-300">Alta Prioridade</span>
                </div>
                <Badge className="bg-red-500/20 text-red-300 border-red-500/30">
                  {highPriorityLeads} leads
                </Badge>
              </div>
              <Progress value={(highPriorityLeads / totalLeads) * 100} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                  <span className="text-sm text-gray-300">Média Prioridade</span>
                </div>
                <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30">
                  {mediumPriorityLeads} leads
                </Badge>
              </div>
              <Progress value={(mediumPriorityLeads / totalLeads) * 100} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span className="text-sm text-gray-300">Baixa Prioridade</span>
                </div>
                <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                  {lowPriorityLeads} leads
                </Badge>
              </div>
              <Progress value={(lowPriorityLeads / totalLeads) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Atividades Recentes */}
        <Card className="bg-black/40 border-white/10 backdrop-blur-md glass-effect">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Atividades Recentes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { action: 'Lead movido para Negociação', lead: 'Marcos Pereira', time: '2 min atrás', icon: Target, color: 'text-orange-400' },
              { action: 'Reunião agendada', lead: 'Beatriz Castro', time: '15 min atrás', icon: Calendar, color: 'text-blue-400' },
              { action: 'Proposta enviada', lead: 'Rafael Gomes', time: '1h atrás', icon: Mail, color: 'text-purple-400' },
              { action: 'Ligação realizada', lead: 'Roberto Alves', time: '2h atrás', icon: Phone, color: 'text-emerald-400' },
              { action: 'Lead qualificado', lead: 'Camila Rodrigues', time: '3h atrás', icon: CheckCircle, color: 'text-cyan-400' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <div className={`p-2 rounded-lg bg-black/30 ${activity.color}`}>
                  <activity.icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white font-medium">{activity.action}</p>
                  <p className="text-xs text-gray-400">{activity.lead} • {activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdvancedDashboard; 