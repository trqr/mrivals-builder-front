import type {HeroSummaryType} from "./HeroSummaryType.ts";

export type SynergieType = {
    id: number;
    heroId: number;
    ally: HeroSummaryType;
    value: number;
    isTeamUp: boolean;
}