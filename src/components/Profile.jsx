import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import firebaseartist from '../firebase/firebaseartist-config'
import { getAuth, signOut, onAuthStateChanged, } from 'firebase/auth'
import axios from 'axios';
import { getFirestore, collection, addDoc, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';
const auth = getAuth(firebaseartist)
const db = getFirestore(firebaseartist)
const Profile = () => {
    const navigate = useNavigate()
    const [session, setSession] = useState(null);
    const [isAddress, setIsAddress] = useState(false)
    const [docId, setDocid] = useState(false)
    const [role, setRole] = useState(null)
    const [profileImage, setProfileImage] = useState('');


    const [fromValue, setFromValue] = useState({
        fullname: '',
        email: '',
    });

    const [extradata, setExtradata] = useState({
        address: '',
        city: '',
        state: '',
        country: '',
        pincode: '',
        userid: '',
        mobile: '',
        profileImage: ''
    })

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                setSession(user);
                setFromValue({
                    ...fromValue,

                    email: user.email || ""
                });

            } else {
                setSession(false);
                navigate('/');
            }
        });

    }, []);

    useEffect(() => {
        const req = async () => {
            if (session) {
                setFromValue({
                    ...fromValue,
                    fullname: session.displayName
                })
                setExtradata({
                    ...extradata,
                    userid: session.uid
                })
                const colRef = collection(db, "addresses")
                const q = query(colRef, where("userid", "==", session.uid))
                const snapshot = await getDocs(q)
                setIsAddress(!snapshot.empty)
                snapshot.forEach((doc) => {
                    setDocid(doc.id)
                    const addressdata = doc.data()
                    setExtradata({
                        ...extradata,
                        ...addressdata
                    })
                })
            }
        }
        req()
    }, [session])


    useEffect(() => {
        if (session) {

            const req = async () => {
                const col = collection(db, 'users')
                const q = query(col, where('customerId', '==', session.uid))
                const sanpshot = await getDocs(q)
                sanpshot.forEach((docs) => {
                    const document = docs.data()
                    setRole(document)
                })
            }
            req()
        }
    }, [session])


    const handelValue = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        setFromValue({
            ...fromValue,
            [key]: value
        });
    };


    const handelSave = async (e) => {
        e.preventDefault()
        await updateProfile(auth.currentUser, {
            displayName: fromValue.fullname

        })
        new swal({
            icon: 'success',
            title: 'Profile Update'
        })
    }

    const handelAddressValue = (e) => {
        const key = e.target.name
        const value = e.target.value
        setExtradata(
            {
                ...extradata,
                [key]: value
            }
        )
    }

    const saceAddress = async (e) => {
        try {

            e.preventDefault()
            const ref = await addDoc(collection(db, "addresses"), extradata)
            setIsAddress(true)
            new swal({
                icon: 'success',
                title: 'Address Saveed !'
            })

        } catch (error) {

            new swal({
                icon: 'error',
                title: 'Failde !',
                text: error.message
            })

        }

    }
    const updateaddress = async (e) => {
        try {

            e.preventDefault()
            const ref = doc(db, 'addresses', docId)
            await updateDoc(ref, extradata)

            new swal({
                icon: 'success',
                title: 'Address Updated !'
            })


        } catch (error) {

            new swal({
                icon: 'error',
                title: 'Failde !',
                text: error.message
            })

        }

    }
    useEffect(() => {
        const fetchUserProfile = async () => {
            if (!session?.uid) return;

            const userRef = collection(db, "users");
            const q = query(userRef, where("customerId", "==", session.uid));
            const snapshot = await getDocs(q);

            if (!snapshot.empty) {
                const userData = snapshot.docs[0].data();
                if (userData.profileImage) {
                    setProfileImage(userData.profileImage);
                }
            }
        };

        fetchUserProfile();
    }, [session]);

    const handelUploadImage = async (e) => {
        const file = e.target.files[0];
        if (!file || !session) return;

        try {
            // 1️⃣ Upload image to Cloudinary
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "RDArtist");
            formData.append("cloud_name", "dy25vlvd5");

            const res = await axios.post(
                `https://api.cloudinary.com/v1_1/dy25vlvd5/image/upload`,
                formData
            );

            const imageUrl = res.data.secure_url;
            setProfileImage(imageUrl);


            const userRef = collection(db, 'users');
            const q = query(userRef, where('customerId', '==', session.uid));
            const snapshot = await getDocs(q);

            if (!snapshot.empty) {
                const docRef = doc(db, 'users', snapshot.docs[0].id);
                await updateDoc(docRef, { profileImage: imageUrl });

                new swal({
                    icon: 'success',
                    title: 'Profile Image Updated!',
                });
            } else {
                new swal({
                    icon: 'warning',
                    title: 'User document not found!',
                });
            }
        } catch (error) {
            console.error(error);
            new swal({
                icon: 'error',
                title: 'Upload failed!',
                text: error.message,
            });
        }
    };


    if (session === null) {
        return (
            <div className='bg-gray-200 h-full w-full fixed top-0 left-0 flex justify-center items-center'>
                <span className="relative flex size-6">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                    <span className="relative inline-flex size-6 rounded-full bg-sky-500"></span>
                </span>
            </div>
        );
    }



    return (
        <div className='bg-gradient-to-r from-[#111827] to-[#1E293B] min-h-screen flex flex-col md:flex-row'>
            <aside className="w-full md:w-[300px] md:fixed md:top-0 md:left-0 md:h-screen bg-[#111827] px-4 py-8 flex-shrink-0">
                <div className="flex flex-col items-center md:items-start">
                    <div className="relative w-32 md:w-7/12 mx-auto md:mx-0">
                        <img
                            src={profileImage || session.photoURL || "/ganesh.jpg"}
                            alt="Profile"
                            className="rounded-full w-full object-cover"
                        />
                        <label
                            htmlFor="profileImageInput"
                            className="absolute bottom-2 right-2 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 transition"
                        >
                            <i className="ri-camera-line text-lg"></i>
                        </label>
                        <input
                            id="profileImageInput"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handelUploadImage}
                        />
                    </div>

                    <div className="mt-6 text-center md:text-left">
                        <h1 className="text-2xl text-white leading-tight">{session.displayName}</h1>
                        <p className="text-lg text-gray-400">{session.email}</p>
                    </div>

                    <div className="mt-8 flex flex-col gap-4 text-center md:text-left">
                        <Link className="text-white" to={"/"}>
                            <i className="ri-home-4-line mr-2"></i> Home
                        </Link>

                        {role?.role === "admin" && (
                            <Link to={"/admin/dashboard"} className="text-white">
                                <i className="ri-file-shield-2-line mr-2"></i> Admin Panel
                            </Link>
                        )}

                        <Link className="text-white" to={"/cart"}>
                            <i className="ri-luggage-cart-line mr-2"></i> Cart
                        </Link>

                        <button
                            onClick={() => {
                                signOut(auth);
                                navigate("/");
                            }}
                            className="text-white cursor-pointer"
                        >
                            <i className="ri-logout-circle-line mr-2"></i> Logout
                        </button>
                    </div>
                </div>
            </aside>
            <section className='flex-1 md:ml-[300px] px-4 py-8 mt-[20px] md:mt-0'>
                <div className='flex-1 shadow-lg border-2 border-[#1E293B]  p-4'>
                    <div className="flex gap-2 items-center text-white flex-wrap">
                        <i className='ri-user-line text-4xl'></i>
                        <h1 className='text-3xl font-bold '>Profile</h1>
                    </div>
                    <hr className='mt-3 text-slate-400' />

                    <form className='mt-5 grid md:grid-cols-2  gap-6 grid-cols-1 ' onSubmit={handelSave} >
                        <div className='flex flex-col gap-1 col-span-2 md:col-span-1'>
                            <label className='font-bold text-lg text-white'>Fullname</label>
                            <input type="text" name='fullname' required placeholder='Ganesh' className='p-2 rounded bg-white border border-slate-300' onChange={handelValue} value={fromValue.fullname} />
                        </div>

                        <div className='flex flex-col gap-1 col-span-2 md:col-span-1'>
                            <label className='font-bold text-lg text-white' >Email</label>
                            <input disabled type="email" name='email' required placeholder='example@gmail.com' className='p-2 rounded bg-white border border-slate-300' onChange={handelValue} value={fromValue.email} />
                        </div>

                        <div className='col-span-2'>

                            <button type="submit" className='bg-rose-600 w-fit px-6 py-2 rounded font-semibold text-white'>
                                <i className='ri-save-line mr-2'></i>
                                Save
                            </button>
                        </div>
                    </form>
                </div>
                <div className='   shadow-lg border-2 border-[#1E293B]    p-4 mt-16'>
                    <div className='flex gap-2 items-center text-white'>
                        <i className='ri-link-unlink-m text-4xl'></i>
                        <h1 className='text-3xl font-bold'>Address</h1>
                    </div>
                    <hr className='mt-3 text-slate-400' />

                    <form className='mt-5 grid md:grid-cols-2 gap-6 grid-cols-1  ' onSubmit={isAddress ? updateaddress : saceAddress} >
                        <div className='flex flex-col gap-1 col-span-2 md:col-span-1'>
                            <label className='font-bold text-lg text-white'>Area/Street/Vill</label>
                            <input type="text" name='address' required placeholder='laxim nagar' className='p-2 rounded bg-white border border-slate-300' onChange={handelAddressValue} value={extradata.address} />
                        </div>

                        <div id='address' className='flex flex-col gap-1 col-span-2 md:col-span-1'>
                            <label className='font-bold text-lg text-white' >City</label>
                            <input type="text" name='city' required placeholder='mumbai' className='p-2 rounded bg-white border border-slate-300' onChange={handelAddressValue} value={extradata.city} />
                        </div>

                        <div className='flex flex-col gap-1 col-span-2 md:col-span-1'>
                            <label className='font-bold text-lg text-white'>State</label>
                            <input type="text" name='state' required placeholder='maharashtra' className='p-2 rounded bg-white border border-slate-300' onChange={handelAddressValue} value={extradata.state} />
                        </div>
                        <div className='flex flex-col gap-1 col-span-2 md:col-span-1'>
                            <label className='font-bold text-lg text-white'>Country</label>
                            <input type="text" name='country' required placeholder='india' className='p-2 rounded bg-white border border-slate-300' onChange={handelAddressValue} value={extradata.country} />
                        </div>
                        <div className='flex flex-col gap-1 col-span-2 md:col-span-1'>
                            <label className='font-bold text-lg text-white '>Pincode</label>
                            <input type="number" name='pincode' required placeholder='400602' className='p-2 rounded bg-white border border-slate-300' onChange={handelAddressValue} value={extradata.pincode} />
                        </div>
                        <div className='flex flex-col gap-1 col-span-2 md:col-span-1 '>
                            <label className='font-bold text-lg text-white'>Mobile</label>
                            <input type="number" name='mobile' required placeholder='8600327769' className='p-2 rounded bg-white border border-slate-300 ' onChange={handelAddressValue} value={extradata.mobile} />
                        </div>
                        <div className='col-span-2'>


                            {
                                isAddress ?
                                    <button type="submit" className='bg-rose-600 w-fit px-6 py-2 rounded font-semibold text-white hover:bg-green-500'>
                                        <i className='ri-save-line mr-2'></i>
                                        Save
                                    </button> :
                                    <button type="submit" className='bg-green-600 w-fit px-6 py-2 rounded font-semibold text-white hover:bg-green-500'>
                                        <i className='ri-save-line mr-2'></i>
                                        Submit
                                    </button>
                            }
                        </div>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default Profile
