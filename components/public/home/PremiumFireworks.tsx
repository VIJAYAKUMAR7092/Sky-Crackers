'use client';

import React from 'react';

export default function PremiumFireworks({ position = 'left' }: { position?: 'left' | 'right' }) {
  // CSS purely based on box-shadows and transforms for smooth 60fps
  return (
    <div className={`absolute top-0 bottom-0 ${position === 'left' ? 'left-0' : 'right-0'} w-64 pointer-events-none overflow-hidden hidden md:block`}>
      <style dangerouslySetInnerHTML={{__html: `
        .firework-particle {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          animation: explode 4s cubic-bezier(0.25, 1, 0.5, 1) infinite;
          opacity: 0;
        }

        .fw-1 { left: 30%; bottom: 10%; animation-delay: 0s; background: #FFD700; box-shadow: 0 0 10px #FFD700, 0 0 20px #FFD700; }
        .fw-2 { left: 70%; bottom: 30%; animation-delay: 1.5s; background: #FF4500; box-shadow: 0 0 10px #FF4500, 0 0 20px #FF4500; }
        .fw-3 { left: 40%; bottom: 50%; animation-delay: 2.5s; background: #00FFFF; box-shadow: 0 0 10px #00FFFF, 0 0 20px #00FFFF; }
        .fw-4 { left: 80%; bottom: 20%; animation-delay: 0.8s; background: #FF1493; box-shadow: 0 0 10px #FF1493, 0 0 20px #FF1493; }

        @keyframes explode {
          0% {
            transform: translateY(100px) scale(1);
            opacity: 1;
            box-shadow: 
              0 0 0 0px currentColor, 
              0 0 0 0px currentColor, 
              0 0 0 0px currentColor, 
              0 0 0 0px currentColor, 
              0 0 0 0px currentColor, 
              0 0 0 0px currentColor;
          }
          40% {
            transform: translateY(-100px) scale(1);
            opacity: 1;
            box-shadow: 
              -40px -40px 15px 1px currentColor, 
              40px -40px 15px 1px currentColor, 
              -40px 40px 15px 1px currentColor, 
              40px 40px 15px 1px currentColor, 
              0 -60px 15px 1px currentColor, 
              0 60px 15px 1px currentColor;
          }
          100% {
            transform: translateY(-150px) scale(0);
            opacity: 0;
            box-shadow: 
              -100px -100px 5px 0px currentColor, 
              100px -100px 5px 0px currentColor, 
              -100px 100px 5px 0px currentColor, 
              100px 100px 5px 0px currentColor, 
              0 -150px 5px 0px currentColor, 
              0 150px 5px 0px currentColor;
          }
        }

        .ambient-glow {
          position: absolute;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,215,0,0.15) 0%, rgba(255,215,0,0) 70%);
          animation: pulseGlow 4s infinite alternate;
        }

        @keyframes pulseGlow {
          0% { transform: scale(0.8); opacity: 0.5; }
          100% { transform: scale(1.2); opacity: 0.8; }
        }
      `}} />
      <div className="ambient-glow" style={{ top: '20%', left: position === 'left' ? '-100px' : 'auto', right: position === 'right' ? '-100px' : 'auto' }} />
      <div className="ambient-glow" style={{ top: '60%', left: position === 'left' ? '-50px' : 'auto', right: position === 'right' ? '-50px' : 'auto', background: 'radial-gradient(circle, rgba(255,69,0,0.1) 0%, rgba(255,69,0,0) 70%)', animationDelay: '2s' }} />
      
      <div className="firework-particle fw-1" style={{ color: '#FFD700' }}></div>
      <div className="firework-particle fw-2" style={{ color: '#FF4500' }}></div>
      <div className="firework-particle fw-3" style={{ color: '#00FFFF' }}></div>
      <div className="firework-particle fw-4" style={{ color: '#FF1493' }}></div>
    </div>
  );
}
