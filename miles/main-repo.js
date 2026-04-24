const axios = require('axios');
const { cmd } = require('../command');
const config = require('../config');

cmd({
    pattern: "repo",
    alias: ["git", "sc", "script"],
    desc: "Fetch the bot repository details",
    category: "main",
    react: "👑",
    filename: __filename
},
async (conn, mek, m, { from, reply, sender }) => {
    try {
        const repoUrl = "https://github.com/montanatechmain/miles-MD";
        const apiUrl = "https://api.github.com/repos/Montanatechmain/MILES-MD";
        
        // Fetching real-time data from GitHub
        const response = await axios.get(apiUrl);
        const data = response.data;

        let repoMsg = `👑 *MILES-MD REPO DETAILS* 👑

✨ *Repository Name:* ${data.name}
👤 *Owner:* ${data.owner.login}
⭐ *Stars:* ${data.stargazers_count}
🍴 *Forks:* ${data.forks_count}
📅 *Last Updated:* ${new Date(data.updated_at).toLocaleDateString()}

🔗 *Repo Link:* ${repoUrl}

> *Created by Miles & Montana* 👨‍💻`;

        // Define the fakevCard (Popkid Ke)
        const fakevCard = {
            key: {
                fromMe: false,
                participant: "0@s.whatsapp.net",
                remoteJid: "status@broadcast"
            },
            message: {
                contactMessage: {
                    displayName: "Miles",
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:miles\nORG:miles;\nTEL;type=CELL;type=VOICE;waid=263781856195:+263781856195\nEND:VCARD`
                }
            }
        };

        // Clean context info (Removed externalAdReply)
        const newsletterContextInfo = {
            mentionedJid: [sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: config.NEWSLETTER_JID || '120363423997837331@newsletter',
                newsletterName: config.OWNER_NAME || 'MARLON',
                serverMessageId: 1
            }
        };

        // Sending image with caption and context, but no ad reply
        await conn.sendMessage(from, {
            image: { url: `https://files.catbox.moe/aq85vi.jpg` },
            caption: repoMsg,
            contextInfo: newsletterContextInfo
        }, { quoted: fakevCard });

    } catch (e) {
        console.log(e);
        reply("❌ Error fetching repository details. Please try again later.");
    }
});
