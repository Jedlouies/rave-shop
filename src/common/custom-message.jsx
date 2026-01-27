import { useEffect } from "react";
import "../styles/custom-message.css"
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

function CustomMessage({ message, subtitle, icon, button1, button2, type, onClose, duration = 1000000 }) {

    const user = auth.currentUser;
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [onClose, duration]);


  return (
    <div className="custom-message-container">
      <div className="message">
        <img src={icon} alt="" width={150} height={150}/>
        <h2>{message}</h2>
        <p>{subtitle}</p>
        <div className="buttons">
          {button1}
          {button2}
        </div>
      </div>
    </div>
  );
}

export default CustomMessage;