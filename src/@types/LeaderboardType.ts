import type {HeroSummaryType} from "./HeroSummaryType.ts";

export type LeaderboardType = {
    hero?: HeroSummaryType;
    players: LeaderboardPlayerType[];
};

export type LeaderboardPlayerType = {
    id: number;
    name: string;
    icon: string;
    rankScore: number;
    maxRankScore: number;
    seasonWinCount: number;
    heroId: number;
    heroMatches: number;
    heroWins: number;
    heroKills: number;
    heroDeaths: number;
    heroAssists: number;
    heroMvps: number;
    heroSvps: number;
}
