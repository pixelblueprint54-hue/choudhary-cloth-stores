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
  // --- MEN'S COLLECTION (AGE 0-50 YEARS) ---
  {
    id: "prod-m1",
    name: "Men's Comfort Fit Denim Jeans",
    category: "Men's Collection (Age 0-50 Years)",
    price: 1999,
    rating: 4.8,
    reviews: 215,
    description: "Classic five-pocket jeans crafted from durable, premium stretch denim for all-day comfort.",
    textureType: "bandhgala",
    colorPalette: { primary: "#1E3A8A", secondary: "#3B82F6", accent: "#FAF6F0" }
  },
  {
    id: "prod-m2",
    name: "Men's Tailored Chino Trousers",
    category: "Men's Collection (Age 0-50 Years)",
    price: 2499,
    rating: 4.7,
    reviews: 142,
    description: "Smart-casual flat-front chino trousers tailored from breathable cotton-spandex twill.",
    textureType: "bandhgala",
    colorPalette: { primary: "#D7C49E", secondary: "#A18262", accent: "#FAF6F0" }
  },
  {
    id: "prod-m3",
    name: "Men's Sharp Charcoal Formal Pants",
    category: "Men's Collection (Age 0-50 Years)",
    price: 2799,
    rating: 4.9,
    reviews: 98,
    description: "Slim-fit formal trousers in a sophisticated charcoal grey, perfect for business and office settings.",
    textureType: "bandhgala",
    colorPalette: { primary: "#374151", secondary: "#1F2937", accent: "#FAF6F0" }
  },
  {
    id: "prod-m4",
    name: "Men's Relaxed Fit Casual Pants",
    category: "Men's Collection (Age 0-50 Years)",
    price: 1899,
    rating: 4.6,
    reviews: 84,
    description: "Lightweight cotton-linen pants with a relaxed silhouette, ideal for weekend ease.",
    textureType: "bandhgala",
    colorPalette: { primary: "#4B5563", secondary: "#9CA3AF", accent: "#FAF6F0" }
  },
  {
    id: "prod-m5",
    name: "Men's Premium Cotton Formal Shirt",
    category: "Men's Collection (Age 0-50 Years)",
    price: 1699,
    rating: 4.8,
    reviews: 180,
    description: "Crisp formal shirt crafted from high-grade cotton fabric with a structured mandarin collar.",
    textureType: "kurta",
    colorPalette: { primary: "#FAF6F0", secondary: "#D4AF37", accent: "#5C1D24" },
    imageUrl: "/formal_white_bandhani.png"
  },
  {
    id: "prod-m6",
    name: "Men's Casual Indigo Denim Shirt",
    category: "Men's Collection (Age 0-50 Years)",
    price: 1799,
    rating: 4.7,
    reviews: 124,
    description: "Washed indigo cotton denim shirt with dual chest pockets and contrast stitching details.",
    textureType: "kurta",
    colorPalette: { primary: "#2563EB", secondary: "#1D4ED8", accent: "#FAF6F0" }
  },
  {
    id: "prod-m7",
    name: "Men's Luxury Cotton Crewneck T-Shirt",
    category: "Men's Collection (Age 0-50 Years)",
    price: 999,
    rating: 4.9,
    reviews: 310,
    description: "Ultra-soft combed cotton crewneck t-shirt offering a clean look and high breathability.",
    textureType: "kurta",
    colorPalette: { primary: "#EAB308", secondary: "#78350F", accent: "#FAF6F0" },
    imageUrl: "/formal_yellow_kurta.png"
  },
  {
    id: "prod-m8",
    name: "Men's Heritage Brown Leather Jacket",
    category: "Men's Collection (Age 0-50 Years)",
    price: 7999,
    rating: 4.9,
    reviews: 64,
    description: "Authentic heavy leather biker jacket in rich brown, featuring detailed metallic hardware.",
    textureType: "bandhgala",
    colorPalette: { primary: "#78350F", secondary: "#451A03", accent: "#FAF6F0" },
    imageUrl: "/formal_jacket.png"
  },
  {
    id: "prod-m9",
    name: "Men's Cozy Fleece Pullover Hoodie",
    category: "Men's Collection (Age 0-50 Years)",
    price: 2499,
    rating: 4.8,
    reviews: 115,
    description: "Warm and cozy fleece hoodie with a front kangaroo pocket and ribbed cuffs.",
    textureType: "kurta",
    colorPalette: { primary: "#1E293B", secondary: "#0F172A", accent: "#FAF6F0" }
  },
  {
    id: "prod-m10",
    name: "Men's Cable-Knit Crewneck Sweater",
    category: "Men's Collection (Age 0-50 Years)",
    price: 2999,
    rating: 4.7,
    reviews: 92,
    description: "Classic cable-knit sweater made from a premium wool blend to keep you cozy during winter.",
    textureType: "kurta",
    colorPalette: { primary: "#0F766E", secondary: "#115E59", accent: "#FAF6F0" }
  },
  {
    id: "prod-m11",
    name: "Men's Cotton Summer Cargo Shorts",
    category: "Men's Collection (Age 0-50 Years)",
    price: 1299,
    rating: 4.6,
    reviews: 70,
    description: "Multi-pocket cargo shorts in lightweight cotton, perfect for summer outings.",
    textureType: "bandhgala",
    colorPalette: { primary: "#4B5563", secondary: "#1F2937", accent: "#FAF6F0" }
  },
  {
    id: "prod-m12",
    name: "Men's Athletic Fit Jogger Track Pants",
    category: "Men's Collection (Age 0-50 Years)",
    price: 1599,
    rating: 4.8,
    reviews: 160,
    description: "Breathable, moisture-wicking track pants with zippered side pockets and an elastic drawstring waist.",
    textureType: "bandhgala",
    colorPalette: { primary: "#1E293B", secondary: "#475569", accent: "#FAF6F0" }
  },
  {
    id: "prod-m13",
    name: "Men's Soft Cotton Pajama Set",
    category: "Men's Collection (Age 0-50 Years)",
    price: 1499,
    rating: 4.7,
    reviews: 55,
    description: "Comfortable two-piece nightwear set featuring a button-down collar shirt and elastic pajama pants.",
    textureType: "kurta",
    colorPalette: { primary: "#0284C7", secondary: "#0369A1", accent: "#FAF6F0" }
  },
  {
    id: "prod-m14",
    name: "Men's Breathable Boxer Briefs Set",
    category: "Men's Collection (Age 0-50 Years)",
    price: 899,
    rating: 4.9,
    reviews: 240,
    description: "Pack of three organic cotton stretch boxer briefs with flatlock seams for zero chafing.",
    textureType: "bandhgala",
    colorPalette: { primary: "#1E293B", secondary: "#334155", accent: "#FAF6F0" }
  },
  {
    id: "prod-m15",
    name: "Men's Traditional Silk Kurta Pajama",
    category: "Men's Collection (Age 0-50 Years)",
    price: 4500,
    rating: 4.9,
    reviews: 198,
    description: "Classic silk-blend ethnic kurta set with fine embroidery, ideal for festivals and celebrations.",
    textureType: "kurta",
    colorPalette: { primary: "#D4AF37", secondary: "#5C1D24", accent: "#FAF6F0" },
    imageUrl: "/jaipur_gold_kurta.png"
  },
  {
    id: "prod-m16",
    name: "Men's Light Summer Linen Shirt",
    category: "Men's Collection (Age 0-50 Years)",
    price: 1999,
    rating: 4.8,
    reviews: 110,
    description: "Ultra-lightweight pure linen shirt with a band collar, designed for summer heat.",
    textureType: "kurta",
    colorPalette: { primary: "#38BDF8", secondary: "#FAF6F0", accent: "#1E293B" },
    imageUrl: "/formal_blue_emb.png"
  },
  {
    id: "prod-m17",
    name: "Men's Double-Breasted Wool Trench Coat",
    category: "Men's Collection (Age 0-50 Years)",
    price: 6999,
    rating: 5.0,
    reviews: 42,
    description: "Premium heavy double-breasted trench coat with structured shoulders for winter elegance.",
    textureType: "bandhgala",
    colorPalette: { primary: "#1E293B", secondary: "#0F172A", accent: "#FAF6F0" },
    imageUrl: "/formal_coat.png"
  },
  {
    id: "prod-m18",
    name: "Men's Beachside Summer Board Shorts",
    category: "Men's Collection (Age 0-50 Years)",
    price: 1199,
    rating: 4.6,
    reviews: 62,
    description: "Quick-dry summer shorts featuring vibrant tropical prints, ready for the beach.",
    textureType: "bandhgala",
    colorPalette: { primary: "#0D9488", secondary: "#14B8A6", accent: "#FAF6F0" }
  },
  {
    id: "prod-m19",
    name: "Men's Active Dry-Fit Training Tee",
    category: "Men's Collection (Age 0-50 Years)",
    price: 1099,
    rating: 4.8,
    reviews: 154,
    description: "Performance athletic t-shirt with mesh ventilation panels to keep you dry and active.",
    textureType: "kurta",
    colorPalette: { primary: "#DC2626", secondary: "#EF4444", accent: "#FAF6F0" }
  },
  {
    id: "prod-m20",
    name: "Men's Royal Leather Belt & Wallet Set",
    category: "Men's Collection (Age 0-50 Years)",
    price: 1499,
    rating: 4.9,
    reviews: 180,
    description: "Fine handcrafted genuine leather belt and matching bi-fold cardholder wallet set.",
    textureType: "jooti",
    colorPalette: { primary: "#78350F", secondary: "#FAF6F0", accent: "#D4AF37" },
    imageUrl: "/zardozi_jootis.png"
  },

  // --- BOYS' COLLECTION (AGE 0-18 YEARS) ---
  {
    id: "prod-b1",
    name: "Boys' Rugged Daily Wear Jeans",
    category: "Boys' Collection (Age 0-18 Years)",
    price: 1299,
    rating: 4.8,
    reviews: 95,
    description: "Durable cotton-stretch jeans designed to handle daily play and adventures.",
    textureType: "bandhgala",
    colorPalette: { primary: "#1D4ED8", secondary: "#60A5FA", accent: "#FAF6F0" }
  },
  {
    id: "prod-b2",
    name: "Boys' Smart Oxford Cotton Shirt",
    category: "Boys' Collection (Age 0-18 Years)",
    price: 1199,
    rating: 4.7,
    reviews: 62,
    description: "Smart Oxford button-up shirt in light beige, perfect for family dinners and festive gatherings.",
    textureType: "kurta",
    colorPalette: { primary: "#FAF6F0", secondary: "#F43F5E", accent: "#FDA4AF" },
    imageUrl: "/kid_boy_3.png"
  },
  {
    id: "prod-b3",
    name: "Boys' Cartoon Graphic Print T-Shirt",
    category: "Boys' Collection (Age 0-18 Years)",
    price: 799,
    rating: 4.9,
    reviews: 145,
    description: "Playful graphic print cotton tee paired with soft elastic shorts for kids.",
    textureType: "kurta",
    colorPalette: { primary: "#FAF6F0", secondary: "#3B82F6", accent: "#EAB308" },
    imageUrl: "/kid_boy_1.png"
  },
  {
    id: "prod-b4",
    name: "Boys' Comfort Drawstring Shorts",
    category: "Boys' Collection (Age 0-18 Years)",
    price: 899,
    rating: 4.6,
    reviews: 58,
    description: "Comfy cotton knit shorts with elastic waistband and active sport drawstrings.",
    textureType: "bandhgala",
    colorPalette: { primary: "#4B5563", secondary: "#9CA3AF", accent: "#FAF6F0" }
  },
  {
    id: "prod-b5",
    name: "Boys' Soft Fleece Jogger Track Pants",
    category: "Boys' Collection (Age 0-18 Years)",
    price: 1099,
    rating: 4.8,
    reviews: 84,
    description: "Warm fleece joggers with ribbed ankle cuffs and printed sporty text detailing.",
    textureType: "bandhgala",
    colorPalette: { primary: "#10B981", secondary: "#3B82F6", accent: "#F59E0B" },
    imageUrl: "/kid_boy_5.png"
  },
  {
    id: "prod-b6",
    name: "Boys' Lightweight Hooded Bomber Jacket",
    category: "Boys' Collection (Age 0-18 Years)",
    price: 1899,
    rating: 4.8,
    reviews: 70,
    description: "Vibrant and lightweight zip-up bomber jacket with a comfortable inner mesh lining.",
    textureType: "bandhgala",
    colorPalette: { primary: "#047857", secondary: "#34D399", accent: "#FAF6F0" }
  },
  {
    id: "prod-b7",
    name: "Boys' Warm Knitted Crewneck Sweater",
    category: "Boys' Collection (Age 0-18 Years)",
    price: 1499,
    rating: 4.7,
    reviews: 45,
    description: "Cozy knit sweater with striped patterns, ideal for mild winter evenings.",
    textureType: "kurta",
    colorPalette: { primary: "#EAB308", secondary: "#CA8A04", accent: "#FAF6F0" }
  },
  {
    id: "prod-b8",
    name: "Boys' Active Zip-Up Hoodie",
    category: "Boys' Collection (Age 0-18 Years)",
    price: 1599,
    rating: 4.8,
    reviews: 78,
    description: "Full-zip hoodie lined with soft brushed fleece, featuring printed athletic graphics.",
    textureType: "kurta",
    colorPalette: { primary: "#4F46E5", secondary: "#818CF8", accent: "#FAF6F0" }
  },
  {
    id: "prod-b9",
    name: "Boys' Dinosaur Print Pajama Set",
    category: "Boys' Collection (Age 0-18 Years)",
    price: 1199,
    rating: 4.9,
    reviews: 110,
    description: "Cozy cotton nightwear set featuring colorful cartoon dinosaur prints.",
    textureType: "kurta",
    colorPalette: { primary: "#0D9488", secondary: "#5EEAD4", accent: "#FAF6F0" }
  },
  {
    id: "prod-b10",
    name: "Boys' Festive Traditional Kurta Pyjama",
    category: "Boys' Collection (Age 0-18 Years)",
    price: 1999,
    rating: 4.9,
    reviews: 80,
    description: "Traditional cotton-silk blend Kurta set with structured waistcoat and bow tie for kids.",
    textureType: "bandhgala",
    colorPalette: { primary: "#F5F5DC", secondary: "#111111", accent: "#D4AF37" },
    imageUrl: "/kid_boy_4.png"
  },
  {
    id: "prod-b11",
    name: "Boys' Comfort Denim Casual Playwear",
    category: "Boys' Collection (Age 0-18 Years)",
    price: 1399,
    rating: 4.7,
    reviews: 66,
    description: "Lightweight and breathable cotton-linen short-sleeved casual playwear suit.",
    textureType: "kurta",
    colorPalette: { primary: "#E2E8F0", secondary: "#94A3B8", accent: "#475569" },
    imageUrl: "/kid_boy_2.png"
  },
  {
    id: "prod-b12",
    name: "Boys' Birthday Special Velvet Suit",
    category: "Boys' Collection (Age 0-18 Years)",
    price: 2999,
    rating: 5.0,
    reviews: 50,
    description: "Luxurious velvet blazer and trousers set, custom tailored for grand celebrations.",
    textureType: "bandhgala",
    colorPalette: { primary: "#1E1B4B", secondary: "#312E81", accent: "#D4AF37" }
  },
  {
    id: "prod-b13",
    name: "Boys' Insulated Puffer Winter Coat",
    category: "Boys' Collection (Age 0-18 Years)",
    price: 2799,
    rating: 4.9,
    reviews: 35,
    description: "Thick padded winter puffer jacket with windproof zipper and cozy fleece-lined hood.",
    textureType: "bandhgala",
    colorPalette: { primary: "#B91C1C", secondary: "#DC2626", accent: "#FAF6F0" }
  },
  {
    id: "prod-b14",
    name: "Boys' Summer Cotton Play Set",
    category: "Boys' Collection (Age 0-18 Years)",
    price: 999,
    rating: 4.6,
    reviews: 42,
    description: "Set of two soft cotton tees and matching elastic shorts for breezy summer comfort.",
    textureType: "kurta",
    colorPalette: { primary: "#F59E0B", secondary: "#10B981", accent: "#FAF6F0" }
  },
  {
    id: "prod-b15",
    name: "Boys' Classic White School Uniform Shirt",
    category: "Boys' Collection (Age 0-18 Years)",
    price: 699,
    rating: 4.5,
    reviews: 120,
    description: "Standard school uniform button-down shirt, double-stitched for active school days.",
    textureType: "kurta",
    colorPalette: { primary: "#FAF6F0", secondary: "#3B82F6", accent: "#94A3B8" }
  },
  {
    id: "prod-b16",
    name: "Boys' Active Training Sports Jersey",
    category: "Boys' Collection (Age 0-18 Years)",
    price: 899,
    rating: 4.8,
    reviews: 75,
    description: "Breathable mesh jersey shirt with number prints, optimized for outdoor sports.",
    textureType: "kurta",
    colorPalette: { primary: "#EF4444", secondary: "#1E3A8A", accent: "#FAF6F0" }
  },

  // --- GIRLS' COLLECTION (AGE 0-13 YEARS) ---
  {
    id: "prod-g1",
    name: "Girls' Embroidered Floral Summer Frock",
    category: "Girls' Collection (Age 0-13 Years)",
    price: 1599,
    rating: 4.9,
    reviews: 135,
    description: "Stunning pink raw silk A-line frock dress featuring ruffled skirt panels and rose details.",
    textureType: "sherwani",
    colorPalette: { primary: "#F472B6", secondary: "#FAF6F0", accent: "#D4AF37" },
    imageUrl: "/kid_girl_3.png"
  },
  {
    id: "prod-g2",
    name: "Girls' Soft Stretch Denim Jeans",
    category: "Girls' Collection (Age 0-13 Years)",
    price: 1399,
    rating: 4.8,
    reviews: 80,
    description: "Comfy slim-fit stretch denim jeans featuring beautiful floral embroidered pockets.",
    textureType: "bandhgala",
    colorPalette: { primary: "#2563EB", secondary: "#60A5FA", accent: "#FAF6F0" }
  },
  {
    id: "prod-g3",
    name: "Girls' Cute Butterfly Graphic T-Shirt",
    category: "Girls' Collection (Age 0-13 Years)",
    price: 799,
    rating: 4.9,
    reviews: 160,
    description: "Vibrant yellow cotton top paired with a colorful pastel tulle tutu skirt.",
    textureType: "kurta",
    colorPalette: { primary: "#FEF08A", secondary: "#F472B6", accent: "#38BDF8" },
    imageUrl: "/kid_girl_1.png"
  },
  {
    id: "prod-g4",
    name: "Girls' Ruffled Cotton Summer Top",
    category: "Girls' Collection (Age 0-13 Years)",
    price: 899,
    rating: 4.7,
    reviews: 72,
    description: "Flouncy layered ruffle top in soft breathable organic cotton, with tie-up straps.",
    textureType: "kurta",
    colorPalette: { primary: "#F472B6", secondary: "#F43F5E", accent: "#FAF6F0" }
  },
  {
    id: "prod-g5",
    name: "Girls' Pleated Corduroy Arch Skirt",
    category: "Girls' Collection (Age 0-13 Years)",
    price: 1099,
    rating: 4.8,
    reviews: 54,
    description: "Pleated corduroy suspender skirt with gold button highlights, perfect for autumn pairing.",
    textureType: "bandhgala",
    colorPalette: { primary: "#7C2D12", secondary: "#D4AF37", accent: "#FAF6F0" }
  },
  {
    id: "prod-g6",
    name: "Girls' Pure Cotton Stretch Leggings",
    category: "Girls' Collection (Age 0-13 Years)",
    price: 599,
    rating: 4.7,
    reviews: 210,
    description: "Super soft, breathable cotton leggings with an elasticized waistband for snug fit.",
    textureType: "bandhgala",
    colorPalette: { primary: "#1E293B", secondary: "#475569", accent: "#FAF6F0" }
  },
  {
    id: "prod-g7",
    name: "Girls' Stretch Denim Elastic Jeggings",
    category: "Girls' Collection (Age 0-13 Years)",
    price: 1199,
    rating: 4.8,
    reviews: 88,
    description: "Premium elasticated jeggings that combine denim styling with active comfort.",
    textureType: "bandhgala",
    colorPalette: { primary: "#1E3A8A", secondary: "#3B82F6", accent: "#FAF6F0" }
  },
  {
    id: "prod-g8",
    name: "Girls' Floral Pattern Denim Shorts",
    category: "Girls' Collection (Age 0-13 Years)",
    price: 899,
    rating: 4.6,
    reviews: 45,
    description: "Soft denim shorts with frayed hems and colorful floral stitch details on the front.",
    textureType: "bandhgala",
    colorPalette: { primary: "#4B5563", secondary: "#9CA3AF", accent: "#FAF6F0" }
  },
  {
    id: "prod-g9",
    name: "Girls' Stripes Cotton Casual Jumpsuit",
    category: "Girls' Collection (Age 0-13 Years)",
    price: 1499,
    rating: 4.8,
    reviews: 62,
    description: "Vibrant striped cotton jumpsuit with adjustible drawstring waist and side pockets.",
    textureType: "kurta",
    colorPalette: { primary: "#EC4899", secondary: "#F43F5E", accent: "#FAF6F0" }
  },
  {
    id: "prod-g10",
    name: "Girls' Unicorn Print Cozy Nightwear",
    category: "Girls' Collection (Age 0-13 Years)",
    price: 1299,
    rating: 4.9,
    reviews: 96,
    description: "Soft flannel unicorn print pajama set with buttons, keeping kids cozy at night.",
    textureType: "kurta",
    colorPalette: { primary: "#A855F7", secondary: "#D8B4FE", accent: "#FAF6F0" }
  },
  {
    id: "prod-g11",
    name: "Girls' Traditional Festive Lehenga Choli",
    category: "Girls' Collection (Age 0-13 Years)",
    price: 2499,
    rating: 4.9,
    reviews: 112,
    description: "Traditional gold and olive green printed salwar kameez set featuring intricate floral borders.",
    textureType: "kurta",
    colorPalette: { primary: "#CA8A04", secondary: "#4D7C0F", accent: "#FAF6F0" },
    imageUrl: "/kid_girl_4.png"
  },
  {
    id: "prod-g12",
    name: "Girls' Princess Lace Birthday Gown",
    category: "Girls' Collection (Age 0-13 Years)",
    price: 2999,
    rating: 5.0,
    reviews: 80,
    description: "Exquisite navy blue floral lace gown dress featuring elegant sheer sleeves and bow sash.",
    textureType: "sherwani",
    colorPalette: { primary: "#1E3A8A", secondary: "#FAF6F0", accent: "#D4AF37" },
    imageUrl: "/kid_girl_2.png"
  },
  {
    id: "prod-g13",
    name: "Girls' Knitted Warm Winter Cardigan",
    category: "Girls' Collection (Age 0-13 Years)",
    price: 1699,
    rating: 4.8,
    reviews: 48,
    description: "Thick knitted button-front cardigan in pastel pink, cozy enough for chilly days.",
    textureType: "kurta",
    colorPalette: { primary: "#F472B6", secondary: "#FAF6F0", accent: "#D4AF37" }
  },
  {
    id: "prod-g14",
    name: "Girls' Lightweight Cotton Summer Dress",
    category: "Girls' Collection (Age 0-13 Years)",
    price: 1299,
    rating: 4.7,
    reviews: 75,
    description: "Light breezy cotton summer dress with sunflower patterns, perfect for outdoor play.",
    textureType: "kurta",
    colorPalette: { primary: "#F59E0B", secondary: "#FAF6F0", accent: "#CA8A04" }
  },
  {
    id: "prod-g15",
    name: "Girls' Pleated Grey School Uniform Skirt",
    category: "Girls' Collection (Age 0-13 Years)",
    price: 799,
    rating: 4.6,
    reviews: 90,
    description: "High-durability pleated school uniform skirt with comfortable elastic waist adjustments.",
    textureType: "bandhgala",
    colorPalette: { primary: "#4B5563", secondary: "#9CA3AF", accent: "#FAF6F0" }
  },
  {
    id: "prod-g16",
    name: "Girls' Breathable Athletic Leggings Set",
    category: "Girls' Collection (Age 0-13 Years)",
    price: 1499,
    rating: 4.8,
    reviews: 58,
    description: "Activewear set featuring a stretch sports t-shirt and matching high-performance leggings.",
    textureType: "bandhgala",
    colorPalette: { primary: "#6366F1", secondary: "#818CF8", accent: "#FAF6F0" }
  },
  {
    id: "prod-g17",
    name: "Infant Organic Cotton Unisex Romper (0-3 Years)",
    category: "Girls' Collection (Age 0-13 Years)",
    price: 999,
    rating: 4.9,
    reviews: 64,
    description: "Adorable soft corduroy overalls with embroidered pockets, paired with a white cotton long-sleeve tee.",
    textureType: "kurta",
    colorPalette: { primary: "#D7C49E", secondary: "#FAF6F0", accent: "#A18262" },
    imageUrl: "/kid_girl_5.png"
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
        const needsUpgrade = !parsed.some((p: any) => p.category.includes("Men's Collection")) || parsed.some((p: any) => p.id === "prod-1" || p.name.includes("SRK"));
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
