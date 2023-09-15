
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import './CommunicationComponent.css';

interface Filter {
    id: number;
    filterName: string;
}
const FiltersList = [
    { id: 123, filterName: 'test1' },
    { id: 124, filterName: 'test2' },
    { id: 125, filterName: 'test3' },
    { id: 126, filterName: 'test4' },
    { id: 127, filterName: 'test5' },
    { id: 128, filterName: 'test6' },
]
function SendPromptComponent() {
    const [filters, setListFilters] = useState(FiltersList);
    useEffect(() => {
        setListFilters(FiltersList);
    }, []);

    const [selectedFilter, setSelectedFilter] = useState<Filter | null>(null);
    const [textareaContent, setTextareaContent] = useState('');
    const [formIsValid, setFormIsValid] = useState(true);

    const handleFilterSelection = (filter: Filter) => {
        setSelectedFilter(filter);
        setFormIsValid(false);
    };

    const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextareaContent(event.target.value);
        setFormIsValid(false);
    };

    const handleSubmit = () => {
        if (!selectedFilter || !textareaContent) {
            setFormIsValid(false);
            toast.error("Please select message and filter value");
            return;
        }

        setFormIsValid(true);
        setSelectedFilter(null);
        setTextareaContent('');
    };

    return (
        <div className="sendPromptMain">
            <div className='contentTextArea'>
                <textarea
                    className={`form-control textAreaField ${formIsValid ? '' : 'is-invalid'}`}
                    placeholder='Enter Your Message'
                    value={textareaContent}
                    onChange={handleTextareaChange}
                ></textarea>
                {!formIsValid && <div className="error_message3">Please enter a message and select a filter.</div>}
            </div>
            <div className='buttonsListDiv'>
                <div className="dropdown">
                    <a className="btn btn-secondary dropdown-toggle customButtonItemsStyle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {selectedFilter ? selectedFilter.filterName : "Filter"}
                    </a>
                    <ul className="dropdown-menu">
                        {filters.map((filter) => (
                            <li key={filter.id}>
                                <a
                                    className="dropdown-item"
                                    onClick={() => handleFilterSelection(filter)}
                                >
                                    {filter.filterName}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="cancelSubmitButtonsDiv">
                    <div>
                        <button className='cancelAndSubmitBTN' type='button'>Cancel</button>
                    </div>
                    <div>
                        <button className='cancelAndSubmitBTN' type='button' onClick={handleSubmit}>Send</button>
                    </div>
                </div>
            </div>
            <ToastContainer position="bottom-right" />
        </div>
    )
}

export default SendPromptComponent;