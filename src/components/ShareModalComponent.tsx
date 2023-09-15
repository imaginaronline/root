import { useState } from 'react';
import telegramImg from '../assets/tel_circle.png';
import whatsapCircle from '../assets/wa_circle.png';
import ButtonComponent from './CustomButtonComponent';
function SharemodalComponent() {
    // const [copyContent, setCopyContent] = useState("Iskon.com/asjahsjadhjj");
    const [copyContent] = useState("Iskon.com/asjahsjadhjj");

    const handleInputChange = () => {
        
    }
    
    const openTelegramModal = () => {

    }
    const openWhatsappModal = () => {

    }
    return (
        <div className="share_box">
            <div className="chant108malas_box_title">Share</div>
            <div className="share_box_line"></div>

            <div className="share_box_text">Share this link via</div>

            <div className="share_box_socials">
                <ButtonComponent handleButtonClick = {openTelegramModal}>
                    <img src={telegramImg}  alt='telegram'/>
                </ButtonComponent>
                <ButtonComponent handleButtonClick = {openWhatsappModal}>
                    <img src={whatsapCircle} alt='whatsapp' />
                </ButtonComponent>

            </div>

            <div className="share_box_text">Or copy link</div>

            <div className="share_box_copy">
                <div className="share_box_copy_group">
                    <input value={copyContent} type="text" className="input" title="" placeholder='share' name="copyContent" id="copyInput" onChange={handleInputChange} />
                    <button className="share_box_copy_group_btn" id="copyButton">
                        Copy
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SharemodalComponent;