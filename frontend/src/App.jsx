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

  return (
    <div id="app-root">
      {/* ── Hero / Header ── */}
      <header className="app-header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-icon">🏠</span>
            <span className="logo-text">GharAI</span>
          </div>
          <p className="header-tagline">Find your dream home in Gurgaon — just describe it.</p>
        </div>
      </header>

      {/* ── Search section ── */}
      <section className="search-section" aria-label="Property search">
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

      {/* ── Property grid ── */}
      <main className="main-content">
        <PropertyGrid
          properties={results}
          onCardClick={(property) => setSelectedProperty(property)}
        />
      </main>

      {/* ── Modal ── */}
      {selectedProperty && (
        <PropertyModal
          property={selectedProperty}
          userQuery={query}
          onClose={() => setSelectedProperty(null)}
        />
      )}

      {/* ── Footer ── */}
      <footer className="app-footer">
        <p>GharAI · Powered by <a href="https://openrouter.ai" target="_blank" rel="noopener noreferrer">OpenRouter</a> · Model: google/gemma-3-27b-it:free</p>
        <p className="footer-note">🔑 API key is frontend-only for this prototype. In production, proxy through a backend.</p>
      </footer>
    </div>
  );
}

export default App;
