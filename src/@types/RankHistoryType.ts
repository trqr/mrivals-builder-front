export type LevelProgression = {
    from: number;
    to: number;
};

export type ScoreProgression = {
    add_score: number;
    total_score: number;
};

export type RankHistoryItem = {
    match_time_stamp: number; // timestamp UNIX
    level_progression: LevelProgression;
    score_progression: ScoreProgression;
};

export type RankHistoryType = RankHistoryItem[];
