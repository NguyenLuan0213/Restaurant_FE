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
  const [activeMenu, setActiveMenu] = useState(null); // Khởi tạo activeMenu là null

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

  function addToCart(food) {
    // Lấy danh sách sản phẩm từ sessionStorage
    var cart = JSON.parse(sessionStorage.getItem('cart'));

    // Kiểm tra xem cart có tồn tại và không phải là null
    if (cart) {
      // Tìm sản phẩm trong giỏ hàng theo id
      var existingFood = cart.find(item => item.id === food.id);

      if (existingFood) {
        // Nếu sản phẩm đã tồn tại trong giỏ hàng, tăng số lượng lên 1
        existingFood.count += 1;
      } else {
        // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm nó vào danh sách
        food.count = 1;
        cart.push(food);
      }

      // Lưu lại danh sách giỏ hàng mới vào sessionStorage
      sessionStorage.setItem('cart', JSON.stringify(cart));

      // Để biết là sản phẩm đã được thêm vào giỏ hàng
      console.log(food.name + ' đã được thêm vào giỏ hàng.');
    }
  }



  if (menu === null) {
    return <Loading />;
  }

  return (
    <div className="container">
      <div className="content" style={{ marginTop: '100px' }}>
        <div>
          <h2 style={{ fontSize: '32px', marginBottom: '20px', textAlign: 'center', color: '#ce1212' }}>Thực Đơn</h2>
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
                <p className="price">{item.price} VNĐ</p>
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


