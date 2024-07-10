import { ReactNode } from "react";
import styles from "./MuseumContentsPage.module.css";
import { Link } from "react-router-dom";
import museums from "./../../data/museums.json";
import { getImageURL } from "../../utils";

export default function MuseumContentsPage(): ReactNode {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Museum Collections</h2>
      <ul className={styles.listContainer}>
        {museums.map((m, id) => {
          return (
            <li key={id} className={styles.museumContainer}>
              <img
                className={styles.museumImage}
                src={getImageURL(m.imageSrc)}
                alt={`Image of the front entrance to the ${m.name}`}
              />

              <h3 className={styles.museumTitle}>
                <Link to={`/museum-collections/${m.linkText}`}>{m.name}</Link>
              </h3>

              <p className={styles.museumAddress}>{m.address}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
