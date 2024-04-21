import React, { useState, useEffect } from 'react';
import { Carousel } from 'primereact/carousel';
import { CarouselData } from '../../constant/CarouselData';

const Banner = () => {
    const [products, setProducts] = useState(CarouselData);

    const productTemplate = (product) => {
        return (
            <div className='w-full m-5 flex justify-center h-[350px]'>
            <div className='w-auto h-auto border border-solid border-gray-300 rounded-2xl flex justify-evenly shadow-lg'>
                <div className='flex flex-col justify-center p-7 pl-14'>
                    <span className='text-xs tracking-widest'>Order Restaurant food, takeaway and groceries.</span><br />
                    <span className='text-4xl font-bold tracking-widest'>All Food is ,</span><br />
                    <span className='text-4xl font-bold text-orange-500 tracking-widest'>Available at Eat Land</span><br />
                    <label form={`checkoreder_${product.name}`} className='text-xs tracking-widest'>Enter a postcode to see what we deliver</label><br />
                    <div className='flex border w-80 border-solid border-gray-300 rounded-2xl'>
                        <input type='text' id={`checkoreder`} placeholder='ex : EC4RA789' className='h-10 w-44 rounded-l-2xl focus:outline-transparent p-3' />
                        <button className='bg-orange-500 border-none h-10 w-36 rounded-2xl'>Search</button>
                    </div>
                </div>
                <div className='p-7 pr-14 flex items-center'><img src={`${window.location.origin}/images/${product.img}`} className='w-80 rounded-2xl' />
                </div>
            </div>
        </div>
        );
    };

    return (
        <div className="cart">
            <Carousel value={products} numVisible={1} numScroll={1} className="custom-carousel" 
            circular
            autoplayInterval={3000}
             itemTemplate={productTemplate} />
        </div>
    )
}
export default Banner;