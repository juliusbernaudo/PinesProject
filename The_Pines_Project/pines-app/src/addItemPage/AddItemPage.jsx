import { buttonTheme, titleStyling } from '../helperFiles/generalStyling';
import NavBar from '../helperFiles/navBar';
import axios from "axios";
import React, { useEffect, useState} from "react";
import "./AddItemPageStyling.css";
import TextField from "@mui/material/TextField";
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import HailIcon from '@mui/icons-material/Hail';
import NotListedLocationIcon from '@mui/icons-material/NotListedLocation';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';

import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

import IsLoggedIn from '../helperFiles/isLoggedIn';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';



/* Used in tags selector. Original code from https://mui.com/material-ui/react-select/#multiple-select */
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};



function getStyles(tag, tagsSelected, theme) {
  return {
    fontWeight:
      tagsSelected.indexOf(tag) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const locations = [
    {
        value: 'HOUSE',
        label: 'IN THE HOUSE',
        icon: <HomeIcon/>
    },

    {
        value: 'LOAN',
        label: 'ON LOAN',
        icon: <HailIcon/>
    },
    {
        value: 'LOST',
        label: 'LOST',
        icon: <NotListedLocationIcon/>
    }
];

function AddItemPage() {

    // getting email from localstorage (cache)
    let currentEmail = JSON.parse(window.localStorage.getItem("email"));
    
    const chipTheme = useTheme();
    const [tagsSelected, setTagsSelected] = React.useState([]);
    
    //Get request for getting all the tags
    let [tags, setTags] = useState([]);
    useEffect(() => {
        axios.get(process.env.REACT_APP_DATABASE_URL + '/itemRegister/get_all_tags').then(resp => {
        console.log(resp.data);

        //gets the tags in the form of a useable array
        let data = JSON.stringify(resp.data);
        let tagArr = JSON.parse(data);
        setTags(tagArr.tags);
        });
    });
    
    // storing tags from GET request as a way of visualised testing.
    // NOTE: can be removed with no effect on the product.
    window.localStorage.setItem("tags", JSON.stringify(tags));
    
    

    //displays the multiple tags on the tag selector when chosen
    const tagsHandler = (event) => {
        const {
        target: { value },
        } = event;
        setTagsSelected(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
        );
    };
    

    const [itemText, setItemText] = useState("");
    let itemHandler = (newInput) => {
      
      setItemText(newInput.target.value);
    };

    const [currentlySelected, setCurrentlySelected] = useState("");
    let currentlyHandler = (newInput) => {
      setCurrentlySelected(newInput.target.value);
    };

    const [locationText, setLocationText] = useState("");
    let locationHandler = (newInput) => {
      
      setLocationText(newInput.target.value);
    };

    const [newTagText, setNewTagText] = useState("");
    let newTagHandler = (newInput) => {
      
        setNewTagText(newInput.target.value);  
    };

    const [loanedText, setLoanedText] = useState("");
    let loanedHandler = (newInput) => {
      
        setLoanedText(newInput.target.value);
    };

    //if item loaned then make hidden false so that the text field can then be seen
    const [hiddenBool, setHidden] = useState(true);
    let hiddenHandler = (event) => {
        if (event === 'LOAN') {
            setHidden(false);
        }
        else {
            setHidden(true);
        }
    }

    //calls the 'is currently' value to check if it item has been loaned
    useEffect(() => {
        hiddenHandler(currentlySelected);
    })

    const item = {
        itemName: itemText,
        itemStatus: currentlySelected,
        itemLocation: locationText,
        itemTags: tagsSelected
    };

    // checks if fields where entered, if not throw error
    // Upon click of create tag button, the tag details will be pushed into the system 
    const confirmTag = () => {
    
        if (newTagText.trim().length === 0) {
            window.alert('Tag MUST contain at least 1 character');

        }

        if (newTagText.trim().length !== 0 ) {
            window.alert('Tag Created');

            
            axios({
                method: "post",
                data: {
                    newTag: newTagText,
                },
                withCredentials: true,
                url: process.env.REACT_APP_DATABASE_URL + "/itemRegister/add_new_tag/" + newTagText,
            }).then((res) => console.log(res));
            

            setNewTagText('');
            
        }
      };

    // checks if fields where entered, if not throw error
    // Upon click of delete tag button, the tag details will be deleted from the system 
    const deleteTag = () => {
    
        if (newTagText.trim().length === 0) {
            window.alert('Tag MUST contain at least 1 character');
        }

        if (newTagText.trim().length !== 0 ) {
            window.alert('Tag Deleted');

            axios({
                method: "post",
                data: {
                    newTag: newTagText,
                },
                withCredentials: true,
                url: process.env.REACT_APP_DATABASE_URL + "/itemRegister/delete_tag/" + newTagText,
            }).then((res) => console.log(res));

            setNewTagText('');
            
        }
      };

    // checks if fields where entered, if not throw error
    // Upon click of confirm item button, the items details will be pushed into the system 
    const confirmItem = () => {
        
    
        if (itemText.trim().length === 0) {
            window.alert('MUST give the item a name');

        } 
        if (currentlySelected.trim().length === 0) {
            window.alert("MUST set item's status");
        }
        if (locationText.trim().length === 0) {
            window.alert('MUST give item location');
        }  
        /*if (tagsSelected.trim().length == 0) {
            window.alert("MUST set item's tag");
        }*/
        if (hiddenBool === false && loanedText.trim().length === 0) {
            window.alert('MUST give name of person loaned to');
        }

        else if (itemText.trim().length !== 0 && currentlySelected.trim().length !== 0 &&
        locationText.trim().length !== 0) {
            window.alert('Item submitted');

            // storing the item locally for the add item page (need to implement GET call instead)
            window.localStorage.setItem("item", JSON.stringify(item));

            if (hiddenBool === false && loanedText.trim().length !== 0) {
                axios({
                    method: "post",
                    data: {
                        itemName: itemText,
                        itemStatus: currentlySelected,
                        itemLocation: locationText,
                        tags: tagsSelected,
                        email: currentEmail,
                        itemLoanedTo: loanedText,
                    },
                    withCredentials: true,
                    url: process.env.REACT_APP_DATABASE_URL + "/itemRegister",
                }).then((res) => console.log(res));
            }
            else {
                axios({
                    method: "post",
                    data: {
                        itemName: itemText,
                        itemStatus: currentlySelected,
                        itemLocation: locationText,
                        tags: tagsSelected,
                        email: currentEmail,
                    },
                    withCredentials: true,
                    url: process.env.REACT_APP_DATABASE_URL + "/itemRegister",
                }).then((res) => console.log(res));
            }

            //Image posting
            /*axios({
                method: "post",
                data: {
                    file: file
                },
                withCredentials: true,
                url: process.env.REACT_APP_DATABASE_URL + "/itemRegister",
            }).then((res) => console.log(res));*/

            setItemText('');
            setCurrentlySelected('');
            setLocationText('');
            setHidden(true);
            setLoanedText('');
            
        }
    };

    //used for selecting the image
    const [file, setFile] = useState();
    function handleImageSelect(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    IsLoggedIn();

    return (
        <div className="NavBar">
            <NavBar />
            <div className="Page Title">
                <p style={titleStyling}>
                    Add/Edit Item
                </p>
            </div> 

            <Box sx={{ flexGrow: 1 }}>
                
                <Grid
                    container
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="center"
                >   
                    <Grid>
                        <div className='Padding'>
                            ITEM NAME*
                            <br></br>
                            <TextField
                                error={itemText.length === 0}
                                id="outlined-required"
                                value={itemText}
                                onChange={itemHandler}
                                variant="outlined"
                                style={{width: 400}}  
                            />
                        </div>

                        <div className='Padding'>
                            IS CURRENTLY*
                            <br></br>
                            <TextField
                                error={currentlySelected.length === 0}
                                id="outlined-basic"
                                select
                                value={currentlySelected}
                                onChange={currentlyHandler}
                                variant="outlined"
                                style={{width: 400}}
                            >
                                {locations.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                    {option.icon}
                                    {option.label}
                                    </MenuItem>
                                ))}
                            </TextField> 
                        </div>

                        <div className='Padding' hidden={hiddenBool}>
                            PERSON LOANED TO*
                            <br></br>
                            <TextField
                                error={loanedText.length === 0}
                                id="outlined-basic"
                                value={loanedText}
                                onChange={loanedHandler}
                                variant="outlined"
                                style={{width: 400}}  
                            /> 
                        </div>

                        <div className='Padding'>
                            LOCATION*
                            <br></br>
                            <TextField
                                error={locationText.length === 0}
                                id="outlined-basic"
                                value={locationText}
                                onChange={locationHandler}
                                variant="outlined"
                                style={{width: 400}}  
                            /> 
                        </div>

                        <div className='Padding'>
                            TAGS
                            <br></br>

                            {/* Tags selector. Original code from https://mui.com/material-ui/react-select/#multiple-select */}
                            <FormControl sx={{ width: 400 }}>
                                <Select
                                labelId="demo-multiple-chip-label"
                                id="demo-multiple-chip"
                                multiple
                                value={tagsSelected}
                                onChange={tagsHandler}
                                input={<OutlinedInput id="select-multiple-chip"/>}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                                >
                                {tags.map((tag) => (
                                    <MenuItem
                                    key={tag}
                                    value={tag}
                                    style={getStyles(tag, tagsSelected, chipTheme)}
                                    >
                                    {tag}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>
                        </div> 
                    </Grid>
                    <Grid>
                        <div className='Padding'>
                            ADD IMAGE
                            <Card sx={{maxWidth: 345 }}>
                                <CardMedia
                                    component="img"
                                    height="250"
                                    image={file}
                                />
                            </Card>
                                <input type="file" accept="image/*" onChange={handleImageSelect} />
                            </div>
                            <br></br>
                            <div className='Padding'>
                            CREATE/DELETE TAG
                            <br></br>
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                id="outlined-basic"
                                value={newTagText}
                                onChange={newTagHandler}
                                variant="outlined"
                                style={{ width: 400}}  
                            />
                        </div>
                        <div className='PaddingCentre'>
                            <ThemeProvider theme={buttonTheme}>
                                <Button onClick={confirmTag} variant="contained" color="black" sx={{width: 175, fontSize: 20}}>
                                    Create Tag
                                </Button>  
                            </ThemeProvider>
                            &nbsp;&nbsp;&nbsp;
                            <ThemeProvider theme={buttonTheme}>
                                <Button onClick={deleteTag} variant="contained" color="black" sx={{width: 175, fontSize: 20}}>
                                    Delete Tag
                                </Button>  
                            </ThemeProvider>
                        </div>
                    </Grid>
                </Grid>
            </Box> 

            <div className="Centre">
                <br></br>
                <ThemeProvider theme={buttonTheme}>
                   <Button onClick={confirmItem} variant="contained" color="black" sx={{ width: 300, padding: 3, margin: 2, fontSize: 20}}>
                       Confirm Item
                    </Button>  
                </ThemeProvider>
            </div>
            
        </div>
    )
}

export default AddItemPage;