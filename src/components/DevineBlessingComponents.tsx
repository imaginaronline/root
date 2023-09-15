import ButtonComponent from "./CustomButtonComponent";
import SeekDevineImg from '../assets/seekDevineImg.png';
import { useNavigate } from "react-router-dom";

function DevineBlessingComponent() {
    const navigate = useNavigate();
    
    const devineBlessings = () => {
        navigate('/application/seekblessings');
    };

    return (
        <div className='row devineBlessingImgClass'>
            <img src={SeekDevineImg} alt="" />
            <div>
                <h4> Seek Divine Blessings</h4>
                <p>Perform your Archana from anywhere!</p>
            </div>
            <div>
                <ButtonComponent children="Click Here" handleButtonClick={devineBlessings}/>
            </div>
        </div>
    )
}
export default DevineBlessingComponent;