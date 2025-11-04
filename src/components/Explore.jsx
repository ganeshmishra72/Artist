// ExploreArtworks.jsx
import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import firebaseartist from '../firebase/firebaseartist-config'
import { getFirestore, getDocs, collection } from 'firebase/firestore'

const db = getFirestore(firebaseartist)


const Explore = () => {
    const [search, setSearch] = useState('');
    const [artworksData, setartworksData] = useState([])
    const [category, setCategory] = useState('All');
    const [sort, setSort] = useState('Newest');

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.15 },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.9, y: 30 },
        show: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
        },
    };
    const filteredArtworks = artworksData
        .filter(art =>
            art.title.toLowerCase().includes(search.toLowerCase()) &&
            (category === 'All' || art.category === category)
        )
        .sort((a, b) => {
            if (sort === 'Price: Low to High') return parseInt(a.price) - parseInt(b.price);
            if (sort === 'Price: High to Low') return parseInt(b.price) - parseInt(a.price);
            return b.id - a.id; // Newest first
        });

    const addFavorite = (e) => {
        new swal({
            icon: 'success',
            title: "Added To Favorite"
        })
    }


    useEffect(() => {
        const req = async () => {
            const getData = await getDocs(collection(db, 'artsData'))
            let temp = []
            getData.forEach((docs) => {
                const documnet = docs.data()
                documnet.id = docs.id
                temp.push(documnet)
            })
            setartworksData(temp)
        }
        req()
    }, [])
    return (
        <Layout>
            {
                <div className="md:p-16 p-8 md:w-11/12 mx-auto ">
                    <p className="text-gray-400 text-sm mb-2">
                        <Link to={'/'}>
                            Home /
                        </Link> <span className="text-indigo-500">Explore Artworks</span>
                    </p>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                        <h1 className="text-3xl font-bold text-white mb-4 md:mb-0">Explore <span className='text-indigo-600'>Artworks</span> </h1>
                        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                            <input
                                type="text"
                                placeholder="Search artworks..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="px-4 py-2 border text-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full sm:w-auto"
                            />
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="px-4 py-2 border text-white  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            >
                                <option className='bg-black'>All</option>
                                <option className='bg-black'>Nature</option>
                                <option className='bg-black'>Abstract</option>
                                <option className='bg-black'>Urban</option>

                            </select>
                            <select
                                value={sort}
                                onChange={(e) => setSort(e.target.value)}
                                className="px-4 py-2 border text-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            >
                                <option className='bg-black'>Newest</option>
                                <option className='bg-black'>Price: Low to High</option>
                                <option className='bg-black'>Price: High to Low</option>
                            </select>
                        </div>
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
                    >
                        {filteredArtworks.map((art) => (
                            <motion.div
                                key={art.id}
                                variants={cardVariants}
                                whileHover={{
                                    scale: 1.05,
                                    rotate: 0.5,
                                    transition: { duration: 0.3, ease: "easeOut" },
                                }}
                                whileTap={{ scale: 0.97 }}
                                className="relative group bg-gray-800/40 rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:shadow-indigo-600/20 transition-all"
                            >

                                <img
                                    src={art.imageUrl}
                                    alt={art.title}
                                    className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                                />

                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center backdrop-blur-sm">
                                    <button
                                        onClick={() => addFavorite(art)}
                                        className="absolute top-3 right-3 bg-black/50 p-2 rounded-full hover:bg-black/80 transition"
                                    >
                                        <i className="ri-heart-line text-white text-lg group-hover:text-red-500 transition"></i>
                                    </button>
                                    <h2 className="text-xl font-semibold text-white tracking-wide">
                                        {art.title}
                                    </h2>
                                    <p className="text-sm text-gray-300">{art.category}</p>
                                    <p className="mt-2 text-indigo-400 font-bold text-lg">₹{art.price}</p>
                                    <button className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-md text-white text-sm transition">
                                        View Details
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            }
        </Layout>
    )

}

export default Explore;
