const axios = require("axios");
const cheerio = require("cheerio");



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
    const $ = cheerio.load(html.data);

    //e1iiyghw3
    const warList = $(".e1iiyghw2");
    
    let textList = [];
    warList.each((idx,node) => {
        const title = $(node).find(".game").text();
        const champ = $(node).find(".info").find(".champion").find(".icon").children("a").children("img").attr("alt");
        const kda = $(node).find(".info").find(".kda").find(".k-d-a");

        totalText += `${title}\n${champ}\n${kda.text()}\n이상 전적`;
    })

    return totalText;
}

async function main(){
    console.log(await parsing("hideonbush"));
}

main();