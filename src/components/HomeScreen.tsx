import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Info, BarChart2 } from "lucide-react";
import AnimalSelector from "./AnimalSelector";

type AnimalType = "fish" | "mouse" | "butterfly" | "laser" | "ladybug" | "bird" | "spider" | "fly" | "gecko";

interface HomeScreenProps {
  onStartGame: (animals: AnimalType[]) => void;
  onOpenStats: () => void;
}

const HomeScreen = ({ onStartGame, onOpenStats }: HomeScreenProps) => {
  const [selectedAnimals, setSelectedAnimals] = useState<AnimalType[]>(["fish"]);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  const toggleAnimal = (animal: AnimalType) => {
    setSelectedAnimals((prev) => {
      if (prev.includes(animal)) {
        if (prev.length === 1) return prev; // Keep at least one selected
        return prev.filter((a) => a !== animal);
      }
      return [...prev, animal];
    });
  };

  const handleStart = () => {
    if (selectedAnimals.length > 0) {
      onStartGame(selectedAnimals);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero Section */}
      <motion.div 
        className="flex-1 flex flex-col items-center justify-center px-6 py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Logo / Title */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-10"
        >
          <motion.div 
            className="text-7xl mb-4"
            animate={{ rotate: [-5, 5, -5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🐱
          </motion.div>
          <h1 className="font-display font-extrabold text-5xl md:text-6xl text-foreground mb-2">
            Kitten<span className="text-primary">Play</span>
          </h1>
          <p className="text-muted-foreground font-body text-lg">
            Interactive fun for your furry friend
          </p>
        </motion.div>

        {/* Animal Selection */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="w-full max-w-md mb-10"
        >
          <h2 className="font-display font-bold text-xl text-foreground text-center mb-4">
            Choose Animals
          </h2>
          <AnimalSelector
            selected={selectedAnimals}
            onToggle={toggleAnimal}
          />
        </motion.div>

        {/* Play Button */}
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          onClick={handleStart}
          disabled={selectedAnimals.length === 0}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full max-w-xs py-5 px-8 rounded-full bg-primary shadow-playful text-primary-foreground font-display font-bold text-2xl flex items-center justify-center gap-3 disabled:opacity-50"
        >
          <Play className="w-8 h-8 fill-current" />
          Start Playing!
        </motion.button>

        {/* Bottom buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 flex items-center gap-6"
        >
          <button
            onClick={onOpenStats}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <BarChart2 className="w-4 h-4" />
            <span className="text-sm font-body">Play Stats</span>
          </button>
          <button
            onClick={() => setShowDisclaimer(true)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Info className="w-4 h-4" />
            <span className="text-sm font-body">Safety Info</span>
          </button>
        </motion.div>
      </motion.div>

      {/* Decorative paw prints */}
      <div className="absolute bottom-4 left-4 text-4xl opacity-10">🐾</div>
      <div className="absolute top-20 right-8 text-3xl opacity-10 rotate-45">🐾</div>
      <div className="absolute top-40 left-12 text-2xl opacity-10 -rotate-12">🐾</div>

      {/* Disclaimer Modal */}
      {showDisclaimer && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-foreground/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowDisclaimer(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-card rounded-3xl p-6 max-w-md shadow-playful"
          >
            <div className="text-center mb-4">
              <span className="text-5xl">⚠️</span>
            </div>
            <h3 className="font-display font-bold text-xl text-foreground text-center mb-4">
              Safety First!
            </h3>
            <p className="text-muted-foreground font-body text-center mb-6 leading-relaxed">
              KittenPlay is for <strong>entertainment and enrichment only</strong>. 
              Always supervise your pet during play. This app makes no medical or behavioral claims.
            </p>
            <button
              onClick={() => setShowDisclaimer(false)}
              className="w-full py-3 rounded-full bg-primary text-primary-foreground font-display font-bold"
            >
              Got it! 🐱
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default HomeScreen;
