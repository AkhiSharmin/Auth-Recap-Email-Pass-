import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase.init";

const SingUp = () => {
  const [success, setSuccess] = useState(false);
  const [errorMassage, setErrorMassage] = useState("");

  const handelSingUp = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    // reset error and statues
    setErrorMassage("");
    setSuccess(false);

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
      {success && (
        <p className="text-green-600 text-center">Sing in Successful</p>
      )}
    </div>
  );
};

export default SingUp;
