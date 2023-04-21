import { AuthFormContext } from "@/context/authFormContext";
import authStyle from "../styles/Auth.module.css";
import { useContext, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineEye } from "react-icons/ai";

const Auth = () => {
  const { formState, setFormState } = useContext(AuthFormContext);
  const [state, setState] = useState("login");
  const [focus, setFocus] = useState({
    username: false,
    password: false,
    email: false,
  });
  const [passState, setPassState] = useState("password");

  const handleFocus = (e) => {
    setFocus((prevFocusState) => ({
      ...prevFocusState,
      [e.target.name]: true,
    }));
  };

  const handleBlur = (e) => {
    if (e.target.value === "") {
      setFocus((prevFocusState) => ({
        ...prevFocusState,
        [e.target.name]: false,
      }));
    } else {
      setFocus((prevFocusState) => ({
        ...prevFocusState,
        [e.target.name]: true,
      }));
    }
  };

  const handlePassToogle = () => {
    setPassState(passState === "password" ? "text" : "password");
  };

  const handleState = () => {
    setState(state === "login" ? "signup" : "login");
  };

  const handleCloseBtn = () => {
    setFormState(false);
    setState("login");
    setPassState("password");
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value,
      };

      const response = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.code === 11000) {
        let obj = data.keyPattern;
        throw new Error(`${Object.keys(obj)[0]} already exists`);
      }

      console.log(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className={`${authStyle.backdrop} ${
        formState ? `${authStyle.display}` : null
      }`}
    >
      <form onSubmit={state === "login" ? handleLogin : handleSignup}>
        <RxCross1 className={authStyle.icon} onClick={handleCloseBtn} />
        {state === "login" ? <h2>Login</h2> : <h2>Sign Up</h2>}

        <label htmlFor="username">
          <span className={focus.username ? authStyle.spanAnimation : null}>
            Username
          </span>
          <input
            type="text"
            id="username"
            name="username"
            onFocus={(e) => handleFocus(e)}
            onBlur={(e) => handleBlur(e)}
            required
          />
          <p className={authStyle.error}></p>
        </label>

        {state === "signup" ? (
          <label htmlFor="email">
            <span className={focus.email ? authStyle.spanAnimation : null}>
              Email
            </span>
            <input
              type="email"
              id="email"
              name="email"
              onFocus={(e) => handleFocus(e)}
              onBlur={(e) => handleBlur(e)}
              required
            />
            <p className={authStyle.error}></p>
          </label>
        ) : null}

        <label htmlFor="password">
          <span className={focus.password ? authStyle.spanAnimation : null}>
            Password
          </span>
          <input
            type={passState}
            id="password"
            onFocus={(e) => handleFocus(e)}
            onBlur={(e) => handleBlur(e)}
            name="password"
            required
          />
          <AiOutlineEye
            onClick={handlePassToogle}
            className={authStyle.passIcon}
          />
        </label>

        <input type="submit" value="Submit" />

        {state === "login" ? (
          <p className={authStyle.asideLink}>
            New user?{" "}
            <button type="button" onClick={handleState}>
              Sign Up
            </button>
          </p>
        ) : (
          <p className={authStyle.asideLink}>
            Already a user?{" "}
            <button type="button" onClick={handleState}>
              Login
            </button>
          </p>
        )}
      </form>
    </div>
  );
};

export default Auth;
