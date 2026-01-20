import { motion } from "framer-motion";

interface LadybugProps {
  x: number;
  y: number;
  size?: number;
  direction?: number;
  onCatch?: () => void;
}

const Ladybug = ({ x, y, size = 90, direction = 0, onCatch }: LadybugProps) => {
  const rotation = (direction * 180 / Math.PI) + 90;
  
  return (
    <motion.div
      className="absolute cursor-pointer select-none"
      style={{ 
        left: x - size / 2, 
        top: y - size / 2,
        filter: "drop-shadow(0 0 15px rgba(255, 255, 255, 0.9)) drop-shadow(0 0 30px rgba(255, 100, 100, 0.5))",
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
        viewBox="0 0 60 70"
        style={{ overflow: "visible" }}
        animate={{
          y: [0, -2, 0, -2, 0],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Glow */}
        <ellipse cx="30" cy="40" rx="28" ry="30" fill="red" opacity={0.2} filter="blur(6px)" />
        
        {/* Body (red shell) */}
        <ellipse cx="30" cy="40" rx="24" ry="28" fill="#E53935" stroke="white" strokeWidth="2" />
        
        {/* Center line */}
        <line x1="30" y1="15" x2="30" y2="68" stroke="#222" strokeWidth="3" />
        
        {/* Spots */}
        <circle cx="20" cy="30" r="5" fill="#222" />
        <circle cx="40" cy="30" r="5" fill="#222" />
        <circle cx="18" cy="45" r="4" fill="#222" />
        <circle cx="42" cy="45" r="4" fill="#222" />
        <circle cx="22" cy="58" r="3.5" fill="#222" />
        <circle cx="38" cy="58" r="3.5" fill="#222" />
        
        {/* Head */}
        <circle cx="30" cy="12" r="10" fill="#222" stroke="white" strokeWidth="2" />
        
        {/* Eyes */}
        <circle cx="25" cy="10" r="3" fill="white" />
        <circle cx="35" cy="10" r="3" fill="white" />
        <circle cx="25" cy="10" r="1.5" fill="#222" />
        <circle cx="35" cy="10" r="1.5" fill="#222" />
        
        {/* Antennae */}
        <motion.path
          d="M26 5 Q22 -5 18 -8"
          stroke="#222"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          animate={{ d: ["M26 5 Q22 -5 18 -8", "M26 5 Q20 -3 16 -6", "M26 5 Q22 -5 18 -8"] }}
          transition={{ duration: 0.4, repeat: Infinity }}
        />
        <motion.path
          d="M34 5 Q38 -5 42 -8"
          stroke="#222"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          animate={{ d: ["M34 5 Q38 -5 42 -8", "M34 5 Q40 -3 44 -6", "M34 5 Q38 -5 42 -8"] }}
          transition={{ duration: 0.4, repeat: Infinity }}
        />
        <circle cx="18" cy="-8" r="2" fill="#222" />
        <circle cx="42" cy="-8" r="2" fill="#222" />
        
        {/* Legs */}
        <motion.g animate={{ rotate: [0, 5, 0, -5, 0] }} transition={{ duration: 0.15, repeat: Infinity }}>
          <line x1="8" y1="30" x2="0" y2="25" stroke="#222" strokeWidth="2" strokeLinecap="round" />
          <line x1="8" y1="45" x2="0" y2="45" stroke="#222" strokeWidth="2" strokeLinecap="round" />
          <line x1="8" y1="58" x2="0" y2="63" stroke="#222" strokeWidth="2" strokeLinecap="round" />
        </motion.g>
        <motion.g animate={{ rotate: [0, -5, 0, 5, 0] }} transition={{ duration: 0.15, repeat: Infinity }}>
          <line x1="52" y1="30" x2="60" y2="25" stroke="#222" strokeWidth="2" strokeLinecap="round" />
          <line x1="52" y1="45" x2="60" y2="45" stroke="#222" strokeWidth="2" strokeLinecap="round" />
          <line x1="52" y1="58" x2="60" y2="63" stroke="#222" strokeWidth="2" strokeLinecap="round" />
        </motion.g>
      </motion.svg>
    </motion.div>
  );
};

export default Ladybug;
