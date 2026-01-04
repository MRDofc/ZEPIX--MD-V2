const { runtime } = require("../lib/allFunction");
const os = require("os");

module.exports = [
    {
        name: "zepix-auto-voice",
        description: "Auto voice reply system for Zepix AI",
        ownerOnly: false,
        async execute(sock, msg, args, context) {
            const { from, body, sender } = context;

            if (!body) return;

            // පණිවිඩය කුඩා අකුරු වලට හරවා පරීක්ෂා කිරීම
            const input = body.toLowerCase().trim();

            // කාලය අනුව සුබපැතුම
            const hour = new Date().getHours();
            let wish = "සුබ දවසක්!"; 
            if (hour >= 5 && hour < 12) wish = "සුබ උදෑසනක්! 🌅";
            else if (hour >= 12 && hour < 17) wish = "සුබ දහවලක්! ☀️";
            else if (hour >= 17 && hour < 20) wish = "සුබ සැන්දෑවක්! 🌆";
            else wish = "සුබ රාත්‍රියක්! 🌙";

            // ඔයා ලබාදුන් Voice Links ඇතුළත් ලිස්ට් එක
            const voiceData = {
                "gn": "https://files.catbox.moe/7dt9mn.mp3",
                "hu": "https://files.catbox.moe/6wlbev.mp3",
                "pakaya": "https://files.catbox.moe/6wlbev.mp3",
                "huththo": "https://files.catbox.moe/6wlbev.mp3",
                "හුත්තෝ": "https://files.catbox.moe/6wlbev.mp3",
                "mk": "https://files.catbox.moe/7vl39t.mp3",
                "මොකද කරන්නේ": "https://files.catbox.moe/7vl39t.mp3",
                "senu": "https://files.catbox.moe/84f30g.mp3",
                ".hack": "https://files.catbox.moe/adx1kl.mp3",
                "hello": "https://files.catbox.moe/qn800l.mp3",
                "gm": "https://files.catbox.moe/dlckhz.mp3",
                "good morning": "https://files.catbox.moe/dlckhz.mp3",
                ".ping": "https://files.catbox.moe/fmgr4m.mp3",
                "ane": "https://files.catbox.moe/m64cje.mp3",
                "අනෙහ්": "https://files.catbox.moe/m64cje.mp3",
                "අනේ": "https://files.catbox.moe/m64cje.mp3",
                "bs": "https://files.catbox.moe/1c5xqv.mp3",
                "බුදුසරණයි": "https://files.catbox.moe/1c5xqv.mp3",
                "hi": "https://files.catbox.moe/y4y4ig.mp3",
                "හායි": "https://files.catbox.moe/y4y4ig.mp3",
                "hy": "https://files.catbox.moe/y4y4ig.mp3",
                "කෝ": "https://files.catbox.moe/aw41i7.mp3",
                "මොකක්ද": "https://files.catbox.moe/aw41i7.mp3",
                "😹": "https://files.catbox.moe/s3ybgn.mp3",
                "😂": "https://files.catbox.moe/s3ybgn.mp3",
                "😁": "https://files.catbox.moe/s3ybgn.mp3",
                ".<": "https://files.catbox.moe/zt8o60.mp3",
                "bye": "https://files.catbox.moe/itmie7.mp3",
                "බායි": "https://files.catbox.moe/itmie7.mp3",
                "by": "https://files.catbox.moe/itmie7.mp3",
                "sc": "https://files.catbox.moe/ed3hhr.mp3",
                "ලකී": "https://files.catbox.moe/ed3hhr.mp3",
                ".script": "https://files.catbox.moe/ed3hhr.mp3",
                "කෑවද බන්": "https://files.catbox.moe/x4nkq5.mp3",
                "kewada bn": "https://files.catbox.moe/x4nkq5.mp3",
                "කෑවද": "https://files.catbox.moe/x4nkq5.mp3",
                "kewada": "https://files.catbox.moe/x4nkq5.mp3",
                "yey yey yey thamayi": "https://files.catbox.moe/u0m82g.mp3",
                "යැයි යැයි තමයි": "https://files.catbox.moe/u0m82g.mp3",
                "රාජපක්ෂ": "https://files.catbox.moe/u0m82g.mp3",
                "😓": "https://files.catbox.moe/u0m82g.mp3",
                "yai yai yai thami": "https://files.catbox.moe/u0m82g.mp3",
                "ha": "https://files.catbox.moe/u0m82g.mp3",
                ". system": "https://files.catbox.moe/kmw5ce.mp3",
                ".system": "https://files.catbox.moe/kmw5ce.mp3",
                ".repo": "https://files.catbox.moe/76kqug.mp3",
                ".setting": "https://files.catbox.moe/76kqug.mp3"
            };

            // ලිස්ට් එකේ ඇති වචනයක් මැසේජ් එකේ තිබේදැයි බැලීම
            for (const key in voiceData) {
                if (input.includes(key)) {
                    // වොයිස් එක යැවීමට පෙර සුබපැතුම සහ මැන්ෂන් එක යැවීම
                    await sock.sendMessage(from, { 
                        text: `${wish}\n\n👋 Hello @${sender.split('@')[0]}`, 
                        mentions: [sender] 
                    }, { quoted: msg });

                    // අදාළ වොයිස් නෝට් එක යැවීම
                    await sock.sendMessage(from, { 
                        audio: { url: voiceData[key] }, 
                        mimetype: 'audio/mp4', 
                        ptt: true 
                    }, { quoted: msg });

                    break; // එක වතාවක් රිප්ලයි කළ පසු ලූප් එක නතර කරන්න
                }
            }
        }
    }
]
