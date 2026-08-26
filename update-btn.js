const fs = require('fs');
let file = 'components/public/home/HeroSlider.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  /\.btn-premium-gold \{[\s\S]*?\.gold-bubbles \{/,
  `.btn-green-glow {
      background: linear-gradient(90deg, #d4ed31, #8cc63f, #d4ed31);
      background-size: 200% auto;
      animation: greenShine 3s linear infinite, floatPremium 4s ease-in-out infinite;
      position: relative;
      overflow: hidden;
    }
    @keyframes greenShine {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    .btn-green-glow::before {
      content: '';
      position: absolute;
      top: -50%; left: -50%;
      width: 200%; height: 200%;
      background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 60%);
      opacity: 0;
      transform: scale(0.5);
      transition: opacity 0.3s, transform 0.5s;
      pointer-events: none;
    }
    .btn-green-glow:hover::before {
      opacity: 0.4;
      transform: scale(1);
    }
    .gold-bubbles {`
);

content = content.replace(/btn-premium-gold/g, 'btn-green-glow');
content = content.replace(/Shop Collection/g, 'SHOP NOW');
content = content.replace(/rgba\(218,165,32,0\.4\)/g, 'rgba(140, 198, 63, 0.4)');
content = content.replace(/rgba\(255,215,0,0\.6\)/g, 'rgba(212, 237, 49, 0.6)');

fs.writeFileSync(file, content, 'utf8');
console.log("Success");
