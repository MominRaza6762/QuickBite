import  { useEffect, useState } from 'react'
import './Orders.css'
import { toast } from "react-toastify"
import axios from "axios"

const Orders = ({ url }) => {

    const [orders, setOrders] = useState([]);

    const fetchAllOrders = async () => {
        const response = await axios.get(url + "/api/order/list");
        if (response.data.success) {
            setOrders(response.data.data);
            console.log(response.data.data);
        }
        else {
            toast.error("Error")
        }
    }

    useEffect(() => {
        fetchAllOrders();

    }, [])
    console.log(orders)

    function formatDateAndTime(isoString) {
        const dateObj = new Date(isoString);
      

        const year = String(dateObj.getFullYear()).slice(2);
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        const formattedDate = `${year}/${month}/${day}`;
      

        const hours = String(dateObj.getHours()).padStart(2, '0');
        const minutes = String(dateObj.getMinutes()).padStart(2, '0');
        const seconds = String(dateObj.getSeconds()).padStart(2, '0');
        const formattedTime = `${hours}:${minutes}:${seconds}`;
      
        return {
          date: formattedDate,
          time: formattedTime
        };
      }
      

    return (
        <div className='list add flex-col'>
            <p>Orders List</p>
            <div className="list-table">
                <div className="list-table-format tital">
                    <b>order Id</b>
                    <b style={{marginLeft:"100px"}}>Payment</b>
                    <b>Date</b>
                    <b style={{marginLeft:"58px"}}>Price</b>
                    <b style={{marginLeft:"20px"}}>status</b>
                </div>
                {orders.map((order, index) => {
                    return (
                        <div key={index} className='list-table-format'>
                            <p>{order._id}</p>
                            <p style={{marginLeft:"45px"}}>{order.payemnt?"✅":"X"}</p>
                            <p style={{marginRight:"200px"}}>{`${formatDateAndTime(order.date).time}, ${formatDateAndTime(order.date).date}`}</p>
                            <p>${order.amount}</p>
                            <p className='cursor'>{order.status}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Orders