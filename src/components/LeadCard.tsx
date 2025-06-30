
import { useState } from 'react';
import { Lead } from '@/types/crm';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Building, Mail, Phone, DollarSign, Calendar, AlertCircle, Eye } from 'lucide-react';

interface LeadCardProps {
  lead: Lead;
  onStatusChange?: (leadId: string, newStatus: Lead['status']) => void;
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertCircle className="w-3 h-3" />;
      case 'medium': return <AlertCircle className="w-3 h-3" />;
      case 'low': return <AlertCircle className="w-3 h-3" />;
      default: return null;
    }
  };

  return (
    <>
      <Card className="mb-3 cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-[1.02] bg-white border border-gray-200">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-sm">{lead.name}</h3>
              <div className="flex items-center text-xs text-gray-600 mt-1">
                <Building className="w-3 h-3 mr-1" />
                {lead.company}
              </div>
            </div>
            <Badge className={`text-xs px-2 py-1 ${getPriorityColor(lead.priority)}`}>
              {getPriorityIcon(lead.priority)}
              <span className="ml-1 capitalize">{lead.priority}</span>
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-xs text-gray-600">
                <DollarSign className="w-3 h-3 mr-1" />
                {formatCurrency(lead.value)}
              </div>
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="h-6 px-2 text-xs">
                    <Eye className="w-3 h-3 mr-1" />
                    Ver
                  </Button>
                </DialogTrigger>
              </Dialog>
            </div>
            <div className="flex items-center text-xs text-gray-500">
              <Calendar className="w-3 h-3 mr-1" />
              {formatDate(lead.updatedAt)}
            </div>
          </div>
        </CardContent>
      </Card>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building className="w-5 h-5" />
            {lead.name} - {lead.company}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Informações de Contato</label>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center text-sm">
                    <Mail className="w-4 h-4 mr-2 text-gray-400" />
                    {lead.email}
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="w-4 h-4 mr-2 text-gray-400" />
                    {lead.phone}
                  </div>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Valor do Negócio</label>
                <div className="mt-1 text-lg font-semibold text-green-600">
                  {formatCurrency(lead.value)}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Prioridade</label>
                <div className="mt-1">
                  <Badge className={`${getPriorityColor(lead.priority)}`}>
                    {getPriorityIcon(lead.priority)}
                    <span className="ml-1 capitalize">{lead.priority}</span>
                  </Badge>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Datas</label>
                <div className="mt-2 space-y-1 text-sm text-gray-600">
                  <div>Criado: {formatDate(lead.createdAt)}</div>
                  <div>Atualizado: {formatDate(lead.updatedAt)}</div>
                </div>
              </div>
            </div>
          </div>
          {lead.notes && (
            <div>
              <label className="text-sm font-medium text-gray-700">Observações</label>
              <div className="mt-1 p-3 bg-gray-50 rounded-md text-sm text-gray-700">
                {lead.notes}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </>
  );
};

export default LeadCard;
