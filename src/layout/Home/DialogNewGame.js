import React, {useContext, useState} from "react";
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
    Box,
    FormControl,
    Select,
    Input
} from "@material-ui/core";
import AuthUserContext from "../../context/AuthUserContext";
import SocketContext from "../../context/SocketContext";

export default function FormDialog({ roomid }) {
    const [open, setOpen] = useState(false);
    const [isPublic, setIsPublic] = useState(true);
    const [stepTime, setStepTime] = useState(45);
    const [pass, setPass] = useState('');

    const authContext = useContext(AuthUserContext);
    const socket = useContext(SocketContext).socket;

    // const handleCreateNewGame = () => {
    //     if (authContext.isAuthenticated) {
    //         socket.emit('create-game', authContext.user, pass);
    //     }
    // }

    const handleChangeStepTime = (event) => {
        setStepTime(event.target.value);
    }

    const handleChangecbb = (event) => {
        setIsPublic(event.target.value === "true" ? true: false);
    }

    const handleChange = (event) => {
        setPass(event.target.value);
    }

    const handleClickOpen = () => {
        setIsPublic(true);
        setPass('');
        setStepTime(45);
        setOpen(true);
    };

    const handleClose = () => {
        
        setOpen(false);
    };

    const handleCreate = () => {
        if (authContext.isAuthenticated) {
            socket.emit('create-game', authContext.user, pass);
        }
        //dong dialog
        setOpen(false);
    }

    return (
        <div>
            <Button variant="contained" color="secondary" onClick={handleClickOpen}>
                New game
            </Button>
            <Dialog
                fullWidth
                maxWidth="xs"
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>
                    <Typography variant="h5" style={{fontWeight: 'bold'}}>Create new game</Typography>
                </DialogTitle>
                <DialogContent>
                    <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h6">Step time (sec) </Typography>
                        <TextField type="number" size="small" value={stepTime} defaultValue={45} InputProps={{ inputProps: { min: 15, max: 60 } }}
                        variant="outlined" style={{width: 80}} onChange={handleChangeStepTime}/>
                    </Box>
                    
                    <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" style={{marginBottom:10}}>
                        <Typography variant="h6" >Password</Typography>
                        <FormControl size="small" variant="outlined" style={{ marginLeft: 10 }}>
                            <Select native value={isPublic} onChange={handleChangecbb} style={{width: 80}}>
                                <option value={true}>No</option>
                                <option value={false}>Yes</option>
                            </Select>
                        </FormControl>
                    </Box>
                    
                    {!isPublic?
                    <TextField

                        autoFocus
                        id="name"
                        placeholder='Enter password'
                        value={pass}
                        onChange={handleChange}
                        type="password"
                        fullWidth
                    />:null}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleCreate} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
