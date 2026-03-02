'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAdmin, AdminUser } from '@/hooks/useAdmin';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Search, UserPlus, Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function AdminUsersPage() {
  const { getUsers, toggleUserStatus, loading } = useAdmin();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | 'admin' | 'client'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');

  const fetchUsers = useCallback(async () => {
    const data = await getUsers();
    setUsers(data);
  }, [getUsers]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleToggleStatus = async (userId: string) => {
    try {
      await toggleUserStatus(userId);
      // Refresh list
      fetchUsers();
    } catch (err) {
      console.error('Error toggling status:', err);
    }
  };

  const deleteUser = (userId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      // Por ahora solo mock delete si no hay endpoint
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  // Filter users
  const filteredUsers = (users || []).filter(user => {
    const fullName = `${user.full_name || ''} ${user.first_name || ''} ${user.last_name || ''} ${user.username || ''}`;
    const matchesSearch = fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (user.email || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' ? user.is_active : !user.is_active);
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getMembershipColor = (membership: string | undefined) => {
    if (!membership) return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    switch (membership.toLowerCase()) {
      case 'premium':
        return 'bg-[#ff0400]/20 text-[#ff0400] border-[#ff0400]/30';
      case 'standard':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'básico':
      case 'basico':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const stats = {
    total: users.length,
    active: users.filter(u => u.is_active).length,
    inactive: users.filter(u => !u.is_active).length,
    admins: users.filter(u => u.role?.toLowerCase() === 'admin').length,
    clients: users.filter(u => u.role?.toLowerCase() === 'client').length,
  };

  const activePercentage = Math.round((stats.active / stats.total) * 100) || 0;
  const inactivePercentage = Math.round((stats.inactive / stats.total) * 100) || 0;
  
  // Ajustar para que sumen 100 si hay decimales, o usar el cálculo directo
  
  const adminPercentage = Math.round((stats.admins / stats.total) * 100) || 0;
  const clientPercentage = Math.round((stats.clients / stats.total) * 100) || 0;

  // Function to render donut chart
  const renderDonutChart = (
    primaryPercent: number, 
    secondaryPercent: number, 
    primaryColor: string, 
    secondaryColor: string, 
    centerLabel: string, 
    centerValue: string | number
  ) => {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const primaryDash = (primaryPercent / 100) * circumference;
    const secondaryDash = circumference - primaryDash; // Simplification for 2 segments

    return (
      <div className="relative w-32 h-32 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
           {/* Background Circle (Secondary) */}
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke={secondaryColor}
            strokeWidth="12"
            fill="none"
          />
          {/* Primary Circle */}
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke={primaryColor}
            strokeWidth="12"
            fill="none"
            strokeDasharray={`${primaryDash} ${circumference}`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-semibold text-white">{centerValue}</span>
          <span className="text-[10px] text-gray-400 uppercase tracking-wider">{centerLabel}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Gestión de Usuarios {loading && <span className="text-sm font-normal text-gray-500 ml-2 italic">Cargando...</span>}</h1>
          <p className="text-gray-400">Administra todos los usuarios del sistema</p>
        </div>
        <Button className="gap-2 bg-[#ff0400] hover:bg-[#ff3936] text-white">
          <UserPlus className="h-4 w-4" />
          Nuevo Usuario
        </Button>
      </div>

      {/* ... (rest of stats cards) */}

      {/* Users Table */}
      <Card className="bg-[#191919] border-[#404040]">
        <CardHeader>
          <CardTitle className="text-white">
            Lista de Usuarios
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#404040]">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Usuario</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Rol</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Membresía</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Estado</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Fecha Registro</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-[#404040]/50 hover:bg-[#404040]/20 transition-colors"
                  >
                    {/* Usuario */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 ring-2 ring-[#404040]">
                          <AvatarImage src={user.profile_picture_url || user.profile_picture} alt={user.first_name} />
                          <AvatarFallback className="bg-[#ff0400] text-white font-semibold">
                            {user.first_name?.[0] || user.username?.[0] || 'U'}
                            {user.last_name?.[0] || ''}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-white">
                            {user.full_name || (user.first_name || user.last_name ? 
                              `${user.first_name || ''} ${user.last_name || ''}`.trim() 
                              : user.username || user.email || 'Usuario')}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Rol */}
                    <td className="py-4 px-4">
                      <Badge
                        variant="outline"
                        className={user.role?.toLowerCase() === 'admin' 
                          ? 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                          : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                        }
                      >
                        {user.role?.toLowerCase() === 'admin' ? '👑 Admin' : '👤 Cliente'}
                      </Badge>
                    </td>

                    {/* Membresía */}
                    <td className="py-4 px-4">
                      <Badge
                        variant="outline"
                        className={getMembershipColor(user.membership_info?.plan_name)}
                      >
                        {user.membership_info?.plan_name || 'Sin membresía'}
                      </Badge>
                    </td>

                    {/* Estado */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleStatus(user.id)}
                          disabled={loading}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            user.is_active ? 'bg-green-500' : 'bg-gray-600'
                          } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              user.is_active ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                        <span className={`text-xs font-medium ${
                          user.is_active ? 'text-green-400' : 'text-gray-500'
                        }`}>
                          {user.is_active ? 'Activo' : 'Inactivo'}
                        </span>
                      </div>
                    </td>

                    {/* Fecha */}
                    <td className="py-4 px-4">
                      <p className="text-sm text-gray-400">
                        {user.created_at ? (
                          new Date(user.created_at).toString() !== 'Invalid Date' ? (
                            format(new Date(user.created_at), "d 'de' MMM, yyyy", { locale: es })
                          ) : 'Fecha Inválida'
                        ) : 'Sin fecha'}
                      </p>
                    </td>

                    {/* Acciones */}
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteUser(user.id)}
                          className="border-red-500/30 hover:bg-red-500/20 text-red-400"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400">No se encontraron usuarios</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
