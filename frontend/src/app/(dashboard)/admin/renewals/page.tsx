'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, RefreshCw, AlertCircle, CheckCircle, Calendar } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';

interface RenewalUser {
  id: string;
  name: string;
  email: string;
  photo?: string;
  membership: 'Premium' | 'Standard' | 'Básico';
  status: 'active' | 'expired' | 'soon';
  expirationDate: string;
  daysRemaining: number;
}

export default function AdminRenewalsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<RenewalUser | null>(null);
  const [isRenewalModalOpen, setIsRenewalModalOpen] = useState(false);

  // Mock data - replace with actual API
  const [users, setUsers] = useState<RenewalUser[]>([
    {
      id: '1',
      name: 'Juan Pérez',
      email: 'juan@example.com',
      membership: 'Premium',
      status: 'active',
      expirationDate: '2024-04-15',
      daysRemaining: 45,
    },
    {
      id: '2',
      name: 'María García',
      email: 'maria@example.com',
      membership: 'Standard',
      status: 'soon',
      expirationDate: '2024-03-05',
      daysRemaining: 5,
    },
    {
      id: '4',
      name: 'Ana Martínez',
      email: 'ana@example.com',
      membership: 'Básico',
      status: 'expired',
      expirationDate: '2024-02-28',
      daysRemaining: -2,
    },
    {
      id: '5',
      name: 'Pedro Sánchez',
      email: 'pedro@example.com',
      membership: 'Premium',
      status: 'active',
      expirationDate: '2024-05-20',
      daysRemaining: 80,
    },
    {
      id: '7',
      name: 'Diego Fernández',
      email: 'diego@example.com',
      membership: 'Básico',
      status: 'expired',
      expirationDate: '2024-01-15',
      daysRemaining: -45,
    },
  ]);

  const filteredUsers = users
    .filter(user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const priority = { expired: 0, soon: 1, active: 2 };
      return priority[a.status] - priority[b.status];
    });

  const handleRenewClick = (user: RenewalUser) => {
    setSelectedUser(user);
    setIsRenewalModalOpen(true);
  };

  const confirmRenewal = () => {
    if (selectedUser) {
      setUsers(users.map(u => {
        if (u.id === selectedUser.id) {
          const newDate = new Date();
          newDate.setMonth(newDate.getMonth() + 1); // Add 1 month
          return {
            ...u,
            status: 'active',
            expirationDate: newDate.toISOString().split('T')[0],
            daysRemaining: 30,
          };
        }
        return u;
      }));
      setIsRenewalModalOpen(false);
      setSelectedUser(null);
    }
  };

  const getStatusBadge = (status: string, days: number) => {
    if (status === 'expired') {
      return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Vencida hace {Math.abs(days)} días</Badge>;
    } else if (status === 'soon') {
      return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Vence en {days} días</Badge>;
    } else {
      return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Activa</Badge>;
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Renovaciones</h1>
          <p className="text-gray-400">Gestiona las membresías por vencer o vencidas</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-[#191919] border-[#404040]">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Próximos Vencimientos</p>
              <div className="text-3xl font-semibold text-yellow-400">
                {users.filter(u => u.status === 'soon').length}
              </div>
            </div>
            <AlertCircle className="h-8 w-8 text-yellow-400 opacity-50" />
          </CardContent>
        </Card>
        <Card className="bg-[#191919] border-[#404040]">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Vencidas</p>
              <div className="text-3xl font-semibold text-red-400">
                {users.filter(u => u.status === 'expired').length}
              </div>
            </div>
            <AlertCircle className="h-8 w-8 text-red-400 opacity-50" />
          </CardContent>
        </Card>
        <Card className="bg-[#191919] border-[#404040]">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Activas</p>
              <div className="text-3xl font-semibold text-green-400">
                {users.filter(u => u.status === 'active' || u.status === 'soon').length}
              </div>
            </div>
            <CheckCircle className="h-8 w-8 text-green-400 opacity-50" />
          </CardContent>
        </Card>
      </div>

      {/* Main Table Card */}
      <Card className="bg-[#191919] border-[#404040]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">Usuarios</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar usuario..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-[#191919] border-[#404040] text-white focus:border-[#ff0400]"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#404040]">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Usuario</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Membresía</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Estado</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Vencimiento</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">Acción</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-[#404040]/50 hover:bg-[#404040]/20 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 ring-2 ring-[#404040]">
                          <AvatarImage src={user.photo} alt={user.name} />
                          <AvatarFallback className="bg-[#ff0400] text-white font-semibold">
                            {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-white">{user.name}</p>
                          <p className="text-sm text-gray-400">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="outline" className="border-[#404040] text-gray-300">
                        {user.membership}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      {getStatusBadge(user.status, user.daysRemaining)}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        {new Date(user.expirationDate).toLocaleDateString('es-ES')}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <Button
                        size="sm"
                        className={`${
                          user.status === 'active' 
                            ? 'bg-gray-700 text-gray-400 cursor-not-allowed hover:bg-gray-700' 
                            : 'bg-[#ff0400] hover:bg-[#ff3936] text-white'
                        } gap-2`}
                        onClick={() => user.status !== 'active' && handleRenewClick(user)}
                        disabled={user.status === 'active'}
                      >
                        <RefreshCw className="h-4 w-4" />
                        {user.status === 'active' ? 'Al día' : 'Renovar'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Renewal Modal */}
      <Dialog open={isRenewalModalOpen} onOpenChange={setIsRenewalModalOpen}>
        <DialogContent className="bg-[#191919] border-[#404040] text-white">
          <DialogHeader>
            <DialogTitle>Confirmar Renovación</DialogTitle>
            <DialogDescription className="text-gray-400">
              Estás a punto de renovar la membresía para este usuario.
            </DialogDescription>
          </DialogHeader>
          
          {selectedUser && (
            <div className="py-4 space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-lg bg-[#404040]/30 border border-[#404040]">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-[#ff0400] text-white">
                    {selectedUser.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-bold text-lg">{selectedUser.name}</h4>
                  <p className="text-gray-400">{selectedUser.membership}</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Vencimiento actual:</span>
                <span className="text-red-400 font-medium">{new Date(selectedUser.expirationDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Nuevo vencimiento:</span>
                <span className="text-green-400 font-bold">
                  {new Date(new Date().setMonth(new Date().getMonth() + 1)).toLocaleDateString()}
                </span>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRenewalModalOpen(false)} className="border-[#404040] hover:bg-[#404040] text-white">
              Cancelar
            </Button>
            <Button onClick={confirmRenewal} className="bg-[#ff0400] hover:bg-[#ff3936] text-white">
              Confirmar Renovación
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
