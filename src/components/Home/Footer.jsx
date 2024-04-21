import React from 'react'

const Footer = () => {
  return (
    <div className='mt-10'>
      {/* <hr/> */}
      <div className='flex flex-row w-full justify-between'>
        <div className='flex flex-col'>
          <img className={`w-24 md:w-32`} src={`${window.location.origin}/images/logo.png`} />
          <span>Continue Eat Land 2024 all rights reserved</span>
        </div>
        <div className='flex flex-col'>
        <span className='text-xl font-bold text-orange-500 tracking-wide'>Menu</span>
        <span>Home</span>
        <span>Offers</span>
        <span>Service</span>
        <span>About Us</span>
        </div>
        <div className='flex flex-col'>
        <span className='text-xl font-bold text-orange-500 tracking-wide'>Information</span>
        <span>Menu</span>
        <span>Quality</span>
        <span>Make a Choice</span>
        <span>Salad with Vegitable</span>
        <span>Fast Delivery</span>
        <span>Subscribe</span>
        </div>
        <div className='flex flex-col'>
        <span className='text-xl font-bold text-orange-500 tracking-wide'>Contacts</span>
        <span>+91 88223 45689</span>
        <span>Explore</span>
        <span>Info@EatLand.Com</span>
        <span>1234, Chennai, TamilNadu</span>
        </div>
      </div>
    </div>
  )
}

export default Footer
