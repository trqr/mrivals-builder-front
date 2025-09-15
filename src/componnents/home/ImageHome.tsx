import Box from "@mui/material/Box";
import affiche from "../../images/HomeEsport.webp";
import affiche2 from "../../images/HomeIker.webp";
import affiche3 from "../../images/HomeSeason.webp";
import affiche4 from "../../images/HomeAzha.webp";

const ImageHome = () => {

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 2,
                justifyItems: "center",
                border: "solid 2px #FDDE2B",
                padding: "30px",
                transform: "skew(-11deg)"
            }}
        >
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
        </Box>
    )
}

export default ImageHome;