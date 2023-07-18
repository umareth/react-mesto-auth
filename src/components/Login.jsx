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
          <input onChange={handleChangeEmail} type="text" className="register__input register__input_type_register" placeholder="Имя пользователя" />
          <input onChange={handleChangePassword} type="password" className="register__input register__input_type_password" placeholder="Пароль" />
        </div>
        <button type="submit" className="register__button">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
