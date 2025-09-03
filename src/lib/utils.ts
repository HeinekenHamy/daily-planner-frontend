import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function formatTime(time: string): string {
  // Handle full datetime strings like "2000-01-01 00:33:00 UTC"
  let timeOnly = time
  if (time.includes(' ')) {
    // Extract just the time portion from datetime string
    timeOnly = time.split(' ')[1].split(':').slice(0, 2).join(':')
  }
  
  const [hours, minutes] = timeOnly.split(':')
  const hour = parseInt(hours)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour % 12 || 12
  return `${displayHour}:${minutes} ${ampm}`
}

export function extractTimeForInput(time: string): string {
  // Extract just the time portion (HH:mm) for HTML time input
  if (time.includes(' ')) {
    // Handle full datetime strings like "2000-01-01 00:33:00 UTC"
    return time.split(' ')[1].split(':').slice(0, 2).join(':')
  }
  // Already in HH:mm format
  return time
}