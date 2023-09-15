// import { useState } from "react";
// import 'react-datepicker/dist/react-datepicker.css';
// import DatePicker from "react-datepicker";
// // import Slider from 'rc-slider';
// import calenderImg from '../../../assets/icons/calender.svg';
// import React from "react";

// interface CustomProps {
//     value: any;
//     onClick: () => void
// }

// const CustomInput = React.forwardRef<HTMLInputElement, CustomProps>(({ value, onClick }, ref) => (
//     <div className="input-group">
//         <input
//             type="text"
//             value={value}
//             onClick={onClick}
//             className="form-control calenderText"
//             readOnly
//             ref={ref}

//         />
//         <div className="input-group-append" onClick={onClick}>
//             <span className="input-group-text inputSpanClass">
//                 <img className="calenderImage" src={calenderImg} alt="calender" />
//             </span>
//         </div>
//     </div>
// ));

// function FilterData() {

//     //For start Date and End date...
//     const [startDate, setStartDate] = useState(null);
//     const [endDate, setEndDate] = useState(null);

//     //For range selector...
//     const [minValue, setMinValue] = useState(130);
//     const [maxValue, setMaxValue] = useState(250);

//     const handleSliderChange = (event: any) => {
//         const newValue = parseFloat(event.target.value);
//         // Determine whether to update the minimum or maximum value
//         if (Math.abs(newValue - minValue) < Math.abs(newValue - maxValue)) {
//             setMinValue(newValue);
//         } else {
//             setMaxValue(newValue);
//         }
//     };


//     return (

//         <div className="card filtersCard">
//             <div className="typeAndDateDiv">
//                 <div className="col-md-7">
//                     <p className="pTag">Type</p>
//                     <div className="typeSelection">
//                         {/* <div className="form-check">
//                             <input className="form-check-input filterinput" type="checkbox" defaultValue="check1" id="defaultCheck1" />
//                             <label className="form-check-label typeLabel" htmlFor="defaultCheck1">
//                                 All
//                             </label>
//                         </div> */}
//                         <div className="form-check">
//                             <input className="form-check-input filterinput" type="checkbox" defaultValue="check2" id="defaultCheck1" />
//                             <label className="form-check-label typeLabel" htmlFor="defaultCheck1">
//                                 Donations
//                             </label>
//                         </div>
//                         <div className="form-check">
//                             <input className="form-check-input filterinput" type="checkbox" defaultValue="check3" id="defaultCheck1" />
//                             <label className="form-check-label typeLabel" htmlFor="defaultCheck1">
//                                 Seva
//                             </label>
//                         </div>
//                         <div className="form-check">
//                             <input className="form-check-input filterinput" type="checkbox" defaultValue="check4" id="defaultCheck1" />
//                             <label className="form-check-label typeLabel" htmlFor="defaultCheck1">
//                                 Festival
//                             </label>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="col-md-5">
//                     <p className="pTag">Date</p>
//                     <div className="dateSelection">
//                         {/* <div className="form-check">
//                             <input className="form-check-input filterinput" type="checkbox" defaultValue="check5" id="defaultCheck1" />
//                             <label className="form-check-label typeLabel" htmlFor="defaultCheck1">
//                                 All
//                             </label>
//                         </div> */}
//                         <div className="form-group">
//                             <div className="calenderMain">
//                                 <div className="inputSubDiv">
//                                     <div>
//                                         <label htmlFor="startDatePicker" className="calenderLabel">From</label>
//                                     </div>
//                                     <div>
//                                         <DatePicker
//                                             id="startDatePicker"
//                                             selected={startDate}
//                                             onChange={(date: any) => setStartDate(date)}
//                                             selectsStart
//                                             startDate={startDate}
//                                             endDate={endDate}
//                                             className="form-control"
//                                             customInput={<CustomInput value={startDate} onClick={() => { }} />}
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className="subLine"></div>
//                                 <div className="inputSubDiv">
//                                     <div>
//                                         <label htmlFor="endDatePicker" className="calenderLabel">To</label>
//                                     </div>
//                                     <div>
//                                         <DatePicker
//                                             id="endDatePicker"
//                                             selected={endDate}
//                                             onChange={(date: any) => setEndDate(date)}
//                                             selectsEnd
//                                             startDate={startDate}
//                                             endDate={endDate}
//                                             minDate={startDate}
//                                             className="form-control"
//                                             customInput={<CustomInput value={startDate} onClick={() => { }} />}
//                                         />
//                                     </div>
//                                 </div>
//                             </div>

//                         </div>
//                     </div>
//                     <div>

//                     </div>
//                 </div>
//             </div>
//             <div className="amountSelectionDiv">
//                 <div>
//                     <p className="pTag">Amount</p>
//                     <div className="amountSelection">
//                         {/* <div className="form-check">
//                             <input className="form-check-input filterinput" type="checkbox" defaultValue="check6" id="amountAll" />
//                             <label className="form-check-label typeLabel" htmlFor="amountAll">
//                                 All
//                             </label>
//                         </div> */}
//                         <div className="form-group">
//                             <div className="minMaxRangeSelector">
//                                 <div>
//                                     <input type="text" className="form-control calenderText" placeholder="min" />
//                                 </div>
//                                 <div>
//                                     <div className="slider-container">
//                                         <input
//                                             type="range"
//                                             className="form-range"
//                                             min="130"
//                                             max="500"
//                                             step="1"
//                                             id="range"
//                                             onChange={handleSliderChange}
//                                         />
//                                     </div>

//                                 </div>
//                                 <div>
//                                     <input type="text" className="form-control calenderText" placeholder="max" />
//                                 </div>
//                             </div>

//                         </div>
//                     </div>
//                 </div>

//             </div>
//             <div className="locationAndPresentDiv">
//                 <div className="col-6 headContentLocation">
//                     <div className="locationContent">
//                         <p className="pTag">Location</p>
//                         <div className="locationSelection">
//                             {/* <div className="form-check">
//                                 <input className="form-check-input filterinput" type="checkbox" defaultValue="check7" id="amountAll" />
//                                 <label className="form-check-label typeLabel" htmlFor="amountAll">
//                                     All
//                                 </label>
//                             </div> */}
//                             <div className="dropdown">
//                                 <a className="btn btn-secondary dropdown-toggle locationDropDowns" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
//                                     City
//                                 </a>

//                                 <ul className="dropdown-menu" >
//                                     <li><a className="dropdown-item" href="#">One</a></li>
//                                     <li><a className="dropdown-item" href="#">Two</a></li>
//                                     <li><a className="dropdown-item" href="#">Three</a></li>
//                                 </ul>
//                             </div>
//                             <div className="dropdown">
//                                 <a className="btn btn-secondary dropdown-toggle locationDropDowns" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
//                                     State
//                                 </a>

//                                 <ul className="dropdown-menu" >
//                                     <li><a className="dropdown-item" href="#">One</a></li>
//                                     <li><a className="dropdown-item" href="#">Two</a></li>
//                                     <li><a className="dropdown-item" href="#">Three</a></li>
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>
//                     <div>

//                     </div>
//                 </div>
//             </div>
//         </div>

//     );
// }

// export default FilterData;