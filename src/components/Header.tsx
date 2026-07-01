import { ShoppingBag, Volume2, VolumeX, Store, Star, Lock } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  musicEnabled: boolean;
  onMusicToggle: () => void;
  onStylistClick: () => void;
  onOwnerPortalClick: () => void;
  isAdminLoggedIn: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onCartClick,
  musicEnabled,
  onMusicToggle,
  onStylistClick,
  onOwnerPortalClick,
  isAdminLoggedIn,
}) => {
  return (
    <header className="sticky top-[6px] md:top-[12px] z-40 w-full royal-glass border-b border-[#D4AF37]/20 px-6 py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Side: Owner Quick Trust details */}
        <div className="hidden lg:flex items-center gap-6 text-xs text-[#5C1D24] font-medium tracking-wide">
          <div className="flex items-center gap-1.5">
            <Store size={14} className="text-[#D4AF37]" />
            <span>ESTD. 1994</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Star size={14} className="text-[#D4AF37]" fill="#D4AF37" />
            <span>1 Lakh+ Happy Customers</span>
          </div>
        </div>

        {/* Center: Main Logo & Brand */}
        <div className="flex flex-col items-center text-center">
          <span className="font-rozha text-3xl md:text-4xl text-[#5C1D24] tracking-wide leading-none hover:scale-102 transition-transform duration-300 select-none">
            चौधरी क्लॉथ स्टोर्स
          </span>
          <span className="font-cinzel text-xs md:text-sm text-[#D4AF37] tracking-[0.3em] font-semibold mt-1 uppercase select-none">
            Choudhary Cloth Stores
          </span>
          <span className="text-[9px] text-[#5C1D24]/75 uppercase tracking-[0.2em] font-bold mt-0.5 select-none font-sans">
            Represented by pixelblueprint54-hue
          </span>
        </div>

        {/* Right Side: Interactive Controls & Cart */}
        <div className="flex items-center gap-3 md:gap-5">
          <button
            onClick={onStylistClick}
            className="px-4 py-2 bg-[#5C1D24] hover:bg-[#4A141A] text-[#FAF6F0] font-semibold text-xs tracking-wider uppercase rounded border border-[#D4AF37] transition-all duration-300 cursor-pointer shadow hover:scale-105 active:scale-95"
          >
            AI Stylist
          </button>

          {/* Music Control */}
          <button
            onClick={onMusicToggle}
            className="p-2 hover:bg-[#F3ECE0] rounded-full text-[#5C1D24] border border-[#D4AF37]/30 transition-colors duration-200 cursor-pointer"
            title={musicEnabled ? "Mute Folk Tune" : "Play Folk Tune"}
          >
            {musicEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>

          {/* Owner Portal Lock Icon */}
          <button
            onClick={onOwnerPortalClick}
            className={`p-2 rounded-full border transition-all duration-300 cursor-pointer ${
              isAdminLoggedIn 
                ? 'bg-green-600 border-green-500 text-white hover:bg-green-700 animate-pulse'
                : 'hover:bg-[#F3ECE0] text-[#5C1D24] border-[#D4AF37]/30'
            }`}
            title={isAdminLoggedIn ? "Open Owner Dashboard" : "Owner Login Portal"}
          >
            <Lock size={20} />
          </button>

          {/* Cart Icon */}
          <button
            onClick={onCartClick}
            className="relative p-2.5 bg-[#5C1D24] hover:bg-[#4A141A] text-[#FAF6F0] rounded-full border border-[#D4AF37] transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#D4AF37] text-[#2A1115] text-[10px] font-bold w-5.5 h-5.5 rounded-full flex items-center justify-center border-2 border-[#FAF6F0] shadow-md animate-pulse">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
