import LiveStreamImg from '../assets/LiveStreaming.png';
import LiveImg from '../assets/LiveImg.png';
import ButtonComponent from './CustomButtonComponent';
import { useEffect, useState } from 'react';
import useAuthStore from '../store/authStore';
import proxyApi from '../services/proxy';
import { API_ENDPOINTS } from '../services/apiConstants';
import ModalPopupComponent from './ModalPopupComponent';

import ReactPlayer from 'react-player'

function LiveStreamingComponent() {

    const [liveStream, setLiveStream] = useState<any>("");
    const [showModal, setShowModal] = useState(false);
    const [videoPlaying, setVideoPlaying] = useState(false);
 

    const accessToken = useAuthStore(state => state.accessToken); // Get the accessToken from the store
  
    const _proxy = new proxyApi(accessToken);
  
    const url = `${API_ENDPOINTS.getLiveStreamLink}`;
  
    useEffect(() => {
      _proxy.get(url)
        .then((resp: any) => {
            setLiveStream(resp.data.data.streamLink); // Set event data in the state
        })
        .catch((error: any) => {
          console.log(error);
        });
    }, []);
  

    const handleOpenModal = () => {
        setShowModal(true);
        setVideoPlaying(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setVideoPlaying(false);
    };

    return (
        <div>
            <div className='liveStreamingClass'>
                <img className='mainImg' src={LiveStreamImg} alt="" />
                <div>
                    <ButtonComponent handleButtonClick={handleOpenModal}>
                        <img src={LiveImg} />
                    </ButtonComponent>
                </div>
            </div>
            <div>
                <h4 className='liveStreamMessage pt-3 pb-5'>Come join us on this LIVE!</h4>
            </div>
            <ModalPopupComponent show={showModal} handleClose={handleCloseModal}>
                <LivemodalComponent streamlink={liveStream} playing={videoPlaying}/>
            </ModalPopupComponent>
        </div>
    )
}
export default LiveStreamingComponent;

function LivemodalComponent({ streamlink, playing }: any) {
    return (
        <div className="share_box">
          <ReactPlayer url={streamlink} volume={1} playing={playing}/>
        </div>
    )
}


