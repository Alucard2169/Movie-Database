import { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import authStyle from "../styles/Auth.module.css";

const Auth = ({ data }) => {
  const { formState, setFormState } = data;
  
  const [formType, setFormType] = useState('signUp')
  
  const handleFormTypeToggle = () => {
    setFormType(formType === 'login' ? 'signUp' : "login")
  }

  const [focus, setFocus] = useState({
    username: false,
    email: false,
    password: false,
  });
  const [passState, setPassState] = useState("password");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email,setEmail] = useState('')
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
    setFormType('signUp')
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
        <h2>{formType === "login" ? "Login" : "Sign Up"}</h2>

        <p className={authStyle.asideLink}>
          {formType === "login" ? "New User? " : "Already a user?"}
          <button type="button" onClick={handleFormTypeToggle}>
            {formType === "login" ? "Sign Up" : "Login"}
          </button>
        </p>
        {formType === "signUp" && (
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
        )}

        <label htmlFor="email">
          <span className={focus.username ? authStyle.spanAnimation : null}>
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
        
        {error && <p className={authStyle.error}>{error}</p>}

        <input
          type="submit"
          value="Submit"
          className={isLoading ? `${authStyle.disable}` : null}
        />
      </form>

      
    </div>
  );
};

export default Auth;
