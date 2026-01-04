const { performance } = require('perf_hooks');

module.exports = [
    {
        name: "ping",
        description: "Check Bot Speed",
        ownerOnly: false,
        async execute(sock, msg, args, context) {
            const { from, replyimg, sadiya_md_footer } = context;
            
            try {
                // පින්ග් එක ගණනය කිරීම ආරම්භය
                const start = performance.now();
                const end = performance.now();
                const ping = (end - start).toFixed(3);

                let desc = `⚡ *ZEPIX-AI SPEED TEST* ⚡

*📍 Latency:* ${ping} ms
*📡 Status:* Online

*🔢 Reply below number,*
1 | 🏠 Main Menu
2 | ℹ️ Bot Status

${sadiya_md_footer}`;

                // රූපය සමඟ මැසේජ් එක යැවීම
                await replyimg(desc);

            } catch (e) {
                console.log(e);
            }
        }
    }
]

