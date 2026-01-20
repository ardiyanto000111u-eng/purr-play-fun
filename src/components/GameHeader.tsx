import { motion } from "framer-motion";
import { X, Volume2, VolumeX, Settings } from "lucide-react";

interface GameHeaderProps {
  catchCount: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenSettings: () => void;
  onExit: () => void;
}

const GameHeader = ({ 
  catchCount, 
  soundEnabled, 
  onToggleSound, 
  onOpenSettings, 
  onExit 
}: GameHeaderProps) => {
  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 z-50 p-4 flex items-center justify-between"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5 }}
    >
      {/* Exit button */}
      <motion.button
        onClick={onExit}
        whileTap={{ scale: 0.9 }}
        className="w-12 h-12 rounded-full bg-card/90 backdrop-blur shadow-soft flex items-center justify-center"
      >
        <X className="w-6 h-6 text-foreground" />
      </motion.button>

      {/* Catch counter */}
      <motion.div 
        className="px-6 py-3 rounded-full bg-card/90 backdrop-blur shadow-soft flex items-center gap-3"
        animate={catchCount > 0 ? { scale: [1, 1.1, 1] } : {}}
        key={catchCount}
      >
        <span className="text-2xl">🐾</span>
        <span className="font-display font-bold text-2xl text-foreground">{catchCount}</span>
      </motion.div>

      {/* Controls */}
      <div className="flex gap-2">
        <motion.button
          onClick={onToggleSound}
          whileTap={{ scale: 0.9 }}
          className="w-12 h-12 rounded-full bg-card/90 backdrop-blur shadow-soft flex items-center justify-center"
        >
          {soundEnabled ? (
            <Volume2 className="w-5 h-5 text-foreground" />
          ) : (
            <VolumeX className="w-5 h-5 text-muted-foreground" />
          )}
        </motion.button>
        
        <motion.button
          onClick={onOpenSettings}
          whileTap={{ scale: 0.9 }}
          className="w-12 h-12 rounded-full bg-card/90 backdrop-blur shadow-soft flex items-center justify-center"
        >
          <Settings className="w-5 h-5 text-foreground" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default GameHeader;
