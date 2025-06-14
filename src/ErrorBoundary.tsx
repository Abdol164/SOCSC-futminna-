import type React from 'react'
import { Button } from './components/ui/button'
import { useNavigate, useRouteError } from 'react-router-dom'

// Router Error Boundary component specifically for React Router
export const RouterErrorBoundary: React.FC = () => {
  const error = useRouteError()
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center">
        <div className="w-full max-w-[250px] opacity-90">
          <img
            src="/images/break-vector.png"
            alt="error-image"
            className="w-full h-full"
          />
        </div>

        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-2xl font-bold">Oh no!</h1>
          <p className="text-gray-500">Something went wrong</p>
          {error instanceof Error && (
            <p className="text-sm text-gray-400 mt-2 max-w-md text-center">
              {error.message}
            </p>
          )}
        </div>
        <Button
          className="mt-5 bg-blue-500 hover:bg-blue-600"
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </div>
      <Button className="mt-5" variant="link" onClick={() => navigate('/')}>
        Go to home
      </Button>
    </div>
  )
}
