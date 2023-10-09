import React from 'react';
import Restaurant from './restaurant/restaurant';
import Tables from './tables/tables';

const ResataurantPage = () => {
    return (
        <div className='container mt-5'>
            <Restaurant />
            <Tables />
        </div>
    )
}

export default ResataurantPage;