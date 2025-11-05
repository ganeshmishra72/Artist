import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import { motion } from 'framer-motion'
import firebaseartist from '../firebase/firebaseartist-config'
import { getFirestore, getDocs, collection } from 'firebase/firestore'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

const data = [
    { name: 'Jan', sales: 4000, revenue: 2400 },
    { name: 'Feb', sales: 3000, revenue: 1398 },
    { name: 'Mar', sales: 2000, revenue: 9800 },
    { name: 'Apr', sales: 2780, revenue: 3908 },
    { name: 'May', sales: 1890, revenue: 4800 },
    { name: 'Jun', sales: 2390, revenue: 3800 },
    { name: 'Jul', sales: 3490, revenue: 4300 },
]

const db = getFirestore(firebaseartist)
const Dashboard = () => {
    const [artsCount, setArtsCount] = useState(0)
    const [arttistCount, setArtistCount] = useState(0)
    const [ordersCount, setOrdersCount] = useState(0)
    const [totalEarning, setTotalEarnings] = useState(0)

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                // Count arts
                const artsSnapshot = await getDocs(collection(db, 'artsData'));
                setArtsCount(artsSnapshot.size);

                const artistSnapshot = await getDocs(collection(db, 'artistData'));
                setArtistCount(artistSnapshot.size);

                // Count orders
                const ordersSnapshot = await getDocs(collection(db, 'orders'));
                setOrdersCount(ordersSnapshot.size);

                let total = 0;
                ordersSnapshot.forEach((doc) => {
                    const data = doc.data();
                    if (data.price) {
                        total += parseInt(data.price); // convert "1200" (string) → 1200 (number)
                    }
                });
                setTotalEarnings(total);



            }
            catch (error) {
                console.error("Error fetching counts:", error);
            }
        }
        fetchCounts();
    }, [])






    return (
        <Layout>
            <div className="p-6 min-h-screen bg-gray-50">
                {/* Page Header */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-6"
                >
                    <h1 className="text-3xl font-semibold text-gray-800">Dashboard Overview</h1>
                    <p className="text-gray-500 mt-1">Summary of your marketplace activity</p>
                </motion.div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[
                        { title: 'Total Artworks', value: artsCount, color: 'bg-blue-500' },
                        { title: 'Artists', value: arttistCount, color: 'bg-green-500' },
                        { title: 'Earnings', value: "₹" + totalEarning, color: 'bg-indigo-500' },
                        { title: 'Orders', value: ordersCount, color: 'bg-pink-500' },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * i }}
                            className="rounded-2xl shadow-sm bg-white p-5 border border-gray-100 flex flex-col gap-2"
                        >
                            <div className="flex items-center justify-between">
                                <h2 className="text-gray-500 font-medium">{item.title}</h2>
                                <span className={`${item.color} w-3 h-3 rounded-full`}></span>
                            </div>
                            <p className="text-2xl font-semibold text-gray-800">{item.value}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Chart Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    className="bg-white shadow-sm rounded-2xl p-6 border border-gray-100"
                >
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Sales & Revenue</h2>
                    <div className="w-full h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="sales" fill="#3b82f6" />
                                <Bar dataKey="revenue" fill="#10b981" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </div>
        </Layout>
    )
}

export default Dashboard
