import  React, { useState } from "react";
import TextField from "@mui/material/TextField";

import { BottomNavigationAction } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AppsIcon from '@mui/icons-material/Apps';
import { useNavigate } from "react-router-dom";
import { addItem, mainPage } from "./navigationPaths";
import {navBarStyling} from "../helperFiles/generalStyling";

import Search from "./search";

// functions as a global navigationBar, can be imported for use in other pages by using <NavBar />
function NavBar() {
    
    // eslint-disable-next-line
    const [inputText, setInputText] = useState("");
    let inputHandler = (newInput) => {
      
      var inputLower;
  
      // Make input into lower case, allows for easier filtering later on.
      inputLower = newInput.target.value.toLowerCase();
      setInputText(inputLower);
    };


    const navigate = useNavigate();

    // when icon is pressed navigate to that page
    const handleChange = (event, newValue) => {
        navigate(`${newValue}`);
       
    };

    return (
        <div style={navBarStyling}>
            {/* Bottom Label (which will actually be rendered at top), original code from https://mui.com/material-ui/react-bottom-navigation/ */}
            <div className="Centre" style={{ background: '#7386F4' }}>
            <BottomNavigationAction showLabel  label="Items" onChange={handleChange} value={mainPage} icon={<AppsIcon />} sx={{m: 1, mr: 6}}/>
            <BottomNavigationAction showLabel label="Add New Item" onChange={handleChange} value={addItem} icon={<AddBoxIcon />} sx={{m: 1, mr: 6}} />
            <BottomNavigationAction showLabel label="Profile" onChange={handleChange} value="/profile" icon={<AccountCircleIcon />} sx={{m: 1, mr: 6}} />
            <Search />
            </div>
      </div>
    )
}

export default NavBar;
