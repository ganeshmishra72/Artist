import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import { Link, useNavigate } from 'react-router-dom'
import firebaseartist from '../firebase/firebaseartist-config'
import { getFirestore, getDocs, collection } from 'firebase/firestore'

const db = getFirestore(firebaseartist)
const Artist = () => {
    const navigate = useNavigate()
    const [artist, setArtist] = useState([])

    useEffect(() => {
        const req = async () => {
            const getData = await getDocs(collection(db, 'artistData'))
            let temp = []
            getData.forEach((docs) => {
                const documnet = docs.data()
                documnet.id = docs.id
                temp.push(documnet)
            })
            setArtist(temp)
        }
        req()
    }, [])
    return (
        <Layout>
            {
                <div className='md:p-16 p-8 md:w-11/12 mx-auto '>
                    <p className="text-gray-400 text-sm mb-2">
                        <Link to={'/'}>
                            Home /
                        </Link> <span className="text-indigo-500">Artist</span>
                    </p>
                    <div className='flex flex-col gap-4 '>
                        <h1 className='text-white text-3xl leading-tight font-bold text-center mt-5'>Meet The Artist Behind The <span className='text-purple-600'>Magic!</span></h1>
                        <div className='grid md:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-8 mt-8'>
                            {
                                artist.map((item, idx) => (
                                    <div key={idx} className='bg-gray-700/25  flex flex-col gap-4 shadow-lg rounded-3xl relative'>
                                        <div className='w-full h-[300px] full flex justify-center items-center p-4'>
                                            <img src={item.imageUrl} alt="" className='w-full rounded-full ' />
                                        </div>
                                        <div className='px-4 space-y-3 pb-4'>
                                            <p className='text-lg text-white font-semibold'>{item.name}</p>
                                            <p className='text-base text-gray-400'>  {item.description && item.description.length > 60
                                                ? item.description.slice(0, 60) + "..."
                                                : item.description}</p>

                                        </div>
                                        <div className='absolute inset-0 bg-black/80 opacity-0 flex justify-center gap-4 items-end pb-4 hover:opacity-100 transition-all duration-300 rounded-3xl'>
                                            <button onClick={() => navigate(`/artist/${item.id}`)} className='bg-indigo-600 hover:bg-indigo-700 py-2 px-6 text-white rounded-lg cursor-pointer'>View Profile</button>

                                        </div>
                                    </div>
                                ))


                            }
                        </div>
                    </div>
                </div>
            }
        </Layout>
    )
}

export default Artist
