import { useState, useCallback } from "react";
import PlayArea from "./PlayArea";
import GameHeader from "./GameHeader";
import SettingsPanel from "./SettingsPanel";

type AnimalType = "fish" | "mouse" | "butterfly" | "laser" | "ladybug" | "bird" | "spider" | "fly" | "gecko";

interface GameScreenProps {
  selectedAnimals: AnimalType[];
  onExit: () => void;
  onCatch: (animalType: AnimalType) => void;
}

const GameScreen = ({ selectedAnimals, onExit, onCatch }: GameScreenProps) => {
  const [catchCount, setCatchCount] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [background, setBackground] = useState<"water" | "grass" | "floor" | "custom">("water");
  const [customColor, setCustomColor] = useState("#1e3a5f");

  const handleCatch = useCallback((animalType: AnimalType) => {
    setCatchCount((prev) => prev + 1);
    onCatch(animalType);
  }, [onCatch]);

  return (
    <div className="fixed inset-0 overflow-hidden">
      <PlayArea
        selectedAnimals={selectedAnimals}
        speed={speed}
        background={background}
        customColor={customColor}
        soundEnabled={soundEnabled}
        onCatch={handleCatch}
      />

      <GameHeader
        catchCount={catchCount}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
        onOpenSettings={() => setSettingsOpen(true)}
        onExit={onExit}
      />

      <SettingsPanel
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        speed={speed}
        onSpeedChange={setSpeed}
        background={background}
        onBackgroundChange={setBackground}
        customColor={customColor}
        onCustomColorChange={setCustomColor}
      />
    </div>
  );
};

export default GameScreen;
