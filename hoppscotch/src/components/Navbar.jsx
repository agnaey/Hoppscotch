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
