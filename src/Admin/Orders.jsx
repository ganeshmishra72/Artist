import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import firebaseartist from '../firebase/firebaseartist-config'
import { getFirestore, collection, getDocs, addDoc, query, where, doc, deleteDoc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth';
import moment from 'moment'


const db = getFirestore(firebaseartist)
const auth = getAuth(firebaseartist)
const Orders = () => {
    const [orders, setOrder] = useState([])

    useEffect(() => {
        const req = async () => {
            const data = await getDocs(collection(db, 'orders'))
            let temp = []
            data.forEach((docs) => {
                temp.push({ id: docs.id, ...docs.data() });

            })
            setOrder(temp)
        }
        req()
    }, [])

    console.log(orders);

    return (
        <Layout>
            {
                <div className="min-h-screen bg-gray-50 px-6 py-10">
                    <h2 className="text-3xl font-semibold text-center mb-10 text-gray-800">
                        📦 Customer Orders
                    </h2>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {orders.map((order, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1 p-6"
                            >
                                <div className="mb-2">
                                    <span className="font-semibold text-gray-700">Order ID:</span>{" "}
                                    <span className="text-gray-600">{order.id}</span>
                                </div>
                                <div className="mb-2">
                                    <span className="font-semibold text-gray-700">Customer:</span>{" "}
                                    <span className="text-gray-600">{order.customerName}</span>
                                </div>
                                <div className="mb-2">
                                    <span className="font-semibold text-gray-700">Email:</span>{" "}
                                    <span className="text-gray-600">{order.email}</span>
                                </div>
                                <div className="mb-2">
                                    <span className="font-semibold text-gray-700">Address:</span>{" "}
                                    <span className="text-gray-600">
                                        {order.address.address},{order.address.city},{order.address.state},{order.address.country},{order.address.pincode},MOB-{order.address.mobile}
                                    </span>
                                </div>

                                <div className="mb-2">
                                    <span className="font-semibold text-gray-700">Product:</span>{" "}
                                    <span className="text-gray-600">{order.cartId}</span>
                                </div>
                                <div className="mb-2">
                                    <span className="font-semibold text-gray-700">Price:</span>{" "}
                                    <span className="text-green-600 font-semibold">
                                        {order.price}
                                    </span>
                                </div>
                                <div className="mb-2">
                                    <span className="font-semibold text-gray-700">Time:</span>{" "}
                                    <span className="text-gray-600">{moment(order.createdAt.toDate()).format('DD MMM YYYY, hh:mm:ss A')}</span>
                                </div>

                                <div
                                    className={`mt-4 text-center py-2 px-3 rounded-xl font-semibold text-sm ${order.status === "Delivered"
                                        ? "bg-green-100 text-green-700"
                                        : order.status === "pending"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : "bg-blue-100 text-blue-700"
                                        }`}
                                >
                                    {order.status}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </Layout>
    )
}

export default Orders
