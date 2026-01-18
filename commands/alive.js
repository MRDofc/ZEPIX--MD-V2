const { runtime } = require("../lib/allFunction");
const os = require("os");

module.exports = [
    {
        name: "alive",
        description: "Alive Command with Buttons",
        ownerOnly: false,
        async execute(sock, msg, args, context) {
            const { from, pushname, replyimg, sadiya_md_footer } = context;
            try {
                // 1. මුලින්ම Audio එක Send කිරීම
                await sock.sendMessage(from, { 
                    audio: { url: 'https://files.catbox.moe/hfydyl.mp3' }, 
                    mimetype: 'audio/mpeg', 
                    ptt: true 
                }, { quoted: msg });

                const uptime = runtime(process.uptime());
                const usedMem = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
                const totalMem = Math.round(os.totalmem() / 1024 / 1024);

                let desc = `
╭━━━━〔 𝐙𝐄𝐏𝐈𝐗-𝐀𝐈 〕━━━━┈⊷
┃
┃ ⚡ *𝐇𝐢 ${pushname}, 𝐈'𝐦 𝐀𝐥𝐢𝐯𝐞 𝐍𝐨𝐰*
┃
┃ ◈ ═════════════════ ◈
┃
┃ 📝 *𝐒𝐭𝐚𝐭𝐮𝐬:* 𝐎𝐧𝐥𝐢𝐧𝐞
┃ ⏳ *𝐑𝐮𝐧𝐭𝐢𝐦𝐞:* ${uptime}
┃ 💾 *𝐑𝐚𝐦:* ${usedMem}𝐌𝐁 / ${totalMem}𝐌𝐁
┃ ⚙️ *𝐏𝐥𝐚𝐭𝐟𝐨𝐫𝐦:* ${os.hostname()}
┃ 👤 *𝐎𝐰𝐧𝐞𝐫:* ᴍʀ ᴅɪɴᴇꜱʜ ᴏꜰᴄ
┃
┃ ◈ ═════════════════ ◈
┃
┃ 🔢 *𝐑𝐞𝐩𝐥𝐲 𝐁𝐞𝐥𝐨𝐰 𝐍𝐮𝐦𝐛𝐞𝐫*
┃
┃  ➊ || 𝐒𝐩𝐞𝐞𝐝 𝐓𝐞𝐬𝐭
┃  ➋ || 𝐌𝐚𝐢𝐧 𝐌𝐞𝐧𝐮
┃
╰━━━━━━━━━━━━━━━┈⊷
 
   *ꜱᴛᴀʏ ᴄᴏɴɴᴇᴄᴛᴇᴅ ᴡɪᴛʜ ᴢᴇᴘɪx*
${sadiya_md_footer}`;

                // 2. Buttons සෑදීම
                const buttons = [
                    { buttonId: '.menu', buttonText: { displayText: '𝐌𝐀𝐈𝐍 𝐌𝐄𝐍𝐔' }, type: 1 },
                    { buttonId: '.ping', buttonText: { displayText: '𝐒𝐏𝐄𝐄𝐃 𝐓𝐄𝐒𝐓' }, type: 1 }
                ];

                // 3. Image එක සහ Buttons සමඟ Message එක යැවීම
                // ඔබේ බොට් එකේ config අනුව image එක මෙතනට ඇතුලත් වේ
                await sock.sendMessage(from, {
                    image: { url: "https://files.catbox.moe/hfydyl.mp3" }, // මෙතනට වලංගු Image Link එකක් දාන්න (උදා: https://i.ibb.co/....)
                    caption: desc,
                    footer: sadiya_md_footer,
                    buttons: buttons,
                    headerType: 4
                }, { quoted: msg });

            } catch (e) {
                console.log("Error in alive command:", e);
            }
        }
    }
]
