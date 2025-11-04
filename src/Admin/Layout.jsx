import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '/logo.png'
import profile from '/ganesh.jpg'
const Layout = ({ children }) => {
    const menu = [
        {
            name: 'Dashboard',
            logo: <i className='ri-dashboard-line'></i>,
            herf: '/admin/dashboard'
        },
        {
            name: 'Arts',
            logo: <i className='ri-bar-chart-box-ai-line'></i>,
            herf: '/admin/arts'
        },
        {
            name: 'Artist',
            logo: <i className='ri-user-3-line '></i>,
            herf: '/admin/adminartist'
        },
        {
            name: 'Orders',
            logo: <i className='ri-shopping-cart-2-line'></i>,
            herf: '/admin/orders'
        },
        {
            name: 'Setting',
            logo: <i className='ri-tools-line'></i>,
            herf: '/admin/setting'
        }

    ]
    const [sidebar, setSidebar] = useState(false)
    return (
        <>

            <div className='md:block hidden min-h-full  '>
                <aside className='bg-cyan-600 h-full fixed top-0 left-0   overflow-hidden'>
                    <div className='mt-4 px-2 flex flex-col gap-4'>
                        {
                            menu.map((item, id) => (
                                <Link to={item.herf} className='text-2xl text-white px-2 py-2 hover:bg-white hover:text-cyan-600 transition-all duration-200 rounded-lg cursor-pointer'>
                                    {
                                        item.logo
                                    }
                                </Link>
                            ))
                        }
                        <button className='text-2xl text-white px-2 py-2 hover:bg-white hover:text-cyan-600 transition-all duration-200 rounded-lg cursor-pointer'>
                            <i className='ri-logout-circle-line'></i>
                        </button>
                    </div>
                </aside>
                <section className='ml-14'>
                    <nav className='bg-white shadow-lg sticky top-0 left-0 z-10'>
                        <div className='flex items-center px-4  justify-between'>
                            <img src={logo} className='w-20' />
                            <div className='py-2 flex gap-2'>
                                <img src={profile} className='w-12 rounded-full object-center' />
                                <div className='flex flex-col text-left'>
                                    <p className='text-lg font-bold'>Ganesh Mishra</p>
                                    <span className='text-gray-500'>ganesh@gamil.com</span>
                                </div>
                            </div>
                        </div>
                    </nav>
                    {
                        children
                    }
                </section>
            </div>

            {/* mobile view */}

            <div className='md:hidden  h-screen  '>
                {
                    sidebar &&
                    <aside className='bg-cyan-600 h-full fixed top-0 left-0 z-20 overflow-hidden '>

                        <div className='mt-4 px-2 flex flex-col gap-4'>
                            {
                                menu.map((item, id) => (
                                    <Link to={item.herf} className='flex gap-2 text-lg text-white px-2 py-2 hover:bg-white hover:text-cyan-600 transition-all duration-200 rounded-lg cursor-pointer'>
                                        <span>{item.logo}</span>
                                        <h1>{item.name}</h1>
                                    </Link>
                                ))
                            }
                            <button className='text-lg text-white px-2 py-2 text-left hover:bg-white hover:text-cyan-600 transition-all duration-200 rounded-lg cursor-pointer'>
                                <i className='ri-logout-circle-line mr-2'></i>
                                Logout
                            </button>
                        </div>
                    </aside>
                }
                <section  >
                    <nav className='bg-white shadow-lg sticky top-0 left-0 z-10'>
                        <div className='flex items-center p-4 justify-between'>
                            <img src={logo} className='w-20' />
                            {
                                sidebar ?
                                    <button onClick={() => setSidebar(false)}>
                                        <i className='ri-close-line text-3xl'></i>
                                    </button> :
                                    <button onClick={() => setSidebar(true)}>
                                        <i className='ri-menu-line text-3xl'></i>
                                    </button>
                            }
                        </div>
                    </nav>
                    {
                        children
                    }
                </section>
            </div>
        </>
    )
}

export default Layout
