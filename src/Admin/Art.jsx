import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import firebaseartist from '../firebase/firebaseartist-config'
import { getFirestore, addDoc, collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore'

import axios from 'axios'

const db = getFirestore(firebaseartist);
const Art = () => {
    const model = {
        title: '',
        price: '',
        category: 'Select Category',
        discount: '',
        description: '',
        imageUrl: ''
    }
    const [arts, setArts] = useState([])
    const [display, setDisplay] = useState(false)
    const [artsForm, setArtsFrom] = useState(model)
    const [isUpdate, setIsupdate] = useState(false)
    const [edit, setEdit] = useState(null)


    const handelValue = (e) => {
        const value = e.target.value
        const key = e.target.name
        setArtsFrom({
            ...artsForm,
            [key]: value
        })
    }

    const createArtsData = async (e) => {
        try {
            e.preventDefault()
            const ref = await addDoc(collection(db, 'artsData'), artsForm)
            new swal({
                icon: 'success',
                title: 'Successfully Add Arts!'
            })
            setArtsFrom(model)
            setDisplay(false)
            fetchArts()

        } catch (error) {
            new swal({
                icon: 'error',
                title: 'Faied !',
                text: error.message
            })
        }

    }

    const fetchArts = async () => {
        const getData = await getDocs(collection(db, 'artsData'))
        let temp = []
        getData.forEach((docs) => {
            const documnet = docs.data()
            documnet.id = docs.id
            temp.push(documnet)
        })
        setArts(temp)
    }

    useEffect(() => {
        fetchArts()
    }, [])

    useEffect(() => {
        const req = async () => {
            const getData = await getDocs(collection(db, 'artsData'))
            let temp = []
            getData.forEach((docs) => {
                const documnet = docs.data()
                documnet.id = docs.id
                temp.push(documnet)

            })
            setArts(temp)
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
            const ref = doc(db, 'artsData', id)
            await updateDoc(ref, { imageUrl })

            // Update UI without reload
            const updatedarts = [...arts]
            updatedarts[idx].imageUrl = imageUrl
            setArts(updatedarts)

            new swal({
                icon: 'success',
                title: 'Image Updated!'
            })
        }
        catch (error) {
            console.error("Cloudinary upload error:", error.response?.data || error.message);
            new swal({
                icon: 'error',
                title: 'Upload Failed!',
                text: error.message
            })
        }

    }

    const handelDeleteArtsData = async (id) => {
        try {

            const ref = doc(db, 'artsData', id)
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


    const handelUpdateArtsData = async (item, id) => {
        setEdit(item)
        setArtsFrom(item)
        setDisplay(true)

    }

    const updateArtsData = async (e) => {
        try {
            e.preventDefault()
            const ref = doc(db, 'artsData', edit.id)
            await updateDoc(ref, artsForm)
            setArtsFrom(model)
            setEdit(null)
            setIsupdate(!isUpdate)

        } catch (error) {
            new swal({
                icon: 'error',
                title: 'Failed to Update This Arts!',
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
                <div className='min-h-full p-6'>
                    <div className='flex justify-between items-center'>
                        <p className='text-xl font-bold text-blue-500'>Artswork</p>
                        <button onClick={() => setDisplay(true)} className='bg-blue-500 text-white rounded py-2 px-6 cursor-pointer '>
                            <i className='ri-add-line mr-2 text-xl'></i> Add Arts
                        </button>
                    </div>

                    <div className='grid xl:grid-cols-4 lg:grid-cols-3 gap-8 sm:grid-cols-2 grid-cols-1 mt-8 '>
                        {
                            arts.map((item, idx) => (
                                <div key={idx} className='bg-gray-50 rounded-md shadow-lg  '>
                                    <div className='relative'>
                                        <img src={item.imageUrl || '/ganesh.jpg'} alt="" className='rounded-t-md w-full object-cover h-[320px]' />
                                        <input type="file" accept='image/*' id={`fileInput-${idx}`} onChange={(e) => { handelUplaodImage(e, item.id, idx) }} className='w-full h-full opacity-0 absolute top-0 left-0' />
                                    </div>

                                    <div className='p-4 relative'>
                                        <div className='absolute top-4 right-2 flex gap-2'>
                                            <button onClick={() => handelUpdateArtsData(item, item.id)} className='text-green-600 text-lg'><i className='ri-edit-line'></i></button>
                                            <button onClick={() => handelDeleteArtsData(item.id)} className='text-red-600 text-lg'><i className='ri-delete-bin-line'></i></button>
                                        </div>
                                        <h1 className='font-semibold text-lg capitalize'>{item.title}</h1>
                                        <div className=' flex gap-2  '>
                                            <span>₹{item.price - (item.price * item.discount) / 100}</span>
                                            <del><span className='font-semibold'>₹{item.price}</span></del>
                                            <span className='text-gray-500'>(₹{item.discount}Off)</span>
                                        </div>
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
                                    <h1 className='text-xl font-semibold'>Add a Arts</h1>
                                </div>

                                <form className='mt-5 grid grid-cols-1 md:grid-cols-2 gap-6' onSubmit={edit ? updateArtsData : createArtsData}  >

                                    <input onChange={handelValue} type="text" name="title" placeholder='Enter Arts title' required className='bg-white rounded p-3 border border-slate-400 col-span-2' value={artsForm.title} />
                                    <input onChange={handelValue} type="number" name="price" placeholder='Enter Price' required className='bg-white rounded p-3 border border-slate-400 col-span-2 md:col-span-1' value={artsForm.price} />
                                    <select onChange={handelValue} name="category" required className='bg-white rounded p-3 border border-slate-400 col-span-2 md:col-span-1' value={artsForm.category} >
                                        <option >Select Category</option>
                                        <option value={'nature'}>Nature</option>
                                        <option value={'abstract'}>Abstract</option>
                                        <option value={'urban'}>Urban</option>
                                    </select>
                                    <input onChange={handelValue} type="number" name="discount" placeholder='Enter Discount' required className='bg-white rounded p-3 border border-slate-400 col-span-2 md:col-span-1' value={artsForm.discount} />
                                    <textarea onChange={handelValue} name="description" className='bg-white rounded p-3 border border-slate-400 col-span-2' placeholder='Description' rows={5} value={artsForm.description}></textarea>

                                    {
                                        edit ?
                                            <button className='bg-green-600 py-2 px-4 rounded text-white font-semibold w-fit '>
                                                Update Arts
                                            </button> :
                                            <button className='bg-indigo-600 py-2 px-4 rounded text-white font-semibold w-fit '>
                                                Add Arts
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

export default Art
