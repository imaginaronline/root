import '../admin/'
import './AdminDashboard.css'
import Messages from '../../../assets/Messages.png'
import AddEntry from '../../../assets/AddEntry.png'
import Calender from '../../../assets/Calender.png'
import Notify from '../../../assets/Notify.png'

export default function AdminSideBar() {

    return (
        <div>            
            <div className='card eniteSideCardImgs'>
            <div className='alignTwo'>
                <div className='messageClor'>
                    <div className='sendMessage'>
                        <img src={Messages} className='allIMg'/>
                    <p className='send'>Send Message</p>
                </div>
                </div>
                <div className='addClor'>
                    <div className='addEntry'>
                    <img src={AddEntry} className='allIMg'/> 
                            <p className='add'>Add Entry</p>
                        </div>
                </div>
            </div>
            <div className='alignLastTwo'>
                <div className='messageClor'>
                    <div className='sendMessage'>
                        <img src={Calender} className='allIMg'/>
                    <p className='calen'>Edit Calender</p>
                </div>
                </div>
                <div className='addClor'>
                    <div className='addEntry'>
                    <img src={Notify} className='allIMg'/> 
                            <p className='notify'>Notify Volunteers</p>
                        </div>
                </div>
            </div>

            </div>
        </div>
    );
}