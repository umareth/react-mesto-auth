import logo from "../images/logo_mesto.svg";

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Логотип Место_Россия" className="header__logo" />
    </header>
  );
}

export default Header;
