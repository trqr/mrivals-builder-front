import type {HeroType} from "../../@types/HeroType";
import {useDraggable} from "@dnd-kit/core";
import {imageBaseUrl} from "../../api/axios.config.ts";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import * as React from "react";
import Box from "@mui/material/Box";
import {Paper} from "@mui/material";

type DraggableHeroProps = {
    hero: HeroType;
    bestHeroes: any;
}

export const DraggableHero = ({ hero, bestHeroes }: DraggableHeroProps) =>  {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: hero.id.toString(),
    });
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);


    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
            ref={setNodeRef}
            style={{
                transform: transform
                    ? `translate(${transform.x}px, ${transform.y}px)`
                    : undefined,
                cursor: "grab",
                opacity: isDragging ? 0.3 : 1,
                height: 175

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
                    maxHeight: "100%",
                    maxWidth: "100%",
                }}
                alt={hero.name}
            />
            <Popover
                id={id}
                sx={{ pointerEvents: "none" }}
                open={open}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
            >
                <Box sx={{display: "flex", flexDirection: "row", alignItems: "center", border: "1px solid red"}}>
                {hero.matchUps.map(matchup => (
                    <Paper elevation={6} key={matchup.id} sx={{ padding: "2px" , display: "flex" , alignItems: "center"}}>
                    <img
                        src={imageBaseUrl + matchup.counterPick.imageLink}
                        style={{
                            width: "60px",
                            height: "60px",
                            objectFit: "cover",
                            objectPosition: "center 15%",
                        }}
                    />
                    </Paper>
                ))}
                </Box>
            </Popover>
            <Popover
                id={id}
                sx={{ pointerEvents: "none" }}
                open={open}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <Box sx={{display: "flex", flexDirection: "row", alignItems: "center", border: "1px solid green"}}>
                    {hero.matchUps.map(matchup => (
                        <Paper elevation={6} key={matchup.id} sx={{ padding: "3px" , display: "flex" , alignItems: "center"}}>
                            <img
                                src={imageBaseUrl + matchup.counterPick.imageLink}
                                style={{
                                    width: "60px",
                                    height: "60px",
                                    objectFit: "cover",
                                    objectPosition: "center 15%",
                                }}
                            />
                        </Paper>
                    ))}
                </Box>
            </Popover>
        </div>
    );
}