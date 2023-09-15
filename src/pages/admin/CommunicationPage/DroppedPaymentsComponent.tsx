import { useEffect, useState } from "react";


const droppedPaymentsList = [
    {id:11, date:new Date(2023,10,8), category:'donation', particulars:'none', did:'1234567', dropStage:'payment'},
    {id:12, date:new Date(2023,11,8), category:'seva', particulars:'none', did:'1234568', dropStage:'payment'},
    {id:13, date:new Date(2023,12,8), category:'festival', particulars:'none', did:'1234569', dropStage:'payment'},
    {id:14, date:new Date(2023,13,8), category:'seva', particulars:'none', did:'1234570', dropStage:'payment'},
    {id:15, date:new Date(2023,14,8), category:'seva', particulars:'none', did:'1234571', dropStage:'payment'},
    {id:16, date:new Date(2023,15,8), category:'donation', particulars:'none', did:'1234572', dropStage:'payment'},
    {id:17, date:new Date(2023,16,8), category:'festival', particulars:'none', did:'1234573', dropStage:'payment'},
    {id:18, date:new Date(2023,17,8), category:'festival', particulars:'none', did:'1234574', dropStage:'payment'},
    {id:19, date:new Date(2023,18,8), category:'donation', particulars:'none', did:'1234575', dropStage:'payment'},
    {id:20, date:new Date(2023,19,8), category:'donation', particulars:'none', did:'1234576', dropStage:'payment'},
    {id:21, date:new Date(2023,20,8), category:'seva', particulars:'none', did:'1234577', dropStage:'payment'},
    {id:22, date:new Date(2023,21,8), category:'festival', particulars:'none', did:'1234578', dropStage:'payment'},
    {id:23, date:new Date(2023,22,8), category:'donation', particulars:'none', did:'1234579', dropStage:'payment'},
    {id:24, date:new Date(2023,23,8), category:'festival', particulars:'none', did:'1234580', dropStage:'payment'},
    {id:25, date:new Date(2023,24,8), category:'donation', particulars:'none', did:'1234581', dropStage:'payment'},
    {id:26, date:new Date(2023,25,8), category:'donation', particulars:'none', did:'1234582', dropStage:'payment'},
    {id:27, date:new Date(2023,26,8), category:'seva', particulars:'none', did:'1234583', dropStage:'payment'},
    {id:28, date:new Date(2023,27,8), category:'donation', particulars:'none', did:'1234584', dropStage:'payment'},
    {id:29, date:new Date(2023,28,8), category:'festival', particulars:'none', did:'1234585', dropStage:'payment'},
    {id:30, date:new Date(2023,29,8), category:'seva', particulars:'none', did:'1234586', dropStage:'payment'},

]
function DroppedPayments() {
    const [dropPaymentsList, setDropPaymentsList] = useState(droppedPaymentsList);

    useEffect(()=>{
        setDropPaymentsList(droppedPaymentsList);
    })
    return (
        <div className="dropOffDetailsContentTable">
            <div className="tableContent">
                <table className="table table-striped tableborder">
                    <thead className="thead-dark headerTags">
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Category</th>
                            <th scope="col">Particulars</th>
                            <th scope="col">DID</th>
                            <th scope="col">Drop stage</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {dropPaymentsList.map((item:any)=>(
                            <tr key={item.id}>
                            <td>{item.date.toLocaleDateString()}</td>
                            <td>{item.category}</td>
                            <td>{item.particulars}</td>
                            <td>{item.did}</td>
                            <td>{item.dropStage}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DroppedPayments;