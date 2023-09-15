
import "./AdminLayoutStyles.css";
import AdminArchanaDailyCard from './AdminArchanaDailyCard';
import AdminDonationCarsouelCard from './AdminDonationCarsouelCard';
import AdminHeader from './AdminHeaderPage';
import AdminOverviewCard from "./AdminOverviewCard";
import AdminOverviewSecondCard from './AdminOverviewSecondCard';
import AdminSevaCarsouelCard from './AdminSevaCarsouelCard';


export default function AdminMainMenuNav() {

  return (
    <div className="AppMenu ">

        <div className='col-md-12'>

              <div className='mainDashboardContent'>
                   <div>
                         <AdminHeader  title={"Overview"} dateFlag={true}/>
                    </div>
                    <div>
                         <AdminOverviewCard />
                    </div>
                    <div>
                         <AdminOverviewSecondCard />
                    </div> 
                    <div>
                         <AdminHeader  title={"Donation"} dateFlag={true}/>
                    </div>
                    <div>
                         <AdminDonationCarsouelCard />
                    </div>

                    <div>
                         <AdminHeader  title={"Archana Daily"} dateFlag={false}/>
                    </div>
                    <div>
                         <AdminArchanaDailyCard />
                    </div>
                    <div>
                         <AdminHeader  title={"Seva"} dateFlag={true}/>
                    </div>
                    <div>
                         <AdminSevaCarsouelCard />
                    </div> 
               </div> 
          </div>
      </div>
  );
}
