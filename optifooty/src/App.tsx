// src/App.tsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import YourTeam from "./pages/YourTeam";
import TransferResults from "./pages/TransferResults";
import Stats from "./pages/Stats";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Optimiser from "./pages/Optimiser";
import Lineup from "./pages/Lineup";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";

import { PlayerProvider } from "./context/PlayerContext";
import { UserTeamProvider } from "./context/UserTeamContext";
import { AuthProvider } from "./context/AuthContext";
import { PlayerStatsProvider } from "./context/PlayerStatsContext";
import { ConstraintsProvider } from "./context/ConstraintsContext";
import { ModeProvider } from "./context/ModeContext";

const App: React.FC = () => {
  const [token, setToken] = useState<boolean | string>(false);
  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      const data = JSON.parse(storedToken);
      setToken(data);
    }
  }, []);

  useEffect(() => {
    if (token) {
      sessionStorage.setItem("token", JSON.stringify(token));
    }
  }, [token]);

  return (
    <Router>
      <ScrollToTop />
      <AuthProvider>
        <PlayerProvider>
          <PlayerStatsProvider>
            <ConstraintsProvider>
              <UserTeamProvider>
                <ModeProvider>
                  <Header />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/your-team" element={<YourTeam />} />
                    <Route
                      path="/transfer-results"
                      element={<TransferResults />}
                    />
                    <Route path="/optimiser" element={<Optimiser />} />
                    <Route path="/lineup" element={<Lineup />} />
                    <Route path="/stats" element={<Stats />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="/terms" element={<Terms />} />
                    {/* Add a default route if necessary */}
                  </Routes>
                  <Footer />
                </ModeProvider>
              </UserTeamProvider>
            </ConstraintsProvider>
          </PlayerStatsProvider>
        </PlayerProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
