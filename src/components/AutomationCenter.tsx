import React, { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Play, 
  Save, 
  Zap, 
  Mail, 
  Phone, 
  Clock, 
  Database, 
  Filter,
  Send,
  MessageSquare,
  Calendar,
  User,
  ZoomIn,
  ZoomOut,
  Trash2,
  Webhook,
  Code,
  Globe,
  Slack,
  ShoppingCart,
  Hash,
  Split,
  Merge,
  FileX,
  PlayCircle,
  Target,
  AlertCircle,
  CheckCircle,
  Settings,
  FileText
} from 'lucide-react';

interface WorkflowNode {
  id: string;
  type: 'trigger' | 'action' | 'condition' | 'helper';
  category: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  position: { x: number; y: number };
  data: Record<string, any>;
  connections: string[];
  isConfigured: boolean;
}

interface Connection {
  id: string;
  from: string;
  to: string;
}

interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  nodes: Omit<WorkflowNode, 'id'>[];
  connections: Omit<Connection, 'id'>[];
  category: string;
}

const nodeTypes = [
  // Triggers
  {
    id: 'new-lead',
    type: 'trigger' as const,
    category: 'Triggers',
    name: 'Novo Lead',
    description: 'Acionado quando um novo lead é criado',
    icon: User,
    color: 'bg-green-500'
  },
  {
    id: 'lead-status-change',
    type: 'trigger' as const,
    category: 'Triggers', 
    name: 'Mudança de Status',
    description: 'Acionado quando status do lead muda',
    icon: Target,
    color: 'bg-green-500'
  },
  {
    id: 'scheduled',
    type: 'trigger' as const,
    category: 'Triggers',
    name: 'Agendado',
    description: 'Executa em horários programados',
    icon: Clock,
    color: 'bg-green-500'
  },
  {
    id: 'webhook',
    type: 'trigger' as const,
    category: 'Triggers',
    name: 'Webhook',
    description: 'Recebe dados via HTTP webhook',
    icon: Webhook,
    color: 'bg-green-500'
  },
  {
    id: 'form-submit',
    type: 'trigger' as const,
    category: 'Triggers',
    name: 'Formulário Enviado',
    description: 'Acionado quando formulário é submetido',
    icon: FileText,
    color: 'bg-green-500'
  },
  
  // Actions - Comunicação
  {
    id: 'send-email',
    type: 'action' as const,
    category: 'Comunicação',
    name: 'Enviar Email',
    description: 'Envia email personalizado',
    icon: Mail,
    color: 'bg-blue-500'
  },
  {
    id: 'send-sms',
    type: 'action' as const,
    category: 'Comunicação',
    name: 'Enviar SMS',
    description: 'Envia mensagem SMS',
    icon: MessageSquare,
    color: 'bg-blue-500'
  },
  {
    id: 'make-call',
    type: 'action' as const,
    category: 'Comunicação',
    name: 'Fazer Ligação',
    description: 'Agenda ou faz ligação automaticamente',
    icon: Phone,
    color: 'bg-blue-500'
  },
  {
    id: 'slack-message',
    type: 'action' as const,
    category: 'Comunicação',
    name: 'Slack',
    description: 'Envia mensagem no Slack',
    icon: Slack,
    color: 'bg-blue-500'
  },
  
  // Actions - CRM
  {
    id: 'update-lead',
    type: 'action' as const,
    category: 'CRM',
    name: 'Atualizar Lead',
    description: 'Atualiza dados do lead',
    icon: Database,
    color: 'bg-purple-500'
  },
  {
    id: 'create-task',
    type: 'action' as const,
    category: 'CRM',
    name: 'Criar Tarefa',
    description: 'Cria nova tarefa no sistema',
    icon: Calendar,
    color: 'bg-purple-500'
  },
  {
    id: 'create-deal',
    type: 'action' as const,
    category: 'CRM',
    name: 'Criar Negócio',
    description: 'Cria novo negócio/oportunidade',
    icon: ShoppingCart,
    color: 'bg-purple-500'
  },
  
  // Actions - Integrações
  {
    id: 'google-sheets',
    type: 'action' as const,
    category: 'Integrações',
    name: 'Google Sheets',
    description: 'Adiciona dados ao Google Sheets',
    icon: FileText,
    color: 'bg-indigo-500'
  },
  {
    id: 'zapier',
    type: 'action' as const,
    category: 'Integrações',
    name: 'Zapier',
    description: 'Conecta com automações Zapier',
    icon: Zap,
    color: 'bg-indigo-500'
  },
  {
    id: 'api-request',
    type: 'action' as const,
    category: 'Integrações',
    name: 'HTTP Request',
    description: 'Faz requisição HTTP para API externa',
    icon: Globe,
    color: 'bg-indigo-500'
  },
  
  // Conditions
  {
    id: 'if-condition',
    type: 'condition' as const,
    category: 'Lógica',
    name: 'Condição IF',
    description: 'Executa ação baseada em condição',
    icon: Filter,
    color: 'bg-orange-500'
  },
  {
    id: 'wait',
    type: 'condition' as const,
    category: 'Lógica',
    name: 'Aguardar',
    description: 'Pausa execução por tempo determinado',
    icon: Clock,
    color: 'bg-orange-500'
  },
  {
    id: 'switch',
    type: 'condition' as const,
    category: 'Lógica',
    name: 'Switch',
    description: 'Divide fluxo baseado em múltiplas condições',
    icon: Split,
    color: 'bg-orange-500'
  },
  
  // Helpers
  {
    id: 'code',
    type: 'helper' as const,
    category: 'Helpers',
    name: 'Código',
    description: 'Executa código JavaScript personalizado',
    icon: Code,
    color: 'bg-gray-500'
  },
  {
    id: 'transform-data',
    type: 'helper' as const,
    category: 'Helpers',
    name: 'Transformar Dados',
    description: 'Transforma estrutura dos dados',
    icon: Hash,
    color: 'bg-gray-500'
  },
  {
    id: 'merge',
    type: 'helper' as const,
    category: 'Helpers',
    name: 'Merge',
    description: 'Combina dados de múltiplas fontes',
    icon: Merge,
    color: 'bg-gray-500'
  }
];

const workflowTemplates: WorkflowTemplate[] = [
  {
    id: 'welcome-sequence',
    name: 'Sequência de Boas-Vindas',
    description: 'Envio automático de emails de boas-vindas para novos leads',
    category: 'Lead Nurturing',
    nodes: [
      {
        type: 'trigger',
        category: 'Triggers',
        name: 'Novo Lead',
        description: 'Acionado quando um novo lead é criado',
        icon: User,
        color: 'bg-green-500',
        position: { x: 100, y: 100 },
        data: {},
        connections: ['node-2'],
        isConfigured: true
      },
      {
        type: 'action',
        category: 'Comunicação',
        name: 'Enviar Email',
        description: 'Envia email personalizado',
        icon: Mail,
        color: 'bg-blue-500',
        position: { x: 350, y: 100 },
        data: {
          subject: 'Bem-vindo!',
          template: 'welcome'
        },
        connections: ['node-3'],
        isConfigured: true
      },
      {
        type: 'condition',
        category: 'Lógica',
        name: 'Aguardar',
        description: 'Pausa execução por tempo determinado',
        icon: Clock,
        color: 'bg-orange-500',
        position: { x: 600, y: 100 },
        data: { duration: '24h' },
        connections: ['node-4'],
        isConfigured: true
      },
      {
        type: 'action',
        category: 'CRM',
        name: 'Criar Tarefa',
        description: 'Cria nova tarefa no sistema',
        icon: Calendar,
        color: 'bg-purple-500',
        position: { x: 850, y: 100 },
        data: {
          title: 'Follow-up lead',
          priority: 'medium'
        },
        connections: [],
        isConfigured: true
      }
    ],
    connections: [
      { from: 'node-1', to: 'node-2' },
      { from: 'node-2', to: 'node-3' },
      { from: 'node-3', to: 'node-4' }
    ]
  },
  {
    id: 'lead-scoring',
    name: 'Sistema de Pontuação',
    description: 'Avalia e pontua leads automaticamente',
    category: 'Qualificação',
    nodes: [
      {
        type: 'trigger',
        category: 'Triggers',
        name: 'Mudança de Status',
        description: 'Acionado quando status do lead muda',
        icon: Target,
        color: 'bg-green-500',
        position: { x: 100, y: 100 },
        data: {},
        connections: ['node-2'],
        isConfigured: true
      },
      {
        type: 'condition',
        category: 'Lógica',
        name: 'Condição IF',
        description: 'Executa ação baseada em condição',
        icon: Filter,
        color: 'bg-orange-500',
        position: { x: 350, y: 100 },
        data: { condition: 'score > 80' },
        connections: ['node-3'],
        isConfigured: true
      },
      {
        type: 'action',
        category: 'Comunicação',
        name: 'Slack',
        description: 'Envia mensagem no Slack',
        icon: Slack,
        color: 'bg-blue-500',
        position: { x: 600, y: 100 },
        data: {
          channel: '#vendas',
          message: 'Lead quente identificado!'
        },
        connections: [],
        isConfigured: true
      }
    ],
    connections: [
      { from: 'node-1', to: 'node-2' },
      { from: 'node-2', to: 'node-3' }
    ]
  }
];

const AutomationCenter = () => {
  const [nodes, setNodes] = useState<WorkflowNode[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(null);
  const [isNodePanelOpen, setIsNodePanelOpen] = useState(false);
  const [draggedNodeType, setDraggedNodeType] = useState<string | null>(null);
  const [connectingFrom, setConnectingFrom] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [activeTab, setActiveTab] = useState('canvas');
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (nodeTypeId: string) => {
    setDraggedNodeType(nodeTypeId);
  };

  const handleCanvasDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    
    if (!draggedNodeType || !canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - panOffset.x) / zoomLevel;
    const y = (e.clientY - rect.top - panOffset.y) / zoomLevel;
    
    const nodeType = nodeTypes.find(t => t.id === draggedNodeType);
    if (!nodeType) return;
    
    const newNode: WorkflowNode = {
      id: `node-${Date.now()}`,
      type: nodeType.type,
      category: nodeType.category,
      name: nodeType.name,
      description: nodeType.description,
      icon: nodeType.icon,
      color: nodeType.color,
      position: { x: x - 75, y: y - 40 },
      data: {},
      connections: [],
      isConfigured: false
    };
    
    setNodes(prev => [...prev, newNode]);
    setDraggedNodeType(null);
  }, [draggedNodeType, zoomLevel, panOffset]);

  const handleNodeClick = (node: WorkflowNode) => {
    if (connectingFrom && connectingFrom !== node.id) {
      // Create connection
      const newConnection: Connection = {
        id: `conn-${Date.now()}`,
        from: connectingFrom,
        to: node.id
      };
      
      setConnections(prev => [...prev, newConnection]);
      setNodes(prev => prev.map(n => 
        n.id === connectingFrom 
          ? { ...n, connections: [...n.connections, node.id] }
          : n
      ));
      setConnectingFrom(null);
    } else {
      setSelectedNode(node);
      setIsNodePanelOpen(true);
    }
  };

  const handleStartConnection = (nodeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setConnectingFrom(nodeId);
  };

  const handleZoom = (direction: 'in' | 'out') => {
    setZoomLevel(prev => {
      const newZoom = direction === 'in' ? prev * 1.2 : prev / 1.2;
      return Math.max(0.5, Math.min(2, newZoom));
    });
  };

  const handleTemplateLoad = (templateId: string) => {
    const template = workflowTemplates.find(t => t.id === templateId);
    if (!template) return;

    const newNodes: WorkflowNode[] = template.nodes.map((node, index) => ({
      ...node,
      id: `node-${Date.now()}-${index}`
    }));

    const nodeIdMap = new Map(template.nodes.map((_, index) => [`node-${index + 1}`, `node-${Date.now()}-${index}`]));

    const newConnections: Connection[] = template.connections.map((conn, index) => ({
      id: `conn-${Date.now()}-${index}`,
      from: nodeIdMap.get(conn.from) || conn.from,
      to: nodeIdMap.get(conn.to) || conn.to
    }));

    setNodes(newNodes);
    setConnections(newConnections);
    setActiveTab('canvas');
  };

  const saveNodeConfiguration = (nodeId: string, data: Record<string, any>) => {
    setNodes(prev => prev.map(node => 
      node.id === nodeId 
        ? { ...node, data, isConfigured: true }
        : node
    ));
    setIsNodePanelOpen(false);
  };

  const renderNode = (node: WorkflowNode) => {
    const Icon = node.icon;
    const isConnecting = connectingFrom === node.id;
    
    return (
      <div
        key={node.id}
        className={`absolute cursor-pointer group ${isConnecting ? 'ring-2 ring-blue-400' : ''}`}
        style={{ 
          left: node.position.x * zoomLevel + panOffset.x, 
          top: node.position.y * zoomLevel + panOffset.y,
          transform: `scale(${zoomLevel})`
        }}
        onClick={() => handleNodeClick(node)}
      >
        <div className={`w-40 rounded-lg border ${node.isConfigured ? 'border-green-500' : 'border-slate-600'} bg-slate-800 p-3 hover:border-slate-500 transition-all shadow-lg ${isConnecting ? 'bg-slate-700' : ''}`}>
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-8 h-8 ${node.color} rounded-lg flex items-center justify-center`}>
              <Icon className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-white text-xs font-medium truncate">{node.name}</h4>
              <p className="text-slate-400 text-xs truncate capitalize">{node.type}</p>
            </div>
            {node.isConfigured && (
              <CheckCircle className="w-4 h-4 text-green-500" />
            )}
          </div>
          
          {/* Status indicator */}
          <div className="flex justify-between items-center">
            <Badge variant={node.isConfigured ? "default" : "secondary"} className="text-xs">
              {node.isConfigured ? 'Configurado' : 'Pendente'}
            </Badge>
            <Button
              size="sm"
              variant="ghost"
              className="w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => handleStartConnection(node.id, e)}
            >
              <Plus className="w-3 h-3 text-slate-400" />
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderConnection = (connection: Connection) => {
    const fromNode = nodes.find(n => n.id === connection.from);
    const toNode = nodes.find(n => n.id === connection.to);
    
    if (!fromNode || !toNode) return null;
    
    const fromX = (fromNode.position.x + 160) * zoomLevel + panOffset.x;
    const fromY = (fromNode.position.y + 40) * zoomLevel + panOffset.y;
    const toX = toNode.position.x * zoomLevel + panOffset.x;
    const toY = (toNode.position.y + 40) * zoomLevel + panOffset.y;
    
    const midX = (fromX + toX) / 2;
    
    return (
      <svg
        key={connection.id}
        className="absolute pointer-events-none"
        style={{
          left: Math.min(fromX, toX) - 20,
          top: Math.min(fromY, toY) - 20,
          width: Math.abs(toX - fromX) + 40,
          height: Math.abs(toY - fromY) + 40
        }}
      >
        <path
          d={`M ${fromX - Math.min(fromX, toX) + 20} ${fromY - Math.min(fromY, toY) + 20} 
              C ${midX - Math.min(fromX, toX) + 20} ${fromY - Math.min(fromY, toY) + 20},
                ${midX - Math.min(fromX, toX) + 20} ${toY - Math.min(fromY, toY) + 20},
                ${toX - Math.min(fromX, toX) + 20} ${toY - Math.min(fromY, toY) + 20}`}
          stroke="#3b82f6"
          strokeWidth="2"
          fill="none"
          markerEnd="url(#arrowhead)"
        />
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3.5, 0 7"
              fill="#3b82f6"
            />
          </marker>
        </defs>
      </svg>
    );
  };

  const renderNodeConfiguration = () => {
    if (!selectedNode) return null;

    switch (selectedNode.type) {
      case 'action':
        if (selectedNode.name === 'Enviar Email') {
          return (
            <div className="space-y-4">
              <div>
                <Label className="text-slate-400">Para</Label>
                <Input 
                  defaultValue={selectedNode.data.to || '{{lead.email}}'}
                  onChange={(e) => selectedNode.data.to = e.target.value}
                  className="bg-slate-800 border-slate-600 text-white"
                />
              </div>
              <div>
                <Label className="text-slate-400">Assunto</Label>
                <Input 
                  defaultValue={selectedNode.data.subject || ''}
                  onChange={(e) => selectedNode.data.subject = e.target.value}
                  className="bg-slate-800 border-slate-600 text-white"
                />
              </div>
              <div>
                <Label className="text-slate-400">Mensagem</Label>
                <Textarea 
                  defaultValue={selectedNode.data.message || ''}
                  onChange={(e) => selectedNode.data.message = e.target.value}
                  className="bg-slate-800 border-slate-600 text-white"
                  rows={4}
                />
              </div>
            </div>
          );
        }
        break;
      
      case 'condition':
        if (selectedNode.name === 'Condição IF') {
          return (
            <div className="space-y-4">
              <div>
                <Label className="text-slate-400">Campo</Label>
                <Select defaultValue={selectedNode.data.field}>
                  <SelectTrigger className="bg-slate-800 border-slate-600">
                    <SelectValue placeholder="Selecione um campo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lead.status">Status do Lead</SelectItem>
                    <SelectItem value="lead.score">Pontuação</SelectItem>
                    <SelectItem value="lead.source">Origem</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-slate-400">Operador</Label>
                <Select defaultValue={selectedNode.data.operator}>
                  <SelectTrigger className="bg-slate-800 border-slate-600">
                    <SelectValue placeholder="Selecione operador" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="equals">Igual a</SelectItem>
                    <SelectItem value="not_equals">Diferente de</SelectItem>
                    <SelectItem value="greater_than">Maior que</SelectItem>
                    <SelectItem value="less_than">Menor que</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-slate-400">Valor</Label>
                <Input 
                  defaultValue={selectedNode.data.value || ''}
                  onChange={(e) => selectedNode.data.value = e.target.value}
                  className="bg-slate-800 border-slate-600 text-white"
                />
              </div>
            </div>
          );
        }
        break;
    }

    return (
      <div className="text-center py-4">
        <p className="text-slate-400 text-sm">Configurações específicas não disponíveis para este nó</p>
      </div>
    );
  };

  return (
    <div className="h-full bg-slate-950 flex overflow-hidden">
      {/* Main Canvas */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Canvas Header */}
        <div className="bg-slate-900 border-b border-slate-700 p-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <h1 className="text-white text-lg font-medium">Workflow Builder</h1>
            <span className="text-slate-400 text-sm">
              {nodes.length} nós • {connections.length} conexões
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleZoom('out')}
              className="text-slate-300 border-slate-600 hover:bg-slate-800"
            >
              <ZoomOut className="w-4 h-4" />
            </Button>
            <span className="text-slate-400 text-sm">{Math.round(zoomLevel * 100)}%</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleZoom('in')}
              className="text-slate-300 border-slate-600 hover:bg-slate-800"
            >
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-slate-300 border-slate-600 hover:bg-slate-800"
            >
              <Save className="w-4 h-4 mr-2" />
              Salvar
            </Button>
            <Button
              size="sm"
              className="bg-green-600 hover:bg-green-700 text-white"
              disabled={nodes.length === 0}
            >
              <Play className="w-4 h-4 mr-2" />
              Executar
            </Button>
          </div>
        </div>

        {/* Canvas */}
        <div 
          ref={canvasRef}
          className="flex-1 relative bg-slate-950 overflow-auto"
          onDrop={handleCanvasDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => {
            setConnectingFrom(null);
            setSelectedNode(null);
          }}
        >
          {/* Grid Background */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(#334155 1px, transparent 1px),
                linear-gradient(90deg, #334155 1px, transparent 1px)
              `,
              backgroundSize: `${20 * zoomLevel}px ${20 * zoomLevel}px`,
              backgroundPosition: `${panOffset.x}px ${panOffset.y}px`
            }}
          />

          {/* Empty State */}
          {nodes.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <Zap className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-slate-400 text-lg font-medium mb-2">
                  Comece criando seu workflow
                </h3>
                <p className="text-slate-500 text-sm">
                  Use templates prontos ou arraste componentes da barra lateral
                </p>
              </div>
            </div>
          )}

          {/* Render Connections */}
          {connections.map(renderConnection)}

          {/* Render Nodes */}
          {nodes.map(renderNode)}

          {/* Connection Helper */}
          {connectingFrom && (
            <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-lg text-sm z-10">
              Clique em outro nó para conectar
            </div>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-80 bg-slate-900 border-l border-slate-700 flex-shrink-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <TabsList className="grid grid-cols-3 bg-slate-800 m-2">
            <TabsTrigger value="templates" className="text-xs">Templates</TabsTrigger>
            <TabsTrigger value="nodes" className="text-xs">Componentes</TabsTrigger>
            <TabsTrigger value="history" className="text-xs">Execuções</TabsTrigger>
          </TabsList>
          
          <TabsContent value="templates" className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              <h3 className="text-white text-sm font-medium">Templates Prontos</h3>
              {workflowTemplates.map(template => (
                <Card key={template.id} className="bg-slate-800 border-slate-700 cursor-pointer hover:border-slate-600 transition-colors" onClick={() => handleTemplateLoad(template.id)}>
                  <CardContent className="p-3">
                    <h4 className="text-white text-sm font-medium mb-1">{template.name}</h4>
                    <p className="text-slate-400 text-xs mb-2">{template.description}</p>
                    <Badge variant="secondary" className="text-xs">{template.category}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="nodes" className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {['Triggers', 'Comunicação', 'CRM', 'Integrações', 'Lógica', 'Helpers'].map(category => (
                <div key={category}>
                  <h3 className="text-slate-300 text-sm font-medium mb-2">{category}</h3>
                  <div className="space-y-2">
                    {nodeTypes.filter(node => node.category === category).map(nodeType => {
                      const Icon = nodeType.icon;
                      return (
                        <div
                          key={nodeType.id}
                          draggable
                          onDragStart={() => handleDragStart(nodeType.id)}
                          className="p-3 bg-slate-800 border border-slate-700 rounded-lg cursor-move hover:border-slate-600 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 ${nodeType.color} rounded-lg flex items-center justify-center`}>
                              <Icon className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-white text-sm font-medium">{nodeType.name}</h4>
                              <p className="text-slate-400 text-xs">{nodeType.description}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="history" className="flex-1 p-4">
            <div className="text-center py-8">
              <PlayCircle className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <h3 className="text-slate-400 text-sm font-medium mb-1">Nenhuma Execução</h3>
              <p className="text-slate-500 text-xs">Execute um workflow para ver o histórico</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Node Configuration Panel */}
      <Dialog open={isNodePanelOpen} onOpenChange={setIsNodePanelOpen}>
        <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedNode && (
                <>
                  <div className={`w-6 h-6 ${selectedNode.color} rounded flex items-center justify-center`}>
                    <selectedNode.icon className="w-3 h-3 text-white" />
                  </div>
                  Configurar {selectedNode.name}
                </>
              )}
            </DialogTitle>
          </DialogHeader>
          
          {selectedNode && (
            <div className="space-y-4">
              <div className="p-3 bg-slate-800 rounded-lg">
                <p className="text-slate-400 text-sm">{selectedNode.description}</p>
              </div>
              
              {renderNodeConfiguration()}

              <div className="flex gap-2 pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setNodes(prev => prev.filter(n => n.id !== selectedNode.id));
                    setConnections(prev => prev.filter(c => c.from !== selectedNode.id && c.to !== selectedNode.id));
                    setIsNodePanelOpen(false);
                  }}
                  className="flex-1 text-red-400 border-red-400 hover:bg-red-400 hover:text-white"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Excluir
                </Button>
                <Button
                  size="sm"
                  onClick={() => saveNodeConfiguration(selectedNode.id, selectedNode.data)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Salvar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AutomationCenter; 