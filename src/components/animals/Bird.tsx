import { motion } from "framer-motion";

interface BirdProps {
  x: number;
  y: number;
  size?: number;
  color?: string;
  direction?: number;
  onCatch?: () => void;
}

const Bird = ({ x, y, size = 100, color = "#5DADE2", direction = 0, onCatch }: BirdProps) => {
  const facingLeft = Math.abs(direction) > Math.PI / 2;
  
  return (
    <motion.div
      className="absolute cursor-pointer select-none"
      style={{ 
        left: x - size / 2, 
        top: y - size / 2,
        transform: `scaleX(${facingLeft ? -1 : 1})`,
        filter: "drop-shadow(0 0 20px rgba(255, 255, 255, 0.9)) drop-shadow(0 0 35px rgba(100, 180, 255, 0.6))",
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0, y: -30 }}
      whileTap={{ scale: 0.5, opacity: 0.3 }}
      onTap={onCatch}
    >
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 80 80"
        style={{ overflow: "visible" }}
        animate={{
          y: [0, -10, 0, -5, 0],
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Glow */}
        <ellipse cx="40" cy="45" rx="30" ry="20" fill={color} opacity={0.3} filter="blur(6px)" />
        
        {/* Left wing */}
        <motion.ellipse
          cx="20"
          cy="40"
          rx="18"
          ry="10"
          fill={color}
          stroke="white"
          strokeWidth="2"
          animate={{ 
            rotate: [-30, 30, -30],
            cy: [40, 35, 40]
          }}
          transition={{ duration: 0.2, repeat: Infinity }}
          style={{ transformOrigin: "35px 45px" }}
        />
        
        {/* Right wing */}
        <motion.ellipse
          cx="60"
          cy="40"
          rx="18"
          ry="10"
          fill={color}
          stroke="white"
          strokeWidth="2"
          animate={{ 
            rotate: [30, -30, 30],
            cy: [40, 35, 40]
          }}
          transition={{ duration: 0.2, repeat: Infinity }}
          style={{ transformOrigin: "45px 45px" }}
        />
        
        {/* Body */}
        <ellipse cx="40" cy="50" rx="15" ry="20" fill={color} stroke="white" strokeWidth="2" />
        
        {/* Belly */}
        <ellipse cx="40" cy="55" rx="10" ry="12" fill="#F5F5F5" />
        
        {/* Head */}
        <circle cx="40" cy="28" r="14" fill={color} stroke="white" strokeWidth="2" />
        
        {/* Eyes */}
        <circle cx="34" cy="26" r="5" fill="white" />
        <circle cx="46" cy="26" r="5" fill="white" />
        <circle cx="35" cy="26" r="2.5" fill="#222" />
        <circle cx="47" cy="26" r="2.5" fill="#222" />
        <circle cx="34" cy="25" r="1" fill="white" />
        <circle cx="46" cy="25" r="1" fill="white" />
        
        {/* Beak */}
        <motion.path
          d="M40 32 L36 40 L40 38 L44 40 Z"
          fill="#FFA726"
          stroke="white"
          strokeWidth="1"
          animate={{ d: ["M40 32 L36 40 L40 38 L44 40 Z", "M40 32 L36 42 L40 39 L44 42 Z", "M40 32 L36 40 L40 38 L44 40 Z"] }}
          transition={{ duration: 0.3, repeat: Infinity }}
        />
        
        {/* Tail feathers */}
        <motion.path
          d="M40 70 L35 85 L40 80 L45 85 Z"
          fill={color}
          stroke="white"
          strokeWidth="1"
          animate={{ 
            d: [
              "M40 70 L35 85 L40 80 L45 85 Z",
              "M40 70 L33 83 L40 78 L47 83 Z",
              "M40 70 L35 85 L40 80 L45 85 Z"
            ]
          }}
          transition={{ duration: 0.4, repeat: Infinity }}
        />
        
        {/* Head tuft */}
        <motion.path
          d="M40 14 Q42 8 38 5 Q44 8 40 14"
          fill={color}
          animate={{ d: ["M40 14 Q42 8 38 5 Q44 8 40 14", "M40 14 Q44 6 40 3 Q46 6 40 14", "M40 14 Q42 8 38 5 Q44 8 40 14"] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      </motion.svg>
    </motion.div>
  );
};

export default Bird;
