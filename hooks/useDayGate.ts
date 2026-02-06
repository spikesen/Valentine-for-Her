'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { VALENTINE_DAYS } from '@/data/valentineDays'
import { isAfter } from 'date-fns'
import { parseFinlandDate } from '@/lib/utils'

export const useDayGate = (dayId: number) => {
  const router = useRouter()

  useEffect(() => {
    const day = VALENTINE_DAYS.find(d => d.id === dayId)
    if (!day) {
      router.push('/')
      return
    }

    const now = new Date()
    const dayDate = parseFinlandDate(day.date)

    // Redirect if today is before the day's scheduled date
    if (!isAfter(now, dayDate) && now < dayDate) {
      router.push('/')
    }
  }, [dayId, router])
}
