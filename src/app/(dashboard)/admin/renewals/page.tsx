'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAdmin, AdminUser } from '@/hooks/useAdmin';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, RefreshCw, AlertCircle, CheckCircle, Calendar } from 'lucide-react';
import { fetchApi } from '@/lib/api';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';

export default function AdminRenewalsPage() {
  const { getUsers, loading: adminLoading } = useAdmin();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [isRenewalModalOpen, setIsRenewalModalOpen] = useState(false);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      // Obtenemos todos los usuarios y filtramos los que tienen membresía próxima a vencer o vencida
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      console.error('Error fetching users for renewals:', err);
    } finally {
      setLoading(false);
    }
  }, [getUsers]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const getMembershipStatus = (endDate: string | undefined) => {
    if (!endDate) return 'expired';
    const expiration = new Date(endDate);
    const today = new Date();
    const diffTime = expiration.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'expired';
    if (diffDays <= 7) return 'soon';
    return 'active';
  };

  const getDaysRemaining = (endDate: string | undefined) => {
    if (!endDate) return 0;
    const expiration = new Date(endDate);
    const today = new Date();
    const diffTime = expiration.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const filteredUsers = users
    .filter(user => {
      const fullName = `${user.full_name || ''} ${user.first_name || ''} ${user.last_name || ''} ${user.username || ''}`;
      const matchesSearch = fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (user.email || '').toLowerCase().includes(searchQuery.toLowerCase());
      const status = getMembershipStatus(user.membership_info?.end_date);
      // Solo mostrar vencidas o por vencer para esta página
      return matchesSearch && (status === 'expired' || status === 'soon');
    })
    .sort((a, b) => {
      const daysA = getDaysRemaining(a.membership_info?.end_date);
      const daysB = getDaysRemaining(b.membership_info?.end_date);
      return daysA - daysB;
    });

  const handleRenewClick = (user: AdminUser) => {
    setSelectedUser(user);
    setIsRenewalModalOpen(true);
  };

  const confirmRenewal = async () => {
    if (selectedUser && selectedUser.membership_info) {
      setLoading(true);
      try {
        // En un sistema real, esto crearía o activaría una membresía
        // Por ahora simularemos la activación
        await fetchApi(`/memberships/memberships/`, {
          method: 'POST',
          body: JSON.stringify({
            userId: selectedUser.id,
            planId: '1', // Default Premium for simulation
            months: 1
          })
        });
        
        await fetchUsers(); // Refresh
        setIsRenewalModalOpen(false);
        setSelectedUser(null);
      } catch (err) {
        console.error('Error renewing membership:', err);
      } finally {
        setLoading(false);
      }
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
                {users.filter(u => getMembershipStatus(u.membership_info?.end_date) === 'soon').length}
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
                {users.filter(u => getMembershipStatus(u.membership_info?.end_date) === 'expired').length}
              </div>
            </div>
            <AlertCircle className="h-8 w-8 text-red-400 opacity-50" />
          </CardContent>
        </Card>
        <Card className="bg-[#191919] border-[#404040]">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Usuarios</p>
              <div className="text-3xl font-semibold text-green-400">
                {users.length}
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
            <CardTitle className="text-white">Usuarios {loading && <span className="text-sm font-normal text-gray-500 italic ml-2">Actualizando...</span>}</CardTitle>
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
                {filteredUsers.map((user) => {
                  const status = getMembershipStatus(user.membership_info?.end_date);
                  const days = getDaysRemaining(user.membership_info?.end_date);
                  
                  return (
                    <tr key={user.id} className="border-b border-[#404040]/50 hover:bg-[#404040]/20 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 ring-2 ring-[#404040]">
                            <AvatarImage src={user.profile_picture_url || user.profile_picture} alt={user.first_name || user.username} />
                            <AvatarFallback className="bg-[#ff0400] text-white font-semibold">
                              {user.first_name?.[0] || user.username?.[0] || 'U'}
                              {user.last_name?.[0] || ''}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-white">
                              {user.full_name || (user.first_name || user.last_name ? 
                                `${user.first_name || ''} ${user.last_name || ''}`.trim() 
                                : user.username || 'Usuario')}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge variant="outline" className="border-[#404040] text-gray-300">
                          {user.membership_info?.plan_name || 'Sin plan'}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        {getStatusBadge(status, days)}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          {user.membership_info?.end_date 
                            ? new Date(user.membership_info.end_date).toLocaleDateString('es-ES')
                            : 'N/A'}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <Button
                          size="sm"
                          className={`${
                            status === 'active' 
                              ? 'bg-gray-700 text-gray-400 cursor-not-allowed hover:bg-gray-700' 
                              : 'bg-[#ff0400] hover:bg-[#ff3936] text-white'
                          } gap-2`}
                          onClick={() => status !== 'active' && handleRenewClick(user)}
                          disabled={status === 'active' || loading}
                        >
                          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                          {status === 'active' ? 'Al día' : 'Renovar'}
                        </Button>
                      </td>
                    </tr>
                  );
                })}
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
                  <AvatarImage src={selectedUser.profile_picture_url || selectedUser.profile_picture} alt={selectedUser.first_name || selectedUser.username} />
                  <AvatarFallback className="bg-[#ff0400] text-white">
                    {selectedUser.first_name?.[0] || selectedUser.username?.[0] || 'U'}
                    {selectedUser.last_name?.[0] || ''}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-bold text-lg">
                    {selectedUser.full_name || (selectedUser.first_name || selectedUser.last_name ? 
                      `${selectedUser.first_name || ''} ${selectedUser.last_name || ''}`.trim() 
                      : selectedUser.username || 'Usuario')}
                  </h4>
                  <p className="text-gray-400">{selectedUser.membership_info?.plan_name || 'Sin membresía'}</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Vencimiento actual:</span>
                <span className="text-red-400 font-medium">
                  {selectedUser.membership_info?.end_date 
                    ? new Date(selectedUser.membership_info.end_date).toLocaleDateString()
                    : 'Expirado'}
                </span>
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
