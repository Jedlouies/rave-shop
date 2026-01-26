import { useEffect } from "react";
import "../styles/custom-message.css"
import { auth } from "../firebase";

function CustomMessage({ message, type, onClose, duration = 1000000 }) {

    const user = auth.currentUser;

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [onClose, duration]);

  return (
    <div className="custom-message-container">
      <div className="message">
        <img src="/party-emoji.gif" alt="" width={100}/>
        <h2>{message}</h2>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
}

export default CustomMessage;