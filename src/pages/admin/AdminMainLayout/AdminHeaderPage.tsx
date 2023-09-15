

import '../admin/'
import './AdminDashboard.css'

interface headerProps{
    title: string;
    dateFlag: any;
}
export default function AdminHeader({title, dateFlag}:headerProps) {
    return (

         <div className="container pt-5">
             <div className="row">
               <div className="col-md-12 overviewRow">
                   <div className='adminLeftContent'>
                   <div className='sideLineDashboard'></div>
                      <div>
                            <p className="overview">{title}</p>
                        </div>
                    </div>
                    {dateFlag && (
                       <div className="dropdown">
                       <button className=" dropdown-toggle dropdown-button" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                         Today
                       </button>
                       <ul className="dropdown-menu">
                         <li><a className="dropdown-item" href="#">Action</a></li>
                         <li><a className="dropdown-item" href="#">Another action</a></li>
                         <li><a className="dropdown-item" href="#">Something else here</a></li>
                       </ul>
                     </div>
                    )}
                 </div>
             </div>
         </div> 
    );
}