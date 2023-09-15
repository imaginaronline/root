import redColorImg from "../../../assets/icons/redColorIcon.png";
import greenColorImg from "../../../assets/icons/greenColorIcon.png";
import { useEffect, useState } from "react";

const usersMessageList = [
    {id:11, userName:'Test1', did:'12345678967', image:redColorImg, messages:[{id:21, date:new Date(2023,10,8), textMessage:'User sent Message Text appears Here'},{id:22, date:new Date(2023,12,8), textMessage:'User sent Message Text appears Here'}]},
    {id:12, userName:'Test2', did:'12345678968', image:greenColorImg, messages:[{id:31, date:new Date(2023,11,8), textMessage:'User sent Message Text appears Here'},{id:32, date:new Date(2023,12,8), textMessage:'User sent Message Text appears Here'}]},
    {id:13, userName:'Test3', did:'12345678969', image:greenColorImg, messages:[{id:41, date:new Date(2023,12,8), textMessage:'User sent Message Text appears Here'},{id:42, date:new Date(2023,15,8), textMessage:'User sent Message Text appears Here'}]},
    {id:14, userName:'Test4', did:'12345678970', image:redColorImg, messages:[{id:51, date:new Date(2023,13,8), textMessage:'User sent Message Text appears Here'},{id:52, date:new Date(2023,17,8), textMessage:'User sent Message Text appears Here'}]},

]

function MessagesFromUserPage(){
    const [usersMessagesSentList, setUsersMessagesList] = useState(usersMessageList);

    useEffect(()=>{
        setUsersMessagesList(usersMessageList);
    })
    return(
        <div className="messagesFromUserPageContent">
            <div className="row adminInboxCardsListDiv">
                {usersMessagesSentList.map((item:any)=>(
                    <div className="col-md-6 adminInboxCard" key={item.id}>
                        <div>
                            <img src={item.image} alt="redDot-img" className="colorDot" />
                        </div>
                        <div className="adminInboxHeadContentDiv">
                            <div className="imageClassDiv">

                            </div>
                            <div className="nameDidContentClassDiv">
                                <p className="inboxUserName">{item.userName}</p>
                                <button className="inboxButton">DID : {item.did}</button>
                            </div>
                        </div>
                        <div className="inboxTextMesagesDiv">
                            {item.messages.map((message:any)=>(
                                <div key={message.id}>
                                    <p className="dateTag">{message.date.toLocaleDateString()}</p>
                                    <p className="messageTag">*{message.textMessage}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
}

export default MessagesFromUserPage;