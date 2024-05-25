import styles from "./Navbar.module.css";
import { ReactNode, useState } from "react";
import { getImageURL } from "../../utils";
import { Link } from "react-router-dom";

export default function Navbar(): ReactNode {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <Link className={styles.title} to="/">
        Exhibition Curator
      </Link>
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
            <Link to="/cleveland-museum-of-art">Cleveland Museum of Art</Link>
          </li>
          <li>
            <Link to="/met-museum-of-art">Metropolitan Museum of Art</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
