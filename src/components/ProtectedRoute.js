import {useAuth} from '../context/authContext'
import {Navigate} from 'react-router-dom'

export function ProtectedRoute({children}) {
    const {user,loading} = useAuth()

    if(loading) return null
    if(!user) return <Navigate to='/login' />
    //else if(user && user.email !== 'admin@gmail.com') return null

    return <>{children}</>
}