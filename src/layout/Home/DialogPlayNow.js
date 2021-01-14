import React, {useState, useContext, useEffect} from "react";
import {useHistory} from 'react-router-dom';
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
import SocketContext from "../../context/SocketContext";

export default function FormDialog() {
    const history = useHistory();
    const { 
        user
    } = useContext(authUserContext);
    const socket = useContext(SocketContext).socket;
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        socket.emit('add-play-now', user);
        setOpen(true);
    };

    const handleClose = () => {
        socket.emit('remove-play-now', user);
        setOpen(false);
    };

    useEffect(() => {
        socket.on('new-game-id', (roomId) =>{
            console.log('new-game-id ' + roomId);
            //setOpen(false);
            history.push(`/game/${roomId}`);
        });

    }, []);

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
