'use client';

import { useState, useCallback } from 'react';
import { fetchApi } from '@/lib/api';

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: 'admin' | 'client';
  is_active: boolean;
  created_at: string;
  full_name?: string;
  profile_picture?: string;
  profile_picture_url?: string;
  profile?: {
    fitness_goal?: string;
    preferred_training_days?: string[];
  };
  membership_info?: {
    plan_name: string;
    status: string;
    end_date: string;
  };
}

export interface GymMetrics {
  total_users: number;
  active_memberships: number;
  today_checkins: number;
  pending_payments: number;
  monthly_revenue: string;
  total_revenue: string;
  new_members: number;
  active_members: number;
  total_checkins: number;
}

export interface AdminPayment {
  id: string;
  amount: string;
  status: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
  currency: string;
  payment_method: string;
  external_payment_id: string | null;
  created_at: string;
  user_name: string;
  user: string; // ID
  membership?: {
    plan: {
      name: string;
    };
  };
}

export const useAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getUsers = useCallback(async (params?: Record<string, string>) => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams(params || {});
      queryParams.set('_t', Date.now().toString()); // Cache breaker
      const query = '?' + queryParams.toString();
      const data = await fetchApi(`/users/${query}`);
      return (data.results || data) as AdminUser[];
    } catch (err: any) {
      setError(err.message || 'Error al obtener usuarios');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleUserStatus = useCallback(async (userId: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchApi(`/users/${userId}/toggle_active/`, {
        method: 'POST',
      });
      return data;
    } catch (err: any) {
      setError(err.message || 'Error al cambiar estado del usuario');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getGymMetrics = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Intentamos obtener métricas desde el endpoint de métricas
      const data = await fetchApi('/metrics/gym/summary/');
      return data as GymMetrics;
    } catch (err: any) {
      console.error('Error fetching metrics:', err);
      // Fallback a datos vacíos si falla
      return {
        total_users: 0,
        active_memberships: 0,
        today_checkins: 0,
        pending_payments: 0,
        monthly_revenue: '0.00',
        total_revenue: '0.00',
        new_members: 0,
        active_members: 0,
        total_checkins: 0
      } as GymMetrics;
    } finally {
      setLoading(false);
    }
  }, []);

  const getRecentUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchApi('/users/?limit=5');
      return (data.results || data) as AdminUser[];
    } catch (err: any) {
      setError(err.message || 'Error al obtener usuarios recientes');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const getMetricsHistory = useCallback(async (periodDays: number = 7) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchApi(`/metrics/gym/?period_days=${periodDays}`);
      return (data.results || data) as any[];
    } catch (err: any) {
      console.error('Error fetching metrics history:', err);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const getPayments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchApi('/payments/');
      return (data.results || data) as AdminPayment[];
    } catch (err: any) {
      setError(err.message || 'Error al obtener pagos');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const approvePayment = useCallback(async (paymentId: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchApi(`/payments/${paymentId}/approve/`, {
        method: 'POST',
      });
      return data;
    } catch (err: any) {
      setError(err.message || 'Error al aprobar pago');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deletePayment = useCallback(async (paymentId: string) => {
    setLoading(true);
    setError(null);
    try {
      await fetchApi(`/payments/${paymentId}/`, {
        method: 'DELETE',
      });
    } catch (err: any) {
      setError(err.message || 'Error al eliminar pago');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteUser = useCallback(async (userId: string) => {
    setLoading(true);
    setError(null);
    try {
      await fetchApi(`/users/${userId}/`, {
        method: 'DELETE',
      });
    } catch (err: any) {
      setError(err.message || 'Error al eliminar usuario');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    getUsers,
    deleteUser,
    toggleUserStatus,
    getGymMetrics,
    getRecentUsers,
    getMetricsHistory,
    getPayments,
    approvePayment,
    deletePayment,
  };
};
