
import iskconLogo from '../../assets/IskconLogo.png';
import './LoginPage.css'
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import useApiStore from '../../store/apiStore';

import { API_ENDPOINTS } from '../../services/apiConstants';
import  { AuthRequestData } from '../../models/AuthRequestData';
import useAuthStore from '../../store/authStore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PasswordLogin() {
  //creating the api proxy instance
  const _proxy = useApiStore((state:any) => state.api);

  const navigate = useNavigate();
  
  const initialValues = {
    username: '',
    password: '',
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters long'),
  });

  const handleSubmit = (values: any, formikHelpers: FormikHelpers<any>) => {
    // Handle form submission logic here, e.g., submitting to a server or saving data.

    console.log('Username and password',values);
    const requestData: AuthRequestData = {
      emailOrUserName: values.username,
      password: values.password
    };
     _proxy.post(API_ENDPOINTS.generateToken, requestData).then((resp:any)=>{
        if(resp.data.status){
           useAuthStore.getState().setAccessToken(resp.data.data.access_token);
           if(values.username == 'admin') {
            console.log("Going to admin")
            navigate('/admin')
           } else {
             navigate("/application/home");
           }
           toast.success("Login Successfull.")
           formikHelpers.resetForm();
          formikHelpers.setSubmitting(false);
        }
        else{
          toast.error("Invalid username or password");
          formikHelpers.setSubmitting(false);
          console.log(resp.data.statusMessage)
        }
     }).catch((error:any)=>{
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
            <h2>Login</h2>
            <div className="mb-3">
              <label className='loginLabel' htmlFor="username">Username</label>
                <Field type="text" id="username" name="username" className="form-control loginInput" placeholder="Enter your username" autoComplete="off" />
                <ErrorMessage name="username" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label className='loginLabel' htmlFor="password">Password</label>
                <Field type="password" id="password" name="password" className="form-control loginInput" placeholder="Enter your password" autoComplete="off" />
                <ErrorMessage name="password" component="div" className="text-danger" />
            </div>
            <button type="submit" className='loginSbtBtn' disabled={isSubmitting}>Login</button>
            <div className='navLinks subnavLinks'>
            Login using<Link to='/account/mobileLogin' className='areaLink'>mobile number</Link><p className='orptag'>Or</p> <Link to='/account/signup' className='areaLink'>Signup</Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
    <ToastContainer position="bottom-right"/>
    </div>
  );
}

export default PasswordLogin;