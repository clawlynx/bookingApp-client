import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [registrationStates, setRegistrationStates] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  //for input changing and setting state
  const handleChange = (event) => {
    const { name, value } = event.target;
    setRegistrationStates({
      ...registrationStates,
      [name]: value,
    });
  };

  // for form submission
  const handleRegistration = async (event) => {
    event.preventDefault();
    try {
      // sending  post request to backend for registration
      await axios.post("/register", {
        name: registrationStates.name,
        email: registrationStates.email,
        password: registrationStates.password,
      });
      alert("Registration Completed Successfully.Please login now");
      navigate("/login");
    } catch (error) {
      alert("Error in registration. Email already exists ");
    }
  };
  return (
    <form
      onSubmit={handleRegistration}
      className="text-center w-auto m-auto login-form"
    >
      <h1>Register</h1>
      <div className="mb-3 login-input">
        <input
          type="text"
          name="name"
          value={registrationStates.name}
          onChange={handleChange}
          className="form-control"
          placeholder="FullName"
          id="fullName1"
        />
      </div>
      <div className="mb-3 login-input">
        <input
          type="email"
          name="email"
          value={registrationStates.email}
          className="form-control"
          onChange={handleChange}
          placeholder="name@email.com"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
      </div>
      <div className="mb-3 login-input">
        <input
          type="password"
          name="password"
          value={registrationStates.password}
          className="form-control"
          onChange={handleChange}
          placeholder="password"
          id="exampleInputPassword1"
        />
      </div>

      <button type="submit" className="btn btn-success login-input">
        Register
      </button>
      <div className="register-prompt p-3">
        <p>
          Already a member?
          <Link to={"/login"} className="register-link">
            {" "}
            Login
          </Link>
        </p>
      </div>
    </form>
  );
};
export default RegisterPage;
