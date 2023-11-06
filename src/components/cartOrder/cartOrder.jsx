import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Loading from '../layout/Loading';
import apis, { authAPI, endpoints } from '../configs/api';
import './cartOrder.css';
import Cookies from 'js-cookie'; // Import thư viện js-cookie
import { format, addHours, isAfter, isBefore } from 'date-fns'; // Import thư viện date-fns
import Header from '../header/header';
import Footer from '../footer/footer';

const isBookingValid = (selectedDateTime) => {
    // Lấy thời gian hiện tại
    const currentTime = new Date();
    // Thêm một giờ vào thời gian hiện tại
    const minimumBookingTime = addHours(currentTime, 1);
    // Kiểm tra xem thời điểm đặt bàn có trước thời gian tối thiểu không
    return isAfter(selectedDateTime, minimumBookingTime);
};

const OrderCart = () => {
    const [formValid, setFormValid] = useState(false);
    const [cart, setCart] = useState([]);
    const [table, setTable] = useState([]);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [complete, setComplete] = useState(false);
    const [addOrderError, setAddOrderError] = useState(false);
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        email: '',
        phone: '',
        datetime: '',
        restaurant: '',
        description: '',
        role: ''
    });

    useEffect(() => {
        // Lấy danh sách sản phẩm từ sessionStorage
        const storedCart = sessionStorage.getItem('cart');

        if (storedCart) {
            // Chuyển đổi chuỗi JSON thành mảng JavaScript
            const parsedCart = JSON.parse(storedCart);
            // Cập nhật biến state 'cart' với danh sách sản phẩm từ sessionStorage
            setCart(parsedCart);
        } else {
        }
    }, []);

    useEffect(() => {
        // Lấy dữ liệu table từ sessionStorage
        const tableData = sessionStorage.getItem('table');
        // Kiểm tra xem dữ liệu có tồn tại không
        if (tableData) {
            const parsedtable = JSON.parse(tableData);
            setTable(parsedtable); // Cập nhật table thành một mảng chứa thông tin bàn
        } else {
        }
    }, []);

    const handleItemCountChange = (e, index) => {
        const updatedCart = [...cart];
        const newCount = parseInt(e.target.value, 10);

        if (!isNaN(newCount) && newCount >= 0) {
            updatedCart[index].count = newCount;
            sessionStorage.setItem('cart', JSON.stringify(updatedCart));
            setCart(updatedCart);
        }
    };


    const handleRemoveItem = (index) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng không?')) {
            const updatedCart = [...cart];
            updatedCart.splice(index, 1); // Xóa sản phẩm khỏi mảng

            sessionStorage.setItem('cart', JSON.stringify(updatedCart));
            setCart(updatedCart);

            const event = new CustomEvent('cartUpdated', { detail: updatedCart.length });
            window.dispatchEvent(event);
        }
    };

    const handleRemoveTable = (index) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa bàn này khỏi giỏ hàng không?')) {
            const updatedTable = [...table];
            updatedTable.splice(index, 1); // Xóa bàn khỏi mảng

            // Cập nhật sessionStorage
            sessionStorage.setItem('table', JSON.stringify(updatedTable));

            // Cập nhật state để cập nhật giao diện
            setTable(updatedTable);
        }
    };
    // Lấy thông tin user từ cookie
    useEffect(() => {
        // Check if the cookie contains user data
        const userFromCookie = Cookies.get("user");
        if (userFromCookie) {
            const userData = JSON.parse(userFromCookie);
            // If there's user data in the cookie, use it to populate the fields
            setFormData((prevFormData) => ({
                ...prevFormData,
                id: userData.id || '',
                name: userData.fullName || '',
                email: userData.email || '',
                phone: userData.phoneNumber || '',
                role: Array.isArray(userData.roles) && userData.roles.length > 0 ? userData.roles[0] : '', // Lấy giá trị đầu tiên nếu roles là một mảng
                datetime: '',
                restaurant: '',
                message: ''
            }));
        }
    }, []);

    const handlePayment = async () => {
        // Kiểm tra nếu giỏ hàng hoặc thông tin bàn bị rỗng
        if (table.length === 0) {
            window.alert('Đặt hàng thất bại. Không có sản phẩm trong đơn hàng hoặc thông tin bàn bị thiếu mời bạn đặt bàn lại.');
            return window.location.href = '/restaurant';
        }

        const restaurantIdOfTable = table[0].restaurantId;
        const mismatchedItems = cart.filter(item => item.restaurantId !== restaurantIdOfTable);

        if (mismatchedItems.length > 0) {
            const mismatchedItemNames = mismatchedItems.map(item => item.name).join(', ');
            window.alert(`Đặt hàng thất bại. Các món ăn sau không thuộc nhà hàng của thông tin bàn: ${mismatchedItemNames}. Vui lòng kiểm tra lại.`);
            return;
        }

        // Gửi thông tin giỏ hàng và thông tin bàn lên server
        const process = async () => {
            try {
                setLoading(true);
                //thực hiện form date
                const selectedDateTime = new Date(formData.datetime);
                // Kiểm tra xem thời điểm đặt bàn có hợp lệ không
                if (!isBookingValid(selectedDateTime)) {
                    alert('Thời gian đặt bàn không hợp lệ. Vui lòng đặt bàn trước 1 giờ.');
                    return;
                }
                const formattedDate = format(selectedDateTime, 'yyyy-MM-dd HH:mm:ss');
                var date = formattedDate

                // Thực hiện thanh toán
                let res = null;
                var statusOrder = "Chưa thanh toán"
                var totalPriceOrder = cart.reduce((total, item) => total + item.count * item.price, 0)
                var newMeanItems = []; // Khởi tạo mảng mới để chứa các đối tượng mean item

                var Idcashier = null;
                if (formData.role === "CASHIER") {
                    Idcashier = formData.id
                }
                console.log(Idcashier)
                // Duyệt qua user để lấy thông tin user
                var user = null;
                console.log(formData.id)
                if (formData.id === null || formData.id === '') {
                    // Nếu formData không null, sử dụng id và role từ formData
                    user = {
                        fullName: formData.name,
                        email: formData.email,
                        phoneNumber: formData.phone,
                        roles: "CUSTOMER"
                    };

                } else {
                    // Nếu formData là null, tạo một user mới với các thông tin từ formData và role là "CUSTOMER"
                    user = {
                        id: formData.id,
                        roles: formData.role
                    };
                }

                console.log(user);

                cart.forEach((item) => {
                    // Tạo một đối tượng mean item mới và thêm vào mảng newMeanItems
                    newMeanItems.push({
                        menuItemId: item.id,
                        quantity: item.count,
                        totalPrice: item.count * item.price,
                    });
                });
                var tableID = 0;
                table.forEach((item) => {
                    tableID = item.id;
                });
                // Thêm thông tin giỏ hàng vào formData
                let requestData = {
                    customerId: user.id,
                    tableId: tableID,
                    orderTime: date,
                    status: statusOrder,
                    totalPrice: totalPriceOrder,
                    cashierId: Idcashier,
                    meanItems: newMeanItems,
                    customer: user
                };
                console.log(requestData)
                res = await apis.post(endpoints['orders'], requestData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                console.log(res.data);

                setComplete(true);
                // Nếu thanh toán thành công
                setPaymentSuccess(true);

                // Xóa giỏ hàng và thông tin bàn từ sessionStorage
                sessionStorage.removeItem('cart');
                sessionStorage.removeItem('table');
                sessionStorage.removeItem('restaurant');
                setCart([]);
                setTable([]);
                setRestaurantData([]);

                const event = new CustomEvent('cartUpdated', { detail: 0 });
                window.dispatchEvent(event);

                window.alert('Đặt bàn thành công. Mời đặt bàn tiếp');
                window.location.href = '/restaurant';
            } catch (ex) {
                console.error(ex);
                setAddOrderError(true);
                setPaymentSuccess(false);
            } finally {
                setLoading(false);
            }
        };
        process();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        const isFormValid = Object.values(formData).every(val => val !== '');
        setFormValid(isFormValid);
    };

    const [restaurantData, setRestaurantData] = useState([]);

    useEffect(() => {
        // Lấy danh sách sản phẩm từ sessionStorage
        const storedRestaurant = sessionStorage.getItem('restaurant');

        if (storedRestaurant) {
            // Chuyển đổi chuỗi JSON thành mảng JavaScript
            const parsedRes = JSON.parse(storedRestaurant);
            // Cập nhật biến state 'cart' với danh sách sản phẩm từ sessionStorage
            setRestaurantData(parsedRes);
        } else {
        }
    }, []);

    return (
        <>
            <Header />
            <div className="cart" style={{ marginTop: '100px' }}>
                <div className="container border">
                    <div className='row-8 mt-2'>
                        <h2 className='h2Custum'>GIỎ HÀNG</h2>
                        {cart.length === 0 && table.length === 0 && (
                            <div className="emptyCart">
                                <p className='h3Custum'>Giỏ hàng của bạn đang trống. Vui lòng nhắn nút dưới để đặt bàn</p>
                                <button className='btn btn-info '>
                                    <a className='text-white' href="/restaurant">Đặt bàn</a>
                                </button>
                            </div>
                        )}
                        {cart.length > 0 && (
                            <>
                                <h4 className='h3Custum'>THÔNG TIN MÓN ĂN</h4>
                                {cart.map((item, index) => (
                                    <div key={index} >
                                        <div className="cartItemRow">
                                            <div>
                                                <img src={item.image} alt={item.name} />
                                            </div>
                                            <div className='name_of_product'>
                                                <span>{item.name}</span>
                                            </div>
                                            <div>
                                                <span>{item.price} VNĐ</span>
                                            </div>
                                            <div className='input_count'>
                                                <input
                                                    type="number"
                                                    value={item.count}
                                                    style={{ width: '50px' }}
                                                    onChange={(e) => handleItemCountChange(e, index)}
                                                />
                                            </div>
                                            <div>
                                                <span>{item.count * item.price} VND</span>
                                            </div>
                                            <div>
                                                <button className="delete-button" onClick={() => handleRemoveItem(index)}>Xóa</button>
                                            </div>
                                            <div>
                                                <input
                                                    type="text"
                                                    value={item.description}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}

                        {table.length > 0 && (
                            <>
                                <h4 className='h3Custum'>THÔNG TIN BÀN</h4>
                                {table.map((item, index) => (
                                    <div key={index} >
                                        <div className="cartItemRow">
                                            <div>
                                                <img src="https://res.cloudinary.com/dkba7robk/image/upload/v1696587759/l6ivwn8vcxgmpcnds7m5.jpg" alt={item.tableNumber} />
                                            </div>
                                            <div className='name_of_product'>
                                                <span>{item.tableNumber}</span>
                                            </div>
                                            <div>
                                                <span>{item.status}</span>
                                            </div>
                                            <div>
                                                <span>{item.restaurantId}</span>
                                            </div>
                                            <div>
                                                <button className="delete-button" onClick={() => handleRemoveTable(index)}>Xóa</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                        <div className='row-8 mt-2'>
                            <h2 className='h2Custum'>THÔNG TIN ĐẶT BÀN</h2>
                            <p className='custom-font' style={{ textAlign: 'center', fontSize: '22px' }}>Vui lòng đăng ký đặt bàn dùng bữa <span style={{ color: '#ce1212' }}>trước 1 giờ</span></p>
                            <form className="php-email-form container" data-aos="fade-up" data-aos-delay="100">
                                <div className="row mt-3">
                                    <div className="col">
                                        <div className='remind'>Họ Tên (*)</div>
                                        <input type="text" name="name" className="form-control" id="name" placeholder="Nhập Tên" required onChange={handleInputChange} value={formData.name} />
                                    </div>
                                    <div className="col">
                                        <div className='remind'>Email (*)</div>
                                        <input type="email" className="form-control" name="email" id="email" placeholder="Nhập Email" required onChange={handleInputChange} value={formData.email} />
                                    </div>
                                    <div className="col">
                                        <div className='remind'>Số Điện Thoại (*)</div>
                                        <input type="text" className="form-control" name="phone" id="phone" placeholder="Nhập SĐT" required onChange={handleInputChange} value={formData.phone} />
                                    </div>
                                </div>
                                <div className='flex between' style={{ flexWrap: 'wrap' }}>
                                    <div className="col">
                                        <div className='remind'>Chi Nhánh Nhà Hàng: </div>
                                        <div style={{ marginLeft: "15px" }}>
                                            <span style={{ color: "red" }}>{restaurantData.name}</span>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className='remind'>Ngày Giờ Đặt (*)</div>
                                        <input
                                            type="datetime-local" // Sử dụng datetime-local
                                            name="datetime"
                                            className="date-picker"
                                            id="datetime"
                                            required
                                            onChange={handleInputChange}
                                            value={formData.datetime}
                                            lang="en"
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <textarea className="form-control textarea" name="message" rows="5" placeholder="Tin Nhắn" onChange={handleInputChange} value={formData.message}></textarea>
                                </div>
                                <div>
                                    <div className="error-message"></div>
                                    {formValid && <div className="sent-message">Bạn đã điền đầy đủ và đặt bàn thành công. Xin cảm ơn !!!</div>}
                                </div>
                            </form>
                        </div>

                        <div className='row-4' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div className="cartTotal">
                                <span className='p-size'>Tổng tiền: {cart.reduce((total, item) => total + item.count * item.price, 0)} VND</span>
                            </div>
                            {loading && <Loading />}
                            <button className="btn btn-primary" onClick={handlePayment}>Đặt Bàn</button>
                        </div>
                        {paymentSuccess && (
                            <div className="payment-success">
                                <p>Thanh toán thành công!</p>
                            </div>
                        )}
                        {addOrderError && (
                            <div className="add-order-error">
                                <p>Thanh toán thất bại. Vui lòng thử lại.</p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
            <Footer />
        </>
    );
};

export default OrderCart;
