'use client'

import { useState } from 'react'
import { ProtectedLayout } from '@/components/layout/protected-layout'
import { useAuthStore } from '@/lib/auth'
import { MonthlyCalendar } from '@/components/calendar/monthly-calendar'
import { DailyAgenda } from '@/components/calendar/daily-agenda'
import { useEvents } from '@/lib/useEvents'

export default function DashboardPage() {
  const { user } = useAuthStore()
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isAgendaOpen, setIsAgendaOpen] = useState(false)
  const { events, isLoading, error, removeEvent } = useEvents()

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date)
      setIsAgendaOpen(true)

      const dateString = date.toISOString().split('T')[0]
      const dayEvents = events.filter(event => event.date === dateString)
      console.log('Events for', dateString, ':', dayEvents)
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

        {/* Loading and Error States */}
        {isLoading && (
          <div className="text-center py-4">
            <p className="text-muted-foreground">Loading events...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-4">
            <p className="text-destructive">Error loading events: {error}</p>
          </div>
        )}
        
        {/* Calendar Component */}
        <div className="max-w-4xl mx-auto">
          <MonthlyCalendar onDateSelect={handleDateSelect} events={events} />
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
        events={events}
        onDeleteEvent={removeEvent}
      />
    </ProtectedLayout>
  )
}