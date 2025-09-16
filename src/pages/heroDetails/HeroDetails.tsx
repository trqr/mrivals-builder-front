import {useLoaderData} from "react-router-dom";
import "./HeroDetails.css";
import { imageBaseUrl} from "../../api/config/Axios.config.ts";
import Page from "../layout/Page.tsx";
import Abilities from "../../componnents/heroDetails/Abilities.tsx";
import SynergiesHeroDetails from "../../componnents/heroDetails/SynergiesHeroDetails.tsx";
import CountersHeroDetails from "../../componnents/heroDetails/CountersHeroDetails.tsx";
import HeroName from "../../componnents/heroDetails/HeroName.tsx";

const HeroDetails = () => {
    const hero = useLoaderData();

    return (
        <Page title={"Hero details"} description={"Hero details"}>
            <div className="heroDetails">
                <div className="leftColumn">
                    <div className="heroName">
                        <HeroName hero={hero}/>
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
                    <div className="synergies">
                        <SynergiesHeroDetails hero={hero}/>
                    </div>
                </div>

                <div className="rightColumn">
                    <Abilities hero={hero}/>
                    <div className="counters">
                       <CountersHeroDetails hero={hero}/>
                    </div>
                </div>
            </div>
        </Page>
    );
};

export default HeroDetails;

