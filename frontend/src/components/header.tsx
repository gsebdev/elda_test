import logo from '/logo.svg';
import { NavLink } from 'react-router';

function Header() {
  return (
    <header className="relative w-full overflow-hidden flex items-center gap-8 border-b border-neutral-600 px-4 md:px-8 py-4">
      <div>
        <img src={logo} className="size-15" alt="logo" />
      </div>
      <nav className="flex gap-4">
        <NavLink className="header-link" to="/">
          Calendar
        </NavLink>
        <NavLink className="header-link" to="/employees">
          Employees
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
