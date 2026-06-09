import React, { useState } from "react";
import "./App.css";

import SearchBar from "./components/SearchBar.jsx";
import PropertyGrid from "./components/PropertyGrid.jsx";
import PropertyModal from "./components/PropertyModal.jsx";
import ClarifyBubble from "./components/ClarifyBubble.jsx";
import AboutPage from "./components/AboutPage.jsx";
import ContactPage from "./components/ContactPage.jsx";
import { usePropertySearch } from "./hooks/usePropertySearch.js";

function App() {
  const { results, loading, error, query, filters, search } = usePropertySearch();
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [activePage, setActivePage] = useState("home"); // "home" | "about" | "contact"
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  function navigate(page) {
    setActivePage(page);
    setMobileNavOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="app-root">

      {/* ══ HEADER / NAVBAR ══ */}
      <header className="app-header">
        <div className="header-inner">

          {/* Logo */}
          <button className="logo nav-btn" onClick={() => navigate("home")} aria-label="GharAI Home">
            <span className="logo-icon">🏡</span>
            <span className="logo-text">GharAI</span>
          </button>

          {/* Desktop Nav */}
          <nav className="nav-links" aria-label="Main navigation">
            <button className={`nav-link nav-btn ${activePage === "home" ? "active" : ""}`} onClick={() => navigate("home")}>Search</button>
            <button className={`nav-link nav-btn ${activePage === "home" ? "active" : ""}`} onClick={() => navigate("home")}>Listings</button>
            <button className={`nav-link nav-btn ${activePage === "about" ? "active" : ""}`} onClick={() => navigate("about")}>About</button>
            <button className={`nav-link nav-btn ${activePage === "contact" ? "active" : ""}`} onClick={() => navigate("contact")}>Contact</button>
          </nav>

          {/* Right side */}
          <div className="header-right">
            <span className="header-ai-badge">
              <span className="badge-dot" />
              AI Powered
            </span>
            <button
              className="nav-hamburger"
              aria-label="Toggle menu"
              aria-expanded={mobileNavOpen}
              onClick={() => setMobileNavOpen((o) => !o)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        <nav className={`mobile-nav ${mobileNavOpen ? "open" : ""}`}>
          <button className="nav-link nav-btn" onClick={() => navigate("home")}>Search</button>
          <button className="nav-link nav-btn" onClick={() => navigate("home")}>Listings</button>
          <button className="nav-link nav-btn" onClick={() => navigate("about")}>About</button>
          <button className="nav-link nav-btn" onClick={() => navigate("contact")}>Contact</button>
        </nav>
      </header>

      {/* ══ PAGE CONTENT ══ */}

      {activePage === "about" && <AboutPage />}
      {activePage === "contact" && <ContactPage />}

      {activePage === "home" && (
        <>
          {/* Search Section */}
          <section id="search" className="search-section" aria-label="Property search">
            <SearchBar onSearch={search} loading={loading} />
            <ClarifyBubble query={query} filters={filters} />
            {error && <p className="search-error">⚠️ {error}</p>}
            {query && !loading && (
              <p className="results-count">
                {results.length === 0
                  ? "No matching properties found"
                  : `Showing ${results.length} propert${results.length === 1 ? "y" : "ies"} for "${query}"`}
              </p>
            )}
          </section>

          {/* Property Grid */}
          <main id="listings" className="main-content">
            <PropertyGrid
              properties={results}
              onCardClick={(property) => setSelectedProperty(property)}
            />
          </main>
        </>
      )}

      {/* Modal */}
      {selectedProperty && (
        <PropertyModal
          property={selectedProperty}
          userQuery={query}
          onClose={() => setSelectedProperty(null)}
        />
      )}

      {/* ══ FOOTER ══ */}
      <footer className="app-footer">
        <div className="footer-logo">
          <span className="footer-logo-icon">🏡</span>
          <span className="footer-logo-text">GharAI</span>
        </div>
        <p className="footer-message">
          "Every home has a story — we help you find yours. 🌿"
        </p>
        <div className="footer-divider" />
        <p className="footer-copy">
          © {new Date().getFullYear()} GharAI &middot; Built with ❤️ for Gurgaon home seekers
        </p>
      </footer>

    </div>
  );
}

export default App;
