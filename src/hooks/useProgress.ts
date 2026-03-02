'use client'

import { useState, useEffect, useCallback } from 'react'
import { fetchApi } from '@/lib/api'

export interface WeightLog {
  id: string
  weight: string
  date: string
  notes?: string
}

export interface BodyMeasurement {
  id: string
  date: string
  chest?: string
  waist?: string
  hips?: string
  bicep_left?: string
  bicep_right?: string
  thigh_left?: string
  thigh_right?: string
  body_fat_percentage?: string
}

export interface ProgressSummary {
  weight_logs_count: number
  latest_weight: string | null
  weight_change: string | null
  total_workouts: number
  completed_workouts: number
  total_workout_time: number
  avg_workout_duration: string | null
}

export function useProgress() {
  const [summary, setSummary] = useState<ProgressSummary | null>(null)
  const [weightLogs, setWeightLogs] = useState<WeightLog[]>([])
  const [loading, setLoading] = useState(true)

  const fetchProgressData = useCallback(async () => {
    try {
      const token = localStorage.getItem('access_token')
      if (!token) return

      // Fetch summary
      try {
        const summaryData = await fetchApi('/progress/summary/my_summary/')
        setSummary(summaryData)
      } catch (err) {
        console.error('Error loading progress summary:', err)
      }

      // Fetch recent weight logs
      try {
        const logs = await fetchApi('/progress/weight-logs/')
        setWeightLogs(logs.results || logs)
      } catch (err) {
        console.error('Error loading weight logs:', err)
      }
    } finally {
      setLoading(false)
    }
  }, [])

  const addWeightLog = async (data: { weight: number; date: string; notes?: string }) => {
    try {
      const response = await fetchApi('/progress/weight-logs/', {
        method: 'POST',
        body: JSON.stringify(data)
      })
      await fetchProgressData() // Refresh
      return response
    } catch (error) {
      console.error('Error adding weight log:', error)
      throw error
    }
  }

  useEffect(() => {
    fetchProgressData()
  }, [fetchProgressData])

  return {
    summary,
    weightLogs,
    loading,
    addWeightLog,
    refreshProgress: fetchProgressData
  }
}
