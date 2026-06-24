import React, { useState } from 'react';
import type { Product } from '../../data/products';
import { useShop } from '../../context/ShopContext';
import { Star, ShoppingBag, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, setActiveProductDetail } = useShop();
  const [hovered, setHovered] = useState(false);

  const displayImage = hovered && product.images[1] ? product.images[1] : product.images[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product.inStock) return;
    
    // Add default options if available
    const defaultSize = product.sizes ? product.sizes[0] : undefined;
    const defaultColor = product.colors ? product.colors[0] : undefined;
    addToCart(product, 1, defaultSize, defaultColor);
  };

  return (
    <div 
      className="product-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setActiveProductDetail(product)}
    >
      {/* Product Image */}
      <div className="product-card-img-container">
        <img 
          src={displayImage} 
          alt={product.name} 
          className="product-card-img" 
        />
        
        {/* Badges on image */}
        <div className="product-card-badges">
          {!product.inStock && (
            <span className="badge badge-out-of-stock">Sold Out</span>
          )}
          {product.originalPrice && product.inStock && (
            <span className="badge badge-sale">Archive Sale</span>
          )}
        </div>

        {/* Hover Action Layer */}
        <div className="product-card-hover-actions">
          <button 
            className="card-action-btn"
            aria-label="View Details"
            onClick={(e) => {
              e.stopPropagation();
              setActiveProductDetail(product);
            }}
          >
            <Eye size={16} />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="product-card-info">
        <div className="product-card-meta">
          <span className="product-card-category">{product.category}</span>
          <div className="product-card-rating">
            <Star size={10} className="star-icon-filled" />
            <span>{product.rating}</span>
          </div>
        </div>
        
        <h4 className="product-card-title">{product.name}</h4>
        <p className="product-card-tagline">{product.tagline}</p>

        <div className="product-card-bottom">
          <div className="product-card-price-container">
            <span className="product-price">${product.price}</span>
            {product.originalPrice && (
              <span className="product-original-price">${product.originalPrice}</span>
            )}
          </div>

          <button 
            className={`quick-add-btn ${!product.inStock ? 'disabled' : ''}`}
            disabled={!product.inStock}
            onClick={handleQuickAdd}
            aria-label="Quick Add to Cart"
          >
            <ShoppingBag size={14} />
          </button>
        </div>
      </div>

      {/* Embedded CSS for ProductCard */}
      <style>{`
        .product-card {
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          overflow: hidden;
          cursor: pointer;
          transition: all var(--transition-normal);
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .product-card:hover {
          border-color: var(--text-primary);
          box-shadow: var(--shadow-md);
        }

        .product-card-img-container {
          position: relative;
          width: 100%;
          padding-top: 100%; /* 1:1 Aspect Ratio */
          overflow: hidden;
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border-color);
        }

        .product-card-img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform var(--transition-slow);
        }

        .product-card:hover .product-card-img {
          transform: scale(1.02);
        }

        .product-card-badges {
          position: absolute;
          top: 0.75rem;
          left: 0.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          z-index: 2;
        }

        .badge-out-of-stock {
          background: var(--bg-primary);
          color: var(--text-muted);
          border: 1px solid var(--border-color);
          font-size: 0.65rem;
        }

        .badge-sale {
          background: #f1ebd9;
          color: var(--accent-secondary);
          border: 1px solid var(--border-color);
          font-size: 0.65rem;
        }

        .product-card-hover-actions {
          position: absolute;
          bottom: 0.75rem;
          right: 0.75rem;
          display: flex;
          gap: 0.4rem;
          opacity: 0;
          transform: translateY(4px);
          transition: all var(--transition-fast);
          z-index: 2;
        }

        .product-card:hover .product-card-hover-actions {
          opacity: 1;
          transform: translateY(0);
        }

        .card-action-btn {
          width: 32px;
          height: 32px;
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
          transition: all var(--transition-fast);
        }

        .card-action-btn:hover {
          border-color: var(--text-primary);
        }

        .product-card-info {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          text-align: left;
        }

        .product-card-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.4rem;
        }

        .product-card-category {
          color: var(--text-muted);
          font-size: 0.7rem;
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.08em;
        }

        .product-card-rating {
          display: flex;
          align-items: center;
          gap: 0.2rem;
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .star-icon-filled {
          color: var(--accent-secondary);
          fill: var(--accent-secondary);
        }

        .product-card-title {
          font-family: var(--font-heading);
          font-size: 1.35rem;
          font-weight: 400;
          margin-bottom: 0.25rem;
          color: var(--text-primary);
          letter-spacing: -0.01em;
        }

        .product-card-tagline {
          color: var(--text-secondary);
          font-size: 0.8rem;
          margin-bottom: 1.25rem;
          line-height: 1.4;
          flex-grow: 1;
        }

        .product-card-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
          border-top: 1px solid rgba(0, 0, 0, 0.02);
          padding-top: 0.75rem;
        }

        .product-card-price-container {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .product-price {
          font-family: var(--font-body);
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .product-original-price {
          font-size: 0.8rem;
          color: var(--text-muted);
          text-decoration: line-through;
        }

        .quick-add-btn {
          width: 34px;
          height: 34px;
          background: transparent;
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
          transition: all var(--transition-fast);
        }

        .quick-add-btn:hover:not(.disabled) {
          background: var(--accent-primary);
          color: #ffffff;
          border-color: transparent;
        }

        .quick-add-btn.disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};
