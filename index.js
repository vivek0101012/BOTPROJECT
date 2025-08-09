const express= require("express")
const bot= require('./botproject')

const app= express();






app.get("/",(req,res)=>{


 
    return res.send("bot is running ")

})

bot.launch()


app.listen(3000,()=>{
    console.log("server started ")
})