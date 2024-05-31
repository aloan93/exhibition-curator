import { Routes, Route } from "react-router-dom";
import styles from "./App.module.css";
import Navbar from "./components/NavBar/Navbar";
import Homepage from "./components/Hompage/Homepage";
import MetMuseumOfArt from "./components/MuseumCollections/MetMuseumOfArt";
import ClevelandMuseumOfArt from "./components/MuseumCollections/ClevelandMuseumOfArt";
import MyExhibition from "./components/MyExhibition/MyExhibition";
import ClevelandArtefactSpotlight from "./components/ArtefactSpotlights/ClevelandArtefactSpotlight";
import MetropolitanArtefactSpotlight from "./components/ArtefactSpotlights/MetropolitanArtefactSpotlight";

function App() {
  return (
    <div className={styles.app}>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/home" element={<Homepage />} />
          <Route
            path="/metropolitan-museum-of-art"
            element={<MetMuseumOfArt />}
          />
          <Route
            path="/cleveland-museum-of-art"
            element={<ClevelandMuseumOfArt />}
          />
          <Route path="/my-exhibition" element={<MyExhibition />} />
          <Route
            path="/cleveland-museum-of-art/:id"
            element={<ClevelandArtefactSpotlight />}
          />
          <Route
            path="/metropolitan-museum-of-art/:id"
            element={<MetropolitanArtefactSpotlight />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
