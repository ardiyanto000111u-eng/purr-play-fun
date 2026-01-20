import { motion } from "framer-motion";

interface MouseProps {
  x: number;
  y: number;
  size?: number;
  direction?: number;
  onCatch?: () => void;
}

const Mouse = ({ x, y, size = 100, direction = 0, onCatch }: MouseProps) => {
  // Flip mouse based on direction
  const facingLeft = Math.abs(direction) > Math.PI / 2;
  
  return (
    <motion.div
      className="absolute cursor-pointer select-none"
      style={{ 
        left: x - size / 2, 
        top: y - size * 0.4,
        transform: `scaleX(${facingLeft ? -1 : 1})`,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0, y: -20 }}
      whileTap={{ scale: 0.5, rotate: 45 }}
      onTap={onCatch}
    >
      <motion.svg
        width={size}
        height={size * 0.8}
        viewBox="0 0 80 64"
        animate={{
          y: [0, -3, 0, -3, 0],
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Body */}
        <motion.ellipse
          cx="40"
          cy="40"
          rx="25"
          ry="18"
          fill="#8B8B8B"
          animate={{ scaleX: [1, 0.92, 1.08, 1] }}
          transition={{ duration: 0.15, repeat: Infinity }}
        />
        {/* Head */}
        <circle cx="18" cy="35" r="15" fill="#9A9A9A" />
        {/* Ears */}
        <motion.circle
          cx="8"
          cy="22"
          r="10"
          fill="#CCCCCC"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 0.3, repeat: Infinity }}
        />
        <motion.circle
          cx="28"
          cy="22"
          r="10"
          fill="#CCCCCC"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 0.3, repeat: Infinity, delay: 0.1 }}
        />
        <circle cx="8" cy="22" r="5" fill="#FFB5B5" />
        <circle cx="28" cy="22" r="5" fill="#FFB5B5" />
        {/* Eyes */}
        <circle cx="12" cy="33" r="3" fill="#333" />
        <circle cx="24" cy="33" r="3" fill="#333" />
        <circle cx="11" cy="32" r="1" fill="white" />
        <circle cx="23" cy="32" r="1" fill="white" />
        {/* Nose */}
        <circle cx="6" cy="38" r="3" fill="#FFB5B5" />
        {/* Whiskers */}
        <line x1="6" y1="36" x2="-8" y2="32" stroke="#666" strokeWidth="1" />
        <line x1="6" y1="38" x2="-8" y2="38" stroke="#666" strokeWidth="1" />
        <line x1="6" y1="40" x2="-8" y2="44" stroke="#666" strokeWidth="1" />
        {/* Tail */}
        <motion.path
          d="M65 40 Q80 35 78 55"
          stroke="#8B8B8B"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          animate={{
            d: [
              "M65 40 Q80 30 78 50",
              "M65 40 Q85 45 80 60",
              "M65 40 Q80 30 78 50",
            ],
          }}
          transition={{ duration: 0.2, repeat: Infinity }}
        />
      </motion.svg>
    </motion.div>
  );
};

export default Mouse;
