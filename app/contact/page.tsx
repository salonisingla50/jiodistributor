'use client';

import { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
} from 'lucide-react';

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || 'Failed to submit enquiry'
        );
      }

      setSent(true);

      setForm({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
    } catch (error) {
      console.error(error);

      alert(
        'Enquiry submit nahi hui. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="wrap"
      style={{ paddingTop: 55 }}
    >
      <div
        className="grid two"
        style={{
          gridTemplateColumns: '1fr 1fr',
          gap: 45,
        }}
      >

        {/* LEFT */}

        <div>

          <div
            style={{
              color: '#0757ff',
              fontWeight: 800,
            }}
          >
            CONTACT
          </div>

          <h1 style={{ fontSize: 52 }}>
            Let’s connect.
          </h1>

          <p
            style={{
              fontSize: 18,
              color: '#667085',
              lineHeight: 1.7,
            }}
          >
            Have a question about a product or
            service? Send an enquiry and our team
            will get back to you.
          </p>

          <div
            style={{
              display: 'grid',
              gap: 18,
              marginTop: 30,
            }}
          >

            {/* EMAIL */}

            <div
              style={{
                display: 'flex',
                gap: 14,
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  width: 45,
                  height: 45,
                  borderRadius: 14,
                  background: '#eaf1ff',
                  display: 'grid',
                  placeItems: 'center',
                }}
              >
                <Mail
                  color="#0757ff"
                  size={19}
                />
              </div>

              <div>
                <b>Email</b>

                <div
                  style={{
                    color: '#667085',
                  }}
                >
                  support@example.com
                </div>
              </div>
            </div>

            {/* PHONE */}

            <div
              style={{
                display: 'flex',
                gap: 14,
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  width: 45,
                  height: 45,
                  borderRadius: 14,
                  background: '#eaf1ff',
                  display: 'grid',
                  placeItems: 'center',
                }}
              >
                <Phone
                  color="#0757ff"
                  size={19}
                />
              </div>

              <div>
                <b>Phone</b>

                <div
                  style={{
                    color: '#667085',
                  }}
                >
                  +91 9327655513
                </div>
              </div>
            </div>

            {/* LOCATION */}

            <div
              style={{
                display: 'flex',
                gap: 14,
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  width: 45,
                  height: 45,
                  borderRadius: 14,
                  background: '#eaf1ff',
                  display: 'grid',
                  placeItems: 'center',
                }}
              >
                <MapPin
                  color="#0757ff"
                  size={19}
                />
              </div>

              <div>
                <b>Location</b>

                <div
                  style={{
                    color: '#667085',
                  }}
                >
                  India
                </div>
              </div>
            </div>

          </div>

          {/* WHATSAPP */}

          <a
            href="https://wa.me/919327655513?text=Hi%2C%20I%20am%20interested%20in%20Jio%20services."
            target="_blank"
            rel="noopener noreferrer"
            style={{
              marginTop: 30,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 20,
              borderRadius: 20,
              background: '#ffffff',
              border: '1px solid #e5e7eb',
              textDecoration: 'none',
              color: '#101828',
              boxShadow:
                '0 15px 40px rgba(16,24,40,.06)',
            }}
          >

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
              }}
            >

              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  background: '#e9fff2',
                  display: 'grid',
                  placeItems: 'center',
                }}
              >
                <MessageCircle
                  color="#16a34a"
                  size={23}
                />
              </div>

              <div>
                <b>
                  Chat with us on WhatsApp
                </b>

                <div
                  style={{
                    color: '#98a2b3',
                    fontSize: 13,
                    marginTop: 4,
                  }}
                >
                  Get quick assistance from our team
                </div>
              </div>

            </div>

            <span
              style={{
                color: '#16a34a',
                fontSize: 24,
              }}
            >
              →
            </span>

          </a>

        </div>

        {/* FORM */}

        <form
          className="card"
          style={{ padding: 30 }}
          onSubmit={handleSubmit}
        >

          <h2>
            Send an enquiry
          </h2>

          <label>Name</label>

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="input"
            placeholder="Enter your name"
            required
            style={{
              margin: '7px 0 18px',
            }}
          />

          <label>Email</label>

          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="input"
            placeholder="Enter your email"
            required
            style={{
              margin: '7px 0 18px',
            }}
          />

          <label>Phone</label>

          <input
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            className="input"
            placeholder="Enter your phone number"
            required
            style={{
              margin: '7px 0 18px',
            }}
          />

          <label>Message</label>

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            className="input"
            placeholder="How can we help you?"
            required
            rows={5}
            style={{
              margin: '7px 0 18px',
              resize: 'vertical',
            }}
          />

          <button
            type="submit"
            className="btn primary"
            disabled={loading}
            style={{
              width: '100%',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading
              ? 'Sending...'
              : sent
                ? 'Enquiry Sent ✓'
                : 'Send Enquiry'}

            <Send size={16} />
          </button>

        </form>

      </div>
    </main>
  );
}