import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const LoginPage = () => {
  const [loginStates, setLoginStates] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext); //for setting up user so that if logged in have to show the username
  // for handling input
  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginStates({
      ...loginStates,
      [name]: value,
    });
  };

  // for handling form submission
  const handleLoginSubmit = async (event) => {
    try {
      event.preventDefault();

      //sending post request to backend for user verification and cookie generation
      const response = await axios.post("/login", {
        email: loginStates.email,
        password: loginStates.password,
      });
      if (!response.data) {
        alert("error");
        navigate("/register");
      }
      setUser(response.data); //setting user so that we can grab the name from it to show on screen
      alert("login Successful");
      navigate("/");
    } catch (error) {
      alert("login failed");
      console.log(error.response);
    }
  };
  return (
    <form
      className="text-center w-auto m-auto login-form"
      onSubmit={handleLoginSubmit}
    >
      <h1>Login</h1>
      <div className="mb-3 login-input">
        <input
          type="email"
          className="form-control"
          name="email"
          onChange={handleLoginChange}
          value={loginStates.email}
          placeholder="name@email.com"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
      </div>
      <div className="mb-3 login-input">
        <input
          type="password"
          name="password"
          onChange={handleLoginChange}
          value={loginStates.password}
          className="form-control"
          placeholder="password"
          id="exampleInputPassword1"
        />
      </div>

      <button type="submit" className="btn btn-success login-input">
        Login
      </button>
      <div className="register-prompt p-3">
        <p>
          Dont have an Account?
          <Link to={"/register"} className="register-link">
            {" "}
            Register Now
          </Link>
        </p>
      </div>
    </form>
  );
};
export default LoginPage;
