import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'


// useful for user based pages
export default function PrivateRoute({children}) 
{
    const {currentUser} = useAuth()

    return(
        currentUser? children : <Navigate to='/login' />
    )
}
