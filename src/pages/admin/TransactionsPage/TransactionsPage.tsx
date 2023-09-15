import React, { useState } from 'react'
import './TransactionPage.css'
// import calenderImg from '../../../assets/icons/calender.svg';
import revenue from '../../../assets/Revenue.png';
import 'react-datepicker/dist/react-datepicker.css';
// import DatePicker from "react-datepicker";
import CsvDownloader from 'react-csv-downloader';
import { Pagination } from 'react-bootstrap'; // Import Table and Pagination components from react-bootstrap


interface Item {
  id: number;
  type: string;
  city: string;
  amount: number;
  date: string;
  [key: string]: string | number; // Index signature for string and number properties
}

const csvcolumns = [
  {
    id: "first",
    displayName: "First column",
  },
  {
    id: "second",
    displayName: "Second column",
  },
  {
    id: "first",
    displayName: "Third column",
  },
  {
    id: "second",
    displayName: "Fourth column",
  },
];

const initialData = [
  { id: 1, type: 'donation', city: 'hyderabad', amount: 100, date: '2023-08-01' },
  { id: 2, type: 'seva', city: 'chennai', amount: 150, date: '2023-08-10' },
  { id: 3, type: 'festival', city: 'mumbai', amount: 200, date: '2023-08-15' },
  { id: 4, type: 'donation', city: 'banglore', amount: 250, date: '2023-08-25' },
  { id: 5, type: 'seva', city: 'delhi', amount: 300, date: '2023-08-30' },
  { id: 6, type: 'festival', city: 'pune', amount: 350, date: '2023-09-10' },
  { id: 7, type: 'festival', city: 'vemulawada', amount: 400, date: '2023-08-23' },
  { id: 8, type: 'donation', city: 'hyderabad', amount: 500, date: '2023-08-01' },
  { id: 9, type: 'seva', city: 'chennai', amount: 1500, date: '2023-08-10' },
  { id: 10, type: 'festival', city: 'mumbai', amount: 2500, date: '2023-08-15' },
  { id: 11, type: 'donation', city: 'banglore', amount: 1000, date: '2023-08-25' },
  { id: 12, type: 'seva', city: 'delhi', amount: 2000, date: '2023-08-30' },
  { id: 13, type: 'festival', city: 'pune', amount: 3000, date: '2023-09-10' },
  { id: 14, type: 'festival', city: 'vemulawada', amount: 5000, date: '2023-08-23' },
];

const transactionData = [
  {
    title: 'Donation',
    totalAmount: '17,30,333',
    contributions: '30,333'
  },
  {
    title: 'Seva',
    totalAmount: '10,30,333',
    contributions: '25,333333'
  },
  {
    title: 'Festival',
    totalAmount: '19,00,333',
    contributions: '10,333'
  }
];

const TransactionPage = () => {
  
    const [showFilteredTable, setShowFilteredTable] = useState(false);
  
    //for filterings logic
    const [data] = useState(initialData);
    const [datafilters, setdataFilters] = useState({
      type: '',
      city: '',
      minAmount: '',
      maxAmount: '',
      startDate: '',
      endDate: '',
    });

    const handleFilterChange = (column:any, value:any) => {
      setdataFilters((prevFilters) => ({
        ...prevFilters,
        [column]: value,
      }));
    };

    //for filterings    

    //For range selector...
    const [minValue, setMinValue] = useState(10);
    const [maxValue, setMaxValue] = useState(5000);


    // const handleSliderChange = (event: any) => {
    //   const newValue = parseFloat(event.target.value);
      
    //   // Ensure min value is less than max value
    //   if (minValue <= maxValue) {
    //     setMinValue(newValue);
    //     handleFilterChange('minAmount', newValue.toString());
    //     setdataFilters(prevFilters => ({
    //       ...prevFilters,
    //       minAmount: newValue.toString(), // Update the filter value
    //     }));
    //   }
    // };

    //for amount min and max value filtering
    const handleSliderChange = (event: any) => {
      const newValue = parseFloat(event.target.value);
    
      // Ensure min value is less than max value
      if (minValue <= maxValue) {
        if (Math.abs(newValue - minValue) < Math.abs(newValue - maxValue)) {
          setMinValue(newValue);
          handleFilterChange('minAmount', newValue.toString());
        } else {
          setMaxValue(newValue);
          handleFilterChange('maxAmount', newValue.toString());
        }
      }
    };

    const handleMinValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseFloat(event.target.value);
      setMinValue(newValue);
      handleFilterChange('minAmount', newValue.toString());
      setdataFilters(prevFilters => ({
        ...prevFilters,
        minAmount: newValue.toString(),
      }));
    };
  
    const handleMaxValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseFloat(event.target.value);
      setMaxValue(newValue);
      handleFilterChange('maxAmount', newValue.toString());
      setdataFilters(prevFilters => ({
        ...prevFilters,
        maxAmount: newValue.toString(),
      }));
    };

    
    //for checkbox filtering
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

    const handleCheckboxChange = (type: string) => {
      if (selectedTypes.includes(type)) {
        setSelectedTypes(selectedTypes.filter(item => item !== type));
      } else {
        setSelectedTypes([...selectedTypes, type]);
      }
    };

    // Dropdown filters
    const [selectedCity, setSelectedCity] = useState<string | null>(null);
    // const [selectedState, setSelectedState] = useState<string | null>(null);
    const uniqueCities = [...new Set(data.map(item => item.city))];

    const handleCityChange = (city: string | null) => {
      setSelectedCity(city);
      handleFilterChange('city', city); // Update the city filter in datafilters
    };

    // const handleStateChange = (state: string) => {
    //   setSelectedState(state);
    // };

    //For Search
    const [searchQuery, setSearchQuery] = useState("");


    const filteredData = data.filter((item: Item) =>
    Object.entries(datafilters).every(([column, value]) => {
      if (column === 'type' && selectedTypes.length > 0) {
        return selectedTypes.includes(item.type);
      }  else if (column === 'minAmount' && value !== '') {
        return item.amount >= Number(value);
      } else if (column === 'maxAmount' && value !== '') {
        return item.amount <= Number(value);
      } else  if (column === 'type' && value.length > 0) {
        return selectedTypes.length === 0 || selectedTypes.includes(item.type);
      } else if (column === 'startDate' && value !== '') {
        return item.date >= value;
      } else if (column === 'endDate' && value !== '') {
        return item.date <= value;
      } else  if (column === 'city' && selectedCity) {
        return item.city === selectedCity;
      } else if (column === 'city' && selectedCity === null) {
        return true; 
      } else if (column === 'city' && selectedCity) {
        return item.city === selectedCity;
      } else {

        (!selectedCity || item.city === selectedCity) 
        // &&
        // (!selectedState || item.state === selectedState)
        const columnValue = item[column]; 
        if (typeof columnValue === 'string' || typeof columnValue === 'number') {
          return value === '' || columnValue.toString().toLowerCase().includes(value.toLowerCase());
        }
        return true; 
      }
    })  &&
    (searchQuery === "" ||
      Object.values(item).some(
        (val) =>
          typeof val === "string" &&
          val.toLowerCase().includes(searchQuery.toLowerCase())
      ))
  );

  //for pagination 
  const ITEMS_PER_PAGE = 6;
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;


  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <div className="transaction-container">
        <div className="side-heading">All Transactions</div>
        <div className="featured">
          {transactionData.map((item, index) => (
            <div className="featuredItem" key={index}>
              <p className="featuredTitle">
                <img src={revenue} alt="" />
                <span className="cardtitle">{item.title}</span>
              </p>
              <div className="featuredMoneyContainer">
                <span className="featuredMoney">Total Amount</span>
                <span className="featuredMoney-donation">Contributions</span>
              </div>
              <div className="featuredMoneyContainer">
                <span className="featured-amount">
                  <b>{item.totalAmount}</b>
                </span>
                <span className="featuredMoney-rup">{item.contributions}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="transaction-btn">
          <div>
          <button
            className="btn-filterdata"
            type="button"
            onClick={() => setShowFilteredTable(true)}
          >
            Filter Data
          </button>
          <CsvDownloader
            filename="myfile"
            className="btn-filterdata"
            separator=";"
            wrapColumnChar="'"
            columns={csvcolumns}
            datas={filteredData.map(item => ({
              first: item.date,
              second: item.type,
              third: item.amount.toString(),
              fourth: item.city,
            }))}
            text="Download CSV"
          />
          </div>
          <div className="input-transactiongroup">
            <input
              type="text"
              className="form-control2"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="search-icon"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        {/* {showFilteredTable && (
        <section className="filterTargetGroup">
        <FilterData />
             </section>
      )} */}
        {showFilteredTable && (
          <div className="row mt-5">
            <div className="col-md-12 filtrscrd">
              <div className="card">
                {" "}
                {/*filtersCard */}
                <div className="typeAndDateDiv">
                  <div className="col-md-7">
                    <p className="pTag">Type</p>
                    <div className="typeSelection">
                      <div className="form-check">
                        <input
                          className="form-check-input filterinput"
                          type="checkbox"
                          value="donation"
                          id="check-donation"
                          onChange={() => handleCheckboxChange("donation")}
                        />
                        <label
                          className="form-check-label typeLabel"
                          htmlFor="defaultCheck1"
                        >
                          Donations
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input filterinput"
                          type="checkbox"
                          value="seva"
                          id="check-seva"
                          onChange={() => handleCheckboxChange("seva")}
                        />
                        <label
                          className="form-check-label typeLabel"
                          htmlFor="defaultCheck1"
                        >
                          Seva
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input filterinput"
                          type="checkbox"
                          value="festival"
                          id="check-festival"
                          onChange={() => handleCheckboxChange("festival")}
                        />
                        <label
                          className="form-check-label typeLabel"
                          htmlFor="defaultCheck1"
                        >
                          Festival
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <p className="pTag mb-3">Date</p>
                    <div className="dateSelection">
                      <div className="form-group">
                        <div className="calenderMain">
                          <div className="inputSubDiv">
                            <div>
                              <label
                                htmlFor="startDatePicker"
                                className="calenderLabel"
                              >
                                From
                              </label>
                            </div>
                            <div>
                              <input
                                className="calenderText trancal"
                                type="date"
                                placeholder="Start Date"
                                value={datafilters.startDate}
                                onChange={(e) =>
                                  handleFilterChange(
                                    "startDate",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                          </div>
                          <div className="subLine"></div>
                          <div className="inputSubDiv">
                            <div>
                              <label
                                htmlFor="endDatePicker"
                                className="calenderLabel"
                              >
                                To
                              </label>
                            </div>
                            <div>
                              <input
                                className="calenderText trancal"
                                type="date"
                                placeholder="End Date"
                                value={datafilters.endDate}
                                onChange={(e) =>
                                  handleFilterChange("endDate", e.target.value)
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                </div>
                <div className="amountSelectionDiv">
                  <div>
                    <p className="pTag">Amount</p>
                    <div className="amountSelection">
                      <div className="form-group">
                      <div className="minMaxRangeSelector">
                        <input
                          type="text"
                          className="form-control calenderText"
                          placeholder="min"
                          value={minValue}
                          onChange={handleMinValueChange} 
                        />
                        <div className="slider-container">
                          <input
                            type="range"
                            className="form-range"
                            min="10"
                            max="5000"
                            step="1"
                            id="minRange"
                            value={minValue}
                            onChange={handleSliderChange}
                          />
                        </div>
                        <input
                          type="text"
                          className="form-control calenderText"
                          placeholder="max"
                          value={maxValue}
                          onChange={handleMaxValueChange} 
                        />
                        <div className="slider-container">
                          <input
                            type="range"
                            className="form-range"
                            min="10"
                            max="5000"
                            step="1"
                            id="maxRange"
                            value={maxValue}
                            onChange={handleSliderChange}
                          />
                        </div>
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="locationAndPresentDiv">
                  <div className="col-6 headContentLocation">
                    <div className="locationContent">
                      <p className="pTag">Location</p>
                      <div className="locationSelection">
                        <div className="dropdown">
                          <a
                            className="btn btn-secondary dropdown-toggle locationDropDowns"
                            href="#"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            City
                          </a>
                          
                          <ul className="dropdown-menu">
                          <li>
                            <button
                              className="dropdown-item"
                              onClick={() => handleCityChange(null)}
                            >
                              All Cities
                            </button>
                          </li>
                            {uniqueCities.map((city, index) => (
                              <li key={index}>
                                <button
                                  className="dropdown-item"
                                  onClick={() => handleCityChange(city)}
                                >
                                  {city}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="table-container">
          <div className="row table-fixed">
            <div className="transaction-table-wrapper">
              <table className="transaction-table table-responsive tableresp">
                <thead className="transaction-tablehead">
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Particulars</th>
                    <th scope="col">DID</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Receipt No</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.slice(startIndex, endIndex).map((item) => (
                    <tr key={item.id}>
                      <td>{item.date}</td>
                      <td>{item.type}</td>
                      <td  className='did-table-row'>{item.id}</td>
                      <td>{item.amount}</td>
                      <td  className='receipt-table-row'>{item.city}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="paginationn">
                <Pagination>
                  <Pagination.Prev onClick={handlePrevClick} disabled={currentPage === 1}  />
                  {Array.from({ length: totalPages }, (_, index) => (
                    <Pagination.Item
                      key={index}
                      active={index + 1 === currentPage}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next onClick={handleNextClick} disabled={currentPage === totalPages} />
                </Pagination>
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </>
  );}

export default TransactionPage
