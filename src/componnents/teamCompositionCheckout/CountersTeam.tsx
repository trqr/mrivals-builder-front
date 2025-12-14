import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {imageBaseUrl} from "../../api/config/Axios.config.ts";
import {startTransition, useEffect, useState} from "react";
import {getTeamCounter} from "../../api/Compo.api.ts";
import type {HeroType} from "../../@types/HeroType";

type CountersTeamProps = {
    heroes: HeroType[];
};

const CountersTeam = ({heroes}: CountersTeamProps) => {
    const [teamCounters, setTeamCounters] = useState<any[]>([]);


    useEffect(() => {
        startTransition(async () => {
            if (heroes.length > 0) {
                const heroesIds = heroes.map((hero) => hero?.id);
                const fetchedTeamCounter = await getTeamCounter(heroesIds);

                setTeamCounters(fetchedTeamCounter);
            }
        })
    }, [heroes])

    return (
        <Box>
            <Typography variant="h6" textAlign={"center"} gutterBottom>
                Best Counters
            </Typography>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "row", justifyContent: "center",
                flexWrap: "wrap"
            }}>
                {teamCounters.map((counter) => (
                    <li
                        key={counter.enemyHeroId}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "10px",
                        }}
                    >
                        <img
                            src={imageBaseUrl + counter.imageLink}
                            alt={counter.name}
                            style={{
                                objectFit: "cover",
                                objectPosition: "top",
                                height: "60px",
                                width: "60px",
                                borderRadius: "5px",
                                border: "3px solid violet",
                                marginRight: "10px",
                            }}
                        />
                    </li>
                ))}
            </ul>
        </Box>
    )
}

export default CountersTeam;