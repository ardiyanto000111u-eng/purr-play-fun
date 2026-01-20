import { useState } from "react";
import HomeScreen from "@/components/HomeScreen";
import GameScreen from "@/components/GameScreen";

type AnimalType = "fish" | "mouse" | "butterfly" | "laser" | "ladybug" | "bird";

const Index = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedAnimals, setSelectedAnimals] = useState<AnimalType[]>([]);

  const handleStartGame = (animals: AnimalType[]) => {
    setSelectedAnimals(animals);
    setIsPlaying(true);
  };

  const handleExitGame = () => {
    setIsPlaying(false);
    setSelectedAnimals([]);
  };

  if (isPlaying) {
    return <GameScreen selectedAnimals={selectedAnimals} onExit={handleExitGame} />;
  }

  return <HomeScreen onStartGame={handleStartGame} />;
};

export default Index;
