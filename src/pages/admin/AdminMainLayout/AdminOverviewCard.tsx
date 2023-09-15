import './AdminDashboard.css'
import LoginCountImg from '../../../assets/LoginCountImg.png';
import Revenue from '../../../assets/Revenue.png';
import Star from '../../../assets/Star.png';
import Balance from '../../../assets/Balance.png';
import  { useState, useEffect } from 'react';

interface TestProps{
    loginValue:number,
    dayRevenue:number,
    topCategory:string,
    topPayChannel:string,
}

export default function AdminOverviewCard() {

    const [headerResp, setHeaderResp] = useState<TestProps | null>(null);

    useEffect(() => {
        fetch('')
          .then((response) => response.json())
          .then((data) => {
            setHeaderResp(data); 
          })
          .catch((error) => {
            console.log('Error fetching data:', error);
          });
      }, []); 
    
    return (
        <div className='container'>
            <div className='row  totalEntireCards'>
                <div className="col-md-3">
                    <div className='LogInCardData'>
                        <div className="imagebox"> <img src={LoginCountImg} className='LoginCounImg' alt="My Image" /> <p>Login Count</p></div>
                        <p className='annadhana'>{headerResp?.loginValue}</p>
                        {/* <p className='annadhana'>500</p> */}
                    </div>
                </div>
                <div className="col-md-3">
                    <div className='LogInCardData'>
                        <div className="imagebox"> <img src={Revenue} className='LoginCounImg' alt="My Image" /><p> Day Revenue</p></div>
                        <p className='annadhana'>{headerResp?.dayRevenue}</p>
                        {/* <p className='annadhana'>8,000</p> */}
                    </div>
                </div>
                <div className="col-md-3">
                    <div className='LogInCardData'>
                        <div className="imagebox"> <img src={Star} className='LoginCounImg' alt="My Image" /><p>Top Category</p></div>
                        <p className='annadhana'>{headerResp?.topCategory}</p>
                        {/* <p className='annadhana'>AnnaDhana</p> */}
                    </div>
                </div>


                <div className="col-md-3">
                    <div className='LogInCardData'>
                        <div className="imagebox"> <img src={Balance} className='LoginCounImg' alt="My Image" /><p>TopPay Channel</p></div>
                        <p className='onlinePay'>{headerResp?.topPayChannel}</p>
                        {/* <p className='annadhana'>ONline Pay</p> */}
                    </div>
                </div>
            </div>
            </div>
    );
}