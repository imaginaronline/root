import './Contactus.css';
import location from "../../../assets/location.png";
import mobile from "../../../assets/mobile.png";
import mail from "../../../assets/mail.png";
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import useAuthStore from '../../../store/authStore';
import proxyApi from '../../../services/proxy';
import { API_ENDPOINTS } from '../../../services/apiConstants';
import jwt_decode from "jwt-decode";

const Contactus = () => {
  const accessToken = useAuthStore((state) => state.accessToken); // Get the accessToken from the store
  const _proxy = new proxyApi(accessToken);
  const [message, setMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    if(accessToken != null){
      const decodedToken:any = jwt_decode(accessToken?.toString());
      setUserName(decodedToken.given_name);
    }
  }, []);
  const handleChange = (e:any) =>{
    setErrorMessage(false);
    setMessage(e.target.value);
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Perform custom validation
    if (message.trim() === '') {
      setErrorMessage(true);
      return;
    }
    else{
      var createObj = {
        prompt:message,
        handle:'#'+userName
      }
      _proxy.post(`${API_ENDPOINTS.createUserComment}`, createObj).then((resp: any) => {
        if (resp.data.status) {
          setMessage('');
          toast.success("Message submitted successfully.");
        }
    }).catch((error: any) => {
         console.log(error);
    });
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h3 className='mt-4'>We would love to hear from you</h3>
          <p className='mt-2 contactp'>Write us and our team will get back to you.</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-4 mt-3">
              <textarea
                className="form-control inputmsg"
                placeholder="Enter your message here"
                value={message}
                onChange={handleChange}
              />
            </div>
            {errorMessage && (<div>
              <p className='errorMsg'>Please enter a message before submitting.</p>
            </div> )}
            <button className="btn btn-primary submtbtn" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-12 addresstab">
          <div className="location">
            <img src={location} alt="" />
            <div className="isckonlocation">
              <h6 className='addressp'>ISKCON Temple</h6>
              <p className='addressp'>Hare Krishna Land,5/4/743-745, Nampally Station RoadOpp. G Pulla Reddy, Abids, Hyderabad,Telangana, India 500001</p>
            </div>
          </div>
          <div className="mobile">
            <img src={mobile} alt="" />
            <div className="isckonlocation">
              <p className='addressp'>Mobile/Whatsapp: <a href=""> +91 9182822719</a></p>
            </div>
          </div>
          <div className="mail">
            <img src={mail} alt="" />
            <div className="isckonlocation">
              <p className='addressp'>Email: <a href=""> abidsiskcon@gmail.com</a></p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </div>

  )

}

export default Contactus
