'use client'

import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Event } from '@/types/event'

interface MonthlyCalendarProps {
  onDateSelect: (date: Date) => void
  events: Event[]
}

export function MonthlyCalendar({ onDateSelect, events }: MonthlyCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date())
  
  // Debug logging
  console.log('MonthlyCalendar received events:', events)

  const goToPreviousMonth = () => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev)
      newMonth.setMonth(prev.getMonth() - 1)
      return newMonth
    })
  }

  const goToNextMonth = () => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev)   
      newMonth.setMonth(prev.getMonth() + 1)
      return newMonth
    })
  }

  const goToCurrentMonth = () => {
    setCurrentMonth(new Date())
  }

  return (
    <div className="space-y-4">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={goToPreviousMonth}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <div className="text-center">
          <h2 className="text-2xl font-bold">
            {currentMonth.toLocaleDateString('en-US', { 
              month: 'long', 
              year: 'numeric' 
            })}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={goToCurrentMonth}
            className="text-muted-foreground hover:text-foreground"
          >
            Today
          </Button>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={goToNextMonth}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Calendar Grid */}
      <div className="border rounded-lg p-4 bg-background">
        <Calendar
          mode="single"
          selected={undefined}
          onSelect={onDateSelect}
          month={currentMonth}
          onMonthChange={setCurrentMonth}
          className="w-full"
          modifiers={{
            hasEvents: (date) => {
              const dateString = date.toISOString().split('T')[0]
              const dayEvents = events.filter(event => event.date === dateString)
              return dayEvents.length > 0
            }
          }}
          modifiersClassNames={{
            hasEvents: "relative after:content-[''] after:absolute after:bottom-1 after:left-1/2 after:transform after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-primary after:rounded-full"
          }}
        />
      </div>
    </div>
  )
}