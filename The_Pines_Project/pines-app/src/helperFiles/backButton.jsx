/*
    Back button that will route to the previous page depending on what pathing is provided
*/

import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { buttonTheme } from "./generalStyling";

function BackButton({ pathing }) {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(pathing);
    };

    return (
        <>
            <div className="Centre LineSpacing">
                <ThemeProvider theme={buttonTheme}>
                    <Button
                        onClick={handleBack}
                        variant="contained"
                        color="black"
                        sx={{ width: 200, padding: 1, margin: 2, fontSize: 17 }}
                        style={{ textTransform: "lowercase" }}
                    >
                        back
                    </Button>
                </ThemeProvider>
            </div>
        </>
    );
}

export default BackButton;
