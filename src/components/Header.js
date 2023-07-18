import logo from "../images/logo_mesto.svg";
import { Route, Routes, Navigate, useNavigate, Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <img src={logo} alt="Логотип Место_Россия" className="header__logo" />

      {props.name === "register" || props.name === "login" ? (
        <Link to={props.name === "register" ? "/sign-in" : "/sign-up"} className="header__link">
          {props.name === "register" ? "Войти" : "Регистрация"}
        </Link>
      ) : (
        <>
          <div className="header__profile-container">
            <p className="header__profile-email">e-mail:{props.email}</p>
            <Link to={"sign-in"} className="header__link" onClick={props.Signout}>
              Выйти
            </Link>
          </div>
        </>
      )}
    </header>
  );
}

export default Header;
