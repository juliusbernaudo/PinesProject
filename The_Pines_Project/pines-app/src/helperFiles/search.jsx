import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import EditItem from "../itemRender/EditItem";

import { 
    Autocomplete,
    TextField,
    Modal,
} from "@mui/material";

export default function Search() {

    let [items, setItems] = useState([]);
    useEffect(() => {
      let currentEmail = JSON.parse(window.localStorage.getItem("email"));
      axios.get(process.env.REACT_APP_DATABASE_URL + '/test/get_all_item/'+currentEmail).then(resp => {
      console.log(resp.data);

      //gets the items in the form of a useable array
      let data = JSON.stringify(resp.data);
      let itemArr = JSON.parse(data);
      setItems(itemArr);
      });
    }, []);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [value, setValue] = useState();


    return (
        <div>
            <Autocomplete
            disablePortal
            id="search-combo-box"
            options={items}
            value={value}
            disableClearable
            getOptionLabel={(option) => option.itemName.toString()}
            onChange={(e, newValue) => {
                console.log(e.target, newValue.itemName);
                handleOpen();
                setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} label="Item Search" sx={{ width: 200 }} />} 
            />

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                    <EditItem itemData={value} />    
            </Modal>
        </div>
    );
}