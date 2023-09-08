const scores_API_URL = "http://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard";
module.exports = class Scores {
constructor(){}
  
async getScoreBoardData() {
    try {
        const response = await fetch(scores_API_URL);
        const data = await response.json();

        return data;
    } catch (error) {
        console.error(error);
    }
}
 
async getCalendar() {
 let data = await this.getScoreBoardData();
return {
   Enteries: data.leagues[0].calendar[0].entries,
   SeasonData: data.leagues[0].calendar[0]
}
    
}


async getEvents(theWeek) {
    let events = [];
    let data = await this.getScoreBoardData();
    for(let event of data.events){
        if(theWeek == null || theWeek == event['week'].number){
          //  console.log(event.competitions[0].odds)
            events.push(
                {
                    name:event.name,
                    date: event.date,
                    venueName: event.competitions[0].venue.fullName,
                    //oddsProvider: event.competitions[0],
                }

            )
        }
    }
    
    return events;
}
}