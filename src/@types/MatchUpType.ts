import type {HeroSummaryType} from "./HeroSummaryType.ts";

export type MatchUpType = {
    id: number;
    heroId: number;
    counterPick: HeroSummaryType;
    value: string;
}