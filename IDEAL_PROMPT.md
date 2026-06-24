# The Ideal Prompt for APEX Athletics eCommerce Platform

This document contains the consolidated, all-in-one "Ideal Prompt" that can be used to generate this entire premium editorial eCommerce platform in a single session. You can copy the prompt below or print/save this document as a PDF.

---

## 📝 The Ideal Prompt

Copy and paste the text block below into your AI development assistant to regenerate this exact website:

```text
Create a premium, professional eCommerce platform named "APEX Athletics" using React, TypeScript, and Vite, styled entirely with Vanilla CSS. The design must adopt a warm, nature-inspired "organic editorial" aesthetic (similar to premium outdoor/activewear brands like Tracksmith) and completely avoid high-contrast cyber-neons, glows, or generic AI templates.

### 🎨 Design System (Vanilla CSS in src/index.css)
1. Colors: Alabaster Off-white (#FCFAF7) as primary background, Warm Sand/Paper (#F4F0E8) as secondary background, Deep Forest Green (#1B3C2B) for headings/primary buttons, Earthy Terracotta (#BC6C25) for highlights/prices/badges, and Slate Charcoal (#252422) for primary body text.
2. Typography: Import Google Fonts 'Outfit' (bold, geometric) for headings and 'Inter' for highly readable body and UI text. Headings should be bold and uppercase.
3. Borders & Shadows: Use thin, solid borders (#E6E0D2) and minimal, subtle shadows (no neon glows).

### 📦 Database & Global State
1. Products Database (src/data/products.ts): Create a structured array of 10 items (footwear, active apparel, outdoor gear, sports tech) with details (id, name, tagline, description, price, original price, rating, specs list, sizes, colors, inStock, isFeatured). Use custom image paths (/shoes-product.png, /watch-product.png, /buds-product.png) for flagship products.
2. Context Management (src/context/ShopContext.tsx): Track shopping cart items, navigation view routes (landing, catalog, checkout, success), modal product selection, cart drawer open status, and applied coupons. Provide addToCart, updateCartQuantity, and removeFromCart actions. Support code "APEX20" for a 20% discount.

### 🧭 Navigation & Footer Layouts
1. Navbar (src/components/Layout/Navbar.tsx): Floating glassmorphic header with Logo 'APEX ATHLETICS' (with a forest green italicized 'ATHLETICS'), navigation links (Home, Products, Apparel, Footwear, Gear), and a shopping bag cart count badge. DO NOT include any search bars. Include a mobile menu drawer.
2. Footer (src/components/Layout/Footer.tsx): Clean 4-column footer with a Deep Forest Green background and warm cream text, displaying app download badges, collection links, concierge guidelines, and social media SVGs. Includes a newsletter submission input.

### 🏠 Landing Page Components (src/components/Landing/)
1. Hero (Hero.tsx): Asymmetric split layout with a bold uppercase title 'The Discipline of Velocity' (where 'Velocity' is highlighted in terracotta), a descriptive subtitle, action buttons (that hover-transition to terracotta), and a featured shoe product photo on the right inside a thin border frame with a physical department stamp ('DEP.01').
2. FeaturedCategories (FeaturedCategories.tsx): 3 columns displaying department image blocks (Apparel, Footwear, Equipment) with clean label overlays.
3. FeaturedProductsSection (FeaturedProductsSection.tsx): Displays a 4-column grid for "Featured Gear" and a 4-column grid for "Latest Arrivals" using individual ProductCard items.
4. ExclusiveOffer (ExclusiveOffer.tsx): Split row highlighting the smartwatch on the left and promotional copy details on the right with a "Buy Now" button that triggers the watch's details modal.
5. Testimonials (Testimonials.tsx): 3 columns displaying athlete quotes, profile pictures, and verified rating stars.
6. Brands (Brands.tsx): Clean horizontal line listing partner brand names (Valence Speed, Kinetic Labs, etc.).

### 🛍️ Product catalog, Cart, & Checkout
1. ProductCard (src/components/Product/ProductCard.tsx): Displays image swap on hover, rating stars, category labels, stock status badges, and a quick add-to-bag button.
2. ProductGrid (src/components/Product/ProductGrid.tsx): Renders the main catalog view with category selector buttons, order-by sorters, and empty state fallbacks.
3. ProductDetailModal (src/components/Product/ProductDetailModal.tsx): Overlay modal displaying thumb slides, size/color selectors, specifications list, count controls, and add-to-bag notifications.
4. CartDrawer (src/components/Cart/CartDrawer.tsx): Right side-drawer listing items, quantity selectors, promo code input, cost calculations (subtotal, shipping cost, tax), and proceed checkout action.
5. CheckoutWizard (src/components/Checkout/CheckoutWizard.tsx): 3-step form (Shipping details, Card payment with auto-space formatting, Review order details adding 8% tax) and a simulated place-order load spinner.
6. OrderSuccess (src/components/Checkout/OrderSuccess.tsx): Confirmation screen displaying a draw-animated checkmark circle in forest green, order receipt tables, delivery date calculations, and shopping reset triggers.

Connect all views conditionally in src/App.tsx under the ShopProvider context wrapper. Ensure full responsiveness across all viewport widths.
```

---

## 🖨️ How to Export this Document to PDF

1. **VS Code**: 
   - Install the extension **Markdown PDF**.
   - Open this [IDEAL_PROMPT.md](file:///c:/Users/jobin/OneDrive/Desktop/budget/youtube/movie%20listing/chat%20room/blog/Ecommerce/IDEAL_PROMPT.md) file.
   - Right-click anywhere in the file and select **Markdown PDF: Export (pdf)**.
2. **Obsidian or Typora**:
   - Open this directory in Obsidian or Typora.
   - Open `IDEAL_PROMPT.md` and choose **Export to PDF** from the menu options.
3. **Google Chrome / Microsoft Edge**:
   - Install a markdown viewer extension or push the file to a private GitHub repo.
   - Open the page in your browser, press `Ctrl + P` (Print), and select **Save as PDF**.
