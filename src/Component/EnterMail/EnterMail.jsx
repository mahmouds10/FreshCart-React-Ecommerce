import { useFormik } from "formik";
import React, { useState } from "react";
import { ThreeCircles } from "react-loader-spinner";
import { useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function EnterMail() {
  const enterSubmitCode =useNavigate()
  const [isloading, setIsloading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  function checkMail() {
    const mailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return mailRegex.test(document.getElementById("confirmMail").value.trim());
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
  useEffect(() => {
    document.title = "Reset Password";
    document.getElementById("login-nav").classList.remove("clicked");
    myValidate(checkMail, "confirmMail", "confirmMailErr");
  }, []);
  async function sendmail(values) {
    await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      )
      .then(function () {
        setIsloading(false);
        setIsDisabled(false);
        Swal.fire({
          title: "Message sent successfully",
          text: "Check your email",
          icon: "success",
        }).then(function () {
          enterSubmitCode('/forgetpassword/entersubmitcode')
        });
      })
      .catch(function () {
        Swal.fire({
          title: "Error 404",
          text: "No registerd email address",
          icon: "error",
        });
        setIsloading(false);
        setIsDisabled(false);
      });
  }
  const entermailFormik = useFormik({
    initialValues: { email: "" },
    validate: (values) => {
      const errors = {};
      console.log(values);
      if (!values.email) {
        errors.email = "Email is required";
      } else if (
        !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          values.email.trim()
        )
      ) {
        errors.email = "Invalid email address";
      }
      return errors;
    },
    onSubmit: (values) => {
      setIsDisabled(true);
      setIsloading(true);
      values.email = values.email.trim();
      sendmail(values);
    },
  });
  return (
    <>
      <div
        className="w-75 m-auto  d-flex align-items-center justify-content-center"
        style={{ minHeight: 77 + "vh" }}
      >
        <div className="col-12">
          <h2>Enter email to recive confirmation code</h2>
          <form className="register" onSubmit={entermailFormik.handleSubmit}>
            <div>
              <label htmlFor="loginMail">Mail</label>
              <input
                name="email"
                value={entermailFormik.values.email}
                onBlur={entermailFormik.handleBlur}
                onChange={entermailFormik.handleChange}
                type="text"
                placeholder="Mail"
                className="form-control mb-2"
                id="confirmMail"
              />
              <h6
                style={{ display: "none" }}
                id="confirmMailErr"
                className="text-danger"
              >
                Email is invalid
              </h6>
            </div>
            <button
              type="submit"
              className={
                entermailFormik.isValid && entermailFormik.values.email != ""
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
                "Submit email"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
