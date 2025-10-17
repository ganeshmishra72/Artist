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

                    </div>
                </div>
            }
        </Layout>
    )
}

export default Contact
