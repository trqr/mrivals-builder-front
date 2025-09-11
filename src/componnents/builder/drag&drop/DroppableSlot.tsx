import type {HeroType} from "../../../@types/HeroType";
import {useDroppable} from "@dnd-kit/core";
import {Card, CardContent, CardHeader, CardMedia} from "@mui/material";
import {imageBaseUrl} from "../../../api/config/Axios.config.ts";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";

type DroppableSlotProps = {
    id: string;
    hero?: HeroType;
    handleClick: () => void;
}

export const DroppableSlot = ({ id, hero, handleClick }: DroppableSlotProps) =>  {
    const { isOver, setNodeRef } = useDroppable({id});

    return (
        <Card
            ref={setNodeRef}
            sx={{
                height: "220px",
                width: "80%",
                border: isOver ? "2px solid green" : "1px solid lightgrey",
                transition: "0.2s",
            }}
            onClick={handleClick}
        >
            <CardContent sx={{ display: "flex", justifyContent: "center" }}>
                {hero ? (
                    <CardMedia>
                    <img
                        src={imageBaseUrl + hero.imageLink}
                        alt={hero.name}
                        style={{ maxWidth: "100%", maxHeight: "190px", objectFit: "contain" }}
                    />
                    </CardMedia>
                ) : (
                    <IconButton>
                        <AddIcon />
                    </IconButton>
                )}
            </CardContent>
        </Card>
    );
}