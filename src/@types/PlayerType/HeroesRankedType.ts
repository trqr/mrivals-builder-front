export type MainAttack = {
    total: number;
    hits: number;
};

export type HeroRanked = {
    hero_id: number;
    hero_name: string;
    hero_thumbnail: string;
    matches: number;
    wins: number;
    mvp: number;
    svp: number;
    kills: number;
    deaths: number;
    assists: number;
    play_time: number; // en secondes
    damage: number;
    heal: number;
    damage_taken: number;
    main_attack: MainAttack;
};

export type HeroesRankedType = HeroRanked[];
