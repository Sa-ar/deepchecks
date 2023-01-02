import DeepChecksLogo from "../assets/logo.svg";

function Header() {
  return (
    <header className="w-full mb-5 p-5 border-b border-w2">
      <h1>
        <a href="/">
          <img src={DeepChecksLogo} alt="DeepChecks" />
          Home Assignment
        </a>
      </h1>
    </header>
  );
}

export default Header;
