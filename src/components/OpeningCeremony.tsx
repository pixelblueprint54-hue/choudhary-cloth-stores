import { useState, useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';
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

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center bg-[#150709] select-none"
    >
      {/* 1. Cinematic Background Video Layer (Autoplays muted on land, loops on closed stage) */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          src="/opening_gate.mp4"
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
          <div className="flex flex-col items-center text-center max-w-md pointer-events-auto animate-fade-in bg-black/50 p-8 rounded-2xl border border-[#D4AF37]/25 backdrop-blur-md shadow-2xl">
            <div className="w-16 h-16 rounded-full border border-[#D4AF37] flex items-center justify-center bg-[#4A141A]/95 shadow-xl mb-5 text-[#D4AF37] animate-pulse">
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
        {stage === 'playing' && (
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
      `}</style>
    </div>
  );
};

