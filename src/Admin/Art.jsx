import React, { useState } from 'react'
import Layout from './Layout'
import { div } from 'framer-motion/client'

const Art = () => {
    const [display, setDisplay] = useState(false)
    return (
        <Layout>
            {
                <div className='h-screen p-6'>
                    <div className='flex justify-between items-center'>
                        <p className='text-xl  text-blue-500'>Artswork</p>
                        <button onClick={() => setDisplay(true)} className='bg-blue-500 text-white rounded py-2 px-6 cursor-pointer '>
                            <i className='ri-add-line mr-2 text-xl'></i> Add Arts
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
                                    <h1 className='text-xl font-semibold'>Add a Arts</h1>
                                </div>

                                <form className='mt-5 grid grid-cols-1 md:grid-cols-2 gap-6'  >

                                    <input type="text" name="title" placeholder='Enter Arts title' required className='bg-white rounded p-3 border border-slate-400 col-span-2' />
                                    <input type="number" name="price" placeholder='Enter Price' required className='bg-white rounded p-3 border border-slate-400 col-span-2 md:col-span-1' />
                                    <input type="number" name="discount" placeholder='Enter Discount' required className='bg-white rounded p-3 border border-slate-400 col-span-2 md:col-span-1' />
                                    <textarea name="description" className='bg-white rounded p-3 border border-slate-400 col-span-2' placeholder='Description' rows={5} ></textarea>

                                    {

                                        // <button className='bg-green-600 py-2 px-4 rounded text-white font-semibold w-fit '>
                                        //     Update Product
                                        // </button> 
                                        <button className='bg-indigo-600 py-2 px-4 rounded text-white font-semibold w-fit '>
                                            Add Arts
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

export default Art
