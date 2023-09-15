import "./Profile.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Footer from "../../layout/Footer";
import Button from "react-bootstrap/Button";
//import React from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import ModalPopupComponent from "../../../components/ModalPopupComponent";
import { useEffect, useState } from "react";
import EditMobileComponent from "./EditMobileComponent";
import { API_ENDPOINTS, dummyImg } from "../../../services/apiConstants";
import { ToastContainer, toast } from "react-toastify";
import useAuthStore from "../../../store/authStore";
import proxyApi from "../../../services/proxy";
import EditProfileComponent from "./EditProfileComponent";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),

  mobile: Yup.string().required("Mobile is required"),
  city: Yup.string().required("City is required"),
});


interface ProfilData {
  address: any;
  city: any;
  country: any;
  dateOfBirth: any;
  emailAddress: any;
  gender: any;
  mobile: any;
  name: any;
  pin: any;
  state: any;
}

export enum Gender {
  Male = "0",
  Female = "1",
}

const ProfileComponent = () => {
  const [checkedValue, setCheckedValue] = useState('');
  const accessToken = useAuthStore((state) => state.accessToken); // Get the accessToken from the store
  const _proxy = new proxyApi(accessToken);

  // Check a condition here to determine the autoClose time
  const autoCloseTime = true ? 2000 : 2000;

  //for get profile
  const [events, setEvents] = useState<ProfilData | null>();
  const [profilePhoto, setProfilePhoto] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const url = `${API_ENDPOINTS.getProfileData}`;
  const url2 = `${API_ENDPOINTS.getProfilePhoto}`;
  useEffect(() => {
    var dummyImage=dummyImg;
    setProfilePhoto(dummyImage);
    _proxy
      .get(url)
      .then((resp: any) => {
        const eventData = resp.data.data;
        setEvents(resp.data.data); // Set event data in the state\
        setCheckedValue(eventData.gender);
        setMobileNumber(eventData.mobile);
      })
      .catch((error: any) => {
        console.log(error);
      });
    _proxy
      .get(url2)
      .then((resp: any) => {
        setProfilePhoto(resp.data.fileContent);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);

  //for modal popup for edit mobile...
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  //for modal popup for edit mobile...
  const [showProfileModal, setShowProfileModal] = useState(false);
  const changeProfileHandle = () => {
    setShowProfileModal(true);
  }
  const handleCloseProfileModal = () => {
    setShowProfileModal(false);
  };

  const returnResponse = (resp: any) => {
    setShowProfileModal(false);
    toast.success(resp + " updated.", {
      autoClose: autoCloseTime,
    });
    reloadfunction();
  }

  function changeGender(option: any) {
    if (option === "1") {
      setCheckedValue(option);
    }
    if (option === "0") {
      setCheckedValue(option);
    }
  }

  //toast alert auto close and reload...
  const reloadfunction = () => {
    setTimeout(() => {
      window.location.reload(); // Reload the page
    }, autoCloseTime);
  }
  //for profile submit
  const handleSubmit = (
    values: ProfilData,
    formikHelpers: FormikHelpers<any>
  ) => {
    values.gender = checkedValue;
    formikHelpers.setSubmitting(true);
    // Handle form submission logic here, e.g., send data to server
    _proxy.post(API_ENDPOINTS.updateProfile, values).then((resp: any) => {
      if (resp.data.status) {
        formikHelpers.setSubmitting(false);
        toast.success("Successfully updated", {
          autoClose: autoCloseTime,
        });
        reloadfunction();
      } else {
        toast.warning(resp.data.statusMessage);
        formikHelpers.setSubmitting(false);
      }
    });
  };

  return (
    <div className="profilePageClassDiv">
      {events && (
        <Formik
          initialValues={events}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="isk_donation_cards_card Anna_Card">
                    <div className="row">
                      <div className="col-md-12">
                        <h2>DID: 12345678910</h2>
                        <div className="row profilerow">
                          <div className="col-md-6">
                            <div className="mb-4 mt-4">
                              <label className="profilelabl" htmlFor="name">
                                Name <span className="labelspanred">*</span>
                              </label>
                              <div className="foredit">
                                <Field
                                  type="text"
                                  id="name"
                                  className="formname newinput"
                                  name="name"
                                />
                                <ErrorMessage
                                  className="errrmsg"
                                  name="name"
                                  component="div"
                                />
                                {/* <a href="">edit</a> */}
                              </div>
                            </div>
                            <div className="mb-4">
                              <label className="profilelabl" htmlFor="name">
                                Mobile <span className="labelspanred">*</span>
                              </label>
                              <div className="foredit">
                                <Field
                                  type="text"
                                  id="mobile"
                                  className="formmobile newinput"
                                  name="mobile"
                                  readOnly
                                />
                                <ErrorMessage
                                  className="errrmsg"
                                  name="mobile"
                                  component="div"
                                />
                                <a
                                  className="mobileedit"
                                  onClick={handleOpenModal}
                                >
                                  edit
                                </a>
                              </div>
                            </div>
                            <div className="mb-4">
                              <label className="profilelabl" htmlFor="name">
                                Email Address
                              </label>
                              <div className="emailfield">
                                <Field
                                  type="email"
                                  id="email"
                                  name="emailAddress"
                                  className="forminputt newinput"
                                  readOnly
                                />
                                <ErrorMessage
                                  className="errrmsg"
                                  name="email"
                                  component="div"
                                />
                              </div>
                            </div>
                            {/* </Form> */}
                          </div>
                          <div className="col-md-6 text-center">
                            <div className="profilepic">
                              <img className="profpic" src={`data:image/jpeg;base64,${profilePhoto}`} alt="profile" />
                              <a className="profileClick" onClick={changeProfileHandle}>change profile picture</a>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-12">
                            <div className="row mt-4">
                              <div className="col-md-6 gendetab">
                                <label className="profilelabl" htmlFor="gender">
                                  Gender
                                </label>
                                <div className="checks">
                                  <div className="femchek">
                                    {Object.values(Gender).map((option) => (
                                      <div className="profilechcks genderchecks" key={option}>
                                        <label className="dropDownLabel">
                                          <Field
                                            type="radio"
                                            name="gender"
                                            value={option}
                                            checked={option == checkedValue}
                                            onChange={() => changeGender(option)}
                                          />
                                          {option === '0' ? "Male" : "Female"}
                                        </label>
                                      </div>
                                    ))}
                                  </div>
                                  <ErrorMessage
                                    className="errrmsg"
                                    name="gender"
                                    component="div"
                                  />
                                </div>
                              </div>

                              <div className="col-md-6">
                                <label className="profilelabl" htmlFor="birthday">
                                  Birthday
                                </label>
                                <div className="mb-3">
                                  <Field
                                    type="date"
                                    id="birthday"
                                    name="dateOfBirth"
                                    className="forminputt newinput"
                                    value={events.dateOfBirth}
                                  />
                                  <ErrorMessage
                                    className="errrmsg"
                                    name="dateOfBirth"
                                    component="div"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row mt-2">
                      <div className="col-md-6">
                        <label className="profilelabl" htmlFor="address">
                          address
                        </label>
                        <div className="mb-4">
                          <Field
                            type="text"
                            name="address"
                            as="textarea"
                            placeholder=""
                            rows={2}
                            className="address forminputt"
                          />
                          <ErrorMessage
                            className="errrmsg"
                            name="address"
                            component="div"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <Row>
                          <Col>
                            <label className="profilelabl" htmlFor="city">
                              City <span className="errrmsg">*</span>
                            </label>
                            <div className="forcity">
                              <Field
                                type="text"
                                name="city"
                                className="forminputtcity newinput"
                              />
                              <ErrorMessage
                                className="errrmsg"
                                name="city"
                                component="div"
                              />
                            </div>
                          </Col>

                          <Col>
                            <label className="profilelabl" htmlFor="sin">
                              Pin
                            </label>
                            <div className="forpin">
                              <Field
                                type="text"
                                name="pin"
                                className="forminputtpin newinput"
                              />
                              <ErrorMessage
                                className="errrmsg"
                                name="pin"
                                component="div"
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row className="mt-4">
                          <Col>
                            <label className="profilelabl" htmlFor="state">
                              State
                            </label>
                            <div className="forpin">
                              <Field
                                type="text"
                                name="state"
                                className="forminputt newinput"
                              />
                              <ErrorMessage
                                className="errrmsg"
                                name="state"
                                component="div"
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row className="mt-4">
                          <Col>
                            <label className="profilelabl" htmlFor="country">
                              Country
                            </label>
                            <div className="forpin">
                              <Field
                                type="text"
                                name="country"
                                className="forminputt newinput"
                              />
                              <ErrorMessage
                                className="errrmsg"
                                name="country"
                                component="div"
                              />
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-md-12">
                        <div className="svbtndiv"></div>
                        <Button
                          className="savebtn"
                          variant="primary"
                          type="submit"
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <section>
                <Footer />
              </section>
            </div>
          </Form>
        </Formik>
      )}
      <ModalPopupComponent show={showModal} handleClose={handleCloseModal}>
        <EditMobileComponent mobileNumberExists={mobileNumber} profileReturnResp={returnResponse} />
      </ModalPopupComponent>
      <ModalPopupComponent show={showProfileModal} handleClose={handleCloseProfileModal}>
        <EditProfileComponent profileReturnResp={returnResponse} />
      </ModalPopupComponent>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default ProfileComponent;
