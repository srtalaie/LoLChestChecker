const request = require("request");

module.exports = function (app) {
    const APIKey = process.env.API_Key

    app.get("/api/summoner/:summonerName", function (req, res) {
        request(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${req.params.summonerName}?api_key=${APIKey}`, function(error, response){
            if(error) throw error;
            res.send(JSON.parse(response.body));
        })
    }),

    app.get("/api/mastery/:summonerId", function (req, res) {
        request(`https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${req.params.summonerId}?api_key=${APIKey}`, function(error, response){
            if(error) throw error;
            res.send(JSON.parse(response.body));
        })
    })
};