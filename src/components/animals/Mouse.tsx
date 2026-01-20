import { motion } from "framer-motion";

interface MouseProps {
  x: number;
  y: number;
  size?: number;
  onCatch?: () => void;
}

const Mouse = ({ x, y, size = 50, onCatch }: MouseProps) => {
  return (
    <motion.div
      className="absolute cursor-pointer select-none"
      style={{ left: x, top: y }}
      whileTap={{ scale: 0.7, rotate: 45 }}
      onTap={onCatch}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.1}
    >
      <motion.svg
        width={size}
        height={size * 0.8}
        viewBox="0 0 80 64"
        animate={{
          x: [0, 20, 0, -20, 0],
          y: [0, -5, 0, -5, 0],
        }}
        transition={{
          duration: 1.8,
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
          animate={{ scaleX: [1, 0.95, 1.05, 1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
        {/* Head */}
        <circle cx="18" cy="35" r="15" fill="#9A9A9A" />
        {/* Ears */}
        <motion.circle
          cx="8"
          cy="22"
          r="10"
          fill="#CCCCCC"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
        <motion.circle
          cx="28"
          cy="22"
          r="10"
          fill="#CCCCCC"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
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
              "M65 40 Q80 35 78 55",
              "M65 40 Q85 40 80 60",
              "M65 40 Q80 45 78 55",
              "M65 40 Q80 35 78 55",
            ],
          }}
          transition={{ duration: 0.6, repeat: Infinity }}
        />
      </motion.svg>
    </motion.div>
  );
};

export default Mouse;
