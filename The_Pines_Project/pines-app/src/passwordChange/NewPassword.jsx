/*
    Back button to be used for general purpose
*/

import React, { useState } from "react";
import { ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { buttonTheme, titleStyling } from "../helperFiles/generalStyling";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { login } from "../helperFiles/navigationPaths";
import IsLoggedIn from "../helperFiles/isLoggedIn";




function NewPasswordPage() {
    const navigate = useNavigate();

    IsLoggedIn();

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Upon click of submit, the users details will be pushed into the system 
    const register = () => {

        if (newPassword !== confirmPassword) {
            window.alert('Make sure passwords match in BOTH fields');
        }

        if (newPassword === confirmPassword && newPassword.trim().length !== 0) {
            axios({
                method: "put",
                data: {
                    password: newPassword,
                },
                withCredentials: true,
                url: process.env.REACT_APP_DATABASE_URL + "/register",
            }).then((res) => console.log(res));

            navigate(login);
        }
        if (newPassword.trim().length === 0) {
            window.alert("Make sure you have entered a password");
        }

    };


    return (
        <>
        <div className="Centre">
                <h1 style={titleStyling}>New Password</h1>
                Please enter a new password
            </div>
            
            <div className="Centre">
                <br></br>
                <TextField
                    label="NEW PASSWORD*"
                    InputLabelProps={{ shrink: true }}
                    id="outlined-required"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    variant="outlined"
                    style={{width: 300}}
                    type="password"
                    autoComplete="current-password"  
                />
            </div>
            <div className="Centre">
                <br></br>
                <TextField
                    label="CONFIRM PASSWORD*"
                    InputLabelProps={{ shrink: true }}
                    id="outlined-required"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    variant="outlined"
                    style={{width: 300}}
                    type="password"
                    autoComplete="current-password"  
                />
                
            </div>
            <div className="Centre LineSpacing">
                <ThemeProvider theme={buttonTheme}>
                    <Button
                        onClick={register}
                        variant="contained"
                        color="black"
                        sx={{ width: 200, padding: 1, margin: 2, fontSize: 17 }}
                        style={{ textTransform: "lowercase" }}
                    >
                        confirm password
                    </Button>
                </ThemeProvider>
            </div>
        </>
    );
}

export default NewPasswordPage;