import React from 'react'
import Layout from './Layout'

const Orders = () => {
    const orders = [
        {
            id: "ORD001",
            name: "John Doe",
            email: "john@example.com",
            address: "123 Street, New York",
            product: "Wireless Headphones",
            price: "$120",
            time: "2025-11-04 10:30 AM",
            status: "Delivered",
        },
        {
            id: "ORD002",
            name: "Alice Smith",
            email: "alice@example.com",
            address: "456 Avenue, London",
            product: "Smart Watch",
            price: "$180",
            time: "2025-11-04 12:00 PM",
            status: "Pending",
        },
        {
            id: "ORD003",
            name: "Michael Lee",
            email: "michael@example.com",
            address: "789 Park Road, Sydney",
            product: "Bluetooth Speaker",
            price: "$95",
            time: "2025-11-03 9:45 PM",
            status: "Shipped",
        },
    ];

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
                                    <span className="text-gray-600">{order.name}</span>
                                </div>
                                <div className="mb-2">
                                    <span className="font-semibold text-gray-700">Email:</span>{" "}
                                    <span className="text-gray-600">{order.email}</span>
                                </div>
                                <div className="mb-2">
                                    <span className="font-semibold text-gray-700">Address:</span>{" "}
                                    <span className="text-gray-600">{order.address}</span>
                                </div>
                                <div className="mb-2">
                                    <span className="font-semibold text-gray-700">Product:</span>{" "}
                                    <span className="text-gray-600">{order.product}</span>
                                </div>
                                <div className="mb-2">
                                    <span className="font-semibold text-gray-700">Price:</span>{" "}
                                    <span className="text-green-600 font-semibold">
                                        {order.price}
                                    </span>
                                </div>
                                <div className="mb-2">
                                    <span className="font-semibold text-gray-700">Time:</span>{" "}
                                    <span className="text-gray-600">{order.time}</span>
                                </div>

                                <div
                                    className={`mt-4 text-center py-2 px-3 rounded-xl font-semibold text-sm ${order.status === "Delivered"
                                            ? "bg-green-100 text-green-700"
                                            : order.status === "Pending"
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
