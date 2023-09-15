
import  { useState } from 'react';

function AdministartiveAudioChantComponent(){

    const [formData, setFormData] = useState({
        audioFile: '',
        audioLink: '',
      });
      const [errors, setErrors] = useState({
        audioFile: '',
        audioLink: '',
      });
    
      const handleChange = (e:any) => {
        const { name, value, files } = e.target;
        setFormData({
          ...formData,
          [name]: name === 'audioFile' ? files[0] : value,
        });
        setErrors({
          ...errors,
          [name]: '', // Clear the error when the user starts typing
        });
      };

      const handleSubmit = (e:any) => {
        e.preventDefault();
        // Validate the form here (e.g., check if required fields are filled)
        if (!formData.audioFile && !formData.audioLink) {
          setErrors({
            audioFile: 'Audio file is required',
            audioLink: 'Audio link is required',
          });
          return;
        }
    
        // Perform your form submission logic here
        console.log('Form data:', formData);
      };

    return (
        <div className=" pt-5">
          <div className="row mt-5">
            <div className="activitesHeaderBody">
              <div className="leftSideLine"></div>
              <div className="activitytitle">
                <p className="headTitle">Audio Chant</p>
              </div>
            </div>
            <div className="col-md-12 mt-5">
              <div className="card admcard">
                <div className="card-body admimgbody">
                  <form onSubmit={handleSubmit}>
                    <div className="row mt-4 admcardrow">
                      <div className="col-sm-12">
                        <label className="col-form-label donationlabel">
                          Audio
                        </label>
                        <input
                          type="file"
                          name="audioFile"
                          onChange={handleChange}
                          className="form-control donationinput"
                          placeholder="title"
                        />
                        {errors.audioFile && (
                          <p className="text-danger">{errors.audioFile}</p>
                        )}
                        <p className="mt-4">OR</p>
                        <label className="col-form-label donationlabel">
                          Link
                        </label>
                        <input
                          type="text"
                          name="audioLink"
                          onChange={handleChange}
                          className="form-control donationinput"
                          placeholder="title"
                        />
                        {errors.audioLink && (
                          <p className="text-danger">{errors.audioLink}</p>
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

export default AdministartiveAudioChantComponent