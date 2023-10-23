import React from 'react'
import Slider from './slider/slider';
import AboutUs from './aboutUs/aboutUs'
import Menu from './menu/menu';
import Contact from './contact/contact';
import Testimonials from './testimonials/testimonials';

const Home = () => {
    return (
        <div>
            <Slider />
            <AboutUs />
            <Menu />
            <Testimonials />
            <Contact />
        </div>
    )
}

export default Home;