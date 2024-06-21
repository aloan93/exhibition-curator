import { Routes, Route } from "react-router-dom";
import styles from "./App.module.css";
import Navbar from "./components/NavBar/Navbar";
import Homepage from "./components/Hompage/Homepage";
import MetMuseumOfArt from "./components/MuseumCollections/MetMuseumOfArt";
import ClevelandMuseumOfArt from "./components/MuseumCollections/ClevelandMuseumOfArt";
import MyExhibition from "./components/MyExhibition/MyExhibition";
import ClevelandArtefactSpotlight from "./components/ArtefactSpotlights/ClevelandArtefactSpotlight";
import MetropolitanArtefactSpotlight from "./components/ArtefactSpotlights/MetropolitanArtefactSpotlight";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import Signup from "./components/SignupLogin/Signup";
import Profile from "./components/Profile/Profile";
import Login from "./components/SignupLogin/Login";

function App() {
  return (
    <div className={styles.app}>
      <a href="#main" className={styles.skipToMain}>
        Skip to main content
      </a>
      <Navbar />
      <main id="main">
        <Routes>
          <Route path="/" element={<Homepage />} />

          <Route path="/home" element={<Homepage />} />

          <Route path="/signup" element={<Signup />} />

          <Route path="/login" element={<Login />} />

          <Route path="/profile" element={<Profile />} />

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

          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
