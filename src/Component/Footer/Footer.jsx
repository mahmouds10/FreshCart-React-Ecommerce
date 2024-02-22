import "./Footer.css";
import React from "react";
import paypal from "../../Imgs/paypal.svg";
import matercard from "../../Imgs/mastercard.svg";
import americanExpress from "../../Imgs/american-express.svg";
import amazon from "../../Imgs/amazon.svg";
import googlePlay from "../../Imgs/google-play-badge.svg";
import appStore from "../../Imgs/app-store-badge.svg";
export default function Footer() {
  return (
    <>
      <div className="footer mt-auto  text-centertext-start pt-4">
        <div className="container">
          <h3 className="text-black">Get the FreshCart app</h3>
          <p className="text-muted">
            
            We will send you a link, open it on your Phone to download the app.
          </p>
          <div className="container">
            <div className="row mx-auto ">
              <div className="col-md-9 ">
                <input
                  type="text"
                  placeholder="Email"
                  className="w-100 border form-control"
                />
              </div>
              <div className="col-md-3  my-md-0 my-3">
                <button className="w-100  btn bg-main text-white">
                  Get App Link
                </button>
              </div>
            </div>
            <div className="row border-2 my-3 py-4 border-top border-bottom">
              <div className="col-md-6 d-flex align-items-center">
                <h5>Payment Partners</h5>
                <div style={{ width: "20%" }} className="flex-grow-1">
                  <img src={paypal} alt="Paypal" className="col-2 mx-2" />
                  <img src={amazon} alt="Mastercard" className="col-2 mx-2" />
                  <img
                    src={americanExpress}
                    alt="American Express"
                    className="col-2 mx-2"
                  />
                  <img src={amazon} alt="amazon pay" className="col-2 mx-2" />
                </div>
              </div>
              <div className="col-md-6 d-flex align-items-center justify-content-between  gap-md-2 justify-content-md-end ">
                <h5 className="smalled-txt me-0 ">
                  Get deliveries with FreshCart
                </h5>
                <div className="ios-icons m-0 col-3 d-flex justify-content-between ">
                  <img src={googlePlay} alt="Google Play" style={{width:"45%"}}   />
                  <img src={appStore} alt="App Store" style={{width:"45%"}}  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
