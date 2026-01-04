const axios = require('axios');

module.exports = [
    {
        name: "ai-auto",
        description: "Auto AI Chat using Gemini",
        ownerOnly: false,
        async execute(sock, msg, args, context) {
            const { from, isGroup, sender, body } = context;

            // පණිවිඩයක් නැතිනම් හෝ body හිස්නම් නතර කරන්න
            if (!body) return;

            // 1. පුද්ගලික මැසේජ් එකක් නම් (Direct Message)
            // 2. ගෲප් එකක බෝට්ව mention කරලා නම් පමණක් AI වැඩ කරන්න
            const isMentioned = body.includes(sock.user.id.split(':')[0]);
            const shouldReply = !isGroup || isMentioned;

            if (shouldReply) {
                try {
                    // API එකට යවන ප්‍රශ්නය (Mention එක ඉවත් කර පිරිසිදු කරගැනීම)
                    const query = body.replace(/@[0-9]+/g, '').trim();
                    if (!query) return;

                    const apiKey = "7ad4b6b9-4712-47cf-9500-22c5e0fd9728";
                    const apiUrl = `https://sadiya-tech-apis.vercel.app/api/ai/gemini?q=${encodeURIComponent(query)}&apikey=${apiKey}`;

                    // API Call එක ලබා ගැනීම
                    const response = await axios.get(apiUrl);
                    const aiText = response.data.result;

                    if (aiText) {
                        await sock.sendMessage(from, { text: aiText }, { quoted: msg });
                    }

                } catch (e) {
                    console.error("AI Plugin Error:", e);
                }
            }
        }
    }
]

