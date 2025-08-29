import type {HeroType} from "../../@types/HeroType";
import {useDraggable} from "@dnd-kit/core";
import {imageBaseUrl} from "../../api/axios.config.ts";

type DraggableHeroProps = {
    hero: HeroType;
    bestHeroes: any;
}

export const DraggableHero = ({ hero, bestHeroes }: DraggableHeroProps) =>  {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: hero.id.toString(),
    });

    return (
        <div
            ref={setNodeRef}
            style={{
                transform: transform
                    ? `translate(${transform.x}px, ${transform.y}px)`
                    : undefined,
                cursor: "grab",
                opacity: isDragging ? 0.3 : 1,
                height: 200

            }}
            {...listeners}
            {...attributes}
        >
            <img
                src={imageBaseUrl + hero.imageLink}
                style={{
                    border: bestHeroes.some(r =>
                        r.heroes.some(h => h.id === hero.id)
                    )
                        ? "2px solid limegreen"
                        : "none",
                    animation: bestHeroes.some(r =>
                        r.heroes.some(h => h.id === hero.id)
                    )
                        ? "pulse 1.5s infinite"
                        : "none",
                    objectFit: "cover",
                    objectPosition: "center",
                    maxHeight: "90%",
                    maxWidth: "90%",
                }}
                alt={hero.name}
            />
        </div>
    );
}