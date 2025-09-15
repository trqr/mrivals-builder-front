import Box from "@mui/material/Box";
import type {MatchUpType} from "../../@types/MatchUpType.ts";
import {imageBaseUrl} from "../../api/config/Axios.config.ts";
import type {HeroType} from "../../@types/HeroType";
import {useNavigate} from "react-router-dom";

interface AbilitiesProps {
    hero: HeroType;
}

const CountersHeroDetails = ({ hero }: AbilitiesProps) => {
    const navigate = useNavigate();

    return (
        <Box>
            <h2>Counters :</h2>
            <div className="counter-icons">
                {hero.matchUps?.length > 0 ? (
                    hero.matchUps.map((counter: MatchUpType) => (
                        <div
                            key={counter.id}
                            className="counter-item"
                            style={{cursor: "pointer"}}
                            title={`${counter.counterPick.name} (${counter.value})`}
                            onClick={() => navigate(`/heroDetails/${counter.counterPick.id}`)}
                        >
                            <img
                                src={imageBaseUrl + counter.counterPick.imageLink}
                                alt={counter.counterPick.name}
                            />
                        </div>
                    ))
                ) : (
                    <p>No counters found</p>
                )}
            </div>
        </Box>
    )
}

export default CountersHeroDetails;