import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import affiche from "../../images/HomeEsport.webp";
import affiche2 from "../../images/HomeIker.jpg";
import affiche3 from "../../images/HomeSeason.webp";
import affiche4 from "../../images/NewChar.jpeg";
import Box from "@mui/material/Box";


export default function HomeCarousel() {
    const slides = [
        {src: affiche, alt: "affiche 1", link: "https://www.marvelrivals.com/match/",},
        {src: affiche2, alt: "affiche 2", link: "https://www.youtube.com/watch?v=bqPIioDA79E",},
        {src: affiche3, alt: "affiche 3", link: "https://www.marvelrivals.com/index.html",},
        {src: affiche4, alt: "affiche 4", link: "https://www.youtube.com/watch?v=WVc4uTJmKy4",},
    ];
    return (
        <Box className="max-w-[1000px] mx-auto">
            <Carousel showThumbs={false} showStatus={false} infiniteLoop autoPlay
                                                           interval={4000} stopOnHover swipeable emulateTouch
                                                           dynamicHeight={false}
                                                           renderItem={(slide, props) => slide}>
                {slides.map((slide, index) => (
            <Box key={index}>
                <a key={index} href={slide.link} target="_blank" rel="noopener noreferrer"
                                 style={{display: "block"}}>
                    <img src={slide.src} alt={slide.alt} style={{
                    objectFit: "contain",
                    height: "100%",
                    width: "100%",
                    }}/>
                </a>
            </Box>))}
        </Carousel>
        </Box>);
}