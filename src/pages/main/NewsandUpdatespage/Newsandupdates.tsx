import { useEffect, useState } from 'react';
import Footer from '../../layout/Footer';
import './NewsandUpdates.css';
import useAuthStore from '../../../store/authStore';
import proxyApi from '../../../services/proxy';
import { API_ENDPOINTS } from '../../../services/apiConstants';

const NewsandUpdates = () => {
  const [notifications, setNotificationsAndUpdates] = useState([]);
  const accessToken = useAuthStore(state => state.accessToken); // Get the accessToken from the store

  console.log(accessToken);

  const _proxy = new proxyApi(accessToken);

  const url = `${API_ENDPOINTS.getNotificationsAndUpdates}`;

  useEffect(() => {
    _proxy.get(url)
      .then((resp: any) => {
        setNotificationsAndUpdates(resp.data.data); // Set event data in the state
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container">
      <div className="row screenMinHeight">
        <div className="col-md-12">
          <div className="news">
            {/* <p className='eventtext'>Stay connected with news and updates from the admin</p> */}
            {/* {notifications.map((notification: any) => (
              <div className="isk_donation_cards_card Anna_Card mt-4">
                <div className="row">
                  <div className="dateevnts">
                    <p className="evntdate">{new Date(notification.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    <p className="evnttag">{notification.handle}</p>
                  </div>
                  <div className="eventtext">
                    <p>{notification.prompt}</p>
                  </div>
                </div>
              </div>

            ))} */}
            {notifications.length === 0 ? (
              <p className='eventtext'>Stay connected with news and updates from the admin</p>
            ) : (
              notifications.map((notification: any) => (
                <div className="isk_donation_cards_card Anna_Card mt-4" key={notification.id}>
                  <div className="row">
                    <div className="dateevnts">
                      <p className="evntdate">{new Date(notification.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                      <p className="evnttag">{notification.handle}</p>
                    </div>
                    <div className="eventtext">
                      <p>{notification.prompt}</p>
                    </div>
                  </div>
                </div>
              ))
            )}

          </div>
        </div>
      </div>
      <section>
        <Footer />
      </section>
    </div>
  )

}

export default NewsandUpdates
