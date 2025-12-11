import type {HeroType} from "../../../@types/HeroType";
import {useDraggable} from "@dnd-kit/core";
import {imageBaseUrl} from "../../../api/config/Axios.config.ts";
import Popover from "@mui/material/Popover";
import * as React from "react";
import Box from "@mui/material/Box";
import {LinearProgress, Paper, Popper} from "@mui/material";
import {useCompo} from "../../../hooks/useCompo.tsx";
import {useAuth} from "../../../hooks/useAuth.tsx";
import ShieldIcon from '@mui/icons-material/Shield';
import MedicationIcon from '@mui/icons-material/Medication';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

type DraggableHeroProps = {
    hero: HeroType;
    bestHeroes: never[];
}

export const DraggableHero = ({hero, bestHeroes}: DraggableHeroProps) => {
    const {attributes, listeners, setNodeRef, transform, isDragging} = useDraggable({
        id: hero.id.toString(),
    });
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const {compo} = useCompo();
    const {user} = useAuth();
    const [popperAnchorEl, setPopperAnchorEl] = React.useState<HTMLElement | null>(null);
    const openPopper = Boolean(popperAnchorEl);
    const popperId = openPopper ? `hero-wr-popper-${hero.id}` : undefined;

    const handlePopperOpen = (e: React.MouseEvent<HTMLElement> | React.FocusEvent<HTMLElement>) => {
        setPopperAnchorEl(e.currentTarget as HTMLElement);
    };
    const handlePopperClose = () => setPopperAnchorEl(null);


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

    const heroes = React.useMemo(() => {
        try {
            return JSON.parse(user.accounts[0].statsRawJson).heroes_ranked || [];
        } catch {
            return [];
        }
    }, [user]);

    const averageWinrate = React.useMemo(() => {
        const valid = heroes.filter((h: any) => h.matches > 0);
        if (valid.length === 0) return 0;
        const totalWins = valid.reduce((sum: number, h: any) => sum + h.wins, 0);
        const totalMatches = valid.reduce((sum: number, h: any) => sum + h.matches, 0);
        return (totalWins / totalMatches) * 100;
    }, [heroes]);

    function getHeroData(heroName: string): any | null {
        return heroes.find(
            (h: any) => h.hero_name.toLowerCase() === heroName.toLowerCase()
        ) || null;
    }

    const heroData = getHeroData(hero.name);
    const heroWinrate = heroData && heroData.matches > 0
        ? Math.round(((heroData.wins / heroData.matches) * 100) * 100) / 100
        : 0;

    const isLowWinrate =
        heroData &&
        heroData.matches >= 15 &&
        heroWinrate < 48;

    return (
        <Box
            className="draggable-card"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
            ref={setNodeRef}
            sx={{
                transform: transform
                    ? `translate(${transform.x}px, ${transform.y}px)`
                    : undefined,
                cursor: "grab",
                opacity: isDragging ? 0 : 1,
                position: "relative",
                margin: "0px 5px"

            }}
            {...listeners}
            {...attributes}
        >
            <Box sx={{
                border: bestHeroes.some(r =>
                    r.heroes.some((h: HeroType) => h.id === hero.id)
                )
                    ? (isTeamUp() ? "2px dashed gold" : "2px solid limegreen")
                    : (isTeamUp() ? "2px dashed gold" : "none"),
                animation: bestHeroes.some(r =>
                    r.heroes.some((h: HeroType) => h.id === hero.id)
                )
                    ? (isTeamUp() ? "teamup-pulse 1.5s infinite" : "pulse 1.5s infinite")
                    : (isTeamUp() ? "teamup-pulse 1.5s infinite" : "none"),
            }}>
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
                {hero.isMainTank && (
                    <ShieldIcon sx={{
                        position: "absolute",
                        bottom: "12px",
                        left: "5px",
                        width: "15px",
                        height: "15px",
                    }}/>
                )}
                {hero.isMainHeal && (
                    <MedicationIcon sx={{
                        position: "absolute",
                        bottom: "12px",
                        left: "5px",
                        width: "17px",
                        height: "17px",
                    }}/>

                )}
            </Box>
            {isLowWinrate && (
                <Box sx={{position: "absolute", top: 0, right: 0, zIndex: 5}}>
                    <span
                        onMouseEnter={handlePopperOpen}
                        onMouseLeave={handlePopperClose}
                        onFocus={handlePopperOpen}
                        onBlur={handlePopperClose}
                        tabIndex={0}
                        aria-describedby={popperId}
                        style={{display: "inline-block", lineHeight: 0}}
                    >
      <WarningAmberIcon
          sx={{
              color: "#ff3300",
              fontSize: "28px",
              filter: "drop-shadow(0 0 4px black)",
              cursor: "pointer",
          }}
      />
    </span>

                    <Popper
                        id={popperId}
                        open={openPopper}
                        anchorEl={popperAnchorEl}
                        placement="left"
                        disablePortal
                        modifiers={[{name: "offset", options: {offset: [0, 8]}}]}
                    >
                        <Paper
                            elevation={9}
                            onMouseEnter={handlePopperOpen}
                            onMouseLeave={handlePopperClose}
                            sx={{
                                p: 1,
                                bgcolor: "#252525",
                                color: "#fff",
                                width: 180,
                                borderRadius: 1,
                            }}
                        >
                            <Box sx={{fontWeight: 700, mb: 0.5}}>{hero.name}</Box>

                            <Box sx={{display: "flex", justifyContent: "space-between", fontSize: "0.85rem"}}>
                                <span>Hero Winrate</span>
                                <span>{(heroWinrate ?? 0).toFixed(1)}%</span>
                            </Box>

                            <LinearProgress
                                variant="determinate"
                                value={Math.min(Math.max(heroWinrate ?? 0, 0), 100)}
                                color={"error"}
                                sx={{
                                    height: 8,
                                    borderRadius: 1,
                                    mt: 0.5,
                                    mb: 0.5,
                                    bgcolor: "#3b3b3b",
                                }}
                            />

                            <Box sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                fontSize: "0.75rem",
                                opacity: 0.9
                            }}>
                                <span>Your Ranked WR</span>
                                <span>{averageWinrate.toFixed(1)}%</span>
                            </Box>

                            <Box sx={{fontSize: "0.75rem", mt: 0.5, opacity: 0.95}}>
                                Matchs: {heroData?.matches ?? 0}
                            </Box>
                        </Paper>
                    </Popper>
                </Box>
            )}
            <Popover
                disableEnforceFocus
                disableAutoFocus
                id={id}
                sx={{pointerEvents: "none"}}
                open={open}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
            >
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    padding: "5px",
                    backgroundColor: "#b1b1af"
                }}>
                    {hero.matchUps.map(matchup => (
                        <Paper elevation={6} key={matchup.id}
                               sx={{display: "flex", padding: "2px", alignItems: "center", border: "2px solid red"}}>
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
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    padding: "5px",
                    backgroundColor: "#b1b1af"
                }}>
                    {hero.synergies.map(synergie => (
                        <Paper elevation={6} key={synergie.id} sx={{
                            padding: "2px",
                            display: "flex",
                            alignItems: "center",
                            border: synergie.isTeamUp ? "3px dashed gold" : "2px solid green"
                        }}>
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
        </Box>
    );
}