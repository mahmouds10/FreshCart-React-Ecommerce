import { useFormik } from "formik";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { ThreeCircles } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { authContext } from "./../../Contexts/Authentication";

export default function ResetPassword() {
  const [isloading, setIsloading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const { tokeen, setToken } = useContext(authContext);

  // Validate Mail
  function checkMail() {
    const mailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return mailRegex.test(document.getElementById("resetPasswordMail").value.trim());
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
    document.title = "Reset Password";
    myValidate(checkMail, "resetPasswordMail", "resetPasswordMailErr");

    if (
      document.getElementById("resetPasswordMail").value &&
      document.getElementById("submitPassword").value
    ) {
      document.getElementById("reset-btn").classList.add("valid-btn");
    }
    tooglePassword();
  }, []);

  const resetPassword = {
    email: "",
    newPassword: "",
  };
  async function resetPssword(values) {
    await axios
      .put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", values)
      .then((res) => {
        setIsloading(false);
        Swal.fire({
          title: "Passsword changed",
          icon: "success",
          confirmButtonText: "Login",
        }).then(() => {
          setIsDisabled(false);
          goToHome("/login");
        });
      })
      .catch((err) => {
        console.log(values);
        console.log(err.response);
        Swal.fire({
          title: "ERROR",
          text: err.response.data.message,
          icon: "error",
        });
        setIsloading(false);
        setIsDisabled(false);
      });
  }
  const resetPasswordFormik = useFormik({
    initialValues: resetPassword,
    onSubmit: (values) => {
      setIsDisabled(true);
      setIsloading(true);
      values.email = values.email.trim();
      values.newPassword = values.newPassword.trim();
      resetPssword(values);
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
      if (!values.newPassword) {
        errors.newPassword = "Password is required";
      } else if(
        !/^.{8,}$/.test(values.newPassword) ||
        !/^(?=.*[A-Z]).+$/.test(values.newPassword) ||
        !/^(?=.*[a-z]).+$/.test(values.newPassword) ||
        !/^(?=.*[\W_]).+$/.test(values.newPassword) ||
        !/^(?=.*\d).+$/.test(values.newPassword)
      ) {
        errors.newPassword = "Invalid password";
      }

      return errors;
    }

  });

  // Toogle Password
  function tooglePassword() {
    document.getElementById("submitPassword").addEventListener("input", function () {
      if (document.getElementById("submitPassword").value != "") {
        document.getElementById("showPassword").style.display = "block";
        document
          .getElementById("showPassword")
          .addEventListener("click", function () {
            document.getElementById("submitPassword").type = "text";
            document.getElementById("showPassword").style.display = "none";
            document.getElementById("hidePssword").style.display = "block";
          });
        document
          .getElementById("hidePssword")
          .addEventListener("click", function () {
            document.getElementById("submitPassword").type = "password";
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
          <h2>Enter new password</h2>
          <form className="register" onSubmit={resetPasswordFormik.handleSubmit}>
            <div>
              <label htmlFor="resetPasswordMail">Mail</label>
              <input
                name="email"
                value={resetPasswordFormik.values.email}
                onBlur={resetPasswordFormik.handleBlur}
                onChange={resetPasswordFormik.handleChange}
                type="text"
                placeholder="Mail"
                className="form-control mb-2"
                id="resetPasswordMail"
              />
              <h6
                style={{ display: "none" }}
                id="resetPasswordMailErr"
                className="text-danger"
              >
                Email is invalid
              </h6>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <div className="position-relative">
                <input
                  name="newPassword"
                  value={resetPasswordFormik.values.newPassword}
                  onBlur={resetPasswordFormik.handleBlur}
                  onChange={resetPasswordFormik.handleChange}
                  type="password"
                  placeholder="Password"
                  className="form-control mb-2"
                  id="submitPassword"
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
              {resetPasswordFormik.values.newPassword ? (
                resetPasswordFormik.errors.newPassword || resetPasswordFormik.touched.newPassword ? (
                  <h6 className="text-danger">{resetPasswordFormik.errors.newPassword}</h6>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </div>
            <button
              type="submit"
              className={
                resetPasswordFormik.isValid &&
                resetPasswordFormik.values.email != "" &&
                resetPasswordFormik.values.password != ""
                  ? "valid-btn"
                  : ""
              }
              disabled={isDisabled}
              id="reset-btn"
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
                "ٌReset Password"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
