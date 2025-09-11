import { useState } from "react";
import type {HeroType} from "../../@types/HeroType";
import type {AbilitiesType} from "../../@types/AbilitiesType";
import {iconBaseUrl} from "../../api/config/Axios.config.ts";
import {parseCustomTags} from "../../utils/strParser.ts";

export default function Abilities({ hero }: { hero: HeroType }) {
    const [activeAbility, setActiveAbility] = useState<number | null>(null);

    const handleClick = (index: number) => {
        setActiveAbility(activeAbility === index ? null : index);
        // si on reclique sur la même, ça referme
    };

    return (
        <div className="abilities">
            <h2>Abilities :</h2>
            {hero.abilities?.map((ability: AbilitiesType, index: number) => (
                <div key={index} className="ability">
                    <img
                        src={iconBaseUrl + ability.icon}
                        alt={ability.name}
                        onClick={() => handleClick(index)}
                        style={{ cursor: "pointer" }}
                    />
                    <h3>{ability.name}</h3>

                    {activeAbility === index && (
                        <p
                            dangerouslySetInnerHTML={{
                                __html: parseCustomTags(ability.description),
                            }}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}
