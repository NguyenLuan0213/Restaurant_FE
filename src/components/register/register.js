import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form } from "react-bootstrap"
import apis, { authAPI, endpoints } from '../configs/api';
import './register.css';
import { Navigate } from 'react-router-dom';
import Loading from '../layout/Loading';
import e from 'cors';

const Register = () => {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [fullName, setFullName] = useState()
  const [email, setEmail] = useState()
  const [phoneNumber, setPhoneNumber] = useState()
  const [address, setAddress] = useState()
  const [gender, setGender] = useState()
  const [birthday, setBirthday] = useState()
  const [loading, setLoading] = useState(false);
  const [registryError, setRegistryError] = useState(false);
  const [complete, setComplete] = useState(false);

  // Hàm kiểm tra mật khẩu
  const isPasswordValid = (value) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])(?=.*[0-9]).{6,}$/;
    return passwordRegex.test(value);
  };

  // Hàm kiểm tra username chỉ chứa chữ và số
  const isUsernameValid = (value) => {
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    return usernameRegex.test(value);
  };

  // Hàm kiểm tra số điện thoại bắt đầu bằng số 0 và có từ 10 đến 11 chữ số
  const isPhoneNumberValid = (value) => {
    const phoneNumber = value.replace(/\s/g, '');
    const phoneNumberRegex = /^0\d{9,10}$/;
    return phoneNumberRegex.test(phoneNumber);
  };


  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!isPasswordValid(password)) {
      alert("Mật khẩu không đáp ứng yêu cầu: phải có ít nhất một chữ hoa, một chữ thường, một ký tự đặc biệt và một chữ số, và phải có ít nhất 6 ký tự.");
      return;
    }

    if (!isUsernameValid(username)) {
      alert("Tên người dùng chỉ được chứa chữ và số.");
      return;
    }

    if (!isPhoneNumberValid(phoneNumber)) {
      alert("Số điện thoại phải bắt đầu bằng số 0 và có từ 10 đến 11 chữ số");
      return;
    }

    const process = async () => {
      try {
        setLoading(true)

        let formData = new FormData()
        let res = null
        // Tạo một đối tượng formData để chứa dữ liệu
        var roles = ["CUSTOMER"];
        formData.append("username", username);
        formData.append("password", password);
        formData.append("fullname", fullName);
        formData.append("email", email);
        formData.append("phoneNumber", phoneNumber);
        formData.append("birthDay", birthday);
        formData.append("address", address);
        formData.append("gender", gender);
        formData.append("roles", roles);
        res = await apis.post(endpoints['register'], formData, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        // Thực hiện gửi dữ liệu đăng ký lên server ở đây
        // Sử dụng axios hoặc fetch để thực hiện HTTP request

        console.log(res.data);

        setComplete(true);
      } catch (ex) {
        console.error(ex);
        setRegistryError(true);
      } finally {
        setLoading(false);
      }
    };
    process()
  };

  if (complete) {
    return (<Navigate to='/login' />); // Sử dụng navigate để chuyển hướng đến trang login
  }

  return (
    <div className="container">
      <div className="registry">
        <div className="row">
          <div className="col-lg-10 col-xl-9 mx-auto">
            <div className="card flex-row my-5 border-0 shadow rounded-3 overflow-hidden">
              <div className="card-body p-4 p-sm-5">
                <p className='p custom-font' style={{ margin: '20px 0' }}> ĐĂNG KÝ</p>
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
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                    />
                    <label htmlFor="floatingInputUsername">Username</label>
                  </div>

                  <div className="form-floating mt-3">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Password"
                      required
                      name="Password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                    <label htmlFor="password">Password</label>
                  </div>

                  <div className="form-floating mt-3">
                    <input
                      type="text"
                      className="form-control"
                      id="FullName"
                      placeholder="NguyenVanA"
                      name="FullName"
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      required
                    />
                    <label htmlFor="FullName">Họ Tên</label>
                  </div>

                  <div className="form-floating mt-3">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInputEmail"
                      placeholder="name@example.com"
                      name="Email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                    />
                    <label htmlFor="floatingInputEmail">Email</label>
                  </div>

                  <div className="form-floating mt-3">
                    <input
                      type="text"
                      className="form-control"
                      id="phoneNumber"
                      placeholder="08..."
                      required
                      name="PhoneNumber"
                      value={phoneNumber}
                      onChange={e => setPhoneNumber(e.target.value)}
                    />
                    <label htmlFor="phoneNumber">Số Điện Thoại</label>
                    <span id="phoneNumberError"></span>
                  </div>

                  <div className="form-floating mt-3">
                    {/* <label htmlFor="floatingBirthday">Ngày Sinh</label> */}
                    <input
                      type="date"
                      className="form-control"
                      id="floatingBirthday"
                      required
                      name="birthday"
                      value={birthday} // Sử dụng formData.birthday thay vì formData.Brithday
                      onChange={e => setBirthday(e.target.value)}
                    />
                  </div>
                  <span id="birthdayError"></span>

                  <div className="form-floating mt-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingAddress"
                      placeholder="26 Đường ..."
                      required
                      name="Address"
                      value={address}
                      onChange={e => setAddress(e.target.value)}
                    />
                    <label htmlFor="floatingAddress">Địa Chỉ</label>
                  </div>

                  <div className="form-floating mt-3">
                    <select
                      className="form-select"
                      id="floatingGender"
                      required
                      name="Gender"
                      value={gender}
                      onChange={e => setGender(e.target.value)}
                    >
                      <option value="">Chọn giới tính</option>
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                    </select>
                    <label htmlFor="floatingGender">Giới tính</label>
                  </div>

                  <div className="row justify-content-center mt-3">
                    {loading && <Loading />}
                    <button type="submit" className="btn btn-lg btn-primary btn-login fw-bold text-uppercase ">ĐĂNG KÝ</button>
                    {registryError && <p className="text-danger">Đăng kí thất bại, bạn nhập thiếu hoặc đã đăng kí</p>}
                  </div>
                  <div className='flex content-link mt-3'>Bạn Đã Có Tài Khoản &ensp;<a className="link" href="/login"> Đăng nhập</a></div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
