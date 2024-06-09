/* eslint-disable react/no-unescaped-entities */
import axios from "axios";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { BASE_URL } from "../Utils/Constants";
import GradientCircle from "../Components/GradientCircle";
import Navbar from "../Components/Navbar";
import Validation from "../Utils/Validation";

import "react-toastify/dist/ReactToastify.css";
import "../assets/css/login.css";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [serverErrors, setServerErrors] = useState([]);

  const navigate = useNavigate();

  const handleChange = (event) => {
    console.log({ [event.target.name]: event.target.value });
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errs = Validation(values);
    setErrors(errs);

    if (!errs.name || !errs.email || !errs.password) {
      console.log("Form submitted successfully");
      axios
        .post(`${BASE_URL}contactmsyt/register`, values)
        .then((res) => {
          if (res.data.success) {
            toast.success("Account created successfully", {
              position: "top-center",
              autoClose: 5000,
              theme: "dark",
              closeOnClick: true,
              //bodyStyle:{} //TODO: Style it
            });
            navigate("/search"); //TODO: Change to SEARCH page when done
          }
        })
        .catch((err) => {
          if (err.response.data.errors) {
            setServerErrors(err.response.data.errors);
          } else {
            console.log(err);
          }
        });
    }
  };

  return (
    <>
      <Navbar />
      <GradientCircle
        size={"large"}
        color={"blue"}
        alignItems={"align-start"}
        justifyContent={"justify-center"}
      />

      <GradientCircle
        size={"medium"}
        color={"blue"}
        alignItems={"align-center"}
        justifyContent={"justify-end"}
      />
      <GradientCircle
        size={"small"}
        color={"blue"}
        alignItems={"align-end"}
        justifyContent={"justify-center"}
      />
      <div className="bg"></div>
      <main className="view-container">
        <p className="left-side">Join the tribe!</p>
        <div className="right-side">
          <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
              <p className="form-title">Create your account</p>
              <p className="form-summary">Just some details to get you in!</p>
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Username:
                </label>
                <input
                  type="text"
                  placeholder="John"
                  autoComplete="off"
                  onChange={handleChange}
                  name="name"
                />
                {!!errors.name && <p className="error">{errors.name}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <input
                  type="email"
                  placeholder="email@email.com"
                  autoComplete="off"
                  onChange={handleChange}
                  name="email"
                />
                {!!errors.email && <p className="error">{errors.email}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password:
                </label>
                <input
                  type="password"
                  placeholder="******"
                  autoComplete="off"
                  onChange={handleChange}
                  name="password"
                />
                {!!errors.password && (
                  <p className="error">{errors.password}</p>
                )}
              </div>
              {serverErrors.length > 0 &&
                serverErrors.map((error, index) => (
                  <p key={index} className="error">
                    {error.msg}
                  </p>
                ))}
              <button className="btn btn-signin">Sign up</button>
            </form>
            <p className="footer">
              Already have an account ? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
};
export default Signup;
