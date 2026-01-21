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
  const [background, setBackground] = useState<"water" | "grass" | "floor">("water");

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
      />
    </div>
  );
};

export default GameScreen;
