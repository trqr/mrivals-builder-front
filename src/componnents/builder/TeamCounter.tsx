import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {imageBaseUrl} from "../../api/config/Axios.config.ts";
import {startTransition, useEffect, useState} from "react";
import {useCompo} from "../../hooks/useCompo.tsx";
import {getTeamCounter} from "../../api/Compo.api.ts";

const TeamCounter = () => {
    const [teamCounters, setTeamCounters] = useState<any[]>([]);
    const {compo} = useCompo();

    useEffect(() => {
        startTransition(async () => {
            const heroesIds = compo.map((hero) => hero?.id);
            if (compo.length > 0) {
                const fetchedTeamCounters = await getTeamCounter(heroesIds);

                setTeamCounters(fetchedTeamCounters);
            }
        })
    }, [compo]);

    return (
        <Box>
            <Typography variant="h6" textAlign={"center"} gutterBottom>
                Best Counters
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
                {teamCounters.slice(0, 2).map((counter) => (
                    <li
                        key={counter.enemyHeroId}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
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
                                border: "2px solid violet",
                            }}
                        />
                    </li>
                ))}
            </ul>
        </Box>
    )
}

export default TeamCounter;