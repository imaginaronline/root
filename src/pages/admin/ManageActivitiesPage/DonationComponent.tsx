import './ManageActivitiesComponent.css';
import Annadhan from '../../../assets/annadhan.png'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState } from 'react';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  milestone: Yup.string().required('Title is required'),
  startDate: Yup.date().required('Start Date is required'),
  endDate: Yup.date().required('End Date is required').min(Yup.ref('startDate'), 'End Date must be after Start Date'),
});

function DonationComponent() {

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
    // const imageUrl:any = URL.createObjectURL(file);
    // console.log(imageUrl);
    convertFileToBase64(file).then(base64String => {
      if (base64String != null || base64String != '') {
        // i.e: data:image/jpeg;base64,/9j/4AAQSkZJ..
        setSelectedImage(base64String)
      }
    });
    //   setSelectedImage(imageUrl);
    // formik.setFieldValue('image', file);
  };

  const maxRange = 5;
  const [isMilestoneChecked, setIsMilestoneChecked] = useState(false);

  const handleMilestoneChange = (event: any) => {
    setIsMilestoneChecked(event.target.checked);
  };

  const initialValues = {
    title: editItem ? editItem.title : "",
    image: editItem ? editItem.image :"",
    milestone: false,
    eventRange: 1,
    startDate: editItem ? editItem.startDate : null,
    endDate: editItem ? editItem.endDate : null,
  };

  const handleDonationSubmit = (values:any, { resetForm }:any) => {
    values.image = selectedImage
    if (editItem) {
      const updatedItem:any = {
        id: editItem.id, 
        title: values.title,
        image: values.image,
        eventRange: values.eventRange,
        startDate: values.startDate,
        endDate: values.endDate,
      };
      setDonationData((prevDonationData:any) => {
        return prevDonationData.map((item:any) =>
          item.id === updatedItem.id ? updatedItem : item
        );
      });
      setEditItem(null);
    } else {
      const newDonation = {
        id: Date.now(),
        title: values.title,
        image: values.image,
        eventRange: values.eventRange,
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
      // Use filter to create a new array excluding the item
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
        {/* <div className="container pt-5"> */}
          {isDonationFormVisible && (
            <div className="card donationfiltersCard">
              <div className="addnewdonationform">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleDonationSubmit}
                >
                  {(formik) => (
                    <Form >
                      <div className="row">
                        <div className="activitesHeaderBody">
                          <div className="leftSideLine"></div>
                          <div className="activitytitle">
                            <p className="headTitle">Add new Donation</p>
                          </div>
                        </div>
                        <div className="col-md-8">
                          <div className="donationinputd">

                            <div className="form-group mt-5">
                              <label className="mangecatlabel" htmlFor="title">Title</label>
                              <Field type="text" id="title" name="title" className="form-control newinputadm" />
                              <ErrorMessage name="title" component="div" className="text-danger" />
                            </div>

                            <div className="form-group mt-5">
                              <label className="mangecatlabel" htmlFor="mstone">Image</label>
                              <input type="file" id="image" name="image" ref={fileInputRef} className="form-control newinputadm" onChange={(event:any) => handleImageChange(event)} />
                              <ErrorMessage name="image" component="div" className="text-danger" />
                            </div>

                            <div className="row mt-4">
                              <div className="col-sm-9">
                                <div className="milecheck">
                                  <input className="newinputadm" type="checkbox" name="milestone" placeholder="milestone" onChange={handleMilestoneChange} />
                                  <label htmlFor="milestone" className='mangecatlabel'>Milestone</label>
                                </div>
                                {isMilestoneChecked && (
                                  <div className="rangemile mt-4">
                                    <p>Limit</p>

                                    <div className="rangebar">
                                      <Field
                                        type="range" id="eventRange" name="eventRange" min="1" max={maxRange} step="1" placeholder="limit" className="form-control-range" />
                                      <p>Set fundraiser milestone</p>
                                    </div>
                                    <button type="button" className="btn btn-light"> {formik.values.eventRange} LAC</button>
                                  </div>
                                )}
                                <ErrorMessage name="eventRange" component="div" className="text-danger" />
                              </div>
                            </div>

                            <div className="festinpts mt-5">
                              <label className="mangecatlabel" htmlFor="date">Date</label>
                              <div className="form-group datepickinput">
                                <label htmlFor="startDate">
                                  <FontAwesomeIcon icon={faCalendarAlt} />
                                  Start
                                  Date
                                </label>
                                <DatePicker
                                  id="startDate" name="startDate" selected={formik.values.startDate} onChange={(date) => formik.setFieldValue("startDate", date)} className="form-control newinputadm"
                                />
                                <ErrorMessage name="startDate" component="div" className="text-danger" />
                              </div>

                              <div className="form-group datepickinput">
                                <label htmlFor="endDate">
                                  <FontAwesomeIcon icon={faCalendarAlt} />
                                  End
                                  Date{" "}
                                </label>
                                <DatePicker
                                  id="endDate" name="endDate" selected={formik.values.endDate} onChange={(date) => formik.setFieldValue("endDate", date)} className="form-control newinputadm"
                                />
                                <ErrorMessage name="endDate" component="div" className="text-danger" />
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
                        </div>
                        <div className="col-md-4 previewdoncard">
                          <div className="activeDonationCard">
                            <div className='card impactCardClass'>
                              {selectedImage ? (
                                <img src={selectedImage} alt="festival" />
                              ) : (
                                <img src={Annadhan} alt="festival" />
                              )}
                              <p className="customtitle">{formik.values.title}</p>
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
        {/* </div> */}
        <div className="activedonationcards mt-5">
          <div className="activitesHeaderBody">
            <div className="leftSideLine"></div>
            <div className="activitytitle">
              <p className="headTitle">Active Donation</p>
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
                    <th scope="col">Limit</th>
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
                      <td>{item.eventRange}</td>
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

export default DonationComponent;