import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Login = (props) => {
    const navigate = useNavigate();
    const urlCode = new URL("https://login-sandbox.procore.com/oauth/authorize?client_id=096c981e58e4d75140a23d96312dc94857e74dfa492161e8712f617edc4849f5&response_type=code&redirect_uri=http://localhost:8000/callback");
    let newWindow;

    useEffect(() => {
        window.addEventListener("message", handlePopupResponse);
    }, []);

    const handlePopupResponse = (event) => {
        const { type, data } = event.data

        if (type === "response" && data != null) {
            // props.setAccessToken(data) //Set the state for the access token
            // props.setIsLoggedIn(true) //Set the state to see if the user has been logged in or not
            newWindow.close()
            navigate("/dashboard")
        }        
    }

    const handleLogin = () => {
        authorizationPopUp()
    }

    const authorizationPopUp = () => {
        newWindow = window.open(
            `${urlCode}`,
            "popupWindow",
            "height=500,width=500,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes"
          );
    }

    return (
        <div className="login-body">
            <div className="login-body-container">
                <button className="login-btn" onClick={handleLogin}>
                    Login with Procore
                </button>
            </div>
        </div>
    )
}

export default Login;