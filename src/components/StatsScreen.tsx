import { motion } from "framer-motion";
import { ArrowLeft, Flame, Trophy, Clock, Target, Star } from "lucide-react";
import { Stats, AnimalType } from "@/hooks/useStats";

interface StatsScreenProps {
  stats: Stats;
  favoriteAnimal: AnimalType | null;
  onBack: () => void;
}

const animalEmojis: Record<AnimalType, string> = {
  fish: "🐟",
  mouse: "🐭",
  butterfly: "🦋",
  laser: "🔴",
  ladybug: "🐞",
  bird: "🐦",
};

const animalNames: Record<AnimalType, string> = {
  fish: "Fish",
  mouse: "Mouse",
  butterfly: "Butterfly",
  laser: "Laser",
  ladybug: "Ladybug",
  bird: "Bird",
};

const formatTime = (seconds: number) => {
  if (seconds < 60) return `${seconds}s`;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins < 60) return `${mins}m ${secs}s`;
  const hours = Math.floor(mins / 60);
  const remainingMins = mins % 60;
  return `${hours}h ${remainingMins}m`;
};

const StatsScreen = ({ stats, favoriteAnimal, onBack }: StatsScreenProps) => {
  const sortedAnimals = Object.entries(stats.catchesByAnimal)
    .sort(([, a], [, b]) => b - a)
    .filter(([, count]) => count > 0) as [AnimalType, number][];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border"
      >
        <div className="flex items-center justify-between px-4 py-4">
          <button
            onClick={onBack}
            className="p-2 rounded-full hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </button>
          <h1 className="font-display font-bold text-xl text-foreground">
            Play Stats
          </h1>
          <div className="w-10" />
        </div>
      </motion.div>

      <div className="px-4 py-6 space-y-6 max-w-lg mx-auto">
        {/* Streak Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/20 rounded-full">
              <Flame className="w-6 h-6 text-primary" />
            </div>
            <h2 className="font-display font-bold text-lg text-foreground">
              Play Streak
            </h2>
          </div>
          <div className="flex justify-around text-center">
            <div>
              <p className="text-4xl font-display font-extrabold text-primary">
                {stats.currentStreak}
              </p>
              <p className="text-sm text-muted-foreground font-body">
                Current
              </p>
            </div>
            <div className="w-px bg-border" />
            <div>
              <p className="text-4xl font-display font-extrabold text-accent">
                {stats.longestStreak}
              </p>
              <p className="text-sm text-muted-foreground font-body">
                Best
              </p>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats Grid */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 gap-4"
        >
          <div className="bg-card rounded-2xl p-4 shadow-soft">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-secondary" />
              <span className="text-sm text-muted-foreground font-body">
                Total Play Time
              </span>
            </div>
            <p className="text-2xl font-display font-bold text-foreground">
              {formatTime(stats.totalPlayTime)}
            </p>
          </div>
          <div className="bg-card rounded-2xl p-4 shadow-soft">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground font-body">
                Total Catches
              </span>
            </div>
            <p className="text-2xl font-display font-bold text-foreground">
              {stats.totalCatches}
            </p>
          </div>
          <div className="bg-card rounded-2xl p-4 shadow-soft">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-4 h-4 text-accent" />
              <span className="text-sm text-muted-foreground font-body">
                Sessions
              </span>
            </div>
            <p className="text-2xl font-display font-bold text-foreground">
              {stats.sessions.length}
            </p>
          </div>
          <div className="bg-card rounded-2xl p-4 shadow-soft">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-kitten-sun" />
              <span className="text-sm text-muted-foreground font-body">
                Favorite
              </span>
            </div>
            <p className="text-2xl font-display font-bold text-foreground">
              {favoriteAnimal ? animalEmojis[favoriteAnimal] : "—"}
            </p>
          </div>
        </motion.div>

        {/* Catches by Animal */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-3xl p-6 shadow-soft"
        >
          <h2 className="font-display font-bold text-lg text-foreground mb-4">
            Catches by Animal
          </h2>
          {sortedAnimals.length > 0 ? (
            <div className="space-y-3">
              {sortedAnimals.map(([animal, count], index) => {
                const maxCount = sortedAnimals[0][1];
                const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;
                
                return (
                  <motion.div
                    key={animal}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <span className="text-2xl w-8 text-center">
                      {animalEmojis[animal]}
                    </span>
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-body text-foreground">
                          {animalNames[animal]}
                        </span>
                        <span className="font-display font-bold text-foreground">
                          {count}
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ delay: 0.5 + index * 0.05, duration: 0.5 }}
                          className={`h-full rounded-full ${
                            index === 0 ? "bg-primary" : "bg-secondary"
                          }`}
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-muted-foreground font-body py-4">
              No catches yet! Start playing to see your stats.
            </p>
          )}
        </motion.div>

        {/* Recent Sessions */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-card rounded-3xl p-6 shadow-soft"
        >
          <h2 className="font-display font-bold text-lg text-foreground mb-4">
            Recent Sessions
          </h2>
          {stats.sessions.length > 0 ? (
            <div className="space-y-3">
              {stats.sessions
                .slice(-5)
                .reverse()
                .map((session, index) => (
                  <motion.div
                    key={`${session.date}-${index}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    className="flex items-center justify-between py-2 border-b border-border last:border-0"
                  >
                    <div>
                      <p className="font-body text-foreground text-sm">
                        {new Date(session.date).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatTime(session.duration)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-display font-bold text-foreground">
                        {session.totalCatches}
                      </p>
                      <p className="text-xs text-muted-foreground">catches</p>
                    </div>
                  </motion.div>
                ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground font-body py-4">
              No sessions yet! Start playing to track your progress.
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default StatsScreen;
