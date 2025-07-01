import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  Star, 
  Trophy, 
  Target, 
  TrendingUp, 
  Clock, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Award, 
  Eye,
  Edit,
  Trash2,
  UserPlus,
  Download,
  Upload,
  BarChart3,
  PieChart,
  Activity,
  Building,
  Crown,
  Shield,
  User
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  position: string;
  department: string;
  manager?: string;
  location: string;
  joinDate: Date;
  status: 'active' | 'inactive' | 'vacation';
  role: 'admin' | 'manager' | 'seller' | 'support';
  metrics: {
    leadsConverted: number;
    totalSales: number;
    avgResponseTime: number;
    customerSatisfaction: number;
    tasksCompleted: number;
    activeDays: number;
  };
  achievements: string[];
  lastActivity: Date;
}

const TeamManagement = () => {
  const [activeTab, setActiveTab] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const [teamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'Carlos Silva',
      email: 'carlos@empresa.com',
      phone: '(11) 99999-9999',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      position: 'Gerente de Vendas',
      department: 'Comercial',
      manager: 'Ana Costa',
      location: 'São Paulo, SP',
      joinDate: new Date('2023-01-15'),
      status: 'active',
      role: 'manager',
      metrics: {
        leadsConverted: 127,
        totalSales: 450000,
        avgResponseTime: 15,
        customerSatisfaction: 4.8,
        tasksCompleted: 89,
        activeDays: 142
      },
      achievements: ['Top Performer', 'Quick Response'],
      lastActivity: new Date(Date.now() - 1 * 60 * 60 * 1000)
    },
    {
      id: '2',
      name: 'Ana Costa',
      email: 'ana@empresa.com',
      phone: '(11) 98888-8888',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      position: 'Diretora Comercial',
      department: 'Comercial',
      location: 'São Paulo, SP',
      joinDate: new Date('2022-03-01'),
      status: 'active',
      role: 'admin',
      metrics: {
        leadsConverted: 95,
        totalSales: 850000,
        avgResponseTime: 12,
        customerSatisfaction: 4.9,
        tasksCompleted: 156,
        activeDays: 298
      },
      achievements: ['Leadership', 'Revenue King', 'Team Builder'],
      lastActivity: new Date(Date.now() - 30 * 60 * 1000)
    },
    {
      id: '3',
      name: 'Pedro Santos',
      email: 'pedro@empresa.com',
      phone: '(11) 97777-7777',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      position: 'Vendedor Sênior',
      department: 'Comercial',
      manager: 'Carlos Silva',
      location: 'Rio de Janeiro, RJ',
      joinDate: new Date('2023-06-01'),
      status: 'active',
      role: 'seller',
      metrics: {
        leadsConverted: 89,
        totalSales: 320000,
        avgResponseTime: 18,
        customerSatisfaction: 4.6,
        tasksCompleted: 67,
        activeDays: 98
      },
      achievements: ['Rising Star'],
      lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: '4',
      name: 'Maria Oliveira',
      email: 'maria@empresa.com',
      phone: '(11) 96666-6666',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      position: 'Analista de Suporte',
      department: 'Suporte',
      manager: 'João Lima',
      location: 'Belo Horizonte, MG',
      joinDate: new Date('2023-08-15'),
      status: 'vacation',
      role: 'support',
      metrics: {
        leadsConverted: 12,
        totalSales: 0,
        avgResponseTime: 8,
        customerSatisfaction: 4.7,
        tasksCompleted: 234,
        activeDays: 76
      },
      achievements: ['Customer Hero'],
      lastActivity: new Date(Date.now() - 24 * 60 * 60 * 1000)
    },
    {
      id: '5',
      name: 'João Lima',
      email: 'joao@empresa.com',
      phone: '(11) 95555-5555',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      position: 'Coordenador de Suporte',
      department: 'Suporte',
      location: 'São Paulo, SP',
      joinDate: new Date('2022-11-01'),
      status: 'active',
      role: 'manager',
      metrics: {
        leadsConverted: 23,
        totalSales: 0,
        avgResponseTime: 10,
        customerSatisfaction: 4.8,
        tasksCompleted: 187,
        activeDays: 201
      },
      achievements: ['Support Excellence'],
      lastActivity: new Date(Date.now() - 45 * 60 * 1000)
    },
    {
      id: '6',
      name: 'Fernanda Costa',
      email: 'fernanda@empresa.com',
      phone: '(11) 94444-4444',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150',
      position: 'Vendedora Júnior',
      department: 'Comercial',
      manager: 'Carlos Silva',
      location: 'São Paulo, SP',
      joinDate: new Date('2024-01-10'),
      status: 'active',
      role: 'seller',
      metrics: {
        leadsConverted: 34,
        totalSales: 125000,
        avgResponseTime: 22,
        customerSatisfaction: 4.4,
        tasksCompleted: 28,
        activeDays: 45
      },
      achievements: ['Newcomer'],
      lastActivity: new Date(Date.now() - 15 * 60 * 1000)
    }
  ]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0
    }).format(value);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'inactive': return 'bg-red-500';
      case 'vacation': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Ativo';
      case 'inactive': return 'Inativo';
      case 'vacation': return 'Férias';
      default: return 'Desconhecido';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Crown className="w-4 h-4 text-yellow-400" />;
      case 'manager': return <Shield className="w-4 h-4 text-blue-400" />;
      case 'seller': return <Target className="w-4 h-4 text-green-400" />;
      case 'support': return <User className="w-4 h-4 text-purple-400" />;
      default: return <User className="w-4 h-4 text-gray-400" />;
    }
  };

  const getRoleText = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrador';
      case 'manager': return 'Gerente';
      case 'seller': return 'Vendedor';
      case 'support': return 'Suporte';
      default: return 'Usuário';
    }
  };

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.position.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = departmentFilter === 'all' || member.department === departmentFilter;
    const matchesRole = roleFilter === 'all' || member.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
    
    return matchesSearch && matchesDepartment && matchesRole && matchesStatus;
  });

  const departmentStats = {
    'Comercial': teamMembers.filter(m => m.department === 'Comercial').length,
    'Suporte': teamMembers.filter(m => m.department === 'Suporte').length,
    'Marketing': teamMembers.filter(m => m.department === 'Marketing').length,
    'TI': teamMembers.filter(m => m.department === 'TI').length,
  };

  const overallStats = {
    totalMembers: teamMembers.length,
    activeMembers: teamMembers.filter(m => m.status === 'active').length,
    totalSales: teamMembers.reduce((sum, m) => sum + m.metrics.totalSales, 0),
    avgSatisfaction: teamMembers.reduce((sum, m) => sum + m.metrics.customerSatisfaction, 0) / teamMembers.length,
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Gestão de Equipe</h1>
            <p className="text-slate-400">Gerencie colaboradores e acompanhe performance</p>
          </div>
          
          <div className="flex gap-3">
            <Button className="bg-green-600 hover:bg-green-700">
              <UserPlus className="w-4 h-4 mr-2" />
              Adicionar Membro
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-slate-600 text-slate-300">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Download className="w-4 h-4 mr-2" />
                  Exportar CSV
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="w-4 h-4 mr-2" />
                  Exportar PDF
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-slate-900 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-600 rounded-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{overallStats.totalMembers}</p>
                  <p className="text-sm text-slate-400">Total de Membros</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-600 rounded-lg">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{overallStats.activeMembers}</p>
                  <p className="text-sm text-slate-400">Membros Ativos</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-600 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{formatCurrency(overallStats.totalSales)}</p>
                  <p className="text-sm text-slate-400">Vendas Totais</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-yellow-600 rounded-lg">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{overallStats.avgSatisfaction.toFixed(1)}</p>
                  <p className="text-sm text-slate-400">Satisfação Média</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-slate-800 border-slate-700">
            <TabsTrigger value="list">Lista de Membros</TabsTrigger>
            <TabsTrigger value="org">Organograma</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          {/* Lista de Membros */}
          <TabsContent value="list" className="space-y-6">
            {/* Filters */}
            <Card className="bg-slate-900 border-slate-700">
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="flex-1 min-w-64">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <Input
                        placeholder="Buscar por nome, email ou cargo..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-slate-800 border-slate-600 text-white"
                      />
                    </div>
                  </div>
                  
                  <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                    <SelectTrigger className="w-48 bg-slate-800 border-slate-600 text-white">
                      <SelectValue placeholder="Departamento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos Departamentos</SelectItem>
                      <SelectItem value="Comercial">Comercial</SelectItem>
                      <SelectItem value="Suporte">Suporte</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="TI">TI</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-40 bg-slate-800 border-slate-600 text-white">
                      <SelectValue placeholder="Função" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas Funções</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="manager">Gerente</SelectItem>
                      <SelectItem value="seller">Vendedor</SelectItem>
                      <SelectItem value="support">Suporte</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-36 bg-slate-800 border-slate-600 text-white">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos Status</SelectItem>
                      <SelectItem value="active">Ativo</SelectItem>
                      <SelectItem value="inactive">Inativo</SelectItem>
                      <SelectItem value="vacation">Férias</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Members Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredMembers.map((member) => (
                <Card key={member.id} className="bg-slate-900 border-slate-700 hover:border-slate-600 transition-colors">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback className="bg-slate-700 text-white">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-900 ${getStatusColor(member.status)}`}></div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-white text-sm">{member.name}</h3>
                          <p className="text-xs text-slate-400">{member.position}</p>
                          <div className="flex items-center gap-2 mt-1">
                            {getRoleIcon(member.role)}
                            <span className="text-xs text-slate-400">{getRoleText(member.role)}</span>
                          </div>
                        </div>
                      </div>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            Ver Perfil
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="w-4 h-4 mr-2" />
                            Enviar Email
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-400">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Remover
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Contact Info */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <Mail className="w-3 h-3" />
                        <span className="truncate">{member.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <MapPin className="w-3 h-3" />
                        <span>{member.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <Building className="w-3 h-3" />
                        <span>{member.department}</span>
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-800 rounded-lg p-3 text-center">
                        <div className="text-lg font-bold text-green-400">{member.metrics.leadsConverted}</div>
                        <div className="text-xs text-slate-400">Leads</div>
                      </div>
                      <div className="bg-slate-800 rounded-lg p-3 text-center">
                        <div className="text-lg font-bold text-blue-400">{formatCurrency(member.metrics.totalSales)}</div>
                        <div className="text-xs text-slate-400">Vendas</div>
                      </div>
                      <div className="bg-slate-800 rounded-lg p-3 text-center">
                        <div className="text-lg font-bold text-purple-400">{member.metrics.avgResponseTime}min</div>
                        <div className="text-xs text-slate-400">Resposta</div>
                      </div>
                      <div className="bg-slate-800 rounded-lg p-3 text-center">
                        <div className="text-lg font-bold text-yellow-400">{member.metrics.customerSatisfaction}</div>
                        <div className="text-xs text-slate-400">Satisfação</div>
                      </div>
                    </div>

                    {/* Status and Achievements */}
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className={`text-xs ${getStatusColor(member.status)} text-white`}>
                        {getStatusText(member.status)}
                      </Badge>
                      <div className="flex gap-1">
                        {member.achievements.slice(0, 2).map((achievement, index) => (
                          <Badge key={index} variant="outline" className="text-xs border-slate-600 text-slate-300">
                            {achievement}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* No results */}
            {filteredMembers.length === 0 && (
              <Card className="bg-slate-900 border-slate-700">
                <CardContent className="p-12 text-center">
                  <Users className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Nenhum membro encontrado</h3>
                  <p className="text-slate-400">Ajuste os filtros ou busca para encontrar membros da equipe</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Organograma */}
          <TabsContent value="org" className="space-y-6">
            <Card className="bg-slate-900 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Estrutura Organizacional</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* CEO/Admin Level */}
                  <div className="text-center">
                    {teamMembers.filter(m => m.role === 'admin').map(admin => (
                      <div key={admin.id} className="inline-block bg-slate-800 rounded-lg p-4 border-2 border-yellow-500">
                        <Avatar className="w-16 h-16 mx-auto mb-2">
                          <AvatarImage src={admin.avatar} />
                          <AvatarFallback className="bg-slate-700 text-white">
                            {admin.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <h4 className="font-semibold text-white text-sm">{admin.name}</h4>
                        <p className="text-xs text-slate-400">{admin.position}</p>
                        <Crown className="w-4 h-4 text-yellow-400 mx-auto mt-1" />
                      </div>
                    ))}
                  </div>

                  {/* Managers Level */}
                  <div className="flex justify-center gap-8">
                    {teamMembers.filter(m => m.role === 'manager').map(manager => (
                      <div key={manager.id} className="text-center">
                        <div className="bg-slate-800 rounded-lg p-4 border-2 border-blue-500 mb-4">
                          <Avatar className="w-14 h-14 mx-auto mb-2">
                            <AvatarImage src={manager.avatar} />
                            <AvatarFallback className="bg-slate-700 text-white">
                              {manager.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <h4 className="font-semibold text-white text-sm">{manager.name}</h4>
                          <p className="text-xs text-slate-400">{manager.position}</p>
                          <Shield className="w-4 h-4 text-blue-400 mx-auto mt-1" />
                        </div>

                        {/* Team Members under this manager */}
                        <div className="grid grid-cols-1 gap-3">
                          {teamMembers.filter(m => m.manager === manager.name).map(member => (
                            <div key={member.id} className="bg-slate-800 rounded-lg p-3 border border-slate-600">
                              <Avatar className="w-10 h-10 mx-auto mb-1">
                                <AvatarImage src={member.avatar} />
                                <AvatarFallback className="bg-slate-700 text-white text-xs">
                                  {member.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <h5 className="font-medium text-white text-xs">{member.name}</h5>
                              <p className="text-xs text-slate-400">{member.position}</p>
                              {getRoleIcon(member.role)}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-900 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Distribuição por Departamento</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(departmentStats).map(([dept, count]) => (
                      <div key={dept} className="flex items-center justify-between">
                        <span className="text-white">{dept}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 bg-slate-700 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full" 
                              style={{ width: `${(count / teamMembers.length) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-slate-400 text-sm w-8 text-right">{count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Performance Geral</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-slate-800 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                      <p className="text-slate-400">Gráficos de performance em desenvolvimento</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Performance Comparison */}
          <TabsContent value="performance" className="space-y-6">
            <Card className="bg-slate-900 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Ranking de Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamMembers
                    .sort((a, b) => b.metrics.totalSales - a.metrics.totalSales)
                    .map((member, index) => (
                      <div key={member.id} className="flex items-center gap-4 p-4 bg-slate-800 rounded-lg">
                        <div className="text-2xl font-bold text-slate-400 w-8">
                          #{index + 1}
                        </div>
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback className="bg-slate-700 text-white">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-semibold text-white">{member.name}</h4>
                          <p className="text-sm text-slate-400">{member.position}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-green-400">{formatCurrency(member.metrics.totalSales)}</p>
                          <p className="text-sm text-slate-400">{member.metrics.leadsConverted} leads</p>
                        </div>
                        {index === 0 && <Trophy className="w-6 h-6 text-yellow-400" />}
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TeamManagement; 