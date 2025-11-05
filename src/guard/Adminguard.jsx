import React, { useEffect, useState } from 'react'
import firebaseartist from '../firebase/firebaseartist-config'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useNavigate, Outlet, Navigate } from 'react-router-dom'
import { getFirestore, getDocs, collection, query, where } from 'firebase/firestore'
import { useLocation } from 'react-router-dom'
const db = getFirestore(firebaseartist)
const auth = getAuth(firebaseartist)
const AdminGuard = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [session, setSession] = useState(null)
    const [isAdmin, setIsadmin] = useState(false)
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setSession(user)
            }
            else {
                navigate('/')
                return false
            }
        })
    }, [])

    useEffect(() => {
        const req = async () => {
            if (session) {
                const col = collection(db, 'users')
                const q = query(col, where("customerId", "==", session.uid))
                const snapshot = await getDocs(q)
                let role = null
                snapshot.forEach((docs) => {
                    const documnet = docs.data()
                    role = documnet.role
                })

                if (role === "user") {
                    navigate('/profile')
                    return false
                }
                else {
                    setIsadmin(true)
                }
            }
        }
        req()
    }, [session])

    if (session === null) {
        return (
            <div className='bg-gray-200 h-full w-full fixed top-0 left-0 flex justify-center items-center'>
                <span className="relative flex size-6">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                    <span className="relative inline-flex size-6 rounded-full bg-sky-500"></span>
                </span>
            </div>
        );
    }

    if (location.pathname === "/admin")
        return <Navigate to={"/admin/dashboard"} />
    if (isAdmin === true)
        return <Outlet />
}

export default AdminGuard
