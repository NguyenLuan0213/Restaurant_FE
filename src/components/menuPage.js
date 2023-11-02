import React from 'react';
import BG_Menu from './bgMenu/bgMenu';
import Menu from './menu/menu';
import BG_MenuChef from './bgMenu/bgMenuChef'
import Chefs from './chef/chef';
import Footer from './footer/footer';
import Header from './header/header';

const MenuPage = () => {
  return (
    <>
      <Header />
      <div className='container mt-5'>
        <BG_Menu />
        <BG_MenuChef />
        <Chefs />
        <Menu />
      </div>
      <Footer />
    </>
  )
}

export default MenuPage;
