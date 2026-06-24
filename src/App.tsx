import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/Layout/Navbar';
import { Footer } from './components/Layout/Footer';
import { Hero } from './components/Landing/Hero';
import { FeaturedCategories } from './components/Landing/FeaturedCategories';
import { FeaturedProductsSection } from './components/Landing/FeaturedProductsSection';
import { ExclusiveOffer } from './components/Landing/ExclusiveOffer';
import { Testimonials } from './components/Landing/Testimonials';
import { Brands } from './components/Landing/Brands';
import { ProductGrid } from './components/Product/ProductGrid';
import { ProductDetailModal } from './components/Product/ProductDetailModal';
import { CartDrawer } from './components/Cart/CartDrawer';
import { CheckoutWizard } from './components/Checkout/CheckoutWizard';
import { OrderSuccess } from './components/Checkout/OrderSuccess';
import './App.css';

const AppContent: React.FC = () => {
  const { currentView } = useShop();

  return (
    <>
      {/* Structural Header Navigation */}
      <Navbar />

      {/* Main View Router */}
      <main style={{ flex: 1 }}>
        {currentView === 'landing' && (
          <div className="animate-fade-in">
            <Hero />
            <FeaturedCategories />
            <FeaturedProductsSection />
            <ExclusiveOffer />
            <Testimonials />
            <Brands />
          </div>
        )}

        {currentView === 'catalog' && (
          <div className="animate-fade-in">
            <ProductGrid />
          </div>
        )}

        {currentView === 'checkout' && (
          <div className="animate-fade-in">
            <CheckoutWizard />
          </div>
        )}

        {currentView === 'success' && (
          <div className="animate-fade-in">
            <OrderSuccess />
          </div>
        )}
      </main>

      {/* Overlay Modals & Drawers */}
      <CartDrawer />
      <ProductDetailModal />

      {/* Structural Footer */}
      <Footer />
    </>
  );
};

function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}

export default App;
