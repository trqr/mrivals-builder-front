import type {HeroType} from "../../@types/HeroType";
import {useDraggable} from "@dnd-kit/core";
import {imageBaseUrl} from "../../api/axios.config.ts";

export const DraggableHero = ({ hero }: { hero: HeroType }) =>  {
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

            }}
            {...listeners}
            {...attributes}
        >
            <img
                src={imageBaseUrl + hero.imageLink}
                style={{
                    objectFit: "cover",
                    objectPosition: "center",
                    maxHeight: "100%",
                    maxWidth: "100%",
                }}
                alt={hero.name}
            />
        </div>
    );
}