import {useLoaderData} from "react-router-dom";
import {imageBaseUrl} from "../../api/config/Axios.config.ts";
import "./MapDetails.css"
import Page from "../layout/Page.tsx";
import {LinearProgress} from "@mui/material";
import {useTransition} from "react";

const MapDetails = () => {
    const map = useLoaderData();
    const [isPending, startTransition] = useTransition()

    return (
        <Page title={"Map details"} description={"Map details"}>
            <LinearProgress sx={{height: "2px"}} variant={isPending ? "indeterminate" : "determinate"}/>
            <div className="mapDetails">
                <div className="leftColumn">
                    <div className="mapName">
                        <h1>{map.name}</h1>
                        <h2>{map.fullName ?? "Nom complet indisponible"}</h2>
                    </div>
                </div>

                <div className="centerColumn">
                    <div className="mapLore">
                        <h2>Description :</h2>
                        <p>{map.description}</p>
                        <h2>Location :</h2>
                        <p>{map.location}</p>
                    </div>
                </div>

                <div className="rightColumn">
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
                </div>
            </div>

        </Page>
    )
}

export default MapDetails;