import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {imageBaseUrl} from "../../api/config/Axios.config.ts";
import {startTransition, useEffect, useState} from "react";
import {getTeamSynergie} from "../../api/Compo.api.ts";
import type {HeroType} from "../../@types/HeroType";

type SynergiesTeamProps = {
    heroes: HeroType[];
};

const SynergiesTeam = ({heroes}: SynergiesTeamProps) => {

    const [teamSynergies, setTeamSynergies] = useState<any[]>([]);

    useEffect(() => {
        startTransition(async () => {
            if (heroes.length > 0) {
                const heroesIds = heroes.map((hero) => hero?.id);
                const fetchedTeamSynergies = await getTeamSynergie(heroesIds);

                setTeamSynergies(fetchedTeamSynergies);
            }
        })
    }, [heroes]);

    return (
        <Box>
            <Typography variant="h6" textAlign={"center"} gutterBottom>
                Best Synergies
            </Typography>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "row", justifyContent: "center" }}>
                {Array.isArray(teamSynergies) &&
                    teamSynergies.map((synergy) => (
                        <li
                            key={synergy.id}
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
                                    height: "60px",
                                    width: "60px",
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