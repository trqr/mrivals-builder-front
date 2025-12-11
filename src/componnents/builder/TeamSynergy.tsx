import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {imageBaseUrl} from "../../api/config/Axios.config.ts";
import {startTransition, useEffect, useState} from "react";
import {useCompo} from "../../hooks/useCompo.tsx";
import {getTeamSynergie} from "../../api/Compo.api.ts";

const TeamSynergy = () => {
    const [teamSynergies, setTeamSynergies] = useState<any[]>([]);
    const {compo} = useCompo();

    useEffect(() => {
        startTransition(async () => {
            const heroesIds = compo.map((hero) => hero?.id);
            if (compo.length > 0) {
                const fetchedTeamSynergies = await getTeamSynergie(heroesIds);

                setTeamSynergies(fetchedTeamSynergies);
            }

        })
    },[compo])

    return (
        <Box>
            <Typography variant="h6" textAlign={"center"} gutterBottom>
                Best Synergies
            </Typography>
            <ul style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px"
            }}>
                {Array.isArray(teamSynergies) &&
                    teamSynergies.slice(0, 2).map((synergy) => (
                        <li
                            key={synergy.teamHeroId}
                            style={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <img
                                src={imageBaseUrl + synergy.imageLink}
                                alt={synergy.name}
                                style={{
                                    objectFit: "cover",
                                    objectPosition: "top",
                                    height: "60px",
                                    width: "60px",
                                    borderRadius: "5px",
                                    border: "2px solid blue",
                                }}
                            />
                        </li>
                    ))}
            </ul>
        </Box>
    )
}

export default TeamSynergy;