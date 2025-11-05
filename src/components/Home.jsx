import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import firebaseartist from '../firebase/firebaseartist-config'
import { getFirestore, addDoc, collection, getDocs, updateDoc, serverTimestamp, query, where } from 'firebase/firestore';

import { Link, useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
const auth = getAuth(firebaseartist)
const db = getFirestore(firebaseartist)
const Home = () => {

    const navigate = useNavigate()
    const [artist, setArtist] = useState([])
    const [arts, setArts] = useState([])
    const [session, setSession] = useState(null)
    const [isUpdated, setIsupdate] = useState(false)


    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setSession(user)
            }
            else {
                setSession(false)
            }
        })

        const req = async () => {
            const getData = await getDocs(collection(db, 'artsData'))
            let temp = []
            getData.forEach((docs) => {
                const documnet = docs.data()
                documnet.id = docs.id
                temp.push(documnet)
            })
            setArts(temp)
        }
        req()


        const req1 = async () => {
            const getData = await getDocs(collection(db, 'artistData'))
            let temp = []
            getData.forEach((docs) => {
                const documnet = docs.data()
                documnet.id = docs.id
                temp.push(documnet)
            })
            setArtist(temp)
        }
        req1()
    }, [])


    const addToCart = async (item) => {
        if (session) {

            try {
                item.userid = session.uid
                const data = await addDoc(collection(db, 'carts'), item)
                setIsupdate(!isUpdated)
                new swal({
                    icon: 'success',
                    title: "Successfully Add to Cart"

                })

            } catch (error) {
                new swal({
                    icon: 'error',
                    title: "Failed !",
                    text: "Please First Login"
                })
            }
        }
        else {
            new swal({
                icon: 'error',
                title: 'Please First  Login'
            })
        }
    }


    const dataNotPresent = () => {
        new swal({
            toast: true,
            position: 'bottom-end',  // bottom right
            icon: 'info',
            title: 'Coming soon!',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            background: '#1E293B',
            color: '#fff',
        })
    }

    return (
        <Layout update={isUpdated}>
            {
                <div className='md:p-16 p-8 md:w-11/12 mx-auto '>
                    <div className='flex flex-col-reverse md:flex-row justify-between gap-4 items-center'>
                        <div className='text-white max-w-lg space-y-4'>
                            <h1 className="text-3xl md:text-5xl font-bold leading-tight">Discover, Hire & Showcase Creative Artists</h1>
                            <p className="text-gray-300">Join the community of creators and explore top talent in music, design, and art.</p>
                            <div className="space-x-4">
                                <button onClick={() => navigate('/explore')} className="bg-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-700">Explore Artists</button>
                                <button className="border px-6 py-3 rounded-lg hover:bg-indigo-500">Become an Artist</button>
                            </div>
                        </div>
                        <div className='w-full'>
                            <img src="/art.jpeg" alt="hero" className='w-full rounded-lg shadow-lg shadow-purple-700 rotate-6 hover:rotate-0 transition-all duration-300' />
                        </div>
                    </div>
                    <div >
                        <h1 className='mt-12 text-3xl font-bold text-white text-center'>🔥Trending Now</h1>
                        <div className='grid md:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-6 mt-8 '>
                            {
                                arts.slice(0, 6).map((item, id) => (
                                    <div key={id} className='bg-[#1e293b] rounded-2xl overflow-hidden shadow-lg hover:scale-105 hover:shadow-indigo-500/30 transition-all duration-300 flex gap-4 flex-col'>
                                        <img src={item.imageUrl} alt="" className='w-full  h-[250px] rounded-t-xl' />
                                        <div className='p-4'>
                                            <p className='text-white  text-xl font-semibold'>{item.title} </p>
                                            <p class="text-sm text-gray-400 uppercase tracking-wide">{item.category}</p>
                                            <p className='text-gray-400  '>₹{item.price}</p>
                                        </div>
                                        <div className='flex '>
                                            <button onClick={() => navigate(`/art/${item.id}`)} className='bg-indigo-600 text-white cursor-pointer py-2 w-full hover:bg-indigo-800 '>
                                                View Details
                                            </button>
                                            <button onClick={() => addToCart(item)} className='bg-rose-600 text-white cursor-pointer py-2 w-full hover:bg-rose-800 '>
                                                Add Cart
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div >
                        <h1 className='mt-12 text-3xl font-bold text-white text-center'>🔥Top <span className='text-purple-700'>Artist</span></h1>
                        <div className='flex flex-nowrap gap-5 mt-8 overflow-auto scrollbar-hide'>
                            {
                                artist.slice(0, 6).map((item, id) => (
                                    <div key={id} className='shrink-0 md:w-3/12  w-full bg-gray-700/25 shadow-lg rounded-2xl overflow-hidden flex flex-col gap-4'>
                                        <img src={item.imageUrl} alt="" className='w-full  h-[300px] object-cover' />
                                        <div className='px-4'>
                                            <p className='text-xl font-semibold text-gray-200'>{item.name}</p>
                                            <p className='text-gray-500 '>{item.specility} Artist</p>
                                            <div className='flex gap-2 text-white text-xl my-4  '>
                                                <i onClick={dataNotPresent} className="ri-facebook-line rounded-full border px-2 py-1 bg-indigo-500 hover:scale-105 cursor-pointer"></i>
                                                <i onClick={dataNotPresent} className="ri-instagram-line rounded-full border px-2 py-1 bg-rose-500  hover:scale-105 cursor-pointer"></i>
                                                <i onClick={dataNotPresent} className="ri-snapchat-line  rounded-full border px-2 py-1 bg-yellow-500  hover:scale-105 cursor-pointer"></i>
                                                <i onClick={dataNotPresent} className="ri-whatsapp-line  rounded-full border px-2 py-1 bg-green-500  hover:scale-105 cursor-pointer "></i>
                                            </div>
                                        </div>
                                        <div className='flex '>
                                            <button onClick={() => navigate(`/artist/${item.id}`)} className='bg-indigo-600 text-white cursor-pointer py-2 w-full hover:bg-indigo-800 '>
                                                View Details
                                            </button>
                                        </div>
                                    </div>

                                ))
                            }
                        </div>
                    </div>

                    <section class="  text-white py-16">
                        <h2 class="text-3xl font-bold text-center mb-10">Testimonials</h2>
                        <div class="flex flex-wrap justify-center gap-6">
                            <div class="bg-gray-800 p-6 rounded-xl  shadow-lg">
                                <p>"Great artist! Loved the work!"</p>
                                <p class="mt-4 font-bold">- Rohan Kumar</p>
                            </div>
                            <div class="bg-gray-800 p-6 rounded-xl  shadow-lg">
                                <p>"Perfect design, will hire again!"</p>
                                <p class="mt-4 font-bold">- Anjali Sharma</p>
                            </div>
                            <div class="bg-gray-800 p-6 rounded-xl  shadow-lg">
                                <p>"Great artist! Loved the work!"</p>
                                <p class="mt-4 font-bold">- Rohan Kumar</p>
                            </div>
                            <div class="bg-gray-800 p-6 rounded-xl  shadow-lg">
                                <p>"Perfect design, will hire again!"</p>
                                <p class="mt-4 font-bold">- Anjali Sharma</p>
                            </div>
                        </div>
                    </section>

                    <section class="bg-blue-600 text-white py-16 text-center">
                        <h2 class="text-3xl font-bold mb-4">Ready to hire top artists?</h2>
                        <p class="mb-6">Join our marketplace today and connect with amazing talent!</p>
                        <a href="/signup" class="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100">Join Now</a>
                    </section>

                </div>
            }
        </Layout>
    )
}

export default Home
