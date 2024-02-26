import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import React, { useEffect } from "react";
import logo from "../../Imgs/freshcart-logo.svg";
import { useContext } from "react";
import { authContext } from "./../../Contexts/Authentication";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";
import Headroom from "react-headroom";
import { cartContxt } from "./../../Contexts/CartContext";

export default function Navbar() {
  const { numOfCartItems } = useContext(cartContxt);
  const { token, setToken } = useContext(authContext);

  const goToRegister = useNavigate();

  function logout() {
    Swal.fire({
      title: "Are you sure?",
      text: "You are leaving your account",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, logout!",
      cancelButtonText: "No, Continue buying",
    }).then((result) => {
      if (result.isConfirmed) {
        setToken(null);
        localStorage.removeItem("tkn");
        localStorage.removeItem("userId");
        Swal.fire({
          title: "Logged out",
          text: "See You Soon!",
          icon: "success",
        }).then(() => {
          goToRegister("/Register");
        });
      }
    });
  }

  return (
    <Headroom>
      <>
        <nav className="navbar position-sticky top-0 z-2 navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/home">
              <img src={logo} alt="Fresh Cart" />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse r"
              id="navbarSupportedContent"
            >
              {token ? (
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <NavLink
                      id="home-nav"
                      className="nav-link"
                      aria-current="page"
                      to="/Home"
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      id="products-nav"
                      className="nav-link"
                      to="/Products"
                    >
                      Products
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link d-flex align-items-center"
                      to="/cart"
                    >
                      Cart
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link d-flex align-items-center"
                      to="/brands"
                    >
                      Brands
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/allorders">
                      Orders
                    </NavLink>
                  </li>
                </ul>
              ) : (
                ""
              )}

              <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-cente gap-2">
                <ul className="social-list list-unstyled d-flex align-items-center gap-3">
                  <li>
                    <a
                      target="_blank"
                      href="https://www.facebook.com/profile.php?id=100071474855041"
                    >
                      <i className="fa-brands fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      href="https://www.instagram.com/m_o_3_g_z?fbclid=IwAR2tZL8f9vYdhDXCKWdVvl8syqVp5oh2mxMQbpcZV5udPLwKHSyUIjOatYU"
                    >
                      <i className="fa-brands fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      href="https://www.linkedin.com/in/mahmoud-sayed-15a66a2a8/"
                    >
                      <i className="fa-brands fa-linkedin"></i>
                    </a>
                  </li>
                  <li>
                    <a target="_blank" href="https://twitter.com/lukamodric10">
                      <i className="fa-brands fa-x-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a target="_blank" href="mailto:mahmoudsayed1612@gmail.com">
                      <i className="fa-solid fa-envelope"></i>
                    </a>
                  </li>

                  <li>
                    <a target="_blank" href="https://github.com/mahmouds10">
                      <i className="fa-brands fa-github"></i>
                    </a>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link d-flex align-items-center"
                      to="/cart"
                    >
                      <i
                        style={{ fontSize: "20px" }}
                        className="fa-solid h6 mb-0 fa-cart-shopping position-relative"
                      >
                        {numOfCartItems ? (
                          <span
                            style={{ fontSize: "8px", top: "-4px" }}
                            className="position-absolute  d-flex align-items-center start-100 translate-middle badge bg-main  rounded-pill bg-danger"
                          >
                            {numOfCartItems}
                          </span>
                        ) : (
                          <></>
                        )}
                      </i>
                    </NavLink>
                  </li>
                </ul>
                {!token ? (
                  <>
                    <li className="nav-item">
                      <NavLink id="login-nav" className="nav-link" to="/login">
                        Login
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        id="register-nav"
                        className="nav-link"
                        to="/register"
                      >
                        Register
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <li className="nav-item">
                    <span role="button" onClick={logout} className="nav-link">
                      Logout
                    </span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </>
    </Headroom>
  );
  console.log("🚀 ~ Navbar ~ token:", token);
}
