import React from 'react'
import { useState } from 'react';
import Slider from './slider/slider';
import AboutUs from './aboutUs/aboutUs'
import Menu from './menu/menu';
import Contact from './contact/contact';
import Testimonials from './testimonials/testimonials';
import Footer from './footer/footer';
import Header from './header/header';
const Home = () => {
    return (
        <div>
            <Header />
            <Slider />
            <AboutUs />
            <Menu />
            <Testimonials />
            <Contact />
            <Footer />
        </div>
    )
}

export default Home;