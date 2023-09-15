import DonationsCardComponent from './DonationsCard';
import './AdminDashboard.css';
import AdminCarsouelCard from './AdminCarsouelCard';
import { useEffect, useState } from 'react';

const donationCardData = [
    {
      id:111,
      headerImg: 'image_url_1',
      headerTitle: 'Donation Title 1',
      donarName: 'Donor Name 1',
      donarValue: '1000',
      donationName: 'Donation Name 1',
      donationValue: '500',
    },
    {
      id:222,
      headerImg: 'image_url_2',
      headerTitle: 'Donation Title 2',
      donarName: 'Donor Name 2',
      donarValue: '1500',
      donationName: 'Donation Name 2',
      donationValue: '750',
    },
    {
        id:333,
        headerImg: 'image_url_1',
        headerTitle: 'Donation Title 1',
        donarName: 'Donor Name 1',
        donarValue: '1000',
        donationName: 'Donation Name 1',
        donationValue: '500',
      },
      {
        id:444,
        headerImg: 'image_url_2',
        headerTitle: 'Donation Title 2',  
        donarName: 'Donor Name 2',
        donarValue: '1500',
        donationName: 'Donation Name 2',
        donationValue: '750',
      },
    // Add more objects as needed
  ];

export default function AdminDonationCarsouelCard() {
    const [events, setEvents] = useState(donationCardData);

    useEffect(() => {
        fetch('')
            .then((resp: any) => {
                setEvents(resp.data.data); 
            })
            .catch((error: any) => {
                console.log(error);
            });
    }, []);
    
    return (
        <div className='container'>

            <AdminCarsouelCard itemsCount={4}>
                {/* <div className="item">
                    <DonationsCardComponent hedaerImg={Rice} headerTitle='Anna Dhana' donarName='No.of Donors :' donarValue='10' donationName='Total Amount :' donationValue='20,000' />
                </div>
                <div className="item">
                    <DonationsCardComponent hedaerImg={Rice} headerTitle='Anna Dhana' donarName='No.of Donors :' donarValue='10' donationName='Total Amount :' donationValue='20,000' />
                </div>
                <div className="item">
                    <DonationsCardComponent hedaerImg={Rice} headerTitle='Anna Dhana' donarName='No.of Donors :' donarValue='10' donationName='Total Amount :' donationValue='20,000' />
                </div> */}

                {events.map((event:any) => (
                    <div className="item"  key={event.id}>
                        <DonationsCardComponent donationObjectItem={event}/>
                    </div>
                ))}
            </AdminCarsouelCard>

        </div>


    );
}