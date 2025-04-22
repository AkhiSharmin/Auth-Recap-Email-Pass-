import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase.init";

const SingUp = () => {
  const [errorMassage, setErrorMassage] = useState("");

  const handelSingUp = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    // reset error and statues
    setErrorMassage("");

    //create user with email and password
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.log("Error", error.message);
        setErrorMassage(error.message);
      });
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto">
      <h3 className="text-3xl ml-4 font-bold">Sing Up now!</h3>
      <form onSubmit={handelSingUp} className="card-body">
        <div className="form-control">
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
            name="password"
            type="password"
            className="input my-4"
            placeholder="Password"
          />
        </div>
        <div>
          <a className="link link-hover">Forgot password?</a>
        </div>
        <button className="btn btn-success btn-wide mt-4">Sing Up</button>
      </form>
      {errorMassage && <p className="text-red-600">{errorMassage}</p>}
    </div>
  );
};

export default SingUp;
