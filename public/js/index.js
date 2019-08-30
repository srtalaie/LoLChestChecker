$(document).ready(function(){
    let champMasteries = [];
    let chestChamps = [];
    let summonerId = '';
    let champs = [];
    let displayChamps = [];
    let noChestChamps = [];
    let noChestChampsDisplay = [];
    
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
        return summonerId;
    });
    
    //Get Champ Masteries and Cross check with champs
    $('.display-btn').on('click', function(){ 
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

            noChestChamps = champMasteries.filter(function(champion){
                if(!champion.chestGranted){
                    return champion;
                }
            });

            //Check what champs user has gotten chests with and which ones they haven't and place in apporpriate    arrays
            Object.entries(champs).forEach(function(champ){
                for(let i = 0; i < chestChamps.length; i++){
                    if(chestChamps[i].championId === parseInt(champ[1].key)){
                        displayChamps.push(champ);
                    }
                }
            });
            Object.entries(champs).forEach(function(champ){
                for(let i = 0; i < noChestChamps.length; i++){
                    if(noChestChamps[i].championId === parseInt(champ[1].key)){
                        noChestChampsDisplay.push(champ);
                    }
                }
            });

            //Display champs with chests and without
            displayChamps.forEach(function(champ){
                $('.champs-with-chests-area').append(`
                    <div class="champ-with-chest">
                        <img src="http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champ[0]}_0.jpg" alt="${champ[0]} height="100" width="100">
                        <p>${champ[0]}</p>
                    </div>
                `)
            });
            noChestChampsDisplay.forEach(function(champ){
                $('.champs-without-chests-area').append(`
                    <div class="champ-without-chest">
                        <img src="http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champ[0]}_0.jpg" alt="${champ[0]} height="100" width="100">
                        <p>${champ[0]}</p>
                    </div>
                `)
            });

            $('.chest-amount').html(`<p>Chests this season: ${displayChamps.length}</p>`)
        })
    });

    //Clear data for a new search
    $('.clear').on('click', function(){
        displayChamps = [];
        noChestChampsDisplay = [];

        $('.champs-with-chests-area').empty();
        $('.champs-without-chests-area').empty();
        $('.summoner-output').empty();
        $('.input-bar').val('');
        $('.chest-amount').empty();
    });
});