import React from "react";

export default function AboutPage() {
  return (
    <div className="page-wrapper">

      {/* Hero */}
      <section className="about-hero">
        <span className="about-hero-icon">🏡</span>
        <h1 className="about-hero-title">About GharAI</h1>
        <p className="about-hero-sub">
          We believe finding your dream home should feel like a conversation,
          not a database query.
        </p>
      </section>

      {/* Mission */}
      <section className="about-section">
        <h2 className="about-section-title">Our Mission</h2>
        <p className="about-body">
          GharAI is a smart property search tool built for Gurgaon home seekers.
          Instead of clicking through dozens of filters, just describe what you
          want in plain English — <em>"3BHK near a school under 1 crore"</em> —
          and our AI extracts the right filters and shows you exactly what matches.
        </p>
      </section>

      {/* Feature cards */}
      <section className="about-section">
        <h2 className="about-section-title">What Makes Us Different</h2>
        <div className="about-features">
          <div className="about-feature-card">
            <span className="feature-icon">🧠</span>
            <h3>Natural Language Search</h3>
            <p>Type exactly how you think. Our AI understands BHK, price, sector, and amenities from plain sentences.</p>
          </div>
          <div className="about-feature-card">
            <span className="feature-icon">⚡</span>
            <h3>Instant Results</h3>
            <p>No page reloads. Results update in real-time as the AI parses your query client-side.</p>
          </div>
          <div className="about-feature-card">
            <span className="feature-icon">✨</span>
            <h3>Personalised AI Summary</h3>
            <p>Click any property and get a 2–3 sentence AI explanation of why it matches your specific needs.</p>
          </div>
          <div className="about-feature-card">
            <span className="feature-icon">🔗</span>
            <h3>Shareable Search Links</h3>
            <p>Your search query is encoded in the URL — share it with family and they'll see the exact same results.</p>
          </div>
        </div>
      </section>

    </div>
  );
}
