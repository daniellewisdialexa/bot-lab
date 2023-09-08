const { SlashCommandBuilder, EmbedBuilder, Embed } = require('discord.js');
const ScoreManager = require('../API_Utils/getScores');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('get_events')
		.setDescription('Gets game events')
        .addStringOption(option => option.setName('weeknumber').setDescription('Week of game to return')),
	async execute(interaction) {
	const week = interaction.options.getString('weeknumber')
    
SM = new ScoreManager();
SM.getEvents(week).then(events => {
	var fields = []; 
	
	for(var e of events){	
		const gameDate = new Date( e.date).toLocaleDateString("en-US")
		console.log(gameDate)
	 fields.push(
	    { name: 'Game', value: e.name },
		{ name: 'Date', value: gameDate},
		{ name: 'Venue', value: e.venueName },
		{
			name: '\u200b',
			value: '\u200b',
			inline: false,
		},
			)
	}

    let embedArray = [];

    for(var fieldChunks of arraySplitter(fields, 25)){
    console.log(fieldChunks.length)
      const embed = new EmbedBuilder()
		.setTitle('All games for the week')
        .setColor('Green')
		.addFields( 
			fieldChunks
		)
        
        embedArray.push(embed);

    }

    if(embedArray.length > 0 ){
       interaction.reply({embeds:embedArray})
    }else(
        interaction.reply({content:'No game data for specified week'})
    )

})


	}


}

function arraySplitter(items, size){
    return Array.from({ length: Math.ceil(items.length / size) }, (_, index) =>
    items.slice(index * size, index * size + size));
}

