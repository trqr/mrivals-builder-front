export type HeroMatchup = {
    hero_id: number;
    hero_name: string;
    hero_class: string;
    hero_thumbnail: string;
    matches: number;
    wins: number;
    win_rate: string; // peut rester string si tu veux afficher "40.00%" directement
};

export type HeroMatchupsType = HeroMatchup[];
