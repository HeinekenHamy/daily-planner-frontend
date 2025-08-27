'use client'

import { useState } from 'react'
import { ProtectedLayout } from '@/components/layout/protected-layout'
import { useAuthStore } from '@/lib/auth'
import { MonthlyCalendar } from '@/components/calendar/monthly-calendar'
import { DailyAgenda } from '@/components/calendar/daily-agenda'

export default function DashboardPage() {
  const { user } = useAuthStore()
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isAgendaOpen, setIsAgendaOpen] = useState(false)

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date)
      setIsAgendaOpen(true)
    }
  }

  return (
    <ProtectedLayout>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome to Daily Planner</h1>
          <p className="text-muted-foreground mt-2">
            Hello, {user?.email}! Here's your calendar for this month.
          </p>
        </div>
        
        {/* Calendar Component */}
        <div className="max-w-4xl mx-auto">
          <MonthlyCalendar onDateSelect={handleDateSelect} />
        </div>
        
        {/* Selected Date Info */}
        {selectedDate && (
          <div className="text-center">
            <p className="text-muted-foreground">
              Selected: {selectedDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Daily agenda modal coming in the next step!
            </p>
          </div>
        )}
      </div>

      <DailyAgenda
        isOpen={isAgendaOpen}
        onClose={() => setIsAgendaOpen(false)}
        selectedDate={selectedDate}
      />
    </ProtectedLayout>
  )
}