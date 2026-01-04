const { runtime } = require("../lib/allFunction");
const os = require("os");

async function aliveCommand(conn, mek) {
    // 1. හඬ පටය (Voice Message) යැවීම
    const voiceUrl = "https://www.myinstants.com/media/sounds/anime-wow.mp3"; // ඔබේ Voice Link එක මෙතනට දාන්න
    
    await conn.sendMessage(mek.chat, { 
        audio: { url: voiceUrl }, 
        mimetype: 'audio/mp4', 
        ptt: true 
    }, { quoted: mek });

    // 2. Alive Message එකේ විස්තර සහ හැඩතල
    const aliveMsg = `
*╭───────────────┈⊷*
*│  ✨𝐙𝐄𝐏𝐈𝐗-𝐀𝐈✨*
*╰───────────────┈⊷*

*┏━━━━━━━━━━━━━━━━━━━━━┓*
*┃ 👤 User:* ${mek.pushName || 'User'}
*┃ 🕒 Runtime:* ${runtime(process.uptime())}
*┃ 📟 RAM:* ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)}GB
*┃ ⚙️ Platform:* ${os.platform()}
*┃ 📡 Server:* DigitalOcean
*┗━━━━━━━━━━━━━━━━━━━━━┛*

> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴇᴩɪx ᴩʀᴏɢʀᴀᴍ * 🚀`;

    // 3. පින්තූරය සමඟ Alive Message එක යැවීම
    const imageUrl = "https://telegra.ph/file/your-image-link.jpg"; // ඔබේ පින්තූරයේ Link එක මෙතනට දාන්න

    await conn.sendMessage(mek.chat, {
        image: { url: imageUrl },
        caption: aliveMsg,
        contextInfo: {
            externalAdReply: {
                title: "ALIVE STATUS",
                body: "System is running smoothly",
                mediaType: 1,
                sourceUrl: "https://github.com/your-repo", // ඔබේ ලින්ක් එකක් මෙතනට දාන්න
                thumbnailUrl: imageUrl,
                renderLargerThumbnail: true,
                showAdAttribution: true
            }
        }
    }, { quoted: mek });
}

