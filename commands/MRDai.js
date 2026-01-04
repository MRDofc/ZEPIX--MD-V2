const axios = require("axios");

module.exports = [
    {
        name: "ai",
        description: "Gemini AI Chat Command",
        ownerOnly: false,
        async execute(sock, msg, args, context) {
            const { from, pushname, reply, sadiya_md_footer } = context;
            
            try {
                // පරිශීලකයා ඇසූ ප්‍රශ්නය ලබා ගැනීම
                let text = args.join(" ");
                
                if (!text) return reply(`👋 Hello ${pushname}, කරුණාකර ප්‍රශ්නයක් ඇතුළත් කරන්න.\n\n*උදාහරණ:* .ai ඔයා කවුද?`);

                // API එකට Request එක යැවීම
                const apiKey = "7ad4b6b9-4712-47cf-9500-22c5e0fd9728";
                const response = await axios.get(`https://sadiya-tech-apis.vercel.app/api/ai/gemini?q=${encodeURIComponent(text)}&apikey=${apiKey}`);
                
                const result = response.data.result;

                if (!result) return reply("සමාවන්න, මට පිළිතුරක් සොයාගත නොහැකි විය.");

                // Alive එකේ format එකටම පිළිතුර සැකසීම
                let aiResponse = `👋 Hello, ${pushname}

●🧑‍💻 𝐆𝐄𝐌𝐈𝐍𝐈 𝐀𝐈 𝐑𝐄𝐒𝐏𝐎𝐍𝐒𝐄 🧑‍💻●

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

