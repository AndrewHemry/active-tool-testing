import React, { useEffect, useState } from "react";

const Login = (props) => {
    const urlCode = new URL("https://login-sandbox.procore.com/oauth/authorize?client_id=096c981e58e4d75140a23d96312dc94857e74dfa492161e8712f617edc4849f5&response_type=code&redirect_uri=http://localhost:8000/callback");
    let newWindow;
    const [buttonClicked, setButtonClicked] = useState(false)
    const [accessToken, setAccessToken] = useState('')

    useEffect(() => {
        window.addEventListener("message", handlePopupResponse);

        // May not need the code below
        // return () => {
        //     window.removeEventListener("message", handlePopupResponse)
        // };
    }, []);

    const handlePopupResponse = (event) => {
        const { type, data } = event.data

        if (type == "response" && data != null) {
            setAccessToken(data) //Set the state for the access token
            newWindow.close()
        }        
    }

    const handleLogin = () => {
        console.log("Login was pressed")
        authorizationPopUp()
        setButtonClicked(true) //Set the state to true
    }

    const authorizationPopUp = () => {
        newWindow = window.open(
            `${urlCode}`,
            "popupWindow",
            "height=500,width=500,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes"
          );
    }

    return (
        <div>
            <button onClick={handleLogin}>Login with Procore</button>
            <p>The Button Clicked State: {buttonClicked.toString()}</p>
            <div>
                {accessToken ? (
                    <p>The Access Token: {accessToken}</p>
                ) : (
                    <p>Waiting for Access Token...</p>
                )}
            </div>
        </div>
    )
}

export default Login;