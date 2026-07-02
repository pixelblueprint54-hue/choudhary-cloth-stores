import { useState } from 'react';
import { X, Trash2, ShoppingBag, Sparkles, CheckCircle2, MessageCircle } from 'lucide-react';
import type { Product } from './ProductCard';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CheckoutDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemove: (productId: string) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onClear: () => void;
}

export const CheckoutDrawer: React.FC<CheckoutDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onRemove,
  onUpdateQuantity,
  onClear,
}) => {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'receipt'>('cart');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [address, setAddress] = useState('');
  const [receiptNo, setReceiptNo] = useState('');
  const [receiptDate, setReceiptDate] = useState('');


  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) return;
    setReceiptNo(`CCS-${Math.floor(100000 + Math.random() * 900000)}`);
    setReceiptDate(new Date().toLocaleDateString('en-IN'));
    setCheckoutStep('receipt');
  };

  const handleOrderDone = () => {
    onClear();
    setCheckoutStep('cart');
    setCustomerName('');
    setCustomerPhone('');
    setAddress('');
    onClose();
  };

  const handleSendNotification = (ownerPhone: string) => {
    const itemsText = cart.map(item => `- ${item.product.name} (x${item.quantity})`).join('\n');
    const msg = `*👑 ROYAL ORDER - CHOUDHARY CLOTH STORES 👑*\n` +
                `----------------------------------------\n` +
                `*Customer:* ${customerName.toUpperCase()}\n` +
                `*Contact:* ${customerPhone}\n` +
                `*Address:* ${address || 'Goregaon Store Pick-up'}\n` +
                `----------------------------------------\n` +
                `*Items Ordered:*\n${itemsText}\n` +
                `----------------------------------------\n` +
                `Please confirm my order booking!`;
                
    const url = `https://wa.me/${ownerPhone}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="absolute top-[6px] bottom-[6px] right-[6px] md:top-[12px] md:bottom-[12px] md:right-[12px] max-w-full flex">
        {/* Drawer Panel */}
        <div className="w-screen max-w-md royal-glass rounded-l-2xl border-l border-y border-[#D4AF37] flex flex-col justify-between shadow-2xl relative animate-slide-in">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-[#D4AF37]/20 bg-[#F3ECE0]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="text-[#5C1D24]" size={20} />
              <h2 className="font-cinzel text-lg font-bold text-[#5C1D24]">Royal Shopping Bag</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-[#FAF6F0] rounded-full text-[#5C1D24] transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {checkoutStep === 'cart' ? (
            /* CART WORKFLOW */
            <>
              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <div className="w-16 h-16 rounded-full bg-[#F3ECE0] flex items-center justify-center text-[#D4AF37] mb-4 border border-[#D4AF37]/20">
                      <ShoppingBag size={28} />
                    </div>
                    <p className="font-cinzel text-[#5C1D24] font-semibold text-base mb-1">Your bag is empty</p>
                    <p className="font-sans text-xs text-[#2A211D]/60 max-w-[200px]">Explore the Royal Collection to add fine attire</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div 
                      key={item.product.id} 
                      className="flex items-center gap-4 p-3 bg-[#FAF6F0]/80 rounded-lg border border-[#D4AF37]/15 shadow-sm"
                    >
                      {/* Mini Procedural Fabric Icon */}
                      <div 
                        className="w-16 h-16 rounded-md border border-[#D4AF37]/20 relative overflow-hidden flex-shrink-0"
                        style={{ backgroundColor: item.product.colorPalette.primary }}
                      >
                        <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-[#FAF6F0] uppercase tracking-wider drop-shadow-sm select-none">
                          {item.product.textureType.substring(0, 4)}
                        </span>
                        <div className="absolute inset-1 border border-[#FAF6F0]/20 rounded pointer-events-none" />
                      </div>

                      {/* Name / Price */}
                      <div className="flex-1">
                        <h4 className="font-cinzel text-sm font-bold text-[#5C1D24] line-clamp-1">
                          {item.product.name}
                        </h4>
                        <div className="text-[10px] text-[#2A211D]/50 uppercase tracking-widest font-sans">
                          {item.product.category}
                        </div>
                      </div>

                      {/* Quantity Controller & Delete */}
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-2 border border-[#D4AF37]/30 rounded bg-[#FAF6F0]">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                            className="px-2 py-0.5 text-[#5C1D24] font-bold text-xs hover:bg-[#F3ECE0] transition-colors"
                          >
                            -
                          </button>
                          <span className="font-sans text-xs font-semibold text-[#5C1D24] px-1">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="px-2 py-0.5 text-[#5C1D24] font-bold text-xs hover:bg-[#F3ECE0] transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => onRemove(item.product.id)}
                          className="text-red-700 hover:text-red-900 transition-colors p-1"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Checkout Form & Summary */}
              {cart.length > 0 && (
                <div className="p-5 border-t border-[#D4AF37]/20 bg-[#F3ECE0]/50 space-y-4">
                  {/* Customer Form */}
                  <form onSubmit={handleCheckout} className="space-y-2.5 pt-2">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-[#5C1D24] font-bold mb-1 font-sans">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="e.g. Ishit Jain"
                        className="w-full p-2 text-sm bg-[#FAF6F0] border border-[#D4AF37]/30 rounded focus:outline-none focus:border-[#5C1D24] font-sans"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-[#5C1D24] font-bold mb-1 font-sans">
                        Contact Number *
                      </label>
                      <input
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        title="Please enter a valid 10-digit mobile number"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value.replace(/\D/g, '').substring(0, 10))}
                        placeholder="e.g. 9876543210"
                        className="w-full p-2 text-sm bg-[#FAF6F0] border border-[#D4AF37]/30 rounded focus:outline-none focus:border-[#5C1D24] font-sans"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-[#5C1D24] font-bold mb-1 font-sans">
                        Delivery Address
                      </label>
                      <textarea
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="For delivery details"
                        rows={2}
                        className="w-full p-2 text-sm bg-[#FAF6F0] border border-[#D4AF37]/30 rounded focus:outline-none focus:border-[#5C1D24] font-sans resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 bg-[#5C1D24] hover:bg-[#4A141A] text-[#FAF6F0] font-semibold text-xs tracking-widest uppercase rounded border border-[#D4AF37] transition-all duration-300 cursor-pointer shadow-lg mt-2 flex items-center justify-center gap-2 hover:scale-101"
                    >
                      <Sparkles size={16} />
                      Generate Royal Receipt
                    </button>
                  </form>
                </div>
              )}
            </>
          ) : (
            /* RECEIPT / INVOICE WORKFLOW */
            <div className="flex-1 flex flex-col justify-between p-6 overflow-y-auto">
              <div className="border-4 border-double border-[#D4AF37] p-5 bg-[#FAF6F0] text-center space-y-4 shadow-inner relative">
                {/* Ribbon decoration */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#5C1D24] text-[#FAF6F0] text-[8px] font-bold uppercase tracking-widest px-3 py-1 rounded border border-[#D4AF37]">
                  OFFICIAL RECEIPT
                </div>

                <div className="pt-2">
                  <h3 className="font-rozha text-2xl text-[#5C1D24]">चौधरी क्लॉथ स्टोर्स</h3>
                  <p className="font-cinzel text-[10px] text-[#D4AF37] font-bold tracking-widest">CHOUDHARY CLOTH STORES</p>
                  <p className="text-[9px] text-[#2A211D]/60 mt-1 font-sans">Shop No. 11, K-4, B.M.C. Colony, Goregaon East, Mumbai</p>
                </div>

                <div className="border-t border-b border-[#D4AF37]/20 py-2.5 my-2.5 text-left text-xs space-y-1 font-sans">
                  <div className="flex justify-between">
                    <span className="text-[#2A211D]/60">Date:</span>
                    <span className="font-medium">{receiptDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#2A211D]/60">Receipt No:</span>
                    <span className="font-medium">{receiptNo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#2A211D]/60">Customer Name:</span>
                    <span className="font-medium uppercase">{customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#2A211D]/60">Contact No:</span>
                    <span className="font-medium">{customerPhone}</span>
                  </div>
                </div>

                {/* Items grid */}
                <div className="space-y-2 text-left font-sans text-xs">
                  <div className="font-bold border-b border-[#D4AF37]/20 pb-1 flex justify-between text-[#5C1D24]">
                    <span>Item & Description</span>
                    <span>Quantity</span>
                  </div>
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex justify-between text-[11px] text-[#2A211D]/80 pb-1.5 border-b border-[#D4AF37]/10">
                      <span>
                        {item.product.name}
                      </span>
                      <span className="font-semibold">x{item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex flex-col items-center">
                  <CheckCircle2 size={36} className="text-green-700 mb-2 animate-bounce" />
                  <p className="font-cinzel text-xs font-bold text-[#5C1D24] uppercase tracking-wider">Order Recorded Successfully!</p>
                  <p className="text-[10px] text-[#2A211D]/60 mt-1 max-w-[240px] font-sans">
                    Present this receipt at the Choudhary Booth or Goregaon Store to collect your premium attire. Contact Mr. Bhagaram at 9920920792.
                  </p>
                </div>
              </div>

              {/* WhatsApp Notification Center */}
              <div className="mt-4 p-4 bg-green-50/50 border border-green-600/35 rounded-xl space-y-3">
                <div className="flex items-center gap-2 text-green-800 font-sans font-bold text-xs uppercase tracking-wider justify-center">
                  <MessageCircle size={15} className="text-green-600 animate-pulse" />
                  <span>Send Receipt to Owner Mobile:</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleSendNotification("919702516085")}
                    className="py-2.5 px-3 bg-green-600 hover:bg-green-700 text-white font-bold text-[10px] uppercase tracking-wider rounded border border-green-750 shadow-sm transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Balkishan</span>
                  </button>
                  <button
                    onClick={() => handleSendNotification("919920920792")}
                    className="py-2.5 px-3 bg-green-600 hover:bg-green-700 text-white font-bold text-[10px] uppercase tracking-wider rounded border border-green-750 shadow-sm transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Bhagaram</span>
                  </button>
                </div>
              </div>

              <button
                onClick={handleOrderDone}
                className="w-full py-3.5 bg-[#5C1D24] hover:bg-[#4A141A] text-[#FAF6F0] font-semibold text-xs tracking-widest uppercase rounded border border-[#D4AF37] transition-all duration-300 cursor-pointer shadow-lg mt-4"
              >
                Clear Bag & Return to Store
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
