import { Routes, Route } from "react-router-dom";
import styles from "./App.module.css";
import Navbar from "./components/NavBar/Navbar";
import Homepage from "./components/Homepage/Homepage";

function App() {
  return (
    <div className={styles.App}>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
