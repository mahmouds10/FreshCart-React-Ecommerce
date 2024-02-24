import { useFormik } from "formik";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { ThreeCircles } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "./../../Contexts/Authentication";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const [isloading, setIsloading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const { setToken , setuserID } = useContext(authContext);

  // Validate Mail
  function checkMail() {
    const mailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return mailRegex.test(document.getElementById("loginMail").value.trim());
  }

  function myValidate(check, inputID, errMsgID) {
    document.getElementById(inputID).addEventListener("input", () => {
      if (document.getElementById(inputID).value === "") {
        document.getElementById(errMsgID).style.display = "none";
        document.getElementById(inputID).classList.remove("valid");
        document.getElementById(inputID).classList.remove("invalid");
      } else if (!check()) {
        document.getElementById(errMsgID).style.display = "block";
        document.getElementById(inputID).classList.add("invalid");
        document.getElementById(inputID).classList.remove("valid");
      } else {
        document.getElementById(errMsgID).style.display = "none";
        document.getElementById(inputID).classList.add("valid");
        document.getElementById(inputID).classList.remove("invalid");
      }
    });
  }

  const goToHome = useNavigate();
  useEffect(() => {
    document.title = "Login";
    myValidate(checkMail, "loginMail", "loginMailErr");

    if (
      document.getElementById("loginMail").value &&
      document.getElementById("Password").value
    ) {
      document.getElementById("login-btn").classList.add("valid-btn");
    }
    tooglePassword();
    return () => {};
  }, []);

  const loginData = {
    email: "",
    password: "",
  };
  async function login(values) {
    await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then((res) => {
        setIsloading(false);
        localStorage.setItem("tkn", res.data.token);
        localStorage.setItem("userId", jwtDecode(res.data.token).id);
        setToken(res.data.token);
        Swal.fire({
          title: "Authentication completed",
          text: "Welcome Back",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          setIsDisabled(false);
          goToHome("/Home");
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "ERROR",
          text: err?.response?.data.message,
          icon: "error",
        });
        setIsloading(false);
        setIsDisabled(false);
      });
  }
  const loginFormik = useFormik({
    initialValues: loginData,
    onSubmit: (values) => {
      setIsDisabled(true);
      setIsloading(true);
      values.email = values.email.trim();
      values.password = values.password.trim();
      login(values);
    },

    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = "Email is required";
      } else if (
        !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          values.email.trim()
        )
      ) {
        errors.email = "Invalid email address";
      }
      if (!values.password) {
        errors.password = "Password is required";
      } else if (values.password.length < 8) {
        errors.password = "Password must be at least 8 characters";
      }

      return errors;
    },
  });

  // Toogle Password
  function tooglePassword() {
    document.getElementById("Password").addEventListener("input", function () {
      if (document.getElementById("Password").value !== "") {
        document.getElementById("showPassword").style.display = "block";
        document
          .getElementById("showPassword")
          .addEventListener("click", function () {
            document.getElementById("Password").type = "text";
            document.getElementById("showPassword").style.display = "none";
            document.getElementById("hidePssword").style.display = "block";
          });
        document
          .getElementById("hidePssword")
          .addEventListener("click", function () {
            document.getElementById("Password").type = "password";
            document.getElementById("showPassword").style.display = "block";
            document.getElementById("hidePssword").style.display = "none";
          });
      } else {
        document.getElementById("showPassword").style.display = "none";
        document.getElementById("hidePssword").style.display = "none";
      }
    });
  }

  return (
    <>
      <div
        className="w-75 m-auto  d-flex align-items-center justify-content-center"
        style={{ minHeight: 77 + "vh" }}
      >
        <div className="col-12">
          <h2>Login Now</h2>
          <form className="register" onSubmit={loginFormik.handleSubmit}>
            <div>
              <label htmlFor="loginMail">Mail</label>
              <input
                name="email"
                value={loginFormik.values.email}
                onBlur={loginFormik.handleBlur}
                onChange={loginFormik.handleChange}
                type="text"
                placeholder="Mail"
                className="form-control mb-2"
                id="loginMail"
              />
              <h6
                style={{ display: "none" }}
                id="loginMailErr"
                className="text-danger"
              >
                Email is invalid
              </h6>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <div className="position-relative">
                <input
                  name="password"
                  value={loginFormik.values.password}
                  onBlur={loginFormik.handleBlur}
                  onChange={loginFormik.handleChange}
                  type="password"
                  placeholder="Password"
                  className="form-control mb-2"
                  id="Password"
                />
                <i
                  id="showPassword"
                  className="fa-solid fa-eye position-absolute top-50"
                ></i>
                <i
                  id="hidePssword"
                  className="fa-solid fa-eye-slash position-absolute top-50"
                ></i>
              </div>
              {loginFormik.values.password ? (
                loginFormik.errors.password || loginFormik.touched.password ? (
                  <h6 className="text-danger">{loginFormik.errors.password}</h6>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </div>
            <div>
              <Link to="/forgetpassword/entermail">Forget Password?</Link>
            </div>
            <button
              type="submit"
              className={
                loginFormik.isValid &&
                loginFormik.values.email !== "" &&
                loginFormik.values.password !== ""
                  ? "valid-btn"
                  : ""
              }
              disabled={isDisabled}
              id="login-btn"
            >
              {isloading ? (
                <ThreeCircles
                  visible={true}
                  height="30"
                  width="30"
                  color="#fff"
                  ariaLabel="three-circles-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
