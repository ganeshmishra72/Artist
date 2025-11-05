import React, { useState } from 'react'
import Layout from './Layout'
import { Link } from 'react-router-dom'
import firebaseartist from '../firebase/firebaseartist-config'
import { getFirestore, addDoc, collection, serverTimestamp } from 'firebase/firestore'

const db = getFirestore(firebaseartist)
const Contact = () => {
    const [formData, setFormData] = useState({
        cname: '',
        cemail: '',
        cmessage: '',
    })

    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState(null)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setAlert(null)

        try {
            await addDoc(collection(db, 'contacts'), {
                name: formData.cname,
                email: formData.cemail,
                message: formData.cmessage,
                createdAt: serverTimestamp(),
            })
            setAlert({ type: 'success', msg: 'Message sent successfully!' })
            setFormData({ cname: '', cemail: '', cmessage: '' })
        } catch (error) {
            console.error('Error saving contact message:', error)
            setAlert({ type: 'error', msg: 'Failed to send message. Try again!' })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Layout>
            <div className="md:p-16 p-8 md:w-11/12 mx-auto">
                <p className="text-gray-400 text-sm mb-2">
                    <Link to="/">Home /</Link>{' '}
                    <span className="text-indigo-500">Contact</span>
                </p>

                <div>
                    <div className="text-center">
                        <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-500 text-4xl leading-tight font-bold mt-5">
                            Let's Connect <span>Creatively!</span>
                        </h1>
                        <p className="max-w-xl text-center mx-auto text-gray-400">
                            Have a project in mind, collaboration idea, or just want to say hi?
                        </p>
                    </div>

                    {/* ✅ Responsive 2-column layout */}
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-8 mt-8">
                        {/* LEFT SIDE — Contact Form */}
                        <div className="rounded-lg shadow-lg shadow-purple-600 py-6 px-6 hover:shadow-[0_0_15px_#6366F1] transition">
                            <p className="text-center text-purple-600 text-xl font-semibold">Send a Message</p>

                            {alert && (
                                <div
                                    className={`mt-4 text-center p-2 rounded ${alert.type === 'success'
                                            ? 'bg-green-600 text-white'
                                            : 'bg-rose-600 text-white'
                                        }`}
                                >
                                    {alert.msg}
                                </div>
                            )}

                            <form className="flex flex-col gap-4 mt-5" onSubmit={handleSubmit}>
                                <div>
                                    <input
                                        type="text"
                                        name="cname"
                                        value={formData.cname}
                                        onChange={handleChange}
                                        placeholder="Enter your name"
                                        className="bg-transparent border text-white border-slate-500 p-4 rounded-lg shadow w-full focus:outline-0"
                                        required
                                    />
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        name="cemail"
                                        value={formData.cemail}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        className="bg-transparent border text-white border-slate-500 p-4 rounded-lg shadow w-full focus:outline-0"
                                        required
                                    />
                                </div>
                                <div>
                                    <textarea
                                        name="cmessage"
                                        value={formData.cmessage}
                                        onChange={handleChange}
                                        placeholder="Message"
                                        className="bg-transparent border text-white border-slate-500 p-4 rounded-lg shadow w-full focus:outline-0"
                                        rows={4}
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-blue-500 rounded-lg py-2 w-full text-white font-semibold hover:bg-blue-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </div>

                        {/* RIGHT SIDE — Contact Information */}
                        <div className="rounded-lg shadow-lg shadow-purple-600 py-6 px-6 hover:shadow-[0_0_15px_#6366F1] transition">
                            <p className="text-center text-white text-xl font-semibold">
                                Contact Information
                            </p>

                            <div className="mt-8 flex flex-col gap-4">
                                <p className="text-white text-lg flex items-center gap-2">
                                    <i className="ri-mail-line text-indigo-400"></i>
                                    <a
                                        href="mailto:hello@artistplace.com"
                                        className="text-base text-gray-400 hover:text-blue-500"
                                    >
                                        hello@artistplace.com
                                    </a>
                                </p>

                                <p className="text-white text-lg flex items-center gap-2">
                                    <i className="ri-phone-line text-indigo-400"></i>
                                    <a
                                        href="tel:+918600327769"
                                        className="text-base text-gray-400 hover:text-blue-500"
                                    >
                                        (+91) 8600327769
                                    </a>
                                </p>

                                <p className="text-white text-lg flex items-center gap-2">
                                    <i className="ri-map-pin-line text-indigo-400"></i>
                                    <span className="text-base text-gray-400 hover:text-blue-500">
                                        Mumbai, India
                                    </span>
                                </p>

                                <div className="flex gap-4 justify-center md:justify-start mt-4">
                                    <a href="#" className="text-indigo-400 hover:text-white text-2xl">
                                        <i className="ri-facebook-circle-fill"></i>
                                    </a>
                                    <a href="#" className="text-indigo-400 hover:text-white text-2xl">
                                        <i className="ri-instagram-fill"></i>
                                    </a>
                                    <a href="#" className="text-indigo-400 hover:text-white text-2xl">
                                        <i className="ri-twitter-x-fill"></i>
                                    </a>
                                    <a href="#" className="text-indigo-400 hover:text-white text-2xl">
                                        <i className="ri-linkedin-box-fill"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Contact
