import { useFormik } from "formik";
import "./Register.css";
import React, { useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThreeCircles } from "react-loader-spinner";
// import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js'
export default function Register() {
  const gotoLogin = useNavigate();
  const [isloading, setIsloading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  //Validaet Name
  function checkName() {
    const nameRegex = /^[A-Z][a-zA-Z ]{2,}$/;
    return nameRegex.test(document.getElementById("userName").value.trim());
  }
  // Validate Mail
  function checkMail(email) {
    const mailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return mailRegex.test(document.getElementById("userMail").value.trim());
  }
  // Validate Phone Number
  function checkPhone() {
    const phoneRegex = /^(?:\+?20|0)?1[0125]\d{8}$/;
    return (
      phoneRegex.test(document.getElementById("userPhone").value.trim()) &&
      document.getElementById("userPhone").value.trim().length >= 11
    );
  }
  // validate Password
  function validatePassword() {
    document.getElementById("Password").addEventListener("input", () => {
      if (document.getElementById("Password").value !== "") {
        document.getElementById("passwordList").style.display = "block";
        if (/^.{8,}$/.test(document.getElementById("Password").value)) {
          document.getElementById("minLenght").classList.add("correct");
          document.getElementById("minLenght").classList.remove("error");
        } else {
          document.getElementById("minLenght").classList.add("error");
          document.getElementById("minLenght").classList.remove("correct");
        }
        if (/^(?=.*[A-Z]).+$/.test(document.getElementById("Password").value)) {
          document.getElementById("uppercaseCheck").classList.add("correct");
          document.getElementById("uppercaseCheck").classList.remove("error");
        } else {
          document.getElementById("uppercaseCheck").classList.add("error");
          document.getElementById("uppercaseCheck").classList.remove("correct");
        }
        if (/^(?=.*[a-z]).+$/.test(document.getElementById("Password").value)) {
          document.getElementById("lowercaseCheck").classList.add("correct");
          document.getElementById("lowercaseCheck").classList.remove("error");
        } else {
          document.getElementById("lowercaseCheck").classList.add("error");
          document.getElementById("lowercaseCheck").classList.remove("correct");
        }
        if (/^(?=.*[\W_]).+$/.test(document.getElementById("Password").value)) {
          document.getElementById("specialCharCheck").classList.add("correct");
          document.getElementById("specialCharCheck").classList.remove("error");
        } else {
          document.getElementById("specialCharCheck").classList.add("error");
          document
            .getElementById("specialCharCheck")
            .classList.remove("correct");
        }
        if (/^(?=.*\d).+$/.test(document.getElementById("Password").value)) {
          document.getElementById("numCheck").classList.add("correct");
          document.getElementById("numCheck").classList.remove("error");
        } else {
          document.getElementById("numCheck").classList.add("error");
          document.getElementById("numCheck").classList.remove("correct");
        }
        if (
          /^.{8,}$/.test(document.getElementById("Password").value) &&
          /^(?=.*[A-Z]).+$/.test(document.getElementById("Password").value) &&
          /^(?=.*[a-z]).+$/.test(document.getElementById("Password").value) &&
          /^(?=.*[\W_]).+$/.test(document.getElementById("Password").value) &&
          /^(?=.*\d).+$/.test(document.getElementById("Password").value)
        ) {
          document.getElementById("Password").classList.add("valid");
          document.getElementById("Password").classList.remove("invalid");
        } else {
          document.getElementById("Password").classList.remove("valid");
          document.getElementById("Password").classList.add("invalid");
        }
      } else {
        document.getElementById("passwordList").style.display = "none";
        document.getElementById("Password").classList.remove("valid");
        document.getElementById("Password").classList.remove("invalid");
      }
    });
  }
  function checrePassword() {
    document
      .getElementById("rePassword")
      .addEventListener("input", function () {
        if (document.getElementById("rePassword").value != "") {
          if (
            document.getElementById("rePassword").value ==
            document.getElementById("Password").value
          ) {
            document.getElementById("rePassword").classList.add("valid");
            document.getElementById("rePassword").classList.remove("invalid");
            document.getElementById("rePasswordErr").style.display = "none";
          } else {
            document.getElementById("rePassword").classList.add("invalid");
            document.getElementById("rePassword").classList.remove("valid");
            document.getElementById("rePasswordErr").style.display = "block";
          }
        } else {
          document.getElementById("rePassword").classList.remove("valid");
          document.getElementById("rePassword").classList.remove("invalid");
          document.getElementById("rePasswordErr").style.display = "none";
        }
      });
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
  // Toogle Password
  function tooglePassword() {
    document.getElementById("Password").addEventListener("input", function () {
      if (document.getElementById("Password").value != "") {
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
  function tooglerePassword() {
    document
      .getElementById("rePassword")
      .addEventListener("input", function () {
        if (document.getElementById("rePassword").value != "") {
          document.getElementById("showrePassword").style.display = "block";
          document
            .getElementById("showrePassword")
            .addEventListener("click", function () {
              document.getElementById("rePassword").type = "text";
              document.getElementById("showrePassword").style.display = "none";
              document.getElementById("hiderePssword").style.display = "block";
            });
          document
            .getElementById("hiderePssword")
            .addEventListener("click", function () {
              document.getElementById("rePassword").type = "password";
              document.getElementById("showrePassword").style.display = "block";
              document.getElementById("hiderePssword").style.display = "none";
            });
        } else {
          document.getElementById("showrePassword").style.display = "none";
          document.getElementById("hiderePssword").style.display = "none";
        }
      });
  }

  useEffect(() => {
    document.title ="Register"
    myValidate(checkName, "userName", "nameErr");
    myValidate(checkMail, "userMail", "mailerr");
    myValidate(checkPhone, "userPhone", "phoneErr");
    validatePassword();
    checrePassword();
    tooglePassword();
    tooglerePassword();
  }, []);

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Name is required";
    } else if (!/^[A-Z][a-zA-Z ]{2,}$/.test(values.name.trim())) {
      errors.name = "First char must be capital";
    }

    if (!values.email) {
      errors.email = "Email is required";
    } else if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        values.email.trim()
      )
    ) {
      errors.email = "Invalid email address";
    }

    if (!values.phone) {
      errors.phone = "Phone is required";
    } else if (
      !/^(?:\+?20|0)?1[0125]\d{8}$/.test(values.phone.trim()) ||
      values.phone.trim().length < 11
    ) {
      errors.phone = "Invalid phone number";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (
      !/^.{8,}$/.test(document.getElementById("Password").value) ||
      !/^(?=.*[A-Z]).+$/.test(document.getElementById("Password").value) ||
      !/^(?=.*[a-z]).+$/.test(document.getElementById("Password").value) ||
      !/^(?=.*[\W_]).+$/.test(document.getElementById("Password").value) ||
      !/^(?=.*\d).+$/.test(document.getElementById("Password").value)
    ) {
      errors.password = "Invalid password";
    }
    if (!values.rePassword) {
      errors.rePassword = "Re-enter password is required";
    } else if (values.rePassword.trim() !== values.password.trim()) {
      errors.rePassword = "Passwords do not match";
    }


    return errors;
  };

  const registrationData = {
    name: "",
    email: "",
    phone: "",
    password: "",
    rePassword: "",
  };

  const registrationFormik = useFormik({
    initialValues: registrationData,
    onSubmit: function (values) {
      setIsDisabled(true);
      setIsloading(true);
      values.name = values.name.trim();
      values.email = values.email.trim();
      values.phone = values.phone.trim();
      values.password = values.password.trim();
      values.rePassword = values.rePassword.trim();
      register(values);
    },
    validate,
  });
  async function register(values) {
    await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then(() => {
        Swal.fire({
          title: "Registration successful",
          text: "Your account's been created successfully",
          icon: "success",
          showCancelButton: true,
          confirmButtonText: "Login",
          cancelButtonText: "Exit",
        }).then(() => {
          setTimeout(() => {
            gotoLogin("/Login");
          }, 1000);
        });
        setIsloading(false);
        setIsDisabled(false);
      })
      .catch((err) => {
        console.log(err.response);
        Swal.fire({
          title: "ERROR",
          text: err.response.data.message,
          icon: "error",
          confirmButtonText: "Try Again",
        });
        setIsloading(false);
        setIsDisabled(false);
      });
  }
  return (
    <>
      <div
        className="w-75 m-auto py-5 d-flex align-items-center justify-content-center"
        style={{ minHeight: 77 + "vh" }}
      >
        <div className="col-12">
          <h2>Register Now</h2>
          <form className="register" onSubmit={registrationFormik.handleSubmit}>
            <div>
              <label htmlFor="userName">Name</label>
              <input
                name="name"
                value={registrationFormik.values.name}
                onChange={registrationFormik.handleChange}
                onBlur={registrationFormik.handleBlur}
                type="text"
                placeholder="Name"
                className="form-control mb-2"
                id="userName"
              />
              <h6
                style={{ display: "none" }}
                id="nameErr"
                className="text-danger"
              >
                First char must be capital and at least 3 characters.
              </h6>
            </div>
            <div>
              <label htmlFor="userMail">Mail</label>
              <input
                name="email"
                value={registrationFormik.values.email}
                onBlur={registrationFormik.handleBlur}
                onChange={registrationFormik.handleChange}
                type="text"
                placeholder="Mail"
                className="form-control mb-2"
                id="userMail"
              />
              <h6
                style={{ display: "none" }}
                id="mailerr"
                className="text-danger"
              >
                Email is invalid
              </h6>
            </div>
            <div>
              <label htmlFor="userPhone">Phone</label>
              <input
                name="phone"
                value={registrationFormik.values.phone}
                onChange={registrationFormik.handleChange}
                onBlur={registrationFormik.handleBlur}
                type="text"
                placeholder="Phone"
                className="form-control mb-2"
                id="userPhone"
              />
              <h6
                style={{ display: "none" }}
                id="phoneErr"
                className="text-danger"
              >
                Invalid phone number
              </h6>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <div className="position-relative">
                <input
                  name="password"
                  value={registrationFormik.values.password}
                  onBlur={registrationFormik.handleBlur}
                  onChange={registrationFormik.handleChange}
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
              <ul
                style={{ display: "none" }}
                id="passwordList"
                className="password-list"
              >
                <li>
                  <h6 id="minLenght" className="error">
                    At least 8 chars
                  </h6>
                </li>
                <li>
                  <h6 id="uppercaseCheck" className="error">
                    At least 1 uppercase letter
                  </h6>
                </li>
                <li>
                  <h6 id="lowercaseCheck" className="error">
                    At least 1 lowercase letter
                  </h6>
                </li>
                <li>
                  <h6 id="specialCharCheck" className="error">
                    At least 1 special character
                  </h6>
                </li>
                <li>
                  <h6 id="numCheck" className="error">
                    At least 1 number
                  </h6>
                </li>
              </ul>
            </div>
            <div>
              <label htmlFor="rePassword">Re-Password</label>
              <div className="position-relative">
                <input
                  name="rePassword"
                  value={registrationFormik.values.rePassword}
                  onChange={registrationFormik.handleChange}
                  onBlur={registrationFormik.handleBlur}
                  type="password"
                  placeholder="Re-Password"
                  className="form-control mb-2"
                  id="rePassword"
                />
                <i
                  id="showrePassword"
                  className="fa-solid fa-eye position-absolute top-50"
                ></i>
                <i
                  id="hiderePssword"
                  className="fa-solid fa-eye-slash position-absolute top-50"
                ></i>
              </div>
              <h6
                style={{ display: "none" }}
                id="rePasswordErr"
                className="text-danger"
              >
                Password dosen't match.
              </h6>
            </div>
            <button
              type="submit"
              className={
                registrationFormik.isValid &&
                registrationFormik.touched.password
                  ? "valid-btn"
                  : ""
              }
              disabled={isDisabled}
              id="register-btn"
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
                "Register"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
