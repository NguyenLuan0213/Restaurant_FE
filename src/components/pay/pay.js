import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './pay.css';
import '../default.css';
import '../register/register.js';

const Registry = () => {
  const [formData, setFormData] = useState({
    Username: '',
    Password: '',
    confirmPassword: '',
    Name: '',
    Email: '',
    PhoneNumber: '',
    Address: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
  };

  return (
    <div className="pay">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-10 col-xl-9 mx-auto">
            <div className="card flex-row my-5 border-0 shadow rounded-3 overflow-hidden">
              <div className="card-body p-4 p-sm-5">
                <h2>Thanh Toán</h2>
                <p className='p custom-font' style={{ margin: '20px 0' }}>Thanh Toán  <span style={{ color: '#ce1212' }}>Online</span></p>
                <form onSubmit={handleSubmit}>
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInputUsername"
                      placeholder="myusername"
                      required
                      autoFocus
                      name="Username"
                      value={formData.Username}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="floatingInputUsername">Username</label>
                  </div>

                  <div className="form-floating">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Password"
                      required
                      name="Password"
                      value={formData.Password}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="password">Password</label>
                  </div>

                  <div className="form-floating">
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      placeholder="Confirm Password"
                      required
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="confirmPassword">Nhập Lại Password</label>
                    <span id="passwordMatch"></span>
                  </div>

                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInputName"
                      placeholder="NguyenVanA"
                      name="Name"
                      value={formData.Name}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="floatingInputName">Họ Tên</label>
                  </div>

                  <div className="form-floating">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInputEmail"
                      placeholder="name@example.com"
                      name="Email"
                      value={formData.Email}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="floatingInputEmail">Email</label>
                  </div>

                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="phoneNumber"
                      placeholder="08..."
                      required
                      name="PhoneNumber"
                      value={formData.PhoneNumber}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="phoneNumber">Số Điện Thoại</label>
                    <span id="phoneNumberError"></span>
                  </div>

                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingAddress"
                      placeholder="26 Đường ..."
                      required
                      name="Address"
                      value={formData.Address}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="floatingAddress">Địa Chỉ</label>
                  </div>
                  <div className='info-true'>Bạn đã thanh toán thành công!</div>
                  <div className='info-false'>Lỗi!!!</div>
                  <div>
                    <button type="submit" className="btn btn-lg btn-primary btn-login fw-bold text-uppercase">Thanh Toán</button>
                  </div>
                  <div className='flex content-link'>Bạn chưa có tài khoản? &ensp;<a className="link small" href="/login"> Đăng ký</a></div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registry;
