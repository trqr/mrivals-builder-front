import {useEffect, useState, useTransition} from "react";
import {useParams} from "react-router-dom";
import {getMapById} from "../api/Map.service.ts";
import type {MapType} from "../@types/MapType.d";
import {emptyMapType} from "../@types/MapType.d";
import {imageBaseUrl} from "../api/axios.config.ts";
import "./MapDetails.css"
import Page from "./layout/Page.tsx";

const MapDetails = () => {
    const [map, setMap] = useState<MapType>(emptyMapType)
    const [isPending, startTransition] = useTransition()
    const { id } = useParams<{id: string}>();

    useEffect(() => {
        startTransition(async () => {
            const fetchedMap = await getMapById(id!);
            setMap(fetchedMap);
        })
    }, [id])

    console.log(map.mapImages)
    return (
        <Page title={"Map details"} description={"Map details"}>
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