import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import StoreIcon from '@mui/icons-material/Store';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useState} from "react";
import Register from "../features/Auth/components/Register";

export default function Header() {
    const [open, setOpen] =useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                        <StoreIcon/>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        NewShop
                    </Typography>
                    <Button color="inherit" onClick={handleClickOpen}>Register</Button>
                </Toolbar>
            </AppBar>
            <Dialog
                open={open}
                onClose={(event, reason)=> {
                    if (reason !== 'escapeKeyDown' && reason !== 'backdropClick') {
                        setOpen(false)
                    }
                }}>
                <DialogContent>

                    <Register/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}