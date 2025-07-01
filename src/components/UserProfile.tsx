import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Building, 
  Briefcase, 
  Star, 
  Trophy, 
  Target, 
  TrendingUp, 
  Clock, 
  Award, 
  Camera, 
  Edit, 
  Save, 
  Settings, 
  Bell, 
  Shield, 
  Key, 
  Palette, 
  Globe, 
  Linkedin, 
  Github, 
  Twitter,
  Activity,
  BarChart3,
  Users,
  MessageSquare,
  CheckCircle,
  ArrowLeft
} from 'lucide-react';

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  position: string;
  department: string;
  location: string;
  joinDate: Date;
  birthday: Date;
  manager: string;
  bio: string;
  skills: string[];
  socialLinks: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
  preferences: {
    theme: 'dark' | 'light';
    language: string;
    timezone: string;
    notifications: {
      email: boolean;
      push: boolean;
      leads: boolean;
      meetings: boolean;
    };
  };
  metrics: {
    leadsConverted: number;
    totalSales: number;
    avgResponseTime: number;
    customerSatisfaction: number;
    tasksCompleted: number;
    activeDays: number;
  };
  achievements: {
    id: string;
    title: string;
    description: string;
    icon: string;
    earnedAt: Date;
  }[];
  activity: {
    id: string;
    type: 'lead' | 'deal' | 'task' | 'meeting';
    description: string;
    timestamp: Date;
  }[];
}

interface UserProfileProps {
  onBack?: () => void;
}

const UserProfile = ({ onBack }: UserProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();

  const [userData, setUserData] = useState<UserData>({
    id: '1',
    name: 'Carlos Silva',
    email: 'carlos@empresa.com',
    phone: '(11) 99999-9999',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    position: 'Gerente de Vendas',
    department: 'Comercial',
    location: 'São Paulo, SP',
    joinDate: new Date('2023-01-15'),
    birthday: new Date('1990-05-20'),
    manager: 'Ana Costa - Diretora Comercial',
    bio: 'Profissional experiente em vendas B2B com foco em soluções tecnológicas. Especialista em negociação e relacionamento com clientes corporativos.',
    skills: ['Vendas B2B', 'CRM', 'Negociação', 'Liderança', 'Excel Avançado'],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/carlos-silva',
      github: 'https://github.com/carlossilva',
      twitter: 'https://twitter.com/carlossilva'
    },
    preferences: {
      theme: 'dark',
      language: 'pt-BR',
      timezone: 'America/Sao_Paulo',
      notifications: {
        email: true,
        push: true,
        leads: true,
        meetings: true
      }
    },
    metrics: {
      leadsConverted: 127,
      totalSales: 450000,
      avgResponseTime: 15, // minutes
      customerSatisfaction: 4.8,
      tasksCompleted: 89,
      activeDays: 142
    },
    achievements: [
      {
        id: '1',
        title: 'Top Performer',
        description: 'Melhor vendedor do trimestre',
        icon: '🏆',
        earnedAt: new Date('2024-03-01')
      },
      {
        id: '2',
        title: 'Resposta Rápida',
        description: 'Tempo médio de resposta < 30min',
        icon: '⚡',
        earnedAt: new Date('2024-02-15')
      },
      {
        id: '3',
        title: 'Cliente Feliz',
        description: 'Satisfação do cliente > 4.5',
        icon: '😊',
        earnedAt: new Date('2024-01-10')
      }
    ],
    activity: [
      {
        id: '1',
        type: 'deal',
        description: 'Fechou negócio de R$ 45.000 com Tech Solutions',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
      },
      {
        id: '2',
        type: 'lead',
        description: 'Converteu lead Maria Santos em oportunidade',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000)
      },
      {
        id: '3',
        type: 'meeting',
        description: 'Reunião de alinhamento com equipe comercial',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000)
      }
    ]
  });

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Perfil atualizado!",
      description: "Suas informações foram salvas com sucesso.",
    });
    // Aqui salvaria os dados no backend
  };

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

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'lead': return <Users className="w-4 h-4" />;
      case 'deal': return <Trophy className="w-4 h-4" />;
      case 'task': return <CheckCircle className="w-4 h-4" />;
      case 'meeting': return <Calendar className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'lead': return 'text-blue-400';
      case 'deal': return 'text-green-400';
      case 'task': return 'text-purple-400';
      case 'meeting': return 'text-orange-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Back Button */}
        {onBack && (
          <Button
            onClick={onBack}
            variant="ghost"
            className="text-slate-400 hover:text-white hover:bg-slate-800 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Dashboard
          </Button>
        )}

        {/* Header */}
        <div className="bg-slate-900 rounded-xl border border-slate-700 p-6">
          <div className="flex items-start gap-6">
            {/* Avatar */}
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src={userData.avatar} />
                <AvatarFallback className="bg-slate-700 text-white text-xl">
                  {userData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>

            {/* Info Principal */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-white">{userData.name}</h1>
                  <p className="text-slate-400">{userData.position} • {userData.department}</p>
                  <div className="flex items-center gap-2 mt-2 text-sm text-slate-400">
                    <MapPin className="w-4 h-4" />
                    <span>{userData.location}</span>
                    <span>•</span>
                    <Calendar className="w-4 h-4" />
                    <span>Desde {formatDate(userData.joinDate)}</span>
                  </div>
                </div>

                <Button
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isEditing ? (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Salvar
                    </>
                  ) : (
                    <>
                      <Edit className="w-4 h-4 mr-2" />
                      Editar Perfil
                    </>
                  )}
                </Button>
              </div>

              {/* Métricas Rápidas */}
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-slate-800 rounded-lg p-3 text-center">
                  <div className="text-xl font-bold text-green-400">{userData.metrics.leadsConverted}</div>
                  <div className="text-xs text-slate-400">Leads Convertidos</div>
                </div>
                <div className="bg-slate-800 rounded-lg p-3 text-center">
                  <div className="text-xl font-bold text-blue-400">{formatCurrency(userData.metrics.totalSales)}</div>
                  <div className="text-xs text-slate-400">Vendas Totais</div>
                </div>
                <div className="bg-slate-800 rounded-lg p-3 text-center">
                  <div className="text-xl font-bold text-purple-400">{userData.metrics.avgResponseTime}min</div>
                  <div className="text-xs text-slate-400">Resp. Média</div>
                </div>
                <div className="bg-slate-800 rounded-lg p-3 text-center">
                  <div className="text-xl font-bold text-yellow-400">{userData.metrics.customerSatisfaction}</div>
                  <div className="text-xs text-slate-400">Satisfação</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-slate-800 border-slate-700">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
            <TabsTrigger value="activity">Atividades</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Informações Pessoais */}
              <Card className="bg-slate-900 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Informações Pessoais
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <Label className="text-slate-400">Email</Label>
                      {isEditing ? (
                        <Input
                          value={userData.email}
                          onChange={(e) => setUserData({...userData, email: e.target.value})}
                          className="bg-slate-800 border-slate-600 text-white"
                        />
                      ) : (
                        <p className="text-white">{userData.email}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label className="text-slate-400">Telefone</Label>
                      {isEditing ? (
                        <Input
                          value={userData.phone}
                          onChange={(e) => setUserData({...userData, phone: e.target.value})}
                          className="bg-slate-800 border-slate-600 text-white"
                        />
                      ) : (
                        <p className="text-white">{userData.phone}</p>
                      )}
                    </div>

                    <div>
                      <Label className="text-slate-400">Aniversário</Label>
                      <p className="text-white">{formatDate(userData.birthday)}</p>
                    </div>

                    <div>
                      <Label className="text-slate-400">Gestor</Label>
                      <p className="text-white">{userData.manager}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Habilidades */}
              <Card className="bg-slate-900 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    Habilidades
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {userData.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="bg-slate-700 text-slate-300">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Conquistas */}
              <Card className="bg-slate-900 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Conquistas Recentes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {userData.achievements.slice(0, 3).map((achievement) => (
                    <div key={achievement.id} className="flex items-center gap-3">
                      <span className="text-2xl">{achievement.icon}</span>
                      <div className="flex-1">
                        <h4 className="text-white font-medium text-sm">{achievement.title}</h4>
                        <p className="text-slate-400 text-xs">{achievement.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Bio */}
            <Card className="bg-slate-900 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Sobre</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea
                    value={userData.bio}
                    onChange={(e) => setUserData({...userData, bio: e.target.value})}
                    className="bg-slate-800 border-slate-600 text-white"
                    rows={3}
                  />
                ) : (
                  <p className="text-slate-300">{userData.bio}</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-slate-900 border-slate-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-sm flex items-center gap-2">
                    <Target className="w-4 h-4 text-green-400" />
                    Conversão de Leads
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-400 mb-2">{userData.metrics.leadsConverted}</div>
                  <Progress value={85} className="h-2 mb-2" />
                  <p className="text-xs text-slate-400">85% da meta mensal</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-sm flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-blue-400" />
                    Vendas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-400 mb-2">{formatCurrency(userData.metrics.totalSales)}</div>
                  <Progress value={92} className="h-2 mb-2" />
                  <p className="text-xs text-slate-400">92% da meta mensal</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-sm flex items-center gap-2">
                    <Clock className="w-4 h-4 text-purple-400" />
                    Tempo de Resposta
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-400 mb-2">{userData.metrics.avgResponseTime}min</div>
                  <Progress value={75} className="h-2 mb-2" />
                  <p className="text-xs text-slate-400">Excelente performance</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-sm flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    Satisfação
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-400 mb-2">{userData.metrics.customerSatisfaction}/5</div>
                  <Progress value={96} className="h-2 mb-2" />
                  <p className="text-xs text-slate-400">96% de satisfação</p>
                </CardContent>
              </Card>
            </div>

            {/* Gráfico de Performance (placeholder) */}
            <Card className="bg-slate-900 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Performance nos Últimos 6 Meses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-slate-800 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-400">Gráfico de performance seria implementado aqui</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Preferências */}
              <Card className="bg-slate-900 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Preferências
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-slate-400">Tema</Label>
                    <Select value={userData.preferences.theme}>
                      <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dark">Escuro</SelectItem>
                        <SelectItem value="light">Claro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-slate-400">Idioma</Label>
                    <Select value={userData.preferences.language}>
                      <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pt-BR">Português (BR)</SelectItem>
                        <SelectItem value="en-US">English (US)</SelectItem>
                        <SelectItem value="es-ES">Español</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-slate-400">Fuso Horário</Label>
                    <Select value={userData.preferences.timezone}>
                      <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/Sao_Paulo">São Paulo (GMT-3)</SelectItem>
                        <SelectItem value="America/New_York">Nova York (GMT-5)</SelectItem>
                        <SelectItem value="Europe/London">Londres (GMT+0)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Notificações */}
              <Card className="bg-slate-900 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Notificações
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Email</Label>
                      <p className="text-xs text-slate-400">Receber notificações por email</p>
                    </div>
                    <Switch 
                      checked={userData.preferences.notifications.email}
                      onCheckedChange={(checked) => 
                        setUserData({
                          ...userData, 
                          preferences: {
                            ...userData.preferences,
                            notifications: {
                              ...userData.preferences.notifications,
                              email: checked
                            }
                          }
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Push</Label>
                      <p className="text-xs text-slate-400">Notificações push no navegador</p>
                    </div>
                    <Switch 
                      checked={userData.preferences.notifications.push}
                      onCheckedChange={(checked) => 
                        setUserData({
                          ...userData, 
                          preferences: {
                            ...userData.preferences,
                            notifications: {
                              ...userData.preferences.notifications,
                              push: checked
                            }
                          }
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Novos Leads</Label>
                      <p className="text-xs text-slate-400">Alertas de leads atribuídos</p>
                    </div>
                    <Switch 
                      checked={userData.preferences.notifications.leads}
                      onCheckedChange={(checked) => 
                        setUserData({
                          ...userData, 
                          preferences: {
                            ...userData.preferences,
                            notifications: {
                              ...userData.preferences.notifications,
                              leads: checked
                            }
                          }
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Reuniões</Label>
                      <p className="text-xs text-slate-400">Lembretes de reuniões</p>
                    </div>
                    <Switch 
                      checked={userData.preferences.notifications.meetings}
                      onCheckedChange={(checked) => 
                        setUserData({
                          ...userData, 
                          preferences: {
                            ...userData.preferences,
                            notifications: {
                              ...userData.preferences.notifications,
                              meetings: checked
                            }
                          }
                        })
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Redes Sociais */}
            <Card className="bg-slate-900 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Redes Sociais
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-slate-400 flex items-center gap-2">
                      <Linkedin className="w-4 h-4" />
                      LinkedIn
                    </Label>
                    <Input
                      value={userData.socialLinks.linkedin || ''}
                      onChange={(e) => setUserData({
                        ...userData,
                        socialLinks: { ...userData.socialLinks, linkedin: e.target.value }
                      })}
                      className="bg-slate-800 border-slate-600 text-white"
                      placeholder="https://linkedin.com/in/usuario"
                      disabled={!isEditing}
                    />
                  </div>

                  <div>
                    <Label className="text-slate-400 flex items-center gap-2">
                      <Github className="w-4 h-4" />
                      GitHub
                    </Label>
                    <Input
                      value={userData.socialLinks.github || ''}
                      onChange={(e) => setUserData({
                        ...userData,
                        socialLinks: { ...userData.socialLinks, github: e.target.value }
                      })}
                      className="bg-slate-800 border-slate-600 text-white"
                      placeholder="https://github.com/usuario"
                      disabled={!isEditing}
                    />
                  </div>

                  <div>
                    <Label className="text-slate-400 flex items-center gap-2">
                      <Twitter className="w-4 h-4" />
                      Twitter
                    </Label>
                    <Input
                      value={userData.socialLinks.twitter || ''}
                      onChange={(e) => setUserData({
                        ...userData,
                        socialLinks: { ...userData.socialLinks, twitter: e.target.value }
                      })}
                      className="bg-slate-800 border-slate-600 text-white"
                      placeholder="https://twitter.com/usuario"
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <Card className="bg-slate-900 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Atividades Recentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userData.activity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-slate-800">
                      <div className={`p-2 rounded-lg bg-slate-700 ${getActivityColor(activity.type)}`}>
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-sm">{activity.description}</p>
                        <p className="text-slate-400 text-xs">
                          {activity.timestamp.toLocaleString('pt-BR')}
                        </p>
                      </div>
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

export default UserProfile; 