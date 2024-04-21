import React, { useState } from 'react'
import { PopularCategories } from '../../constant/Data'

const FoodCategories = () => {
    const [popularCategorie, setPopularCategorie] = useState(PopularCategories)
    return (
        <>
            <div className='py-6'>
                <span className='font-bold text-4xl'><span className='text-orange-500'>Popular</span> Menu 🤩</span>
            </div>
            <div className='flex px-0 list-none overflow-x-scroll scrollBar'>
                {popularCategorie.map((data,i)=>(
                        <div key={i} className='rounded-lg h-auto flex items-center flex-col flex-shrink-0 flex-grow-0 w-60 mr-10 my-5 p-2 scroll-snap-align-start transition-all duration-200 cursor-pointer' id={i}>
                            <img src={data.image} className='h-50 w-50 rounded-full'/>
                            <div className='p-2'>
                                <span className='font-bold text-lg drop-shadow text-black'>{data.name}</span>
                            </div> 
                        </div>
                    ))
                }

            </div>
        </>
    )
}

export default FoodCategories
