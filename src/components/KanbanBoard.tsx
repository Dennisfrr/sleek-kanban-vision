
import { useState } from 'react';
import { Lead, KanbanColumn } from '@/types/crm';
import { kanbanColumns as initialColumns } from '@/data/mockData';
import LeadCard from './LeadCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const KanbanBoard = () => {
  const [columns, setColumns] = useState<KanbanColumn[]>(initialColumns);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getColumnTotal = (leads: Lead[]) => {
    return leads.reduce((sum, lead) => sum + lead.value, 0);
  };

  const handleStatusChange = (leadId: string, newStatus: Lead['status']) => {
    setColumns(prevColumns => {
      const newColumns = [...prevColumns];
      
      // Find and remove lead from current column
      let movedLead: Lead | null = null;
      newColumns.forEach(column => {
        const leadIndex = column.leads.findIndex(lead => lead.id === leadId);
        if (leadIndex !== -1) {
          movedLead = { ...column.leads[leadIndex], status: newStatus, updatedAt: new Date() };
          column.leads.splice(leadIndex, 1);
        }
      });
      
      // Add lead to new column
      if (movedLead) {
        const targetColumn = newColumns.find(col => col.status === newStatus);
        if (targetColumn) {
          targetColumn.leads.push(movedLead);
        }
      }
      
      return newColumns;
    });
  };

  return (
    <div className="flex gap-6 overflow-x-auto pb-4 min-h-[600px]">
      {columns.map((column) => (
        <div key={column.id} className="flex-shrink-0 w-80">
          <Card className={`h-full ${column.color} border-2`}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold text-gray-800">
                  {column.title}
                </CardTitle>
                <Badge variant="secondary" className="bg-white/80 text-gray-700">
                  {column.leads.length}
                </Badge>
              </div>
              <div className="text-sm font-medium text-gray-600">
                Total: {formatCurrency(getColumnTotal(column.leads))}
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {column.leads.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p className="text-sm">Nenhum lead nesta etapa</p>
                  </div>
                ) : (
                  column.leads.map((lead) => (
                    <LeadCard
                      key={lead.id}
                      lead={lead}
                      onStatusChange={handleStatusChange}
                    />
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
