/*
    Verify code button for general use
*/

import React from "react";

import { ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import axios from "axios";
import { buttonTheme } from "./generalStyling";
import { useNavigate } from "react-router-dom";

function VerifyCodeButton({ email, registerCode, pathing }) {
    const navigate = useNavigate();

    // verify the code is correct (need to implement check against code)
    const VerifyEmail = () => {
        axios({
            method: "post",
            data: {
                email: email,
                code: registerCode,
            },
            withCredentials: true,
            url: process.env.REACT_APP_DATABASE_URL + "/register/verify",
        }).then( function (response) {
            console.log(response);
            if (response.data.redirect === "true"){ // response.data.redirect ===  // This currently goes through no matter what
                navigate(pathing);
            }
            else {
                window.alert('Incorrect code');
            }
        }).catch( function (error) {
            window.alert('Incorrect code');
        })

        // navigate(pathing); // This will let us treat every verify code as true
        
    };

    return (
        <>
            <div className="Centre">
                <ThemeProvider theme={buttonTheme}>
                    <Button
                        onClick={VerifyEmail}
                        variant="contained"
                        color="black"
                        sx={{ width: 200, padding: 1, margin: 2, fontSize: 17 }}
                        style={{ textTransform: "lowercase" }}
                    >
                        Submit Code
                    </Button>
                </ThemeProvider>
            </div>
        </>
    );
}

export default VerifyCodeButton;
