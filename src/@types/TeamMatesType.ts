export type PlayerInfo = {
    nick_name: string;
    player_icon: string;
    player_uid: number;
};

export type TeamMate = {
    player_info: PlayerInfo;
    matches: number;
    wins: number;
    win_rate: string; // reste string pour afficher directement "49.12"
};

export type TeamMatesType = TeamMate[];
