import React from 'react';

export const Brands: React.FC = () => {
  const brands = [
    "VALENCE SPEED",
    "KINETIC LABS",
    "ENDURE CLUB",
    "VELOCE SPORTS",
    "CHRONOS RUN"
  ];

  return (
    <div className="brands-logo-section">
      <div className="container">
        <div className="brands-grid">
          {brands.map((b, idx) => (
            <div key={idx} className="brand-logo-item">
              {b}
            </div>
          ))}
        </div>
      </div>

      {/* Embedded CSS for Brands */}
      <style>{`
        .brands-logo-section {
          padding: 4rem 0;
          background-color: var(--bg-primary);
          border-bottom: 1px solid var(--border-color);
        }

        .brands-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 2rem;
          align-items: center;
        }

        @media (max-width: 768px) {
          .brands-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .brands-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .brand-logo-item {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-muted);
          text-align: center;
          letter-spacing: 0.15em;
          user-select: none;
          transition: color var(--transition-fast);
        }

        .brand-logo-item:hover {
          color: var(--text-primary);
        }
      `}</style>
    </div>
  );
};
