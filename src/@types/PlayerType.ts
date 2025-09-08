import type {IconType} from "./IconType.ts";
import type {RankType} from "./RankType.ts";
import type {TeamType} from "./TeamType.ts";
import type {PlayerInfoType} from "./PlayerInfoType.ts";
import type {OverallStatsType} from "./OverallStatsType.ts";
import type {MatchHistoryType} from "./MatchHistoryType.ts";
import type {RankHistoryType} from "./RankHistoryType.ts";
import type {HeroMatchupsType} from "./HeroMatchupsType.ts";
import type {HeroesRankedType} from "./HeroesRankedType.ts";
import type {TeamMatesType} from "./TeamMatesType.ts";
import type {HeroesUnrankedType} from "./HeroesUnrankedType.ts";
import type {MapsType} from "./MapsType.ts";


export type PlayerType = {
    uid: number,
    level: number,
    name: string,
    icon: IconType[],
    rank: RankType[],
    team: TeamType[],
    info: PlayerInfoType[],
    isPrivate: boolean,
    overallStats: OverallStatsType[],
    matchHistory: MatchHistoryType[],
    rankHistory: RankHistoryType[],
    heroMatchups: HeroMatchupsType[],
    teamMates: TeamMatesType[],
    heroesRanked: HeroesRankedType[],
    heroesUnranked: HeroesUnrankedType[],
    maps: MapsType[],
}