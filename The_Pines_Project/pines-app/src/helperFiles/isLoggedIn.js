import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../helperFiles/navigationPaths";

function IsLoggedIn() {
    const navigate = useNavigate();

    //checks if the email has been saved, if not then direct to the login page
    const checkLoggedIn = useCallback(() => {
        if (window.localStorage.getItem("email") === null) {
            navigate(login);
        }
    }, [navigate]);
    
    //loads once when page is loaded and calls checkLoggedIn method
    useEffect(() => {
        checkLoggedIn();
    }, [checkLoggedIn]);
}
export default IsLoggedIn;

  