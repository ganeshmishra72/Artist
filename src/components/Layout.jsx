import React, { useEffect, useState } from 'react'
import logo from '/logo.png'
import profile from '/avatr.svg'
import firebaseartist from '../firebase/firebaseartist-config'
import { Link } from 'react-router-dom'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
const auth = getAuth(firebaseartist)
const Layout = ({ children }) => {
    const [session, setSession] = useState(null)
    const [isLogin, setIslogin] = useState(false)
    const [isDailog, setIsDailog] = useState(false)
    const [isSlid, setIsslide] = useState(0)
    const menu = [
        {
            title: 'Home',
            icon: <i class="ri-home-9-line mr-2"></i>,
            href: '/'
        },
        {
            title: 'Explore',
            icon: <i className="ri-draft-line mr-2"></i>,
            href: '/explore'
        },
        {
            title: 'Artist',
            icon: <i className="ri-information-2-line mr-2"></i>,
            href: '/artist'
        },
        {
            title: 'Contact',
            icon: <i className="ri-contacts-book-line mr-2"></i>,
            href: '/contact'
        }
    ]
    const social = [
        {

            icon: <i className="ri-facebook-line"></i>,
            href: '/'
        },
        {

            icon: <i className="ri-instagram-line"></i>,
            href: '/explore'
        },
        {

            icon: <i className="ri-youtube-line"></i>,
            href: '/artist'
        },
        {

            icon: <i className="ri-snapchat-line"></i>,
            href: '/contact'
        }
    ]
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
    return (
        <>
            <div className='md:block hidden bg-gradient-to-r from-[#111827] to-[#1E293B] min-h-screen'>
                <nav className='bg-gray-700/25 px-8 py-0.5 backdrop-blur-2xl flex justify-between items-center shadow-lg sticky top-0 right-0 z-50'>

                    <img src={logo} alt="" className='w-25' />
                    <div className='flex items-center gap-4'>
                        {
                            menu.map((item, id) => (

                                <Link key={id} to={item.href} className='text-white py-4 px-6 hover:bg-cyan-400 hover:text-black transition-all duration-300 cursor-pointer rounded'>
                                    {item.title}
                                </Link>
                            ))
                        }
                        {
                            session &&
                            <div className='relative'>
                                <button onClick={() => setIsDailog(!isDailog)}>
                                    <img src={profile} alt="" className='w-12  border border-cyan-600 rounded-full' />
                                </button>
                                {
                                    isDailog &&
                                    <div className='border border-slate-500 bg-slate-800 rounded-lg shadow py-6 px-4  absolute right-3 top-15 animate__animated animate__zoomIn text-center text-white '>
                                        <p className='text-xl capitalize'>{session.displayname ? session.displayname : "Admin"}</p>
                                        <p>{session.email}</p>
                                        <button onClick={() => signOut(auth)}>
                                            <i className='ri-logout-circle-line mr-2'></i>
                                            Logout
                                        </button>
                                    </div>
                                }
                            </div>
                        }
                        {
                            !session &&
                            <div className='space-x-4'>
                                <Link to={'/login'} className='bg-indigo-600 py-4 px-6 text-white rounded  cursor-pointer font-semibold   hover:bg-indigo-700'>

                                    Login

                                </Link>

                                <Link to={'/signup'} className='bg-rose-600 hover:bg-rose-700 py-4 px-6 text-white rounded   font-semibold  cursor-pointer  '>
                                    Singup
                                </Link>

                            </div>
                        }
                    </div>
                </nav>

                <section>
                    {
                        children
                    }
                </section>

                <footer className='bg-gray-700/25 p-16 shadow-lg mt-8 grid grid-cols-3 gap-4'>
                    <div className='flex flex-col text-left gap-2'>
                        <img src={logo} alt="" className='w-50' />
                        <p className='text-gray-500 text-xl font-semibold'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit voluptas voluptates tempore corporis! Laboriosam, blanditiis voluptas error corporis non debitis!</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <h1 className='text-xl font-semibold text-white'>Quick Link</h1>
                        <ul className='flex flex-col gap-6 mt-5'>
                            {
                                menu.map((item, id) => (
                                    <Link to={item.href} className='text-gray-500'>
                                        {item.title}
                                    </Link>
                                ))
                            }

                        </ul>
                    </div>
                    <div className='flex flex-col items-center'>
                        <h1 className='text-xl font-semibold text-white'>Follow Us</h1>
                        <ul className='flex flex-col gap-6 mt-5'>
                            {
                                social.map((item, id) => (
                                    <Link to={item.href} className='text-gray-500   text-xl font-bold'>
                                        {item.icon}
                                        {item.title}
                                    </Link>
                                ))
                            }

                        </ul>
                    </div>
                    <hr className='text-white col-span-3' />
                    <p className='text-white text-center col-span-3'>
                        Copywrite
                        <i className="ri-copyright-line mr-2"></i>
                        All Right Reseverd 2025
                    </p>
                </footer>
            </div>

            <div className='md:hidden bg-gradient-to-r from-[#111827] to-[#1E293B] min-h-screen'>
                <nav className='bg-gray-700/25 md:px-8 md:py-0.5 p-4 backdrop-blur-2xl flex justify-between items-center shadow-lg sticky top-0 right-0 z-[9999]'>
                    <img src={logo} alt="" className='w-25' />
                    {
                        isSlid ?
                            <button onClick={() => setIsslide(0)}>

                                <i className='ri-close-line   text-white text-3xl'></i>
                            </button> :
                            <button onClick={() => setIsslide(250)}>
                                <i class="ri-menu-fold-3-line text-white text-3xl"></i>
                            </button>
                    }

                </nav>
                <aside className='bg-gray-900 shadow-lg fixed top-0 left-0 z-10 h-full flex flex-col transition-all duration-200 overflow-hidden' style={{ width: isSlid }}>

                    <div className='flex flex-col mt-8'>
                        {
                            menu.map((item, id) => (

                                <Link key={id} to={item.href} className='text-white py-4 px-6 hover:bg-cyan-400 hover:text-black transition-all duration-300 cursor-pointer rounded'>
                                    {item.icon}
                                    {item.title}
                                </Link>
                            ))
                        }
                        {
                            session &&
                            <div className='relative py-4 px-6' >
                                <button onClick={() => setIsDailog(!isDailog)}>
                                    <img src={profile} alt="" className='w-12  border border-cyan-600 rounded-full' />
                                </button>
                                {
                                    isDailog &&
                                    <div className='border border-slate-500 rounded-lg shadow py-6 px-2  absolute right-3 top-18 animate__animated animate__zoomIn text-center text-white w-[220px]' >
                                        <p className='text-xl capitalize'>{session.displayname ? session.displayname : "Admin"}</p>
                                        <p>{session.email}</p>
                                        <button onClick={() => signOut(auth)}>
                                            <i className='ri-logout-circle-line mr-2'></i>
                                            Logout
                                        </button>
                                    </div>
                                }
                            </div>
                        }
                        {
                            !session &&
                            <div className='flex flex-col'>
                                <Link to={'/login'} className='text-white py-4 px-6 hover:bg-cyan-400 hover:text-black transition-all duration-300 cursor-pointer rounded'>
                                    <i className="ri-login-circle-line mr-2"></i>
                                    Login
                                </Link>

                                <Link to={'/signup'} className='text-white py-4 px-6 hover:bg-cyan-400 hover:text-black transition-all duration-300 cursor-pointer rounded'>
                                    <i className="ri-admin-line mr-2"></i>
                                    Singup
                                </Link>

                            </div>
                        }
                    </div>
                </aside>

                <section>
                    {
                        children
                    }
                </section>

                <footer className='bg-gray-700/25 p-8 shadow-lg mt-8 grid grid-cols-1 gap-4'>
                    <div className='flex flex-col text-left gap-2 items-center'>
                        <img src={logo} alt="" className='w-30' />
                        <p className='text-gray-500  font-semibold'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit voluptas voluptates tempore corporis! Laboriosam, blanditiis voluptas error corporis non debitis!</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <h1 className='text-xl font-semibold text-white'>Quick Link</h1>
                        <ul className='flex flex-col gap-6 mt-5'>
                            {
                                menu.map((item, id) => (
                                    <Link to={item.href} className='text-gray-500'>
                                        {item.title}
                                    </Link>
                                ))
                            }

                        </ul>
                    </div>
                    <div className='flex flex-col items-center'>
                        <h1 className='text-xl font-semibold text-white'>Follow Us</h1>
                        <ul className='flex flex-col gap-6 mt-5'>
                            {
                                social.map((item, id) => (
                                    <Link to={item.href} className='text-gray-500   text-xl font-bold'>
                                        {item.icon}
                                        {item.title}
                                    </Link>
                                ))
                            }

                        </ul>
                    </div>
                    <hr className='text-white' />
                    <p className='text-white text-center'>
                        Copywrite
                        <i className="ri-copyright-line mr-2"></i>
                        All Right Reseverd 2025
                    </p>
                </footer>
            </div>
        </>
    )
}

export default Layout
