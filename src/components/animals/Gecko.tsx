import { motion } from "framer-motion";

interface GeckoProps {
  x: number;
  y: number;
  size?: number;
  direction?: number;
  color?: string;
  onCatch?: () => void;
}

const Gecko = ({ x, y, size = 100, direction = 0, color = "#5DBE5D", onCatch }: GeckoProps) => {
  const rotation = (direction * 180 / Math.PI) + 90;
  
  return (
    <motion.div
      className="absolute cursor-pointer select-none"
      style={{ 
        left: x - size / 2, 
        top: y - size / 2,
        filter: `drop-shadow(0 0 15px rgba(255, 255, 255, 0.9)) drop-shadow(0 0 25px ${color}66)`,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1, rotate: rotation }}
      exit={{ opacity: 0, scale: 0, rotate: rotation + 180 }}
      whileTap={{ scale: 0.5 }}
      onTap={onCatch}
    >
      <motion.svg
        width={size}
        height={size}
        viewBox="-5 -10 70 100"
        style={{ overflow: "visible" }}
      >
        {/* Glow */}
        <ellipse cx="30" cy="40" rx="18" ry="35" fill={color} opacity={0.2} filter="blur(6px)" />
        
        {/* Tail - wavy animation */}
        <motion.path
          d="M30 70 Q35 80 30 88 Q25 95 28 100"
          stroke={color}
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          animate={{
            d: [
              "M30 70 Q35 80 30 88 Q25 95 28 100",
              "M30 70 Q25 80 30 88 Q35 95 32 100",
              "M30 70 Q35 80 30 88 Q25 95 28 100",
            ],
          }}
          transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M30 70 Q35 80 30 88 Q25 95 28 100"
          stroke="white"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
          opacity={0.3}
          animate={{
            d: [
              "M30 70 Q35 80 30 88 Q25 95 28 100",
              "M30 70 Q25 80 30 88 Q35 95 32 100",
              "M30 70 Q35 80 30 88 Q25 95 28 100",
            ],
          }}
          transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Body */}
        <ellipse cx="30" cy="45" rx="14" ry="28" fill={color} stroke="white" strokeWidth="2" />
        
        {/* Spots/pattern */}
        <circle cx="25" cy="35" r="3" fill="#FFFFFF" opacity={0.3} />
        <circle cx="35" cy="40" r="2.5" fill="#FFFFFF" opacity={0.3} />
        <circle cx="28" cy="50" r="2" fill="#FFFFFF" opacity={0.3} />
        <circle cx="34" cy="55" r="2.5" fill="#FFFFFF" opacity={0.3} />
        
        {/* Back legs */}
        <motion.g animate={{ rotate: [0, 10, 0, -10, 0] }} transition={{ duration: 0.3, repeat: Infinity }}>
          <path d="M18 58 Q8 65 2 72" stroke={color} strokeWidth="5" fill="none" strokeLinecap="round" />
          <ellipse cx="2" cy="74" rx="5" ry="3" fill={color} stroke="white" strokeWidth="1" />
        </motion.g>
        <motion.g animate={{ rotate: [0, -10, 0, 10, 0] }} transition={{ duration: 0.3, repeat: Infinity }}>
          <path d="M42 58 Q52 65 58 72" stroke={color} strokeWidth="5" fill="none" strokeLinecap="round" />
          <ellipse cx="58" cy="74" rx="5" ry="3" fill={color} stroke="white" strokeWidth="1" />
        </motion.g>
        
        {/* Front legs */}
        <motion.g animate={{ rotate: [0, -8, 0, 8, 0] }} transition={{ duration: 0.25, repeat: Infinity }}>
          <path d="M18 28 Q8 22 0 15" stroke={color} strokeWidth="5" fill="none" strokeLinecap="round" />
          <ellipse cx="0" cy="13" rx="5" ry="3" fill={color} stroke="white" strokeWidth="1" />
        </motion.g>
        <motion.g animate={{ rotate: [0, 8, 0, -8, 0] }} transition={{ duration: 0.25, repeat: Infinity }}>
          <path d="M42 28 Q52 22 60 15" stroke={color} strokeWidth="5" fill="none" strokeLinecap="round" />
          <ellipse cx="60" cy="13" rx="5" ry="3" fill={color} stroke="white" strokeWidth="1" />
        </motion.g>
        
        {/* Head */}
        <ellipse cx="30" cy="8" rx="12" ry="10" fill={color} stroke="white" strokeWidth="2" />
        
        {/* Eyes - big and cute */}
        <circle cx="24" cy="5" r="5" fill="#222" />
        <circle cx="36" cy="5" r="5" fill="#222" />
        <circle cx="24" cy="4" r="2.5" fill="#FFD700" />
        <circle cx="36" cy="4" r="2.5" fill="#FFD700" />
        <circle cx="24" cy="4" r="1" fill="#222" />
        <circle cx="36" cy="4" r="1" fill="#222" />
        
        {/* Nostrils */}
        <circle cx="27" cy="12" r="1" fill="#333" />
        <circle cx="33" cy="12" r="1" fill="#333" />
        
        {/* Smile */}
        <path d="M26 15 Q30 18 34 15" stroke="#333" strokeWidth="1.5" fill="none" />
      </motion.svg>
    </motion.div>
  );
};

export default Gecko;
