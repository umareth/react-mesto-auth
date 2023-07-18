export default function Popup({ name, children, isOpen, onClose }) {
  return (
    <div className={`popup popup_place_${name} ${isOpen && "popup_opened"}`}>
      <div className={`${name === "image" ? "popup__image-container" : ""} ${name === "result" ? "popup__container" : ""}`}>
        <button className={`${name === "image" && "popup__close-icon_type_image"} ${name === "result" ? "popup__close-btn" : ""}`} type="button" onClick={onClose}></button>
        {children}
      </div>
    </div>
  );
}
