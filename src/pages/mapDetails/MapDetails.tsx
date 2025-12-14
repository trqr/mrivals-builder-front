import {useLoaderData} from "react-router-dom";
import {imageBaseUrl} from "../../api/config/Axios.config.ts";
import "./MapDetails.css"
import Page from "../layout/Page.tsx";
import {Grid} from "@mui/material";

const MapDetails = () => {
    const map = useLoaderData();

    return (
        <Page title={"Map details"} description={"Map details"}>
            <Grid container className="mapDetails" spacing={2} sx={{justifyContent: "center", pl: 1, pr: 1}}>
                <Grid size={{xs: 12, md: 4, lg: 4, xl: 4}} className="leftColumn">
                    <div className="mapName">
                        <h1>{map.name}</h1>
                        <h2>{map.fullName ?? "Nom complet indisponible"}</h2>
                    </div>
                </Grid>

                <Grid size={{xs: 12, md: 4, lg: 4, xl: 4}} className="centerColumn">
                    <div className="mapLore">
                        <h2>Description :</h2>
                        <p>{map.description}</p>
                        <h2>Location :</h2>
                        <p>{map.location}</p>
                    </div>
                </Grid>

                <Grid size={{xs: 12, md: 4, lg: 4, xl: 4}} className="rightColumn">
                    {map?.mapImages?.length > 0 && (
                        <img
                            className="mapImage"
                            src={imageBaseUrl + map.mapImages[1].imageLink}
                            alt={map.name}
                        />

                    )}
                    <div className="mapMode">
                        <p>Mode de jeu : {map.gameMode ?? "Non défini"}</p>
                        <p>Compétitif : {map.competitive ? "Oui" : "Non"}</p>
                    </div>
                </Grid>
            </Grid>

        </Page>
    )
}

export default MapDetails;