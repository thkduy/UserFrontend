import React, { useState } from "react";
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from "@material-ui/core";

export default function FormDialog({ roomid }) {
    const [open, setOpen] = useState(false);
    const [pass, setPass] = useState('');

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
                    Enter password to join room #{roomid}
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
                    <Button onClick={handleJoin} color="primary">
                        Join
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
