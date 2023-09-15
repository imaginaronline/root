import "./DevineRedirect.css";
import FeaturedPrgrmsCardComponent from "../../../components/FeaturedPrgrmsCardComponent";
import featureprogramfooter from "../../../assets/featureprogramfooter.png";
import Footer from "../../layout/Footer";
import useAuthStore from "../../../store/authStore";
import proxyApi from "../../../services/proxy";
import { API_ENDPOINTS } from "../../../services/apiConstants";
import { useEffect, useState } from "react";
import ButtonComponent from "../../../components/CustomButtonComponent";
import InfoImage from "../../../assets/infoImg.jpg";
import ModalPopupComponent from "../../../components/ModalPopupComponent";
import ProceedModalComponent from "../../../components/ProceedModalComponent";

const DevineRedirect = () => {

  var sevaId: string | undefined;
  // const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);

  sevaId = localStorage.getItem('seva_id')?.toString();

  const [sevas, setSevas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSeva, setSelectedSeva] = useState(null);

  const skipCount = 0; // Replace with the desired value
  const maxResultCount = 5; // Replace with the desired value
  const accessToken = useAuthStore(state => state.accessToken); // Get the accessToken from the store

  const _proxy = new proxyApi(accessToken);
  const url = `${API_ENDPOINTS.getAllSevas}?SkipCount=${skipCount}&MaxResultCount=${maxResultCount}`;
  useEffect(() => {
    _proxy.get(url)
      .then((resp: any) => {
        setSevas(resp.data.data); // Set event data in the state
      })
      .catch((error: any) => {
        console.log(error);
      });

      if (sevaId != null) {
        _proxy.get(`${API_ENDPOINTS.getSevaData}/${sevaId}`)
          .then((resp: any) => {
            setSelectedSeva(resp.data.data);
            handleOpenModal(resp.data.data)
          })
          .catch((error: any) => {
            console.log(error);
          });
      }
  }, []);
  const viewMoreClick = () =>{
    alert("Coming Soon..");
  }

  const handleOpenModal = (seva:any) => {
    setSelectedSeva(seva);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

const closePopup=(event:any)=>{
  if(event==true)
  {
    setShowModal(false);
    localStorage.removeItem('seva_id')
  }
}

  return (
    <div className="container">
      <div className="row headr text-center">
        <div className="col-md-12">
          <h1>
            Get a personalised <br /> Archana from anywhere!
          </h1>
          <p>Choose from the featured programs, or customise your own.</p>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-12 choosecol">
          <p className="choosep">
            Choose your Seva ------ Add details ----- Make Payment
          </p>
        </div>
      </div>

      <div className="row px-5 py-5">
        <div className="col-md-12 mb-4">
          <h3>Featured Programs</h3>
        </div>
        <div className="col-md-12">
          <div className="row mb-4 cardrow">
          {sevas.map((seva:any) => (
            <div className="col-md-4 cardcolumn" key={seva.id}>
              <FeaturedPrgrmsCardComponent  sevasList={seva}/>
            </div>
            ))}
            <div className="col-md-4 cardcolumn">
              <div className="card featurecards">
              <h5 style={{ background: '#1B787B' }}>Custom</h5>

                <div className="card-body featurecardbody">
                  <div className="featureimg">
                    <img  style={{width:'103px', height:'103px' }} src={InfoImage} width={81} alt={"customImage"} />
                  </div>
                  <div className="cardtext">
                    <div className="btnsgrp mt-4">
                      <ButtonComponent
                        children="View more..."
                        handleButtonClick={() => viewMoreClick()}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <img className="w-100" src={featureprogramfooter} alt="" />
        </div>
      </div>
      <div>
        <Footer />
      </div>

      <ModalPopupComponent show={showModal} handleClose={handleCloseModal}>
        <ProceedModalComponent sevaData={selectedSeva} retrunresponse={closePopup}/>
      </ModalPopupComponent> 
    </div>
  );
};

export default DevineRedirect;
