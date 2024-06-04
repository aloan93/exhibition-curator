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
        }>{`Welcome to Exhibition Curator\nby aloan93`}</h2>
      <article className={styles.infoContainer}>
        <p>{`Browse antiquities & fine artwork from a selection of public collections and curate your own virtual exhibitions`}</p>
        <p>{`Explore artefacts in more detail by clicking on their title or image`}</p>
        <p>{`- - - - - - - -`}</p>
        <p>{`PS. virtual exhibitions are temporary for the time you are engaged with the site -\nnavigating away from the site or refreshing the page will cause your virtual exhibition to be reset`}</p>
      </article>
    </div>
  );
}
