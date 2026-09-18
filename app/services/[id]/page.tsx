import services from '../../../data/services.json';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Wifi,
  Smartphone,
  Briefcase,
  Play,
  Grid2X2,
} from 'lucide-react';
import { notFound } from 'next/navigation';

const icons: any = {
  Connectivity: Smartphone,
  Home: Wifi,
  Digital: Play,
  Business: Briefcase,
};

type Service = {
  id: string;
  name: string;
  description: string;
  category: string;
};

export default async function ServiceDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const service = (services as Service[]).find(
    (item) => String(item.id) === String(id)
  );

  if (!service) {
    notFound();
  }

  const Icon =
    icons[service.category] || Grid2X2;

  return (
    <main className="service-detail-page">

      <div className="service-detail-container">

        <Link
          href="/services"
          className="service-back-link"
        >
          <ArrowLeft size={17} />
          Back to Services
        </Link>

        <section className="service-detail-grid">

          {/* VISUAL */}

          <div className="service-detail-visual">

            <div className="service-glow service-glow-one" />
            <div className="service-glow service-glow-two" />

            <div className="service-grid-pattern" />

            <div className="service-detail-icon">
              <Icon
                size={82}
                strokeWidth={1.7}
              />
            </div>

            <div className="service-visual-bottom">
              <span>
                {service.category.toUpperCase()}
              </span>

              <span>
                JIO CONNECT
              </span>
            </div>

          </div>

          {/* CONTENT */}

          <div className="service-detail-content">

            <div className="service-detail-label">
              SOLUTION
            </div>

            <div className="service-category-pill">
              {service.category}
            </div>

            <h1>
              {service.name}
            </h1>

            <p className="service-main-description">
              {service.description}
            </p>

            <div className="service-features">

              <div className="service-feature">
                <div className="service-check">
                  <Check size={16} />
                </div>

                <div>
                  <b>
                    Connected Experience
                  </b>

                  <span>
                    Designed to make your
                    everyday experience simple.
                  </span>
                </div>
              </div>

              <div className="service-feature">
                <div className="service-check">
                  <Check size={16} />
                </div>

                <div>
                  <b>
                    Reliable Solution
                  </b>

                  <span>
                    Built around your needs
                    with a smooth experience.
                  </span>
                </div>
              </div>

              <div className="service-feature">
                <div className="service-check">
                  <Check size={16} />
                </div>

                <div>
                  <b>
                    Easy & Convenient
                  </b>

                  <span>
                    Simple solutions for everyday
                    connectivity.
                  </span>
                </div>
              </div>

            </div>

            <div className="service-detail-actions">

              <Link
                href="/contact"
                className="service-primary-button"
              >
                Enquire Now
                <ArrowRight size={17} />
              </Link>

              <Link
                href="/services"
                className="service-secondary-button"
              >
                Explore More
              </Link>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}