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
		fields.push({
				name: e.name,
				value: e.date,
                inline:true
				
			},
            			
		)
	}

    let embedArray = [];

    for(var fieldChunks of arraySplitter(fields, 24)){
    console.log(fieldChunks.length)
      const embed = new EmbedBuilder()
		.setTitle('Get game data for a specific week')
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

