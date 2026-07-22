import React, { useState } from 'react';
import { MapPin, Mail, Phone, Send, MessageCircle, Clock } from 'lucide-react';

const ContactSection = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire up to backend / email service
    setSent(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-overlay" />

      <div className="section-header center" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-tag">Get In Touch</div>
        <h2 className="section-title" style={{ color: 'white' }}>
          Have Questions?<br />We're Here to Help
        </h2>
        <p className="section-sub" style={{ color: 'rgba(255,255,255,0.7)' }}>
          Reach out to our team for any queries about courses, admissions, or exam guidance.
        </p>
      </div>

      <div className="contact-grid">
        {/* Info Cards */}
        <div className="contact-info">
          {[
            {
              icon: <Phone size={22} color="white" />,
              color: 'linear-gradient(135deg,var(--crimson),#e74c3c)',
              title: 'Call Us',
              lines: ['+91 99999 99999', 'Mon – Sat, 9 AM – 7 PM'],
            },
            {
              icon: <Mail size={22} color="white" />,
              color: 'linear-gradient(135deg,var(--navy),var(--navy-light))',
              title: 'Email Us',
              lines: ['support@nursingtraining.in', 'Reply within 24 hours'],
            },
            {
              icon: <MessageCircle size={22} color="white" />,
              color: 'linear-gradient(135deg,#25d366,#128c7e)',
              title: 'WhatsApp',
              lines: ['+91 99999 99999', 'Instant doubt solving'],
            },
            {
              icon: <MapPin size={22} color="white" />,
              color: 'linear-gradient(135deg,var(--gold),#e67e22)',
              title: 'Location',
              lines: ['New Delhi, India', 'Online Classes – Pan India'],
            },
          ].map((item, i) => (
            <div className="contact-info-card" key={i}>
              <div className="contact-info-icon" style={{ background: item.color }}>
                {item.icon}
              </div>
              <div>
                <div className="contact-info-title">{item.title}</div>
                {item.lines.map((l, j) => (
                  <div className="contact-info-line" key={j}>{l}</div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <h3 className="contact-form-title">Send Us a Message</h3>

          {sent && (
            <div className="contact-success">
              ✅ Message sent! We'll get back to you soon.
            </div>
          )}

          <div className="contact-field">
            <label htmlFor="contact-name">Your Name</label>
            <input
              id="contact-name"
              name="name"
              type="text"
              placeholder="e.g. Priya Sharma"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="contact-field">
            <label htmlFor="contact-email">Email Address</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="contact-field">
            <label htmlFor="contact-message">Your Message</label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              placeholder="Ask about courses, pricing, doubt solving…"
              value={form.message}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="contact-submit">
            <Send size={16} /> Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
