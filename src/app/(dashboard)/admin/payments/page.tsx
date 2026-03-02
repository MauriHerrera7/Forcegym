'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAdmin, AdminPayment } from '@/hooks/useAdmin';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, CheckCircle, Search, CreditCard, User, Calendar, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function AdminPaymentsPage() {
  const { getPayments, approvePayment, deletePayment, loading: adminLoading } = useAdmin();
  const [payments, setPayments] = useState<AdminPayment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [approving, setApproving] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchPayments = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getPayments();
      setPayments(data);
    } catch (err) {
      console.error('Error fetching payments:', err);
    } finally {
      setLoading(false);
    }
  }, [getPayments]);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  const handleApprove = async (paymentId: string) => {
    if (!confirm('¿Estás seguro de que quieres aprobar este pago manualmente? Esto activará la membresía.')) return;
    
    setApproving(paymentId);
    try {
      await approvePayment(paymentId);
      await fetchPayments(); // Refresh list
    } catch (err) {
      console.error('Error approving payment:', err);
      alert('Error al aprobar el pago');
    } finally {
      setApproving(null);
    }
  };

  const handleDelete = async (paymentId: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este registro de pago? Esta acción no se puede deshacer.')) return;
    
    setDeleting(paymentId);
    try {
      await deletePayment(paymentId);
      await fetchPayments(); // Refresh list
    } catch (err) {
      console.error('Error deleting payment:', err);
      alert('Error al eliminar el pago');
    } finally {
      setDeleting(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PAID':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Pagado</Badge>;
      case 'PENDING':
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Pendiente</Badge>;
      case 'FAILED':
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Fallido</Badge>;
      default:
        return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">{status}</Badge>;
    }
  };

  const filteredPayments = payments.filter(payment => {
    const searchStr = `${payment.user_name || ''} ${payment.id}`.toLowerCase();
    return searchStr.includes(searchQuery.toLowerCase());
  });

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Historial de Pagos</h1>
          <p className="text-gray-400">Ver y gestionar todas las transacciones del gimnasio</p>
        </div>
        <Button 
          variant="outline" 
          onClick={fetchPayments} 
          disabled={loading}
          className="border-[#404040] text-gray-400 hover:bg-[#404040] hover:text-white"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Actualizar'}
        </Button>
      </div>

      <Card className="bg-[#191919] border-[#404040]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">Transacciones</CardTitle>
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por usuario o ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-[#191919] border-[#404040] text-white focus:border-[#ff0400]"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-10 w-10 animate-spin text-[#ff0400]" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#404040]">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Fecha</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Usuario</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Concepto</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Monto</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Estado</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.map((payment) => (
                    <tr key={payment.id} className="border-b border-[#404040]/50 hover:bg-[#404040]/20 transition-colors">
                      <td className="py-4 px-4 text-sm text-gray-300">
                        {format(new Date(payment.created_at), "dd/MM/yyyy HH:mm", { locale: es })}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#ff0400] flex items-center justify-center text-white text-xs font-bold">
                            {payment.user_name?.[0] || 'U'}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">
                              {payment.user_name || 'Usuario'}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-300">
                        {payment.membership?.plan.name || 'Membresía'}
                      </td>
                      <td className="py-4 px-4 text-sm font-bold text-white">
                        ${payment.amount}
                      </td>
                      <td className="py-4 px-4">
                        {getStatusBadge(payment.status)}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {payment.status === 'PENDING' && (
                            <Button
                              size="sm"
                              onClick={() => handleApprove(payment.id)}
                              disabled={!!approving || !!deleting}
                              className="bg-[#ff0400] hover:bg-[#ff3936] text-white gap-2"
                            >
                              {approving === payment.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <CheckCircle className="h-4 w-4" />
                              )}
                              Aprobar
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(payment.id)}
                            disabled={!!approving || !!deleting}
                            className="border-red-500/30 hover:bg-red-500/20 text-red-400 px-3"
                          >
                            {deleting === payment.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredPayments.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-gray-500 italic">
                        No se encontraron pagos registrados.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
