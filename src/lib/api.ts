import { AuthResponse } from '@/types/auth'
import { CreateEventData, UpdateEventData } from '@/types/event'
import { Event } from '@/types/event'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1'

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  }

  try {
    const response = await fetch(url, config)
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
    }

    const contentType = response.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      const result = await response.json()
      return result
    } else {
      return null as any
    }

  } catch (error) {
    console.error('API Request Failed:', error)
    throw error
  }
}

export async function authenticatedRequest<T>(
  endpoint: string,
  token: string,
  options: RequestInit = {}
): Promise<T> {
  return apiRequest<T>(endpoint, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
    },
  })
}

export async function loginUser(email: string, password: string) {
  return apiRequest<AuthResponse>('/login', {
    method: 'POST',
    body: JSON.stringify({
      auth: { email, password }
    }),
  })
}

export async function registerUser(email: string, password: string, passwordConfirmation: string) {
  return apiRequest<AuthResponse>('/register', {
    method: 'POST',
    body: JSON.stringify({
      auth: { email, password, password_confirmation: passwordConfirmation }
    }),
  })
}

export async function getEvents(token: string, month?: number, year?: number) {
  const params = new URLSearchParams()
  if (month) params.append('month', month.toString())
  if (year) params.append('year', year.toString())
  
  const queryString = params.toString()
  const endpoint = queryString ? `/events?${queryString}` : '/events'
  
  return authenticatedRequest<Event[]>(endpoint, token, {
    method: 'GET',
  })
}

export async function getEventsByDate(token: string, date: string) {
  const params = new URLSearchParams()
  params.append('date', date)
  
  return authenticatedRequest<Event[]>(`/events?${params.toString()}`, token, {
    method: 'GET',
  })
}

export async function createEvent(token: string, eventData: CreateEventData) {
  return authenticatedRequest<Event>('/events', token, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ event: eventData }),
  })
}

export async function updateEvent(token: string, eventId: number, eventData: UpdateEventData) {
  return authenticatedRequest<Event>(`/events/${eventId}`, token, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ event: eventData }),
  })
}

export async function deleteEvent(token: string, eventId: number) {
  return authenticatedRequest<null>(`/events/${eventId}`, token, {
    method: 'DELETE',
  })
}