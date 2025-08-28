import type {HeroType} from "../../@types/HeroType";
import {useDroppable} from "@dnd-kit/core";
import {Card, CardContent, CardHeader, CardMedia} from "@mui/material";
import {imageBaseUrl} from "../../api/axios.config.ts";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";

export const DroppableSlot = ({ id, hero }: { id: string; hero?: HeroType }) =>  {
    const { isOver, setNodeRef } = useDroppable({id});

    return (
        <Card
            ref={setNodeRef}
            sx={{
                height: "220px",
                border: isOver ? "2px solid green" : "1px solid lightgrey",
                transition: "0.2s",
            }}
        >
            <CardHeader
                title={hero ? hero.name : `Hero ${id}`}
                subheader={hero ? hero.role : "role"}
            />
            <CardContent sx={{ display: "flex", justifyContent: "center" }}>
                {hero ? (
                    <CardMedia>
                    <img
                        src={imageBaseUrl + hero.imageLink}
                        alt={hero.name}
                        style={{ maxWidth: "100%", maxHeight: "180px", objectFit: "contain" }}
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