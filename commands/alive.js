const { cmd, commands } = require('../command'); // ඔබේ bot එකේ command path එක මෙතනට දාන්න
const { runtime } = require("../lib/allFunction");
const os = require("os");

cmd({
    pattern: "alive",
    desc: "To check bot is alive or no.",
    category: "main",
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // 1. හඬ පටය (Voice Message) යැවීම
        const voiceUrl = "https://files.catbox.moe/v9d9o1.mp3"; 
        
        await conn.sendMessage(from, { 
            audio: { url: voiceUrl }, 
            mimetype: 'audio/mp4', 
            ptt: true 
        }, { quoted: mek });

        // 2. Alive Message එකේ විස්තර සහ හැඩතල
        const aliveMsg = `
*╭───────────────┈⊷*
*│  ✨ 𝐙𝐄𝐏𝐈𝐗-𝐀𝐈 ✨*
*╰───────────────┈⊷*

*┏━━━━━━━━━━━━━━━━━━━━━┓*
*┃ 👤 User:* ${pushname}
*┃ 🕒 Runtime:* ${runtime(process.uptime())}
*┃ 📟 RAM:* ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)}GB
*┃ ⚙️ Platform:* ${os.platform()}
*┃ 📡 Server:* DigitalOcean
*┗━━━━━━━━━━━━━━━━━━━━━┛*

> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴇᴩɪx ᴩʀᴏɢʀᴀᴍ* 🚀`;

        // 3. පින්තූරය සමඟ Alive Message එක යැවීම
        const imageUrl = "https://files.catbox.moe/h7g8sj.jpg"; 

        return await conn.sendMessage(from, {
            image: { url: imageUrl },
            caption: aliveMsg,
            contextInfo: {
                externalAdReply: {
                    title: "𝐙𝐄𝐏𝐈𝐗-𝐀𝐈 𝐈𝐒 𝐀𝐋𝐈𝐕𝐄",
                    body: "System is running smoothly",
                    mediaType: 1,
                    sourceUrl: "https://github.com/MRDofc/ZEPIX--MD-V2",
                    thumbnailUrl: imageUrl,
                    renderLargerThumbnail: true,
                    showAdAttribution: true
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

