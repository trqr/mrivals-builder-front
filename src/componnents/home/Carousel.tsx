import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import affiche from "../../assets/images/HomeEsport.webp";
import affiche2 from "../../assets/images/HomeIker.jpg";
import affiche3 from "../../assets/images/HomeSeason.webp";
import affiche4 from "../../assets/images/NewChar.jpeg";
import Box from "@mui/material/Box";


export default function HomeCarousel() {
    const slides = [
        { src: affiche, alt: "Marvel Rivals Esport Tournament", link: "https://www.marvelrivals.com/match/", },
        { src: affiche2, alt: "Iker Casillas Partnership", link: "https://www.youtube.com/watch?v=bqPIioDA79E", },
        { src: affiche3, alt: "New Season Announcement", link: "https://www.marvelrivals.com/index.html", },
        { src: affiche4, alt: "New Character Reveal", link: "https://www.youtube.com/watch?v=WVc4uTJmKy4", },
    ];
    return (
        <Box className="max-w-[1000px] mx-auto">
            <Carousel showThumbs={false} showStatus={false} infiniteLoop autoPlay
                interval={4000} stopOnHover swipeable emulateTouch
                dynamicHeight={false}
                renderItem={(slide) => slide}>
                {slides.map((slide, index) => (
                    <Box key={index}>
                        <a key={index} href={slide.link} target="_blank" rel="noopener noreferrer"
                            style={{ display: "block" }}>
                            <img
                                src={slide.src}
                                alt={slide.alt}
                                loading={index === 0 ? "eager" : "lazy"}
                                fetchPriority={index === 0 ? "high" : "auto"}
                                style={{
                                    objectFit: "contain",
                                    height: "100%",
                                    width: "100%",
                                }} />
                        </a>
                    </Box>))}
            </Carousel>
        </Box>);
}
