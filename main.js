"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const token_1 = require("./token");
const telegraf_1 = require("telegraf");
const database_1 = require("./database");
const bot = new telegraf_1.Telegraf(token_1.default);
function setUpUser(userID, userData) {
    const sd = (dataPath, data) => database_1.setUserData(userID, dataPath, data);
    const sf = (dataPath, data) => database_1.setUserFile(userID, dataPath, data);
    function d(location, objPath) {
        return {
            location,
            objPath
        };
    }
    // user data
    sf(['data'], userData);
    // minions
    sf(['minions'], {});
}
bot.start(ctx => {
    setUpUser(ctx.from.id, ctx.from);
    ctx.reply('Hello!');
});
bot.command([
    'mydata'
], ctx => {
    ctx.replyWithHTML('<pre><code class=\'language-python\'>' + JSON.stringify(database_1.getUserFile(ctx.from.id, ['data']), null, '\t') + '</code></pre>');
});
bot.launch();
//# sourceMappingURL=main.js.map