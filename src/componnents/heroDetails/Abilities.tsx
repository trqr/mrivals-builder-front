import {Box, Grid, Tooltip} from "@mui/material";
import type {AbilitiesType} from "../../@types/AbilitiesType";
import {iconBaseUrl} from "../../api/config/Axios.config.ts";
import {parseCustomTags} from "../../utils/strParser.ts";
import {useState} from "react";
import type {HeroType} from "../../@types/HeroType";

interface AbilitiesProps {
    hero: HeroType;
}

const Abilities = ({ hero }: AbilitiesProps) => {
    const [activeAbility, setActiveAbility] = useState<AbilitiesType | null>(null);

    return (
        <Box>
        <div className="abilities">
            <h2>Abilities :</h2>
            <div className="ability-icons">
                <Grid container spacing={2}>

                    {hero.abilities?.map((ability: AbilitiesType, index: number) => (
                        <Grid
                            key={index}
                        >
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
        </Box>
    );
};

export default Abilities;