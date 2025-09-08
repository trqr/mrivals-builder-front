import type { RankGameSeasonType } from "./RankGameSeasonType.ts";

export type PlayerInfoType = {
    completedAchievements: number;
    loginOs: string;
    rank_game_season: Record<string, RankGameSeasonType>;
}