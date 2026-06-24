import React from 'react';
import { useShop } from '../../context/ShopContext';
import { ArrowRight, Calendar, User, MapPin } from 'lucide-react';

export const OrderSuccess: React.FC = () => {
  const { placedOrder, setPlacedOrder, setCurrentView } = useShop();

  // Redirect home if accessed directly without an order
  if (!placedOrder) {
    return (
      <div className="container success-error-fallback">
        <p>No order details found.</p>
        <button className="btn btn-primary" onClick={() => setCurrentView('landing')}>
          Return Home
        </button>
      </div>
    );
  }

  const { orderId, shipping, items, subtotal, discount, total } = placedOrder;

  const handleReturnHome = () => {
    setPlacedOrder(null);
    setCurrentView('landing');
  };

  // Calculate delivery date (current date + 3 business days)
  const getDeliveryDate = () => {
    const date = new Date();
    let addedDays = 0;
    while (addedDays < 3) {
      date.setDate(date.getDate() + 1);
      // Skip weekends (0 = Sunday, 6 = Saturday)
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        addedDays++;
      }
    }
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const estimatedTax = Math.round(subtotal * 0.08 * 100) / 100;

  return (
    <section className="section success-section">
      <div className="container success-container glass animate-slide-up">
        
        {/* Animated Checkmark Visual */}
        <div className="success-checkmark-wrapper">
          <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
            <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
          </svg>
        </div>

        <h2 className="success-heading">Order Secured</h2>
        <p className="success-subheading">
          Your order has been registered and is currently being processed. An email confirmation has been dispatched.
        </p>

        {/* Order Details Panels */}
        <div className="success-receipt-info">
          
          <div className="receipt-column text-left">
            <h4 className="receipt-section-title">Registry Info</h4>
            
            <div className="receipt-detail-item">
              <span className="detail-label">Order Number</span>
              <span className="detail-value order-id-highlight">{orderId}</span>
            </div>
            
            <div className="receipt-detail-item">
              <span className="detail-label"><Calendar size={12} /> Delivery Date</span>
              <span className="detail-value">{getDeliveryDate()}</span>
            </div>
            
            <div className="receipt-detail-item">
              <span className="detail-label"><User size={12} /> Athlete</span>
              <span className="detail-value">{shipping.fullName}</span>
            </div>

            <div className="receipt-detail-item">
              <span className="detail-label"><MapPin size={12} /> Shipping to</span>
              <span className="detail-value">
                {shipping.address}, {shipping.city}, {shipping.zipCode}
              </span>
            </div>
          </div>

          <div className="receipt-column">
            <h4 className="receipt-section-title text-left">Breakdown</h4>
            
            {/* Short items list */}
            <div className="receipt-items-list">
              {items.map((item) => (
                <div key={item.id} className="receipt-item-row">
                  <span className="receipt-item-qty">{item.quantity}x</span>
                  <span className="receipt-item-name">{item.product.name}</span>
                  <span className="receipt-item-price">${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Calculations matrix */}
            <div className="receipt-calculations">
              <div className="receipt-calc-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="receipt-calc-row discount">
                  <span>Promo Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="receipt-calc-row">
                <span>Tax (8%)</span>
                <span>${estimatedTax.toFixed(2)}</span>
              </div>
              <div className="receipt-calc-row total">
                <span>Charged Total</span>
                <span>${(total + estimatedTax).toFixed(2)}</span>
              </div>
            </div>
          </div>

        </div>

        {/* CTA Return Home */}
        <div className="success-footer-actions">
          <button className="btn btn-primary" onClick={handleReturnHome}>
            Continue Shopping <ArrowRight size={14} />
          </button>
        </div>

      </div>

      {/* Embedded CSS for OrderSuccess */}
      <style>{`
        .success-section {
          background-color: var(--bg-primary);
          display: flex;
          align-items: center;
          min-height: calc(100vh - var(--header-height));
        }

        .success-container {
          max-width: 740px;
          margin: 0 auto;
          padding: 4rem 3rem;
          border-radius: var(--border-radius-sm);
          border: 1px solid var(--border-color);
          background-color: var(--bg-primary);
          text-align: center;
          box-shadow: var(--shadow-md);
        }

        @media (max-width: 576px) {
          .success-container {
            padding: 2rem 1.5rem;
          }
        }

        .success-checkmark-wrapper {
          display: flex;
          justify-content: center;
          margin-bottom: 2rem;
        }

        /* SVG Checkmark draw animations (Forest Green) */
        .checkmark {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          display: block;
          stroke-width: 2;
          stroke: #ffffff;
          stroke-miterlimit: 10;
          box-shadow: inset 0 0 0 var(--accent-primary);
          animation: fillCheckmark .4s ease-in-out .4s forwards, scaleCheckmark .3s ease-in-out .9s alternate forwards;
        }

        .checkmark__circle {
          stroke-dasharray: 166;
          stroke-dashoffset: 166;
          stroke-width: 2;
          stroke: var(--accent-primary);
          fill: none;
          animation: strokeCircle .6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
        }

        .checkmark__check {
          transform-origin: 50% 50%;
          stroke-dasharray: 48;
          stroke-dashoffset: 48;
          stroke: #ffffff;
          animation: strokeCheck .3s cubic-bezier(0.65, 0, 0.45, 1) .8s forwards;
        }

        @keyframes strokeCircle {
          100% { stroke-dashoffset: 0; }
        }

        @keyframes strokeCheck {
          100% { stroke-dashoffset: 0; }
        }

        @keyframes fillCheckmark {
          100% { box-shadow: inset 0 0 0 40px var(--accent-primary); }
        }

        @keyframes scaleCheckmark {
          0% { transform: none; }
          50% { transform: scale3d(1.1, 1.1, 1); }
          100% { transform: none; }
        }

        .success-heading {
          font-family: var(--font-heading);
          font-size: 2.2rem;
          font-weight: 400;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }

        .success-subheading {
          color: var(--text-secondary);
          max-width: 500px;
          margin: 0 auto 3rem;
          font-size: 0.9rem;
          line-height: 1.6;
        }

        /* Receipt block */
        .success-receipt-info {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 3rem;
          margin-bottom: 3.5rem;
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
          padding: 2.5rem 0;
        }

        @media (max-width: 768px) {
          .success-receipt-info {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        .receipt-column {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .receipt-section-title {
          font-family: var(--font-body);
          text-transform: uppercase;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 0.5rem;
          margin-bottom: 0.5rem;
          color: var(--accent-primary);
        }

        .receipt-detail-item {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.2rem;
        }

        .detail-label {
          font-size: 0.7rem;
          text-transform: uppercase;
          color: var(--text-muted);
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          letter-spacing: 0.05em;
        }

        .detail-value {
          color: var(--text-primary);
          font-size: 0.85rem;
          font-weight: 500;
        }

        .order-id-highlight {
          color: var(--accent-primary);
          font-family: var(--font-body);
          font-weight: 700;
        }

        .receipt-items-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          border-bottom: 1px dashed var(--border-color);
          padding-bottom: 1rem;
          max-height: 140px;
          overflow-y: auto;
        }

        .receipt-item-row {
          display: flex;
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .receipt-item-qty {
          width: 30px;
          font-weight: 700;
          text-align: left;
          color: var(--accent-primary);
        }

        .receipt-item-name {
          flex: 1;
          text-align: left;
        }

        .receipt-item-price {
          text-align: right;
          font-weight: 600;
        }

        .receipt-calculations {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-top: 0.5rem;
        }

        .receipt-calc-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .receipt-calc-row.discount {
          color: var(--accent-primary);
          font-weight: 600;
        }

        .receipt-calc-row.total {
          border-top: 1px solid var(--border-color);
          padding-top: 0.5rem;
          font-family: var(--font-body);
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .success-footer-actions {
          display: flex;
          justify-content: center;
        }

        .success-error-fallback {
          padding: 8rem 0;
          text-align: center;
        }
      `}</style>
    </section>
  );
};
