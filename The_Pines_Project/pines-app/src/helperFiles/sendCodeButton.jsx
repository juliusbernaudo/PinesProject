/*
    sends the code to the designated email provided
*/

import React, { useState } from "react";

import { ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import axios from "axios";
import { buttonTheme } from "./generalStyling";

function SendCodeButton({ email }) {
    const [codeSent, setCodeSent] = useState(false);

    // sends code to the email registered
    const SendEmail = () => {
        axios({
            method: "post",
            data: {
                email: email,
            },
            withCredentials: true,
            url: process.env.REACT_APP_DATABASE_URL + "/register/sendCode",
        }).then((res) => console.log(res));

        setCodeSent(true);
    };

    return (
        <>
            <div className="Centre">
                <ThemeProvider theme={buttonTheme}>
                    <Button
                        onClick={SendEmail}
                        variant="contained"
                        color="black"
                        sx={{
                            width: 200,
                            padding: 1,
                            margin: 2,
                            fontSize: 17,
                        }}
                        style={{ textTransform: "lowercase" }}
                    >
                        send Code
                    </Button>
                </ThemeProvider>
            </div>

            {/* Checks if code has been sent and then displays the text*/}
            {codeSent && (
                <>
                    <div className="Centre">
                        A code has been sent to the email above
                    </div>
                </>
            )}
            <br></br>
        </>
    );
}

export default SendCodeButton;
