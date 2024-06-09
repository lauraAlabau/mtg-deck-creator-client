import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { FaArrowRightFromBracket } from "react-icons/fa6";
import { FaRegUserCircle } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";

import { UserContext } from "../App";

import "../assets/css/navbar.css";

const Navbar = () => {
  const { user } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const handleOpen = () => {
    setOpen(!open);
  };

  const getActiveLink = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img
          alt="logo"
          src="https://utfs.io/f/c41b25e1-91e1-49bd-bdf1-44f19f610f49-1evuz.webp"
        />

        {user && (
          <div className="navbar-pages">
            <div className={`navbar-link ${getActiveLink("/search")}`}>
              <Link to="/search">Search</Link>
            </div>
            <div className={`navbar-link ${getActiveLink("/favorites")}`}>
              <Link to="/favorites">Favorites</Link>
            </div>
            <div className={`navbar-link ${getActiveLink("/deck")}`}>
              <Link to="/deck">Deck</Link>
            </div>
          </div>
        )}
      </div>

      {user && (
        <div className="navbar-right dropdown">
          <button className="navbar-btn" onClick={handleOpen}>
            <FaRegUserCircle />
          </button>
          {open ? (
            <>
              <div className="menu">
                <div
                  className={`menu-item navbar-link ${getActiveLink(
                    "/profile"
                  )}`}
                >
                  <FiSettings />
                  <Link to="/profile">Settings</Link>
                </div>
                <div className="menu-item navbar-link">
                  <FaArrowRightFromBracket /> <Link to="/logout">Logout</Link>
                </div>
              </div>
            </>
          ) : null}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
