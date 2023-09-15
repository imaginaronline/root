import ButtonComponent from "../../../components/CustomButtonComponent";

interface AdminImpactMakeCardComponentProps {
    hedaerImg: any,
    headerTitle: string,
    event:any;
   
}

export default function AdminImpactMakeCardComponent({hedaerImg, headerTitle,event }: AdminImpactMakeCardComponentProps){
    const impactDonateClick = (selectedEvent:any) => {
        console.log(selectedEvent)
    }
    return(
        // <div>
        //     <img src={hedaerImg}  alt="..." />
        //     <h3>{headerTitle}</h3>
        // </div>

        <div className='card impactCardClass'>
        <img className='parentimg' src={hedaerImg} width={300} alt="..." />
        <img className='childimg' src={hedaerImg} width={300} alt="..." />
        <p className="customtitle">{headerTitle}</p>
        <ButtonComponent children="Donate Now" handleButtonClick={() => impactDonateClick(event)}/>
    </div>


    );
}