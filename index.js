const { log } = require('console');
const fs = require('fs');
const path = require('path');

const MessagesDir = path.join(__dirname, 'messages');
const Messages = fs.readdirSync(MessagesDir)
var msg = ""
Messages.forEach((dir) => {
    if (dir == "index.json") return;
    const cpint = path.join(MessagesDir, dir);

    const channelJson = require(cpint + "/channel.json");
    if (channelJson.guild) {
        msg += channelJson.name + " " + channelJson.guild.name + "</br>"
    } else {
        msg += channelJson.id + "</br>"
    } 

    const messagesCsv = fs.readFileSync(cpint + "/messages.csv", 'utf8');
    const lines = messagesCsv.split("\n")
    delete lines[0];
    lines.forEach((line) => {
        const ele = line.split(",");
        const timestamp = ele[1] ? ele[1].split(".")[0] : ele
        const content = ele[2];
        const attachments = ele[3];
        if (!attachments) return
        msg += `<img src="${attachments}" width="300px"> </br>`
    })
});
fs.writeFile('output.html', msg, function (err) {
    console.log('Saved!');
});