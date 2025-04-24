import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase.init";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { Link } from "react-router-dom";

const SingUp = () => {
  const [success, setSuccess] = useState(false);
  const [errorMassage, setErrorMassage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handelSingUp = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const terms = e.target.terms.checked;
    console.log(email, password, terms);

    // reset error and statues
    setErrorMassage("");
    setSuccess(false);

    if (!terms) {
      setErrorMassage("Please accept Our terms and condition");
      return;
    }

    if (password.length < 6) {
      setErrorMassage("Password should be 6 characters or longer");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      setErrorMassage(
        "At least one uppercase, one lowercase, one number, one special character"
      );
      return;
    }

    //create user with email and password
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess(true);

        //send verification email address
        sendEmailVerification(auth.currentUser).then(() => {
          console.log("Email verification sent!");
        });
      })
      .catch((error) => {
        console.log("Error", error.message);
        setErrorMassage(error.message);
        setSuccess(false);
      });
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto">
      <h3 className="text-3xl ml-4 font-bold">Sing Up now!</h3>
      <form onSubmit={handelSingUp} className="card-body">
        <div className="form-control relative">
          <label className="label">Email</label>
          <input
            name="email"
            type="email"
            className="input my-4"
            placeholder="Email"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            className="input my-4"
            placeholder="Password"
            required
          />
        </div>
        <button
          onClick={() => setShowPassword(!showPassword)}
          className="btn btn-xs absolute right-[41px] top-[205px]"
        >
          {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
        </button>
        <div>
          <a className="link link-hover">Forgot password?</a>
        </div>

        <div className="form-control">
          <label className="label cursor-pointer">
            <input type="checkbox" name="terms" className="checkbox" />
            <span className="label-text ml-2">
              Accept Our Terms and Condition
            </span>
          </label>
        </div>

        <button className="btn btn-success btn-wide mt-4">Sing Up</button>
      </form>
      {errorMassage && <p className="text-red-600">{errorMassage}</p>}
      {success && (
        <p className="text-green-600 text-center">Sing in Successful</p>
      )}

      <p className="pb-4">
        Already have an a account? Please
        <Link to="/login">
          <span className="ml-2 underline text-green-600 ">Log In</span>
        </Link>
      </p>
    </div>
  );
};

export default SingUp;
