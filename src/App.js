import React, { useState, useEffect } from "react";
import Header from './components/header/header';
import MenuPage from './components/menuPage';
import Home from './components/homePage';
import Restaurant from './components/restaurantPage';
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
import CartOrder from './components/cartOrder/cartOrder';
import Payment from './components/payStripe/Payment';
import CheckoutForm from "./components/payStripe/CheckoutForm";

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
              <Route path='/restaurant' element={<Restaurant />} />
              <Route path='/pay' element={<PayPage />} />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/current-user' element={<UserProfile />} />
              <Route path='/cartorder' element={<CartOrder />} />
              <Route path='/payment' element={<Payment />} />
            </Routes>
            <GoToTop />
            <Footer />
          </div>
        </Router>
      </MyUserContext.Provider >
    </div>
  );
};

