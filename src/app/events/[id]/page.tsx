'use client'

import { ProtectedLayout } from '@/components/layout/protected-layout'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface EditEventPageProps {
  params: {
    id: string
  }
}

export default function EditEventPage({ params }: EditEventPageProps) {
  const eventId = params.id

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
          <h1 className="text-3xl font-bold">Edit Event</h1>
          <p className="text-muted-foreground mt-2">
            Modify event #{eventId}
          </p>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">Edit Form Coming Soon</h2>
          <p className="text-muted-foreground mb-4">
            This form will allow you to edit:
          </p>
          <ul className="text-muted-foreground space-y-1">
            <li>• Event Title</li>
            <li>• Description</li>
            <li>• Date</li>
            <li>• Time</li>
            <li>• Category</li>
            <li>• Priority</li>
          </ul>
          <p className="text-muted-foreground mt-4">
            The form will be pre-filled with the current event data.
          </p>
        </div>
      </div>
    </ProtectedLayout>
  )
}