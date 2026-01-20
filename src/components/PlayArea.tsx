import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Fish from "./animals/Fish";
import Mouse from "./animals/Mouse";
import Butterfly from "./animals/Butterfly";
import { playFishSound, playMouseSound, playButterflySound, playCatchSound } from "@/utils/sounds";

type AnimalType = "fish" | "mouse" | "butterfly";

interface Animal {
  id: string;
  type: AnimalType;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  color?: string;
  direction: number; // angle in radians
}

interface PlayAreaProps {
  selectedAnimals: AnimalType[];
  speed: number;
  background: "water" | "grass" | "floor";
  soundEnabled: boolean;
  onCatch: () => void;
}

const backgrounds = {
  water: "bg-gradient-to-b from-blue-600 to-blue-800",
  grass: "bg-gradient-to-b from-green-600 to-green-800",
  floor: "bg-gradient-to-b from-amber-600 to-amber-800",
};

const fishColors = ["#FF7B54", "#FFB26B", "#FF6B6B", "#4ECDC4", "#45B7D1"];
const butterflyColors = ["#FFD93D", "#FF6B9D", "#C44EFF", "#4ECDC4", "#FF8C42"];

const PlayArea = ({ selectedAnimals, speed, background, soundEnabled, onCatch }: PlayAreaProps) => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [catchEffects, setCatchEffects] = useState<{ id: string; x: number; y: number }[]>([]);
  const animationRef = useRef<number>();

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

  const getRandomPosition = useCallback((padding = 80) => {
    return {
      x: Math.random() * (dimensions.width - padding * 2) + padding,
      y: Math.random() * (dimensions.height - padding * 2) + padding,
    };
  }, [dimensions]);

  const createAnimal = useCallback((type: AnimalType): Animal => {
    const pos = getRandomPosition();
    const target = getRandomPosition();
    return {
      id: `${type}-${Date.now()}-${Math.random()}`,
      type,
      x: pos.x,
      y: pos.y,
      targetX: target.x,
      targetY: target.y,
      direction: Math.atan2(target.y - pos.y, target.x - pos.x),
      color: type === "fish" 
        ? fishColors[Math.floor(Math.random() * fishColors.length)]
        : type === "butterfly"
        ? butterflyColors[Math.floor(Math.random() * butterflyColors.length)]
        : undefined,
    };
  }, [getRandomPosition]);

  // Initialize animals
  useEffect(() => {
    if (dimensions.width === 0) return;
    
    const initialAnimals: Animal[] = [];
    selectedAnimals.forEach(type => {
      for (let i = 0; i < 3; i++) {
        initialAnimals.push(createAnimal(type));
      }
    });
    setAnimals(initialAnimals);
  }, [selectedAnimals, dimensions.width, createAnimal]);

  // Smooth animation loop
  useEffect(() => {
    if (dimensions.width === 0 || animals.length === 0) return;

    const moveSpeed = {
      fish: 1.5 * speed,
      mouse: 3 * speed,
      butterfly: 2 * speed,
    };

    const animate = () => {
      setAnimals(prevAnimals => 
        prevAnimals.map(animal => {
          const dx = animal.targetX - animal.x;
          const dy = animal.targetY - animal.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // If close to target, pick a new target
          if (distance < 20) {
            const newTarget = getRandomPosition();
            return {
              ...animal,
              targetX: newTarget.x,
              targetY: newTarget.y,
              direction: Math.atan2(newTarget.y - animal.y, newTarget.x - animal.x),
            };
          }

          // Move towards target with type-specific speed
          const animalSpeed = moveSpeed[animal.type];
          const angle = Math.atan2(dy, dx);
          
          // Add some wobble based on animal type
          let wobble = 0;
          if (animal.type === "butterfly") {
            wobble = Math.sin(Date.now() / 200) * 2;
          } else if (animal.type === "fish") {
            wobble = Math.sin(Date.now() / 300) * 1;
          }

          const newX = animal.x + Math.cos(angle) * animalSpeed + Math.cos(angle + Math.PI/2) * wobble;
          const newY = animal.y + Math.sin(angle) * animalSpeed + Math.sin(angle + Math.PI/2) * wobble;

          // Keep within bounds
          const padding = 60;
          const boundedX = Math.max(padding, Math.min(dimensions.width - padding, newX));
          const boundedY = Math.max(padding, Math.min(dimensions.height - padding, newY));

          return {
            ...animal,
            x: boundedX,
            y: boundedY,
            direction: angle,
          };
        })
      );

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions, speed, getRandomPosition, animals.length]);

  const handleCatch = (animal: Animal) => {
    onCatch();
    
    // Play animal-specific sound
    if (soundEnabled) {
      switch (animal.type) {
        case "fish":
          playFishSound();
          break;
        case "mouse":
          playMouseSound();
          break;
        case "butterfly":
          playButterflySound();
          break;
      }
      playCatchSound();
    }
    
    // Add catch effect
    setCatchEffects(prev => [...prev, { id: animal.id, x: animal.x, y: animal.y }]);
    setTimeout(() => {
      setCatchEffects(prev => prev.filter(e => e.id !== animal.id));
    }, 500);

    // Remove caught animal and add new one after a delay
    setAnimals(prev => {
      const filtered = prev.filter(a => a.id !== animal.id);
      setTimeout(() => {
        setAnimals(current => [...current, createAnimal(animal.type)]);
      }, 800);
      return filtered;
    });
  };

  const renderAnimal = (animal: Animal) => {
    const props = {
      key: animal.id,
      x: animal.x,
      y: animal.y,
      direction: animal.direction,
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
