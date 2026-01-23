import { useState, useEffect } from "react";

type BackgroundType = "water" | "grass" | "floor" | "custom";

interface GamePreferences {
  speed: number;
  background: BackgroundType;
  customColor: string;
  soundEnabled: boolean;
}

const STORAGE_KEY = "kitten-play-preferences";

const defaultPreferences: GamePreferences = {
  speed: 1,
  background: "water",
  customColor: "#1e3a5f",
  soundEnabled: true,
};

export const useGamePreferences = () => {
  const [preferences, setPreferences] = useState<GamePreferences>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...defaultPreferences, ...JSON.parse(stored) };
      }
    } catch (e) {
      console.warn("Failed to load preferences:", e);
    }
    return defaultPreferences;
  });

  // Save to localStorage whenever preferences change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    } catch (e) {
      console.warn("Failed to save preferences:", e);
    }
  }, [preferences]);

  const updatePreference = <K extends keyof GamePreferences>(
    key: K,
    value: GamePreferences[K]
  ) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };

  const resetPreferences = () => {
    setPreferences(defaultPreferences);
  };

  return {
    preferences,
    updatePreference,
    resetPreferences,
  };
};
