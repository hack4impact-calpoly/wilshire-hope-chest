import logo from "../images/wilshire-logo.png";
import "../styles/Header.css";

function Header() {
  return (
    <header className="header">
      <div className="backing">
        <div className="search-bar-wrapper">
          <input className="search-bar" type="text" />
          <img
            className="search-image"
            src="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/search-512.png"
            alt="Search"
          />
        </div>
        <img className="wilshire-logo" src={logo} alt="logo" />
      </div>
    </header>
  );
}

export default Header;
