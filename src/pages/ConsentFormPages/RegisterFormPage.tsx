import { useEffect, useState } from "react";
import iskconLogo from '../../assets/IskconLogo.png';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Button } from "react-bootstrap";
import './RegisterFormPage.css';
import { useLocation, useNavigate } from 'react-router-dom';

import useApiStore from '../../store/apiStore';

import { API_ENDPOINTS } from '../../services/apiConstants';
import { ConsentVerificationRequest } from '../../models/ConsentVerificationRequest';
import { ConsentSignUpRequest } from '../../models/ConsentSignUpRequest';
import useAuthStore from '../../store/authStore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalPopupComponent from "../../components/ModalPopupComponent";
import ConsentTermsConditions from "./ConsentTermsConditions";

// import { VerifyOTPRequest } from "../../models/VerifyOTPRequest";
// import { AuthResponseData } from "../../models/AuthRequestData";

function RegisterConsentPage() {

  const [isOTPSent, setIsOTPSent] = useState(false);
  const [isConsentOk, setIsConsentOk] = useState(false);
  const [acceptedTermsOrNot, setAcceptedTermsOrNot] = useState(false);
  const [otp, setOTP] = useState('');

  const [submittedSignUpFormValues, setsubmittedSignUpFormValues] = useState<any>(null); // Storing the SignupForm Data1
  const [phonenumber, setphonenumber] = useState("");
  

  const _proxy = useApiStore((state: any) => state.api);
  const navigate = useNavigate();

  var parmid: string | undefined;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  parmid = queryParams.get('consent_id')?.toString();
 

  const initialValues = {
    username: "",
    password: "",
    confirmPassword: "",
  };

  //For Terms accept...
  const handleCheckboxChange = (event: any) => {
    setAcceptedTermsOrNot(event.target.checked);
  };
  const consentsAccept = () => {
    if (acceptedTermsOrNot) {
      setIsConsentOk(true);
    }
    else {
      toast.warning("Please accept the terms and Conditions");
    }
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters long"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "Passwords must match")
      .required("Please confirm your password"),
  });



  //For otp submit...

  const [isOTPResend, setsOTPResend] = useState(false);
  // const [isConsentForm, setIsConsentForm] = useState(false);
  const [remainingTime, setRemainingTime] = useState(60);
  const [acceptedTermsinForm, setAcceptedTermsinForm] = useState(false);
  const handleCheckbox2Change = (event: any) => {
    setAcceptedTermsinForm(event.target.checked);
  };

  // Simulating OTP sending (you can replace this with your actual OTP sending logic)
  useEffect(() => {
    if (!isOTPResend) {
      setsOTPResend(true);
      startTimer();
    }
  }, [isOTPResend]);

  // Countdown timer for OTP expiration
  useEffect(() => {
    let timer: any;
    if (remainingTime > 0 && isOTPResend) {
      timer = setTimeout(() => setRemainingTime((prevTime) => prevTime - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [remainingTime, isOTPResend]);

  const handleOTPChange = (e: any) => {
    setOTP(e.target.value);
  };

  // For Submitting the OTP...
  const handleOTPSubmit = (e: any) => {
    e.preventDefault();
    if (otp == null || otp == '' || otp == undefined) {
      toast.warning("Please enter the valid OTP")
    }
    else {

      const consentSignupRequest: ConsentSignUpRequest = {
        userName: submittedSignUpFormValues.username,
        password: submittedSignUpFormValues.password,
        confirmPassword: submittedSignUpFormValues.confirmPassword,
        phoneNumber: phonenumber,
        oTP: otp,
        consentId: parmid
      };

      _proxy.post(API_ENDPOINTS.consentSignUp, consentSignupRequest).then((resp: any) => {
        if (resp.status) {
          useAuthStore.getState().setAccessToken(resp.data.access_token);
          navigate("/application/home");
        }
        else {
          toast.warning(resp.data.statusMessage);
        }
      }).catch((error: any) => {
        console.log(error);
      });


    }


  };

  const startTimer = () => {
    setRemainingTime(60);
  };

  const resendOTP = () => {
    setsOTPResend(false);
    setOTP('');
  };

  const handleSubmit = (values: any, formikHelpers: FormikHelpers<any>) => {
    // Handle form submission logic here, e.g., submitting to a server or saving data.
    setsubmittedSignUpFormValues(values); // Step 2
    // Reset the form fields
    if (!acceptedTermsinForm) {
      toast.warning("Please accept the privacy policy");
    }
    else {
      const requestData: ConsentVerificationRequest = {
        consentId: parmid,
        userName: values.username,
      };
      _proxy.post(API_ENDPOINTS.consentVerification, requestData).then((resp: any) => {
        if (resp.status) {
          console.log(resp.data.data.phoneNumber);
          setphonenumber(resp.data.data.phoneNumber); 
        }
        else {
          alert(resp.statusMessage);
          console.log(resp.statusMessage)
        }
      }).catch((error: any) => {
        console.log(error);
      });

      setIsOTPSent(true);
      formikHelpers.resetForm();

      // Set isSubmitting back to false
    }
    formikHelpers.setSubmitting(false);
  };

  //for modal popup
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => {
    console.log();
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };


  return (
    <div>
      <div className="login-container">
        <div className="login-form">
          {!isConsentOk && (
            <div>
              <div className="iskconLogoDiv">
                <img src={iskconLogo} />
              </div>
              <p>Consent Form</p>
              <div className="consentchecks">
                <div className="form-check">
                  <label className="form-check-label">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={acceptedTermsOrNot}
                      onChange={handleCheckboxChange}
                      id="flexCheckChecked"
                    />

                    Accept the terms and conditions
                  </label>
                </div>
                <h6 className="mt-4">
                  accept the above terms and conditions to continue.
                </h6>
                <button type="button" className="loginSbtBtn" onClick={consentsAccept}>Next</button>
              </div>
            </div>

          )}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                {isConsentOk && (
                  <div>
                    <div className="iskconLogoDiv">
                      <img src={iskconLogo} />
                    </div>
                    {!isOTPSent && (
                      <div>

                        <div className="mb-3">
                          <label className='loginLabel' htmlFor="username">Username</label>
                          <Field type="text" id="username" name="username" className="form-control loginInput" autoComplete="off" />
                          <ErrorMessage name="username" component="div" className="text-danger" />
                        </div>

                        <div className="mb-3">
                          <label className='loginLabel' htmlFor="password">Password</label>
                          <Field type="password" id="password" name="password" className="form-control loginInput" autoComplete="off" />
                          <ErrorMessage name="password" component="div" className="text-danger" />
                        </div>

                        <div className="mb-3">
                          <label className='loginLabel' htmlFor="confirmPassword">Confirm Password</label>
                          <Field type="password" id="confirmPassword" name="confirmPassword" className="form-control loginInput" autoComplete="off" />
                          <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                        </div>

                        <div className="form-check">
                          <label className="form-check-label">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={acceptedTermsinForm}
                              onChange={handleCheckbox2Change}
                              id="flexCheckChecked"
                            />
                            I agree to ISKCON Hyderabad <a onClick={handleOpenModal} className=''>Terms of Service,</a> and <a onClick={handleOpenModal} className=''>Privacy Policy.</a>
                          </label>
                        </div>

                        <Button type="submit" className="loginSbtBtn" variant="primary" disabled={isSubmitting}>
                          Submit
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </Form>
            )}
          </Formik>
          {isOTPSent && ( // Render the OTP verification screen when OTP is sent
            <div className="otpVerification">
              <div>
                <h2>OTP Verification</h2>
                <p className="OtpPtag">Enter the OTP sent to <span className="mobileNo">{phonenumber}</span></p>
                <form className="otp-form" onSubmit={handleOTPSubmit}>

                  <input
                    className='otp-input'
                    type="text"
                    value={otp}
                    onChange={handleOTPChange}
                    placeholder="Enter OTP"
                    autoComplete="off"
                  />
                  <button type="submit" className='loginSbtBtn'>Verify OTP</button>
                </form>
              </div>
              {isOTPResend && remainingTime > 0 && (
                <p className="OtpPtag">OTP will expire in {remainingTime} seconds</p>
              )}
              {isOTPResend && remainingTime === 0 && (
                <a className='loginSbtBtn resendBtn' onClick={resendOTP}>Resend OTP</a>
              )}
            </div>
            // <OTPVerificationScreen phoneNumber={phone} consentForm={false} handleEditClick={handleEdit} />
          )}
        </div>
      </div>
      <ModalPopupComponent show={showModal} handleClose={handleCloseModal}>
        <ConsentTermsConditions />
      </ModalPopupComponent>
      <ToastContainer position="bottom-right"/>
    </div>
  );
}

export default RegisterConsentPage;
