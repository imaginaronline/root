import { useState } from 'react';
import "./AdminLayoutStyles.css";
import { Button } from 'react-bootstrap';
import './AdminDashboard.css';
import HomeLogo from "../../../assets/Homelogo.png"
import PenLogo from '../../../assets/PenLogo.png'
import MessageLogo from '../../../assets/MessageLogo.png'
import ReportsLogo from '../../../assets/ReportsLogo.png'
import powerLogo from '../../../assets/powerLogo.png'
import MenLogo from '../../../assets/MenLogo.svg'
import { Link } from 'react-router-dom';

export default function AdminMainSideNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const [activeItem, setActiveItem] = useState('');

    const handleItemClick = (item:any) => {
        setActiveItem(item);
    };

  return (
    <div className="app">
      <nav className={`side-menu ${menuOpen ? "open" : ""}`}>
        <ul className="menuList">
          <li>
            <a href="#">
              <img src={MenLogo} className="menLogo" alt="homeLogo" />
            </a>
          </li>
          <Link to="/admin/adminDashboard">
            <li
              className={activeItem === "" ? "active" : ""}
              onClick={() => handleItemClick("homeLogo")}
            >
              <img src={HomeLogo} className="homeLogo" alt="homeLogo" />
            </li>
          </Link>
          <Link to="/admin/manageactivities">
            <li
              className={activeItem === "" ? "active" : ""}
              onClick={() => handleItemClick("penLogo")}
            >
              <img src={PenLogo} className="penLogo" alt="penLogo" />
            </li>
          </Link>
          <Link to="/admin/communication">
            <li
              className={activeItem === "" ? "active" : ""}
              onClick={() => handleItemClick("messageLogo")}
            >
              <img src={MessageLogo} className="messageLogo" alt="messageLogo" />
            </li>
          </Link>
          <Link to="/admin/transactions">
            <li
              className={activeItem === "" ? "active" : ""}
              onClick={() => handleItemClick("ReportsLogo")}
            >
              <img src={ReportsLogo} className="ReportsLogo" alt="ReportsLogo" />
            </li>
          </Link>
          <li>
            <a href="#">
              <img src={powerLogo} className="powerLogo" alt="powerLogo" />
            </a>
          </li>
        </ul>
      </nav>
      <div className="main-content">
        <Button className="menu-toggle d-md-none" onClick={toggleMenu}>
          Menu
        </Button>
      </div>
    </div>
  );
}
