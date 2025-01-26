
import React from "react";

import { BrowserRouter as Router, Route, Routes,Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import StudentsPage from "./pages/StudentsPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} /> 
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/students"
          element={
            <ProtectedRoute>
              <StudentsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
