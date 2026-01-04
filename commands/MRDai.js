const axios = require("axios");

module.exports = [
    {
        name: "ai",
        description: "Zepix AI Chat Command",
        ownerOnly: false,
        async execute(sock, msg, args, context) {
            const { from, pushname, reply, sadiya_md_footer } = context;
            
            try {
                let text = args.join(" ");
                if (!text) return reply(`👋 Hello ${pushname}, කරුණාකර ප්‍රශ්නයක් ඇතුළත් කරන්න.`);

                let query = text.toLowerCase();
                let result = "";

                // ඔයා කියපු විදිහට නම සහ හැදූ කෙනා ගැන පරීක්ෂා කිරීම
                if (query.includes("නම") || query.includes("ඔයා කවුද") || query.includes("who are you") || query.includes("your name")) {
                    result = "මම **Zepix AI**. ඔයාට උදව් කරන්න පුළුවන් බුද්ධිමත් සහායකයෙක්.";
                } 
                else if (query.includes("කවුද හැදුවේ") || query.includes("creator") || query.includes("made you") || query.includes("owner")) {
                    result = "මාව නිර්මාණය කළේ **දිනේෂ්** (Dinesh) විසිනි.";
                } 
                else {
                    // වෙනත් ප්‍රශ්න සඳහා API එක භාවිතා කිරීම
                    const apiKey = "7ad4b6b9-4712-47cf-9500-22c5e0fd9728";
                    const response = await axios.get(`https://sadiya-tech-apis.vercel.app/api/ai/gemini?q=${encodeURIComponent(text)}&apikey=${apiKey}`);
                    result = response.data.result;
                }

                if (!result) return reply("සමාවන්න, මට පිළිතුරක් සොයාගත නොහැකි විය.");

                // Alive style එකට පිළිතුර සැකසීම
                let aiResponse = `👋 Hello, ${pushname}

●🧑‍💻 **𝐙𝐄𝐏𝐈𝐗 𝐀𝐈 𝐑𝐄𝐒𝐏𝐎𝐍𝐒𝐄** 🧑‍💻●

${result}

*🌞Have A Nice Day🌞*

${sadiya_md_footer}`;

                await reply(aiResponse);

            } catch (e) {
                console.log(e);
                reply("API සම්බන්ධතාවයේ දෝෂයක් පවතී.");
            }
        }
    }
]

