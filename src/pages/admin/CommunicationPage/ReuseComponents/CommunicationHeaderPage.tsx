

interface headerProps{
    title:string;
}
function CommunicationHeaderPage({title}:headerProps){
    return(
        <div className="communicationHeaderBody">
            <div className="leftSideLine">
            </div>
            <div>
                <p className="headTitle">{title}</p>
            </div>
        </div>
    );

}

export default CommunicationHeaderPage;