import token from "./token";
import parse from "./argparse";
import { Telegraf } from "telegraf";
import { getUserData as getData, setUserData as setData, getUserFile as getFile, setUserFile as setFile, DataPathFormat, getUserData } from "./database";
import { User } from "telegraf/typings/telegram-types";

const bot = new Telegraf(token);

enum MinionType {
	"stone",
	"diamond",
	"sand",
	":sparkles:✨"
}

enum MinionTier {
	'I',
	'II',
	'III',
	'IV',
	'V',
	'VI',
}

interface Minion {
	type: MinionType,
	tier: MinionTier
}

function setUpUser(userID: number, userData: User) {
	const sd = (dataPath: DataPathFormat, data: any) => setData(userID, dataPath, data);
	const sf = (dataPath: string[], data: any) => setFile(userID, dataPath, data);

	function d(location, objPath) {
		return {
			location,
			objPath
		} as DataPathFormat
	}

	// user data

	sf(['data'], userData)

	// minions

	sf(['minions'], []);
}

bot.start(ctx => {
	setUpUser(ctx.from.id, ctx.from);
	ctx.reply('Hello!');
});

bot.command([
	'mydata'
], ctx => {
	ctx.replyWithHTML('<pre><code class=\'language-python\'>' + JSON.stringify(getFile(ctx.from.id, ['data']), null, '\t') + '</code></pre>')
});

bot.command([
	'minion',
	'minions',
	'm'
], ctx => {
	ctx.replyWithMarkdown(
		'*Minions*:\n' +
		(getFile(ctx.from.id, ['minions']) as Array<Minion>).map(m => {
			return '_' + m.tier + '_ level ' + 
		})
	)
})

bot.launch();