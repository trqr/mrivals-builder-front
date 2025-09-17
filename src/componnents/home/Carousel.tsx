import { Carousel } from "react-bootstrap";
import affiche from "../../images/HomeEsport.webp";
import affiche2 from "../../images/HomeIker.jpg";
import affiche3 from "../../images/HomeSeason.webp";
import affiche4 from "../../images/NewChar.jpeg";

export default function HomeCarousel() {
    const slides = [
        {
            src: affiche,
            alt: "affiche 1",
            link: "https://www.marvelrivals.com/match/",
        },
        {
            src: affiche2,
            alt: "affiche 2",
            link: "https://www.youtube.com/watch?v=bqPIioDA79E",
        },
        {
            src: affiche3,
            alt: "affiche 3",
            link: "https://www.marvelrivals.com/index.html",
        },
        {
            src: affiche4,
            alt: "affiche 4",
            link: "https://www.youtube.com/watch?v=WVc4uTJmKy4",
        },
    ];

    return (
        <Carousel >
            {slides.map((slide, index) => (
                <Carousel.Item key={index}>

                    <a href={slide.link} target="_blank" rel="noopener noreferrer">
                        <img
                            src={slide.src}
                            alt={slide.alt}

                            style={{
                                objectFit: "contain",
                                height: "600px",
                                width: "1000px"
                            }}
                        />
                    </a>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}
