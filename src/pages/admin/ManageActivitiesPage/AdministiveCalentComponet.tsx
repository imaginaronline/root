
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import RemoveInto from '../../../assets/RemoveInto.png'
import sidebar from '../../../assets/sidebar.png'

function AdministiveCalentComponet({switchComponent}:any){
    const [dateList, setDateList] = useState<string[]>([]);

    const validationSchema = Yup.object({
      date: Yup.date().required('Date is required'),
      occasion: Yup.string().required('Occasion is required'),
    });
  
    const initialValues = {
      date: '',
      occasion: '',
    };
 
    const handleSubmit = (values: { date: string }, { setSubmitting, resetForm }: any) => {
      setDateList([...dateList, values.date]);
      resetForm();
      setSubmitting(false);
    };

    const handleDeleteDate = (dateToDelete: string) => {
      const updatedDateList = dateList.filter((date) => date !== dateToDelete);
      setDateList(updatedDateList);
    };
    return( 
        <div className="container pt-5">
            <div className="pt-2">
                <section className="filterTargetGroup"> 
                    <div className="admfiltersCard">
                        <div className="addnewdonationform">
                            <div>
                                <img className='backimg' src={sidebar} alt="sidebar" onClick={switchComponent}/>
                            </div>                       
                            <div className="row">
                                <div className="col-md-12 mt-5">
                                <div className="activitesHeaderBody">
                                    <div className="leftSideLine">
                                    </div>
                                    <div className='activitytitle'>
                                        <p className="headTitle">Non- Functional Days</p>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-body admcardbody">
                                        <Formik
                                            initialValues={initialValues}
                                            validationSchema={validationSchema}
                                            onSubmit={handleSubmit}
                                        >
                                            <Form>
                                            <div className="row mt-4 admcardrow">
                                                <div className="col-md-8 offset-md-2">
                                                    <div>
                                                    <label className="col-form-label donationlabel">Date</label>
                                                        <Field
                                                            type="date"
                                                            className="form-control donationinput"
                                                            name="date"
                                                        />
                                                        <ErrorMessage name="date" component="span" className="error" />
                                                    </div>
                                                    <div>
                                                    <label className="col-form-label donationlabel">Occasion</label>
                                                        <Field
                                                            type="text"
                                                            className="form-control donationinput"
                                                            name="occasion"
                                                        />
                                                        <ErrorMessage name="occasion" component="span" className="error" />
                                                    </div>
                                                    <div className='nonfunctionalbtn'>
                                                    <button type="submit" className="btn btn-primary clcksavebtn">
                                                        Save Date
                                                    </button>
                                                    </div>
                                                    <div>
                                                        <ul className='nonfunctionaldatesul'>
                                                            {dateList.map((date, index) => (
                                                                <li className='nonfunctionaldatesli' key={index}>
                                                                    <img src={RemoveInto} alt="deleteimg" onClick={() => handleDeleteDate(date)} />
                                                                    <span> {date}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            </Form>
                                        </Formik>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
export default AdministiveCalentComponet

