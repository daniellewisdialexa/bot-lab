const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const ScoreManager = require('../API_Utils/getScores');
const Scores = require('../API_Utils/getScores');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('get_cal')
		.setDescription('Gets calendar events'),
	async execute(interaction) {
	
SM = new ScoreManager();
SM.getCalendar().then(s => {

	interaction.reply({content:JSON.stringify(s.Enteries[0])})

})


	}

}


