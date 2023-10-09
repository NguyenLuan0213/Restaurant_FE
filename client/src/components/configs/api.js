import axios from "axios";
import cookie from "react-cookies";

const SERVER = 'https://localhost:7274/api'

export const endpoints = {

    'login': `/authentication/login`,
    'register': `/authentication/registry`,
    'current-user': (username) => `/authentication/user?username=${username}`,
    'menu': `/menus`,
    'menuItems': (menuId) => `/menuitem/menu/${menuId}`,
    'tables': (resId) => `/tables/restaurant/${resId}`,
    'restaurants': `/restaurantsbr`,
    'orders': `/orders/byall`,
    'PayByPhone': (phone) => `/orders/pay/customer/${phone}`,
    'PayById': (Id) => `/orders/pay/${Id}`,
    'makePayment': (Id) => `/orders/paySuccces/${Id}`,
}
export const authAPI = () => {
    const token = cookie.load('token');
    const headers = {
        'Content-Type': 'multipart/form-data'
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    return axios.create({
        baseURL: SERVER,
        headers: headers
    });
};

export default axios.create({
    baseURL: SERVER

})