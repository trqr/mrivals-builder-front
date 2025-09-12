import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {imageBaseUrl} from "../../api/config/Axios.config.ts";
import {startTransition, useEffect, useState} from "react";
import {useCompo} from "../../hooks/useCompo.tsx";
import {getTeamSynergie} from "../../api/Compo.api.ts";

const SynergiesTeam = () => {

    const [teamSynergies, setTeamSynergies] = useState<any[]>([]);
    const { compo } = useCompo();

    useEffect(() => {
        startTransition(async () => {
            if (compo.length > 0) {
                const heroesIds = compo.map((hero) => hero?.id);
                const fetchedTeamSynergies = await getTeamSynergie(heroesIds);

                setTeamSynergies(fetchedTeamSynergies);
            }
        })
    });

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Best Synergies
            </Typography>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "row" }}>
                {Array.isArray(teamSynergies) &&
                    teamSynergies.map((synergy) => (
                        <li
                            key={synergy.teamHeroId}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                marginBottom: "10px",
                            }}
                        >
                            <img
                                src={imageBaseUrl + synergy.imageLink}
                                alt={synergy.name}
                                style={{
                                    objectFit: "cover",
                                    objectPosition: "top",
                                    height: "80px",
                                    width: "80px",
                                    borderRadius: "5px",
                                    border: "3px solid blue",
                                    marginRight: "10px",
                                }}
                            />
                        </li>
                    ))}
            </ul>
        </Box>
    );
}

export default SynergiesTeam;