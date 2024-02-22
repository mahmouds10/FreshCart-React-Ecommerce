import { useFormik } from 'formik'
import React , {useEffect, useState } from 'react' 
import axios from "axios";
import Swal from "sweetalert2";
import { ThreeCircles } from "react-loader-spinner";
import { useNavigate } from 'react-router-dom';
 
export default function EnterSubmitCode() { 
  useEffect(()=>{
    document.title = "Reset Password"
  },[])
  const resetPassword =useNavigate()
  const [isloading, setIsloading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  async function sendSubmitCode(values){
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',values).then(()=>{
      setIsDisabled(false)
      setIsloading(false)
    Swal.fire({
        title: "Concfirmed Code",
        icon: "success",
        confirmButtonText:"Change Password"
      }).then(()=>{
        resetPassword("/forgetpassword/resetpassword")
      });
    }).catch(()=>{
      setIsDisabled(false)
      setIsloading(false)
      Swal.fire({
        title: "Wrong Code",
        icon: "error",
        confirmButtonText:"Try again"
      });
    })
  }
  const submitCodeFormik = useFormik({
    initialValues: {resetCode:""},
    validate:(values)=>{
        const errors ={}
        if (!values.resetCode){
          errors.resetCode = "Submit Code is required"
        }
        else if (values.resetCode.trim().length != 6 ){
          errors.resetCode = "Submit Code must be 6 chars"
        }
        return errors
    },
    onSubmit: (value)=>{
      setIsDisabled(true)
      setIsloading(true)
      value.resetCode = value.resetCode.trim()
        sendSubmitCode(value)
    }
  })
  return ( 
    <>
      <div
        className="w-75 m-auto  d-flex align-items-center justify-content-center"
        style={{ minHeight: 77 + "vh" }}
      >
        <div className="col-12">
          <h2>Enter reset code</h2>
          <form className="register" onSubmit={submitCodeFormik.handleSubmit}>
            <div>
              <label htmlFor="loginMail">Reset Code</label>
              <input
                name="resetCode"
                value={submitCodeFormik.values.resetCode}
                onBlur={submitCodeFormik.handleBlur}
                onChange={submitCodeFormik.handleChange}
                type="text"
                placeholder="Reset code"
                className="form-control mb-2"
                id="resetCode"
              />
              {submitCodeFormik.isValid?"":<h6 className='text-danger'>{submitCodeFormik.errors.resetCode}</h6>}
            </div>
            <button
              type="submit"
              className={
                submitCodeFormik.isValid && submitCodeFormik.touched.resetCode
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
                "Submit Code"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  ) 
} 
