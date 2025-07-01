import { useState } from 'react';
import { Lead } from '@/types/crm';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MoreVertical } from 'lucide-react';

interface LeadCardProps {
  lead: Lead;
  onStatusChange: (leadId: string, newStatus: Lead['status']) => void;
  isDarkTheme?: boolean;
}

const LeadCard = ({ lead, onStatusChange, isDarkTheme = true }: LeadCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n.charAt(0)).join('').toUpperCase().slice(0, 2);
  };

  const handleStatusChange = (newStatus: string) => {
    onStatusChange(lead.id, newStatus as Lead['status']);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Card className="bg-slate-700 border-slate-600 hover:bg-slate-650 cursor-pointer transition-all duration-200 group glass-effect hover-glow">
          <CardContent className="p-3">
            {/* Avatar e Nome na mesma linha */}
            <div className="flex items-center gap-3 mb-2">
              <div className="flex-shrink-0">
                {lead.avatar ? (
                  <img 
                    src={lead.avatar} 
                    alt={lead.name}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-slate-600 group-hover:ring-blue-500 transition-all"
                  />
                ) : (
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium group-hover:bg-blue-400 transition-colors">
                    {getInitials(lead.name)}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-medium text-sm truncate group-hover:text-blue-100 transition-colors">
                  {lead.name}
                </h3>
              </div>
              <Button
                variant="ghost" 
                size="sm" 
                className="opacity-0 group-hover:opacity-100 transition-all w-6 h-6 p-0 hover:bg-slate-600 text-slate-400 hover:text-white focus-ring"
              >
                <MoreVertical className="w-3 h-3" />
              </Button>
            </div>

            {/* Informações de contato - bem minimalistas */}
            <div className="space-y-1 text-xs">
              <div className="text-slate-300 truncate group-hover:text-slate-200 transition-colors">
                {lead.company}
              </div>
              <div className="text-slate-400 truncate group-hover:text-slate-300 transition-colors">
                {lead.phone}
              </div>
              <div className="text-slate-400 truncate group-hover:text-slate-300 transition-colors">
                {lead.email}
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>

      <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-md glass-effect">
        <DialogHeader>
          <DialogTitle className="text-white">Detalhes do Contato</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            {lead.avatar ? (
              <img 
                src={lead.avatar} 
                alt={lead.name}
                className="w-16 h-16 rounded-full object-cover ring-2 ring-slate-600 hover-glow"
              />
            ) : (
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-lg font-bold hover-glow">
                {getInitials(lead.name)}
              </div>
            )}
            <div>
              <h3 className="text-xl font-semibold text-white">{lead.name}</h3>
              <p className="text-slate-400">{lead.company}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-slate-800 rounded-lg">
              <label className="text-sm text-slate-400">Email</label>
              <p className="text-white text-sm break-all">{lead.email}</p>
            </div>
            <div className="p-3 bg-slate-800 rounded-lg">
              <label className="text-sm text-slate-400">Telefone</label>
              <p className="text-white text-sm">{lead.phone}</p>
            </div>
            <div className="p-3 bg-slate-800 rounded-lg">
              <label className="text-sm text-slate-400">Valor</label>
              <p className="text-green-400 text-sm font-semibold">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(lead.value)}
              </p>
            </div>
            <div className="p-3 bg-slate-800 rounded-lg">
              <label className="text-sm text-slate-400">Prioridade</label>
              <p className="text-white text-sm capitalize">{lead.priority}</p>
            </div>
          </div>

          {lead.notes && (
            <div className="p-3 bg-slate-800 rounded-lg">
              <label className="text-sm text-slate-400">Observações</label>
              <p className="text-white text-sm mt-1">{lead.notes}</p>
            </div>
          )}

          <div>
            <label className="text-sm text-slate-400 block mb-2">Status</label>
            <Select value={lead.status} onValueChange={handleStatusChange}>
              <SelectTrigger className="bg-slate-800 border-slate-700 text-white focus-ring">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="sem-classificacao">Sem classificação</SelectItem>
                <SelectItem value="contato-feito">Contato Feito</SelectItem>
                <SelectItem value="identificacao-interesse">Identificação de Interesse</SelectItem>
                <SelectItem value="apresentacao">Apresentação</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeadCard;
