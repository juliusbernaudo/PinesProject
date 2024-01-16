/*
    Back button that will route to the previous page depending on what pathing is provided
*/

import React from "react";
import {
    Card,
    Typography,
    CardContent,
    CardActions,
    Button,
    Modal,
    CardMedia,
} from "@mui/material";
import EditItem from "./EditItem";
import { backEndURL } from "../helperFiles/navigationPaths";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import axios from "axios";

//import {useState, useEffect} from "react";

function RenderItemCard({ item }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //deletes item when deleteicon is pressed
    const handleDelete = () => {
        axios({
            method: "post",
            withCredentials: true,
            url: process.env.REACT_APP_DATABASE_URL + "/itemRegister/delete_item/" + item._id,
        }).then((res) => console.log(res));

        //refresh page so item will disappear
        window.location.reload();
    }
/*
    const [img, setImg] = useState();
    const fetchImage = async () => {
        const res = await fetch(process.env.REACT_APP_DATABASE_URL + item.image_url);
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setImg(imageObjectURL);
    };

    useEffect(() => {
    fetchImage();
    }, []);
    */
    if (item.image_url !== '/image/get_image/undefined') {
        return (
            <>
                <div className="BoxFlex">
                    <Card
                        sx={{ maxWidth: 345, pr: 20 }}
                        style={{ background: "#C4EFF3" }}
                    >
                        <CardMedia
                            component="img"
                            height="140"
                            image={process.env.REACT_APP_DATABASE_URL + item.image_url}
                            alt="No Image"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {item.itemName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Status: {item.itemStatus}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Tags: {item.tags}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Location: {item.itemLocation}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={handleOpen}>
                                Edit Item
                            </Button>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <EditItem itemData={item} />    
                            </Modal>
                            <IconButton aria-label="delete" onClick={handleDelete}>
                                <DeleteIcon />
                            </IconButton>
                        </CardActions>
                        
                    </Card>
                </div>
            </>
        );
    }
    else {
        return (
            <>
                <div className="BoxFlex">
                    <Card
                        sx={{ maxWidth: 345, pr: 20 }}
                        style={{ background: "#C4EFF3" }}
                    >
                        {/*
                        <CardMedia
                            component="img"
                            height="140"
                            image={process.env.REACT_APP_DATABASE_URL + item.image_url}
                            alt="No Image"
                        />
                        */}
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {item.itemName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Status: {item.itemStatus}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Tags: {item.tags}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Location: {item.itemLocation}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={handleOpen}>
                                Edit Item
                            </Button>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <EditItem itemData={item} />    
                            </Modal>
                            <IconButton aria-label="delete" onClick={handleDelete}>
                                <DeleteIcon />
                            </IconButton>
                        </CardActions>
                    </Card>
                </div>
            </>
        );
    }
}

export default RenderItemCard;
