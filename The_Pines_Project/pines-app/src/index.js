import React from "react";
import "./indexStyling.css";
import reportWebVitals from "./reportWebVitals";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./mainPage/MainPage";
import ProfilePage from "./profilePage/ProfilePage";
import AddItemPage from "./addItemPage/AddItemPage";
import LoginPage from "./registryAndLogin/LoginPage";
import RegistryPage from "./registryAndLogin/RegistryPage";
import VerificationPage from "./registryAndLogin/VerificationPage";
import ForgotPasswordPage from "./passwordChange/ForgotPassword";
import ChangePasswordPage from "./passwordChange/ChangePassword";
import NewPasswordPage from "./passwordChange/NewPassword";

require('dotenv').config(); // From https://medium.com/nerd-for-tech/get-global-variables-in-react-js-490cf68f2a73

export default function App() {

    return (

        // Allows for switching between pages
        <BrowserRouter>
            <Routes>
                <Route path="/mainPage" element={<MainPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/addItem" element={<AddItemPage />} />
                <Route path="/" element={<LoginPage />} />
                <Route path="/register" element={<RegistryPage />} />
                <Route path="/verifyLogin" element={<VerificationPage />} />
                <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
                <Route path="/changePassword" element={<ChangePasswordPage />} />
                <Route path="/newPassword" element={<NewPasswordPage />} />
            </Routes>
        </BrowserRouter>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
