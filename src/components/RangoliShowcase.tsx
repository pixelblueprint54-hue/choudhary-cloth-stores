import React, { useEffect, useRef } from 'react';

// Authentic colors from the user's photo
const COLORS = {
  magenta: "#D81B60",
  lightPink: "#F48FB1",
  darkPink: "#AD1457",
  yellow: "#FFD700",
  darkYellow: "#F5B041",
  green: "#0B6623",
  lightGreen: "#27AE60",
  orange: "#FF5722",
  darkOrange: "#D84315",
  white: "#FAF6F0",
  backgroundBlue: "#0B2447" // Beautiful deep blue floor background from the photo
};

interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  speedX: number;
  speedY: number;
  alpha: number;
  decay: number;
}

export const RangoliShowcase: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rotationRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    // Draw the white feather/leaf motif in the background
    const drawWhiteLeaf = (c: CanvasRenderingContext2D, rStart: number, rEnd: number, angle: number) => {
      c.save();
      c.rotate(angle);
      
      // Draw outer leaf/feather shape
      c.beginPath();
      c.moveTo(0, -rStart);
      // Left curve
      c.bezierCurveTo(-38, -rStart - 10, -32, -rEnd + 15, 0, -rEnd);
      // Right curve
      c.bezierCurveTo(32, -rEnd + 15, 38, -rStart - 10, 0, -rStart);
      c.fillStyle = COLORS.white;
      c.fill();
      
      // Draw delicate leaf ridges/lines (veins)
      c.strokeStyle = "rgba(180, 180, 180, 0.25)";
      c.lineWidth = 1;
      
      // Central vein
      c.beginPath();
      c.moveTo(0, -rStart);
      c.lineTo(0, -rEnd);
      c.stroke();
      
      // Side veins (diagonal curves)
      for (let offset = 12; offset < (rEnd - rStart); offset += 14) {
        const y = -rStart - offset;
        c.beginPath();
        // Left vein
        c.moveTo(0, y);
        c.quadraticCurveTo(-15, y - 5, -22, y - 10);
        // Right vein
        c.moveTo(0, y);
        c.quadraticCurveTo(15, y - 5, 22, y - 10);
        c.stroke();
      }
      
      c.restore();
    };

    // Draw a single pink flower petal with authentic sand ridges/lines
    const drawPinkPetal = (c: CanvasRenderingContext2D, rStart: number, rEnd: number, angle: number) => {
      c.save();
      c.rotate(angle);

      // Main petal path (rounded drop-like shape)
      c.beginPath();
      c.moveTo(0, -rStart);
      // Curve left
      c.bezierCurveTo(-36, -rStart - 5, -34, -rEnd + 10, 0, -rEnd);
      // Curve right
      c.bezierCurveTo(34, -rEnd + 10, 36, -rStart - 5, 0, -rStart);
      
      // Base magenta fill
      c.fillStyle = COLORS.magenta;
      c.fill();

      // Shadow overlay on left/right edges for 3D sand look
      c.strokeStyle = COLORS.darkPink;
      c.lineWidth = 2;
      c.stroke();

      // Draw the vertical sand-like ridges/lines along the petal
      c.strokeStyle = COLORS.lightPink;
      c.lineWidth = 1;
      c.globalAlpha = 0.55;
      
      const petalWidthFactor = 28;
      // Draw 7 radial texture lines
      for (let i = -3; i <= 3; i++) {
        const spreadFactor = i * (petalWidthFactor / 3);
        c.beginPath();
        c.moveTo(spreadFactor * 0.35, -rStart - 2);
        c.quadraticCurveTo(
          spreadFactor * 0.75, -rStart - (rEnd - rStart) * 0.5,
          spreadFactor * 0.9, -rEnd + 10
        );
        c.stroke();
      }

      c.restore();
    };

    // Draw an outer circular motif: yellow ring, green ring, orange dome
    const drawCircularMotif = (c: CanvasRenderingContext2D, mx: number, my: number) => {
      c.save();
      c.translate(mx, my);

      // 1. Outer Yellow Donut Ring
      c.beginPath();
      c.arc(0, 0, 19, 0, Math.PI * 2);
      c.fillStyle = COLORS.yellow;
      c.fill();
      c.strokeStyle = COLORS.darkYellow;
      c.lineWidth = 1.5;
      c.stroke();

      // 2. Inner Green Ring
      c.beginPath();
      c.arc(0, 0, 12, 0, Math.PI * 2);
      c.fillStyle = COLORS.green;
      c.fill();
      c.strokeStyle = COLORS.lightGreen;
      c.lineWidth = 1;
      c.stroke();

      // 3. Center Orange Dome (with 3D radial gradient shading)
      const grad = c.createRadialGradient(-2, -2, 1, 0, 0, 6);
      grad.addColorStop(0, "#FFA726");
      grad.addColorStop(0.3, COLORS.orange);
      grad.addColorStop(1, COLORS.darkOrange);

      c.beginPath();
      c.arc(0, 0, 6, 0, Math.PI * 2);
      c.fillStyle = grad;
      c.fill();

      c.restore();
    };

    const render = () => {
      // Clear with deep blue floor color
      ctx.fillStyle = COLORS.backgroundBlue;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Update rotation slowly for a dynamic cinematic boutique feel
      rotationRef.current += (0.05 * Math.PI / 180);

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rotationRef.current);

      const symmetry = 12; // 12-fold symmetry matches the photo petals and circles

      // 1. DRAW WHITE LEAVES IN THE BACKGROUND
      for (let i = 0; i < symmetry; i++) {
        const angle = (Math.PI * 2 / symmetry) * i + (Math.PI / symmetry);
        drawWhiteLeaf(ctx, 110, 192, angle);
      }

      // 2. DRAW OUTER CIRCULAR MOTIFS
      const outerRadius = 152;
      for (let i = 0; i < symmetry; i++) {
        const angle = (Math.PI * 2 / symmetry) * i;
        const mx = Math.cos(angle) * outerRadius;
        const my = Math.sin(angle) * outerRadius;
        drawCircularMotif(ctx, mx, my);
      }

      // 3. DRAW LARGE PINK FLOWER PETALS
      for (let i = 0; i < symmetry; i++) {
        const angle = (Math.PI * 2 / symmetry) * i;
        drawPinkPetal(ctx, 32, 118, angle);
      }

      // 4. DRAW CENTRAL CONCENTRIC MEDALLION
      // Yellow outer center ring
      ctx.beginPath();
      ctx.arc(0, 0, 32, 0, Math.PI * 2);
      ctx.fillStyle = COLORS.yellow;
      ctx.fill();
      ctx.strokeStyle = COLORS.darkYellow;
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Green inner center ring
      ctx.beginPath();
      ctx.arc(0, 0, 22, 0, Math.PI * 2);
      ctx.fillStyle = COLORS.green;
      ctx.fill();
      ctx.strokeStyle = COLORS.lightGreen;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Central Orange Dome with 3D gradient matching the outer motifs
      const centerGrad = ctx.createRadialGradient(-3, -3, 2, 0, 0, 13);
      centerGrad.addColorStop(0, "#FF8A65");
      centerGrad.addColorStop(0.3, COLORS.orange);
      centerGrad.addColorStop(1, COLORS.darkOrange);

      ctx.beginPath();
      ctx.arc(0, 0, 13, 0, Math.PI * 2);
      ctx.fillStyle = centerGrad;
      ctx.fill();

      ctx.restore(); // End rotation matrix

      // 5. SPARKLE PARTICLES (Golden diya embers)
      if (Math.random() < 0.22 && particlesRef.current.length < 40) {
        const spawnAngle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 0.4 + 0.2;
        particlesRef.current.push({
          x: cx + Math.cos(spawnAngle) * 30,
          y: cy + Math.sin(spawnAngle) * 30,
          radius: Math.random() * 1.5 + 0.8,
          color: Math.random() > 0.5 ? COLORS.yellow : COLORS.lightPink,
          speedX: Math.cos(spawnAngle) * speed + (Math.random() - 0.5) * 0.1,
          speedY: Math.sin(spawnAngle) * speed - (Math.random() * 0.2 + 0.1),
          alpha: 1.0,
          decay: Math.random() * 0.01 + 0.005
        });
      }

      // Draw and update sparkles
      particlesRef.current.forEach((p, idx) => {
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Sway or spiral orbit motion
        const dx = p.x - cx;
        const dy = p.y - cy;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist > 30) {
          const orbitForce = 0.012;
          p.speedX += (-dy / dist) * orbitForce;
          p.speedY += (dx / dist) * orbitForce;
        }

        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particlesRef.current.splice(idx, 1);
          return;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 4;
        ctx.shadowColor = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Adjust canvas size dynamically for responsiveness
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const width = Math.min(canvas.parentElement?.clientWidth || 420, 420);
      canvas.width = width;
      canvas.height = width;
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center justify-center py-6 select-none">
      {/* Left Column: Cinematic Palace Image */}
      <div className="hidden lg:block lg:col-span-3 h-[380px] rounded-2xl border border-[#D4AF37]/35 overflow-hidden shadow-2xl relative bg-black">
        <img
          src="/cinematic_palace_poster.png"
          alt="Cinematic Palace Left"
          className="w-full h-full object-cover opacity-80 select-none"
        />
        {/* Decorative inner gold border frame */}
        <div className="absolute inset-2 border border-[#D4AF37]/25 rounded-lg pointer-events-none" />
      </div>

      {/* Center Column: The slowly spinning custom traditional Rangoli */}
      <div className="col-span-1 lg:col-span-6 flex flex-col items-center justify-center">
        <div className="p-3 bg-[#0B2447] rounded-full border-4 border-double border-[#D4AF37] shadow-2xl relative max-w-[420px] w-full mx-auto">
          <canvas 
            ref={canvasRef} 
            className="rounded-full shadow-inner w-full"
          />
          {/* Inner gold circular boundary rim */}
          <div className="absolute inset-5 border-2 border-[#D4AF37]/35 rounded-full pointer-events-none" />
        </div>
      </div>

      {/* Right Column: Cinematic Palace Image */}
      <div className="hidden lg:block lg:col-span-3 h-[380px] rounded-2xl border border-[#D4AF37]/35 overflow-hidden shadow-2xl relative bg-black">
        <img
          src="/cinematic_palace_poster.png"
          alt="Cinematic Palace Right"
          className="w-full h-full object-cover opacity-80 select-none"
        />
        {/* Decorative inner gold border frame */}
        <div className="absolute inset-2 border border-[#D4AF37]/25 rounded-lg pointer-events-none" />
      </div>
    </div>
  );
};
