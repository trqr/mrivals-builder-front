import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import {useEffect, useState} from "react";
import type {MatchUpType} from "../../../@types/MatchUpType.ts";
import {deleteMatchUp} from "../../../api/MatchUp.api.ts";
import {useData} from "../../../hooks/useData.tsx";
import SpotlightCard from "../cards/spotlightCard/SpotlightCard.tsx";

type MatchUpUpdateDialogProps = {
    open: boolean;
    handleClose: () => void;
    handleSave: (counterPickId: number, value: number, id?: number) => void;
    heroes: { id: number; name: string }[];
    editingMatchUp?: MatchUpType | null;
};

export const MatchUpUpdateDialog = ({open, handleClose, handleSave, heroes, editingMatchUp}: MatchUpUpdateDialogProps) => {
    const [counterPickId, setCounterPickId] = useState<number | "">("");
    const [value, setValue] = useState<number>(1);
    const { refreshHeroes } = useData()

    const onSubmit = () => {
        if (counterPickId === "") return;
        handleSave(Number(counterPickId), value, editingMatchUp?.id);
        handleClose();
    };

    const handleDelete = async () => {
        if (editingMatchUp) {
            await deleteMatchUp(editingMatchUp.id)
            await refreshHeroes();
        }
        handleClose();
    }

    useEffect(() => {
        if (editingMatchUp) {
            setCounterPickId(editingMatchUp.counterPick.id);
            setValue(editingMatchUp.value);
        } else {
            setCounterPickId("");
            setValue(1);
        }
    }, [editingMatchUp, open]);

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
            <SpotlightCard width={"auto"} className="dialog-card" spotlightColor="rgba(0, 229, 255, 0.2)">
            <DialogTitle>Add or Update a match up</DialogTitle>
            <DialogContent>
                <Box sx={{display: "flex", flexDirection: "column", gap: 2, mt: 1}}>

                    <FormControl fullWidth>
                        <InputLabel id="counter-label">Counter Hero</InputLabel>
                        <Select
                            labelId="counter-label"
                            value={counterPickId}
                            onChange={(e) => setCounterPickId(e.target.value as number)}
                        >
                            {heroes.map((h) => (
                                <MenuItem key={h.id} value={h.id}>
                                    {h.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        label="Value"
                        type="number"
                        value={value}
                        onChange={(e) => setValue(Number(e.target.value))}
                        fullWidth
                    />
                </Box>
            </DialogContent>
            {editingMatchUp ?
                <DialogActions sx={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <Button variant={"text"} color={"warning"} onClick={handleDelete}>Delete</Button>
                    <Box sx={{justifyContent: "flex-end", display: "flex", alignItems: "flex-end"}}>
                        <Button onClick={handleClose}>Annuler</Button>
                        <Button variant="contained" onClick={onSubmit}>
                            Submit
                        </Button>
                    </Box>
                </DialogActions>
                :
                <DialogActions>
                    <Button onClick={handleClose}>Annuler</Button>
                    <Button variant="contained" onClick={onSubmit}>
                        Submit
                    </Button>
                </DialogActions>
            }
            </SpotlightCard>
        </Dialog>
    );
};