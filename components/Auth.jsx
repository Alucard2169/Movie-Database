
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import authStyle from "../styles/Auth.module.css";

const Auth = ({ data }) => {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const { formState, setFormState } = data;
  
  const [formType, setFormType] = useState('signUp')
  
  const handleFormTypeToggle = () => {
    setFormType(formType === 'login' ? 'signUp' : "login")
    setError(null)
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
    setEmail('')
    setPassword("");
    setError(null);
    setFocus({ username: false, email: false, password: false });
  };

 

 const handleSignUp = async (e) => {
   e.preventDefault();
   try {
     let { data, error } = await supabase.auth.signUp({
       email: email,
       password: password,
       options: {
         data: {
           username: username,
         },
         emailRedirectTo:`${location.origin}/api/callback`
       },
     });

    
     if (error) {
       throw Error(error.message);
     } else if (data.user && data.user.identities.length === 0) {
       throw Error("User already Exits, Please login");
     } else {
       // Optionally, you can perform additional actions after successful signup,
       console.log("Signup successful:", data);
       handleCloseBtn();
       router.replace("/verify");

       // such as redirecting to a new page or displaying a success message to the user.
     }
   } catch (error) {
     setError(error.message)
   }
 };
  
   const handleLogin = async (e) => {
     e.preventDefault();
     try {
       let { data, error } = await supabase.auth.signInWithPassword({
         email: email,
         password: password,
       });

       if (error) {
         // Handle the error here (e.g., display an error message)
         console.error("Error signing up:", error);
         if (error.message === "Invalid login credentials") {
           setError("Invalid Credentials, please check your credentials or try Signing up")
         }
         if (error.message === 'Email not confirmed') {
           setError("Email not verified yet")
         }
         
        
       } else {
         // Sign-up was successful
         console.log("login successful:", data);
         handleCloseBtn();
      

         // Optionally, you can perform additional actions after successful signup,
         // such as redirecting to a new page or displaying a success message to the user.
       }
     } catch (error) {
       // Handle any unexpected errors that might occur during the sign-up process
       console.error("Unexpected error during login:", error.message);
     }
   };


  return (
    <div
      className={`${authStyle.backdrop} ${
        formState ? `${authStyle.display}` : null
      }`}
    >
      <form onSubmit={formType === 'login' ? handleLogin : handleSignUp}>
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
