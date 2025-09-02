import type {AbilitiesType} from "./AbilitiesType";
import type {SynergieType} from "./SynergieType.ts";
import type {MatchUpType} from "./MatchUpType.ts";

export type HeroType = {
    id: number;
    externalId: number;
    name: string;
    imageLink: string;
    role: string;
    attackType: string;
    difficulty: number;
    bio: string;
    lore: string;
    winRate: number;
    abilities: AbilitiesType[];
    synergies: SynergieType[];
    matchUps: MatchUpType[]
}
export const emptyHeroType: HeroType = {
    id: 0,
    externalId: 0,
    name: "",
    imageLink: "",
    role: "",
    attackType: "",
    difficulty: 0,
    bio: "",
    lore: "",
    winRate: 0,
}