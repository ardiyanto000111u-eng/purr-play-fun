import { motion } from "framer-motion";

interface SpiderProps {
  x: number;
  y: number;
  size?: number;
  direction?: number;
  onCatch?: () => void;
}

const Spider = ({ x, y, size = 80, direction = 0, onCatch }: SpiderProps) => {
  const rotation = (direction * 180 / Math.PI) + 90;
  
  return (
    <motion.div
      className="absolute cursor-pointer select-none"
      style={{ 
        left: x - size / 2, 
        top: y - size / 2,
        filter: "drop-shadow(0 0 12px rgba(255, 255, 255, 0.9)) drop-shadow(0 0 25px rgba(50, 50, 50, 0.6))",
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1, rotate: rotation }}
      exit={{ opacity: 0, scale: 0, rotate: rotation + 360 }}
      whileTap={{ scale: 0.5 }}
      onTap={onCatch}
    >
      <motion.svg
        width={size}
        height={size}
        viewBox="-10 -10 80 80"
        style={{ overflow: "visible" }}
        animate={{
          y: [0, -1, 0, -1, 0],
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Glow */}
        <ellipse cx="30" cy="35" rx="20" ry="18" fill="#333" opacity={0.2} filter="blur(5px)" />
        
        {/* Legs - left side */}
        <motion.g animate={{ rotate: [0, 8, 0, -8, 0] }} transition={{ duration: 0.12, repeat: Infinity }}>
          <path d="M20 25 Q5 15 -5 5" stroke="#222" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M18 32 Q0 28 -8 22" stroke="#222" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M18 40 Q0 42 -8 48" stroke="#222" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M20 48 Q5 55 -5 65" stroke="#222" strokeWidth="3" fill="none" strokeLinecap="round" />
        </motion.g>
        
        {/* Legs - right side */}
        <motion.g animate={{ rotate: [0, -8, 0, 8, 0] }} transition={{ duration: 0.12, repeat: Infinity }}>
          <path d="M40 25 Q55 15 65 5" stroke="#222" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M42 32 Q60 28 68 22" stroke="#222" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M42 40 Q60 42 68 48" stroke="#222" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M40 48 Q55 55 65 65" stroke="#222" strokeWidth="3" fill="none" strokeLinecap="round" />
        </motion.g>
        
        {/* Abdomen */}
        <ellipse cx="30" cy="42" rx="16" ry="18" fill="#333" stroke="white" strokeWidth="2" />
        
        {/* Pattern on abdomen */}
        <ellipse cx="30" cy="38" rx="6" ry="4" fill="#555" />
        <ellipse cx="30" cy="48" rx="4" ry="3" fill="#555" />
        
        {/* Cephalothorax (head section) */}
        <ellipse cx="30" cy="22" rx="12" ry="10" fill="#444" stroke="white" strokeWidth="2" />
        
        {/* Eyes - spiders have 8 eyes! */}
        <circle cx="24" cy="18" r="3" fill="#111" />
        <circle cx="36" cy="18" r="3" fill="#111" />
        <circle cx="24" cy="18" r="1.5" fill="#7FFF7F" />
        <circle cx="36" cy="18" r="1.5" fill="#7FFF7F" />
        
        <circle cx="27" cy="24" r="2" fill="#111" />
        <circle cx="33" cy="24" r="2" fill="#111" />
        <circle cx="27" cy="24" r="1" fill="#7FFF7F" />
        <circle cx="33" cy="24" r="1" fill="#7FFF7F" />
        
        {/* Fangs */}
        <motion.path
          d="M27 28 Q26 32 28 34"
          stroke="#222"
          strokeWidth="2"
          fill="none"
          animate={{ d: ["M27 28 Q26 32 28 34", "M27 28 Q25 31 27 33", "M27 28 Q26 32 28 34"] }}
          transition={{ duration: 0.3, repeat: Infinity }}
        />
        <motion.path
          d="M33 28 Q34 32 32 34"
          stroke="#222"
          strokeWidth="2"
          fill="none"
          animate={{ d: ["M33 28 Q34 32 32 34", "M33 28 Q35 31 33 33", "M33 28 Q34 32 32 34"] }}
          transition={{ duration: 0.3, repeat: Infinity }}
        />
      </motion.svg>
    </motion.div>
  );
};

export default Spider;
