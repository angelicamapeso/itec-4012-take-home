import "./styles.scss";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdLogout, MdOutlinePersonPin } from "react-icons/md";

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export default function MainNav() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (newUser) => {
      if (newUser) {
        setUser(newUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  const logoutUser = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      navigate("/login");
    } catch(error) {
      console.error("Error connecting to Firebase!", error);
    }
  }

  return (
    <header>
      <nav>
        <Link className="woops-logo" to={ user ? "/" : "/login" }>Woops!</Link>
        { user ?
          (<div className="acc-links">
            <Link className="profile-btn" to="/me"><MdOutlinePersonPin className="icon" />Profile</Link>
            <button
              className="logout-btn"
              onClick={logoutUser}
            >
                <MdLogout className="icon" />
                Logout
            </button>
          </div>) :
          null
        }
      </nav>
    </header>
  );
}