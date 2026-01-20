import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Fish from "./animals/Fish";
import Mouse from "./animals/Mouse";
import Butterfly from "./animals/Butterfly";

type AnimalType = "fish" | "mouse" | "butterfly";

interface Animal {
  id: string;
  type: AnimalType;
  x: number;
  y: number;
  color?: string;
}

interface PlayAreaProps {
  selectedAnimals: AnimalType[];
  speed: number;
  background: "water" | "grass" | "floor";
  onCatch: () => void;
}

const backgrounds = {
  water: "bg-gradient-to-b from-kitten-sky to-kitten-water",
  grass: "bg-gradient-to-b from-kitten-grass to-emerald-600",
  floor: "bg-gradient-to-b from-amber-100 to-amber-200",
};

const fishColors = ["#FF7B54", "#FFB26B", "#FF6B6B", "#4ECDC4", "#45B7D1"];
const butterflyColors = ["#FFD93D", "#FF6B9D", "#C44EFF", "#4ECDC4", "#FF8C42"];

const PlayArea = ({ selectedAnimals, speed, background, onCatch }: PlayAreaProps) => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [catchEffects, setCatchEffects] = useState<{ id: string; x: number; y: number }[]>([]);

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const createAnimal = useCallback((type: AnimalType): Animal => {
    const padding = 100;
    return {
      id: `${type}-${Date.now()}-${Math.random()}`,
      type,
      x: Math.random() * (dimensions.width - padding * 2) + padding,
      y: Math.random() * (dimensions.height - padding * 2) + padding,
      color: type === "fish" 
        ? fishColors[Math.floor(Math.random() * fishColors.length)]
        : type === "butterfly"
        ? butterflyColors[Math.floor(Math.random() * butterflyColors.length)]
        : undefined,
    };
  }, [dimensions]);

  useEffect(() => {
    if (dimensions.width === 0) return;
    
    const initialAnimals: Animal[] = [];
    selectedAnimals.forEach(type => {
      for (let i = 0; i < 3; i++) {
        initialAnimals.push(createAnimal(type));
      }
    });
    setAnimals(initialAnimals);
  }, [selectedAnimals, dimensions, createAnimal]);

  useEffect(() => {
    if (dimensions.width === 0) return;
    
    const interval = setInterval(() => {
      setAnimals(prev => 
        prev.map(animal => ({
          ...animal,
          x: Math.max(50, Math.min(dimensions.width - 100, 
            animal.x + (Math.random() - 0.5) * 100 * speed)),
          y: Math.max(50, Math.min(dimensions.height - 100, 
            animal.y + (Math.random() - 0.5) * 80 * speed)),
        }))
      );
    }, 2000 / speed);

    return () => clearInterval(interval);
  }, [dimensions, speed]);

  const handleCatch = (animal: Animal) => {
    onCatch();
    
    // Add catch effect
    setCatchEffects(prev => [...prev, { id: animal.id, x: animal.x, y: animal.y }]);
    setTimeout(() => {
      setCatchEffects(prev => prev.filter(e => e.id !== animal.id));
    }, 500);

    // Remove caught animal and add new one
    setAnimals(prev => {
      const filtered = prev.filter(a => a.id !== animal.id);
      return [...filtered, createAnimal(animal.type)];
    });
  };

  const renderAnimal = (animal: Animal) => {
    const props = {
      key: animal.id,
      x: animal.x,
      y: animal.y,
      onCatch: () => handleCatch(animal),
    };

    switch (animal.type) {
      case "fish":
        return <Fish {...props} color={animal.color} />;
      case "mouse":
        return <Mouse {...props} />;
      case "butterfly":
        return <Butterfly {...props} color={animal.color} />;
    }
  };

  return (
    <div className={`fixed inset-0 ${backgrounds[background]} overflow-hidden touch-none`}>
      {/* Decorative elements based on background */}
      {background === "water" && (
        <>
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/10"
              style={{
                width: 10 + Math.random() * 20,
                height: 10 + Math.random() * 20,
                left: `${Math.random() * 100}%`,
                bottom: -50,
              }}
              animate={{
                y: [-50, -dimensions.height - 50],
                opacity: [0.3, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 4,
              }}
            />
          ))}
        </>
      )}

      {background === "grass" && (
        <>
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-green-800/30 rounded-full"
              style={{
                width: 3,
                height: 20 + Math.random() * 30,
                left: `${Math.random() * 100}%`,
                bottom: 0,
                transformOrigin: "bottom",
              }}
              animate={{ rotate: [-5, 5, -5] }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </>
      )}

      {/* Animals */}
      <AnimatePresence>
        {animals.map(renderAnimal)}
      </AnimatePresence>

      {/* Catch effects */}
      <AnimatePresence>
        {catchEffects.map(effect => (
          <motion.div
            key={effect.id}
            className="absolute pointer-events-none"
            style={{ left: effect.x, top: effect.y }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-16 h-16 rounded-full bg-kitten-sun/50 blur-sm" />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl">
              ✨
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default PlayArea;
