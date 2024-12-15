import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PhotoEditorLanding from "./components/PhotoEditorLanding ";
import EditPhoto from "./components/EditPhoto";
import Login from "./components/Login";
import Singup from "./components/Singup";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/editphoto" element={<EditPhoto />} />
        <Route path="/PhotoEditorLanding" element={<PhotoEditorLanding  />} />
        <Route path="/singup" element={<Singup />} />
      </Routes>
    </Router>
  );
}

export default App
