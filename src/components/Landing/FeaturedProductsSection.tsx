import React from 'react';
import { useShop } from '../../context/ShopContext';
import { ProductCard } from '../Product/ProductCard';

export const FeaturedProductsSection: React.FC = () => {
  const { productsList } = useShop();

  // Pick first 4 featured items
  const featured = productsList.filter(p => p.isFeatured).slice(0, 4);
  
  // Pick latest items (non-featured or remaining catalog items)
  const latest = productsList.filter(p => !p.isFeatured).slice(0, 4);

  return (
    <section className="section featured-products-section">
      <div className="container">
        
        {/* Featured Segment */}
        <div className="product-block-wrapper">
          <h2 className="editorial-block-title">Featured Gear</h2>
          <div className="editorial-title-divider"></div>
          <div className="landing-products-grid">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Latest Segment */}
        <div className="product-block-wrapper">
          <h2 className="editorial-block-title">Latest Arrivals</h2>
          <div className="editorial-title-divider"></div>
          <div className="landing-products-grid">
            {latest.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

      </div>

      {/* Embedded CSS for FeaturedProductsSection */}
      <style>{`
        .featured-products-section {
          background-color: var(--bg-primary);
          padding-top: 4rem;
        }

        .product-block-wrapper {
          margin-bottom: 6rem;
        }

        .product-block-wrapper:last-child {
          margin-bottom: 2rem;
        }

        .editorial-block-title {
          font-family: var(--font-heading);
          font-size: 2rem;
          font-weight: 800;
          letter-spacing: -0.01em;
          color: var(--text-primary);
          text-align: center;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
        }

        .editorial-title-divider {
          width: 40px;
          height: 2px;
          background-color: var(--accent-primary);
          margin: 0 auto 3.5rem;
        }

        .landing-products-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }

        @media (max-width: 1200px) {
          .landing-products-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 900px) {
          .landing-products-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 576px) {
          .landing-products-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};
