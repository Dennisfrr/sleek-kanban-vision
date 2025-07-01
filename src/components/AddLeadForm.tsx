import { useState } from 'react';
import { Lead } from '@/types/crm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';

interface AddLeadFormProps {
  onSubmit: (lead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

const AddLeadForm = ({ onSubmit }: AddLeadFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    value: 0,
    status: 'sem-classificacao' as Lead['status'],
    priority: 'medium' as Lead['priority'],
    notes: '',
    avatar: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    
    // Reset form
    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      value: 0,
      status: 'sem-classificacao',
      priority: 'medium',
      notes: '',
      avatar: ''
    });
    
    setIsOpen(false);
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Novo Lead
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Lead</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-slate-400">Nome *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
                className="bg-slate-800 border-slate-700 text-white"
                placeholder="Nome completo"
              />
            </div>
            <div>
              <Label htmlFor="company" className="text-slate-400">Empresa *</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => handleChange('company', e.target.value)}
                required
                className="bg-slate-800 border-slate-700 text-white"
                placeholder="Nome da empresa"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email" className="text-slate-400">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                required
                className="bg-slate-800 border-slate-700 text-white"
                placeholder="email@exemplo.com"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-slate-400">Telefone *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                required
                className="bg-slate-800 border-slate-700 text-white"
                placeholder="(11) 99999-9999"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="value" className="text-slate-400">Valor (R$)</Label>
              <Input
                id="value"
                type="number"
                value={formData.value}
                onChange={(e) => handleChange('value', parseFloat(e.target.value) || 0)}
                className="bg-slate-800 border-slate-700 text-white"
                placeholder="0"
              />
            </div>
            <div>
              <Label htmlFor="priority" className="text-slate-400">Prioridade</Label>
              <Select value={formData.priority} onValueChange={(value) => handleChange('priority', value)}>
                <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="low">Baixa</SelectItem>
                  <SelectItem value="medium">Média</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="status" className="text-slate-400">Status Inicial</Label>
            <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
              <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
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

          <div>
            <Label htmlFor="avatar" className="text-slate-400">URL da Foto (opcional)</Label>
            <Input
              id="avatar"
              value={formData.avatar}
              onChange={(e) => handleChange('avatar', e.target.value)}
              className="bg-slate-800 border-slate-700 text-white"
              placeholder="https://exemplo.com/foto.jpg"
            />
          </div>

          <div>
            <Label htmlFor="notes" className="text-slate-400">Observações</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              className="bg-slate-800 border-slate-700 text-white min-h-20"
              placeholder="Informações adicionais sobre o contato..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              disabled={!formData.name || !formData.company || !formData.email || !formData.phone}
            >
              Criar Contato
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddLeadForm;
