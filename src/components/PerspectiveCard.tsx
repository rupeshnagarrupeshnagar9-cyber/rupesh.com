import React, { useState, useRef, MouseEvent } from 'react';

interface PerspectiveCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string; // e.g. "rgba(6, 182, 212, 0.4)"
}

export default function PerspectiveCard({ 
  children, 
  className = '', 
  glowColor = 'rgba(99, 102, 241, 0.25)' 
}: PerspectiveCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState<number>(0);
  const [rotateY, setRotateY] = useState<number>(0);
  const [glowStyle, setGlowStyle] = useState<React.CSSProperties>({ opacity: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element
    const y = e.clientY - rect.top;  // y position within the element

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation (-10deg to 10deg max)
    const ry = ((x - centerX) / centerX) * 12; 
    const rx = -((y - centerY) / centerY) * 12; 

    setRotateX(rx);
    setRotateY(ry);

    // Apply spotlight background radial style matching the cursor
    setGlowStyle({
      opacity: 1,
      background: `radial-gradient(circle 120px at ${x}px ${y}px, ${glowColor}, transparent)`,
    });
  };

  const handleMouseLeave = () => {
    // Reset spring back to center
    setRotateX(0);
    setRotateY(0);
    setGlowStyle({ opacity: 0, transition: 'all 0.5s ease' });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-2xl transition-all duration-150 ease-out preserve-3d ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Glossy overlay layer tracking cursor position */}
      <div 
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 z-10"
        style={glowStyle}
      />
      
      {/* Content wrapper preserving 3D stack */}
      <div className="relative h-full w-full rounded-2xl z-20 transform-3d">
        {children}
      </div>
    </div>
  );
}
