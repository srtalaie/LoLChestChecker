$(document).ready(function(){
    let champMasteries = [];
    let chestChamps = [];
    let summonerId = '';
    let champs = [];
    let displayChamps = [];
    
    //Get champs
    $.ajax({
        url: `/api/champions`,
        method: 'GET',
        statusCode: {
            404: function() {
                $('.champion-output').html('<h1>Invalid Summoner Name Was Submitted</h1>');
            }
        }
    }).then(function(response){
        champs = response.data;
    });

    //Search summoner ID based on summoner name
    $('.search-btn').on('click', function(){
        //Get summoner name from user input
        let summonerName = $('.input-bar').val();
        $('.input-bar').empty();
    
        $.ajax({
            url: `/api/summoner/${summonerName}`,
            method: 'GET',
            statusCode: {
                404: function() {
                    $('.summoner-output').html('<h1>Invalid Summoner Name</h1>');
                }
            }
        }).then(function(response){
            summonerId = response.id;
            $('.summoner-output').html(`<h1>${response.name}</h1>`);
            return summonerId;
        })
    });
    
    //Get Champ Masteries and Cross check with champs
    $('.display-btn').on('click', function(){
        $('.champion-output').empty();    
        $.ajax({
            url: `/api/mastery/${summonerId}`,
            method: 'GET',
               statusCode: {
                404: function() {
                    $('.champion-output').html('<h1>Invalid Summoner Name Was Submitted</h1>');
                }
            }
        }).then(function(response){
            champMasteries = response;

            chestChamps = champMasteries.filter(function(champion){
                if(champion.chestGranted){
                    return champion;
                }
            });

            //Check what champs user has gotten chests with
            Object.entries(champs).forEach(function(champ){
                for(let i = 0; i < chestChamps.length; i++){
                    if(chestChamps[i].championId === parseInt(champ[1].key)){
                        displayChamps.push(champ);
                    }
                }
            });

            //Display champs with chests
            displayChamps.forEach(function(champ){
                $('.champion-output').append(`
                    <div>
                        <img src="http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champ[0]}_0.jpg" alt="${champ[0]} height="200" width="200">
                        <p>${champ[0]}</p>
                    </div>
                `)
            });
        })
    });
});