
import Rajbhog from '../../../assets/rajbhog.png'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef } from 'react';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  minAmount: Yup.number().typeError('Min Amount must be a number').required('Min Amount is required'),
  detail: Yup.string().required('Description is required'),
  startDate: Yup.date().required('Start Date is required'),
  endDate: Yup.date().required('End Date is required').min(Yup.ref('startDate'), 'End Date must be after Start Date'),
});


function SevaComponent(){

  const [selectedImage, setSelectedImage] = useState('');
  const fileInputRef: any = useRef(null);
  const [isDonationFormVisible, setIsDonationFormVisible] = useState(false);
  const [donationData, setDonationData] = useState<any>([]);
  const [editItem, setEditItem] = useState<any>(null);

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.result && typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Failed to read file as base64.'));
        }
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  };
  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    convertFileToBase64(file).then(base64String => {
      if (base64String != null || base64String != '') {
        // i.e: data:image/jpeg;base64,/9j/4AAQSkZJ..
        setSelectedImage(base64String)
      }
    });
  };

    const handleOpenModal = () => {
        console.log("seva");
      };

      const initialValues = {
        title: editItem ? editItem.title : "",
        image: editItem ? editItem.image :"",
        minAmount: editItem ? editItem.minAmount : "",
        detail: editItem ? editItem.detail :"",
        startDate: editItem ? editItem.startDate : null,
        endDate: editItem ? editItem.endDate : null,
      };

      const handleDonationSubmit = (values: any, { resetForm }: any) => {
        values.image = selectedImage;
        if (editItem) {
        const updatedItem:any =  {
          id: editItem.id, 
          title: values.title,
          image: values.image,
          minAmount:values.minAmount,
          detail:values.detail,
          startDate: values.startDate,
          endDate: values.endDate,
        };
        setDonationData((prevDonationData:any) => {
          return prevDonationData.map((item:any) =>
            item.id === updatedItem.id ? updatedItem : item
          );
        });
        setEditItem(null);
      }
      else {
        const newDonation = {
          id: Date.now(),
          title: values.title,
          image: values.image,
          minAmount:values.minAmount,
          detail:values.detail,
          startDate: values.startDate,
          endDate: values.endDate,
        };
        setDonationData([...donationData, newDonation]);
      }
      setIsDonationFormVisible(false);
      resetForm();
      setSelectedImage('');
      fileInputRef.current.value = '';
    };

      const deleteSelectedData  = (itemToDelete:any) =>{
        setDonationData((prevDonationData:any) => {
      
          const updatedDonationData = prevDonationData.filter(
            (item:any) => item !== itemToDelete
          );
          return updatedDonationData;
        });
        console.log(itemToDelete);
    
      }

      const editSelectedData = (itemToEdit:any) => {
        setEditItem(itemToEdit);
        setSelectedImage(itemToEdit.image);
        setIsDonationFormVisible(true); // Show the form for editing.
      };
    return (
      <div className="container pt-5">
        <section className="filterTargetGroup">
          {isDonationFormVisible && (
            <div className="card donationfiltersCard">
            <div className="addnewdonationform">
            <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleDonationSubmit}
                >
                {(formik) => (
                  <Form>
                    <div className="row">
                      <div className="activitesHeaderBody">
                        <div className="leftSideLine"></div>
                        <div className="activitytitle">
                          <p className="headTitle">Add new Seva</p>
                        </div>
                      </div>
                      <div className="col-md-8">

                        <div className="form-group mt-5">
                          <label className="mangecatlabel" htmlFor="title">Title</label>
                          <Field type="text" id="title" name="title" className="form-control newinputadm" />
                          <ErrorMessage  name="title" component="div" className="text-danger"/>
                        </div>

                        <div className="form-group mt-5">
                        <label className="mangecatlabel" htmlFor="image">Image</label>
                        <input type="file" id="image" name="image"  ref={fileInputRef}  className="form-control newinputadm" onChange={(event:any) => handleImageChange(event)}  />
                        <ErrorMessage   name="image" component="div"  className="text-danger" />
                        </div>

                        <div className="form-group mt-5">
                          <label className="mangecatlabel" htmlFor="minAmount">  Min Amount</label>
                          <Field
                            type="number"
                            id="minAmount" name="minAmount"
                            className="form-control newinputadm"
                          />
                          <ErrorMessage
                            name="minAmount"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                        <div className="form-group mt-5">
                          <label className="mangecatlabel" htmlFor="detail">
                            Details
                          </label>
                          <Field
                            type="text"
                            id="detail"
                            name="detail"
                            className="form-control newinputadm"
                          />
                          <ErrorMessage
                            name="detail"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                        <div className="festinpts mt-5">
                          <label className="mangecatlabel" htmlFor="date">
                            {" "}
                            Date
                          </label>
                          <div className="form-group datepickinput">
                            <label htmlFor="startDate">
                              <FontAwesomeIcon icon={faCalendarAlt} /> Start
                              Date
                            </label>
                            <DatePicker
                              id="startDate"
                              name="startDate"
                              selected={formik.values.startDate}
                              onChange={(date) =>
                                formik.setFieldValue("startDate", date)
                              }
                              className="form-control newinputadm"
                            />
                            <ErrorMessage
                              name="startDate"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                          <div className="form-group datepickinput">
                            <label htmlFor="endDate">
                              <FontAwesomeIcon icon={faCalendarAlt} /> End Date
                            </label>
                            <DatePicker
                              id="endDate"
                              name="endDate"
                              selected={formik.values.endDate}
                              onChange={(date) =>
                                formik.setFieldValue("endDate", date)
                              }
                              className="form-control newinputadm"
                            />
                            <ErrorMessage
                              name="endDate"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </div>
                       
                        <div className="managesavebutton mt-5">
              {editItem ? (
                <button type="submit" className="savbtn">Update</button>
              ) : (
                <button type="submit" className="savbtn">Save</button>
              )}
            </div>
                        
                      </div>
                      <div className="col-md-4 newsevacard">
                        <div className="card featurecards">
                          <h5 style={{ background: "#1b787b" }}>{formik.values.title}</h5>

                          <div className="card-body featurecardbody">
                            <div className="featureimg">
                              {selectedImage ? (
                                    <img src={selectedImage} alt="festival" />
                                  ) : (
                                    <img src={Rajbhog} alt="festival" />
                                  )}
                            </div>
                            <div className="cardtext">
                              <p className="featuredProgramParagraph">
                              {formik.values.detail}
                              </p>
                              <div className="btnsgrp mt-4">
                              <button type="submit" className="btn btn-primary clckproceedbtn" onClick={() => handleOpenModal()}>Proceed now</button>
                                
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                     
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>

          )}
          <div className="activedonationcards mt-5">
            <div className="activitesHeaderBody">
              <div className="leftSideLine"></div>
              <div className="activitytitle">
                <p className="headTitle">Active Seva</p>
              </div>
            </div>
            <div>
            <button type="button" className="addButtonDonation" onClick={() => setIsDonationFormVisible(!isDonationFormVisible)}> Add</button>
          </div>
           
          </div>
          <div className="row activeDonationRow">
          <div className="dropOffDetailsContentTable">
            <div className="tableContent">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Image</th>
                    <th scope="col">Min Amount</th>
                    <th scope="col">Details</th>
                    <th scope="col">Start Date</th>
                    <th scope="col">End Date</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {donationData.map((item:any, index:any) => (
                    <tr key={item.id}>
                      <th scope="row">{index+1}</th>
                      <td>{item.title}</td>
                      <td>
                        <img src={item.image} alt={item.title} />
                      </td>
                      <td>{item.minAmount}</td>
                      <td>{item.detail}</td>
                      <td>{item.startDate.toLocaleDateString()}</td>
                      <td>{item.endDate.toLocaleDateString()}</td>
                      <td>
                        <button type='button' className='editDonationButton' onClick={() => editSelectedData(item)}>Edit</button>
                        <button type='button' className='deleteDonationButton' onClick={() => deleteSelectedData(item)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        </section>
      </div>
    );
}
export default SevaComponent