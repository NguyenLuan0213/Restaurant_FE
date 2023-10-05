import React from 'react';
import Reservation from './reservation/reservation';
import Tables from './tables/tables';

const ReservationPage = () => {
    return (
        <div className='container mt-5'>
            <Reservation />
            <Tables />
        </div>
    )
}

export default ReservationPage;