import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import Sidebar from "../pages/layout/Sidebar";
import Home from "../pages/main/Home";
import NewsandUpdates from "../pages/main/NewsandUpdatespage/Newsandupdates";
import FestivalCalender from "../pages/main/Festivalcalanderpage/Festivalcalender";
import Contactus from "../pages/main/Contactuspage/Contactus";
import feather from "../assets/featherimg.png";
import ProfileComponent from "../pages/main/Profilepage/ProfilePage";
import Reports from "../pages/main/ReportsPage/Reports";
import DevineRedirect from "../pages/main/DevineRedirectpage/DevineRedirect";
import toggleOpen from "../assets/toggle.png";
import toggleClose from "../assets/close.png";
import useAuthStore from '../store/authStore';
import proxyApi from '../services/proxy';
import { API_ENDPOINTS } from '../services/apiConstants';
import ReactAudioPlayer from 'react-audio-player';
import jwt_decode from "jwt-decode";

function ApplicationLayout() {
  const [showNav, setshowNav] = useState(false);
  const [openToggle, setOpenToggle] = useState(false);
  const [userName, setUserName] = useState('');

  const [quotation, setQuotations] = useState("");

  const[audio,setAudio] =  useState<any>('');

  const accessToken = useAuthStore((state) => state.accessToken); // Get the accessToken from the store
  const _proxy = new proxyApi(accessToken);

  useEffect(() => {
    if(accessToken!=null)
    {
        const decodedToken:any = jwt_decode(accessToken?.toString());
        setUserName(decodedToken.given_name);
    }
    
    _proxy.get(API_ENDPOINTS.getAudioChant).then((resp: any) => {
        if (resp.status) {
            setAudio(resp.data.data.audioLink);
        } else {
            
            
       
        }
      });
      _proxy.get(API_ENDPOINTS.getTickerText).then((resp: any) => {
        if (resp.status) {
            setQuotations(resp.data.data.quotation);
        } else {
        
        }
      });
  }, []);

    const handleSidebarItemClick = () => {
        setshowNav(false); // Close the menu bar when a menu item is clicked
    };

    function handleNavToggleOpen(event: any) {
        setshowNav(!showNav);
        const buttonValue = event.currentTarget.value;
        if (buttonValue == "btn1") {
            setOpenToggle(true);
        }
        else if (buttonValue == "btn2") {
            setOpenToggle(false);
        }

    }

    return (
        <div className="wrapper1">
            <section className={`box ${showNav ? "custommenu" : ""}`}>
                <Sidebar onItemClick={handleSidebarItemClick} />
                <div className="box_rightbar">
                    <div className="mainbody">
                        <h2>  <img className='featherr' src={feather} alt="img" /> <span>Hare Krishna, {userName}!</span></h2>
                        {!openToggle && (
                            <button className="toglbtn1" value="btn1" onClick={handleNavToggleOpen}>
                                <img className="togleimg" src={toggleOpen} alt="img" />
                            </button>
                        )}
                        {openToggle && (
                            <button className="toglbtn1" value="btn2" onClick={handleNavToggleOpen}>
                                <img className="togleimg" src={toggleClose} alt="img" />
                            </button>
                        )}
                        <div className="maincard">
                            <div className="cardheader applayer">
                           
                                <h4>Chant with us |  <ReactAudioPlayer src={audio} autoPlay={true}  loop={true} controls={true} className="audiocontrol" controlsList={"nofullscreen nodownload noremoteplayback"}/>  
                                {/* controlsList="nofullscreen nodownload noremoteplayback" */}
                                    
                                </h4>
                                <div className='quotationScroll-container'>
                                    <div className='quotationScroll'>
                                        <p className='quotationParagraph'>{quotation}</p>
                                    </div>
                                </div>
                                
                            </div>
                            <div className="routpage">
                                <Routes>
                                    <Route path="*" element={<Navigate to="/application/home" />} />
                                    <Route path="/home" element={<Home />} />
                                    <Route path="/reports" element={<Reports />} />
                                    <Route path="/newsandupdates" element={<NewsandUpdates />} />
                                    <Route path="/festivalcalender" element={<FestivalCalender />} />
                                    <Route path="/profile" element={<ProfileComponent />} />
                                    <Route path="/contactus" element={<Contactus />} />
                                    <Route path="/seekblessings" element={<DevineRedirect />} />
                                </Routes>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}
export default ApplicationLayout;

