import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import firebaseartist from '../firebase/firebaseartist-config'
import { getFirestore, collection, getDocs, addDoc, query, where, doc, deleteDoc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'
const db = getFirestore(firebaseartist)
const auth = getAuth(firebaseartist)
const Cart = () => {

    const navigate = useNavigate()
    const [product, setProducts] = useState([])
    const [session, setSession] = useState(null)
    const [isupdated, setIsupdated] = useState(false)
    const [address, setAdress] = useState(null)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setSession(user)
            }
            else {
                setSession(false)
            }
        })
    }, [])


    useEffect(() => {
        const req = async () => {
            if (session) {

                const col = collection(db, 'carts')
                const q = query(col, where('userid', '==', session.uid))
                const sanshop = await getDocs(q)
                let temp = []
                sanshop.forEach((docs) => {
                    const documnet = docs.data()
                    documnet.cartId = docs.id
                    temp.push(documnet)
                })

                setProducts(temp)
            }
        }
        req()


    }, [session, isupdated])

    const getPrice = (products) => {
        let sum = 0
        for (let item of products) {
            let amt = Math.round(item.price - (item.price * item.discount) / 100)
            sum += amt
        }
        return sum
    }

    const removeCart = async (id) => {
        try {
            const ref = doc(db, 'carts', id)
            await deleteDoc(ref)
            setIsupdated(!isupdated)


        } catch (error) {
            console.log(error.message);

        }
    }

    useEffect(() => {
        const req = async () => {
            if (session) {
                const col = collection(db, 'addresses')
                const q = query(col, where('userid', '==', session.uid))
                const snapshot = await getDocs(q)
                snapshot.forEach((docs) => {
                    const documnet = docs.data()
                    setAdress(documnet)
                })
            }
        }
        req()
    }, [session])

    const buynow = async () => {

        const colRef = collection(db, 'addresses');
        const q = query(colRef, where('userid', '==', session.uid));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            // If no address found
            new swal({
                icon: 'info',
                title: 'Address Required',
                text: 'Please update your address before placing an order.',
                confirmButtonText: 'Go to Profile'
            }).then((res) => {
                if (res.isConfirmed) {
                    navigate('/profile#address');
                }
            });
            return; // stop buy process
        }
        const amount = getPrice(product)
        try {

            for (let item of product) {
                let products = {
                    ...item,
                    userId: session.uid,
                    status: "pending",
                    email: session.email,
                    customerName: session.displayName,
                    createdAt: serverTimestamp(),
                    address: address
                }
                const ref = await addDoc(collection(db, 'orders'), products)
                await updateDoc(ref, { id: ref.id });
                await removeCart(item.cartId)
            }
            new swal({
                icon: 'success',
                title: 'Order Placed Successfully!',
                text: 'Your order has been created successfully.',
            }).then(() => {
                navigate('/profile');
            });

        } catch (error) {
            new swal({
                icon: 'error',
                title: 'Failed',
                text: error.message
            })
        }
    }


    return (
        <Layout update={isupdated}>
            <div className='md:p-16 p-4  '>
                <div className='md:w-8/12 shadow-lg border-2 border-[#1E293B] mx-auto    p-4'>
                    <div className='flex gap-2 items-center  text-white'>
                        <i className='ri-shopping-cart-line text-4xl' ></i>
                        <h1 className='text-4xl font-bold'>Cart</h1>
                    </div>
                    <hr className='mt-3 text-slate-400' />
                    <div className='mt-4 space-y-8'>
                        {
                            product.map((item, idx) => (
                                <div className='flex gap-4 ' key={idx}>
                                    <img src={item.imageUrl} alt="" className='w-[120px] border border-slate-200 shadow-lg bg-white' />
                                    <div className='flex flex-col gap-6'>
                                        <div>
                                            <h1 className='font-bold text-lg text-white '>{item.title}</h1>
                                            <div className='space-x-2'>
                                                <span className='text-white'>₹{item.price - (item.price * item.discount) / 100}</span>
                                                <del><span className='font-semibold text-white'>₹{item.price}</span></del>
                                                <span className='text-gray-500'>{item.discount}(%Off)</span>
                                            </div>
                                        </div>
                                        <button className='bg-rose-600 text-white font-semibold rounded p-2 w-fit ' onClick={() => removeCart(item.cartId)}>
                                            <i className='ri-delete-bin-line'></i>  Remove
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <hr className='mt-3 text-slate-400' />
                    <div className='flex justify-between items-center mt-4'>

                        <h1 className='text-lg font-semibold  text-white'>Total : ₹{getPrice(product).toLocaleString()}</h1>
                        {
                            product.length > 0 &&
                            <button className='bg-green-500 px-8 py-2 rounded text-white font-semibold hover:bg-rose-800  ' onClick={() => buynow()}><i className='ri-shopping-bag-line mr-2'></i>BuyNow</button>
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Cart
