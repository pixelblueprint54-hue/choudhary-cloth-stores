import { useState, useRef, useEffect } from 'react';
import { Camera, RefreshCw, X, Sliders, Sparkles, Download, Upload, User, Video } from 'lucide-react';

interface ARTryOnProps {
  isOpen: boolean;
  onClose: () => void;
  initialProduct?: any;
}

type TryOnMode = 'webcam' | 'model-male' | 'model-female' | 'upload';

// Royal outfits vector SVGs for virtual try-on overlay
const BLACK_SHERWANI_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300">
  <path d="M 40,300 C 40,230 100,150 200,150 C 300,150 360,230 360,300 Z" fill="#111111" stroke="#D4AF37" stroke-width="2.5" />
  <path d="M 148,150 C 148,110 252,110 252,150" fill="none" stroke="#D4AF37" stroke-width="12" stroke-linecap="round" />
  <line x1="200" y1="160" x2="200" y2="300" stroke="#D4AF37" stroke-width="3.5" stroke-dasharray="2,12" stroke-linecap="round" />
</svg>
`;

const RED_SHERWANI_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300">
  <path d="M 40,300 C 40,230 100,150 200,150 C 300,150 360,230 360,300 Z" fill="#5C1D24" stroke="#D4AF37" stroke-width="2.5" />
  <path d="M 148,150 C 148,110 252,110 252,150" fill="none" stroke="#FAF6F0" stroke-width="12" stroke-linecap="round" />
  <line x1="200" y1="160" x2="200" y2="300" stroke="#D4AF37" stroke-width="3.5" stroke-dasharray="2,12" stroke-linecap="round" />
</svg>
`;

const BANDHGALA_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300">
  <path d="M 40,300 C 40,230 100,150 200,150 C 300,150 360,230 360,300 Z" fill="#1A2C4C" stroke="#D4AF37" stroke-width="2" />
  <path d="M 152,150 C 152,120 248,120 248,150" fill="none" stroke="#1A2C4C" stroke-width="10" stroke-linecap="round" />
  <circle cx="200" cy="180" r="4.5" fill="#D4AF37"/>
  <circle cx="200" cy="210" r="4.5" fill="#D4AF37"/>
  <circle cx="200" cy="240" r="4.5" fill="#D4AF37"/>
  <circle cx="200" cy="270" r="4.5" fill="#D4AF37"/>
  <path d="M 105,200 L 135,200 L 125,185 Z" fill="#5C1D24" />
</svg>
`;

const GOLD_KURTA_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300">
  <path d="M 40,300 C 40,230 100,150 200,150 C 300,150 360,230 360,300 Z" fill="#D4AF37" stroke="#FAF6F0" stroke-width="2" />
  <path d="M 190,150 L 190,260 L 210,260 L 210,150 Z" fill="#5C1D24" />
  <circle cx="200" cy="170" r="3.5" fill="#D4AF37"/>
  <circle cx="200" cy="200" r="3.5" fill="#D4AF37"/>
  <circle cx="200" cy="230" r="3.5" fill="#D4AF37"/>
</svg>
`;

const CRIMSON_SAREE_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300">
  <path d="M 60,300 C 60,230 110,160 200,160 C 290,160 340,230 340,300 Z" fill="#8C1B2F" stroke="#D4AF37" stroke-width="1.5" />
  <path d="M 70,300 C 130,230 170,160 250,140 L 220,130 C 150,160 110,230 50,300 Z" fill="#D4AF37" opacity="0.9" />
  <path d="M 120,300 C 170,235 210,180 280,160 C 290,175 230,200 180,270 Z" fill="#8C1B2F" />
  <path d="M 70,300 Q 155,200 235,145" fill="none" stroke="#D4AF37" stroke-width="8" />
</svg>
`;

// Inline vector faces for high-end offline fallback simulation
const MALE_MODEL_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" width="640" height="480">
  <rect width="640" height="480" fill="#F3ECE0" />
  <path d="M 50,480 L 50,200 Q 320,0 590,200 L 590,480" fill="none" stroke="#D4AF37" stroke-width="2" stroke-dasharray="8,8" opacity="0.35"/>
  <ellipse cx="320" cy="180" rx="90" ry="110" fill="#FAF6F0" stroke="#D4AF37" stroke-width="2.5" />
  <ellipse cx="222" cy="190" rx="16" ry="28" fill="#FAF6F0" stroke="#D4AF37" stroke-width="2" />
  <ellipse cx="418" cy="190" rx="16" ry="28" fill="#FAF6F0" stroke="#D4AF37" stroke-width="2" />
  <rect x="284" y="270" width="72" height="90" fill="#FAF6F0" stroke="#D4AF37" stroke-width="2" />
  <path d="M 200,430 Q 320,330 440,430 L 480,480 L 160,480 Z" fill="#5C1D24" stroke="#D4AF37" stroke-width="3" />
  <path d="M 320,330 L 320,430" stroke="#D4AF37" stroke-width="2" />
  <path d="M 270,330 Q 320,350 370,330" fill="none" stroke="#D4AF37" stroke-width="3" />
  <path d="M 280,220 Q 300,212 320,220 Q 340,212 360,220 Q 376,204 360,232 Q 320,224 280,232 Q 264,204 280,220 Z" fill="#2A211D" />
  <path d="M 264,156 Q 284,146 300,156" stroke="#2A211D" stroke-width="3" fill="none"/>
  <path d="M 340,156 Q 356,146 376,156" stroke="#2A211D" stroke-width="3" fill="none"/>
  <circle cx="282" cy="168" r="4" fill="#2A211D"/>
  <circle cx="358" cy="168" r="4" fill="#2A211D"/>
</svg>
`;

const FEMALE_MODEL_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" width="640" height="480">
  <rect width="640" height="480" fill="#F3ECE0" />
  <path d="M 50,480 L 50,200 Q 320,0 590,200 L 590,480" fill="none" stroke="#D4AF37" stroke-width="2" stroke-dasharray="8,8" opacity="0.35"/>
  <ellipse cx="320" cy="190" rx="84" ry="104" fill="#FAF6F0" stroke="#D4AF37" stroke-width="2.5" />
  <ellipse cx="230" cy="200" rx="14" ry="24" fill="#FAF6F0" stroke="#D4AF37" stroke-width="2" />
  <ellipse cx="410" cy="200" rx="14" ry="24" fill="#FAF6F0" stroke="#D4AF37" stroke-width="2" />
  <rect x="290" y="280" width="60" height="80" fill="#FAF6F0" stroke="#D4AF37" stroke-width="2" />
  <path d="M 210,440 Q 320,340 430,440 L 470,480 L 170,480 Z" fill="#5C1D24" stroke="#D4AF37" stroke-width="3" />
  <path d="M 260,370 Q 320,400 380,370" fill="none" stroke="#D4AF37" stroke-width="2" />
  <path d="M 270,166 Q 286,156 300,166" stroke="#2A211D" stroke-width="3" fill="none"/>
  <path d="M 340,166 Q 354,156 370,166" stroke="#2A211D" stroke-width="3" fill="none"/>
  <circle cx="320" cy="148" r="7" fill="#5C1D24" /> 
  <circle cx="286" cy="178" r="3" fill="#2A211D"/>
  <circle cx="354" cy="178" r="3" fill="#2A211D"/>
  <path d="M 308,208 Q 320,216 332,208" stroke="#5C1D24" stroke-width="3" fill="none"/>
</svg>
`;

export const ARTryOn: React.FC<ARTryOnProps> = ({ isOpen, onClose, initialProduct }) => {
  const [tryOnMode, setTryOnMode] = useState<TryOnMode>('model-male');
  const [streamActive, setStreamActive] = useState(false);
  const [selectedOutfit, setSelectedOutfit] = useState<'none' | 'sherwani-black' | 'sherwani-red' | 'bandhgala' | 'kurta' | 'saree'>('sherwani-black');
  const [selectedTurban, setSelectedTurban] = useState<'pachrangi' | 'red' | 'gold'>('pachrangi');
  
  // Fit Adjustment Sliders
  const [yOffset, setYOffset] = useState<number>(0);
  const [scale, setScale] = useState<number>(1.0);
  const [captured, setCaptured] = useState<boolean>(false);
  const [uploadedImageSrc, setUploadedImageSrc] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync with product selected from catalog
  useEffect(() => {
    if (initialProduct) {
      const type = initialProduct.textureType;
      const name = initialProduct.name.toLowerCase();
      
      if (type === 'saree') {
        setSelectedOutfit('saree');
      } else if (type === 'sherwani') {
        if (name.includes('red') || name.includes('crimson')) {
          setSelectedOutfit('sherwani-red');
        } else {
          setSelectedOutfit('sherwani-black');
        }
      } else if (type === 'bandhgala') {
        setSelectedOutfit('bandhgala');
      } else if (type === 'kurta') {
        setSelectedOutfit('kurta');
      }
    }
  }, [initialProduct, isOpen]);

  // Activate webcam stream
  const startWebcam = async () => {
    try {
      // Release any active stream first
      stopWebcam();
      
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera access is not supported in this browser or requires a secure HTTPS connection.');
      }
      
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: 'user' }
      });
      streamRef.current = stream;
      setStreamActive(true);
      setTryOnMode('webcam');
      setCaptured(false);
    } catch (err) {
      console.warn("Webcam access denied or unavailable. Falling back to Model mode.", err);
      setStreamActive(false);
      setTryOnMode('model-male');
    }
  };

  const stopWebcam = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setStreamActive(false);
  };

  // 1. Monitor modal open state to initialize/release webcam
  useEffect(() => {
    if (isOpen) {
      startWebcam();
    } else {
      stopWebcam();
    }
    return () => stopWebcam();
  }, [isOpen]);

  // 2. Fix React mount race condition: Set video srcObject AFTER the <video> element mounts in DOM
  useEffect(() => {
    if (tryOnMode === 'webcam' && streamActive && streamRef.current && videoRef.current) {
      const video = videoRef.current;
      video.srcObject = streamRef.current;
      video.play().catch(e => console.error("Webcam video play failed inside mount effect:", e));
    }
  }, [tryOnMode, streamActive, isOpen]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadedImageSrc(event.target.result as string);
          setTryOnMode('upload');
          setCaptured(false);
          stopWebcam();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const drawCanvasComposition = (bgImageElement: HTMLVideoElement | HTMLImageElement, width: number, height: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    // Draw background (flip horizontally if drawing mirrored webcam stream)
    if (tryOnMode === 'webcam') {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(bgImageElement, 0, 0, canvas.width, canvas.height);
      ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
    } else {
      ctx.drawImage(bgImageElement, 0, 0, canvas.width, canvas.height);
    }

    const drawOverlays = async () => {
      // 1. Draw Outfit Overlay
      if (selectedOutfit !== 'none') {
        await new Promise<void>((resolve) => {
          const outfitImg = new Image();
          outfitImg.src = getOutfitDataUrl();
          outfitImg.onload = () => {
            const ow = 420 * scale;
            const oh = 315 * scale;
            const ox = (canvas.width - ow) / 2;
            const oy = (canvas.height * 0.46) + yOffset;
            ctx.drawImage(outfitImg, ox, oy, ow, oh);
            resolve();
          };
          outfitImg.onerror = () => resolve();
        });
      }

      // 2. Draw Turban Overlay (hidden for saree)
      const hideTurban = selectedOutfit === 'saree';
      if (!hideTurban) {
        await new Promise<void>((resolve) => {
          const turbanImg = new Image();
          turbanImg.src = getTurbanDataUrl();
          turbanImg.onload = () => {
            const tw = 250 * scale;
            const th = 130 * scale;
            const tx = (canvas.width - tw) / 2;
            const ty = (canvas.height * 0.16) + yOffset;
            ctx.drawImage(turbanImg, tx, ty, tw, th);
            resolve();
          };
          turbanImg.onerror = () => resolve();
        });
      }

      setCaptured(true);
    };

    drawOverlays();
  };

  const handleCapture = () => {
    if (!canvasRef.current) return;

    if (tryOnMode === 'webcam' && videoRef.current) {
      drawCanvasComposition(videoRef.current, videoRef.current.videoWidth || 640, videoRef.current.videoHeight || 480);
      stopWebcam();
    } else if (tryOnMode === 'upload' && uploadedImageSrc) {
      const img = new Image();
      img.src = uploadedImageSrc;
      img.onload = () => drawCanvasComposition(img, img.width || 640, img.height || 480);
    } else if (tryOnMode === 'model-male') {
      const img = new Image();
      img.src = `data:image/svg+xml;utf8,${encodeURIComponent(MALE_MODEL_SVG)}`;
      img.onload = () => drawCanvasComposition(img, 640, 480);
    } else if (tryOnMode === 'model-female') {
      const img = new Image();
      img.src = `data:image/svg+xml;utf8,${encodeURIComponent(FEMALE_MODEL_SVG)}`;
      img.onload = () => drawCanvasComposition(img, 640, 480);
    }
  };

  // Helper vectors/SVGs rendered as data URLs
  const getTurbanDataUrl = () => {
    const turbanColors = {
      pachrangi: ['#E25822', '#D4AF37', '#5C1D24', '#1A2C4C', '#FAF6F0'],
      red: ['#5C1D24', '#4A141A', '#5C1D24', '#D4AF37', '#5C1D24'],
      gold: ['#D4AF37', '#C5A059', '#D4AF37', '#FAF6F0', '#D4AF37'],
    }[selectedTurban];

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100" width="200" height="100">
        <ellipse cx="100" cy="55" rx="75" ry="30" fill="${turbanColors[0]}" stroke="${turbanColors[1]}" stroke-width="2"/>
        <path d="M30 65 Q60 30 100 45 T170 50 Q180 65 170 70 Q130 55 90 70 T30 65 Z" fill="${turbanColors[2]}"/>
        <path d="M25 55 Q70 25 110 35 T175 45 Q165 30 110 25 T25 55 Z" fill="${turbanColors[3]}"/>
        <path d="M100 30 Q105 10 95 0 Q90 10 100 30" fill="${turbanColors[2]}" stroke="${turbanColors[1]}" stroke-width="1"/>
        <ellipse cx="100" cy="30" rx="8" ry="8" fill="${turbanColors[1]}" stroke="#FAF6F0"/>
        <circle cx="100" cy="30" r="3" fill="#5C1D24"/>
      </svg>
    `;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  };

  const getOutfitDataUrl = () => {
    const svgs = {
      'sherwani-black': BLACK_SHERWANI_SVG,
      'sherwani-red': RED_SHERWANI_SVG,
      'bandhgala': BANDHGALA_SVG,
      'kurta': GOLD_KURTA_SVG,
      'saree': CRIMSON_SAREE_SVG,
      'none': ''
    };
    const svg = svgs[selectedOutfit] || '';
    if (!svg) return '';
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  };



  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = `choudhary-tryon-${Date.now()}.png`;
    link.href = canvasRef.current.toDataURL();
    link.click();
  };

  const handleReset = () => {
    setCaptured(false);
    if (tryOnMode === 'webcam') {
      startWebcam();
    }
  };

  const toggleMode = (mode: TryOnMode) => {
    setTryOnMode(mode);
    setCaptured(false);
    if (mode === 'webcam') {
      startWebcam();
    } else {
      stopWebcam();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
      <div 
        className="w-full max-w-3xl royal-glass border-2 border-[#D4AF37] rounded-2xl overflow-hidden shadow-2xl animate-scale-up flex flex-col justify-between"
        style={{ backgroundColor: '#FAF6F0' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#D4AF37]/20 bg-[#F3ECE0]">
          <div className="flex items-center gap-2">
            <Camera className="text-[#5C1D24]" size={20} />
            <h2 className="font-cinzel text-base md:text-lg font-bold text-[#5C1D24] flex items-center gap-1.5">
              Royal AR Try-On Chamber
              <Sparkles size={16} className="text-[#D4AF37] animate-pulse" />
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#FAF6F0] rounded-full text-[#5C1D24] transition-colors cursor-pointer"
          >
            <X size={22} />
          </button>
        </div>

        {/* Chamber content grid */}
        <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-[#D4AF37]/20 flex-1">
          
          {/* Left: Simulation Display Container */}
          <div className="w-full md:w-3/5 p-5 flex flex-col items-center justify-center bg-[#2A211D]/5 relative min-h-[340px]">
            
            {/* Viewport Frame */}
            <div className="w-full max-w-[360px] aspect-[4/3] relative rounded-lg overflow-hidden border border-[#D4AF37]/30 bg-black shadow-inner">
              
              {/* Live camera / Model container */}
              <div className={!captured ? "w-full h-full relative" : "hidden"}>
                
                {/* 1. WEBCAM FEED */}
                {tryOnMode === 'webcam' && (
                  <>
                    {streamActive ? (
                      <video 
                        ref={videoRef} 
                        autoPlay 
                        playsInline 
                        muted 
                        className="w-full h-full object-cover scale-x-[-1]" 
                      />
                    ) : (
                      <div className="absolute inset-0 bg-[#2A211D] flex flex-col items-center justify-center text-[#FAF6F0]/80 p-4 text-center">
                        <Camera size={32} className="text-[#D4AF37] mb-2 animate-bounce" />
                        <p className="text-xs font-sans font-semibold">Webcam blocked or loading...</p>
                        <p className="text-[10px] text-[#FAF6F0]/60 mt-1 max-w-[220px]">
                          Please enable camera permissions or select a **Royal Model** from the right.
                        </p>
                      </div>
                    )}
                  </>
                )}

                {/* 2. MODEL MALE BLUEPRINT */}
                {tryOnMode === 'model-male' && (
                  <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: MALE_MODEL_SVG }} />
                )}

                {/* 3. MODEL FEMALE BLUEPRINT */}
                {tryOnMode === 'model-female' && (
                  <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: FEMALE_MODEL_SVG }} />
                )}

                {/* 4. CUSTOM UPLOADED IMAGE */}
                {tryOnMode === 'upload' && (
                  <div className="w-full h-full bg-[#F3ECE0]">
                    {uploadedImageSrc ? (
                      <img src={uploadedImageSrc} className="w-full h-full object-cover" alt="Selfie" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
                        <Upload size={32} className="text-[#D4AF37] mb-2" />
                        <p className="text-xs font-semibold text-[#5C1D24]">No photo uploaded yet</p>
                      </div>
                    )}
                  </div>
                )}

                {/* OVERLAY ELEMENTS (Outfits and Turbans) */}
                {/* Only display overlays if webcam is active, or we are using models/uploaded images */}
                {((tryOnMode !== 'upload' || uploadedImageSrc) && (tryOnMode !== 'webcam' || streamActive)) && (
                  <>
                    {/* Outfit Overlay */}
                    {selectedOutfit !== 'none' && (
                      <div 
                        className="absolute left-1/2 transform -translate-x-1/2 pointer-events-none select-none transition-all duration-100"
                        style={{ 
                          top: `calc(44% + ${yOffset}px)`, 
                          width: `${260 * scale}px`,
                          height: `${195 * scale}px`
                        }}
                      >
                        <img src={getOutfitDataUrl()} className="w-full h-full object-contain" alt="Outfit" />
                      </div>
                    )}

                    {/* Turban Overlay (hidden for saree) */}
                    {selectedOutfit !== 'saree' && (
                      <div 
                        className="absolute left-1/2 transform -translate-x-1/2 pointer-events-none select-none transition-all duration-100"
                        style={{ 
                          top: `calc(15% + ${yOffset}px)`, 
                          width: `${150 * scale}px`,
                          height: `${78 * scale}px`
                        }}
                      >
                        <img src={getTurbanDataUrl()} className="w-full h-full object-contain" alt="Turban" />
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Captured Canvas Display */}
              <div className={captured ? "w-full h-full" : "hidden"}>
                <canvas ref={canvasRef} className="w-full h-full object-cover" />
              </div>
            </div>
            
            {/* Fit Instructions */}
            <div className="text-[10px] text-[#2A211D]/60 mt-3 text-center font-sans max-w-[300px]">
              {!captured 
                ? "Align your shoulders and head inside the frame. Use the sliders on the right to tweak the outfit layout."
                : "Your Royal Portrait is ready! Click download to save your image."}
            </div>
          </div>

          {/* Right: Configuration Controllers Panel */}
          <div className="w-full md:w-2/5 p-5 space-y-4 font-sans text-xs bg-gradient-to-b from-[#FAF6F0] to-[#F3ECE0]/30 flex flex-col justify-between">
            
            <div className="space-y-4">
              {/* Try On Mode Selector */}
              <div className="space-y-2">
                <span className="font-bold text-[#5C1D24] uppercase tracking-widest text-[10px]">1. Background Mode</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => toggleMode('webcam')}
                    className={`py-2 px-2.5 rounded border font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      tryOnMode === 'webcam'
                        ? 'bg-[#5C1D24] text-[#FAF6F0] border-[#D4AF37]'
                        : 'bg-[#FAF6F0] text-[#5C1D24] border-[#D4AF37]/30 hover:bg-[#F3ECE0]'
                    }`}
                  >
                    <Video size={13} />
                    Live Camera
                  </button>

                  <button
                    onClick={() => toggleMode('model-male')}
                    className={`py-2 px-2.5 rounded border font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      tryOnMode === 'model-male'
                        ? 'bg-[#5C1D24] text-[#FAF6F0] border-[#D4AF37]'
                        : 'bg-[#FAF6F0] text-[#5C1D24] border-[#D4AF37]/30 hover:bg-[#F3ECE0]'
                    }`}
                  >
                    <User size={13} />
                    Male Model
                  </button>

                  <button
                    onClick={() => toggleMode('model-female')}
                    className={`py-2 px-2.5 rounded border font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      tryOnMode === 'model-female'
                        ? 'bg-[#5C1D24] text-[#FAF6F0] border-[#D4AF37]'
                        : 'bg-[#FAF6F0] text-[#5C1D24] border-[#D4AF37]/30 hover:bg-[#F3ECE0]'
                    }`}
                  >
                    <User size={13} />
                    Female Model
                  </button>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className={`py-2 px-2.5 rounded border font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      tryOnMode === 'upload'
                        ? 'bg-[#5C1D24] text-[#FAF6F0] border-[#D4AF37]'
                        : 'bg-[#FAF6F0] text-[#5C1D24] border-[#D4AF37]/30 hover:bg-[#F3ECE0]'
                    }`}
                  >
                    <Upload size={13} />
                    Upload Photo
                  </button>
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageUpload} 
                />
              </div>

              {/* Choose Outfit selector */}
              <div className="space-y-2 pt-2 border-t border-[#D4AF37]/15">
                <span className="font-bold text-[#5C1D24] uppercase tracking-widest text-[10px]">2. Choose Outfit Style</span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'sherwani-black', label: '🖤 Black Sherwani' },
                    { id: 'sherwani-red', label: '❤️ Red Sherwani' },
                    { id: 'bandhgala', label: '💙 Bandhgala' },
                    { id: 'kurta', label: '💛 Gold Kurta' },
                    { id: 'saree', label: '❤️ Saree' },
                    { id: 'none', label: '❌ No Outfit' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedOutfit(item.id as any)}
                      className={`py-2 px-1 text-[9px] font-semibold rounded border transition-all cursor-pointer text-center ${
                        selectedOutfit === item.id
                          ? 'bg-[#5C1D24] text-[#FAF6F0] border-[#D4AF37] scale-102 font-bold'
                          : 'bg-[#FAF6F0] text-[#5C1D24] border-[#D4AF37]/30 hover:bg-[#F3ECE0]'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Turban selector */}
              <div className="space-y-2 pt-2 border-t border-[#D4AF37]/15">
                <span className="font-bold text-[#5C1D24] uppercase tracking-widest text-[10px]">3. Choose Turban (Safa)</span>
                <div className="grid grid-cols-3 gap-2">
                  {(['pachrangi', 'red', 'gold'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setSelectedTurban(t)}
                      className={`py-2 px-1 text-[10px] font-semibold uppercase tracking-wider rounded border transition-all cursor-pointer text-center ${
                        selectedTurban === t
                          ? 'bg-[#5C1D24] text-[#FAF6F0] border-[#D4AF37] scale-102 font-bold'
                          : 'bg-[#FAF6F0] text-[#5C1D24] border-[#D4AF37]/30 hover:bg-[#F3ECE0]'
                      }`}
                    >
                      {t === 'pachrangi' ? '🌈 Pachrangi' : t === 'red' ? '🩸 Red' : '👑 Gold'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Position adjustments sliders */}
              <div className="space-y-3 pt-2 border-t border-[#D4AF37]/15">
                <div className="flex items-center gap-1.5 font-bold text-[#5C1D24] uppercase tracking-widest text-[10px]">
                  <Sliders size={14} />
                  4. Fit Adjustments
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-[#2A211D]/60 font-semibold">
                    <span>Height Alignment</span>
                    <span>{yOffset}px</span>
                  </div>
                  <input
                    type="range"
                    min="-80"
                    max="80"
                    value={yOffset}
                    onChange={(e) => setYOffset(Number(e.target.value))}
                    className="w-full accent-[#5C1D24] cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-[#2A211D]/60 font-semibold">
                    <span>Overlay Scale</span>
                    <span>{scale.toFixed(2)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.65"
                    max="1.55"
                    step="0.05"
                    value={scale}
                    onChange={(e) => setScale(Number(e.target.value))}
                    className="w-full accent-[#5C1D24] cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Capture controls */}
            <div className="pt-4 border-t border-[#D4AF37]/20 flex flex-col gap-2">
              {!captured ? (
                <button
                  onClick={handleCapture}
                  disabled={(tryOnMode === 'upload' && !uploadedImageSrc) || (tryOnMode === 'webcam' && !streamActive)}
                  className="w-full py-3.5 bg-[#5C1D24] hover:bg-[#4A141A] text-[#FAF6F0] font-semibold tracking-widest uppercase rounded border border-[#D4AF37] transition-all cursor-pointer shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-101 hover:shadow-xl"
                >
                  <Camera size={16} />
                  Capture Royal Portrait
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleDownload}
                    className="py-3 bg-green-700 hover:bg-green-800 text-[#FAF6F0] font-semibold tracking-widest uppercase rounded border border-green-300 transition-all cursor-pointer shadow flex items-center justify-center gap-2 hover:scale-102"
                  >
                    <Download size={14} />
                    Download
                  </button>
                  <button
                    onClick={handleReset}
                    className="py-3 bg-[#D4AF37] hover:bg-[#C5A059] text-[#2A1115] font-semibold tracking-widest uppercase rounded border border-[#FAF6F0] transition-all cursor-pointer shadow flex items-center justify-center gap-2 hover:scale-102"
                  >
                    <RefreshCw size={14} />
                    Reset Camera
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
