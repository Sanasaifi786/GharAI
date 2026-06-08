import React, { useState } from "react";
import "./App.css";

import SearchBar from "./components/SearchBar.jsx";
import PropertyGrid from "./components/PropertyGrid.jsx";
import PropertyModal from "./components/PropertyModal.jsx";
import ClarifyBubble from "./components/ClarifyBubble.jsx";
import { usePropertySearch } from "./hooks/usePropertySearch.js";

function App() {
  const { results, loading, error, query, filters, search } = usePropertySearch();
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="app-root">

      {/* ══════════════════════════════════════════
          HEADER / NAVBAR
      ══════════════════════════════════════════ */}
      <header className="app-header">
        <div className="header-inner">

          {/* Logo */}
          <a href="/" className="logo" aria-label="GharAI Home">
            <span className="logo-icon">🏡</span>
            <span className="logo-text">GharAI</span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="nav-links" aria-label="Main navigation">
            <a href="#search" className="nav-link active">Search</a>
            <a href="#listings" className="nav-link">Listings</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#contact" className="nav-link">Contact</a>
          </nav>

          {/* Right side */}
          <div className="header-right">
            {/* AI badge
            <span className="header-ai-badge">
              <span className="badge-dot" />
              AI Powered
            </span> */}

            {/* Tagline (wide screens only) */}
            {/* <p className="header-tagline">Describe your home,<br />we'll find it.</p> */}

            {/* Mobile hamburger */}
            <button
              className="nav-hamburger"
              aria-label="Toggle menu"
              aria-expanded={mobileNavOpen}
              onClick={() => setMobileNavOpen((o) => !o)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        <nav className={`mobile-nav ${mobileNavOpen ? "open" : ""}`} aria-label="Mobile navigation">
          <a href="#search"   className="nav-link" onClick={() => setMobileNavOpen(false)}>Search</a>
          <a href="#listings" className="nav-link" onClick={() => setMobileNavOpen(false)}>Listings</a>
          <a href="#about"    className="nav-link" onClick={() => setMobileNavOpen(false)}>About</a>
          <a href="#contact"  className="nav-link" onClick={() => setMobileNavOpen(false)}>Contact</a>
        </nav>
      </header>

      {/* ══════════════════════════════════════════
          SEARCH SECTION
      ══════════════════════════════════════════ */}
      <section id="search" className="search-section" aria-label="Property search">
        <SearchBar onSearch={search} loading={loading} />
        <ClarifyBubble query={query} filters={filters} />
        {error && <p className="search-error">⚠️ {error}</p>}
        {query && !loading && (
          <p className="results-count">
            {results.length === 0
              ? "No matching properties"
              : `Showing ${results.length} propert${results.length === 1 ? "y" : "ies"} for "${query}"`}
          </p>
        )}
      </section>

      {/* ══════════════════════════════════════════
          PROPERTY GRID
      ══════════════════════════════════════════ */}
      <main id="listings" className="main-content">
        <PropertyGrid
          properties={results}
          onCardClick={(property) => setSelectedProperty(property)}
        />
      </main>

      {/* ══════════════════════════════════════════
          MODAL
      ══════════════════════════════════════════ */}
      {selectedProperty && (
        <PropertyModal
          property={selectedProperty}
          userQuery={query}
          onClose={() => setSelectedProperty(null)}
        />
      )}

      {/* ══════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════ */}
      <footer className="app-footer">
        <p>
          GharAI &middot; Powered by{" "}
          <a href="https://openrouter.ai" target="_blank" rel="noopener noreferrer">OpenRouter</a>
          {" "}&middot; Model: <code>google/gemma-3-27b-it:free</code>
        </p>
        <p className="footer-note">
          🔑 API key is frontend-only for this prototype. In production, proxy through a backend.
        </p>
      </footer>

    </div>
  );
}

export default App;
