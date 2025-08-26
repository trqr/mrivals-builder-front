export type MapType = {
    id: number;
    externalId: number;
    name: string;
    fullName: string;
    location: string;
    description: string;
    gameMode: string;
    competitive: boolean;
    videoLink: string;
    mapImages: {id: number, imageLink: string}[];
}
export const emptyMapType: MapType = {
    id: 0,
    externalId: 0,
    name: "",
    fullName: "",
    location: "",
    description: "",
    gameMode: "",
    competitive: false,
    videoLink: "",
    mapImages: []
}