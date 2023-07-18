import { useState } from "react";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!password || !email) {
      return;
    }
    props.handleSignin({ password, email });
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }
  return (
    <div className="register">
      <p className="register__title">Вход</p>
      <form onSubmit={handleSubmit} className="register__form">
        <div className="register__input-container">
          <input autoComplete="current-password" value={email} onChange={handleChangeEmail} type="email" className="register__input register__input_type_register" placeholder="Имя пользователя" />
          <input autoComplete="current-password" value={password} onChange={handleChangePassword} type="password" className="register__input register__input_type_password" placeholder="Пароль" />
        </div>
        <button type="submit" className="register__btn">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
