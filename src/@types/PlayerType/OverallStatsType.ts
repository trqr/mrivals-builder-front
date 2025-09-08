export type GameModeStats = {
    total_matches: number;
    total_wins: number;
    total_assists?: number;
    total_deaths?: number;
    total_kills?: number;
    total_time_played?: string;
    total_time_played_raw?: number;
    total_mvp?: number;
    total_svp?: number;
};

export type OverallStatsType = {
    total_matches: number;
    total_wins: number;
    unranked: GameModeStats;
    ranked: GameModeStats;
};
