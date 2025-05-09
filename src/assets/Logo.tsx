import React from 'react';

const Logo: React.FC = () => (
  <div className="flex items-center logo-container">
    <style dangerouslySetInnerHTML={{ __html: `
      .logo-container {
        position: relative;
        cursor: pointer;
      }
      .logo-container svg {
        transition: transform 0.3s ease;
      }
      .logo-container:hover svg {
        transform: scale(1.03);
      }
      .pizza-title {
        transition: all 0.3s ease;
      }
      @keyframes pizzaSpin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
      }
      @keyframes pulse {
        0%, 100% { opacity: 0.7; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.1); }
      }
      @keyframes cheese-stretch {
        0%, 100% { transform: scaleY(1); }
        50% { transform: scaleY(1.3); }
      }
      .logo-container:hover .pizza-logo {
        animation: pizzaSpin 12s linear infinite;
        transform-origin: 220px 40px;
      }
      .logo-container:hover .pizza-title {
        animation: float 1s ease-in-out infinite;
      }
      .logo-container:hover .pepperoni {
        animation: pulse 2s ease-in-out infinite;
      }
      .logo-container:hover .cheese-drip {
        animation: cheese-stretch 2s ease-in-out infinite;
        opacity: 1;
      }
      .steam-path {
        opacity: 0.7;
        transition: opacity 0.3s ease;
      }
      .logo-container:hover .steam-path {
        opacity: 1;
      }
      .cheese-drip {
        opacity: 0;
        transition: opacity 0.5s ease;
      }
    `}} />
    <svg width="280" height="80" viewBox="0 0 280 80" xmlns="http://www.w3.org/2000/svg" className="mb-2">
      <defs>
        <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="2" floodColor="rgba(0, 0, 0, 0.3)" />
        </filter>
        
        <linearGradient id="pizzaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff9e00" />
          <stop offset="100%" stopColor="#e63946" />
        </linearGradient>
        
        <linearGradient id="titleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#e63946" />
          <stop offset="50%" stopColor="#ff9e00" />
          <stop offset="100%" stopColor="#e63946" />
          <animate attributeName="x1" values="0%;100%;0%" dur="10s" repeatCount="indefinite" />
          <animate attributeName="x2" values="100%;0%;100%" dur="10s" repeatCount="indefinite" />
        </linearGradient>

        <linearGradient id="cheeseGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffb627" />
          <stop offset="100%" stopColor="#ff9e00" />
        </linearGradient>
        
        <clipPath id="pizzaClip">
          <circle cx="220" cy="40" r="30" />
        </clipPath>
      </defs>
      
      {/* Title with 3D effect */}
      <text x="12" y="48" fontFamily="'Montserrat', sans-serif" fontSize="42" fontWeight="900" fill="url(#titleGradient)" filter="url(#glow)" className="pizza-title">
        Pizza Finder
      </text>
      <text x="10" y="46" fontFamily="'Montserrat', sans-serif" fontSize="42" fontWeight="900" fill="url(#titleGradient)" className="pizza-title">
        Pizza Finder
      </text>
      
      {/* Pizza logo */}
      <g clipPath="url(#pizzaClip)" className="pizza-logo" filter="url(#shadow)">
        {/* Pizza base */}
        <circle cx="220" cy="40" r="30" fill="#ffd166" stroke="#e63946" strokeWidth="2.5" />
        
        {/* Pizza crust with gradient */}
        <circle cx="220" cy="40" r="28" fill="url(#cheeseGradient)" stroke="#e63946" strokeWidth="0.5" />
        
        {/* Crust rim highlight */}
        <path 
          d="M220 12 A28 28 0 0 1 248 40" 
          stroke="#fff5e0" 
          strokeWidth="1.5" 
          fill="none" 
          opacity="0.6" 
        />
        
        {/* Pizza slice lines */}
        <path d="M220 40 L250 40" stroke="#e63946" strokeWidth="1.2" />
        <path d="M220 40 L235 15" stroke="#e63946" strokeWidth="1.2" />
        <path d="M220 40 L235 65" stroke="#e63946" strokeWidth="1.2" />
        <path d="M220 40 L205 15" stroke="#e63946" strokeWidth="1.2" />
        <path d="M220 40 L205 65" stroke="#e63946" strokeWidth="1.2" />
        <path d="M220 40 L190 40" stroke="#e63946" strokeWidth="1.2" />
        
        {/* Pepperoni slices with animation */}
        <circle cx="210" cy="25" r="5" fill="#e63946" className="pepperoni" />
        <circle cx="230" cy="30" r="4" fill="#e63946" className="pepperoni" />
        <circle cx="225" cy="52" r="5" fill="#e63946" className="pepperoni" />
        <circle cx="205" cy="45" r="4" fill="#e63946" className="pepperoni" />
        
        {/* Herbs and spices */}
        <path d="M215 28 L217 32" stroke="#4F7942" strokeWidth="0.8" />
        <path d="M228 47 L232 49" stroke="#4F7942" strokeWidth="0.8" />
        <path d="M203 30 L207 33" stroke="#4F7942" strokeWidth="0.8" />
        
        {/* Steam effect with improved animation */}
        <path 
          className="steam-path" 
          d="M210 8 Q215 3, 220 8 Q225 13, 230 8" 
          stroke="#ffffff" 
          strokeWidth="2" 
          fill="none" 
          opacity="0.7"
        >
          <animate 
            attributeName="d" 
            values="M210 8 Q215 3, 220 8 Q225 13, 230 8;
                   M210 6 Q215 1, 220 6 Q225 11, 230 6;
                   M210 8 Q215 3, 220 8 Q225 13, 230 8"
            dur="3s" 
            repeatCount="indefinite" 
          />
        </path>
      </g>
      
      {/* Cheese drips with animation */}
      <path 
        className="cheese-drip" 
        d="M235 15 Q240 25, 242 35" 
        stroke="#ffb627" 
        strokeWidth="3" 
        fill="none" 
      />
      
      {/* Second cheese drip */}
      <path 
        className="cheese-drip" 
        d="M205 65 Q200 70, 198 75" 
        stroke="#ffb627" 
        strokeWidth="2.5" 
        fill="none" 
        opacity="0.9" 
      />
      
      {/* Sauce splatter */}
      <circle cx="242" cy="35" r="0" fill="#e63946" className="cheese-drip">
        <animate 
          attributeName="r" 
          values="0;2;1.5" 
          begin="1s"
          dur="3s" 
          repeatCount="indefinite" 
        />
      </circle>
    </svg>
  </div>
);

export default Logo;
