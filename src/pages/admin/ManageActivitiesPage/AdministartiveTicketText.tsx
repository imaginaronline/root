
import  { useState } from 'react';

function AdministartiveTicketText(){

    const [formData, setFormData] = useState({
        file: '',
 
      });
      const [errors, setErrors] = useState({
        file: '',

      });
    
      const handleChange = (e:any) => {
        const { name, value, files } = e.target;
        setFormData({
          ...formData,
          [name]: name === 'file' ? files[0]: value,
        });
        setErrors({
          ...errors,
          [name]: '', // Clear the error when the user starts typing
        });
      };

      const handleSubmit = (e:any) => {
        e.preventDefault();
        // Validate the form here (e.g., check if required fields are filled)
        if (!formData.file) {
          setErrors({
            file: 'File is required',

          });
          return;
        }
    
        // Perform your form submission logic here
        console.log('File data:', formData);
      };

    return (
      <div className=" pt-5">
        <div className="row mt-5">
          <div className="activitesHeaderBody">
            <div className="leftSideLine"></div>
            <div className="activitytitle">
              <p className="headTitle">Ticker Text</p>
            </div>
          </div>
          <div className="col-md-12 mt-5">
            <div className="card admcard">
              <div className="card-body admcardbody">
                <form onSubmit={handleSubmit}>
                  <div className="row mt-4 admcardrow">
                    <div className="col-md-8 offset-md-2">
                      <label className="col-form-label donationlabel">
                        File
                      </label>
                      <input
                        type="file"
                        name="file"
                        onChange={handleChange}
                        className="form-control donationinput"
                        placeholder="title"
                      />
                      {errors.file && (
                        <p className="text-danger">{errors.file}</p>
                      )}
                    </div>
                    <div className="col-md-12 text-center mt-5">
                      <button
                        type="submit"
                        className="btn btn-primary clcksavebtn"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default AdministartiveTicketText