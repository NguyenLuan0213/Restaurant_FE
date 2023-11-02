import React from 'react';
import Restaurant from './restaurant/restaurant';
import Tables from './tables/tables';
import Footer from './footer/footer';
import Header from './header/header';

const ResataurantPage = () => {
    return (
        <>
            <Header />
            <div className='container mt-5'>
                <Restaurant />
                <Tables />
            </div>
            <Footer />
        </>
    )
}

export default ResataurantPage;