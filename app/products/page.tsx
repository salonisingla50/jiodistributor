'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Search,
  ArrowRight,
  Sparkles,
  Package,
  SlidersHorizontal,
} from 'lucide-react';

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

export default function Products() {
  const [data, setData] = useState<Product[]>([]);
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);

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

        const result =
          await response.json();

        setData(
          Array.isArray(result)
            ? result
            : []
        );
      } catch (error) {
        console.error(
          'PRODUCT LOAD ERROR:',
          error
        );

        setData([]);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const cats = useMemo(() => {
    const categories = data
      .map((item) => item.category)
      .filter(Boolean) as string[];

    return [
      'All',
      ...Array.from(
        new Set(categories)
      ),
    ];
  }, [data]);

  const list = useMemo(() => {
    const search =
      q.trim().toLowerCase();

    return data.filter((product) => {
      const matchesCategory =
        cat === 'All' ||
        product.category === cat;

      const matchesSearch =
        !search ||
        product.name
          ?.toLowerCase()
          .includes(search) ||
        product.description
          ?.toLowerCase()
          .includes(search) ||
        product.category
          ?.toLowerCase()
          .includes(search);

      return (
        matchesCategory &&
        matchesSearch
      );
    });
  }, [data, q, cat]);

  return (
    <main className="products-page">
      {/* ================================================= */}
      {/* HERO */}
      {/* ================================================= */}

      <section className="products-hero">
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />

        <div className="products-container hero-content">
          <div className="hero-copy">
            <div className="eyebrow">
              <Sparkles size={15} />
              PREMIUM CONNECTED PRODUCTS
            </div>

            <h1>
              Technology that
              <span> connects life.</span>
            </h1>

            <p>
              Explore smart connected devices
              designed for simple, reliable and
              everyday digital experiences.
            </p>
          </div>

          {/* Search */}

          <div className="hero-search">
            <Search size={19} />

            <input
              type="text"
              placeholder="Search products..."
              value={q}
              onChange={(e) =>
                setQ(e.target.value)
              }
            />

            {q && (
              <button
                type="button"
                onClick={() => setQ('')}
              >
                ×
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* PRODUCTS SECTION */}
      {/* ================================================= */}

      <section className="products-section">
        <div className="products-container">
          {/* Section heading */}

          <div className="section-top">
            <div>
              <div className="section-label">
                <Package size={15} />
                OUR PRODUCTS
              </div>

              <h2>
                Find your perfect
                <span> device.</span>
              </h2>
            </div>

            <div className="result-count">
              <SlidersHorizontal size={16} />
              {list.length}{' '}
              {list.length === 1
                ? 'Product'
                : 'Products'}
            </div>
          </div>

          {/* ================================================= */}
          {/* CATEGORY FILTER */}
          {/* ================================================= */}

          <div className="category-wrapper">
            <div className="category-scroll">
              {cats.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={
                    category === cat
                      ? 'category-btn active'
                      : 'category-btn'
                  }
                  onClick={() =>
                    setCat(category)
                  }
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* ================================================= */}
          {/* LOADING */}
          {/* ================================================= */}

          {loading && (
            <div className="product-grid">
              {Array.from({
                length: 4,
              }).map((_, index) => (
                <div
                  className="skeleton-card"
                  key={index}
                >
                  <div className="skeleton-image" />

                  <div className="skeleton-line large" />
                  <div className="skeleton-line" />
                  <div className="skeleton-line short" />
                </div>
              ))}
            </div>
          )}

          {/* ================================================= */}
          {/* EMPTY */}
          {/* ================================================= */}

          {!loading &&
            list.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">
                  <Package size={30} />
                </div>

                <h3>
                  No products found
                </h3>

                <p>
                  Try another search or
                  select a different category.
                </p>

                {(q || cat !== 'All') && (
                  <button
                    type="button"
                    className="reset-btn"
                    onClick={() => {
                      setQ('');
                      setCat('All');
                    }}
                  >
                    View all products
                  </button>
                )}
              </div>
            )}

          {/* ================================================= */}
          {/* PRODUCT GRID */}
          {/* ================================================= */}

          {!loading &&
            list.length > 0 && (
              <div className="product-grid">
                {list.map(
                  (product, index) => (
                    <article
                      className="product-card"
                      key={product.id}
                      style={{
                        animationDelay: `${
                          index * 70
                        }ms`,
                      }}
                    >
                      {/* Product visual */}

                      <div className="product-visual">
                        <div className="visual-grid" />

                        <div className="visual-glow" />

                        {/* Badge */}

                        {product.tag && (
                          <div className="product-badge">
                            {product.tag}
                          </div>
                        )}

                        {/* Icon */}

                        <div className="product-icon-wrap">
                          <div className="product-icon">
                            {product.icon ||
                              'J'}
                          </div>
                        </div>

                        <div className="visual-bottom">
                          <span>
                            {product.category ||
                              'General'}
                          </span>

                          <span>
                            Jio Connect
                          </span>
                        </div>
                      </div>

                      {/* Product content */}

                      <div className="product-content">
                        <div className="product-category">
                          {product.category ||
                            'GENERAL'}
                        </div>

                        <h3>
                          {product.name}
                        </h3>

                        <p>
                          {product.description}
                        </p>

                        {product.spec && (
                          <div className="product-spec">
                            <span className="spec-dot" />
                            {product.spec}
                          </div>
                        )}

                        {/* Bottom */}

                        <div className="product-bottom">
                          <div className="price-area">
                            <span className="price">
                              {product.price ||
                                'Contact us'}
                            </span>

                            {product.oldPrice && (
                              <span className="old-price">
                                {
                                  product.oldPrice
                                }
                              </span>
                            )}
                          </div>

                          <Link
                            href={`/products/${product.id}`}
                            className="details-btn"
                          >
                            <span>
                              View Details
                            </span>

                            <ArrowRight
                              size={17}
                            />
                          </Link>
                        </div>
                      </div>
                    </article>
                  )
                )}
              </div>
            )}
        </div>
      </section>

      {/* ================================================= */}
      {/* PAGE CSS */}
      {/* ================================================= */}

      <style jsx>{`
        .products-page {
          min-height: 100vh;
          background:
            linear-gradient(
              180deg,
              #f7faff 0%,
              #ffffff 42%,
              #f8faff 100%
            );
          color: #101828;
        }

        .products-container {
          width: min(
            1240px,
            calc(100% - 48px)
          );
          margin: 0 auto;
        }

        /* ================= HERO ================= */

        .products-hero {
          position: relative;
          overflow: hidden;
          padding: 82px 0 72px;
          background:
            radial-gradient(
              circle at 85% 20%,
              rgba(7, 87, 255, 0.13),
              transparent 30%
            ),
            radial-gradient(
              circle at 15% 80%,
              rgba(91, 33, 182, 0.08),
              transparent 28%
            ),
            #f7faff;
          border-bottom: 1px solid
            rgba(7, 87, 255, 0.08);
        }

        .hero-glow {
          position: absolute;
          width: 260px;
          height: 260px;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }

        .hero-glow-one {
          right: -80px;
          top: -100px;
          background: rgba(
            7,
            87,
            255,
            0.12
          );
        }

        .hero-glow-two {
          left: -120px;
          bottom: -150px;
          background: rgba(
            111,
            76,
            255,
            0.08
          );
        }

        .hero-content {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 45px;
        }

        .hero-copy {
          max-width: 690px;
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 13px;
          border: 1px solid
            rgba(7, 87, 255, 0.14);
          border-radius: 999px;
          background: rgba(
            255,
            255,
            255,
            0.72
          );
          color: #0757ff;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.08em;
          box-shadow:
            0 8px 30px
              rgba(7, 87, 255, 0.06);
        }

        .hero-copy h1 {
          margin: 20px 0 16px;
          font-size: clamp(
            46px,
            6vw,
            72px
          );
          line-height: 0.98;
          letter-spacing: -0.055em;
          font-weight: 900;
        }

        .hero-copy h1 span {
          display: block;
          color: #0757ff;
        }

        .hero-copy p {
          max-width: 610px;
          margin: 0;
          color: #667085;
          font-size: 18px;
          line-height: 1.7;
        }

        .hero-search {
          width: 360px;
          min-width: 300px;
          height: 60px;
          display: flex;
          align-items: center;
          gap: 13px;
          padding: 0 18px;
          background: rgba(
            255,
            255,
            255,
            0.9
          );
          border: 1px solid
            rgba(16, 24, 40, 0.08);
          border-radius: 18px;
          box-shadow:
            0 18px 50px
              rgba(16, 24, 40, 0.08);
          backdrop-filter: blur(18px);
        }

        .hero-search svg {
          flex-shrink: 0;
          color: #0757ff;
        }

        .hero-search input {
          width: 100%;
          border: 0;
          outline: 0;
          background: transparent;
          color: #101828;
          font-size: 15px;
        }

        .hero-search input::placeholder {
          color: #98a2b3;
        }

        .hero-search button {
          border: 0;
          background: #eef4ff;
          color: #0757ff;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 18px;
        }

        /* ================= SECTION ================= */

        .products-section {
          padding: 70px 0 100px;
        }

        .section-top {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 30px;
        }

        .section-label {
          display: flex;
          align-items: center;
          gap: 7px;
          color: #0757ff;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.08em;
        }

        .section-top h2 {
          margin: 9px 0 0;
          font-size: clamp(
            32px,
            4vw,
            48px
          );
          line-height: 1.05;
          letter-spacing: -0.045em;
        }

        .section-top h2 span {
          color: #0757ff;
        }

        .result-count {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 10px 14px;
          border-radius: 12px;
          background: #f4f7fc;
          color: #667085;
          font-size: 13px;
          font-weight: 700;
        }

        /* ================= CATEGORIES ================= */

        .category-wrapper {
          margin-bottom: 38px;
        }

        .category-scroll {
          display: flex;
          gap: 10px;
          overflow-x: auto;
          padding: 5px 2px 12px;
          scrollbar-width: none;
        }

        .category-scroll::-webkit-scrollbar {
          display: none;
        }

        .category-btn {
          flex-shrink: 0;
          padding: 12px 20px;
          border: 1px solid
            rgba(7, 87, 255, 0.09);
          border-radius: 999px;
          background: #f4f7fc;
          color: #475467;
          cursor: pointer;
          font-size: 14px;
          font-weight: 800;
          transition:
            transform 0.2s ease,
            background 0.2s ease,
            color 0.2s ease,
            box-shadow 0.2s ease;
        }

        .category-btn:hover {
          transform: translateY(-2px);
          background: #eaf1ff;
          color: #0757ff;
        }

        .category-btn.active {
          color: #fff;
          background: #0757ff;
          border-color: #0757ff;
          box-shadow:
            0 10px 25px
              rgba(7, 87, 255, 0.22);
        }

        /* ================= GRID ================= */

        .product-grid {
          display: grid;
          grid-template-columns:
            repeat(
              4,
              minmax(0, 1fr)
            );
          gap: 22px;
        }

        /* ================= CARD ================= */

        .product-card {
          position: relative;
          overflow: hidden;
          min-width: 0;
          background: #fff;
          border: 1px solid
            rgba(16, 24, 40, 0.07);
          border-radius: 24px;
          box-shadow:
            0 10px 35px
              rgba(16, 24, 40, 0.055);
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease,
            border-color 0.3s ease;
          animation: cardIn 0.55s ease
            both;
        }

        .product-card:hover {
          transform: translateY(-8px);
          border-color: rgba(
            7,
            87,
            255,
            0.16
          );
          box-shadow:
            0 25px 60px
              rgba(16, 24, 40, 0.12);
        }

        @keyframes cardIn {
          from {
            opacity: 0;
            transform: translateY(15px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* ================= VISUAL ================= */

        .product-visual {
          position: relative;
          height: 285px;
          overflow: hidden;
          display: grid;
          place-items: center;
          background:
            radial-gradient(
              circle at 50% 45%,
              rgba(
                38,
                104,
                255,
                0.28
              ),
              transparent 38%
            ),
            linear-gradient(
              145deg,
              #eef4ff,
              #dfe9ff
            );
        }

        .visual-grid {
          position: absolute;
          inset: 0;
          opacity: 0.35;
          background-image:
            linear-gradient(
              rgba(
                7,
                87,
                255,
                0.07
              )
              1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(
                7,
                87,
                255,
                0.07
              )
              1px,
              transparent 1px
            );
          background-size: 26px 26px;
        }

        .visual-glow {
          position: absolute;
          width: 180px;
          height: 180px;
          border-radius: 50%;
          background: rgba(
            7,
            87,
            255,
            0.15
          );
          filter: blur(35px);
        }

        .product-badge {
          position: absolute;
          top: 16px;
          left: 16px;
          z-index: 4;
          padding: 7px 10px;
          border-radius: 8px;
          background: #fff;
          color: #0757ff;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.04em;
          box-shadow:
            0 7px 20px
              rgba(16, 24, 40, 0.09);
        }

        .product-icon-wrap {
          position: relative;
          z-index: 3;
          width: 158px;
          height: 158px;
          display: grid;
          place-items: center;
          border-radius: 43px;
          background: linear-gradient(
            145deg,
            #1463ff,
            #0043d5
          );
          box-shadow:
            0 28px 55px
              rgba(7, 87, 255, 0.3),
            inset 0 1px 1px
              rgba(
                255,
                255,
                255,
                0.28
              );
          transition:
            transform 0.35s ease;
        }

        .product-card:hover
          .product-icon-wrap {
          transform: translateY(-6px)
            rotate(-2deg);
        }

        .product-icon {
          color: #fff;
          font-size: 62px;
          font-weight: 900;
          letter-spacing: -0.05em;
        }

        .visual-bottom {
          position: absolute;
          left: 16px;
          right: 16px;
          bottom: 14px;
          z-index: 4;
          display: flex;
          justify-content: space-between;
          color: #667085;
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        /* ================= CONTENT ================= */

        .product-content {
          padding: 23px;
        }

        .product-category {
          color: #0757ff;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.09em;
          text-transform: uppercase;
        }

        .product-content h3 {
          margin: 8px 0 9px;
          color: #101828;
          font-size: 22px;
          line-height: 1.2;
          letter-spacing: -0.025em;
        }

        .product-content p {
          margin: 0;
          color: #667085;
          font-size: 14px;
          line-height: 1.65;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: 69px;
        }

        .product-spec {
          display: flex;
          align-items: center;
          gap: 7px;
          margin-top: 15px;
          color: #475467;
          font-size: 11px;
          font-weight: 700;
        }

        .spec-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #0757ff;
          box-shadow:
            0 0 0 4px
              rgba(
                7,
                87,
                255,
                0.09
              );
        }

        .product-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-top: 21px;
          padding-top: 18px;
          border-top: 1px solid
            #edf0f5;
        }

        .price-area {
          min-width: 0;
        }

        .price {
          display: block;
          color: #101828;
          font-size: 19px;
          font-weight: 900;
          white-space: nowrap;
        }

        .old-price {
          color: #98a2b3;
          font-size: 11px;
          text-decoration: line-through;
        }

        .details-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          flex-shrink: 0;
          padding: 11px 13px;
          border-radius: 12px;
          background: #0757ff;
          color: #fff;
          text-decoration: none;
          font-size: 12px;
          font-weight: 800;
          box-shadow:
            0 9px 20px
              rgba(7, 87, 255, 0.18);
          transition:
            transform 0.2s ease,
            background 0.2s ease;
        }

        .details-btn:hover {
          transform: translateY(-2px);
          background: #0048df;
        }

        /* ================= EMPTY ================= */

        .empty-state {
          padding: 80px 20px;
          text-align: center;
          border: 1px dashed
            rgba(7, 87, 255, 0.18);
          border-radius: 24px;
          background: #f8faff;
        }

        .empty-icon {
          width: 64px;
          height: 64px;
          display: grid;
          place-items: center;
          margin: 0 auto 18px;
          border-radius: 20px;
          background: #eaf1ff;
          color: #0757ff;
        }

        .empty-state h3 {
          margin: 0 0 7px;
          font-size: 22px;
        }

        .empty-state p {
          margin: 0;
          color: #667085;
        }

        .reset-btn {
          margin-top: 22px;
          border: 0;
          padding: 11px 18px;
          border-radius: 12px;
          background: #0757ff;
          color: #fff;
          cursor: pointer;
          font-weight: 800;
        }

        /* ================= SKELETON ================= */

        .skeleton-card {
          overflow: hidden;
          padding-bottom: 25px;
          border: 1px solid
            #edf0f5;
          border-radius: 24px;
          background: #fff;
        }

        .skeleton-image {
          height: 285px;
          background: linear-gradient(
            90deg,
            #eef2f7,
            #f8fafc,
            #eef2f7
          );
          background-size: 200% 100%;
          animation: skeleton 1.4s
            infinite;
        }

        .skeleton-line {
          height: 13px;
          margin: 14px 22px 0;
          border-radius: 8px;
          background: #eef2f7;
        }

        .skeleton-line.large {
          width: 60%;
          height: 20px;
        }

        .skeleton-line.short {
          width: 35%;
        }

        @keyframes skeleton {
          from {
            background-position: 200%
              0;
          }

          to {
            background-position: -200%
              0;
          }
        }

        /* ================= TABLET ================= */

        @media (max-width: 1050px) {
          .product-grid {
            grid-template-columns:
              repeat(3, minmax(0, 1fr));
          }

          .hero-content {
            align-items: flex-start;
            flex-direction: column;
          }

          .hero-search {
            width: 100%;
            max-width: 520px;
          }
        }

        /* ================= MOBILE ================= */

        @media (max-width: 760px) {
          .products-container {
            width: min(
              100% - 30px,
              1240px
            );
          }

          .products-hero {
            padding: 55px 0 48px;
          }

          .hero-copy h1 {
            font-size: 46px;
          }

          .hero-copy p {
            font-size: 16px;
          }

          .hero-search {
            min-width: 0;
            height: 56px;
          }

          .products-section {
            padding: 50px 0 70px;
          }

          .section-top {
            align-items: flex-start;
            flex-direction: column;
          }

          .section-top h2 {
            font-size: 34px;
          }

          .product-grid {
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
            gap: 15px;
          }

          .product-visual {
            height: 230px;
          }

          .product-icon-wrap {
            width: 120px;
            height: 120px;
            border-radius: 32px;
          }

          .product-icon {
            font-size: 48px;
          }

          .product-content {
            padding: 18px;
          }

          .product-content h3 {
            font-size: 19px;
          }

          .product-bottom {
            align-items: stretch;
            flex-direction: column;
          }

          .details-btn {
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .product-grid {
            grid-template-columns: 1fr;
          }

          .product-visual {
            height: 260px;
          }

          .product-bottom {
            flex-direction: row;
            align-items: center;
          }

          .details-btn {
            width: auto;
          }
        }
      `}</style>
    </main>
  );
}