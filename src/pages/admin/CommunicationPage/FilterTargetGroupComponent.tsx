import { useEffect, useState } from "react";
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from "react-datepicker";
// import Slider from 'rc-slider';
import calenderImg from '../../../assets/icons/calender.svg';
import React from "react";
import { State, City } from "country-state-city";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";

interface CustomProps {
    value: any;
    onClick: () => void
}
interface CheckboxState {
    all: boolean;
    donations: boolean;
    sevas: boolean;
    festivals: boolean;
}

interface CountryOption {
    isoCode: string;
    name: string;
}

interface StateOption {
    countryCode: string;
    isoCode: string;
    name: string;
}

interface CityOption {
    countryCode: string;
    stateCode: string;
    name: string;
}

const CustomInput = React.forwardRef<HTMLInputElement, CustomProps>(({ value, onClick }, ref) => (
    <div className="input-group">
        <input
            type="text"
            value={value}
            onClick={onClick}
            className="form-control calenderText"
            readOnly
            ref={ref}

        />
        <div className="input-group-append" onClick={onClick}>
            <span className="input-group-text inputSpanClass">
                <img className="calenderImage" src={calenderImg} alt="calender" />
            </span>
        </div>
    </div>
));

function FilterTargetGroup() {

    const [filtersList, setFiltersList] = useState<any>([]);
    const [saveUpdateButtons, setSaveUpdateButtons] = useState(false);
    const [checkboxes, setCheckboxes] = useState<CheckboxState>({
        all: false,
        donations: false,
        sevas: false,
        festivals: false,
    });
    useEffect(() => {
        const areAllChecked =
            checkboxes.donations && checkboxes.sevas && checkboxes.festivals;
        setCheckboxes((prevCheckboxes) => ({
            ...prevCheckboxes,
            all: areAllChecked,
        }));
    }, [checkboxes.donations, checkboxes.sevas, checkboxes.festivals]);

    const handleCheckboxChange = (checkboxName: keyof CheckboxState) => {
        if (checkboxName === "all") {
            const newAllValue = !checkboxes.all;
            setCheckboxes({
                all: newAllValue,
                donations: newAllValue,
                sevas: newAllValue,
                festivals: newAllValue,
            });
        } else {
            setCheckboxes((prevCheckboxes) => ({
                ...prevCheckboxes,
                [checkboxName]: !prevCheckboxes[checkboxName],
                all: false, // Uncheck 'All' when any individual checkbox is checked
            }));
        }
    };

    //For start Date and End date...
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [dateAllChecked, setdateAllChecked] = useState(false);

    const handleAllDateCheck = () => {
        if (!dateAllChecked) {
            setStartDate(null);
            setEndDate(null);
        }
        setdateAllChecked(!dateAllChecked);
    };

    const handleStartDateChange = (date: Date | null) => {
        if (!dateAllChecked) {
            setStartDate(date);
            if (date && endDate && date > endDate) {
                setEndDate(date);
            }
        }
    };

    const handleEndDateChange = (date: Date | null) => {
        if (!dateAllChecked) {
            setEndDate(date);
        }
    };


    //For range selector...
    const [minValue, setMinValue] = useState<number | ''>('');
    const [maxValue, setMaxValue] = useState<number | ''>('');
    const minRange = 1;
    const maxRange = 1000000;
    const [allRangeChecked, setAllRangeChecked] = useState<boolean>(false);

    const handleAllAmountCheck = () => {
        if (!allRangeChecked) {
            setMinValue('');
            setMaxValue('');
        }
        setAllRangeChecked(!allRangeChecked);
    };

    const handleMinValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newMinValue = parseFloat(e.target.value);
        if (!allRangeChecked) {
            setMinValue(newMinValue);
            if (maxValue !== '' && newMinValue > maxValue) {
                setMaxValue(newMinValue);
            }
        } else {
            setMinValue('');
        }
    };

    const handleMaxValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newMaxValue = parseFloat(e.target.value);
        if (!allRangeChecked) {
            setMaxValue(newMaxValue);
            if (minValue !== '' && newMaxValue < minValue) {
                setMinValue(newMaxValue);
            }
        } else {
            setMaxValue('');
        }
    };
    const handleMinSliderChange = (event: any) => {
        const newValue = parseInt(event.target.value);
        setMinValue(newValue);
        if (newValue > Number(maxValue)) {
            setMaxValue(newValue);
        }
    };

    const handleMaxSliderChange = (event: any) => {
        const newValue = parseInt(event.target.value);
        setMaxValue(newValue);
        if (newValue < Number(minValue)) {
            setMinValue(newValue);
        }
    };

    //For country and state selector...
    const defaultCountry: CountryOption = { isoCode: "IN", name: "India" };

    const [selectedCountry] = useState<CountryOption>(
        defaultCountry
    );
    const [selectedState, setSelectedState] = useState<StateOption | null>(null);
    const [selectedCity, setSelectedCity] = useState<CityOption | null>(null);
    const [selectLocationAll, setSelectLocationAll] = useState(false);

    useEffect(() => {
        if (selectLocationAll) {
            setSelectedState(null);
            setSelectedCity(null);
        }
    }, [selectLocationAll]);

    useEffect(() => {
        if (selectedCountry) {
        }
    }, [selectedCountry]);

    useEffect(() => {
        if (selectedState) {
            setSelectedCity(null);
        }
    }, [selectedState]);

    //For presentName...
    const [presentName, setPresentName] = useState("");

    const [addCloseButtonClick, setAddCloseButtonClick] = useState(false);
    const addHandleButton = () => {
        setAddCloseButtonClick(true);
    }
    const closeHandleButton = () => {
        //resetting the values and closing the modal...
        setCheckboxes({
            all: false,
            donations: false,
            sevas: false,
            festivals: false,
        });
        setdateAllChecked(false);
        setStartDate(null);
        setEndDate(null);
        setAllRangeChecked(false);
        setMinValue("");
        setMaxValue("");
        setSelectLocationAll(false);
        setSelectedState(null);
        setSelectedCity(null);
        setPresentName("");
        setAddCloseButtonClick(false);
        setSaveUpdateButtons(false);
    }
    function generateRandomId(length: any) {
        const characters = "0123456789";
        let randomId = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomId += characters.charAt(randomIndex);
        }
        return randomId;
    }
    //Form handle submit save...
    const handleFilterSave = () => {
        if (
            (!checkboxes.donations && !checkboxes.sevas && !checkboxes.festivals) &&
            (startDate == null && endDate == null) &&
            (minValue == "" && maxValue == "") &&
            //   selectedCountry != &&
            selectedState == null &&
            selectedCity == null && !dateAllChecked && !allRangeChecked && !selectLocationAll) {
            toast.warning("Please fill atleast one record and Name cannot be empty");
        } else {
            if (presentName !== "") {
                const selectedFilters = {
                    id: generateRandomId(6),
                    checkboxes: checkboxes,
                    dateAllChecked: dateAllChecked,
                    startDate: startDate,
                    endDate: endDate,
                    allRangeChecked: allRangeChecked,
                    minValue: minValue,
                    maxValue: maxValue,
                    selectLocationAll: selectLocationAll,
                    selectedCountry: selectedCountry,
                    selectedState: selectedState,
                    selectedCity: selectedCity,
                    presentName: presentName,
                };
                setFiltersList([...filtersList, selectedFilters]);
                // console.log("Selected Filters:", selectedFilters);
                setCheckboxes({
                    all: false,
                    donations: false,
                    sevas: false,
                    festivals: false,
                });
                setdateAllChecked(false);
                setStartDate(null);
                setEndDate(null);
                setAllRangeChecked(false);
                setMinValue("");
                setMaxValue("");
                setSelectLocationAll(false);
                setSelectedState(null);
                setSelectedCity(null);
                setPresentName("");
                setAddCloseButtonClick(false);
            }
            else {
                toast.warning("Name cannot be empty");
            }

        }
    }

    //For form edit ...
    const [selectedFilterData, setSelectedFilterData] = useState<any>(null);
    const editSelectedFilter = (itemToEdit: any) => {
        setCheckboxes({
            all: itemToEdit.checkboxes.all,
            donations: itemToEdit.checkboxes.donations,
            sevas: itemToEdit.checkboxes.festivals,
            festivals: itemToEdit.checkboxes.sevas,
        });
        setSelectedFilterData(itemToEdit);
        setAddCloseButtonClick(true);
        setSaveUpdateButtons(true);
        console.log(itemToEdit);
        setdateAllChecked(itemToEdit.dateAllChecked);
        setStartDate(itemToEdit.startDate);
        setEndDate(itemToEdit.endDate);
        setAllRangeChecked(itemToEdit.allRangeChecked);
        setMinValue(itemToEdit.minValue);
        setMaxValue(itemToEdit.maxValue);
        setSelectLocationAll(itemToEdit.selectLocationAll);
        setSelectedState(itemToEdit.selectedState);
        setSelectedCity(itemToEdit.selectedCity);
        setPresentName(itemToEdit.presentName);
        setAddCloseButtonClick(true);
    }

    //Form handle submit update...
    const handleFilterUpdate = () => {
        if (
            (!checkboxes.donations && !checkboxes.sevas && !checkboxes.festivals) &&
            (startDate == null && endDate == null) &&
            (minValue == "" && maxValue == "") &&
            //   selectedCountry != &&
            selectedState == null &&
            selectedCity == null && !dateAllChecked && !allRangeChecked && !selectLocationAll) {
            toast.warning("Please fill atleast one record and Name cannot be empty");
        } else {
            if (presentName !== "") {
                const selectedFilters: any = {
                    id: selectedFilterData.id,
                    checkboxes: checkboxes,
                    dateAllChecked: dateAllChecked,
                    startDate: startDate,
                    endDate: endDate,
                    allRangeChecked: allRangeChecked,
                    minValue: minValue,
                    maxValue: maxValue,
                    selectLocationAll: selectLocationAll,
                    selectedCountry: selectedCountry,
                    selectedState: selectedState,
                    selectedCity: selectedCity,
                    presentName: presentName,
                };
                setFiltersList((prevFilterData: any) => {
                    return prevFilterData.map((item: any) =>
                        item.id === selectedFilters.id ? selectedFilters : item
                    );
                });
                setSelectedFilterData(null);
                setCheckboxes({
                    all: false,
                    donations: false,
                    sevas: false,
                    festivals: false,
                });
                setdateAllChecked(false);
                setStartDate(null);
                setEndDate(null);
                setAllRangeChecked(false);
                setMinValue("");
                setMaxValue("");
                setSelectLocationAll(false);
                setSelectedState(null);
                setSelectedCity(null);
                setPresentName("");
                setAddCloseButtonClick(false);
                setSaveUpdateButtons(false);
            }
            else {
                toast.warning("Name cannot be empty");
            }

        }
    }

    const deleteSelectedFilter = (itemToDelete: any) => {
        setFiltersList((prevFilterData: any) => {
            const updatedFilterData = prevFilterData.filter(
                (item: any) => item !== itemToDelete
            );
            return updatedFilterData;
        });
    }


    return (
        <div>
            <div className="addCloseButtonsDiv">
                {!addCloseButtonClick && (<button type="button" className="addCloseButtons" onClick={addHandleButton}>Add</button>)}
                {addCloseButtonClick && (<button type="button" className="addCloseButtons" onClick={closeHandleButton}>close</button>)}
            </div>

            {addCloseButtonClick && (<div className="contianer-fluid filtersCard">
                <div className="flexerow">
                    <div className="flexdiv1">
                        <p className="pTag">Type</p>
                        <div className="flexcheckbox">
                            <div className="minwidth">
                                <input
                                    className="form-check-input filterinput"
                                    type="checkbox"
                                    checked={checkboxes.all}
                                    onChange={() => handleCheckboxChange("all")}
                                />
                                <label className="form-check-label" htmlFor="defaultCheck">
                                    All
                                </label>
                            </div>
                            <div className="minwidth">
                                <input
                                    className="form-check-input filterinput"
                                    type="checkbox"
                                    checked={checkboxes.donations}
                                    onChange={() => handleCheckboxChange("donations")}
                                    disabled={checkboxes.all}
                                />
                                <label className="form-check-label " htmlFor="defaultCheck1">
                                    Donations
                                </label>
                            </div>
                            <div className="minwidth">
                                <input
                                    className="form-check-input filterinput"
                                    type="checkbox"
                                    checked={checkboxes.sevas}
                                    onChange={() => handleCheckboxChange("sevas")}
                                    disabled={checkboxes.all}
                                />
                                <label className="form-check-label " htmlFor="defaultCheck2">
                                    Seva
                                </label>
                            </div>
                            <div className="minwidth">
                                <input
                                    className="form-check-input filterinput"
                                    type="checkbox"
                                    checked={checkboxes.festivals}
                                    onChange={() => handleCheckboxChange("festivals")}
                                    disabled={checkboxes.all}
                                />
                                <label className="form-check-label " htmlFor="defaultCheck3">
                                    Festival
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="flexdiv2">
                        <p className="pTag">Date</p>
                        <div className="flexcheckbox">
                            <div className="minwidth">
                                <input
                                    className="form-check-input filterinput"
                                    type="checkbox"
                                    checked={dateAllChecked}
                                    onChange={handleAllDateCheck}
                                    id="dateDefaultCheck"
                                />
                                <label className="form-check-label" htmlFor="dateDefaultCheck1">
                                    All
                                </label>
                            </div>

                            <div className="calenderMain">
                                <div className="inputSubDiv">
                                    <div>
                                        <label htmlFor="startDatePicker" className="calenderLabel">
                                            From
                                        </label>
                                    </div>
                                    <div>
                                        <DatePicker
                                            id="startDatePicker"
                                            selected={startDate}
                                            onChange={handleStartDateChange}
                                            selectsStart
                                            startDate={startDate}
                                            endDate={endDate}
                                            className="form-control"
                                            customInput={<CustomInput value={startDate} onClick={() => { }} />}
                                            disabled={dateAllChecked}
                                        />
                                    </div>
                                </div>
                                <div className="subLine"></div>
                                <div className="inputSubDiv">
                                    <div>
                                        <label htmlFor="endDatePicker" className="calenderLabel">
                                            To
                                        </label>
                                    </div>
                                    <div>
                                        <DatePicker
                                            id="endDatePicker"
                                            selected={endDate}
                                            onChange={handleEndDateChange}
                                            selectsEnd
                                            startDate={startDate}
                                            endDate={endDate}
                                            minDate={startDate}
                                            className="form-control"
                                            customInput={<CustomInput value={endDate} onClick={() => { }} />}
                                            disabled={dateAllChecked}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="amountSelectionDiv">
                    <div>
                        <p className="pTag">Amount</p>
                        <div className="flexcheckbox">
                            <div className="minwidth">
                                <input
                                    className="form-check-input filterinput"
                                    type="checkbox"
                                    checked={allRangeChecked}
                                    onChange={handleAllAmountCheck}
                                    id="defaultAmountCheck1"
                                />
                                <label className="form-check-label" htmlFor="defaultAmountCheck1">
                                    All
                                </label>
                            </div>

                            <div className="form-group">
                                <div className="minMaxRangeSelector">
                                    <div>
                                        <input
                                            type="number"
                                            className="form-control calenderText amountInput"
                                            placeholder="min"
                                            min="1"
                                            step="any"
                                            value={minValue !== '' ? minValue : ''}
                                            onChange={handleMinValueChange}
                                            disabled={allRangeChecked}
                                        />
                                    </div>
                                    <div>
                                        <div className="slider-container">
                                            <input
                                                type="range"
                                                className="form-range"
                                                min={minRange}
                                                max={maxRange}
                                                step="1"
                                                value={minValue}
                                                onChange={handleMinSliderChange}
                                                disabled={allRangeChecked}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <input
                                            type="number"
                                            className="form-control calenderText amountInput"
                                            placeholder="max"
                                            min="1"
                                            step="any"
                                            value={maxValue !== '' ? maxValue : ''}
                                            onChange={handleMaxValueChange}
                                            disabled={allRangeChecked}
                                        />
                                    </div>
                                    <div>
                                        <div className="slider-container">
                                            <input
                                                type="range"
                                                className="form-range"
                                                min={minRange}
                                                max={maxRange}
                                                step="1"
                                                value={maxValue}
                                                onChange={handleMaxSliderChange}
                                                disabled={allRangeChecked}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flexerow row">
                    <div className="flexdiv1 col-12">
                        <div className="locationContent">
                            <p className="pTag">Location</p>
                            <div className="locationSelection">
                                <div className="minwidth">
                                    <input
                                        className="form-check-input filterinput"
                                        type="checkbox"
                                        defaultValue="check1"
                                        id="defaultCheck1"
                                        checked={selectLocationAll}
                                        onChange={(e) => setSelectLocationAll(e.target.checked)}
                                    />
                                    <label className="form-check-label" htmlFor="defaultCheck1">
                                        All
                                    </label>
                                </div>
                                <Select
                                    options={State?.getStatesOfCountry(selectedCountry?.isoCode)}
                                    getOptionLabel={(options) => options["name"]}
                                    getOptionValue={(options) => options["name"]}
                                    value={selectedState}
                                    onChange={(item) => setSelectedState(item)}
                                    placeholder="State"
                                    isDisabled={selectLocationAll}
                                    styles={{
                                        control: (provided: any) => ({
                                            ...provided,
                                            maxWidth: "200px",
                                        }),
                                    }}
                                />
                                <Select
                                    options={City.getCitiesOfState(
                                        selectedState?.countryCode as string,
                                        selectedState?.isoCode as string
                                    )}
                                    getOptionLabel={(options) => options["name"]}
                                    getOptionValue={(options) => options["name"]}
                                    value={selectedCity}
                                    onChange={(item) => setSelectedCity(item)}
                                    placeholder="City"
                                    isDisabled={selectLocationAll}
                                    styles={{
                                        control: (provided: any) => ({
                                            ...provided,
                                            width: "170px",
                                        }),
                                    }}
                                />
                            </div>
                        </div>
                        <div className="rightSidePresentContent">
                            <div className="form-input">
                                <input className="form--input presentInputBox" type="text" placeholder="Name for present" value={presentName}
                                    onChange={(e) => setPresentName(e.target.value)} autoComplete="off" />
                            </div>
                            <div>
                                {!saveUpdateButtons && (<button type="submit" className="filterSaveButton" onClick={handleFilterSave}>Save</button>)}
                                {saveUpdateButtons && (<button type="submit" className="filterSaveButton" onClick={handleFilterUpdate}>Update</button>)}
                            </div>
                        </div>
                    </div>
                    <div className="flexdiv2">
                    </div>
                </div>
                <ToastContainer position="bottom-right" />
            </div>)}
            <div className="tableContent">
                <table className="table table-striped ">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Filter name</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {filtersList.map((item: any, index: any) => (
                            <tr key={item.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.presentName}</td>
                                <td>
                                    <button type='button' onClick={() => editSelectedFilter(item)}>Edit</button>
                                    <button type='button' className='deleteDonationButton' onClick={() => deleteSelectedFilter(item)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default FilterTargetGroup;