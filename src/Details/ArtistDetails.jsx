import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import firebaseartist from "../firebase/firebaseartist-config";

const db = getFirestore(firebaseartist);

const ArtistDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [artist, setArtist] = useState(null);

    useEffect(() => {
        const fetchArtist = async () => {
            try {
                const docRef = doc(db, "artistData", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setArtist(docSnap.data());
                } else {
                    console.log("No such artist found!");
                }
            } catch (error) {
                console.error("Error fetching artist:", error);
            }
        };
        fetchArtist();
    }, [id]);

    if (!artist) {
        return (
            <div className="flex justify-center items-center h-screen text-lg font-semibold">
                Loading artist details...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0f172a] p-6 md:p-12">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 animate__animated animate__fadeIn">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row items-center gap-8">
                    {/* Artist Image */}
                    <img
                        src={artist.imageUrl || "/default-artist.jpg"}
                        alt={artist.name}
                        className="w-4/12 md:w-6/12 rounded-full object-cover shadow-lg border-4 border-gray-200"
                    />

                    {/* Artist Info */}
                    <div>
                        <h2 className="text-3xl font-bold mb-2">{artist.name}</h2>
                        <p className="text-gray-700 text-lg mb-1">
                            🎨 <span className="font-semibold">{artist.specility}</span>
                        </p>
                        <p className="text-gray-600 mb-3">
                            {artist.description || "No bio available."}
                        </p>

                        {/* Contact Info */}
                        <div className="text-gray-600 text-sm space-y-1">
                            <p>
                                📧 <span className="font-medium">Email:</span> {artist.email}
                            </p>
                            <p>
                                📞 <span className="font-medium">Phone:</span> {artist.phone}
                            </p>
                            <p>
                                📍 <span className="font-medium">Location:</span>{" "}
                                {artist.city}, {artist.state}, {artist.country} -{" "}
                                {artist.pincode}
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className="mt-6 flex gap-4">
                            <button
                                onClick={() => navigate("/")}
                                className="bg-gray-200 text-gray-800 px-5 py-2 rounded-full hover:bg-gray-300 transition-all"
                            >
                                ← Back to Home
                            </button>

                            <a
                                href={`https://wa.me/${artist.phone}?text=Hi ${artist.name}, I loved your art! ❤️`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700 transition-all"
                            >
                                Chat on WhatsApp
                            </a>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <hr className="my-8 border-gray-200" />

                {/* Description Section */}
                <div>
                    <h3 className="text-2xl font-semibold mb-3">About {artist.name}</h3>
                    <p className="text-gray-700 leading-relaxed">
                        {artist.description || "No detailed description available."}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ArtistDetails;
