import React from 'react';
import { useShop } from '../../context/ShopContext';
import { ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const { setCurrentView } = useShop();

  return (
    <section className="hero-section">
      <div className="container hero-split-container">
        
        {/* Left Column: Transparent Product Shot */}
        <div className="hero-photo-col animate-fade-in">
          <div className="hero-transparent-img-box">
            <img 
              src="./shoes-product.png" 
              alt="Apex Velocity Carbon-Plated Running Shoes" 
              className="hero-display-img-transparent"
            />
            
            {/* Curated Stamp / Sticker */}
            <div className="hero-curated-stamp-left">
              <span className="stamp-num">DEP.01</span>
              <span className="stamp-text">APEX HIGH PERFORMANCE OUTSOLE</span>
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Content */}
        <div className="hero-editorial-col animate-slide-up">
          <div className="hero-club-tag">APEX ATHLETIC CLUB &mdash; ACTIVEWEAR & GEAR</div>
          
          <h1 className="hero-title">
            The Discipline of <span>Velocity</span>
          </h1>
          
          <p className="hero-subtitle">
            Fine athletic apparel and precision equipment engineered to break boundaries. We combine specialized bio-foam geometry with high-rebound materials to optimize kinetic output.
          </p>

          <div className="hero-actions">
            <button 
              className="btn btn-primary hero-btn"
              onClick={() => setCurrentView('catalog')}
            >
              Browse Registry <ArrowRight size={14} />
            </button>
            <button 
              className="btn btn-secondary hero-btn"
              onClick={() => setCurrentView('catalog')}
            >
              Our Heritage
            </button>
          </div>
        </div>

      </div>

      {/* Embedded CSS for Hero */}
      <style>{`
        .hero-section {
          background-color: var(--bg-primary);
          padding: 6rem 0;
          display: flex;
          align-items: center;
          border-bottom: 1px solid var(--border-color);
        }

        .hero-split-container {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 5rem;
          align-items: center;
        }

        @media (max-width: 968px) {
          .hero-split-container {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .hero-photo-col {
            order: -1; /* Display image first on mobile viewports */
          }
        }

        .hero-editorial-col {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        .hero-club-tag {
          font-family: var(--font-body);
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--accent-secondary);
          margin-bottom: 1.5rem;
        }

        .hero-title {
          font-family: var(--font-heading);
          font-size: 4.4rem;
          font-weight: 800;
          line-height: 1.05;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
          letter-spacing: -0.02em;
          text-transform: uppercase;
        }

        .hero-title span {
          color: var(--accent-secondary);
        }

        @media (max-width: 1200px) {
          .hero-title {
            font-size: 3.8rem;
          }
        }

        @media (max-width: 576px) {
          .hero-title {
            font-size: 2.8rem;
          }
        }

        .hero-subtitle {
          font-size: 0.95rem;
          font-weight: 400;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 2.5rem;
          max-width: 540px;
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
        }

        @media (max-width: 480px) {
          .hero-actions {
            flex-direction: column;
            width: 100%;
          }
          .hero-actions button {
            width: 100%;
          }
        }

        /* Photo Column */
        .hero-photo-col {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .hero-transparent-img-box {
          position: relative;
          width: 100%;
          max-width: 450px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-display-img-transparent {
          width: 100%;
          max-height: 380px;
          object-fit: contain;
          transition: transform var(--transition-slow);
          transform: rotate(-4deg);
        }

        .hero-transparent-img-box:hover .hero-display-img-transparent {
          transform: translateY(-8px) rotate(-6deg) scale(1.02);
        }

        /* Curated Stamp Sticker */
        .hero-curated-stamp-left {
          position: absolute;
          bottom: 0;
          left: 0;
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          padding: 0.5rem 0.75rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          line-height: 1.2;
          font-family: var(--font-body);
          box-shadow: var(--shadow-sm);
        }

        .stamp-num {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: 0.05em;
        }

        .stamp-text {
          font-size: 0.55rem;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
      `}</style>
    </section>
  );
};
