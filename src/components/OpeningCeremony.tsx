import { useState, useEffect, useRef } from 'react';
import { Play, Volume2, VolumeX, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import * as Tone from 'tone';

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
  const [stage, setStage] = useState<'intro' | 'show' | 'opening' | 'done'>('intro');
  const [voiceGreeting, setVoiceGreeting] = useState<string>('');
  const leftCurtainRef = useRef<HTMLDivElement>(null);
  const rightCurtainRef = useRef<HTMLDivElement>(null);
  const puppetContainerRef = useRef<HTMLDivElement>(null);
  const synthRef = useRef<Tone.PolySynth | null>(null);
  const musicEnabledRef = useRef(musicEnabled);

  // Sync ref with prop updates
  useEffect(() => {
    musicEnabledRef.current = musicEnabled;
  }, [musicEnabled]);

  // Initialize synth for Rajasthani plucky sitar-like music
  const startFolkTune = async () => {
    try {
      await Tone.start();
      
      // Sitar-like synthesizer configuration
      const sitarSynth = new Tone.PolySynth(Tone.Synth, {
        oscillator: {
          type: 'sawtooth',
        },
        envelope: {
          attack: 0.02,
          decay: 0.3,
          sustain: 0.2,
          release: 1.2,
        },
        volume: -12,
      }).toDestination();

      // Add feedback delay for premium ambiance
      const delay = new Tone.FeedbackDelay("8n", 0.4).toDestination();
      sitarSynth.connect(delay);
      synthRef.current = sitarSynth;

      // Rajasthani Raag Desh / Bhairav inspired pentatonic melody
      const melody = [
        'D4', 'F#4', 'A4', 'B4', 'A4', 'F#4', 'D4', null,
        'D4', 'F#4', 'A4', 'B4', 'C#5', 'B4', 'A4', null,
        'D5', 'C#5', 'B4', 'A4', 'F#4', 'G4', 'F#4', 'D4',
        'A4', 'B4', 'A4', 'F#4', 'E4', 'D4', 'E4', 'D4'
      ];

      let noteIndex = 0;
      const loop = new Tone.Loop((time) => {
        const note = melody[noteIndex % melody.length];
        if (note && musicEnabledRef.current) {
          // Play note and double it with octave above for shimmering sitar effect
          sitarSynth.triggerAttackRelease(note, '8n', time);
          sitarSynth.triggerAttackRelease(Tone.Frequency(note).transpose(12) as any, '16n', time + 0.05, 0.5);
        }
        noteIndex++;
      }, '8n');

      loop.start(0);
      Tone.Transport.start();
      setMusicEnabled(true);
      musicEnabledRef.current = true;
    } catch (e) {
      console.error("Audio failed to start:", e);
    }
  };

  const handleStartShow = async () => {
    setStage('show');
    setMusicEnabled(true);
    musicEnabledRef.current = true;
    await startFolkTune();
    triggerVoiceGreeting();
  };

  const triggerVoiceGreeting = () => {
    try {
      const audio = new Audio('/padharo.mp3');
      audio.volume = 0.95;
      audio.play().catch(err => console.error("Human female greeting play failed:", err));
      
      setVoiceGreeting("Khamma Ghani sa! Welcome to Choudhary Cloth Stores.");
      setTimeout(() => setVoiceGreeting(''), 5000);
    } catch (e) {
      console.error("Failed to initialize human voice greeting:", e);
    }
  };

  const handleOpenCurtains = () => {
    setStage('opening');
    
    // Animate curtains opening using GSAP
    const tl = gsap.timeline({
      onComplete: () => {
        setStage('done');
        onComplete();
      }
    });

    // Pull curtains aside and slide up
    tl.to(leftCurtainRef.current, {
      xPercent: -100,
      skewY: -5,
      duration: 2.2,
      ease: 'power3.inOut',
    }, 0);

    tl.to(rightCurtainRef.current, {
      xPercent: 100,
      skewY: 5,
      duration: 2.2,
      ease: 'power3.inOut',
    }, 0);

    // Slide puppet upward
    tl.to(puppetContainerRef.current, {
      y: -500,
      opacity: 0,
      duration: 1.5,
      ease: 'power2.inOut',
    }, 0.2);
  };

  useEffect(() => {
    return () => {
      // Clean up synth when component unmounts
      if (synthRef.current) {
        synthRef.current.dispose();
      }
      Tone.Transport.stop();
      Tone.Transport.cancel();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center bg-[#2A1115]">
      {/* Background Palace Shadow arches */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15)_0%,transparent_80%)] pointer-events-none" />

      {/* Left Curtain */}
      <div
        ref={leftCurtainRef}
        className="absolute top-0 bottom-0 left-0 w-1/2 bg-gradient-to-r from-[#4A141A] via-[#5C1D24] to-[#6A232B] border-r-4 border-[#D4AF37] z-20 flex flex-col justify-between p-8 curtain-panel"
        style={{ transformOrigin: 'left center', boxShadow: '15px 0 30px rgba(0,0,0,0.5)' }}
      >
        {/* Royal embroidery border on curtain */}
        <div className="absolute top-0 bottom-0 right-4 w-12 border-r-2 border-dashed border-[#D4AF37]/50 opacity-40" />
        <div className="font-cinzel text-xs text-[#D4AF37]/60 tracking-[0.2em] uppercase select-none">Established Since 1994</div>
        <div className="flex-1 hidden md:flex items-center justify-center px-4">
          <div className="font-rozha text-4xl md:text-5xl lg:text-6xl text-[#D4AF37] select-none text-center tracking-wide leading-snug drop-shadow-md">
            चौधरी <br />
            क्लॉथ स्टोर्स
          </div>
        </div>
        <div className="font-sans text-xs text-[#D4AF37]/50 select-none">Goregaon, Mumbai</div>
      </div>

      {/* Right Curtain */}
      <div
        ref={rightCurtainRef}
        className="absolute top-0 bottom-0 right-0 w-1/2 bg-gradient-to-l from-[#4A141A] via-[#5C1D24] to-[#6A232B] border-l-4 border-[#D4AF37] z-20 flex flex-col justify-between p-8 curtain-panel"
        style={{ transformOrigin: 'right center', boxShadow: '-15px 0 30px rgba(0,0,0,0.5)' }}
      >
        <div className="absolute top-0 bottom-0 left-4 w-12 border-l-2 border-dashed border-[#D4AF37]/50 opacity-40" />
        <div className="font-cinzel text-xs text-[#D4AF37]/60 tracking-[0.2em] uppercase select-none text-right">1 Lakh+ Happy Customers</div>
        <div className="flex-1 hidden md:flex items-center justify-center px-4">
          <div className="font-cinzel text-2xl md:text-3xl lg:text-4xl text-[#D4AF37] select-none font-bold tracking-widest drop-shadow-md text-center leading-snug">
            CHOUDHARY <br />
            <span className="text-sm md:text-base lg:text-lg tracking-[0.3em] text-[#FAF6F0]/80">CLOTH STORES</span>
          </div>
        </div>
        <div className="font-sans text-xs text-[#D4AF37]/50 text-right select-none">Traditional Rajasthani Royal Wear</div>
      </div>

      {/* Center Stage Content */}
      <div className="relative z-30 flex flex-col items-center text-center px-4 max-w-lg">
        {stage === 'intro' && (
          <div className="animate-fade-in flex flex-col items-center">
            <div className="w-20 h-20 rounded-full border-2 border-[#D4AF37] flex items-center justify-center bg-[#4A141A] shadow-lg mb-6 text-[#D4AF37] animate-pulse">
              <Sparkles size={36} className="text-[#D4AF37]" />
            </div>
            <div className="block md:hidden font-cinzel text-sm text-[#D4AF37] tracking-[0.25em] uppercase mb-2 font-semibold">
              CHOUDHARY CLOTH STORES
            </div>
            <h1 className="font-cinzel text-2xl sm:text-3xl md:text-4xl text-[#FAF6F0] mb-3 tracking-widest font-bold">
              WELCOME TO THE PALACE
            </h1>
            <p className="font-sans text-[#F7E7C4] mb-8 text-sm tracking-wider uppercase opacity-80 max-w-sm">
              Enter our digital expo pavilion for a cinematic Rajasthani boutique experience
            </p>
            <button
              onClick={handleStartShow}
              className="px-8 py-4 bg-[#D4AF37] hover:bg-[#C5A059] text-[#2A1115] font-semibold text-lg tracking-widest uppercase transition-all duration-300 shadow-xl flex items-center gap-3 border border-[#F7E7C4] rounded-md font-sans hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Play size={20} fill="currentColor" />
              Begin Kathputli Show
            </button>
          </div>
        )}

        {stage === 'show' && (
          <div className="flex flex-col items-center">
            {/* Voice Greeting Subtitle */}
            {voiceGreeting && (
              <div className="absolute top-[-100px] left-1/2 transform -translate-x-1/2 w-80 py-3 px-6 bg-[#D4AF37]/90 text-[#2A1115] rounded-full shadow-2xl font-semibold border-2 border-[#FAF6F0] animate-bounce text-sm">
                "{voiceGreeting}"
              </div>
            )}

            {/* Kathputli Puppet Container */}
            <div ref={puppetContainerRef} className="flex flex-col items-center relative mb-8">
              {/* String Anchor line */}
              <div className="w-40 h-1 bg-[#D4AF37]/30 rounded-full relative mb-12 flex justify-between px-4">
                <div className="w-0.5 h-20 bg-[#D4AF37]/40 relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 after:w-2 after:h-2 after:bg-[#D4AF37] after:rounded-full" />
                <div className="w-0.5 h-24 bg-[#D4AF37]/40 relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 after:w-2 after:h-2 after:bg-[#D4AF37] after:rounded-full" />
                <div className="w-0.5 h-20 bg-[#D4AF37]/40 relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 after:w-2 after:h-2 after:bg-[#D4AF37] after:rounded-full" />
              </div>

              {/* Decorative Puppet Graphic */}
              <div className="string-puppet w-28 h-48 bg-[#D4AF37] rounded-3xl border-2 border-[#F7E7C4] p-3 flex flex-col items-center justify-between shadow-2xl relative">
                {/* Traditional Turban */}
                <div className="absolute top-[-25px] w-20 h-10 bg-gradient-to-r from-[#D4AF37] via-[#5C1D24] to-[#D4AF37] rounded-full border border-[#FAF6F0] shadow-md flex items-center justify-center">
                  <div className="w-3 h-6 bg-red-600 rounded-full border border-yellow-300 absolute top-[-5px] right-4 animate-pulse" /> {/* Feather */}
                </div>
                
                {/* Face */}
                <div className="w-14 h-14 rounded-full bg-[#FAF6F0] border-2 border-[#D4AF37] flex flex-col items-center justify-center p-1 mt-3">
                  {/* Traditional Mustache & Eyes */}
                  <div className="flex gap-2 mb-1">
                    <span className="text-black text-xs font-bold select-none">•</span>
                    <span className="text-black text-xs font-bold select-none">•</span>
                  </div>
                  {/* Big Rajasthani Mustache */}
                  <div className="w-8 h-2 bg-black rounded-full relative">
                    <div className="absolute left-[-2px] bottom-1 w-3 h-3 border-l-2 border-b-2 border-black rounded-bl-full rotate-45" />
                    <div className="absolute right-[-2px] bottom-1 w-3 h-3 border-r-2 border-b-2 border-black rounded-br-full -rotate-45" />
                  </div>
                </div>

                {/* Royal Kurta */}
                <div className="flex-1 w-full bg-[#5C1D24] rounded-xl border border-[#D4AF37] mt-2 flex flex-col items-center justify-center">
                  <div className="w-1 h-12 bg-[#D4AF37] my-1" />
                  <div className="text-[10px] text-[#D4AF37] font-cinzel font-bold">CCS</div>
                </div>

                {/* Golden Details */}
                <div className="absolute bottom-1 w-12 h-1.5 bg-[#D4AF37] rounded-full" />
              </div>
            </div>

            <p className="font-cinzel text-xl text-[#F7E7C4] mb-8 font-semibold tracking-widest uppercase">
              The Puppets Welcome You
            </p>

            <div className="flex gap-4">
              <button
                onClick={handleOpenCurtains}
                className="px-8 py-3 bg-[#5C1D24] hover:bg-[#4A141A] text-[#FAF6F0] font-semibold text-base tracking-widest uppercase border-2 border-[#D4AF37] rounded-md transition-all duration-300 shadow-xl cursor-pointer"
              >
                Enter Palace Boutique
              </button>
              <button
                onClick={() => setMusicEnabled(!musicEnabled)}
                className="p-3 bg-[#FAF6F0]/10 hover:bg-[#FAF6F0]/20 text-[#D4AF37] rounded-full border border-[#D4AF37]/50 transition-all duration-300 cursor-pointer"
              >
                {musicEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
