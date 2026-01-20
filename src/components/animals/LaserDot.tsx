import { motion } from "framer-motion";

interface LaserDotProps {
  x: number;
  y: number;
  size?: number;
  direction?: number;
  onCatch?: () => void;
}

const LaserDot = ({ x, y, size = 50, direction = 0, onCatch }: LaserDotProps) => {
  return (
    <motion.div
      className="absolute cursor-pointer select-none"
      style={{ 
        left: x - size / 2, 
        top: y - size / 2,
        filter: "drop-shadow(0 0 25px rgba(255, 0, 0, 1)) drop-shadow(0 0 50px rgba(255, 50, 50, 0.8))",
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 2 }}
      whileTap={{ scale: 0.3, opacity: 0.2 }}
      onTap={onCatch}
    >
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 50 50"
        animate={{
          scale: [1, 1.3, 1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Outer glow */}
        <motion.circle
          cx="25"
          cy="25"
          r="22"
          fill="rgba(255, 0, 0, 0.2)"
          animate={{ r: [18, 22, 18], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 0.3, repeat: Infinity }}
        />
        {/* Middle ring */}
        <motion.circle
          cx="25"
          cy="25"
          r="15"
          fill="rgba(255, 50, 50, 0.4)"
          animate={{ r: [12, 15, 12] }}
          transition={{ duration: 0.2, repeat: Infinity }}
        />
        {/* Core */}
        <motion.circle
          cx="25"
          cy="25"
          r="10"
          fill="#FF0000"
          animate={{ r: [8, 10, 8] }}
          transition={{ duration: 0.15, repeat: Infinity }}
        />
        {/* Bright center */}
        <circle cx="25" cy="25" r="5" fill="#FF4444" />
        <circle cx="25" cy="25" r="2" fill="#FFFFFF" />
      </motion.svg>
    </motion.div>
  );
};

export default LaserDot;
