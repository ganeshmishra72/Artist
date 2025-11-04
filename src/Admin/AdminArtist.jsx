import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import firebaseartist from '../firebase/firebaseartist-config'
import { getFirestore, addDoc, collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore'

import axios from 'axios'

const db = getFirestore(firebaseartist);

const AdminArtist = () => {
    const model =
    {
        name: '',
        email: '',
        phone: '',
        country: '',
        state: '',
        city: '',
        pincode: '',
        specility: '',
        imageUrl: '',
        description: ''

    }

    const [display, setDisplay] = useState(false)
    const [artist, setArtist] = useState([])
    const [artistFrom, setArtistFrom] = useState(model)
    const [isUpdate, setIsupdate] = useState(false)
    const [edit, setEdit] = useState(null)

    const handelValue = (e) => {
        const value = e.target.value
        const key = e.target.name
        setArtistFrom({
            ...artistFrom,
            [key]: value
        })
    }

    const createArtistData = async (e) => {
        try {
            e.preventDefault()
            const ref = await addDoc(collection(db, 'artistData'), artistFrom)
            new swal({
                icon: 'success',
                title: 'Successfully Add Artist!'
            })
            setArtistFrom(model)
            setDisplay(false)
            fetchArtist()

        } catch (error) {
            new swal({
                icon: 'error',
                title: 'Faied !',
                text: error.message
            })
        }

    }

    const fetchArtist = async () => {
        const getData = await getDocs(collection(db, 'artistData'))
        let temp = []
        getData.forEach((docs) => {
            const documnet = docs.data()
            documnet.id = docs.id
            temp.push(documnet)
        })
        setArtist(temp)
    }

    useEffect(() => {
        fetchArtist()
    }, [])


    useEffect(() => {
        const req = async () => {
            const getData = await getDocs(collection(db, 'artistData'))
            let temp = []
            getData.forEach((docs) => {
                const documnet = docs.data()
                documnet.id = docs.id
                temp.push(documnet)

            })
            setArtist(temp)
        }
        req()
    }, [isUpdate])

    const handelUplaodImage = async (e, id, idx) => {
        const file = e.target.files[0]
        if (!file) return

        const formData = new FormData()
        formData.append("file", file)
        formData.append("upload_preset", "RDArtist")
        formData.append("cloud_name", "dy25vlvd5");

        try {
            const res = await axios.post(
                `https://api.cloudinary.com/v1_1/dy25vlvd5/image/upload`,
                formData
            )

            const imageUrl = res.data.secure_url

            // Update firestore
            const ref = doc(db, 'artistData', id)
            await updateDoc(ref, { imageUrl })

            // Update UI without reload
            const updateArtist = [...artist]
            updateArtist[idx].imageUrl = imageUrl
            setArtist(updateArtist)

            new swal({
                icon: 'success',
                title: 'Image Updated!'
            })
        }
        catch (error) {

            new swal({
                icon: 'error',
                title: 'Upload Failed!',
                text: error.message
            })
        }

    }

    const handelDeleteArtistData = async (id) => {
        try {

            const ref = doc(db, 'artistData', id)
            await deleteDoc(ref)
            setIsupdate(!isUpdate)
            new swal({
                icon: 'success',
                title: "Successfully Deleted!"
            })
        } catch (error) {
            new swal({
                icon: 'error',
                title: 'Failed!',
                text: error.message
            })
        }
    }

    const handelUpdateArtistData = async (item, id) => {
        setEdit(item)
        setArtistFrom(item)
        setDisplay(true)

    }

    const updateArtistData = async (e) => {
        try {
            e.preventDefault()
            const ref = doc(db, 'artistData', edit.id)
            await updateDoc(ref, artistFrom)
            setArtistFrom(model)
            setEdit(null)
            setIsupdate(!isUpdate)

        } catch (error) {
            new swal({
                icon: 'error',
                title: 'Failed to Update This Artist!',
                text: error.message
            })
        }
        finally {
            setDisplay(false)
        }
    }

    return (
        <Layout>
            {
                <div className='h-screen p-6'>
                    <div className='flex justify-between items-center'>
                        <p className='text-xl  text-blue-500'>Artist</p>
                        <button onClick={() => setDisplay(true)} className='bg-blue-500 text-white rounded py-2 px-6 cursor-pointer '>
                            <i className='ri-add-line mr-2 text-xl'></i> Add Artist
                        </button>
                    </div>

                    <div className='grid xl:grid-cols-4 lg:grid-cols-3 gap-8 sm:grid-cols-2 grid-cols-1 mt-8 '>
                        {
                            artist.map((item, idx) => (
                                <div key={idx} className='bg-gray-50 rounded-md shadow-lg  '>
                                    <div className='relative'>
                                        <img src={item.imageUrl || '/ganesh.jpg'} alt="" className='rounded-t-md w-full object-cover h-[320px]' />
                                        <input type="file" accept='image/*' id={`fileInput-${idx}`} onChange={(e) => { handelUplaodImage(e, item.id, idx) }} className='w-full h-full opacity-0 absolute top-0 left-0' />
                                    </div>

                                    <div className='p-4 relative'>
                                        <div className='absolute top-4 right-2 flex gap-2'>
                                            <button onClick={() => handelUpdateArtistData(item, item.id)} className='text-green-600 text-lg'><i className='ri-edit-line'></i></button>
                                            <button onClick={() => handelDeleteArtistData(item.id)} className='text-red-600 text-lg'><i className='ri-delete-bin-line'></i></button>
                                        </div>
                                        <h1 className='font-semibold text-lg capitalize'>{item.name}</h1>
                                        <p className='text-purple-500'>{item.specility}</p>
                                        <p className='text-gray-400'>{item.description}</p>
                                        <p className='text-blue-700'>{item.email}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    {
                        display &&
                        <div className='bg-black/80 w-full min-h-full z-9999 absolute top-0 left-0 transition-all duration-300 flex justify-center items-center'>
                            <div className='bg-white rounded-md   border-1 w-10/12 md:w-5/12 py-5 px-6 relative animate__animated animate__zoomIn animate_faster  '>
                                <div>
                                    <button className='absolute top-3 right-3' onClick={() => setDisplay(false)} >
                                        <i className='ri-close-line text-lg'></i>
                                    </button>
                                    <h1 className='text-xl font-semibold'>Add a Artist</h1>
                                </div>

                                <form className='mt-5 grid grid-cols-1 md:grid-cols-2 gap-6' onSubmit={edit ? updateArtistData : createArtistData}  >

                                    <input onChange={handelValue} type="text" name="name" placeholder='Enter Name of Artist' required className='bg-white rounded p-3 border border-slate-400 col-span-2 md:col-span-1 ' value={artist.name} />
                                    <input onChange={handelValue} type="email" name="email" placeholder='Enter Email of Artist' required className='bg-white rounded p-3 border border-slate-400 col-span-2 md:col-span-1' value={artist.email} />
                                    <input onChange={handelValue} type="number" name="phone" placeholder='8600327769' required className='bg-white rounded p-3 border border-slate-400 col-span-2 md:col-span-1' value={artist.phone} />
                                    <input onChange={handelValue} type="text" name="country" placeholder='India' required className='bg-white rounded p-3 border border-slate-400 col-span-2 md:col-span-1' value={artist.country} />
                                    <input onChange={handelValue} type="text" name="state" placeholder='Maharashtra' required className='bg-white rounded p-3 border border-slate-400 col-span-2 md:col-span-1 ' value={artist.state} />
                                    <input onChange={handelValue} type="text" name="city" placeholder='Kopargaon' required className='bg-white rounded p-3 border border-slate-400 col-span-2 md:col-span-1' value={artist.city} />
                                    <input onChange={handelValue} type="number" name="pincode" placeholder='400606' required className='bg-white rounded p-3 border border-slate-400 col-span-2 md:col-span-1' value={artist.pincode} />
                                    <input onChange={handelValue} type="text" name="specility" placeholder='Tattot' required className='bg-white rounded p-3 border border-slate-400 col-span-2 md:col-span-1' value={artist.specility} />
                                    <textarea onChange={handelValue} name="description" className='bg-white rounded p-3 border border-slate-400 col-span-2 ' placeholder='Description' rows={5} value={artist.description} ></textarea>
                                    {
                                        edit ?
                                            <button className='bg-green-600 py-2 px-4 rounded text-white font-semibold w-fit '>
                                                Update Product
                                            </button> :
                                            <button className='bg-indigo-600 py-2 px-4 rounded text-white font-semibold w-fit  '>
                                                Add Artist
                                            </button>
                                    }

                                </form>
                            </div>
                        </div>
                    }
                </div>
            }
        </Layout>
    )
}

export default AdminArtist
