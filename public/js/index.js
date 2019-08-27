let summonerId = ''

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
        $('.summoner-output').empty();
        summonerId = response.id;
    })
});

//Keep to get champ masteries
// $('.display-btn').on('click', function(){
//     $.ajax({
//         url: `/api/mastery/${summonerId}`,
//         method: 'GET',
//            statusCode: {
//             404: function() {
//                 $('.champion-output').html('<h1>Invalid Summoner Name Was Submitted</h1>');
//             }
//         }
//     }).then(function(response){
//         $('.champion-output').empty();
//         console.log(response);
//     })
// });

//Display champs
$('.display-btn').on('click', function(){
    $.ajax({
        url: `/api/champions`,
        method: 'GET',
        statusCode: {
            404: function() {
                $('.champion-output').html('<h1>Invalid Summoner Name Was Submitted</h1>');
            }
        }
    }).then(function(response){
        $('.champion-output').empty();
        console.log(response.data.Aatrox.name);
        $('.champion-output').html(`${console.log('Worked')}
            <img src="http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${response.data.Aatrox.name}_0.jpg" alt="${response.data.Aatrox.name}">
        `);
    })
});