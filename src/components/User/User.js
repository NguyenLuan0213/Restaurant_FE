import React, { useState, useEffect } from "react";
import Loading from "../layout/Loading";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./user.css";
import Header from "../header/header";
import Footer from "../footer/footer";

const User = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserFromCookie = () => {
            try {
                const userData = Cookies.get("user");
                if (userData) {
                    const decodedUserData = decodeURIComponent(userData);
                    const userDataObject = JSON.parse(decodedUserData);
                    setUser(userDataObject);
                    setLoading(false);
                    console.log("User:", userDataObject);
                } else {
                    setLoading(false);
                    if (!user) { // Sử dụng biến user thay vì userDataObject
                        navigate("/");
                    }
                }
            } catch (error) {
                console.error("Error fetching User:", error);
                setLoading(false);
            }
        };

        if (!user) {
            fetchUserFromCookie();
        }
    }, [user, navigate]);



    if (loading) {
        // Hiển thị loading khi đang tải dữ liệu
        return <Loading />;
    }

    return (
        <>
            <Header />
            <div className="page-content page-container" id="page-content" style={{ marginTop: "70px" }}>
                <div className="padding">
                    <div className="row container d-flex justify-content-center">
                        <div className="col-xl-6 col-md-12">
                            <div className="card user-card-full">
                                <div className="row m-l-0 m-r-0">
                                    <div className="col-sm-4 bg-c-lite-green user-profile">
                                        <div className="card-block text-center text-white">
                                            <div className="m-b-25">
                                                <img
                                                    src={user.image ? user.image : "https://img.icons8.com/bubbles/100/000000/user.png"}
                                                    className="img-radius"
                                                    alt="User-Profile-Image"
                                                />
                                            </div>
                                            <h6 className="f-w-600">{user.fullName}</h6>
                                            <p>{user.roles.join(", ")}</p>
                                            <i className="mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                        </div>
                                    </div>
                                    <div className="col-sm-8">
                                        <div className="card-block">
                                            <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <p className="m-b-10 f-w-600">Email</p>
                                                    <h6 className="text-muted f-w-400">{user.email}</h6>
                                                </div>
                                                <div className="col-sm-6">
                                                    <p className="m-b-10 f-w-600">Phone</p>
                                                    <h6 className="text-muted f-w-400">{user.phoneNumber}</h6>
                                                </div>
                                                <div className="col-sm-6">
                                                    <p className="m-b-10 f-w-600">Nơi sinh</p>
                                                    <h6 className="text-muted f-w-400">{user.address}</h6>
                                                </div>
                                                <div className="col-sm-6">
                                                    <p className="m-b-10 f-w-600">Giới tính</p>
                                                    <h6 className="text-muted f-w-400">{user.gender}</h6>
                                                </div>
                                                <div className="col-sm-6">
                                                    <p className="m-b-10 f-w-600">Ngày sinh</p>
                                                    <h6 className="text-muted f-w-400">{user.birthDay}</h6>
                                                </div>
                                            </div>
                                            <ul className="social-link list-unstyled m-t-40 m-b-10">
                                                <li>
                                                    <a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="facebook" data-abc="true">
                                                        <i className="mdi mdi-facebook feather icon-facebook facebook" aria-hidden="true"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="twitter" data-abc="true">
                                                        <i className="mdi mdi-twitter feather icon-twitter twitter" aria-hidden="true"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="instagram" data-abc="true">
                                                        <i className="mdi mdi-instagram feather icon-instagram instagram" aria-hidden="true"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default User;
