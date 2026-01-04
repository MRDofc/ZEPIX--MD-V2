const axios = require("axios");

module.exports = [
    {
        name: "ai",
        description: "Zepix AI - Advanced Chat",
        ownerOnly: false,
        async execute(sock, msg, args, context) {
            const { from, sender, pushname, reply } = context;
            
            try {
                let text = args.join(" ");
                if (!text) return reply(`👋 Hello @${sender.split('@')[0]}, කරුණාකර මොනවා හරි අහන්න.`, { mentions: [sender] });

                // කාලය අනුව සුබපැතුම තීරණය කිරීම
                const hour = new Date().getHours();
                let wish = "";
                if (hour >= 5 && hour < 12) wish = "සුබ උදෑසනක්! 🌅";
                else if (hour >= 12 && hour < 18) wish = "සුබ දහවලක්! ☀️";
                else if (hour >= 18 && hour < 22) wish = "සුබ සැන්දෑවක්! 🌆";
                else wish = "සුබ රාත්‍රියක්! 🌙";

                // AI එකට දෙන විශේෂ උපදෙස් (Prompt)
                const systemInstruction = `You are Zepix AI, a friendly and emotional AI assistant. 
                Your creator is Dinesh. If someone asks who made you, say 'Dinesh'. 
                If someone asks your name, say 'Zepix AI'. 
                Always understand user's emotions and talk like a real human. 
                Respond in the same language as the user (Sinhala or English).`;

                const fullQuery = `${systemInstruction}\n\nUser: ${text}`;
                
                const apiKey = "7ad4b6b9-4712-47cf-9500-22c5e0fd9728";
                const apiUrl = `https://sadiya-tech-apis.vercel.app/api/ai/gemini?q=${encodeURIComponent(fullQuery)}&apikey=${apiKey}`;

                const response = await axios.get(apiUrl);
                let result = response.data.result;

                if (!result) return reply("සමාවන්න, මට මේ වෙලාවේ පිළිතුරක් දෙන්න අමාරුයි.");

                // අවසාන මැසේජ් එක සැකසීම
                let finalMsg = `${wish}\n\n👋 Hello @${sender.split('@')[0]}\n\n${result}`;

                // මැසේජ් එක යැවීම (Mention සමඟ)
                await sock.sendMessage(from, { 
                    text: finalMsg, 
                    mentions: [sender] 
                }, { quoted: msg });

            } catch (e) {
                console.log(e);
                reply("සමාවන්න, සර්වර් එකේ පොඩි දෝෂයක් තියෙනවා.");
            }
        }
    }
]

