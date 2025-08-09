const express = require("express");
const bot = require("./botproject");

const app = express();

app.get("/", (req, res) => {
  res.send("Bot is running");
});

bot.launch();

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
