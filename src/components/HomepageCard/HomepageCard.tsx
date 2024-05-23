import { ReactNode, useEffect, useState } from "react";
import styles from "./HomepageCard.module.css";
import { metMuseumAPI } from "../../api/api";

export default function HomepageCard(props: { id: number }): ReactNode {
  const [image, setImage] = useState("");

  useEffect(() => {
    metMuseumAPI
      .get(`/objects/${props.id}`)
      .then(({ data: { primaryImageSmall } }) => {
        setImage(primaryImageSmall);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={styles.container}>
      <p>{props.id}</p>
      <img src={image} alt="Small image of artwork" />
    </div>
  );
}
