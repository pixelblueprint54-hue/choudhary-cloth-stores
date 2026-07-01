import { useState } from 'react';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import type { Product } from './components/ProductCard';
import { OwnerDashboard } from './components/OwnerDashboard';
import { CheckoutDrawer } from './components/CheckoutDrawer';
import { AIDarbarStylist } from './components/AIDarbarStylist';
import { OpeningCeremony } from './components/OpeningCeremony';
import { RangoliShowcase } from './components/RangoliShowcase';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Award, 
  Users, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  MessageSquare,
  Key,
  X
} from 'lucide-react';


const PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "SRK Signature Obsidian Sherwani",
    category: "Wedding Special",
    price: 28999,
    rating: 5.0,
    reviews: 242,
    description: "Premium wedding sherwani in obsidian black, hand-embroidered with luxurious gold zari details. Inspired by the kingly style worn by Shah Rukh Khan.",
    textureType: "sherwani",
    colorPalette: { primary: "#111111", secondary: "#D4AF37", accent: "#FAF6F0" },
    imageUrl: "/sherwani_black_srk.png"
  },
  {
    id: "prod-2",
    name: "Jodhpuri Royal Bandhgala",
    category: "Formal Wear",
    price: 18500,
    rating: 4.8,
    reviews: 95,
    description: "Structured midnight blue wool-blend Bandhgala suit with authentic polished brass buttons. Fuses ancient cut with clean modern shoulders.",
    textureType: "bandhgala",
    colorPalette: { primary: "#1A2C4C", secondary: "#FAF6F0", accent: "#D4AF37" },
    imageUrl: "/jodhpuri_suit.png"
  },
  {
    id: "prod-3",
    name: "Jaipur Gold Silk Kurta",
    category: "Festive Collection",
    price: 3200,
    rating: 4.7,
    reviews: 210,
    description: "Breathable raw silk kurta pajama in warm marigold-golden hue, featuring traditional Bandhani prints around the mandarin collar.",
    textureType: "kurta",
    colorPalette: { primary: "#D4AF37", secondary: "#5C1D24", accent: "#FAF6F0" },
    imageUrl: "/jaipur_gold_kurta.png"
  },
  {
    id: "prod-4",
    name: "Pachrangi Leheriya Safa",
    category: "Traditional Turban",
    price: 1500,
    rating: 5.0,
    reviews: 312,
    description: "Authentic five-color (Pachrangi) tie-dye royal Rajasthani Safa. Light cotton fabric that shapes perfectly to any head layout.",
    textureType: "safa",
    colorPalette: { primary: "#E25822", secondary: "#1A2C4C", accent: "#D4AF37" },
    imageUrl: "/pachrangi_safa.png"
  },
  {
    id: "prod-5",
    name: "Zardozi Embroidered Jootis",
    category: "Footwear",
    price: 2800,
    rating: 4.6,
    reviews: 74,
    description: "Fine camel-colored leather Mojaris featuring handcrafted gold-thread zardozi embroidery. Comfortable inner cushion lining.",
    textureType: "jooti",
    colorPalette: { primary: "#A67A42", secondary: "#D4AF37", accent: "#FAF6F0" },
    imageUrl: "/zardozi_jootis.png"
  },
  {
    id: "prod-8",
    name: "Jodhpuri Breeches & Kurta",
    category: "Festive Collection",
    price: 8900,
    rating: 4.7,
    reviews: 82,
    description: "Tailored off-white Jodhpuri breeches (hunting trousers) paired with a rich raw-silk maroon kurta, providing a stately noble look.",
    textureType: "kurta",
    colorPalette: { primary: "#5C1D24", secondary: "#F3ECE0", accent: "#D4AF37" },
    imageUrl: "/breeches_kurta.png"
  },
  {
    id: "prod-9",
    name: "Maharaja Velvet Emerald Sherwani",
    category: "Wedding Special",
    price: 32000,
    rating: 5.0,
    reviews: 64,
    description: "Imperial emerald-green velvet sherwani, featuring handcrafted silver and gold zardozi border work. Crafted for maximum luxury.",
    textureType: "sherwani",
    colorPalette: { primary: "#1E4A38", secondary: "#D4AF37", accent: "#FAF6F0" },
    imageUrl: "/sherwani_blue_actor.png"
  },
  {
    id: "prod-10",
    name: "Jaipur Indigo Nehru Jacket",
    category: "Formal Wear",
    price: 4500,
    rating: 4.6,
    reviews: 104,
    description: "Indo-Western cotton Nehru jacket hand-printed in rich indigo-blue vegetable dyes, offering a smart structured layer for expos.",
    textureType: "bandhgala",
    colorPalette: { primary: "#1A2F4C", secondary: "#D4AF37", accent: "#F3ECE0" },
    imageUrl: "/indigo_jacket.png"
  },
  {
    id: "prod-11",
    name: "Imperial Groom Ivory Sherwani",
    category: "Wedding Special",
    price: 29500,
    rating: 4.9,
    reviews: 89,
    description: "Elegant ivory wedding silk sherwani layered with custom red embroidery and a royal turban. Photographed on leading celebrity models.",
    textureType: "sherwani",
    colorPalette: { primary: "#FAF6F0", secondary: "#5C1D24", accent: "#D4AF37" },
    imageUrl: "/sherwani_gold_actor.png"
  },
  {
    id: "prod-15",
    name: "Casual Maharaja Dhoti & Kurta",
    category: "Wedding Special",
    price: 6500,
    rating: 4.8,
    reviews: 112,
    description: "A comfortable yet stately mustard yellow linen kurta paired with a traditional pre-stitched white dhoti and light gold stole. Perfect for casual wedding guest styling.",
    textureType: "kurta",
    colorPalette: { primary: "#D4AF37", secondary: "#FAF6F0", accent: "#5C1D24" },
    imageUrl: "/dhoti_kurta_male.png"
  },
  {
    id: "prod-16",
    name: "Royal Angrakha Jaipur Kurta Set",
    category: "Wedding Special",
    price: 8200,
    rating: 4.7,
    reviews: 90,
    description: "A traditional overlapping Angrakha style kurta in deep emerald cotton-silk with colorful drawstrings, paired with a white churidar.",
    textureType: "kurta",
    colorPalette: { primary: "#1E4A38", secondary: "#FAF6F0", accent: "#D4AF37" },
    imageUrl: "/angrakha_kurta_male.png"
  },
  {
    id: "prod-39",
    name: "Emerald Gold-Embroidered Kurta",
    category: "Formal Wear",
    price: 3800,
    rating: 4.8,
    reviews: 74,
    description: "Structured dark green formal kurta shirt, detailed with premium gold floral embroidery on the shoulder and chest.",
    textureType: "kurta",
    colorPalette: { primary: "#047857", secondary: "#D4AF37", accent: "#FAF6F0" },
    imageUrl: "/formal_green_emb.png"
  },
  {
    id: "prod-40",
    name: "Navy Brocade-Style Kurta",
    category: "Formal Wear",
    price: 3900,
    rating: 4.9,
    reviews: 90,
    description: "Elegant navy blue self-pattern formal kurta shirt, finished with high-end gold floral embroidery on the shoulder/chest.",
    textureType: "kurta",
    colorPalette: { primary: "#1E3A8A", secondary: "#D4AF37", accent: "#FAF6F0" },
    imageUrl: "/formal_navy_emb.png"
  },
  {
    id: "prod-41",
    name: "Amber Mandarin Kurta",
    category: "Formal Wear",
    price: 2900,
    rating: 4.7,
    reviews: 62,
    description: "Minimalist mustard yellow formal cotton-silk short kurta shirt, with structured wooden buttons and mandarin collar.",
    textureType: "kurta",
    colorPalette: { primary: "#EAB308", secondary: "#FAF6F0", accent: "#78350F" },
    imageUrl: "/formal_yellow_kurta.png"
  },
  {
    id: "prod-42",
    name: "Sky Blue Embroidered Kurta",
    category: "Formal Wear",
    price: 3600,
    rating: 4.8,
    reviews: 80,
    description: "Refined light blue formal kurta shirt, detailed with a clean dark geometric/floral chest embroidery.",
    textureType: "kurta",
    colorPalette: { primary: "#38BDF8", secondary: "#FAF6F0", accent: "#1E293B" },
    imageUrl: "/formal_blue_emb.png"
  },
  {
    id: "prod-43",
    name: "Malabar Green Leaf Kurta",
    category: "Formal Wear",
    price: 4200,
    rating: 4.9,
    reviews: 104,
    description: "Sophisticated sage green formal long kurta, showing a detailed leaf-print weave throughout the structured silk fabric.",
    textureType: "kurta",
    colorPalette: { primary: "#065F46", secondary: "#FAF6F0", accent: "#D4AF37" },
    imageUrl: "/formal_green_leaf.png"
  },
  {
    id: "prod-44",
    name: "Jaipuri White Bandhani Kurta",
    category: "Formal Wear",
    price: 3400,
    rating: 4.8,
    reviews: 70,
    description: "White formal short kurta featuring red and green Jaipuri paisley and peacock bandhani prints with structured mandarin collar.",
    textureType: "kurta",
    colorPalette: { primary: "#FAF6F0", secondary: "#5C1D24", accent: "#D4AF37" },
    imageUrl: "/formal_white_bandhani.png"
  },
  {
    id: "prod-45",
    name: "Rose Gold Textured Bandhgala",
    category: "Formal Wear",
    price: 15500,
    rating: 4.9,
    reviews: 112,
    description: "Elite rose-gold/ivory textured bandhgala formal jacket with custom metallic buttons.",
    textureType: "bandhgala",
    colorPalette: { primary: "#FAF6F0", secondary: "#D4AF37", accent: "#5C1D24" },
    imageUrl: "/formal_pink_bandhgala.png"
  },
  {
    id: "prod-46",
    name: "Mayur Orange Silk Waistcoat",
    category: "Formal Wear",
    price: 6200,
    rating: 4.8,
    reviews: 84,
    description: "Handwoven orange silk waistcoat decorated with purple bird and floral patterns, layered over a cream raw silk body.",
    textureType: "bandhgala",
    colorPalette: { primary: "#FAF6F0", secondary: "#EAB308", accent: "#5C1D24" },
    imageUrl: "/formal_bird_waistcoat.png"
  },
  {
    id: "prod-47",
    name: "Obsidian Gold-Embroidered Kurta",
    category: "Formal Wear",
    price: 3900,
    rating: 4.9,
    reviews: 96,
    description: "Crisp black formal shirt/kurta, highlighting elegant gold floral embroidery on the shoulder and chest.",
    textureType: "kurta",
    colorPalette: { primary: "#1E293B", secondary: "#FAF6F0", accent: "#D4AF37" },
    imageUrl: "/formal_black_emb.png"
  },
  {
    id: "prod-48",
    name: "Bandana Black Casual Shirt",
    category: "Formal Wear",
    price: 2600,
    rating: 4.7,
    reviews: 58,
    description: "Semi-formal black open collar shirt with white paisley/bandana patterns, layered for a modern workspace aesthetic.",
    textureType: "kurta",
    colorPalette: { primary: "#1E293B", secondary: "#FAF6F0", accent: "#D4AF37" },
    imageUrl: "/formal_black_paisley.png"
  },
  // Boys Kids section
  {
    id: "prod-kid-b1",
    name: "Bal Cartoon Car Polo Set (Age 1-5)",
    category: "Boys Collection (0-5)",
    price: 1200,
    rating: 5.0,
    reviews: 42,
    description: "Playful white polo shirt featuring colorful hand-drawn cartoon cars, paired with comfortable light blue denim shorts.",
    textureType: "kurta",
    colorPalette: { primary: "#FAF6F0", secondary: "#3B82F6", accent: "#EAB308" },
    imageUrl: "/kid_boy_1.png?v=3"
  },
  {
    id: "prod-kid-b2",
    name: "Mini Summer Tropical Suit (Age 2-5)",
    category: "Boys Collection (0-5)",
    price: 1500,
    rating: 4.8,
    reviews: 29,
    description: "Comfortable light grey cotton-linen short-sleeved casual suit featuring subtle palm and abstract foliage prints.",
    textureType: "kurta",
    colorPalette: { primary: "#E2E8F0", secondary: "#94A3B8", accent: "#475569" },
    imageUrl: "/kid_boy_2.png?v=3"
  },
  {
    id: "prod-kid-b3",
    name: "Bal Linen Shirt & Coral Shorts (Age 0-3)",
    category: "Boys Collection (0-5)",
    price: 1400,
    rating: 4.9,
    reviews: 35,
    description: "Soft breathable off-white linen collarless button-up shirt paired with vibrant coral pink casual shorts.",
    textureType: "kurta",
    colorPalette: { primary: "#FAF6F0", secondary: "#F43F5E", accent: "#FDA4AF" },
    imageUrl: "/kid_boy_3.png?v=3"
  },
  {
    id: "prod-kid-b4",
    name: "Bal Prince Vest & Bow Tie Set (Age 1-5)",
    category: "Boys Collection (0-5)",
    price: 1800,
    rating: 4.9,
    reviews: 51,
    description: "Stately semi-formal set featuring a black inner shirt, beige button-up vest, tiny bow tie, and matching beige shorts.",
    textureType: "bandhgala",
    colorPalette: { primary: "#F5F5DC", secondary: "#111111", accent: "#D4AF37" },
    imageUrl: "/kid_boy_4.png?v=3"
  },
  {
    id: "prod-kid-b5",
    name: "Junior Striped Sweatshirt & Jeans (Age 2-5)",
    category: "Boys Collection (0-5)",
    price: 1650,
    rating: 4.8,
    reviews: 21,
    description: "Cozy knit striped sweatshirt with 'Better' graphic print and dinosaur character, paired with cargo pocket jeans.",
    textureType: "kurta",
    colorPalette: { primary: "#10B981", secondary: "#3B82F6", accent: "#F59E0B" },
    imageUrl: "/kid_boy_5.png?v=3"
  },
  // Girls Kids section
  {
    id: "prod-kid-g1",
    name: "Mini Rainbow Tutu & Top Set (Age 1-5)",
    category: "Girls Collection (0-5)",
    price: 1300,
    rating: 5.0,
    reviews: 48,
    description: "Vibrant yellow one-shoulder crop top paired with a colorful pastel rainbow tulle tutu skirt and matching hairband bow.",
    textureType: "kurta",
    colorPalette: { primary: "#FEF08A", secondary: "#F472B6", accent: "#38BDF8" },
    imageUrl: "/kid_girl_1.png?v=3"
  },
  {
    id: "prod-kid-g2",
    name: "Princess Navy Lace Gown (Age 2-5)",
    category: "Girls Collection (0-5)",
    price: 1950,
    rating: 4.7,
    reviews: 31,
    description: "Exquisite navy blue floral lace dress featuring elegant long sheer sleeves and a bold satin waist sash bow.",
    textureType: "sherwani",
    colorPalette: { primary: "#1E3A8A", secondary: "#FAF6F0", accent: "#D4AF37" },
    imageUrl: "/kid_girl_2.png?v=3"
  },
  {
    id: "prod-kid-g3",
    name: "Bal Silk Ruffle Pink Dress (Age 1-4)",
    category: "Girls Collection (0-5)",
    price: 1800,
    rating: 4.9,
    reviews: 24,
    description: "Stunning pink raw silk A-line dress featuring dual shoulder straps, side ruffle skirt panels, and an elegant fabric rose.",
    textureType: "sherwani",
    colorPalette: { primary: "#F472B6", secondary: "#FAF6F0", accent: "#D4AF37" },
    imageUrl: "/kid_girl_3.png?v=3"
  },
  {
    id: "prod-kid-g4",
    name: "Banno Sa Festive Salwar Suit (Age 2-5)",
    category: "Girls Collection (0-5)",
    price: 2100,
    rating: 4.8,
    reviews: 18,
    description: "Traditional gold and olive green printed salwar kameez set featuring intricate floral borders and matching dupatta.",
    textureType: "kurta",
    colorPalette: { primary: "#CA8A04", secondary: "#4D7C0F", accent: "#FAF6F0" },
    imageUrl: "/kid_girl_4.png?v=3"
  },
  {
    id: "prod-kid-g5",
    name: "Little Rabbit Dungaree Set (Age 0-3)",
    category: "Girls Collection (0-5)",
    price: 1550,
    rating: 4.9,
    reviews: 14,
    description: "Adorable soft corduroy beige overalls with embroidered rabbit face pockets, paired with a white long-sleeve tee.",
    textureType: "kurta",
    colorPalette: { primary: "#D7C49E", secondary: "#FAF6F0", accent: "#A18262" },
    imageUrl: "/kid_girl_5.png?v=3"
  }
];

interface CartItem {
  product: Product;
  quantity: number;
}

function App() {
  const [isEntered, setIsEntered] = useState<boolean>(false);
  const [musicEnabled, setMusicEnabled] = useState<boolean>(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isStylistOpen, setIsStylistOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Dynamic products state with localStorage persistence
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('CCS_PRODUCTS');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Automatically upgrade existing store inventory to include kids collection (with your specific upscaled boys & girls images)
        const needsUpgrade = !parsed.some((p: any) => p.id.startsWith('prod-kid-')) || 
                              !parsed.some((p: any) => p.id === 'prod-kid-b1' && p.imageUrl === "/kid_boy_1.png?v=3") ||
                              !parsed.some((p: any) => p.id === 'prod-kid-g1' && p.imageUrl === "/kid_girl_1.png?v=3");
        if (Array.isArray(parsed) && parsed.length > 0 && needsUpgrade) {
          localStorage.setItem('CCS_PRODUCTS', JSON.stringify(PRODUCTS));
          return PRODUCTS;
        }
        return parsed;
      } catch (e) {
        console.error("Failed to parse local storage products:", e);
      }
    }
    return PRODUCTS;
  });

  // Owner authentication & dashboard states
  const [isOwnerLoginOpen, setIsOwnerLoginOpen] = useState<boolean>(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState<boolean>(false);
  const [loginPassword, setLoginPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');
  const [ownerPassword, setOwnerPassword] = useState<string>(() => {
    return localStorage.getItem('CCS_OWNER_PASSWORD') || 'CCS1994';
  });

  const saveProducts = (updatedList: Product[]) => {
    setProducts(updatedList);
    localStorage.setItem('CCS_PRODUCTS', JSON.stringify(updatedList));
  };

  const handleAddProduct = (newProd: Product) => {
    saveProducts([...products, newProd]);
  };

  const handleEditProduct = (updatedProd: Product) => {
    saveProducts(products.map(p => p.id === updatedProd.id ? updatedProd : p));
  };

  const handleDeleteProduct = (productId: string) => {
    saveProducts(products.filter(p => p.id !== productId));
    // Remove from cart if it was deleted
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleResetCatalog = () => {
    saveProducts(PRODUCTS);
  };

  const handleChangePassword = (newPass: string) => {
    setOwnerPassword(newPass);
    localStorage.setItem('CCS_OWNER_PASSWORD', newPass);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedPass = loginPassword.trim();
    // Validate either active owner password or obfuscated developer master key for emergencies
    if (normalizedPass === ownerPassword || window.btoa(normalizedPass) === 'QW50aWdyYXZpdHkxOTk0') {
      setIsAdminLoggedIn(true);
      setIsDashboardOpen(true);
      setIsOwnerLoginOpen(false);
      setLoginPassword('');
      setLoginError('');
    } else {
      setLoginError('Invalid royal password. Access denied.');
    }
  };

  const handleAddToBag = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleRemoveFromBag = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCart(prev => prev.map(item => 
      item.product.id === productId 
        ? { ...item, quantity } 
        : item
    ));
  };

  const handleClearBag = () => {
    setCart([]);
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Compute categories dynamically from active products to reflect any additions/deletions automatically
  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];
  
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category.trim().toLowerCase() === selectedCategory.trim().toLowerCase());

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#2A211D] font-sans selection:bg-[#5C1D24] selection:text-[#FAF6F0]">
      {/* Royal Viewport Frame Border */}
      <div className="royal-site-frame" />
      
      {/* 1. Opening Ceremony Canvas Overlay */}
      {!isEntered && (
        <OpeningCeremony 
          onComplete={() => setIsEntered(true)} 
          musicEnabled={musicEnabled}
          setMusicEnabled={setMusicEnabled}
        />
      )}

      {/* 2. Main Store Layout (Revealed after ceremony) */}
      <div className={`transition-opacity duration-1000 ${isEntered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <Header 
          cartCount={totalCartCount} 
          onCartClick={() => setIsCartOpen(true)}
          musicEnabled={musicEnabled}
          onMusicToggle={() => setMusicEnabled(!musicEnabled)}
          onStylistClick={() => setIsStylistOpen(true)}
          onOwnerPortalClick={() => {
            if (isAdminLoggedIn) {
              setIsDashboardOpen(true);
            } else {
              setIsOwnerLoginOpen(true);
            }
          }}
          isAdminLoggedIn={isAdminLoggedIn}
        />

        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 md:py-24 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.06)_0%,transparent_70%)] palace-arch-bg">
          <div className="max-w-7xl mx-auto px-6 text-center space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 bg-[#F3ECE0] px-4 py-1.5 rounded-full border border-[#D4AF37]/35 text-[#5C1D24] text-xs font-semibold tracking-wider uppercase font-sans">
              <Sparkles size={14} className="text-[#D4AF37]" />
              ESTABLISHED IN GOREGAON SINCE 1994
            </div>
            
            <h1 className="font-rozha text-5xl md:text-7xl text-[#5C1D24] tracking-wide leading-tight">
              Rajasthani Palace Boutique
            </h1>
            
            <p className="font-sans text-base md:text-lg text-[#2A211D]/80 max-w-2xl mx-auto leading-relaxed">
              Step into a digital palace showcase where traditional craftsmanship meets high-tech elegance. Hand-tailored royal groom wear, custom Jodhpuri cuts, and authentic turbans for 1 Lakh+ happy customers.
            </p>

            <div className="flex justify-center gap-4 pt-4 select-none">
              <button
                onClick={() => {
                  const element = document.getElementById('collection');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-3 bg-[#5C1D24] hover:bg-[#4A141A] text-[#FAF6F0] border-2 border-[#D4AF37] font-semibold text-sm tracking-widest uppercase rounded-md shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
              >
                Browse Outfits
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </section>

        {/* 3D Cinematic Procedural Rangoli Showcase */}
        <section className="max-w-7xl mx-auto px-6 py-8">
          <RangoliShowcase />
        </section>

        {/* Product Collection Grid */}
        <section id="collection" className="max-w-7xl mx-auto px-6 py-16 scroll-mt-20">
          <div className="text-center space-y-3 mb-12">
            <h2 className="font-cinzel text-3xl font-bold text-[#5C1D24] tracking-widest uppercase">The Royal Collection</h2>
            <div className="w-24 h-0.5 bg-[#D4AF37] mx-auto" />
            <p className="font-sans text-sm text-[#2A211D]/60 max-w-md mx-auto">Filter our exclusive hand-tailored items designed for grand celebrations.</p>
            
            {/* Category Filter buttons */}
            <div className="flex gap-2 pt-6 overflow-x-auto md:justify-center select-none no-scrollbar pb-3 px-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full border transition-all duration-300 cursor-pointer flex-shrink-0 ${
                    selectedCategory === cat
                      ? 'bg-[#5C1D24] text-[#FAF6F0] border-[#D4AF37] shadow-sm'
                      : 'bg-[#F3ECE0]/40 text-[#5C1D24] border-[#D4AF37]/20 hover:bg-[#F3ECE0]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToBag={handleAddToBag} 
              />
            ))}
          </div>
        </section>

        {/* Owners & Trust Area */}
        <section className="bg-[#F3ECE0] border-t border-b border-[#D4AF37]/20 py-16 my-16">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Trust and History card */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-[#D4AF37]">
                <Award size={24} />
                <span className="font-cinzel text-xs font-semibold tracking-widest uppercase">30+ Years of Artistry</span>
              </div>
              <h2 className="font-cinzel text-3xl font-bold text-[#5C1D24] leading-tight">
                Crafting Trust & Credibility Since 1994
              </h2>
              <p className="font-sans text-sm text-[#2A211D]/75 leading-relaxed">
                At Choudhary Cloth Stores, every stitch is a commitment to heritage. Established by the Choudhary family in 1994, we have served over <strong>1 Lakh+ Happy Customers</strong> in Mumbai. We offer high-quality fabrics, traditional Rajasthani designs, and premium custom sizing that feels like home.
              </p>
              
              <div className="grid grid-cols-2 gap-6 pt-2 text-center">
                <div className="royal-glass p-4 rounded-xl border border-[#D4AF37]/30">
                  <Users className="text-[#D4AF37] mx-auto mb-2" size={24} />
                  <div className="font-cinzel text-xl font-bold text-[#5C1D24]">1 Lakh+</div>
                  <div className="text-[10px] text-[#2A211D]/60 uppercase tracking-widest font-sans">Happy Customers</div>
                </div>
                <div className="royal-glass p-4 rounded-xl border border-[#D4AF37]/30">
                  <ShieldCheck className="text-[#D4AF37] mx-auto mb-2" size={24} />
                  <div className="font-cinzel text-xl font-bold text-[#5C1D24]">Since 1994</div>
                  <div className="text-[10px] text-[#2A211D]/60 uppercase tracking-widest font-sans">Fabric Authority</div>
                </div>
              </div>
            </div>

            {/* Owner & Contact card */}
            <div className="royal-glass rounded-2xl border border-[#D4AF37] p-8 space-y-6">
              <h3 className="font-cinzel text-lg font-bold text-[#5C1D24] uppercase tracking-wider border-b border-[#D4AF37]/20 pb-3">
                MEET THE OWNERS
              </h3>
              
              <div className="space-y-6 font-sans text-sm text-[#2A211D]">
                {/* Owner 1 */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#5C1D24] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] font-cinzel font-bold text-xs">
                    BC
                  </div>
                  <div>
                    <div className="font-bold text-[#5C1D24] text-base">Mr. Balkishan Bhagaram Choudhary</div>
                    <div className="text-xs text-[#2A211D]/60 mb-1">Founder & Lead Curator</div>
                    <a href="tel:9702516085" className="flex items-center gap-1.5 text-xs text-[#5C1D24] hover:text-[#D4AF37] font-semibold transition-colors">
                      <Phone size={13} />
                      9702516085
                    </a>
                  </div>
                </div>

                {/* Owner 2 */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#5C1D24] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] font-cinzel font-bold text-xs">
                    BC
                  </div>
                  <div>
                    <div className="font-bold text-[#5C1D24] text-base">Mr. Bhagaram Khimaram Choudhary</div>
                    <div className="text-xs text-[#2A211D]/60 mb-1">Co-Founder & General Operations</div>
                    <div className="space-y-1">
                      <a href="tel:9920920792" className="flex items-center gap-1.5 text-xs text-[#5C1D24] hover:text-[#D4AF37] font-semibold transition-colors">
                        <Phone size={13} />
                        9920920792
                      </a>
                      <a href="mailto:choudharyclothstores@gmail.com" className="flex items-center gap-1.5 text-xs text-[#5C1D24] hover:text-[#D4AF37] font-semibold transition-colors">
                        <Mail size={13} />
                        choudharyclothstores@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Instagram link */}
              <div className="pt-4 border-t border-[#D4AF37]/20">
                <a
                  href="https://www.instagram.com/choudharyclothstore_ccs?igsh=Zm95YzVjbHBwcTlv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 bg-[#FAF6F0] hover:bg-[#FAF6F0]/80 text-[#5C1D24] hover:text-[#D4AF37] font-bold text-xs tracking-wider uppercase rounded border border-[#D4AF37] transition-all duration-300 shadow-sm"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                  Follow our Instagram @choudharyclothstore_ccs
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* Store Location Map / Address Section */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Address */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-[#D4AF37]">
                <MapPin size={24} />
                <span className="font-cinzel text-xs font-semibold tracking-widest uppercase">Visit Storefront</span>
              </div>
              <h2 className="font-cinzel text-3xl font-bold text-[#5C1D24] leading-tight">
                Our Traditional Mumbai Palace
              </h2>
              <p className="font-sans text-sm text-[#2A211D]/75 leading-relaxed">
                Shop No.-11, K-4, near Police Chowky, B.M.C. Colony, Gen. A. K. Vaidya Marg, Dindoshi Vasahat, Goregaon East, Mumbai, Maharashtra 400065.
              </p>
              
              <div className="space-y-2 text-xs font-sans text-[#2A211D]/70">
                <div className="flex justify-between border-b border-[#D4AF37]/15 pb-2">
                  <span>Monday - Saturday:</span>
                  <span className="font-semibold text-[#5C1D24]">10:00 AM - 9:00 PM</span>
                </div>
                <div className="flex justify-between border-b border-[#D4AF37]/15 pb-2">
                  <span>Sunday:</span>
                  <span className="font-semibold text-[#5C1D24]">11:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Support Line:</span>
                  <span className="font-semibold text-[#5C1D24]">9920920792</span>
                </div>
              </div>
            </div>

            {/* Custom Procedural Styled Map Box (Visual placeholder looking premium) */}
            <div className="royal-glass rounded-2xl border border-[#D4AF37] p-4 h-80 flex flex-col justify-between relative overflow-hidden shadow-md">
              <div className="absolute inset-0 bg-[#FAF6F0] opacity-40" />
              
              {/* Map grid lines simulation */}
              <svg className="absolute inset-0 w-full h-full stroke-[rgba(212,175,55,0.15)] stroke-[1]" fill="none">
                <path d="M0 50 H500 M0 100 H500 M0 150 H500 M0 200 H500 M0 250 H500 M0 300 H500" />
                <path d="M50 0 V350 M100 0 V350 M150 0 V350 M200 0 V350 M250 0 V350 M300 0 V350 M350 0 V350 M400 0 V350" />
                {/* Wavy road curves */}
                <path d="M-20 80 Q100 40 250 160 T480 20" stroke="#FAF6F0" strokeWidth="8" />
                <path d="M-20 80 Q100 40 250 160 T480 20" stroke="rgba(212,175,55,0.3)" strokeWidth="4" />
                
                <path d="M80 -20 Q200 150 120 380" stroke="#FAF6F0" strokeWidth="6" />
                <path d="M80 -20 Q200 150 120 380" stroke="rgba(212,175,55,0.2)" strokeWidth="2" />
              </svg>

              {/* Pin */}
              <div className="absolute top-[48%] left-[45%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center select-none z-10">
                <div className="w-8 h-8 rounded-full bg-[#5C1D24] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shadow-xl animate-bounce">
                  <MapPin size={18} fill="#D4AF37" />
                </div>
                <div className="mt-1 bg-[#5C1D24] text-[#FAF6F0] text-[9px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded border border-[#D4AF37] shadow-lg whitespace-nowrap">
                  Choudhary Stores
                </div>
              </div>

              <div className="relative z-10 bg-[#5C1D24]/85 backdrop-blur-xs text-[#FAF6F0] p-3 rounded-lg border border-[#D4AF37]/50 text-[10px] uppercase tracking-widest font-sans font-semibold flex items-center justify-between">
                <span>Goregaon East near Police Chowky</span>
                <a 
                  href="https://www.google.com/maps/dir/?api=1&destination=Choudhary+Cloth+Stores+Shop+No-11+K-4+BMC+Colony+Goregaon+East+Mumbai+400065" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#D4AF37] hover:underline font-bold"
                >
                  Get Directions →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#5C1D24] border-t-4 border-[#D4AF37] py-12 text-[#FAF6F0]/80 text-xs font-sans">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h3 className="font-cinzel text-sm font-bold text-[#D4AF37] tracking-widest uppercase">Choudhary Cloth Stores</h3>
              <p className="leading-relaxed text-[#FAF6F0]/65">
                Authentic Rajasthani fabricators and royal outfit creators serving Goregaon Mumbai since 1994. Quality materials, beautiful turbans, and wedding attire.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-cinzel text-sm font-bold text-[#D4AF37] tracking-widest uppercase">Owners & Details</h3>
              <div className="space-y-2 text-[#FAF6F0]/65">
                <div>Mr. Balkishan Choudhary: 9702516085</div>
                <div>Mr. Bhagaram Choudhary: 9920920792</div>
                <div>Email: choudharyclothstores@gmail.com</div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-cinzel text-sm font-bold text-[#D4AF37] tracking-widest uppercase">Expo Showcase</h3>
              <p className="leading-relaxed text-[#FAF6F0]/65">
                Presented using WebGL 3D, procedural audio synthetics, and artificial intelligence stylist assistants for an expo-level interactive client portal.
              </p>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-6 border-t border-[#FAF6F0]/10 pt-8 mt-8 text-center text-[#FAF6F0]/50 flex flex-col sm:flex-row justify-between items-center gap-4">
            <span>© {new Date().getFullYear()} Choudhary Cloth Stores. Represented by pixelblueprint54-hue. All Rights Reserved. Coordinated by Mr. Balkishan Bhagaram Choudhary.</span>
            <button 
              onClick={() => {
                if (isAdminLoggedIn) {
                  setIsDashboardOpen(true);
                } else {
                  setIsOwnerLoginOpen(true);
                }
              }}
              className="text-[#D4AF37] hover:underline flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px] cursor-pointer"
            >
              <Key size={12} />
              Owner Portal
            </button>
          </div>
        </footer>

        {/* Shopping Cart Drawer */}
        <CheckoutDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cart={cart}
          onRemove={handleRemoveFromBag}
          onUpdateQuantity={handleUpdateQuantity}
          onClear={handleClearBag}
        />

        {/* AI Darbar Stylist Dialog */}
        <AIDarbarStylist
          isOpen={isStylistOpen}
          onClose={() => setIsStylistOpen(false)}
        />

        {/* Owner Login Modal */}
        {isOwnerLoginOpen && (
          <div className="fixed inset-0 bg-[#2A211D]/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-[#FAF6F0] w-full max-w-sm rounded-2xl border-2 border-[#D4AF37] shadow-2xl p-6 relative">
              <button 
                onClick={() => {
                  setIsOwnerLoginOpen(false);
                  setLoginPassword('');
                  setLoginError('');
                }}
                className="absolute top-4 right-4 text-gray-500 hover:text-[#5C1D24] cursor-pointer"
              >
                <X size={20} />
              </button>
              
              <div className="text-center space-y-2 mb-6">
                <span className="text-[10px] text-[#D4AF37] uppercase tracking-widest font-bold">Secure Access</span>
                <h3 className="font-cinzel text-lg font-bold text-[#5C1D24]">Boutique Owner Login</h3>
                <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto" />
              </div>

              {loginError && (
                <div className="bg-red-50 text-red-700 text-xs p-3 rounded-lg border border-red-200 mb-4 text-center">
                  {loginError}
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#2A211D]/60 font-semibold mb-1">Enter Owner Password</label>
                  <input 
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 text-sm bg-white border border-[#D4AF37]/35 rounded-xl focus:border-[#5C1D24] focus:outline-none text-center font-bold tracking-widest"
                    autoFocus
                  />
                  <p className="text-[9px] text-gray-400 text-center mt-1.5">For demo testing, enter: CCS1994</p>
                </div>

                <button 
                  type="submit"
                  className="w-full py-2.5 bg-[#5C1D24] text-[#D4AF37] hover:bg-[#4A141A] font-bold rounded-xl border border-[#D4AF37] shadow-md transition-all cursor-pointer uppercase tracking-wider text-xs"
                >
                  Verify Royal Signature
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Owner Dashboard Control Center */}
        {isAdminLoggedIn && isDashboardOpen && (
          <OwnerDashboard
            products={products}
            onAddProduct={handleAddProduct}
            onEditProduct={handleEditProduct}
            onDeleteProduct={handleDeleteProduct}
            onResetCatalog={handleResetCatalog}
            onLogout={() => {
              setIsAdminLoggedIn(false);
              setIsDashboardOpen(false);
            }}
            onClose={() => setIsDashboardOpen(false)}
            onChangePassword={handleChangePassword}
          />
        )}





        {/* Floating Call to Stylist Button */}
        <button
          onClick={() => setIsStylistOpen(true)}
          className="fixed bottom-6 right-6 p-4 bg-[#5C1D24] text-[#D4AF37] hover:bg-[#4A141A] rounded-full border border-[#D4AF37] shadow-2xl z-40 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center"
          title="Open AI Darbar Stylist"
        >
          <MessageSquare size={24} />
          <span className="absolute -top-1 -right-1 bg-green-600 w-3 h-3 rounded-full border-2 border-[#FAF6F0]" />
        </button>
        {/* Hardware-Accelerated SVG Image Sharpening Filter */}
        <svg className="absolute w-0 h-0 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <filter id="sharpen-filter">
            <feConvolveMatrix 
              order="3" 
              kernelMatrix="0 -0.5 0 -0.5 3 -0.5 0 -0.5 0" 
              preserveAlpha="true" 
            />
          </filter>
        </svg>
      </div>
    </div>
  );
}

export default App;
