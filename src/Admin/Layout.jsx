import React from 'react'
import { Link } from 'react-router-dom'
import logo from '/logo.png'
import profile from '/ganesh.jpg'
const Layout = () => {
    const menu = [
        {
            logo: <i className='ri-dashboard-line'></i>,
            herf: '/dashboard'
        },
        {
            logo: <i className='ri-bar-chart-box-ai-line'></i>,
            herf: '/artwork'
        },
        {
            logo: <i className='ri-user-3-line '></i>,
            herf: '/artist'
        },
        {
            logo: <i className='ri-shopping-cart-2-line'></i>,
            herf: '/orders'
        },
        {
            logo: <i className='ri-tools-line'></i>,
            herf: '/setting'
        },
        {
            logo: <i className='ri-logout-circle-line'></i>,
            herf: '/logout'
        },
    ]
    return (
        <div className='h-screen bg-gray-100'>
            <aside className='bg-cyan-600 h-full fixed top-0 left-0 '>
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
                </div>
            </aside>
            <section>
                <nav className='bg-white shadow-lg  ml-14'>
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
            </section>
        </div>
    )
}

export default Layout
