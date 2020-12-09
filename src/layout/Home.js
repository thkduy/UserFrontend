import {React, useState} from "react";
import {
    Typography,
} from "@material-ui/core";
import { io } from 'socket.io-client';

export default function Home(){

    const socket = io('http://localhost:3001', {
        withCredentials: true,
        extraHeaders: {
            "my-custom-header": "abcd"
        }
    });

    let [listOnline, setListOnline] = useState({});

    socket.on('requireIdUser', () => {
        socket.emit('requireIdUser', localStorage.getItem("user"));
    })

    socket.on('listOnlineUser', (listOnlineUser) => {
        console.log(listOnlineUser);
        setListOnline(listOnlineUser);
    })

    return(

        <Typography variant="h6">
            {Object.entries(listOnline)}
        </Typography>
    );
}