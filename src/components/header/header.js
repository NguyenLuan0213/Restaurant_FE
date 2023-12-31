import React, { useState, useEffect } from 'react';
import './header.css';
import '../default.css';
import { Form, Dropdown, Modal } from 'react-bootstrap';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { MyUserContext } from "../../App";
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const [user, state] = useContext(MyUserContext);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [exit, setExit] = useState(false);
  const navigate = useNavigate();
  // Khởi tạo cartCount từ sessionStorage nếu có hoặc 0 nếu không
  const initialCartCount = parseInt(sessionStorage.getItem('cartCount'), 10) || 0;
  const [cartCount, setCartCount] = useState(initialCartCount);

  // Lắng nghe sự kiện tùy chỉnh để cập nhật số lượng trong giỏ hàng
  useEffect(() => {
    const updateCartCount = (event) => {
      setCartCount(event.detail);
    };

    window.addEventListener('cartUpdated', updateCartCount);

    // Xóa lắng nghe khi thành phần bị hủy
    return () => {
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  // Khôi phục trạng thái giỏ hàng từ sau khi component được tạo
  useEffect(() => {
    const storedCartCount = sessionStorage.getItem('cartCount');
    if (storedCartCount !== null) {
      setCartCount(parseInt(storedCartCount, 10));
    }
  }, []);

  // Lưu trạng thái giỏ hàng vào khi số lượng thay đổi
  useEffect(() => {
    sessionStorage.setItem('cartCount', cartCount.toString());
  }, [cartCount]);

  useEffect(() => {
    if (cartCount === 0) {
      // Reset cartCount về 0 sau khi đặt bàn thành công
      setCartCount(0);
    }
  }, [cartCount]);

  const handleLogout = () => {
    setShowLogoutModal(true); // Khi nhấn nút Đăng Xuất, hiển thị hộp thoại
  };

  const confirmLogout = () => {
    // Xử lý việc đăng xuất ở đây
    state({
      Type: "logout",
    });

    // Sau khi đăng xuất, chuyển hướng đến trang /login
    navigate('/login');

    // Đóng hộp thoại sau khi xác nhận đăng xuất
    setShowLogoutModal(false);
  };

  const cancelLogout = () => {
    // Nếu người dùng hủy đăng xuất, đóng hộp thoại
    setShowLogoutModal(false);
  };

  const [isActive, setIsActive] = useState(false);

  return (
    <div className="header flex header-font">
      <div className="container">
        <header className="p-2 border-bottom">
          <div className="container">
            <div className="d-flex align-items-center justify-content-between">
              <div className='d-flex align-items-center ml-auto mt-2'>
                <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
                  <img src="https://res.cloudinary.com/dkba7robk/image/upload/v1696385680/impchzofm7h23szpxxr8.png" alt="Icon" width="40" height="32" />
                </a>
                <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                  <li><a href="/menu" className="nav-link px-2 link-dark">Thực đơn</a></li>
                  <li><a href="/restaurant" className="nav-link px-2 link-dark">Nhà Hàng</a></li>
                  <li><a href="/pay" className="nav-link px-2 link-dark">Đơn hàng</a></li>
                </ul>
              </div>

              <div>
                <ul className='d-flex align-items-center ml-auto mt-2'>
                  <li className='customCart'>
                    <a href="/cartOrder" className="nav-link px-2 link-dark">
                      <FontAwesomeIcon icon={faCartShopping} className='fa-2x' />
                      <span className="cart-count">{cartCount}</span>
                    </a>
                  </li>
                  <Form className="col-12 col-lg-auto mb-3 mb-lg-0 ">
                    <input type="search" className="form-control" placeholder="Search..." aria-label="Search" />
                  </Form>
                  {user !== null && user.roles === !null ? (
                    <>
                    </>
                  ) : (
                    <></>
                  )
                  }
                  {user === null || user === undefined ? (
                    <>
                      <Link to="/register" className="btn-regis mx-2">
                        Đăng Ký
                      </Link>
                      <Link to="/login/" className="btn-login">
                        Đăng Nhập
                      </Link>
                    </>
                  ) : (
                    <>
                      <Dropdown className="text-end me-lg-3 ml-3">
                        <span className="navbar-text mx-2">Chào {user.fullName}</span>
                        <Dropdown.Toggle variant="link" id="dropdownUser1">
                          <img src={user.image} alt="mdo" width="32" height="32" className="rounded-circle" />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item href="/current-user">THÔNG TIN CÁ NHÂN</Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item href="" onClick={handleLogout}>ĐĂNG XUẤT</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </header >
      </div >
      {/* Hộp thoại xác nhận đăng xuất */}
      < Modal show={showLogoutModal} onHide={cancelLogout} >
        <Modal.Header closeButton>
          <Modal.Title>Xác Nhận Đăng Xuất</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có muốn đăng xuất khỏi tài khoản?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelLogout}>
            Hủy
          </Button>
          <Button variant="primary" onClick={confirmLogout}>
            Đăng Xuất
          </Button>
        </Modal.Footer>
      </Modal >
    </div >
  );
}

export default Header;
