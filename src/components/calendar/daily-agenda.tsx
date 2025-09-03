'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { formatDate, formatTime } from '@/lib/utils'
import { Event } from '@/types/event'
import { useRouter } from 'next/navigation'
import { Edit, Trash } from 'lucide-react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'

import { useState } from 'react'

interface DailyAgendaProps {
  isOpen: boolean
  onClose: () => void
  selectedDate: Date | null
  events: Event[]
  onDeleteEvent: (eventId: number) => Promise<void>
}

export function DailyAgenda({ isOpen, onClose, selectedDate, events, onDeleteEvent }: DailyAgendaProps) {
  const router = useRouter()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [eventToDelete, setEventToDelete] = useState<number | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  if (!selectedDate) return null
  const dateString = selectedDate.toISOString().split('T')[0]
  const dayEvents = events.filter(event => event.date === dateString)

  const handleAddEvent = () => {
    if (selectedDate) {
      const dateString = selectedDate.toISOString().split('T')[0]
      router.push(`/events/create?date=${dateString}`)
    }
  }
  const handleEditEvent = (eventId: number) => {
    router.push(`/events/${eventId}/edit`)
  }
  const handleDeleteEvent = (eventId: number) => {
    setEventToDelete(eventId)
    setDeleteDialogOpen(true)
  }
  
  const confirmDelete = async () => {
    if (!eventToDelete) return
    
    setIsDeleting(true)
    try {
      await onDeleteEvent(eventToDelete)
      setDeleteDialogOpen(false)
      setEventToDelete(null)
    } catch (err: any) {
      console.error('Failed to delete event:', err)
      // You could add error state here if needed
    } finally {
      setIsDeleting(false)
    }
  }
  

  return (
    <>
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {formatDate(selectedDate)}
          </DialogTitle>
          <DialogDescription>
            View and manage events for this date. You can add new events or view existing ones.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Events List */}
          <div className="space-y-3">
            {dayEvents.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p className="text-lg font-medium mb-2">No events scheduled</p>
                <p className="text-sm">Click the + button to add an event for this date</p>
              </div>
            ) : (
              <div className="space-y-3">
                {dayEvents.map((event) => (
                  <div key={event.id} className="border rounded-lg p-4 bg-muted/50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{event.title}</h3>
                        {event.description && (
                          <p className="text-muted-foreground text-sm mt-1">{event.description}</p>
                        )}
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          {event.time && (
                            <span>{formatTime(event.time)}</span>
                          )}
                          <span className="capitalize">{event.category}</span>
                          <span className="capitalize">{event.priority} Priority</span>
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-2 ml-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditEvent(event.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteEvent(event.id)}
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Add Event Button */}
          <div className="flex justify-center pt-4 border-t">
          <Button 
            className="flex items-center gap-2"
            onClick={handleAddEvent}
          >
            <Plus className="h-4 w-4" />
            Add Event
          </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>

    {/* Delete Confirmation Dialog */}
    <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Event</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this event? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={confirmDelete}
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </>
  )
}