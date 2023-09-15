import ButtonComponent from "./CustomButtonComponent";
import "./FeaturedPrgrmsCardComponent.css";
import { useState } from "react";
import ModalPopupComponent from "./ModalPopupComponent";
import ProceedModalComponent from "./ProceedModalComponent";

interface contributionsCardProps {

  sevasList:any;
 
}

function FeaturedPrgrmsCardComponent({ sevasList }: contributionsCardProps) {
  const getHeaderCardColor = () => {
    return "#1B787B"; // Fallback color if no specific title matches
  };

  const [showModal, setShowModal] = useState(false);
  const [selectedSeva, setSelectedSeva] = useState(null);
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
  }
}
  // Get the dynamically generated CSS class for headerCard
  const headerCardBackgroundColor = getHeaderCardColor();


  // const referButton = () => {};

  return (
    <div className="card featurecards">
       <h5 style={{ background: headerCardBackgroundColor }}>{sevasList.title}</h5>

      <div className="card-body featurecardbody">
        <div className="featureimg">
          <img src={`data:image/jpeg;base64,${sevasList.sevaImage}`} alt={sevasList.title} />
        </div>
        <div className="cardtext">
          <p className="featuredProgramParagraph">
            {sevasList.description}
          </p>
          <div className="btnsgrp mt-4">
            <ButtonComponent
              children="Proceed now"
              handleButtonClick={()=>handleOpenModal(sevasList)}
            />
          </div>
        </div>
      </div>
      <ModalPopupComponent show={showModal} handleClose={handleCloseModal}>
        <ProceedModalComponent sevaData={selectedSeva} retrunresponse={closePopup}/>
      </ModalPopupComponent> 
    </div>
  );
}

export default FeaturedPrgrmsCardComponent;
