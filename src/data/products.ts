export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: 'Apparel' | 'Footwear' | 'Gear' | 'Tech';
  rating: number;
  reviewsCount: number;
  images: string[];
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  specs: string[];
  features: string[];
  inStock: boolean;
  isFeatured?: boolean;
}

export const products: Product[] = [
  {
    id: 'apex-velocity-v2',
    name: 'Apex Velocity V2',
    tagline: 'Carbon-Plated Elite Running Shoe',
    description: 'Engineered for speed, the Apex Velocity V2 features an ultra-responsive carbon fiber plate sandwiched between dual layers of high-rebound energy foam. Its breathable matrix mesh upper secures the foot while keeping weight to an absolute minimum.',
    price: 180,
    originalPrice: 220,
    category: 'Footwear',
    rating: 4.9,
    reviewsCount: 142,
    images: [
      './shoes-product.png'
    ],
    sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
    colors: [
      { name: 'Neon Red', hex: '#FF3B30' },
      { name: 'Volt Yellow', hex: '#E5FF00' },
      { name: 'Midnight Black', hex: '#1C1C1E' }
    ],
    specs: [
      'Weight: 6.9 oz (Size US 9)',
      'Stack Height: 40mm / 32mm (8mm drop)',
      'Plate: Full-length carbon fiber curve',
      'Midsole: Dual-foam energy return system'
    ],
    features: [
      'Carbon fiber propulsion plate increases running efficiency by 4%',
      'Ultra-breathable weave mesh upper keeps feet cool and dry',
      'Grip-locked outsole rubber for extreme traction in wet and dry conditions',
      'Dynamic heel counter minimizes slippage and blisters'
    ],
    inStock: true,
    isFeatured: true
  },
  {
    id: 'apex-chrono-gps',
    name: 'Apex Chrono GPS',
    tagline: 'Advanced Multi-Sport Fitness Watch',
    description: 'Track your limits with the Apex Chrono. Built with a scratch-resistant titanium bezel and a sapphire crystal glass lens, this smartwatch delivers dual-frequency GPS tracking, continuous heart-rate analytics, advanced recovery tracking, and up to 14 days of battery life.',
    price: 250,
    category: 'Tech',
    rating: 4.8,
    reviewsCount: 89,
    images: [
      './watch-product.png'
    ],
    sizes: ['42mm', '46mm'],
    colors: [
      { name: 'Titanium Gray', hex: '#5A5A5D' },
      { name: 'Stealth Black', hex: '#111112' }
    ],
    specs: [
      'Battery Life: 14 days smartwatch, 36 hours GPS mode',
      'Bezel Material: Grade 5 Titanium',
      'Water Resistance: 10 ATM (100 meters)',
      'Connectivity: Bluetooth 5.2, Wi-Fi, ANT+'
    ],
    features: [
      'Dual-frequency GPS accurately maps routes even in dense forests and cities',
      'Optical heart rate sensor monitor tracks HRV, SpO2, and sleep cycles',
      'Built-in offline maps and turn-by-turn navigation',
      'Pre-loaded sport modes for running, cycling, swimming, golf, and strength training'
    ],
    inStock: true,
    isFeatured: true
  },
  {
    id: 'aura-compress-shield',
    name: 'Aura Compress Shield Set',
    tagline: 'Second-Skin Compression & Recovery Activewear',
    description: 'Maximize blood flow and reduce muscle fatigue. The Aura Compress Shield Set includes a long-sleeve top and leggings woven from ultra-durable, moisture-wicking synthetic fibers that flex dynamically in all directions.',
    price: 85,
    originalPrice: 105,
    category: 'Apparel',
    rating: 4.7,
    reviewsCount: 64,
    images: [
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Obsidian Black', hex: '#1C1C1E' },
      { name: 'Deep Teal', hex: '#005D63' },
      { name: 'Slate Gray', hex: '#4A4A4A' }
    ],
    specs: [
      'Material: 78% Recycled Polyester, 22% Elastane',
      'Compression Rating: 15-20 mmHg',
      'UV Protection: UPF 50+',
      'Seams: Flatlock anti-chafing stitching'
    ],
    features: [
      'Graduated compression increases blood oxygenation and accelerates recovery',
      'Sweat-wicking micro-weave structure dries in minutes',
      'Four-way stretch fabric retains its shape after hundreds of washes',
      'Anti-microbial treatment blocks odor-causing bacteria'
    ],
    inStock: true,
    isFeatured: true
  },
  {
    id: 'apex-spin-carbon',
    name: 'Apex Spin Carbon',
    tagline: 'Professional Carbon Tennis Racket',
    description: 'Dominating spin meets surgical precision. Woven from aerospace-grade 18K carbon fiber, the Apex Spin Carbon racket features a revolutionary aerodynamically optimized throat profile that accelerates swing speeds on groundstrokes.',
    price: 220,
    category: 'Gear',
    rating: 4.9,
    reviewsCount: 37,
    images: [
      'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['Grip 2 (4 1/4")', 'Grip 3 (4 3/8")', 'Grip 4 (4 1/2")'],
    colors: [
      { name: 'Carbon Black/Cyan', hex: '#0B2F35' }
    ],
    specs: [
      'Weight (Unstrung): 300g / 10.6 oz',
      'Head Size: 98 sq. in. / 632 sq. cm.',
      'Balance: 320mm / 7 pts HL',
      'String Pattern: 16 Main x 19 Cross'
    ],
    features: [
      '18K Carbon fiber lay-up provides exceptional torque stability and pocketing feel',
      'Aero-throat shape reduces wind resistance for faster swings',
      'Shock-dampening core in the handle filters out harsh vibrations',
      'Delivered unstrung with matching premium single racket bag'
    ],
    inStock: true,
    isFeatured: false
  },
  {
    id: 'aura-flow-mat',
    name: 'Aura Flow Yoga Set',
    tagline: 'Premium Non-Slip Eco Yoga Mat & Cork Blocks',
    description: 'Find your center with a mat designed for superior stability. Crafted from sustainably harvested natural tree rubber and topped with a moisture-grip polyurethane layer, the Aura Flow Mat gets grippier when wet, preventing hand slips in hot yoga.',
    price: 65,
    category: 'Gear',
    rating: 4.6,
    reviewsCount: 112,
    images: [
      'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?q=80&w=800&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Olive Green', hex: '#4B5320' },
      { name: 'Dusty Rose', hex: '#C08A8E' },
      { name: 'Navy Blue', hex: '#00204A' }
    ],
    specs: [
      'Mat Dimensions: 72" x 24" x 5mm',
      'Mat Weight: 6.2 lbs',
      'Blocks: Two 9"x6"x3" natural cork blocks included',
      'Material: Natural rubber, biodegradable polyurethane, 100% cork'
    ],
    features: [
      'Superior 5mm dense cushion protects joints and knees',
      'Wet-grip top coat ensures absolute traction during heavy sweating',
      'Laser-etched alignment lines help correct postures on the fly',
      '100% PVC-free, non-toxic, and sustainably sourced materials'
    ],
    inStock: true,
    isFeatured: false
  },
  {
    id: 'apex-breeze-windbreaker',
    name: 'Apex Breeze Windbreaker',
    tagline: 'Featherlight Weather-Proof Running Jacket',
    description: 'Designed for cold mornings and unexpected drizzles. This running jacket weighs only 4 ounces but blocks cold gusts completely. It features ventilated laser-cut armpit ports, a secure zippered chest pocket, and packs fully into its own pocket.',
    price: 110,
    originalPrice: 130,
    category: 'Apparel',
    rating: 4.7,
    reviewsCount: 53,
    images: [
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Ice White', hex: '#F0F4F8' },
      { name: 'Citron Yellow', hex: '#DFFF00' },
      { name: 'Deep Navy', hex: '#0A192F' }
    ],
    specs: [
      'Material: 100% Ripstop Nylon with DWR coat',
      'Weight: 4.2 oz (Size M)',
      'Pockets: 1 chest zip pocket (packs jacket)',
      'Visibility: 360-degree reflective piping'
    ],
    features: [
      'Durable Water Repellent (DWR) coating sheds light rain and fog',
      'Laser perforated panels under arms and back maximize heat dispersion',
      'Packs down to the size of a smartphone into its own pocket for easy storage',
      'Adjustable toggle hood conforms tightly without blocking peripheral vision'
    ],
    inStock: true,
    isFeatured: true
  },
  {
    id: 'aura-pulse-buds',
    name: 'Aura Pulse Buds Pro',
    tagline: 'Sweatproof Sport Earbuds with Active Noise Cancelling',
    description: 'Fuel your workout with deep, resonant bass and zero distractions. Aura Pulse Buds feature ear-hook stabilizers that lock in securely no matter how high you jump. With Hybrid ANC and IP67 dust/waterproof rating, they survive any training regime.',
    price: 125,
    category: 'Tech',
    rating: 4.8,
    reviewsCount: 71,
    images: [
      './buds-product.png'
    ],
    colors: [
      { name: 'Stealth Black', hex: '#121214' },
      { name: 'White Neon', hex: '#F1F1F5' }
    ],
    specs: [
      'Battery: 8 hrs earbud, 32 hrs total with case',
      'Drivers: 10mm graphene-layered drivers',
      'Water Rating: IP67 (dust tight, submersed in 1m)',
      'Charging: USB-C and wireless charging'
    ],
    features: [
      'Secure-fit ear hooks bend dynamically to match your ears perfectly',
      'Custom tuned bass curve drives high-energy training playlists',
      'HearThrough mode lets you safely hear ambient traffic while running outdoors',
      'Ultra-fast charging: 10 minutes in the case gives 2 hours of playback'
    ],
    inStock: true,
    isFeatured: false
  },
  {
    id: 'apex-trail-blazer',
    name: 'Apex Trail Blazer',
    tagline: 'All-Terrain Waterproof Hiking Shoe',
    description: 'Conquer the rugged wilderness. Built with a fully waterproof lining and an aggressively lugged Vibram rubber outsole, the Trail Blazer protects your feet from mud, rocks, and water while providing ankle-stabilizing support.',
    price: 150,
    category: 'Footwear',
    rating: 4.5,
    reviewsCount: 46,
    images: [
      'https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
    colors: [
      { name: 'Forest Green', hex: '#2D5A27' },
      { name: 'Desert Tan', hex: '#C2B280' }
    ],
    specs: [
      'Outsole: Vibram Megagrip rubber',
      'Membrane: eVent waterproof breathable lining',
      'Insole: Ortholite shock absorption foam',
      'Lacing: Speed-lace friction hooks'
    ],
    features: [
      'Vibram Megagrip lug patterns prevent slipping on wet rocks and steep inclines',
      'Reinforced TPU mudguard and toe cap shields against impact and sharp debris',
      'Waterproof membrane keeps feet dry while allowing internal steam to escape',
      'Dual-density EVA midsole cushions joints on long backpacking trips'
    ],
    inStock: true,
    isFeatured: false
  },
  {
    id: 'apex-hydrate-elite',
    name: 'Apex Hydrate Elite',
    tagline: 'Vacuum Insulated 32oz Sports Flask',
    description: 'Ice cold hydration for 24 hours. The Apex Hydrate is forged from kitchen-grade 18/8 stainless steel and features a leakproof straw lid and a durable powder coat finish that won’t sweat in your sports bag.',
    price: 35,
    category: 'Gear',
    rating: 4.7,
    reviewsCount: 198,
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=800&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Cyan Blast', hex: '#00D5FF' },
      { name: 'Midnight Matte', hex: '#222225' },
      { name: 'Lime Rush', hex: '#32CD32' }
    ],
    specs: [
      'Capacity: 32 oz / 946 ml',
      'Material: 18/8 Pro-Grade Stainless Steel',
      'Insulation: Double-wall vacuum TempShield',
      'BPA Status: 100% BPA and Phthalate-free'
    ],
    features: [
      'TempShield double-wall insulation keeps drinks ice cold up to 24 hrs, hot up to 12 hrs',
      'Leakproof straw cap allows quick, one-handed sips during high-intensity training',
      'Color Last powder coat is scratch-resistant, dishwasher safe, and slip-free',
      'Fits easily into standard car cup holders and gym bag side pockets'
    ],
    inStock: true,
    isFeatured: false
  },
  {
    id: 'apex-strength-dumbbells',
    name: 'Apex Strength Smart Dumbbells',
    tagline: 'Heavy-Duty 55lb Adjustable Dumbbell Set',
    description: 'A complete home weight rack in a single pair. Twist the smart dial handle to select weights from 5 lbs up to 55 lbs in 5 lb increments. Replaces 10 individual sets of dumbbells, saving massive space.',
    price: 320,
    originalPrice: 380,
    category: 'Gear',
    rating: 4.9,
    reviewsCount: 29,
    images: [
      'https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?q=80&w=800&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Steel Black', hex: '#2A2A2D' }
    ],
    specs: [
      'Weight Range: 5 to 55 lbs (2.3 to 24.9 kg) per dumbbell',
      'Increment Settings: 10 (5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55 lbs)',
      'Base Tray: Heavy-duty plastic interlocking trays included',
      'Grip: Ergonomic chrome-textured knurled steel'
    ],
    features: [
      'Instant dial weight selection: adjust your weight in under 2 seconds',
      'Compact home gym storage replaces 20 individual dumbbells',
      'Textured knurled steel handle gives a slip-resistant, secure grip during heavy lifts',
      'Durable plates coated with noise-dampening thermoplastics protect flooring'
    ],
    inStock: false,
    isFeatured: false
  }
];
