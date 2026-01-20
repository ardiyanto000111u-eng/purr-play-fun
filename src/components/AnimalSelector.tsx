import { motion } from "framer-motion";
import { Check } from "lucide-react";

type AnimalType = "fish" | "mouse" | "butterfly";

interface AnimalSelectorProps {
  selected: AnimalType[];
  onToggle: (animal: AnimalType) => void;
  isPremium?: boolean;
}

const animals: { type: AnimalType; emoji: string; name: string; premium: boolean }[] = [
  { type: "fish", emoji: "🐟", name: "Fish", premium: false },
  { type: "mouse", emoji: "🐭", name: "Mouse", premium: false },
  { type: "butterfly", emoji: "🦋", name: "Butterfly", premium: false },
];

const AnimalSelector = ({ selected, onToggle, isPremium = true }: AnimalSelectorProps) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {animals.map((animal, index) => {
        const isSelected = selected.includes(animal.type);
        const isLocked = animal.premium && !isPremium;

        return (
          <motion.button
            key={animal.type}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => !isLocked && onToggle(animal.type)}
            disabled={isLocked}
            className={`relative p-6 rounded-3xl transition-all duration-300 ${
              isSelected
                ? "bg-primary shadow-playful scale-105"
                : "bg-card hover:bg-muted shadow-soft"
            } ${isLocked ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          >
            {isSelected && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-2 right-2 w-6 h-6 rounded-full bg-accent flex items-center justify-center"
              >
                <Check className="w-4 h-4 text-accent-foreground" />
              </motion.div>
            )}
            
            <motion.span 
              className="text-5xl block mb-3"
              animate={isSelected ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              {animal.emoji}
            </motion.span>
            
            <span className={`font-display font-bold text-lg ${
              isSelected ? "text-primary-foreground" : "text-foreground"
            }`}>
              {animal.name}
            </span>

            {isLocked && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-3xl">
                <span className="text-2xl">🔒</span>
              </div>
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

export default AnimalSelector;
