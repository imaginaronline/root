
import { useEffect, useState } from 'react';
import '../admin/'
import './AdminDashboard.css'

interface TestProps{
    totalCollection:number,
    totalUsers:number,
}

export default function AdminOverviewSecondCard() {

    const [headerResp, setHeaderResp] = useState<TestProps | null>(null); 
    

    useEffect(() => {
        fetch('')
        .then((response) => response.json())
        .then((data) => {
            setHeaderResp(data); 
            
        })
        .catch((error) => {
            console.log('Error fetching totalCollection data:', error);
        });
    }, []);
 
    return (
            <div className='container'>
                <div className="row ovwrviewcard">

                <div className="col-md-12 entireOverViewSecondCard">
                    <div className='collections'>
                    <p className="">Total Collection:</p>
                    <p className="collectionNumber">{headerResp?.totalCollection}</p>
                    {/* <p>90,000</p> */}
                    </div>
                    <div className='divider'></div>
                    <div className='collections'>
                    <p className="">Total Users:</p>
                    <p className="usersNumber">{headerResp?.totalUsers}</p>
                    {/* <p>90,000</p> */}
                    </div>
                </div>
                </div>
            </div>
            );
}