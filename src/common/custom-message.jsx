import { useEffect } from "react";
import "../styles/custom-message.css"
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

function CustomMessage({ message, subtitle, icon, button1, button2, type, onClose, duration = 10000 }) {

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
        <img src={icon} alt="" width={100} height={100}/>
        <h2>{message}</h2>
        <p>{subtitle}</p>
        <div className="buttons">
          <button onClick={onClose}>{button1}</button>
          <button style={{backgroundColor: "#1c1180", color: "white", fontWeight: "bold"}} onClick={() => navigate("/products")}>{button2}</button>
        </div>
      </div>
    </div>
  );
}

export default CustomMessage;