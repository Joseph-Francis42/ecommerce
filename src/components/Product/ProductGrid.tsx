import React from 'react';
import { useShop } from '../../context/ShopContext';
import type { SortType } from '../../context/ShopContext';
import { ProductCard } from './ProductCard';
import { Filter, RotateCcw } from 'lucide-react';

export const ProductGrid: React.FC = () => {
  const {
    productsList,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    sortOption,
    setSortOption
  } = useShop();

  // Filters & Sorting logic
  const filteredProducts = productsList
    .filter((product) => {
      // Category filter
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        return (
          product.name.toLowerCase().includes(query) ||
          product.tagline.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
        );
      }
      return true;
    })
    .sort((a, b) => {
      // Sorting
      if (sortOption === 'price-low') {
        return a.price - b.price;
      }
      if (sortOption === 'price-high') {
        return b.price - a.price;
      }
      if (sortOption === 'rating') {
        return b.rating - a.rating;
      }
      // 'featured' sorting: put featured items first, otherwise fallback to id
      const aVal = a.isFeatured ? 1 : 0;
      const bVal = b.isFeatured ? 1 : 0;
      return bVal - aVal;
    });

  const categories = ['All', 'Apparel', 'Footwear', 'Gear', 'Tech'];

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSortOption('featured');
  };

  return (
    <section className="section catalog-section">
      <div className="container">
        
        {/* Catalog Headers */}
        <div className="catalog-header">
          <div>
            <h2 className="section-title text-left">THE APEX REGISTRY</h2>
            <p className="catalog-count-label">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
              {searchQuery && ` matching "${searchQuery}"`}
            </p>
          </div>
        </div>

        {/* Filters and Sorters bar */}
        <div className="filter-sort-bar glass">
          {/* Categories */}
          <div className="category-buttons-container">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`cat-filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sorter */}
          <div className="sort-selector-container">
            <span className="sort-label">Order By:</span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortType)}
              className="sort-select"
            >
              <option value="featured">Featured Items</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">High Rating</option>
            </select>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="products-grid-catalog animate-fade-in">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="catalog-empty-state glass animate-slide-up">
            <Filter size={36} className="empty-icon" />
            <h3>No Registry Items</h3>
            <p>We could not find any training equipment matching your criteria.</p>
            <button className="btn btn-secondary" onClick={resetFilters}>
              <RotateCcw size={14} /> Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* Embedded CSS for ProductGrid */}
      <style>{`
        .catalog-section {
          background-color: var(--bg-primary);
          min-height: 800px;
        }

        .catalog-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 2.5rem;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 1.5rem;
        }

        .text-left {
          text-align: left;
          margin-bottom: 0.25rem;
        }

        .catalog-count-label {
          color: var(--text-secondary);
          font-size: 0.9rem;
          font-weight: 400;
          text-align: left;
        }

        /* Filter bar */
        .filter-sort-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          border-radius: var(--border-radius-sm);
          border: 1px solid var(--border-color);
          margin-bottom: 3.5rem;
          gap: 1.5rem;
        }

        @media (max-width: 768px) {
          .filter-sort-bar {
            flex-direction: column;
            align-items: stretch;
          }
        }

        .category-buttons-container {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .cat-filter-btn {
          font-family: var(--font-body);
          text-transform: uppercase;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          padding: 0.45rem 1.2rem;
          border-radius: var(--border-radius-sm);
          border: 1px solid var(--border-color);
          background: transparent;
          color: var(--text-secondary);
          transition: all var(--transition-fast);
        }

        .cat-filter-btn:hover {
          color: var(--text-primary);
          border-color: var(--text-muted);
        }

        .cat-filter-btn.active {
          color: #ffffff;
          background: var(--accent-primary);
          border-color: transparent;
        }

        .sort-selector-container {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .sort-label {
          font-size: 0.75rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.05em;
        }

        .sort-select {
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          padding: 0.45rem 2rem 0.45rem 0.75rem;
          border-radius: var(--border-radius-sm);
          cursor: pointer;
          font-size: 0.8rem;
          font-family: var(--font-body);
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%231c1b18' stroke-width='1.5'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.75rem center;
          background-size: 0.9rem;
        }

        .sort-select:focus {
          outline: none;
          border-color: var(--border-focus);
        }

        /* Grid */
        .products-grid-catalog {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }

        @media (max-width: 1200px) {
          .products-grid-catalog {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 900px) {
          .products-grid-catalog {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 576px) {
          .products-grid-catalog {
            grid-template-columns: 1fr;
          }
        }

        /* Empty State */
        .catalog-empty-state {
          padding: 5rem 2rem;
          text-align: center;
          border-radius: var(--border-radius-sm);
          border: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 500px;
          margin: 4rem auto;
          gap: 1.25rem;
        }

        .empty-icon {
          color: var(--text-muted);
        }

        .catalog-empty-state h3 {
          font-family: var(--font-heading);
          font-size: 1.6rem;
          font-weight: 400;
        }

        .catalog-empty-state p {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }
      `}</style>
    </section>
  );
};
