import React from 'react';
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
import Cart from './components/cart/cart';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Payment from './components/payStripe/Payment';
import Completion from './components/payStripe/Completion';
import CheckoutForm from './components/payStripe/CheckoutForm';


export const MyUserContext = createContext();
const stripePromise = loadStripe
  ('pk_test_51MlntRFtuguvBwBePPJrdA6ZJ6CtY5Or5sJqf1vH8qi1eT7oyikE8pZSgS8o70aI8qgZeInyfEv00yvMveVMl7Xu00yJetHxZl');


export default function App() {
  const [user, state] = useReducer(MyUserReduce, cookie.load('user') || null)

  const options = {
    // passing the client secret obtained from the server
    clientSecret: '{{http://localhost:3000/payment}}',
  };
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
              <Route path='/cart' element={<Cart />} />
              <Route path='/payment' element={<Payment />} />
              <Route path='/completion' element={<Completion />} />
              <Route
                path="/payment"
                element={
                  <Elements stripe={stripePromise} options={options}>
                    <CheckoutForm />
                  </Elements>
                }
              ></Route>
            </Routes>
            <GoToTop />
            <Footer />
          </div>
        </Router>
      </MyUserContext.Provider >
    </div>
  );
};

