import { createContext, useContext, useEffect, useState} from 'react';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from 'firebase/auth'
import { auth } from '../firebase-config'

export const authContext = createContext()

export const useAuth = () => {
    const context = useContext(authContext)
    if (!context) {
        throw new Error('There is no auth provider')
    }
    return context
}

export function AuthProvider({children}){

    const [user,setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const signup = (email,password) => createUserWithEmailAndPassword(auth,email,password)

    const login = async (email,password) => signInWithEmailAndPassword(auth, email, password) 

    const logout = () => {
        signOut(auth)
        setLoading(true)
    }

    useEffect(() => {
        
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
            console.log(user.email)
        })
        
    },[])

    return(
        <authContext.Provider value={{signup, login, logout, user, loading}}>
            {children}
        </authContext.Provider>
    )
}