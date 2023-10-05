import React from 'react';
import BG_Menu from './bgMenu/bgMenu';
import Menu from './menu/menu';
import BG_MenuChef from './bgMenu/bgMenuChef'
import Chefs from './chef/chef';
import Header from './header/header';

const MenuPage = () => {
  return (
    <div className='container mt-5'>
      <BG_Menu />
      <BG_MenuChef />
      <Chefs />
      <Menu />
    </div>
  )
}

export default MenuPage;
