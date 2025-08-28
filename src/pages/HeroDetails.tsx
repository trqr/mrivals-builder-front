import {useLoaderData} from "react-router-dom";
import {useTransition} from "react";
import "./HeroDetails.css";
import Header from "../componnents/header/Header.tsx";
import {iconBaseUrl, imageBaseUrl} from "../api/axios.config.ts";
import type {AbilitiesType} from "../@types/AbilitiesType";
import {parseCustomTags} from "../utils/strParser.ts";

const HeroDetails = () => {
    const [isPending, startTransition] = useTransition()
    const hero = useLoaderData();

    return (
        <>
            <Header></Header>
            <div className="heroDetails" style={{ marginTop: "66px" }}>
                <div className="leftColumn">
                    <div className="heroName">
                        <h1>{hero.name}</h1>
                        <h2>{hero.role}</h2>
                    </div>
                    <img className="image" src={imageBaseUrl + hero.imageLink} alt={hero.name} />
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
                        {hero.abilities?.map((ability: AbilitiesType, index: number) => (
                            <div key={index} className="ability">
                                <img src={iconBaseUrl+ability.icon}></img>
                                <h3>{ability.name}</h3>
                                <p dangerouslySetInnerHTML={{__html: parseCustomTags(ability.description)}}/>
                                <p>{ability.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
            </>
    );

};

export default HeroDetails;