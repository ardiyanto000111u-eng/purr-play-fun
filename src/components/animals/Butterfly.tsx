import { motion } from "framer-motion";

interface ButterflyProps {
  x: number;
  y: number;
  size?: number;
  color?: string;
  direction?: number;
  onCatch?: () => void;
}

const Butterfly = ({ x, y, size = 110, color = "#FFD93D", direction = 0, onCatch }: ButterflyProps) => {
  const tiltAngle = (direction * 180 / Math.PI) * 0.3;
  
  return (
    <motion.div
      className="absolute cursor-pointer select-none"
      style={{ 
        left: x - size / 2, 
        top: y - size / 2,
        filter: "drop-shadow(0 0 20px rgba(255, 255, 255, 0.9)) drop-shadow(0 0 35px rgba(255, 220, 100, 0.6))",
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1, rotate: tiltAngle }}
      exit={{ opacity: 0, scale: 0, y: -50 }}
      whileTap={{ scale: 0.3, opacity: 0.2 }}
      onTap={onCatch}
    >
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 80 80"
        animate={{
          y: [0, -8, 0, -5, 0],
        }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Glow layers */}
        <ellipse cx="25" cy="35" rx="25" ry="30" fill={color} opacity={0.3} filter="blur(8px)" />
        <ellipse cx="55" cy="35" rx="25" ry="30" fill={color} opacity={0.3} filter="blur(8px)" />
        
        {/* Left wing */}
        <motion.ellipse
          cx="25"
          cy="35"
          rx="22"
          ry="28"
          fill={color}
          stroke="white"
          strokeWidth="2"
          animate={{ 
            scaleX: [1, 0.2, 1],
            rotate: [-15, -5, -15]
          }}
          transition={{ duration: 0.15, repeat: Infinity }}
          style={{ transformOrigin: "40px 40px" }}
        />
        {/* Right wing */}
        <motion.ellipse
          cx="55"
          cy="35"
          rx="22"
          ry="28"
          fill={color}
          stroke="white"
          strokeWidth="2"
          animate={{ 
            scaleX: [1, 0.2, 1],
            rotate: [15, 5, 15]
          }}
          transition={{ duration: 0.15, repeat: Infinity }}
          style={{ transformOrigin: "40px 40px" }}
        />
        {/* Wing patterns - inner circles */}
        <motion.circle
          cx="20"
          cy="30"
          r="10"
          fill="hsl(15 75% 55%)"
          stroke="white"
          strokeWidth="1"
          animate={{ scaleX: [1, 0.2, 1] }}
          transition={{ duration: 0.15, repeat: Infinity }}
        />
        <motion.circle
          cx="60"
          cy="30"
          r="10"
          fill="hsl(15 75% 55%)"
          stroke="white"
          strokeWidth="1"
          animate={{ scaleX: [1, 0.2, 1] }}
          transition={{ duration: 0.15, repeat: Infinity }}
        />
        {/* Wing patterns - small dots */}
        <motion.circle
          cx="18"
          cy="45"
          r="5"
          fill="white"
          opacity={0.7}
          animate={{ scaleX: [1, 0.2, 1] }}
          transition={{ duration: 0.15, repeat: Infinity }}
        />
        <motion.circle
          cx="62"
          cy="45"
          r="5"
          fill="white"
          opacity={0.7}
          animate={{ scaleX: [1, 0.2, 1] }}
          transition={{ duration: 0.15, repeat: Infinity }}
        />
        {/* Body */}
        <ellipse cx="40" cy="45" rx="5" ry="20" fill="#333" stroke="white" strokeWidth="1" />
        {/* Head */}
        <circle cx="40" cy="22" r="6" fill="#333" stroke="white" strokeWidth="1" />
        {/* Eyes */}
        <circle cx="37" cy="21" r="2" fill="white" />
        <circle cx="43" cy="21" r="2" fill="white" />
        {/* Antennae */}
        <motion.path
          d="M38 17 Q34 6 28 3"
          stroke="#333"
          strokeWidth="2"
          fill="none"
          animate={{ d: ["M38 17 Q34 6 28 3", "M38 17 Q32 8 26 6", "M38 17 Q34 6 28 3"] }}
          transition={{ duration: 0.3, repeat: Infinity }}
        />
        <motion.path
          d="M42 17 Q46 6 52 3"
          stroke="#333"
          strokeWidth="2"
          fill="none"
          animate={{ d: ["M42 17 Q46 6 52 3", "M42 17 Q48 8 54 6", "M42 17 Q46 6 52 3"] }}
          transition={{ duration: 0.3, repeat: Infinity }}
        />
        <circle cx="28" cy="3" r="3" fill="#333" />
        <circle cx="52" cy="3" r="3" fill="#333" />
      </motion.svg>
    </motion.div>
  );
};

export default Butterfly;
