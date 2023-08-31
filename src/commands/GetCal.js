const { SlashCommandBuilder, EmbedBuilder, Embed } = require('discord.js');
const ScoreManager = require('../API_Utils/getScores');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('get_cal')
		.setDescription('Gets calendar events'),
	async execute(interaction) {
	
SM = new ScoreManager();
SM.getCalendar().then(s => {
	var fields = [
		{
				name: 'startDate',
				value: s.SeasonData['startDate'],
				
			},
			{
				name:'endDate',
				value: s.SeasonData['endDate']
			},
	];
	for(var week of s.Enteries){	
		console.log(week)
		fields.push({
			name: week.label,
			value: week['detail'],
			inline: true
		}
		)
	}


	const seasonEmbed = new EmbedBuilder()
		.setTitle(s.SeasonData['label'])
		.addFields( 
			fields,
		)

	interaction.reply({embeds:[seasonEmbed]})

})


	}

}

