import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  speed: number;
  onSpeedChange: (value: number) => void;
  background: "water" | "grass" | "floor";
  onBackgroundChange: (bg: "water" | "grass" | "floor") => void;
}

const backgrounds: { id: "water" | "grass" | "floor"; emoji: string; name: string }[] = [
  { id: "water", emoji: "🌊", name: "Water" },
  { id: "grass", emoji: "🌿", name: "Grass" },
  { id: "floor", emoji: "🪵", name: "Floor" },
];

const SettingsPanel = ({
  isOpen,
  onClose,
  speed,
  onSpeedChange,
  background,
  onBackgroundChange,
}: SettingsPanelProps) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-foreground/50 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-card rounded-3xl p-6 w-full max-w-md shadow-playful"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-bold text-2xl text-foreground">Settings</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Speed control */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="font-body font-semibold text-foreground">Speed</span>
            <span className="text-muted-foreground">
              {speed <= 0.5 ? "🐢 Slow" : speed <= 1 ? "🐈 Normal" : "⚡ Fast"}
            </span>
          </div>
          <Slider
            value={[speed]}
            onValueChange={([v]) => onSpeedChange(v)}
            min={0.3}
            max={2}
            step={0.1}
            className="w-full"
          />
        </div>

        {/* Background selection */}
        <div>
          <span className="font-body font-semibold text-foreground block mb-4">Background</span>
          <div className="grid grid-cols-3 gap-3">
            {backgrounds.map((bg) => (
              <button
                key={bg.id}
                onClick={() => onBackgroundChange(bg.id)}
                className={`p-4 rounded-2xl transition-all ${
                  background === bg.id
                    ? "bg-primary shadow-playful"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                <span className="text-3xl block mb-2">{bg.emoji}</span>
                <span className={`text-sm font-semibold ${
                  background === bg.id ? "text-primary-foreground" : "text-foreground"
                }`}>
                  {bg.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SettingsPanel;
