import { useState, useCallback } from "react";
import PlayArea from "./PlayArea";
import GameHeader from "./GameHeader";
import SettingsPanel from "./SettingsPanel";
import { useGamePreferences } from "@/hooks/useGamePreferences";

type AnimalType = "fish" | "mouse" | "butterfly" | "laser" | "ladybug" | "bird" | "spider" | "fly" | "gecko";

interface GameScreenProps {
  selectedAnimals: AnimalType[];
  onExit: () => void;
  onCatch: (animalType: AnimalType) => void;
}

const GameScreen = ({ selectedAnimals, onExit, onCatch }: GameScreenProps) => {
  const { preferences, updatePreference } = useGamePreferences();
  const [catchCount, setCatchCount] = useState(0);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleCatch = useCallback((animalType: AnimalType) => {
    setCatchCount((prev) => prev + 1);
    onCatch(animalType);
  }, [onCatch]);

  return (
    <div className="fixed inset-0 overflow-hidden">
      <PlayArea
        selectedAnimals={selectedAnimals}
        speed={preferences.speed}
        background={preferences.background}
        customColor={preferences.customColor}
        soundEnabled={preferences.soundEnabled}
        onCatch={handleCatch}
      />

      <GameHeader
        catchCount={catchCount}
        soundEnabled={preferences.soundEnabled}
        onToggleSound={() => updatePreference("soundEnabled", !preferences.soundEnabled)}
        onOpenSettings={() => setSettingsOpen(true)}
        onExit={onExit}
      />

      <SettingsPanel
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        speed={preferences.speed}
        onSpeedChange={(v) => updatePreference("speed", v)}
        background={preferences.background}
        onBackgroundChange={(bg) => updatePreference("background", bg)}
        customColor={preferences.customColor}
        onCustomColorChange={(c) => updatePreference("customColor", c)}
      />
    </div>
  );
};

export default GameScreen;
