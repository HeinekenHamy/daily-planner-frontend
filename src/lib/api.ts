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

  // Add debug logging for all requests
  console.log('=== DEBUG: API Request Details ===')
  console.log('URL:', url)
  console.log('Method:', config.method || 'GET')
  console.log('Headers:', config.headers)
  console.log('Content-Type specifically:', config.headers?.['Content-Type'])
  console.log('Body:', config.body)
  console.log('Body type:', typeof config.body)

  try {
    const response = await fetch(url, config)
    
    console.log('=== DEBUG: API Response ===')
    console.log('Status:', response.status)
    console.log('Status Text:', response.statusText)
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.log('=== DEBUG: Error Response ===')
      console.log('Error data:', errorData)
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
    }

    const contentType = response.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      const result = await response.json()
      console.log('=== DEBUG: Success Response ===')
      console.log('Response data:', result)
      return result
    } else {
      console.log('=== DEBUG: Success Response (No Content) ===')
      console.log('Status:', response.status, 'No JSON content')
      return null as any
    }

  } catch (error) {
    console.error('=== DEBUG: API Request Failed ===')
    console.error('Error:', error)
    throw error
  }
}

export async function authenticatedRequest<T>(
  endpoint: string,
  token: string,
  options: RequestInit = {}
): Promise<T> {
  console.log('🔐 authenticatedRequest called!')
  console.log('📍 endpoint:', endpoint)
  console.log('🎫 token:', token ? 'Present' : 'Missing')
  console.log('⚙️ options:', options)
  console.log('📦 body:', options.body)
  
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
  console.log('🚀 createEvent called!')
  console.log('📝 eventData:', eventData)
  
  const requestBody = { event: eventData }
  console.log('📦 requestBody:', requestBody)
  
  const jsonBody = JSON.stringify(requestBody)
  console.log('📄 jsonBody:', jsonBody)
  
  return authenticatedRequest<Event>('/events', token, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: jsonBody,
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