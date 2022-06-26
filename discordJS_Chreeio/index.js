const config = require("./config.json");
const { Client, Intents } = require('discord.js');
const prefix = "/";
//크롤링 코드
const axios = require("axios");
const cheerio = require("cheerio");

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });




client.on("message", async function(message) {
    // message 작성자가 봇이면 그냥 return
    if (message.author.bot) return;
    // message 시작이 prefix가 아니면 return
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    //const command = args;
    const command = args.shift().toLowerCase();
    
    if (command === "안내") {
        message.reply(`안내해드리겠습니다. 여기는 멍냥님의 디스코드 서버입니다 어서오세요`);
    }else if(command === "전적"){
        const command = args.shift();
        //command에는 페이커가 들어가있는 상태
        message.reply(` ${command} 의 전적`);
        message.reply(` ${await parsing(command)} `);
    }
});

//롤 크롤링 메서드
const getHTML = async(keyword) => {
    try {
        return await axios.get(`https://www.op.gg/summoners/kr/${encodeURI(keyword)}`)
    }catch(err){
        //나중에 message.reply로 바꿔주면될듯?
        console.log("소환사가 존재하지 않습니다.");
    }
}


const parsing = async (keyword) => {
    let totalText = "";
    const html = await getHTML(keyword);
    console.log(`${keyword} 들어온 것\n`);
    const $ = cheerio.load(html.data);

    //e1iiyghw3
    const warList = $(".e1iiyghw2");
    
    let textList = [];
    warList.each((idx,node) => {
        const title = $(node).find(".game").text();
        const champ = $(node).find(".info").find(".champion").find(".icon").children("a").children("img").attr("alt");
        const kda = $(node).find(".info").find(".kda").find(".k-d-a");

        totalText += `${title}\n${champ}\n${kda.text()}\n\n`;
    })

    totalText+="이상 전적..";
    return totalText;
}
//롤 크롤링 메서드

client.login(config.BOT_TOKEN);