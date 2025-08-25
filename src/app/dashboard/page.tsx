'use client'

import { ProtectedLayout } from '@/components/layout/protected-layout'
import { useAuthStore } from '@/lib/auth'

export default function DashboardPage() {
  const { user } = useAuthStore()

  return (
    <ProtectedLayout>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome to Daily Planner</h1>
          <p className="text-muted-foreground mt-2">
            Hello, {user?.email}! Here's your calendar for this month.
          </p>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">Calendar Coming Soon</h2>
          <p className="text-muted-foreground">
            The monthly calendar view will be displayed here. You'll be able to see all your events and click on dates to view daily agendas.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-muted/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
            <p className="text-muted-foreground">
              Create new events, view upcoming tasks, and manage your schedule.
            </p>
          </div>
          
          <div className="bg-muted/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Recent Events</h3>
            <p className="text-muted-foreground">
              Your most recent events and upcoming deadlines will appear here.
            </p>
          </div>
        </div>
      </div>
    </ProtectedLayout>
  )
}