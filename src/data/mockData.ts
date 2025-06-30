
import { Lead, KanbanColumn } from '@/types/crm';

export const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'João Silva',
    company: 'Tech Solutions Ltda',
    email: 'joao@techsolutions.com',
    phone: '(11) 99999-0001',
    value: 15000,
    status: 'prospect',
    priority: 'high',
    createdAt: new Date('2024-06-25'),
    updatedAt: new Date('2024-06-25'),
    notes: 'Interessado em nossa solução de CRM'
  },
  {
    id: '2',
    name: 'Maria Santos',
    company: 'Innovate Corp',
    email: 'maria@innovate.com',
    phone: '(11) 99999-0002',
    value: 25000,
    status: 'qualified',
    priority: 'high',
    createdAt: new Date('2024-06-20'),
    updatedAt: new Date('2024-06-28'),
    notes: 'Reunião agendada para próxima semana'
  },
  {
    id: '3',
    name: 'Pedro Costa',
    company: 'StartupXYZ',
    email: 'pedro@startupxyz.com',
    phone: '(11) 99999-0003',
    value: 8000,
    status: 'proposal',
    priority: 'medium',
    createdAt: new Date('2024-06-15'),
    updatedAt: new Date('2024-06-29'),
    notes: 'Proposta enviada, aguardando feedback'
  },
  {
    id: '4',
    name: 'Ana Oliveira',
    company: 'Global Industries',
    email: 'ana@global.com',
    phone: '(11) 99999-0004',
    value: 45000,
    status: 'negotiation',
    priority: 'high',
    createdAt: new Date('2024-06-10'),
    updatedAt: new Date('2024-06-29'),
    notes: 'Negociando desconto para contrato anual'
  },
  {
    id: '5',
    name: 'Carlos Roberto',
    company: 'Success Ventures',
    email: 'carlos@success.com',
    phone: '(11) 99999-0005',
    value: 30000,
    status: 'closed-won',
    priority: 'high',
    createdAt: new Date('2024-06-01'),
    updatedAt: new Date('2024-06-25'),
    notes: 'Contrato assinado! Cliente muito satisfeito.'
  }
];

export const kanbanColumns: KanbanColumn[] = [
  {
    id: 'prospect',
    title: 'Prospects',
    status: 'prospect',
    color: 'bg-slate-100 border-slate-300',
    leads: mockLeads.filter(lead => lead.status === 'prospect')
  },
  {
    id: 'qualified',
    title: 'Qualificados',
    status: 'qualified',
    color: 'bg-blue-50 border-blue-300',
    leads: mockLeads.filter(lead => lead.status === 'qualified')
  },
  {
    id: 'proposal',
    title: 'Proposta',
    status: 'proposal',
    color: 'bg-yellow-50 border-yellow-300',
    leads: mockLeads.filter(lead => lead.status === 'proposal')
  },
  {
    id: 'negotiation',
    title: 'Negociação',
    status: 'negotiation',
    color: 'bg-orange-50 border-orange-300',
    leads: mockLeads.filter(lead => lead.status === 'negotiation')
  },
  {
    id: 'closed-won',
    title: 'Fechado',
    status: 'closed-won',
    color: 'bg-green-50 border-green-300',
    leads: mockLeads.filter(lead => lead.status === 'closed-won')
  }
];
