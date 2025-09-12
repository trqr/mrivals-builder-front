import type {SynergieType} from "../../@types/SynergieType.ts";
import {imageBaseUrl} from "../../api/config/Axios.config.ts";
import type {HeroType} from "../../@types/HeroType";
import {useNavigate} from "react-router";
import Box from "@mui/material/Box";

interface AbilitiesProps {
    hero: HeroType;
}

const SynergiesHeroDetails = ({ hero }: AbilitiesProps) => {
    const navigate = useNavigate();

    return (
        <Box>
            <h2>Synergies :</h2>
            <div className="synergy-icons">
                {hero.synergies?.length > 0 ? (
                    hero.synergies.map((synergy: SynergieType) => (
                        <div
                            key={synergy.id}
                            className={`synergy-item ${synergy.isTeamUp ? "teamup" : "ally"}`}
                            style={{cursor: "pointer"}}
                            title={synergy.isTeamUp ? `${synergy.ally.name} (Team Up)` : synergy.ally.name}
                            onClick={() => navigate(`/heroDetails/${synergy.ally.id}`)}
                        >
                            <img
                                src={imageBaseUrl + synergy.ally.imageLink}
                                alt={synergy.ally.name}
                            />
                        </div>
                    ))
                ) : (
                    <p>No synergies found</p>
                )}
            </div>
        </Box>
    )
}

export default SynergiesHeroDetails;