import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Sparkles, ChevronRight } from 'lucide-react';
import gsap from 'gsap';

interface OpeningCeremonyProps {
  onComplete: () => void;
  musicEnabled: boolean;
  setMusicEnabled: (enabled: boolean) => void;
}

export const OpeningCeremony: React.FC<OpeningCeremonyProps> = ({
  onComplete,
  musicEnabled,
  setMusicEnabled,
}) => {
  const [stage, setStage] = useState<'closed' | 'opening' | 'playing' | 'done'>('closed');
  const [videoMuted, setVideoMuted] = useState<boolean>(!musicEnabled);
  const leftGateRef = useRef<HTMLDivElement>(null);
  const rightGateRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const petalsRef = useRef<HTMLDivElement>(null);

  // Sync video mute status with state
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = videoMuted;
    }
    setMusicEnabled(!videoMuted);
  }, [videoMuted, setMusicEnabled]);

  // Generate random petals for the celebration burst
  const [petals, setPetals] = useState<Array<{ id: number; left: number; delay: number; duration: number; size: number; rotate: number }>>([]);
  
  useEffect(() => {
    if (stage === 'opening' || stage === 'playing') {
      const generated = Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100, // percentage
        delay: Math.random() * 4, // seconds
        duration: 4 + Math.random() * 4, // seconds
        size: 10 + Math.random() * 15, // pixels
        rotate: Math.random() * 360, // degrees
      }));
      setPetals(generated);
    }
  }, [stage]);

  const handleOpenGates = () => {
    setStage('opening');

    // Attempt to start voice greeting if any
    try {
      const audio = new Audio('/padharo.mp3');
      audio.volume = 0.9;
      audio.play().catch(err => console.log("Audio greeting skipped:", err));
    } catch (e) {
      console.log(e);
    }

    // Play video in background immediately to cache/start load
    if (videoRef.current) {
      videoRef.current.play().catch(err => console.log("Video auto-play blocked:", err));
    }

    // Animate 3D Gates swinging open
    const tl = gsap.timeline({
      onComplete: () => {
        setStage('playing');
      }
    });

    tl.to(leftGateRef.current, {
      rotateY: -115,
      duration: 2.5,
      ease: 'power2.inOut',
    }, 0);

    tl.to(rightGateRef.current, {
      rotateY: 115,
      duration: 2.5,
      ease: 'power2.inOut',
    }, 0);

    // Dim the gate panels slightly as they swing open to draw focus to video
    tl.to([leftGateRef.current, rightGateRef.current], {
      opacity: 0.15,
      duration: 2.0,
      ease: 'power2.inOut',
    }, 0.5);
  };

  const handleVideoEnded = () => {
    fadeAndComplete();
  };

  const fadeAndComplete = () => {
    setStage('done');
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 1.2,
      ease: 'power1.out',
      onComplete: onComplete,
    });
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center bg-[#150709] select-none"
    >
      {/* 1. Cinematic Background Video Layer */}
      {(stage === 'opening' || stage === 'playing') && (
        <div className="absolute inset-0 z-0 animate-fade-in duration-1000">
          <video
            ref={videoRef}
            src="/opening_gate.mp4"
            className="w-full h-full object-cover"
            playsInline
            autoPlay
            onEnded={handleVideoEnded}
            style={{ filter: 'brightness(0.95) contrast(1.05)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/35 pointer-events-none" />
        </div>
      )}

      {/* 2. 3D Gate Assembly (Floating over video) */}
      <div className="absolute inset-0 z-10 pointer-events-none flex gate-container">
        {/* Left Gate Panel */}
        <div
          ref={leftGateRef}
          className="w-1/2 h-full bg-[#4A141A] border-r-4 border-[#D4AF37] relative flex flex-col justify-between p-8 gate-left pointer-events-auto"
          style={{
            transformStyle: 'preserve-3d',
            transformOrigin: 'left center',
            boxShadow: '20px 0 40px rgba(0,0,0,0.6)',
            backgroundImage: 'linear-gradient(to right, #3A0C11, #4A141A, #5C1D24)',
          }}
        >
          {/* Marwari Motif Gold Silhouettes & Frames */}
          <div className="absolute inset-4 border border-[#D4AF37]/30 rounded-lg pointer-events-none" />
          <div className="absolute inset-6 border-2 border-dashed border-[#D4AF37]/20 rounded-md pointer-events-none" />
          
          <div className="font-cinzel text-xs text-[#D4AF37]/50 tracking-[0.25em] uppercase">
            Est. 1994
          </div>
          
          {/* Half of Royal Center Mandala */}
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-28 h-56 border-y-4 border-l-4 border-[#D4AF37] rounded-l-full bg-[#5C1D24] shadow-inner flex items-center justify-end pr-3 border-r-0">
            <div className="w-16 h-32 border-2 border-[#D4AF37]/60 rounded-l-full flex items-center justify-end pr-1.5">
              <div className="w-8 h-16 border border-[#D4AF37]/45 rounded-l-full" />
            </div>
            {/* Handle */}
            <div className="absolute right-2 w-3.5 h-20 bg-gradient-to-r from-[#D4AF37] to-[#C5A059] rounded-full border border-[#FAF6F0] shadow-md cursor-pointer hover:scale-105 transition-transform" />
          </div>

          <div className="font-rozha text-3xl md:text-5xl text-[#D4AF37] tracking-wider leading-snug drop-shadow-lg opacity-85">
            चौधरी <br />
            क्लॉथ्स
          </div>

          <div className="font-sans text-xs text-[#D4AF37]/40 tracking-wider">
            Pride of Rajasthan
          </div>
        </div>

        {/* Right Gate Panel */}
        <div
          ref={rightGateRef}
          className="w-1/2 h-full bg-[#4A141A] border-l-4 border-[#D4AF37] relative flex flex-col justify-between p-8 gate-right pointer-events-auto"
          style={{
            transformStyle: 'preserve-3d',
            transformOrigin: 'right center',
            boxShadow: '-20px 0 40px rgba(0,0,0,0.6)',
            backgroundImage: 'linear-gradient(to left, #3A0C11, #4A141A, #5C1D24)',
          }}
        >
          {/* Marwari Motif Gold Silhouettes & Frames */}
          <div className="absolute inset-4 border border-[#D4AF37]/30 rounded-lg pointer-events-none" />
          <div className="absolute inset-6 border-2 border-dashed border-[#D4AF37]/20 rounded-md pointer-events-none" />

          <div className="font-cinzel text-xs text-[#D4AF37]/50 tracking-[0.25em] uppercase text-right">
            Traditional Wear
          </div>

          {/* Half of Royal Center Mandala */}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-28 h-56 border-y-4 border-r-4 border-[#D4AF37] rounded-r-full bg-[#5C1D24] shadow-inner flex items-center justify-start pl-3 border-l-0">
            {/* Handle */}
            <div className="absolute left-2 w-3.5 h-20 bg-gradient-to-l from-[#D4AF37] to-[#C5A059] rounded-full border border-[#FAF6F0] shadow-md cursor-pointer hover:scale-105 transition-transform" />
            <div className="w-16 h-32 border-2 border-[#D4AF37]/60 rounded-r-full flex items-center justify-start pl-1.5">
              <div className="w-8 h-16 border border-[#D4AF37]/45 rounded-r-full" />
            </div>
          </div>

          <div className="font-cinzel text-2xl md:text-4xl text-[#D4AF37] font-bold tracking-widest text-right leading-snug drop-shadow-lg opacity-85">
            CHOUDHARY <br />
            <span className="text-xs md:text-sm tracking-[0.4em] text-[#FAF6F0]/70 font-sans">CLOTHES</span>
          </div>

          <div className="font-sans text-xs text-[#D4AF37]/40 tracking-wider text-right">
            Goregaon, Mumbai
          </div>
        </div>
      </div>

      {/* 3. Floating Celebration & Control Elements (Top Layer) */}
      <div className="absolute inset-0 z-20 pointer-events-none flex flex-col items-center justify-between p-6">
        
        {/* Top bar controls */}
        <div className="w-full flex justify-between items-center pointer-events-auto">
          {/* Mute/Unmute Toggle */}
          {(stage === 'opening' || stage === 'playing') && (
            <button
              onClick={() => setVideoMuted(!videoMuted)}
              className="p-3 bg-black/40 hover:bg-black/60 text-[#D4AF37] rounded-full border border-[#D4AF37]/40 backdrop-blur-md transition-all duration-300 cursor-pointer shadow-lg hover:scale-105 active:scale-95"
            >
              {videoMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
          )}
          <div className="flex-1" />
          {/* Skip Button */}
          {(stage === 'opening' || stage === 'playing') && (
            <button
              onClick={fadeAndComplete}
              className="px-5 py-2.5 bg-black/40 hover:bg-black/60 text-[#FAF6F0] font-sans text-xs tracking-widest uppercase border border-[#D4AF37]/50 rounded-full backdrop-blur-md transition-all duration-300 cursor-pointer flex items-center gap-1.5 hover:scale-105 active:scale-95 shadow-lg"
            >
              Skip Ceremony <ChevronRight size={14} />
            </button>
          )}
        </div>

        {/* Center UI (Landing closed screen) */}
        {stage === 'closed' && (
          <div className="flex flex-col items-center text-center max-w-md pointer-events-auto animate-fade-in bg-black/40 p-8 rounded-2xl border border-[#D4AF37]/20 backdrop-blur-xs shadow-2xl">
            <div className="w-16 h-16 rounded-full border border-[#D4AF37] flex items-center justify-center bg-[#4A141A]/90 shadow-xl mb-5 text-[#D4AF37] animate-pulse">
              <Sparkles size={28} className="text-[#D4AF37]" />
            </div>
            
            <h2 className="font-cinzel text-xl sm:text-2xl text-[#FAF6F0] mb-2 tracking-[0.2em] font-bold">
              WELCOME TO THE PALACE
            </h2>
            
            <p className="font-sans text-[#F7E7C4] mb-6 text-xs sm:text-sm tracking-wider uppercase opacity-85 leading-relaxed">
              Experience the royal heritage and cinematic splendor of Rajasthan
            </p>

            <button
              onClick={handleOpenGates}
              className="px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#C5A059] hover:from-[#C5A059] hover:to-[#B6914A] text-[#2A1115] font-semibold text-sm sm:text-base tracking-[0.2em] uppercase transition-all duration-300 shadow-2xl flex items-center gap-3 border border-[#F7E7C4] rounded-md font-sans hover:scale-103 active:scale-97 cursor-pointer"
            >
              Open Royal Gates
            </button>
          </div>
        )}

        {/* Celebratory Welcome Banner Overlay (Visible during video playback) */}
        {(stage === 'opening' || stage === 'playing') && (
          <div className="flex flex-col items-center pointer-events-none mt-12 animate-fade-in duration-1000">
            <div className="royal-banner bg-[#5C1D24]/85 border-y-2 border-[#D4AF37] px-8 py-4 backdrop-blur-xs text-center shadow-2xl rounded-sm">
              <div className="text-[10px] sm:text-xs tracking-[0.35em] text-[#D4AF37] uppercase font-cinzel font-semibold mb-1">
                Welcome to Choudhary Clothes
              </div>
              <h1 className="font-cinzel text-lg sm:text-2xl text-[#FAF6F0] tracking-[0.2em] font-bold drop-shadow-md">
                THE PRIDE OF RAJASTHAN
              </h1>
            </div>
          </div>
        )}

        {/* Diyas (Candles) flickering at the bottom of the screen during video */}
        {(stage === 'opening' || stage === 'playing') && (
          <div className="w-full flex justify-around items-end h-16 px-4">
            <div className="diya animate-pulse opacity-90"><div className="flame"></div></div>
            <div className="diya animate-pulse opacity-75 hidden md:block"><div className="flame"></div></div>
            <div className="diya animate-pulse opacity-90"><div className="flame"></div></div>
            <div className="diya animate-pulse opacity-75 hidden md:block"><div className="flame"></div></div>
            <div className="diya animate-pulse opacity-90"><div className="flame"></div></div>
          </div>
        )}
      </div>

      {/* 4. Flower Petals Shower Overlay */}
      {(stage === 'opening' || stage === 'playing') && (
        <div ref={petalsRef} className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
          {petals.map((petal) => (
            <div
              key={petal.id}
              className="absolute bg-gradient-to-br from-red-500/80 to-rose-600/75 rounded-full"
              style={{
                top: '-20px',
                left: `${petal.left}%`,
                width: `${petal.size}px`,
                height: `${petal.size * 0.8}px`,
                transform: `rotate(${petal.rotate}deg)`,
                animation: `fall ${petal.duration}s linear infinite`,
                animationDelay: `${petal.delay}s`,
                boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
              }}
            />
          ))}
        </div>
      )}

      {/* Injecting keyframe styles for custom animations */}
      <style>{`
        .gate-container {
          perspective: 1400px;
        }
        @keyframes fall {
          0% {
            top: -20px;
            transform: translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 0.9;
          }
          100% {
            top: 105vh;
            transform: translateX(100px) rotate(360deg);
            opacity: 0;
          }
        }
        .diya {
          width: 32px;
          height: 16px;
          background: #B45309;
          border-bottom-left-radius: 20px;
          border-bottom-right-radius: 20px;
          position: relative;
          box-shadow: 0 4px 10px rgba(251, 191, 36, 0.4);
        }
        .flame {
          width: 12px;
          height: 24px;
          background: linear-gradient(to top, #EF4444, #F59E0B, #FBBF24);
          border-radius: 50% 50% 20% 20%;
          position: absolute;
          bottom: 12px;
          left: 50%;
          transform: translateX(-50%);
          animation: flicker 0.15s ease-in-out infinite alternate;
          box-shadow: 0 0 15px #F59E0B;
        }
        @keyframes flicker {
          0% { transform: translateX(-50%) scale(0.9) rotate(-1deg); }
          100% { transform: translateX(-50%) scale(1.1) rotate(1deg); }
        }
        .royal-banner {
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          animation: banner-slide 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes banner-slide {
          from { transform: translateY(-80px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

