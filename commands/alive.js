const { runtime } = require("../lib/allFunction");
const os = require("os");

module.exports = [
    {
        name: "alive",
        description: "Alive Command",
        ownerOnly: false,
        async execute(sock, msg, args, context) {
            const { from, pushname, replyimg, sadiya_md_footer } = context;
            
            // රූපය සඳහා URL එකක් හෝ Path එකක් මෙතැනට ලබා දෙන්න
            const imageUrl = "https://files.catbox.moe/h7g8sj.jpg"; 

            try {
                let desc = `✨ *─── 『 ZEPIX-AI 』 ───* ✨

👋 *Hello, ${pushname}*

*╭──────────────●●►*
*│* 🤖 *Bot:* ZEPIX-AI
*│* ⏳ *Uptime:* ${runtime(process.uptime())}
*│* 📟 *RAM:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(os.totalmem() / 1024 / 1024)}MB
*│* 📍 *Host:* ${os.hostname()}
*│* 👨‍💻 *Owner:* ᴍʀ ᴅɪɴᴇꜱʜ ᴏꜰᴄ
*╰──────────────●●►*

*📢 Select an option:*
*1️⃣ | 📍 Bot Speed*
*2️⃣ | 📂 Menu Panel*

> ${sadiya_md_footer}`;

                // Image එක සහ Text එක එකට යැවීමට
                await replyimg(imageUrl, { caption: desc });

            } catch (e) {
                console.log("Error in alive command:", e);
            }
        }
    }
]

