
import { useState } from "react";
import "../styles/login.css";
import { FaGoogle } from "react-icons/fa";
import { auth, googleProvider } from "../firebase"
import SignIn from "./sign-in"
import { signInWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";


function Login({onClose}) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSignIn, setShowSignIn] = useState(false);

  const handleLogin = async(e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password)
      onClose()
      alert("Login Successfully"); 
    } catch (error) {
      alert(error.message);
    }
  }

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      onClose()
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleSignInClicked = () => {
    setShowSignIn(prev => !prev)
  }

  const handleClose = () => {
    onClose()
  }

  return (
    <>
      {showSignIn ? (
          <SignIn onClose={handleClose}/>
        ) : (
        <div className="login-container">
          <button className="close-btn" onClick={handleClose}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
              <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
            </svg>
          </button>
          <h1>Login</h1>
            <form className="login-form" onSubmit={handleLogin}>
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                <p className="forgot-password" style={{textAlign: 'left'}}>Forgot Password?</p>
                <div className="social-login-method">
                    <p style={{fontSize: '12px', opacity: '0.5'}}>or login with</p>
                    <button onClick={handleGoogleLogin}>
                      <FaGoogle size={30} /> 
                    </button>
                </div>
                <button className="submit-btn" type="submit">Submit</button>
                <p>Don't have yet an account? <b onClick={handleSignInClicked} className="sign-in-click">Click Here</b></p>
            </form>
        </div>
      )}
    </>
    
  );
}

export default Login;