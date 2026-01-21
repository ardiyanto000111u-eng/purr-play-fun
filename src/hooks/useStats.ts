import { useState, useEffect, useCallback } from "react";

type AnimalType = "fish" | "mouse" | "butterfly" | "laser" | "ladybug" | "bird";

interface PlaySession {
  date: string;
  duration: number; // in seconds
  catches: Record<AnimalType, number>;
  totalCatches: number;
}

interface Stats {
  sessions: PlaySession[];
  currentStreak: number;
  longestStreak: number;
  totalPlayTime: number;
  totalCatches: number;
  catchesByAnimal: Record<AnimalType, number>;
  lastPlayDate: string | null;
}

const STORAGE_KEY = "kittenplay-stats";

const getDefaultStats = (): Stats => ({
  sessions: [],
  currentStreak: 0,
  longestStreak: 0,
  totalPlayTime: 0,
  totalCatches: 0,
  catchesByAnimal: {
    fish: 0,
    mouse: 0,
    butterfly: 0,
    laser: 0,
    ladybug: 0,
    bird: 0,
  },
  lastPlayDate: null,
});

const getToday = () => new Date().toISOString().split("T")[0];

const getDaysBetween = (date1: string, date2: string) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
};

export const useStats = () => {
  const [stats, setStats] = useState<Stats>(getDefaultStats);

  // Load stats from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setStats(parsed);
      } catch (e) {
        console.error("Failed to parse stats:", e);
      }
    }
  }, []);

  // Save stats to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  }, [stats]);

  const recordCatch = useCallback((animalType: AnimalType) => {
    setStats((prev) => ({
      ...prev,
      totalCatches: prev.totalCatches + 1,
      catchesByAnimal: {
        ...prev.catchesByAnimal,
        [animalType]: prev.catchesByAnimal[animalType] + 1,
      },
    }));
  }, []);

  const startSession = useCallback(() => {
    const today = getToday();
    
    setStats((prev) => {
      let newStreak = prev.currentStreak;
      
      // Update streak
      if (prev.lastPlayDate) {
        const daysSince = getDaysBetween(prev.lastPlayDate, today);
        if (daysSince === 1) {
          newStreak = prev.currentStreak + 1;
        } else if (daysSince > 1) {
          newStreak = 1;
        }
        // If same day, keep streak
      } else {
        newStreak = 1;
      }

      return {
        ...prev,
        currentStreak: newStreak,
        longestStreak: Math.max(prev.longestStreak, newStreak),
        lastPlayDate: today,
      };
    });

    return Date.now();
  }, []);

  const endSession = useCallback((startTime: number, sessionCatches: Record<AnimalType, number>) => {
    const duration = Math.floor((Date.now() - startTime) / 1000);
    const totalSessionCatches = Object.values(sessionCatches).reduce((a, b) => a + b, 0);
    
    const session: PlaySession = {
      date: getToday(),
      duration,
      catches: sessionCatches,
      totalCatches: totalSessionCatches,
    };

    setStats((prev) => ({
      ...prev,
      sessions: [...prev.sessions, session].slice(-30), // Keep last 30 sessions
      totalPlayTime: prev.totalPlayTime + duration,
    }));

    return session;
  }, []);

  const getFavoriteAnimal = useCallback((): AnimalType | null => {
    const { catchesByAnimal } = stats;
    let maxCatches = 0;
    let favorite: AnimalType | null = null;

    (Object.entries(catchesByAnimal) as [AnimalType, number][]).forEach(([animal, count]) => {
      if (count > maxCatches) {
        maxCatches = count;
        favorite = animal;
      }
    });

    return favorite;
  }, [stats]);

  const getSessionsToday = useCallback(() => {
    const today = getToday();
    return stats.sessions.filter((s) => s.date === today);
  }, [stats.sessions]);

  const getRecentSessions = useCallback((days: number = 7) => {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    const cutoffStr = cutoff.toISOString().split("T")[0];
    return stats.sessions.filter((s) => s.date >= cutoffStr);
  }, [stats.sessions]);

  return {
    stats,
    recordCatch,
    startSession,
    endSession,
    getFavoriteAnimal,
    getSessionsToday,
    getRecentSessions,
  };
};

export type { PlaySession, Stats, AnimalType };
