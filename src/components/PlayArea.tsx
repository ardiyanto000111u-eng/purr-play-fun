import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Fish from "./animals/Fish";
import Mouse from "./animals/Mouse";
import Butterfly from "./animals/Butterfly";
import LaserDot from "./animals/LaserDot";
import Ladybug from "./animals/Ladybug";
import Bird from "./animals/Bird";
import Spider from "./animals/Spider";
import Fly from "./animals/Fly";
import Gecko from "./animals/Gecko";
import { 
  playFishSound, 
  playMouseSound, 
  playButterflySound, 
  playLaserSound,
  playLadybugSound,
  playBirdSound,
  playSpiderSound,
  playFlySound,
  playGeckoSound,
  playCatchSound 
} from "@/utils/sounds";

type AnimalType = "fish" | "mouse" | "butterfly" | "laser" | "ladybug" | "bird" | "spider" | "fly" | "gecko";

interface Animal {
  id: string;
  type: AnimalType;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  color?: string;
  direction: number;
}

interface PlayAreaProps {
  selectedAnimals: AnimalType[];
  speed: number;
  background: "water" | "grass" | "floor" | "custom";
  customColor?: string;
  soundEnabled: boolean;
  onCatch: (animalType: AnimalType) => void;
}

const backgrounds = {
  water: "bg-gradient-to-b from-blue-600 to-blue-800",
  grass: "bg-gradient-to-b from-green-600 to-green-800",
  floor: "bg-gradient-to-b from-amber-600 to-amber-800",
  custom: "",
};

const fishColors = ["#FF7B54", "#FFB26B", "#FF6B6B", "#4ECDC4", "#45B7D1"];
const butterflyColors = ["#FFD93D", "#FF6B9D", "#C44EFF", "#4ECDC4", "#FF8C42"];
const birdColors = ["#5DADE2", "#58D68D", "#F4D03F", "#EC7063", "#AF7AC5"];
const geckoColors = ["#5DBE5D", "#7CB342", "#8BC34A", "#AED581", "#C5E1A5"];

// Helper to darken a hex color
const adjustColor = (hex: string, amount: number): string => {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.max(0, Math.min(255, (num >> 16) + amount));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) + amount));
  const b = Math.max(0, Math.min(255, (num & 0x0000ff) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
};

const PlayArea = ({ selectedAnimals, speed, background, customColor, soundEnabled, onCatch }: PlayAreaProps) => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [catchEffects, setCatchEffects] = useState<{ id: string; x: number; y: number }[]>([]);
  const [isPortrait, setIsPortrait] = useState(false);
  const animationRef = useRef<number>();

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setIsPortrait(height > width);
      setDimensions({ width, height });
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
        : type === "bird"
        ? birdColors[Math.floor(Math.random() * birdColors.length)]
        : type === "gecko"
        ? geckoColors[Math.floor(Math.random() * geckoColors.length)]
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

    const moveSpeed: Record<AnimalType, number> = {
      fish: 1.5 * speed,
      mouse: 3 * speed,
      butterfly: 2 * speed,
      laser: 5 * speed,
      ladybug: 1.8 * speed,
      bird: 2.5 * speed,
      spider: 2.2 * speed,
      fly: 3.5 * speed,
      gecko: 2 * speed,
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
          } else if (animal.type === "laser") {
            wobble = Math.sin(Date.now() / 50) * 4;
          } else if (animal.type === "bird") {
            wobble = Math.sin(Date.now() / 250) * 1.5;
          } else if (animal.type === "fly") {
            wobble = Math.sin(Date.now() / 40) * 3;
          } else if (animal.type === "spider") {
            wobble = Math.sin(Date.now() / 150) * 0.5;
          } else if (animal.type === "gecko") {
            wobble = Math.sin(Date.now() / 400) * 1;
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
    onCatch(animal.type);
    
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
        case "laser":
          playLaserSound();
          break;
        case "ladybug":
          playLadybugSound();
          break;
        case "bird":
          playBirdSound();
          break;
        case "spider":
          playSpiderSound();
          break;
        case "fly":
          playFlySound();
          break;
        case "gecko":
          playGeckoSound();
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
      case "laser":
        return <LaserDot {...props} />;
      case "ladybug":
        return <Ladybug {...props} />;
      case "bird":
        return <Bird {...props} color={animal.color} />;
      case "spider":
        return <Spider {...props} />;
      case "fly":
        return <Fly {...props} />;
      case "gecko":
        return <Gecko {...props} color={animal.color} />;
    }
  };

  const customStyle = background === "custom" && customColor ? {
    background: `linear-gradient(to bottom, ${customColor}, ${adjustColor(customColor, -30)})`,
  } : {};

  return (
    <div 
      className={`fixed inset-0 ${backgrounds[background]} overflow-hidden touch-none`}
      style={customStyle}
    >
      {/* Portrait mode overlay - prompt to rotate */}
      {isPortrait && (
        <div className="absolute inset-0 bg-black/80 z-50 flex flex-col items-center justify-center text-white">
          <motion.div
            animate={{ rotate: [0, -90, -90, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            className="text-6xl mb-6"
          >
            📱
          </motion.div>
          <p className="text-xl font-semibold mb-2">Rotate Your Device</p>
          <p className="text-white/70 text-sm">Turn to landscape mode for the best experience</p>
        </div>
      )}

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
