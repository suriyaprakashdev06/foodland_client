import { useEffect, useState } from 'react'
import { IoPersonCircleOutline } from "react-icons/io5";
// import { SlBasket } from "react-icons/pi";
import { SlLocationPin, SlBasket } from "react-icons/sl";
import { GiStarFormation } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
function Header() {
  // adding the states 
  const { cart } = useSelector(state => state.cart);

  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [isActive, setIsActive] = useState(false);
  const [login, setLogin] = useState(false);
  const [cartList, setCardList] = useState([]);
  const [show, setShow] = useState(false);
  const [address, setAddress] = useState('');
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setLogin(localStorage.getItem("loggedIn"))
    setUserName(localStorage.getItem("userName"))
  }, [])
console.log("login",login);
  const toggleActiveClass = () => {
    setIsActive(!isActive);
  };
  const removeActive = () => {
    setIsActive(false)
  }
  async function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })
        },
        (error) => {
          console.error('Error getting geolocation:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
    const geocoder = new google.maps.Geocoder();
    const latlng = {
      lat: Number(location.latitude),
      lng: Number(location.longitude),
    };
    if (location.latitude != null && location.longitude != null) {
      try {
        const response = await geocoder.geocode({ location: latlng });
        setLocation(response.results[0].formatted_address);
        console.log(response.results[0].formatted_address);
      } catch (e) {
        window.alert(`Geocoder failed due to: ${e}`);
      }
    }

  }
  const handleSignIn = () => {
    navigate('/login')
  }
  const handleLogout = () => {
    localStorage.setItem("loggedIn", false);
    localStorage.removeItem("userName");
    setLogin(false)
  }
  // console.log("cart",cart);
  return (
    <div className='sticky top-0 bg-white opacity-200 z-10 px-14'>
      <header className="App-header">
        <nav className={`w-full flex justify-between items-center px-1.5 pb-1.5 bg-white-200 gap-2 h-28`}>
          {/* logo */}
          <img className={`w-24 md:w-32 lg:w-40`} src={`${window.location.origin}/images/logo.png`} />
          <div className='flex flex-row items-center text-sm relative h-full w-96'>
            <div className='flex'>
              <SlLocationPin />
              <span className='text-xs'>{(location.latitude != null && location.longitude != null) && address}</span>
              <button className='text-orange-500 underline pl-1' onClick={getLocation}>Change Location</button>
            </div>

            <div className={`${show && 'animate-slideIn'} flex pl-3 absolute top-0 text-[10px] items-center border border-solid border-gray-300 rounded-b-md border-t-0`}>
              <GiStarFormation />
              <span className='pl-1'>Get 5% Off your first order,</span>
              <span className='text-shadow text-orange-500 underline pr-1'>Promo: ORDER5</span>
              <IoCloseSharp className='text-lg' onClick={() => setShow(!show)} />
            </div>
          </div>
          <ul className={`${isActive ? "sm:left-0" : ''} flex justify-between items-center gap-10`}>
            <li onClick={removeActive} className='h-8 flex py-3 justify-center items-center border-b-2 border-solid border-b-transparent  hover:border-b-2 hover:border-solid hover:border-b-orange-500'>
              <a href='#home' className={`no-underline text-black text-xl`}>Home</a>
            </li>
            <li onClick={removeActive} className='h-8 flex py-3 justify-center items-center border-b-2 border-solid border-b-transparent  hover:border-b-2 hover:border-solid hover:border-b-orange-500'>
              <a href='#offer' className={`no-underline text-black text-xl`}>Offers</a>
            </li>
            <li onClick={removeActive} className='h-8 flex py-3 justify-center items-center border-b-2 border-solid border-b-transparent  hover:border-b-2 hover:border-solid hover:border-b-orange-500'>
              <a href='#service' className={`no-underline text-black text-xl`}>Service</a>
            </li>
            <li onClick={removeActive} className='h-8 flex py-3 justify-center items-center border-b-2 border-solid border-b-transparent  hover:border-b-2 hover:border-solid hover:border-b-orange-500'>
              <a href='#trackOrders' className={`no-underline text-black text-xl`}>About Us</a>
            </li>
            <button className='flex flex-row items-center justify-evenly h-10 bg-green-700 rounded-3xl hover:bg-green-900 cursor-pointer'>
              <span className='px-3'><SlBasket size={25} color='white' /></span>
              <span className='px-3 w-20 text-white text-md h-full flex items-center justify-center border-l-2 border-gray-300'><span className='ml-3 mr-1 font-bold'>{cart.length}</span> {` `}Items<span className='opacity-0'>111</span></span>
            </button>
            <div>
              {login == 'true' ?
                <p className="text-center text-lg text-gray-500">
                  <span>Hi <span>{userName.slice(0,5)}</span></span>{' '}
                  <a onClick={handleLogout} className="font-semibold leading-6 text-orange-500 hover:text-indigo-500 cursor-pointer">
                    <u>Logout</u>
                  </a>
                </p>
                : <button onClick={handleSignIn} className={`h-10 w-auto px-4 py-4 bg-black text-white flex justify-center items-center rounded-3xl text-md hover:bg-orange-500 border-none`}><IoPersonCircleOutline size={25} className='pr-1'/>Sign In</button>}
            </div>
          </ul>
          <div className={`${isActive ? '' : ''} hidden`} onClick={toggleActiveClass}>
            <span className={`${isActive ? '' : ''} `}></span>
            <span className={`${isActive ? '' : ''} `}></span>
            <span className={`${isActive ? '' : ''} `}></span>
          </div>

        </nav>
      </header>
    </div>
  );
}
export default Header;
