import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './menu.css';
import '../default.css'
import { authAPI, endpoints } from '../configs/api';
import Loading from '../layout/Loading';

const Menu = () => {
  const [menu, setMenu] = useState(null);
  const [menuItems, setMenuItems] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDefaultMenu, setShowDefaultMenu] = useState(true);
  const [activeMenu, setActiveMenu] = useState("1"); // Khởi tạo activeMenu là null
  const [cartCount, setCartCount] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await authAPI().get(endpoints.menu);
        setMenu(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Menu:', error);
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  useEffect(() => {

    fetchMenuItems();
  }, [activeMenu]);


  const fetchMenuItems = async () => {
    try {
      if (activeMenu !== null) { // Kiểm tra xem activeMenu có giá trị
        setLoading(true);
        const response = await authAPI().get(endpoints['menuItems'](activeMenu));
        setMenuItems(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching MenuItem:', error);
      setLoading(false);
    }
  };

  const handleMenuChange = async (fetchMenuItems) => {
    try {
      setLoading(true);
      const response = await authAPI().get(endpoints['menuItems'](fetchMenuItems));
      setMenuItems(response.data);
      setLoading(false);
      setActiveMenu(fetchMenuItems); // Cập nhật activeMenu
    } catch (error) {
      console.error('Error fetching MenuItem:', error);
      setLoading(false);
    }
  }

  if (!sessionStorage.getItem('cart')) {
    sessionStorage.setItem('cart', JSON.stringify([]));
  }

  const updateCartCount = (cart) => {
    const totalCount = cart.reduce((count, item) => count + item.count, 0);
    setCartCount(totalCount);
    sessionStorage.setItem('cartCount', totalCount);
  };

  function addToCart(food) {
    let cart = JSON.parse(sessionStorage.getItem('cart'));

    if (!cart) {
      cart = [];
    }

    const existingFood = cart.find(item => item.id === food.id);

    if (existingFood) {
      existingFood.count += 1;
    } else {
      food.count = 1;
      cart.push(food);
    }

    sessionStorage.setItem('cart', JSON.stringify(cart));
    window.alert(food.name + ' đã được thêm vào giỏ hàng.');

    const cartUpdatedEvent = new CustomEvent('cartUpdated', { detail: cart.length });
    window.dispatchEvent(cartUpdatedEvent);
    updateCartCount(cart);
  }

  if (menu === null) {
    return <Loading />;
  }

  return (
    <div className="container">
      <div className="content" style={{ marginTop: '100px' }}>
        <div>
          <h2 style={{ fontSize: '32px', marginBottom: '20px', textAlign: 'center', color: '#ce1212', fontFamily: 'Kalam, sans-serif' }}>THỰC ĐƠN</h2>
          <p className="p custom-font ">thực đơn trong các nhà hàng <span style={{ color: '#ce1212' }}>của chúng tôi</span></p>
        </div>

        {/* Menu buttons */}
        {menu !== null && Array.isArray(menu) && (
          <div className="button-group flex">
            {menu.map((menuItem) => (
              <span key={menuItem.id}>
                <button
                  className={menuItem.id === (activeMenu || menu[0].id) ? 'active' : ''}
                  onClick={() => handleMenuChange(menuItem.id)}
                >
                  {menuItem.name}
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Menu items */}
        <div className="menu-items flex">
          {menuItems !== null && menuItems.map(item => (
            <div key={item.id} className="menu-item">
              <div className="image-container">
                <img
                  src={item.image}
                  alt={item.name}
                  className="zoomable-image"
                />
              </div>
              <div className="centered-content">
                <h4>{item.name}</h4>
                <p className="price">{item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
              </div>
              <div className="centered-content">
                <button className='btn btn-info' onClick={() => addToCart(item)}>
                  <div>Thêm Vào Giỏ hàng</div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Menu;


