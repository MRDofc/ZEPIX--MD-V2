const { runtime } = require("../lib/allFunction");
const os = require("os");

module.exports = [
    {
        name: "alive",
        description: "Alive Command with Buttons",
        ownerOnly: false,
        async execute(sock, msg, args, context) {
            const { from, pushname, sadiya_md_footer } = context;
            try {
                // 1. මුලින්ම Audio එක යැවීම
                await sock.sendMessage(from, { 
                    audio: { url: 'https://files.catbox.moe/hfydyl.mp3' }, 
                    mimetype: 'audio/mpeg', 
                    ptt: false 
                }, { quoted: msg });

                const uptime = runtime(process.uptime());
                const usedMem = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
                const totalMem = Math.round(os.totalmem() / 1024 / 1024);

                let desc = `
╭━━━━〔 𝐙𝐄𝐏𝐈𝐗-𝐀𝐈 〕━━━━┈⊷
┃
┃ ⚡ *𝐇𝐢 ${pushname}, 𝐈'𝐦 𝐀𝐥𝐢𝐯𝐞 𝐍𝐨𝐰*
┃
┃ 📝 *𝐒𝐭𝐚𝐭𝐮𝐬:* 𝐎𝐧𝐥𝐢𝐧𝐞
┃ ⏳ *𝐑𝐮𝐧𝐭𝐢𝐦𝐞:* ${uptime}
┃ 💾 *𝐑𝐚𝐦:* ${usedMem}𝐌𝐁 / ${totalMem}𝐌𝐁
┃ ⚙️ *𝐏𝐥𝐚𝐭𝐟𝐨𝐫𝐦:* ${os.hostname()}
┃
╰━━━━━━━━━━━━━━━┈⊷`;

                // 2. Button සහිත Message එක පිළියෙල කිරීම
                const buttons = [
                    { buttonId: '.menu', buttonText: { displayText: '📜 MAIN MENU' }, type: 1 },
                    { buttonId: '.ping', buttonText: { displayText: '⚡ SPEED TEST' }, type: 1 }
                ];

                const buttonMessage = {
                    image: { url: "https://telegra.ph/file/your-image-url.jpg" }, // මෙතනට ඔබේ Image Link එකක් දෙන්න
                    caption: desc,
                    footer: sadiya_md_footer,
                    buttons: buttons,
                    headerType: 4
                };

                // 3. Message එක යැවීම
                await sock.sendMessage(from, buttonMessage, { quoted: msg });

            } catch (e) {
                console.log("Error in alive command:", e);
            }
        }
    }
]
