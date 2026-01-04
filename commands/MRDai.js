const axios = require("axios");

module.exports = [
    {
        name: "ai",
        description: "Zepix AI - Smart & Emotional",
        ownerOnly: false,
        async execute(sock, msg, args, context) {
            const { from, sender, reply } = context;
            
            try {
                let text = args.join(" ");
                if (!text) return sock.sendMessage(from, { text: `👋 Hello @${sender.split('@')[0]}, කරුණාකර ප්‍රශ්නයක් අහන්න.`, mentions: [sender] }, { quoted: msg });

                // කාලය අනුව සුබපැතුම (Sri Lanka Time)
                const hour = new Date().getHours();
                let wish = "සුබ දවසක්!"; 
                if (hour >= 5 && hour < 12) wish = "සුබ උදෑසනක්! 🌅";
                else if (hour >= 12 && hour < 17) wish = "සුබ දහවලක්! ☀️";
                else if (hour >= 17 && hour < 20) wish = "සුබ සැන්දෑවක්! 🌆";
                else wish = "සුබ රාත්‍රියක්! 🌙";

                // API එකට කෙලින්ම ප්‍රශ්නය යැවීම
                const apiKey = "7ad4b6b9-4712-47cf-9500-22c5e0fd9728";
                const response = await axios.get(`https://sadiya-tech-apis.vercel.app/api/ai/gemini?q=${encodeURIComponent(text)}&apikey=${apiKey}`);
                
                let result = response.data.result;

                // AI එකට අනන්‍යතාවය ලබා දීම (API එකෙන් නම වෙනස් කරන්නේ නැතිනම් මෙතනින් හදනවා)
                let finalResult = result;
                
                // සරලව නම සහ නිර්මාතෘ වෙනස් කිරීම
                const lowerText = text.toLowerCase();
                if (lowerText.includes("your name") || lowerText.includes("නම මොකක්ද") || lowerText.includes("ඔයා කවුද")) {
                    finalResult = "මම **Zepix AI**. ඔයාට ඕනෑම දෙයකට උදව් කරන්න මම සූදානම්! 😊";
                } else if (lowerText.includes("who made you") || lowerText.includes("හැදුවේ කවුද") || lowerText.includes("owner")) {
                    finalResult = "මාව නිර්මාණය කළේ **දිනේෂ්** (Dinesh) විසිනි. 👨‍💻";
                }

                if (!finalResult) return reply("සමාවන්න, මට පිළිතුරක් ලබා දීමට නොහැකි විය.");

                // මැසේජ් එක සැකසීම
                let aiResponse = `${wish}\n\n👋 Hello @${sender.split('@')[0]}\n\n${finalResult}`;

                // මැසේජ් එක යැවීම
                await sock.sendMessage(from, { 
                    text: aiResponse, 
                    mentions: [sender] 
                }, { quoted: msg });

            } catch (e) {
                console.error("AI Error:", e);
                reply("සමාවන්න, AI සේවාව මේ මොහොතේ ක්‍රියා විරහිතයි.");
            }
        }
    }
]

