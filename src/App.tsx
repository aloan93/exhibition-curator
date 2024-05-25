import { Routes, Route } from "react-router-dom";
import styles from "./App.module.css";
import Navbar from "./components/NavBar/Navbar";
import Homepage from "./components/Homepage/Homepage";
import ClevelandMuseumOfArt from "./components/ClevelandMuseumOfArt/ClevelandMuseumOfArt";

function App() {
  return (
    <div className={styles.App}>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route
            path="/cleveland-museum-of-art"
            element={<ClevelandMuseumOfArt />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
