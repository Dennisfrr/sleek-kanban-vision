export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  value: number;
  status: 'sem-classificacao' | 'contato-feito' | 'identificacao-interesse' | 'apresentacao';
  createdAt: Date;
  updatedAt: Date;
  notes?: string;
  priority: 'low' | 'medium' | 'high';
  avatar?: string;
}

export interface KanbanColumn {
  id: string;
  title: string;
  status: Lead['status'];
  color: string;
  leads: Lead[];
}
