import { Routes, Route } from "react-router-dom";
import styles from "./App.module.css";
import Navbar from "./components/NavBar/Navbar";
import Homepage from "./components/Hompage/Homepage";
import MetMuseumOfArt from "./components/MuseumCollections/MetMuseumOfArt";
import ClevelandMuseumOfArt from "./components/MuseumCollections/ClevelandMuseumOfArt";
import ClevelandArtefactSpotlight from "./components/ArtefactSpotlights/ClevelandArtefactSpotlight";
import MetropolitanArtefactSpotlight from "./components/ArtefactSpotlights/MetropolitanArtefactSpotlight";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import Signup from "./components/SignupLogin/Signup";
import Profile from "./components/Profile/Profile";
import Login from "./components/SignupLogin/Login";
import ForgotPassword from "./components/SignupLogin/ForgotPassword";
import SavedExhibition from "./components/SavedExhibition/SavedExhibition";
import GuestExhibition from "./components/SavedExhibition/GuestExhibition";
import MuseumContentsPage from "./components/MuseumContentsPage/MuseumContentsPage";
import MyCollection from "./components/MyCollection/MyCollection";
import SavedExhibitions from "./components/SavedExhibitions/SavedExhibitions";

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

          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/my-collection" element={<MyCollection />} />

          <Route path="/saved-exhibitions" element={<SavedExhibitions />} />

          <Route
            path="/saved-exhibitions/:exhibitionId"
            element={<SavedExhibition />}
          />

          <Route
            path="/guest-exhibition/:exhibitionId"
            element={<GuestExhibition />}
          />

          <Route path="/museum-collections" element={<MuseumContentsPage />} />

          <Route
            path="/museum-collections/metropolitan-museum-of-art"
            element={<MetMuseumOfArt />}
          />

          <Route
            path="/museum-collections/cleveland-museum-of-art"
            element={<ClevelandMuseumOfArt />}
          />

          <Route
            path="/museum-collections/cleveland-museum-of-art/:id"
            element={<ClevelandArtefactSpotlight />}
          />

          <Route
            path="/museum-collections/metropolitan-museum-of-art/:id"
            element={<MetropolitanArtefactSpotlight />}
          />

          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
