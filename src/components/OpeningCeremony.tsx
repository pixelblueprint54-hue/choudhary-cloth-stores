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

  // Automatically open the inner site after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      fadeAndComplete();
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, []);

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
          <div className="flex flex-col items-center text-center max-w-xs pointer-events-auto animate-fade-in bg-black/50 p-4 rounded-xl border border-[#D4AF37]/25 backdrop-blur-md shadow-2xl">
            <button
              onClick={handleOpenGates}
              className="px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#C5A059] hover:from-[#C5A059] hover:to-[#B6914A] text-[#2A1115] font-semibold text-sm sm:text-base tracking-[0.2em] uppercase transition-all duration-300 shadow-2xl flex items-center gap-3 border border-[#F7E7C4] rounded-md font-sans hover:scale-103 active:scale-97 cursor-pointer w-full text-center whitespace-nowrap"
            >
              Open Royal Gates
            </button>
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
      `}</style>
    </div>
  );
};

