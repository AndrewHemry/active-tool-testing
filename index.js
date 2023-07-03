const PORT = 8000;
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const axios = require("axios");
const app = express();

app.use(cors());

app.route('/callback')
    .get((req, res) => getAuthorizationCode(req, res));

async function getAuthorizationCode(req, res) {
    let authorizationCode = req.query.code;
    console.log("The Authorization Code:", authorizationCode)

    try {
        // Make the POST request to the external API with the authorizationCode
        const response = await getAccessToken(authorizationCode);
        console.log("Access Token:", response)

        // Send the response from the external API back to the client
        // res.send({access_token: response})
        // res.json(response)
        res.send(`<script>window.opener.postMessage({ type: 'response', data: '${response}' }, 'http://localhost:3000');</script>`)
    } catch (error) {
        console.log("The error is", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function getAccessToken(authorizationCode) {

    try {
        let data = JSON.stringify({
            "grant_type": "authorization_code",
            "client_id": "096c981e58e4d75140a23d96312dc94857e74dfa492161e8712f617edc4849f5",
            "client_secret": process.env.REACT_APP_API_SECRET,
            "redirect_uri": "http://localhost:8000/callback",
            "code": authorizationCode
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://login-sandbox.procore.com/oauth/token',
            headers: { 
                'Content-Type': 'application/json', 
            },
            data : data
        };

        const response = await axios.request(config)

        return response.data.access_token;
    } catch (error) {
        console.log("Encountered an error", error)
        throw new Error("Failed to retrieve access token")
    }

    // axios.request(config)
    //     .then((response) => {
    //         console.log(JSON.stringify(response.data));
    //         console.log("Response Data")
            
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //         throw new Error("Failed to retrieve access token")
    // });
}

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));