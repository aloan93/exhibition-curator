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
        <p>{`Browse antiquities & fine artwork from a selection of public collections and curate your own virtual collections`}</p>
        <p>{`Explore artefacts in more detail whilst browsing museum collections by clicking on their title or image`}</p>
        <p>{`- - - - - - - -`}</p>
        <p>
          <strong>PS. </strong>
          {`"My Collection" is temporary for the time you are engaged with the site -\nnavigating away from the site or refreshing the page will cause your collection to be reset`}
        </p>
        <p>{`Registered users can save up to three collections as "Exhibitions", which can be viewed and shared at any time`}</p>
      </article>
    </div>
  );
}
