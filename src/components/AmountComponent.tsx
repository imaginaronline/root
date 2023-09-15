import { useEffect, useState } from "react";
import { Form } from 'semantic-ui-react';

interface amountProps{
    returnResp: (resp:any)=> void;
    selectedDataObj:any,
}

function AmountComponent ({returnResp, selectedDataObj}:amountProps){
    const [amount, setAmount] = useState('');
    const [errorMsg, setErrorMsg] = useState(false);
    const [title, setTitle] = useState('');
    useEffect(() => {
        if (selectedDataObj) {
            setTitle(selectedDataObj.title);
        }
    }, [selectedDataObj]);
    const handleChange = (e: any) => {
        setErrorMsg(false);
        setAmount(e.target.value);
    };

    const handleSubmit = (e: any) => {

        e.preventDefault();
        if (amount != '') {
            returnResp(amount);
        }
        else {
            setErrorMsg(true);
        }
    };


    return(
        <div className="addAmountCard">
                <div>
                    <h4 className="amountLabel">{title}
                    </h4>
                </div>
                <Form onSubmit={handleSubmit}>
                    <div className="enterAmountForm">
                        <input
                            className="amountInput"
                            type="number"
                            id="profile_pic"
                            min="1"
                            step="any"
                            placeholder="Enter amount"
                            onChange={handleChange}
                        />
                        {errorMsg && (<p className="error_message2">Please enter the amount</p>)}
                        <button className="amountSubmitButton" type="submit">Submit</button>
                    </div>
                </Form>
            </div>
    )
}

export default AmountComponent;