import { motion } from "framer-motion";

interface ButterflyProps {
  x: number;
  y: number;
  size?: number;
  color?: string;
  onCatch?: () => void;
}

const Butterfly = ({ x, y, size = 60, color = "#FFD93D", onCatch }: ButterflyProps) => {
  return (
    <motion.div
      className="absolute cursor-pointer select-none"
      style={{ left: x, top: y }}
      whileTap={{ scale: 0.5, opacity: 0.3 }}
      onTap={onCatch}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.1}
    >
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 80 80"
        animate={{
          y: [0, -30, 0, -20, 0],
          x: [0, 15, -15, 10, 0],
          rotate: [0, 5, -5, 3, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Left wing */}
        <motion.ellipse
          cx="25"
          cy="35"
          rx="22"
          ry="28"
          fill={color}
          animate={{ 
            scaleX: [1, 0.3, 1],
            rotate: [-15, -5, -15]
          }}
          transition={{ duration: 0.3, repeat: Infinity }}
          style={{ transformOrigin: "40px 40px" }}
        />
        {/* Right wing */}
        <motion.ellipse
          cx="55"
          cy="35"
          rx="22"
          ry="28"
          fill={color}
          animate={{ 
            scaleX: [1, 0.3, 1],
            rotate: [15, 5, 15]
          }}
          transition={{ duration: 0.3, repeat: Infinity }}
          style={{ transformOrigin: "40px 40px" }}
        />
        {/* Wing patterns */}
        <motion.circle
          cx="20"
          cy="30"
          r="8"
          fill="hsl(15 75% 60%)"
          opacity={0.7}
          animate={{ scaleX: [1, 0.3, 1] }}
          transition={{ duration: 0.3, repeat: Infinity }}
        />
        <motion.circle
          cx="60"
          cy="30"
          r="8"
          fill="hsl(15 75% 60%)"
          opacity={0.7}
          animate={{ scaleX: [1, 0.3, 1] }}
          transition={{ duration: 0.3, repeat: Infinity }}
        />
        {/* Body */}
        <ellipse cx="40" cy="45" rx="4" ry="18" fill="#333" />
        {/* Head */}
        <circle cx="40" cy="22" r="5" fill="#333" />
        {/* Antennae */}
        <motion.path
          d="M38 18 Q35 8 30 5"
          stroke="#333"
          strokeWidth="2"
          fill="none"
          animate={{ d: ["M38 18 Q35 8 30 5", "M38 18 Q33 10 28 8", "M38 18 Q35 8 30 5"] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
        <motion.path
          d="M42 18 Q45 8 50 5"
          stroke="#333"
          strokeWidth="2"
          fill="none"
          animate={{ d: ["M42 18 Q45 8 50 5", "M42 18 Q47 10 52 8", "M42 18 Q45 8 50 5"] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
        <circle cx="30" cy="5" r="2" fill="#333" />
        <circle cx="50" cy="5" r="2" fill="#333" />
      </motion.svg>
    </motion.div>
  );
};

export default Butterfly;
