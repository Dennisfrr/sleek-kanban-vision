
import { useState } from 'react';
import { Lead } from '@/types/crm';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Phone, Building, Calendar, DollarSign } from 'lucide-react';

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

  const handleStatusChange = (newStatus: string) => {
    onStatusChange(lead.id, newStatus as Lead['status']);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Card className="cursor-pointer hover:shadow-md transition-shadow duration-200 border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-sm text-gray-900 truncate">
                  {lead.name}
                </h3>
                <p className="text-xs text-gray-600 truncate mt-1">
                  {lead.company}
                </p>
              </div>
              <Badge className={`text-xs px-2 py-1 ${getPriorityColor(lead.priority)}`}>
                {lead.priority.toUpperCase()}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              <div className="flex items-center text-xs text-gray-600">
                <DollarSign className="w-3 h-3 mr-1" />
                <span className="font-medium text-green-600">
                  {formatCurrency(lead.value)}
                </span>
              </div>
              <div className="flex items-center text-xs text-gray-500">
                <Calendar className="w-3 h-3 mr-1" />
                <span>{formatDate(lead.updatedAt)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Detalhes do Lead</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg">{lead.name}</h3>
            <div className="flex items-center text-gray-600 mt-1">
              <Building className="w-4 h-4 mr-2" />
              <span>{lead.company}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center text-sm">
              <Mail className="w-4 h-4 mr-2 text-gray-400" />
              <span>{lead.email}</span>
            </div>
            <div className="flex items-center text-sm">
              <Phone className="w-4 h-4 mr-2 text-gray-400" />
              <span>{lead.phone}</span>
            </div>
            <div className="flex items-center text-sm">
              <DollarSign className="w-4 h-4 mr-2 text-gray-400" />
              <span className="font-medium text-green-600">
                {formatCurrency(lead.value)}
              </span>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Status
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

          {lead.notes && (
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Observações
              </label>
              <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                {lead.notes}
              </p>
            </div>
          )}

          <div className="flex items-center justify-between pt-2 border-t">
            <div>
              <Badge className={`${getPriorityColor(lead.priority)}`}>
                Prioridade: {lead.priority.toUpperCase()}
              </Badge>
            </div>
            <div className="text-xs text-gray-500">
              Criado em: {formatDate(lead.createdAt)}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeadCard;
