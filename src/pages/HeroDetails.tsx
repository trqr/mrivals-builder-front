import {useLoaderData} from "react-router-dom";
import {useState, useTransition} from "react";
import "./HeroDetails.css";
import Header from "../componnents/header/Header.tsx";
import {iconBaseUrl, imageBaseUrl} from "../api/axios.config.ts";
import type {AbilitiesType} from "../@types/AbilitiesType";
import {parseCustomTags} from "../utils/strParser.ts";
import Box from "@mui/material/Box";
import {Grid, Popover, Stack, Tooltip} from "@mui/material";

const HeroDetails = () => {
    const [isPending, startTransition] = useTransition();
    const hero = useLoaderData();
    const [activeAbility, setActiveAbility] = useState<AbilitiesType | null>(null);

    return (
        <>
            <Header/>
            <div className="heroDetails">
                <div className="leftColumn">
                    <div className="heroName">
                        <h1>{hero.name}</h1>
                        <h2>{hero.role}</h2>
                    </div>
                    <img
                        className="image"
                        src={imageBaseUrl + hero.imageLink}
                        alt={hero.name}
                    />
                </div>

                <div className="centerColumn">
                    <div className="heroLore">
                        <h2>Lore :</h2>
                        <p>{hero.lore}</p>
                        <h2>Bio :</h2>
                        <p>{hero.bio}</p>
                    </div>
                </div>

                <div className="rightColumn">
                    <div className="abilities">
                        <h2>Abilities :</h2>
                        <div className="ability-icons">
                            <Grid container spacing={2}>

                                {hero.abilities?.map((ability: AbilitiesType, index: number) => (
                                    <Grid key={index}>
                                        <Tooltip title={ability.name} followCursor>

                                            <img
                                                src={iconBaseUrl + ability.icon}
                                                alt={ability.name}
                                                onClick={() => setActiveAbility(ability)}
                                                style={{cursor: "pointer", transition: "scale","&:hover": { scale: 0.5 }}}
                                            />

                                        </Tooltip>
                                    </Grid>
                                ))}
                            </Grid>

                        </div>
                    </div>
                    {activeAbility && (
                        <div className="ability-description">
                            <h3>{activeAbility.name}</h3>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: parseCustomTags(activeAbility.description),
                                }}
                            />
                        </div>
                    )}

                </div>
            </div>
        </>
    );
};

export default HeroDetails;

