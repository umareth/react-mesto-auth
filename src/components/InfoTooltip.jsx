import Popup from "./Popup";

export default function InfoTooltip({ name, isSuccess, successText, failText, isOpen, onClose }) {
  return (
    <Popup name={name} isOpen={isOpen} onClose={onClose}>
      <div className="popup__form">
        <div className={`popup__success-image ${!isSuccess ? "popup__success-image_type_error" : ""}`} />
        <p className="popup__success-text">{isSuccess ? successText : failText}</p>
      </div>
    </Popup>
  );
}
