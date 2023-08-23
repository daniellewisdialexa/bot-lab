const scores_API_URL = "http://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard";
module.exports = class Scores {
constructor(){}
  
async getScores() {
    try {
        const response = await fetch(scores_API_URL);
        const data = await response.json();

        return data;
    } catch (error) {
        console.error(error);
    }
}
 
async getCalendar() {
 let data = await this.getScores();
return {
   Enteries: data.leagues[0].calendar[0].entries,
   SeasonData: data.leagues[0].calendar[0]
}
    
}


async getEvents() {
    let data = await getScores();
    return data.events;
}
}