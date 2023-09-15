
import { useState } from 'react';
import iskconLogo from '../../assets/IskconLogo.png';
import './LoginPage.css'
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import useApiStore from '../../store/apiStore';

import { API_ENDPOINTS } from '../../services/apiConstants';
import { SignUpRequest } from '../../models/SignUpRequest';
import useAuthStore from '../../store/authStore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUpPage() {

    const _proxy = useApiStore((state: any) => state.api);

    const [phone, setPhone] = useState("");

    const navigate = useNavigate();

    const initialValues = {
        username: '',
        password: '',
        confirmPassword: '',
        mobileNumber: phone,
    };
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters long'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
            .required('Please confirm your password'),
        mobileNumber: Yup.string().required('mobile number is required').matches(
            /^(\+[0-9]{1,3})?[-\s]?(\([0-9]{1,4}\)|[0-9]{1,4})[-\s]?[0-9]{1,10}$/,
            'Invalid mobile number'
        ),
    });

    const handleSubmit = (values: any, formikHelpers: FormikHelpers<any>) => {
        // Handle form submission logic here, e.g., submitting to a server or saving data.
        const requestData: SignUpRequest = {
            phoneNumber: values.mobileNumber,
            userName: values.username,
            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword
        };

        _proxy.post(API_ENDPOINTS.signUp, requestData).then((resp: any) => {
            if (resp.status) {
                useAuthStore.getState().setAccessToken(resp.data.access_token);
                setPhone("");
                navigate("/application/home");
                formikHelpers.resetForm();
                formikHelpers.setSubmitting(false);
            }
            else {
                toast.warning(resp.data.statusMessage);
                formikHelpers.setSubmitting(false);
                console.log(resp.statusMessage)
            }
        }).catch((error: any) => {
            toast.error(error);
            formikHelpers.setSubmitting(false);
            console.log(error);
        });

    };

    return (
        <div>
            <div className="login-container">
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {({ isSubmitting }) => (
                        <Form className="login-form">
                            <div className='iskconLogoDiv'>
                                <img src={iskconLogo} />
                            </div>
                            <h2>Signup</h2>
                            <div className="mb-3">
                                <label className='loginLabel' htmlFor="username">Username</label>
                                <Field type="text" id="username" name="username" className="form-control loginInput" placeholder="Enter username" autoComplete="off" />
                                <ErrorMessage name="username" component="div" className="text-danger" />
                            </div>
                            <div className="mb-3">
                                <label className='loginLabel' htmlFor="password">Password</label>
                                <Field type="password" id="password" name="password" className="form-control loginInput" placeholder="Enter password" autoComplete="off" />
                                <ErrorMessage name="password" component="div" className="text-danger" />
                            </div>
                            <div className="mb-3">
                                <label className='loginLabel' htmlFor="confirmPassword">Confirm Password</label>
                                <Field type="password" id="confirmPassword" name="confirmPassword" className="form-control loginInput" placeholder="Confirm password" autoComplete="off" />
                                <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                            </div>
                            <div className='mb-3'>
                                <Field name="mobileNumber">
                                    {({ field, form }:any) => (
                                        <div className='mb-3'>
                                            <label className='loginLabel' htmlFor="mobileNumber">Mobile number</label>
                                            <PhoneInput
                                                country={"in"}
                                                enableSearch={true}
                                                value={field.value}
                                                onChange={(phone) => form.setFieldValue('mobileNumber', phone)}
                                                onBlur={field.onBlur}
                                                placeholder='+91 (991) 239-9123'
                                            />
                                            <ErrorMessage name="mobileNumber" component="div" className="text-danger" />
                                        </div>
                                    )}
                                </Field>

                                {/* <label className='loginLabel' htmlFor="mobileNumber">Mobile number</label>
                                <PhoneInput
                                    country={"in"}
                                    enableSearch={true}
                                    value={phone}
                                    onChange={(phone: any) => setPhone(phone)}
                                    placeholder='+91 (991) 239-9123'
                                /> */}
                            </div>
                            <button type="submit" className='loginSbtBtn' disabled={isSubmitting}>Signup</button>
                            <p className='alreadyUser'>Already a user?</p>
                            <div className='navLinks signupNavLinks'>
                                Login using<Link to='/account/mobileLogin' className='areaLink'>mobile number</Link><p className='orptag'>Or</p> <Link to='/account/login' className='areaLink'>password</Link>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            <ToastContainer position="bottom-right"/>
        </div>
    );
}

export default SignUpPage;