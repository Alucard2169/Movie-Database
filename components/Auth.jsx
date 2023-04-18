import { AuthFormContext } from "@/context/authFormContext";
import authStyle from "../styles/Auth.module.css";
import { useContext, useState } from "react";
import { RxCross1 } from "react-icons/rx";

const Auth = () => {
  const { formState, setFormState } = useContext(AuthFormContext);
  const [state, setState] = useState("login");
  const [focus, setFocus] = useState({
    username: false,
    password: false,
    email: false,
  });

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

  const handleState = () => {
    setState(state === "login" ? "signup" : "login");
  };

  const handleCloseBtn = () => {
    setFormState(false);
    setState("login");
    setFocus({
      username: false,
      password: false,
      email: false,
    });
  };

  return (
    <div
      className={`${authStyle.backdrop} ${
        formState ? `${authStyle.display}` : null
      }`}
    >
      <form>
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
            type="password"
            id="password"
            onFocus={(e) => handleFocus(e)}
            onBlur={(e) => handleBlur(e)}
            name="password"
            required
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
