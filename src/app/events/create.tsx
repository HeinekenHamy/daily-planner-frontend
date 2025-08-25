'use client'

import { ProtectedLayout } from '@/components/layout/protected-layout'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function CreateEventPage() {
  return (
    <ProtectedLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
        
        <div className="text-center">
          <h1 className="text-3xl font-bold">Create New Event</h1>
          <p className="text-muted-foreground mt-2">
            Add a new event to your calendar
          </p>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">Event Form Coming Soon</h2>
          <p className="text-muted-foreground mb-4">
            This form will include fields for:
          </p>
          <ul className="text-muted-foreground space-y-1">
            <li>• Event Title (required)</li>
            <li>• Description (optional)</li>
            <li>• Date (required)</li>
            <li>• Time (optional)</li>
            <li>• Category (Work, Personal, Health, Other)</li>
            <li>• Priority (Low, Medium, High)</li>
          </ul>
        </div>
      </div>
    </ProtectedLayout>
  )
}