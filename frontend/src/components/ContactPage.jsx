import React, { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // In production this would POST to a backend
    setSubmitted(true);
  }

  return (
    <div className="page-wrapper">

      {/* Hero */}
      <section className="about-hero">
        <span className="about-hero-icon">📬</span>
        <h1 className="about-hero-title">Get In Touch</h1>
        <p className="about-hero-sub">
          Have a question, suggestion, or just want to say hello? We'd love to hear from you.
        </p>
      </section>

      <div className="contact-layout">

        {/* Info cards */}
        <div className="contact-info">
          <div className="contact-info-card">
            <span className="contact-info-icon">📍</span>
            <div>
              <h3>Location</h3>
              <p>Gurgaon, Haryana, India</p>
            </div>
          </div>
          <div className="contact-info-card">
            <span className="contact-info-icon">📧</span>
            <div>
              <h3>Email</h3>
              <p>hello@gharai.in</p>
            </div>
          </div>
          <div className="contact-info-card">
            <span className="contact-info-icon">🕐</span>
            <div>
              <h3>Response Time</h3>
              <p>Within 24 hours</p>
            </div>
          </div>
          <div className="contact-info-card">
            <span className="contact-info-icon">💬</span>
            <div>
              <h3>We're building</h3>
              <p>More Gurgaon sectors coming soon!</p>
            </div>
          </div>
        </div>

        {/* Contact form */}
        <div className="contact-form-wrapper">
          {submitted ? (
            <div className="contact-success">
              <span className="success-icon">✅</span>
              <h2>Message Sent!</h2>
              <p>Thank you, <strong>{form.name}</strong>! We'll get back to you at <strong>{form.email}</strong> within 24 hours.</p>
              <button
                className="contact-btn"
                onClick={() => { setSubmitted(false); setForm({ name: "", email: "", message: "" }); }}
              >
                Send another message
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <h2 className="form-title">Send a Message</h2>

              <div className="form-group">
                <label htmlFor="contact-name" className="form-label">Your Name</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  className="form-input"
                  placeholder="e.g. Priya Sharma"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-email" className="form-label">Email Address</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="e.g. priya@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-message" className="form-label">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  className="form-input form-textarea"
                  placeholder="Tell us what's on your mind..."
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  required
                />
              </div>

              <button
                type="submit"
                className="contact-btn"
                disabled={!form.name || !form.email || !form.message}
              >
                Send Message →
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
