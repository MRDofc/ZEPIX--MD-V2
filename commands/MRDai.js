
const axios = require('axios');

// AI එක On ද Off ද කියලා මතක තබා ගැනීමට (බෝට් Restart උනොත් මෙය Reset වේ)
let autoAiSettings = {}; 

module.exports = [
    {
        name: "ai",
        description: "Enable or Disable Auto AI Chat",
        ownerOnly: false,
        async execute(sock, msg, args, context) {
            const { from, reply } = context;
            const action = args[0] ? args[0].toLowerCase() : "";

            if (action === "on") {
                autoAiSettings[from] = true;
                return reply("🤖 Auto AI Chat සක්‍රිය කරන ලදී!");
            } else if (action === "off") {
                autoAiSettings[from] = false;
                return reply("😴 Auto AI Chat අක්‍රිය කරන ලදී!");
            } else {
                return reply("පාවිච්චි කරන ක්‍රමය:\n*.ai on* - සක්‍රිය කිරීමට\n*.ai off* - අක්‍රිය කිරීමට");
            }
        }
    },
    {
        name: "auto-ai-core",
        description: "Hidden core for Auto AI",
        ownerOnly: false,
        async execute(sock, msg, args, context) {
            const { from, body, isGroup } = context;

            // මෙම Chat එක සඳහා AI On කර ඇත්දැයි බැලීම
            if (!autoAiSettings[from]) return;

            // Command එකක් නම් (උදා: . හෝ / වලින් පටන් ගන්නා ඒවා) AI රිප්ලයි නොකිරීමට
            if (!body || body.startsWith('.') || body.startsWith('/')) return;

            try {
                const apiKey = "7ad4b6b9-4712-47cf-9500-22c5e0fd9728";
                const apiUrl = `https://sadiya-tech-apis.vercel.app/api/ai/gemini?q=${encodeURIComponent(body)}&apikey=${apiKey}`;

                const response = await axios.get(apiUrl);
                const aiText = response.data.result;

                if (aiText) {
                    await sock.sendMessage(from, { text: aiText }, { quoted: msg });
                }
            } catch (e) {
                console.error("AI API Error:", e);
            }
        }
    }
]

