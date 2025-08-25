'use client'

import { useAuthStore } from '@/lib/auth'
import { Button } from '@/components/ui/button'

export function Header() {
  const { user, logout } = useAuthStore()

  return (
    <header className="border-b bg-background px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Daily Planner</h1>
        
        {user && (
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user.email}</span>
            <Button variant="outline" size="sm" onClick={logout}>
              Logout
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}