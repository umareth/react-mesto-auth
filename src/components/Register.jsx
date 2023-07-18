import { Route, Routes, Navigate, useNavigate, Link } from "react-router-dom";
import { useState } from "react";

function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    props.handleSignup({ password, email });
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  return (
    <div className="register">
      <p className="register__title">Регистрация</p>
      <form onSubmit={handleSubmit} action="" className="register__form">
        <div className="register__input-container">
          <input autoComplete="current-password" value={email} onChange={handleChangeEmail} type="email" className="register__input register__input_type_register" placeholder="Имя пользователя" />
          <input autoComplete="current-password" value={password} onChange={handleChangePassword} type="password" className="register__input register__input_type_password" placeholder="Пароль" />
        </div>
        <button type="submit" className="register__btn">
          Зарегистрироваться
        </button>
      </form>
      <div>
        <p className="register__subtitle">
          Уже зарегистрированы?
          <Link to="/sign-in" className="register__subtitle register__register-link">
            ㅤВойти
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
