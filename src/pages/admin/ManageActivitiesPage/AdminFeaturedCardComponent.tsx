import ButtonComponent from "../../../components/CustomButtonComponent";
// import ModalPopupComponent from "../../../components/ModalPopupComponent";
// import ProceedModalComponent from "../../../components/ProceedModalComponent";
// import { useState } from "react";


interface contributionsCaProps {
    title:string,
    image:any,
    sevasList:any;
  }
  
export default function AdminFeaturedCardComponent({title,image,sevasList}:contributionsCaProps){
    const getHeaderCardColor = () => {
        return "#1B787B"; // Fallback color if no specific title matches
      };
    
  // const [showModal, setShowModal] = useState(false);
  // const [selectedSeva, setSelectedSeva] = useState(null);
  const handleOpenModal = (seva:any) => {
    console.log(seva);
    // setSelectedSeva(seva);
    // setShowModal(true);
  };
  // const handleCloseModal = () => {
  //   setShowModal(false);
  // };

  // const retrunResp =() =>{

  // }
  const headerCardBackgroundColor = getHeaderCardColor();

  
    return(

      <div className="card featurecards">
      <h5 style={{ background: headerCardBackgroundColor }}>{title}</h5>

     <div className="card-body featurecardbody">
       <div className="featureimg">
         <img src={image} alt={title} />
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
     {/* <ModalPopupComponent show={showModal} handleClose={handleCloseModal}>
       <ProceedModalComponent sevaData={selectedSeva}/>
     </ModalPopupComponent>  */}
   </div>
    );
}