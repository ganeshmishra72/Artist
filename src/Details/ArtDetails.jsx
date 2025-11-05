import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import firebaseartist from '../firebase/firebaseartist-config'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import swal from 'sweetalert'

const db = getFirestore(firebaseartist)

const ArtDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [art, setArt] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchArt = async () => {
            const ref = doc(db, 'artsData', id)
            const snapshot = await getDoc(ref)
            if (snapshot.exists()) {
                setArt(snapshot.data())
            }
            setLoading(false)
        }
        fetchArt()
    }, [id])

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen text-white text-2xl">
                Loading...
            </div>
        )
    }

    if (!art) {
        return (
            <div className="flex justify-center items-center h-screen text-red-500 text-2xl">
                Art not found!
            </div>
        )
    }

    const handleBuy = () => {
        const basePrice = Number(art.price);
        const serviceFee = basePrice * 0.05;
        const gst = basePrice * 0.18;
        const total = (basePrice + serviceFee + gst).toFixed(2);
        const phoneNumber = "918767304913";

        const message = `
🧾 *Art Purchase Bill*
----------------------------
🎨 *Art Title:* ${art.title}
📂 *Category:* ${art.category}
💰 *Base Price:* ₹${basePrice.toFixed(2)}
⚙️ *Service Fee (5%):* ₹${serviceFee.toFixed(2)}
🧾 *GST (18%):* ₹${gst.toFixed(2)}
----------------------------
💵 *Total Amount:* ₹${total}
----------------------------
Thank you for purchasing! 🙌
  `;

        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
        swal({
            title: "Purchase Successful!",
            text: `You’ve successfully purchased "${art.title}" for ₹${total}) +
                Number(art.price) * 0.05 +
                Number(art.price) * 0.18}.`,
            icon: "success",
            button: "OK",
        })
    }

    return (
        <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center py-12 px-6 md:px-24">
            {/* Back Button */}
            <button
                onClick={() => navigate('/')}
                className="self-start mb-6 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-all duration-300"
            >
                ← Back to Home
            </button>

            {/* Main Card */}
            <div className="grid md:grid-cols-2 gap-10 bg-gray-800 p-6 rounded-2xl shadow-xl w-full max-w-6xl">
                {/* Image Section */}
                <div>
                    <img
                        src={art.imageUrl}
                        alt={art.title}
                        className="w-full h-[400px] object-cover rounded-xl shadow-lg hover:scale-105 transition-all duration-300"
                    />
                </div>

                {/* Info Section */}
                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className="text-4xl font-bold mb-4">{art.title}</h1>
                        <p className="text-gray-400 uppercase tracking-wide mb-2">{art.category}</p>
                        <p className="text-2xl text-indigo-400 font-semibold mb-6">₹{art.price}</p>

                        <h2 className="text-xl font-semibold mb-2">Description:</h2>
                        <p className="text-gray-300 mb-6">
                            {art.description || 'No description provided.'}
                        </p>
                    </div>

                    {/* Bill Summary */}
                    <div className="bg-gray-900 p-4 rounded-lg mb-4">
                        <h3 className="text-lg font-semibold mb-2 text-indigo-400">🧾 Bill Summary</h3>
                        <div className="flex justify-between text-gray-300 mb-1">
                            <span>Art Price</span>
                            <span>₹{art.price}</span>
                        </div>
                        <div className="flex justify-between text-gray-300 mb-1">
                            <span>Service Fee</span>
                            <span>₹{(art.price * 0.05).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-300 mb-3">
                            <span>GST (18%)</span>
                            <span>₹{(art.price * 0.18).toFixed(2)}</span>
                        </div>
                        <div className="border-t border-gray-600 mt-2 pt-2 flex justify-between text-white font-bold text-lg">
                            <span>Total</span>
                            <span>
                                ₹
                                {(
                                    Number(art.price) +
                                    Number(art.price) * 0.05 +
                                    Number(art.price) * 0.18
                                ).toFixed(2)}
                            </span>
                            {/* <span>1500</span> */}
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-4">
                        <button
                            onClick={handleBuy}
                            className="bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-800 transition-all duration-300 w-full"
                        >
                            Buy Now
                        </button>
                        <button
                            onClick={() => navigate('/')}
                            className="bg-gray-600 text-white font-semibold py-3 rounded-lg hover:bg-gray-700 transition-all duration-300 w-full"
                        >
                            Back to Home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArtDetails
