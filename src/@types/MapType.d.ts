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