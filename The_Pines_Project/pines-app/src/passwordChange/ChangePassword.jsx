/*
    Change the current password of the user
*/

import React, { useState } from "react";
import { newPasswordPage, profile } from "../helperFiles/navigationPaths";
import { titleStyling } from '../helperFiles/generalStyling';
import TextField from "@mui/material/TextField";
import BackButton from "../helperFiles/backButton";
import SendCodeButton from "../helperFiles/sendCodeButton";
import VerifyCodeButton from "../helperFiles/verifyCodeButton";
import IsLoggedIn from '../helperFiles/isLoggedIn';


function ChangePasswordPage() {
    const [email, setEmail] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    IsLoggedIn();

    return (
        <>
            <div className="Centre">
                <h1 style={titleStyling}>Change Password</h1>
                Please enter your email below and a verification code will be sent to that email
            </div>
            <div className="Centre">
                <br></br>
                <TextField
                    label="EMAIL"
                    InputLabelProps={{ shrink: true }}
                    id="outlined-required"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    variant="outlined"
                    style={{width: 300}}  
                />
                
            </div>

            {/* Renders the components for the buttons (Send Code and Verify Code further below) */}
            <SendCodeButton email={email}/>

            <div className="Centre">
                <br></br>
                <TextField
                    label="CODE"
                    InputLabelProps={{ shrink: true }}
                    id="outlined-required"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    variant="outlined"
                    style={{width: 300}}  
                />
                
            </div>
            <VerifyCodeButton
                email={email}
                registerCode={verificationCode}
                pathing={newPasswordPage}
            />
            <BackButton pathing={profile} />
        </>
    );
}

export default ChangePasswordPage;