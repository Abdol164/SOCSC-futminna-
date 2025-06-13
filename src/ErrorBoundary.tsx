import type React from 'react'
import {
  ErrorBoundary as ReactErrorBoundary,
  type FallbackProps,
} from 'react-error-boundary'
import { Button } from './components/ui/button'
import { useNavigate, useRouteError } from 'react-router-dom'

const FallbackComponent: React.FC<FallbackProps> = ({ resetErrorBoundary }) => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center">
        <div className="w-full max-w-[300px] opacity-90">
          <img
            src="/images/break-vector.png"
            alt="error-image"
            className="w-full h-full"
          />
        </div>

        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-2xl font-bold">Oh no!</h1>
          <p className="text-gray-500">Something went wrong</p>
        </div>
        <Button
          className="mt-5 bg-blue-500 hover:bg-blue-600"
          onClick={() => resetErrorBoundary()}
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

interface ErrorBoundaryProps {
  fallback?: React.ComponentType<FallbackProps>
  onError?: (error: Error) => void
  children?: React.ReactNode
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({
  fallback,
  onError,
  children,
}) => {
  return (
    <ReactErrorBoundary
      FallbackComponent={fallback || FallbackComponent}
      onError={
        onError ||
        ((error, errorInfo) => console.log('Error:', error, errorInfo))
      }
    >
      {children}
    </ReactErrorBoundary>
  )
}

// Router Error Boundary component specifically for React Router
export const RouterErrorBoundary: React.FC = () => {
  const error = useRouteError()
  const navigate = useNavigate()

  console.error('Router Error:', error)

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

export default ErrorBoundary
