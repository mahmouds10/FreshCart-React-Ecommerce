import "./Payment.css";
import React, { useContext, useEffect, useState } from "react";
import img1 from "../../Imgs/payment.svg";
import { useFormik } from "formik";
import axios from "axios";
import { cartContxt } from "../../Contexts/CartContext";
import { ThreeCircles } from "react-loader-spinner";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Payment() {
  const [cashLoading, setcashLoading] = useState(false);
  const [visaLoading, setvisaLoading] = useState(false);
  const orderFormik = useFormik({
    validateOnMount: "true",
    initialValues: {
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
    },

    validate: (values) => {
      const errors = {};
      if (!values.shippingAddress.city) {
        document.getElementById("city").classList.remove("invalid");
        document.getElementById("city").classList.remove("valid");
        errors.shippingAddress = {
          ...errors.shippingAddress,
          city: "City is required",
        };
      } else if (
        !/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/.test(
          values.shippingAddress.city.trim()
        )
      ) {
        document.getElementById("city").classList.add("invalid");
        document.getElementById("city").classList.remove("valid");
        errors.shippingAddress = {
          ...errors.shippingAddress,
          city: "Invalid city name",
        };
      } else {
        document.getElementById("city").classList.remove("invalid");
        document.getElementById("city").classList.add("valid");
      }

      if (!values.shippingAddress.phone) {
        document.getElementById("phone").classList.remove("invalid");
        document.getElementById("phone").classList.remove("valid");
        errors.shippingAddress = {
          ...errors.shippingAddress,
          phone: "Phone is required",
        };
      } else if (
        !/^(?:\+?20|0)?1[0125]\d{8}$/.test(
          values.shippingAddress.phone.trim()
        ) ||
        values.shippingAddress.phone.trim().length < 11
      ) {
        document.getElementById("phone").classList.add("invalid");
        document.getElementById("phone").classList.remove("valid");
        errors.shippingAddress = {
          ...errors.shippingAddress,
          phone: "Invalid phone number",
        };
      } else {
        document.getElementById("phone").classList.remove("invalid");
        document.getElementById("phone").classList.add("valid");
      }
      return errors;
    },

    onSubmit: ({ shippingAddress }) => {
      shippingAddress.city = shippingAddress.city.trim();
      shippingAddress.phone = shippingAddress.phone.trim();
      shippingAddress.details = shippingAddress.details.trim();
    },
  });

  useEffect(() => {
    document.title = "Check Out";
  }, []);
  const backToHome = useNavigate();

  const { cartId, setTotalCartPrice, setNumOfCartItems, setAllProducts } =
    useContext(cartContxt);
  async function createCashOrder(values) {
    setcashLoading(true);
    await axios
      .post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, values, {
        headers: {
          token: localStorage.getItem("tkn"),
        },
      })
      .then((res) => {
        console.log(res);
        setcashLoading(false);
        toast.success("Order placed successfully");
        setAllProducts([]);
        setNumOfCartItems(0);
        setTotalCartPrice(0);
        setTimeout(() => {
          backToHome("/home");
        }, 2000);
      })
      .catch(() => {
        setcashLoading(false);
        toast.error("Error while creating order");
        setTimeout(() => {
          backToHome("/allorders");
        }, 2000);
      });
  }
  async function createVisaOrder(values) {
    setvisaLoading(true);
    await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
        values,
        {
          headers: { token: localStorage.getItem("tkn") },
        }
      )
      .then((res) => {
        console.log(".then ~ res:", res);
        window.open(res.data.session.url);
        setvisaLoading(false);
      })
      .catch((err) => {
        setvisaLoading(false);
        console.log(".catch ~ err:", err);
      });
  }
  return (
    <>
      <div className="w-75 row py-5  mx-auto d-flex justify-content-center align-items-center ">
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <img src={img1} className="w-100" alt="" />
        </div>
        <div className="col-md-6">
          <div className="container">
            <h1>Order info</h1>
            <form onSubmit={orderFormik.handleSubmit}>
              <div className="register">
                <label htmlFor="city">City:</label>
                <input
                  id="city"
                  name="shippingAddress.city"
                  type="text"
                  placeholder="City"
                  onChange={orderFormik.handleChange}
                  onBlur={orderFormik.handleBlur}
                  value={orderFormik.values.shippingAddress.city}
                />
                {orderFormik.values.shippingAddress?.city ? (
                  orderFormik.errors.shippingAddress?.city ? (
                    <h6 className="text-danger">
                      {orderFormik.errors.shippingAddress?.city}
                    </h6>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
              </div>
              <div className="register">
                <label htmlFor="phone">Phone:</label>
                <input
                  id="phone"
                  name="shippingAddress.phone"
                  type="text"
                  placeholder="Phone"
                  onChange={orderFormik.handleChange}
                  onBlur={orderFormik.handleBlur}
                  value={orderFormik.values.shippingAddress.phone}
                />
                {orderFormik.values.shippingAddress?.phone ? (
                  orderFormik.errors.shippingAddress?.phone ? (
                    <h6 className="text-danger">
                      {orderFormik.errors.shippingAddress?.phone}
                    </h6>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
              </div>
              <div className="register">
                <label htmlFor="details">Details:</label>
                <textarea
                  id="details"
                  name="shippingAddress.details"
                  type="text"
                  placeholder="Details"
                  onChange={orderFormik.handleChange}
                  onBlur={orderFormik.handleBlur}
                  value={orderFormik.values.shippingAddress.details}
                />
              </div>
              <div className="d-flex align-items-center flex-column col-md-12  justify-content-evenly">
                <div className="col-lg-12 d-flex  justify-content-center">
                  <button
                  style={{width: "192.125px" , height: "37.7778px"}}
                    id="order-btn"
                    type="submit"
                    onClick={() => {
                      createCashOrder(orderFormik.values);
                    }}
                    className={`
                  ${orderFormik.isValid ? " bg-main " : " invvvalid-btm "} +
                  ${
                    !cashLoading
                      ? " justify-content-between "
                      : "  justify-content-center"
                  }
                  + btn text-white my-2 d-flex align-items-center`}
                  >
                    {cashLoading ? (
                      <ThreeCircles width={30} height={30} color="#fff" />
                    ) : (
                      <>
                        <i className="fa-solid fa-dollar"></i> Confirm cash
                        order
                      </>
                    )}
                  </button>
                </div>
                <div className="col-lg-12 d-flex justify-content-center">
                  <button
                    id="order-cc-btn"
                    onClick={() => {
                      createVisaOrder(orderFormik.values);
                    }}
                    className={`
                  ${orderFormik.isValid ? " bg-main " : " invvvalid-btm "} +
                  ${
                    !visaLoading
                      ? " justify-content-between "
                      : "  justify-content-center"
                  }
                  + btn text-white my-2 d-flex align-items-center`}
                  >
                    {visaLoading ? (
                      <ThreeCircles width={30} height={30} color="#fff" />
                    ) : (
                      <>
                        <i className="fa-solid fa-dollar"></i> Confirm credit
                        order
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
