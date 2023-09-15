
import ButtonComponent from './CustomButtonComponent';
import orangelayer from "../assets/orangelayer.png"
import 'react-toastify/dist/ReactToastify.css';

interface ImpactCardProps {
    event:any // Make the 'event' prop optional by adding '?'
    impactDonationsResp:(returnResp:any) => void;
  }
function ImpactCardComponent({ event, impactDonationsResp } : ImpactCardProps) {


    const impactDonateClick = (selectedEvent:any) => {
        // Implement your logic for the join now button click with the event id
        impactDonationsResp(selectedEvent);
        }

          
    return (
        <div className='card impactCardClass'>
            <img className='parentimg' src={`data:image/jpeg;base64,${event.donationImage}`} width={300} alt="..." />
            <img className='childimg' src={orangelayer} width={300} alt="..." />
            <p className="customtitle">{event.title}</p>

          
            <ButtonComponent children="Donate Now" handleButtonClick={() => impactDonateClick(event)}/>
        </div>
    );
}

export default ImpactCardComponent;