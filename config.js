const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}

module.exports = {
    // මෙතන 'YOUR_SESSION_ID_HERE' වෙනුවට ඔබේ ID එක දාන්න
    SESSION_ID: process.env.SESSION_ID || "YOUR_SESSION_ID_HERE", 
    PORT: process.env.PORT || "8000"
};
