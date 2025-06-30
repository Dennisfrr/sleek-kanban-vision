
import { useState } from 'react';
import { Lead } from '@/types/crm';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Mail, 
  Phone, 
  Building, 
  Calendar, 
  DollarSign, 
  User, 
  Edit,
  MoreVertical,
  Star,
  Clock,
  MessageSquare
} from 'lucide-react';

interface LeadCardProps {
  lead: Lead;
  onStatusChange: (leadId: string, newStatus: Lead['status']) => void;
}

const LeadCard = ({ lead, onStatusChange }: LeadCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR').format(date);
  };

  const getPriorityColor = (priority: Lead['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: Lead['status']) => {
    switch (status) {
      case 'prospect':
        return 'bg-gray-100 text-gray-700';
      case 'qualified':
        return 'bg-blue-100 text-blue-700';
      case 'proposal':
        return 'bg-yellow-100 text-yellow-700';
      case 'negotiation':
        return 'bg-orange-100 text-orange-700';
      case 'closed-won':
        return 'bg-green-100 text-green-700';
      case 'closed-lost':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleStatusChange = (newStatus: string) => {
    onStatusChange(lead.id, newStatus as Lead['status']);
    setIsOpen(false);
  };

  const getDaysInStage = () => {
    const days = Math.floor((new Date().getTime() - lead.updatedAt.getTime()) / (1000 * 60 * 60 * 24));
    return days;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border-l-4 border-l-blue-500 group">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {lead.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-gray-900 truncate">
                      {lead.name}
                    </h3>
                    <p className="text-xs text-gray-600 truncate">
                      {lead.company}
                    </p>
                  </div>
                  {lead.priority === 'high' && (
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  )}
                </div>
              </div>
              <Button
                variant="ghost" 
                size="sm" 
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-xs text-gray-600">
                <DollarSign className="w-3 h-3 mr-1" />
                <span className="font-medium text-green-600">
                  {formatCurrency(lead.value)}
                </span>
              </div>
              <Badge className={`text-xs px-2 py-1 ${getPriorityColor(lead.priority)}`}>
                {lead.priority.toUpperCase()}
              </Badge>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                <span>{getDaysInStage()}d na etapa</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                <span>{formatDate(lead.updatedAt)}</span>
              </div>
            </div>

            {lead.notes && (
              <div className="flex items-center text-xs text-gray-500">
                <MessageSquare className="w-3 h-3 mr-1" />
                <span className="truncate">{lead.notes}</span>
              </div>
            )}

            <div className="flex items-center gap-2 pt-2">
              <Button size="sm" variant="outline" className="flex-1 text-xs">
                <Phone className="w-3 h-3 mr-1" />
                Ligar
              </Button>
              <Button size="sm" variant="outline" className="flex-1 text-xs">
                <Mail className="w-3 h-3 mr-1" />
                Email
              </Button>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
              {lead.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <span>Detalhes do Lead</span>
              <p className="text-sm font-normal text-gray-600">{lead.name} - {lead.company}</p>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Informações do Lead */}
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Informações de Contato</h4>
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <User className="w-4 h-4 mr-3 text-gray-400" />
                  <span className="font-medium">{lead.name}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Building className="w-4 h-4 mr-3 text-gray-400" />
                  <span>{lead.company}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Mail className="w-4 h-4 mr-3 text-gray-400" />
                  <span className="text-blue-600">{lead.email}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="w-4 h-4 mr-3 text-gray-400" />
                  <span>{lead.phone}</span>
                </div>
                <div className="flex items-center text-sm">
                  <DollarSign className="w-4 h-4 mr-3 text-gray-400" />
                  <span className="font-medium text-green-600">
                    {formatCurrency(lead.value)}
                  </span>
                </div>
              </div>
            </div>

            {lead.notes && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Observações</h4>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  {lead.notes}
                </p>
              </div>
            )}
          </div>

          {/* Controles e Status */}
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Status e Prioridade</h4>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Status Atual
                  </label>
                  <Select defaultValue={lead.status} onValueChange={handleStatusChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="prospect">Prospect</SelectItem>
                      <SelectItem value="qualified">Qualificado</SelectItem>
                      <SelectItem value="proposal">Proposta</SelectItem>
                      <SelectItem value="negotiation">Negociação</SelectItem>
                      <SelectItem value="closed-won">Fechado - Ganho</SelectItem>
                      <SelectItem value="closed-lost">Fechado - Perdido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <Badge className={`${getPriorityColor(lead.priority)}`}>
                    Prioridade: {lead.priority.toUpperCase()}
                  </Badge>
                  <Badge className={`${getStatusColor(lead.status)}`}>
                    {lead.status.replace('-', ' ').toUpperCase()}
                  </Badge>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Ações Rápidas</h4>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Ligar
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Enviar Email
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Agendar
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Edit className="w-4 h-4" />
                  Editar
                </Button>
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Timeline</h4>
              <div className="text-xs text-gray-600 space-y-1">
                <div>Criado em: {formatDate(lead.createdAt)}</div>
                <div>Última atualização: {formatDate(lead.updatedAt)}</div>
                <div>Tempo na etapa atual: {getDaysInStage()} dias</div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeadCard;
