import React from "react";
import icon8 from "../assets/icon8.png";

const Navbar = () => {
  return (
    <nav id="navbar" className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        {/* Left (Brand) */}
        <a className="navbar-brand" href="#">HOOPSCOTCH</a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <form className="d-flex mx-auto my-2 my-lg-0" role="search">
            <input
              id="search"
              className="form-control me-2"
              type="text"
              placeholder="Search"
              aria-label="Search"
              name="searched"
            />
            &nbsp;&nbsp;
            <div className="d-flex gap-3">
              <a className="nav-link" id="download" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="grey" className="bi bi-download" viewBox="0 0 16 16">
                  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                  <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                </svg>
              </a>
              <a className="nav-link" id="support" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="grey" className="bi bi-headset" viewBox="0 0 16 16">
                  <path d="M8 1a7 7 0 0 0-7 7v4.5A1.5 1.5 0 0 0 2.5 14h.563a2.375 2.375 0 0 0 4.687 0h1.5a2.375 2.375 0 0 0 4.687 0H13.5A1.5 1.5 0 0 0 15 12.5V8a7 7 0 0 0-7-7zM2 8a6 6 0 0 1 12 0v4.5a.5.5 0 0 1-.5.5h-.563a2.375 2.375 0 0 0-4.687 0H6.25a2.375 2.375 0 0 0-4.687 0H2.5a.5.5 0 0 1-.5-.5V8zm3.5 6a1.375 1.375 0 1 1 0-2.75A1.375 1.375 0 0 1 5.5 14zm7 0a1.375 1.375 0 1 1 0-2.75 1.375 1.375 0 0 1 0 2.75z"/>
                </svg>
              </a>
            </div>
          </form>
        
          {/* Right (Links) */}
          <div className="d-flex flex-column flex-lg-row align-items-left gap-3">
            <a className="nav-link" id="save" href="#">
              <img src={icon8} width="19px" alt="icon" />
              &nbsp;&nbsp; Save My Workspace
            </a>
            <a className="nav-link" id="login" href="#">Login</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
