'use client'

import { useState, useEffect, useCallback } from 'react'
import { fetchApi } from '@/lib/api'

export interface MembershipPlan {
  id: string
  name: string
  description: string
  duration_days: number
  price: string
  features: string[]
}

export interface Membership {
  id: string
  plan: MembershipPlan
  start_date: string
  end_date: string
  status: 'PENDING' | 'ACTIVE' | 'EXPIRED' | 'CANCELLED' | 'SUSPENDED'
  qr_code?: string
  qr_code_payload?: string
  auto_renew: boolean
  created_at: string
}

export interface CheckIn {
  id: string
  checked_in_at: string
  notes?: string
}

export function useMembership() {
  const [activeMembership, setActiveMembership] = useState<Membership | null>(null)
  const [checkIns, setCheckIns] = useState<CheckIn[]>([])
  const [loading, setLoading] = useState(true)

  const fetchMembershipData = useCallback(async () => {
    try {
      const token = localStorage.getItem('access_token')
      if (!token) return

      // Fetch active membership
      try {
        const membership = await fetchApi('/memberships/memberships/active/')
        setActiveMembership(membership)
      } catch (err: any) {
        if (err.status !== 404) {
          console.error('Error loading active membership:', err)
        }
        setActiveMembership(null)
      }

      // Fetch check-ins
      try {
        const checkinsData = await fetchApi('/memberships/checkins/')
        setCheckIns(checkinsData.results || checkinsData) // Handle DRF pagination if present
      } catch (err) {
        console.error('Error loading check-ins:', err)
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchMembershipData()
  }, [fetchMembershipData])

  return {
    activeMembership,
    checkIns,
    loading,
    refreshMembership: fetchMembershipData
  }
}
