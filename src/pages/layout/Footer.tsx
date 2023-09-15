import footerimg from "../../assets/footerimg.png";

const Footer = () => {

    return (
      <div className="container">
        <div className="row footersection">
            <div className="col-md-12">
                <img src={footerimg} alt="iskcon" />
                <p>© 2020 ISKCON Abids, Hyderabad</p>
                <p>Official Website | Sri Sri Radha Madan Mohan Temple | All Rights Reserved</p>
            </div>
        </div>
      </div>
    )
  
}

export default Footer
