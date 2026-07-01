import React, { useState } from 'react';
import { X, Plus, Edit2, Trash2, Check, RefreshCw, LogOut, Package } from 'lucide-react';
import type { Product } from './ProductCard';

interface OwnerDashboardProps {
  products: Product[];
  onAddProduct: (product: Product) => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onResetCatalog: () => void;
  onLogout: () => void;
  onClose: () => void;
  onChangePassword: (newPass: string) => void;
}

const PRESET_IMAGES = [
  { label: 'SRK Obsidian Sherwani', value: '/sherwani_black_srk.png' },
  { label: 'Maharaja Emerald Sherwani', value: '/sherwani_blue_actor.png' },
  { label: 'Imperial Groom Ivory Sherwani', value: '/sherwani_gold_actor.png' },
  { label: 'Jodhpuri Royal Suit', value: '/jodhpuri_suit.png' },
  { label: 'Indigo Nehru Jacket', value: '/indigo_jacket.png' },
  { label: 'Jaipur Gold Silk Kurta', value: '/jaipur_gold_kurta.png' },
  { label: 'Jodhpuri Breeches Set', value: '/breeches_kurta.png' },
  { label: 'Maharaja Dhoti & Kurta', value: '/dhoti_kurta_male.png' },
  { label: 'Angrakha Jaipur Kurta', value: '/angrakha_kurta_male.png' },
  { label: 'Pachrangi Leheriya Safa', value: '/pachrangi_safa.png' },
  { label: 'Zardozi Mojari Jootis', value: '/zardozi_jootis.png' }
];

export const OwnerDashboard: React.FC<OwnerDashboardProps> = ({
  products,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  onResetCatalog,
  onLogout,
  onClose,
  onChangePassword
}) => {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  // Form states
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Wedding Special');
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState('');
  const [textureType, setTextureType] = useState<'sherwani' | 'bandhgala' | 'kurta' | 'safa' | 'jooti' | 'saree'>('sherwani');
  const [primaryColor, setPrimaryColor] = useState('#5C1D24');
  const [secondaryColor, setSecondaryColor] = useState('#FAF6F0');
  const [accentColor, setAccentColor] = useState('#D4AF37');
  const [imageUrl, setImageUrl] = useState('/sherwani_black_srk.png');
  
  // Image presentation mode: 'preset' | 'url' | 'upload'
  const [imageMode, setImageMode] = useState<'preset' | 'url' | 'upload'>('preset');
  
  // Camera & File Upload states
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const streamRef = React.useRef<MediaStream | null>(null);
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Password management states
  const [newPassword, setNewPassword] = useState('');
  const [passSuccess, setPassSuccess] = useState('');
  const [passError, setPassError] = useState('');

  const handlePasswordChangeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword.trim()) {
      setPassError('Password cannot be empty.');
      return;
    }
    if (newPassword.length < 4) {
      setPassError('Password must be at least 4 characters.');
      return;
    }
    onChangePassword(newPassword.trim());
    setPassSuccess('Royal password updated successfully!');
    setNewPassword('');
    setPassError('');
    setTimeout(() => setPassSuccess(''), 3000);
  };

  // Stop camera stream tracks
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  // Start camera stream
  const startCamera = async () => {
    setError('');
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera access is not supported in this browser or requires a secure HTTPS connection.');
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      streamRef.current = stream;
      setIsCameraActive(true);
    } catch (err: any) {
      console.error("Camera access failed:", err);
      setError(err.message || 'Could not access camera. Please upload file instead.');
    }
  };

  // Capture frame from video tag
  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = 600;
      canvas.height = 450;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, 600, 450);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.7); // Shrinks data size to ~25KB
        setImageUrl(dataUrl);
        setSuccess('Photo captured and optimized successfully!');
        setTimeout(() => setSuccess(''), 2500);
        stopCamera();
      }
    }
  };

  // Handle local file uploads with real-time compression to prevent localStorage QuotaExceededError
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const maxDim = 600;
          let w = img.width;
          let h = img.height;
          if (w > maxDim || h > maxDim) {
            if (w > h) {
              h = Math.round((h * maxDim) / w);
              w = maxDim;
            } else {
              w = Math.round((w * maxDim) / h);
              h = maxDim;
            }
          }
          const canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, w, h);
            const compressed = canvas.toDataURL('image/jpeg', 0.7); // Reduces 2MB image down to ~30KB
            setImageUrl(compressed);
            setSuccess('Image file imported and optimized successfully!');
            setError('');
            setTimeout(() => setSuccess(''), 2500);
          }
        };
      };
      reader.readAsDataURL(file);
    }
  };

  // Helper to parse Google Drive URLs to direct download links
  const parseDriveUrl = (url: string) => {
    const regexd = /\/file\/d\/([a-zA-Z0-9_-]+)/;
    const regexid = /[?&]id=([a-zA-Z0-9_-]+)/;
    const matchd = url.match(regexd);
    const matchid = url.match(regexid);
    const fileId = (matchd && matchd[1]) || (matchid && matchid[1]);
    if (fileId) {
      return `https://lh3.googleusercontent.com/d/${fileId}`;
    }
    return url;
  };

  // Bind video stream to ref after video element mounts
  React.useEffect(() => {
    if (isCameraActive && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [isCameraActive]);

  // Clean up camera on unmount
  React.useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const resetForm = () => {
    setName('');
    setCategory('Wedding Special');
    setPrice(0);
    setDescription('');
    setTextureType('sherwani');
    setPrimaryColor('#5C1D24');
    setSecondaryColor('#FAF6F0');
    setAccentColor('#D4AF37');
    setImageUrl('/sherwani_black_srk.png');
    setImageMode('preset');
    stopCamera();
    setEditingProduct(null);
    setError('');
  };

  const handleStartEdit = (product: Product) => {
    setEditingProduct(product);
    setName(product.name);
    setCategory(product.category);
    setPrice(product.price);
    setDescription(product.description);
    setTextureType(product.textureType);
    setPrimaryColor(product.colorPalette.primary);
    setSecondaryColor(product.colorPalette.secondary);
    setAccentColor(product.colorPalette.accent);
    setImageUrl(product.imageUrl || '');
    
    // Check if image is one of presets or upload
    const isPreset = PRESET_IMAGES.some(img => img.value === product.imageUrl);
    if (isPreset) {
      setImageMode('preset');
    } else if (product.imageUrl?.startsWith('data:image')) {
      setImageMode('upload');
    } else {
      setImageMode('url');
    }
    
    setError('');
    setSuccess('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return setError('Product name is required.');
    if (price <= 0) return setError('Please enter a valid price.');
    if (!description.trim()) return setError('Product description is required.');

    const colorPalette = { primary: primaryColor, secondary: secondaryColor, accent: accentColor };
    
    if (editingProduct) {
      // Edit mode
      const updatedProduct: Product = {
        ...editingProduct,
        name: name.trim(),
        category,
        price,
        description: description.trim(),
        textureType,
        colorPalette,
        imageUrl: imageUrl.trim()
      };
      onEditProduct(updatedProduct);
      setSuccess('Product updated successfully!');
    } else {
      // Add mode
      const newProduct: Product = {
        id: `prod-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        name: name.trim(),
        category,
        price,
        rating: 5.0,
        reviews: 1,
        description: description.trim(),
        textureType,
        colorPalette,
        imageUrl: imageUrl.trim()
      };
      onAddProduct(newProduct);
      setSuccess('New product added to catalog!');
    }

    setTimeout(() => setSuccess(''), 3000);
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product from Choudhary Cloth Stores catalog?')) {
      onDeleteProduct(id);
      setSuccess('Product deleted successfully.');
      setTimeout(() => setSuccess(''), 3000);
      if (editingProduct?.id === id) {
        resetForm();
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-[#2A211D]/80 backdrop-blur-md z-50 overflow-y-auto flex items-center justify-center p-4 md:p-6 font-sans">
      <div className="bg-[#FAF6F0] w-full max-w-6xl rounded-3xl border-2 border-[#D4AF37] shadow-2xl flex flex-col md:flex-row overflow-hidden max-h-[90vh]">
        
        {/* Left Side: Product Editor Form */}
        <div className="w-full md:w-1/2 p-6 md:p-8 border-b md:border-b-0 md:border-r border-[#D4AF37]/20 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <span className="text-[10px] text-[#5C1D24] uppercase tracking-widest font-bold font-sans">Owner Panel</span>
              <h2 className="font-cinzel text-xl md:text-2xl font-bold text-[#5C1D24]">
                {editingProduct ? 'Modify Royal Garment' : 'Add Royal Garment'}
              </h2>
            </div>
            {editingProduct && (
              <button 
                onClick={resetForm}
                className="text-xs px-2.5 py-1.5 bg-[#FAF6F0] border border-[#5C1D24]/20 hover:border-[#5C1D24] rounded-md text-[#5C1D24] transition-all"
              >
                Cancel Edit
              </button>
            )}
          </div>

          {error && <div className="bg-red-50 text-red-700 text-xs p-3 rounded-lg border border-red-200 mb-4">{error}</div>}
          {success && <div className="bg-green-50 text-green-700 text-xs p-3 rounded-lg border border-green-200 mb-4 flex items-center gap-1.5"><Check size={16} /> {success}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Garment Name */}
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#2A211D]/60 font-semibold mb-1">Garment Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="e.g. Royal Maharaja Zardosi Sherwani"
                className="w-full px-4 py-2 text-sm bg-white border border-[#D4AF37]/35 rounded-xl focus:border-[#5C1D24] focus:outline-none"
              />
            </div>

            {/* Grid Row 1: Category & Price */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#2A211D]/60 font-semibold mb-1">Category</label>
                <select 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-[#D4AF37]/35 rounded-xl focus:border-[#5C1D24] focus:outline-none"
                >
                  <option value="Wedding Special">Wedding Special</option>
                  <option value="Formal Wear">Formal Wear</option>
                  <option value="Festive Collection">Festive Collection</option>
                  <option value="Traditional Turban">Traditional Turban</option>
                  <option value="Footwear">Footwear</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#2A211D]/60 font-semibold mb-1">Base Price (INR)</label>
                <input 
                  type="number" 
                  value={price || ''} 
                  onChange={(e) => setPrice(Number(e.target.value))} 
                  placeholder="e.g. 15000"
                  className="w-full px-4 py-2 text-sm bg-white border border-[#D4AF37]/35 rounded-xl focus:border-[#5C1D24] focus:outline-none"
                />
              </div>
            </div>

            {/* Grid Row 2: 3D Model Fit & Canvas Preset */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#2A211D]/60 font-semibold mb-1">Showroom Turban/Fit</label>
                <select 
                  value={textureType} 
                  onChange={(e) => setTextureType(e.target.value as any)}
                  className="w-full px-3 py-2 text-sm bg-white border border-[#D4AF37]/35 rounded-xl focus:border-[#5C1D24] focus:outline-none"
                >
                  <option value="sherwani">Sherwani Silhouette</option>
                  <option value="bandhgala">Bandhgala Suit</option>
                  <option value="kurta">Kurta Pajama</option>
                  <option value="safa">Safa / Turban</option>
                  <option value="jooti">Royal Jooti Mojari</option>
                  <option value="saree">Saree Silhouette</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#2A211D]/60 font-semibold mb-1">Image Presentation</label>
                <div className="flex gap-1 bg-[#F3ECE0]/50 p-1 rounded-xl border border-[#D4AF37]/20">
                  <button 
                    type="button"
                    onClick={() => { stopCamera(); setImageMode('preset'); }}
                    className={`flex-1 py-1 text-[9px] rounded-lg font-bold uppercase transition-all cursor-pointer ${imageMode === 'preset' ? 'bg-[#5C1D24] text-[#FAF6F0]' : 'text-[#2A211D]/70 hover:bg-[#FAF6F0]/50'}`}
                  >
                    Preset
                  </button>
                  <button 
                    type="button"
                    onClick={() => { stopCamera(); setImageMode('url'); }}
                    className={`flex-1 py-1 text-[9px] rounded-lg font-bold uppercase transition-all cursor-pointer ${imageMode === 'url' ? 'bg-[#5C1D24] text-[#FAF6F0]' : 'text-[#2A211D]/70 hover:bg-[#FAF6F0]/50'}`}
                  >
                    Custom URL
                  </button>
                  <button 
                    type="button"
                    onClick={() => { stopCamera(); setImageMode('upload'); }}
                    className={`flex-1 py-1 text-[9px] rounded-lg font-bold uppercase transition-all cursor-pointer ${imageMode === 'upload' ? 'bg-[#5C1D24] text-[#FAF6F0]' : 'text-[#2A211D]/70 hover:bg-[#FAF6F0]/50'}`}
                  >
                    Upload/Camera
                  </button>
                </div>
              </div>
            </div>

            {/* Image Selector Dropdown or Custom text input or Upload options */}
            {imageMode === 'preset' && (
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#2A211D]/60 font-semibold mb-1">Choose Preset Image</label>
                <select 
                  value={imageUrl} 
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-[#D4AF37]/35 rounded-xl focus:border-[#5C1D24] focus:outline-none"
                >
                  {PRESET_IMAGES.map((img) => (
                    <option key={img.value} value={img.value}>{img.label}</option>
                  ))}
                </select>
              </div>
            )}

            {imageMode === 'url' && (
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#2A211D]/60 font-semibold mb-1">Custom Image URL / Google Drive Share Link</label>
                <input 
                  type="text" 
                  value={imageUrl.startsWith('data:image') ? '' : imageUrl} 
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val.includes('drive.google.com')) {
                      const parsed = parseDriveUrl(val);
                      setImageUrl(parsed);
                      setSuccess('Google Drive image link recognized and converted!');
                      setTimeout(() => setSuccess(''), 2500);
                    } else {
                      setImageUrl(val);
                    }
                  }} 
                  placeholder="https://example.com/photo.png or paste Drive Share Link"
                  className="w-full px-4 py-2 text-sm bg-white border border-[#D4AF37]/35 rounded-xl focus:border-[#5C1D24] focus:outline-none"
                />
              </div>
            )}

            {imageMode === 'upload' && (
              <div className="space-y-3 bg-white p-3 rounded-xl border border-[#D4AF37]/20">
                <div className="flex gap-2">
                  {/* File Selector */}
                  <label className="flex-1 flex flex-col items-center justify-center p-2.5 border border-dashed border-[#D4AF37] hover:border-[#5C1D24] bg-[#FAF6F0]/20 hover:bg-[#FAF6F0]/60 rounded-xl cursor-pointer transition-all">
                    <span className="text-[10px] font-bold text-[#5C1D24] uppercase">📁 Upload File</span>
                    <span className="text-[8px] text-gray-400 mt-0.5">PNG, JPG up to 2MB</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileUpload} 
                      className="hidden" 
                    />
                  </label>

                  {/* Camera Trigger */}
                  <button
                    type="button"
                    onClick={isCameraActive ? stopCamera : startCamera}
                    className={`flex-1 p-2 rounded-xl border font-bold uppercase transition-all text-[10px] flex flex-col items-center justify-center gap-1 cursor-pointer ${
                      isCameraActive 
                        ? 'bg-red-50 text-red-700 border-red-200' 
                        : 'bg-[#FAF6F0]/20 hover:bg-[#FAF6F0]/60 text-[#5C1D24] border-[#D4AF37]'
                    }`}
                  >
                    <span>📷 {isCameraActive ? 'Stop Camera' : 'Start Camera'}</span>
                    <span className="text-[8px] text-gray-400 mt-0.5">Use Device Camera</span>
                  </button>
                </div>

                {/* Camera Viewport */}
                {isCameraActive && (
                  <div className="relative rounded-lg overflow-hidden border border-[#D4AF37]/45 bg-black aspect-video flex flex-col items-center justify-center">
                    <video 
                      ref={videoRef} 
                      autoPlay 
                      playsInline 
                      muted 
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={capturePhoto}
                      className="absolute bottom-3 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-[#5C1D24] text-[#D4AF37] hover:bg-[#4A141A] font-bold rounded-lg border border-[#D4AF37] text-[10px] uppercase shadow-lg cursor-pointer"
                    >
                      Capture Photo
                    </button>
                  </div>
                )}

                {/* Google Drive Selector helper */}
                <div className="pt-2 border-t border-gray-100">
                  <label className="block text-[9px] uppercase tracking-wider text-[#2A211D]/60 font-semibold mb-1">Import from Google Drive</label>
                  <input 
                    type="text" 
                    placeholder="Paste Google Drive Share Link here..."
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val.trim()) {
                        const parsed = parseDriveUrl(val);
                        if (parsed !== val) {
                          setImageUrl(parsed);
                          setSuccess('Google Drive image link recognized and converted!');
                          setTimeout(() => setSuccess(''), 2500);
                          e.target.value = '';
                        } else {
                          setError('Not a valid Google Drive file URL.');
                          setTimeout(() => setError(''), 2500);
                        }
                      }
                    }}
                    className="w-full px-3 py-1.5 text-xs bg-[#FAF6F0]/40 border border-[#D4AF37]/25 rounded-lg focus:border-[#5C1D24] focus:outline-none"
                  />
                </div>

                {/* Local Preview */}
                {imageUrl && (imageUrl.startsWith('data:image') || imageUrl.includes('googleusercontent.com')) && (
                  <div className="flex items-center gap-3 bg-[#F3ECE0]/30 p-2 rounded-lg">
                    <img 
                      src={imageUrl} 
                      alt="Import Preview" 
                      className="w-10 h-10 rounded object-cover border border-[#D4AF37]/20"
                    />
                    <div className="min-w-0">
                      <span className="text-[9px] font-bold text-green-700 uppercase block">Imported Successfully</span>
                      <span className="text-[8px] text-gray-500 truncate block">Ready to Save</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Description */}
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#2A211D]/60 font-semibold mb-1">Heritage Description</label>
              <textarea 
                rows={2}
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                placeholder="Describe the royal heritage, cloth weave, and tailoring details..."
                className="w-full px-4 py-2 text-sm bg-white border border-[#D4AF37]/35 rounded-xl focus:border-[#5C1D24] focus:outline-none resize-none"
              />
            </div>

            {/* Color Palette customization for 3D engine */}
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#2A211D]/60 font-semibold mb-2">3D Showroom Color Palette</label>
              <div className="grid grid-cols-3 gap-3 bg-white p-3 rounded-xl border border-[#D4AF37]/20">
                <div className="flex flex-col items-center">
                  <span className="text-[9px] font-sans text-gray-500 mb-1">Primary</span>
                  <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer border border-[#D4AF37]/30" />
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[9px] font-sans text-gray-500 mb-1">Secondary</span>
                  <input type="color" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer border border-[#D4AF37]/30" />
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[9px] font-sans text-gray-500 mb-1">Accent</span>
                  <input type="color" value={accentColor} onChange={(e) => setAccentColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer border border-[#D4AF37]/30" />
                </div>
              </div>
            </div>

            {/* Action Submit */}
            <button 
              type="submit" 
              className="w-full py-3 bg-[#5C1D24] text-[#D4AF37] hover:bg-[#4A141A] font-bold rounded-xl border border-[#D4AF37] shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider text-xs"
            >
              <Plus size={16} />
              {editingProduct ? 'Save Product Changes' : 'Add Product to Catalog'}
            </button>
            {/* Change Owner Password Section */}
            <div className="pt-6 border-t border-[#D4AF37]/25 mt-6 space-y-3">
              <h4 className="font-cinzel text-xs font-bold text-[#5C1D24] uppercase tracking-wider text-left">🔑 Security Portal</h4>
              <p className="text-[10px] text-gray-500 text-left">Update your boutique's dashboard password. This changes the password required at the boutique login portal.</p>
              
              {passError && <div className="bg-red-50 text-red-700 text-[10px] p-2.5 rounded-lg border border-red-200 text-left">{passError}</div>}
              {passSuccess && <div className="bg-green-50 text-green-700 text-[10px] p-2.5 rounded-lg border border-green-200 flex items-center gap-1 text-left"><Check size={12} /> {passSuccess}</div>}

              <form onSubmit={handlePasswordChangeSubmit} className="flex gap-2">
                <input 
                  type="password" 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter New Password"
                  className="flex-1 px-3 py-1.5 text-xs bg-white border border-[#D4AF37]/35 rounded-lg focus:border-[#5C1D24] focus:outline-none"
                />
                <button 
                  type="submit"
                  className="px-4 py-1.5 bg-[#5C1D24] hover:bg-[#4A141A] text-[#D4AF37] font-bold rounded-lg border border-[#D4AF37] text-[10px] uppercase cursor-pointer transition-all"
                >
                  Change Password
                </button>
              </form>
            </div>
          </form>
        </div>

        {/* Right Side: Active Inventory Listing */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col overflow-hidden max-h-[50vh] md:max-h-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-cinzel text-lg font-bold text-[#5C1D24] tracking-wider">Active Inventory ({products.length})</h3>
            <div className="flex gap-2">
              <button 
                onClick={onResetCatalog}
                title="Reset to default menu"
                className="p-2 hover:bg-[#5C1D24]/10 rounded-lg text-[#5C1D24] transition-all border border-[#5C1D24]/20 flex items-center gap-1 text-[10px] font-bold uppercase cursor-pointer"
              >
                <RefreshCw size={14} />
                Reset Defaults
              </button>
              <button 
                onClick={onLogout}
                className="p-2 bg-[#5C1D24] text-[#FAF6F0] hover:bg-[#4A141A] rounded-lg transition-all border border-[#D4AF37] flex items-center gap-1 text-[10px] font-bold uppercase cursor-pointer"
              >
                <LogOut size={14} />
                Log out
              </button>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-all cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-2">
            {products.map((prod) => (
              <div 
                key={prod.id} 
                className={`p-3 rounded-2xl border flex items-center justify-between transition-all ${editingProduct?.id === prod.id ? 'bg-[#FAF6F0] border-[#5C1D24] shadow-md' : 'bg-white border-[#D4AF37]/20 shadow-xs'}`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {prod.imageUrl ? (
                    <img 
                      src={prod.imageUrl} 
                      alt={prod.name} 
                      className="w-12 h-12 rounded-lg object-cover border border-[#D4AF37]/20 bg-[#FAF6F0]"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-[#5C1D24]/10 text-[#5C1D24] flex items-center justify-center border border-[#D4AF37]/20">
                      <Package size={20} />
                    </div>
                  )}
                  <div className="min-w-0">
                    <h4 className="font-semibold text-xs text-[#2A211D] truncate">{prod.name}</h4>
                    <div className="flex items-center gap-2 mt-0.5 text-[9px] text-gray-500 uppercase font-sans font-bold">
                      <span className="text-[#5C1D24]">{prod.category}</span>
                      <span>•</span>
                      <span>Rs. {prod.price.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-1 ml-3">
                  <button 
                    onClick={() => handleStartEdit(prod)}
                    title="Edit garment"
                    className="p-2 hover:bg-yellow-50 text-yellow-600 rounded-lg transition-all"
                  >
                    <Edit2 size={15} />
                  </button>
                  <button 
                    onClick={() => handleDelete(prod.id)}
                    title="Delete garment"
                    className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-all"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
