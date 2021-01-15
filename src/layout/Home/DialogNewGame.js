import React, { useState } from "react";
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

export default function FormDialog({ roomid }) {
    const [open, setOpen] = useState(false);
    const [isPublic, setIsPublic] = useState(true);
    const [stepTime, setStepTime] = useState(2);
    const [pass, setPass] = useState('');

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
        setStepTime(2);
        setOpen(true);
    };

    const handleClose = () => {
        
        setOpen(false);
    };

    const handleCreate = () => {
        //xu ly create new game
        console.log(stepTime);
        if(isPublic)
            console.log('Public no pass');
        else console.log('Private - pass:' + pass);
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
                    <Typography variant="h4">Create new game</Typography>   
                </DialogTitle>
                <DialogContent>
                    <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h5">Step time (min) </Typography>
                        <TextField type="number" size="small" value={stepTime} defaultValue={2} InputProps={{ inputProps: { min: 2, max: 10 } }}
                        variant="outlined" style={{width:60}} onChange={handleChangeStepTime}/>
                    </Box>
                    
                    <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="h5" style={{marginRight:10}}>Room type</Typography>
                        <FormControl size="small" variant="outlined" style={{ marginLeft: 10 }}>
                            <Select native value={isPublic} onChange={handleChangecbb}>
                                <option value={true}>Public</option>
                                <option value={false}>Private</option>
                            </Select>
                        </FormControl>
                    </Box>
                    
                    {!isPublic?
                    <TextField
                        autoFocus
                        id="name"
                        label="Password"
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
