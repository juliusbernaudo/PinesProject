import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import NavBar from '../helperFiles/navBar';
import { buttonTheme, titleStyling } from '../helperFiles/generalStyling';
import { login, changePassword } from '../helperFiles/navigationPaths';
import IsLoggedIn from '../helperFiles/isLoggedIn';

import TextField from "@mui/material/TextField";
import { ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// const [address, setAddress] = useState("");
// const [phoneNumber, setPhoneNumber] = useState("");

const ProfilePage = () => {

    IsLoggedIn();

    const [profileName, setProfileName] = useState("");
    const [profileDOB, setProfileDOB] = React.useState(dayjs());

    const [readOnlyTextBoxes, setReadOnlyTextBoxes] = useState(true);
    const [editButtonText, setEditButtonText] = useState("edit profile");
    

    // getting email from localstorage (cache)
    let profileEmail = JSON.parse(window.localStorage.getItem("email"));
    // Using this email to get the other details
    axios({
            method: "get",
            data: {
                email: profileEmail,
            },
            withCredentials: true,
            url: process.env.REACT_APP_DATABASE_URL + "/login/profile",
        })
        .then( function (response) {
            console.log(response);

            // set the name and DOB to the data recieved from the back-end
            setProfileName("username", JSON.stringify(response.data.username));
            setProfileDOB("DateOfBirth", JSON.stringify(response.data.DateOfBirth));
            
        })

    const navigate = useNavigate(); // Required to navigate between pages

    // The button to Change your Password
    const handleChangePassword = () => {
        navigate(changePassword);
    };

    // The button to push the edits to the back-end                                        // TODO ADD back-end stuff
    const checkAndPostEdits = () => {
        enableEditDetails();
    }

    // Checks if the user should be able to edit details, or if those emails are valid and should be sent to the back-end
    const enableEditDetails = () => {
        if (readOnlyTextBoxes === true) {
            setReadOnlyTextBoxes(false);
            setEditButtonText("confirm edits");
        }
        else {
            
            // These edits can only be posted if they don't leave an item
            if (profileName.trim().length !== 0 &&
                profileDOB.trim().length !== 0) {

                    axios({
                        method: "put",
                        data: {
                            email: profileEmail,
                            username: profileName,
                            DateOfBirth: profileDOB,
                        },
                        withCredentials: true,
                        url: process.env.REACT_APP_DATABASE_URL + "/register",
                    }).then((res) => console.log(res));
                    setReadOnlyTextBoxes(true);
                    setEditButtonText("edit profile");
                }
                else {
                    window.alert('Please enter in all fields');
                }
        }
    }

    // The button to log-out and get sent back to the login page
    // Clears local storage so you cannot navigate to pages unless logged in
    const logOut = () => {
        window.localStorage.clear();
        navigate(login);
    }

    return (
        <div>
            <script>setDefaultContents();</script>

            <div className="NavBar">
                <NavBar />
                <div className="Page Title">
                    <h1 style={titleStyling}>
                        Profile Page
                    </h1>
                </div>
            </div>


            <div className="Centre">
                <TextField
                    label="EMAIL ADDRESS"
                    InputLabelProps={{ shrink: true }}
                    id="outlined-required"
                    value={profileEmail}
                    readOnly={true}
                    disabled={true}
                    variant="standard"
                    style={{width: 300}}  
                />
            </div>

            <div className="Centre">
                <br></br>
                <TextField
                    label="NAME"
                    InputLabelProps={{ shrink: true }}
                    id="outlined-required"
                    value={profileName}
                    readOnly={readOnlyTextBoxes}
                    disabled={readOnlyTextBoxes}
                    onChange={(e) => setProfileName(e.target.value)}
                    variant="outlined"
                    style={{width: 300}}  
                />
            </div>

            <div className="Centre">
                <br></br>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDatePicker
                label="DATE OF BIRTH"
                inputFormat="DD/MM/YYYY"
                disableFuture={true}
                disabled={readOnlyTextBoxes}
                value={profileDOB}
                onChange={(e) => setProfileDOB(e)}
                renderInput={(params) => <TextField {...params} style={{width: 300}}/>}
                
                />
                </LocalizationProvider>
            </div>

            <div className="Centre">
                <ThemeProvider theme={buttonTheme}>
                    <Button onClick={checkAndPostEdits} variant="contained" color="black" 
                    sx={{ width: 200, padding: 1, margin: 2, fontSize: 17}}
                    style={{textTransform: 'lowercase'}}
                    >
                       {editButtonText}
                    </Button>  
                </ThemeProvider>
            </div>
            <div className="Centre">
                <ThemeProvider theme={buttonTheme}>
                    <Button onClick={logOut} variant="contained" color="black" 
                    sx={{ width: 200, padding: 1, margin: 2, fontSize: 17}}
                    style={{textTransform: 'lowercase'}}
                    >
                       log out
                    </Button>  
                </ThemeProvider>
            </div>
            <div className="Centre">
                <ThemeProvider theme={buttonTheme}>
                    <Button onClick={handleChangePassword} variant="contained" color="black" 
                    sx={{ width: 200, padding: 1, margin: 2, fontSize: 17}}
                    style={{textTransform: 'lowercase'}}
                    >
                       change password
                    </Button>  
                </ThemeProvider>
            </div>
        </div>
    )
}

export default ProfilePage;