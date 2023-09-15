import ButtonComponent from "./CustomButtonComponent"


import { useNavigate } from "react-router-dom";
// import React, { ReactNode } from 'react';

interface contributionsCardProps {
    // children: ReactNode; // The type ReactNode allows any valid React content as children
    contribution: any;

    handleOpenShareModal:(resp:any)=>any;
    handleDonateButtonModal:(resp:any)=>any;
}

//data Type...
// CommonDonations:1,
// FestivalDonations:2,
// CommonSevas:3,
// FestivalSevas:4,
// CommonEvents:5,
// FestivalEvents:6

function ContributionsCardComponent({ contribution, handleDonateButtonModal }: contributionsCardProps) {
    const navigate = useNavigate();
    //const [contributionData] = useState(contribution);
    console.log(contribution)
    const scrollToSection = () => {
        const section = document.getElementById("sectionToNavigate");
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };
    const getHeaderCardColor = () => {
        switch (contribution.type) {
            case 1:
                return '#ED9B33';
            case 2:
                return '#202A88';
            case 3:
                return '#1B787B';
            case 4:
                return '#1B787B';
            // case 5:
            //     return '#ED9B33';
            // case 6:
            //     return '#ED9B33';
        }
        // Add more conditions for other title values if needed
        return '#1B787B'; // Fallback color if no specific title matches
    };

    // Get the dynamically generated CSS class for headerCard
    const headerCardBackgroundColor = getHeaderCardColor();

    const repeatSeva = () => {
        localStorage.setItem('seva_id',contribution.id);
        navigate("/application/seekblessings");
    }
    const donationButton = () => {
        handleDonateButtonModal(contribution);
    }
    const viewSimilarSevas = () => {
        localStorage.removeItem('seva_id');
        navigate("/application/seekblessings");
    }

    return (
        <div className="card cardClass">
            <div className='headerCard' style={{ backgroundColor: headerCardBackgroundColor }}>
                <h5>{contribution.title}</h5>
            </div>
            <div className="card-body">
                {contribution.type == 1 && (
                    <div className="donationsAnnadhan">
                        <div className="cardcontent mt-3">
                            {contribution.hasContributed && (
                                <div className="annadhanContent">
                                    <p className="card-text">Donated: <span >Rs.{contribution.donated}</span></p>
                                    <p className="card-text">Impact : <span> {contribution.message}</span></p>
                                </div>
                            )}
                            {!contribution.hasContributed && (
                                <div className="annadhanContent">
                                    <p className="card-text">Create an Impact </p>
                                    {/* <p className="card-text">Impact : <span> {contribution.message}</span></p> */}
                                </div>
                            )}
                        </div>
                        <div className="cardButtonsAnnadhanClass">
                            {contribution.hasContributed && (
                                <div className="referButtonDiv">
                                    <ButtonComponent children="Repeat Donation" handleButtonClick={donationButton} />
                                </div>
                            )}
                            {!contribution.hasContributed && (
                                <ButtonComponent children="View Similar" handleButtonClick={scrollToSection} />
                            )}
                            {/* <div className="shareButton">
                                <ButtonComponent handleButtonClick={handleOpenModal}>
                                    <img src={ShareImg} title="Share" alt="..." />
                                </ButtonComponent>
                            </div> */}
                        </div>
                        
                    </div>
                )}
                {contribution.type == 2 && (
                    <div className="donationsAnnadhan">
                        <div className="cardcontent mt-3">
                            {contribution.hasContributed && (
                                <div className="annadhanContent">
                                    <p className="card-text">Donated :<span >Rs.{contribution.donated}</span></p>
                                    <p className="card-text">Impact :<span> {contribution.message}</span></p>
                                </div>
                            )}
                            {!contribution.hasContributed && (
                                <div className="annadhanContent">
                                    <p className="card-text">Create an Impact</p>                                    
                                    {/* <p className="card-text">Impact : <span> {contribution.message}</span></p> */}
                                </div>
                            )}
                        </div>
                        <div className="cardButtonsAnnadhanClass">
                            {contribution.hasContributed && (
                                <div className="referButtonDiv">
                                    <ButtonComponent children="Repeat Donation" handleButtonClick={donationButton} />
                                </div>
                            )}
                            {!contribution.hasContributed && (
                                <ButtonComponent children="View Similar" handleButtonClick={scrollToSection} />
                            )}
                            {/* <div className="shareButton">
                                <ButtonComponent handleButtonClick={handleOpenModal}>
                                    <img src={ShareImg} title="Share" alt="..." />
                                </ButtonComponent>
                            </div> */}
                        </div>
                    </div>
                )}
                {contribution.type == 3 && (
                    <div className="topContributionCard">
                        <div className="cardcontent mt-3">
                            {contribution.hasContributed && (
                                <div className="completedSeva">
                                    <p className="card-text">Completed On</p>
                                    <p className="card-text"><span> {contribution.message}</span></p>
                                </div>
                            )}
                            {!contribution.hasContributed && (
                                <div className="cardContextBody">
                                    <p className="card-text dueDaysParagraph"><span>{contribution.dueDays}</span></p>
                                    <div className="deuDaysRightContent">
                                        <p className="card-text"><span>days</span></p>
                                        <p className="card-text"><span>to go</span></p>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="cardButtonsSevaClass">
                            {contribution.hasContributed && (
                                <ButtonComponent children="Repeat Seva" handleButtonClick={repeatSeva} />
                            )}
                            {!contribution.hasContributed && (
                                <ButtonComponent children="View Similar" handleButtonClick={viewSimilarSevas} />
                            )}
                            {/* <div className="shareButton">
                                <ButtonComponent handleButtonClick={handleOpenModal}>
                                    <img src={ShareImg} title="Share" alt="..." />
                                </ButtonComponent>
                            </div> */}
                        </div>
                    </div>
                )}
                {contribution.type == 4 && (
                    <div className="topContributionCard">
                        <div className="cardcontent mt-3">
                            {contribution.hasContributed && (
                                <div className="completedSeva">
                                    <p className="card-text">Completed On</p>
                                    <p className="card-text"><span> {contribution.message}</span></p>
                                </div>
                            )}
                            {!contribution.hasContributed && (
                                <div className="cardContextBody">
                                <p className="card-text dueDaysParagraph"><span>{contribution.dueDays}</span></p>
                                <div className="deuDaysRightContent">
                                    <p className="card-text"><span>days</span></p>
                                    <p className="card-text"><span>to go</span></p>
                                </div>
                            </div>
                            )}
                        </div>
                        <div className="cardButtonsSevaClass">
                            {contribution.hasContributed && (
                                <ButtonComponent children="Repeat Seva" handleButtonClick={repeatSeva} />
                            )}
                            {!contribution.hasContributed && (
                                <ButtonComponent children="View Similar" handleButtonClick={viewSimilarSevas} />
                            )}
                            {/* <div className="shareButton">
                                <ButtonComponent handleButtonClick={handleOpenModal}>
                                    <img src={ShareImg} title="Share" alt="..." />
                                </ButtonComponent>
                            </div> */}
                        </div>
                    </div>
                )}
                {/* {contribution.type == 5 && (
                    <div>
                        <div className="cardcontent mt-3">
                            {contribution.hasContributed && (
                                <div>
                                    <p className="card-text">Donated: <span >Rs.{contribution.donated}</span></p>
                                    <p className="card-text">Impact : <span> {contribution.message}</span></p>
                                </div>
                            )}
                            {!contribution.hasContributed && (
                                <div>
                                    <p className="card-text">Donated: <span >Rs.{contribution.donated}</span></p>
                                    <p className="card-text">Impact : <span> {contribution.message}</span></p>
                                </div>
                            )}
                        </div>
                        <div className="cardButtonsClass">
                            {contribution.hasContributed && (
                                <ButtonComponent children="Refer to a friend" handleButtonClick={referButton} />
                            )}
                            {!contribution.hasContributed && (
                                <ButtonComponent children="Donate now" handleButtonClick={referButton} />
                            )}
                            <div className="shareButton">
                                <ButtonComponent handleButtonClick={handleOpenModal}>
                                    <img src={ShareImg} title="Share" alt="..." />
                                </ButtonComponent>
                            </div>
                        </div>
                    </div>
                )}
                {contribution.type == 6 && (
                    <div>
                        <div className="cardcontent mt-3">
                            {contribution.hasContributed && (
                                <div>
                                    <p className="card-text">Donated: <span >Rs.{contribution.donated}</span></p>
                                    <p className="card-text">Impact : <span> {contribution.message}</span></p>
                                </div>
                            )}
                            {!contribution.hasContributed && (
                                <div>
                                    <p className="card-text">Donated: <span >Rs.{contribution.donated}</span></p>
                                    <p className="card-text">Impact : <span> {contribution.message}</span></p>
                                </div>
                            )}
                        </div>
                        <div className="cardButtonsClass">
                            {contribution.hasContributed && (
                                <ButtonComponent children="Refer to a friend" handleButtonClick={referButton} />
                            )}
                            {!contribution.hasContributed && (
                                <ButtonComponent children="Donate now" handleButtonClick={referButton} />
                            )}
                            <div className="shareButton">
                                <ButtonComponent handleButtonClick={handleOpenModal}>
                                    <img src={ShareImg} title="Share" alt="..." />
                                </ButtonComponent>
                            </div>
                        </div>
                    </div>
                )} */}

            </div>
        </div>
    )
}

export default ContributionsCardComponent