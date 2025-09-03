import type {HeroType} from "../../@types/HeroType";
import {useDraggable} from "@dnd-kit/core";
import {imageBaseUrl} from "../../api/axios.config.ts";
import Popover from "@mui/material/Popover";
import * as React from "react";
import Box from "@mui/material/Box";
import {Paper} from "@mui/material";
import {useCompo} from "../../hooks/useCompo.tsx";

type DraggableHeroProps = {
    hero: HeroType;
    bestHeroes: never[];
}

export const DraggableHero = ({ hero, bestHeroes }: DraggableHeroProps) =>  {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: hero.id.toString(),
    });
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const { compo } = useCompo();


    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const isTeamUp = () => {
        return compo.some((h: HeroType) => h.synergies.some(allyHero => (hero.id === allyHero.ally.id) && allyHero.isTeamUp));
    }

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
                        r.heroes.some((h: HeroType) => h.id === hero.id)
                    )
                        ? (isTeamUp() ? "2px dashed gold" :  "2px solid limegreen")
                        : (isTeamUp() ? "2px dashed gold" : "none"),
                    animation: bestHeroes.some(r =>
                        r.heroes.some((h: HeroType) => h.id === hero.id)
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
                <Box sx={{display: "flex", flexDirection: "row", alignItems: "center" ,padding: "5px", backgroundColor: "#b1b1af"}}>
                {hero.matchUps.map(matchup => (
                    <Paper elevation={6} key={matchup.id} sx={{ display: "flex" , padding: "2px", alignItems: "center", border: "2px solid red"}}>
                    <img
                        src={imageBaseUrl + matchup.counterPick.imageLink}
                        style={{
                            width: "70px",
                            height: "70px",
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
                <Box sx={{display: "flex", flexDirection: "row", alignItems: "center",padding: "5px", backgroundColor: "#b1b1af" }}>
                    {hero.synergies.map(synergie => (
                        <Paper elevation={6} key={synergie.id} sx={{ padding: "2px" , display: "flex" , alignItems: "center", border: synergie.isTeamUp ? "3px dashed gold" : "2px solid green"}}>
                            <img
                                src={imageBaseUrl + synergie.ally.imageLink}
                                style={{
                                    width: "70px",
                                    height: "70px",
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