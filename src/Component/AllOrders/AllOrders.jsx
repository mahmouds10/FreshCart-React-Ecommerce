import { useContext, useEffect, useState } from "react";
import "./AllOrders.css";
import React from "react";
import { cartContxt } from "../../Contexts/CartContext";
import axios from "axios";
import LoadingScreen from "./../LoadingScreen/LoadingScreen";
import { authContext } from "../../Contexts/Authentication";

export default function AllOrders() {
  const [allOrders, setAllOrders] = useState(null);
  const [ordersProcess, setGettingOrders] = useState(false);

  async function getAllOrders() {
    const userId = localStorage.getItem("userId");
    console.log(userId);
    await axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
      .then((res) => {
        setAllOrders(res.data.reverse());

        setGettingOrders(false);
      })
      .catch((err) => {
        setGettingOrders(false);
        console.log(err);
      });
  }
  useEffect(function () {
    getAllOrders();
  }, []);

  if (!allOrders) {
    return <LoadingScreen />;
  }
  return (
    <>
      {allOrders.length == 0 ? (
        <div className="d-flex align-items-center justify-content-center">
          <h3 className="text-muted">No orders</h3>
        </div>
      ) : (
        <div className="container py-3 pb-5">
          <h1 className="pt-4 text-center text-main">Orders History</h1>

          {allOrders?.map((order, idx) => {
            return (
              <div key={idx} className="one-order  my-3">
                <div className="accordion" id={idx}>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#item${idx}`}
                        aria-expanded="false"
                        aria-controls={`item${idx}`}
                      >
                        Total pricee : {order.totalOrderPrice}
                      </button>
                    </h2>
                    <div
                      id={`item${idx}`}
                      className="accordion-collapse collapse"
                      data-bs-parent={`#${idx}`}
                    >
                      <div className="accordion-body">
                        <div className="container">
                          <div className="col-12 border-1 border-bottom">
                            <h3>Order Items</h3>
                          </div>
                          {order.cartItems.map((cartItem, idx) => {
                            return (
                              <div
                                className="row my-1 rounded-3 border-1 border align-items-center"
                                key={idx}
                              >
                                <div className="col-md-2 col-4">
                                  <img
                                    style={{ width: "35%" }}
                                    src={cartItem.product.imageCover}
                                    alt=""
                                  />
                                </div>
                                <div className="col-md-8 col-5">
                                  <h4>{cartItem.product.title}</h4>
                                  <span>{"Number of items: "}</span>
                                  <span>{cartItem.count}</span>
                                </div>
                                <div className="col-md-2 col-1">
                                  <span>{cartItem.price}EGP</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-1 py-3 border footerrr">
                  <div className="container">
                    <div className="d-flex flex-wrap">
                      <div className="col-lg-3 col-6">
                        <h6 className="d-inline text-main">Adress:</h6>
                        <h6 className="d-inline ps-1">
                          {order.shippingAddress.city}
                        </h6>
                      </div>
                      <div className="col-lg-3 col-6">
                        <h6 className="d-inline text-main">Phone:</h6>
                        <h6 className="d-inline ps-1">
                          {order.shippingAddress.phone}
                        </h6>
                      </div>
                      <div className="col-lg-3 col-6">
                        <h6 className="d-inline text-main">Payment Status:</h6>
                        <h6 className="d-inline ps-1">
                          {order.isPaid ? "Paid" : "Not Paid"}
                        </h6>
                      </div>
                      <div className="col-lg-3 col-6">
                        <h6 className="d-inline text-main">Payment Method:</h6>
                        <h6 className="d-inline ps-1">
                          {order.paymentMethodType}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
