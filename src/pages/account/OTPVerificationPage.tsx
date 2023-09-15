
import { useEffect, useState } from "react";
import iskconLogo from '../../assets/IskconLogo.png';
import './OtpVerification.css';
import { FaEdit } from "@react-icons/all-files/fa/FaEdit"
import { useNavigate } from "react-router";
import { API_ENDPOINTS } from '../../services/apiConstants';
import { VerifyOTPRequest } from '../../models/VerifyOTPRequest';
import useApiStore from "../../store/apiStore";
import useAuthStore from '../../store/authStore';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface OtpValidationProps {
    phoneNumber: string;
    consentForm: boolean;
    handleEditClick: (e: any) => void;
}


function OTPVerificationScreen({ phoneNumber, consentForm, handleEditClick }: OtpValidationProps) {

    const _proxy = useApiStore((state: any) => state.api);
    const navigate = useNavigate();

    const [isOTPSent, setIsOTPSent] = useState(false);
    // const [isConsentForm, setIsConsentForm] = useState(false);
    const [remainingTime, setRemainingTime] = useState(60);

    const validationSchema = Yup.object().shape({
        oTP: Yup.string().required('OTP is required')
            .min(6, 'OTP must be 6 digits')
            .matches(/^[0-9]+$/, 'OTP must be in numbers'),

    });
    const formik = useFormik({
        initialValues: {
            oTP: '', // Initial value for OTP
        },
        validationSchema: validationSchema, // Your Yup validation schema
        onSubmit: (values: any) => {
            // setEnteredNumber(values.phoneNumber);
            // formikHelpers.resetForm();

            // formikHelpers.setSubmitting(false);

            const requestData: VerifyOTPRequest = {
                phoneNumber: phoneNumber,
                oTP: values.oTP
            };
            _proxy.post(API_ENDPOINTS.verifyOTP, requestData).then((resp: any) => {
                if (resp.data.status) {
                    useAuthStore.getState().setAccessToken(resp.data.access_token);
                    navigate("/application/home");
                }
                else {
                    toast.error(resp.data.statusMessage);
                }
            }).catch((error: any) => {
                toast.error(error);
            });
        },
    });
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
            timer = setTimeout(() => setRemainingTime((prevTime) => prevTime - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [remainingTime, isOTPSent]);

    const startTimer = () => {
        setRemainingTime(20);
    };

    const resendOTP = () => {
        setIsOTPSent(false);
    };

    return (
        <div>
            <div className="login-container">
                <div className="login-form">
                    <div className='iskconLogoDiv'>
                        <img src={iskconLogo} />
                    </div>
                    <div>
                        <h2>OTP Verification</h2>
                        <p className="OtpPtag">Enter the OTP sent to <span className="mobileNo">{phoneNumber}</span> <span onClick={() => handleEditClick(phoneNumber)}>{!consentForm && (<FaEdit className="editIcon" />)}</span></p>
                        <form className="otp-form" onSubmit={formik.handleSubmit}>
                            <input
                                className='otp-input'
                                type="text"
                                value={formik.values.oTP}
                                onChange={formik.handleChange('oTP')}
                                onBlur={formik.handleBlur('oTP')}
                                placeholder="Enter OTP"
                                autoComplete="off"
                            />
                            {formik.touched.oTP && formik.errors.oTP ? (
                                <p className='text-dangerAlert'>{formik.errors.oTP.toString()}</p>
                            ) : null}
                            <button type="submit" className='loginSbtBtn'>Verify OTP</button>
                        </form>
                    </div>
                    {isOTPSent && remainingTime > 0 && (
                        <p className="OtpPtag">OTP will expire in {remainingTime} seconds</p>
                    )}
                    {isOTPSent && remainingTime === 0 && (
                        <a className='loginSbtBtn resendBtn' onClick={resendOTP}>Resend OTP</a>
                    )}
                </div>
            </div>
            <ToastContainer position="bottom-right"/>
        </div>
    );
}

export default OTPVerificationScreen;