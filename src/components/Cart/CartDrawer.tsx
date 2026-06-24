import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { X, Trash2, Plus, Minus, CreditCard, Sparkles, AlertCircle } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    checkoutSubtotal,
    checkoutDiscount,
    checkoutTotal,
    setCurrentView
  } = useShop();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState(false);
  const [promoSuccess, setPromoSuccess] = useState(false);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError(false);
    setPromoSuccess(false);

    if (promoInput.trim()) {
      const success = applyPromoCode(promoInput);
      if (success) {
        setPromoSuccess(true);
        setPromoInput('');
      } else {
        setPromoError(true);
      }
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setCurrentView('checkout');
  };

  const shippingCost = checkoutSubtotal > 150 || checkoutSubtotal === 0 ? 0 : 10;

  return (
    <div className="cart-backdrop animate-fade-in" onClick={() => setIsCartOpen(false)}>
      <div 
        className="cart-drawer-container glass animate-slide-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="cart-drawer-header">
          <h3 className="cart-drawer-title">Shopping Bag</h3>
          <button className="cart-drawer-close-btn" onClick={() => setIsCartOpen(false)}>
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="cart-drawer-content">
          {cart.length > 0 ? (
            <>
              {/* Cart Items List */}
              <div className="cart-items-list">
                {cart.map((item) => (
                  <div key={item.id} className="cart-item-card">
                    <img 
                      src={item.product.images[0]} 
                      alt={item.product.name} 
                      className="cart-item-img" 
                    />
                    
                    <div className="cart-item-details">
                      <h4 className="cart-item-name">{item.product.name}</h4>
                      
                      <p className="cart-item-options">
                        {item.selectedSize && `Size: ${item.selectedSize}`}
                        {item.selectedSize && item.selectedColor && ' | '}
                        {item.selectedColor && `Color: ${item.selectedColor.name}`}
                      </p>
                      
                      <div className="cart-item-price">${item.product.price}</div>
                      
                      <div className="cart-item-operations">
                        <div className="cart-quantity-selector">
                          <button 
                            className="cart-qty-btn"
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus size={10} />
                          </button>
                          <span className="cart-qty-val">{item.quantity}</span>
                          <button 
                            className="cart-qty-btn"
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus size={10} />
                          </button>
                        </div>
                        
                        <button 
                          className="cart-remove-btn"
                          onClick={() => removeFromCart(item.id)}
                          aria-label="Remove item"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo code entry */}
              <div className="cart-promo-section">
                {appliedPromo ? (
                  <div className="promo-applied-badge">
                    <div className="promo-applied-info">
                      <Sparkles size={12} className="promo-sparkle" />
                      <span>Code <strong>{appliedPromo.code}</strong> (20% Off)</span>
                    </div>
                    <button className="promo-remove-btn" onClick={removePromoCode}>
                      Remove
                    </button>
                  </div>
                ) : (
                  <form className="promo-form" onSubmit={handleApplyPromo}>
                    <input
                      type="text"
                      placeholder="PROMO CODE"
                      value={promoInput}
                      onChange={(e) => {
                        setPromoInput(e.target.value);
                        setPromoError(false);
                      }}
                      className="promo-input"
                    />
                    <button type="submit" className="promo-submit-btn">
                      Apply
                    </button>
                  </form>
                )}
                {promoError && (
                  <p className="promo-msg error-msg">
                    <AlertCircle size={10} /> Invalid code. Use code <strong>APEX20</strong>
                  </p>
                )}
                {promoSuccess && (
                  <p className="promo-msg success-msg">Discount applied.</p>
                )}
              </div>

              {/* Cost breakdown summary */}
              <div className="cart-summary-section">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${checkoutSubtotal.toFixed(2)}</span>
                </div>
                {checkoutDiscount > 0 && (
                  <div className="summary-row discount">
                    <span>Discount (20%)</span>
                    <span>-${checkoutDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                {shippingCost > 0 && (
                  <p className="shipping-hint">Spend ${(150 - checkoutSubtotal).toFixed(2)} more for free shipping.</p>
                )}
                <div className="summary-row total">
                  <span>Total</span>
                  <span>${checkoutTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Trigger */}
              <div className="cart-checkout-footer">
                <button className="btn btn-primary checkout-trigger-btn" onClick={handleProceedToCheckout}>
                  Proceed to Checkout <CreditCard size={14} />
                </button>
              </div>
            </>
          ) : (
            /* Empty State */
            <div className="cart-empty-state">
              <div className="cart-empty-icon-container">
                <X size={24} className="cart-empty-icon" />
              </div>
              <h4>Your bag is empty</h4>
              <p>You have not added any technical wear to your collection yet.</p>
              <button className="btn btn-secondary" onClick={() => setIsCartOpen(false)}>
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Embedded CSS for CartDrawer */}
      <style>{`
        .cart-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(28, 27, 24, 0.4);
          z-index: 1900;
          display: flex;
          justify-content: flex-end;
        }

        .cart-drawer-container {
          width: 100%;
          max-width: 440px;
          height: 100%;
          border-left: 1px solid var(--border-color);
          background-color: var(--bg-primary);
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-lg);
        }

        @keyframes slideLeft {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }

        .animate-slide-left {
          animation: slideLeft var(--transition-normal) forwards;
        }

        .cart-drawer-header {
          padding: 1.5rem 2rem;
          border-bottom: 1px solid var(--border-color);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .cart-drawer-title {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 400;
        }

        .cart-drawer-close-btn {
          color: var(--text-primary);
          transition: color var(--transition-fast);
        }

        .cart-drawer-close-btn:hover {
          color: var(--accent-primary);
        }

        .cart-drawer-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          padding: 2rem;
        }

        /* Empty state */
        .cart-empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1.25rem;
          height: 100%;
          text-align: center;
        }

        .cart-empty-icon-container {
          width: 60px;
          height: 60px;
          border-radius: var(--border-radius-sm);
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
        }

        .cart-empty-state h4 {
          font-family: var(--font-heading);
          font-size: 1.4rem;
          font-weight: 400;
        }

        .cart-empty-state p {
          color: var(--text-secondary);
          font-size: 0.85rem;
          line-height: 1.6;
        }

        /* Items cards */
        .cart-items-list {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          overflow-y: auto;
          margin-bottom: 1.5rem;
        }

        .cart-item-card {
          display: flex;
          gap: 1rem;
          padding: 1rem;
          border: 1px solid var(--border-color);
          background: var(--bg-secondary);
        }

        .cart-item-img {
          width: 72px;
          height: 72px;
          object-fit: cover;
          border-radius: var(--border-radius-sm);
          border: 1px solid var(--border-color);
          background: var(--bg-primary);
        }

        .cart-item-details {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        .cart-item-name {
          font-family: var(--font-heading);
          font-size: 1.2rem;
          font-weight: 400;
          margin-bottom: 0.2rem;
        }

        .cart-item-options {
          color: var(--text-muted);
          font-size: 0.7rem;
          margin-bottom: 0.5rem;
        }

        .cart-item-price {
          font-family: var(--font-body);
          font-weight: 700;
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
        }

        .cart-item-operations {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          margin-top: auto;
        }

        .cart-quantity-selector {
          display: flex;
          align-items: center;
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius-sm);
        }

        .cart-qty-btn {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          transition: color var(--transition-fast);
        }

        .cart-qty-btn:hover {
          color: var(--text-primary);
        }

        .cart-qty-val {
          font-size: 0.8rem;
          font-weight: 700;
          width: 20px;
          text-align: center;
        }

        .cart-remove-btn {
          color: var(--text-muted);
          transition: color var(--transition-fast);
        }

        .cart-remove-btn:hover {
          color: var(--text-primary);
        }

        /* Promo code section */
        .cart-promo-section {
          padding: 1rem 0;
          border-top: 1px dashed var(--border-color);
          border-bottom: 1px dashed var(--border-color);
          margin-bottom: 1.5rem;
        }

        .promo-form {
          display: flex;
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius-sm);
          overflow: hidden;
        }

        .promo-input {
          flex: 1;
          padding: 0.5rem 0.75rem;
          font-size: 0.75rem;
          text-transform: uppercase;
          background: none;
          border: none;
          color: var(--text-primary);
          letter-spacing: 0.05em;
        }

        .promo-input:focus {
          outline: none;
        }

        .promo-submit-btn {
          background: var(--bg-secondary);
          border-left: 1px solid var(--border-color);
          font-family: var(--font-body);
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          padding: 0 1rem;
          color: var(--accent-primary);
          transition: all var(--transition-fast);
        }

        .promo-submit-btn:hover {
          background: rgba(27, 56, 43, 0.05);
        }

        .promo-applied-badge {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem 0.75rem;
          background: #f1ebd9;
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius-sm);
          font-size: 0.75rem;
        }

        .promo-applied-info {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          color: var(--accent-primary);
        }

        .promo-sparkle {
          color: var(--accent-secondary);
        }

        .promo-remove-btn {
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        .promo-remove-btn:hover {
          color: var(--text-primary);
        }

        .promo-msg {
          font-size: 0.75rem;
          margin-top: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          text-align: left;
        }

        .error-msg {
          color: var(--text-muted);
        }

        .success-msg {
          color: var(--accent-primary);
        }

        /* Cost Summary */
        .cart-summary-section {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          margin-bottom: 1.5rem;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .summary-row.discount {
          color: var(--accent-primary);
          font-weight: 600;
        }

        .shipping-hint {
          font-size: 0.7rem;
          color: var(--text-muted);
          text-align: right;
          margin-top: -0.25rem;
        }

        .summary-row.total {
          border-top: 1px solid var(--border-color);
          padding-top: 0.75rem;
          font-family: var(--font-body);
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        /* Checkout trigger */
        .checkout-trigger-btn {
          width: 100%;
          height: 44px;
        }
      `}</style>
    </div>
  );
};
