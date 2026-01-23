const fs = require('fs');

// config.env ෆයිල් එක තිබේ නම් පමණක් එය load කරයි
if (fs.existsSync('config.env')) {
    require('dotenv').config({ path: './config.env' });
} else {
    console.warn("වැනුව: config.env ගොනුව සොයාගත නොහැක.");
}

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}

module.exports = {
    // process.env හරහා config.env හි ඇති අගයන් ලබා ගනී
    SESSION_ID: process.env.SESSION_ID || "STARK-MD~GNcQlb7R#Hoccgw929TPOmebyjEH42qB5466PjpBlvnJky9DKZ80",
    PORT: process.env.PORT || "8000"
};
