const { runtime } = require("../lib/allFunction");
const os = require("os");

module.exports = [
    {
        name: "menu",
        description: "Main Menu of ZEPIX-AI",
        ownerOnly: false,
        async execute(sock, msg, args, context) {
            const { from, pushname, replyimg, sadiya_md_footer } = context;
            try {
                // 1. Voice එක Forward කළ එකක් ලෙස යැවීම
                await sock.sendMessage(from, { 
                    audio: { url: 'https://files.catbox.moe/08dzp8.mp3' }, 
                    mimetype: 'audio/mp4',
                    ptt: false, 
                    contextInfo: {
                        forwardingScore: 999,
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: '120363357105376275@newsletter',
                            newsletterName: 'ᴍʀ ᴅɪɴᴇꜱʜ',
                            serverMessageId: 143
                        }
                    }
                }, { quoted: msg });

                const uptime = runtime(process.uptime());
                const time = new Date().toLocaleTimeString();
                const date = new Date().toLocaleDateString();

                let menuText = `
╭━━━━〔 𝐙𝐄𝐏𝐈𝐗-𝐀𝐈 𝐌𝐄𝐍𝐔 〕━━━━┈⊷
┃
┃ ⚡ *𝐇𝐞𝐥𝐥𝐨, ${pushname}*
┃
┃ ◈ ══════ 𝐒𝐲𝐬𝐭𝐞𝐦 𝐈𝐧𝐟𝐨 ══════ ◈
┃
┃ 📅 *𝐃𝐚𝐭𝐞:* ${date}
┃ 🕒 *𝐓𝐢𝐦𝐞:* ${time}
┃ ⏳ *𝐔𝐩𝐭𝐢𝐦𝐞:* ${uptime}
┃ ⚙️ *𝐏𝐥𝐚𝐭𝐟𝐨𝐫𝐦:* ${os.hostname()}
┃ 👤 *𝐎𝐰𝐧𝐞𝐫:* ᴍʀ ᴅɪɴᴇꜱʜ ᴏꜰᴄ
┃
┃ ◈ ══════ 𝐂𝐚𝐭𝐞𝐠𝐨𝐫𝐢𝐞𝐬 ══════ ◈
┃
┃  ➊ || 𝐃𝐨𝐰𝐧𝐥𝐨𝐚𝐝 𝐌𝐞𝐧𝐮
┃  ➋ || 𝐆𝐫𝐨𝐮𝐩 𝐌𝐞𝐧𝐮
┃  ➌ || 𝐀𝐢 𝐂𝐡𝐚𝐭 𝐌𝐞𝐧𝐮
┃  ➍ || 𝐒𝐞𝐭𝐭𝐢𝐧𝐠 𝐌𝐞𝐧𝐮
┃  ➎ || 𝐋𝐨𝐠𝐨 𝐌𝐞𝐧𝐮
┃
┃ ◈ ════════════════════ ◈
┃
┃ 💡 *𝐑𝐞𝐩𝐥𝐲 𝐖𝐢𝐭𝐡 𝐓𝐡𝐞 𝐍𝐮𝐦𝐛𝐞𝐫*
┃
╰━━━━━━━━━━━━━━━━━━━┈⊷

${sadiya_md_footer}`;

                // 2. Image එක සමඟ Menu එක යැවීම
                await replyimg(menuText);

            } catch (e) {
                console.error("Error in menu command:", e);
            }
        }
    }
]
