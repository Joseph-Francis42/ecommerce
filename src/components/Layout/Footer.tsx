import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { Send, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentView, setSelectedCategory } = useShop();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setCurrentView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-wrapper">
      <div className="container footer-grid">
        {/* Brand & Newsletter Column */}
        <div className="footer-brand-col">
          <div className="footer-logo">
            APEX <span>ATHLETICS</span>
          </div>
          <p className="footer-tagline">
            We curate and engineer elite activewear and training equipment built for endurance, discipline, and the pursuit of athletic excellence.
          </p>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <p className="newsletter-title">The APEX Club Journal</p>
            <p className="newsletter-subtitle">Receive seasonal training perspectives, product releases, and member pricing updates.</p>
            <div className="newsletter-input-container">
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-submit-btn">
                <Send size={14} />
              </button>
            </div>
            {subscribed && (
              <div className="newsletter-success animate-fade-in">
                <ShieldCheck size={14} /> Subscription confirmed. Welcome to the club.
              </div>
            )}
          </form>
        </div>

        {/* Categories Column */}
        <div className="footer-links-col">
          <h4 className="footer-heading">Collections</h4>
          <ul className="footer-list">
            <li><button onClick={() => handleCategoryClick('All')}>All Collections</button></li>
            <li><button onClick={() => handleCategoryClick('Apparel')}>Apparel</button></li>
            <li><button onClick={() => handleCategoryClick('Footwear')}>Footwear</button></li>
            <li><button onClick={() => handleCategoryClick('Gear')}>Equipment</button></li>
            <li><button onClick={() => handleCategoryClick('Tech')}>Bio-Tech</button></li>
          </ul>
        </div>

        {/* Support Column */}
        <div className="footer-links-col">
          <h4 className="footer-heading">Athlete Concierge</h4>
          <ul className="footer-list">
            <li><a href="#help">Help & Contact</a></li>
            <li><a href="#shipping">Shipping & Returns</a></li>
            <li><a href="#size-guide">Fit & Size Guides</a></li>
            <li><a href="#order-track">Order Tracking</a></li>
            <li><a href="#warranty">Material Lifetime Guarantee</a></li>
          </ul>
        </div>

        {/* Corporate Column */}
        <div className="footer-links-col">
          <h4 className="footer-heading">Club Registry</h4>
          <ul className="footer-list">
            <li><a href="#about">Our Heritage</a></li>
            <li><a href="#sustainability">Responsible Sourcing</a></li>
            <li><a href="#careers">Careers</a></li>
            <li><a href="#press">Press Journal</a></li>
            <li><a href="#partners">Affiliate Program</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer bar */}
      <div className="footer-bottom">
        <div className="container footer-bottom-container">
          <p className="copyright-text">
            &copy; {new Date().getFullYear()} APEX Athletic Club. All rights reserved.
          </p>
          <div className="social-links">
            <a href="#instagram" className="social-icon-link" aria-label="Instagram">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="#twitter" className="social-icon-link" aria-label="Twitter">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
            <a href="#youtube" className="social-icon-link" aria-label="Youtube">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/><polyline points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
            </a>
          </div>
        </div>
      </div>

      {/* Embedded CSS for Footer */}
      <style>{`
        .footer-wrapper {
          background-color: var(--accent-primary);
          color: #f5f2eb;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding: 6rem 0 0;
          margin-top: auto;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 4rem;
          margin-bottom: 5rem;
        }

        @media (max-width: 968px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 2.5rem;
          }
        }

        @media (max-width: 576px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        .footer-logo {
          font-family: var(--font-heading);
          font-weight: 500;
          font-size: 1.6rem;
          letter-spacing: 0.02em;
          color: #ffffff;
          margin-bottom: 1.5rem;
        }

        .footer-logo span {
          color: var(--accent-secondary);
          font-weight: 300;
          font-style: italic;
        }

        .footer-tagline {
          color: #cbc6ba;
          font-size: 0.9rem;
          margin-bottom: 2rem;
          max-width: 380px;
          font-weight: 300;
          line-height: 1.6;
        }

        .newsletter-form {
          max-width: 360px;
        }

        .newsletter-title {
          font-family: var(--font-body);
          font-weight: 600;
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 0.08em;
          margin-bottom: 0.35rem;
          color: #ffffff;
        }

        .newsletter-subtitle {
          color: #cbc6ba;
          font-size: 0.8rem;
          margin-bottom: 1.25rem;
          font-weight: 300;
          line-height: 1.5;
        }

        .newsletter-input-container {
          display: flex;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: var(--border-radius-sm);
          overflow: hidden;
          transition: border-color var(--transition-fast);
        }

        .newsletter-input-container:focus-within {
          border-color: rgba(255, 255, 255, 0.4);
        }

        .newsletter-input {
          flex: 1;
          padding: 0.75rem 1rem;
          font-size: 0.8rem;
          background: none;
          border: none;
          color: #ffffff;
          letter-spacing: 0.05em;
        }

        .newsletter-input:focus {
          outline: none;
        }

        .newsletter-submit-btn {
          background: transparent;
          padding: 0 1.2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #cbc6ba;
          transition: all var(--transition-fast);
          border-left: 1px solid rgba(255, 255, 255, 0.1);
        }

        .newsletter-submit-btn:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.02);
        }

        .newsletter-success {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          color: #a3c4bc;
          margin-top: 0.75rem;
          background: rgba(255, 255, 255, 0.03);
          padding: 0.6rem;
          border-radius: var(--border-radius-sm);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .footer-heading {
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 2rem;
          color: #ffffff;
        }

        .footer-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .footer-list li button {
          text-align: left;
          background: none;
          border: none;
          color: #cbc6ba;
          font-size: 0.85rem;
          font-weight: 400;
          transition: color var(--transition-fast);
        }

        .footer-list li button:hover {
          color: #ffffff;
        }

        .footer-list li a {
          color: #cbc6ba;
          font-size: 0.85rem;
          font-weight: 400;
          transition: color var(--transition-fast);
        }

        .footer-list li a:hover {
          color: #ffffff;
        }

        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding: 2.5rem 0;
          margin-top: 5rem;
        }

        .footer-bottom-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        @media (max-width: 768px) {
          .footer-bottom-container {
            flex-direction: column;
            gap: 1.5rem;
            text-align: center;
          }
        }

        .copyright-text {
          color: #8c887f;
          font-size: 0.8rem;
          font-weight: 300;
        }

        .social-links {
          display: flex;
          gap: 1.25rem;
        }

        .social-icon-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          border-radius: var(--border-radius-sm);
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #cbc6ba;
          transition: all var(--transition-fast);
        }

        .social-icon-link:hover {
          color: #ffffff;
          border-color: rgba(255, 255, 255, 0.3);
          transform: translateY(-1px);
        }
      `}</style>
    </footer>
  );
};
