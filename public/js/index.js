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

$('.display-btn').on('click', function(){
    $.ajax({
        url: `/api/mastery/${summonerId}`,
        method: 'GET',statusCode: {
            404: function() {
                $('.champion-output').html('<h1>Invalid Summoner Name Was Submitted</h1>');
            }
        }
    }).then(function(response){
        $('.champion-output').empty();
        console.log(response);
    })
});