import React, { useState } from 'react';
import { Lead, KanbanColumn } from '@/types/crm';
import { kanbanColumns as initialColumns } from '@/data/mockData';
import LeadCard from './LeadCard';
import AddLeadForm from './AddLeadForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Search, Filter, X } from 'lucide-react';

const KanbanBoard = () => {
  const [columns, setColumns] = useState<KanbanColumn[]>(initialColumns);
  const [draggedLead, setDraggedLead] = useState<Lead | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);

  // Filter leads based on search term
  const filteredColumns = columns.map(column => ({
    ...column,
    leads: column.leads.filter(lead => 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm)
    )
  }));

  const handleDragStart = (e: React.DragEvent, lead: Lead) => {
    setDraggedLead(lead);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, columnStatus: Lead['status']) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverColumn(columnStatus);
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = (e: React.DragEvent, targetStatus: Lead['status']) => {
    e.preventDefault();
    
    if (!draggedLead || draggedLead.status === targetStatus) {
      setDraggedLead(null);
      setDragOverColumn(null);
      return;
    }

    setColumns(prevColumns => {
      const newColumns = [...prevColumns];
      
      // Remove lead from current column
      newColumns.forEach(column => {
        column.leads = column.leads.filter(lead => lead.id !== draggedLead.id);
      });
      
      // Add lead to target column
      const targetColumn = newColumns.find(col => col.status === targetStatus);
      if (targetColumn) {
        const updatedLead = { 
          ...draggedLead, 
          status: targetStatus, 
          updatedAt: new Date() 
        };
        targetColumn.leads.push(updatedLead);
      }
      
      return newColumns;
    });

    setDraggedLead(null);
    setDragOverColumn(null);
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

  const handleAddLead = (newLead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>) => {
    const lead: Lead = {
      ...newLead,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setColumns(prevColumns => {
      const newColumns = [...prevColumns];
      const targetColumn = newColumns.find(col => col.status === lead.status);
      if (targetColumn) {
        targetColumn.leads.push(lead);
      }
      return newColumns;
    });

    setIsAddLeadOpen(false);
  };

  return (
    <div className="h-screen bg-slate-950 p-6 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center hover-glow">
              <div className="w-3 h-3 bg-white rounded-sm"></div>
            </div>
            <h1 className="text-white text-lg font-medium tracking-wide">NOVOS CONTATOS</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Search Input */}
          {showSearch ? (
            <div className="flex items-center gap-2 bg-slate-800 rounded-lg px-3 py-1">
              <Search className="w-4 h-4 text-slate-400" />
              <Input
                placeholder="Buscar contatos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent border-none text-white text-sm w-48 h-6 p-0 focus-visible:ring-0"
                autoFocus
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowSearch(false);
                  setSearchTerm('');
                }}
                className="h-6 w-6 p-0 text-slate-400 hover:text-white"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSearch(true)}
                className="text-slate-400 hover:text-white hover:bg-slate-800 h-8 w-8 p-0 focus-ring"
              >
                <Search className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-400 hover:text-white hover:bg-slate-800 h-8 w-8 p-0 focus-ring"
              >
                <Filter className="w-4 h-4" />
              </Button>
            </>
          )}
          
          {/* Add Lead Dialog */}
          <Dialog open={isAddLeadOpen} onOpenChange={setIsAddLeadOpen}>
            <DialogTrigger asChild>
              <Button
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 h-8 hover-glow focus-ring"
              >
                <Plus className="w-3 h-3 mr-1" />
                Adicionar
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-md">
              <DialogHeader>
                <DialogTitle className="text-white">Novo Contato</DialogTitle>
              </DialogHeader>
              <AddLeadForm onSubmit={handleAddLead} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search Results Info */}
      {searchTerm && (
        <div className="mb-4">
          <p className="text-slate-400 text-sm">
            Mostrando {filteredColumns.reduce((total, col) => total + col.leads.length, 0)} resultados para "{searchTerm}"
          </p>
        </div>
      )}

      {/* Kanban Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-[calc(100vh-180px)]">
        {filteredColumns.map((column) => (
          <div
            key={column.id}
            className={`flex flex-col h-full kanban-column ${
              dragOverColumn === column.status ? 'drag-over' : ''
            }`}
            onDragOver={(e) => handleDragOver(e, column.status)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, column.status)}
          >
            {/* Column Header - com fundo azul como na imagem */}
            <div className="bg-blue-700 rounded-t-lg px-4 py-3 flex items-center justify-between flex-shrink-0 glass-effect">
              <h2 className="text-white font-medium text-sm">{column.title}</h2>
              <span className="text-blue-200 text-xs bg-blue-600 px-2 py-1 rounded-full">
                {column.leads.length}
              </span>
            </div>

            {/* Column Content */}
            <div className="bg-slate-800 rounded-b-lg p-3 flex-1 overflow-y-auto kanban-scrollbar">
              <div className="space-y-3">
                {column.leads.map((lead) => (
                  <div
                    key={lead.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, lead)}
                    className={`cursor-move kanban-card ${
                      draggedLead?.id === lead.id ? 'dragging' : ''
                    }`}
                  >
                    <LeadCard
                      lead={lead}
                      onStatusChange={handleStatusChange}
                    />
                  </div>
                ))}
                
                {/* Empty State */}
                {column.leads.length === 0 && (
                  <div className="text-slate-500 text-xs text-center py-8 border border-dashed border-slate-600 rounded glass-effect">
                    <div className="opacity-50">
                      <Plus className="w-6 h-6 mx-auto mb-2" />
                      <p>{searchTerm ? 'Nenhum resultado' : 'Nenhum contato'}</p>
                      <p className="text-slate-600 text-xs mt-1">
                        {searchTerm ? 'Tente outro termo' : 'Arraste cards aqui'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;

