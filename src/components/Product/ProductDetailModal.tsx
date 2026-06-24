import React, { useState, useEffect } from 'react';
import { useShop } from '../../context/ShopContext';
import { X, Star, Plus, Minus, ShieldCheck, RefreshCw, ShoppingBag } from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const { activeProductDetail, setActiveProductDetail, addToCart } = useShop();

  // If no product is active, don't render anything
  if (!activeProductDetail) return null;

  const product = activeProductDetail;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : '');
  const [selectedColor, setSelectedColor] = useState(product.colors ? product.colors[0] : undefined);
  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState(false);

  // Reset local state when active product changes
  useEffect(() => {
    setActiveImageIndex(0);
    setSelectedSize(product.sizes ? product.sizes[0] : '');
    setSelectedColor(product.colors ? product.colors[0] : undefined);
    setQuantity(1);
    setAddedMessage(false);
  }, [product]);

  // Prevent scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => Math.max(1, prev - 1));

  const handleAddToCart = () => {
    if (!product.inStock) return;
    addToCart(product, quantity, selectedSize, selectedColor);
    setAddedMessage(true);
    setTimeout(() => {
      setAddedMessage(false);
      setActiveProductDetail(null); // Auto-close modal after adding
    }, 1200);
  };

  return (
    <div className="modal-backdrop animate-fade-in" onClick={() => setActiveProductDetail(null)}>
      <div 
        className="modal-container glass animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button className="modal-close-btn" onClick={() => setActiveProductDetail(null)}>
          <X size={18} />
        </button>

        <div className="modal-content-split">
          
          {/* Left Side: Images */}
          <div className="modal-images-column">
            <div className="main-image-wrapper">
              <img 
                src={product.images[activeImageIndex]} 
                alt={product.name} 
                className="main-image" 
              />
            </div>
            
            {/* Thumbnail list */}
            {product.images.length > 1 && (
              <div className="thumbnail-list">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    className={`thumb-btn ${idx === activeImageIndex ? 'active' : ''}`}
                    onClick={() => setActiveImageIndex(idx)}
                  >
                    <img src={img} alt={`${product.name} thumb ${idx}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Side: Product Details */}
          <div className="modal-details-column">
            <span className="details-category">{product.category}</span>
            <h2 className="details-title">{product.name}</h2>
            <p className="details-tagline">{product.tagline}</p>

            {/* Rating */}
            <div className="details-rating-container">
              <div className="rating-stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    size={12} 
                    className={i < Math.floor(product.rating) ? 'star-icon-filled' : 'star-icon-empty'} 
                  />
                ))}
              </div>
              <span className="rating-text">
                {product.rating} &mdash; ({product.reviewsCount} verified reviews)
              </span>
            </div>

            {/* Price */}
            <div className="details-price-container">
              <span className="details-price">${product.price}</span>
              {product.originalPrice && (
                <span className="details-original-price">${product.originalPrice}</span>
              )}
            </div>

            <p className="details-description">{product.description}</p>

            {/* Option: Colors */}
            {product.colors && (
              <div className="selector-group">
                <span className="selector-label">Colour Options: {selectedColor?.name}</span>
                <div className="color-dots-container">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      className={`color-dot-btn ${selectedColor?.name === c.name ? 'active' : ''}`}
                      style={{ '--color-hex': c.hex } as React.CSSProperties}
                      onClick={() => setSelectedColor(c)}
                      aria-label={`Select color ${c.name}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Option: Sizes */}
            {product.sizes && (
              <div className="selector-group">
                <span className="selector-label">Select Size:</span>
                <div className="size-buttons-container">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      className={`size-btn ${selectedSize === s ? 'active' : ''}`}
                      onClick={() => setSelectedSize(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Technical Specs List */}
            <div className="details-specs-container">
              <span className="selector-label">Specifications:</span>
              <ul className="details-specs-list">
                {product.specs.map((spec, idx) => (
                  <li key={idx}>{spec}</li>
                ))}
              </ul>
            </div>

            {/* Action Bar: Quantity & Add to Cart */}
            <div className="details-action-bar">
              {product.inStock ? (
                <>
                  <div className="quantity-selector">
                    <button className="quantity-btn" onClick={handleDecrement}>
                      <Minus size={14} />
                    </button>
                    <span className="quantity-value">{quantity}</span>
                    <button className="quantity-btn" onClick={handleIncrement}>
                      <Plus size={14} />
                    </button>
                  </div>

                  <button 
                    className={`btn btn-primary details-cart-btn ${addedMessage ? 'success' : ''}`}
                    onClick={handleAddToCart}
                    disabled={addedMessage}
                  >
                    {addedMessage ? (
                      <>Added to Bag</>
                    ) : (
                      <>
                        <ShoppingBag size={14} /> Add to Bag
                      </>
                    )}
                  </button>
                </>
              ) : (
                <button className="btn btn-secondary details-cart-btn disabled" disabled>
                  Out of Stock
                </button>
              )}
            </div>

            {/* Value Highlights */}
            <div className="details-highlights">
              <div className="highlight-item">
                <ShieldCheck size={14} className="highlight-icon" />
                <span>30-Day Trail Guarantee</span>
              </div>
              <div className="highlight-item">
                <RefreshCw size={14} className="highlight-icon" />
                <span>Complimentary Express Shipping over $150</span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Embedded CSS for ProductDetailModal */}
      <style>{`
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(28, 27, 24, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 2rem;
        }

        @media (max-width: 768px) {
          .modal-backdrop {
            padding: 1rem;
          }
        }

        .modal-container {
          width: 100%;
          max-width: 960px;
          max-height: 90vh;
          border-radius: var(--border-radius-sm);
          border: 1px solid var(--border-color);
          background-color: var(--bg-primary);
          overflow-y: auto;
          position: relative;
          padding: 3rem;
        }

        @media (max-width: 968px) {
          .modal-container {
            padding: 2rem;
          }
        }

        .modal-close-btn {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          width: 32px;
          height: 32px;
          border-radius: var(--border-radius-sm);
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
          transition: all var(--transition-fast);
          z-index: 10;
        }

        .modal-close-btn:hover {
          border-color: var(--text-primary);
        }

        .modal-content-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
        }

        @media (max-width: 768px) {
          .modal-content-split {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        /* Images Column */
        .modal-images-column {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .main-image-wrapper {
          border-radius: var(--border-radius-sm);
          overflow: hidden;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          position: relative;
          padding-top: 100%;
        }

        .main-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .thumbnail-list {
          display: flex;
          gap: 0.5rem;
          overflow-x: auto;
        }

        .thumb-btn {
          width: 64px;
          height: 64px;
          border-radius: var(--border-radius-sm);
          overflow: hidden;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          flex-shrink: 0;
          transition: all var(--transition-fast);
        }

        .thumb-btn img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .thumb-btn:hover, .thumb-btn.active {
          border-color: var(--text-primary);
        }

        /* Details Column */
        .modal-details-column {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        .details-category {
          color: var(--text-muted);
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 0.5rem;
        }

        .details-title {
          font-family: var(--font-heading);
          font-size: 2.4rem;
          font-weight: 400;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
          line-height: 1.15;
          letter-spacing: -0.01em;
        }

        .details-tagline {
          color: var(--accent-secondary);
          font-family: var(--font-body);
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 1rem;
        }

        .details-rating-container {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1.25rem;
        }

        .rating-stars {
          display: flex;
          gap: 0.1rem;
        }

        .star-icon-filled {
          color: var(--accent-secondary);
          fill: var(--accent-secondary);
        }

        .star-icon-empty {
          color: var(--border-color);
        }

        .rating-text {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .details-price-container {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .details-price {
          font-family: var(--font-body);
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .details-original-price {
          font-size: 0.95rem;
          color: var(--text-muted);
          text-decoration: line-through;
        }

        .details-description {
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        /* Option selectors */
        .selector-group {
          margin-bottom: 1.5rem;
          width: 100%;
        }

        .selector-label {
          display: block;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
          letter-spacing: 0.08em;
        }

        .color-dots-container {
          display: flex;
          gap: 0.5rem;
        }

        .color-dot-btn {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background-color: var(--color-hex);
          border: 1px solid var(--border-color);
          transition: all var(--transition-fast);
          padding: 0;
        }

        .color-dot-btn.active {
          box-shadow: 0 0 0 2px var(--bg-primary), 0 0 0 3px var(--text-primary);
        }

        .size-buttons-container {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        .size-btn {
          padding: 0.45rem 1rem;
          border-radius: var(--border-radius-sm);
          border: 1px solid var(--border-color);
          background: transparent;
          color: var(--text-primary);
          font-size: 0.8rem;
          font-weight: 500;
          transition: all var(--transition-fast);
        }

        .size-btn:hover {
          border-color: var(--text-primary);
        }

        .size-btn.active {
          color: #ffffff;
          background: var(--accent-primary);
          border-color: transparent;
        }

        .details-specs-container {
          width: 100%;
          margin-bottom: 2rem;
          border-top: 1px solid var(--border-color);
          padding-top: 1.5rem;
        }

        .details-specs-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .details-specs-list li {
          font-size: 0.8rem;
          color: var(--text-secondary);
          position: relative;
          padding-left: 1rem;
        }

        .details-specs-list li::before {
          content: '•';
          position: absolute;
          left: 0;
          color: var(--accent-secondary);
        }

        /* Action block */
        .details-action-bar {
          display: flex;
          gap: 1rem;
          width: 100%;
          margin-bottom: 2rem;
          border-top: 1px solid var(--border-color);
          padding-top: 1.5rem;
        }

        @media (max-width: 480px) {
          .details-action-bar {
            flex-direction: column;
          }
        }

        .quantity-selector {
          display: flex;
          align-items: center;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius-sm);
        }

        .quantity-btn {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          transition: all var(--transition-fast);
        }

        .quantity-btn:hover {
          color: var(--text-primary);
        }

        .quantity-value {
          width: 32px;
          text-align: center;
          font-weight: 700;
          font-size: 0.9rem;
        }

        .details-cart-btn {
          flex: 1;
          height: 42px;
        }

        .details-cart-btn.success {
          background: #f1ebd9;
          color: var(--accent-primary);
          border-color: var(--border-color);
        }

        .details-highlights {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          width: 100%;
          border-top: 1px solid var(--border-color);
          padding-top: 1.5rem;
        }

        .highlight-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .highlight-icon {
          color: var(--accent-primary);
        }
      `}</style>
    </div>
  );
};
