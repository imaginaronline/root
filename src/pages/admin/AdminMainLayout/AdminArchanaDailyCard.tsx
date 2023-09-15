import "./AdminDashboard.css"
import "./AdminLayoutStyles.css"
import FirstEllipse from '../../../assets/firstEllipse.png'
import SecondEllipse from '../../../assets/secondEllipse.png'
import { useEffect, useState } from 'react';

interface TestEllipseProps{
    todayCount:number,
    tomorrowCount:number,
}

export default function AdminArchanaDailyCard(){
    const [bothCount,setBothCount] = useState<TestEllipseProps | null>(null)

    useEffect(() => {
        fetch('')
        .then((response) => response.json())
        .then((data) => {
            setBothCount(data); 
            
        })
        .catch((error) => {
            console.log('Error fetching totalCollection data:', error);
        });
    }, []);

    return(
        <div className="container">
                {/* <div className='allArchanaCard'>
                    <div className='twoEllipse'> */}
                        
            <div className="row allArchanaCard">
                <div className="col-md-4 archanacircle">
                    <img src={FirstEllipse} className='firstEllipse' alt='FirstEllipse'/>
                    <p className='todayCount'>Todays Count</p>
                    <p className='fourteen'>{bothCount?.todayCount}</p>
                </div>
                <div className="col-md-4 archanacircle">
                    <img src={SecondEllipse} className='secondEllipse' alt='secondEllipse'/>
                    <p className='forTomorrow'>For Tomorrow</p>
                    <p className='eight'>{bothCount?.tomorrowCount}</p>
                </div>
                <div className="col-md-4">
                    <div className='todayCentre'>
                        
                    </div>
                    <div className='todayCentrer'>
                        
                    </div>
                    <div className='plusContent'>
                        <button className="plusButtonDiv">+</button>
                        <button className='reportButton'><span className='reportSize'>View Full Report</span></button>
                    </div>
                </div>
           </div>   
                {/* </div>
            </div> */}
        </div>
    );
}