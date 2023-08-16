const PORT = 8000;
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const axios = require("axios");
const app = express();

app.use(cors({ origin: "http://localhost:3000" }));

let authRoutes = require("./routes/authRoutes")
app.use(authRoutes)


app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));