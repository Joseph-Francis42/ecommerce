import React from 'react';
import { useShop } from '../../context/ShopContext';
import { Sparkles, ArrowRight } from 'lucide-react';

export const PromoSection: React.FC = () => {
  const { setCurrentView, setSelectedCategory } = useShop();

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCurrentView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categories = [
    {
      name: 'Apparel',
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=500&auto=format&fit=crop',
      desc: 'Activewear, windbreakers, and compression sets'
    },
    {
      name: 'Footwear',
      image: './shoes-product.png', // custom shoes
      desc: 'Carbon running shoes, trail runners, and training kicks'
    },
    {
      name: 'Gear',
      image: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?q=80&w=500&auto=format&fit=crop',
      desc: 'Rackets, premium yoga mats, and home dumbbells'
    },
    {
      name: 'Tech',
      image: './watch-product.png', // custom watch
      desc: 'Fitness tracking watches and noise-cancelling earbuds'
    }
  ];

  return (
    <section className="section promo-section">
      <div className="container">
        
        {/* Banner Section */}
        <div className="promo-banner-container">
          <div className="promo-banner-content">
            <div className="promo-accent-badge">
              <Sparkles size={12} />
              <span>MEMBERS PRIVILEGE</span>
            </div>
            
            <h2 className="promo-banner-title">Members Enjoy 20% Off</h2>
            
            <p className="promo-banner-subtitle">
              Apply code <strong className="promo-code-highlight">APEX20</strong> at checkout to save 20% off all seasonal apparel, carbon footwear, and training gear.
            </p>
            
            <button 
              className="btn btn-primary"
              onClick={() => handleCategorySelect('All')}
            >
              Shop Registry <ArrowRight size={14} />
            </button>
          </div>
          
          <div className="promo-banner-visual">
            <img 
              src="https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=600&auto=format&fit=crop" 
              alt="APEX running windbreaker showcase"
              className="promo-banner-img"
            />
          </div>
        </div>

        {/* Category Grids */}
        <div className="category-browse-section">
          <h3 className="category-browse-title">Shop by Department</h3>
          
          <div className="categories-grid">
            {categories.map((cat) => (
              <div 
                key={cat.name} 
                className="category-card"
                onClick={() => handleCategorySelect(cat.name)}
              >
                <div className="category-card-img-wrapper">
                  <img src={cat.image} alt={cat.name} className="category-card-img" />
                  <div className="category-card-overlay"></div>
                </div>
                
                <div className="category-card-content">
                  <h4 className="category-card-name">{cat.name}</h4>
                  <p className="category-card-desc">{cat.desc}</p>
                  
                  <span className="category-card-link">
                    Explore Department <ArrowRight size={12} className="cat-arrow" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Embedded CSS for PromoSection */}
      <style>{`
        .promo-section {
          background-color: var(--bg-secondary);
          border-bottom: 1px solid var(--border-color);
        }

        /* Banner styling */
        .promo-banner-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: var(--bg-primary);
          border-radius: var(--border-radius-md);
          overflow: hidden;
          margin-bottom: 7rem;
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-sm);
        }

        @media (max-width: 768px) {
          .promo-banner-container {
            flex-direction: column;
          }
        }

        .promo-banner-content {
          padding: 4rem;
          flex: 1.2;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        @media (max-width: 576px) {
          .promo-banner-content {
            padding: 2rem;
          }
        }

        .promo-accent-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          padding: 0.4rem 0.8rem;
          font-family: var(--font-body);
          font-size: 0.7rem;
          font-weight: 600;
          color: var(--accent-secondary);
          margin-bottom: 1.5rem;
          letter-spacing: 0.05em;
        }

        .promo-banner-title {
          font-family: var(--font-heading);
          font-size: 2.8rem;
          font-weight: 400;
          margin-bottom: 1rem;
          line-height: 1.1;
        }

        @media (max-width: 576px) {
          .promo-banner-title {
            font-size: 2.2rem;
          }
        }

        .promo-banner-subtitle {
          color: var(--text-secondary);
          margin-bottom: 2rem;
          font-size: 1rem;
          line-height: 1.6;
        }

        .promo-code-highlight {
          color: var(--accent-primary);
          font-weight: 700;
          background-color: var(--bg-secondary);
          padding: 0.1rem 0.4rem;
          border: 1px solid var(--border-color);
          letter-spacing: 0.05em;
        }

        .promo-banner-visual {
          flex: 0.8;
          height: 100%;
          align-self: stretch;
          min-height: 350px;
          overflow: hidden;
          border-left: 1px solid var(--border-color);
        }

        @media (max-width: 768px) {
          .promo-banner-visual {
            border-left: none;
            border-top: 1px solid var(--border-color);
            width: 100%;
          }
        }

        .promo-banner-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform var(--transition-slow);
        }

        .promo-banner-container:hover .promo-banner-img {
          transform: scale(1.03);
        }

        /* Categories Section */
        .category-browse-title {
          font-family: var(--font-heading);
          font-size: 2rem;
          font-weight: 400;
          text-align: center;
          margin-bottom: 3.5rem;
        }

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        @media (max-width: 968px) {
          .categories-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 576px) {
          .categories-grid {
            grid-template-columns: 1fr;
          }
        }

        .category-card {
          position: relative;
          background-color: var(--bg-primary);
          overflow: hidden;
          height: 400px;
          cursor: pointer;
          border: 1px solid var(--border-color);
          transition: all var(--transition-normal);
        }

        .category-card-img-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .category-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform var(--transition-slow);
        }

        .category-card-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to top,
            rgba(27, 26, 24, 0.9) 15%,
            rgba(27, 26, 24, 0.4) 55%,
            rgba(27, 26, 24, 0.05) 100%
          );
        }

        .category-card-content {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 2rem;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        .category-card:hover {
          border-color: var(--text-primary);
          box-shadow: var(--shadow-md);
        }

        .category-card:hover .category-card-img {
          transform: scale(1.04);
        }

        .category-card-name {
          font-family: var(--font-heading);
          font-size: 1.8rem;
          font-weight: 400;
          margin-bottom: 0.35rem;
          color: #ffffff;
        }

        .category-card-desc {
          color: #cbc6ba;
          font-size: 0.8rem;
          margin-bottom: 1.25rem;
          line-height: 1.5;
          height: 0;
          opacity: 0;
          overflow: hidden;
          transition: all var(--transition-normal);
        }

        .category-card:hover .category-card-desc {
          height: 48px;
          opacity: 1;
        }

        .category-card-link {
          font-family: var(--font-body);
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--accent-secondary);
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
        }

        .cat-arrow {
          transition: transform var(--transition-fast);
        }

        .category-card:hover .cat-arrow {
          transform: translateX(3px);
        }
      `}</style>
    </section>
  );
};
