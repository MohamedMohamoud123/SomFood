import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSent, setIsSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [customerName, setCustomerName] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setCustomerName(formData.name); // XAFID MAGACA

    const response = await fetch('https://formsubmit.co/ajax/252forme@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    setSending(false);

    if (result.success === 'true') {
      setIsSent(true);
      setFormData({ name: '', email: '', message: '' });
    } else {
      alert('Message sending failed. Please try again.');
    }
  };

  return (
    <section className="contact-section">
      <div className="contact-wrapper">
        {/* LEFT SIDEBAR */}
        <aside className="contact-sidebar">
          <h3>Reach Us</h3>
          <div className="info-block">
            <h4>Location</h4>
            <p>KM4, Mogadishu, Somalia</p>
          </div>
          <div className="info-block">
            <h4>Phone Number</h4>
            <a href="tel:+252612707409">+252 612707409</a>
          </div>
          <div className="info-block">
            <h4>WhatsApp</h4>
            <a href="https://wa.me/252612707409" target="_blank" rel="noopener noreferrer">
              +252 612707409
            </a>
          </div>
          <div className="info-block">
            <h4>Support</h4>
            <a href="mailto:252forme@gmail.com">252forme@gmail.com</a>
            <a href="mailto:maxamuudm189@gmail.com">maxamuudm189@gmail.com</a>
          </div>
        </aside>

        {/* RIGHT MAIN */}
        <main className="contact-main">
          <h2>Contact Us</h2>
          <p>We'd love to hear from you. Please fill out the form below.</p>

          {!isSent ? (
            <form onSubmit={handleSubmit} className="contact-form">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                value={formData.name}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                value={formData.email}
                onChange={handleChange}
              />
              <textarea
                name="message"
                rows="5"
                placeholder="Your Message"
                required
                value={formData.message}
                onChange={handleChange}
              ></textarea>
              <button type="submit" disabled={sending}>
                {sending ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          ) : (
            <div className="thank-you-message">
              <h3>Thank you, {customerName}!</h3>
              <p>Your message has been successfully sent. We'll contact you shortly.</p>
            </div>
          )}
        </main>
      </div>
    </section>
  );
};

export default Contact;
