const express = require("express")
const app = express();
const bodyParser = require("body-parser")
const cors = require("cors")
require("dotenv").config()
require('./models/db')
const PORT = process.env.PORT || 8080
const AuthRouter = require("./routes/authRouter")

app.get("/yes",(req,res)=>{
    res.send("it is working")
})

app.use(bodyParser.json());
app.use(cors());
app.use("/auth",AuthRouter)

app.listen(PORT, ()=>{
    console.log(`SEREVR IS RUNNING ON ${PORT}`);
})