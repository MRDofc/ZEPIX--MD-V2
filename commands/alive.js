const { runtime } = require("../lib/allFunction");
const os = require("os");

module.exports = [
    {
        name: "alive",
        description: "Alive Command",
        ownerOnly: false,
        async execute(sock, msg, args, context) {
            const { from, pushname, replyimg, sadiya_md_footer } = context;
            try {
                // 1. Audio එක Forward කළ පණිවිඩයක් ලෙස සැමට පෙනෙන පරිදි යැවීම
                await sock.sendMessage(from, { 
                    audio: { url: 'https://files.catbox.moe/hfydyl.mp3' }, 
                    mimetype: 'audio/mp4', // මෙය වඩාත් ස්ථාවරයි
                    ptt: false, 
                    contextInfo: {
                        forwardingScore: 999,
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: '120363357105376275@newsletter', // @g.us කොටස ඉවත් කර නිවැරදි JID එක යොදන්න
                            newsletterName: 'ᴍʀ ᴅɪɴᴇꜱʜ',
                            serverMessageId: 143
                        }
                    }
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

                // 2. රූපය සහ විස්තරය යැවීම
                await replyimg(desc);

            } catch (e) {
                console.error("Error in alive command:", e);
            }
        }
    }
]
