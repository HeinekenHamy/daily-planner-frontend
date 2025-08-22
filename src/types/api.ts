export interface ApiError {
    error: string
    errors?: string[]
  }
  
  export interface ApiResponse<T> {
    data?: T
    error?: string
    errors?: string[]
  }
  
  export interface PaginatedResponse<T> {
    data: T[]
    meta?: {
      current_page: number
      total_pages: number
      total_count: number
    }
  }