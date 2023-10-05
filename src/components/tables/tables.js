import React, { useEffect, useState } from "react";
import { authAPI, endpoints } from "../configs/api";
import Button from 'react-bootstrap/Button';
import './tables.css';
import Loading from "../layout/Loading";

const Tables = () => {
    const [tables, setTables] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState("");
    const [loading, setLoading] = useState(true);
    const [selectionMessage, setSelectionMessage] = useState("");

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await authAPI().get(endpoints.restaurants);
                setRestaurants(response.data);

                // Xác định giá trị mặc định là ID của nhà hàng đầu tiên
                if (response.data.length > 0) {
                    setSelectedRestaurant(response.data[0].id);
                }

                setLoading(false);
            } catch (error) {
                console.error("Error fetching Restaurants:", error);
                setLoading(false);
            }
        };

        fetchRestaurants();
    }, []);

    useEffect(() => {
        if (selectedRestaurant) {
            const fetchTablesByRestaurantId = async () => {
                try {
                    const response = await authAPI().get(endpoints.tables(selectedRestaurant));
                    setTables(response.data);
                    setLoading(false);
                } catch (error) {
                    console.error("Error fetching Tables:", error);
                    setLoading(false);
                }
            };

            fetchTablesByRestaurantId();
        }
    }, [selectedRestaurant]);

    const handleTableButtonClick = (table) => {
        // Kiểm tra nếu trạng thái của bàn là "Chưa đặt" thì lưu thông tin bàn vào sessionStorage
        if (table.status === 'Chưa đặt') {
            const tableInfo = {
                id: table.id,
                tableNumber: table.tableNumber,
                status: table.status,
                restaurantId: table.restaurantId,
            };

            // Lưu thông tin bàn vào sessionStorage
            sessionStorage.setItem('table', JSON.stringify(tableInfo));

            // Hiển thị thông báo "Chọn thành công"
            setSelectionMessage(`Bàn ${table.tableNumber} đã được chọn thành công.`);
        } else {
            // Hiển thị thông báo "Chưa đặt"
            setSelectionMessage(`Bàn ${table.tableNumber} đã được đặt.`);
        }
    };

    return (
        <div className="container" style={{ marginTop: "80px" }}>
            <h1 className="custom-heading text-center">Thông tin bàn còn trống</h1>
            <div className="text-center">
                <label htmlFor="restaurant"></label>
                <select
                    id="restaurant"
                    onChange={(e) => setSelectedRestaurant(e.target.value)}
                    value={selectedRestaurant}
                >
                    <option value="">Chọn Nhà Hàng</option>
                    {restaurants.map((restaurant) => (
                        <option key={restaurant.id} value={restaurant.id}>
                            {restaurant.name}
                        </option>
                    ))}
                </select>
            </div>
            {loading ? (
                <Loading />
            ) : (
                <>
                    {selectionMessage && (
                        <div className="text-center mt-2">
                            <p>{selectionMessage}</p>
                        </div>
                    )}
                    <table className="table">
                        <tbody>
                            {tables.map((table, index) => (
                                <React.Fragment key={table.id}>
                                    {index % 5 === 0 && <tr key={`row-${index / 5}`}></tr>}
                                    <td>
                                        <div>
                                            <button
                                                type="button"
                                                className={`btn ${table.status === 'Chưa đặt' ? 'btn-success' : 'btn-danger'}`}
                                                onClick={() => handleTableButtonClick(table)}
                                            >
                                                Bàn {table.tableNumber} | {table.status}
                                            </button>
                                        </div>
                                    </td>
                                    {index % 5 === 4 && <tr key={`row-${index / 5 + 1}`}></tr>}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default Tables;
