import { useState, useEffect, useRef } from 'react';
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
  const [stage, setStage] = useState<'closed' | 'playing' | 'done'>('closed');
  const [videoMuted, setVideoMuted] = useState<boolean>(!musicEnabled);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync video mute status with state
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = videoMuted;
    }
    setMusicEnabled(!videoMuted);
  }, [videoMuted, setMusicEnabled]);

  // Force video autoplay on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(err => {
        console.log("Auto-play on load blocked, retrying with delay...", err);
        setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play().catch(e => console.log("Final autoplay attempt failed:", e));
          }
        }, 300);
      });
    }
  }, []);

  const handleOpenGates = () => {
    setStage('playing');
    setVideoMuted(false); // Unmute for full cinematic effect on user click

    // Attempt to start voice greeting if any
    try {
      const audio = new Audio('/padharo.mp3');
      audio.volume = 0.9;
      audio.play().catch(err => console.log("Audio greeting skipped:", err));
    } catch (e) {
      console.log(e);
    }

    // Play video from the beginning with sound
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.loop = false;
      videoRef.current.muted = false;
      videoRef.current.play().catch(err => console.log("Video playback error:", err));
    }
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

  // Automatically open the inner site after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      fadeAndComplete();
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center bg-[#150709] select-none"
      style={{
        backgroundImage: "url('/cinematic_palace_poster.png')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      {/* 1. Cinematic Background Video Layer (Autoplays muted on land, loops on closed stage) */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          src="/opening_gate.mp4"
          poster="/cinematic_palace_poster.png"
          className="w-full h-full object-cover"
          playsInline
          autoPlay
          muted={videoMuted}
          loop={stage === 'closed'}
          onEnded={handleVideoEnded}
          style={{ filter: 'brightness(0.75) contrast(1.05)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/45 pointer-events-none" />
      </div>

      {/* 2. Floating Celebration & Control Elements (Top Layer) */}
      <div className="absolute inset-0 z-20 pointer-events-none flex flex-col items-center justify-center p-6">

        {/* Center UI (Landing closed screen) */}
        {stage === 'closed' && (
          <div className="flex flex-col items-center justify-center space-y-8 pointer-events-auto select-none max-w-lg px-6">
            {/* Elegant Royal Header */}
            <div className="text-center space-y-2 animate-fade-in">
              <h2 className="font-cinzel text-xl sm:text-2xl text-[#FAF6F0] tracking-[0.35em] uppercase font-bold drop-shadow-[0_2px_10px_rgba(212,175,55,0.3)]">
                Choudhary Cloth Stores
              </h2>
              <p className="font-sans text-[10px] tracking-[0.4em] text-[#D4AF37] uppercase font-bold">
                Heritage of Rajasthan • Estd 1994
              </p>
            </div>

            {/* Glowing Medallion Button Container */}
            <div className="relative flex items-center justify-center">
              {/* Flanking Diya Left */}
              <div className="absolute -left-20 hidden sm:flex flex-col items-center">
                <div className="w-8 h-4 bg-[#D4AF37]/80 rounded-b-full relative border-t-2 border-[#FAF6F0]/50 shadow-lg">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-3.5 h-6 bg-amber-400 rounded-full animate-pulse blur-[1px] shadow-[0_0_15px_#F5B041]" />
                </div>
              </div>

              {/* Main Medallion Button */}
              <button
                onClick={handleOpenGates}
                className="px-10 py-5 bg-gradient-to-b from-[#5C1D24] to-[#3A0C11] text-[#D4AF37] hover:text-[#FAF6F0] font-cinzel text-sm sm:text-base tracking-[0.25em] uppercase font-bold transition-all duration-500 rounded-full cursor-pointer hover:scale-105 active:scale-98 shadow-[0_0_25px_rgba(212,175,55,0.25)] border-2 border-[#D4AF37] hover:border-[#FAF6F0] relative overflow-hidden group select-none"
                style={{
                  animation: 'gold-pulse 2s infinite'
                }}
              >
                {/* Shiny glint effect */}
                <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-150%] group-hover:translate-x-[250%] transition-transform duration-1000 ease-out" />
                
                Open Royal Gates
              </button>

              {/* Flanking Diya Right */}
              <div className="absolute -right-20 hidden sm:flex flex-col items-center">
                <div className="w-8 h-4 bg-[#D4AF37]/80 rounded-b-full relative border-t-2 border-[#FAF6F0]/50 shadow-lg">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-3.5 h-6 bg-amber-400 rounded-full animate-pulse blur-[1px] shadow-[0_0_15px_#F5B041]" />
                </div>
              </div>
            </div>
            
            <p className="font-sans text-[9px] tracking-[0.25em] text-[#FAF6F0]/50 uppercase text-center pt-2">
              Click to enter the digital palace showcase
            </p>
          </div>
        )}

        {/* Simple Welcome Text Overlay (Visible during video playback) */}
        {stage === 'playing' && (
          <div className="text-center pointer-events-none animate-fade-in duration-1000 select-none">
            <h1 className="font-cinzel text-3xl sm:text-5xl text-[#FAF6F0] tracking-[0.2em] font-bold drop-shadow-lg uppercase leading-normal">
              Welcome to <br className="sm:hidden" /> Choudhary Clothes
            </h1>
          </div>
        )}
      </div>

      {/* Injecting keyframe styles for custom animations */}
      <style>{`
        .royal-banner {
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          animation: banner-slide 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes banner-slide {
          from { transform: translateY(-80px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes gold-pulse {
          0% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.45); }
          70% { box-shadow: 0 0 0 20px rgba(212, 175, 55, 0); }
          100% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0); }
        }
      `}</style>
    </div>
  );
};

