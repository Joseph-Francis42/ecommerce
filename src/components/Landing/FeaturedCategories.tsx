import React from 'react';

export const FeaturedCategories: React.FC = () => {
  return (
    <div className="categories-row-section">
      <div className="container">
        <div className="categories-row">
          <div className="category-row-col">
            <img 
              src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop" 
              alt="Apparel Department Showcase" 
            />
            <div className="category-label-overlay">Apparel</div>
          </div>
          <div className="category-row-col shoe-highlight">
            <img 
              src="./shoes-product.png" 
              alt="Footwear Department Showcase" 
              className="featured-cat-shoe"
            />
            <div className="category-label-overlay">Footwear</div>
          </div>
          <div className="category-row-col">
            <img 
              src="https://images.unsplash.com/photo-1592432678016-e910b452f9a2?q=80&w=600&auto=format&fit=crop" 
              alt="Gear Department Showcase" 
            />
            <div className="category-label-overlay">Equipment</div>
          </div>
        </div>
      </div>

      {/* Embedded CSS for FeaturedCategories */}
      <style>{`
        .categories-row-section {
          padding: 5rem 0 2rem;
          background-color: var(--bg-primary);
        }

        .categories-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        @media (max-width: 768px) {
          .categories-row {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }

        .category-row-col {
          position: relative;
          border: 1px solid var(--border-color);
          overflow: hidden;
          height: 320px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          background-color: var(--bg-secondary);
        }

        .category-row-col img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform var(--transition-slow);
        }

        .category-row-col.shoe-highlight {
          padding: 2.5rem;
        }

        .category-row-col.shoe-highlight img {
          object-fit: contain;
          transform: rotate(-5deg);
        }

        .category-row-col:hover img {
          transform: scale(1.04);
        }

        .category-row-col.shoe-highlight:hover img {
          transform: translateY(-5px) rotate(-8deg) scale(1.05);
        }

        .category-label-overlay {
          position: absolute;
          bottom: 1.5rem;
          left: 1.5rem;
          background-color: var(--bg-primary);
          color: var(--text-primary);
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 0.5rem 1.25rem;
          border: 1px solid var(--border-color);
          z-index: 2;
        }
      `}</style>
    </div>
  );
};
