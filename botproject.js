// this project uses the telegraf npm package that handles all the  internal api calls that the tg bot exposes  
// here  .on ,.command , .start are all even listeners  
// on each type of event they need some call back function -- (ctx)=>{do something }

// ctx = refers  to context object it has 
// info of current message and other details 
// it also let users send a response against recieved command  using ctx.reply(string  only )

// read in detail -- at npm telegraf

const { Telegraf } = require("telegraf");
const axios = require("axios");
require('dotenv').config();// Loads .env file values into process.env

// Read environment variables
const BOT_TOKEN = process.env.BOT_TOKEN;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

const bot=new Telegraf(BOT_TOKEN)




bot.start(ctx=>{

    const user=ctx.message.chat.first_name + " " +ctx.message.chat.last_name;
    
    
    ctx.reply(`Hii ${user} , I am weather news bot . Please send the place name . eg-London `)

})
bot.on("text",async (ctx)=>{

const query=ctx.message.text.toLowerCase().trim();

const arr= query.split(' ');
if(arr.length>1){
    ctx.reply("please send only the place name ")
}

else {



const url= `http://api.weatherapi.com/v1/current.json?q=${query}&key=${WEATHER_API_KEY}`

const response=await axios.get(url)
const data=response.data
const weatherInfo = `
📍 *Location:* ${data.location.name}, ${data.location.country}
🌡️ *Temperature:* ${data.current.temp_c}°C (Feels like ${data.current.feelslike_c}°C)
🌤️ *Condition:* ${data.current.condition.text}
💧 *Humidity:* ${data.current.humidity}%
🌬️ *Wind:* ${data.current.wind_kph} km/h ${data.current.wind_dir}
🌫️ *Visibility:* ${data.current.vis_km} km
☁️ *Cloud Coverage:* ${data.current.cloud}%
`;

// For Telegram with MarkdownV2 formatting:
ctx.reply(weatherInfo, { parse_mode: 'Markdown' });






}


})



module.exports=bot