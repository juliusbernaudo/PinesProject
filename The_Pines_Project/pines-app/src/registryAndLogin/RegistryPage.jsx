/*
    Register page for the user to register themselves in the system
    which will be stored and used for when the user wishes to log in next time
*/

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { login, verifyLogin } from "../helperFiles/navigationPaths";

import { buttonTheme, titleStyling } from '../helperFiles/generalStyling';
import TextField from "@mui/material/TextField";
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';

function RegistryPage() {
    const navigate = useNavigate();
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerCode] = useState("");
    const [registerDOB, setRegisterDOB] = React.useState(dayjs());


    // Upon click of submit, the users details will be pushed into the system 
    const register = () => {

        // storing the email locally for the verification page (need to implement GET call instead)
        window.localStorage.setItem("email", JSON.stringify(registerEmail));

        if (registerPassword !== confirmPassword) {
            window.alert('Make sure passwords match in BOTH fields');
        }

        if (registerPassword === confirmPassword && registerUsername.trim().length !== 0 &&
        registerPassword.trim().length !== 0 && registerEmail.trim().length !== 0) {

            axios({
                method: "post",
                data: {
                    username: registerUsername,
                    password: registerPassword,
                    email: registerEmail,
                    code: registerCode,
                    DateOfBirth: registerDOB,
                },
                withCredentials: true,
                url: process.env.REACT_APP_DATABASE_URL + "/register",
            }).then((res) => console.log(res));

            navigate(verifyLogin);
        }
        else {
            window.alert('Please enter in all fields');
        }
    
    };

    // Button to switch to login page incase user has login credentials
    const handleLogin = () => {
        navigate(login);
    };

    return (
        <>
            <div className="Centre">
                <p style={titleStyling}>
                Create New Account
                </p>
               <p>Already Registered?   <button onClick={handleLogin}>Login</button> </p>
               
            </div>
            
            <div className="Centre">
                <br></br>
                <TextField
                    label="NAME*"
                    InputLabelProps={{ shrink: true }}
                    id="outlined-required"
                    value={registerUsername}
                    onChange={(e) => setRegisterUsername(e.target.value)}
                    variant="outlined"
                    style={{width: 300}}  
                />
                
            </div>
            <div className="Centre">
                <br></br>
                <TextField
                    label="EMAIL*"
                    InputLabelProps={{ shrink: true }}
                    id="outlined-required"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    variant="outlined"
                    style={{width: 300}}  
                />
                
            </div>
            <div className="Centre">
                <br></br>
                <TextField
                    label="PASSWORD*"
                    InputLabelProps={{ shrink: true }}
                    id="outlined-required"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
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
            <div className="Centre">
                <br></br>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDatePicker
                label="DATE OF BIRTH"
                disableFuture={true}
                inputFormat="DD/MM/YYYY"
                value={registerDOB}
                onChange={(e) => setRegisterDOB(e)}
                renderInput={(params) => <TextField {...params} style={{width: 300}}/>}
                
                />
                </LocalizationProvider>
            </div>
            <div className="Centre LineSpacing">
                
                <ThemeProvider theme={buttonTheme}>
                    <Button onClick={register} variant="contained" color="black" 
                    sx={{ width: 200, padding: 1, margin: 2, fontSize: 17}}
                    style={{textTransform: 'lowercase'}}
                    >
                       sign up
                    </Button>  
                </ThemeProvider>
            </div>
        </>
    );
}

export default RegistryPage;
