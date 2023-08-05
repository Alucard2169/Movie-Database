import { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import authStyle from "../styles/Auth.module.css";

const Auth = ({ data }) => {
    const { formState, setFormState } = data;

  const [focus, setFocus] = useState({
    username: false,
    password: false,
  });
  const [passState, setPassState] = useState("password");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

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
    setIsLoading(false);
    setFormState(false);
    setPassState("password");
    setUsername("");
    setPassword("");
    setError(null);
    setFocus({ username: false, email: false, password: false });
  };

 

  const handleRememeber = () => {
    setRemember(!remember);
  };

  return (
    <div
      className={`${authStyle.backdrop} ${
        formState ? `${authStyle.display}` : null
      }`}
    >
      <form>
        <RxCross1 className={authStyle.icon} onClick={handleCloseBtn} />
        <h2>Sign Up</h2>

        <p className={authStyle.asideLink}>
          Already a user?{" "}
          <button type="button">
            Login
          </button>
        </p>
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
