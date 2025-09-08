export type MapStats = {
    map_id: number;
    map_thumbnail: string;
    matches: number;
    wins: number;
    kills: number;
    deaths: number;
    assists: number;
    play_time: number; // en secondes
};

export type MapsType = MapStats[];
