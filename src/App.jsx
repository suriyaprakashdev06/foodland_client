import { useSelector } from 'react-redux'
import ShowFoods from './components/Home/ShowFoods'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from './Pages/Home';
import TodoList from './components/TodoList';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import ForgetPassword from './components/Auth/ForgetPassword';
import { Header } from './components/Header';

function App() {
 const { foods } = useSelector(state => state.foods);
  console.log("foods", foods);

  return (
    <>
    {/* <Header/> */}
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Signup  />} />
          <Route path="forgotPassword" element={<ForgetPassword  />} />
          <Route path={`${foods.itemName}`} element={<ShowFoods />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
