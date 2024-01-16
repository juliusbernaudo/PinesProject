/*
    This page is to verify the code sent to the email registered
*/

import React, { useState } from "react";
import { login, mainPage } from "../helperFiles/navigationPaths";
import { titleStyling } from "../helperFiles/generalStyling";
import TextField from "@mui/material/TextField";
import BackButton from "../helperFiles/backButton";
import SendCodeButton from "../helperFiles/sendCodeButton";
import VerifyCodeButton from "../helperFiles/verifyCodeButton";
import IsLoggedIn from "../helperFiles/isLoggedIn";

function VerificationPage() {
    const [registerCode, setRegisterCode] = useState("");
    IsLoggedIn();
    // getting email from localstorage (cache)
    let email = JSON.parse(window.localStorage.getItem("email"));

    return (
        <>
            <div className="Centre">
                <h1 style={titleStyling}>Verify</h1>
                Please submit the verification code sent to the below email
            </div>
            <div className="Centre">
                <br></br>
                <TextField
                    label="EMAIL"
                    InputLabelProps={{ shrink: true }}
                    id="standard-disabled"
                    variant="standard"
                    style={{ width: 300 }}
                    value={email}
                    InputProps={{
                        readOnly: true,
                    }}
                />
            </div>
            <div className="Centre">
                <br></br>

                <SendCodeButton email={email} />

                <br></br>
                <TextField
                    label="VERIFICATION CODE"
                    InputLabelProps={{ shrink: true }}
                    id="outlined-required"
                    value={registerCode}
                    onChange={(e) => setRegisterCode(e.target.value)}
                    variant="outlined"
                    style={{ width: 300 }}
                />
            </div>

            <VerifyCodeButton 
                email={email} 
                registerCode={registerCode}
                pathing={mainPage}
            />
            <BackButton pathing={login} />
        </>
    );
}

export default VerificationPage;
