import React from 'react';
import { Activity, ShieldCheck, Zap, Truck } from 'lucide-react';

export const Features: React.FC = () => {
  const featuresList = [
    {
      icon: <Zap className="feat-icon" size={24} />,
      title: "Biomechanical Fit",
      desc: "Every silhouette is mapped and tested under load to ensure it supports the body's natural motion."
    },
    {
      icon: <ShieldCheck className="feat-icon" size={24} />,
      title: "The 30-Day Trail Guarantee",
      desc: "Put our gear through its paces. Run, lift, or stretch. If it does not perform to your standards, return it."
    },
    {
      icon: <Activity className="feat-icon" size={24} />,
      title: "Hydrophobic Weave",
      desc: "Engineered from long-staple yarns that repel sweat, ensuring lightweight thermal stability."
    },
    {
      icon: <Truck className="feat-icon" size={24} />,
      title: "Signature Shipping",
      desc: "Express home delivery is complimentary on all registry orders exceeding $150."
    }
  ];

  return (
    <section className="section features-section">
      <div className="container">
        <h2 className="section-title">THE APEX STANDARD</h2>
        <p className="section-subtitle">
          Building high-integrity sportswear and equipment designed for athletes who value durability and clean aesthetic.
        </p>

        <div className="features-grid">
          {featuresList.map((feat, index) => (
            <div key={index} className="feature-card">
              <div className="feat-icon-container">
                {feat.icon}
              </div>
              <h3 className="feat-title">{feat.title}</h3>
              <p className="feat-desc">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Embedded CSS for Features */}
      <style>{`
        .features-section {
          background-color: var(--bg-primary);
          border-bottom: 1px solid var(--border-color);
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2.5rem;
        }

        @media (max-width: 1024px) {
          .features-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 576px) {
          .features-grid {
            grid-template-columns: 1fr;
          }
        }

        .feature-card {
          padding: 2rem 0;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        .feat-icon-container {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          color: var(--accent-primary);
          border: 1px solid var(--border-color);
          background-color: var(--bg-secondary);
        }

        .feat-icon {
          stroke-width: 1.5;
        }

        .feat-title {
          font-family: var(--font-body);
          font-size: 0.9rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.75rem;
          color: var(--text-primary);
        }

        .feat-desc {
          color: var(--text-secondary);
          font-size: 0.85rem;
          line-height: 1.6;
          font-weight: 400;
        }
      `}</style>
    </section>
  );
};
