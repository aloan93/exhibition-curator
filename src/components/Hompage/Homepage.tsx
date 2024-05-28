import { ReactNode } from "react";
import styles from "./Homepage.module.css";

export default function Homepage(): ReactNode {
  return (
    <div className={styles.container}>
      <img src="public/easel.png" alt="Pixel art of an easel" />
      <h2
        className={
          styles.title
        }>{`Welcome to Exhibition Curator\nBy aloan93 :)`}</h2>
    </div>
  );
}
