import {useEffect, useState, useTransition} from "react";
import {useParams} from "react-router-dom";
import {getMapById} from "../api/Map.service.ts";
import type {MapType} from "../@types/MapType.d";
import {emptyMapType} from "../@types/MapType.d";
import NavBar from "../componnents/header/NavBar.tsx";
import {imageBaseUrl} from "../api/axios.config.ts";

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
        <>
            <NavBar></NavBar>
            <div className="mapDetails" style={{marginTop: "67px"}}>
                <div className="leftColumn">
                    <h1>{map.name}</h1>
                    <h2>{map.fullName}</h2>
                </div>
                <div className="rightColumn">
                    {map?.mapImages?.length > 0 && (
                        <img
                            src={imageBaseUrl + map.mapImages[1].imageLink}
                            alt={map.name}
                        />
                    )}
                </div>


            </div>
        </>
    )
}

export default MapDetails;