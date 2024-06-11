const express = require("express");
const cors =require("cors");
const userRouter = require("./routes/index");
const app = express();
app.use(express.json());
app.use("/api/v1",userRouter)
app.use(cors());
app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})

