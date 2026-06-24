# APEX Athletics eCommerce MVP: Development Prompts

This document lists the complete sequence of AI-assisted prompts used to design, build, style, and structure the **APEX Athletics** eCommerce MVP. You can print this file or export it as a PDF for submission.

---

## 🧭 Step 1: Project Initialization & CSS Design Tokens
**Prompt:**
> "Initialize a React + TypeScript single-page application using Vite in the current folder. Create a comprehensive global stylesheet in `src/index.css` defining the design system for 'APEX Athletics', a premium high-performance athletic brand.
>
> **Design Tokens to Include:**
> - **Theme**: Sleek midnight athletic style (Midnight Black `#0A0A0C`, Dark Charcoal `#121215`, Cyan `#00E5FF`, Neon Green `#39FF14`, White `#FFFFFF`).
> - **Typography**: Space Grotesk / Syne for headings, Inter for body text.
> - **Styles**: Glassmorphic panels (`backdrop-filter`), smooth transitions, responsive container wrappers, custom neon glow shadows, and modern button variations (`btn-primary`, `btn-secondary`, `btn-icon`). Include reset rules, fluid custom scrollbars, and keyframe animations for fade-in and slide-up effects."

---

## 📦 Step 2: Global State & Mock Products Data
**Prompt:**
> "Develop a mock database in `src/data/products.ts` listing 10 premium sports items including footwear (e.g. Apex Velocity V2, Trail Blazer), apparel (compression sets, windbreakers), gear (carbon rackets, yoga mats, insulated flasks), and tech (GPS smartwatch, sports earbuds). Each product must feature id, name, tagline, description, price, original price (for sale items), category, rating, reviewsCount, sizes list, colors list, specifications, and high-quality Unsplash sports image URLs.
>
> Next, build a global state manager using React Context in `src/context/ShopContext.tsx`. The context should track:
> - Shopping cart items list (with quantity, chosen size, and chosen color).
> - Active filters: search query, active category (All, Apparel, Footwear, Gear, Tech), price sort options (Featured, Low-to-High, High-to-Low, Top Rated).
> - Active view (navigation routes: landing, catalog, checkout, success).
> - Active product detail modal selection, cart drawer open state, applied coupons.
> - Placed order receipt data.
>
> Provide cart operations: `addToCart`, `updateCartQuantity`, `removeFromCart`, `clearCart`, and a coupon validation system for `APEX20` (providing a 20% discount)."

---

## 🧭 Step 3: Floating Navbar & Newsletter Footer Layouts
**Prompt:**
> "Create floating glassmorphic header navigation in `src/components/Layout/Navbar.tsx` and a column footer in `src/components/Layout/Footer.tsx`.
>
> **Navbar Specifications:**
> - sticky navigation with clean brand logo 'APEX ATHLETICS'.
> - dynamic links that filter categories or browse the full catalog.
> - inline search input that redirects typing search queries to the catalog grid.
> - shopping bag icon showing a glowing count badge for total items.
> - responsive hamburger slide-down drawer for mobile screens.
>
> **Footer Specifications:**
> - column links mapping to categories, support (size guide, returns, warranties), and company history.
> - functional newsletter box showing a micro-animated checkmark success upon submission ('Welcome to the squad!').
> - copyright line and custom social icon SVGs (Instagram, Twitter, Youtube) with neon hover glows."

---

## 🏃 Step 4: High-Impact Landing Page
**Prompt:**
> "Build the core landing page components inside `src/components/Landing/`:
>
> 1. **`Hero.tsx`**: Dynamic sports background overlay, badge banner highlighting new season drop, bold athletic headline 'BREAK YOUR LIMITS' in a metallic gradient, and CTAs directing users to catalog browsing.
> 2. **`Features.tsx`**: A 'Why APEX' grid highlighting biomechanical design, 30-day wear guarantee, zero-damp moisture fabrics, and free shipping over $150. Use micro-animations and card triggers.
> 3. **`PromoSection.tsx`**: A call-to-action coupon banner for 20% off code `APEX20`, next to a grid of category link cards (Apparel, Footwear, Gear, Tech) showing high-resolution preview graphics."

---

## 🛍️ Step 5: Product Catalog, Filters & Detail Modal
**Prompt:**
> "Build catalog grid and detailed product modal displays inside `src/components/Product/`:
>
> 1. **`ProductCard.tsx`**: Display rating stars, sale tags, stock status, hover scale, secondary image swap on hover, and an instant add-to-cart button.
> 2. **`ProductGrid.tsx`**: Displays active headers with catalog result counts, category selection buttons, sort options, and a search result placeholder with reset actions when no items match.
> 3. **`ProductDetailModal.tsx`**: Full-screen backdrop modal displaying:
>    - Left: image gallery thumbnail switcher.
>    - Right: rating counts, price comparison, color selector dots, size selector buttons, technical specifications checklist, quantity counters, and 'Add to Cart' trigger with brief success feedback."

---

## 🛒 Step 6: Shopping Cart Drawer
**Prompt:**
> "Create the slide-out shopping cart sidebar drawer in `src/components/Cart/CartDrawer.tsx`.
>
> **Cart Drawer Specifications:**
> - slide-in drawer layout from the right side with a clickable backdrop close action.
> - lists added items, displaying thumbnail image, title, options, and quantity modifier buttons (+/-) and trash remove.
> - coupon input form: if the user types `APEX20`, apply the 20% discount; otherwise, show invalid warning guidelines.
> - cost breakdown detailing subtotal, coupon savings, shipping fees, and net total.
> - clear checkout triggers that close the bag and direct users to checkout."

---

## 💳 Step 7: Checkout Wizard & Order Success
**Prompt:**
> "Create the multi-step checkout wizard in `src/components/Checkout/CheckoutWizard.tsx` and order completion page in `src/components/Checkout/OrderSuccess.tsx`.
>
> **Checkout Wizard Specifications:**
> - Progress indicator nodes (1: Shipping, 2: Payment, 3: Review).
> - Step 1 Form: fields for Name, Email, Address, City, ZIP with input checks (must not be empty, valid email).
> - Step 2 Form: fields for Cardholder, Card Number (inserts space separation every 4 digits automatically), Expiration Date (auto-inserts slash), CVV, with input checks.
> - Step 3 Form: summary grids of shipping, payment digits, cost breakdown (adding 8% estimated tax), and a simulated deposit placement button displaying a spinner during card checks.
>
> **Order Success Specifications:**
> - An animated SVG checkmark that draws itself.
> - A generated receipt table showing a unique order tracking number, shipping location, item counts, and pricing receipt.
> - Estimated delivery date (3 business days ahead, skipping weekends).
> - A return button to clear the receipt state and navigate back to the home landing page."

---

## 🛠️ Step 8: Assembly & Verification
**Prompt:**
> "Connect all components inside `src/App.tsx`. Import the `ShopProvider` context wrapper. Conditionally render views according to `currentView` navigation state: landing, catalog, checkout, or success. Include persistent navbar, footer, cart drawer, and product details modal.
>
> Build the application using `npm run build` to confirm compilation is error-free, resolving any TypeScript config rules (such as type-only imports for `verbatimModuleSyntax`). Ensure responsiveness across mobile, tablet, and desktop viewports."
