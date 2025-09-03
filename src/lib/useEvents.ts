'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuthStore } from './auth'
import { Event, CreateEventData, UpdateEventData } from '@/types/event'
import { getEvents, createEvent, updateEvent, deleteEvent } from './api'

export function useEvents(month?: number, year?: number) {
  const { token } = useAuthStore()
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchEvents = useCallback(async () => {
    if (!token) return

    setIsLoading(true)
    setError(null)

    try {
      const currentDate = new Date()
      const targetMonth = month ?? currentDate.getMonth() + 1
      const targetYear = year ?? currentDate.getFullYear()
      
      const fetchedEvents = await getEvents(token, targetMonth, targetYear)
      setEvents(fetchedEvents)
    } catch (err: any) {
      setError(err.message || 'Failed to fetch events')
      console.error('Error fetching events:', err)
    } finally {
      setIsLoading(false)
    }
  }, [token, month, year])

  const addEvent = useCallback(async (eventData: CreateEventData) => {
    if (!token) return

    try {
      const newEvent = await createEvent(token, eventData)
      setEvents(prev => [...prev, newEvent])
      return newEvent
    } catch (err: any) {
      setError(err.message || 'Failed to create event')
      throw err
    }
  }, [token])

  const editEvent = useCallback(async (eventId: number, eventData: UpdateEventData) => {
    if (!token) return

    try {
      const updatedEvent = await updateEvent(token, eventId, eventData)
      setEvents(prev => prev.map(event => 
        event.id === eventId ? updatedEvent : event
      ))
      return updatedEvent
    } catch (err: any) {
      setError(err.message || 'Failed to update event')
      throw err
    }
  }, [token])

  const removeEvent = useCallback(async (eventId: number) => {
    if (!token) return

    try {
      await deleteEvent(token, eventId)
      setEvents(prev => prev.filter(event => event.id !== eventId))
    } catch (err: any) {
      setError(err.message || 'Failed to delete event')
      throw err
    }
  }, [token])

  useEffect(() => {
    fetchEvents()
  }, [fetchEvents])

  return {
    events,
    isLoading,
    error,
    fetchEvents,
    addEvent,
    editEvent,
    removeEvent,
  }
}