import AdministartiveAudioChantComponent from "./AdministartiveAudioChantComponent";
import AdministartiveLimeStreamComponent from "./AdministartiveLimeStreamComponent";
import AdministartiveTicketText from "./AdministartiveTicketText";



function AdministrativeComponent({ switchComponent}:any){
    return( 
        <div className="container pt-5">
            <div className=" pt-5">
                <section className="filterTargetGroup">
                    <div className="card admfiltersCard">
                        <div className="addnewdonationform">
                            <div className="row">
                                <div className="activitesHeaderBody">
                                    <div className="leftSideLine">
                                    </div>
                                    <div className='activitytitle'>
                                        <p className="headTitle">Event Calendar</p>
                                    </div>
                                </div>
                                <div className="col-md-12 mt-5">
                                    <div className="card admcard">
                                        <div className="card-body admimgbody">
                                            <h4><b>Edit Calendar Events and Non functional days</b></h4>
                                            <button type="submit" className="btn btn-primary clckbtn" onClick={switchComponent}>Click Here</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <AdministartiveAudioChantComponent/>
                            </div>
                            <div>
                                <AdministartiveTicketText/>
                            </div>
                            <div>
                                <AdministartiveLimeStreamComponent/>
                            </div>

                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default AdministrativeComponent

