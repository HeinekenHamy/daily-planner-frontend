export interface Event {
    id: number
    title: string
    description?: string
    date: string
    time?: string
    category: 'Work' | 'Personal' | 'Health' | 'Other'
    priority: 'Low' | 'Medium' | 'High'
    user_id: number
    created_at: string
    updated_at: string
  }
  
  export interface CreateEventData {
    title: string
    description?: string
    date: string
    time?: string
    category: 'Work' | 'Personal' | 'Health' | 'Other'
    priority: 'Low' | 'Medium' | 'High'
  }
  
  export interface UpdateEventData extends Partial<CreateEventData> {}