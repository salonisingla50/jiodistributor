'use client';

import { useEffect, useState } from 'react';
import {
  Mail,
  Phone,
  Trash2,
  RefreshCw,
  MessageCircle,
} from 'lucide-react';

type Inquiry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: string;
  createdAt: string;
};

export default function InquiriesPage() {
  const [inquiries, setInquiries] =
    useState<Inquiry[]>([]);

  const [loading, setLoading] =
    useState(true);

  const loadInquiries = async () => {
    try {
      setLoading(true);

      const response =
        await fetch('/api/inquiries');

      const data = await response.json();

      setInquiries(
        Array.isArray(data) ? data : []
      );
    } catch (error) {
      console.error(
        'LOAD INQUIRIES ERROR:',
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  const deleteInquiry = async (
    id: string
  ) => {
    const confirmDelete =
      window.confirm(
        'Delete this enquiry?'
      );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `/api/inquiries/${id}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error(
          'Delete failed'
        );
      }

      setInquiries((prev) =>
        prev.filter(
          (item) => item.id !== id
        )
      );
    } catch (error) {
      console.error(error);

      alert(
        'Enquiry delete nahi hui.'
      );
    }
  };

  return (
    <main
      style={{
        padding: 35,
        background: '#f6f8fc',
        minHeight: '100vh',
      }}
    >

      {/* HEADER */}

      <div
        style={{
          display: 'flex',
          justifyContent:
            'space-between',
          alignItems: 'center',
          gap: 20,
          marginBottom: 30,
        }}
      >

        <div>
          <div
            style={{
              color: '#0757ff',
              fontWeight: 900,
              fontSize: 12,
            }}
          >
            ADMIN
          </div>

          <h1
            style={{
              margin: '5px 0',
              fontSize: 40,
            }}
          >
            Inquiries
          </h1>

          <p
            style={{
              color: '#667085',
            }}
          >
            All enquiries received from
            your website.
          </p>
        </div>

        <button
          onClick={loadInquiries}
          className="btn ghost"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <RefreshCw size={16} />
          Refresh
        </button>

      </div>

      {/* COUNT */}

      <div
        className="card"
        style={{
          padding: 24,
          marginBottom: 25,
        }}
      >
        <div
          style={{
            color: '#667085',
            fontSize: 13,
            fontWeight: 800,
          }}
        >
          TOTAL INQUIRIES
        </div>

        <div
          style={{
            fontSize: 36,
            fontWeight: 900,
            marginTop: 5,
          }}
        >
          {inquiries.length}
        </div>
      </div>

      {/* LOADING */}

      {loading && (
        <div
          className="card"
          style={{
            padding: 40,
            textAlign: 'center',
          }}
        >
          Loading enquiries...
        </div>
      )}

      {/* EMPTY */}

      {!loading &&
        inquiries.length === 0 && (
          <div
            className="card"
            style={{
              padding: 50,
              textAlign: 'center',
            }}
          >
            <MessageCircle
              size={40}
              color="#98a2b3"
            />

            <h3>
              No enquiries yet
            </h3>

            <p
              style={{
                color: '#667085',
              }}
            >
              Website enquiries will
              appear here.
            </p>
          </div>
        )}

      {/* LIST */}

      <div
        style={{
          display: 'grid',
          gap: 18,
        }}
      >

        {inquiries.map((inquiry) => (

          <div
            className="card"
            key={inquiry.id}
            style={{
              padding: 25,
            }}
          >

            <div
              style={{
                display: 'flex',
                justifyContent:
                  'space-between',
                alignItems: 'flex-start',
                gap: 20,
              }}
            >

              {/* CUSTOMER */}

              <div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                  }}
                >

                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 15,
                      background:
                        '#eaf1ff',
                      color: '#0757ff',
                      display: 'grid',
                      placeItems: 'center',
                      fontWeight: 900,
                      fontSize: 20,
                    }}
                  >
                    {inquiry.name
                      ?.charAt(0)
                      ?.toUpperCase()}
                  </div>

                  <div>

                    <h2
                      style={{
                        margin: 0,
                        fontSize: 20,
                      }}
                    >
                      {inquiry.name}
                    </h2>

                    <span
                      style={{
                        display:
                          'inline-block',
                        marginTop: 5,
                        padding:
                          '4px 9px',
                        borderRadius: 7,
                        background:
                          '#eaf1ff',
                        color:
                          '#0757ff',
                        fontSize: 10,
                        fontWeight: 900,
                      }}
                    >
                      {inquiry.status}
                    </span>

                  </div>

                </div>

                {/* CONTACT */}

                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 18,
                    marginTop: 22,
                    color: '#667085',
                    fontSize: 14,
                  }}
                >

                  <a
                    href={`mailto:${inquiry.email}`}
                    style={{
                      display: 'flex',
                      gap: 7,
                      alignItems:
                        'center',
                      color:
                        '#667085',
                    }}
                  >
                    <Mail size={15} />
                    {inquiry.email}
                  </a>

                  <a
                    href={`tel:${inquiry.phone}`}
                    style={{
                      display: 'flex',
                      gap: 7,
                      alignItems:
                        'center',
                      color:
                        '#667085',
                    }}
                  >
                    <Phone size={15} />
                    {inquiry.phone}
                  </a>

                </div>

              </div>

              {/* DELETE */}

              <button
                onClick={() =>
                  deleteInquiry(
                    inquiry.id
                  )
                }
                style={{
                  border: 'none',
                  background:
                    '#fff1f2',
                  color: '#e11d48',
                  width: 42,
                  height: 42,
                  borderRadius: 12,
                  display: 'grid',
                  placeItems: 'center',
                  cursor: 'pointer',
                }}
                title="Delete enquiry"
              >
                <Trash2 size={18} />
              </button>

            </div>

            {/* MESSAGE */}

            <div
              style={{
                marginTop: 22,
                padding: 18,
                borderRadius: 15,
                background: '#f8fafc',
                color: '#344054',
                lineHeight: 1.6,
              }}
            >
              <b
                style={{
                  display: 'block',
                  marginBottom: 6,
                  fontSize: 12,
                  color: '#667085',
                }}
              >
                MESSAGE
              </b>

              {inquiry.message}
            </div>

            {/* DATE */}

            <div
              style={{
                marginTop: 15,
                color: '#98a2b3',
                fontSize: 11,
              }}
            >
              Received:{' '}
              {new Date(
                inquiry.createdAt
              ).toLocaleString()}
            </div>

          </div>

        ))}

      </div>

    </main>
  );
}