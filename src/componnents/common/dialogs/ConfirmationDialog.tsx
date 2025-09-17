import {Box, Button, Dialog, Typography} from "@mui/material";
import SpotlightCard from "../cards/spotlightCard/SpotlightCard";

type ConfirmationDialogProps = {
    isOpen: boolean;
    handleClose: () => void;
    dialogText: string;
    handleConfirmationClick: () => void;
}

const ConfirmationDialog = ({isOpen, handleClose, dialogText, handleConfirmationClick}: ConfirmationDialogProps) => {
    return (
        <>
            <Dialog open={isOpen} onClose={handleClose}>
                <SpotlightCard width={"auto"} className="dialog-card" spotlightColor="rgba(0, 229, 255, 0.2)">
                <Typography variant={"h6"} sx={{margin: "10px"}}>{dialogText}</Typography>
                <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", margin: "5px"}}>
                    <Button sx={{margin: "5px"}} variant={"outlined"} onClick={handleConfirmationClick}>Yes</Button>
                    <Button sx={{margin: "5px"}} variant={"contained"} onClick={handleClose}>Cancel</Button>
                </Box>
                </SpotlightCard>
            </Dialog>
        </>
    )
}

export default ConfirmationDialog;