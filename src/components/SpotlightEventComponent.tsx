import useAuthStore from '../store/authStore';
import ButtonComponent from './CustomButtonComponent';
import { API_ENDPOINTS } from '../services/apiConstants';
import { useEffect, useState } from 'react';
import proxyApi from '../services/proxy';
import Carousel from 'react-bootstrap/Carousel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalPopupComponent from './ModalPopupComponent';
import AmountComponent from './AmountComponent';



function SpotLightEvent() {

    const [events, setEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const skipCount = 0; // Replace with the desired value
    const maxResultCount = 10; // Replace with the desired value
    const accessToken = useAuthStore(state => state.accessToken); // Get the accessToken from the store

    const _proxy = new proxyApi(accessToken);

    const url = `${API_ENDPOINTS.getAllUpcomingSPOTLightEvents}?SkipCount=${skipCount}&MaxResultCount=${maxResultCount}`;

    useEffect(() => {
        _proxy.get(url)
            .then((resp: any) => {
                setEvents(resp.data.data); // Set event data in the state
            })
            .catch((error: any) => {
                console.log(error);
            });
    }, []);
    const handleOpenModal = (event: any) => {
        setSelectedEvent(event);
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };

    const returnresponseEvent = (amount: any) => {

        if (amount != '') {
            setShowModal(false);
            localStorage.removeItem('seva_id');
            joinNowButtonClick(selectedEvent, amount);
        }
    }
    // Check a condition here to determine the autoClose time
    const autoCloseTime = true ? 2000 : 2000;
    const reloadfunction = () => {
        setTimeout(() => {
            window.location.reload(); // Reload the page
        }, autoCloseTime);
    }

    const joinNowButtonClick = (selectedEvent: any, amount: any) => {
        // Implement your logic for the join now button click with the event id
        let order_id = "";
        const requestedData = {
            id: selectedEvent.id,
            orderType: 1,
            amount: amount,
            currency: selectedEvent.currency
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
                            id: selectedEvent.id,
                            orderType: 1,
                            currency: selectedEvent.currency
                        };

                        _proxy.post(API_ENDPOINTS.completePayment, payMentCreationResp)
                            .then((resp: any) => {
                                console.log(resp.data.message);
                                toast.success(resp.data.message, {
                                    autoClose: autoCloseTime,
                                });
                                reloadfunction();
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

    };

    return (
        <div>
            <Carousel>
                {events.map((event: any) => (

                    <Carousel.Item key={event.id}>
                        <div className='spotLightImgClass'>
                            <img className='spotLightImg' src={`data:image/jpeg;base64,${event.image}`} alt={event.title} />
                            <p>Be a part of the celebration!</p>
                            <h4>{event.title}</h4>
                            <ButtonComponent children="Join Now" handleButtonClick={() => handleOpenModal(event)} />
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
            <ModalPopupComponent show={showModal} handleClose={handleCloseModal}>
                <AmountComponent returnResp={returnresponseEvent} selectedDataObj={selectedEvent}/>
            </ModalPopupComponent>
            <ToastContainer position='bottom-right' />
        </div>


    )
}
export default SpotLightEvent;