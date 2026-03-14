'use client'

import { useState, useEffect, useCallback } from 'react'
import { fetchApi } from '@/lib/api'

export interface DashboardData {
  membership: {
    plan_name: string
    status: string
    end_date: string
    days_remaining: number | null
  } | null
  membership_status_alert: boolean
  attendance_stats: {
    attended_this_month: number
  }
  monthly_attendance: {
    id: string
    date: string
    attended: boolean
    notes: string
  }[]
  weight_progress: {
    date: string
    weight: number
  }[]
  weight_goal_type: 'LOSE' | 'GAIN' | 'MAINTAIN'
  weekly_routine: {
    id: string
    name: string
    scheduled_days: string[]
    exercises_count: number
  } | null
  quick_metrics: {
    workouts_this_week: number
    streak: number
    completed_routines: number
    current_weight: number | null
  }
}

export function useClientDashboard() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDashboardData = useCallback(async () => {
    try {
      const token = localStorage.getItem('access_token')
      if (!token) return

      const response = await fetchApi('/metrics/dashboard/')
      setData(response)
      setError(null)
    } catch (err: any) {
      console.error('Error loading dashboard data:', err)
      setError(err.message || 'Error al cargar el dashboard')
    } finally {
      setLoading(false)
    }
  }, [])

  const toggleAttendance = async (date: string, attended: boolean) => {
    try {
      await fetchApi('/metrics/attendance/toggle/', {
        method: 'POST',
        body: JSON.stringify({ date, attended })
      })
      await fetchDashboardData() // Refresh
    } catch (err: any) {
      console.error('Error toggling attendance:', err)
      throw err
    }
  }

  const logWeight = async (weight: number, date: string) => {
    try {
      await fetchApi('/progress/weight-logs/', {
        method: 'POST',
        body: JSON.stringify({ weight, date })
      })
      await fetchDashboardData() // Refresh
    } catch (err: any) {
      console.error('Error logging weight:', err)
      throw err
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [fetchDashboardData])

  return {
    data,
    loading,
    error,
    toggleAttendance,
    logWeight,
    refreshDashboard: fetchDashboardData
  }
}
