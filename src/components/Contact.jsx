import React from 'react'
import Layout from './Layout'
import { Link } from 'react-router-dom'
const Contact = () => {
    return (
        <Layout>
            {
                <div className='md:p-16 p-8 md:w-11/12 mx-auto '>
                    <p className="text-gray-400 text-sm mb-2">
                        <Link to={'/'}>
                            Home /
                        </Link> <span className="text-indigo-500">Contact</span>
                    </p>
                    <div>
                        <div className='text-center'>
                            <h1 className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-500 text-4xl leading-tight font-bold  mt-5'>Let's Connect <span >Creatively!</span></h1>
                            <p className='max-w-xl text-center mx-auto text-gray-400'>Have a project in mind, collaboration idea,or just want to say hi?</p>
                        </div>
                        <div className='grid md:grid-cols-2 grid-cols-1 gap-8 mt-8 '>
                            <div className=' rounded-lg shadow-lg  shadow-purple-600 py-4 px-6  hover:shadow-[0_0_15px_#6366F1]'>
                                <p className='text-center text-purple-600 text-xl'>Send a Message</p >
                                <form className='flex flex-col gap-4 mt-5'>
                                    <div>
                                        <input type="text" name='cname ' placeholder='Enter your name' className='bg-transparent border text-white border-slate-500 p-4 rounded-lg shadow w-full focus:outline-0' />
                                    </div>
                                    <div>
                                        <input type="email" name='cemail ' placeholder='Enter your email' className='bg-transparent border text-white border-slate-500 p-4 rounded-lg shadow w-full focus:outline-0' />
                                    </div>
                                    <div>
                                        <textarea name='cmessage ' placeholder='Message' className='bg-transparent border text-white border-slate-500 p-4 rounded-lg shadow w-full focus:outline-0' rows={3} />
                                    </div>
                                    <button className='bg-blue-500 rounded-lg py-2 w-full text-white font-semibold hover:bg-blue-700 cursor-pointer'>Send Message</button>
                                </form>
                            </div>

                            <div className=' rounded-lg shadow-lg  shadow-purple-600 py-4 px-6 hover:shadow-[0_0_15px_#6366F1]'>
                                <p className='text-center text-white text-xl'>Contact Information</p >
                                <div className='mt-8'>
                                    <p className='text-white text-lg'><i className='ri-mail-line mr-2'></i>: <span className='text-base text-gray-400 hover:text-blue-500'>hello@artistplace.com</span></p>
                                    <p className='text-white text-lg'><i className='ri-phone-line mr-2'></i>: <span className='text-base text-gray-400 hover:text-blue-500'>(+91) 8600327769</span></p>
                                    <p className='text-white text-lg'><i className='ri-map-pin-line mr-2'></i>: <span className='text-base text-gray-400 hover:text-blue-500'>Mumbai,India</span></p>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            }
        </Layout>
    )
}

export default Contact
