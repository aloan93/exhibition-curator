import { ReactNode } from "react";
import styles from "./Homepage.module.css";

export default function Homepage(): ReactNode {
  return (
    <div className={styles.container}>
      <div className={styles.easelContainer}>
        <img
          className={styles.easel}
          src="easel.png"
          alt="Pixel art of an easel"
        />
      </div>
      <h2
        className={
          styles.title
        }>{`Welcome to Exhibition Curator\nBy aloan93 :)`}</h2>
    </div>
  );
}
