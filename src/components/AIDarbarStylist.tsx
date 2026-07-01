import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, X, Bot, User } from 'lucide-react';

interface Message {
  sender: 'bot' | 'user';
  text: string;
  timestamp: Date;
}

interface AIDarbarStylistProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIDarbarStylist: React.FC<AIDarbarStylistProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: "Khamma Ghani, Hukum! 🙏 Welcome to the Royal Darbar of Choudhary Cloth Stores. I am your personal Darbar Stylist.\n\nTell me, what grand occasion are we preparing for today? (Wedding, Festival, or Casual Royal styling?)",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const responses: Record<string, string> = {
    wedding: "Hukum, for a majestic wedding look, we highly recommend our *Royal Red Sherwani* adorned with golden zari work. Pair it with a classic *Pachrangi Safa (Turban)* and hand-embroidered *Mojari Jootis* to look like a true Maharaja. Shall I add these to your bag?",
    turban: "A royal *Pachrangi Safa* (five-color Rajasthani turban) is the soul of Marwari wear! It pairs beautifully with both our deep maroon *Jodhpuri Bandhgala* and the off-white *Heritage Cotton Kurta*. It adds instant dignity, sa!",
    sherwani: "Our *Royal Red Sherwani* is woven with 400+ thread silk. It features intricate zari borders. For weddings, Mr. Balkishan Choudhary recommends pairing it with a cream silk dupatta and golden jootis. Truly spectacular, Hukum!",
    bandhgala: "The *Jodhpuri Bandhgala* is a masterpiece of tailoring. It offers a structured modern fit with royal brass buttons. Ideal for formal receptions, evening sangeet, or corporate expos, sa!",
    kurta: "Our *Heritage Cotton Kurta Pajama* is handloom-spun for maximum comfort in warm weather, detailed with delicate Rajasthani Bandhani prints. Very popular for festivals, sa!",
    jooti: "Traditional *Embroidered Jootis* feature high-end leather and gold thread. Tip from the owners: choose one size snug, as pure leather stretches to fit your feet perfectly!",
    saree: "Hukum, please note that Choudhary Cloth Stores now specializes exclusively in premium menswear, wedding sherwanis, Jodhpuri suits, and turbans. We no longer stock sarees or women's wear, sa!",
    tailoring: "Bespoke tailoring is our pride, Hukum! We offer custom-made Sherwanis, Bandhgalas, and Kurtas tailored to your exact measurements. If you are in Mumbai, please visit our Dindoshi boutique for a physical fitting. For long-distance orders, we can guide you via WhatsApp to submit your size details, sa!",
    delivery: "We provide secure nationwide shipping across India, sa! Local deliveries within Goregaon and Mumbai are dispatched via quick couriers. Standard orders take 3-5 business days, while custom-tailored sherwanis and lehengas take 7-10 days to perfect before shipping.",
    care: "To preserve your royal attire: dry clean heavy silks, velvet sherwanis, and zari-embroidered garments. Handloom cotton kurtas can be gently hand-washed in cold water. Keep leather mojari jootis dry and polish them periodically, sa!",
    returns: "We strive to satisfy every guest, Hukum! Exchanges are gladly accepted within 7 days of purchase in original condition with tags intact. Please note that custom-tailored and altered garments are bespoke orders and are final sale, sa.",
    music: "Ah, the sweet Rajasthani instrumental tune! We play a traditional Rajasthani background melody automatically to welcome you to the storefront. You can easily control or mute it using the audio button at the top header of the shop, sa!",
    price: "Hukum, our boutique offers high-fidelity luxury garments at fair prices starting from ₹3,200 for raw-silk Kurtas, up to ₹28,999 for hand-embroidered wedding Sherwanis, sa.",
    choudhary: "Choudhary Cloth Stores was established in **1994** by Mr. Balkishan Bhagaram Choudhary and Mr. Bhagaram Khimaram Choudhary. Over the last 30 years, we have served over **1 Lakh+ Happy Customers** with authentic Rajasthani textiles in Goregaon, Mumbai, sa!",
    address: "Visit our palace boutique in Mumbai at: \n*Shop No.-11, K-4, near Police Chowky, B.M.C. Colony, Gen. A. K. Vaidya Marg, Dindoshi Vasahat, Goregaon East, Mumbai 400065*. \nWe would love to welcome you, Hukum!",
    contact: "You can reach the owners directly, sa:\n- Mr. Balkishan Choudhary: **9702516085**\n- Mr. Bhagaram Choudhary: **9920920792**\n- Email: **choudharyclothstores@gmail.com**\nWe guarantee prompt and personal service!",
    owners: "The store is run by Mr. Balkishan Choudhary and Mr. Bhagaram Choudhary. They carry the lineage of Rajasthani cloth trading and started this store in 1994 to serve Mumbai with quality ethnic fabrics, sa!",
  };

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Add user message
    const userMsg: Message = {
      sender: 'user',
      text: textToSend,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Process reply
    setTimeout(() => {
      const lower = textToSend.toLowerCase();
      let replyText = "Hukum, that is a splendid query! However, my stylist knowledge is focusing on wedding sherwanis, boys & girls wear, custom tailoring, shipping details, or history of our Goregaon store. Ask me about matching colors, store locations, or exchange policies!";

      // Keyword scanning
      if (lower.includes('wed') || lower.includes('shaadi') || lower.includes('marri')) {
        replyText = responses.wedding;
      } else if (lower.includes('turban') || lower.includes('safa') || lower.includes('pagri')) {
        replyText = responses.turban;
      } else if (lower.includes('sherwani')) {
        replyText = responses.sherwani;
      } else if (lower.includes('bandhgala') || lower.includes('jodhpuri')) {
        replyText = responses.bandhgala;
      } else if (lower.includes('kurta') || lower.includes('pajama')) {
        replyText = responses.kurta;
      } else if (lower.includes('jooti') || lower.includes('moj') || lower.includes('shoe')) {
        replyText = responses.jooti;
      } else if (lower.includes('saree') || lower.includes('lehenga') || lower.includes('sari') || lower.includes('women')) {
        replyText = responses.saree;
      } else if (lower.includes('tailor') || lower.includes('stitch') || lower.includes('custom') || lower.includes('measure') || lower.includes('size') || lower.includes('fit')) {
        replyText = responses.tailoring;
      } else if (lower.includes('deliver') || lower.includes('ship') || lower.includes('courier') || lower.includes('post') || lower.includes('speed')) {
        replyText = responses.delivery;
      } else if (lower.includes('care') || lower.includes('wash') || lower.includes('clean') || lower.includes('dry')) {
        replyText = responses.care;
      } else if (lower.includes('return') || lower.includes('exchange') || lower.includes('replace') || lower.includes('refund')) {
        replyText = responses.returns;
      } else if (lower.includes('music') || lower.includes('song') || lower.includes('tune') || lower.includes('sound') || lower.includes('audio')) {
        replyText = responses.music;
      } else if (lower.includes('price') || lower.includes('cost') || lower.includes('how much') || lower.includes('cheap') || lower.includes('expensive')) {
        replyText = responses.price;
      } else if (lower.includes('choudhary') || lower.includes('history') || lower.includes('since') || lower.includes('established')) {
        replyText = responses.choudhary;
      } else if (lower.includes('address') || lower.includes('where') || lower.includes('shop') || lower.includes('location') || lower.includes('mumbai') || lower.includes('goregaon')) {
        replyText = responses.address;
      } else if (lower.includes('contact') || lower.includes('phone') || lower.includes('number') || lower.includes('call') || lower.includes('email')) {
        replyText = responses.contact;
      } else if (lower.includes('owner') || lower.includes('balkishan') || lower.includes('bhagaram')) {
        replyText = responses.owners;
      } else if (lower.includes('khamma') || lower.includes('ghani') || lower.includes('hello') || lower.includes('hi')) {
        replyText = "Khamma Ghani, Hukum! 🙏 May the light of Rajasthan guide your fashion choices. Ask me about our sherwanis, sarees, custom tailoring, store address, or return policies.";
      }

      setMessages(prev => [...prev, {
        sender: 'bot',
        text: replyText,
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="w-full max-w-md h-[550px] royal-glass border border-[#D4AF37] rounded-2xl flex flex-col justify-between overflow-hidden shadow-2xl animate-scale-up"
        style={{ backgroundColor: '#FAF6F0' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#D4AF37]/20 bg-[#F3ECE0]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#5C1D24] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37]">
              <Sparkles size={18} className="animate-pulse" />
            </div>
            <div>
              <h3 className="font-cinzel text-sm font-bold text-[#5C1D24]">Royal Darbar Stylist</h3>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-ping" />
                <span className="text-[10px] text-green-800 font-bold uppercase tracking-wider font-sans">Active Advisor</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#FAF6F0] rounded-full text-[#5C1D24] transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-[#FAF6F0] to-[#F3ECE0]/30">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex gap-3 max-w-[85%] ${
                msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
              }`}
            >
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${
                msg.sender === 'user' 
                  ? 'bg-[#D4AF37] text-[#2A1115] border border-[#FAF6F0]' 
                  : 'bg-[#5C1D24] text-[#D4AF37] border border-[#D4AF37]/35'
              }`}>
                {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
              </div>

              {/* Bubble */}
              <div className={`p-3.5 rounded-xl text-xs leading-relaxed font-sans shadow-xs whitespace-pre-line ${
                msg.sender === 'user'
                  ? 'bg-[#5C1D24] text-[#FAF6F0] rounded-tr-none border border-[#D4AF37]/30'
                  : 'bg-[#F3ECE0] text-[#2A211D] rounded-tl-none border border-[#D4AF37]/20'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 max-w-[85%]">
              <div className="w-8 h-8 rounded-full bg-[#5C1D24] text-[#D4AF37] border border-[#D4AF37]/35 flex items-center justify-center">
                <Bot size={14} />
              </div>
              <div className="bg-[#F3ECE0] text-[#2A211D]/60 p-3 rounded-xl rounded-tl-none border border-[#D4AF37]/20 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-[#5C1D24] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-[#5C1D24] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-[#5C1D24] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>

        {/* Quick Suggestions Buttons */}
        <div className="p-3 border-t border-[#D4AF37]/15 bg-[#F3ECE0]/40 flex gap-2 overflow-x-auto select-none no-scrollbar">
          <button
            onClick={() => handleSend("Suggest a wedding outfit")}
            className="flex-shrink-0 px-3 py-1.5 bg-[#FAF6F0] hover:bg-[#F3ECE0] text-[#5C1D24] text-[10px] font-semibold border border-[#D4AF37]/30 rounded-full transition-colors font-sans cursor-pointer"
          >
            💍 Wedding Look
          </button>
          <button
            onClick={() => handleSend("Do you offer custom tailoring?")}
            className="flex-shrink-0 px-3 py-1.5 bg-[#FAF6F0] hover:bg-[#F3ECE0] text-[#5C1D24] text-[10px] font-semibold border border-[#D4AF37]/30 rounded-full transition-colors font-sans cursor-pointer"
          >
            🪡 Custom Tailoring
          </button>
          <button
            onClick={() => handleSend("Tell me about your sarees collection")}
            className="flex-shrink-0 px-3 py-1.5 bg-[#FAF6F0] hover:bg-[#F3ECE0] text-[#5C1D24] text-[10px] font-semibold border border-[#D4AF37]/30 rounded-full transition-colors font-sans cursor-pointer"
          >
            💃 Sarees & Lehengas
          </button>
          <button
            onClick={() => handleSend("What is your shipping and return policy?")}
            className="flex-shrink-0 px-3 py-1.5 bg-[#FAF6F0] hover:bg-[#F3ECE0] text-[#5C1D24] text-[10px] font-semibold border border-[#D4AF37]/30 rounded-full transition-colors font-sans cursor-pointer"
          >
            📦 Shipping & Returns
          </button>
          <button
            onClick={() => handleSend("Show store address and contact info")}
            className="flex-shrink-0 px-3 py-1.5 bg-[#FAF6F0] hover:bg-[#F3ECE0] text-[#5C1D24] text-[10px] font-semibold border border-[#D4AF37]/30 rounded-full transition-colors font-sans cursor-pointer"
          >
            📍 Store Address
          </button>
        </div>

        {/* Footer input form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
          className="p-3 border-t border-[#D4AF37]/20 bg-[#F3ECE0] flex gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type 'wedding outfit', 'turban match'..."
            className="flex-1 p-2 bg-[#FAF6F0] text-xs border border-[#D4AF37]/30 rounded focus:outline-none focus:border-[#5C1D24] font-sans"
          />
          <button
            type="submit"
            className="p-2 bg-[#5C1D24] hover:bg-[#4A141A] text-[#FAF6F0] rounded border border-[#D4AF37] transition-all cursor-pointer"
          >
            <Send size={15} />
          </button>
        </form>
      </div>
    </div>
  );
};
