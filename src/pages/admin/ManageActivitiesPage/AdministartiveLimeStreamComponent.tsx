import { useState } from "react";

function AdministartiveLimeStreamComponent() {
  const [formData, setFormData] = useState({
    link: "",
  });

  const [errors, setErrors] = useState({
    link: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!formData.link) {
      setErrors({
        link: "Link is required",
      });
      return;
    }

    console.log("AudioLink:", formData);
  };

  return (
    <div className=" pt-5">
      <div className="row mt-5">
        <div className="activitesHeaderBody">
          <div className="leftSideLine"></div>
          <div className="activitytitle">
            <p className="headTitle">Live Stream</p>
          </div>
        </div>
        <div className="col-md-12 mt-5">
          <div className="card admcard">
            <div className="card-body admcardbody">
              <form onSubmit={handleSubmit}>
                <div className="row mt-4 admcardrow">
                  <div className="col-md-8 offset-md-2">
                    <label className="col-form-label donationlabel">Link</label>
                    <input
                      type="text"
                      name="link"
                      onChange={handleChange}
                      className="form-control donationinput"
                      placeholder="title"
                    />
                    {errors.link && (
                      <p className="text-danger">{errors.link}</p>
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

export default AdministartiveLimeStreamComponent;
