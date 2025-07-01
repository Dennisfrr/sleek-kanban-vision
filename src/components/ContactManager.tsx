import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Search,
  Send,
  Paperclip,
  Smile,
  Phone,
  Video,
  MoreVertical,
  Archive,
  Star,
  Trash2,
  Download,
  Image,
  File,
  Mic,
  X,
  Check,
  CheckCheck,
  MessageSquare,
  Clock,
  User,
  Filter,
  Settings
} from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  company?: string;
  status: 'online' | 'offline' | 'away';
  lastSeen: Date;
  unreadCount: number;
  isStarred: boolean;
  tags: string[];
}

interface Message {
  id: string;
  contactId: string;
  content: string;
  type: 'text' | 'image' | 'file' | 'audio';
  sender: 'me' | 'contact';
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  attachments?: {
    name: string;
    url: string;
    size: string;
    type: string;
  }[];
}

interface Conversation {
  contactId: string;
  messages: Message[];
  lastMessage?: Message;
  updatedAt: Date;
}

const ContactManager = () => {
  const [contacts] = useState<Contact[]>([
    {
      id: '1',
      name: 'Maria Silva',
      email: 'maria@empresa.com',
      phone: '(11) 99999-9999',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      company: 'Tech Solutions',
      status: 'online',
      lastSeen: new Date(),
      unreadCount: 3,
      isStarred: true,
      tags: ['cliente', 'prioritario']
    },
    {
      id: '2',
      name: 'João Santos',
      email: 'joao@startup.com',
      phone: '(11) 88888-8888',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      company: 'StartupXYZ',
      status: 'away',
      lastSeen: new Date(Date.now() - 15 * 60 * 1000),
      unreadCount: 1,
      isStarred: false,
      tags: ['lead', 'interessado']
    },
    {
      id: '3',
      name: 'Ana Costa',
      email: 'ana@loja.com',
      phone: '(11) 77777-7777',
      company: 'Loja Online',
      status: 'offline',
      lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000),
      unreadCount: 0,
      isStarred: false,
      tags: ['cliente']
    },
    {
      id: '4',
      name: 'Pedro Lima',
      email: 'pedro@consultoria.com',
      phone: '(11) 66666-6666',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      company: 'Consultoria BR',
      status: 'online',
      lastSeen: new Date(),
      unreadCount: 0,
      isStarred: true,
      tags: ['consultor', 'parceiro']
    }
  ]);

  const [conversations, setConversations] = useState<Conversation[]>([
    {
      contactId: '1',
      updatedAt: new Date(),
      messages: [
        {
          id: '1',
          contactId: '1',
          content: 'Olá! Gostaria de saber mais sobre os seus serviços.',
          type: 'text',
          sender: 'contact',
          timestamp: new Date(Date.now() - 30 * 60 * 1000),
          status: 'read'
        },
        {
          id: '2',
          contactId: '1',
          content: 'Olá Maria! Claro, ficarei feliz em ajudar. Que tipo de solução você está procurando?',
          type: 'text',
          sender: 'me',
          timestamp: new Date(Date.now() - 25 * 60 * 1000),
          status: 'read'
        },
        {
          id: '3',
          contactId: '1',
          content: 'Preciso de uma solução para automatizar nossos processos de vendas.',
          type: 'text',
          sender: 'contact',
          timestamp: new Date(Date.now() - 5 * 60 * 1000),
          status: 'delivered'
        }
      ]
    },
    {
      contactId: '2',
      updatedAt: new Date(Date.now() - 15 * 60 * 1000),
      messages: [
        {
          id: '4',
          contactId: '2',
          content: 'Boa tarde! Vi sua apresentação ontem.',
          type: 'text',
          sender: 'contact',
          timestamp: new Date(Date.now() - 15 * 60 * 1000),
          status: 'sent'
        }
      ]
    }
  ]);

  const [selectedContactId, setSelectedContactId] = useState<string>('1');
  const [messageInput, setMessageInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'online' | 'unread'>('all');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversations, selectedContactId]);

  const selectedContact = contacts.find(c => c.id === selectedContactId);
  const selectedConversation = conversations.find(c => c.contactId === selectedContactId);

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.company?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'online' && contact.status === 'online') ||
                         (filterStatus === 'unread' && contact.unreadCount > 0);
    
    return matchesSearch && matchesFilter;
  });

  const sendMessage = () => {
    if (!messageInput.trim() || !selectedContactId) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      contactId: selectedContactId,
      content: messageInput.trim(),
      type: 'text',
      sender: 'me',
      timestamp: new Date(),
      status: 'sent'
    };

    setConversations(prev => {
      const existingConv = prev.find(c => c.contactId === selectedContactId);
      if (existingConv) {
        return prev.map(c => 
          c.contactId === selectedContactId 
            ? { ...c, messages: [...c.messages, newMessage], updatedAt: new Date() }
            : c
        );
      } else {
        return [...prev, {
          contactId: selectedContactId,
          messages: [newMessage],
          updatedAt: new Date()
        }];
      }
    });

    setMessageInput('');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const formatLastSeen = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (minutes < 1) return 'agora';
    if (minutes < 60) return `${minutes}min`;
    if (hours < 24) return `${hours}h`;
    return date.toLocaleDateString('pt-BR');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getMessageStatusIcon = (status: string) => {
    switch (status) {
      case 'sent': return <Check className="w-3 h-3 text-gray-400" />;
      case 'delivered': return <CheckCheck className="w-3 h-3 text-gray-400" />;
      case 'read': return <CheckCheck className="w-3 h-3 text-blue-500" />;
      default: return <Clock className="w-3 h-3 text-gray-400" />;
    }
  };

  const quickReplies = [
    "Olá! Como posso ajudar?",
    "Obrigado pelo contato!",
    "Vou verificar e te retorno em breve.",
    "Podemos agendar uma reunião?",
    "Enviei as informações por email."
  ];

  return (
    <div className="h-full bg-slate-950 flex">
      {/* Sidebar - Lista de Conversas */}
      <div className="w-80 bg-slate-900 border-r border-slate-700 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white text-lg font-semibold">Conversas</h2>
            <div className="flex gap-2">
              <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                <Filter className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {/* Search */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Buscar conversas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-800 border-slate-600 text-white placeholder-slate-400"
            />
          </div>
          
          {/* Filters */}
          <div className="flex gap-2">
            {['all', 'online', 'unread'].map((filter) => (
              <Badge
                key={filter}
                variant={filterStatus === filter ? "default" : "secondary"}
                className={`cursor-pointer text-xs ${
                  filterStatus === filter 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
                onClick={() => setFilterStatus(filter as any)}
              >
                {filter === 'all' ? 'Todas' : filter === 'online' ? 'Online' : 'Não Lidas'}
              </Badge>
            ))}
          </div>
        </div>

        {/* Lista de Contatos */}
        <div className="flex-1 overflow-y-auto">
          {filteredContacts.map(contact => {
            const conversation = conversations.find(c => c.contactId === contact.id);
            const lastMessage = conversation?.messages[conversation.messages.length - 1];
            
            return (
              <div
                key={contact.id}
                onClick={() => setSelectedContactId(contact.id)}
                className={`p-4 border-b border-slate-700 cursor-pointer hover:bg-slate-800 transition-colors ${
                  selectedContactId === contact.id ? 'bg-slate-800 border-l-2 border-l-blue-500' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={contact.avatar} />
                      <AvatarFallback className="bg-slate-700 text-white">
                        {contact.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(contact.status)} rounded-full border-2 border-slate-900`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-white font-medium truncate">{contact.name}</h3>
                      <div className="flex items-center gap-1">
                        {contact.isStarred && <Star className="w-3 h-3 text-yellow-500 fill-current" />}
                        {lastMessage && (
                          <span className="text-xs text-slate-400">
                            {formatTime(lastMessage.timestamp)}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-slate-400 truncate">
                        {lastMessage?.content || contact.company || 'Nenhuma mensagem'}
                      </p>
                      
                      {contact.unreadCount > 0 && (
                        <Badge className="bg-blue-600 text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full">
                          {contact.unreadCount > 99 ? '99+' : contact.unreadCount}
                        </Badge>
                      )}
                    </div>
                    
                    {/* Tags */}
                    {contact.tags.length > 0 && (
                      <div className="flex gap-1 mt-2">
                        {contact.tags.slice(0, 2).map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs px-1 py-0">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedContact ? (
          <>
            {/* Chat Header */}
            <div className="bg-slate-900 border-b border-slate-700 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={selectedContact.avatar} />
                    <AvatarFallback className="bg-slate-700 text-white">
                      {selectedContact.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(selectedContact.status)} rounded-full border-2 border-slate-900`} />
                </div>
                
                <div>
                  <h3 className="text-white font-medium">{selectedContact.name}</h3>
                  <p className="text-xs text-slate-400">
                    {selectedContact.status === 'online' 
                      ? 'Online' 
                      : `Visto por último ${formatLastSeen(selectedContact.lastSeen)}`
                    }
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                  <Video className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedConversation?.messages.map((message, index) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.sender === 'me'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-700 text-white'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                    <div className={`flex items-center justify-end gap-1 mt-1 ${
                      message.sender === 'me' ? 'text-blue-200' : 'text-slate-400'
                    }`}>
                      <span className="text-xs">{formatTime(message.timestamp)}</span>
                      {message.sender === 'me' && getMessageStatusIcon(message.status)}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-700 text-white px-4 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            <div className="px-4 py-2 border-t border-slate-700">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {quickReplies.map((reply, index) => (
                  <Button
                    key={index}
                    size="sm"
                    variant="outline"
                    className="whitespace-nowrap text-xs bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700"
                    onClick={() => setMessageInput(reply)}
                  >
                    {reply}
                  </Button>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div className="bg-slate-900 border-t border-slate-700 p-4">
              <div className="flex items-center gap-3">
                <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                  <Paperclip className="w-4 h-4" />
                </Button>
                
                <div className="flex-1 relative">
                  <Textarea
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                    placeholder="Digite sua mensagem..."
                    className="resize-none bg-slate-800 border-slate-600 text-white placeholder-slate-400 min-h-[40px] max-h-[120px]"
                    rows={1}
                  />
                </div>
                
                <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                  <Smile className="w-4 h-4" />
                </Button>
                
                <Button 
                  size="sm" 
                  onClick={sendMessage}
                  disabled={!messageInput.trim()}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          // Empty State
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-slate-400 text-lg font-medium mb-2">
                Selecione uma conversa
              </h3>
              <p className="text-slate-500 text-sm">
                Escolha um contato para começar a conversar
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactManager;