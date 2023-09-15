
import festimg from '../../../assets/festimg.png';
import SpotLightEvent from '../../../components/SpotlightEventComponent';
import  { useRef, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  startDate: Yup.date().required('Start Date is required'),
  endDate: Yup.date()
    .required('End Date is required')
    .min(Yup.ref('startDate'), 'End Date must be after Start Date'),
});

function FestivalsComponent(){
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

  const initialValues = {
    title: editItem ? editItem.title : "",
    image: editItem ? editItem.image :"",
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
                 <div className="row">
                   <div className="activitesHeaderBody">
                     <div className="leftSideLine"></div>
                     <div className="activitytitle">
                       <p className="headTitle">Add new Festival</p>
                     </div>
                   </div>
                   <div>
                     <div className="addnewfestival mt-5">
                       <div className="row">
                       <Formik
                     initialValues={initialValues}
                     validationSchema={validationSchema}
                     onSubmit={handleDonationSubmit}
                   >
                           {(formikProps) => (
                             <Form>
                                <div className="col-md-12 mt-5">
                                 <div className="card festcard">
                                   <div className="card-body festimgbody">
                                   <div className="festimg">
                                     {selectedImage ? (
                                       <img src={selectedImage} alt="festival" />
                                     ) : (
                                       <img src={festimg} alt="festival" />
                                     )}
                                   </div>
   
                                   <div className="festtitle">
                                     <h3>{formikProps.values.title || "Add title"}</h3>
                                   </div>
                                   </div>
                                 </div>
                               </div>
                               
                               <div className="festivalforminputs mt-4">
                                 <div className="form-group titlinpt mt-5">
                                   <label className="mangecatlabel" htmlFor="title">Title</label>
                                   <Field type="text" id="title" name="title" className="form-control newinputadm"/>
                                   <ErrorMessage name="title" component="div" className="text-danger"/>
                                 </div>
   
                                 <div className="form-group mt-5">
                                   <label className="mangecatlabel" htmlFor="image">Image</label>
                                   <input type="file" id="image" name="image"   ref={fileInputRef} onChange={(event:any) => handleImageChange(event)} className="form-control newinputadm"/>
                                   <ErrorMessage name="image" component="div" className="text-danger"
                                   />
                                 </div>
                               
                               <div className="festinpts mt-5">
                               <label className="mangecatlabel" htmlFor="date">Date</label>
   
                                 <div className="form-group datepickinput">
                                   <label htmlFor="startDate"><FontAwesomeIcon icon={faCalendarAlt} />Start Date</label>
                                   <DatePicker id="startDate" name="startDate" selected={formikProps.values.startDate}
                                     onChange={(date) =>
                                       formikProps.setFieldValue("startDate", date)
                                     } className="form-control newinputadm"/>
                                   <ErrorMessage name="startDate" component="div" className="text-danger"/>
                                 </div>
   
                                 <div className="form-group datepickinput">
                                   <label htmlFor="endDate"><FontAwesomeIcon icon={faCalendarAlt} />End Date</label>
                                   <DatePicker id="endDate" name="endDate" selected={formikProps.values.endDate}
                                     onChange={(date) =>
                                       formikProps.setFieldValue("endDate", date)
                                     } className="form-control newinputadm"/>
                                   <ErrorMessage name="endDate" component="div" className="text-danger"/>
                                 </div>
                               </div>
                               </div>
                               <div className="managesavebutton mt-5">
                          {editItem ? (
                            <button type="submit" className="savbtn">Update</button>
                          ) : (
                            <button type="submit" className="savbtn">Save</button>
                          )}
                        </div>
                             </Form>
                           )}
                         </Formik>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </div> 

          )}
          
          <div className="activedonationcards mt-5">
            <div className="activitesHeaderBody">
              <div className="leftSideLine"></div>
              <div className="activitytitle">
                <p className="headTitle">Active Festivals</p>
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
          <section className="pt-5">
              <SpotLightEvent />
            </section>
        </div>
        </section>
      </div>
    );
}


export default FestivalsComponent