import React, {useContext, useState} from "react";
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from "@material-ui/core";
import AuthUserContext from "../../context/AuthUserContext";
import SocketContext from "../../context/SocketContext";
import {useHistory} from "react-router-dom";

export default function FormDialog({ roomId }) {
    const [open, setOpen] = useState(false);
    const [pass, setPass] = useState('');

    const authContext = useContext(AuthUserContext);
    const socketContext = useContext(SocketContext);
    const socket = socketContext.socket;
    const user = authContext.user;
    const history = useHistory();

    const handleJoinGame = (roomId) => {
        socket.emit('join-game', roomId, user, pass, (error) => {
            console.log('join-game ' + roomId);
            if(error) {
                alert(error);
            }
            else {
                history.push(`game/${roomId}`)
            }

        });
        setOpen(false);
    }

    const handleChange = (event) => {
        setPass(event.target.value);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleJoin = () => {
        //xu ly join room voi password

        //dong dialog
        setOpen(false);
    }

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Join
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>
                    Enter password to join room #{roomId}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        id="name"
                        label="Password"
                        value={pass}
                        onChange={handleChange}
                        type="password"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => handleJoinGame(roomId)} color="primary">
                        Join
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
