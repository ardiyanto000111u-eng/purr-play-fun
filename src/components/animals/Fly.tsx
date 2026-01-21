import { motion } from "framer-motion";

interface FlyProps {
  x: number;
  y: number;
  size?: number;
  direction?: number;
  onCatch?: () => void;
}

const Fly = ({ x, y, size = 70, direction = 0, onCatch }: FlyProps) => {
  const rotation = (direction * 180 / Math.PI) + 90;
  
  return (
    <motion.div
      className="absolute cursor-pointer select-none"
      style={{ 
        left: x - size / 2, 
        top: y - size / 2,
        filter: "drop-shadow(0 0 12px rgba(255, 255, 255, 0.9)) drop-shadow(0 0 20px rgba(100, 100, 255, 0.4))",
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
        viewBox="-5 0 60 70"
        style={{ overflow: "visible" }}
        animate={{
          x: [-1, 1, -1, 1, -1],
          y: [-1, 1, -1, 0, -1],
        }}
        transition={{
          duration: 0.08,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* Glow */}
        <ellipse cx="25" cy="40" rx="16" ry="18" fill="#333" opacity={0.2} filter="blur(4px)" />
        
        {/* Wings - rapid flapping */}
        <motion.ellipse
          cx="8"
          cy="30"
          rx="18"
          ry="8"
          fill="rgba(200, 220, 255, 0.6)"
          stroke="rgba(150, 180, 220, 0.8)"
          strokeWidth="1"
          animate={{ 
            rotate: [-20, 20, -20],
            scaleY: [1, 0.3, 1],
          }}
          transition={{ duration: 0.03, repeat: Infinity }}
          style={{ transformOrigin: "20px 30px" }}
        />
        <motion.ellipse
          cx="42"
          cy="30"
          rx="18"
          ry="8"
          fill="rgba(200, 220, 255, 0.6)"
          stroke="rgba(150, 180, 220, 0.8)"
          strokeWidth="1"
          animate={{ 
            rotate: [20, -20, 20],
            scaleY: [1, 0.3, 1],
          }}
          transition={{ duration: 0.03, repeat: Infinity }}
          style={{ transformOrigin: "30px 30px" }}
        />
        
        {/* Abdomen */}
        <ellipse cx="25" cy="48" rx="10" ry="14" fill="#222" stroke="white" strokeWidth="2" />
        
        {/* Stripes on abdomen */}
        <ellipse cx="25" cy="42" rx="8" ry="2" fill="#444" />
        <ellipse cx="25" cy="48" rx="7" ry="2" fill="#444" />
        <ellipse cx="25" cy="54" rx="5" ry="1.5" fill="#444" />
        
        {/* Thorax */}
        <ellipse cx="25" cy="30" rx="9" ry="8" fill="#333" stroke="white" strokeWidth="2" />
        
        {/* Head */}
        <circle cx="25" cy="18" r="9" fill="#222" stroke="white" strokeWidth="2" />
        
        {/* Compound eyes (big and red) */}
        <ellipse cx="20" cy="16" rx="5" ry="6" fill="#8B0000" />
        <ellipse cx="30" cy="16" rx="5" ry="6" fill="#8B0000" />
        <ellipse cx="20" cy="15" rx="2" ry="2" fill="#FF4444" opacity={0.6} />
        <ellipse cx="30" cy="15" rx="2" ry="2" fill="#FF4444" opacity={0.6} />
        
        {/* Proboscis */}
        <line x1="25" y1="24" x2="25" y2="28" stroke="#222" strokeWidth="2" />
        
        {/* Antennae */}
        <motion.path
          d="M22 10 L20 4"
          stroke="#222"
          strokeWidth="1.5"
          animate={{ d: ["M22 10 L20 4", "M22 10 L18 5", "M22 10 L20 4"] }}
          transition={{ duration: 0.1, repeat: Infinity }}
        />
        <motion.path
          d="M28 10 L30 4"
          stroke="#222"
          strokeWidth="1.5"
          animate={{ d: ["M28 10 L30 4", "M28 10 L32 5", "M28 10 L30 4"] }}
          transition={{ duration: 0.1, repeat: Infinity }}
        />
        
        {/* Legs */}
        <motion.g animate={{ rotate: [0, 3, 0, -3, 0] }} transition={{ duration: 0.05, repeat: Infinity }}>
          <path d="M18 32 L8 38" stroke="#222" strokeWidth="2" />
          <path d="M18 36 L6 42" stroke="#222" strokeWidth="2" />
          <path d="M18 40 L10 50" stroke="#222" strokeWidth="2" />
        </motion.g>
        <motion.g animate={{ rotate: [0, -3, 0, 3, 0] }} transition={{ duration: 0.05, repeat: Infinity }}>
          <path d="M32 32 L42 38" stroke="#222" strokeWidth="2" />
          <path d="M32 36 L44 42" stroke="#222" strokeWidth="2" />
          <path d="M32 40 L40 50" stroke="#222" strokeWidth="2" />
        </motion.g>
      </motion.svg>
    </motion.div>
  );
};

export default Fly;
