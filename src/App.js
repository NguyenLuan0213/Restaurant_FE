import React from 'react';
import Header from './components/header/header';
import MenuPage from './components/menuPage';
import Home from './components/homePage';
import Reservation from './components/reservationPage';
import PayPage from './components/payPage';
import Register from './components/register/register';
import Footer from './components/footer/footer';
import GoToTop from './components/goToTop/goToTop';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login/login';
import { createContext, useReducer } from 'react';
import cookie from 'react-cookies';
import MyUserReduce from './components/reducers/MyUserReduce';
import UserProfile from './components/User/User';
import Cart from './components/cart/cart';

export const MyUserContext = createContext();

export default function App() {
  const [user, state] = useReducer(MyUserReduce, cookie.load('user') || null)

  return (
    <div>
      <MyUserContext.Provider value={[user, state]}>
        <Router>
          <div>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path='/reservation' element={<Reservation />} />
              <Route path='/pay' element={<PayPage />} />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/current-user' element={<UserProfile />} />
              <Route path='/cart' element={<Cart />} />

            </Routes>
            <GoToTop />
            <Footer />
          </div>
        </Router>
      </MyUserContext.Provider >
    </div>
  );
};

