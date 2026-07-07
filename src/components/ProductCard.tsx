import React, { useState } from 'react';
import { Eye, Plus, X, Check, Shirt } from 'lucide-react';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  description: string;
  textureType: 'sherwani' | 'bandhgala' | 'kurta' | 'safa' | 'jooti' | 'saree';
  colorPalette: {
    primary: string;
    secondary: string;
    accent: string;
  };
  imageUrl?: string;
}

interface ProductCardProps {
  product: Product;
  onAddToBag: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToBag }) => {
  const showCategoryBadge = !(product.category.toLowerCase().includes('boys') || product.category.toLowerCase().includes('girls'));
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);
  const [showZoom, setShowZoom] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToBag(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // Helper to render procedural SVGs simulating beautiful fabric textures, or real model/actor images
  const renderFabricTexture = (type: string, colors: any, isZoomed = false) => {
    const sizeClass = isZoomed ? "w-full h-80 md:h-[450px]" : "w-full h-64";
    
    if (product.imageUrl) {
      if (isZoomed) {
        return (
          <div 
            className={`${sizeClass} relative overflow-hidden border-b border-[#D4AF37]/10 cursor-zoom-in`}
            onMouseMove={(e) => {
              const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
              const x = ((e.clientX - left) / width) * 100;
              const y = ((e.clientY - top) / height) * 100;
              setZoomPos({ x, y });
            }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="w-full h-full object-cover transition-transform duration-75 select-none hd-image" 
              style={{
                transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                transform: isHovering ? 'scale(2.5)' : 'scale(1)'
              }}
            />
            {/* Outer Palace Border Silhouette */}
            <div className="absolute inset-2 border-2 border-[#D4AF37] rounded opacity-60 pointer-events-none" />
          </div>
        );
      }

      return (
        <div className={`${sizeClass} relative overflow-hidden border-b border-[#D4AF37]/10 transition-transform duration-500 hover:scale-103`}>
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover select-none hd-image" 
          />
          {/* Outer Palace Border Silhouette */}
          <div className="absolute inset-2 border border-[#D4AF37]/35 rounded opacity-45 pointer-events-none" />
          {/* Gold Accent Badge */}
          {showCategoryBadge && (
            <div className="absolute top-3 left-3 bg-[#5C1D24] text-[#FAF6F0] text-[10px] font-semibold tracking-widest px-2.5 py-1 rounded border border-[#D4AF37] shadow">
              {product.category}
            </div>
          )}
        </div>
      );
    }

    return (
      <div 
        className={`${sizeClass} relative flex items-center justify-center overflow-hidden border-b border-[#D4AF37]/10 transition-transform duration-500 hover:scale-103`}
        style={{ backgroundColor: colors.primary }}
      >
        {/* Procedural patterns using SVGs */}
        <svg className="absolute inset-0 w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
          {type === 'sherwani' && (
            // Intricate damask/brocade patterns
            <pattern id={`sherwani-${product.id}`} width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M20 0 L40 20 L20 40 L0 20 Z" fill="none" stroke={colors.accent} strokeWidth="1.5" />
              <circle cx="20" cy="20" r="4" fill={colors.accent} />
              <path d="M0 0 Q10 10 20 0 Q30 10 40 0" fill="none" stroke={colors.accent} strokeWidth="1" />
              <path d="M0 40 Q10 30 20 40 Q30 30 40 40" fill="none" stroke={colors.accent} strokeWidth="1" />
            </pattern>
          )}

          {type === 'bandhgala' && (
            // Diagonal geometric weave
            <pattern id={`bandhgala-${product.id}`} width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M0 30 L30 0 M15 30 L30 15 M0 15 L15 0" fill="none" stroke={colors.secondary} strokeWidth="2" />
              <circle cx="15" cy="15" r="3" fill={colors.accent} />
            </pattern>
          )}

          {type === 'kurta' && (
            // Bandhani dots pattern
            <pattern id={`kurta-${product.id}`} width="25" height="25" patternUnits="userSpaceOnUse">
              <circle cx="12" cy="12" r="2.5" fill="#FAF6F0" />
              <circle cx="12" cy="12" r="1" fill={colors.accent} />
              <circle cx="4" cy="4" r="1.5" fill="#FAF6F0" />
              <circle cx="20" cy="20" r="1.5" fill="#FAF6F0" />
            </pattern>
          )}

          {type === 'safa' && (
            // Leheriya wavy lines pattern
            <pattern id={`safa-${product.id}`} width="60" height="60" patternUnits="userSpaceOnUse" patternTransform="rotate(25)">
              <path d="M0 10 Q15 0 30 10 T60 10" fill="none" stroke={colors.accent} strokeWidth="4" />
              <path d="M0 30 Q15 20 30 30 T60 30" fill="none" stroke={colors.secondary} strokeWidth="3" />
              <path d="M0 50 Q15 40 30 50 T60 50" fill="none" stroke="#FAF6F0" strokeWidth="2" />
            </pattern>
          )}

          {type === 'saree' && (
            // Ornate floral motifs with paisley
            <pattern id={`saree-${product.id}`} width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M25 5 Q35 15 25 35 Q15 15 25 5" fill={colors.accent} opacity="0.8" />
              <circle cx="25" cy="42" r="2.5" fill={colors.secondary} />
              <path d="M0 25 H50 M25 0 V50" stroke={colors.accent} strokeWidth="0.5" strokeDasharray="3,3" />
            </pattern>
          )}

          {type === 'jooti' && (
            // Cross-stitching gold diamonds
            <pattern id={`jooti-${product.id}`} width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M10 0 L20 10 L10 20 L0 10 Z" fill="none" stroke={colors.accent} strokeWidth="1" />
              <path d="M0 0 L20 20 M20 0 L0 20" stroke={colors.secondary} strokeWidth="0.5" opacity="0.5" />
            </pattern>
          )}

          <rect width="100%" height="100%" fill={`url(#${type}-${product.id})`} />
        </svg>

        {/* Outer Palace Border Silhouette */}
        <div className="absolute inset-2 border border-[#D4AF37]/35 rounded opacity-40 pointer-events-none" />

        {/* Gold Accent Badge */}
        {showCategoryBadge && (
          <div className="absolute top-3 left-3 bg-[#5C1D24] text-[#FAF6F0] text-[10px] font-semibold tracking-widest px-2.5 py-1 rounded border border-[#D4AF37] shadow">
            {product.category}
          </div>
        )}

        {/* Center Royal Icon Indicator */}
        <div className="w-12 h-12 rounded-full bg-[#FAF6F0]/25 border border-[#FAF6F0]/40 backdrop-blur-md flex items-center justify-center text-[#FAF6F0]">
          <Shirt size={22} className="opacity-95" />
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Product Card Container */}
      <div className="royal-glass rounded-xl overflow-hidden border border-[#D4AF37]/25 flex flex-col justify-between transition-all duration-300 gold-glow-hover hover:-translate-y-1">
        {/* Visual Texture Render */}
        <div className="relative group">
          {renderFabricTexture(product.textureType, product.colorPalette)}
          
          {/* Quick Zoom Overlay */}
          <div className="absolute inset-0 bg-[#5C1D24]/60 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
            <button
              onClick={() => setShowZoom(true)}
              className="p-3 bg-[#FAF6F0] hover:bg-[#F3ECE0] text-[#5C1D24] rounded-full border border-[#D4AF37] transition-all duration-200 cursor-pointer shadow-lg hover:scale-105"
              title="Inspect 4K Texture"
            >
              <Eye size={20} />
            </button>
            <button
              onClick={handleAdd}
              disabled={added}
              className="p-3 bg-[#D4AF37] hover:bg-[#C5A059] text-[#2A1115] rounded-full border border-[#F7E7C4] transition-all duration-200 cursor-pointer shadow-lg hover:scale-105"
              title="Add to Royal Bag"
            >
              {added ? <Check size={20} /> : <Plus size={20} />}
            </button>
          </div>
        </div>

        {/* Description & Cart Section */}
        <div className="p-5 flex-1 flex flex-col justify-between bg-gradient-to-b from-transparent to-[#F3ECE0]/40">
          <div>
            <h3 className="font-cinzel text-base md:text-lg font-bold text-[#5C1D24] mb-2 line-clamp-1">
              {product.name}
            </h3>
            
            <p className="font-sans text-xs text-[#2A211D]/75 line-clamp-2 mb-4 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="flex items-center justify-between border-t border-[#D4AF37]/15 pt-4">
            <div className="flex flex-col">
              <span className="text-[10px] text-[#2A211D]/50 uppercase tracking-wider font-sans text-left">Availability</span>
              <span className="font-cinzel text-[11px] font-bold text-[#5C1D24] uppercase tracking-widest mt-0.5 text-left">
                Custom Tailored
              </span>
            </div>

            <button
              onClick={handleAdd}
              disabled={added}
              className={`px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer font-sans shadow ${
                added 
                  ? 'bg-[#FAF6F0] text-[#D4AF37] border border-[#D4AF37]' 
                  : 'bg-[#5C1D24] hover:bg-[#4A141A] text-[#FAF6F0] border border-[#D4AF37] hover:scale-103'
              }`}
            >
              {added ? (
                <>
                  <Check size={14} />
                  Added
                </>
              ) : (
                <>
                  <Plus size={14} />
                  Add to Bag
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 4K Texture Zoom Modal */}
      {showZoom && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div 
            className="relative w-full max-w-2xl royal-glass border border-[#D4AF37] rounded-2xl overflow-hidden shadow-2xl animate-scale-up"
            style={{ backgroundColor: '#FAF6F0' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-[#D4AF37]/20 bg-[#F3ECE0]">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold font-sans">{product.category}</span>
                <h2 className="font-cinzel text-xl font-bold text-[#5C1D24]">{product.name} - Texture Macro Zoom</h2>
              </div>
              <button
                onClick={() => setShowZoom(false)}
                className="p-1.5 hover:bg-[#FAF6F0] rounded-full text-[#5C1D24] transition-colors cursor-pointer"
              >
                <X size={24} />
              </button>
            </div>

            {/* Macro Fabric Render */}
            <div className="relative">
              {renderFabricTexture(product.textureType, product.colorPalette, true)}
              <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-xs text-[#FAF6F0] text-[10px] px-3 py-1.5 rounded tracking-widest uppercase font-sans">
                Procedural 4K Thread Simulation
              </div>
            </div>

            {/* Description & Technical details */}
            <div className="p-6">
              <h4 className="font-cinzel text-sm font-bold text-[#5C1D24] uppercase tracking-wider mb-2">Heritage Specs & Artistry</h4>
              <p className="font-sans text-sm text-[#2A211D]/80 leading-relaxed mb-4">
                This fabric uses custom weaving methodologies inspired by traditional weavers. The texture displays delicate golden brocade work, or classic Bandhani/Leheriya patterns, showing pure craftsmanship refined since 1994. Suitable for formal events and traditional gatherings.
              </p>
              <div className="grid grid-cols-3 gap-4 border-t border-[#D4AF37]/25 pt-4 text-center">
                <div>
                  <div className="text-[10px] text-[#2A211D]/50 uppercase tracking-widest font-sans">Thread Count</div>
                  <div className="font-cinzel text-sm font-semibold text-[#5C1D24]">400+ Count Silk</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#2A211D]/50 uppercase tracking-widest font-sans">Embroidered Work</div>
                  <div className="font-cinzel text-sm font-semibold text-[#5C1D24]">Zari & Resham</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#2A211D]/50 uppercase tracking-widest font-sans">Origin</div>
                  <div className="font-cinzel text-sm font-semibold text-[#5C1D24]">Jodhpur / Jaipur</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
