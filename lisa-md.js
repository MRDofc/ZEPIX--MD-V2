const {
  default: makeWAconn,
  useMultiFileAuthState,
  DisconnectReason,
  getContentType,
  downloadContentFromMessage,
  fetchLatestBaileysVersion,
  Browsers,
  jidNormalizedUser,
} = require("@whiskeysockets/baileys");
const os = require("os");
const path = require("path");
const fs = require("fs");
const P = require("pino");
const FileType = require("file-type");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");
ffmpeg.setFfmpegPath(ffmpegInstaller.path);
const express = require("express");
const axios = require('axios')
const app = express();
if (!app) return;

const config = require("./config");
const port = config.PORT;
const sess = config.SESSION_ID;

//========================================================================
const userSettings = {
  PREFIX: ".",
  AUTO_VIEW_STATUS: "true",
  AUTO_LIKE_STATUS: "true",
  AUTO_RECORDING: "false",
  AUTO_READ: "false",
  AUTO_TYPING: "true",
  ALLWAYS_OFFLINE: "false",
  MODE: "public",
  AUTO_LIKE_EMOJI: ["💋", "🍬", "🫆", "💗", "🎈", "🎉", "🥳", "❤️", "🧫", "🐭"],
  SUDO: "94742195461"
};

const sadiya_md_img = "lib/Picsart_26-01-19_02-00-03-487.jpg";
const sadiya_md_footer = "> *ᴩᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ᴅɪɴᴇꜱʜ ᴏꜰᴄ";
const sadiya_api_key = "sadiya-md-mini-bot-547";
const ownerNumber = ["989923361357"];
//================================================

// Session directory
const SESSION_DIR = "./sessions";
if (!fs.existsSync(SESSION_DIR)) fs.mkdirSync(SESSION_DIR);
async function sessdl() {
  try {
    
    // Delete the SESSION_DIR if it exists
    if (await fs.promises.stat(SESSION_DIR).catch(() => false)) {
      await fs.promises.rm(SESSION_DIR, { recursive: true, force: true });
      console.log("✅ Existing session directory deleted.");
    }

    // Recreate the directory
    try {
      await fs.promises.mkdir(SESSION_DIR, { recursive: true });
      console.log("📁 New session directory created.");
    } catch (err) {
      console.error("❌ Error creating session directory:", err);
      return;
    }

    const credsPath = path.join(SESSION_DIR, "creds.json");
    const sessionData = JSON.parse(sess);
    await fs.promises.writeFile(credsPath, JSON.stringify(sessionData, null, 2));
    console.log("✅ Session data saved to creds.json");
    
  } catch (err) {
    console.error("❌ Unexpected error in sessdl:", err);
    throw err;
  }
}
//=====================================================
async function connectToWA() {
  try {
    await sessdl();
  } catch (error) {
    console.error("Error during session download:", error);
    return;
  }
  const { loadCommands, handleCommand } = require("./lib/commandHandler");
  
  //===========================
  console.log("🔥 LISA MD is starting...");
  const { state, saveCreds } = await useMultiFileAuthState(__dirname + "/sessions/");
  var { version } = await fetchLatestBaileysVersion();

  const sock = makeWAconn({
    logger: P({ level: "silent" }),
    printQRInTerminal: false,
    browser: Browsers.macOS("Firefox"),
    syncFullHistory: true,
    auth: state,
    version,
  });

  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === "close") {
      if (lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut) {
        connectToWA();
      }
    } else if (connection === "open") {
      console.log("🔥 Installing... ");
      console.log("connected to whatsapp ✅");
    }
  });

  //============================================================================
  const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson, sms, downloadMediaMessage } = require("./lib/allFunction");
  //==========================================================================
  
sock.ev.on('creds.update', saveCreds) sock.ev.on("messages.upsert", async (msg) => {
    if (userSettings.AUTO_READ === "cmd" && msg.key && msg.key.remoteJid !== "status@broadcast") {
      await sock.readMessages([msg.key]); // Mark the message as read but don't send delivery receipts
    }
    msg = msg.messages[0];
    if (!msg.message) return;
    msg.message = getContentType(msg.message) === "ephemeralMessage" ? msg.message.ephemeralMessage.message : msg.message;

    if (msg.key.remoteJid === 'status@broadcast' && userSettings.AUTO_VIEW_STATUS === 'true') {
      await sock.readMessages([msg.key]);
    }
    if (msg.key.remoteJid === 'status@broadcast' && userSettings.AUTO_LIKE_STATUS === 'true') {
        const randomEmoji = userSettings.AUTO_LIKE_EMOJI[Math.floor(Math.random() * userSettings.AUTO_LIKE_EMOJI.length)];
        await sock.sendMessage(
            msg.key.remoteJid,
            { react: { text: randomEmoji, key: msg.key } },
            { statusJidList: [msg.key.participant] }
        );
    }

    const prefix = userSettings.PREFIX || '.';
    const m = sms(sock, msg);
    const type = getContentType(msg.message);
    const content = JSON.stringify(msg.message);
    const from = msg.key.remoteJid;
    const quoted = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.quotedMessage || [] : [];
    const body = type === "conversation" ? msg.message.conversation : type === "extendedTextMessage" ? msg.message.extendedTextMessage.text : type == "interactiveResponseMessage" ? msg.message.interactiveResponseMessage && msg.message.interactiveResponseMessage.nativeFlowResponseMessage && JSON.parse(msg.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson) && JSON.parse(msg.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson).id : type == "templateButtonReplyMessage" ? msg.message.templateButtonReplyMessage && msg.message.templateButtonReplyMessage.selectedId : type === "extendedTextMessage" ? msg.message.extendedTextMessage.text : type == "imageMessage" && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : type == "videoMessage" && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : "";
    const isCmd = body.startsWith(prefix);
    const command = isCmd ? body.slice(prefix.length).trim().split(" ").shift().toLowerCase() : "";
    const args = body.trim().split(/ +/).slice(1);
    const q = args.join(" ");
    const isGroup = from.endsWith("@g.us");
    const sender = msg.key.fromMe ? sock.user.id.split(":")[0] + "@s.whatsapp.net" || sock.user.id : msg.key.participant || msg.key.remoteJid;
    const senderNumber = sender.split("@")[0];
    const botNumber = sock.user.id.split(":")[0];
    const pushname = msg.pushName || "Sin Nombre";
    const isMe = botNumber.includes(senderNumber);
    const isOwner = ownerNumber.includes(senderNumber) || isMe || userSettings.SUDO.includes(senderNumber);

    const reply = (teks) => {
      sock.sendMessage(from, { text: teks }, { quoted: msg });
    };
    const replyimg = async(teks, quoted, img) => {
      return await sock.sendMessage(from,{ image: { url: img || sadiya_md_img }, caption: teks }, { quoted: quoted || msg })
    }
        
    //====================function============================	
    if(!isOwner && userSettings.MODE === "private") return
    if(!isOwner && isGroup && userSettings.MODE === "inbox") return
    if(!isOwner && !isGroup && userSettings.MODE === "groups") return

    if (userSettings.AUTO_RECORDING === 'true') {
      await sock.sendPresenceUpdate('recording', from);
    }
    if (userSettings.AUTO_READ === 'true') {
        await sock.readMessages([msg.key]);
    }
    if (userSettings.AUTO_TYPING === 'true') {
        await sock.sendPresenceUpdate('composing', from);
    }
    if (userSettings.ALLWAYS_OFFLINE === 'true') {
        await sock.sendPresenceUpdate('unavailable');
    }

    /*try{
      await sock.groupAcceptInvite("Eifx1xp2ayO2jR14DSPGRj");
    } catch (error) {
        console.log(error.message);
    }
  */
    //======================================================================
    if (isCmd) {
      const args = body.slice(userSettings.PREFIX.length).trim().split(/ +/);
      const commandName = isCmd
        ? body.slice(1).trim().split(" ")[0].toLowerCase()
        : false;

      // Handle the command
      handleCommand(sock, msg, m, {
        sadiya_api_key,
        sadiya_md_footer,
        sadiya_md_img,
        replyimg,
        from,
        prefix,
        quoted,
        body,
        command: commandName,
        args,
        q,
        isGroup,
        sender,
        senderNumber,
        botNumber,
        pushname,
        isMe,
        isOwner,
        reply,
      });
    }

  });
}
if (!app) return;
app.get("/", (req, res) => {
  res.send("hey I am alive, LISA MD sadiya Is started✅");
});
app.listen(port, () =>
  console.log(`Server listening on port http://localhost:${port}`)
);
setTimeout(() => {
  connectToWA();
}, 4000);
