'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface DailyAgendaProps {
  isOpen: boolean
  onClose: () => void
  selectedDate: Date | null
}

export function DailyAgenda({ isOpen, onClose, selectedDate }: DailyAgendaProps) {
  if (!selectedDate) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {formatDate(selectedDate)}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Events List */}
          <div className="space-y-3">
            <div className="text-center py-8 text-muted-foreground">
              <p className="text-lg font-medium mb-2">No events scheduled</p>
              <p className="text-sm">Click the + button to add an event for this date</p>
            </div>
          </div>

          {/* Add Event Button */}
          <div className="flex justify-center pt-4 border-t">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Event
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}