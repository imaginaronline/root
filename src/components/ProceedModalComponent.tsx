import { useEffect, useState } from "react";
import CalendarIcon from "../assets/CalenderIcon.png";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuthStore from "../store/authStore";
import proxyApi from "../services/proxy";
import { API_ENDPOINTS } from "../services/apiConstants";

interface DetailRowProps {
  id: number;
  onRemove: (id: number) => void;
}
interface sevaProps {
  sevaData: any;
  retrunresponse:(event:any)=>void;
}
const DetailRow: React.FC<DetailRowProps> = ({ id, onRemove }) => (
  <div className="detail-row">
    <input className="persondetinput" type="checkbox" defaultChecked onClick={() => onRemove(id)} />
    <input className="persondetinput" type="text" name={`firstname_${id}`} required placeholder="First Name" />
    <input className="persondetinput" type="text" name={`lastname_${id}`} required placeholder="Last Name" />
    <input className="persondetinput" type="text" name={`gothra_${id}`} required placeholder="Gothra" />
  </div>
);

function ProceedModalComponent({ sevaData,  retrunresponse }: sevaProps) {
  const [festivalItems, setFestivalItems] = useState([]);
  const [occationItems, setOccationItems] = useState([]);
  const accessToken = useAuthStore(state => state.accessToken); // Get the accessToken from the store

  const _proxy = new proxyApi(accessToken);
  const festivalItemsURL = `${API_ENDPOINTS.getSevaItemsList}/1`;
  const occationsItemsURL = `${API_ENDPOINTS.getSevaItemsList}/2`;
  useEffect(() => {
    _proxy.get(festivalItemsURL)
      .then((resp: any) => {
        setFestivalItems(resp.data.data); // Set event data in the state
      })
    _proxy.get(occationsItemsURL)
      .then((resp: any) => {
        setOccationItems(resp.data.data); // Set event data in the state
      })
  }, []);

  const [archanaTypeSelection, setArchanaTypeSelection] = useState(false);
  const [festivalItemSelection, setFestivalItemSelection] = useState(false);
  const [occationItemSelection, setOccationItemSelection] = useState(false);
  const [dateSelection, setDateSelection] = useState(false);

  //For radio buttons and dropdowns selection...
  const [selectedRadio, setSelectedRadio] = useState<string | null>(null);
  const [selectedDropdownFestival, setSelectedDropdownFestival] = useState<string | null>(null);
  const [selectedDropdownOccation, setSelectedDropdownOccation] = useState<string | null>(null);
  const handleRadioChange = (value: string) => {
    setSelectedRadio(value);
    setSelectedDropdownFestival(null);
    setSelectedDropdownOccation(null);
    setArchanaTypeSelection(false);
  };
  const handleDropdownChangeFestival = (value: string) => {
    setSelectedDropdownFestival(value);
    const matchingFestival = festivalItems.find((festivalItem:any) => festivalItem.name === value);
    if (matchingFestival) {
      setSelectedRadio('1');
    }
    setSelectedDropdownOccation(null);
    setArchanaTypeSelection(false);
    setFestivalItemSelection(false);
  };
  const handleDropdownChangeOccation = (value: string) => {
    setSelectedDropdownOccation(value);
    const matchingOccation = occationItems.find((x:any) => x.name === value);
    if (matchingOccation) {
      setSelectedRadio('2');
    }
    setSelectedDropdownFestival(null);
    setArchanaTypeSelection(false);
    setOccationItemSelection(false);
  };

  //For Row add and delete...
  const [detailRows, setDetailRows] = useState<number[]>([0]);
  const [currentId, setCurrentId] = useState(1);
  const addDetailRow = () => {
    if(detailRows.length < sevaData.maxUsers){
      setDetailRows([...detailRows, currentId]);
      setCurrentId(prevId => prevId + 1);
    }
    else{
      toast.warning("Maximum users added.");
    }
  };
  const removeDetailRow = (id: number) => {
    if (detailRows.length > 1) {
      const updatedRows = detailRows.filter(rowId => rowId !== id);
      setDetailRows(updatedRows);
    }
  };

  // For date selection...
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const handleDateChange = (date: Date | null) => {
    setDateSelection(false);
    setSelectedDate(date);
    // onSelectDate(date!); // Pass the selected date to the parent component
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (selectedRadio == null) {
      setArchanaTypeSelection(true);
    }
    else {
      if (selectedRadio === '1') {
        if (selectedDropdownFestival == null) {
          setFestivalItemSelection(true);
        }
        else {
          setSelectedDropdownFestival(selectedDropdownFestival ? selectedDropdownFestival : null);
        }
      }
      else if (selectedRadio === '2') {
        if (selectedDropdownOccation == null) {
          setOccationItemSelection(true);
        }
        else {
          setSelectedDropdownOccation(selectedDropdownOccation ? selectedDropdownOccation : null);
        }
      }
      else if (selectedDate === null) {
        setDateSelection(true);
      }

      //Amount type...
      // Fixed=1,
      //   Custom=2,
      //   PerPerson=3
      var paybleAmount;
      switch (sevaData.amountType) {
        case '1':
          paybleAmount = sevaData.minAmount;
          break;
        case '2':
          paybleAmount = sevaData.minAmount;
          break;
        case '3':
          paybleAmount = sevaData.minAmount * (detailRows.length)
          break;
      }

      // Your form submission logic here
      var obj = {
        selectedArchanaType: selectedRadio,
        selectedFestivalItem: selectedDropdownFestival,
        selectedOccationItem: selectedDropdownOccation,
        selectedArchanaDate: selectedDate,
        persons: detailRows.map((rowId) => ({
          firstname: event.target[`firstname_${rowId}`].value,
          lastname: event.target[`lastname_${rowId}`].value,
          gothra: event.target[`gothra_${rowId}`].value,
        })),
        paybleAmount:paybleAmount,
        orderId:''
      }
      sevaDonation(obj).then(()=>{
      });
    }
  };


  const sevaDonation = async (selectedEvent: any) => {
   let paybleAmount=0;
    switch (sevaData.amountType) {
      case 1:
        paybleAmount = sevaData.minAmount;
        break;
      case 2:
        paybleAmount = sevaData.minAmount;
        break;
      case 3:
        paybleAmount = sevaData.minAmount * (detailRows.length)
        break;
    }
    selectedEvent.paybleAmount=paybleAmount;
    let order_id="";

    const requestedData = {
        id:sevaData.id,
        orderType:3,
        amount:paybleAmount,
        currency:sevaData.currency
      }; 

      _proxy.post(API_ENDPOINTS.intiatePayment,requestedData)
      .then((resp: any) => {
          order_id=resp.data.orderId;

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
            handler: async (response:any) => {
                const payMentCreationResp = {
                        paymentId:response.razorpay_payment_id,
                        orderId:order_id,
                        signature:response.razorpay_signature,
                        id:sevaData.id,
                        orderType:3,
                        currency:sevaData.currency
                    };

                    _proxy.post(API_ENDPOINTS.completePayment,payMentCreationResp)
                    .then((resp: any) => {
                        toast.success(resp.data.message);
                        
                     selectedEvent.orderId =order_id;

                     _proxy.post(API_ENDPOINTS.createUserSevaDetials,selectedEvent)
                     .then((resp: any) => {
                         toast.success(resp.data.message);
                        retrunresponse(true);
                     }).catch((error: any) => {
     
                         console.log(error);
                     });

                    }).catch((error: any) => {
    
                        console.log(error);
                    });
            },
            prefill: {
              name: resp.data.name,
              email:resp.data.email,
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
      <div className="addDetails_box">
        <div className="addDetails_box_title">Archana Details</div>
        <div className="addDetails_box_line"></div>
      </div>

      <div className="archnachecks mt-5">
        <div className="form-check form-check-inline">
          <label className="archanaLabelsDiv">
            <input
              type="radio"
              name="radioGroup"
              value="0"
              className="archanaRadio"
              checked={selectedRadio === '0'}
              onChange={() => handleRadioChange('0')}
            />
            General
          </label>
        </div>
        <div className="form-check form-check-inline">
          <label className="archanaLabelsDiv">
            <input
              type="radio"
              name="radioGroup"
              value="1"
              className="archanaRadio"
              checked={selectedRadio === '1'}
              onChange={() => handleRadioChange('1')}
            />
            for Festival
          </label>
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-outline-dark dropdown-toggle archanaDropDownBtn"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {selectedDropdownFestival ? selectedDropdownFestival : 'Select'}
            </button>
            <ul className="dropdown-menu archanaDropDownMenu">
              {festivalItems.map((festivalItem: any) => (
                <div className="col-md-4 cardcolumn" key={festivalItem.id}>
                  <li>
                    <a
                      className={`dropdown-item customdropdownitem ${selectedDropdownFestival === festivalItem.name ? 'active' : ''}`}
                      onClick={() => handleDropdownChangeFestival(festivalItem.name)}
                    >
                      {festivalItem.name}
                    </a>
                  </li>
                </div>
              ))}
            </ul>
          </div>
        </div>
        <div className="form-check form-check-inline">
          <label className="archanaLabelsDiv">
            <input
              type="radio"
              name="radioGroup"
              value="2"
              className="archanaRadio"
              checked={selectedRadio === '2'}
              onChange={() => handleRadioChange('2')}
            />
            for Occasion
          </label>
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-outline-dark dropdown-toggle archanaDropDownBtn"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {selectedDropdownOccation ? selectedDropdownOccation : 'Select'}
            </button>
            <ul className="dropdown-menu archanaDropDownMenu">
              {occationItems.map((occationItem: any) => (
                <div className="col-md-4 cardcolumn" key={occationItem.id}>
                  <li>
                    <a
                      className={`dropdown-item customdropdownitem ${selectedDropdownOccation === occationItem.name ? 'active' : ''}`}
                      onClick={() => handleDropdownChangeOccation(occationItem.name)}
                    >
                      {occationItem.name}
                    </a>
                  </li>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {archanaTypeSelection && (<div>
        <p className="text-dangerAlert">Please select atleast one archana type</p>
      </div>)}
      {festivalItemSelection && (<div>
        <p className="text-dangerAlert">Please select festival type</p>
      </div>)}
      {occationItemSelection && (<div>
        <p className="text-dangerAlert">Please select donation type</p>
      </div>)}
      <div className="addDetails_box_formWrapper">
        <form id="myForm" onSubmit={handleSubmit}>
          <div className="detail-sec">
            <label>Details of the person(s)</label>
            <div className="detailsContainer grey_scroll">
              {detailRows.map((rowId) => (
                <DetailRow key={rowId} id={rowId} onRemove={removeDetailRow} />
              ))}
            </div>
            <button
              type="button"
              className="addDetails_btn"
              id="addDetails_btn"
              onClick={addDetailRow}
            >
              Add
              <svg
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.15918 1.52344V14.3377"
                  stroke="currentColor"
                />
                <path
                  d="M14.5664 7.92969L1.75211 7.92969"
                  stroke="currentColor"
                />
              </svg>
            </button>
          </div>

          <div>
            <div className="calenderDateDiv">
              <img
                width={36}
                height={34}
                src={CalendarIcon}
                alt="Calendar Icon"
                className="calendar-icon"
                onClick={() => {
                }}
              />
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
                className="calendar-input"
                placeholderText="Select Date"
              />
            </div>
            {dateSelection && (<div>
              <p className="text-dangerAlert">Please select Archana date</p>
            </div>)}
          </div>

          <div className="float-right sbmtbtn">
            <button type="submit" id="submitBtn" className="makePayment ml-2 float-right archaDetailsSubmit ">
              Continue
            </button>
          </div>
        </form>
      </div>
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default ProceedModalComponent;
