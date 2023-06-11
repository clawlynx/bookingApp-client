import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import axios from "axios";

const Header = () => {
  // for showing username if logged in
  const { user } = useContext(UserContext);
  // for searching location
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const submitSearch = (e) => {
    e.preventDefault();
    navigate("/search/" + search);
    setSearch("");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-success-subtle fixed-top">
      <div className="container">
        <Link to={"/"} className="navbar-brand">
          <img
            src="https://img.icons8.com/3d-plastilina/69/checked-checkbox--v2.png"
            alt="Logo"
            width="50"
            height="50"
            className="d-inline-block"
          ></img>
          <span className="brand-name">BookIt!</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <div className="navbar-nav">
            <form className="d-flex  flex-grow-1 border border-success-subtle p-2 rounded-3">
              <input
                className="form-control me-2"
                type="text"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                placeholder="Search location"
                aria-label="Search"
              ></input>
              <button
                className="p-2 ms-1 btn btn-success rounded-5"
                onClick={submitSearch}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  className="bi bi-search "
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </button>
            </form>
            <Link
              to={user ? "/account" : "/login"}
              className="nav-link d-flex align-items-center justify-content-center border border-success-subtle rounded-5 ms-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-person-circle userIcon rounded-5"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                />
              </svg>
              {user ? (
                <span className="fw-bold text-success-emphasis ps-2">
                  {user.name.toUpperCase()}
                </span>
              ) : (
                <span className="fw-bold text-success-emphasis ps-2">
                  LOGIN
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Header;
