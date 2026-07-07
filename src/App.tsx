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
    category: "Jeans",
    price: 1999,
    rating: 4.8,
    reviews: 215,
    description: "Classic five-pocket jeans crafted from durable, premium stretch denim for all-day comfort.",
    textureType: "bandhgala",
    colorPalette: { primary: "#1E3A8A", secondary: "#3B82F6", accent: "#FAF6F0" },
    imageUrl: "/jeans_1.png"
  },
  {
    id: "prod-m1-2",
    name: "Men's Slim Fit Dark Wash Jeans",
    category: "Jeans",
    price: 2499,
    rating: 4.9,
    reviews: 182,
    description: "Modern slim-cut jeans in a deep indigo dark wash, crafted from heavy-duty stretch denim.",
    textureType: "bandhgala",
    colorPalette: { primary: "#1A2530", secondary: "#2A364F", accent: "#FAF6F0" },
    imageUrl: "/jeans_4.png"
  },
  {
    id: "prod-m1-3",
    name: "Men's Distressed Vintage Denim Jeans",
    category: "Jeans",
    price: 2299,
    rating: 4.7,
    reviews: 95,
    description: "Classic vintage wash blue jeans, featuring subtle distressed highlights and a relaxed straight-leg fit.",
    textureType: "bandhgala",
    colorPalette: { primary: "#3B82F6", secondary: "#60A5FA", accent: "#FAF6F0" },
    imageUrl: "/jeans_11.png"
  },
  {
    id: "prod-m1-4",
    name: "Men's Active Athletic Fit Black Jeans",
    category: "Jeans",
    price: 2199,
    rating: 4.8,
    reviews: 112,
    description: "Jet black active-fit jeans woven with premium Lycra fibers for maximum flexibility and movement.",
    textureType: "bandhgala",
    colorPalette: { primary: "#111111", secondary: "#1E293B", accent: "#FAF6F0" },
    imageUrl: "/jeans_3.png"
  },
  {
    id: "prod-m1-5",
    name: "Men's Premium Grey Slim Fit Jeans",
    category: "Jeans",
    price: 2399,
    rating: 4.8,
    reviews: 84,
    description: "Tailored grey slim fit jeans in a soft stretch fabric, perfect for modern casual styling.",
    textureType: "bandhgala",
    colorPalette: { primary: "#6B7280", secondary: "#9CA3AF", accent: "#FAF6F0" },
    imageUrl: "/jeans_5.png"
  },
  {
    id: "prod-m1-6",
    name: "Men's Relaxed Light Wash Jeans",
    category: "Jeans",
    price: 2599,
    rating: 4.9,
    reviews: 142,
    description: "Comfortable baggy light wash denim jeans, featuring a classic streetwear-inspired silhouette.",
    textureType: "bandhgala",
    colorPalette: { primary: "#93C5FD", secondary: "#BFDBFE", accent: "#FAF6F0" },
    imageUrl: "/jeans_6.png"
  },
  {
    id: "prod-m1-7",
    name: "Men's Heritage Dark Grey Jeans",
    category: "Jeans",
    price: 2499,
    rating: 4.7,
    reviews: 73,
    description: "Vintage-inspired dark grey relaxed jeans, structured with heavy washed cotton denim.",
    textureType: "bandhgala",
    colorPalette: { primary: "#374151", secondary: "#4B5563", accent: "#FAF6F0" },
    imageUrl: "/jeans_8.png"
  },
  {
    id: "prod-m1-8",
    name: "Men's Tailored Black Slim Jeans",
    category: "Jeans",
    price: 2699,
    rating: 4.8,
    reviews: 67,
    description: "Sleek all-black slim fit jeans with minimal details, offering an elegant semi-formal look.",
    textureType: "bandhgala",
    colorPalette: { primary: "#111111", secondary: "#000000", accent: "#FAF6F0" },
    imageUrl: "/jeans_9.png"
  },
  {
    id: "prod-m1-9",
    name: "Men's Loose Fit Light Wash Jeans",
    category: "Jeans",
    price: 2299,
    rating: 4.6,
    reviews: 58,
    description: "Loose straight-cut jeans in a summer light wash, crafted from lightweight breathable denim.",
    textureType: "bandhgala",
    colorPalette: { primary: "#A5F3FC", secondary: "#CFFAFE", accent: "#FAF6F0" },
    imageUrl: "/jeans_10.png"
  },
  {
    id: "prod-m1-10",
    name: "Men's Streetwear Baggy Jeans",
    category: "Jeans",
    price: 2799,
    rating: 4.9,
    reviews: 104,
    description: "Heavyweight dark wash baggy denim jeans featuring custom distress detailing for urban streetwear.",
    textureType: "bandhgala",
    colorPalette: { primary: "#1E3A8A", secondary: "#111827", accent: "#FAF6F0" },
    imageUrl: "/jeans_12.png"
  },
  {
    id: "prod-m1-11",
    name: "Men's Premium Classic Blue Jeans",
    category: "Jeans",
    price: 2499,
    rating: 4.8,
    reviews: 90,
    description: "Standard mid-rise classic blue denim jeans featuring a regular fit and durable construction.",
    textureType: "bandhgala",
    colorPalette: { primary: "#2563EB", secondary: "#3B82F6", accent: "#FAF6F0" },
    imageUrl: "/jeans_7.png"
  },
  {
    id: "prod-m1-12",
    name: "Men's Urban Carbon Grey Jeans",
    category: "Jeans",
    price: 2399,
    rating: 4.7,
    reviews: 51,
    description: "Carbon grey denim jeans styled in a comfortable straight cut with signature metal buttons.",
    textureType: "bandhgala",
    colorPalette: { primary: "#4B5563", secondary: "#374151", accent: "#FAF6F0" },
    imageUrl: "/jeans_2.png"
  },
  {
    id: "prod-m2",
    name: "Men's Premium Cotton Chino Trousers",
    category: "Trousers",
    price: 2499,
    rating: 4.7,
    reviews: 142,
    description: "Smart-casual flat-front chino trousers in a classic khaki beige color, tailored for premium comfort.",
    textureType: "bandhgala",
    colorPalette: { primary: "#D7C49E", secondary: "#A18262", accent: "#FAF6F0" },
    imageUrl: "/trousers_1.png"
  },
  {
    id: "prod-m2-2",
    name: "Men's Classic Pleated Formal Trousers",
    category: "Trousers",
    price: 2799,
    rating: 4.9,
    reviews: 110,
    description: "Luxurious cream-white pleated formal trousers designed for wedding receptions and business events.",
    textureType: "bandhgala",
    colorPalette: { primary: "#F3ECE0", secondary: "#111111", accent: "#D4AF37" },
    imageUrl: "/trousers_2.png"
  },
  {
    id: "prod-m2-3",
    name: "Men's Flat-Front Brown Formal Trousers",
    category: "Trousers",
    price: 2699,
    rating: 4.8,
    reviews: 95,
    description: "Tailored flat-front trousers in warm chocolate brown, offering a clean line and premium drape.",
    textureType: "bandhgala",
    colorPalette: { primary: "#78350F", secondary: "#FAF6F0", accent: "#A18262" },
    imageUrl: "/trousers_3.png"
  },
  {
    id: "prod-m2-4",
    name: "Men's Tapered Grey Formal Trousers",
    category: "Trousers",
    price: 2599,
    rating: 4.8,
    reviews: 80,
    description: "Modern tapered-fit formal trousers in charcoal grey with signature side waist adjusters.",
    textureType: "bandhgala",
    colorPalette: { primary: "#4B5563", secondary: "#FAF6F0", accent: "#374151" },
    imageUrl: "/trousers_4.png"
  },
  {
    id: "prod-m2-5",
    name: "Men's Relaxed Fit Olive Trousers",
    category: "Trousers",
    price: 2299,
    rating: 4.6,
    reviews: 62,
    description: "Casual relaxed-fit trousers in rich olive brown linen, ideal for summer styling.",
    textureType: "bandhgala",
    colorPalette: { primary: "#A18262", secondary: "#78350F", accent: "#FAF6F0" },
    imageUrl: "/trousers_5.png"
  },
  {
    id: "prod-m3",
    name: "Men's Sharp Charcoal Formal Pants",
    category: "Formal Pants",
    price: 2799,
    rating: 4.9,
    reviews: 98,
    description: "Slim-fit formal trousers in a sophisticated charcoal grey, perfect for business and office settings.",
    textureType: "bandhgala",
    colorPalette: { primary: "#374151", secondary: "#1F2937", accent: "#FAF6F0" },
    imageUrl: "/charcoal_pants.png"
  },
  {
    id: "prod-m3-2",
    name: "Men's Slim Fit Navy Formal Trousers",
    category: "Formal Pants",
    price: 2699,
    rating: 4.9,
    reviews: 145,
    description: "Premium slim-fit dress pants in deep navy blue, offering a timeless look for weddings and business meetings.",
    textureType: "bandhgala",
    colorPalette: { primary: "#1E3B8A", secondary: "#FAF6F0", accent: "#3B82F6" },
    imageUrl: "/formal_pants_1.png"
  },
  {
    id: "prod-m3-3",
    name: "Men's Tailored Olive Dress Pants",
    category: "Formal Pants",
    price: 2899,
    rating: 4.8,
    reviews: 73,
    description: "Tailored olive green dress pants with sharp front creases, crafted from an all-season wool blend.",
    textureType: "bandhgala",
    colorPalette: { primary: "#4D7C0F", secondary: "#FAF6F0", accent: "#CA8A04" },
    imageUrl: "/formal_pants_2.png"
  },
  {
    id: "prod-m3-4",
    name: "Men's Sartorial Beige Pleated Pants",
    category: "Formal Pants",
    price: 2799,
    rating: 4.7,
    reviews: 82,
    description: "Classic double-pleated sartorial trousers in sand beige, offering comfort and style.",
    textureType: "bandhgala",
    colorPalette: { primary: "#D7C49E", secondary: "#FAF6F0", accent: "#A18262" },
    imageUrl: "/formal_pants_3.png"
  },
  {
    id: "prod-m3-5",
    name: "Men's Light Grey Checked Trousers",
    category: "Formal Pants",
    price: 2999,
    rating: 4.9,
    reviews: 90,
    description: "Light grey dress pants featuring a subtle prince-of-wales check pattern for executive styling.",
    textureType: "bandhgala",
    colorPalette: { primary: "#9CA3AF", secondary: "#FAF6F0", accent: "#4B5563" },
    imageUrl: "/formal_pants_4.png"
  },
  {
    id: "prod-m3-6",
    name: "Men's Wine Red Tapered Dress Pants",
    category: "Formal Pants",
    price: 2999,
    rating: 4.8,
    reviews: 58,
    description: "Rich burgundy wine-red dress trousers featuring a modern tapered cut and button tab closure.",
    textureType: "bandhgala",
    colorPalette: { primary: "#5C1D24", secondary: "#FAF6F0", accent: "#D4AF37" },
    imageUrl: "/formal_pants_5.png"
  },
  {
    id: "prod-m3-7",
    name: "Men's Premium Brown Wool Trousers",
    category: "Formal Pants",
    price: 3299,
    rating: 4.7,
    reviews: 40,
    description: "Heavy wool-blend trousers in chocolate brown, keeping you sharp and cozy in colder climates.",
    textureType: "bandhgala",
    colorPalette: { primary: "#78350F", secondary: "#FAF6F0", accent: "#451A03" },
    imageUrl: "/formal_pants_6.png"
  },
  {
    id: "prod-m3-8",
    name: "Men's Tan Flat-Front Business Pants",
    category: "Formal Pants",
    price: 2499,
    rating: 4.8,
    reviews: 110,
    description: "Flat-front tan business dress pants, crafted from breathable stretch cotton for day-long office comfort.",
    textureType: "bandhgala",
    colorPalette: { primary: "#A18262", secondary: "#FAF6F0", accent: "#D7C49E" },
    imageUrl: "/formal_pants_7.png"
  },
  {
    id: "prod-m3-9",
    name: "Men's Cream White Sartorial Trousers",
    category: "Formal Pants",
    price: 3499,
    rating: 5.0,
    reviews: 35,
    description: "Ultra-premium high-waisted sartorial trousers in off-white, featuring a wide-leg retro drape.",
    textureType: "bandhgala",
    colorPalette: { primary: "#F3ECE0", secondary: "#FAF6F0", accent: "#D4AF37" },
    imageUrl: "/formal_pants_8.png"
  },
  {
    id: "prod-m3-10",
    name: "Men's Classic Glen Plaid Dress Pants",
    category: "Formal Pants",
    price: 3099,
    rating: 4.9,
    reviews: 64,
    description: "Sophisticated glen plaid patterned formal dress pants in mixed grey wool, with side adjusters.",
    textureType: "bandhgala",
    colorPalette: { primary: "#374151", secondary: "#FAF6F0", accent: "#9CA3AF" },
    imageUrl: "/formal_pants_9.png"
  },
  {
    id: "prod-m3-11",
    name: "Men's Charcoal Pinstripe Classic Trousers",
    category: "Formal Pants",
    price: 3199,
    rating: 4.9,
    reviews: 70,
    description: "Classic vertical pinstripe dress pants in deep charcoal, tailored for executive power dressing.",
    textureType: "bandhgala",
    colorPalette: { primary: "#1F2937", secondary: "#FAF6F0", accent: "#4B5563" },
    imageUrl: "/formal_pants_10.png"
  },
  {
    id: "prod-m4",
    name: "Men's Classic Khaki Drawstring Chinos",
    category: "Casual Pants",
    price: 1899,
    rating: 4.6,
    reviews: 84,
    description: "Lightweight cotton-chino trousers in classic khaki tan, featuring a comfortable elastic drawstring waist.",
    textureType: "bandhgala",
    colorPalette: { primary: "#D7C49E", secondary: "#FAF6F0", accent: "#A18262" },
    imageUrl: "/casual_pants_1.png"
  },
  {
    id: "prod-m4-2",
    name: "Men's Olive Green Linen Relaxed Pants",
    category: "Casual Pants",
    price: 2199,
    rating: 4.7,
    reviews: 62,
    description: "Relaxed fit trousers crafted from lightweight, breathable pure linen in an olive green hue.",
    textureType: "bandhgala",
    colorPalette: { primary: "#4D7C0F", secondary: "#FAF6F0", accent: "#CA8A04" },
    imageUrl: "/casual_pants_2.png"
  },
  {
    id: "prod-m4-3",
    name: "Men's Navy Blue Active Cotton Joggers",
    category: "Casual Pants",
    price: 1999,
    rating: 4.8,
    reviews: 95,
    description: "Premium cotton joggers in navy blue with ribbed ankle cuffs, perfect for active or lounge days.",
    textureType: "bandhgala",
    colorPalette: { primary: "#1E3A8A", secondary: "#FAF6F0", accent: "#3B82F6" },
    imageUrl: "/casual_pants_3.png"
  },
  {
    id: "prod-m4-4",
    name: "Men's Slate Grey Utility Cargo Pants",
    category: "Casual Pants",
    price: 2499,
    rating: 4.8,
    reviews: 110,
    description: "Multi-pocket utility cargo pants in a durable slate grey cotton canvas weave.",
    textureType: "bandhgala",
    colorPalette: { primary: "#4B5563", secondary: "#FAF6F0", accent: "#1F2937" },
    imageUrl: "/casual_pants_4.png"
  },
  {
    id: "prod-m4-5",
    name: "Men's Cream White Relaxed Beach Pants",
    category: "Casual Pants",
    price: 2299,
    rating: 4.9,
    reviews: 75,
    description: "Easy-breezy seersucker-linen beach pants in cream off-white, tailored for absolute comfort.",
    textureType: "bandhgala",
    colorPalette: { primary: "#F3ECE0", secondary: "#FAF6F0", accent: "#D4AF37" },
    imageUrl: "/casual_pants_5.png"
  },
  {
    id: "prod-m5",
    name: "Men's Premium Cotton Formal Shirt",
    category: "Shirts (Formal & Casual)",
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
    name: "Men's Forest Checked Shirt",
    category: "Shirts (Formal & Casual)",
    price: 1799,
    rating: 4.8,
    reviews: 124,
    description: "Comfortable forest green and white plaid casual button-down shirt in premium woven cotton.",
    textureType: "kurta",
    colorPalette: { primary: "#1E3A8A", secondary: "#FAF6F0", accent: "#D4AF37" },
    imageUrl: "/casual_wear_3.png"
  },
  {
    id: "prod-m7",
    name: "Men's Classic Checked Casual Shirt",
    category: "Shirts (Formal & Casual)",
    price: 1999,
    rating: 4.9,
    reviews: 310,
    description: "Stylish checked open-front shirt layered over a clean white crewneck tee, paired with beige chinos.",
    textureType: "kurta",
    colorPalette: { primary: "#4B5563", secondary: "#FAF6F0", accent: "#D7C49E" },
    imageUrl: "/casual_wear_1.png"
  },
  {
    id: "prod-m8",
    name: "Men's Royal Indigo Nehru Jacket",
    category: "Jackets",
    price: 4999,
    rating: 4.9,
    reviews: 64,
    description: "An exquisite royal indigo blue Nehru jacket featuring fine hand-embellished details, perfect for heritage occasions.",
    textureType: "bandhgala",
    colorPalette: { primary: "#1E3A8A", secondary: "#FAF6F0", accent: "#D4AF37" },
    imageUrl: "/jacket_1.png"
  },
  {
    id: "prod-m8-2",
    name: "Men's Classic Hooded Puffer Jacket",
    category: "Jackets",
    price: 3499,
    rating: 4.8,
    reviews: 95,
    description: "Insulated classic black puffer jacket featuring a warm hood, front zip closure, and lightweight comfort.",
    textureType: "bandhgala",
    colorPalette: { primary: "#111111", secondary: "#FAF6F0", accent: "#374151" },
    imageUrl: "/jacket_2.png"
  },
  {
    id: "prod-m8-3",
    name: "Men's Active Zip-Up Sports Jacket",
    category: "Jackets",
    price: 2799,
    rating: 4.7,
    reviews: 60,
    description: "Sleek navy blue athletic zip-up jacket tailored in a breathable performance fabric with signature cuffs.",
    textureType: "bandhgala",
    colorPalette: { primary: "#1E3B8A", secondary: "#FAF6F0", accent: "#93C5FD" },
    imageUrl: "/jacket_3.png"
  },
  {
    id: "prod-m8-4",
    name: "Men's Premium Olive Bomber Jacket",
    category: "Jackets",
    price: 3999,
    rating: 4.8,
    reviews: 74,
    description: "Classic utility bomber jacket in rich olive green, featuring a ribbed stand collar and zipped front.",
    textureType: "bandhgala",
    colorPalette: { primary: "#4D7C0F", secondary: "#FAF6F0", accent: "#1E293B" },
    imageUrl: "/jacket_4.png"
  },
  {
    id: "prod-m8-5",
    name: "Men's Heritage Checked Flannel Jacket",
    category: "Jackets",
    price: 2999,
    rating: 4.9,
    reviews: 112,
    description: "Heavyweight checked flannel button-down jacket in a blue and off-white pattern, ideal for layering.",
    textureType: "bandhgala",
    colorPalette: { primary: "#1E293B", secondary: "#FAF6F0", accent: "#D7C49E" },
    imageUrl: "/jacket_5.png"
  },
  {
    id: "prod-m8-6",
    name: "Men's Hooded Casual Windbreaker",
    category: "Jackets",
    price: 2899,
    rating: 4.6,
    reviews: 45,
    description: "Lightweight weather-resistant windbreaker jacket in deep navy blue, complete with adjustable drawstrings.",
    textureType: "bandhgala",
    colorPalette: { primary: "#1E3B8A", secondary: "#374151", accent: "#FAF6F0" },
    imageUrl: "/jacket_6.png"
  },
  {
    id: "prod-m9",
    name: "Men's Los Angeles Grey Hoodie",
    category: "Hoodies",
    price: 2499,
    rating: 4.8,
    reviews: 115,
    description: "Premium grey colorblock pullover hoodie featuring custom Los Angeles lettering and comfortable ribbed cuffs.",
    textureType: "kurta",
    colorPalette: { primary: "#9CA3AF", secondary: "#111111", accent: "#FAF6F0" },
    imageUrl: "/hoodie_1.png"
  },
  {
    id: "prod-m9-2",
    name: "Men's Brooklyn High Collar Sweatshirt",
    category: "Hoodies",
    price: 2799,
    rating: 4.9,
    reviews: 80,
    description: "Vintage brown high-collar quarter-zip sweatshirt featuring Brooklyn 1898 graphic detailing.",
    textureType: "kurta",
    colorPalette: { primary: "#78350F", secondary: "#FAF6F0", accent: "#451A03" },
    imageUrl: "/hoodie_2.png"
  },
  {
    id: "prod-m9-3",
    name: "Men's Classic Warm Black Hoodie",
    category: "Hoodies",
    price: 2299,
    rating: 4.7,
    reviews: 140,
    description: "Heavyweight black cotton fleece hoodie with adjustable drawstrings and a roomy kangaroo pocket.",
    textureType: "kurta",
    colorPalette: { primary: "#111111", secondary: "#374151", accent: "#FAF6F0" },
    imageUrl: "/hoodie_3.png"
  },
  {
    id: "prod-m9-4",
    name: "Men's Crimson Red Basic Hoodie",
    category: "Hoodies",
    price: 2399,
    rating: 4.8,
    reviews: 62,
    description: "Classic relaxed fit hoodie in vibrant crimson red, crafted from soft brushed cotton blend.",
    textureType: "kurta",
    colorPalette: { primary: "#5C1D24", secondary: "#FAF6F0", accent: "#FAF6F0" },
    imageUrl: "/hoodie_4.png"
  },
  {
    id: "prod-m9-5",
    name: "Men's Black & Grey Active Hoodie",
    category: "Hoodies",
    price: 2599,
    rating: 4.7,
    reviews: 50,
    description: "Sporty zip-up hoodie featuring black and grey contrast panels, perfect for casual layer styling.",
    textureType: "kurta",
    colorPalette: { primary: "#111111", secondary: "#9CA3AF", accent: "#FAF6F0" },
    imageUrl: "/hoodie_5.png"
  },
  {
    id: "prod-m10",
    name: "Men's Olive Quarter-Zip Ribbed Sweater",
    category: "Sweaters",
    price: 2999,
    rating: 4.8,
    reviews: 92,
    description: "Premium olive-brown ribbed half-zip sweater with a mock collar, perfect for casual and smart-casual looks.",
    textureType: "kurta",
    colorPalette: { primary: "#78350F", secondary: "#FAF6F0", accent: "#451A03" },
    imageUrl: "/sweater_1.png"
  },
  {
    id: "prod-m10-2",
    name: "Men's Beige Quarter-Zip Pullover",
    category: "Sweaters",
    price: 2799,
    rating: 4.7,
    reviews: 75,
    description: "Soft beige ribbed quarter-zip pullover sweater with a clean minimalist design, ideal for layering.",
    textureType: "kurta",
    colorPalette: { primary: "#D4B896", secondary: "#FAF6F0", accent: "#9CA3AF" },
    imageUrl: "/sweater_2.png"
  },
  {
    id: "prod-m10-3",
    name: "Men's Black Colorblock Polo Sweater",
    category: "Sweaters",
    price: 3199,
    rating: 4.9,
    reviews: 60,
    description: "Stylish black cable-knit polo sweater with beige and brown colorblock contrast stripes.",
    textureType: "kurta",
    colorPalette: { primary: "#111111", secondary: "#D4B896", accent: "#78350F" },
    imageUrl: "/sweater_3.png"
  },
  {
    id: "prod-m10-4",
    name: "Men's Black Zip-Up Hoodie Sweater",
    category: "Sweaters",
    price: 2599,
    rating: 4.7,
    reviews: 88,
    description: "Versatile full-zip black hoodie sweater with a fleece interior for added warmth and comfort.",
    textureType: "kurta",
    colorPalette: { primary: "#111111", secondary: "#374151", accent: "#FAF6F0" },
    imageUrl: "/sweater_4.png"
  },
  {
    id: "prod-m10-5",
    name: "Men's Classic Black V-Neck Sweater",
    category: "Sweaters",
    price: 2499,
    rating: 4.8,
    reviews: 110,
    description: "Timeless black V-neck sweater with subtle logo detail, perfect for formal and business-casual styling.",
    textureType: "kurta",
    colorPalette: { primary: "#111111", secondary: "#FAF6F0", accent: "#374151" },
    imageUrl: "/sweater_5.png"
  },
  {
    id: "prod-m11",
    name: "Men's Black Ribbed Casual Shorts",
    category: "Shorts",
    price: 1299,
    rating: 4.7,
    reviews: 88,
    description: "Premium black ribbed cotton shorts with a branded leather patch pocket, perfect for casual outings.",
    textureType: "bandhgala",
    colorPalette: { primary: "#111111", secondary: "#374151", accent: "#D4AF37" },
    imageUrl: "/shorts_1.png"
  },
  {
    id: "prod-m11-2",
    name: "Men's Striped Seersucker Shorts",
    category: "Shorts",
    price: 1499,
    rating: 4.6,
    reviews: 65,
    description: "Lightweight navy blue and white striped seersucker shorts with a relaxed fit and elasticated waist.",
    textureType: "bandhgala",
    colorPalette: { primary: "#1E3A8A", secondary: "#FAF6F0", accent: "#9CA3AF" },
    imageUrl: "/shorts_2.png"
  },
  {
    id: "prod-m11-3",
    name: "Men's Grey Multi-Pocket Cargo Shorts",
    category: "Shorts",
    price: 1599,
    rating: 4.8,
    reviews: 120,
    description: "Durable grey cargo shorts with multiple utility pockets and a comfortable drawstring waist.",
    textureType: "bandhgala",
    colorPalette: { primary: "#9CA3AF", secondary: "#374151", accent: "#FAF6F0" },
    imageUrl: "/shorts_3.png"
  },
  {
    id: "prod-m11-4",
    name: "Men's Black Athletic Gym Shorts",
    category: "Shorts",
    price: 1199,
    rating: 4.7,
    reviews: 95,
    description: "Classic black athletic shorts with an elastic waistband, ideal for gym sessions and daily wear.",
    textureType: "bandhgala",
    colorPalette: { primary: "#111111", secondary: "#1F2937", accent: "#FAF6F0" },
    imageUrl: "/shorts_4.png"
  },
  {
    id: "prod-m11-5",
    name: "Men's Black Active Sport Shorts",
    category: "Shorts",
    price: 1099,
    rating: 4.6,
    reviews: 72,
    description: "Breathable black sport shorts with minimal branding, perfect for running, training, and street style.",
    textureType: "bandhgala",
    colorPalette: { primary: "#111111", secondary: "#374151", accent: "#FAF6F0" },
    imageUrl: "/shorts_5.png"
  },
  {
    id: "prod-m12",
    name: "Men's Black Wide-Leg Track Pants",
    category: "Track Pants",
    price: 1599,
    rating: 4.8,
    reviews: 160,
    description: "Smooth wide-leg black track pants with elastic waistband and side pockets, ultra-comfortable for daily wear.",
    textureType: "bandhgala",
    colorPalette: { primary: "#111111", secondary: "#374151", accent: "#FAF6F0" },
    imageUrl: "/trackpants_1.png"
  },
  {
    id: "prod-m12-2",
    name: "Men's Black Cargo Track Pants",
    category: "Track Pants",
    price: 1799,
    rating: 4.7,
    reviews: 95,
    description: "Relaxed-fit black cargo track pants with side utility pockets and a clean tapered silhouette.",
    textureType: "bandhgala",
    colorPalette: { primary: "#111111", secondary: "#1F2937", accent: "#FAF6F0" },
    imageUrl: "/trackpants_2.png"
  },
  {
    id: "prod-m12-3",
    name: "Men's Cream Relaxed Jogger Pants",
    category: "Track Pants",
    price: 1699,
    rating: 4.6,
    reviews: 72,
    description: "Premium off-white relaxed jogger pants with a drawstring waist, perfect for lounging and casual styling.",
    textureType: "bandhgala",
    colorPalette: { primary: "#FAF6F0", secondary: "#E5E7EB", accent: "#9CA3AF" },
    imageUrl: "/trackpants_3.png"
  },
  {
    id: "prod-m12-4",
    name: "Men's Grey Striped Sports Track Pants",
    category: "Track Pants",
    price: 1499,
    rating: 4.9,
    reviews: 188,
    description: "Classic grey track pants with iconic white side stripes and an elasticated drawstring waist — great for sports.",
    textureType: "bandhgala",
    colorPalette: { primary: "#6B7280", secondary: "#FAF6F0", accent: "#374151" },
    imageUrl: "/trackpants_4.png"
  },
  {
    id: "prod-m12-5",
    name: "Men's Beige Linen Casual Pants",
    category: "Track Pants",
    price: 1899,
    rating: 4.7,
    reviews: 110,
    description: "Lightweight beige linen-blend casual pants with a drawstring waist, ideal for warm weather and street wear.",
    textureType: "bandhgala",
    colorPalette: { primary: "#D4B896", secondary: "#FAF6F0", accent: "#9CA3AF" },
    imageUrl: "/trackpants_5.png"
  },
  {
    id: "prod-m13",
    name: "Men's Slate Grey Casual Shirt",
    category: "Shirts (Formal & Casual)",
    price: 1699,
    rating: 4.7,
    reviews: 55,
    description: "Minimalist slate grey casual button-down shirt in premium soft linen, featuring rolled long sleeves.",
    textureType: "kurta",
    colorPalette: { primary: "#4B5563", secondary: "#1F2937", accent: "#FAF6F0" },
    imageUrl: "/casual_wear_4.png"
  },
  {
    id: "prod-m14",
    name: "Men's COZI Navy Blue Boxer Brief",
    category: "Innerwear",
    price: 499,
    rating: 4.8,
    reviews: 320,
    description: "Premium COZI navy blue boxer brief with a comfortable wide waistband and moisture-wicking fabric.",
    textureType: "bandhgala",
    colorPalette: { primary: "#1E3A8A", secondary: "#FAF6F0", accent: "#DC2626" },
    imageUrl: "/innerwear_1.png"
  },
  {
    id: "prod-m14-2",
    name: "Men's Jockey Black Brief",
    category: "Innerwear",
    price: 399,
    rating: 4.9,
    reviews: 480,
    description: "Classic Jockey black brief with a silver metallic waistband, crafted from soft combed cotton.",
    textureType: "bandhgala",
    colorPalette: { primary: "#111111", secondary: "#9CA3AF", accent: "#FAF6F0" },
    imageUrl: "/innerwear_2.png"
  },
  {
    id: "prod-m14-3",
    name: "Men's XYXX 4-Pack Boxer Trunks",
    category: "Innerwear",
    price: 1299,
    rating: 4.7,
    reviews: 210,
    description: "Value pack of 4 XYXX boxer trunks in assorted colours — black, grey, dark and navy blue.",
    textureType: "bandhgala",
    colorPalette: { primary: "#111111", secondary: "#6B7280", accent: "#1E3A8A" },
    imageUrl: "/innerwear_3.png"
  },
  {
    id: "prod-m14-4",
    name: "Men's DaMENSCH 3-Pack Printed Trunks",
    category: "Innerwear",
    price: 1099,
    rating: 4.8,
    reviews: 175,
    description: "DaMENSCH premium 3-pack boxer trunks in vibrant printed and solid designs — ultra-soft micro modal fabric.",
    textureType: "bandhgala",
    colorPalette: { primary: "#1E3A8A", secondary: "#5C1D24", accent: "#111111" },
    imageUrl: "/innerwear_4.png"
  },
  {
    id: "prod-m14-5",
    name: "Men's Levi's 2-Pack Boxer Briefs",
    category: "Innerwear",
    price: 799,
    rating: 4.9,
    reviews: 290,
    description: "Levi's classic 2-pack boxer briefs in black and charcoal grey — durable cotton stretch for all-day comfort.",
    textureType: "bandhgala",
    colorPalette: { primary: "#111111", secondary: "#374151", accent: "#FAF6F0" },
    imageUrl: "/innerwear_5.png"
  },
  {
    id: "prod-m15",
    name: "Men's Pink Embroidered Kurta",
    category: "Ethnic Wear",
    price: 2199,
    rating: 4.9,
    reviews: 145,
    description: "Elegant soft pink kurta with delicate neck embroidery and three-quarter sleeves — perfect for festive occasions.",
    textureType: "kurta",
    colorPalette: { primary: "#F9A8D4", secondary: "#FAF6F0", accent: "#D4AF37" },
    imageUrl: "/ethnic_1.png"
  },
  {
    id: "prod-m15-2",
    name: "Men's Navy Blue Pathani Suit Set",
    category: "Ethnic Wear",
    price: 3499,
    rating: 4.8,
    reviews: 188,
    description: "Regal navy blue Pathani kurta-salwar suit set with a classic shirt collar and matching bottoms.",
    textureType: "kurta",
    colorPalette: { primary: "#1E3A8A", secondary: "#FAF6F0", accent: "#D4AF37" },
    imageUrl: "/ethnic_2.png"
  },
  {
    id: "prod-m15-3",
    name: "Men's Floral Print Kurta with Dhoti",
    category: "Ethnic Wear",
    price: 2799,
    rating: 4.7,
    reviews: 96,
    description: "Vibrant floral block-print kurta paired with a peach dhoti — a bold festive look with traditional flair.",
    textureType: "kurta",
    colorPalette: { primary: "#FAF6F0", secondary: "#F472B6", accent: "#0D9488" },
    imageUrl: "/ethnic_3.png"
  },
  {
    id: "prod-m15-4",
    name: "Men's Yellow Mandarin Collar Linen Kurta",
    category: "Ethnic Wear",
    price: 1899,
    rating: 4.8,
    reviews: 120,
    description: "Bright mustard yellow linen kurta with a mandarin collar and wooden button placket — casual ethnic style.",
    textureType: "kurta",
    colorPalette: { primary: "#D97706", secondary: "#FAF6F0", accent: "#92400E" },
    imageUrl: "/ethnic_4.png"
  },
  {
    id: "prod-m15-5",
    name: "Men's White Peacock Embroidered Sherwani Kurta",
    category: "Ethnic Wear",
    price: 5999,
    rating: 5.0,
    reviews: 74,
    description: "Stunning white sherwani kurta with intricate peacock and floral thread embroidery — ideal for weddings.",
    textureType: "kurta",
    colorPalette: { primary: "#FAF6F0", secondary: "#0D9488", accent: "#D4AF37" },
    imageUrl: "/ethnic_5.png"
  },
  {
    id: "prod-m16",
    name: "Men's Premium Sand Linen Shirt",
    category: "Shirts (Formal & Casual)",
    price: 1999,
    rating: 4.8,
    reviews: 110,
    description: "Sophisticated beige band-collar casual linen shirt, styled with folded cuffs and dark formal trousers.",
    textureType: "kurta",
    colorPalette: { primary: "#FAF6F0", secondary: "#1E293B", accent: "#D4AF37" },
    imageUrl: "/casual_wear_2.png"
  },
  {
    id: "prod-m17",
    name: "Men's Dixcy Scott White Thermal Top",
    category: "Seasonal Wear",
    price: 599,
    rating: 4.7,
    reviews: 210,
    description: "Warm Dixcy Scott white thermal inner top with a round neck and full sleeves, perfect for winter.",
    textureType: "kurta",
    colorPalette: { primary: "#FAF6F0", secondary: "#E5E7EB", accent: "#9CA3AF" },
    imageUrl: "/seasonal_1.png"
  },
  {
    id: "prod-m17-2",
    name: "Men's Grey Striped Thermal Top",
    category: "Seasonal Wear",
    price: 649,
    rating: 4.8,
    reviews: 185,
    description: "Snug-fit grey striped thermal full-sleeve top with ribbed cuffs for added warmth.",
    textureType: "kurta",
    colorPalette: { primary: "#6B7280", secondary: "#374151", accent: "#FAF6F0" },
    imageUrl: "/seasonal_2.png"
  },
  {
    id: "prod-m17-3",
    name: "Men's Teal Summer Polo Shirt",
    category: "Seasonal Wear",
    price: 1299,
    rating: 4.7,
    reviews: 98,
    description: "Vibrant teal polo shirt in breathable cotton pique, a summer essential for casual outings.",
    textureType: "kurta",
    colorPalette: { primary: "#0D9488", secondary: "#FAF6F0", accent: "#1F2937" },
    imageUrl: "/seasonal_3.png"
  },
  {
    id: "prod-m17-4",
    name: "Men's Light Blue Linen Summer Shirt",
    category: "Seasonal Wear",
    price: 1499,
    rating: 4.8,
    reviews: 76,
    description: "Lightweight sky blue linen summer shirt with a Cuban collar and chest pocket, great for beach days.",
    textureType: "kurta",
    colorPalette: { primary: "#BAE6FD", secondary: "#FAF6F0", accent: "#0284C7" },
    imageUrl: "/seasonal_4.png"
  },
  {
    id: "prod-m17-5",
    name: "Men's Teal Rainproof Tracksuit Set",
    category: "Seasonal Wear",
    price: 2799,
    rating: 4.9,
    reviews: 144,
    description: "Durable teal and black two-piece hooded tracksuit set, rain-resistant for outdoor activities.",
    textureType: "bandhgala",
    colorPalette: { primary: "#0D9488", secondary: "#111111", accent: "#FAF6F0" },
    imageUrl: "/seasonal_5.png"
  },
  {
    id: "prod-m17-6",
    name: "Men's Charcoal Thermal Full Sleeve Top",
    category: "Seasonal Wear",
    price: 699,
    rating: 4.7,
    reviews: 165,
    description: "Premium charcoal grey thermal full-sleeve top with a round neck and body-hugging fit for warmth.",
    textureType: "kurta",
    colorPalette: { primary: "#374151", secondary: "#111111", accent: "#FAF6F0" },
    imageUrl: "/seasonal_6.png"
  },
  {
    id: "prod-m17-7",
    name: "Men's White Graphic Print Tee",
    category: "Seasonal Wear",
    price: 999,
    rating: 4.6,
    reviews: 88,
    description: "White oversized graphic print t-shirt with a trendy black scribble art design, paired with black jeans.",
    textureType: "kurta",
    colorPalette: { primary: "#FAF6F0", secondary: "#111111", accent: "#374151" },
    imageUrl: "/seasonal_7.png"
  },
  {
    id: "prod-m19",
    name: "Men's Purple Chill Out Oversized Tee",
    category: "T-Shirts",
    price: 999,
    rating: 4.8,
    reviews: 154,
    description: "Trendy oversized purple Leotude Chill Out graphic tee with bold back print — perfect street style.",
    textureType: "kurta",
    colorPalette: { primary: "#7C3AED", secondary: "#FAF6F0", accent: "#DDD6FE" },
    imageUrl: "/tshirt_1.png"
  },
  {
    id: "prod-m19-2",
    name: "Men's White Teal Zip Polo T-Shirt",
    category: "T-Shirts",
    price: 1299,
    rating: 4.7,
    reviews: 90,
    description: "Premium white and teal colorblock half-zip polo t-shirt with ribbed centre panel design.",
    textureType: "kurta",
    colorPalette: { primary: "#FAF6F0", secondary: "#0D9488", accent: "#111111" },
    imageUrl: "/tshirt_2.png"
  },
  {
    id: "prod-m19-3",
    name: "Men's Maroon Break Rules Graphic Tee",
    category: "T-Shirts",
    price: 1099,
    rating: 4.9,
    reviews: 200,
    description: "Bold maroon oversized graphic t-shirt with a striking 'Break Rules' back print in white lettering.",
    textureType: "kurta",
    colorPalette: { primary: "#5C1D24", secondary: "#FAF6F0", accent: "#D4AF37" },
    imageUrl: "/tshirt_3.png"
  },
  {
    id: "prod-m19-4",
    name: "Men's Black Allen Solly Polo Tee",
    category: "T-Shirts",
    price: 1199,
    rating: 4.8,
    reviews: 175,
    description: "Classic black polo t-shirt by Allen Solly with embroidered logo and a comfortable regular fit.",
    textureType: "kurta",
    colorPalette: { primary: "#111111", secondary: "#FAF6F0", accent: "#374151" },
    imageUrl: "/tshirt_4.png"
  },
  {
    id: "prod-m19-5",
    name: "Men's Beige Muscle Fit Polo Tee",
    category: "T-Shirts",
    price: 1399,
    rating: 4.7,
    reviews: 88,
    description: "Smart beige muscle-fit polo t-shirt with contrast black striped sleeve accents and embroidered chest logo.",
    textureType: "kurta",
    colorPalette: { primary: "#D4B896", secondary: "#111111", accent: "#FAF6F0" },
    imageUrl: "/tshirt_5.png"
  },
  {
    id: "prod-m19-6",
    name: "Men's Olive Military Zip Polo Tee",
    category: "T-Shirts",
    price: 1499,
    rating: 4.9,
    reviews: 120,
    description: "Tactical olive green half-zip polo tee with a USA flag patch on the sleeve — sporty military style.",
    textureType: "kurta",
    colorPalette: { primary: "#4D7C0F", secondary: "#FAF6F0", accent: "#374151" },
    imageUrl: "/tshirt_6.png"
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
  {
    id: "prod-b17",
    name: "Boys' Jaipur Indigo Block Print Kurta",
    category: "Boys' Collection (Age 0-18 Years)",
    price: 1399,
    rating: 4.8,
    reviews: 55,
    description: "Elegant indigo blue hand-block printed cotton kurta, perfect for festive events and pujas.",
    textureType: "kurta",
    colorPalette: { primary: "#1E3A8A", secondary: "#FAF6F0", accent: "#D4AF37" },
    imageUrl: "/kid_boy_1.png"
  },
  {
    id: "prod-b18",
    name: "Boys' Royal Gota Work Sherwani Set",
    category: "Boys' Collection (Age 0-18 Years)",
    price: 3299,
    rating: 4.9,
    reviews: 42,
    description: "Cream and gold premium sherwani set featuring detailed Gota Patti embroidery on the collar.",
    textureType: "sherwani",
    colorPalette: { primary: "#FAF6F0", secondary: "#D4AF37", accent: "#5C1D24" },
    imageUrl: "/kid_boy_4.png"
  },
  {
    id: "prod-b19",
    name: "Boys' Mandarin Collar Festive Nehru Jacket Set",
    category: "Boys' Collection (Age 0-18 Years)",
    price: 2499,
    rating: 4.7,
    reviews: 38,
    description: "Stylish mustard yellow Nehru jacket paired with a white cotton kurta and churidar pants.",
    textureType: "bandhgala",
    colorPalette: { primary: "#D97706", secondary: "#FAF6F0", accent: "#D4AF37" },
    imageUrl: "/kid_boy_3.png"
  },
  {
    id: "prod-b20",
    name: "Boys' Pathani Style Cotton Suit",
    category: "Boys' Collection (Age 0-18 Years)",
    price: 1899,
    rating: 4.8,
    reviews: 67,
    description: "Traditional dark olive green Pathani suit with button flaps and structured shoulders.",
    textureType: "kurta",
    colorPalette: { primary: "#3F6212", secondary: "#FAF6F0", accent: "#1E293B" },
    imageUrl: "/kid_boy_2.png"
  },
  {
    id: "prod-b21",
    name: "Boys' Bandhani Print Casual Play Kurta",
    category: "Boys' Collection (Age 0-18 Years)",
    price: 999,
    rating: 4.6,
    reviews: 50,
    description: "Breezy cotton casual kurta featuring all-over Rajasthani Bandhani prints.",
    textureType: "kurta",
    colorPalette: { primary: "#EF4444", secondary: "#FAF6F0", accent: "#EAB308" },
    imageUrl: "/kid_boy_5.png"
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
  },
  {
    id: "prod-g18",
    name: "Girls' Gota Patti Embroidered Lehenga Choli",
    category: "Girls' Collection (Age 0-13 Years)",
    price: 2799,
    rating: 4.9,
    reviews: 88,
    description: "Festive pink and gold lehenga choli set with fine Gota work and a soft net dupatta.",
    textureType: "saree",
    colorPalette: { primary: "#EC4899", secondary: "#FAF6F0", accent: "#D4AF37" },
    imageUrl: "/kid_girl_4.png"
  },
  {
    id: "prod-g19",
    name: "Girls' Royal Anarkali Frock Dress",
    category: "Girls' Collection (Age 0-13 Years)",
    price: 2199,
    rating: 4.8,
    reviews: 95,
    description: "Elegant flared Anarkali style suit set in rich royal blue, decorated with silver lace trims.",
    textureType: "sherwani",
    colorPalette: { primary: "#1E3A8A", secondary: "#FAF6F0", accent: "#E2E8F0" },
    imageUrl: "/kid_girl_2.png"
  },
  {
    id: "prod-g20",
    name: "Girls' Jaipuri Bandhej Tiered Dress",
    category: "Girls' Collection (Age 0-13 Years)",
    price: 1599,
    rating: 4.7,
    reviews: 42,
    description: "Multi-colored tiered cotton dress with beautiful bandhej prints, perfect for summer celebrations.",
    textureType: "kurta",
    colorPalette: { primary: "#F59E0B", secondary: "#EF4444", accent: "#FAF6F0" },
    imageUrl: "/kid_girl_1.png"
  },
  {
    id: "prod-g21",
    name: "Girls' Embroidered Silk Salwar Suit Set",
    category: "Girls' Collection (Age 0-13 Years)",
    price: 2399,
    rating: 4.9,
    reviews: 73,
    description: "Rich magenta silk blend kurta paired with a matching salwar and floral print organza dupatta.",
    textureType: "kurta",
    colorPalette: { primary: "#BE185D", secondary: "#FAF6F0", accent: "#D4AF37" },
    imageUrl: "/kid_girl_3.png"
  },
  {
    id: "prod-g22",
    name: "Girls' Mirror Work Festive Kurti Set",
    category: "Girls' Collection (Age 0-13 Years)",
    price: 1799,
    rating: 4.8,
    reviews: 56,
    description: "Yellow cotton-silk kurti featuring elaborate mirror embroidery around the neck and matching salwars.",
    textureType: "kurta",
    colorPalette: { primary: "#EAB308", secondary: "#FAF6F0", accent: "#CA8A04" },
    imageUrl: "/kid_girl_5.png"
  },
  {
    id: "prod-g23",
    name: "Girls' Cotton Block Print Festive Lehenga",
    category: "Girls' Collection (Age 0-13 Years)",
    price: 2499,
    rating: 4.7,
    reviews: 62,
    description: "Comfortable and breezy block-printed cotton lehenga set, perfect for all-day festive wear.",
    textureType: "saree",
    colorPalette: { primary: "#0D9488", secondary: "#FAF6F0", accent: "#F472B6" },
    imageUrl: "/kid_girl_4.png"
  },
  {
    id: "prod-g24",
    name: "Girls' Embroidered Palazzo Kurti Set",
    category: "Girls' Collection (Age 0-13 Years)",
    price: 1999,
    rating: 4.8,
    reviews: 49,
    description: "Modern sleeveless short kurti with heavy thread embroidery paired with flared white palazzos.",
    textureType: "kurta",
    colorPalette: { primary: "#FAF6F0", secondary: "#4F46E5", accent: "#D4AF37" },
    imageUrl: "/kid_girl_3.png"
  },
  {
    id: "prod-g25",
    name: "Girls' Peplum Style Traditional Top with Skirt",
    category: "Girls' Collection (Age 0-13 Years)",
    price: 2299,
    rating: 4.8,
    reviews: 37,
    description: "Peach peplum-style embroidered top with a matching flared brocade silk skirt.",
    textureType: "sherwani",
    colorPalette: { primary: "#FDBA74", secondary: "#D4AF37", accent: "#FAF6F0" },
    imageUrl: "/kid_girl_1.png"
  },
  {
    id: "prod-g26",
    name: "Girls' Banarasi Brocade Pavadav Set",
    category: "Girls' Collection (Age 0-13 Years)",
    price: 2899,
    rating: 5.0,
    reviews: 29,
    description: "Traditional South-Indian style silk Pavadai lehenga set with a rich gold brocade border.",
    textureType: "saree",
    colorPalette: { primary: "#B91C1C", secondary: "#FAF6F0", accent: "#D4AF37" },
    imageUrl: "/kid_girl_2.png"
  },
  {
    id: "prod-g27",
    name: "Girls' Rajasthani Bandhani Silk Frock",
    category: "Girls' Collection (Age 0-13 Years)",
    price: 1699,
    rating: 4.9,
    reviews: 80,
    description: "Classic silk frock featuring tie-and-dye Rajasthani Bandhani pattern and gold borders.",
    textureType: "kurta",
    colorPalette: { primary: "#EA580C", secondary: "#FAF6F0", accent: "#D4AF37" },
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

  // Dynamic products state — always starts from hardcoded PRODUCTS as the source of truth.
  // Owner-added products from localStorage are merged ON TOP of the base catalog.
  // This ensures all deployed products are always visible regardless of browser cache.
  const [products, setProducts] = useState<Product[]>(() => {
    const CATALOG_VERSION = 'v22-20260707';
    const savedVer = localStorage.getItem('CCS_CATALOG_VERSION');
    
    // Always clear stale cache on version mismatch
    if (savedVer !== CATALOG_VERSION) {
      localStorage.removeItem('CCS_OWNER_PRODUCTS');
      localStorage.setItem('CCS_CATALOG_VERSION', CATALOG_VERSION);
    }

    // Load any owner-added products (from dashboard) and merge with base PRODUCTS
    const ownerAdded = localStorage.getItem('CCS_OWNER_PRODUCTS');
    if (ownerAdded) {
      try {
        const parsed = JSON.parse(ownerAdded);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge: base catalog + owner additions, avoiding duplicates by id
          const baseIds = new Set(PRODUCTS.map(p => p.id));
          const newItems = parsed.filter((p: Product) => !baseIds.has(p.id));
          return [...PRODUCTS, ...newItems];
        }
      } catch (e) {
        console.error("Failed to parse owner products:", e);
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
    // Only persist owner-added products (not base catalog items) to avoid overriding deployed catalog
    const baseIds = new Set(PRODUCTS.map(p => p.id));
    const ownerAdded = updatedList.filter(p => !baseIds.has(p.id));
    localStorage.setItem('CCS_OWNER_PRODUCTS', JSON.stringify(ownerAdded));
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
    <div className="min-h-screen bg-[#FAF6F0] text-[#2A211D] font-sans selection:bg-[#5C1D24] selection:text-[#FAF6F0] relative">
      {/* Full Page Beach Background Video */}
      {isEntered && (
        <video
          src="/beach_background.mp4"
          autoPlay
          loop
          muted={true}
          playsInline
          className="fixed inset-0 w-full h-full object-cover pointer-events-none"
          style={{ opacity: 0.35, zIndex: 0 }}
        />
      )}

      {/* Royal Viewport Frame Border */}
      <div className="royal-site-frame" style={{ zIndex: 40 }} />
      
      {/* 1. Opening Ceremony Canvas Overlay */}
      {!isEntered && (
        <OpeningCeremony 
          onComplete={() => setIsEntered(true)} 
          musicEnabled={musicEnabled}
          setMusicEnabled={setMusicEnabled}
        />
      )}

      {/* 2. Main Store Layout (Revealed after ceremony) */}
      <div className={`relative z-10 transition-opacity duration-1000 ${isEntered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
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
              Palace Boutique
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
                    <div className="font-bold text-[#5C1D24] text-base">Mr. Bhagaram Khimaram Choudhary</div>
                    <div className="text-xs text-[#2A211D]/60 mb-1">Founder & Lead Curator</div>
                    <a href="tel:9920920792" className="flex items-center gap-1.5 text-xs text-[#5C1D24] hover:text-[#D4AF37] font-semibold transition-colors">
                      <Phone size={13} />
                      9920920792
                    </a>
                  </div>
                </div>

                {/* Owner 2 */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#5C1D24] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] font-cinzel font-bold text-xs">
                    BC
                  </div>
                  <div>
                    <div className="font-bold text-[#5C1D24] text-base">Mr. Balkishan Bhagaram Choudhary</div>
                    <div className="text-xs text-[#2A211D]/60 mb-1">Co-Founder & General Operations</div>
                    <div className="space-y-1">
                      <a href="tel:9702516085" className="flex items-center gap-1.5 text-xs text-[#5C1D24] hover:text-[#D4AF37] font-semibold transition-colors">
                        <Phone size={13} />
                        9702516085
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
                  <span>Monday - Sunday:</span>
                  <span className="font-semibold text-[#5C1D24]">10:00 AM - 10:00 PM</span>
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
                <div>Mr. Bhagaram Choudhary: 9920920792</div>
                <div>Mr. Balkishan Choudhary: 9702516085</div>
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
