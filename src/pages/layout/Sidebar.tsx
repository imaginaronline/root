import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/iskcon_logo.svg";
import useAuthStore from '../../store/authStore';
import proxyApi from "../../services/proxy";
import { API_ENDPOINTS, dummyImg } from '../../services/apiConstants';
import jwt_decode from "jwt-decode";

interface userSideBarProps {
  onItemClick: () => void;
}
const Sidebar = ({ onItemClick }: userSideBarProps) => {
  const [userName, setUserName] = useState('');
  const [userDID, setUserDID] = useState('');
  const [isVolunteer, setIsVolunteer] = useState(false);
  const copyInputRef = useRef<HTMLInputElement | null>(null);
  
  const accessToken = useAuthStore((state) => state.accessToken); // Get the accessToken from the store

  const _proxy = new proxyApi(accessToken);
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('');
  const handleItemClick = (item: any) => {
    setActiveItem(item);
    localStorage.setItem("menuItem",item);
    onItemClick();
  };
  const handleLogoutClick = () => {
    useAuthStore.getState().logout;
    navigate("/");
  }

  const handleCopyClick = () =>{
    if (copyInputRef.current) {
      copyInputRef.current.select();
      document.execCommand('copy');
    }
  }

  const [profilePhoto, setProfilePhoto] = useState('');
  const url2 = `${API_ENDPOINTS.getProfilePhoto}`;
  useEffect(() => {
    var dummyImage=dummyImg;
    setProfilePhoto(dummyImage);
    if(accessToken!=null)
    {
      const decodedToken:any = jwt_decode(accessToken?.toString());
      setUserName(decodedToken.given_name);
      setUserDID(decodedToken.did);
      const valuesArray = decodedToken.role.split(",");
      const hasVolunteer = valuesArray.some((x: string) => x === 'volunteer');
      if(hasVolunteer)
      {
        setIsVolunteer(hasVolunteer)
      }
      else{
        setIsVolunteer(false);
      }
    }
    _proxy
      .get(url2)
      .then((resp: any) => {
        setProfilePhoto(resp.data.fileContent);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch(event.target.checked)
    {
      case true:
        setIsVolunteer(true);
        _proxy
        .put(`${API_ENDPOINTS.setVolunteer}?isSet=true`,null)
        .then((resp: any) => {
          if(resp.data.status)
          useAuthStore.getState().setAccessToken(resp.data.data.access_token);
         
        })
        .catch((error: any) => {
          console.log(error);
        });
        break;
      case false:
          setIsVolunteer(false);
          _proxy
          .put(`${API_ENDPOINTS.setVolunteer}?isSet=false`,null)
          .then((resp: any) => {
            if(resp.data.status)
            useAuthStore.getState().setAccessToken(resp.data.data.access_token);
      
          })
          .catch((error: any) => {
            console.log(error);
          });
        break;
    }
    console.log(isVolunteer)

  };

  return (
    <>
      {/* <!-- LEFT SIDEBAR --> */}
      <div className="box_leftbar deskMenu">
        {/* <!-- ISKCON LOGO --> */}
        <div className="box_leftbar_wrapper">
          <img src={logo} alt="img" />
        </div>

        {/* <!-- PROFILE DETAILS --> */}
        <div className="box_leftbar_profile">
          <img src={`data:image/jpeg;base64,${profilePhoto}`} alt="profile" />
          <div className="box_leftbar_profile_details">
            <div className="box_leftbar_profile_details--name">{userName}</div>
            {userDID!="" && <div className="box_leftbar_profile_details--id">
              <p>DID: </p><span className='didContentClass'>
                <div className="input-group classCopyGroup">
                  <input type="text" className="form-control" value={userDID} readOnly id="copy-input" ref={copyInputRef}/>
                  <button className="btn btn-outline-secondary copy-icon" id="copy-button" onClick={handleCopyClick}>
                    <i className="bi bi-clipboard"></i>
                  </button>
                </div>
              </span>
            </div>}
          </div>
        </div>

        <div className="row text-center">
          <div className="col-md-12 mt-5">
            <div className="volunteercheck ">
              <label className="switch">
                <input type="checkbox" id="checkbox" alt='volunteer' checked={isVolunteer} onChange={handleCheckboxChange}/>
                <div className="slider round"></div>
              </label>
              <p className='volunteerP'>Ready to Volunteer</p>
            </div>
            <p className='changeP'>click to change</p>
          </div>
        </div>
        {/* <!-- MENU TAB DETAILS --> */}
        <ul className="box_leftbar_tabs">
          <Link to="/application/home">
            <li
              className={activeItem === "" ? "active" : ""}
              onClick={() => handleItemClick("Home")}
            >
              <h4>Home</h4>
            </li>
          </Link>
          <Link to="/application/reports">
            <li
              className={activeItem === "Reports" ? "active" : ""}
              onClick={() => handleItemClick("Reports")}
            >
              <h4>Reports</h4>
            </li>
          </Link>
          <Link to="/application/newsandupdates">
            <li
              className={activeItem === "News" ? "active" : ""}
              onClick={() => handleItemClick("News")}
            >
              <h4>News and Updates</h4>
            </li>
          </Link>
          <Link to="/application/festivalcalender">
            <li
              className={activeItem === "Festival" ? "active" : ""}
              onClick={() => handleItemClick("Festival")}
            >
              <h4>Festival Calender</h4>
            </li>
          </Link>
          <Link to="/application/profile">
            <li
              className={activeItem === "Profile" ? "active" : ""}
              onClick={() => handleItemClick("Profile")}
            >
              <h4>Profile</h4>
            </li>
          </Link>
          <Link to="/application/contactus">
            <li
              className={activeItem === "Contact" ? "active" : ""}
              onClick={() => handleItemClick("Contact")}
            >
              <h4>Contact Us</h4>
            </li>
          </Link>
          <li onClick={() => handleLogoutClick()}>
            <h4>Logout</h4>
          </li>
        </ul>

        {/* <div className="row mt-5">
          <div className="col-md-12 mt-4">
            <img className='logoutimg' src={logout} alt="logout" />
          </div>
        </div> */}
      </div>

      {/* <!-- /LEFT SIDEBAR --> */}
    </>
  );

}

export default Sidebar
