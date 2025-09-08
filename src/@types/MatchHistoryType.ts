export type PlayerPerformance = {
    player_uid: number;
    hero_id: number;
    hero_name: string;
    hero_type: string;
    kills: number;
    deaths: number;
    assists: number;
    is_win: {
        score: number;
        is_win: boolean;
    };
    disconnected: boolean;
    camp: number;
    score_change: number;
    level: number;
    new_level: number;
    new_score: number;
};

export type ScoreInfo = Record<0 | 1, number>;

export type MatchHistoryItem = {
    match_uid: string;
    map_id: number;
    map_thumbnail: string;
    duration: number; // en secondes
    season: number;
    winner_side: number;
    mvp_uid: number;
    svp_uid: number;
    match_time_stamp: number; // timestamp UNIX
    play_mode_id: number;
    game_mode_id: number;
    score_info: ScoreInfo;
    player_performance: PlayerPerformance;
};

export type MatchHistoryType = MatchHistoryItem[];
