import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Sparkles, Shirt, ShieldCheck } from 'lucide-react';

interface OutfitConfig {
  id: string;
  name: string;
  bodyColor: string;
  turbanColor: string;
  neckColor: string;
  description: string;
  imageUrl: string;
  price: number;
}

const OUTFITS: OutfitConfig[] = [
  {
    id: "prod-1",
    name: "SRK Signature Obsidian Sherwani",
    bodyColor: "#111111",
    turbanColor: "#D4AF37",
    neckColor: "#FAF6F0",
    description: "Premium wedding sherwani in obsidian black, hand-embroidered with luxurious gold zari details. Inspired by Shah Rukh Khan.",
    imageUrl: "/sherwani_black_srk.png",
    price: 28999
  },
  {
    id: "prod-2",
    name: "Jodhpuri Royal Bandhgala",
    bodyColor: "#1A2C4C",
    turbanColor: "#E25822",
    neckColor: "#D4AF37",
    description: "Structured midnight blue wool-blend Bandhgala suit with authentic polished brass buttons.",
    imageUrl: "/jodhpuri_suit.png",
    price: 18500
  },
  {
    id: "prod-3",
    name: "Jaipur Gold Silk Kurta",
    bodyColor: "#D4AF37",
    turbanColor: "#5C1D24",
    neckColor: "#FAF6F0",
    description: "Breathable raw silk gold kurta pajama combo featuring traditional Bandhani prints around the mandarin collar.",
    imageUrl: "/jaipur_gold_kurta.png",
    price: 3200
  },
  {
    id: "prod-9",
    name: "Maharaja Velvet Emerald Sherwani",
    bodyColor: "#1E4A38",
    turbanColor: "#D4AF37",
    neckColor: "#FAF6F0",
    description: "Imperial emerald-green velvet sherwani, featuring handcrafted silver and gold zardozi border work.",
    imageUrl: "/sherwani_blue_actor.png",
    price: 32000
  }
];

// Helper to create dynamic canvas texture for the outfits to look like real clothes
const createTorsoTexture = (index: number) => {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const outfit = OUTFITS[index];
  
  // Base fabric fill
  ctx.fillStyle = outfit.bodyColor;
  ctx.fillRect(0, 0, 512, 512);

  // Subtle vertical fabric thread texture
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 512; i += 6) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 512);
    ctx.stroke();
  }

  const cx = 256; // Center front of cylinder

  if (index === 0) {
    // ROYAL RED SHERWANI
    // Gold zari central button strip
    ctx.fillStyle = '#D4AF37';
    ctx.fillRect(cx - 16, 0, 32, 512);

    // Zari border detail lines
    ctx.strokeStyle = '#111111';
    ctx.lineWidth = 2;
    ctx.strokeRect(cx - 16, 0, 32, 512);

    // 8 Pearl buttons with gold rims
    ctx.fillStyle = '#FAF6F0';
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 2;
    for (let i = 60; i < 480; i += 55) {
      ctx.beginPath();
      ctx.arc(cx, i, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }

    // Heavy gold chest embroidery scrolls
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 3.5;
    ctx.lineCap = 'round';

    // Left scrolls
    ctx.beginPath();
    ctx.arc(cx - 55, 100, 20, 0, Math.PI * 1.5);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx - 75, 160, 25, 0, Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx - 16, 120);
    ctx.quadraticCurveTo(cx - 50, 140, cx - 35, 180);
    ctx.stroke();

    // Right scrolls
    ctx.beginPath();
    ctx.arc(cx + 55, 100, 20, Math.PI, Math.PI * 2.5);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx + 75, 160, 25, 0, Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx + 16, 120);
    ctx.quadraticCurveTo(cx + 50, 140, cx + 35, 180);
    ctx.stroke();

    // Bottom gold border
    ctx.fillStyle = '#D4AF37';
    ctx.fillRect(0, 480, 512, 32);

  } else if (index === 1) {
    // JODHPURI BANDHGALA
    // Darker lapel lines
    ctx.strokeStyle = 'rgba(0,0,0,0.3)';
    ctx.lineWidth = 3;
    
    // Left lapel opening line
    ctx.beginPath();
    ctx.moveTo(cx - 40, 0);
    ctx.lineTo(cx, 80);
    ctx.stroke();

    // Right lapel opening line
    ctx.beginPath();
    ctx.moveTo(cx + 40, 0);
    ctx.lineTo(cx, 80);
    ctx.stroke();

    // 6 metallic/brass buttons down center
    ctx.fillStyle = '#D4AF37';
    ctx.strokeStyle = '#FAF6F0';
    ctx.lineWidth = 1;
    for (let i = 110; i < 440; i += 60) {
      ctx.beginPath();
      ctx.arc(cx, i, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }

    // Breast pocket welt on left chest
    ctx.fillStyle = '#102035';
    ctx.fillRect(cx - 100, 130, 65, 16);
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(cx - 100, 130, 65, 16);

    // Pocket square peek (red/gold)
    ctx.fillStyle = '#5C1D24';
    ctx.beginPath();
    ctx.moveTo(cx - 85, 130);
    ctx.lineTo(cx - 75, 115);
    ctx.lineTo(cx - 65, 130);
    ctx.fill();

  } else if (index === 2) {
    // HERITAGE GOLD KURTA
    // Traditional Bandhani red/orange tie-dye dots pattern
    ctx.fillStyle = '#5C1D24'; // maroon dots
    for (let x = 20; x < 500; x += 50) {
      for (let y = 30; y < 500; y += 70) {
        const offset = (x + y) % 3 === 0 ? 0 : 12;
        ctx.fillRect(x + offset, y, 3, 3);
        ctx.fillRect(x + 6 + offset, y - 3, 3, 3);
        ctx.fillRect(x + 6 + offset, y + 3, 3, 3);
      }
    }

    // Maroon velvet placket
    ctx.fillStyle = '#5C1D24';
    ctx.fillRect(cx - 12, 0, 24, 380);

    // Gold stitch border on placket
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(cx - 12, 0, 24, 380);

    // 5 round gold buttons
    ctx.fillStyle = '#D4AF37';
    for (let i = 40; i < 340; i += 70) {
      ctx.beginPath();
      ctx.arc(cx, i, 5, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (index === 3) {
    // MAHARAJA VELVET EMERALD SHERWANI
    // Gold zari central button strip
    ctx.fillStyle = '#D4AF37';
    ctx.fillRect(cx - 16, 0, 32, 512);

    // Zari border detail lines
    ctx.strokeStyle = '#FAF6F0'; // silver/white stitches
    ctx.lineWidth = 1.5;
    ctx.strokeRect(cx - 16, 0, 32, 512);

    // 8 round silver/pearl buttons
    ctx.fillStyle = '#FAF6F0';
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 1.5;
    for (let i = 60; i < 480; i += 55) {
      ctx.beginPath();
      ctx.arc(cx, i, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }

    // Silver chest embroidery scrolls
    ctx.strokeStyle = '#FAF6F0';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';

    // Left scrolls
    ctx.beginPath();
    ctx.arc(cx - 50, 110, 18, 0, Math.PI * 1.4);
    ctx.stroke();

    // Right scrolls
    ctx.beginPath();
    ctx.arc(cx + 50, 110, 18, Math.PI * 1.6, Math.PI * 3);
    ctx.stroke();

    // Bottom gold border
    ctx.fillStyle = '#D4AF37';
    ctx.fillRect(0, 480, 512, 32);
  }

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
};



const createSkirtTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  // Crimson base
  ctx.fillStyle = '#8C1B2F';
  ctx.fillRect(0, 0, 512, 512);

  // Gold zari border at the bottom
  ctx.fillStyle = '#D4AF37';
  ctx.fillRect(0, 440, 512, 72);

  // Fine vertical folds shadows
  ctx.strokeStyle = 'rgba(0,0,0,0.18)';
  ctx.lineWidth = 4;
  for (let i = 20; i < 512; i += 40) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 440);
    ctx.stroke();
  }

  // Small gold flower buttis across the skirt
  ctx.fillStyle = '#D4AF37';
  for (let x = 30; x < 500; x += 80) {
    for (let y = 40; y < 420; y += 80) {
      const offset = (x + y) % 3 === 0 ? 0 : 20;
      ctx.beginPath();
      ctx.arc(x + offset, y, 4, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  return new THREE.CanvasTexture(canvas);
};

export const MannequinShowroom: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedOutfit, setSelectedOutfit] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  
  // Refs for updating Three.js elements dynamically
  const torsoMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const collarMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const leftSleeveMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const rightSleeveMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const sareeSkirtRef = useRef<THREE.Mesh | null>(null);
  const sareeSkirtMatRef = useRef<THREE.MeshStandardMaterial | null>(null);

  // Mouse interaction variables
  const isDragging = useRef<boolean>(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!mountRef.current) return;

    // Dimensions
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight || 450;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#FAF6F0'); // Match website background

    // Fog for depth
    scene.fog = new THREE.FogExp2('#FAF6F0', 0.12);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.8, 4.5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);

    // Parent group to rotate model
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);
    groupRef.current = modelGroup;

    // Pedestal
    const pedestalGeo = new THREE.CylinderGeometry(0.8, 0.9, 0.2, 32);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: '#F3ECE0',
      roughness: 0.2,
      metalness: 0.8,
    });
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestal.position.y = 0.1;
    pedestal.receiveShadow = true;
    modelGroup.add(pedestal);

    // Glow Ring on Pedestal border
    const ringGeo = new THREE.RingGeometry(0.78, 0.82, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color: '#D4AF37',
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.21;
    modelGroup.add(ring);

    // Stand rod
    const standGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.6, 16);
    const standMat = new THREE.MeshStandardMaterial({ color: '#2A211D', metalness: 0.9, roughness: 0.1 });
    const stand = new THREE.Mesh(standGeo, standMat);
    stand.position.y = 0.9;
    modelGroup.add(stand);

    // Mannequin Torso (Base Cylinder)
    const torsoGeo = new THREE.CylinderGeometry(0.3, 0.2, 0.8, 24);
    const torsoMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#ffffff'), // White base for canvas textures
      roughness: 0.45,
      metalness: 0.08,
    });
    torsoMatRef.current = torsoMat;

    const torso = new THREE.Mesh(torsoGeo, torsoMat);
    torso.position.y = 1.4;
    torso.rotation.y = Math.PI; // Center front of texture wrapping faces camera
    torso.castShadow = true;
    modelGroup.add(torso);

    // Standing collar
    const collarGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.07, 16);
    const collarMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(OUTFITS[selectedOutfit].bodyColor),
      roughness: 0.5,
    });
    const collar = new THREE.Mesh(collarGeo, collarMat);
    collar.position.y = 1.81;
    modelGroup.add(collar);
    collarMatRef.current = collarMat;

    // Shoulder caps
    const shoulderGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.08, 16);
    const shoulderMat = new THREE.MeshStandardMaterial({ color: '#D4AF37', metalness: 0.7, roughness: 0.2 });
    const shoulder = new THREE.Mesh(shoulderGeo, shoulderMat);
    shoulder.position.y = 1.78;
    modelGroup.add(shoulder);

    // Left Sleeve
    const leftSleeveGeo = new THREE.CylinderGeometry(0.08, 0.06, 0.52, 16);
    const leftSleeveMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(OUTFITS[selectedOutfit].bodyColor),
      roughness: 0.5,
    });
    const leftSleeve = new THREE.Mesh(leftSleeveGeo, leftSleeveMat);
    leftSleeve.position.set(-0.35, 1.42, 0);
    leftSleeve.rotation.z = 0.18;
    modelGroup.add(leftSleeve);
    leftSleeveMatRef.current = leftSleeveMat;

    // Right Sleeve
    const rightSleeveGeo = new THREE.CylinderGeometry(0.08, 0.06, 0.52, 16);
    const rightSleeveMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(OUTFITS[selectedOutfit].bodyColor),
      roughness: 0.5,
    });
    const rightSleeve = new THREE.Mesh(rightSleeveGeo, rightSleeveMat);
    rightSleeve.position.set(0.35, 1.42, 0);
    rightSleeve.rotation.z = -0.18;
    modelGroup.add(rightSleeve);
    rightSleeveMatRef.current = rightSleeveMat;

    // Saree Skirt (only visible for Saree outfit, index 3)
    const skirtGeo = new THREE.CylinderGeometry(0.21, 0.42, 0.85, 24);
    const skirtMat = new THREE.MeshStandardMaterial({
      color: '#8C1B2F',
      roughness: 0.5,
    });
    const skirt = new THREE.Mesh(skirtGeo, skirtMat);
    skirt.position.y = 0.725;
    skirt.castShadow = true;
    skirt.receiveShadow = true;
    skirt.visible = false;
    modelGroup.add(skirt);
    sareeSkirtRef.current = skirt;
    sareeSkirtMatRef.current = skirtMat;

    // Lights
    const ambientLight = new THREE.AmbientLight('#FAF6F0', 0.65);
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight('#FAF6F0', 9, 12, Math.PI / 6, 0.5, 1);
    spotLight.position.set(2.2, 4, 3);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    scene.add(spotLight);

    const pointLight = new THREE.PointLight('#D4AF37', 5, 8);
    pointLight.position.set(-2, 1, -1);
    scene.add(pointLight);

    // Floor shadow catcher
    const floorGeo = new THREE.PlaneGeometry(10, 10);
    const floorMat = new THREE.ShadowMaterial({ opacity: 0.12 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    floor.receiveShadow = true;
    scene.add(floor);

    // Animate loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (autoRotate && !isDragging.current) {
        modelGroup.rotation.y += 0.006;
      }

      renderer.render(scene, camera);
    };
    animate();

    // Mouse drag handlers
    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const deltaMove = { x: e.clientX - previousMousePosition.current.x };
      modelGroup.rotation.y += deltaMove.x * 0.007;
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    const handleTouchStart = (e: TouchEvent) => {
      isDragging.current = true;
      if (e.touches.length > 0) {
        previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current || e.touches.length === 0) return;
      const deltaMove = { x: e.touches[0].clientX - previousMousePosition.current.x };
      modelGroup.rotation.y += deltaMove.x * 0.007;
      previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    domElement.addEventListener('touchstart', handleTouchStart);
    domElement.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleMouseUp);

    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight || 450;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      domElement.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      domElement.removeEventListener('touchstart', handleTouchStart);
      domElement.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      
      if (mountRef.current && domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(domElement);
      }
      
      // Dispose resources
      pedestalGeo.dispose();
      pedestalMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      standGeo.dispose();
      standMat.dispose();
      torsoGeo.dispose();
      collarGeo.dispose();
      collarMat.dispose();
      shoulderGeo.dispose();
      shoulderMat.dispose();
      leftSleeveGeo.dispose();
      leftSleeveMat.dispose();
      rightSleeveGeo.dispose();
      rightSleeveMat.dispose();
      skirtGeo.dispose();
      skirtMat.dispose();
      floorGeo.dispose();
      floorMat.dispose();
      
      if (torsoMat.map) torsoMat.map.dispose();
      if (skirtMat.map) skirtMat.map.dispose();
      
      renderer.dispose();
    };
  }, []);

  // Update materials and textures when selectedOutfit changes
  useEffect(() => {
    const config = OUTFITS[selectedOutfit];
    
    // Generate torso texture dynamically
    const torsoTexture = createTorsoTexture(selectedOutfit);
    if (torsoMatRef.current && torsoTexture) {
      if (torsoMatRef.current.map) {
        torsoMatRef.current.map.dispose();
      }
      torsoMatRef.current.map = torsoTexture;
      torsoMatRef.current.color.set('#ffffff'); // Reset to white so texture displays correctly
      torsoMatRef.current.needsUpdate = true;
    }

    // Saree Skirt Texture & Visibility
    const isSaree = false;
    if (sareeSkirtRef.current) {
      sareeSkirtRef.current.visible = isSaree;
      if (isSaree) {
        const skirtTexture = createSkirtTexture();
        if (sareeSkirtMatRef.current && skirtTexture) {
          if (sareeSkirtMatRef.current.map) {
            sareeSkirtMatRef.current.map.dispose();
          }
          sareeSkirtMatRef.current.map = skirtTexture;
          sareeSkirtMatRef.current.color.set('#ffffff');
          sareeSkirtMatRef.current.needsUpdate = true;
        }
      }
    }

    if (collarMatRef.current) collarMatRef.current.color.set(config.bodyColor);
    if (leftSleeveMatRef.current) leftSleeveMatRef.current.color.set(config.bodyColor);
    if (rightSleeveMatRef.current) rightSleeveMatRef.current.color.set(config.bodyColor);
  }, [selectedOutfit]);

  return (
    <div className="royal-glass rounded-2xl border-2 border-[#D4AF37]/35 p-6 flex flex-col md:flex-row gap-6 items-center shadow-lg palace-arch-bg overflow-hidden">
      {/* 3D Canvas Mounting Point */}
      <div className="w-full md:w-1/2 relative bg-[#FAF6F0] rounded-xl border border-[#D4AF37]/10 shadow-inner">
        <div ref={mountRef} className="w-full h-[350px] md:h-[450px] cursor-grab active:cursor-grabbing" />
        
        {/* Helper instruction overlays */}
        <div className="absolute bottom-3 left-3 bg-[#5C1D24]/85 backdrop-blur-xs text-[#FAF6F0] text-[10px] px-3 py-1 rounded-full font-sans flex items-center gap-1.5 border border-[#D4AF37]/50">
          <RotateCw size={10} className="animate-spin" />
          Drag to Rotate Mannequin
        </div>

        <div className="absolute top-3 right-3 flex items-center gap-2">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-3 py-1 text-[10px] font-sans font-semibold rounded-full border transition-all duration-300 ${
              autoRotate 
                ? 'bg-[#5C1D24] text-[#FAF6F0] border-[#D4AF37]' 
                : 'bg-[#FAF6F0] text-[#5C1D24] border-[#D4AF37]/40'
            }`}
          >
            {autoRotate ? 'Auto-Rotate ON' : 'Auto-Rotate OFF'}
          </button>
        </div>
      </div>

      {/* Outfit Controls / Details */}
      <div className="w-full md:w-1/2 flex flex-col justify-between self-stretch py-2">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-[#D4AF37]">
            <Sparkles size={20} />
            <span className="font-cinzel text-xs font-semibold tracking-widest uppercase">Traditional 3D Showroom</span>
          </div>

          <h2 className="font-cinzel text-2xl md:text-3xl font-bold text-[#5C1D24] leading-tight">
            Interactive Mannequin Fitting
          </h2>

          <p className="font-sans text-sm text-[#2A211D]/80 leading-relaxed">
            Dress the virtual Choudhary Model in our signature heritage designs. Explore the royal cuts, color harmonies, and Rajasthani Safa combinations.
          </p>

          <div className="border-t border-b border-[#D4AF37]/20 py-4 my-4 space-y-3">
            <div className="text-xs uppercase tracking-widest font-sans font-bold text-[#5C1D24]">Select Outfit Style:</div>
            <div className="flex flex-col gap-2.5">
              {OUTFITS.map((outfit, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedOutfit(index)}
                  className={`p-3 text-left rounded-lg border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                    selectedOutfit === index
                      ? 'bg-[#5C1D24] text-[#FAF6F0] border-[#D4AF37] shadow-md scale-102'
                      : 'bg-[#F3ECE0]/50 text-[#5C1D24] border-[#D4AF37]/20 hover:bg-[#F3ECE0]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div 
                      className="w-4 h-4 rounded-full border border-white/50 flex-shrink-0" 
                      style={{ backgroundColor: outfit.bodyColor }} 
                    />
                    <div className="min-w-0">
                      <div className="font-cinzel text-xs font-bold truncate sm:whitespace-normal">{outfit.name}</div>
                      <div className={`text-[10px] font-sans truncate sm:whitespace-normal ${selectedOutfit === index ? 'text-[#FAF6F0]/80' : 'text-[#2A211D]/60'}`}>
                        {outfit.description}
                      </div>
                    </div>
                  </div>
                  <Shirt size={16} className={selectedOutfit === index ? 'text-[#D4AF37]' : 'text-[#5C1D24]/40'} />
                </button>
              ))}
            </div>
          </div>
          
          {/* Sample Piece Preview Panel */}
          {(() => {
            const outfit = OUTFITS[selectedOutfit];
            return (
              <div className="flex gap-4 items-center bg-[#FAF6F0] p-4 rounded-xl border border-[#D4AF37]/25 shadow-inner mt-4">
                {/* The Real Garment Photo */}
                <div className="w-24 h-32 relative overflow-hidden rounded-lg border border-[#D4AF37]/45 shadow flex-shrink-0">
                  <img 
                    src={outfit.imageUrl} 
                    alt={outfit.name} 
                    className="w-full h-full object-cover select-none hd-image" 
                  />
                  <div className="absolute inset-1 border border-[#D4AF37]/20 rounded" />
                </div>
                
                {/* Details */}
                <div className="flex-grow flex flex-col justify-center py-1">
                  <div className="text-[9px] text-[#2A211D]/50 uppercase tracking-widest font-sans font-bold">Real Sample Piece</div>
                  <div className="font-cinzel text-xs font-bold text-[#5C1D24] line-clamp-1">{outfit.name}</div>
                  <p className="text-[11px] text-[#2A211D]/75 font-sans mt-2 leading-relaxed line-clamp-3">
                    {outfit.description}
                  </p>
                </div>
              </div>
            );
          })()}
        </div>

        {/* Brand guarantee sign */}
        <div className="bg-[#F3ECE0] border border-[#D4AF37]/30 rounded-lg p-3 flex items-center gap-3 text-xs text-[#5C1D24] font-medium font-sans mt-4">
          <ShieldCheck size={20} className="text-[#D4AF37]" />
          <span>Each cloth configuration is tailored from genuine materials locally sourced since 1994.</span>
        </div>
      </div>
    </div>
  );
};
