'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Search, UserPlus, Edit, Trash2 } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
  role: 'admin' | 'client';
  membership: 'Premium' | 'Standard' | 'Básico' | 'Ninguna';
  status: 'active' | 'inactive';
  joinDate: string;
}

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | 'admin' | 'client'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');

  // Mock data - replace with actual API call
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'Juan Pérez',
      email: 'juan@example.com',
      photo: undefined,
      role: 'client',
      membership: 'Premium',
      status: 'active',
      joinDate: '2024-01-15',
    },
    {
      id: '2',
      name: 'María García',
      email: 'maria@example.com',
      photo: undefined,
      role: 'client',
      membership: 'Standard',
      status: 'active',
      joinDate: '2024-02-20',
    },
    {
      id: '3',
      name: 'Carlos López',
      email: 'carlos@example.com',
      photo: undefined,
      role: 'admin',
      membership: 'Ninguna',
      status: 'active',
      joinDate: '2023-12-01',
    },
    {
      id: '4',
      name: 'Ana Martínez',
      email: 'ana@example.com',
      photo: undefined,
      role: 'client',
      membership: 'Básico',
      status: 'inactive',
      joinDate: '2024-01-10',
    },
    {
      id: '5',
      name: 'Pedro Sánchez',
      email: 'pedro@example.com',
      photo: undefined,
      role: 'client',
      membership: 'Premium',
      status: 'active',
      joinDate: '2024-03-05',
    },
    {
      id: '6',
      name: 'Laura Rodríguez',
      email: 'laura@example.com',
      photo: undefined,
      role: 'client',
      membership: 'Standard',
      status: 'active',
      joinDate: '2024-02-14',
    },
    {
      id: '7',
      name: 'Diego Fernández',
      email: 'diego@example.com',
      photo: undefined,
      role: 'client',
      membership: 'Básico',
      status: 'inactive',
      joinDate: '2023-11-20',
    },
    {
      id: '8',
      name: 'Sofia Torres',
      email: 'sofia@example.com',
      photo: undefined,
      role: 'admin',
      membership: 'Ninguna',
      status: 'active',
      joinDate: '2023-10-15',
    },
  ]);

  const toggleUserStatus = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
  };

  const deleteUser = (userId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getMembershipColor = (membership: string) => {
    switch (membership) {
      case 'Premium':
        return 'bg-[#ff0400]/20 text-[#ff0400] border-[#ff0400]/30';
      case 'Standard':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Básico':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    inactive: users.filter(u => u.status === 'inactive').length,
    admins: users.filter(u => u.role === 'admin').length,
    clients: users.filter(u => u.role === 'client').length,
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
          <h1 className="text-3xl font-bold text-white">Gestión de Usuarios</h1>
          <p className="text-gray-400">Administra todos los usuarios del sistema</p>
        </div>
        <Button className="gap-2 bg-[#ff0400] hover:bg-[#ff3936] text-white">
          <UserPlus className="h-4 w-4" />
          Nuevo Usuario
        </Button>
      </div>

      {/* Stats Charts Section */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Total Users Card */}
        <Card className="bg-[#191919] border-[#404040] flex items-center justify-center p-6">
          <div className="text-center">
             <div className="p-4 rounded-full bg-[#404040]/30 mb-4 mx-auto w-20 h-20 flex items-center justify-center">
              <UserPlus className="h-10 w-10 text-[#ff0400]" />
             </div>
             <div className="text-6xl font-semibold text-white mb-2">{stats.total}</div>
             <p className="text-sm text-gray-400 uppercase tracking-widest font-semibold">Total Usuarios</p>
          </div>
        </Card>

        {/* Status Distribution */}
        <Card className="bg-[#191919] border-[#404040]">
          <CardHeader>
            <CardTitle className="text-white text-center">Estado de Usuarios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              {renderDonutChart(activePercentage, inactivePercentage, '#10b981', '#ef4444', 'Activos', `${activePercentage}%`)}
              
              <div className="flex w-full justify-around mt-6">
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-sm text-gray-400">Activos</span>
                  </div>
                  <span className="text-2xl font-semibold text-white">{stats.active}</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-sm text-gray-400">Inactivos</span>
                  </div>
                  <span className="text-2xl font-semibold text-white">{stats.inactive}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Roles Distribution */}
        <Card className="bg-[#191919] border-[#404040]">
          <CardHeader>
            <CardTitle className="text-white text-center">Distribución de Roles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              {renderDonutChart(clientPercentage, adminPercentage, '#3b82f6', '#f59e0b', 'Clientes', `${clientPercentage}%`)}
              
              <div className="flex w-full justify-around mt-6">
                 <div className="flex flex-col items-center">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm text-gray-400">Clientes</span>
                  </div>
                  <span className="text-2xl font-semibold text-white">{stats.clients}</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    <span className="text-sm text-gray-400">Admins</span>
                  </div>
                  <span className="text-2xl font-semibold text-white">{stats.admins}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-[#191919] border-[#404040]">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por nombre o email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-[#191919] border-[#404040] text-white focus:border-[#ff0400]"
              />
            </div>

            {/* Role Filter */}
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value as any)}
              className="px-4 py-2 bg-[#191919] border border-[#404040] rounded-md text-white focus:border-[#ff0400] focus:outline-none"
            >
              <option value="all">Todos los roles</option>
              <option value="admin">Admins</option>
              <option value="client">Clientes</option>
            </select>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-4 py-2 bg-[#191919] border border-[#404040] rounded-md text-white focus:border-[#ff0400] focus:outline-none"
            >
              <option value="all">Todos los estados</option>
              <option value="active">Activos</option>
              <option value="inactive">Inactivos</option>
            </select>
          </div>
        </CardContent>
      </Card>

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
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Email</th>
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
                          <AvatarImage src={user.photo} alt={user.name} />
                          <AvatarFallback className="bg-[#ff0400] text-white font-semibold">
                            {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-white">{user.name}</p>
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="py-4 px-4">
                      <p className="text-sm text-gray-400">{user.email}</p>
                    </td>

                    {/* Rol */}
                    <td className="py-4 px-4">
                      <Badge
                        variant="outline"
                        className={user.role === 'admin' 
                          ? 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                          : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                        }
                      >
                        {user.role === 'admin' ? '👑 Admin' : '👤 Cliente'}
                      </Badge>
                    </td>

                    {/* Membresía */}
                    <td className="py-4 px-4">
                      <Badge
                        variant="outline"
                        className={getMembershipColor(user.membership)}
                      >
                        {user.membership}
                      </Badge>
                    </td>

                    {/* Estado */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleUserStatus(user.id)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            user.status === 'active' ? 'bg-green-500' : 'bg-gray-600'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              user.status === 'active' ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                        <span className={`text-xs font-medium ${
                          user.status === 'active' ? 'text-green-400' : 'text-gray-500'
                        }`}>
                          {user.status === 'active' ? 'Activo' : 'Inactivo'}
                        </span>
                      </div>
                    </td>

                    {/* Fecha */}
                    <td className="py-4 px-4">
                      <p className="text-sm text-gray-400">
                        {new Date(user.joinDate).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                    </td>

                    {/* Acciones */}
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-[#404040] hover:bg-[#404040] text-white"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
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
