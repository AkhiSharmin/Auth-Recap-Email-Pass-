import React, { useRef, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.init";
import { Link } from "react-router-dom";

const Login = () => {
  const [success, setSuccess] = useState(false);
  const [logInError, setLogInError] = useState("");

  const emailRef = useRef();

  const handleLogIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    // reset status
    setSuccess(false);
    setLogInError("");

    // login user
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);

        if (!result.user.emailVerified) {
          setLogInError("please verify your email address");
        } else {
          setSuccess(true);
        }
      })
      .catch((error) => {
        console.log("Error", error.message);
        setLogInError(error.message);
      });
  };

  const handleForgetPassword = () => {
    console.log("Get me email address", emailRef.current.value);
    const email = emailRef.current.value;
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleLogIn} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                type="email"
                className="input"
                ref={emailRef}
                placeholder="Email"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                name="password"
                type="password"
                className="input"
                placeholder="Password"
              />
            </div>
            <div>
              <label onClick={handleForgetPassword} className="label">
                <a className="link link-hover">Forgot password?</a>
              </label>
            </div>
            <button className="btn btn-neutral mt-4">Login</button>
          </form>
          {success && <p className="text-green-600">User Login Successfully</p>}
          {logInError && <p className="text-red-600">{logInError}</p>}
          <p className="text-center pb-4">
            New to this website Please{" "}
            <Link to="/singUp">
              <span className="underline text-green-600">Sing Up</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
