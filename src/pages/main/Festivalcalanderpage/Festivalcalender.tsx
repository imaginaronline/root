import { useEffect, useState } from 'react';
import Footer from '../../layout/Footer';
import './Festivalcalander.css';
import useAuthStore from '../../../store/authStore';
import proxyApi from '../../../services/proxy';
import { API_ENDPOINTS } from '../../../services/apiConstants';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router";

const FestivalCalender = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const accessToken = useAuthStore(state => state.accessToken); // Get the accessToken from the store
  const _proxy = new proxyApi(accessToken);

  const url = `${API_ENDPOINTS.getAllNewsCalander}`;

  useEffect(() => {
    _proxy.get(url)
      .then((resp: any) => {
        setEvents(resp.data.data); // Set event data in the state
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);

  function donationHandleEvent(selectedDonation: any) {
    _proxy.get(`${API_ENDPOINTS.getDonationData}/${selectedDonation.donationId}`)
      .then((resp: any) => {
        let order_id = "";
        const requestedData = {
          id: resp.data.data.id,
          orderType: 1,
          amount: resp.data.data.amount,
          currency: resp.data.data.currency
        };


        _proxy.post(API_ENDPOINTS.intiatePayment, requestedData)
          .then((resp: any) => {
            order_id = resp.data.orderId;

            const options = {
              key: resp.data.razorPayAPIKey,
              amount: resp.data.amount,
              name: 'ISKCON',
              description: 'Ensurity ISKCON DEMO',
              image: 'https://iskconclient.azurewebsites.net/assets/IskconLogo-4b1fce67.png',
              order_id: resp.data.order_id,
              notes: {
                address: ""
              },
              handler: async (response: any) => {
                const payMentCreationResp = {
                  paymentId: response.razorpay_payment_id,
                  orderId: order_id,
                  signature: response.razorpay_signature,
                  id: resp.data.id,
                  orderType: 1,
                  currency: resp.data.currency
                };
                _proxy.post(API_ENDPOINTS.completePayment, payMentCreationResp)
                  .then((resp: any) => {
                    console.log(resp.data.message);
                    toast.success(resp.data.message);
                  }).catch((error: any) => {

                    console.log(error);
                  });
              },
              prefill: {
                name: resp.data.name,
                email: resp.data.email,
                contact: resp.data.phone,
              },
              theme: {
                color: '#000000'
              }
            };
            const rzp1 = new (window as any).Razorpay(options);
            rzp1.open();
          })
          .catch((error: any) => {
            console.log(error);
          });
        // setEvents(resp.data.data); // Set event data in the state
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  const sevasHandleEvent = (selectedSeva:any) =>{
    localStorage.setItem('seva_id',selectedSeva.sevaId);
    navigate("/application/seekblessings");
  }


  return (
    <div className="container">
      <div className="row screenMinHeight">
        <div className="col-md-12">
          {events.map((event: any) => (
            <div className="news" key={event.id}>
              <div className="isk_donation_cards_card Anna_Card newscard mt-4">
                <div className="row cardrow">
                  <div className="col-md-2 datecontnt">
                    <div className="date">
                      <h2 className="ownhtwo">{new Date(event.date).toLocaleDateString('en-US', { day: 'numeric' })}</h2>
                      <p className="ownp">{new Date(event.date).toLocaleDateString('en-US', { month: 'long' })}</p>
                    </div>
                  </div>
                  <div className="col-md-10">
                    <div className="festival">
                      <div className="vertline"></div>
                      <div className="isk_donation_cards_card_title">
                        {event.title}
                      </div>

                      <div className="isk_donation_cards_card_amount mt-4">
                        <p>
                          {event.description}
                        </p>
                      </div>

                      <div className="schedulerow">
                        <div className="schedulearchana">


                          {event.hasDonation && (<button
                            className="schedulebtn templeCreationButton"
                            data-modal="templecreationmodal"
                            onClick={() => donationHandleEvent(event)}
                          >
                            Schedule {event.donationName}
                          </button>)}

                          {event.hasSeva && (<button
                            className="schedulebtn templeCreationButton"
                            data-modal="templecreationmodal"
                            onClick={()=>sevasHandleEvent(event)}
                          >
                            Schedule {event.sevaName}
                          </button>)}
                        </div>
                        {/* <div className="seedetls">
                        <p className="seedetailsp">see details &gt;&gt;</p>
                      </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer position='bottom-right' />
      <section>
        <Footer />
      </section>
    </div>
  );

}

export default FestivalCalender
