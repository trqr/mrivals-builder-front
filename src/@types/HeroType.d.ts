import type {AbilitiesType} from "./AbilitiesType";

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