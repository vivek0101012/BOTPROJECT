
import express from "express";
import bot from "./bot.js"; 


const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Bot is running!");
});


bot.launch();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
