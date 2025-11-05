import React, { useState } from 'react'
import logo from '/artist.jpeg'
import { Link, useNavigate } from 'react-router-dom'
import firebaseartist from '../firebase/firebaseartist-config'
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore, addDoc, collection, serverTimestamp } from 'firebase/firestore'

const db = getFirestore(firebaseartist)
const auth = getAuth(firebaseartist)
const googleProvider = new GoogleAuthProvider()
const Login = () => {

    const navigate = useNavigate()
    const [loading, setloading] = useState(false)

    const [fromValue, setFromvalue] = useState({
        username: '',
        email: '',
        password: ''
    })
    const handelValue = (e) => {
        const value = e.target.value
        const key = e.target.name
        setFromvalue({
            ...fromValue,
            [key]: value
        })
    }

    const loginFrom = async (e) => {
        try {
            e.preventDefault()
            setloading(true)
            const signupData = await createUserWithEmailAndPassword(auth, fromValue.email, fromValue.password)
            await updateProfile(auth.currentUser, { displayName: fromValue.username })
            await addDoc(collection(db, 'users'), {
                email: fromValue.email,
                customerId: signupData.user.uid,
                role: "user",
                createdAt: serverTimestamp()
            })
            navigate('/')


        } catch (error) {
            new swal({
                icon: 'error',
                title: 'Failed',
                text: error.message
            })
        }
        finally {
            setloading(false)
        }
    }




    const handelGoogleLogin = async () => {
        try {
            const res = await signInWithPopup(auth, googleProvider)
            const user = res.user
            console.log(user);



        } catch (error) {
            new swal({
                icon: 'error',
                title: 'Failde',
                text: error.message
            })
        }
    }


    return (
        <div className='h-screen flex justify-center p-4 items-center' style={{ backgroundImage: `url(${logo})` }}>
            <div className='bg-black/80  rounded-lg  p-4 animate__animated animate__zoomIn '>
                <h1 className='text-purple-600 font-semibold text-3xl text-center mt-5'>Welcome</h1>

                <form className='flex flex-col gap-4 mt-8' onSubmit={loginFrom}>
                    <button type='button' onClick={handelGoogleLogin} className='bg-gray-300 rounded border border-green-500 shadow py-2 '>
                        <i className="ri-google-fill bg-gradient-to-r from-red-500 via-green-500 to-purple-500 text-transparent bg-clip-text"></i>
                    </button>
                    <span className='text-gray-500 font-semibold text-lg my-5 text-center'>or</span>

                    <div>
                        <input onChange={handelValue} type="text" value={fromValue.username} name='username' placeholder='username' className='bg-white rounded border border-slate-300 p-4 w-full' />
                    </div>

                    <div>
                        <input onChange={handelValue} type="email" value={fromValue.email} name='email' placeholder='username@gmail.com' className='bg-white rounded border border-slate-300 p-4 w-full' />
                    </div>
                    <div>
                        <input onChange={handelValue} type="password" value={fromValue.password} name='password' placeholder='******' className='bg-white rounded border border-slate-300 p-4 w-full' />
                    </div>

                    {
                        loading ? <h1 className='text-2xl text-gray-700 my-4'>Loading...</h1> :
                            <button className='bg-indigo-600 py-2 rounded text-white hover:bg-indigo-700 cursor-pointer'>
                                SingUp
                            </button>
                    }


                </form>
                <div className='mt-8 text-base text-center text-gray-400'>
                    <h1>By continuing, you agree to our <span className='underline'>Terms</span>  and <span className='underline'>Privacy Policy</span>.</h1>
                    <Link className='mt-4 cursor-pointer block' to={'/login'}>
                        Already Have account? Login
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login
