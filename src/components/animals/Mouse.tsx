import { motion } from "framer-motion";

interface MouseProps {
  x: number;
  y: number;
  size?: number;
  direction?: number;
  onCatch?: () => void;
}

const Mouse = ({ x, y, size = 100, direction = 0, onCatch }: MouseProps) => {
  const facingLeft = Math.abs(direction) > Math.PI / 2;
  
  return (
    <motion.div
      className="absolute cursor-pointer select-none"
      style={{ 
        left: x - size / 2, 
        top: y - size * 0.4,
        transform: `scaleX(${facingLeft ? -1 : 1})`,
        filter: "drop-shadow(0 0 15px rgba(255, 255, 255, 0.9)) drop-shadow(0 0 30px rgba(200, 200, 200, 0.5))",
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0, y: -20 }}
      whileTap={{ scale: 0.5, rotate: 45 }}
      onTap={onCatch}
    >
      <motion.svg
        width={size}
        height={size}
        viewBox="-15 0 110 80"
        style={{ overflow: "visible" }}
        animate={{
          y: [0, -3, 0, -3, 0],
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Glow layer */}
        <ellipse cx="35" cy="48" rx="35" ry="25" fill="white" opacity={0.2} filter="blur(6px)" />
        
        {/* Body */}
        <motion.ellipse
          cx="40"
          cy="50"
          rx="25"
          ry="18"
          fill="#C0C0C0"
          stroke="white"
          strokeWidth="2"
          animate={{ scaleX: [1, 0.92, 1.08, 1] }}
          transition={{ duration: 0.15, repeat: Infinity }}
        />
        {/* Head */}
        <circle cx="18" cy="45" r="15" fill="#D0D0D0" stroke="white" strokeWidth="2" />
        {/* Ears - moved down and made fully visible */}
        <motion.circle
          cx="6"
          cy="28"
          r="12"
          fill="#E8E8E8"
          stroke="white"
          strokeWidth="2"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 0.3, repeat: Infinity }}
        />
        <motion.circle
          cx="30"
          cy="28"
          r="12"
          fill="#E8E8E8"
          stroke="white"
          strokeWidth="2"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 0.3, repeat: Infinity, delay: 0.1 }}
        />
        {/* Inner ear pink */}
        <circle cx="6" cy="28" r="6" fill="#FFB5B5" />
        <circle cx="30" cy="28" r="6" fill="#FFB5B5" />
        {/* Eyes */}
        <circle cx="12" cy="43" r="4" fill="#333" />
        <circle cx="24" cy="43" r="4" fill="#333" />
        <circle cx="10" cy="41" r="1.5" fill="white" />
        <circle cx="22" cy="41" r="1.5" fill="white" />
        {/* Nose */}
        <circle cx="6" cy="48" r="4" fill="#FFB5B5" />
        {/* Whiskers */}
        <line x1="6" y1="45" x2="-10" y2="40" stroke="white" strokeWidth="1.5" />
        <line x1="6" y1="48" x2="-10" y2="48" stroke="white" strokeWidth="1.5" />
        <line x1="6" y1="51" x2="-10" y2="56" stroke="white" strokeWidth="1.5" />
        {/* Tail */}
        <motion.path
          d="M65 50 Q80 45 78 65"
          stroke="#C0C0C0"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
          animate={{
            d: [
              "M65 50 Q80 40 78 60",
              "M65 50 Q85 55 80 70",
              "M65 50 Q80 40 78 60",
            ],
          }}
          transition={{ duration: 0.2, repeat: Infinity }}
        />
      </motion.svg>
    </motion.div>
  );
};

export default Mouse;
