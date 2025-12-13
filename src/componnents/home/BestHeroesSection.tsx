import { useData } from "../../hooks/useData.tsx";
import type { HeroType } from "../../@types/HeroType";
import { Grid } from "@mui/material";
import TiltedCard from "./TiltedCard.tsx";
import { imageBaseUrl } from "../../api/config/Axios.config.ts";

const BestHeroesSection = () => {
    const { bestHeroes } = useData();

    return (
        <Grid container spacing={2}>

            {bestHeroes.map((hero: HeroType) => (
                <Grid size={{
                    xs: 6,
                    sm: 6,
                    md: 2,
                    lg: 2,
                }} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <TiltedCard
                        imageSrc={imageBaseUrl + hero.imageLink}
                        altText={hero.name}
                        captionText={hero.name}
                        containerHeight="225px"
                        containerWidth="125px"
                        imageHeight="225px"
                        imageWidth="125px"
                        rotateAmplitude={20}
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
