
import { useEffect, useState } from 'react';
import './AdminDashboard.css';
import useAuthStore from "../../../store/authStore";

interface DonationCardProps {
    headerImg: any,
    headerTitle: string,
    donarName: string,
    donarValue: string,
    donationName: string,
    donationValue: string
}
interface DonationObj {
    donationObjectItem:any
}

function DonationsCardComponent({donationObjectItem}:DonationObj) {
    const [itemObj, setItemObj] = useState<DonationCardProps | null>(donationObjectItem)
    // const[imageChange,setImageChange] = useState<DonationCardProps | null>(null)
    // const[titleChange,setTitleChange] = useState<DonationCardProps | null>(null)
    // const[donationValueChange,setDonationValueChange] = useState<DonationCardProps | null>(null)
    // const[donarValueChange,setdonarValueChange] = useState<DonationCardProps | null>(null)
    const accessToken = useAuthStore(state => state.accessToken);
    console.log(accessToken)
    const headers = new Headers();
    headers.append('accept', '*/*');
    headers.append('RequestVerificationToken', `${accessToken}`);
    headers.append('X-Requested-With',
        'XMLHttpRequest')
    useEffect(() => {
      setItemObj(donationObjectItem);
      console.log(donationObjectItem);
    });
    useEffect(()=>{
        fetch('https://iskconapi.azurewebsites.net/api/donation/getAll', {
            headers
        }
        )
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data)
            // setImageChange(data);
            // setTitleChange(data);
            // setDonationValueChange(data);
            // setdonarValueChange(data);
        })
        .catch((error) => {
            console.log('Error fetching data:', error);
          });
    })
    
    return (
      <>
        {/* <div className='cardMainDiv'>
            <div className="card donationCardCarsoule">
                <div className='cardTopIMg'>
                    <img src={itemObj?.headerImg} className='riceIMg' alt="My Alt Text" />
                </div>
                <div>
                    <p className='annaDhanaDonation'>{itemObj?.headerTitle}</p>
                    <div className='donationSubContentDiv '>
                        <div className='donorDonationValues'>
                            <p className='donorsDonation'>{itemObj?.donarName} : <span className='donationValue'>{itemObj?.donarValue}</span></p>
                        </div>
                        <div className='donorDonationValues'>
                            <p className='donorsDonation'>{itemObj?.donationName} : <span className='donationAmountValue'>{itemObj?.donationValue}</span></p>
                        </div>
                    </div>
                    <button className='reportDonationButton'><span className='reportSize'>View Full Report</span></button>
                </div> 
            </div>
        </div> */}
        <div className="totalcard">
            <div className='cardTopIMg'>
            <img src={itemObj?.headerImg} className='riceIMg' alt="My Alt Text" />
            </div>
            <div className='donationbox '>
                <h5 className='annaDhanaDonation mt-5'>{itemObj?.headerTitle}</h5>
                <p className='donorsDonation mt-4'>{itemObj?.donarName} : <span className='donationValue'>{itemObj?.donarValue}</span></p>
                <p className='donorsDonation mt-2 mb-4'>{itemObj?.donationName} : <span className='donationAmountValue'>{itemObj?.donationValue}</span></p>
                <button className='reportDonationButton mt-5 mb-4'>View Full Report</button>

            </div>
          </div>
        
        
      </>
    );
}

export default DonationsCardComponent;
