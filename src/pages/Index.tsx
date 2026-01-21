import { useState, useRef, useCallback } from "react";
import HomeScreen from "@/components/HomeScreen";
import GameScreen from "@/components/GameScreen";
import StatsScreen from "@/components/StatsScreen";
import { useStats, AnimalType } from "@/hooks/useStats";

const Index = () => {
  const [screen, setScreen] = useState<"home" | "game" | "stats">("home");
  const [selectedAnimals, setSelectedAnimals] = useState<AnimalType[]>([]);
  const sessionStartRef = useRef<number>(0);
  const sessionCatchesRef = useRef<Record<AnimalType, number>>({
    fish: 0, mouse: 0, butterfly: 0, laser: 0, ladybug: 0, bird: 0, spider: 0, fly: 0, gecko: 0,
  });
  
  const { stats, recordCatch, startSession, endSession, getFavoriteAnimal } = useStats();

  const handleStartGame = (animals: AnimalType[]) => {
    setSelectedAnimals(animals);
    sessionStartRef.current = startSession();
    sessionCatchesRef.current = {
      fish: 0, mouse: 0, butterfly: 0, laser: 0, ladybug: 0, bird: 0, spider: 0, fly: 0, gecko: 0,
    };
    setScreen("game");
  };

  const handleCatch = useCallback((animalType: AnimalType) => {
    recordCatch(animalType);
    sessionCatchesRef.current[animalType]++;
  }, [recordCatch]);

  const handleExitGame = () => {
    if (sessionStartRef.current > 0) {
      endSession(sessionStartRef.current, sessionCatchesRef.current);
    }
    setScreen("home");
    setSelectedAnimals([]);
  };

  if (screen === "stats") {
    return (
      <StatsScreen
        stats={stats}
        favoriteAnimal={getFavoriteAnimal()}
        onBack={() => setScreen("home")}
      />
    );
  }

  if (screen === "game") {
    return (
      <GameScreen
        selectedAnimals={selectedAnimals}
        onExit={handleExitGame}
        onCatch={handleCatch}
      />
    );
  }

  return (
    <HomeScreen
      onStartGame={handleStartGame}
      onOpenStats={() => setScreen("stats")}
    />
  );
};

export default Index;
