import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import { auth } from "../firebase";
const UserContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState({})
    const [typeOfUser, setTypeOfUser] = useState(''); // New state for user type
    const [first, setFirst] = useState(''); // New state for first name
    const [last, setLast] = useState(''); 

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email,password)=> {
        return signInWithEmailAndPassword(auth,email, password)
    }

    const logout = ()=> {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
              setUser(currentUser)
        })
        
        return () => {
            unsubscribe()
        }
    })

    return (
        <UserContext.Provider value={{createUser, user, logout, signIn, typeOfUser, first, last, setTypeOfUser, setFirst, setLast }}>
              {children}
        </UserContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(UserContext)
}