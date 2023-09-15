
import { useState } from 'react';
import iskconLogo from '../../assets/IskconLogo.png';
import '../account/LoginPage.css';
import { Link } from 'react-router-dom';
import OTPVerificationScreen from './OTPVerificationPage';
import * as Yup from 'yup';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import useApiStore from '../../store/apiStore';
import { useFormik } from 'formik';

import { API_ENDPOINTS } from '../../services/apiConstants';
import { SendOTPRequest } from '../../models/SendOTPRequest';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PhoneNumberLogin() {
    // const navigate = useNavigate();
    const _proxy = useApiStore((state: any) => state.api);

    const [phone] = useState("");
    const [isOTPSent, setIsOTPSent] = useState(false);

    const validationSchema = Yup.object().shape({
        phoneNumber: Yup.string().required('Mobile number is required').matches(
            /^(\+[0-9]{1,3})?[-\s]?(\([0-9]{1,4}\)|[0-9]{1,4})[-\s]?[0-9]{1,10}$/,
            'Invalid mobile number'
        ),
    });
    const formik = useFormik({
        initialValues: {
            phoneNumber: '', // Initial value for phone number
        },
        validationSchema: validationSchema, // Your Yup validation schema
        onSubmit: (values: any) => {
            values.phoneNumber = phone;
            // setEnteredNumber(values.phoneNumber);
            // formikHelpers.resetForm();

            // formikHelpers.setSubmitting(false);

            const requestData: SendOTPRequest = {
                phoneNumber: values.phoneNumber,
            };
            _proxy.post(API_ENDPOINTS.loginWithOTP, requestData).then((resp: any) => {
                if (resp.status) {
                    setIsOTPSent(true);
                }
                else {
                    toast.warning(resp.statusMessage);
                    console.log(resp.data.statusMessage)
                }
            }).catch((error: any) => {
                toast.error(error);
            });
        },
    });

    const handleEdit = (value: any) => {
        setIsOTPSent(false);
        console.log(value)
    }


    return (
        <div>
            <div className="login-container">
                {!isOTPSent && ( // Render the Phone number login screen only when OTP is not sent
                    <form className="login-form" onSubmit={formik.handleSubmit}>
                        <div className='iskconLogoDiv'>
                            <img src={iskconLogo} />
                        </div>
                        <div>
                            {/* <h2>Mobile Login</h2> */}
                            <label className='loginLabel' htmlFor="mobileNumber">Mobile number</label>
                            <PhoneInput
                                country={"in"}
                                enableSearch={true}
                                value={formik.values.phoneNumber}
                                onChange={formik.handleChange('phoneNumber')} // Use Formik's handleChange
                                onBlur={formik.handleBlur('phoneNumber')} // Use Formik's handleBlur
                                placeholder='+91 (991) 239-9123'
                            />
                            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                                <p className='text-dangerAlert'>Enter valid mobile number</p>
                            ) : null}
                            <button type="submit" className='loginSbtBtn'>Submit</button>
                            <div className='navLinks subnavLinks'>
                                Login using<Link to='/account' className='areaLink'>password</Link><p className='orptag'>Or</p> <Link to='/account/signup' className='areaLink'>signup</Link>
                            </div>
                        </div>
                    </form>

                )}
                {isOTPSent && ( // Render the OTP verification screen when OTP is sent
                    <OTPVerificationScreen phoneNumber={phone} consentForm={false} handleEditClick={handleEdit} />
                )}

            </div>
            <ToastContainer position="bottom-right"/>
        </div>
    );
}

export default PhoneNumberLogin;