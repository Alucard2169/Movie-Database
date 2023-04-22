import { AuthFormContext } from "@/context/authFormContext";
import authStyle from "../styles/Auth.module.css";
import { useContext, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineEye } from "react-icons/ai";
import { userContext } from "@/context/userContext";

const Auth = () => {
  const { setUser } = useContext(userContext);
  const { formState, setFormState } = useContext(AuthFormContext);
  const [state, setState] = useState("login");
  const [focus, setFocus] = useState({
    username: false,
    password: false,
    email: false,
  });
  const [passState, setPassState] = useState("password");
  const [error, setError] = useState(null);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    setUsername("");
    setEmail("");
    setPassword("");
    setError(null);
    setFocus({ username: false, email: false, password: false });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        username,
        email,
        password,
      };

      const response = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.status < 200 || response.status >= 300) {
        throw new Error(data.error);
      } else {
        // set user context
        setUser(data.user);
        setUsername("");
        setEmail("");
        setPassword("");
        // close the form
        handleCloseBtn();
      }
    } catch (error) {
      setPassword("");
      setError(error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        username,
        password,
      };

      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.user) {
        setUser(data.user);
        handleCloseBtn();
      } else {
        setError("User not found, try Sign Up");
      }
    } catch (err) {
      console.log(err);
    }
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onFocus={(e) => handleFocus(e)}
            onBlur={(e) => handleBlur(e)}
            required
          />
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={(e) => handleFocus(e)}
              onBlur={(e) => handleBlur(e)}
              required
            />
          </label>
        ) : null}

        <label htmlFor="password">
          <span className={focus.password ? authStyle.spanAnimation : null}>
            Password
          </span>
          <input
            type={passState}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

        {error && <p className={authStyle.error}>{error}</p>}

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
