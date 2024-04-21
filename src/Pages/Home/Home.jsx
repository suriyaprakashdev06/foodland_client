import { Header } from "../../components/Header"
import Banner from "../../components/Home/Banner"
import FoodCategories from "../../components/Home/FoodCategories"
import Footer from "../../components/Home/Footer"
import RegularMenu from "../../components/Home/RegularMenu"
import ShowFoods from "../../components/Home/ShowFoods"

const Home = () => {
    return (
        <>
            <Header />
            <div className='mx-14'>
                <Banner />
                <FoodCategories />
                <RegularMenu />
                <Footer />
            </div>
        </>
    )
}

export default Home