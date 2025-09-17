import Box from "@mui/material/Box";
import affiche from "../../images/HomeEsport.webp";
import affiche2 from "../../images/HomeIker.jpg";
import affiche3 from "../../images/HomeSeason.webp";
import affiche4 from "../../images/NewChar.jpeg";
import SpotlightCard from "../common/cards/spotlightCard/SpotlightCard.tsx";

const ImageHome = () => {

    return (
        <SpotlightCard width={undefined}>
            <a href={"https://www.marvelrivals.com/match/"} target={"_blank"} rel={"noopener noreferrer"}>
                <img src={affiche} alt="affiche 1" className="affiche-img"
                     style={{
                         width: "400px",
                         height: "250px",
                     }} />
            </a>
            <a href={"https://www.youtube.com/watch?v=8DE2jlXwLyc"} target={"_blank"} rel={"noopener noreferrer"}>
                <img src={affiche2} alt="affiche 2" className="affiche-img"
                     style={{
                         width: "400px",
                         height:"250px",
                     }} />
            </a>
            <a href={"https://www.marvelrivals.com/index.html"} target={"_blank"} rel={"noopener noreferrer"}>
                <img src={affiche3} alt="affiche 3" className="affiche-img"
                     style={{
                         width: "400px",
                         height: "250px",
                     }}
                />
            </a>
            <a href={"https://www.youtube.com/watch?v=p2N2Cn-zQTw"} target="_blank" rel="noopener noreferrer">
                <img src={affiche4} alt="affiche 4" className="affiche-img"
                     style={{ width: "400px",
                         height:"250px",
                     }} />
            </a>
        </SpotlightCard>
    )
}

export default ImageHome;