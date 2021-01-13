import React, { useState, useContext } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    CircularProgress, 
    Typography,
    Box
} from "@material-ui/core";

import authUserContext from "../../context/AuthUserContext";

export default function FormDialog() {
    const { 
        user
    } = useContext(authUserContext);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="contained" color="secondary" onClick={handleClickOpen} style={{ marginLeft: 10 }}>
                Play now
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>
                    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                        <Typography variant="h4" style={{marginBottom:20}}>Searching for opponent... </Typography>
                        <CircularProgress />      
                    </Box> 
                </DialogTitle>
                <DialogContent>
                    <Typography>Player: {user.name}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" fullWidth>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
