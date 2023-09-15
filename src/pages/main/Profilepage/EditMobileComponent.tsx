import { useEffect, useState } from "react";
import * as Yup from "yup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { useFormik } from "formik";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit } from "@react-icons/all-files/fa/FaEdit";
import useAuthStore from "../../../store/authStore";
import proxyApi from "../../../services/proxy";
import { API_ENDPOINTS } from "../../../services/apiConstants";

interface EditMobileProps {
  mobileNumberExists:any,
  profileReturnResp: (resp:any)=>void; 
}
export default function EditMobileComponent({mobileNumberExists, profileReturnResp}:EditMobileProps) {
  const accessToken = useAuthStore(state => state.accessToken); // Get the accessToken from the store
  const _proxy =new proxyApi(accessToken);

  const [mobileNumber, setMobileNumber] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [isOTPSent, setIsOTPSent] = useState(false);
  // const [isConsentForm, setIsConsentForm] = useState(false);
  const [remainingTime, setRemainingTime] = useState(60);

  const handleEditClick = () => {
    setIsMobile(false);
  }
  // Simulating OTP sending (you can replace this with your actual OTP sending logic)
  useEffect(() => {
    if (!isOTPSent) {
      setIsOTPSent(true);
      startTimer();
    }
  }, [isOTPSent]);

  // Countdown timer for OTP expiration
  useEffect(() => {
    let timer: any;
    if (remainingTime > 0 && isOTPSent) {
      timer = setTimeout(
        () => setRemainingTime((prevTime) => prevTime - 1),
        1000
      );
    }
    return () => clearTimeout(timer);
  }, [remainingTime, isOTPSent]);

  const startTimer = () => {
    setRemainingTime(20);
  };

  const resendOTP = () => {
    setIsOTPSent(false);
  };

  const validationSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .required("Mobile number is required")
      .matches(
        /^(\+[0-9]{1,3})?[-\s]?(\([0-9]{1,4}\)|[0-9]{1,4})[-\s]?[0-9]{1,10}$/,
        "Invalid mobile number"
      ),
  });
  // for mobile number ...
  const formik1 = useFormik({
    initialValues: {
      phoneNumber: mobileNumberExists, // Initial value for phone number
    },
    validationSchema: validationSchema, // Your Yup validation schema
    onSubmit: (values: any) => {
      setMobileNumber(values.phoneNumber);
      setIsMobile(true);
      _proxy.post(API_ENDPOINTS.setPhone, values).then((resp: any) => {
        if (resp.status) {
        }
        else {
        }
        }).catch((error: any) => {
            console.log(error);
        });
    },
  });

  //For OTP validation...
  const validationSchema2 = Yup.object().shape({
    oTP: Yup.string()
      .required("OTP is required")
      .min(6, "OTP must be 6 digits")
      .matches(/^[0-9]+$/, "OTP must be in numbers"),
  });

  const formik2 = useFormik({
    initialValues: {
      oTP: "", // Initial value for phone number
    },
    validationSchema: validationSchema2, // Your Yup validation schema
    onSubmit: (values: any) => {
      const obj ={
        mobile: mobileNumber,
        oTP: values.oTP
      }
      console.log(obj);
      _proxy.post(API_ENDPOINTS.validatePhone, obj).then((resp: any) => {
        if (resp.status) {
          profileReturnResp("Mobilenumber");
          setIsOTPSent(true);
        }
        else {
          profileReturnResp("error");
        }
        }).catch((error: any) => {
            console.log(error);
        });
    },
  });

  return (
    <div>
      {!isMobile && (
        <div>
          <form className="login-form" onSubmit={formik1.handleSubmit}>
            <div>
              <label className="loginLabel" htmlFor="mobileNumber">
                Mobile
              </label>
              <PhoneInput
                country={"in"}
                enableSearch={true}
                value={formik1.values.phoneNumber}
                onChange={formik1.handleChange("phoneNumber")} // Use formik1's handleChange
                onBlur={formik1.handleBlur("phoneNumber")} // Use formik1's handleBlur
                placeholder="+91 (991) 239-9123"
              />
              {formik1.touched.phoneNumber && formik1.errors.phoneNumber ? (
                <p className="text-dangerAlert">
                  {formik1.errors.phoneNumber.toString()}
                </p>
              ) : null}
              <button type="submit" className="loginSbtBtn">
                Verify
              </button>
            </div>
          </form>
        </div>
      )}
      {isMobile && (
        <div>
          <form className="login-form" onSubmit={formik2.handleSubmit}>
            <label className="loginLabel" htmlFor="mobileNumber">
              Enter OTP <span onClick={() => handleEditClick()}><FaEdit className="editIcon" /></span>
            </label>
            <input
              className="otp-input"
              type="text"
              value={formik2.values.oTP}
              onChange={formik2.handleChange("oTP")}
              onBlur={formik2.handleBlur("oTP")}
              placeholder="Enter OTP"
              autoComplete="off"
            />
            {formik2.touched.oTP && formik2.errors.oTP ? (
              <p className="text-dangerAlert">
                {formik2.errors.oTP.toString()}
              </p>
            ) : null}
            <button type="submit" className="loginSbtBtn">
              Verify OTP
            </button>
          </form>
          {isOTPSent && remainingTime > 0 && (
            <p className="OtpPtag">
              OTP will expire in {remainingTime} seconds
            </p>
          )}
          {isOTPSent && remainingTime === 0 && (
            <a className="loginSbtBtn resendBtn" onClick={resendOTP}>
              Resend OTP
            </a>
          )}
        </div>
      )}
    </div>
  );
}
