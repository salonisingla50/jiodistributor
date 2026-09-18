"use client";

import { useEffect, useState } from "react";
import {
  Package,
  Layers,
  Plus,
  RefreshCw,
  Trash2,
  Mail,
  Phone,
  MessageSquare,
  CalendarDays,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

type Product = {
  id: string;
  name: string;
  description?: string;
  price?: string;
};

type Service = {
  id: string;
  name: string;
  description?: string;
  category?: string;
};

type Inquiry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt?: string;
  status?: string;
};

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [type, setType] = useState("Product");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  async function loadData() {
    try {
      setLoading(true);

      const [productsRes, servicesRes, inquiriesRes] =
        await Promise.all([
          fetch("/api/products"),
          fetch("/api/services"),
          fetch("/api/inquiries"),
        ]);

      if (productsRes.ok) {
        const data = await productsRes.json();
        setProducts(Array.isArray(data) ? data : []);
      }

      if (servicesRes.ok) {
        const data = await servicesRes.json();
        setServices(Array.isArray(data) ? data : []);
      }

      if (inquiriesRes.ok) {
        const data = await inquiriesRes.json();
        setInquiries(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("LOAD ADMIN DATA ERROR:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function addContent() {
    if (!name.trim()) {
      alert("Please enter name");
      return;
    }

    try {
      const endpoint =
        type === "Product" ? "/api/products" : "/api/services";

      const body =
        type === "Product"
          ? {
              name,
              description,
              price: price || "Contact us",
            }
          : {
              name,
              description,
              category: "General",
            };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Failed to add");
      }

      alert(`${type} added successfully!`);

      setName("");
      setDescription("");
      setPrice("");

      await loadData();
    } catch (error) {
      console.error("ADD CONTENT ERROR:", error);
      alert(`Failed to add ${type}`);
    }
  }

  async function deleteProduct(id: string) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      setDeletingId(id);

      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Delete failed");
      }

      await loadData();
    } catch (error) {
      console.error("DELETE PRODUCT ERROR:", error);
      alert("Product delete failed");
    } finally {
      setDeletingId(null);
    }
  }

  async function deleteInquiry(id: string) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this inquiry?"
    );

    if (!confirmDelete) return;

    try {
      setDeletingId(id);

      const response = await fetch(`/api/inquiries/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Delete failed");
      }

      setInquiries((current) =>
        current.filter(
          (item) => String(item.id) !== String(id)
        )
      );
    } catch (error) {
      console.error("DELETE INQUIRY ERROR:", error);
      alert("Inquiry delete failed");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f6f8fc",
        padding: "50px 0 80px",
      }}
    >
      <div
        className="wrap"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        {/* HEADER */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 20,
            marginBottom: 35,
          }}
        >
          <div>
            <div
              style={{
                color: "#0757ff",
                fontWeight: 900,
                fontSize: 14,
              }}
            >
              ADMIN
            </div>

            <h1
              style={{
                fontSize: 52,
                margin: "5px 0 0",
                color: "#071333",
              }}
            >
              Dashboard
            </h1>
          </div>

          <button
            onClick={loadData}
            disabled={loading}
            style={{
              border: 0,
              background: "#eaf1ff",
              color: "#0757ff",
              padding: "13px 20px",
              borderRadius: 14,
              fontWeight: 800,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <RefreshCw
              size={17}
              style={{
                animation: loading
                  ? "spin 1s linear infinite"
                  : "none",
              }}
            />

            Refresh
          </button>
        </div>

        {/* STATS */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(240px,1fr))",
            gap: 22,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              background: "#fff",
              border: "1px solid #e4e9f2",
              borderRadius: 24,
              padding: 25,
            }}
          >
            <Package color="#0757ff" size={25} />

            <div
              style={{
                marginTop: 18,
                color: "#667085",
              }}
            >
              Products
            </div>

            <strong
              style={{
                fontSize: 34,
                color: "#071333",
              }}
            >
              {products.length}
            </strong>
          </div>

          <div
            style={{
              background: "#fff",
              border: "1px solid #e4e9f2",
              borderRadius: 24,
              padding: 25,
            }}
          >
            <Layers color="#0757ff" size={25} />

            <div
              style={{
                marginTop: 18,
                color: "#667085",
              }}
            >
              Services
            </div>

            <strong
              style={{
                fontSize: 34,
                color: "#071333",
              }}
            >
              {services.length}
            </strong>
          </div>

          <div
            style={{
              background: "#fff",
              border: "1px solid #e4e9f2",
              borderRadius: 24,
              padding: 25,
            }}
          >
            <Mail color="#0757ff" size={25} />

            <div
              style={{
                marginTop: 18,
                color: "#667085",
              }}
            >
              Customer Inquiries
            </div>

            <strong
              style={{
                fontSize: 34,
                color: "#071333",
              }}
            >
              {inquiries.length}
            </strong>
          </div>
        </div>

        {/* ADD CONTENT */}

        <section
          style={{
            background: "#fff",
            border: "1px solid #e4e9f2",
            borderRadius: 26,
            padding: 28,
            marginBottom: 28,
          }}
        >
          <h2
            style={{
              margin: "0 0 20px",
              fontSize: 20,
            }}
          >
            Add Content
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "180px 1fr 1fr 180px",
              gap: 14,
            }}
          >
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              style={{
                height: 54,
                border: "1px solid #d8dfeb",
                borderRadius: 14,
                padding: "0 15px",
                fontSize: 16,
                background: "#fff",
              }}
            >
              <option>Product</option>
              <option>Service</option>
            </select>

            <input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                height: 54,
                border: "1px solid #d8dfeb",
                borderRadius: 14,
                padding: "0 15px",
                fontSize: 16,
              }}
            />

            <input
              placeholder="Description"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              style={{
                height: 54,
                border: "1px solid #d8dfeb",
                borderRadius: 14,
                padding: "0 15px",
                fontSize: 16,
              }}
            />

            {type === "Product" ? (
              <input
                placeholder="Price"
                value={price}
                onChange={(e) =>
                  setPrice(e.target.value)
                }
                style={{
                  height: 54,
                  border: "1px solid #d8dfeb",
                  borderRadius: 14,
                  padding: "0 15px",
                  fontSize: 16,
                }}
              />
            ) : (
              <div />
            )}
          </div>

          <button
            onClick={addContent}
            style={{
              marginTop: 16,
              background: "#0757ff",
              color: "#fff",
              border: 0,
              borderRadius: 16,
              padding: "15px 32px",
              fontSize: 16,
              fontWeight: 900,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Plus size={19} />
            Add
          </button>
        </section>

        {/* PRODUCTS + SERVICES */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(400px,1fr))",
            gap: 22,
            marginBottom: 28,
          }}
        >
          {/* PRODUCTS */}

          <section
            style={{
              background: "#fff",
              border: "1px solid #e4e9f2",
              borderRadius: 26,
              padding: 25,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 20,
              }}
            >
              <h2 style={{ margin: 0 }}>Products</h2>

              <span
                style={{
                  background: "#f1f4f9",
                  padding: "6px 10px",
                  borderRadius: 10,
                  fontWeight: 800,
                }}
              >
                {products.length}
              </span>
            </div>

            {products.length === 0 ? (
              <p style={{ color: "#667085" }}>
                No products found.
              </p>
            ) : (
              <div>
                {products.map((product) => (
                  <div
                    key={product.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 15,
                      padding: "16px 0",
                      borderBottom:
                        "1px solid #edf0f5",
                    }}
                  >
                    <div>
                      <strong>{product.name}</strong>

                      <p
                        style={{
                          color: "#667085",
                          margin: "6px 0",
                          fontSize: 14,
                        }}
                      >
                        {product.description}
                      </p>

                      <b>
                        Price: {product.price}
                      </b>
                    </div>

                    <button
                      onClick={() =>
                        deleteProduct(product.id)
                      }
                      disabled={
                        deletingId === product.id
                      }
                      style={{
                        alignSelf: "center",
                        border: 0,
                        background: "#fff0f0",
                        color: "#ef4444",
                        width: 38,
                        height: 38,
                        borderRadius: 12,
                        cursor: "pointer",
                      }}
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* SERVICES */}

          <section
            style={{
              background: "#fff",
              border: "1px solid #e4e9f2",
              borderRadius: 26,
              padding: 25,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 20,
              }}
            >
              <h2 style={{ margin: 0 }}>Services</h2>

              <span
                style={{
                  background: "#f1f4f9",
                  padding: "6px 10px",
                  borderRadius: 10,
                  fontWeight: 800,
                }}
              >
                {services.length}
              </span>
            </div>

            {services.length === 0 ? (
              <p style={{ color: "#667085" }}>
                No services found.
              </p>
            ) : (
              services.map((service) => (
                <div
                  key={service.id}
                  style={{
                    padding: "16px 0",
                    borderBottom:
                      "1px solid #edf0f5",
                  }}
                >
                  <strong>{service.name}</strong>

                  <p
                    style={{
                      color: "#667085",
                      margin: "6px 0",
                      fontSize: 14,
                    }}
                  >
                    {service.description}
                  </p>

                  <span
                    style={{
                      fontSize: 12,
                      color: "#0757ff",
                      fontWeight: 800,
                    }}
                  >
                    {service.category}
                  </span>
                </div>
              ))
            )}
          </section>
        </div>

        {/* CUSTOMER INQUIRIES */}

        <section
          style={{
            background: "#fff",
            border: "1px solid #e4e9f2",
            borderRadius: 28,
            padding: 25,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <Mail color="#0757ff" />
                Customer Inquiries
              </h2>

              <p
                style={{
                  color: "#667085",
                  margin: "7px 0 0",
                }}
              >
                Enquiries received from your Contact page.
              </p>
            </div>

            <span
              style={{
                background: "#eaf1ff",
                color: "#0757ff",
                padding: "9px 15px",
                borderRadius: 12,
                fontWeight: 900,
              }}
            >
              {inquiries.length} Total
            </span>
          </div>

          {inquiries.length === 0 ? (
            <div
              style={{
                padding: 40,
                textAlign: "center",
                color: "#667085",
              }}
            >
              No inquiries found.
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gap: 15,
              }}
            >
              {inquiries.map((inquiry) => (
                <div
                  key={inquiry.id}
                  style={{
                    border: "1px solid #e4e9f2",
                    borderRadius: 22,
                    padding: 22,
                    position: "relative",
                  }}
                >
                  {/* TOP */}

                  <div
                    style={{
                      display: "flex",
                      justifyContent:
                        "space-between",
                      gap: 15,
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          margin: 0,
                          fontSize: 20,
                        }}
                      >
                        {inquiry.name}
                      </h3>

                      <div
                        style={{
                          display: "grid",
                          gap: 8,
                          marginTop: 10,
                          color: "#667085",
                        }}
                      >
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                          }}
                        >
                          <Mail size={16} />
                          {inquiry.email}
                        </span>

                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                          }}
                        >
                          <Phone size={16} />
                          {inquiry.phone}
                        </span>
                      </div>
                    </div>

                    <span
                      style={{
                        height: "fit-content",
                        background: "#eaf1ff",
                        color: "#0757ff",
                        padding: "8px 12px",
                        borderRadius: 10,
                        fontSize: 12,
                        fontWeight: 900,
                      }}
                    >
                      {inquiry.status || "NEW"}
                    </span>
                  </div>

                  {/* MESSAGE */}

                  <div
                    style={{
                      marginTop: 18,
                      background: "#f7f9fd",
                      borderRadius: 16,
                      padding: 16,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        fontWeight: 900,
                        marginBottom: 8,
                      }}
                    >
                      <MessageSquare
                        size={16}
                        color="#0757ff"
                      />
                      Message
                    </div>

                    <div
                      style={{
                        color: "#475467",
                        lineHeight: 1.6,
                      }}
                    >
                      {inquiry.message}
                    </div>
                  </div>

                  {/* DATE + DELETE */}

                  <div
                    style={{
                      display: "flex",
                      justifyContent:
                        "space-between",
                      alignItems: "center",
                      gap: 15,
                      marginTop: 15,
                    }}
                  >
                    <div
                      style={{
                        color: "#98a2b3",
                        fontSize: 13,
                        display: "flex",
                        alignItems: "center",
                        gap: 7,
                      }}
                    >
                      <CalendarDays size={15} />

                      {inquiry.createdAt
                        ? new Date(
                            inquiry.createdAt
                          ).toLocaleString("en-IN")
                        : "Date not available"}
                    </div>

                    <button
                      onClick={() =>
                        deleteInquiry(inquiry.id)
                      }
                      disabled={
                        deletingId === inquiry.id
                      }
                      style={{
                        border: 0,
                        background: "#fff0f0",
                        color: "#ef4444",
                        padding: "10px 15px",
                        borderRadius: 12,
                        fontWeight: 800,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 7,
                      }}
                    >
                      <Trash2 size={16} />

                      {deletingId === inquiry.id
                        ? "Deleting..."
                        : "Delete"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 800px) {
          .wrap {
            padding-left: 15px !important;
            padding-right: 15px !important;
          }
        }
      `}</style>
    </main>
  );
}