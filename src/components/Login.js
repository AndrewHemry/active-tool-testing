import React from "react";

const Login = (props) => {
    const urlCode = new URL("https://login-sandbox.procore.com/oauth/authorize?client_id=096c981e58e4d75140a23d96312dc94857e74dfa492161e8712f617edc4849f5&response_type=code&redirect_uri=http://localhost:8000/callback");
    let newWindow;

    const handleLogin = () => {
        console.log("Login was pressed")
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
        <div>
            <button onClick={handleLogin}>Login with Procore</button>
        </div>
    )
}

export default Login;