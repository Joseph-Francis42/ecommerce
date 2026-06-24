import React from 'react';
import { useShop } from '../../context/ShopContext';

export const ExclusiveOffer: React.FC = () => {
  const { productsList, setActiveProductDetail } = useShop();

  // Find the watch product
  const watchProduct = productsList.find((p) => p.id === 'apex-chrono-gps');

  const handleBuyNow = () => {
    if (watchProduct) {
      setActiveProductDetail(watchProduct);
    }
  };

  return (
    <div className="exclusive-offer-section">
      <div className="container">
        <div className="exclusive-row">
          
          {/* Left Column: Image */}
          <div className="exclusive-col-img animate-fade-in">
            <img 
              src="./watch-product.png" 
              alt="Exclusive Smart Watch Apex Chrono" 
              className="exclusive-img"
            />
          </div>

          {/* Right Column: Copy details */}
          <div className="exclusive-col-content text-left">
            <p className="exclusive-label">Exclusively Available on APEX Athletics</p>
            <h2 className="exclusive-title">Apex Chrono GPS</h2>
            <p className="exclusive-description">
              The Apex Chrono sports smartwatch features a 1.4" sapphire screen and a grade 5 titanium bezel. Track dual-frequency GPS coordinates, heart-rate metrics, sleep scores, and recovery indices, with up to 14 days of battery life.
            </p>
            <button 
              className="btn btn-primary exclusive-btn"
              onClick={handleBuyNow}
            >
              Buy Now &nbsp; &#8594;
            </button>
          </div>

        </div>
      </div>

      {/* Embedded CSS for ExclusiveOffer */}
      <style>{`
        .exclusive-offer-section {
          background-color: var(--bg-secondary);
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
          padding: 6rem 0;
        }

        .exclusive-row {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 5rem;
          align-items: center;
        }

        @media (max-width: 768px) {
          .exclusive-row {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
        }

        .exclusive-col-img {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .exclusive-img {
          max-width: 100%;
          max-height: 420px;
          object-fit: contain;
          border: 1px solid var(--border-color);
          background-color: var(--bg-primary);
          padding: 1.5rem;
          border-radius: var(--border-radius-sm);
          box-shadow: var(--shadow-md);
          transition: transform var(--transition-slow);
        }

        .exclusive-col-img:hover .exclusive-img {
          transform: scale(1.02) rotate(1deg);
        }

        .exclusive-col-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        .exclusive-label {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--accent-secondary);
          letter-spacing: 0.1em;
          margin-bottom: 1rem;
        }

        .exclusive-title {
          font-family: var(--font-heading);
          font-size: 3rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
          line-height: 1.1;
          text-transform: uppercase;
          letter-spacing: -0.02em;
        }

        @media (max-width: 576px) {
          .exclusive-title {
            font-size: 2.2rem;
          }
        }

        .exclusive-description {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 2.5rem;
          font-weight: 400;
        }

        .exclusive-btn {
          min-width: 160px;
        }
      `}</style>
    </div>
  );
};
