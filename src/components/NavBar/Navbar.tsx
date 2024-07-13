import styles from "./Navbar.module.css";
import { ReactNode, useState } from "react";
import { getImageURL } from "../../utils";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function Navbar(): ReactNode {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser } = useAuth();

  return (
    <nav className={styles.navbar}>
      <h1 className={styles.title}>
        <Link className={styles.titleLink} to="/home">
          Exhibition Curator
        </Link>
      </h1>

      <div className={styles.menu}>
        <img
          className={styles.menuBtn}
          src={
            isMenuOpen
              ? getImageURL("nav/closeIcon.png")
              : getImageURL("nav/menuIcon.png")
          }
          alt="menu-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />

        <ul
          className={`${styles.menuItems} ${isMenuOpen && styles.menuOpen}`}
          onClick={() => setIsMenuOpen(false)}>
          <li>
            <Link to="/museum-collections">Museum Collections</Link>
          </li>

          <li>
            <Link to="/my-collection">My Collection</Link>
          </li>

          {currentUser ? (
            <>
              <li>
                <Link to="/saved-exhibitions">Saved Exhibitions</Link>
              </li>

              <li>
                <Link to="/profile">Profile</Link>
              </li>
            </>
          ) : (
            <li>
              <p>
                <Link to="/signup">Signup</Link>
                {" | "}
                <Link to="/login">Login</Link>
              </p>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
