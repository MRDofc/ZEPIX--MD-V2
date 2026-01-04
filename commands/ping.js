const { runtime } = require("../lib/allFunction");

module.exports = [
    {
        name: "ping",
        description: "To check bot speed",
        ownerOnly: false,
        async execute(sock, msg, args, context) {
            const { from, reply, sadiya_md_footer } = context;
            
            try {
                // කාලය ගණනය කිරීම (Speed Calculation)
                const start = new Date().getTime();
                const end = new Date().getTime();
                const speed = end - start;

                let pingMsg = `⚡ *ZEPIX-AI SPEED TEST* ⚡

*🚀 Latency:* ${speed}ms
*⏳ Uptime:* ${runtime(process.uptime())}

*Checked by ZEPIX-AI Engine*
${sadiya_md_footer}`;

                // පින්තූර රහිතව පණිවිඩය පමණක් යැවීම
                await reply(pingMsg);

            } catch (e) {
                console.log("Error in ping command:", e);
            }
        }
    }
]

