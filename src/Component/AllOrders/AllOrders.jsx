import { useContext, useEffect, useState } from "react";
import "./AllOrders.css";
import React from "react";
import { cartContxt } from "../../Contexts/CartContext";
import axios from "axios";
import LoadingScreen from "./../LoadingScreen/LoadingScreen";

export default function AllOrders() {
  const [allOrders, setAllOrders] = useState(null);
  const [ordersProcess, setGettingOrders] = useState(false);
  async function getAllOrders() {
    const cartOwner = localStorage.getItem("userId") 
    console.log(cartOwner);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${cartOwner}`)
      .then((res) => {
        setAllOrders(res.data.reverse());

        setGettingOrders(false);
      })
      .catch((err) => {
        setGettingOrders(false);
        console.log(err);
      });
  }
  useEffect( function () {
    getAllOrders();
    
  }, []);

  if (!allOrders) {
    return <LoadingScreen />;
  }
  return (
    <>
      <h1 className="pt-4 text-center text-main">Orders History</h1>
      <div className="container py-3 pb-5">
        <div className="row g-3">
          {allOrders?.map((order, idx) => {
            return (
              <div key={idx} className="col-md-4 ">
                <div className="order position-relative overflow-hidden  px-4  py-2">
                  <div className="d-flex my-2 align-items-center justify-content-between">
                    <h5>Payment Method:</h5>
                    <div className="d-flex align-items-center justify-content-end flex-grow-1">
                      <h5 className="h6 mx-4 my-0">
                        {order.paymentMethodType}
                      </h5>
                      <i className="fa-solid fa-credit-card"></i>
                    </div>
                  </div>
                  <div className="d-flex my-2 align-items-center justify-content-between">
                    <h5>Total Price:</h5>
                    <div className="d-flex align-items-center justify-content-end flex-grow-1">
                      <h5 className="h6 mx-4 my-0">
                        {order.totalOrderPrice} EGP
                      </h5>
                      <i className="fa-solid fa-wallet"></i>
                    </div>
                  </div>
                  <div className="d-flex my-2 align-items-center justify-content-between">
                    <h5>Shipping City:</h5>
                    <div className="d-flex align-items-center justify-content-end flex-grow-1">
                      <h5 className="h6 mx-4 my-0">
                        {order.shippingAddress?.city}
                      </h5>
                      <i className="fa-solid fa-location-dot"></i>
                    </div>
                  </div>
                  <div className="d-flex my-2 align-items-center justify-content-between">
                    <h5>Contact Phone: </h5>
                    <div className="d-flex align-items-center justify-content-end flex-grow-1">
                      <h5 className="h6 mx-4 my-0">
                        {order.shippingAddress?.phone}
                      </h5>
                      <i className="fa-solid fa-phone"></i>
                    </div>
                  </div>

                  <div className="order-layer d-flex px-4 py-2 align-items-center justify-content-between">
                    <h5>Created at: </h5>
                    <div className="d-flex align-items-center justify-content-end flex-grow-1">
                      <h5 className="h6 mx-4 my-0">
                        {order.createdAt.split("T")[0]}
                      </h5>
                      <i className="fa-solid fa-calendar-days"></i>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
