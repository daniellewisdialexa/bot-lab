const scores_API_URL = "http://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard";

async function getScores() {
    try {
        const response = await fetch(scores_API_URL);
        const data = await response.json();

        return data;
    } catch (error) {
        console.error(error);
    }
}

async function getEvents() {
    let data = await getScores();
    return data.events;
}
 

getEvents().then(events => console.log(events));
//getScores().then(data => console.log(data));