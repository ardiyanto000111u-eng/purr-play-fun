import { motion } from "framer-motion";

interface FishProps {
  x: number;
  y: number;
  size?: number;
  color?: string;
  direction?: number;
  onCatch?: () => void;
}

const Fish = ({ x, y, size = 60, color = "#FF7B54", direction = 0, onCatch }: FishProps) => {
  // Flip fish based on direction (facing left or right)
  const facingLeft = Math.abs(direction) > Math.PI / 2;
  
  return (
    <motion.div
      className="absolute cursor-pointer select-none"
      style={{ 
        left: x - size / 2, 
        top: y - size * 0.3,
        transform: `scaleX(${facingLeft ? -1 : 1})`,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0, rotate: 360 }}
      whileTap={{ scale: 0.6, opacity: 0.3 }}
      onTap={onCatch}
    >
      <motion.svg
        width={size}
        height={size * 0.6}
        viewBox="0 0 100 60"
        animate={{
          rotate: [0, 5, 0, -5, 0],
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Fish body */}
        <motion.ellipse
          cx="45"
          cy="30"
          rx="35"
          ry="20"
          fill={color}
          animate={{ scaleY: [1, 0.95, 1, 1.05, 1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
        {/* Tail */}
        <motion.path
          d="M75 30 L100 10 L100 50 Z"
          fill={color}
          animate={{ 
            d: [
              "M75 30 L100 10 L100 50 Z",
              "M75 30 L100 20 L100 40 Z",
              "M75 30 L100 10 L100 50 Z",
            ]
          }}
          transition={{ duration: 0.3, repeat: Infinity }}
        />
        {/* Eye */}
        <circle cx="25" cy="25" r="6" fill="white" />
        <circle cx="23" cy="24" r="3" fill="#333" />
        {/* Fin */}
        <motion.path
          d="M40 12 L50 0 L55 15 Z"
          fill={color}
          opacity={0.8}
          animate={{ rotate: [0, -15, 0, 15, 0] }}
          transition={{ duration: 0.4, repeat: Infinity }}
          style={{ transformOrigin: "50% 100%" }}
        />
        {/* Scales shimmer */}
        <motion.ellipse
          cx="40"
          cy="30"
          rx="8"
          ry="5"
          fill="white"
          opacity={0.3}
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </motion.svg>
    </motion.div>
  );
};

export default Fish;
