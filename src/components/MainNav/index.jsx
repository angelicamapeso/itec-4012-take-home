import "./styles.scss";

import { Link } from "react-router-dom";
import { MdLogout, MdOutlinePersonPin } from "react-icons/md";

export default function MainNav() {
  return (
    <header>
      <nav>
        <Link className="woops-logo" to="/">Woops!</Link>
        <div className="acc-links">
          <Link className="profile-btn" to="/me"><MdOutlinePersonPin className="icon" />Profile</Link>
          <button className="logout-btn"><MdLogout className="icon" />Logout</button>
        </div>
      </nav>
    </header>
  );
}