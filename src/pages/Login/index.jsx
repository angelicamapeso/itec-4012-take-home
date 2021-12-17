import "./styles.scss";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

import Input, { INPUT_TYPES } from "../../components/Input";

export default function Login() {
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  const loginUser = async ({ email, password }) => {
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch(error) {
      console.error("Error connecting to firebase!", error);
    }
  }

  const signupUser = async ({ email, password }) => {
    try {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch(error) {
      console.error("Error connecting to firebase!", error);
    }
  }

  const submitCredentials = (formVals) => {
    if (isLoggingIn) {
      loginUser(formVals);
    } else {
      signupUser(formVals);
    }
  }

  return (
    <div className="login-background">
      <div className="login-wrapper">
        <section className="login-text">
          <h1 className="woops-logo-animated">Woops!</h1>
          <p>Made a mistake?<br />Let's laugh at it together.</p>
        </section>
        <section className="login-form">
          <form className="login" onSubmit={handleSubmit(submitCredentials)}>
            <h2>{ isLoggingIn ? "Login" : "Sign Up" }</h2>
            <Input
              type={INPUT_TYPES.EMAIL}
              required={true}
              label="Email"
              name="email"
              register={register("email")}
            />
            <Input
              type={INPUT_TYPES.PASSWORD}
              required={true}
              label="Password"
              name="password"
              register={register("password")}
            />
            <Input type={INPUT_TYPES.SUBMIT} value={ isLoggingIn ? "Login" : "Sign Up" } />
          </form>
          <div>
            <p>{ isLoggingIn ? "New to Woops? " : "Already have an account? "}</p>
            <button className="switch-mode" onClick={() => setIsLoggingIn(!isLoggingIn)}>{ isLoggingIn ? "Create an account" : "Login to your account"}</button>
          </div>
        </section>
      </div>
    </div>
  );
}