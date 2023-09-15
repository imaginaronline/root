import {  useEffect, useState } from "react";
import CarausolComponent from "./CarouselsComponent";
import ContributionsCardComponent from "./ContributionCardComponent";
import ModalPopupComponent from "./ModalPopupComponent";
import SharemodalComponent from "./ShareModalComponent";
import AmountComponent from "./AmountComponent";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuthStore from "../store/authStore";
import proxyApi from "../services/proxy";
import { API_ENDPOINTS } from "../services/apiConstants";

//data Type...
// CommonDonations:1,
// FestivalDonations:2,
// CommonSevas:3,
// FestivalSevas:4,
// CommonEvents:5,
// FestivalEvents:6
interface EngagementsObject {
    id: any,
    title:any,
    type: any,
    message: any,
    donated: any,
    dueDays: any,
    milestone: any,
    hasContributed: any
}

// const yourEngagements = [
//     { id: '1', title: 'Annadhan', type:1, hasContributed:true, message:'400 Meals',donated:500, dueDays: 0 },
//     { id: '2', title: 'Ram Navami', type:2, hasContributed:false, message:'0 Meals', donated:0, dueDays: 5 },
//     { id: '3', title: 'Archana Seva', type:4, hasContributed:false, message:'15%',donated:0, dueDays: 7 },
//     { id: '4', title: 'Milk Seva', type:3, hasContributed:true, message:'05/07/2023',donated:1000, dueDays: 0 },
//     { id: '5', title: 'Janmastmi', type:2, hasContributed:true, message:'5%',donated:400, dueDays: 0 },
//     // { id: '6', title: 'Ram Navami', type:5, hasContributed:false, message:'5%', donated:0, dueDays: 3 },
// ];
function ContributionsComponent() {
    const [engagements, setEngagements] = useState<EngagementsObject[] | []>([]);
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);

    const [selectedObj, setSelectedObj] = useState(null);
    const accessToken = useAuthStore(state => state.accessToken); // Get the accessToken from the store

    const _proxy = new proxyApi(accessToken);

    const url = `${API_ENDPOINTS.getAllEngagements}`;
    useEffect(() => {
        _proxy.get(url)
        .then((resp: any) => {
            var data = resp.data.data;
            setEngagements(data); // Set event data in the state
        })
        .catch((error: any) => {
            console.log(error);
        });
    }, [engagements]);

    const handleOpenModal = (selectedContribution1:any) => {
        console.log(selectedContribution1)
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };
    const handleCloseModal2 = () => {
        setShowModal2(false);
    };
    const handleDonateModal = (selectedContribution2:any) => {
        console.log(selectedContribution2);
        setSelectedObj(selectedContribution2);
        setShowModal2(true);
    }
    const returnresponseDonationNowEvent = (amount:any) => {
        joinNowButtonClick(selectedObj, amount)
        setShowModal2(false);
    }


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
        <>
            <CarausolComponent itemsCount={4}>
                {engagements.map((engagement:any)=>(
                    <div className="item" key={engagement.id}>
                    <ContributionsCardComponent contribution={engagement} handleOpenShareModal={handleOpenModal} handleDonateButtonModal={handleDonateModal}/>
                </div>
                ))}
            </CarausolComponent>
            <ModalPopupComponent show={showModal} handleClose={handleCloseModal}>
                <SharemodalComponent />
            </ModalPopupComponent>
            <ModalPopupComponent show={showModal2} handleClose={handleCloseModal2}>
                <AmountComponent returnResp={returnresponseDonationNowEvent} selectedDataObj={selectedObj}/>
            </ModalPopupComponent>

            <ToastContainer position='bottom-right' />
        </>
    )
}
export default ContributionsComponent;