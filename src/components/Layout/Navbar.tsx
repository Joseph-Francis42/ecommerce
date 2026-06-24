import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { ShoppingBag, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    cartCount,
    setIsCartOpen,
    currentView,
    setCurrentView,
    setSelectedCategory
  } = useShop();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (view: 'landing' | 'catalog') => {
    setCurrentView(view);
    if (view === 'landing') {
      setSelectedCategory('All');
    }
    setIsMobileMenuOpen(false);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCurrentView('catalog');
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar-wrapper glass">
      <div className="container navbar-container">
        {/* Logo */}
        <div className="navbar-logo" onClick={() => handleNavClick('landing')}>
          APEX <span>ATHLETICS</span>
        </div>

        {/* Desktop Navigation */}
        <div className="navbar-links">
          <button
            className={`nav-link ${currentView === 'landing' ? 'active' : ''}`}
            onClick={() => handleNavClick('landing')}
          >
            Home
          </button>
          <button
            className={`nav-link ${currentView === 'catalog' ? 'active' : ''}`}
            onClick={() => handleNavClick('catalog')}
          >
            Products
          </button>
          <button
            className="nav-link"
            onClick={() => handleCategorySelect('Apparel')}
          >
            Apparel
          </button>
          <button
            className="nav-link"
            onClick={() => handleCategorySelect('Footwear')}
          >
            Footwear
          </button>
          <button
            className="nav-link"
            onClick={() => handleCategorySelect('Gear')}
          >
            Gear
          </button>
        </div>

        {/* Right Operations */}
        <div className="navbar-actions">
          {/* Cart Icon */}
          <button className="cart-btn-nav" onClick={() => setIsCartOpen(true)}>
            <ShoppingBag size={18} />
            {cartCount > 0 && <span className="cart-badge-nav">{cartCount}</span>}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-drawer glass animate-fade-in">
          <div className="mobile-links">
            <button className="mobile-nav-link" onClick={() => handleNavClick('landing')}>
              Home
            </button>
            <button className="mobile-nav-link" onClick={() => handleNavClick('catalog')}>
              Products
            </button>
            <button
              className="mobile-nav-link"
              onClick={() => handleCategorySelect('Apparel')}
            >
              Apparel
            </button>
            <button
              className="mobile-nav-link"
              onClick={() => handleCategorySelect('Footwear')}
            >
              Footwear
            </button>
            <button
              className="mobile-nav-link"
              onClick={() => handleCategorySelect('Gear')}
            >
              Gear
            </button>
          </div>
        </div>
      )}

      {/* Embedded CSS for Navbar */}
      <style>{`
        .navbar-wrapper {
          position: sticky;
          top: 0;
          height: var(--header-height);
          display: flex;
          align-items: center;
          z-index: 1000;
          border-bottom: 1px solid var(--border-color);
        }
        
        .navbar-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 100%;
        }

        .navbar-logo {
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 1.6rem;
          letter-spacing: 0.02em;
          cursor: pointer;
          user-select: none;
          color: var(--text-primary);
        }

        .navbar-logo span {
          color: var(--accent-primary);
          font-weight: 300;
          font-style: italic;
        }

        .navbar-links {
          display: flex;
          gap: 2.5rem;
        }

        @media (max-width: 1024px) {
          .navbar-links {
            display: none;
          }
        }

        .nav-link {
          font-family: var(--font-body);
          font-weight: 500;
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 0.08em;
          color: var(--text-secondary);
          transition: all var(--transition-fast);
          padding: 0.5rem 0;
          position: relative;
        }

        .nav-link:hover, .nav-link.active {
          color: var(--text-primary);
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background: var(--accent-primary);
          transition: width var(--transition-fast);
        }

        .nav-link:hover::after, .nav-link.active::after {
          width: 100%;
        }

        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .cart-btn-nav {
          position: relative;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: var(--border-radius-sm);
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          transition: all var(--transition-fast);
        }

        .cart-btn-nav:hover {
          border-color: var(--text-primary);
        }

        .cart-badge-nav {
          position: absolute;
          top: -4px;
          right: -4px;
          background: var(--accent-primary);
          color: #ffffff;
          font-size: 0.65rem;
          font-weight: 600;
          border-radius: 50%;
          min-width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2px;
        }

        .mobile-menu-btn {
          display: none;
          color: var(--text-primary);
        }

        @media (max-width: 1024px) {
          .mobile-menu-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 38px;
            height: 38px;
            border-radius: var(--border-radius-sm);
            background: var(--bg-primary);
            border: 1px solid var(--border-color);
          }
        }

        /* Mobile drawer */
        .mobile-menu-drawer {
          position: absolute;
          top: var(--header-height);
          left: 0;
          width: 100%;
          padding: 1.5rem;
          border-bottom: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .mobile-links {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .mobile-nav-link {
          text-align: left;
          font-family: var(--font-body);
          text-transform: uppercase;
          font-size: 0.85rem;
          letter-spacing: 0.08em;
          padding: 0.5rem 0;
          border-bottom: 1px solid rgba(0, 0, 0, 0.02);
          color: var(--text-secondary);
        }

        .mobile-nav-link:hover {
          color: var(--text-primary);
        }
      `}</style>
    </nav>
  );
};
