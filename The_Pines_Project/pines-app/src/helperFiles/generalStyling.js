import { createTheme } from "@mui/material/styles";


// text styling for the page title
export const titleStyling = {
    fontSize: 45,
    color: "#000000",
    textAlign: "center",
    paddingTop: "10px",
}

// styling for the navigation bar
export const navBarStyling = {
    color: "black",
    borderBottom: "1px solid black"
}

export const buttonTheme = createTheme({
    palette: {
        black: {
            main: "#000000",
            contrastText: "#fff",
        },
    },
});