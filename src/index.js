// require('dotenv').config()

// we cant use the require because this will messed the consistncy of the code and also the thing is that it can produce multiple errors

import dotenv from "dotenv"
import connectDb from "./db/index.js"

dotenv.config({
    path: './env'
})

connectDb()





















/*
import express from "express"
const app = express();
((async ()=>{
    try {
     await mongoose.connect(`$(process.env.MONGODB_URI)/${DB_NAME}`)
     app.on("error", (error)=>{
        console.log("ERROR",  error)
        throw error
     })
      app.listen(process.env.PORT, ()=>{
        console.log(`APP IS LISTENING ON PORT ${process.env.PORT}`)
      })

    } catch (error) {
        console.error("ERROR:", error)
        throw error
    }
}))()*/