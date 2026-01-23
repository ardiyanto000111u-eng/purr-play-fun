import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  speed: number;
  onSpeedChange: (value: number) => void;
  background: "water" | "grass" | "floor" | "custom";
  onBackgroundChange: (bg: "water" | "grass" | "floor" | "custom") => void;
  customColor: string;
  onCustomColorChange: (color: string) => void;
}

const backgrounds: { id: "water" | "grass" | "floor"; emoji: string; name: string }[] = [
  { id: "water", emoji: "🌊", name: "Water" },
  { id: "grass", emoji: "🌿", name: "Grass" },
  { id: "floor", emoji: "🪵", name: "Floor" },
];

const colorPresets = [
  { color: "#1e3a5f", name: "Deep Blue" },
  { color: "#2d1b4e", name: "Purple" },
  { color: "#1a1a2e", name: "Dark Night" },
  { color: "#4a1942", name: "Magenta" },
  { color: "#0d3b3b", name: "Teal" },
  { color: "#3d2914", name: "Brown" },
  { color: "#1f1f1f", name: "Charcoal" },
  { color: "#2e4a3f", name: "Forest" },
];

const SettingsPanel = ({
  isOpen,
  onClose,
  speed,
  onSpeedChange,
  background,
  onBackgroundChange,
  customColor,
  onCustomColorChange,
}: SettingsPanelProps) => {
  if (!isOpen) return null;

  const handleColorSelect = (color: string) => {
    onCustomColorChange(color);
    onBackgroundChange("custom");
  };

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
        className="bg-card rounded-3xl p-6 w-full max-w-md shadow-playful max-h-[90vh] overflow-y-auto"
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
        <div className="mb-8">
          <span className="font-body font-semibold text-foreground block mb-4">Theme Background</span>
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

        {/* Custom color picker */}
        <div>
          <span className="font-body font-semibold text-foreground block mb-4">🎨 Custom Color</span>
          
          {/* Color presets */}
          <div className="grid grid-cols-4 gap-3 mb-4">
            {colorPresets.map((preset) => (
              <button
                key={preset.color}
                onClick={() => handleColorSelect(preset.color)}
                className={`w-full aspect-square rounded-xl transition-all ${
                  background === "custom" && customColor === preset.color
                    ? "ring-4 ring-primary ring-offset-2 ring-offset-card scale-110"
                    : "hover:scale-105"
                }`}
                style={{ backgroundColor: preset.color }}
                title={preset.name}
              />
            ))}
          </div>

          {/* Custom color input */}
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={customColor}
              onChange={(e) => handleColorSelect(e.target.value)}
              className="w-12 h-12 rounded-xl cursor-pointer border-2 border-muted"
            />
            <div className="flex-1">
              <span className="text-sm text-muted-foreground block">Pick any color</span>
              <span className="font-mono text-foreground">{customColor.toUpperCase()}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SettingsPanel;
