import Popup from "./Popup";
import Success from "../images/Unionsuccess.svg";
import FailI from "../images/fail.svg";

export default function InfoTooltip(props) {
  const imgStyle = {
    width: 120,
    height: 120,
  };

  return (
    <Popup name={props.name} isOpen={props.isOpen} onClose={props.onClose}>
      <div className="popup__tool">
        <img
          src={props.isSuccess ? Success : FailI}
          alt={props.isSuccess ? "Success" : "Fail"}
          style={imgStyle}
          className={`popup__success-image ${!props.isSuccess ? "popup__success-image_type_error" : ""}`}
        />
        <p className="popup__success-text">{props.isSuccess ? props.successMessage : props.failureMessage}</p>
      </div>
    </Popup>
  );
}
