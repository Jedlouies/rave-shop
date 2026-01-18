import { FaGoogle } from "react-icons/fa";
import Login from "./login";
import "../styles/sign-in.css"
import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

function SignIn({onClose}) {    

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showLogin, setShowLogin] = useState(false);
    const [error, setError] = useState("");
    const [showError, setShowError] = useState(false);

    const handleSignup = async (e) => {
      e.preventDefault();

      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        console.log("User created:", userCredential.user);
        alert("Account created successfully!");
      } catch (error) {
        console.error(error);

        switch (error.code) {
          case "auth/email-already-in-use":
            setError("Email already in use");
            break;
          case "auth/invalid-email":
            setError("Invalid email address");
            break;
          case "auth/weak-password":
            setError("Password should be at least 6 characters");
            break;
          default:
            setError("Failed to create account");
        }
        setShowError(true); 
      }
    };

    const handleGoogleSignIn = async () => {
      try {
        const result = await signInWithPopup(auth, googleProvider)
        const user = result.user;
        onClose()
        alert("Signed in with Google successfully!")
      } catch (error) {
        console.error(error)
        alert("Google sign-in failed")
      }
    };

    const handleLoginClicked = () => {
      setShowLogin (prev => !prev);
    }

    const handleClose = () => {
    onClose();
  }

    return (
    <>

      {showLogin ? (
        <Login onClose={handleClose}/>
      ) : (
          <div className="sign-in-container">
                <button className="close-btn" onClick={handleClose}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                    <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                  </svg>
                </button>
                <img src="./Rave-Logo.png" alt="login-logo-svg" width={150} />
                <h1>Sign In</h1>
                  <form className="sign-in-form" onSubmit={handleSignup}>
                        {showError && (
                          <p style={{color: "red"}}>{error}</p>
                        )}
                      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                      <p className="forgot-password" style={{textAlign: 'left'}}>Forgot Password?</p>
                      <div className="social-sign-in-method">
                          <p style={{fontSize: '12px', opacity: '0.5'}}>or sign in with</p>
                          <button onClick={handleGoogleSignIn}>
                            <FaGoogle size={30} /> 
                          </button>
                      </div>
                      <button className="submit-btn">Submit</button>
                      <p>Already have an account? <b onClick={handleLoginClicked} className="login-click">Click Here</b></p>
                  </form>
        </div>

      )}
    </>
    );
}

export default SignIn