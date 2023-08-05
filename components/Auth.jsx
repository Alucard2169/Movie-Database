import { userContext } from "@/context/userContext";
import { useContext, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import authStyle from "../styles/Auth.module.css";

const Auth = ({data}) => {
    const { authFormState, setAuthFormState } = data;
  const { setUser } = useContext(userContext);


  const [focus, setFocus] = useState({
    username: false,
    password: false,
    email: false,
  });

  const [passState, setPassState] = useState("password");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember,setRemember] = useState(false)

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

  

  const handleCloseBtn = () => {
    setAuthFormState(false)
    setIsLoading(false)
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
      setIsLoading(true)
      const formData = {
        username,
        email,
        password,
        remember,
      };

      const response = await fetch(`${window.location.origin}/api/signup`, {
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
      setIsLoading(false)
      setError(error.message);
    }
  };

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true)
  //   try {
  //     const formData = {
  //       username,
  //       password,
  //       remember,
  //     };

  //     const response = await fetch(`${window.location.origin}/api/login`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     const data = await response.json();

  //     if (data.user) {
  //       setUser(data.user);
  //       handleCloseBtn();
  //     } else {
  //       setIsLoading(false)
  //       setError(data.error);
  //     }
  //   } catch (err) {
  //     setIsLoading(false)
  //        setError(error.message);
  //   }
  // };

  const handleRememeber = () => {
    setRemember(!remember)
  }

  return (
    <div
      className={`${authStyle.backdrop} ${
        authFormState ? `${authStyle.display}` : null
      }`}
    >
      <form>
        <RxCross1 className={authStyle.icon} onClick={handleCloseBtn} />
        <h2>Sign Up</h2>
        <p>Already a User? login</p>
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
        <label htmlFor="remember" className={authStyle.rememberBtn}>
          <input
            type="checkbox"
            id="remember"
            checked={remember}
            onClick={handleRememeber}
          />
          Remember me
        </label>

        {error && <p className={authStyle.error}>{error}</p>}

        <input
          type="submit"
          value="Submit"
          onClick={handleSignup}
          className={isLoading ? `${authStyle.disable}` : null}
        />
      </form>

      <aside
        className={`${authStyle.passReq} ${
          focus.password ? authStyle.show : null
        }`}
      >
        <h4>Password must have</h4>
        <ul>
          <li>Minimum length: 8 characters.</li>
          <li>Include at least 1 uppercase letter.</li>
          <li>Include at least 1 lowercase letter.</li>
          <li>Include at least 1 number.</li>
          <li>Include at least 1 special character.</li>
        </ul>
      </aside>
    </div>
  );
};

export default Auth;
