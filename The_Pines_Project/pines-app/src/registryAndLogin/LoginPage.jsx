/*
    First page to appear on startup, the user will login in order to access
    their item tracker
*/

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { forgotPassword, mainPage, register } from "../helperFiles/navigationPaths";
import { buttonTheme, titleStyling } from '../helperFiles/generalStyling';

import { ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";


function LoginPage() {
    const navigate = useNavigate();
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    // used to log the person in (need to implement a check)
    const  login = () => {
        
        axios({
            method: "post",
            data: {
                username: loginUsername,
                password: loginPassword,
            },
            withCredentials: true,
            url: process.env.REACT_APP_DATABASE_URL + "/login",
        })
        .then( function (response) {
            console.log(response);

            // set the email in the browser to be used for other verifying purposes
            window.localStorage.setItem("email", JSON.stringify(response.data.email));
            if (response.data.redirect === '/mainPage') {
                navigate(mainPage)
            }
                
            
        }).catch( function (error) {
            window.alert('Incorrect username or password!');
        })
        
    };

    

    
    
    // button to go to register page
    const handleRegister = () => {
        navigate(register);
    };

    const handleForgotPassword = () => {
        navigate(forgotPassword);
    }

    return (
        <>
            <div className="Centre">
                <h1 style={titleStyling}>Login</h1>
                Sign in to continue
            </div>      
            <div className="Centre">
                <br></br>
                <TextField
                    label="NAME"
                    InputLabelProps={{ shrink: true }}
                    id="outlined-required"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    variant="outlined"
                    style={{width: 300}}  
                />
                
            </div>
            <div className="Centre">
                <br></br>
                <TextField
                    label="PASSWORD"
                    InputLabelProps={{ shrink: true }}
                    id="outlined-password-required"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    variant="outlined"
                    style={{width: 300}}
                    type="password"
                    autoComplete="current-password"  
                />
                
            </div>
            <div className="Centre LineSpacing">
                <ThemeProvider theme={buttonTheme}>
                    <Button onClick={login} variant="contained" color="black" 
                    sx={{ width: 200, padding: 1, margin: 2, fontSize: 17}}
                    style={{textTransform: 'lowercase'}}
                    >
                       login
                    </Button>  
                </ThemeProvider>
            </div>
            <div className="Centre LineSpacing">
                <ThemeProvider theme={buttonTheme}>
                    <Button onClick={handleRegister} variant="contained" color="black" 
                    sx={{ width: 200, padding: 1, margin: 2, fontSize: 17}}
                    style={{textTransform: 'lowercase'}}
                    >
                       register
                    </Button>  
                </ThemeProvider>
            </div>
            <div className="Centre LineSpacing">
                <ThemeProvider theme={buttonTheme}>
                    <Button onClick={handleForgotPassword} variant="contained" color="black" 
                    sx={{ width: 200, padding: 1, margin: 2, fontSize: 17}}
                    style={{textTransform: 'lowercase'}}
                    >
                       forgot password
                    </Button>  
                </ThemeProvider>
            </div>
        </>
    );
}

export default LoginPage;