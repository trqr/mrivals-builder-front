import {useLoaderData, useParams} from "react-router-dom";
import {getHeroes} from "../api/Hero.service.ts";
import {useEffect, useState, useTransition} from "react";
import type {HeroType} from "../@types/HeroType.d";
import {emptyHeroType} from "../@types/HeroType.d";
import "./HeroDetails.css";
import NavBar from "../componnents/header/NavBar.tsx";
import {imageBaseUrl} from "../api/axios.config.ts";

const HeroDetails = () => {
    const [isPending, startTransition] = useTransition()
    const hero = useLoaderData();

    return (
        <>
            <NavBar></NavBar>
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
                        {hero.abilities?.map((ability, index) => (
                            <div key={index} className="ability">
                                <h3>{ability.name}</h3>
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