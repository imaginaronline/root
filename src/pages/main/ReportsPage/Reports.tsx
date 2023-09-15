import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import './Reports.css'
import useAuthStore from '../../../store/authStore';
import { useEffect, useState } from 'react';
import proxyApi from '../../../services/proxy';
import { API_ENDPOINTS } from '../../../services/apiConstants';

interface SevasAndDonationsData {
  id: any;
  date: any;
  activity: any;
  amount: any;
  name: any;
  phone: any;
}
const Reports = () => {

  const skipCount = 0; // Replace with the desired value
  const maxResultCount = 10; // Replace with the desired value

  const [donations, setDonations] = useState<SevasAndDonationsData[]>([]);
  const [sevas, setSevas] = useState<SevasAndDonationsData[]>([]);
  const accessToken = useAuthStore(state => state.accessToken); // Get the accessToken from the store

  console.log(accessToken);

  const _proxy = new proxyApi(accessToken);

  const donationurl = `${API_ENDPOINTS.getDonations}?SkipCount=${skipCount}&MaxResultCount=${maxResultCount}`;
  const sevasurl = `${API_ENDPOINTS.getsevas}?SkipCount=${skipCount}&MaxResultCount=${maxResultCount}`;

  useEffect(() => {
    _proxy.get(donationurl)
      .then((resp: any) => {
        console.log(resp.data.data);
        setDonations(resp.data.data); // Set event data in the state
      })
      .catch((error: any) => {
        console.log(error);
      });

      _proxy.get(sevasurl)
      .then((resp: any) => {
        console.log(resp.data.data);
        setSevas(resp.data.data); // Set event data in the state
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);

  return (
    <>
    <div className="reporttabs">
    <Tabs
      defaultActiveKey="donations"
      transition={false}
      id="noanim-tab-example"
    >
      <Tab eventKey="donations" title="Your Donations">
      <div className="container table-responsive">
        <table className="table table-bordered table-hover tableborder ">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Activity</th>
              <th scope="col">Amount</th>
              <th scope="col">Name</th>
              <th scope="col">Phone</th>
            </tr>
          </thead>
          
          {donations.length > 0 ? (
            
              donations.map((item) => (
                <tbody className='table-primary'>
                <tr key={item.id}>
                  <th scope="row">
                    <div className='thblue'>{new Date(item.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                  </th>
                  <td className="centered-cell">{item.activity}</td>
                  <td className="centered-cell">{item.amount}</td>
                  <td className="centered-cell">{item.name}</td>
                  <td className="centered-cell">{item.phone}</td>
                </tr>
                </tbody>
              ))
            ) : (
              <tbody className='mt-5'>
                <tr>
                  <td colSpan={5}>
                    <h4>No records found.</h4>
                  </td>
                </tr>
              </tbody>             
            )}
          
        </table>
      </div>
      </Tab>
      <Tab eventKey="seva" title="Your Seva">
      <div className="container table-responsive">
        <table className="table table-bordered table-hover tableborder">
          <thead className="thead-dark">
            <tr>
            <th scope="col">Date</th>
              <th scope="col">Activity</th>
              <th scope="col">Amount</th>
              <th scope="col">Name</th>
              <th scope="col">Phone</th>
            </tr>
          </thead>
          {sevas.length > 0 ? (
            
            sevas.map((item) => (
              <tbody className='table-primary'>
              <tr key={item.id}>
                <th scope="row">
                  <div className='thblue'>{new Date(item.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                </th>
                <td className="centered-cell">{item.activity}</td>
                <td className="centered-cell">{item.amount}</td>
                <td className="centered-cell">{item.name}</td>
                <td className="centered-cell">{item.phone}</td>
              </tr>
              </tbody>
            ))
          ) : (
            <tbody className='mt-5'>
              <tr>
                  <td colSpan={5}>
                    <h4>No records found.</h4>
                  </td>
                </tr>
            </tbody>             
          )}
        </table>
      </div>
      </Tab>
    </Tabs>
    </div>
    
    </>


  )

}



export default Reports
