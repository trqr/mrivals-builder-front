import { useData } from "../../hooks/useData.tsx";
import {useEffect, useState} from "react";
import { getBestWinRateByRole } from "../../api/Compo.api.ts";
import type { HeroType } from "../../@types/HeroType";
import {useLoading} from "../../hooks/useLoading.tsx";
import {Grid} from "@mui/material";
import TiltedCard from "./TiltedCard.tsx";
import {imageBaseUrl} from "../../api/config/Axios.config.ts";

const BestHeroesSection = () => {
    const { heroes } = useData();
    const [bestHeroes, setBestHeroes] = useState<HeroType[]>([]);
    const { startTransition } = useLoading();

    useEffect(() => {
        startTransition(async () => {
            const heroesIds = heroes.map((hero) => hero?.id);
            const fetchedBestHeroes = await getBestWinRateByRole(heroesIds);

            const flattenedHeroes = await fetchedBestHeroes.flatMap((group) => group.heroes);
            setBestHeroes(flattenedHeroes);
            console.log(fetchedBestHeroes);
            console.log("flattened heroes", flattenedHeroes);
        });
    }, []);

    return (
        <Grid container spacing={2}>

            {bestHeroes.map((hero: HeroType) => (
            <Grid size={{
                xs: 6,
                sm: 6,
                md: 4,
                lg: 4,
            }}>
                <TiltedCard
                    imageSrc={imageBaseUrl + hero.imageLink}
                    altText={hero.name}
                    captionText={hero.name}
                    containerHeight="250px"
                    containerWidth="150px"
                    imageHeight="250px"
                    imageWidth="150px"
                    rotateAmplitude={12}
                    scaleOnHover={1.2}
                    showMobileWarning={false}
                    showTooltip={true}
                    displayOverlayContent={true}
                    overlayContent={
                        <p className="tilted-card-demo-text">
                            Winrate : {(hero.winRate * 100).toFixed(1)}%
                        </p>
                    }
                />
            </Grid>
            ))}

        </Grid>

    );
};

export default BestHeroesSection;
