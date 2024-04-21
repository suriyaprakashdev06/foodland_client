import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { GoArrowLeft } from "react-icons/go";
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';
import { FaCartPlus } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { showCartData } from '../../store/features/cartSlice';

const ShowFoods = () => {
    const { foods } = useSelector(state => state.foods);
    const { cart } = useSelector(state => state.cart);
    const [showFoods, setShowFoods] = useState(foods.moreItems)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleImageError = (index) => {
        const imgReplace = [...showFoods]
        imgReplace[index].img = "https://b.zmtcdn.com/data/dish_photos/198/b3b35fb73f9d4193f7f31026a66c2198.png"
        setShowFoods(imgReplace)
        // console.log("foods.img",foods.img);
        console.log("in", index);
    };
    const previousPage = () => {
        navigate("/home")
    }
    const addToCart = (data) => {
        const cartCopy = [...cart]
        dispatch(showCartData([...cartCopy,data]))
    }
    return (
        <>
            <Header />
            <div className='mx-14 '>
                <div className='flex mb-5'>
                    <GoArrowLeft size={50} onClick={previousPage} className='cursor-pointer' /><span className='pl-3 text-5xl font-medium'>{foods.itemName}</span>
                </div>
                <hr className='' />
                <div className='py-25 px-0 list-none flex flex-wrap w-full gap-16'>
                    {showFoods?.map((data, i) => (
                        <div key={i} className='border border-solid border-gray-300 rounded-lg h-auto shadow-xl flex flex-col flex-shrink-0 flex-grow-0 mb-12 w-72 p-2  scroll-snap-align-start transition-all duration-200 cursor-pointer' id={i}>
                            <img src={data.img} onError={() => handleImageError(i)} className='w-full aspect-square p-1 rounded-lg' />
                            <div className='p-2 flex flex-col items-center'>
                                <span className='font-bold text-sm text-black'>{data.name}</span>
                                <p></p>
                                <span className='font-bold text-sm text-black'>₹ <span className='text-lg text-orange-500'>{data.price}</span></span>
                                <div className='flex'>
                                    <button
                                        onClick={()=>addToCart(data)}
                                        className='flex items-center bg-orange-400 hover:bg-orange-500 text-sm text-white font-bold py-2 px-2 border border-orange-500 rounded w-50' >Add to{' '}<FaCartPlus size={18} />
                                    </button>
                                    <button
                                        className='ml-3 w-50 flex bg-orange-400 hover:bg-orange-500 text-sm text-white font-bold py-2 px-2 border border-orange-500 rounded'>Buy Now</button>
                                </div>
                                <button className='flex items-center justify-center pt-3 text-xs w-full hover:text-orange-500'>{`View More `}<IoIosArrowDown /></button>
                            </div>
                        </div>
                    ))
                    }

                </div>
            </div>
        </>
    )
}

export default ShowFoods