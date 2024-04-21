import React, { useEffect, useState } from 'react'
import { Categories } from '../../constant/Data'
import { useDispatch } from 'react-redux';
import { showAllFoods } from '../../store/features/foodSlice';
import { useNavigate } from 'react-router-dom';


const RegularMenu = () => {
    const [menu, setMenu] = useState(Categories)
    const [show, setShow] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        console.log("menu", menu.length);
        const showMenu = Categories.slice(0, 8)
        setMenu(showMenu)
    }, [])
    const Rating = (starCount) => {
        let totalStar = ""
        for (let i = 0; i < 5; i++) {
            totalStar += "✰"
        }
        return totalStar
    }
    const showMore = () => {
        setShow(!show)
        !show ? setMenu(Categories) : setMenu(Categories.slice(0, 8))
        console.log("show", show);
    }
    const viewAllFoods = (data) => {
        navigate(`/${data.itemName}`)
        dispatch(showAllFoods(data))
    }
    
    // Rating(4)

    return (
        <>
            <div className='py-6'>
                <span className='font-bold text-4xl'>Our <span className='text-orange-500'>Regular</span> Menu 😋</span>
            </div>
            <div className='py-25 px-0 list-none flex flex-wrap w-full gap-16'>
                {menu?.map((data, i) => (
                    <div key={i} onClick={()=>viewAllFoods(data)} className='border border-solid border-gray-300 rounded-lg h-auto shadow-xl flex flex-col flex-shrink-0 flex-grow-0 mb-12 w-72 p-2  scroll-snap-align-start transition-all duration-200 cursor-pointer' id={i}>
                        <img src={data.img} className='w-full p-1 rounded-lg' />
                        <div className='p-2 '>
                            <span className='font-bold text-sm text-black'>{data.name}</span>
                            <p>{Rating(4)}</p>
                            <span className='font-bold text-sm text-black'>Starting From ₹ <span className='text-lg text-orange-500'>{data.price}</span></span>
                            <button className='text-xs w-full hover:text-orange-500'>{`View More`}</button>
                        </div>
                    </div>
                ))
                }

            </div>
            <div className='w-full flex justify-center '>
                <button className='rounded-lg text-orange-500 border-2 border-orange-500 p-1 hover:bg-orange-500 hover:text-white' onClick={showMore}>{show ? `Show Less ⇧` : `Show More ⇩`}</button>
            </div>


        </>
    )
}

export default RegularMenu
