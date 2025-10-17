import React, { useEffect, useState } from 'react'
import firebaseartist from '../firebase/firebaseartist-config'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { Navigate, Outlet } from 'react-router-dom'

const auth = getAuth(firebaseartist)

const Preguard = () => {
    const [session, setSession] = useState(null)
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setSession(user)


            }
            else {
                setSession(false)
            }
        })
    }, [])

    console.log(session);

    if (session === null) {
        return <div className='h-screen flex justify-center items-center'>
            <img src="/load.gif" alt="" className='w-25 ' />
        </div>

    }

    if (session) {

        return <Navigate to={'/'} />
    }
    else {

        return <Outlet />
    }


}

export default Preguard
