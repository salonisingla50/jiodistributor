'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, Sparkles } from 'lucide-react';

type Product = {
  id: string;
  name: string;
  description: string;
  price?: string;
  oldPrice?: string;
  tag?: string;
  spec?: string;
  icon?: string;
  category?: string;
};

export default function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [product, setProduct] =
    useState<Product | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(false);

  useEffect(() => {
    async function loadProduct() {
      try {
        const { id } = await params;

        const response = await fetch(
          '/api/products',
          {
            cache: 'no-store',
          }
        );

        if (!response.ok) {
          throw new Error(
            'Failed to load products'
          );
        }

        const products =
          await response.json();

        const found = products.find(
          (item: Product) =>
            String(item.id) === String(id)
        );

        if (!found) {
          setError(true);
          return;
        }

        setProduct(found);
      } catch (err) {
        console.error(
          'PRODUCT DETAIL ERROR:',
          err
        );

        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [params]);

  if (loading) {
    return (
      <main className="detail-page">
        <div className="detail-container">
          <div className="detail-loading">
            Loading product...
          </div>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="detail-page">
        <div className="detail-container">
          <div className="not-found">
            <h1>
              Product not found
            </h1>

            <p>
              This product may have been
              removed or is no longer
              available.
            </p>

            <Link
              href="/products"
              className="back-btn"
            >
              <ArrowLeft size={17} />
              Back to Products
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="detail-page">

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="detail-container">

        <Link
          href="/products"
          className="back-link"
        >
          <ArrowLeft size={17} />
          Back to Products
        </Link>

        {/* ================================================= */}
        {/* PRODUCT */}
        {/* ================================================= */}

        <section className="detail-grid">

          {/* PRODUCT VISUAL */}

          <div className="detail-visual">

            <div className="visual-orb orb-one" />
            <div className="visual-orb orb-two" />

            <div className="detail-grid-lines" />

            {product.tag && (
              <div className="detail-badge">
                <Sparkles size={13} />
                {product.tag}
              </div>
            )}

            <div className="detail-icon">
              {product.icon || 'J'}
            </div>

            <div className="visual-label">
              <span>
                {product.category ||
                  'GENERAL'}
              </span>

              <span>
                CONNECTED DEVICE
              </span>
            </div>
          </div>

          {/* PRODUCT INFORMATION */}

          <div className="detail-info">

            <div className="detail-category">
              {product.category ||
                'PRODUCT'}
            </div>

            <h1>
              {product.name}
            </h1>

            <p className="detail-description">
              {product.description}
            </p>

            {/* PRICE */}

            <div className="detail-price">
              <span>
                {product.price ||
                  'Contact us'}
              </span>

              {product.oldPrice && (
                <s>
                  {product.oldPrice}
                </s>
              )}
            </div>

            {/* FEATURES */}

            <div className="features">

              <div className="feature">
                <div className="check">
                  <Check size={16} />
                </div>

                <div>
                  <b>
                    {product.spec ||
                      'Connected experience'}
                  </b>

                  <span>
                    Designed for everyday
                    digital use
                  </span>
                </div>
              </div>

              <div className="feature">
                <div className="check">
                  <Check size={16} />
                </div>

                <div>
                  <b>
                    Smart & Reliable
                  </b>

                  <span>
                    Simple technology built
                    for everyday life
                  </span>
                </div>
              </div>

              <div className="feature">
                <div className="check">
                  <Check size={16} />
                </div>

                <div>
                  <b>
                    Connected Experience
                  </b>

                  <span>
                    Built to keep your
                    experience seamless
                  </span>
                </div>
              </div>

            </div>

            {/* CTA */}

            <div className="detail-actions">

              <button
                className="enquire-btn"
                onClick={() =>
                  alert(
                    'Thank you! Our team will contact you shortly.'
                  )
                }
              >
                Buy / Enquire
                <ArrowLeft
                  size={17}
                  style={{
                    transform:
                      'rotate(180deg)',
                  }}
                />
              </button>

              <Link
                href="/products"
                className="outline-btn"
              >
                Explore More
              </Link>

            </div>

          </div>

        </section>

      </div>

      {/* ================================================= */}
      {/* CSS */}
      {/* ================================================= */}

      <style jsx>{`

        .detail-page {
          min-height: 100vh;
          background:
            radial-gradient(
              circle at 80% 10%,
              rgba(7,87,255,.08),
              transparent 30%
            ),
            linear-gradient(
              180deg,
              #f7faff 0%,
              #ffffff 55%,
              #f8faff 100%
            );
          color: #101828;
          padding: 42px 0 100px;
        }

        .detail-container {
          width: min(
            1180px,
            calc(100% - 48px)
          );
          margin: 0 auto;
        }

        /* BACK */

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #667085;
          text-decoration: none;
          font-size: 14px;
          font-weight: 700;
          margin-bottom: 35px;
          transition: .2s ease;
        }

        .back-link:hover {
          color: #0757ff;
          transform: translateX(-3px);
        }

        /* GRID */

        .detail-grid {
          display: grid;
          grid-template-columns:
            1.05fr .95fr;
          gap: 75px;
          align-items: center;
        }

        /* VISUAL */

        .detail-visual {
          height: 570px;
          position: relative;
          overflow: hidden;
          border-radius: 38px;
          display: grid;
          place-items: center;

          background:
            radial-gradient(
              circle at 50% 45%,
              rgba(7,87,255,.23),
              transparent 30%
            ),
            linear-gradient(
              145deg,
              #edf4ff,
              #dfe9ff
            );

          border: 1px solid
            rgba(7,87,255,.09);

          box-shadow:
            0 35px 90px
              rgba(16,24,40,.10);
        }

        .detail-grid-lines {
          position: absolute;
          inset: 0;
          opacity: .4;

          background-image:
            linear-gradient(
              rgba(7,87,255,.07) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(7,87,255,.07) 1px,
              transparent 1px
            );

          background-size: 30px 30px;
        }

        .visual-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(25px);
        }

        .orb-one {
          width: 190px;
          height: 190px;
          background: rgba(
            7,
            87,
            255,
            .16
          );
          top: 70px;
          right: 30px;
        }

        .orb-two {
          width: 150px;
          height: 150px;
          background: rgba(
            111,
            76,
            255,
            .12
          );
          bottom: 50px;
          left: 30px;
        }

        .detail-badge {
          position: absolute;
          top: 25px;
          left: 25px;
          z-index: 5;

          display: flex;
          align-items: center;
          gap: 7px;

          padding: 9px 13px;

          border-radius: 10px;

          background: #fff;
          color: #0757ff;

          font-size: 11px;
          font-weight: 900;

          box-shadow:
            0 10px 30px
              rgba(16,24,40,.08);
        }

        .detail-icon {
          position: relative;
          z-index: 3;

          width: 285px;
          height: 285px;

          display: grid;
          place-items: center;

          border-radius: 72px;

          background:
            linear-gradient(
              145deg,
              #1463ff,
              #0043d5
            );

          color: #fff;

          font-size: 105px;
          font-weight: 900;

          box-shadow:
            0 45px 90px
              rgba(7,87,255,.32),
            inset 0 1px 1px
              rgba(255,255,255,.30);

          animation: float 4s ease-in-out
            infinite;
        }

        @keyframes float {
          0%,100% {
            transform:
              translateY(0);
          }

          50% {
            transform:
              translateY(-10px);
          }
        }

        .visual-label {
          position: absolute;
          z-index: 5;
          bottom: 24px;
          left: 25px;
          right: 25px;

          display: flex;
          justify-content:
            space-between;

          color: #667085;

          font-size: 10px;
          font-weight: 900;
          letter-spacing: .08em;
        }

        /* INFO */

        .detail-info {
          max-width: 560px;
        }

        .detail-category {
          color: #0757ff;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: .1em;
        }

        .detail-info h1 {
          margin: 12px 0 18px;

          font-size: clamp(
            45px,
            5vw,
            68px
          );

          line-height: 1;
          letter-spacing: -.055em;
          font-weight: 900;
        }

        .detail-description {
          margin: 0;

          color: #667085;

          font-size: 18px;
          line-height: 1.75;
        }

        /* PRICE */

        .detail-price {
          display: flex;
          align-items: baseline;
          gap: 13px;

          margin: 28px 0;

          padding-bottom: 25px;

          border-bottom: 1px solid
            #edf0f5;
        }

        .detail-price span {
          font-size: 32px;
          font-weight: 900;
        }

        .detail-price s {
          color: #98a2b3;
          font-size: 14px;
        }

        /* FEATURES */

        .features {
          display: grid;
          gap: 16px;
        }

        .feature {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .check {
          flex-shrink: 0;

          width: 30px;
          height: 30px;

          display: grid;
          place-items: center;

          border-radius: 9px;

          background: #eaf1ff;
          color: #0757ff;
        }

        .feature b {
          display: block;
          color: #344054;
          font-size: 14px;
          margin-bottom: 3px;
        }

        .feature span {
          display: block;
          color: #98a2b3;
          font-size: 12px;
          line-height: 1.5;
        }

        /* ACTIONS */

        .detail-actions {
          display: flex;
          gap: 12px;
          margin-top: 32px;
        }

        .enquire-btn,
        .outline-btn {
          height: 52px;
          padding: 0 20px;

          border-radius: 14px;

          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;

          font-size: 13px;
          font-weight: 900;

          text-decoration: none;
          cursor: pointer;

          transition: .2s ease;
        }

        .enquire-btn {
          border: 0;
          background: #0757ff;
          color: #fff;

          box-shadow:
            0 13px 30px
              rgba(7,87,255,.22);
        }

        .enquire-btn:hover {
          background: #0048df;
          transform: translateY(-2px);
        }

        .outline-btn {
          border: 1px solid
            #dce3ee;
          background: #fff;
          color: #344054;
        }

        .outline-btn:hover {
          border-color: #0757ff;
          color: #0757ff;
          transform: translateY(-2px);
        }

        /* LOADING */

        .detail-loading {
          min-height: 500px;
          display: grid;
          place-items: center;
          color: #667085;
          font-weight: 700;
        }

        /* NOT FOUND */

        .not-found {
          min-height: 550px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .not-found h1 {
          font-size: 42px;
          margin: 0 0 10px;
        }

        .not-found p {
          color: #667085;
          margin: 0 0 25px;
        }

        .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 18px;
          border-radius: 12px;
          background: #0757ff;
          color: #fff;
          text-decoration: none;
          font-weight: 800;
        }

        /* TABLET */

        @media (max-width: 900px) {

          .detail-grid {
            grid-template-columns: 1fr;
            gap: 45px;
          }

          .detail-visual {
            height: 500px;
          }

          .detail-info {
            max-width: none;
          }

        }

        /* MOBILE */

        @media (max-width: 600px) {

          .detail-page {
            padding-top: 25px;
          }

          .detail-container {
            width: min(
              100% - 30px,
              1180px
            );
          }

          .detail-visual {
            height: 380px;
            border-radius: 27px;
          }

          .detail-icon {
            width: 190px;
            height: 190px;
            border-radius: 48px;
            font-size: 72px;
          }

          .detail-info h1 {
            font-size: 44px;
          }

          .detail-description {
            font-size: 16px;
          }

          .detail-price span {
            font-size: 27px;
          }

          .detail-actions {
            flex-direction: column;
          }

          .enquire-btn,
          .outline-btn {
            width: 100%;
          }

        }

      `}</style>
    </main>
  );
}