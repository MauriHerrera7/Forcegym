'use client'

import { useState, useEffect, useCallback } from 'react'
import { fetchApi } from '@/lib/api'

export interface Payment {
  id: string
  amount: string
  status: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED'
  payment_method: string
  created_at: string
  membership?: {
    plan: {
      name: string
    }
  }
}

export function usePayments() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)

  const fetchPayments = useCallback(async () => {
    try {
      const data = await fetchApi('/payments/payments/my_payments/')
      setPayments(data.results || data)
    } catch (error) {
      console.error('Error fetching payments:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPayments()
  }, [fetchPayments])

  return { payments, loading, refreshPayments: fetchPayments }
}
