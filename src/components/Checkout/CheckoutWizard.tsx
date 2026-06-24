import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { ShieldCheck, Truck, CreditCard, ChevronRight, ChevronLeft, AlertCircle, ShoppingBag } from 'lucide-react';

export const CheckoutWizard: React.FC = () => {
  const {
    cart,
    checkoutSubtotal,
    checkoutDiscount,
    checkoutTotal,
    clearCart,
    setCurrentView,
    setPlacedOrder
  } = useShop();

  const [step, setStep] = useState(1); // Steps: 1 = Shipping, 2 = Payment, 3 = Review

  // Shipping Form State
  const [shippingForm, setShippingForm] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    zipCode: ''
  });
  const [shippingErrors, setShippingErrors] = useState<Record<string, string>>({});

  // Payment Form State
  const [paymentForm, setPaymentForm] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });
  const [paymentErrors, setPaymentErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  // Fallback for empty cart checkout access
  if (cart.length === 0 && step !== 3) {
    return (
      <section className="section checkout-section">
        <div className="container checkout-empty glass animate-slide-up">
          <ShoppingBag size={36} className="empty-icon" />
          <h3>Registry is empty</h3>
          <p>You must add training items to your registry before checking out.</p>
          <button className="btn btn-primary" onClick={() => setCurrentView('catalog')}>
            Return to Registry
          </button>
        </div>
      </section>
    );
  }

  // --- Shipping Validations ---
  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingForm({ ...shippingForm, [e.target.name]: e.target.value });
    if (shippingErrors[e.target.name]) {
      setShippingErrors({ ...shippingErrors, [e.target.name]: '' });
    }
  };

  const validateShipping = (): boolean => {
    const errors: Record<string, string> = {};
    if (!shippingForm.fullName.trim()) errors.fullName = 'Full name is required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!shippingForm.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!emailRegex.test(shippingForm.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!shippingForm.address.trim()) errors.address = 'Street address is required';
    if (!shippingForm.city.trim()) errors.city = 'City is required';
    if (!shippingForm.zipCode.trim()) errors.zipCode = 'ZIP Code is required';
    
    setShippingErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const nextStepShipping = () => {
    if (validateShipping()) {
      setStep(2);
      window.scrollTo(0, 0);
    }
  };

  // --- Payment Validations ---
  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;

    // Automated formatting helpers
    if (name === 'cardNumber') {
      // Remove all non-digits, cap at 16, insert spaces every 4 digits
      const digits = value.replace(/\D/g, '').slice(0, 16);
      value = digits.replace(/(\d{4})(?=\d)/g, '$1 ');
    } else if (name === 'expiry') {
      // Remove non-digits, cap at 4, insert slash after 2 digits
      const digits = value.replace(/\D/g, '').slice(0, 4);
      if (digits.length > 2) {
        value = `${digits.slice(0, 2)}/${digits.slice(2)}`;
      } else {
        value = digits;
      }
    } else if (name === 'cvv') {
      // Numbers only, cap at 4
      value = value.replace(/\D/g, '').slice(0, 4);
    }

    setPaymentForm({ ...paymentForm, [name]: value });
    if (paymentErrors[name]) {
      setPaymentErrors({ ...paymentErrors, [name]: '' });
    }
  };

  const validatePayment = (): boolean => {
    const errors: Record<string, string> = {};
    if (!paymentForm.cardName.trim()) errors.cardName = 'Cardholder name is required';
    
    const cardDigits = paymentForm.cardNumber.replace(/\s/g, '');
    if (cardDigits.length < 15) errors.cardNumber = 'Card number must be 15 or 16 digits';
    
    if (paymentForm.expiry.length < 5) {
      errors.expiry = 'Expiration date is required (MM/YY)';
    } else {
      const [m, y] = paymentForm.expiry.split('/');
      const month = parseInt(m, 10);
      const year = parseInt(y, 10);
      if (month < 1 || month > 12) {
        errors.expiry = 'Invalid month';
      } else {
        const now = new Date();
        const currentYear = now.getFullYear() % 100;
        const currentMonth = now.getMonth() + 1;
        if (year < currentYear || (year === currentYear && month < currentMonth)) {
          errors.expiry = 'Card is expired';
        }
      }
    }

    if (paymentForm.cvv.length < 3) errors.cvv = 'CVV must be 3 or 4 digits';

    setPaymentErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const nextStepPayment = () => {
    if (validatePayment()) {
      setStep(3);
      window.scrollTo(0, 0);
    }
  };

  // --- Order Submission ---
  const handlePlaceOrder = () => {
    setIsProcessing(true);
    
    // Simulate API bank check & order creation
    setTimeout(() => {
      setIsProcessing(false);
      const uniqueId = `APX-${Math.floor(100000 + Math.random() * 900000)}`;
      
      const orderData = {
        orderId: uniqueId,
        shipping: shippingForm,
        items: [...cart],
        subtotal: checkoutSubtotal,
        discount: checkoutDiscount,
        total: checkoutTotal
      };
      
      setPlacedOrder(orderData);
      clearCart();
      setCurrentView('success');
      window.scrollTo(0, 0);
    }, 2000);
  };

  // Shipping cost: free over $150
  const shippingCost = checkoutSubtotal > 150 ? 0 : 10;
  const estimatedTax = Math.round(checkoutSubtotal * 0.08 * 100) / 100; // 8% tax

  return (
    <section className="section checkout-section">
      <div className="container checkout-container">
        
        {/* Left Side: Forms */}
        <div className="checkout-main-panel glass">
          
          {/* Progress Indicators */}
          <div className="checkout-steps-indicator">
            <div className={`step-node ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
              <span className="step-num">1</span>
              <span className="step-label">Shipping</span>
            </div>
            <div className="step-connector"></div>
            <div className={`step-node ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
              <span className="step-num">2</span>
              <span className="step-label">Payment</span>
            </div>
            <div className="step-connector"></div>
            <div className={`step-node ${step === 3 ? 'active' : ''}`}>
              <span className="step-num">3</span>
              <span className="step-label">Review</span>
            </div>
          </div>

          {/* STEP 1: Shipping Details */}
          {step === 1 && (
            <div className="checkout-step-content animate-fade-in">
              <h3 className="step-title"><Truck size={18} /> Shipping Details</h3>
              
              <div className="form-grid-split">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={shippingForm.fullName}
                    onChange={handleShippingChange}
                    className="form-input"
                    placeholder="E.g., John Doe"
                  />
                  {shippingErrors.fullName && <p className="field-error"><AlertCircle size={10} /> {shippingErrors.fullName}</p>}
                </div>
                
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={shippingForm.email}
                    onChange={handleShippingChange}
                    className="form-input"
                    placeholder="you@example.com"
                  />
                  {shippingErrors.email && <p className="field-error"><AlertCircle size={10} /> {shippingErrors.email}</p>}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Delivery Address</label>
                <input
                  type="text"
                  name="address"
                  value={shippingForm.address}
                  onChange={handleShippingChange}
                  className="form-input"
                  placeholder="Street address, unit"
                />
                {shippingErrors.address && <p className="field-error"><AlertCircle size={10} /> {shippingErrors.address}</p>}
              </div>

              <div className="form-grid-split">
                <div className="form-group">
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    name="city"
                    value={shippingForm.city}
                    onChange={handleShippingChange}
                    className="form-input"
                    placeholder="City"
                  />
                  {shippingErrors.city && <p className="field-error"><AlertCircle size={10} /> {shippingErrors.city}</p>}
                </div>
                
                <div className="form-group">
                  <label className="form-label">ZIP / Postal Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={shippingForm.zipCode}
                    onChange={handleShippingChange}
                    className="form-input"
                    placeholder="10001"
                  />
                  {shippingErrors.zipCode && <p className="field-error"><AlertCircle size={10} /> {shippingErrors.zipCode}</p>}
                </div>
              </div>

              <div className="wizard-actions">
                <button className="btn btn-secondary" onClick={() => setCurrentView('catalog')}>
                  Back to Shop
                </button>
                <button className="btn btn-primary" onClick={nextStepShipping}>
                  Continue to Payment <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Payment Details */}
          {step === 2 && (
            <div className="checkout-step-content animate-fade-in">
              <h3 className="step-title"><CreditCard size={18} /> Card Payment</h3>
              
              <div className="form-group">
                <label className="form-label">Cardholder Name</label>
                <input
                  type="text"
                  name="cardName"
                  value={paymentForm.cardName}
                  onChange={handlePaymentChange}
                  className="form-input"
                  placeholder="Name as it appears on card"
                />
                {paymentErrors.cardName && <p className="field-error"><AlertCircle size={10} /> {paymentErrors.cardName}</p>}
              </div>

              <div className="form-group">
                <label className="form-label">Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={paymentForm.cardNumber}
                  onChange={handlePaymentChange}
                  className="form-input"
                  placeholder="0000 0000 0000 0000"
                />
                {paymentErrors.cardNumber && <p className="field-error"><AlertCircle size={10} /> {paymentErrors.cardNumber}</p>}
              </div>

              <div className="form-grid-split">
                <div className="form-group">
                  <label className="form-label">Expiration Date</label>
                  <input
                    type="text"
                    name="expiry"
                    value={paymentForm.expiry}
                    onChange={handlePaymentChange}
                    className="form-input"
                    placeholder="MM/YY"
                  />
                  {paymentErrors.expiry && <p className="field-error"><AlertCircle size={10} /> {paymentErrors.expiry}</p>}
                </div>
                
                <div className="form-group">
                  <label className="form-label">CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    value={paymentForm.cvv}
                    onChange={handlePaymentChange}
                    className="form-input"
                    placeholder="123"
                  />
                  {paymentErrors.cvv && <p className="field-error"><AlertCircle size={10} /> {paymentErrors.cvv}</p>}
                </div>
              </div>

              <div className="wizard-actions">
                <button className="btn btn-secondary" onClick={() => setStep(1)}>
                  <ChevronLeft size={14} /> Shipping
                </button>
                <button className="btn btn-primary" onClick={nextStepPayment}>
                  Review Order <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Order Review */}
          {step === 3 && (
            <div className="checkout-step-content animate-fade-in">
              <h3 className="step-title"><ShieldCheck size={18} /> Review & Place Order</h3>

              <div className="review-details-grid">
                <div className="review-section-box">
                  <h4>Delivery Address</h4>
                  <p>{shippingForm.fullName}</p>
                  <p>{shippingForm.address}</p>
                  <p>{shippingForm.city}, {shippingForm.zipCode}</p>
                  <p>{shippingForm.email}</p>
                </div>
                
                <div className="review-section-box">
                  <h4>Payment Method</h4>
                  <p>Credit Card</p>
                  <p>Cardholder: {paymentForm.cardName}</p>
                  <p>Number: **** **** **** {paymentForm.cardNumber.slice(-4)}</p>
                </div>
              </div>

              <div className="wizard-actions review-wizard-actions">
                <button className="btn btn-secondary" onClick={() => setStep(2)} disabled={isProcessing}>
                  <ChevronLeft size={14} /> Back to Payment
                </button>
                
                <button 
                  className={`btn btn-primary place-order-final-btn ${isProcessing ? 'loading' : ''}`}
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <span className="spinner-loader"></span>
                  ) : (
                    <>PLACE REGISTRY ORDER</>
                  )}
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Right Side: Order Summary */}
        <div className="checkout-summary-panel glass">
          <h3 className="summary-title">Summary</h3>
          
          {/* Cart items listing */}
          <div className="checkout-summary-items">
            {cart.map((item) => (
              <div key={item.id} className="summary-item-card">
                <img src={item.product.images[0]} alt={item.product.name} className="summary-item-img" />
                <div className="summary-item-info">
                  <p className="summary-item-name">{item.product.name}</p>
                  <p className="summary-item-options">
                    Qty: {item.quantity} 
                    {item.selectedSize && ` | Sz: ${item.selectedSize}`}
                  </p>
                  <p className="summary-item-price">${(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing calculations */}
          <div className="checkout-calculations-matrix">
            <div className="calc-row">
              <span>Subtotal</span>
              <span>${checkoutSubtotal.toFixed(2)}</span>
            </div>
            {checkoutDiscount > 0 && (
              <div className="calc-row discount">
                <span>APEX20 (20% Off)</span>
                <span>-${checkoutDiscount.toFixed(2)}</span>
              </div>
            )}
            <div className="calc-row">
              <span>Shipping</span>
              <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
            </div>
            <div className="calc-row">
              <span>Estimated Tax (8%)</span>
              <span>${estimatedTax.toFixed(2)}</span>
            </div>
            <div className="calc-row total">
              <span>Total Cost</span>
              <span>${(checkoutTotal + estimatedTax).toFixed(2)}</span>
            </div>
          </div>

          <div className="checkout-trust-badge">
            <ShieldCheck size={14} className="trust-icon" />
            <span>SSL Secured Checkout. Data is fully encrypted.</span>
          </div>

        </div>

      </div>

      {/* Embedded CSS for CheckoutWizard */}
      <style>{`
        .checkout-section {
          background-color: var(--bg-primary);
          min-height: calc(100vh - var(--header-height));
        }

        .checkout-container {
          display: grid;
          grid-template-columns: 1.6fr 1fr;
          gap: 3rem;
          align-items: start;
        }

        @media (max-width: 968px) {
          .checkout-container {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        .checkout-empty {
          padding: 4rem 2rem;
          text-align: center;
          max-width: 500px;
          margin: 4rem auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          border-radius: var(--border-radius-sm);
          border: 1px solid var(--border-color);
        }

        .checkout-main-panel {
          padding: 3rem;
          border-radius: var(--border-radius-sm);
          border: 1px solid var(--border-color);
          background-color: var(--bg-primary);
        }

        @media (max-width: 576px) {
          .checkout-main-panel {
            padding: 1.5rem;
          }
        }

        /* Step Indicators */
        .checkout-steps-indicator {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 3.5rem;
        }

        .step-node {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          position: relative;
        }

        .step-num {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid var(--border-color);
          background: var(--bg-secondary);
          color: var(--text-muted);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.85rem;
          transition: all var(--transition-fast);
        }

        .step-label {
          font-size: 0.7rem;
          font-family: var(--font-body);
          text-transform: uppercase;
          font-weight: 700;
          color: var(--text-muted);
          letter-spacing: 0.05em;
        }

        .step-node.active .step-num {
          border-color: var(--text-primary);
          color: var(--text-primary);
        }

        .step-node.active .step-label {
          color: var(--text-primary);
        }

        .step-node.completed .step-num {
          background: var(--accent-primary);
          border-color: transparent;
          color: #ffffff;
        }

        .step-node.completed .step-label {
          color: var(--text-primary);
        }

        .step-connector {
          flex: 1;
          height: 1px;
          background-color: var(--border-color);
          margin-top: -1rem;
        }

        /* Step Details */
        .step-title {
          font-family: var(--font-heading);
          font-size: 1.6rem;
          font-weight: 400;
          text-transform: uppercase;
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 1rem;
          text-align: left;
        }

        .form-grid-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        @media (max-width: 576px) {
          .form-grid-split {
            grid-template-columns: 1fr;
            gap: 0;
          }
        }

        .field-error {
          color: var(--text-muted);
          font-size: 0.75rem;
          margin-top: 0.4rem;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          text-align: left;
        }

        .wizard-actions {
          display: flex;
          justify-content: space-between;
          margin-top: 3rem;
          border-top: 1px solid var(--border-color);
          padding-top: 2rem;
          gap: 1rem;
        }

        @media (max-width: 480px) {
          .wizard-actions {
            flex-direction: column-reverse;
          }
          .wizard-actions button {
            width: 100%;
          }
        }

        /* Step 3 reviews */
        .review-details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          text-align: left;
          margin-bottom: 2rem;
        }

        @media (max-width: 576px) {
          .review-details-grid {
            grid-template-columns: 1fr;
          }
        }

        .review-section-box {
          padding: 1.5rem;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius-sm);
        }

        .review-section-box h4 {
          font-family: var(--font-body);
          text-transform: uppercase;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 0.5rem;
          margin-bottom: 1rem;
          color: var(--accent-primary);
        }

        .review-section-box p {
          color: var(--text-secondary);
          font-size: 0.85rem;
          line-height: 1.5;
        }

        /* Place order button loading */
        .place-order-final-btn {
          min-width: 220px;
          height: 44px;
        }

        .spinner-loader {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-top-color: #ffffff;
          border-radius: 50%;
          display: inline-block;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Right Summary Panel */
        .checkout-summary-panel {
          padding: 2.5rem;
          border-radius: var(--border-radius-sm);
          border: 1px solid var(--border-color);
          background-color: var(--bg-primary);
          text-align: left;
        }

        .summary-title {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 400;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 0.75rem;
        }

        .checkout-summary-items {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          max-height: 240px;
          overflow-y: auto;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .summary-item-card {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .summary-item-img {
          width: 48px;
          height: 48px;
          object-fit: cover;
          border-radius: var(--border-radius-sm);
          border: 1px solid var(--border-color);
          background: var(--bg-secondary);
        }

        .summary-item-info {
          flex: 1;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
        }

        .summary-item-name {
          font-size: 0.8rem;
          font-weight: 600;
          width: 70%;
        }

        .summary-item-options {
          font-size: 0.75rem;
          color: var(--text-muted);
          width: 70%;
        }

        .summary-item-price {
          font-size: 0.8rem;
          font-weight: 700;
          text-align: right;
        }

        /* Calculation matrix */
        .checkout-calculations-matrix {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .calc-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .calc-row.discount {
          color: var(--accent-primary);
          font-weight: 600;
        }

        .calc-row.total {
          font-family: var(--font-body);
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .checkout-trust-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.7rem;
          color: var(--text-muted);
        }

        .trust-icon {
          color: var(--accent-primary);
        }
      `}</style>
    </section>
  );
};
