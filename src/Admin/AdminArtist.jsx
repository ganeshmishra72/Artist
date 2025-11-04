import React, { useState } from 'react'
import Layout from './Layout'
import { div } from 'framer-motion/client'

const AdminArtist = () => {
    const [display, setDisplay] = useState(false)
    return (
        <Layout>
            {
                <div className='h-screen p-6'>
                    <div className='flex justify-between items-center'>
                        <p className='text-xl  text-blue-500'>Artist</p>
                        <button onClick={() => setDisplay(true)} className='bg-blue-500 text-white rounded py-2 px-6 cursor-pointer '>
                            <i className='ri-add-line mr-2 text-xl'></i> Add Artist
                        </button>
                    </div>
                    {
                        display &&
                        <div className='bg-black/80 w-full min-h-full z-9999 absolute top-0 left-0 transition-all duration-300 flex justify-center items-center'>
                            <div className='bg-white rounded-md   border-1 w-10/12 md:w-5/12 py-5 px-6 relative animate__animated animate__zoomIn animate_faster  '>
                                <div>
                                    <button className='absolute top-3 right-3' onClick={() => setDisplay(false)} >
                                        <i className='ri-close-line text-lg'></i>
                                    </button>
                                    <h1 className='text-xl font-semibold'>Add a Artist</h1>
                                </div>

                                <form className='mt-5 grid grid-cols-1 md:grid-cols-2 gap-6'  >
                                    <div className="col-span-1 md:col-span-2 w-20 mx-auto relative">
                                        <img
                                            src={'/ganesh.jpg'}
                                            alt=""
                                            className="w-18 rounded-full"
                                        />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="absolute top-6 opacity-0 w-full"
                                            // onChange={}
                                            required
                                        />
                                    </div>
                                    <input type="text" name="title" placeholder='Enter Name of Artist' required className='bg-white rounded p-3 border border-slate-400 col-span-2 md:col-span-1 ' />
                                    <input type="email" name="email" placeholder='Enter Email of Artist' required className='bg-white rounded p-3 border border-slate-400 col-span-2 md:col-span-1' />
                                    <input type="number" name="phone" placeholder='8600327769' required className='bg-white rounded p-3 border border-slate-400 col-span-2 md:col-span-1' />
                                    <input type="text" name="country" placeholder='India' required className='bg-white rounded p-3 border border-slate-400 col-span-2 md:col-span-1' />
                                    <input type="text" name="state" placeholder='Maharashtra' required className='bg-white rounded p-3 border border-slate-400 col-span-2 md:col-span-1 ' />
                                    <input type="text" name="city" placeholder='Kopargaon' required className='bg-white rounded p-3 border border-slate-400 col-span-2 md:col-span-1' />
                                    <textarea name="description" className='bg-white rounded p-3 border border-slate-400 col-span-2 ' placeholder='Description' rows={5} ></textarea>
                                    {

                                        // <button className='bg-green-600 py-2 px-4 rounded text-white font-semibold w-fit '>
                                        //     Update Product
                                        // </button> 
                                        <button className='bg-indigo-600 py-2 px-4 rounded text-white font-semibold w-fit  '>
                                            Add Artist
                                        </button>
                                    }

                                </form>
                            </div>
                        </div>
                    }
                </div>
            }
        </Layout>
    )
}

export default AdminArtist
