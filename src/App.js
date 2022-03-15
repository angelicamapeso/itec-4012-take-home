import "./normalize.css";
import "./fonts.scss";
import './App.scss';

import { HashRouter as Router, Routes, Route } from "react-router-dom";

import MainNav from "./components/MainNav";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <MainNav />
      <main>
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/me" element={<Profile />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
