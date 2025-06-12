import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: 'customer' | 'admin'
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { user, userProfile, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#173D54]">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/SignIn" replace />
  }

  if (requiredRole && userProfile?.role !== requiredRole) {
    // Redirect based on user role
    if (userProfile?.role === 'admin') {
      return <Navigate to="/Admin" replace />
    } else {
      return <Navigate to="/Shop" replace />
    }
  }

  return <>{children}</>
}

export default ProtectedRoute