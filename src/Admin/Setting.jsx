import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import firebaseartist from '../firebase/firebaseartist-config'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import axios from 'axios';
import { getFirestore } from 'firebase/firestore';

const auth = getAuth(firebaseartist)
const db = getFirestore(firebaseartist)
const Setting = () => {
    const [session, setSession] = useState(null);
    const [fromValue, setFromValue] = useState({
        fullname: '',
        email: '',
    });


    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                setSession(user);
                setFromValue({
                    ...fromValue,

                    email: user.email || ""
                });

            } else {
                setSession(false);
                navigate('/');
            }
        });

    }, []);

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
    return (
        <Layout>
            {
                <div className='min-h-screen bg-gray-50 px-6 py-10'>
                    <section className='px-4 py-8 grid md:grid-cols-3 grid-cols-1 gap-2'>
                        <div >
                            <img src="/avatr.svg" alt="" className='rounded-full  ' />
                        </div>
                        <div className='     col-span-2  p-4'>
                            <div className='flex gap-2 items-center text-black'>
                                <i className='ri-user-line text-4xl'></i>
                                <h1 className='text-3xl font-bold '>Profile</h1>
                            </div>
                            <hr className='mt-3 text-slate-400' />

                            <form className='mt-5 grid md:grid-cols-2  gap-6 grid-cols-1 '  >
                                <div className='flex flex-col gap-1 col-span-2 md:col-span-1'>
                                    <label className='font-bold text-lg text-black'>Fullname</label>
                                    <input disabled type="text" name='fullname' required placeholder='Ganesh' className='p-2 rounded bg-white border border-slate-300' value={fromValue.fullname || 'Admin'} />
                                </div>

                                <div className='flex flex-col gap-1 col-span-2 md:col-span-1'>
                                    <label className='font-bold text-lg text-black' >Email</label>
                                    <input disabled type="email" name='email' required placeholder='example@gmail.com' className='p-2 rounded bg-white border border-slate-300' value={fromValue.email} />
                                </div>

                                <div className='col-span-2'>

                                    <button type="submit" disabled className='bg-rose-600 w-fit px-6 py-2 rounded font-semibold text-white'>
                                        <i className='ri-save-line mr-2'></i>
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </section>
                </div>
            }
        </Layout>
    )
}

export default Setting
